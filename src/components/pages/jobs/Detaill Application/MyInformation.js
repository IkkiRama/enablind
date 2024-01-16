import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyInformation = ({ data }) => {
  let education = data["education"].join(", ");
  let experience = "";

  if (data["experience"] !== "") {
    experience = data["experience"].join(", ");
  }
  return (
    <View
      accessible={true}
      accessibilityLabel={`my personal information with full name is ${data["nama"]}, email ${data["email"]}, active phone numer ${data["phoneHumber"]}, house addres ${data["house"]}, education ${education}, experience ${experience}, and summary ${data["summary"]}`}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleInformation}>Full Name</Text>
        <Text style={styles.userInformation}>{data["nama"]}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleInformation}>Email</Text>
        <Text style={styles.userInformation}>{data["email"]}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleInformation}>Active Phone Number</Text>
        <Text style={styles.userInformation}>{data["phoneHumber"]}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleInformation}>House Address</Text>
        <Text style={styles.userInformation}>{data["houseAddress"]}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleInformation}>Education</Text>
        <Text style={styles.userInformation}>{education}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleInformation}>Experience</Text>
        <Text style={styles.userInformation}>{experience}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleInformation}>Summary</Text>
        <Text style={styles.userInformation}>{data["summary"]}</Text>
      </View>
    </View>
  );
};

export default MyInformation;

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 7,
    paddingHorizontal: 10,
  },
  titleInformation: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 3,
  },
  userInformation: {
    fontSize: 16,
  },
});
