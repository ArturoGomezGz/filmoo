import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput
} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Input from "../../../components/input";

export default function ProfileScreen() {
    const { profile, loading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [shortBio, setShortBio] = useState("");
    const [favoriteMovie, setFavoriteMovie] = useState("");
    const [favoriteGenres, setFavoriteGenres] = useState("");
    const [favoriteTVShow, setFavoriteTVShow] = useState("");
    const [favoriteDirector, setFavoriteDirector] = useState("");
    const [favoriteActor, setFavoriteActor] = useState("");

    useEffect(() => {
        if (profile?.exists()) {
            const data = profile.data();

            setName(data?.name || "");
            setShortBio(data?.shortBio || "");
            setFavoriteMovie(data?.cinephileIdentity?.favoriteMovie || "");
            setFavoriteGenres(
                data?.cinephileIdentity?.favoriteGenres?.join(", ") || ""
            );
            setFavoriteTVShow(data?.cinephileIdentity?.favoriteTVShow || "");
            setFavoriteDirector(data?.cinephileIdentity?.favoriteDirector || "");
            setFavoriteActor(data?.cinephileIdentity?.favoriteActor || "");
        }
    }, [profile]);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="small" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("../../../assets/images/profile.png")}
                    style={styles.avatar}
                />

                <TouchableOpacity disabled={!isEditing}>
                    <Text
                        style={[
                            styles.changePhoto,
                            !isEditing && styles.disabledText
                        ]}
                    >
                        Cambiar foto
                    </Text>
                </TouchableOpacity>

                <NameInput
                    value={name}
                    onChangeText={setName}
                    editable={isEditing}
                />

                <BioInput
                    value={shortBio}
                    onChangeText={setShortBio}
                    editable={isEditing}
                />
            </View>

            {/* Stats */}
            <View style={styles.stats}>
                <Stat label="Seguidores" value={`${profile?.data()?.social?.followers?.length || 0}`} />
                <Stat label="Siguiendo" value={`${profile?.data()?.social?.following?.length || 0}`} />
                <Stat label="Planes creados" value={`${profile?.data()?.activity?.plansCreated || 0}`} />
                <Stat label="Boletos comprados" value={`${profile?.data()?.activity?.ticketsPurchased || 0}`} />
            </View>

            {/* Cinephile Identity */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Identidad cinéfila</Text>

                <Input
                    name="Película favorita"
                    value={favoriteMovie}
                    onChangeText={setFavoriteMovie}
                    placeholder="No definido"
                    secureTextEntry={false}
                    editable={isEditing}
                />

                <Input
                    name="Géneros favoritos"
                    value={favoriteGenres}
                    onChangeText={setFavoriteGenres}
                    placeholder="Drama, Ciencia ficción, Thriller"
                    secureTextEntry={false}
                    editable={isEditing}
                />

                <Input
                    name="Serie favorita"
                    value={favoriteTVShow}
                    onChangeText={setFavoriteTVShow}
                    placeholder="No definido"
                    secureTextEntry={false}
                    editable={isEditing}
                />

                <Input
                    name="Director favorito"
                    value={favoriteDirector}
                    onChangeText={setFavoriteDirector}
                    placeholder="No definido"
                    secureTextEntry={false}
                    editable={isEditing}
                />

                <Input
                    name="Actor o actriz favorita"
                    value={favoriteActor}
                    onChangeText={setFavoriteActor}
                    placeholder="No definido"
                    secureTextEntry={false}
                    editable={isEditing}
                />
            </View>

            {/* Action button */}
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setIsEditing(!isEditing)}
            >
                <Text style={styles.actionText}>
                    {isEditing ? "Guardar cambios" : "Editar perfil"}
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

/* ---------- Specific Inputs ---------- */

function NameInput({
    value,
    onChangeText,
    editable
}: {
    value: string;
    onChangeText: (text: string) => void;
    editable: boolean;
}) {
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

function BioInput({
    value,
    onChangeText,
    editable
}: {
    value: string;
    onChangeText: (text: string) => void;
    editable: boolean;
}) {
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

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#ffffff"
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    header: {
        alignItems: "center",
        marginBottom: 32
    },

    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        marginBottom: 12
    },

    changePhoto: {
        fontSize: 12,
        color: "#666666",
        marginBottom: 16
    },

    nameInput: {
        fontSize: 20,
        fontWeight: "500",
        color: "#000000",
        textAlign: "center",
        marginBottom: 12
    },

    bioInput: {
        fontSize: 14,
        color: "#666666",
        textAlign: "center",
        marginBottom: 8
    },

    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 32
    },

    statItem: {
        alignItems: "center",
        flex: 1
    },

    statValue: {
        fontSize: 16,
        fontWeight: "500"
    },

    statLabel: {
        fontSize: 12,
        color: "#888888",
        textAlign: "center"
    },

    section: {
        marginBottom: 32
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 16
    },

    readOnly: {
        opacity: 0.6
    },

    disabledText: {
        opacity: 0.4
    },

    actionButton: {
        borderWidth: 1,
        borderColor: "#000000",
        paddingVertical: 14,
        alignItems: "center"
    },

    actionText: {
        fontSize: 14,
        fontWeight: "500"
    }
});
