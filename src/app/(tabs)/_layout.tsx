import { Tabs } from "expo-router";
import { View } from "react-native";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#000000ff", 
                    borderTopColor: "#121212",
                },
                tabBarActiveTintColor: "#FFFFFF",
                tabBarInactiveTintColor: "#888888"
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Inicio",
                    tabBarLabel: "Inicio",
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Buscar",
                    tabBarLabel: "Buscar",
                    headerShown: false
                }}
            />
        </Tabs>
    );
}
        