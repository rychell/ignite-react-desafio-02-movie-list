import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from '../services/api';
interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }

interface GenreContextData{
    genres: GenreResponseProps[],
    selectedGenre: GenreResponseProps,
    setGenre: (genre_id: number)=> void
}
interface GenreProviderProps {
    children: ReactNode
}
export const GenreContext = createContext({} as GenreContextData)

export function GenreProvider({children}: GenreProviderProps){
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const setGenre = (genre_id: number) => {
        setSelectedGenreId(genre_id)
    }
    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
          setGenres(response.data);
        });
      }, []);
      useEffect(() => {
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
          setSelectedGenre(response.data);
        })
      }, [selectedGenreId]);
    return(
        <GenreContext.Provider value={
            {
                genres,
                selectedGenre,
                setGenre
            }
        }>
            {children}
        </GenreContext.Provider>
    )
} 