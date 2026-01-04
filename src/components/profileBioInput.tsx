import { StyleSheet, TextInput } from "react-native";

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    editable: boolean;
}

export default function ProfileBioInput({value, onChangeText, editable }: Props) {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            placeholder="Escribe una breve descripción sobre tu amor por el cine"
            placeholderTextColor="#999"
            multiline
            style={[
                styles.bioInput,
                !editable && styles.readOnly
            ]}
        />
    );
}

const styles = StyleSheet.create({
    bioInput: {
        fontSize: 14,
        color: "#666666",
        textAlign: "center",
        marginBottom: 8
    },

    readOnly: {
        opacity: 0.6
    }
});