import { useState, useEffect } from "react";
import {
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../../configs/firebase";
import { COLORS, SAFEAREAVIEW, SIZES } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";

const HomeArtikel = ({ navigation }) => {
  const [SeriesArtikel, setSeriesArtikel] = useState({});
  const SeriesArtikelKeys = Object.keys(SeriesArtikel);
  const showSeriesArtikelKeys = [];

  useEffect(() => {
    // if (auth.currentUser !== null) {
    //   onValue(ref(db, "User"), (querySnapShot) => {
    //     let data = querySnapShot.val() || {};
    //     let dataUser = { ...data };
    //     setDataUser(dataUser);
    //   });
    // }

    onValue(ref(db, "Artikel"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let dataArtikel = { ...data };
      setSeriesArtikel(dataArtikel);
    });
  }, []);

  SeriesArtikelKeys.map((key, index) => {
    if (index <= 5) {
      showSeriesArtikelKeys.push(key);
    }
    return true;
  });

  return (
    <View>
      {SeriesArtikelKeys.length > 0 ? (
        <FlatList
          horizontal
          data={showSeriesArtikelKeys}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              key={item}
              style={{ margin: 5 }}
              onPress={() =>
                navigation.navigate("DetailArtikel", {
                  artikel: SeriesArtikel[item],
                })
              }
            >
              <ImageBackground
                source={{ uri: SeriesArtikel[item].image }}
                resizeMode="cover"
                style={{
                  width: 250,
                  height: 330,
                  overflow: "hidden",
                  justifyContent: "flex-end",
                }}
                imageStyle={{ borderRadius: 10 }}
              >
                <LinearGradient
                  colors={["transparent", "#767676e9", "#5c5c5c", "#3d3d3d"]}
                  style={{
                    width: "100%",
                    height: 170,
                    padding: 10,
                    justifyContent: "flex-end",
                    paddingBottom: 30,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLORS.white,
                      fontWeight: "700",
                    }}
                    numberOfLines={2}
                  >
                    {SeriesArtikel[item].judul}
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          )}
        ></FlatList>
      ) : (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )}
    </View>
  );
};

export default HomeArtikel;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
