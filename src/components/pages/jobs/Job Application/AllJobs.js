import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";

import { db } from "../../../../configs/firebase";
import JobCard from "../../../common/card/jobCard";

const AllJobs = ({ navigation, isSavedJobPage = false }) => {
  const auth = getAuth();
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const [pekerjaanTersimpan, setPekerjaanTersimpan] = useState([]);
  let Id_Data_PT_UserLogin = [];

  useEffect(() => {
    if (auth.currentUser !== null) {
      onValue(ref(db, "Pekerjaan Tersimpan"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let semuaPekerjaanTersimpan = { ...data };
        setPekerjaanTersimpan(semuaPekerjaanTersimpan);
      });
    }
    return onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let semuaPekerjaan = { ...data };
      setDataPekerjaan(semuaPekerjaan);
    });
  }, []);

  Object.keys(pekerjaanTersimpan).map((id_pekerjaan_tersimpan) => {
    if (
      pekerjaanTersimpan[id_pekerjaan_tersimpan]["email"] ===
      auth.currentUser.email
    ) {
      Id_Data_PT_UserLogin.push(id_pekerjaan_tersimpan);
    }
  });

  const renderPekerjaan = () =>
    Object.keys(dataPekerjaan).map((id_pekerjaan) => (
      <JobCard
        navigation={navigation}
        data={dataPekerjaan[id_pekerjaan]}
        key={id_pekerjaan}
        id={id_pekerjaan}
      ></JobCard>
    ));

  const RenderPekerjaanTersimpan = () =>
    Id_Data_PT_UserLogin.map((id_pekerjaan_tersimpan) => (
      <JobCard
        navigation={navigation}
        data={
          dataPekerjaan[
            pekerjaanTersimpan[id_pekerjaan_tersimpan]["id_pekerjaan"]
          ]
        }
        key={id_pekerjaan_tersimpan}
        id={pekerjaanTersimpan[id_pekerjaan_tersimpan]["id_pekerjaan"]}
      ></JobCard>
    ));

  return (
    <>
      {Object.keys(dataPekerjaan).length > 0 ? (
        isSavedJobPage ? (
          RenderPekerjaanTersimpan()
        ) : (
          renderPekerjaan()
        )
      ) : (
        <View style={styles.noJobContainer}>
          <Text style={styles.noJobText}>No Job Available</Text>
        </View>
      )}
    </>
  );
};

export default AllJobs;

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
