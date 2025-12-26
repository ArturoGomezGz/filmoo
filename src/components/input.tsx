import { StyleSheet, View, TextInput, Text } from "react-native";

interface Props {
    // Functional props
    value: string;
    onChangeText: (text: string) => void;

    // Styling props
    name: string;
    placeholder: string;
    secureTextEntry: boolean;
    idPassword?: boolean;
}

export default function Input(props: Props) {
    return (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{props.name}</Text>
        <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            placeholderTextColor="#999"
            autoCapitalize="none"
            style={styles.input}
            secureTextEntry={props.secureTextEntry}
        />
    </View>);
}

const styles = StyleSheet.create({
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
    }
});