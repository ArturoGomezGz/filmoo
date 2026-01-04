import PrimaryButton from "@/src/components/buttons/primaryButton";
import Input from "@/src/components/input";
import Poster from "@/src/components/poster";
import { getMoviesByName } from "@/src/services/TMDB";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

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
            <View style={{marginBottom: 20}}>
                <Input
                    placeholder="Busca una película"
                    name="Cuéntanos qué película te gustaría ver..."
                    secureTextEntry={false}
                    value={movieName}
                    onChangeText={setMovieName}
                />
            
                <PrimaryButton
                    onClick={searchMovies}
                    label="Buscar Película"
                    loading={loading}
                />
            </View>



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
