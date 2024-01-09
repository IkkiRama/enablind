import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { ref, push } from "firebase/database";

import { COLORS } from "../../constants";
import { db } from "../../configs/firebase";
const backImage = require("../../../assets/Images/backImage.png");

const Register = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const reset = () => {
    // Reset the state of our inputs after logging in or out
    setNama("");
    setEmail("");
    setPassword("");
  };

  const validation = () => {
    if (nama.trim() === "" || email.trim() === "" || password.trim() === "") {
      Alert.alert("Please fill in all data");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Please enter the correct email");
      return false;
    }

    if (password.length <= 8) {
      Alert.alert("Please fill in a password of at least 8 characters");
      return false;
    }

    return true;
  };

  const onHandleSignup = () => {
    if (validation()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          push(ref(db, "User"), {
            nama,
            email,
            password,
            role: "user",
          });
          reset();
          Alert.alert("You have successfully registered!");
          return navigation.replace("Beranda");
        })
        .catch((error) => {
          if (error.message == "Firebase: Error (auth/email-already-in-use).") {
            Alert.alert("Email is already in use!");
          } else {
            Alert.alert(error.message);
          }
        });
    } else {
      Alert.alert("You failed to register, please try again!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet}>
        <SafeAreaView style={styles.form}>
          <Text style={styles.title}>Sign in to Enablind</Text>

          <KeyboardAvoidingView>
            <TextInput
              style={styles.input}
              placeholder="Name"
              autoCapitalize="none"
              autoFocus={true}
              value={nama}
              onChangeText={(text) => setNama(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.lightWhite,
                fontSize: 18,
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{ color: COLORS.gray, fontWeight: "600", fontSize: 14 }}
            >
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                {" "}
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary,
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: COLORS.borderColor,
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 270,
  },
  whiteSheet: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 60,
    marginTop: -100,
    paddingTop: 20,
  },
  form: {
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
