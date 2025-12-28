import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000000ff" }}>
            <Tabs
                screenOptions={{
                    headerShown: true,
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
                        tabBarLabel: "Cartelera"
                    }}
                />
                <Tabs.Screen
                    name="crearEvento/index"
                    options={{
                        title: "Crea un nuevo evento",
                        tabBarLabel: "Crear Evento"
                    }}
                />
                <Tabs.Screen
                    name="profile/index"
                    options={{
                        title: "Perfil",
                        tabBarLabel: "Perfil"
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}
        