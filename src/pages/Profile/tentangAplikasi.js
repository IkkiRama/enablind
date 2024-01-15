import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Pressable,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState } from "react";

import { COLORS, SAFEAREAVIEW, SHADOWS } from "../../constants";
import { Navbar, BottomMenu, CekAuth } from "../../components";

const TentangAplikasi = ({ navigation }) => {
  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar
        isBack={true}
        goBack={() => navigation.goBack()}
        isTitle="About enablind"
        navigation={navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.containerWrapper}>
          <View style={styles.container}>
            <View style={styles.imageTentangAplikasiContainer}>
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/react-native-crud-fireba-ea6c9.appspot.com/o/Enablind%2Ficon.png?alt=media&token=d97bef32-1681-4b4d-943b-30f36189c101",
                }}
                style={styles.imageTentangAplikasi}
              />
            </View>
            <Text style={styles.filosofiAplikasi}>
              Enablind is an innovative and inclusive mobile app specifically
              designed to support people with disabilities especially the blind
              and visually impaired in their job search. The app also has a
              remote working concept where every job seeker with a visual
              disability has equal access to employment opportunities without
              having to face the constraints of travel or physical mobility.
              With Enablind, users can feel confident in finding a job that
              suits their interests, skills and abilities.
            </Text>
          </View>
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

export default TentangAplikasi;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    padding: 30,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    padding: 30,
    ...SHADOWS.medium,
    elevation: 2,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  imageTentangAplikasiContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageTentangAplikasi: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  filosofiAplikasi: {
    fontSize: 20,
    lineHeight: 28,
  },
});
