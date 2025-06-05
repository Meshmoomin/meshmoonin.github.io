import React, { useRef } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from "react-native";
import { commonStyles } from "@/app/styles/commonStyles";

import ArrowUp from "@/assets/Icons/ArrowUp";
import ArrowDown from "@/assets/Icons/ArrowDown";
import FadeUpper from "@/assets/Icons/FadeUpper";
import FadeLower from "@/assets/Icons/FadeLower";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const ITEM_HEIGHT = 120;
const VISIBLE_ITEMS = 3;
const CENTER_OFFSET = ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2);

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList as React.ComponentClass<
    React.ComponentProps<typeof FlatList<number>>
  >
) as React.ComponentType<
  React.ComponentProps<typeof FlatList<number>> & {
    ref?: React.Ref<FlatList<number>>;
  }
>;

interface RoundingCarouselProps {
  values: number[];
  currentTotal: number;
  onChange: (value: number) => void;
}

const RoundingCarousel: React.FC<RoundingCarouselProps> = ({
  values,
  currentTotal,
  onChange,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<number>>(null);

  // Add currentTotal to the bottom of the list
  const extendedValues = [...values, currentTotal];

  // Initialize the selected value to the last value in the list
  const [centerIndex, setCenterIndex] = React.useState(
    extendedValues.length - 1
  );

  const getItemLayout = (
    data: ArrayLike<number> | null | undefined,
    index: number
  ) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < extendedValues.length) {
      flatListRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: true,
      });
      onChange(extendedValues[index]); // Update the selected value
      setCenterIndex(index); // Update the center index
    }
  };

  const handleScrollUp = () => {
    scrollToIndex(centerIndex - 1);
  };

  const handleScrollDown = () => {
    scrollToIndex(centerIndex + 1);
  };

  // Debounce utility
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const handleScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    setCenterIndex(index);
    flatListRef.current?.scrollToOffset({
      offset: index * ITEM_HEIGHT,
      animated: true,
    });
    onChange(extendedValues[index]);
  };

  // Debounced scroll handler for web/desktop
  const debouncedScrollEnd = useRef(
    debounce((y: number) => {
      const index = Math.round(y / ITEM_HEIGHT);
      setCenterIndex(index);
      flatListRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: true,
      });
      onChange(extendedValues[index]);
    }, 60)
  ).current;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    setCenterIndex(Math.round(y / ITEM_HEIGHT));
    debouncedScrollEnd(y);
  };

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    onChange(extendedValues[index]); // Update the selected value
    //console.log("Selected value:", extendedValues[index]); // Log the selected value
  };

  const renderItem = ({ item, index }: { item: number; index: number }) => {
    const inputRange = [
      (index - 2) * ITEM_HEIGHT,
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
      (index + 2) * ITEM_HEIGHT,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.7, 0.85, 1, 0.85, 0.7],
      extrapolate: "clamp",
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0.7, 1, 0.5, 0.7],
      extrapolate: "clamp",
    });

    const isCenterItem = index === centerIndex;

    return (
      <Animated.View
        style={[
          styles.item,
          {
            height: ITEM_HEIGHT,
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Text
          style={[
            styles.valueText,
            { fontWeight: isCenterItem ? "bold" : "normal" },
          ]}
          adjustsFontSizeToFit
          numberOfLines={1}
          minimumFontScale={0.5}
        >
          {item.toFixed(2)}€
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={[styles.fade, { top: 0, height: 80, width: "100%" }]}>
          <LinearGradient
            colors={["white", "transparent"]}
            style={{ flex: 1, width: "100%" }}
            start={{ x: 0.0, y: 0.2 }}
            end={{ x: 0.0, y: 1 }}
          />
        </View>
        <AnimatedFlatList
          onLayout={() => {
            scrollToIndex(extendedValues.length - 1);
          }}
          ref={flatListRef}
          data={extendedValues}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate={"fast"}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingVertical: CENTER_OFFSET,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
              listener: handleScroll,
            }
          )}
          onMomentumScrollEnd={handleMomentumEnd}
          onScrollEndDrag={handleScrollEndDrag}
          initialScrollIndex={extendedValues.length - 1} // Start at the last value
        />
      </View>
      <FadeLower
        style={[
          {
            bottom: 0,
          },
          styles.fade,
        ]}
        width="70%"
      />
      <View style={[styles.fade, { bottom: 0, height: 60, width: "100%" }]}>
        <LinearGradient
          colors={["transparent", "white"]}
          style={{ flex: 1, width: "100%" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            commonStyles.button,
            pressed && commonStyles.buttonPressed,
          ]}
          onPress={handleScrollUp}
        >
          <ArrowUp style={styles.icon} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            commonStyles.button,
            pressed && commonStyles.buttonPressed,
          ]}
          onPress={handleScrollDown}
        >
          <ArrowDown style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

// Updated styles
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    justifyContent: "center",
    overflow: "hidden",
    /* borderWidth: 1, // Debugging style, remove in production.
    borderColor: "#ccc", // Debugging style, remove in production*/
  },
  fade: {
    pointerEvents: "none",
    position: "absolute",
    flexDirection: "row",
    zIndex: 1,
    overflow: "hidden",
  },
  icon: {
    margin: 5,
  },
  buttonContainer: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#ece6f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 70,
    lineHeight: 80,
    color: "#4f4f4f",
    fontFamily: "Roboto",
    fontWeight: "semibold",
  },
});

export default RoundingCarousel;
