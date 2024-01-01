import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../../configs/firebase";
import JobCard from "../../../common/card/jobCard";
import { getAuth, signOut } from "firebase/auth";

const MyVacancy = ({ navigation }) => {
  const auth = getAuth();
  let userLogin;
  const [dataUser, setDataUser] = useState({});
  const dataUserKeys = Object.keys(dataUser);
  const [dataPekerjaan, setDataPekerjaan] = useState([]);

  useEffect(() => {
    if (auth.currentUser !== null) {
      onValue(ref(db, "User"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataUser = { ...data };
        setDataUser(dataUser);
      });
      return onValue(ref(db, "Pekerjaan"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let semuaPekerjaan = { ...data };
        setDataPekerjaan(semuaPekerjaan);
      });
    }
  }, []);

  dataUserKeys.map((key) => {
    if (dataUser[key].email === auth.currentUser.email) {
      userLogin = key;
    }
  });

  const renderPekerjaan = () => {
    console.log("=====================================================");
    Object.keys(dataPekerjaan).map((id_pekerjaan) => {
      if (dataPekerjaan[id_pekerjaan]["Id User"] == userLogin) {
        console.log(
          `Id pekerjaan : ${id_pekerjaan} dengan nama job ${dataPekerjaan[id_pekerjaan]["Job Title"]}`
        );
        return (
          <JobCard
            navigation={navigation}
            data={dataPekerjaan[id_pekerjaan]}
            key={id_pekerjaan}
            id={id_pekerjaan}
          ></JobCard>
        );
      }
    });
  };
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
