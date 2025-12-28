import { View, FlatList, StyleSheet, Text } from "react-native";
import { useState } from "react";
import Input from "../../../components/input";
import PrimaryButton from "../../../components/buttons/primaryButton";
import { getMoviesByName } from "@/src/services/TMDB";
import Poster from "../../../components/poster";
import { router } from "expo-router";

export default function SeleccionarPeliculaView() {
    const [movieName, setMovieName] = useState("");
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const searchMovies = async () => {
        if (!movieName.trim()) return;

        setLoading(true);
        const result = await getMoviesByName(movieName);
        setMovies(result.filter(m => m.poster_path));
        setLoading(false);
    };

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Selecciona una película</Text>
                <Text style={styles.subtitle}>
                    Busca la película que te gustaría ver y selecciónala para continuar.
                </Text>
            </View>

            {/* Search */}
            <View style={styles.searchSection}>
                <Input
                    placeholder="Ej. Dune, Star Wars, Avengers..."
                    name="Película"
                    secureTextEntry={false}
                    value={movieName}
                    onChangeText={setMovieName}
                />

                <PrimaryButton
                    onClick={searchMovies}
                    label="Buscar película"
                    loading={loading}
                />
            </View>

            {/* Results */}
            {movies.length === 0 && !loading && (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>
                        Aquí aparecerán las películas encontradas
                    </Text>
                </View>
            )}

            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Poster
                        id={item.id}
                        name={item.title}
                        description={item.overview}
                        imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        onSelect={() => {
                            router.push("/(tabs)/crearEvento/horario");
                        }}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        backgroundColor: "#fff",
    },

    /* Header */
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 6,
        color: "#111",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
    },

    /* Search */
    searchSection: {
        marginBottom: 10,
    },

    /* Empty */
    emptyState: {
        alignItems: "center",
        marginTop: 40,
    },
    emptyText: {
        fontSize: 14,
        color: "#999",
    },

    /* List */
    list: {
        paddingBottom: 40,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
});
