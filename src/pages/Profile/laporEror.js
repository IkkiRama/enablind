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
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ref, push, onValue } from "firebase/database";

import { COLORS, SAFEAREAVIEW } from "../../constants";
import { Navbar, BottomMenu, CekAuth } from "../../components";
import { db } from "../../configs/firebase";

const LaporEror = ({ navigation }) => {
  const auth = getAuth();
  useEffect(() => {
    if (auth.currentUser == null) {
      Alert.alert("You are not logged in yet, please login first");
      return navigation.replace("Login");
    }
  }, []);

  return (
    <RenderElement
      navigation={navigation}
      userLogin={CekAuth()}
    ></RenderElement>
  );
};

const RenderElement = ({ userLogin, navigation }) => {
  const [judul, setJudul] = useState("");
  const [message, setMessage] = useState("");

  const resetData = () => {
    setJudul("");
    setMessage("");
  };

  const submitLaporan = () => {
    if (judul.trim() === "" || message.trim() == "") {
      Alert.alert("Error", "Please fill in all data!");
    } else {
      push(ref(db, "Laporan"), {
        nama: userLogin.nama,
        email: userLogin.email,
        judul,
        message,
      });
      resetData();
      Alert.alert(
        "Report sent successfully",
        "We will answer as soon as possible via email 😊"
      );
      navigation.replace("Profile");
    }
  };

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar
        isBack={true}
        goBack={() => navigation.goBack()}
        isTitle="Report error"
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
            <View style={styles.formContainer}>
              <View style={styles.perForm}>
                <Text style={styles.formText}>Title error</Text>
                <KeyboardAvoidingView>
                  <TextInput
                    value={judul}
                    style={styles.textInput}
                    placeholder="Enter your error title..."
                    onChangeText={(value) => setJudul(value)}
                  ></TextInput>
                </KeyboardAvoidingView>
              </View>

              <View style={styles.perForm}>
                <Text style={styles.formText}>
                  What kind of error occurred?
                </Text>
                <KeyboardAvoidingView>
                  <TextInput
                    value={message}
                    multiline={true}
                    numberOfLines={4}
                    style={[styles.textInput, { textAlignVertical: "top" }]}
                    placeholder="Enter your error message..."
                    onChangeText={(value) => setMessage(value)}
                  ></TextInput>
                </KeyboardAvoidingView>
              </View>

              <Pressable style={styles.ctaKirim} onPress={submitLaporan}>
                <Text style={styles.ctaKirimText}>Send</Text>
              </Pressable>
            </View>
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

export default LaporEror;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  perForm: {
    marginVertical: 7,
  },
  formText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.font,
    marginBottom: 5,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.borderColor,
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.font,
  },
  ctaKirim: {
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  ctaKirimText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.lightWhite,
  },
});
