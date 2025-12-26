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
  forgotLink: {
    alignSelf: "flex-end",
    fontSize: 13,
    color: "#555",
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
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
