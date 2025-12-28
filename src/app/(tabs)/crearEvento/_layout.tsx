import { Stack } from "expo-router";

export default function CrearEventoLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitle: "Crear evento",
                headerTitleAlign: "center",
                animation: "fade_from_bottom",
            }}
        >
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen name="pelicula" />
            <Stack.Screen name="horario" />
            <Stack.Screen name="ubicacion" />
            <Stack.Screen name="comprar" />
        </Stack>
    );
}
