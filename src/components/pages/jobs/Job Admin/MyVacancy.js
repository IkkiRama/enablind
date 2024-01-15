import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../../configs/firebase";
import JobCard from "../../../common/card/jobCard";
import { getAuth } from "firebase/auth";

const MyVacancy = ({ navigation }) => {
  const auth = getAuth();
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const lowonganPerusahaanID = [];

  useEffect(() => {
    if (auth.currentUser !== null) {
      return onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let semuaPekerjaan = { ...data };
        setDataPekerjaan(semuaPekerjaan);
      });
    }
  }, []);

  Object.keys(dataPekerjaan).map((id_pekerjaan) => {
    if (dataPekerjaan[id_pekerjaan]["email"] === auth.currentUser?.email) {
      lowonganPerusahaanID.push(id_pekerjaan);
    }
  });

  const renderPekerjaan = () =>
    lowonganPerusahaanID.map((id_pekerjaan) => {
      return (
        <JobCard
          navigation={navigation}
          data={dataPekerjaan[id_pekerjaan]}
          key={id_pekerjaan}
          id={id_pekerjaan}
          isCompany={true}
        ></JobCard>
      );
    });

  return (
    <>
      {lowonganPerusahaanID.length > 0 ? (
        renderPekerjaan()
      ) : (
        <View style={styles.noJobContainer}>
          <Text style={styles.noJobText}>No Vacancy Available</Text>
        </View>
      )}
    </>
  );
};

export default MyVacancy;

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
