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
  const [centerIndex, setCenterIndex] = React.useState(values.length - 1); // Start at bottom
  const isScrolling = useRef(false);
  const scrollEndTimer = useRef<NodeJS.Timeout>();
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const scrollStopTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize to show last item (bottom) first
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToIndex(values.length - 1, false);
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToIndex = (index: number, animated = true) => {
    const clampedIndex = clamp(index, 0, values.length - 1);
    flatListRef.current?.scrollToOffset({
      offset: clampedIndex * ITEM_HEIGHT,
      animated,
    });
    if (clampedIndex !== centerIndex) {
      setCenterIndex(clampedIndex);
    }
    onChange(values[clampedIndex]);
  };

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

  const handleScrollUp = () => {
    scrollToIndex(centerIndex - 1);
  };

  const handleScrollDown = () => {
    scrollToIndex(centerIndex + 1);
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    //if (!isScrolling.current) return;
    console.log("HandleScrollEnd called");

    clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = setTimeout(() => {
      isScrolling.current = false;
      const y = e.nativeEvent.contentOffset.y;
      const index = Math.round(y / ITEM_HEIGHT);
      scrollToIndex(index);
    }, 100); // Small delay to allow momentum to settle
    sloppyScrollEnd();
    console.log("Scroll ended at index:", centerIndex);
  };
  const sloppyScrollEnd = () => {
    scrollToIndex(centerIndex);
    console.log("Sloppy scroll end at index:", centerIndex);
    onChange(values[centerIndex]);
  };

  // Modified scroll handler to track scrolling state
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = e.nativeEvent.contentOffset.y;
        setLastScrollY(y);
        if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
        scrollStopTimer.current = setTimeout(() => {
          // If the scroll position hasn't changed for 100ms, snap
          sloppyScrollEnd();
        }, 100);
        const index = Math.round(y / ITEM_HEIGHT);
        const clampedIndex = clamp(index, 0, values.length - 1);
        if (clampedIndex !== centerIndex) {
          setCenterIndex(clampedIndex);
        }
        onChange(values[clampedIndex]);
      },
    }
  );

  const scrollEndTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Start a timer to snap after 200ms (adjust as needed)
    if (scrollEndTimeout.current) clearTimeout(scrollEndTimeout.current);
    scrollEndTimeout.current = setTimeout(() => {
      sloppyScrollEnd();
    }, 200);
  };

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    // Snap immediately and clear any pending timer
    if (scrollEndTimeout.current) clearTimeout(scrollEndTimeout.current);
    sloppyScrollEnd();
  };

  const debuggingLog = () => {
    console.log("DragEnd called");
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
      displayValue = `${item}%`;
    } else if (format === "Fixed" || format === "sumFixed") {
      displayValue = `${item.toFixed(2)}€`;
    } else {
      displayValue = `${item.toFixed(2)}€`;
    }

    return (
      <Animated.View
        style={[
          styles.item,
          {
            height: ITEM_HEIGHT,
            transform: [{ scale: scaleAnim }],
            opacity,
            backgroundColor: "transparent",
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
          ref={flatListRef}
          data={values}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="center"
          decelerationRate={0.05}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingVertical: CENTER_OFFSET,
          }}
          initialScrollIndex={values.length - 1}
          onScrollBeginDrag={() => {
            isScrolling.current = true;
          }}
          onScroll={handleScroll}
          //onMomentumScrollEnd={sloppyScrollEnd}
          onScrollEndDrag={debuggingLog}
          //onTouchEnd={sloppyScrollEnd}
          //onScrollAnimationEnd={sloppyScrollEnd}
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
