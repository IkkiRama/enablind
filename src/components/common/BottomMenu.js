import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons, Foundation, Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ref, push, onValue, update } from "firebase/database";

import { db } from "../../configs/firebase";
import { COLORS, SHADOWS } from "../../constants";
const BottomMenu = ({ focused, navigationHandle }) => {
  const auth = getAuth();
  let userLogin;
  const [dataUser, setDataUser] = useState({});
  const dataUserKeys = Object.keys(dataUser);

  useEffect(() => {
    if (auth.currentUser != null) {
      return onValue(ref(db, "User"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataUser = { ...data };
        setDataUser(dataUser);
      });
    }
  }, []);

  dataUserKeys.map((key) => {
    if (dataUser[key].email === auth.currentUser.email) {
      JSON.stringify((userLogin = dataUser[key]));
    }
  });

  return (
    <View style={styles.menuWraper}>
      <TouchableOpacity
        style={styles.menuButton(userLogin?.role)}
        onPress={() => navigationHandle.navigate("Beranda")}
      >
        <Foundation
          name="home"
          size={24}
          color={focused === "Beranda" ? COLORS.primary : COLORS.gray}
        />
        <Text
          style={[
            styles.menuTextButton,
            {
              color: focused === "Beranda" ? COLORS.primary : COLORS.gray,
            },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton(userLogin?.role)}
        onPress={() =>
          navigationHandle.navigate(
            userLogin?.role === "company" ? "CompanyVacancy" : "Pekerjaan"
          )
        }
      >
        <MaterialIcons
          name="work"
          size={24}
          color={focused === "Pekerjaan" ? COLORS.primary : COLORS.gray}
        />

        {userLogin?.role === "company" ? (
          <Text
            style={[
              styles.menuTextButton,
              {
                color: focused === "Pekerjaan" ? COLORS.primary : COLORS.gray,
              },
            ]}
          >
            Vacancy
          </Text>
        ) : (
          <Text
            style={[
              styles.menuTextButton,
              {
                color: focused === "Pekerjaan" ? COLORS.primary : COLORS.gray,
              },
            ]}
          >
            Jobs
          </Text>
        )}
      </TouchableOpacity>

      {userLogin?.role === "company" ? (
        <TouchableOpacity
          style={[styles.menuButton(userLogin?.role), styles.spesialButton]}
          onPress={() => navigationHandle.navigate("Artikel")}
        >
          <Ionicons name="add" size={24} style={styles.addLowongan} />
        </TouchableOpacity>
      ) : (
        ""
      )}

      <TouchableOpacity
        style={styles.menuButton(userLogin?.role)}
        onPress={() => navigationHandle.navigate("Artikel")}
      >
        <MaterialIcons
          name="article"
          size={24}
          color={focused === "Artikel" ? COLORS.primary : COLORS.gray}
        />
        <Text
          style={[
            styles.menuTextButton,
            {
              color: focused === "Artikel" ? COLORS.primary : COLORS.gray,
            },
          ]}
        >
          Article
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton(userLogin?.role)}
        onPress={() => navigationHandle.navigate("Profile")}
      >
        <Ionicons
          name="person"
          size={24}
          color={focused === "Profile" ? COLORS.primary : COLORS.gray}
        />
        <Text
          style={[
            styles.menuTextButton,
            {
              color: focused === "Profile" ? COLORS.primary : COLORS.gray,
            },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenu;

const styles = StyleSheet.create({
  menuWraper: {
    width: "100%",
    // height: 50,
    flexDirection: "row",
    backgroundColor: COLORS.lightWhite,
    elevation: 15,
  },
  spesialButton: {
    height: (20 / 100) * Dimensions.get("window").width,
    borderRadius: 50,
    // transform: [{ translateY: -15 }],
    backgroundColor: COLORS.primary,
    paddingVertical: 0,
    justifyContent: "center",
  },
  menuButton: (role) => ({
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: role === "company" ? "20%" : "25%",
  }),
  menuTextButton: {
    fontWeight: "600",
  },
  addLowongan: {
    fontSize: 50,
    fontWeight: "600",
    color: COLORS.font,
    transform: [{ translateX: 2 }],
  },
});
