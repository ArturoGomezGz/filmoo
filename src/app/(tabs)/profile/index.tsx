import PrimaryButton from "@/src/components/buttons/primaryButton";
import SecondaryButton from "@/src/components/buttons/secondaryButton";
import Input from "@/src/components/input";
import ProfileBioInput from "@/src/components/profileBioInput";
import ProfileNameInput from "@/src/components/profileNameInput";
import ProfileStat from "@/src/components/profileStat";
import { router } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import { auth, db } from "@/src/services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ProfileScreen() {
    const { profile, loading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

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

    async function saveChanges() {
        if (!profile) return;

        try {
            setSaving(true);

            const userRef = doc(db, "users", profile.id);

            const cleanedGenres = favoriteGenres
                .split(",")
                .map(g => g.trim())
                .filter(Boolean);

            const payload: any = {
                name: name.trim(),
                shortBio: shortBio.trim(),
                cinephileIdentity: {
                    favoriteMovie: favoriteMovie.trim(),
                    favoriteGenres: cleanedGenres,
                    favoriteTVShow: favoriteTVShow.trim(),
                    favoriteDirector: favoriteDirector.trim(),
                    favoriteActor: favoriteActor.trim()
                }
            };

            // Limpieza de strings vacíos
            if (!payload.name) delete payload.name;
            if (!payload.shortBio) delete payload.shortBio;

            Object.keys(payload.cinephileIdentity).forEach((key) => {
                const value = payload.cinephileIdentity[key];

                if (
                    value === "" ||
                    (Array.isArray(value) && value.length === 0)
                ) {
                    delete payload.cinephileIdentity[key];
                }
            });

            if (Object.keys(payload.cinephileIdentity).length === 0) {
                delete payload.cinephileIdentity;
            }

            await updateDoc(userRef, payload);

            setIsEditing(false);
            console.log("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error al guardar el perfil:", error);
        } finally {
            setSaving(false);
        }
    }

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
                    source={require("@/src/assets/images/profile.png")}
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

                <ProfileNameInput
                    value={name}
                    onChangeText={setName}
                    editable={isEditing}
                />

                <ProfileBioInput
                    value={shortBio}
                    onChangeText={setShortBio}
                    editable={isEditing}
                />
            </View>

            {/* Stats */}
            <View style={styles.stats}>
                <ProfileStat
                    label="Seguidores"
                    value={`${profile?.data()?.social?.followers?.length || 0}`}
                />
                <ProfileStat
                    label="Siguiendo"
                    value={`${profile?.data()?.social?.following?.length || 0}`}
                />
                <ProfileStat
                    label="Planes creados"
                    value={`${profile?.data()?.activity?.plansCreated || 0}`}
                />
                <ProfileStat
                    label="Boletos comprados"
                    value={`${profile?.data()?.activity?.ticketsPurchased || 0}`}
                />
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
            <PrimaryButton
                label={isEditing ? "Guardar cambios" : "Editar perfil"}
                onClick={async () => {
                    if (isEditing) {
                        await saveChanges();
                    } else {
                        setIsEditing(true);
                    }
                }}
                loading={saving}
            />

            {/* Logout button */}
            <SecondaryButton
                label="Cerrar sesión"
                onClick={() => { auth.signOut(); router.replace("/login"); }}
            />

        </ScrollView>
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

    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 32
    },

    section: {
        marginBottom: 32
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 16
    },

    disabledText: {
        opacity: 0.4
    }
});
