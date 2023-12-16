import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, images } from "../../../constants";
import { useState } from "react";

const RekomendasiArtikel = ({ navigation, artikel }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  return (
    <Pressable
      onPress={() => navigation.navigate("DetailArtikel", { artikel })}
      style={styles.rekomendasiArtikel}
    >
      <Image
        onLoad={() => setIsLoadedImage(false)}
        source={
          isLoadedImage
            ? images.defaultBanner
            : {
                uri: artikel.image,
              }
        }
        style={styles.imageArtikel}
      />
      <View style={styles.textContainer}>
        <Text style={styles.titleArtikel} numberOfLines={2}>
          {artikel.judul}
        </Text>
        <Text style={styles.tanggalArtikel}>Ditulis pada {artikel.terbit}</Text>
      </View>
    </Pressable>
  );
};

export default RekomendasiArtikel;

const styles = StyleSheet.create({
  rekomendasiArtikel: {
    marginHorizontal: 7,
    width: 200,
  },
  imageArtikel: {
    width: "100%",
    height: 100,
  },
  textContainer: {
    marginTop: 10,
  },
  titleArtikel: {
    fontSize: 16,
    color: COLORS.font,
    fontWeight: "600",
    marginBottom: 5,
    height: 40,
  },
  tanggalArtikel: {
    color: COLORS.font,
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.7,
  },
});
