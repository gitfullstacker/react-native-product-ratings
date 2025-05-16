import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Colors } from '../constants/colors';
import { RatingImageProps } from '../types';

const ICON_TYPES = {
  star: require('../images/star.png'),
  heart: require('../images/heart.png'),
  bell: require('../images/bell.png'),
  rocket: require('../images/rocket.png'),
  airbnb: require('../images/airbnb-star.png'),
};

const RatingImage: React.FC<RatingImageProps> = ({
  filled,
  size,
  tintColor = Colors.primary,
  unselectedColor = Colors.secondary,
  type = 'star',
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={ICON_TYPES[type] || ICON_TYPES.star}
        style={[
          styles.image,
          {
            tintColor: filled ? tintColor : unselectedColor,
            opacity: filled ? 1 : 0.6,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '80%',
    width: '80%',
  },
});

export default RatingImage;
