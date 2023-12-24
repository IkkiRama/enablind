import { useState, useEffect } from "react";
import {
  StatusBar,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { getAuth } from "firebase/auth";

import { BottomMenu, Navbar, PopularJobs, HomeArtikel } from "../../components";
import { COLORS, SAFEAREAVIEW, SIZES } from "../../constants";

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
      <Navbar isHomePage={true}></Navbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        {/* Rifki Romadhan */}
        {/* Have a nice day */}
        {/* Have a good rest */}
        {/* Jika Atasnya Good Morning : Have a nice day. 
              Jika Good Evening atau Good night : Have a good rest  */}

        <View style={styles.header}></View>

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
  header: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: COLORS.primary,
    paddingTop: 15,
  },
  mainWrapper: {
    paddingTop: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightWhite,
  },
});
