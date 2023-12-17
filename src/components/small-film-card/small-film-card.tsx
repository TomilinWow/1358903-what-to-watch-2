import React, { memo, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Film } from '../../types/film.ts';
import { VideoPlayerMemo } from '../video-player/video-player.tsx';

const PLAYER_TIMEOUT = 1000;

interface IFilmCardProps {
  film: Film;
}

const SmallFilmCard: React.FC<IFilmCardProps> = ({film}) => {
  const {previewImage, id, previewVideoLink, name} = film;
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const handleMouseEnter = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      setIsPlaying(true);
    }, PLAYER_TIMEOUT);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    setIsPlaying(false);
  }, []);


  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <VideoPlayerMemo isPlaying={isPlaying} videoUrl={previewVideoLink} previewImageUrl={previewImage}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
};

export const SmallFilmCardMemo = memo(SmallFilmCard);
