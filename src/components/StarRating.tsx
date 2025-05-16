import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { StarRatingProps } from '../types';
import DefaultRatingImage from './RatingImage';

const StarRating: React.FC<StarRatingProps> = ({
  count = 5,
  defaultRating = 0,
  size = 40,
  selectedColor = '#F1C40F',
  allowHalfRating = false,
  direction = 'ltr',
  disabled = false,
  readonly = false,
  onFinishRating = () => {},
  RatingImage = DefaultRatingImage,
}) => {
  const [rating, setRating] = React.useState(defaultRating);

  const handleRatingPress = (selectedRating: number) => {
    if (readonly || disabled) return;

    let newRating = selectedRating;
    if (allowHalfRating) {
      // If clicking the same star again, toggle between full and half
      newRating = rating === selectedRating - 0.5 ? selectedRating : selectedRating - 0.5;
    }

    setRating(newRating);
    onFinishRating(newRating);
  };

  return (
    <View
      style={[styles.container, { flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }]}>
      {Array.from({ length: count }, (_, i) => {
        const starNumber = i + 1;
        const isFilled = rating >= starNumber;
        const isHalfFilled = !isFilled && rating > starNumber - 0.5 && allowHalfRating;

        return (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            onPress={() => handleRatingPress(starNumber)}
            disabled={disabled || readonly}
            style={{ marginHorizontal: 2 }}>
            <RatingImage filled={isFilled || isHalfFilled} size={size} tintColor={selectedColor} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default StarRating;
