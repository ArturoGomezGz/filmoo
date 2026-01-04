import { auth } from "@/src/services/firebase";
import { db } from "@/src/services/firebase";
import { router } from "expo-router";
import {
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Components
import PrimaryButton from "@/src/components/buttons/primaryButton";
import Input from "@/src/components/input";

export default function CreateAccountScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateAccount = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setError("Completa todos los campos");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // 1️⃣ Crear usuario en Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );

            const user = userCredential.user;

            // 2️⃣ Actualizar displayName en Auth
            await updateProfile(user, {
                displayName: name.trim(),
            });

            // 3️⃣ Crear documento en Firestore usando UID
            await setDoc(doc(db, "users", user.uid), {
                name: name.trim(),
                email: email.trim(),
                createdAt: serverTimestamp()
            });

            // 4️⃣ Redirigir
            router.replace("/(tabs)/billboard");
        } catch (err: any) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("Este correo ya está registrado");
                    break;
                case "auth/invalid-email":
                    setError("Correo inválido");
                    break;
                case "auth/weak-password":
                    setError("Contraseña muy débil");
                    break;
                default:
                    setError("Error al crear la cuenta");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Crear cuenta</Text>
                <Text style={styles.subtitle}>
                    Completa los datos para registrarte
                </Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Input
                    name="Nombre completo"
                    placeholder="Tu nombre"
                    secureTextEntry={false}
                    value={name}
                    onChangeText={setName}
                />

                <Input
                    name="Correo electrónico"
                    placeholder="ejemplo@correo.com"
                    secureTextEntry={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Input
                    name="Contraseña"
                    placeholder="********"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <Input
                    name="Confirmar contraseña"
                    placeholder="********"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <PrimaryButton
                    label="Crear cuenta"
                    loadingLabel="Creando cuenta..."
                    loading={loading}
                    onClick={handleCreateAccount}
                />

                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                    <Text style={styles.secondaryLink}>
                        ¿Ya tienes cuenta? Inicia sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

/* ---------- Styles ---------- */

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
    secondaryLink: {
        marginTop: 20,
        textAlign: "center",
        color: "#555",
        fontSize: 14,
    },
    errorText: {
        color: "#E53935",
        fontSize: 13,
        textAlign: "center",
        marginBottom: 12,
        paddingHorizontal: 16,
    }
});
