import React from "react";
import { Link } from "react-router-dom";

import Fontawesome from "react-fontawesome";

export const RatingStars = (rating, starClass) => {
  const defaultRating = ["grey", "grey", "grey", "grey", "grey"];

  const stars = defaultRating.fill("#AC3B61", 0, rating);

  const starIcon = stars.map((item, index) => (
    <Fontawesome
      key={index}
      name='star'
      style={{ color: item }}
      alt={rating}
      className={`${starClass} star_icon`}
    />
  ));

  return starIcon;
};

export const RowGenerator = (list, cols) => {
  const rows = [...Array(Math.ceil(list.length / cols))];
  const articlesRows = rows.map((row, i) =>
    list.slice(i * cols, i * cols + cols)
  );
  return articlesRows;
};

export const GenerateRows = (rows, type) =>
  rows.map((row, i) => (
    <div className='row' key={i}>
      {row.map((article) => (
        <div key={article._id} className={`${type} columns article_block`}>
          <Link to={`/article/${article._id}`}>
            <h3> {article.name}</h3>
            <div>
              <span>Author: {article.author}</span>
            </div>
            <div>
              <span>{RatingStars(article.rating, "home_star")}</span>
            </div>
            <div>
              <span>EUR {article.price}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  ));
