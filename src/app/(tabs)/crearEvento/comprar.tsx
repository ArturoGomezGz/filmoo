import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";

export default function ComprarScreen() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.header}>
                    <Text style={styles.title}>Sé el primero</Text>
                    <Text style={styles.subtitle}>
                        Para completar tu película debes poner el ejemplo, ¡sé el primero en comprar tu boleto!
                    </Text>
                </View>

                {/* Resumen */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumen</Text>

                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryItem}>🎬 Película seleccionada</Text>
                        <Text style={styles.summaryItem}>📍 Cine seleccionado</Text>
                        <Text style={styles.summaryItem}>🕒 Fecha y hora elegidas</Text>
                    </View>
                </View>

                {/* Método de pago */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Método de pago</Text>

                    <View style={styles.paymentCard}>
                        <Text style={styles.paymentTitle}>Tarjeta de crédito</Text>
                        <Text style={styles.paymentSubtitle}>
                            **** **** **** 1234
                        </Text>
                    </View>
                </View>

                {/* Total */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Total</Text>

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Boleto</Text>
                        <Text style={styles.totalAmount}>$120.00 MXN</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Finalizar compra</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 24,
        paddingBottom: 120,
    },

    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 8,
        color: "#111",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
    },

    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 12,
        color: "#111",
    },

    summaryCard: {
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        gap: 8,
    },
    summaryItem: {
        fontSize: 14,
        color: "#333",
    },

    paymentCard: {
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    paymentTitle: {
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 4,
        color: "#111",
    },
    paymentSubtitle: {
        fontSize: 13,
        color: "#666",
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    totalLabel: {
        fontSize: 15,
        color: "#333",
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111",
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        backgroundColor: "#fff",
    },
    primaryButton: {
        height: 48,
        borderRadius: 8,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
