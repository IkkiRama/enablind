import {
  Text,
  View,
  StatusBar,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
  AllJobs,
  BottomMenu,
  CekAuth,
  MyApplication,
  Navbar,
} from "../../components";
import { COLORS, SAFEAREAVIEW } from "../../constants";

const Pekerjaan = ({ navigation }) => {
  const minHeightPage = Dimensions.get("window").height;

  const jobApplication = ["All Jobs", "My Application"];
  const [jobApplicationActive, setJobApplicationActive] = useState("All Jobs");

  const displayTabContent = () => {
    switch (jobApplicationActive) {
      case "All Jobs":
        return <AllJobs navigation={navigation} />;
      case "My Application":
        return <MyApplication navigation={navigation} />;
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

        <View style={styles.mainWrapper(minHeightPage)}>
          <View style={styles.mainJobApplicationWrapper}>
            {jobApplication.map((perJobApplication, i) => (
              <Pressable
                onPress={() => setJobApplicationActive(perJobApplication)}
                style={styles.JobApplicationButton(
                  perJobApplication,
                  jobApplicationActive
                )}
                key={i}
              >
                <Text style={styles.JobApplicationText}>
                  {perJobApplication}
                </Text>
              </Pressable>
            ))}
          </View>

          {displayTabContent()}
        </View>
      </ScrollView>
      <BottomMenu
        focused="Pekerjaan"
        navigationHandle={navigation}
        userLogin={CekAuth()}
      />
    </SafeAreaView>
  );
};

export default Pekerjaan;

const styles = StyleSheet.create({
  mainWrapper: (minHeightPage) => ({
    paddingTop: 15,
    paddingHorizontal: 10,
    minHeight: minHeightPage - 100,
    backgroundColor: COLORS.lightWhite,
  }),

  mainJobApplicationWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  JobApplicationButton: (jobApplicationActive, perJobApplication) => ({
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor:
      perJobApplication === jobApplicationActive
        ? COLORS.primary
        : COLORS.lightWhite,
    borderRadius: 10,
  }),
  JobApplicationText: {
    fontWeight: "600",
  },
});
