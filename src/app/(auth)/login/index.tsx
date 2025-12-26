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

interface Props {}

export default function LoginScreen(props: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        router.push("/(tabs)/billboard");
    };

    const handleForgotPassword = () => {
        console.log("Olvidé mi contraseña");
        // router.push("/forgot-password") o lógica futura
    };

    const handleCreateAccount = () => {
        router.push("/(auth)/createAcount");
    };

    const handleGuestLogin = () => {
        console.log("Entrar como invitado");
        // lógica de invitado
    };

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

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

                {/* OLVIDÉ CONTRASEÑA */}
                <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotLink}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                {/* BOTÓN LOGIN */}
                <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                {/* CREAR CUENTA */}
                <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleCreateAccount}
                >
                <Text style={styles.secondaryButtonText}>Crear cuenta</Text>
                </TouchableOpacity>

                {/* INVITADO */}
                <TouchableOpacity onPress={handleGuestLogin}>
                <Text style={styles.guestLink}>Entrar como invitado</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
