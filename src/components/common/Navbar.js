import {
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import Search from "../../../assets/Icons/search.svg";
import Bell from "../../../assets/Icons/bell.svg";
import { Image } from "react-native";
import { COLORS } from "../../constants";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const Navbar = ({
  isBack,
  goBack,
  withForm = false,
  isTitle = null,
  goHome,
  isFromHome = false,
  isArtikel = false,
  changeFontSize,
  setChangeFontSize,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isBack ? (
          <Pressable onPress={isFromHome ? goHome : goBack}>
            <FontAwesome name="chevron-left" size={24} color={COLORS.white} />
          </Pressable>
        ) : (
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/react-native-crud-fireba-ea6c9.appspot.com/o/IITC%202023%2FPushInk%20Logo.png?alt=media&token=6b0f4d49-72bc-41f5-ad03-93b20613a6fa",
            }}
            resizeMode="contain"
            style={{ width: 90, height: 30 }}
          />
        )}

        {isTitle !== null ? (
          <Text
            style={{
              marginLeft: 10,
              color: COLORS.white,
              fontWeight: "600",
              fontSize: 21,
            }}
          >
            {isTitle}
          </Text>
        ) : (
          ""
        )}

        {/* Search */}
        {withForm ? (
          <KeyboardAvoidingView
            behavior="padding"
            style={{ width: "75%", position: "relative" }}
          >
            <TextInput
              placeholder="Mau Cari apa..."
              style={{
                // paddingHorizontal: 20,
                paddingLeft: 25,
                paddingVertical: 3,
                borderRadius: 8,
                borderWidth: 0.7,
                borderColor: COLORS.borderColor,
                backgroundColor: COLORS.white,
                elevation: 2,
                color: "#212121",
                fontSize: 16,
                fontWeight: "500",
              }}
            ></TextInput>
            <Search style={{ position: "absolute", top: 6, left: 3 }}></Search>
          </KeyboardAvoidingView>
        ) : (
          ""
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isArtikel ? (
          <Pressable onPress={() => setChangeFontSize(!changeFontSize)}>
            <MaterialIcons
              name="text-fields"
              size={24}
              color={COLORS.lightWhite}
            />
          </Pressable>
        ) : (
          ""
        )}

        <View style={{ position: "relative", marginLeft: 15 }}>
          <Bell
            width={27}
            height={27}
            style={{ color: COLORS.lightWhite, backgroundColor: "transparent" }}
          ></Bell>
          <View
            style={{
              width: 18,
              height: 18,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: -5,
              left: 10,
              borderRadius: 5,
              backgroundColor: COLORS.merah,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 10,
                fontWeight: "600",
              }}
            >
              10
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Navbar;
