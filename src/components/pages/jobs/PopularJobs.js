import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import { db } from "../../../configs/firebase";

import { COLORS } from "../../../constants";
import JobCard from "./../../common/card/jobCard";

const PopularJobs = ({ navigation }) => {
  const [dataPekerjaan, setDataPekerjaan] = useState({});
  const dataPekerjaanKeys = Object.keys(dataPekerjaan);
  const showPekerjaanKeys = [];

  useEffect(() => {
    return onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let semuaPekerjaan = { ...data };
      setDataPekerjaan(semuaPekerjaan);
    });
  }, []);

  dataPekerjaanKeys.map((key, index) => {
    if (index <= 5) {
      showPekerjaanKeys.push(key);
    }
    return true;
  });

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.textPopularJob}>Popular Jobs</Text>
      </View>
      {dataPekerjaanKeys.length > 0 ? (
        <View>
          {showPekerjaanKeys.map((id_pekerjaan, i) => (
            <JobCard
              key={i}
              navigation={navigation}
              data={dataPekerjaan[id_pekerjaan]}
              id={id_pekerjaan}
            ></JobCard>
          ))}
        </View>
      ) : (
        <View style={styles.noJobContainer}>
          <Text style={styles.noJobText}>No Job Available</Text>
        </View>
      )}
    </View>
  );
};

export default PopularJobs;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  textPopularJob: { fontSize: 22, fontWeight: "600" },
  textShowAll: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary,
  },

  noJobContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noJobText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
