import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/TMDB";
import Poster from "../components/poster";

export default function Billboard() {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadMovies = async () => {
        setLoading(true);
        const result = await getPopularMovies();
        setMovies(result.filter(m => m.poster_path));
        setLoading(false);
    };

    useEffect(() => {
        loadMovies();
    }, []);

    if (loading) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Loading billboard...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

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
                        onSelect={(item) => {console.log("Selected movie:", item.name)}}
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
    },
    list: {
        paddingHorizontal: 12,
        paddingBottom: 40,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "#999",
    },
});
