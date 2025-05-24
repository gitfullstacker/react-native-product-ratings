# React Native Product Ratings

[![npm version](https://img.shields.io/npm/v/react-native-product-ratings.svg)](https://www.npmjs.com/package/react-native-product-ratings)
[![npm downloads](https://img.shields.io/npm/dm/react-native-product-ratings.svg)](https://www.npmjs.com/package/react-native-product-ratings)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/react-native-product-ratings.svg)](./LICENSE)

A comprehensive and customizable rating component library for React Native applications. Features multiple rating types including stars, hearts, bells, rockets, and custom Airbnb-style ratings with support for swipe gestures, fractional ratings, and various interaction modes.

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0;">
  <img src="./resources/star-rating.png" width="200" alt="Star Rating Example" />
  <img src="./resources/heart-rating.png" width="200" alt="Heart Rating Example" />
  <img src="./resources/bell-rating.png" width="200" alt="Bell Rating Example" />
  <img src="./resources/rocket-rating.png" width="200" alt="Rocket Rating Example" />
  <img src="./resources/airbnb-rating.png" width="200" alt="Airbnb-style Rating Example" />
</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0;">
  <img src="./resources/all.png" width="300" alt="All Examples" />
</div>

## Features

- ⭐ Multiple rating types (star, heart, bell, rocket, airbnb)
- 👆 Touch and swipe gesture support
- 📱 Fully customizable appearance
- 🎯 Fractional ratings support
- 🔒 Read-only and disabled states
- 📏 Configurable size and colors
- 🏷️ Custom rating labels
- 🎨 Custom rating images

## Installation

```bash
npm install react-native-product-ratings
```

or

```bash
yarn add react-native-product-ratings
```

## Basic Usage

### StarRating Component

```jsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { StarRating } from 'react-native-product-ratings';

const App = () => {
  const [rating, setRating] = useState(3.5);

  return (
    <View>
      <StarRating
        count={5}
        defaultRating={rating}
        size={40}
        selectedColor="#FFD700"
        allowHalfRating={true}
        onFinishRating={value => setRating(value)}
      />
    </View>
  );
};
```

### TapRating Component

```jsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { TapRating } from 'react-native-product-ratings';

const App = () => {
  const [rating, setRating] = useState(0);

  return (
    <View>
      <TapRating
        count={5}
        defaultRating={rating}
        size={50}
        selectedColor="#FF6B6B"
        showRatingText={true}
        ratingLabels={{
          1: 'Terrible',
          2: 'Bad',
          3: 'Okay',
          4: 'Good',
          5: 'Amazing',
        }}
        onFinishRating={value => setRating(value)}
      />
    </View>
  );
};
```

### Rating Component (with Swipe Gestures)

```jsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Rating } from 'react-native-product-ratings';

const App = () => {
  const [rating, setRating] = useState(2.5);

  return (
    <View>
      <Rating
        count={5}
        startingValue={rating}
        size={45}
        selectedColor="#F1C40F"
        unselectedColor="#BDC3C7"
        showRating={true}
        fractions={1}
        onFinishRating={value => setRating(value)}
        onSwipeRating={value => console.log('Swiping:', value)}
      />
    </View>
  );
};
```

## Advanced Usage Examples

### Custom Rating Types

```jsx
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RatingImage, StarRating } from 'react-native-product-ratings';

const CustomRatingExample = () => {
  const [heartRating, setHeartRating] = useState(0);
  const [rocketRating, setRocketRating] = useState(4);

  return (
    <View style={styles.container}>
      {/* Heart Rating */}
      <StarRating
        count={5}
        defaultRating={heartRating}
        size={40}
        selectedColor="#FF6B6B"
        onFinishRating={setHeartRating}
        RatingImage={props => <RatingImage {...props} type="heart" unselectedColor="#FFC0CB" />}
      />

      {/* Rocket Rating */}
      <StarRating
        count={5}
        defaultRating={rocketRating}
        size={35}
        selectedColor="#FF9800"
        onFinishRating={setRocketRating}
        RatingImage={props => <RatingImage {...props} type="rocket" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
});
```

### Read-only Rating Display

```jsx
import React from 'react';
import { Text, View } from 'react-native';
import { StarRating } from 'react-native-product-ratings';

const ReadOnlyRating = ({ productRating, reviewCount }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <StarRating
        count={5}
        defaultRating={productRating}
        size={20}
        selectedColor="#FFD700"
        readonly={true}
        allowHalfRating={true}
      />
      <Text>
        {productRating} ({reviewCount} reviews)
      </Text>
    </View>
  );
};
```

## Component Props

### StarRating Props

| Prop              | Type           | Default       | Description                       |
| ----------------- | -------------- | ------------- | --------------------------------- |
| `count`           | number         | `5`           | Number of rating items to display |
| `defaultRating`   | number         | `0`           | Initial rating value              |
| `size`            | number         | `40`          | Size of rating images             |
| `selectedColor`   | string         | `'#F1C40F'`   | Color of selected ratings         |
| `allowHalfRating` | boolean        | `false`       | Enable half-star ratings          |
| `direction`       | 'ltr' \| 'rtl' | `'ltr'`       | Direction of rating display       |
| `disabled`        | boolean        | `false`       | Disable user interaction          |
| `readonly`        | boolean        | `false`       | Make rating read-only             |
| `onFinishRating`  | function       | `() => {}`    | Callback when rating is completed |
| `RatingImage`     | component      | `RatingImage` | Custom rating image component     |
| `style`           | ViewStyle      | -             | Custom container styles           |

### TapRating Props

Extends all StarRating props plus:

| Prop             | Type                   | Default | Description                  |
| ---------------- | ---------------------- | ------- | ---------------------------- |
| `ratingLabels`   | Record<number, string> | `{}`    | Labels for each rating value |
| `labelStyle`     | object                 | -       | Style for rating labels      |
| `showRatingText` | boolean                | `true`  | Show rating text above stars |

### Rating Props (Swipe Rating)

| Prop              | Type      | Default         | Description                   |
| ----------------- | --------- | --------------- | ----------------------------- |
| `count`           | number    | `5`             | Number of rating items        |
| `defaultRating`   | number    | `0`             | Initial rating value          |
| `startingValue`   | number    | `defaultRating` | Starting rating value         |
| `size`            | number    | `40`            | Size of rating images         |
| `selectedColor`   | string    | `'#F1C40F'`     | Color of selected ratings     |
| `unselectedColor` | string    | `'#BDC3C7'`     | Color of unselected ratings   |
| `disabled`        | boolean   | `false`         | Disable interaction           |
| `readonly`        | boolean   | `false`         | Make read-only                |
| `showRating`      | boolean   | `false`         | Show numerical rating         |
| `fractions`       | number    | `2`             | Decimal places for rating     |
| `minValue`        | number    | `0`             | Minimum rating value          |
| `jumpValue`       | number    | `0.5`           | Rating increment on tap       |
| `onFinishRating`  | function  | `() => {}`      | Callback when rating finished |
| `onSwipeRating`   | function  | `() => {}`      | Callback during swipe         |
| `RatingImage`     | component | `RatingImage`   | Custom rating component       |
| `style`           | ViewStyle | -               | Custom container styles       |

### RatingImage Props

| Prop              | Type                                                | Default            | Description                      |
| ----------------- | --------------------------------------------------- | ------------------ | -------------------------------- |
| `filled`          | boolean                                             | -                  | Whether image is filled/selected |
| `size`            | number                                              | -                  | Size of the image                |
| `tintColor`       | string                                              | `Colors.primary`   | Color when filled                |
| `unselectedColor` | string                                              | `Colors.secondary` | Color when not filled            |
| `type`            | 'star' \| 'heart' \| 'bell' \| 'rocket' \| 'airbnb' | `'star'`           | Type of rating image             |

## Available Rating Types

The library includes several built-in rating types:

- **star** - Classic 5-star rating
- **heart** - Heart-shaped rating for favorites
- **bell** - Bell icons for notifications/alerts
- **rocket** - Rocket icons for performance ratings
- **airbnb** - Airbnb-style star rating

## Styling Examples

### Custom Colors and Size

```jsx
<StarRating
  count={5}
  defaultRating={3}
  size={50}
  selectedColor="#9C27B0"
  onFinishRating={rating => console.log(rating)}
  style={{
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
  }}
/>
```

### RTL Support

```jsx
<StarRating
  count={5}
  defaultRating={4}
  direction="rtl"
  selectedColor="#4CAF50"
  onFinishRating={rating => console.log(rating)}
/>
```

## Complete Example

```jsx
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Rating, RatingImage, StarRating, TapRating } from 'react-native-product-ratings';

const App = () => {
  const [ratings, setRatings] = useState({
    star: 3.5,
    heart: 0,
    bell: 2,
    rocket: 4,
    swipe: 2.5,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Star Rating */}
        <View style={styles.section}>
          <Text style={styles.title}>Star Rating</Text>
          <StarRating
            count={5}
            defaultRating={ratings.star}
            size={40}
            selectedColor="#FFD700"
            allowHalfRating={true}
            onFinishRating={value => setRatings({ ...ratings, star: value })}
          />
          <Text>Rating: {ratings.star}</Text>
        </View>

        {/* Heart Rating with Labels */}
        <View style={styles.section}>
          <Text style={styles.title}>Heart Rating</Text>
          <TapRating
            count={5}
            defaultRating={ratings.heart}
            size={40}
            selectedColor="#FF6B6B"
            showRatingText={true}
            ratingLabels={{
              1: 'Hate',
              2: 'Dislike',
              3: 'Okay',
              4: 'Like',
              5: 'Love',
            }}
            onFinishRating={value => setRatings({ ...ratings, heart: value })}
            RatingImage={props => <RatingImage {...props} type="heart" unselectedColor="#FFC0CB" />}
          />
        </View>

        {/* Swipe Rating */}
        <View style={styles.section}>
          <Text style={styles.title}>Swipe Rating</Text>
          <Rating
            count={5}
            startingValue={ratings.swipe}
            size={45}
            selectedColor="#F1C40F"
            showRating={true}
            fractions={1}
            onFinishRating={value => setRatings({ ...ratings, swipe: value })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
});

export default App;
```

## TypeScript Support

The library is fully typed and includes TypeScript definitions. All props are properly typed for better development experience.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [KGG Dev](https://github.com/gitfullstacker)

## Contact

KGG Dev - [@kgg.dev.company](https://www.facebook.com/kgg.dev.company) - fullstackdev2024@gmail.com

Project Link: [https://github.com/gitfullstacker/react-native-product-ratings](https://github.com/gitfullstacker/react-native-product-ratings)
