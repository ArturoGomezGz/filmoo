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
            name="pelicula"
            options={{ title: "Selecciona tu película" }}
        />
        <Stack.Screen
            name="horario"
            options={{ title: "Selecciona tu horario" }}
        />
        <Stack.Screen
            name="ubicacion"
            options={{ title: "Selecciona tu cine" }}
        />
        <Stack.Screen
            name="comprar"
            options={{ title: "Compra tu boleto" }}
        />
        </Stack>
    );
}
