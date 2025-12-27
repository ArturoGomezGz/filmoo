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
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 3 - 16;

export default function Poster({
    id,
    name,
    description,
    imageUrl,
}: Props) {
    const [visible, setVisible] = useState(false);

    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={openModal}
                style={styles.card}
            >
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
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

                        <Pressable style={styles.closeBtn} onPress={closeModal}>
                            <Text style={styles.closeText}>Cerrar</Text>
                        </Pressable>
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

    /* MODAL */
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    modal: {
        width: "100%",
        borderRadius: 16,
        backgroundColor: "#fff",
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
    closeBtn: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: "#000",
    },
    closeText: {
        color: "#fff",
        fontWeight: "600",
    },
});
