import Rating from './components/Rating';
import RatingImage from './components/RatingImage';
import StarRating from './components/StarRating';
import TapRating from './components/TapRating';

// Export the components
export { Rating, StarRating, TapRating, RatingImage };

// Export the types
export * from './types';

// Default export with explicit type
export default {
  Rating,
  StarRating,
  TapRating,
  RatingImage,
} as {
  Rating: typeof Rating;
  StarRating: typeof StarRating;
  TapRating: typeof TapRating;
  RatingImage: typeof RatingImage;
};
