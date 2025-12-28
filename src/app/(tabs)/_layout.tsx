import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000000ff" }}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "white",
                    tabBarStyle: { 
                        backgroundColor: "#121212",
                        borderTopColor: "#121212"
                    },
                    headerTitleAlign: "center",
                }}
            >   
                <Tabs.Screen
                    name="billboard/index"
                    options={{
                        title: "Cartelera",
                        tabBarLabel: "Cartelera",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="film-outline" size={size} color={color} />
                        )
                    }}
                />

                <Tabs.Screen
                    name="crearEvento"
                    options={{
                        title: "Crea un nuevo evento",
                        tabBarLabel: "Crear Evento",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="add-circle-outline" size={size} color={color} />
                        )
                    }}
                />

                <Tabs.Screen
                    name="profile/index"
                    options={{
                        title: "Perfil",
                        tabBarLabel: "Perfil",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-outline" size={size} color={color} />
                        )
                    }}
                />

            </Tabs>
        </SafeAreaView>
    );
}
        