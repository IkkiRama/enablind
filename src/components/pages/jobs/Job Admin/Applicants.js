import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../../configs/firebase";
import { getAuth } from "firebase/auth";
import ApplicantCard from "../../../common/card/ApplicantCard";

// ambil semua data pekerjaan, filter uselogin.
// ambil semua data lamaran,
// filter apakah lamaran tersebut sesuai dengan id pekerjaan yang company bikin

const Applicants = ({ navigation }) => {
  const auth = getAuth();
  const [dataLamaran, setDataLamaran] = useState([]);
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const idDataPekerjaanPerusahaan = [];
  const idLamaranPekerjaPerusahaan = [];

  useEffect(() => {
    if (auth.currentUser !== null) {
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

  // No applicants applied for the job
  const renderLamaran = () =>
    idLamaranPekerjaPerusahaan.map((id_lamaran) => (
      <ApplicantCard
        navigation={navigation}
        dataLamaran={dataLamaran[id_lamaran]}
        dataPekerjaan={dataPekerjaan[dataLamaran[id_lamaran]["id_pekerjaan"]]}
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
