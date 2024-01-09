import { getAuth } from "firebase/auth";
import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import { db } from "../../../../configs/firebase";
import ApplicantsPerJobCard from "../../../common/card/ApplicantsPerJobCard";

const ApplicantsPerJob = ({ data, id, navigation }) => {
  const auth = getAuth();
  const [dataLamaran, setDataLamaran] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const idLamaranPekerjaPerusahaan = [];
  const idUser = [];

  useEffect(() => {
    if (auth.currentUser !== null) {
      onValue(ref(db, "User"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataDBUser = { ...data };
        setDataUser(dataDBUser);
      });

      return onValue(ref(db, "Lamaran Kerja"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataLamaranDB = { ...data };
        setDataLamaran(dataLamaranDB);
      });
    } else {
      Alert.alert("You are not logged in yet, please login first");
      return navigation.replace("Login");
    }
  }, []);

  Object.keys(dataLamaran).map((key) => {
    if (id === dataLamaran[key]["id_pekerjaan"]) {
      idLamaranPekerjaPerusahaan.push(key);
    }

    return true;
  });

  idLamaranPekerjaPerusahaan.map((id_pekerjaan) => {
    Object.keys(dataUser).map((id_user) => {
      if (dataUser[id_user]["email"] === dataLamaran[id_pekerjaan]["email"]) {
        idUser.push(id_user);
      }
    });
  });

  const renderLamaran = () =>
    idLamaranPekerjaPerusahaan.map((id_lamaran, i) => (
      <ApplicantsPerJobCard
        navigation={navigation}
        dataLamaran={dataLamaran[id_lamaran]}
        dataPekerjaan={data}
        dataUser={dataUser[idUser[i]]}
        key={id_lamaran}
        id={id_lamaran}
      ></ApplicantsPerJobCard>
    ));

  return (
    <>
      {idLamaranPekerjaPerusahaan.length > 0 ? (
        renderLamaran()
      ) : (
        <View style={styles.noJobContainer}>
          <Text style={styles.noJobText}>No applications you have</Text>
        </View>
      )}
    </>
  );
};

export default ApplicantsPerJob;

const styles = StyleSheet.create({
  noJobContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  noJobText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
