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
import { getAuth } from "firebase/auth";

import {
  BottomMenu,
  Navbar,
  Fiturs,
  PopularJobs,
  HomeArtikel,
} from "../../components";
import { COLORS, SAFEAREAVIEW, SIZES } from "../../constants";
import { Feather } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  useEffect(() => {
    // if (auth.currentUser !== null) {
    //   onValue(ref(db, "User"), (querySnapShot) => {
    //     let data = querySnapShot.val() || {};
    //     let dataUser = { ...data };
    //     setDataUser(dataUser);
    //   });
    // }
  }, []);

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar></Navbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        {/* Header */}
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 20,
            paddingHorizontal: 30,
            paddingTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Feather
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
            }}
            name="user"
            size={35}
            color={COLORS.font}
          />

          <View style={{ width: "90%", marginLeft: 20 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: SIZES.medium,
                color: COLORS.font,
                fontWeight: "500",
              }}
            >
              Good Morning
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 22,
                color: COLORS.font,
                fontWeight: "700",
              }}
            >
              {/* Rifki Romadhan */}
              {/* Have a nice day */}
              Have a good rest
              {/* Jika Atasnya Good Morning : Have a nice day. 
              Jika Good Evening atau Good night : Have a good rest  */}
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainWrapper}>
          {/* Artikel */}
          <HomeArtikel navigation={navigation}></HomeArtikel>

          {/* Job */}
          <PopularJobs></PopularJobs>
        </View>
      </ScrollView>
      <BottomMenu focused="Beranda" navigationHandle={navigation} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});
