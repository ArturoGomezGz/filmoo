import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
    // Functional prps
    onClick: () => void;

    // Styling props
    label: string;
    loading: boolean;
    loadingLabel?: string;
}

export default function PrimaryButton(props: Props) {
    return (
        <TouchableOpacity
            style={[
                styles.primaryButton,
                props.loading && { opacity: 0.6 },
            ]}
            onPress={props.onClick}
            disabled={props.loading}
        >
            <Text style={styles.primaryButtonText}>
                {props.loading ? props.loadingLabel || "Cargando..." : props.label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: "#000",
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: "center",
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});