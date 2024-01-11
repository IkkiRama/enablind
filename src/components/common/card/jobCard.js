import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { onValue, push, ref, remove } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View, Pressable, Alert } from "react-native";

import { db } from "../../../configs/firebase";
import { COLORS, images } from "../../../constants";
import AktifMerekrut from "../../../../assets/Icons/aktif-merekrut.svg";

const RenderImage = ({ link }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  return (
    <Image
      onLoad={() => setIsLoadedImage(false)}
      style={styles.imageJob}
      source={
        isLoadedImage
          ? images.defaultBanner
          : {
              uri: link,
            }
      }
      resizeMode="contain"
    />
  );
};

const JobCard = ({ navigation, data, id, isCompany = false }) => {
  const auth = getAuth();
  const [cekBerkala, setCekBerkala] = useState(false);
  const [pekerjaanTersimpan, setPekerjaanTersimpan] = useState([]);
  const arrayIDPekerjaanTersimpan = [];

  useEffect(() => {
    if (auth.currentUser !== null) {
      return onValue(ref(db, "Pekerjaan Tersimpan"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataPekerjaanTersimpan = { ...data };
        setPekerjaanTersimpan(dataPekerjaanTersimpan);
      });
    }
  }, [cekBerkala]);

  const SaveJob = () => {
    if (auth.currentUser === null) {
      Alert.alert("You are not logged in yet, please login first");
      return navigation.replace("Login");
    } else {
      // add to db
      // cek nya pakai include
      const postData = {
        email: auth.currentUser.email,
        id_pekerjaan: id,
      };

      push(ref(db, "Pekerjaan Tersimpan"), postData);
      setCekBerkala(!cekBerkala);
    }
  };

  const RemoveSaveJob = () => {
    Object.keys(pekerjaanTersimpan).map((id_pekerjaan_tersimpan) => {
      if (pekerjaanTersimpan[id_pekerjaan_tersimpan]["id_pekerjaan"] === id) {
        remove(ref(db, `Pekerjaan Tersimpan/${id_pekerjaan_tersimpan}`));
        setCekBerkala(!cekBerkala);
      }
    });
  };

  Object.keys(pekerjaanTersimpan).map((id_pekerjaan_tersimpan) =>
    arrayIDPekerjaanTersimpan.push(
      pekerjaanTersimpan[id_pekerjaan_tersimpan]["id_pekerjaan"]
    )
  );

  return (
    <Pressable
      onPress={() => navigation.navigate("DetailJob", { data, id, isCompany })}
      style={styles.wrapper}
    >
      <RenderImage link={data["Image Company"]} />

      <View style={styles.infoJob}>
        {/* Title */}
        <View style={styles.textWrapper}>
          <View>
            <Text style={styles.titleJobText}>{data["Job Title"]}</Text>
            <Text style={styles.companyText}>{data["Company"]}</Text>
          </View>
          {isCompany ? (
            ""
          ) : arrayIDPekerjaanTersimpan.includes(id) ? (
            <Pressable onPress={RemoveSaveJob} style={styles.saveJobBTN}>
              <Ionicons name="ios-bookmark" size={25} color={COLORS.font} />
            </Pressable>
          ) : (
            <Pressable onPress={SaveJob} style={styles.saveJobBTN}>
              <Ionicons
                name="ios-bookmark-outline"
                size={25}
                color={COLORS.font}
              />
            </Pressable>
          )}
        </View>
        <Text style={styles.locationText}>{data["Job Location"]}</Text>

        <View style={styles.aktifMerekrut}>
          <AktifMerekrut
            width={27}
            height={27}
            style={styles.aktifMerekrutIcon}
          ></AktifMerekrut>
          <Text style={styles.aktifMerekrutText}>Aktif Merekrut</Text>
        </View>

        <View style={styles.infoPelamar}>
          <Text style={styles.infoPelamarText}>
            {data["Jumlah Pelamar"]} Pelamar
          </Text>

          <View style={styles.infoPelamarDot}></View>

          <View style={styles.melamarMudah}>
            <Image
              style={styles.icon}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/react-native-crud-fireba-ea6c9.appspot.com/o/Enablind%2FLogo%20Doang.png?alt=media&token=bc2b4da5-f72f-42ae-9cd2-b6c495c3cf26",
              }}
            ></Image>
            <Text style={styles.melamarMudahText}>Melamar Mudah</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    margin: 5,
  },
  imageJob: {
    width: "15%",
    height: 50,
    borderRadius: 5,
  },

  infoJob: {
    width: "85%",
    paddingHorizontal: 5,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 2,
  },

  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  titleJobText: {
    fontSize: 19,
    fontWeight: "600",
    lineHeight: 25,
  },
  companyText: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 21,
  },

  aktifMerekrut: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  aktifMerekrutIcon: {
    color: "#01754f",
    backgroundColor: "transparent",
  },
  aktifMerekrutText: {
    fontSize: 13,
    marginLeft: 5,
    color: COLORS.gray,
  },

  infoPelamar: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  infoPelamarText: {
    color: "#01754f",
    fontWeight: "600",
  },

  infoPelamarDot: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: COLORS.gray,
    marginHorizontal: 5,
  },

  melamarMudah: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 17,
    height: 17,
  },

  melamarMudahText: {
    marginLeft: 5,
    color: COLORS.gray,
  },
  saveJobBTN: {
    height: 27,
  },
});
