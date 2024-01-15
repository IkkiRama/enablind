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
import { push, ref } from "firebase/database";
import DropDownPicker from "react-native-dropdown-picker";

import { db } from "../../configs/firebase";
import { BottomMenu, CekAuth, Navbar } from "../../components";
import { COLORS, SAFEAREAVIEW, SHADOWS } from "../../constants";

const AddVacancy = ({ navigation, route }) => {
  return (
    <ReturnElement
      userLogin={CekAuth()}
      navigation={navigation}
    ></ReturnElement>
  );
};

const ReturnElement = ({ navigation, userLogin }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobQualifications, setJobQualifications] = useState("");

  const [open, setOpen] = useState(false);
  const [typeJob, setTypeJob] = useState("");
  const [items, setItems] = useState([
    { label: "Full-Time", value: "Full-Time" },
    { label: "Part-Time", value: "Part-Time" },
  ]);

  const reset = () => {
    setTypeJob("");
    setJobTitle("");
    setJobSalary("");
    setJobLocation("");
    setJobDescription("");
    setJobQualifications("");
  };

  const validation = () => {
    if (
      typeJob.trim() === "" ||
      jobTitle.trim() === "" ||
      jobSalary.trim() === "" ||
      jobDescription.trim() === "" ||
      jobQualifications.trim() === "" ||
      jobLocation.trim() === ""
    ) {
      Alert.alert("Please fill in all form");
      return false;
    }

    return true;
  };

  const AddJobVacancy = () => {
    if (validation()) {
      // Memisahkan string menjadi array menggunakan koma sebagai pemisah
      const jobQualificationsArray = jobQualifications.split(",");
      // Membersihkan setiap elemen array dari spasi yang tidak diinginkan
      const cleanedJobQualificationsArray = jobQualificationsArray.map((item) =>
        item.trim()
      );

      var today = new Date();
      var day = today.getDate();
      var month = today.getMonth() + 1;
      var year = today.getFullYear();
      var formattedDate =
        (day < 10 ? "0" : "") +
        day +
        "-" +
        (month < 10 ? "0" : "") +
        month +
        "-" +
        year;

      const PostData = {
        Company: userLogin.nama,
        email: userLogin.email,
        "Job Title": jobTitle,
        "Image Company": userLogin.image,
        "Type Job": typeJob,
        "Job Location": jobLocation,
        "Job Publish Date": formattedDate,
        "Job Salary": parseInt(jobSalary),
        "Jumlah Pelamar": 0,
        "Job Description": jobDescription,
        "Job Qualifications": cleanedJobQualificationsArray,
      };

      push(ref(db, "Pekerjaan"), PostData);
      reset();
      Alert.alert("You have successfully added a job vacancy!");
      return navigation.replace("Pekerjaan");
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
            <Text style={styles.title}>Job Information</Text>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Job Title</Text>
              <TextInput
                autoFocus={true}
                style={styles.input}
                placeholder="Job Title"
                value={jobTitle}
                selectionColor={COLORS.primary}
                onChangeText={(text) => setJobTitle(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Type Job</Text>

              <DropDownPicker
                open={open}
                value={typeJob}
                items={items}
                setOpen={setOpen}
                setValue={setTypeJob}
                setItems={setItems}
                listMode="SCROLLVIEW"
                placeholder="Type Job"
                placeholderStyle={{
                  color: COLORS.font,
                  fontWeight: "500",
                }}
                dropDownContainerStyle={[{ borderWidth: 0 }]}
                style={[styles.input, { borderWidth: 0 }]}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Job Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Job Location"
                value={jobLocation}
                selectionColor={COLORS.primary}
                onChangeText={(text) => setJobLocation(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Job Salary</Text>
              <TextInput
                style={styles.input}
                placeholder="Job Salary"
                autoCapitalize="none"
                keyboardType="numeric"
                value={jobSalary}
                selectionColor={COLORS.primary}
                onChangeText={(text) => setJobSalary(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Job Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Job Description"
                value={jobDescription}
                multiline
                numberOfLines={7}
                selectionColor={COLORS.primary}
                onChangeText={(text) => setJobDescription(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formText}>Job Qualifications</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Job Qualifications (comma-separated)"
                value={jobQualifications}
                multiline
                numberOfLines={7}
                selectionColor={COLORS.primary}
                onChangeText={(text) => setJobQualifications(text)}
              />
            </View>

            <Pressable
              style={styles.buttonApply}
              onPress={() => AddJobVacancy()}
            >
              <Text style={styles.buttonApplyText}>ADD VACANCY</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <BottomMenu
        focused="Add Vacancy"
        navigationHandle={navigation}
        userLogin={userLogin}
      />
    </SafeAreaView>
  );
};

export default AddVacancy;

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
