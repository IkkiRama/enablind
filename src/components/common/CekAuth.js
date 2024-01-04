import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";

import { db } from "../../configs/firebase";
const CekAuth = () => {
  const auth = getAuth();
  let userLogin;
  const [dataUser, setDataUser] = useState({});
  const dataUserKeys = Object.keys(dataUser);

  useEffect(() => {
    if (auth.currentUser != null) {
      return onValue(ref(db, "User"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let dataUser = { ...data };
        setDataUser(dataUser);
      });
    }
  }, []);

  dataUserKeys.map((key) => {
    if (dataUser[key].email === auth.currentUser.email) {
      JSON.stringify((userLogin = dataUser[key]));
    }
  });

  return userLogin;
};

export default CekAuth;
