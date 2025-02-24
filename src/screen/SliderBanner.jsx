import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useRef, useEffect } from "react";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

const SliderBanner = () => {
  const carouselRef = useRef(null);
  const bannerImages = [
    require("../assets/banner14.jpg"),
    require("../assets/banner13.jpg"),
    require("../assets/banner12.jpg"),
    require("../assets/banner11.jpg"),
    require("../assets/banner10.jpg"),
    // require("../assets/banner15.jpg"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.snapToNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={bannerImages}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.9}
        autoplay={true}
        loop={true}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        enableMomentum={true}
        lockScrollWhileSnapping={true}
        autoplayInterval={10000}
        layout="default"
        firstItem={1}
      />
    </View>
  );
};

export default SliderBanner;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
  },
  slide: {
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: width * 0.9,
    height: 180,
    borderRadius: 10,
  },
});
