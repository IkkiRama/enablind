import { getAuth } from "firebase/auth";
import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import { db } from "../../../../configs/firebase";
import ApplicantCard from "../../../common/card/ApplicantCard";

const Applicants = ({ navigation }) => {
  const auth = getAuth();
  const [dataUser, setDataUser] = useState([]);
  const [dataLamaran, setDataLamaran] = useState([]);
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const idDataPekerjaanPerusahaan = [];
  const idLamaranPekerjaPerusahaan = [];
  const idUser = [];

  useEffect(() => {
    if (auth.currentUser !== null) {
      onValue(ref(db, "User"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataDBUser = { ...data };
        setDataUser(dataDBUser);
      });

      onValue(ref(db, "Lamaran Kerja"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataLamaranDB = { ...data };
        setDataLamaran(dataLamaranDB);
      });

      return onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let semuaPekerjaan = { ...data };
        setDataPekerjaan(semuaPekerjaan);
      });
    } else {
      Alert.alert("You are not logged in yet, please login first");
      return navigation.replace("Login");
    }
  }, []);

  Object.keys(dataPekerjaan).map((id_pekerjaan) => {
    if (dataPekerjaan[id_pekerjaan]["email"] === auth.currentUser.email) {
      idDataPekerjaanPerusahaan.push(id_pekerjaan);
    }
  });

  Object.keys(dataLamaran).map((key) => {
    if (idDataPekerjaanPerusahaan.includes(dataLamaran[key]["id_pekerjaan"])) {
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
      <ApplicantCard
        navigation={navigation}
        dataLamaran={dataLamaran[id_lamaran]}
        dataPekerjaan={dataPekerjaan[dataLamaran[id_lamaran]["id_pekerjaan"]]}
        dataUser={dataUser[idUser[i]]}
        key={id_lamaran}
        id={id_lamaran}
      ></ApplicantCard>
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

export default Applicants;

const styles = StyleSheet.create({});
