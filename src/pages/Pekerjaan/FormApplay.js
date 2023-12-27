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
const FormApplay = ({ navigation }) => {
  const applyJob = () => {
    navigation.navigate("Pekerjaan");
  };
  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar
        isBack={true}
        goBack={() => navigation.goBack()}
        isTitle="CV Maker"
      ></Navbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.mainWrapper}>
          <View style={styles.container}></View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonApply} onPress={() => applyJob()}>
          <Text style={styles.buttonApplyText}>APPLY</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default FormApplay;

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
});
