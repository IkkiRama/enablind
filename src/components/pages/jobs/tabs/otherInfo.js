import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";
import numberFormat from "../../../../utils/numberFormat";

const OtherInfo = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>{title}</Text>
      <View style={styles.contentBox}>
        {data.map((perData, i) => (
          <Text key={i} style={styles.contextText}>
            {perData[0]} :{" "}
            {perData[0] === "Job Salary"
              ? numberFormat(perData[1])
              : perData[1]}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default OtherInfo;
