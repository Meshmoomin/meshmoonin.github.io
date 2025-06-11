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

// Responsive scaling
const BASE_ITEM_HEIGHT = 80;
const BASE_BUTTON_SIZE = 60; // or 64 for even larger buttons
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = Math.min(SCREEN_WIDTH / 250, SCREEN_HEIGHT / 500, 1.5);
const ITEM_HEIGHT = BASE_ITEM_HEIGHT * scale;
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
  format: string;
  onChange: (value: number) => void;
}

const RoundingCarousel: React.FC<RoundingCarouselProps> = ({
  values,
  currentTotal,
  format,
  onChange,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<number>>(null);

  // Add currentTotal to the bottom of the list
  //const extendedValues = [...values, currentTotal];
  const extendedValues = [...values];

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

  const clamp = (num: number, min: number, max: number) =>
    Math.max(min, Math.min(num, max));

  const scrollToIndex = (index: number) => {
    const clampedIndex = clamp(index, 0, extendedValues.length - 1);
    flatListRef.current?.scrollToOffset({
      offset: clampedIndex * ITEM_HEIGHT,
      animated: true,
    });
    onChange(extendedValues[clampedIndex]);
    setCenterIndex(clampedIndex);
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
    const index = clamp(
      Math.round(y / ITEM_HEIGHT),
      0,
      extendedValues.length - 1
    );
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
    const index = clamp(
      Math.round(y / ITEM_HEIGHT),
      0,
      extendedValues.length - 1
    );
    setCenterIndex(index);
    debouncedScrollEnd(y);
  };

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = clamp(
      Math.round(y / ITEM_HEIGHT),
      0,
      extendedValues.length - 1
    );
    onChange(extendedValues[index]);
  };

  const renderItem = ({ item, index }: { item: number; index: number }) => {
    const inputRange = [
      (index - 2) * ITEM_HEIGHT,
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
      (index + 2) * ITEM_HEIGHT,
    ];

    const scaleAnim = scrollY.interpolate({
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

    // Format display value
    let displayValue: string;
    if (format === "Percent") {
      displayValue = item + "%";
    } else {
      displayValue = item.toFixed(2) + "€";
    }

    return (
      <Animated.View
        style={[
          styles.item,
          {
            height: ITEM_HEIGHT,
            transform: [{ scale: scaleAnim }],
            opacity,
          },
        ]}
      >
        <Text
          style={[
            styles.valueText,
            {
              fontWeight: isCenterItem ? "bold" : "normal",
              fontSize: 48 * scale,
              lineHeight: 56 * scale,
            },
          ]}
          adjustsFontSizeToFit
          numberOfLines={1}
          minimumFontScale={0.5}
        >
          {displayValue}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View
          style={[styles.fade, { top: 0, height: 80 * scale, width: "100%" }]}
        >
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
          initialScrollIndex={Math.max(
            0,
            Math.min(extendedValues.length - 1, extendedValues.length - 1)
          )}
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
      <View
        style={[styles.fade, { bottom: 0, height: 60 * scale, width: "100%" }]}
      >
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
            { padding: 10 * scale, borderRadius: 12 * scale },
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
            { padding: 10 * scale, borderRadius: 12 * scale },
          ]}
          onPress={handleScrollDown}
        >
          <ArrowDown style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

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
  },
  fade: {
    pointerEvents: "none",
    position: "absolute",
    flexDirection: "row",
    zIndex: 1,
    overflow: "hidden",
  },
  buttonContainer: {
    justifyContent: "space-between",
    marginLeft: 20, // more space between buttons and carousel
  },
  button: {
    backgroundColor: "#ece6f0",
    alignItems: "center",
    justifyContent: "center",
    width: BASE_BUTTON_SIZE * scale,
    height: BASE_BUTTON_SIZE * scale,
    borderRadius: (BASE_BUTTON_SIZE * scale) / 2,
    marginVertical: 10,
  },
  icon: {
    width: 32 * scale,
    height: 32 * scale,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 32 * scale,
    lineHeight: 40 * scale,
    color: "#4f4f4f",
    fontFamily: "Roboto",
    fontWeight: "600",
  },
});

export default RoundingCarousel;
