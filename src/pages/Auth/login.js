import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";

import { COLORS } from "../../constants";
const backImage = require("../../../assets/Images/backImage.png");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClick, setIsClick] = useState(false);

  const auth = getAuth();

  const reset = () => {
    // Reset the state of our inputs after logging in or out
    setEmail("");
    setPassword("");
  };

  const validation = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Please fill in all data");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Please enter the correct email");
      return false;
    }

    return true;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (validation === false) {
        if (user) {
          Alert.alert("You are already logged in");
          navigation.replace("Beranda");
        }
      }
    });
  }, []);

  const onHandleLogin = () => {
    if (validation()) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          reset();
          Alert.alert("You have successfully logged in");
          return navigation.replace("Beranda");
        })
        .catch((error) => {
          if (error.message == "Firebase: Error (auth/user-not-found).") {
            Alert.alert("User not found!");
          } else {
            Alert.alert(error.message);
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet}>
        <SafeAreaView style={styles.form}>
          <Text style={styles.title}>Login to your account</Text>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
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
          <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.lightWhite,
                fontSize: 18,
              }}
            >
              Login
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
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default Login;

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
