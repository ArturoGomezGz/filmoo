import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import PrimaryButton from "@/src/components/buttons/primaryButton";
import { useCrearEvento } from "./CrearEventoContext";
import { Auth } from "firebase/auth";
import { auth } from "@/src/services/firebase";
import InvitacionCrearCuenta from "@/src/components/views/invitacionCrearCuenta";

export default function CrearEventoScreen() {
    const { resetEvento } = useCrearEvento();

    const handleComenzar = () => {
        resetEvento();
        router.push("/(tabs)/crearEvento/pelicula");
    }

    if (!auth.currentUser) {
        return (
            <View style={styles.centeredContainer}>
                <InvitacionCrearCuenta />
            </View>
        );

    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>🎬</Text>

                <Text style={styles.mainText}>
                Vamos a crear un nuevo evento
                </Text>

                <Text style={styles.secondaryText}>
                Te guiaremos paso a paso para seleccionar la película,
                definir la fecha y agregar los detalles necesarios.
                </Text>
            </View>

            <View style={styles.footer}>
                <PrimaryButton
                label="Empezar"
                onClick={handleComenzar}
                loading={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 32,
        justifyContent: "space-between",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    mainText: {
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 12,
        color: "#111",
    },
    secondaryText: {
        fontSize: 15,
        textAlign: "center",
        color: "#666",
        lineHeight: 22,
        maxWidth: 320,
    },
    footer: {
        paddingTop: 16,
    },
});
