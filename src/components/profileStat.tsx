import { View, Text, StyleSheet } from "react-native";

interface Props {
    label: string;
    value: string;
}

export default function ProfileStat({ label, value }: Props) {
    return (
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statItem: {
        alignItems: "center",
        flex: 1
    },

    statValue: {
        fontSize: 16,
        fontWeight: "500"
    },

    statLabel: {
        fontSize: 12,
        color: "#888888",
        textAlign: "center"
    }, 
});