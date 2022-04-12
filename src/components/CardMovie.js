import React, { Component } from 'react';

import apiServise from '../services/ApiServise';
import iconNoPoster from '.././images/no-pictures.png';

import formatDateRelease from '../date-fns/date.js';

import { Card } from 'antd';
import { Rate } from 'antd';

export default class CardMovie extends Component {
  movieGenreList = (genresIdsArr) => {
    const newfilmGenres = genresIdsArr.map((el) => {
      let foundGenre = this.props.genresList.find((item) => item.id === el);
      return foundGenre.name;
    });
    return newfilmGenres;
  };

  shortenText = (text, maxCharacters) => {
    const strLength = text.length;
    let newText = '';

    if (strLength > maxCharacters) {
      const lastCharacter = text.substring(maxCharacters - 1, maxCharacters);
      if (lastCharacter === ' ') {
        newText = text.substring(0, maxCharacters) + '...';
        return newText;
      } else {
        let closestSpaceIndex = text.substring(0, maxCharacters).lastIndexOf(' ');
        newText = text.substring(0, closestSpaceIndex) + '...';
        return newText;
      }
    } else {
      return text;
    }
  };

  ratingСhanges = (grade) => {
    const id = this.props.item.id;
    if (grade === 0) {
      apiServise.deleteRateFilm(id);
    } else {
      apiServise.rateFilm(id, grade);
    }
    this.props.changeRateList();
  };

  defineRatingСolor = (num) => {
    let color;
    if (num <= 3) {
      color = '#E90000';
    } else if (num <= 5) {
      color = '#E97E00';
    } else if (num <= 7) {
      color = '#E9D100';
    } else if (num > 7) {
      color = '#66E900';
    }

    return {
      borderColor: color,
    };
  };

  showPoster = (image) => {
    if (image !== null) {
      return `https://image.tmdb.org/t/p/w200/${image}`;
    } else {
      return iconNoPoster;
    }
  };

  checkMovieInRated = (id, arr, isRating) => {
    let rating = 0;
    if (isRating) {
    } else {
      arr.forEach((el) => {
        if (el.id === id) {
          return (rating = el.rating);
        }
      });
    }
    return rating;
  };

  render() {
    const { rateList } = this.props;

    const { title, poster_path, overview, release_date, genre_ids, vote_average, rating, id } = this.props.item;

    let onRating = this.checkMovieInRated(id, rateList, rating);

    const poster = this.showPoster(poster_path);

    const shorOverview = this.shortenText(overview, 180);

    const shorTitle = this.shortenText(title, 30);

    const releaseDate = release_date ? formatDateRelease(release_date) : null;

    const ratingСolor = this.defineRatingСolor(vote_average);

    const genreArr = this.movieGenreList(genre_ids);

    const filmGenres = (
      <React.Fragment>
        {genreArr.map((genre) => {
          return (
            <span className="ant-card-body_genre-item" key={genre}>
              {genre}
            </span>
          );
        })}
      </React.Fragment>
    );

    return (
      <Card className="ant-card" hoverable cover={<img alt="poster" src={poster} />}>
        <div style={ratingСolor} className="ant-card-body_rating">
          {vote_average}
        </div>
        <div className="ant-card-body_title">{shorTitle}</div>
        <div className="ant-card-body_data">{releaseDate}</div>
        <div className="ant-card-body_genres">{filmGenres}</div>
        <p className="ant-card-body_text"> {shorOverview}</p>

        <div className="ant-card-body_genre-stars">
          <Rate defaultValue={onRating} count={10} onChange={this.ratingСhanges} />
        </div>
      </Card>
    );
  }
}
