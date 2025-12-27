import { 
    TouchableOpacity,
    View, 
    Text, 
    Image, 
    FlatList, 
    StyleSheet, 
    Dimensions 
} from "react-native";
import { useEffect, useState } from "react";
import { getImageUrl, getPopularMoviesIds, getPopularMovies } from "../services/TMDB";
import Poster from "./poster";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 3 - 24;

export default function Billboard() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<any[]>([]);

    const searchMovies = async () => {
        const result = await getPopularMovies();
        setMovies(result);
    };

    const renderMovieItem = ({ item }: { item: any }) => {
        return (
            <Poster
                id={item.id}
                name={item.title}
                description={item.overview}
                imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                onPress={() => {}}
            />
        );
    };

    useEffect(() => {
        async function loadBillboard() {
            const ids = await getPopularMoviesIds();
            const urls = await Promise.all(ids.map(id => getImageUrl(id)));
            setImages(urls.filter(Boolean));
            setLoading(false);
        }

        loadBillboard();
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
                data={images}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.7}>
                        <Image
                            source={{ uri: item }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )}
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
        margin: 16,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 16,
    },
    row: {
        justifyContent: "space-between",
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 1.5,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: "#e1e1e1",
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
