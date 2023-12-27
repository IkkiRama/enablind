import {
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
import {
  JobDescriptions,
  JobTabs,
  Navbar,
  Qualifications,
  OtherInfo,
} from "../../components";
import { COLORS, SAFEAREAVIEW, SIZES, SHADOWS } from "../../constants";
const DetailJob = ({ navigation }) => {
  const tabs = ["Descriptions", "Qualifications", "Other info"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus vero harum aut dicta, eaque repellat. Quam sit nobis eius. Eos sit illum non natus ea veritatis voluptates fugiat doloribus neque adipisci dolore nisi quaerat corrupti fugit obcaecati commodi, odio hic exercitationem nobis ipsam debitis atque placeat. Facilis, autem. Quae, unde.";
  const qualifications = [
    "Kemampuan organisasi yang baik",
    "Komunikasi yang efektif",
    "Penguasaan teknologi asisten virtual seperti perangkat lunak pembaca layar",
  ];
  const otherInfo = {
    "Job Salary": 6000000,
    "Job Type": "Full-time",
    "Job Publish Date": "19-09-2023",
    "Job Close Date": "20-12-2023",
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Qualifications
            title="Qualification"
            data={qualifications ?? ["N/A"]}
          />
        );
      case "Descriptions":
        return (
          <JobDescriptions
            title="Job Description"
            data={description ?? ["Job has no description"]}
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
  };

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar></Navbar>
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
                  uri: "https://media.licdn.com/dms/image/C4D0BAQHCmfKRtPXKDg/company-logo_100_100/0/1658813682786/gojek_logo?e=1711584000&v=beta&t=uCPSb0bbTB3Z1OTHflnVtDS_PqpO5rItxDUkidBhz1w",
                }}
              ></Image>
              <Text style={styles.infoJobTitle}>Operator Telepon</Text>
              <Text style={styles.infoJobCompany}>Bank BCA</Text>
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
        <Pressable style={styles.buttonApply}>
          <Text style={styles.buttonApplyText}>APPLY NOW</Text>
        </Pressable>
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
  },
  buttonApply: {
    padding: 17,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },

  buttonApplyText: {
    fontSize: 17,
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
  },
  infoJobCompany: {
    fontSize: 18,
  },
});
