import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/TMDB";
import { imageBaseURL, defaultImageSize } from "@/src/services/TMDB";
import Poster from "./poster";

export default function Billboard() {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadMovies = async () => {
        setLoading(true);
        const result = await getPopularMovies();

        // mismo filtro que en CrearEvento
        setMovies(result.filter(movie => movie.poster_path));
        setLoading(false);
    };

    const renderMovieItem = ({ item }: { item: any }) => {
        return (
            <Poster
                id={item.id}
                name={item.title}
                description={item.overview}
                imageUrl={`${imageBaseURL}/${defaultImageSize}${item.poster_path}`}
                onPress={() => {}}
            />
        );
    };

    useEffect(() => {
        loadMovies();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading billboard...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Billboard</Text>

            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMovieItem}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 16,
        marginTop: 16,
    },
    list: {
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 40,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 14,
        color: "#999",
    },
});
