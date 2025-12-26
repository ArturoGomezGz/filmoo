import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider children={undefined}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
