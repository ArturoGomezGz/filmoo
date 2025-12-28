import { Stack } from "expo-router";

export default function CrearEventoLayout() {
    return (
        <Stack
        screenOptions={{
            headerTitleAlign: "center",
            animation: "slide_from_right",
        }}
        >
        <Stack.Screen
            name="index"
            options={{ title: "Crear evento" }}
        />
        <Stack.Screen
            name="peliculas"
            options={{ title: "Paso 1" }}
        />
        <Stack.Screen
            name="paso-2"
            options={{ title: "Paso 2" }}
        />
        <Stack.Screen
            name="paso-3"
            options={{ title: "Paso 3" }}
        />
        <Stack.Screen
            name="resumen"
            options={{ title: "Resumen" }}
        />
        </Stack>
    );
}
