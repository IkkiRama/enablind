import {
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
import { BottomMenu, Navbar } from "../../components";
import { COLORS, SAFEAREAVIEW, SIZES, SHADOWS } from "../../constants";
import JobCard from "./../../components/common/card/jobCard";

const Pekerjaan = ({ navigation }) => {
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPekerjaan, setFilteredPekerjaan] = useState([]);

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar></Navbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.mainWrapper}>
          <KeyboardAvoidingView style={styles.searchWrapper}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Search Jobs..."
              value={searchQuery}
              onChangeText={(value) => setSearchQuery(value)}
            />

            <Pressable style={styles.searchIcon}>
              <FontAwesome5 name="search" size={24} color={COLORS.font} />
            </Pressable>
          </KeyboardAvoidingView>

          <View>
            <JobCard navigation={navigation}></JobCard>
            <JobCard navigation={navigation}></JobCard>
            <JobCard navigation={navigation}></JobCard>
            <JobCard navigation={navigation}></JobCard>
            <JobCard navigation={navigation}></JobCard>
            <JobCard navigation={navigation}></JobCard>
            <JobCard navigation={navigation}></JobCard>
          </View>
        </View>
      </ScrollView>
      <BottomMenu focused="Pekerjaan" navigationHandle={navigation} />
    </SafeAreaView>
  );
};

export default Pekerjaan;

const styles = StyleSheet.create({
  mainWrapper: {
    paddingTop: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightWhite,
  },
  searchWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 20,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.borderColor,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.font,
    ...SHADOWS.hard,
  },
  searchIcon: {
    top: 0,
    right: 0,
    height: "100%",
    position: "absolute",
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: COLORS.borderColor,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
