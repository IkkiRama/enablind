import {
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { COLORS } from "../../constants";
import { db } from "../../configs/firebase";
import Search from "../../../assets/Icons/search.svg";

const Navbar = ({
  isBack,
  goBack,
  withForm = false,
  isTitle = null,
  goHome,
  isFromHome = false,
  isArtikel = false,
  isHomePage = false,
  changeFontSize,
  setChangeFontSize,
  smallMessage,
  mainMessage,
  navigation,
  isShowNotifikasiPage = true,
}) => {
  const auth = getAuth();
  const [notifikasi, setNotifikasi] = useState([]);
  const [lamaran, setLamaran] = useState([]);

  const lamaranUserLoginID = [];
  const notifikasiUserLoginID = [];

  useEffect(() => {
    if (auth.currentUser !== null) {
      onValue(ref(db, "Notifikasi"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataNotifikasi = { ...data };
        setNotifikasi(dataNotifikasi);
      });

      return onValue(ref(db, "Lamaran Kerja"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataLamaran = { ...data };
        setLamaran(dataLamaran);
      });
    }
  }, []);

  Object.keys(lamaran).map((id_lamaran) => {
    if (lamaran[id_lamaran]["email"] === auth.currentUser.email) {
      lamaranUserLoginID.push(id_lamaran);
    }
  });

  Object.keys(notifikasi).map((id_notifikasi) => {
    if (lamaranUserLoginID.includes(notifikasi[id_notifikasi]["id_lamaran"])) {
      notifikasiUserLoginID.push(id_notifikasi);
    }
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isBack ? (
          <Pressable
            accessible={true}
            accessibilityLabel="back"
            accessibilityRole="button"
            onPress={isFromHome ? goHome : goBack}
          >
            <FontAwesome name="chevron-left" size={24} color={COLORS.font} />
          </Pressable>
        ) : isHomePage ? (
          <View
            accessible={true}
            accessibilityLabel="This is navbar"
            accessibilityRole="header"
          >
            <Text style={{ fontSize: 14 }}>{smallMessage}</Text>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {mainMessage}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: 22, fontWeight: "700", marginLeft: 10 }}>
              Enablind
            </Text>
          </View>
        )}

        {/* Search */}
        {withForm ? (
          <KeyboardAvoidingView
            behavior="padding"
            style={{ width: "75%", position: "relative" }}
          >
            <TextInput
              placeholder="Mau Cari apa..."
              style={{
                // paddingHorizontal: 20,
                paddingLeft: 25,
                paddingVertical: 3,
                borderRadius: 8,
                borderWidth: 0.7,
                borderColor: COLORS.borderColor,
                backgroundColor: COLORS.white,
                elevation: 2,
                color: "#212121",
                fontSize: 16,
                fontWeight: "500",
              }}
            ></TextInput>
            <Search style={{ position: "absolute", top: 6, left: 3 }}></Search>
          </KeyboardAvoidingView>
        ) : (
          ""
        )}
      </View>

      {isTitle !== null ? (
        <Text
          accessible={true}
          accessibilityLabel={isTitle}
          accessibilityRole="header"
          style={{
            color: COLORS.font,
            fontWeight: "600",
            fontSize: 21,
          }}
        >
          {isTitle}
        </Text>
      ) : (
        ""
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isArtikel ? (
          <Pressable
            accessibilityLabel="Change font size"
            accessibilityRole="button"
            onPress={() => setChangeFontSize(!changeFontSize)}
            style={{ marginRight: 15 }}
          >
            <MaterialIcons name="text-fields" size={24} color={COLORS.font} />
          </Pressable>
        ) : (
          ""
        )}

        {isShowNotifikasiPage ? (
          <Pressable
            accessible={true}
            accessibilityLabel="notification"
            accessibilityRole="button"
            onPress={() => navigation.navigate("Notifikasi")}
            style={{
              borderRadius: 50,
              position: "relative",
              marginRight: 5,
            }}
          >
            <Ionicons
              name="ios-notifications-outline"
              size={25}
              color={COLORS.font}
            />
            {auth.currentUser !== null && notifikasiUserLoginID.length > 0 ? (
              <View
                style={{
                  width: 18,
                  height: 18,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: -3,
                  left: 12,
                  borderRadius: 5,
                  backgroundColor: COLORS.merah,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 11,
                    fontWeight: "600",
                  }}
                >
                  {notifikasiUserLoginID.length <= 9
                    ? notifikasiUserLoginID.length
                    : "9+"}
                </Text>
              </View>
            ) : (
              ""
            )}
          </Pressable>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default Navbar;
