import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../constants";
import JobCard from "../../common/card/jobCard";

const PopularJobs = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Popular Jobs</Text>
        {/* <Text style={styles.textShowAll}>Show all</Text> */}
      </View>
      <View>
        <JobCard></JobCard>
        <JobCard></JobCard>
        <JobCard></JobCard>
        <JobCard></JobCard>
      </View>
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

  textShowAll: {
    fontSize: 17,

    fontWeight: "600",
    color: COLORS.primary,
  },
});
