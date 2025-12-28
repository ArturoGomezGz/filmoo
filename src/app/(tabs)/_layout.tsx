import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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
            />
        </SafeAreaView>
    );
}
        