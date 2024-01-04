import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { COLORS, SAFEAREAVIEW } from "../../constants";
import { JourneyApplication, MyInformation, Navbar } from "../../components";

const DetailLamaran = ({ navigation, route }) => {
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
              <Text style={styles.jobTitle}>{dataPekerjaan["Job Title"]}</Text>
              <Text style={styles.company}>{dataPekerjaan["Company"]}</Text>
              <Text style={styles.statusApplication}>
                Status : {dataLamaran["Status Lamaran"].status}
              </Text>
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
            <View style={styles.displayTabContent}>{displayTabContent()}</View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonReject}>
          <FontAwesome5 name="trash" size={24} color={COLORS.lightWhite} />
        </View>

        <View style={styles.buttonProses}>
          <Text style={styles.buttonProsesText}>CALL FOR INTERVIEW</Text>
        </View>
      </View>
    </SafeAreaView>
  );
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
    marginRight: 15,
  },
  imageJob: {
    width: 70,
    height: 70,
  },
  jobInformation: {
    width: "80%",
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
  statusApplication: {
    fontSize: 17,
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
  buttonProses: {
    flex: 1,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },

  buttonProsesText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
