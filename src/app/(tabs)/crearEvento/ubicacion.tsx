import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { router } from "expo-router";

type Cine = {
    id: string;
    nombre: string;
    direccion: string;
};

export default function UbicacionScreen() {
    const [selectedCine, setSelectedCine] = useState<string | null>(null);

    const cines: Cine[] = [
        {
            id: "1",
            nombre: "Cinepolis Andares",
            direccion: "Blvd. Puerta de Hierro 4965",
        },
        {
            id: "2",
            nombre: "Cinemex La Gran Plaza",
            direccion: "Av. Vallarta 3959",
        },
        {
            id: "3",
            nombre: "Cinepolis Centro Magno",
            direccion: "Av. Vallarta 2425",
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.header}>
                    <Text style={styles.title}>Selecciona el cine</Text>
                    <Text style={styles.subtitle}>
                        Elige la ubicación donde se llevará a cabo la función.
                    </Text>
                </View>

                <View style={styles.list}>
                    {cines.map(cine => {
                        const selected = selectedCine === cine.id;

                        return (
                            <TouchableOpacity
                                key={cine.id}
                                style={[
                                    styles.card,
                                    selected && styles.cardSelected,
                                ]}
                                onPress={() => setSelectedCine(cine.id)}
                            >
                                <Text
                                    style={[
                                        styles.cardTitle,
                                        selected && styles.cardTitleSelected,
                                    ]}
                                >
                                    {cine.nombre}
                                </Text>

                                <Text
                                    style={[
                                        styles.cardSubtitle,
                                        selected && styles.cardSubtitleSelected,
                                    ]}
                                >
                                    {cine.direccion}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.push("/(tabs)/crearEvento/comprar")} style={styles.primaryButton}>
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

    list: {
        gap: 16,
    },

    card: {
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    cardSelected: {
        backgroundColor: "#121212",
        borderColor: "#121212",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111",
        marginBottom: 4,
    },
    cardTitleSelected: {
        color: "#fff",
    },
    cardSubtitle: {
        fontSize: 13,
        color: "#666",
    },
    cardSubtitleSelected: {
        color: "#ccc",
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
