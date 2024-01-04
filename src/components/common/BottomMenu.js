import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons, Foundation, Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOWS } from "../../constants";

const BottomMenu = ({ focused, navigationHandle, userLogin }) => {
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
      {userLogin?.role === "company" ? (
        <TouchableOpacity
          style={styles.menuButton(userLogin?.role)}
          onPress={() => navigationHandle.navigate("CompanyVacancy")}
        >
          <MaterialIcons
            name="work"
            size={24}
            color={focused === "Pekerjaan" ? COLORS.primary : COLORS.gray}
          />

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
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.menuButton(userLogin?.role)}
          onPress={() => navigationHandle.navigate("Pekerjaan")}
        >
          <MaterialIcons
            name="work"
            size={24}
            color={focused === "Pekerjaan" ? COLORS.primary : COLORS.gray}
          />
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
        </TouchableOpacity>
      )}

      {userLogin?.role === "company" ? (
        <TouchableOpacity
          style={[styles.menuButton(userLogin?.role), styles.spesialButton]}
          onPress={() => navigationHandle.navigate("Add Vacancy")}
        >
          <Ionicons
            name="ios-add-circle-outline"
            size={24}
            style={styles.addLowongan(focused)}
          />
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

  menuButton: (role) => ({
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: role === "company" ? "20%" : "25%",
  }),
  menuTextButton: {
    fontWeight: "600",
  },
  addLowongan: (focused) => ({
    fontSize: 50,
    fontWeight: "600",
    color: focused === "Add Vacancy" ? COLORS.primary : COLORS.gray,
    // transform: [{ translateX: 2 }],
  }),
});
