import { View, Text, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getImageUrl, getPopularMoviesIds } from "../services/TMDB";

export default function Billboard() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBillboard() {
            const ids = await getPopularMoviesIds();

            const urls = await Promise.all(
                ids.map((id) => getImageUrl(id))
            );

            setImages(urls.filter(Boolean));
            setLoading(false);
        }

        loadBillboard();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading billboard...</Text>
            </View>
        );
    }

    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", margin: 16 }}>
                Billboard
            </Text>

            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item }}
                        style={{
                            width: 120,
                            height: 180,
                            borderRadius: 12,
                            marginHorizontal: 8,
                        }}
                    />
                )}
            />
        </View>
    );
}
