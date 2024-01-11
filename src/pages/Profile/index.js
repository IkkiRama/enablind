import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Feather,
  Octicons,
  Ionicons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";

import { BottomMenu, CekAuth, Navbar } from "../../components";
import { COLORS, SAFEAREAVIEW, images } from "../../constants";

const RenderImage = ({ link }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  return (
    <Image
      onLoad={() => setIsLoadedImage(false)}
      style={styles.imageUser}
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

const Profile = ({ navigation }) => {
  return (
    <RenderElement
      navigation={navigation}
      userLogin={CekAuth()}
    ></RenderElement>
  );
};

const RenderElement = ({ navigation, userLogin }) => {
  const auth = getAuth();
  const [nama, setNama] = useState(null);
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setNama(userLogin?.nama);
    setImage(userLogin?.image);
    setEmail(userLogin?.email);
    if (auth.currentUser === null) {
      Alert.alert("You are not logged in yet, please login first");
      return navigation.replace("Login");
    }
  }, [userLogin]);

  const handleLogout = () => {
    Alert.alert(
      "Are you sure?",
      "Are you sure you're going to exit the account?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            signOut(auth);
            navigation.replace("Login");
            Alert.alert("You are successfully logged out");
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.containerWrapper}>
          <View style={styles.container}>
            {image === null ? (
              <View style={styles.imageContainer}>
                <Ionicons name="person" size={50} color={COLORS.colorShadow} />
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <RenderImage link={userLogin.image} />
              </View>
            )}

            <View style={styles.profileUserContainer}>
              <Text style={styles.userName}>{nama}</Text>
              <Text style={styles.userEmail}>{email}</Text>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContainer}>
            <Pressable
              onPress={() => navigation.navigate("EditProfile")}
              style={styles.perFitur}
            >
              <View style={styles.nameFiturContainer}>
                <Feather name="edit" size={24} color={COLORS.font} />
                <Text style={styles.profileFitur}>Edit Profile</Text>
              </View>
              <FontAwesome name="chevron-right" size={24} color={COLORS.font} />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Saved Jobs")}
              style={styles.perFitur}
            >
              <View style={styles.nameFiturContainer}>
                <Ionicons name="ios-bookmark" size={25} color={COLORS.font} />
                <Text style={styles.profileFitur}>Saved Jobs</Text>
              </View>
              <FontAwesome name="chevron-right" size={24} color={COLORS.font} />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Bantuan")}
              style={styles.perFitur}
            >
              <View style={styles.nameFiturContainer}>
                <AntDesign name="customerservice" size={24} color="black" />
                <Text style={styles.profileFitur}>Help</Text>
              </View>
              <FontAwesome name="chevron-right" size={24} color={COLORS.font} />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("FAQ")}
              style={styles.perFitur}
            >
              <View style={styles.nameFiturContainer}>
                <FontAwesome5 name="question" size={24} color={COLORS.font} />
                <Text style={styles.profileFitur}>FAQ</Text>
              </View>
              <FontAwesome name="chevron-right" size={24} color={COLORS.font} />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("TentangAplikasi")}
              style={styles.perFitur}
            >
              <View style={styles.nameFiturContainer}>
                <FontAwesome5 name="info" size={24} color={COLORS.font} />
                <Text style={styles.profileFitur}>About enablind</Text>
              </View>
              <FontAwesome name="chevron-right" size={24} color={COLORS.font} />
            </Pressable>

            <Pressable onPress={() => handleLogout()} style={styles.perFitur}>
              <View style={styles.nameFiturContainer}>
                <Octicons name="sign-out" size={24} color={COLORS.font} />
                <Text style={styles.profileFitur}>Exit</Text>
              </View>
              <FontAwesome name="chevron-right" size={24} color={COLORS.font} />
            </Pressable>
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

export default Profile;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  imageUser: {
    width: "95%",
    height: "95%",
    borderRadius: 50,
  },
  profileUserContainer: { flex: 1, marginLeft: 20 },
  userName: {
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  perFitur: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginVertical: 5,
    justifyContent: "space-between",
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.lightWhite,
  },
  nameFiturContainer: { flexDirection: "row", alignItems: "center" },
  profileFitur: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 15,
    color: COLORS.font,
  },
});
