import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function CrearEventoScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Pantalla de Crear Evento</Text>
            <Button title="Empezar" onPress={() => {
                router.push("/crearEvento/pelicula")
            }} />
        </View>
    );
}