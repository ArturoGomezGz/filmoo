import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { styles } from "./styles";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";

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

            <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="ejemplo@correo.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />
            </View>

            <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
            />
            </View>

            <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotLink}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[
                styles.primaryButton,
                loading && { opacity: 0.6 },
            ]}
            onPress={handleLogin}
            disabled={loading}
            >
            <Text style={styles.primaryButtonText}>
                {loading ? "Ingresando..." : "Iniciar sesión"}
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleCreateAccount}
            >
            <Text style={styles.secondaryButtonText}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGuestLogin}>
            <Text style={styles.guestLink}>Entrar como invitado</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    );
}
