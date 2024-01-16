import {
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import {
  JobDescriptions,
  JobTabs,
  Navbar,
  Qualifications,
  OtherInfo,
  ApplicantsPerJob,
  CekAuth,
} from "../../components";

import { COLORS, SAFEAREAVIEW, SHADOWS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
const DetailJob = ({ route, navigation }) => {
  return (
    <RenderElement
      route={route}
      navigation={navigation}
      userLogin={CekAuth()}
    ></RenderElement>
  );
};

const RenderElement = ({ route, navigation, userLogin }) => {
  const { data, id, isCompany } = route.params;
  const [user, setUser] = useState(null);
  const tabs = isCompany
    ? ["Detail", "Applicants"]
    : ["Descriptions", "Qualifications", "Other info"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const otherInfo = {
    "Job Salary": data["Job Salary"],
    "Job Type": data["Type Job"],
    "Job Publish Date": data["Job Publish Date"],
  };

  useEffect(() => {
    setUser(userLogin);
  }, [userLogin]);

  const displayTabContent = () => {
    if (isCompany) {
      switch (activeTab) {
        case "Detail":
          return (
            <>
              <JobDescriptions
                title="Job Description"
                data={data["Job Description"] ?? ["Job has no description"]}
              />
              <Qualifications
                title="Qualification"
                data={data["Job Qualifications"] ?? ["N/A"]}
              />
              <OtherInfo
                title="Other info"
                data={Object.entries(otherInfo) ?? ["N/A"]}
              />
            </>
          );
        case "Applicants":
          return (
            <ApplicantsPerJob
              data={data}
              id={id}
              navigation={navigation}
            ></ApplicantsPerJob>
          );
      }
    } else {
      switch (activeTab) {
        case "Qualifications":
          return (
            <Qualifications
              title="Qualification"
              data={data["Job Qualifications"] ?? ["N/A"]}
            />
          );
        case "Descriptions":
          return (
            <JobDescriptions
              title="Job Description"
              data={data["Job Description"] ?? ["Job has no description"]}
            />
          );
        case "Other info":
          return (
            <OtherInfo
              title="Other info"
              data={Object.entries(otherInfo) ?? ["N/A"]}
            />
          );
      }
    }
  };

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar
        navigation={navigation}
        isBack={true}
        goBack={() => navigation.goBack()}
      ></Navbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.mainWrapper}>
          <View style={styles.container}>
            {/* Logo, nama pekerjaan dan perusahaan */}
            <View style={styles.infoJob}>
              {data["Image Company"] === "" ||
              data["Image Company"] === undefined ||
              data["Image Company"] === null ? (
                <View style={[styles.infoJobImage, styles.fotoDefaultUser]}>
                  <Ionicons
                    name="person"
                    size={30}
                    color={COLORS.colorShadow}
                  />
                </View>
              ) : (
                <Image
                  accessible={true}
                  accessibilityLabel="Image company"
                  accessibilityRole="image"
                  style={styles.infoJobImage}
                  source={{
                    uri: data["Image Company"],
                  }}
                ></Image>
              )}
              <Text
                accessible={true}
                accessibilityLabel={data["Job Title"]}
                style={styles.infoJobTitle}
              >
                {data["Job Title"]}
              </Text>
              <Text
                accessible={true}
                accessibilityLabel={data["Company"]}
                style={styles.infoJobCompany}
              >
                {data["Company"]}
              </Text>
            </View>
            {/* Descriptions, Qualifications, Other info */}
            <JobTabs
              activeTab={activeTab}
              tabs={tabs}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {user?.role === "user" || user?.role === undefined ? (
          <Pressable
            accessible={true}
            accessibilityLabel="apply job"
            accessibilityRole="button"
            style={styles.buttonApply}
            onPress={() =>
              navigation.navigate("FormApplay", {
                id,
                data,
              })
            }
          >
            <Text style={styles.buttonApplyText}>APPLY NOW</Text>
          </Pressable>
        ) : (
          ""
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetailJob;

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 2,
    ...SHADOWS.medium,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightWhite,
    borderRadius: 20,
  },
  buttonApply: {
    padding: 17,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
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

  fotoDefaultUser: {
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  infoJob: {
    paddingBottom: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.borderColor,
  },
  infoJobImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoJobTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  infoJobCompany: {
    fontSize: 18,
    textAlign: "center",
  },
});
