import { createContext, useContext, useState } from "react";

type Evento = {
    peliculaId?: number;
    fecha?: string;
    hora?: string;
    cineId?: string;
};

type CrearEventoContextType = {
    evento: Evento;
    setPeliculaId: (id: number) => void;
    setFecha: (fecha: string) => void;
    setHora: (hora: string) => void;
    setCineId: (id: string) => void;
    resetEvento: () => void;
};

const CrearEventoContext = createContext<CrearEventoContextType | undefined>(
    undefined
);

export default function CrearEventoProvider({ children }: { children: React.ReactNode }) {
    const [evento, setEvento] = useState<Evento>({});

    const setPeliculaId = (id: number) => {
        setEvento(prev => ({
            ...prev,
            peliculaId: id,
        }));
    };

    const setFecha = (fecha: string) => {
        setEvento(prev => ({
            ...prev,
            fecha,
        }));
    };

    const setHora = (hora: string) => {
        setEvento(prev => ({
            ...prev,
            hora,
        }));
    };

    const setCineId = (id: string) => {
        setEvento(prev => ({
            ...prev,
            cineId: id,
        }));
    };

    const resetEvento = () => {
        setEvento({});
    };

    return (
        <CrearEventoContext.Provider
            value={{
                evento,
                setPeliculaId,
                setFecha,
                setHora,
                setCineId,
                resetEvento,
            }}
        >
            {children}
        </CrearEventoContext.Provider>
    );
}

export function useCrearEvento() {
    const context = useContext(CrearEventoContext);

    if (!context) {
        throw new Error(
            "useCrearEvento debe usarse dentro de CrearEventoProvider"
        );
    }

    return context;
}
