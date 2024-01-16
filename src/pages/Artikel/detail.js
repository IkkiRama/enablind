import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ref, onValue } from "firebase/database";

import { db } from "../../configs/firebase";
import {
  Navbar,
  BottomMenu,
  RekomendasiArtikel,
  ArtikelCard,
  CekAuth,
} from "../../components";
import { COLORS, SAFEAREAVIEW, images } from "../../constants";

const DetailArtikel = ({ route, navigation }) => {
  const [changeFontSize, setChangeFontSize] = useState(false);
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  const [dataArtikel, setDataArtikel] = useState({});
  const dataArtikelKeys = Object.keys(dataArtikel);

  let artikelTerbaruKeys = [];
  const { artikel } = route.params;
  let artikelRekomendasiKeys = [];

  useEffect(() => {
    return onValue(ref(db, "Artikel"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let semuaArtikel = { ...data };
      setDataArtikel(semuaArtikel);
    });
  }, []);

  dataArtikelKeys.map((key, index) => {
    if (index > 0 && index <= 7 && dataArtikel[key].judul !== artikel.judul) {
      artikelTerbaruKeys.push(key);
    }
    if (index > 7 && index <= 14 && dataArtikel[key].judul !== artikel.judul) {
      artikelRekomendasiKeys.push(key);
    }
    return true;
  });

  const ukuranFont = [
    {
      fontSize: 14,
      title: "Small",
    },
    {
      fontSize: 16,
      title: "Medium",
    },
    {
      fontSize: 20,
      title: "Large",
    },
  ];
  const [ukuranFontActive, setUkuranFontActive] = useState({
    fontSize: 16,
    title: "Medium",
  });

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar
        navigation={navigation}
        isBack={true}
        goBack={() => navigation.goBack()}
        isArtikel={true}
        changeFontSize={changeFontSize}
        setChangeFontSize={setChangeFontSize}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>
        {changeFontSize ? (
          <View style={styles.changeFontSize}>
            <View style={styles.changeFontSizeTitleContainer}>
              <MaterialIcons name="text-fields" size={30} color={COLORS.font} />
              <Text style={styles.changeFontSizeTitle}>Font Size</Text>
            </View>
            <View style={styles.changeFontSizeButtonContainer}>
              {ukuranFont.map((ukuran, i) => (
                <Pressable
                  accessible={true}
                  accessibilityLabel={`click to change font size to ${ukuran.title}`}
                  accessibilityRole="button"
                  onPress={() => setUkuranFontActive(ukuran)}
                  key={i}
                  style={styles.changeFontSizeButton(
                    ukuranFontActive.title,
                    ukuran.title
                  )}
                >
                  <Text style={styles.changeFontSizeText}>{ukuran.title}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          ""
        )}

        <View style={styles.containerWrapper}>
          {/* change font isArtikel */}
          <Text
            accessible={true}
            accessibilityLabel={`article with title ${artikel.judul}`}
            style={styles.titleArtikel}
          >
            {artikel.judul}
          </Text>
          <Text
            accessible={true}
            accessibilityLabel={`article written by ${artikel.penulis} at ${artikel.terbit}`}
            style={styles.authorArtikelContainer}
          >
            Written by{" "}
            <Text style={styles.authorArtikel}>{artikel.penulis} </Text> at{" "}
            {artikel.terbit}
          </Text>
          <View style={styles.kategoriContainer}>
            {artikel.kategori.map((kategoriArtikel, index) => (
              <View
                accessible={true}
                accessibilityLabel={`category article ${kategoriArtikel}`}
                key={index}
                style={styles.kategori}
              >
                <Text style={styles.textKategori}>{kategoriArtikel}</Text>
              </View>
            ))}
          </View>
          <Image
            accessible={true}
            accessibilityLabel="image article"
            accessibilityRole="image"
            onLoad={() => setIsLoadedImage(false)}
            style={styles.imageArtikel}
            source={
              isLoadedImage ? images.defaultBanner : { uri: artikel.image }
            }
            resizeMode="contain"
          />
          <View style={styles.kontent}>
            <Text style={styles.textKonten(ukuranFontActive.fontSize)}>
              {artikel.konten}
            </Text>
          </View>

          <View style={styles.rekomendasiArtikelContainer}>
            <Text style={styles.sectionTitle}>Recommended Article</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.rekomendasiArtikel}
              data={artikelRekomendasiKeys}
              renderItem={({ item }) => (
                <RekomendasiArtikel
                  artikel={dataArtikel[item]}
                  key={item}
                  navigation={navigation}
                />
              )}
            />

            <View style={styles.artikelBaru}>
              <Text style={styles.sectionTitle}>Latest Article</Text>
              {artikelTerbaruKeys.map((key) => (
                <ArtikelCard
                  key={key}
                  navigation={navigation}
                  artikel={dataArtikel[key]}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomMenu
        focused="Artikel"
        navigationHandle={navigation}
        userLogin={CekAuth()}
      ></BottomMenu>
    </SafeAreaView>
  );
};

export default DetailArtikel;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.lightWhite,
  },

  sectionTitle: {
    color: COLORS.font,
    fontWeight: "600",
    fontSize: 21,
    marginBottom: 10,
  },

  changeFontSize: {
    padding: 10,
    backgroundColor: COLORS.borderColor,
  },
  changeFontSizeTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeFontSizeTitle: {
    color: COLORS.font,
    fontWeight: "600",
    marginLeft: 10,
    fontSize: 21,
  },
  changeFontSizeButtonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  changeFontSizeButton: (ukuranFontActive, ukuran) => ({
    flex: 1,
    borderWidth: 1,
    borderColor: ukuranFontActive === ukuran ? COLORS.primary : COLORS.gray,
    borderRadius: 8,
    paddingVertical: 7,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor:
      ukuranFontActive === ukuran ? COLORS.primary : COLORS.borderColor,
  }),
  changeFontSizeText: {
    color: COLORS.font,
    fontWeight: "600",
    fontSize: 16,
  },
  titleArtikel: {
    fontWeight: "800",
    fontSize: 28,
    lineHeight: 32,
    color: COLORS.font,
    marginBottom: 5,
  },
  authorArtikelContainer: {
    color: COLORS.font,
    fontSize: 14,
    fontWeight: "500",
  },
  authorArtikel: {
    color: COLORS.secondary,
    fontWeight: "600",
  },
  kategoriContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  kategori: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: COLORS.kategoriCOlor,
    margin: 5,
    borderRadius: 5,
  },
  textKategori: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 13,
  },
  imageArtikel: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: COLORS.primary,
  },
  textKonten: (ukuranFontActive) => ({
    fontSize: ukuranFontActive,
    color: COLORS.font,
    lineHeight: 27,
    marginVertical: 5,
  }),
  headerKonten: {
    marginVertical: 5,
    fontSize: 23,
    fontWeight: "700",
    color: COLORS.font,
  },
  subHeaderKonten: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.font,
  },

  rekomendasiArtikelContainer: {
    marginBottom: 20,
  },
  artikelBaru: {
    marginVertical: 10,
  },
  rekomendasiArtikel: {
    marginTop: 5,
  },
});
