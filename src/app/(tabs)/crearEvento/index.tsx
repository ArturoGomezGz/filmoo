import { View, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "../../../components/input";
import PrimaryButton from "../../../components/buttons/primaryButton";
import { getMoviesByName } from "@/src/services/TMDB";
import Poster from "../../../components/poster";

export default function CrearEventoScreen() {
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
            <Input
                placeholder="Selecciona una película"
                name="Película"
                secureTextEntry={false}
                value={movieName}
                onChangeText={setMovieName}
            />

            <PrimaryButton
                onClick={searchMovies}
                label="Buscar Película"
                loading={loading}
            />

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
        paddingHorizontal: 12,
        paddingTop: 20,
        backgroundColor: "#fff",
    },
    list: {
        paddingTop: 20,
        paddingBottom: 40,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
});
