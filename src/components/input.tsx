import { StyleSheet, View, TextInput, Text } from "react-native";

interface Props {
    // Functional props
    value: string;
    onChangeText: (text: string) => void;

    // Styling / UX props
    name: string;
    placeholder: string;
    secureTextEntry: boolean;
    editable?: boolean;
    idPassword?: boolean;
}

export default function Input({
    value,
    onChangeText,
    name,
    placeholder,
    secureTextEntry,
    editable = true
}: Props) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{name}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                autoCapitalize="none"
                style={[
                    styles.input,
                    !editable && styles.readOnly
                ]}
                secureTextEntry={secureTextEntry}
                editable={editable}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 26
    },
    label: {
        fontSize: 12,
        color: "#999",
        marginBottom: 6
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 10,
        fontSize: 16,
        color: "#000"
    },
    readOnly: {
        opacity: 0.6
    }
});
