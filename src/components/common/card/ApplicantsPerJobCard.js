import React, { useState } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";

import { COLORS, images } from "../../../constants";

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

const ApplicantsPerJobCard = ({
  navigation,
  dataLamaran,
  dataPekerjaan,
  dataUser,
  id,
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
      <RenderImage link={dataUser["image"]} />

      <View style={styles.infoJob}>
        {/* Title */}
        <View style={styles.textWrapper}>
          <View>
            <Text style={styles.titleJobText}>{dataLamaran["nama"]}</Text>
          </View>
        </View>
        <Text style={styles.locationText}>Email : {dataUser["email"]}</Text>
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

export default ApplicantsPerJobCard;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
  },
  imageJob: {
    width: "15%",
    height: 45,
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

  statusTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  statusName: {
    fontWeight: "600",
  },
});
