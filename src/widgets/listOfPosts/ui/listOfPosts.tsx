import { v4 as uuidv4 } from 'uuid';
import Card from '@/entities/card/index.ts';
import { Pagination } from 'antd';
import { useFavoriteArticleMutation, useGetPostsQuery } from '@/entities/api/rtkApi';
import { Spin } from 'antd';
import { useState } from 'react';
import { ArticleType } from '@/shared/types/articleType';
import './listOfPosts.scss';

function ListOfPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteArticle] = useFavoriteArticleMutation();

  const { data, isLoading } = useGetPostsQuery((currentPage - 1) * 10);
  const posts = data?.articles || [];
  const maxPages = Math.floor(data?.articlesCount / 10) || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cards = posts.map((post: ArticleType) => {
    const handleFavorite = () => {
      favoriteArticle({ slug: post.slug, favorited: post.favorited });
    };

    return <Card favoriteArticle={handleFavorite} cardData={post} cutTitles={true} showBody={false} key={uuidv4()} />;
  });

  return (
    <div className="posts wrapper">
      {isLoading && <Spin size="large" />}
      {!isLoading && (
        <>
          <div className="posts_list layout">{cards}</div>
          <Pagination
            className="layout"
            defaultCurrent={currentPage}
            onChange={handlePageChange}
            showSizeChanger={false}
            total={maxPages}
          />
        </>
      )}
    </div>
  );
}

export default ListOfPosts;
