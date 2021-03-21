import { useContext } from 'react';
import { GenreContext } from '../contexts/GenreContext';
import '../styles/sidebar.scss';

import { Button } from './Button';




export function SideBar() {
  const {genres, selectedGenre, setGenre} = useContext(GenreContext)
  function handleClickButton(id: number) {
    setGenre(id);
  }
  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenre.id === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}