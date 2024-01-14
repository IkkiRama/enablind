import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React from "react";
import { AllJobs, BottomMenu, CekAuth, Navbar } from "../../components";

import { COLORS, SAFEAREAVIEW } from "../../constants";

const SavedJobs = ({ navigation }) => {
  const minHeightPage = Dimensions.get("window").height;

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
          <Text style={styles.title}>My Saved Jobs</Text>
          <AllJobs navigation={navigation} isSavedJobPage={true} />
        </View>
      </ScrollView>
      <BottomMenu
        focused="Profile"
        navigationHandle={navigation}
        userLogin={CekAuth()}
      />
    </SafeAreaView>
  );
};

export default SavedJobs;

const styles = StyleSheet.create({
  mainWrapper: (minHeightPage) => ({
    paddingTop: 15,
    paddingHorizontal: 10,
    minHeight: minHeightPage - 100,
    backgroundColor: COLORS.lightWhite,
  }),
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
});
