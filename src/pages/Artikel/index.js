import {
  ActivityIndicator,
  Button,
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
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import {
  Navbar,
  BottomMenu,
  ArtikelCard,
  RekomendasiArtikel,
  CekAuth,
} from "../../components";
import { db } from "../../configs/firebase";
import { COLORS, SAFEAREAVIEW, images } from "../../constants";

const Artikel = ({ navigation }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  const [dataArtikel, setDataArtikel] = useState({});
  const dataArtikelKeys = Object.keys(dataArtikel);

  let artikelPalingBaruKeys = [];
  let artikelTerbaruKeys = [];
  let artikelRekomendasiKeys = [];
  let artikelPopulerKeys = [];

  useEffect(() => {
    return onValue(ref(db, "Artikel"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let semuaArtikel = { ...data };
      setDataArtikel(semuaArtikel);
    });
  }, []);

  dataArtikelKeys.map((key, index) => {
    if (index === 0) {
      artikelPalingBaruKeys.push(key);
    }
    if (index > 0 && index <= 5) {
      artikelTerbaruKeys.push(key);
    }
    if (index > 5 && index <= 10) {
      artikelRekomendasiKeys.push(key);
    }
    if (index > 10) {
      artikelPopulerKeys.push(key);
    }
    return true;
  });

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            {dataArtikelKeys.length > 0 ? (
              <>
                <View style={styles.artikelBaruContainer}>
                  <Text style={styles.sectionTitle}>Latest Article</Text>
                  {artikelPalingBaruKeys.map((key) => (
                    <Pressable
                      key={key}
                      onPress={() =>
                        navigation.navigate("DetailArtikel", {
                          artikel: dataArtikel[key],
                        })
                      }
                      style={styles.artikelPalingBaru}
                    >
                      <Image
                        onLoad={() => setIsLoadedImage(false)}
                        source={
                          isLoadedImage
                            ? images.defaultBanner
                            : {
                                uri: dataArtikel[key].image,
                              }
                        }
                        style={styles.imageArtikelPalingBaru}
                        resizeMode="contain"
                      />
                      <View style={styles.textContainer}>
                        <Text numberOfLines={3} style={styles.titleArtikel}>
                          {dataArtikel[key].judul}
                        </Text>
                        <Text numberOfLines={3} style={styles.excerptArtikel}>
                          {dataArtikel[key].konten.slice(0, 150)}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                  <View style={styles.artikelBaru}>
                    {artikelTerbaruKeys.map((key) => (
                      <ArtikelCard
                        key={key}
                        navigation={navigation}
                        artikel={dataArtikel[key]}
                      />
                    ))}
                  </View>
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
                </View>

                <View style={styles.artikelPopulerContainer}>
                  <Text style={styles.sectionTitle}>Feature Article</Text>
                  <View style={styles.artikelPopuler}>
                    {artikelPopulerKeys.map((key) => (
                      <ArtikelCard
                        key={key}
                        navigation={navigation}
                        artikel={dataArtikel[key]}
                      />
                    ))}
                  </View>
                </View>
              </>
            ) : (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )}
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

export default Artikel;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  artikelBaruContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    color: COLORS.font,
    fontWeight: "600",
    fontSize: 21,
    marginBottom: 10,
  },

  imageArtikelPalingBaru: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    paddingTop: 10,
  },
  titleArtikel: {
    fontSize: 23,
    fontWeight: "700",
    color: COLORS.font,
  },
  excerptArtikel: {
    color: COLORS.font,
    opacity: 0.7,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 5,
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
