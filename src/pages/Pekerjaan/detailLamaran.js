import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, update } from "firebase/database";
import { FontAwesome5 } from "@expo/vector-icons";

import { db } from "../../configs/firebase";
import { COLORS, SAFEAREAVIEW } from "../../constants";
import {
  CekAuth,
  JourneyApplication,
  MyInformation,
  Navbar,
} from "../../components";

const DetailLamaran = ({ navigation, route }) => {
  const auth = getAuth();
  const height = Dimensions.get("window").height;
  const { dataLamaran, dataPekerjaan, id } = route.params;

  const tabs = ["My Information", "Journey Application"];
  const [activeTab, setActiveTab] = useState("My Information");

  const displayTabContent = () => {
    switch (activeTab) {
      case "My Information":
        return (
          <MyInformation title="My Information" data={dataLamaran ?? ["N/A"]} />
        );
      case "Journey Application":
        return (
          <JourneyApplication
            title="Journey Application"
            data={dataLamaran ?? ["Application has no history"]}
          />
        );
    }
  };

  const RejectApplication = () => {
    if (dataLamaran["Status Lamaran"].status === "Rejected") {
      Alert.alert("You've already rejected this job application!");
    } else {
      Alert.alert(
        "Are you sure?",
        "Are you sure you will reject this job application?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              const DataUpdated = {
                "Status Lamaran": {
                  status: "Rejected",
                  tempat: "",
                },
                education: dataLamaran["education"],
                email: dataLamaran["email"],
                experience: dataLamaran["experience"],
                houseAddress: dataLamaran["houseAddress"],
                id_pekerjaan: dataLamaran["id_pekerjaan"],
                nama: dataLamaran["nama"],
                phoneHumber: dataLamaran["phoneHumber"],
                summary: dataLamaran["summary"],
              };

              update(ref(db, "Lamaran Kerja"), {
                [id]: DataUpdated,
              });

              Alert.alert(
                "You have successfully rejected this job application!"
              );
              navigation.replace("CompanyVacancy");
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    }
  };

  const UpdateStatusLamaran = () => {
    if (dataLamaran["Status Lamaran"].status === "Pending for Interview") {
      return navigation.navigate("Form Interview", {
        dataLamaran,
        dataPekerjaan,
        id,
      });
    } else if (
      dataLamaran["Status Lamaran"].status === "Invited to Interview"
    ) {
      Alert.alert(
        "Are you sure?",
        "Are you sure you will accept this job application?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              const DataUpdated = {
                "Status Lamaran": {
                  status: "Job Application Accepted",
                  tempat: "",
                },
                education: dataLamaran["education"],
                email: dataLamaran["email"],
                experience: dataLamaran["experience"],
                houseAddress: dataLamaran["houseAddress"],
                id_pekerjaan: dataLamaran["id_pekerjaan"],
                nama: dataLamaran["nama"],
                phoneHumber: dataLamaran["phoneHumber"],
                summary: dataLamaran["summary"],
              };

              update(ref(db, "Lamaran Kerja"), {
                [id]: DataUpdated,
              });

              Alert.alert(
                "You have successfully accepted this job application!"
              );
              navigation.replace("CompanyVacancy");
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    }
  };

  const RenderElement = (userLogin) => {
    return (
      <SafeAreaView style={SAFEAREAVIEW.style}>
        <Navbar
          isBack={true}
          goBack={() => navigation.goBack()}
          isTitle="Detail Application"
        ></Navbar>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar
            translucent
            barStyle={"light-content"}
            backgroundColor="transparent"
          ></StatusBar>

          <View style={styles.mainWrapper(height)}>
            <View style={styles.jobInformationWrapper}>
              <View style={styles.imageJobContainer}>
                <Image
                  style={styles.imageJob}
                  source={{ uri: dataPekerjaan["Image Company"] }}
                ></Image>
              </View>
              <View style={styles.jobInformation}>
                <Text style={styles.jobTitle}>
                  {dataPekerjaan["Job Title"]}
                </Text>
                <Text style={styles.company}>{dataPekerjaan["Company"]}</Text>
                <Text style={styles.statusApplication}>
                  Status : {dataLamaran["Status Lamaran"].status}
                </Text>

                {dataLamaran["Status Lamaran"].tempat !== "" ? (
                  <View style={styles.PlaceForInterview}>
                    <Text style={styles.statusApplication}>
                      Place for Interview
                    </Text>
                    <Text style={styles.interviewApplication}>
                      {dataLamaran["Status Lamaran"].tempat}
                    </Text>
                  </View>
                ) : (
                  ""
                )}
              </View>
            </View>

            {/* <View style={styles.tabContainer}>
            {tabs.map((tab, i) => (
              <Pressable
                key={i}
                style={styles.tabButton(activeTab, tab)}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={styles.tabText}>{tab}</Text>
              </Pressable>
            ))}
          </View> */}

            <View style={styles.displayTabContentContainer}>
              <View style={styles.displayTabContent}>
                {displayTabContent()}
              </View>
            </View>
          </View>
        </ScrollView>

        {userLogin?.role === "company" ? (
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => RejectApplication()}
              style={styles.buttonReject}
            >
              <FontAwesome5 name="trash" size={24} color={COLORS.lightWhite} />
            </Pressable>

            <Pressable
              disabled={
                dataLamaran["Status Lamaran"].status === "Rejected"
                  ? true
                  : false
              }
              onPress={() => UpdateStatusLamaran()}
              style={styles.buttonProses(dataLamaran["Status Lamaran"].status)}
            >
              {dataLamaran["Status Lamaran"].status ===
              "Pending for Interview" ? (
                <Text style={styles.buttonProsesText}>CALL FOR INTERVIEW</Text>
              ) : (
                ""
              )}
              {dataLamaran["Status Lamaran"].status === "Rejected" ? (
                <Text style={styles.buttonProsesText}>
                  YOU'VE ALREADY REJECTED
                </Text>
              ) : (
                ""
              )}
              {dataLamaran["Status Lamaran"].status ===
              "Job Application Accepted" ? (
                <Text style={styles.buttonProsesText}>
                  YOU'VE ALREADY ACCEPTED
                </Text>
              ) : (
                ""
              )}
              {dataLamaran["Status Lamaran"].status ===
              "Invited to Interview" ? (
                <Text style={styles.buttonProsesText}>ACCEPT APPLICANTS</Text>
              ) : (
                ""
              )}
            </Pressable>
          </View>
        ) : (
          ""
        )}
      </SafeAreaView>
    );
  };

  return RenderElement(CekAuth());
};

