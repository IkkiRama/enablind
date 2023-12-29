import {
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import Search from "../../../assets/Icons/search.svg";
import { COLORS } from "../../constants";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
const Navbar = ({
  isBack,
  goBack,
  withForm = false,
  isTitle = null,
  goHome,
  isFromHome = false,
  isArtikel = false,
  isHomePage = false,
  changeFontSize,
  setChangeFontSize,
  smallMessage,
  mainMessage,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isBack ? (
          <Pressable onPress={isFromHome ? goHome : goBack}>
            <FontAwesome name="chevron-left" size={24} color={COLORS.font} />
          </Pressable>
        ) : isHomePage ? (
          <View>
            <Text style={{ fontSize: 14 }}>{smallMessage}</Text>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {mainMessage}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: 22, fontWeight: "700", marginLeft: 10 }}>
              Enablind
            </Text>
          </View>
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

      {isTitle !== null ? (
        <Text
          style={{
            color: COLORS.font,
            fontWeight: "600",
            fontSize: 21,
          }}
        >
          {isTitle}
        </Text>
      ) : (
        ""
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isArtikel ? (
          <Pressable
            onPress={() => setChangeFontSize(!changeFontSize)}
            style={{ marginRight: 15 }}
          >
            <MaterialIcons name="text-fields" size={24} color={COLORS.font} />
          </Pressable>
        ) : (
          ""
        )}

        <View
          style={{
            borderRadius: 50,
            position: "relative",
            marginRight: 5,
          }}
        >
          <Ionicons
            name="ios-notifications-outline"
            size={25}
            color={COLORS.font}
          />
          <View
            style={{
              width: 18,
              height: 18,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: -3,
              left: 12,
              borderRadius: 5,
              backgroundColor: COLORS.merah,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 11,
                fontWeight: "600",
              }}
            >
              9+
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Navbar;
