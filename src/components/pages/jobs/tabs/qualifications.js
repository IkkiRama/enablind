import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

const Qualifications = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>{title}</Text>
      <View style={styles.contentBox}>
        {data.map((perData, i) => (
          <Text key={i} style={styles.contextText}>
            {i + 1}. {perData}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Qualifications;
