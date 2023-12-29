import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../../configs/firebase";
import JobCard from "../../../common/card/jobCard";

const AllJobs = ({ navigation }) => {
  const [dataPekerjaan, setDataPekerjaan] = useState([]);

  useEffect(() => {
    return onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let semuaPekerjaan = { ...data };
      setDataPekerjaan(semuaPekerjaan);
    });
  }, []);

  const renderPekerjaan = () =>
    Object.keys(dataPekerjaan).map((id_pekerjaan) => (
      <JobCard
        navigation={navigation}
        data={dataPekerjaan[id_pekerjaan]}
        key={id_pekerjaan}
        id={id_pekerjaan}
      ></JobCard>
    ));

  return (
    <>
      {Object.keys(dataPekerjaan).length > 0 ? (
        renderPekerjaan()
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
