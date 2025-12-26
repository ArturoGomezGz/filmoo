import { router } from "expo-router";
import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";

export default function ProfileScreen() {
    const handleLogout = async () => {
        try {
        await signOut(auth);
        router.replace("/(auth)/login");
        } catch (error) {
        console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Pantalla de Perfil</Text>

        <Button title="Cerrar sesión" onPress={handleLogout} />
        </View>
    );
}
