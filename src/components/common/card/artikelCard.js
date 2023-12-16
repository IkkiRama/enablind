import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, images } from "../../../constants";
import { useState } from "react";

const ArtikelCard = ({ navigation, artikel }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  return (
    <Pressable
      onPress={() => navigation.navigate("DetailArtikel", { artikel })}
      style={styles.artikel}
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
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.titleArtikel} numberOfLines={3}>
          {artikel.judul}
        </Text>
        <Text style={styles.tanggalArtikel}>Ditulis pada {artikel.terbit}</Text>
      </View>
    </Pressable>
  );
};

export default ArtikelCard;

const styles = StyleSheet.create({
  artikel: {
    flexDirection: "row",
    marginVertical: 7,
  },
  imageArtikel: {
    width: "40%",
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: COLORS.primary,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  titleArtikel: {
    color: COLORS.font,
    fontSize: 19,
    fontWeight: "600",
    lineHeight: 25,
  },
  tanggalArtikel: {
    color: COLORS.font,
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.7,
  },
});
