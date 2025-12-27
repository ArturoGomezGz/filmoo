import { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
// Made components
import Input  from "../../../components/input";
import PrimaryButton from "../../../components/buttons/primaryButton";
import SecondaryButton from "@/src/components/buttons/secondaryButton";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Ingresa correo y contraseña");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await signInWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );

            router.replace("/(tabs)/billboard");
        } catch (err: any) {
            switch (err.code) {
                case "auth/user-not-found":
                    setError("El usuario no existe");
                    break;
                case "auth/wrong-password":
                    setError("Contraseña incorrecta");
                    break;
                case "auth/invalid-email":
                    setError("Correo inválido");
                    break;
                default:
                    setError("Error al iniciar sesión");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        console.log("Olvidé mi contraseña");
    };

    const handleCreateAccount = () => {
        router.push("/(auth)/createAcount");
    };

    const handleGuestLogin = () => {
        router.replace("/(tabs)/billboard");
    };

    return (
        <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Input 
                name="Correo electronico" 
                placeholder="ejemplo@correo.com" 
                secureTextEntry={false} 
                value={email} 
                onChangeText={setEmail} />
                
            <Input 
                name="Contraseña" 
                placeholder="********" 
                secureTextEntry={true} 
                value={password} 
                onChangeText={setPassword} />

            <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotLink}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity> 

            <PrimaryButton
                label="Iniciar sesión"
                loadingLabel="Ingresando..."
                loading={loading}
                onClick={handleLogin}
            />

            <SecondaryButton
                label="Crear cuenta"
                onClick={handleCreateAccount}
            />

            <TouchableOpacity onPress={handleGuestLogin}>
            <Text style={styles.guestLink}>Entrar como invitado</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 28,
    },
    title: {
        fontSize: 30,
        fontWeight: "600",
        color: "#000",
        textAlign: "center",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        marginBottom: 36,
    },
    inputContainer: {
        marginBottom: 26,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 10,
        fontSize: 16,
        color: "#000",
    },
    forgotLink: {
        alignSelf: "flex-end",
        fontSize: 13,
        color: "#555",
        marginBottom: 20,
    },
    guestLink: {
        marginTop: 18,
        textAlign: "center",
        color: "#777",
        fontSize: 14,
    },
        errorText: {
        color: "#E53935",            // rojo legible, no agresivo
        fontSize: 13,
        textAlign: "center",
        marginBottom: 12,
        paddingHorizontal: 16,
    }
});
