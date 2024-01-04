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
import { useState } from "react";
import { ref, update } from "firebase/database";

import { db } from "../../configs/firebase";
import { Navbar } from "../../components";
import { COLORS, SAFEAREAVIEW, SHADOWS } from "../../constants";

const FormInterview = ({ navigation, route }) => {
  const { dataLamaran, dataPekerjaan, id } = route.params;
  const [tempatInterview, setTempatInterview] = useState("");

  const UpdateTempatInterview = () => {
    const dataInterview = {
      status: "Invited to Interview",
      tempat: tempatInterview,
    };
    const updateDataLamaran = {
      "Status Lamaran": dataInterview,
      education: dataLamaran["education"],
      email: dataLamaran["email"],
      experience: dataLamaran["experience"],
      houseAddress: dataLamaran["houseAddress"],
      id_pekerjaan: dataLamaran["id_pekerjaan"],
      nama: dataLamaran["nama"],
      phoneHumber: dataLamaran["phoneHumber"],
      summary: dataLamaran["summary"],
    };

    dataLamaran["Status Lamaran"] = dataInterview;
    update(ref(db, "Lamaran Kerja"), {
      [id]: updateDataLamaran,
    });
    setTempatInterview("");
    Alert.alert("You have successfully added an interview place");
    return navigation.navigate("DetailLamaran", {
      dataLamaran,
      dataPekerjaan,
      id,
    });
  };

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar isBack={true} goBack={() => navigation.goBack()}></Navbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.mainWrapper}>
          <View style={styles.container}>
            <View style={styles.formGroup}>
              <Text style={styles.formText}>Place for Interview</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Place for Interview"
                autoCapitalize="none"
                value={tempatInterview}
                multiline
                numberOfLines={7}
                onChangeText={(text) => setTempatInterview(text)}
              />
            </View>

            <Pressable
              style={styles.buttonApply}
              onPress={() => UpdateTempatInterview()}
            >
              <Text style={styles.buttonApplyText}>SEND</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormInterview;

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
