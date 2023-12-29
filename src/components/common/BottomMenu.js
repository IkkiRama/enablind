import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  MaterialIcons,
  Foundation,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { COLORS, SHADOWS } from "../../constants";
const BottomMenu = ({ focused, navigationHandle }) => {
  return (
    <View style={styles.menuWraper}>
      <TouchableOpacity
        style={styles.menuButton}
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
          Beranda
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
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
          Pekerjaan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
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
          Artikel
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
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
    paddingVertical: 10,
    backgroundColor: COLORS.lightWhite,
    elevation: 15,
    flexDirection: "row",
  },
  menuButton: {
    width: "25%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  menuTextButton: {
    fontWeight: "600",
  },
});
