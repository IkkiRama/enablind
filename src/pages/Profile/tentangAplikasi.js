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
              designed to support the blind and visually impaired in their job
              search. This app ensures to bring the concept of remote work
              whereby every job seeker with visual disabilities has equal access
              to job opportunities without having to face travel or physical
              mobility constraints. With Enablind, users can feel confident in
              finding jobs that match their interests, skills and abilities
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
