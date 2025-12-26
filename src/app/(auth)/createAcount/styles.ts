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
  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  primaryButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryLink: {
    marginTop: 20,
    textAlign: "center",
    color: "#555",
    fontSize: 14,
  },
  errorText: {
    color: "#E53935",          // rojo legible
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  }
});
