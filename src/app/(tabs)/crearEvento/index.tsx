import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import Input from "../../../components/input";
import PrimaryButton from "../../../components/buttons/primaryButton";
import { getMoviesByName } from "@/src/services/TMDB";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 3 - 16;

export default function CrearEventoScreen() {
    const [movieName, setMovieName] = useState("");
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const searchMovies = async () => {
        if (!movieName.trim()) return;

        setLoading(true);
        const result = await getMoviesByName(movieName);
        setMovies(result.filter(movie => movie.poster_path));
        setLoading(false);
    };

    const renderMovieItem = ({ item }: { item: any }) => {
        const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

        return (
            <TouchableOpacity style={styles.card}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                />
            </TouchableOpacity>
        );
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
    card: {
        width: ITEM_WIDTH,
        aspectRatio: 2 / 3,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#eee",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
