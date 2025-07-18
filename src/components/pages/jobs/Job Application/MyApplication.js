import { StyleSheet, Text, View, Alert } from "react-native";

import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import { db } from "../../../../configs/firebase";
import LamaranCard from "../../../common/card/lamaranCard";

const MyApplication = ({ navigation }) => {
  const auth = getAuth();
  const dataLamaranUserKeys = [];

  const [dataLamaran, setDataLamaran] = useState([]);
  const [dataPekerjaan, setDataPekerjaan] = useState([]);

  const dataLamaranKeys = Object.keys(dataLamaran);

  useEffect(() => {
    if (auth.currentUser == null) {
      Alert.alert("You are not logged in yet, please login first");
      return navigation.replace("Login");
    } else {
      onValue(ref(db, "Lamaran Kerja"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataLamaranDB = { ...data };
        setDataLamaran(dataLamaranDB);
      });

      onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataPekerjaan = { ...data };
        setDataPekerjaan(dataPekerjaan);
      });
    }
  }, []);

  dataLamaranKeys.map((key) => {
    if (dataLamaran[key]["email"] === auth.currentUser.email) {
      dataLamaranUserKeys.push(key);
    }
    return true;
  });

  const renderLamaran = () =>
    dataLamaranUserKeys
      .reverse()
      .map((id_lamaran) => (
        <LamaranCard
          navigation={navigation}
          dataLamaran={dataLamaran[id_lamaran]}
          dataPekerjaan={dataPekerjaan[dataLamaran[id_lamaran]["id_pekerjaan"]]}
          key={id_lamaran}
          id={id_lamaran}
        ></LamaranCard>
      ));

  return (
    <>
      {dataLamaranUserKeys.length > 0 ? (
        renderLamaran()
      ) : (
        <View style={styles.noJobContainer}>
          <Text style={styles.noJobText}>No applications you have</Text>
        </View>
      )}
    </>
  );
};

export default MyApplication;

const styles = StyleSheet.create({
  noJobContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noJobText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
