import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Film} from '../../pages/film/film.tsx';
import {FC} from 'react';
import {Main} from '../../pages/main/main.tsx';
import {Page404} from '../../pages/page-404/page-404.tsx';
import {SignIn} from '../../pages/sign-in/sign-in.tsx';

import {AddReview} from '../../pages/add-review/add-review.tsx';
import {Player} from '../../pages/player/player.tsx';
import {PrivateRoute} from './private-route.tsx';
import MyList from '../../pages/my-list/my-list.tsx';


export const AppRouter: FC = () => {

  const isAuth = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<SignIn />}/>

        <Route path="/mylist" element={
          <PrivateRoute isAuth={isAuth}>
            <MyList />
          </PrivateRoute>
        }/>

        <Route path="/films/:id" element={<Film />}/>
        <Route path="/films/:id/review" element={<AddReview />}/>

        <Route path="/player/:id" element={<Player />}/>

        <Route path="*" element={<Page404/>} />
      </Routes>
    </BrowserRouter>
  );
};
