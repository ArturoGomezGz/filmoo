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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../services/firebase";
// Made components
import Input from "../../../components/input";

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

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

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

        <TouchableOpacity
          style={[
            styles.primaryButton,
            loading && { opacity: 0.6 },
          ]}
          onPress={handleCreateAccount}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.secondaryLink}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
