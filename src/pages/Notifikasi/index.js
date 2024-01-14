import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Pressable,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";

import { db } from "../../configs/firebase";
import { COLORS, SAFEAREAVIEW, images } from "../../constants";
import { Navbar, BottomMenu, CekAuth } from "../../components";

const RenderImage = ({ link }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(true);
  return (
    <Image
      onLoad={() => setIsLoadedImage(false)}
      style={styles.imageNotification}
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

const Notifikasi = ({ navigation }) => {
  return (
    <RenderElement
      userLogin={CekAuth()}
      navigation={navigation}
    ></RenderElement>
  );
};

const RenderElement = ({ navigation, userLogin }) => {
  const auth = getAuth();
  const minHeightPage = Dimensions.get("window").height;

  const [notifikasi, setNotifikasi] = useState([]);
  const [lamaran, setLamaran] = useState([]);
  const [pekerjaan, setPekerjaan] = useState([]);

  const lamaranUserLoginID = [];
  const notifikasiUserLoginID = [];

  useEffect(() => {
    if (auth.currentUser !== null) {
      onValue(ref(db, "Notifikasi"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataNotifikasi = { ...data };
        setNotifikasi(dataNotifikasi);
      });

      onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataPekerjaan = { ...data };
        setPekerjaan(dataPekerjaan);
      });

      return onValue(ref(db, "Lamaran Kerja"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataLamaran = { ...data };
        setLamaran(dataLamaran);
      });
    } else {
      Alert.alert("You are not logged in yet, please login first");
      return navigation.replace("Login");
    }
  }, []);

  Object.keys(lamaran).map((id_lamaran) => {
    if (lamaran[id_lamaran]["email"] === auth.currentUser.email) {
      lamaranUserLoginID.push(id_lamaran);
    }
  });

  Object.keys(notifikasi).map((id_notifikasi) => {
    if (lamaranUserLoginID.includes(notifikasi[id_notifikasi]["id_lamaran"])) {
      notifikasiUserLoginID.push(id_notifikasi);
    }
  });

  const onPressHandler = (id_notifikasi, dataLamaran, dataPekerjaan, id) => {
    update(ref(db, "Notifikasi"), {
      [id_notifikasi]: {
        id_lamaran: notifikasi[id_notifikasi]["id_lamaran"],
        title: notifikasi[id_notifikasi]["title"],
        message: notifikasi[id_notifikasi]["message"],
        isRead: true,
      },
    });

    navigation.navigate("DetailLamaran", {
      dataLamaran,
      dataPekerjaan,
      id,
    });
  };

  const RenderNotifikasi = () =>
    notifikasiUserLoginID.map((id_notifikasi, i) => (
      <Pressable
        onPress={() =>
          onPressHandler(
            id_notifikasi,
            lamaran[notifikasi[id_notifikasi]["id_lamaran"]],
            pekerjaan[
              lamaran[notifikasi[id_notifikasi]["id_lamaran"]]["id_pekerjaan"]
            ],
            notifikasi[id_notifikasi]["id_lamaran"]
          )
        }
        style={styles.perNotification(notifikasi[id_notifikasi]["isRead"])}
        key={i}
      >
        <RenderImage
          link={
            pekerjaan[
              lamaran[notifikasi[id_notifikasi]["id_lamaran"]]["id_pekerjaan"]
            ]["Image Company"]
          }
        ></RenderImage>
        <View style={styles.captionNotification}>
          <Text style={styles.notificationTitle} numberOfLines={1}>
            {notifikasi[id_notifikasi]["title"]}
          </Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notifikasi[id_notifikasi]["message"]}
          </Text>
        </View>
      </Pressable>
    ));

  return (
    <SafeAreaView style={SAFEAREAVIEW.style}>
      <Navbar
        navigation={navigation}
        isBack={true}
        goBack={() => navigation.goBack()}
        isTitle="Notification"
        isShowNotifikasiPage={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        ></StatusBar>

        <View style={styles.containerWrapper(minHeightPage)}>
          <View style={styles.notification}>
            {notifikasiUserLoginID.length > 0 ? (
              RenderNotifikasi()
            ) : (
              <View style={styles.kosongContainer}>
                <Text style={styles.kosongText}>No Recent Notifications</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <BottomMenu navigationHandle={navigation} userLogin={CekAuth()} />
    </SafeAreaView>
  );
};

export default Notifikasi;

const styles = StyleSheet.create({
  containerWrapper: (minHeightPage) => ({
    flex: 1,
    minHeight: minHeightPage,
    backgroundColor: COLORS.white,
  }),

  kosongContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  kosongText: {
    fontSize: 18,
    fontWeight: "600",
  },
  perNotification: (isRead) => ({
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,
    backgroundColor: isRead === false ? COLORS.borderColor : COLORS.white,
    borderTopColor: COLORS.borderColor,
    borderTopWidth: 2,
  }),
  imageNotification: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },
  captionNotification: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 21,
    fontWeight: "700",
  },
  notificationMessage: {
    fontSize: 15,
    color: COLORS.gray,
  },
});
