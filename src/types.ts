import { StyleProp, ViewStyle } from 'react-native';

export interface RatingImageProps {
  filled: boolean;
  size: number;
  tintColor?: string;
  unselectedColor?: string;
  type?: 'star' | 'heart' | 'bell' | 'rocket' | 'airbnb';
}

export interface RatingProps {
  /**
   * Number of rating images to display
   * @default 5
   */
  count?: number;

  /**
   * Initial rating value
   * @default 0
   */
  defaultRating?: number;

  /**
   * Size of rating image
   * @default 40
   */
  size?: number;

  /**
   * Callback method when the rating is finished
   */
  onFinishRating?: (rating: number) => void;

  /**
   * Callback method when rating is changed (in realtime)
   */
  onSwipeRating?: (rating: number) => void;

  /**
   * Color of background for rating container
   * @default 'white'
   */
  tintColor?: string;

  /**
   * Color of unselected rating
   * @default '#BDC3C7'
   */
  unselectedColor?: string;

  /**
   * Color of selected rating
   * @default '#F1C40F'
   */
  selectedColor?: string;

  /**
   * Determines if the rating can be modified
   * @default false
   */
  readonly?: boolean;

  /**
   * Determines if the rating is disabled for interaction
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom style for the container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Determines if to show the rating value
   * @default false
   */
  showRating?: boolean;

  /**
   * Starting value for the rating
   * @default 0
   */
  startingValue?: number;

  /**
   * The number of decimal places for the rating value
   * @default 2
   */
  fractions?: number;

  /**
   * The minimum value for the rating
   * @default 0
   */
  minValue?: number;

  /**
   * Determines the size of value change on click
   * @default 0.5
   */
  jumpValue?: number;

  /**
   * Custom Rating Image component
   */
  RatingImage?: React.ComponentType<RatingImageProps>;

  /**
   * Type of rating image
   * @default 'star'
   */
  type?: 'star' | 'heart' | 'bell' | 'rocket' | 'custom';
}

export interface StarRatingProps extends RatingProps {
  /**
   * Whether to allow fractional ratings
   * @default false
   */
  allowHalfRating?: boolean;

  /**
   * Direction of rating
   * @default 'ltr' (left to right)
   */
  direction?: 'ltr' | 'rtl';
}

export interface SwipeRatingProps extends RatingProps {
  /**
   * Whether to allow swipe gestures for rating
   * @default true
   */
  swipeable?: boolean;
}
