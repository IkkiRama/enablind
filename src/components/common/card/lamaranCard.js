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

const LamaranCard = ({ navigation, dataLamaran, dataPekerjaan, id }) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("DetailLamaran", {
          navigation,
          dataLamaran,
          dataPekerjaan,
          id,
        })
      }
      style={styles.wrapper}
    >
      <RenderImage link={dataPekerjaan["Image Company"]} />

      <View style={styles.infoJob}>
        {/* Title */}
        <View style={styles.textWrapper}>
          <View>
            <Text style={styles.titleJobText}>
              {dataPekerjaan["Job Title"]}
            </Text>
            <Text style={styles.companyText}>{dataPekerjaan["Company"]}</Text>
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

export default LamaranCard;

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

  statusTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  statusName: {
    fontWeight: "600",
  },
});
