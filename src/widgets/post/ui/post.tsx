import { v4 as uuidv4 } from 'uuid';
import Card from '@/entities/card/index.ts';
import { useFavoriteArticleMutation, useGetSinglePostQuery } from '@/entities/api/rtkApi';
import { Spin } from 'antd';

import './post.scss';
import { useParams } from 'react-router';
import { useAppSelector } from '@/shared/hooks/hooks';

function Post() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetSinglePostQuery(slug);
  const { user } = useAppSelector((store) => store.user);
  const isUserPost = data?.article?.author?.username == user.username;
  const [favoriteArticle, { data: dataFavorite }] = useFavoriteArticleMutation();
  const nextData = dataFavorite?.article || data?.article;

  const handleFavorite = () => {
    favoriteArticle({ token: user.token, slug, favorited: nextData.favorited });
  };

  return (
    <div className="post wrapper">
      {isError && <p>Something went wrong :/</p>}
      {isLoading && <Spin size="large" />}
      {!isLoading && (
        <div className="layout">
          <Card
            cardData={nextData}
            favoriteArticle={handleFavorite}
            showBody={true}
            key={uuidv4()}
            cutTitles={false}
            isUserPost={isUserPost}
          />
        </div>
      )}
    </div>
  );
}

export default Post;
