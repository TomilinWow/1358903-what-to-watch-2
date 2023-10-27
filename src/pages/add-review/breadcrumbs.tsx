import React from 'react';
import { Link } from 'react-router-dom';
import { TFilm } from '../../types/TFilm.ts';

interface BreadcrumbsProps {
	film?: TFilm;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ film }) => (
  <nav className="breadcrumbs">
    <ul className="breadcrumbs__list">
      <li className="breadcrumbs__item">
        <Link to={`/films/${film?.id}`} className="breadcrumbs__link">
          {film?.title}
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <a className="breadcrumbs__link">
          Add review
        </a>
      </li>
    </ul>
  </nav>
);
