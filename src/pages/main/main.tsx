import { FC, memo, useEffect } from 'react';
import { Footer } from '../../components/footer/footer.tsx';
import { FilmCardMemo } from '../../components/film-card/film-card.tsx';
import { CatalogMemo } from '../../components/catalog/catalog.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';
import { Page404 } from '../page-404/page-404.tsx';
import {
  selectFilmData,
  selectFilmsData,
  selectFilmsError,
  selectFilmsStatus
} from '../../store/films/film-selectors.ts';
import { fetchMovies, fetchPromo } from '../../store/api-actions.ts';
import { authorizationStatusData } from '../../store/auth/auth-selectors.ts';
import { useNavigate } from 'react-router-dom';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const film = useAppSelector(selectFilmData);
  const films = useAppSelector(selectFilmsData);
  const filmError = useAppSelector(selectFilmsError);
  const filmStatus = useAppSelector(selectFilmsStatus);
  const isAuth = useAppSelector(authorizationStatusData);
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchPromo());
    if (films === null) {
      dispatch(fetchMovies());
    }
  }, [dispatch, films]);

  useEffect(() => {
    if (!isAuth) {
      history('/login');
    }
  }, [history, isAuth]);

  if (filmError) {
    return <Page404 />;
  }

  if (!film || filmStatus === 'LOADING') {
    return <Spinner />;
  }

  return (
    <>
      <FilmCardMemo film={film} />

      <div className="page-content">
        <CatalogMemo withGenres />
        <Footer />
      </div>
    </>
  );
};

export const Main = memo(MainPage);
