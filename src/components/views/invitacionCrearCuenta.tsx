import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import PrimaryButton from "../buttons/primaryButton";
import { router } from "expo-router";

export default function InvitacionCrearCuenta() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Crea una cuenta para continuar
            </Text>

            <Text style={styles.subtitle}>
                Necesitas una cuenta para acceder a esta funcionalidad y disfrutar
                de todas las opciones de la app.
            </Text>

            <View style={styles.buttonWrapper}>
                <PrimaryButton
                    label="Crear cuenta"
                    onClick={() => {
                        router.push("/(auth)/createAcount");
                    }}
                    loading={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#ffffff",
        alignItems: "center",
        marginHorizontal: 24,
        marginVertical: 16,
    },

    title: {
        fontSize: 20,
        fontWeight: "500",
        color: "#000000",
        textAlign: "center",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 14,
        color: "#777777",
        textAlign: "center",
        marginBottom: 24,
        lineHeight: 20,
    },

    buttonWrapper: {
        width: "70%",
    },
});
