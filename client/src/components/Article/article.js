import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBook, clearBook } from "../../store/actions/book_actions";

import Fontawesome from "react-fontawesome";
const Article = (props) => {
  const article = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBook(props.match.params.id));
    return () => {
      dispatch(clearBook());
    };
  }, [dispatch, props]);

  const ratingStars = () => {
    const { rating } = article.single;
    const defaultRating = ["grey", "grey", "grey", "grey", "grey"];

    const yellowStars = defaultRating.length;

    const stars = defaultRating.fill("yellow", 0, rating);

    const starIcon = stars.map((item, index) => (
      <Fontawesome key={index} name='star' style={{ color: item }} alt={rating}/>
    ));

    return starIcon;
  };

  const showArticle = () => {
    if (article.single) {
      const { name, author, rating, content, ownerId } = article.single;
      return (
        <div className=' single_article_container'>
          <div className='top'>
            <h3>{name}</h3>
            <div>
              <span>Author: </span>
              {author}
            </div>
            <div alt="Rating">{ratingStars()}</div>
            <div className='content'>
              <div
                className='article_content'
                dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <div>
              <i> Reviewed by {ownerId.name} </i>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className='container'>
      {showArticle()}
      <div>
        {article.single === false ? (
          <div className='row articles_container'>
            Sorry, we couldn´t find that book
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Article;
