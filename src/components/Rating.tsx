import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '../constants/colors';
import { RatingProps } from '../types';
import DefaultRatingImage from './RatingImage';

const Rating: React.FC<RatingProps> = props => {
  const {
    count = 5,
    defaultRating = 0,
    size = 40,
    onFinishRating = () => {},
    onSwipeRating = () => {},
    unselectedColor = '#BDC3C7',
    selectedColor = '#F1C40F',
    disabled = false,
    style,
    showRating = false,
    readonly = false,
    startingValue = defaultRating,
    fractions = 2,
    minValue = 0,
    jumpValue = 0.5,
    RatingImage = DefaultRatingImage,
  } = props;

  const [position] = useState(new Animated.ValueXY());
  const [rating, setRating] = useState(startingValue);
  const [displayRating, setDisplayRating] = useState(startingValue);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const panResponder = useRef<PanResponderInstance>();

  // Initialize the component with starting values
  useEffect(() => {
    setRating(startingValue);
    setDisplayRating(startingValue);
  }, [startingValue]);

  // Initialize PanResponder
  useEffect(() => {
    panResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (disabled || readonly) return;

        const newPosition = { x: gesture.dx, y: gesture.dy };
        if (Math.abs(gesture.dx) <= dimensions.width) {
          position.setValue(newPosition);
          handleSwipe(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (disabled || readonly) return;

        position.flattenOffset();
        const newRating = getRatingFromSwipe(gesture.dx);
        setRating(newRating);
        setDisplayRating(newRating);
        onFinishRating(newRating);
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 7,
          tension: 40,
          useNativeDriver: false,
        }).start();
      },
    });
  }, [dimensions.width, disabled, readonly]);

  const handleSwipe = (dx: number) => {
    const newRating = getRatingFromSwipe(dx);
    setDisplayRating(newRating);
    onSwipeRating(newRating);
  };

  const getRatingFromSwipe = (dx: number): number => {
    const startX = 0;
    const endX = dimensions.width;
    const maxRating = count;
    const totalWidth = endX - startX;

    // Calculate the percentage of the total width
    const ratio = Math.max(0, Math.min(1, (dx + totalWidth / 2) / totalWidth));

    // Calculate absolute rating based on the ratio
    let absoluteRating = ratio * maxRating;

    // Apply fraction rules
    if (fractions) {
      absoluteRating = parseFloat((Math.ceil(absoluteRating * fractions) / fractions).toFixed(2));
    } else {
      absoluteRating = Math.ceil(absoluteRating);
    }

    // Apply min value
    return Math.max(minValue, absoluteRating);
  };

  const getRatingStyles = (index: number) => {
    const threshold = index + 1;
    const colorStyle: any = {
      backgroundColor: unselectedColor,
    };

    if (rating >= threshold) {
      colorStyle.backgroundColor = selectedColor;
      colorStyle.width = '100%';
    } else if (rating > threshold - 1 && rating < threshold) {
      const percent = (rating - (threshold - 1)) * 100;
      colorStyle.backgroundColor = selectedColor;
      colorStyle.width = `${percent}%`;
    } else {
      colorStyle.width = 0;
    }

    return colorStyle;
  };

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  const handleRatingTap = (index: number) => {
    if (disabled || readonly) return;

    const newRating = index + jumpValue;
    setRating(newRating);
    setDisplayRating(newRating);
    onFinishRating(newRating);
  };

  const renderRatingItems = () => {
    const ratingItems = [];

    for (let i = 0; i < count; i++) {
      ratingItems.push(
        <View
          key={i}
          style={[
            styles.ratingItem,
            {
              width: size,
              height: size,
            },
          ]}
          onTouchEnd={() => handleRatingTap(i)}>
          <View style={[styles.filledRating, getRatingStyles(i)]} />
          <RatingImage filled={rating >= i + 1} tintColor={selectedColor} size={size} />
        </View>,
      );
    }

    return ratingItems;
  };

  return (
    <View style={[styles.container, style]}>
      {showRating && (
        <View style={styles.ratingTextContainer}>
          <Text style={styles.ratingText}>{displayRating.toFixed(fractions)}</Text>
        </View>
      )}
      <Animated.View
        {...(panResponder.current ? panResponder.current.panHandlers : {})}
        style={[styles.ratingContainer, position.getLayout()]}
        onLayout={handleLayoutChange}>
        {renderRatingItems()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledRating: {
    backgroundColor: Colors.primary,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ratingItem: {
    borderRadius: 20,
    margin: 3,
    overflow: 'hidden',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingTextContainer: {
    marginBottom: 10,
  },
});

export default Rating;
