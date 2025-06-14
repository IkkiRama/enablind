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
} from "react-native";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { ref, push, onValue, update } from "firebase/database";

import { db } from "../../configs/firebase";
import { Navbar } from "../../components";
import { COLORS, SAFEAREAVIEW, SHADOWS } from "../../constants";
const FormApplay = ({ navigation, route }) => {
  const { id, data } = route.params;
  const auth = getAuth();
  let userLogin;
  const [dataUser, setDataUser] = useState({});
  const dataUserKeys = Object.keys(dataUser);

  useEffect(() => {
    if (auth.currentUser == null) {
      Alert.alert("You are not logged in yet, please login first");
      return navigation.replace("Login");
    } else {
      return onValue(ref(db, "User"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataUser = { ...data };
        setDataUser(dataUser);
      });
    }
  }, []);

  dataUserKeys.map((key) => {
    if (dataUser[key].email === auth.currentUser.email) {
      JSON.stringify((userLogin = dataUser[key]));
    }
  });

  const [phoneHumber, setPhoneHumber] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  let cleanedExperienceArray;

  const reset = () => {
    setPhoneHumber("");
    setHouseAddress("");
    setSummary("");
    setEducation("");
    setExperience("");
    cleanedExperienceArray = "";
    return;
  };

  const validation = () => {
    if (
      houseAddress.trim() === "" ||
      summary.trim() === "" ||
      education.trim() === ""
    ) {
      Alert.alert("Please fill in all form");
      return false;
    }

    return true;
  };

  const applyJob = () => {
    if (validation()) {
      if (experience !== "") {
        const experienceArray = experience.split(",");
        // Membersihkan setiap elemen array dari spasi yang tidak diinginkan
        cleanedExperienceArray = experienceArray.map((item) => item.trim());
      }

      // Memisahkan string menjadi array menggunakan koma sebagai pemisah
      const educationArray = education.split(",");
      // Membersihkan setiap elemen array dari spasi yang tidak diinginkan
      const cleanedEducationArray = educationArray.map((item) => item.trim());

      const storeData = {
        id_pekerjaan: id,
        nama: userLogin?.nama,
        email: userLogin?.email,
        "Status Lamaran": {
          status: "Pending for Interview",
          tempat: "",
        },
        phoneHumber,
        houseAddress,
        summary,
        education: cleanedEducationArray,
        experience:
          cleanedExperienceArray === undefined ? "" : cleanedExperienceArray,
      };

      const updateDataPekerjaan = {
        Company: data["Company"],
        "Image Company": data["Image Company"],
        "Job Description": data["Job Description"],
        "Job Location": data["Job Location"],
        "Job Publish Date": data["Job Publish Date"],
        "Job Qualifications": data["Job Qualifications"],
        "Job Salary": data["Job Salary"],
        "Job Title": data["Job Title"],
        "Type Job": data["Type Job"],
        "Jumlah Pelamar": data["Jumlah Pelamar"] + 1,
        email: data["email"],
      };

      push(ref(db, "Lamaran Kerja"), storeData);
      update(ref(db, "Pekerjaan"), {
        [id]: updateDataPekerjaan,
      });
      reset();
      Alert.alert("You have successfully registered!");
      return navigation.replace("Pekerjaan");
    }
  };

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar
        navigation={navigation}
        isBack={true}
        goBack={() => navigation.goBack()}
        isTitle="CV Maker"
      ></Navbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.mainWrapper}>
          <View style={styles.container}>
            <Text style={styles.title}>Personal Information</Text>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                autoCapitalize="none"
                value={userLogin?.nama}
                editable={false}
                placeholderTextColor={COLORS.font}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={userLogin?.email}
                editable={false}
                placeholderTextColor={COLORS.font}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Active Phone Number</Text>
              <TextInput
                accessible={true}
                accessibilityRole="keyboardkey"
                style={styles.input}
                placeholder="Phone Number"
                autoCapitalize="none"
                keyboardType="phone-pad"
                autoFocus={true}
                value={phoneHumber}
                onChangeText={(text) => setPhoneHumber(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>House Address</Text>
              <TextInput
                accessible={true}
                accessibilityRole="keyboardkey"
                style={[styles.input, styles.textArea]}
                placeholder="Address"
                autoCapitalize="none"
                value={houseAddress}
                multiline
                numberOfLines={3}
                onChangeText={(text) => setHouseAddress(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Summary</Text>
              <TextInput
                accessible={true}
                accessibilityRole="keyboardkey"
                style={[styles.input, styles.textArea]}
                placeholder="Summary"
                autoCapitalize="none"
                value={summary}
                multiline
                numberOfLines={7}
                onChangeText={(text) => setSummary(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Education</Text>
              <TextInput
                accessible={true}
                accessibilityRole="keyboardkey"
                style={[styles.input, styles.textArea]}
                placeholder="Education (comma-separated)"
                autoCapitalize="none"
                value={education}
                multiline
                numberOfLines={7}
                onChangeText={(text) => setEducation(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Experience</Text>
              <TextInput
                accessible={true}
                accessibilityRole="keyboardkey"
                style={[styles.input, styles.textArea]}
                placeholder="Experience (comma-separated)"
                autoCapitalize="none"
                value={experience}
                multiline
                numberOfLines={7}
                onChangeText={(text) => setExperience(text)}
              />
            </View>

            <Pressable
              accessible={true}
              accessibilityRole="button"
              style={styles.buttonApply}
              onPress={() => applyJob()}
            >
              <Text style={styles.buttonApplyText}>SEND</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormApplay;

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
});
