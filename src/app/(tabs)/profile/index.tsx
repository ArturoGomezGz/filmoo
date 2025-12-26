import { router } from "expo-router";
import { View, Text, Button, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Pantalla de Perfil</Text>
            <TouchableOpacity>
                <Button title="Cerrar sesión" onPress={() => {router.push("/login")}} />
            </TouchableOpacity>
        </View>
    );
}