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
import { JourneyApplication, MyInformation, Navbar } from "../../components";
import { COLORS, SAFEAREAVIEW } from "../../constants";

const DetailLamaran = ({ navigation, route }) => {
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

        <View style={styles.mainWrapper}>
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
    </SafeAreaView>
  );
};

export default DetailLamaran;

const styles = StyleSheet.create({
  mainWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightWhite,
  },

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
});
