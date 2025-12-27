import { StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";

interface Props {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    onPress: () => void;
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 3 - 16;

export default function Poster(props: Props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.card}>
            <Image
                source={{ uri: props.imageUrl }}
                style={styles.image}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: ITEM_WIDTH,
        aspectRatio: 2 / 3,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#eee",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});