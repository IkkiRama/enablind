import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  LogBox,
} from "react-native";
import React, { useState, useRef } from "react";
import { COLORS, images } from "../../constants";

const Carousel = () => {
  const widthCarousel = Dimensions.get("window").width;

  const flatlistRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoadedImage, setIsLoadedImage] = useState(true);

  const getItemLayout = (data, index) => ({
    length: widthCarousel - 50,
    offset: (widthCarousel - 50) * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    // offset: widthCarousel * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });

  const carouselData = [
    {
      id: 1,
      image:
        "https://raw.githubusercontent.com/IkkiRama/AppSoed/main/src/assets/Images/s3.jpeg",
    },
    {
      id: 2,
      image:
        "https://raw.githubusercontent.com/IkkiRama/AppSoed/main/src/assets/Images/porsoed.png",
    },
    {
      id: 3,
      image:
        "https://raw.githubusercontent.com/IkkiRama/AppSoed/main/src/assets/Images/desa.png",
    },
    {
      id: 4,
      image:
        "https://raw.githubusercontent.com/IkkiRama/AppSoed/main/src/assets/Images/fosa.png",
    },
  ];

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View key={index}>
        <Image
          onLoad={() => setIsLoadedImage(false)}
          source={isLoadedImage ? images.defaultBanner : { uri: item.image }}
          style={{
            marginHorizontal: 5,
            height: 120,
            width: widthCarousel - 65,
            borderRadius: 10,
          }}
          resizeMode={item.id === 1 || isLoadedImage ? "contain" : "cover"}
        />
      </View>
    );
  };

  const handleScroll = (event) => {
    // get user scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;

    // const index = Math.round(
    //   parseInt(
    //     (scrollPosition + 50 * (activeIndex + 1)).toFixed() /
    //       widthCarousel.toFixed()
    //   )
    // );

    const index = parseInt((scrollPosition / widthCarousel).toFixed());

    setActiveIndex(index);
  };

  const renderDotIndicators = (activeIndex) =>
    carouselData.map((dot, index) => {
      // if activeIndex === index
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: COLORS.primary,
              height: 7,
              width: 20,
              borderRadius: 5,
              marginHorizontal: 3,
            }}
          ></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: COLORS.gray2,
              height: 7,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 3,
            }}
          ></View>
        );
      }
    });
  return (
    <View style={{ alignItems: "center" }}>
      <FlatList
        horizontal
        ref={flatlistRef}
        key={carouselData}
        data={carouselData}
        pagingEnabled={true}
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={{
          // paddingHorizontal: 5,
          // width: (90 / 100) * widthCarousel,
          width: "90%",
          position: "relative",
          top: -50,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
          top: -45,
        }}
      >
        {renderDotIndicators(activeIndex)}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
