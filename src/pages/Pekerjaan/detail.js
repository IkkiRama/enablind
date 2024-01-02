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
import { useState } from "react";
import {
  JobDescriptions,
  JobTabs,
  Navbar,
  Qualifications,
  OtherInfo,
} from "../../components";

import { COLORS, SAFEAREAVIEW, SHADOWS } from "../../constants";
const DetailJob = ({ route, navigation }) => {
  const { data, id, isCompany } = route.params;
  const tabs = isCompany
    ? ["Detail", "Applicants"]
    : ["Descriptions", "Qualifications", "Other info"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const otherInfo = {
    "Job Salary": data["Job Salary"],
    "Job Type": data["Type Job"],
    "Job Publish Date": data["Job Publish Date"],
  };

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
          return <Text>ASU</Text>;
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
      <Navbar isBack={true} goBack={() => navigation.goBack()}></Navbar>
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
              <Image
                style={styles.infoJobImage}
                source={{
                  uri: data["Image Company"],
                }}
              ></Image>
              <Text style={styles.infoJobTitle}>{data["Job Title"]}</Text>
              <Text style={styles.infoJobCompany}>{data["Company"]}</Text>
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
        {!isCompany ? (
          <Pressable
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