export default DetailLamaran;

const styles = StyleSheet.create({
  mainWrapper: (height) => ({
    minHeight: height,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightWhite,
  }),

  jobInformationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  imageJobContainer: {
    width: "20%",
    // marginRight: 15,
  },
  imageJob: {
    width: 70,
    height: 70,
  },
  jobInformation: {
    width: "80%",
    paddingHorizontal: 10,
  },
  jobTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "700",
  },
  company: {
    fontSize: 16,
    marginBottom: 10,
  },

  PlaceForInterview: {
    marginTop: 10,
  },
  statusApplication: {
    fontSize: 17,
  },

  interviewApplication: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: "600",
  },

  tabContainer: { marginBottom: 20, flexDirection: "row" },

  tabButton: (activeTab, tab) => ({
    width: "45%",
    borderRadius: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: activeTab === tab ? COLORS.primary : "#F3F4F8",
  }),
  tabText: {
    fontSize: 15,
    fontWeight: "500",
  },

  displayTabContent: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: COLORS.white,
  },

  buttonContainer: {
    padding: 10,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
  buttonReject: {
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: COLORS.diskon,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonProses: (StatusLamaran) => ({
    flex: 1,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor:
      StatusLamaran === "Rejected" ||
      StatusLamaran === "Job Application Accepted"
        ? COLORS.gray2
        : COLORS.primary,
  }),

  buttonProsesText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
