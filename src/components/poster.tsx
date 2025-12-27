import { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    View,
    Text,
    Pressable,
} from "react-native";

interface Props {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    onSelect: (movie: {
        id: number;
        name: string;
        description: string;
        imageUrl: string;
    }) => void;
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 3 - 16;

export default function Poster({
    id,
    name,
    description,
    imageUrl,
    onSelect,
}: Props) {
    const [visible, setVisible] = useState(false);

    const closeModal = () => setVisible(false);

    const handleSelect = () => {
        onSelect({
            id,
            name,
            description,
            imageUrl,
        });
        closeModal();
    };

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setVisible(true)}
                style={styles.card}
            >
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </TouchableOpacity>

            <Modal transparent visible={visible} animationType="fade">
                <Pressable style={styles.overlay} onPress={closeModal}>
                    <View style={styles.modal}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.modalImage}
                        />

                        <Text style={styles.title}>{name}</Text>

                        <Text style={styles.description} numberOfLines={6}>
                            {description || "Sin descripción disponible"}
                        </Text>

                        <View style={styles.actions}>
                            <Pressable
                                style={styles.closeBtn}
                                onPress={closeModal}
                            >
                                <Text style={styles.closeText}>Cerrar</Text>
                            </Pressable>

                            <Pressable
                                style={styles.selectBtn}
                                onPress={handleSelect}
                            >
                                <Text style={styles.selectText}>Elegir</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        width: ITEM_WIDTH,
        aspectRatio: 2 / 3,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#eee",
    },
    image: {
        width: "100%",
        height: "100%",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    modal: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
    },
    modalImage: {
        width: 180,
        height: 270,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    description: {
        fontSize: 13,
        color: "#555",
        textAlign: "center",
        marginBottom: 16,
    },
    actions: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    closeBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: "#e0e0e0",
        alignItems: "center",
    },
    closeText: {
        fontWeight: "600",
    },
    selectBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: "#0a84ff",
        alignItems: "center",
    },
    selectText: {
        color: "#fff",
        fontWeight: "600",
    },
});
