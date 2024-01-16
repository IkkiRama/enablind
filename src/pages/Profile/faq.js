import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import { db } from "../../configs/firebase";
import { COLORS, SAFEAREAVIEW } from "../../constants";
import { Navbar, BottomMenu, AccordionItem, CekAuth } from "../../components";

const FAQ = ({ navigation }) => {
  const [dataFAQ, setDataFAQ] = useState({});
  const dataFAQKeys = Object.keys(dataFAQ);

  useEffect(() => {
    return onValue(ref(db, "FAQ Enablind"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let semuaFAQ = { ...data };
      setDataFAQ(semuaFAQ);
    });
  }, []);
  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar
        navigation={navigation}
        isBack={true}
        goBack={() => navigation.goBack()}
        isTitle="FAQ"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.containerWrapper}>
          <View style={styles.container}>
            <Text style={styles.faqTitle}>
              Did you come across any frequently asked questions? we help you
              find the answers
            </Text>

            <View style={styles.faq}>
              {dataFAQKeys.length > 0 ? (
                dataFAQKeys.map((key, index) => (
                  <AccordionItem
                    key={index}
                    data={dataFAQ[key]}
                    index={index}
                  />
                ))
              ) : (
                <ActivityIndicator size="large" color={COLORS.primary} />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomMenu
        focused="Profile"
        navigationHandle={navigation}
        userLogin={CekAuth()}
      />
    </SafeAreaView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  faqTitle: {
    fontSize: 15,
    color: COLORS.font,
    marginBottom: 20,
  },
  faq: {
    overflow: "hidden",
  },
});
