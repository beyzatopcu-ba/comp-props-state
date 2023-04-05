import { Dimensions } from "react-native";

const {
    width,
    height,
} = Dimensions.get('window');

const measure = (size: number) => (size * width) / 360;

export const Metrics = {
    width,
    height,
    measure,
};
