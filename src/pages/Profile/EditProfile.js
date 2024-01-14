import {
  Text,
  View,
  StatusBar,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ref as sRef, uploadBytes } from "firebase/storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { ref, onValue, update } from "firebase/database";

import { db, storage } from "../../configs/firebase";
import { BottomMenu, CekAuth, Navbar } from "../../components";
import { COLORS, SAFEAREAVIEW, SHADOWS } from "../../constants";
const EditProfile = ({ navigation }) => {
  return (
    <ReturnElement
      navigation={navigation}
      userLogin={CekAuth()}
    ></ReturnElement>
  );
};

const ReturnElement = ({ navigation, userLogin }) => {
  const [nama, setNama] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [dataLamaran, setDataLamaran] = useState([]);
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  let idUserLogin;
  const idLamaranUser = [];
  const idPekerjaanUser = [];

  useEffect(() => {
    setNama(userLogin?.nama);
    setImage(userLogin?.image);
    onValue(ref(db, "Lamaran Kerja"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let semuaLamaran = { ...data };
      setDataLamaran(semuaLamaran);
    });

    onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let semuaPekerjaan = { ...data };
      setDataPekerjaan(semuaPekerjaan);
    });

    return onValue(ref(db, "User"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let semuaUser = { ...data };
      setDataUser(semuaUser);
    });
  }, [userLogin]);

  Object.keys(dataUser).map((id_user) => {
    if (dataUser[id_user]["email"] === userLogin?.email) idUserLogin = id_user;
  });
  Object.keys(dataLamaran).map((id_lamaran) => {
    if (dataLamaran[id_lamaran]["email"] === userLogin?.email)
      idLamaranUser.push(id_lamaran);
  });
  Object.keys(dataPekerjaan).map((id_pekerjaan) => {
    if (dataPekerjaan[id_pekerjaan]["email"] === userLogin?.email)
      idPekerjaanUser.push(id_pekerjaan);
  });

  const HapusFotoProfile = () => {
    Alert.alert(
      "Are you sure?",
      "Are you sure you will delete this photo profile?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setImage(null);
            Alert.alert("You have successfully delete this photo profile!");
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validation = () => {
    if (nama.trim() === "") {
      Alert.alert("Please fill in all data");
      return false;
    }
    if (image === null || image === undefined) {
      Alert.alert("Please upload your photo");
      return false;
    }

    if (nama.length < 3) {
      Alert.alert("Please fill in a name of at least 3 characters");
      return false;
    }

    return true;
  };

  const UpdateProfile = async () => {
    if (validation()) {
      setUploading(true);
      if (image !== userLogin.image) {
        try {
          const { uri } = await FileSystem.getInfoAsync(image);

          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
              resolve(xhr.response);
            };

            xhr.onerror = (e) => {
              reject(new TypeError("Network request failed"));
            };

            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
          });
          const fileName = image.substring(image.lastIndexOf("/") + 1);
          const metadata = {
            contentType: "image/jpeg",
          };

          const storageRef = sRef(storage, `Enablind/Foto User/${fileName}`);
          uploadBytes(storageRef, blob, metadata).then((snapshot) => {
            setUploading(false);
            const UpdatedData = {
              nama,
              email: userLogin.email,
              password: userLogin.password,
              role: userLogin.role,
              image: `https://firebasestorage.googleapis.com/v0/b/react-native-crud-fireba-ea6c9.appspot.com/o/Enablind%2FFoto%20User%2F${fileName}?alt=media&token=27d31474-016d-4956-92a3-be1f6539348e`,
            };

            if (idPekerjaanUser.length !== 0) {
              idPekerjaanUser.map((id_pekerjaan) => {
                const dataPekerjaanUpdate = {
                  Company: nama,
                  email: dataPekerjaan[id_pekerjaan]["email"],
                  "Type Job": dataPekerjaan[id_pekerjaan]["Type Job"],
                  "Job Title": dataPekerjaan[id_pekerjaan]["Job Title"],
                  "Job Salary": dataPekerjaan[id_pekerjaan]["Job Salary"],
                  "Job Location": dataPekerjaan[id_pekerjaan]["Job Location"],
                  "Jumlah Pelamar":
                    dataPekerjaan[id_pekerjaan]["Jumlah Pelamar"],
                  "Job Description":
                    dataPekerjaan[id_pekerjaan]["Job Description"],
                  "Job Publish Date":
                    dataPekerjaan[id_pekerjaan]["Job Publish Date"],
                  "Job Qualifications":
                    dataPekerjaan[id_pekerjaan]["Job Qualifications"],
                  "Image Company": `https://firebasestorage.googleapis.com/v0/b/react-native-crud-fireba-ea6c9.appspot.com/o/Enablind%2FFoto%20User%2F${fileName}?alt=media&token=27d31474-016d-4956-92a3-be1f6539348e`,
                };

                update(ref(db, "Pekerjaan"), {
                  [id_pekerjaan]: dataPekerjaanUpdate,
                });
              });
            }

            update(ref(db, "User"), {
              [idUserLogin]: UpdatedData,
            });
          });
        } catch (error) {
          console.error(error);
          setUploading(false);
        }
      } else {
        const UpdatedData = {
          nama,
          email: userLogin.email,
          password: userLogin.password,
          role: userLogin.role,
          image: userLogin.image,
        };

        update(ref(db, "User"), {
          [idUserLogin]: UpdatedData,
        });

        if (idPekerjaanUser.length !== 0) {
          idPekerjaanUser.map((id_pekerjaan) => {
            const dataPekerjaanUpdate = {
              Company: nama,
              "Image Company": image,
              email: dataPekerjaan[id_pekerjaan]["email"],
              "Type Job": dataPekerjaan[id_pekerjaan]["Type Job"],
              "Job Title": dataPekerjaan[id_pekerjaan]["Job Title"],
              "Job Salary": dataPekerjaan[id_pekerjaan]["Job Salary"],
              "Job Location": dataPekerjaan[id_pekerjaan]["Job Location"],
              "Jumlah Pelamar": dataPekerjaan[id_pekerjaan]["Jumlah Pelamar"],
              "Job Description": dataPekerjaan[id_pekerjaan]["Job Description"],
              "Job Publish Date":
                dataPekerjaan[id_pekerjaan]["Job Publish Date"],
              "Job Qualifications":
                dataPekerjaan[id_pekerjaan]["Job Qualifications"],
            };

            update(ref(db, "Pekerjaan"), {
              [id_pekerjaan]: dataPekerjaanUpdate,
            });
          });
        }
      }

      if (idLamaranUser.length !== 0) {
        // update data lamaran yang dimiliki oleh user yang login
        idLamaranUser.map((id_lamaran) => {
          const dataLamaranUpdated = {
            nama,
            email: dataLamaran[id_lamaran]["email"],
            summary: dataLamaran[id_lamaran]["summary"],
            education: dataLamaran[id_lamaran]["education"],
            experience: dataLamaran[id_lamaran]["experience"],
            phoneHumber: dataLamaran[id_lamaran]["phoneHumber"],
            houseAddress: dataLamaran[id_lamaran]["houseAddress"],
            id_pekerjaan: dataLamaran[id_lamaran]["id_pekerjaan"],
            "Status Lamaran": dataLamaran[id_lamaran]["Status Lamaran"],
          };

          update(ref(db, "Lamaran Kerja"), {
            [id_lamaran]: dataLamaranUpdated,
          });
        });
      }

      Alert.alert("Profile successfully updated!!!");
      navigation.navigate("Profile");
    }
  };

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar navigation={navigation}></Navbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.mainWrapper}>
          <View style={styles.container}>
            <Text style={styles.title}>Update Information</Text>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                autoCapitalize="none"
                value={nama}
                autoFocus={true}
                selectionColor={COLORS.primary}
                placeholderTextColor={COLORS.font}
                onChangeText={(text) => setNama(text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formText}>Photo Profile</Text>
              <Pressable style={styles.buttonPickImage} onPress={pickImage}>
                <Text style={styles.buttonPickImageText}>Pick an Image</Text>
              </Pressable>
            </View>
            {image && (
              <View style={styles.fotoProfileContainer}>
                <Pressable
                  style={styles.hapusFotoProfile}
                  onPress={HapusFotoProfile}
                >
                  <FontAwesome5
                    name="trash"
                    size={24}
                    color={COLORS.lightWhite}
                  />
                </Pressable>

                <Image
                  source={{ uri: image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
                ></Image>
              </View>
            )}
            <Pressable
              style={styles.buttonApply}
              onPress={() => UpdateProfile()}
            >
              <Text style={styles.buttonApplyText}>UPDATE</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <BottomMenu
        focused="Profile"
        navigationHandle={navigation}
        userLogin={CekAuth()}
      />
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  buttonApply: {
    padding: 17,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },

  buttonApplyText: {
    fontSize: 16,
    fontWeight: "700",
  },

  mainWrapper: {
    paddingTop: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightWhite,
  },

  container: {
    padding: 30,
    ...SHADOWS.medium,
    elevation: 2,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
  },

  formGroup: {
    marginVertical: 7,
  },

  formText: {
    fontSize: 16,
    marginBottom: 7,
  },

  input: {
    backgroundColor: COLORS.borderColor,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  textArea: {
    textAlignVertical: "top",
  },

  buttonPickImage: {
    width: "100%",
    backgroundColor: COLORS.borderColor,
    borderRadius: 10,
    padding: 12,
  },
  buttonPickImageText: {
    fontSize: 16,
  },
  fotoProfileContainer: {
    width: "100%",
    height: 250,
    marginTop: 10,
    position: "relative",
  },
  hapusFotoProfile: {
    right: 0,
    zIndex: 1000,
    position: "absolute",
    backgroundColor: COLORS.merah,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
