import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RatingProps } from '../types';
import DefaultRatingImage from './RatingImage';

interface TapRatingProps extends RatingProps {
  /**
   * Labels to show above rating
   */
  ratingLabels?: Record<number, string>;

  /**
   * Style for the rating labels
   */
  labelStyle?: object;

  /**
   * Whether to show rating text
   */
  showRatingText?: boolean;
}

const TapRating: React.FC<TapRatingProps> = props => {
  const {
    count = 5,
    defaultRating = 0,
    size = 40,
    onFinishRating = () => {},
    selectedColor = '#F1C40F',
    disabled = false,
    style,
    readonly = false,
    startingValue = defaultRating,
    ratingLabels = {},
    labelStyle,
    RatingImage = DefaultRatingImage,
    showRatingText = true,
  } = props;

  const [rating, setRating] = React.useState(startingValue);

  React.useEffect(() => {
    setRating(startingValue);
  }, [startingValue]);

  const handleRatingPress = (selectedRating: number) => {
    if (readonly || disabled) return;

    setRating(selectedRating);
    onFinishRating(selectedRating);
  };

  const getRatingLabel = (): string => {
    if (ratingLabels && ratingLabels[Math.ceil(rating)]) {
      return ratingLabels[Math.ceil(rating)];
    }
    return '';
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= count; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          activeOpacity={0.7}
          onPress={() => handleRatingPress(i)}
          disabled={disabled || readonly}
          style={{ padding: 5 }}>
          <RatingImage filled={rating >= i} tintColor={selectedColor} size={size} />
        </TouchableOpacity>,
      );
    }

    return stars;
  };

  return (
    <View style={[styles.container, style]}>
      {showRatingText && rating > 0 && (
        <Text style={[styles.ratingLabel, labelStyle]}>{getRatingLabel()}</Text>
      )}
      <View style={styles.starsContainer}>{renderStars()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  starsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default TapRating;
