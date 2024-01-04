import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../../configs/firebase";
import JobCard from "../../../common/card/jobCard";
import { getAuth, signOut } from "firebase/auth";

const MyVacancy = ({ navigation }) => {
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser === null) {
      return onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let semuaPekerjaan = { ...data };
        setDataPekerjaan(semuaPekerjaan);
      });
    }
  }, []);

  dataUserKeys.map((key) => {
    if (dataUser[key].email === auth.currentUser.email) {
      userLogin = dataUser[key];
    }
  });

  return <RenderElement></RenderElement>;
};

import { View, Text } from "react-native";
import React from "react";

const RenderElement = ({ navigation, userLogin }) => {
  const [dataUser, setDataUser] = useState({});
  const dataUserKeys = Object.keys(dataUser);
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const renderPekerjaan = () =>
    Object.keys(dataPekerjaan).map((id_pekerjaan) => {
      if (dataPekerjaan[id_pekerjaan]["email"] === userLogin.email) {
        return (
          <JobCard
            navigation={navigation}
            data={dataPekerjaan[id_pekerjaan]}
            key={id_pekerjaan}
            id={id_pekerjaan}
            isCompany={true}
          ></JobCard>
        );
      }
    });

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
