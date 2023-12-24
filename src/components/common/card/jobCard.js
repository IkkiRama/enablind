import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

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
              uri: "https://media.licdn.com/dms/image/C4D0BAQHCmfKRtPXKDg/company-logo_100_100/0/1658813682786/gojek_logo?e=1711584000&v=beta&t=uCPSb0bbTB3Z1OTHflnVtDS_PqpO5rItxDUkidBhz1w",
            }
      }
    />
  );
};

const JobCard = () => {
  return (
    <View style={styles.wrapper}>
      <RenderImage link="https://media.licdn.com/dms/image/C4D0BAQHCmfKRtPXKDg/company-logo_100_100/0/1658813682786/gojek_logo?e=1711584000&v=beta&t=uCPSb0bbTB3Z1OTHflnVtDS_PqpO5rItxDUkidBhz1w" />

      <View style={styles.infoJob}>
        {/* Title */}
        <View style={styles.textWrapper}>
          <View>
            <Text style={styles.titleJobText}>Software Engginer</Text>
            <Text style={styles.companyText}>Tokopedia</Text>
          </View>

          <Ionicons name="ios-bookmark-outline" size={25} color={COLORS.font} />
        </View>
        <Text style={styles.locationText}>
          Jakarta, Jakarta Raya, Indonesia (Dalam Kantor)
        </Text>

        <View style={styles.aktifMerekrut}>
          <AktifMerekrut
            width={27}
            height={27}
            style={styles.aktifMerekrutIcon}
          ></AktifMerekrut>
          <Text style={styles.aktifMerekrutText}>Aktif Merekrut</Text>
        </View>

        <View style={styles.infoPelamar}>
          <Text style={styles.infoPelamarText}>14 Pelamar</Text>

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
    </View>
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
    width: "12%",
    height: 35,
  },

  infoJob: {
    width: "88%",
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
});
