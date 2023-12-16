import {
  Animated,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../../constants";
import { toggleAnimation } from "../../animations/toggleAnimation";

const AccordionItem = ({ data }) => {
  const [showContent, setShowContent] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };

    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleListItem()}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data.judul}</Text>
          <Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
            <FontAwesome name="chevron-right" size={20} color={COLORS.font} />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {showContent && (
        <View style={styles.bodyContainer}>
          <Text style={styles.body}>{data.jawaban}</Text>
        </View>
      )}
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.lightWhite,
    marginBottom: "2%",
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    width: "90%",
    fontSize: 18,
    color: COLORS.font,
    fontWeight: "600",
    lineHeight: 25,
  },
  bodyContainer: {
    paddingHorizontal: "2%",
    paddingVertical: "3%",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.font,
  },
});
