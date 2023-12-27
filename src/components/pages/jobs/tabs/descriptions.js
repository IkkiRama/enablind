import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

const JobDescriptions = ({ data, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>{title}</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{data}</Text>
      </View>
    </View>
  );
};

export default JobDescriptions;
