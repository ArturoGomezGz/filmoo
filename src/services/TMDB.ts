const baseURL = "https://api.themoviedb.org/3";
const imageBaseURL = "https://image.tmdb.org/t/p";
const defaultImageSize = "w500";

// Función para verificar la conexión a la API de TMDB
async function verifyTMDBConnection(): Promise<boolean> {
    try {
        const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
        const response = await fetch(
        baseURL + "/authentication",
        {
            method: "GET",
            headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
            },
        }
        );

        if (!response.ok) {
        console.error("TMDB connection failed:", response.status);
        return false;
        }

        const json = await response.json();
        console.log("TMDB configuration:", json);

        return true;
    } catch (error) {
        console.error("TMDB connection error:", error);
        return false;
    }
}

async function getPopularMoviesIds(page: number = 1): Promise<number[]> {
    try {
        const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
        const response = await fetch(
            `${baseURL}/movie/popular?page=${page}`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
            });
        if (!response.ok) {
            console.error("Failed to fetch popular movies:", response.status);
            return [];
        }

        const json = await response.json();
        return json.results.map((movie: any) => movie.id);

    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return [];
    }
}

async function getPopularMovies(page: number = 1): Promise<any[]> {
    try {
        const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
        const response = await fetch(
            `${baseURL}/movie/popular?page=${page}`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
            });
        if (!response.ok) {
            console.error("Failed to fetch popular movies:", response.status);
            return [];
        }

        const json = await response.json();
        return json.results || [];

    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return [];
    }
}

async function getMoviesByName(name: string): Promise<any[]> {
    try {
        const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
        const response = await fetch(
            `${baseURL}/search/movie?query=${name}&include_adult=false&language=es-MX&page=1`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
            });

        if (!response.ok) {
            console.error("Failed to fetch movie by name:", response.status);
            return [];
        }
        const json = await response.json();
        return json.results || [];
    } catch (error) {
        console.error("Error fetching movie by name:", error);
        return [];
    }
}


export { verifyTMDBConnection, getPopularMoviesIds, getPopularMovies, getMoviesByName };
export { imageBaseURL, defaultImageSize };