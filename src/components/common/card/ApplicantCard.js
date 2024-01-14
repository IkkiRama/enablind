import React, { useState } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";

import CekAuth from "../CekAuth";
import { COLORS, images } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";

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

const ApplicantCard = ({
  navigation,
  dataLamaran,
  dataPekerjaan,
  id,
  dataUser,
}) => {
  return (
    <RenderElement
      navigation={navigation}
      dataLamaran={dataLamaran}
      dataPekerjaan={dataPekerjaan}
      id={id}
      dataUser={dataUser}
      userLogin={CekAuth()}
    ></RenderElement>
  );
};

const RenderElement = ({
  navigation,
  dataLamaran,
  dataPekerjaan,
  id,
  dataUser,
  userLogin,
}) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("DetailLamaran", {
          dataLamaran,
          dataPekerjaan,
          id,
          dataUser,
        })
      }
      style={styles.wrapper}
    >
      {userLogin?.role === "company" ? (
        dataUser["image"] === "" ||
        dataUser["image"] === undefined ||
        dataUser["image"] === null ? (
          <View style={styles.fotoDefaultUser}>
            <Ionicons name="person" size={30} color={COLORS.colorShadow} />
          </View>
        ) : (
          <RenderImage link={dataUser["image"]} />
        )
      ) : (
        <RenderImage link={dataPekerjaan["Image Company"]} />
      )}

      <View style={styles.infoJob}>
        {/* Title */}
        <View style={styles.textWrapper}>
          <View>
            <Text style={styles.companyText}>{dataPekerjaan["Job Title"]}</Text>
            <Text style={styles.titleJobText}>{dataLamaran["nama"]}</Text>
          </View>
        </View>
        <Text style={styles.locationText}>{dataPekerjaan["Job Location"]}</Text>
        <Text style={styles.statusTitle}>
          Status :{" "}
          <Text style={styles.statusName}>
            {dataLamaran["Status Lamaran"].status}
          </Text>
        </Text>
      </View>
    </Pressable>
  );
};

export default ApplicantCard;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    margin: 5,
  },

  fotoDefaultUser: {
    width: "12%",
    height: 45,
    elevation: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  imageJob: {
    width: "12%",
    height: 45,
    borderRadius: 3,
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

  statusTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  statusName: {
    fontWeight: "600",
  },
});
