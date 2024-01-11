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
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { AllJobs, BottomMenu, CekAuth, Navbar } from "../../components";

import { COLORS, SAFEAREAVIEW } from "../../constants";
import { db } from "../../configs/firebase";

const SavedJobs = ({ navigation }) => {
  const auth = getAuth();
  const minHeightPage = Dimensions.get("window").height;
  const [pekerjaanTersimpan, setPekerjaanTersimpan] = useState([]);

  useEffect(() => {
    if (auth.currentUser !== null) {
      return onValue(ref(db, "Pekerjaan Tersimpan"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataPekerjaanTersimpan = { ...data };
        setPekerjaanTersimpan(dataPekerjaanTersimpan);
      });
    }
  }, []);

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar></Navbar>
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
