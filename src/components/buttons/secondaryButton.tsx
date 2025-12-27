import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface Props {
    // Functional prps
    onClick: () => void;

    // Styling props
    label: string;
}

export default function SecondaryButton(props: Props) {
    return (
        <TouchableOpacity style={styles.secondaryButton} onPress={props.onClick}>
            <Text style={styles.secondaryButtonText}>{props.label}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    secondaryButton: {
        marginTop: 14,
        alignItems: "center",
    },
    secondaryButtonText: {
        color: "#000",
        fontSize: 15,
        fontWeight: "500",
    },
});