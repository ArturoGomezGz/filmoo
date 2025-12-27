import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 36,
  },
  inputContainer: {
    marginBottom: 26,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  forgotLink: {
    alignSelf: "flex-end",
    fontSize: 13,
    color: "#555",
    marginBottom: 20,
  },
  guestLink: {
    marginTop: 18,
    textAlign: "center",
    color: "#777",
    fontSize: 14,
  },
    errorText: {
    color: "#E53935",            // rojo legible, no agresivo
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  }
});
