import { StyleSheet, TextInput } from "react-native";

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    editable: boolean;
}

export default function ProfileNameInput({ value, onChangeText, editable}: Props) {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            placeholder="Tu nombre"
            placeholderTextColor="#999"
            style={[
                styles.nameInput,
                !editable && styles.readOnly
            ]}
        />
    );
}

const styles = StyleSheet.create({
    nameInput: {
        fontSize: 20,
        fontWeight: "500",
        color: "#000000",
        textAlign: "center",
        marginBottom: 12
    },

    readOnly: {
        opacity: 0.6
    }
});