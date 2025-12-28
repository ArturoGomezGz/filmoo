import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";

export default function HorarioScreen() {
    const [date, setDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const times = [
        "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30",
        "14:00", "14:30", "15:00", "15:30",
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.header}>
                    <Text style={styles.title}>Selecciona el horario</Text>
                    <Text style={styles.subtitle}>
                        Elige la fecha y la hora en la que se realizará la función.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Fecha</Text>

                    <TouchableOpacity
                        style={styles.dateSelector}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text style={styles.dateText}>
                            {date
                                ? date.toLocaleDateString()
                                : "Seleccionar fecha"}
                        </Text>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={date ?? new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(_, selectedDate) => {
                                setShowPicker(false);
                                if (selectedDate) setDate(selectedDate);
                            }}
                        />
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hora</Text>

                    <View style={styles.timeGrid}>
                        {times.map(time => {
                            const selected = selectedTime === time;

                            return (
                                <TouchableOpacity
                                    key={time}
                                    style={[
                                        styles.timeSlot,
                                        selected && styles.timeSlotSelected,
                                    ]}
                                    onPress={() => setSelectedTime(time)}
                                >
                                    <Text
                                        style={[
                                            styles.timeText,
                                            selected && styles.timeTextSelected,
                                        ]}
                                    >
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={styles.helperText}>
                        Las funciones comienzan cada 30 minutos
                    </Text>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.push("/(tabs)/crearEvento/ubicacion")} style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Continuar</Text>
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
    dateSelector: {
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    dateText: {
        fontSize: 14,
        color: "#333",
    },
    timeGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    timeSlot: {
        width: "30%",
        height: 42,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    timeSlotSelected: {
        backgroundColor: "#121212",
        borderColor: "#121212",
    },
    timeText: {
        fontSize: 13,
        color: "#333",
    },
    timeTextSelected: {
        color: "#fff",
        fontWeight: "500",
    },
    helperText: {
        marginTop: 12,
        fontSize: 12,
        color: "#888",
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
