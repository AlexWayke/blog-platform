import { v4 as uuidv4 } from 'uuid';
import Card from '@/entities/card/index.ts';
import { Pagination } from 'antd';
import { useFavoriteArticleMutation, useGetPostsQuery } from '@/entities/api/rtkApi';
import { Spin } from 'antd';
import { ArticleType } from '@/shared/types/articleType';
import './listOfPosts.scss';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

function ListOfPosts() {
  const navigate = useNavigate();
  const { page = 1 } = useParams();
  const [favoriteArticle] = useFavoriteArticleMutation();

  const { data, isLoading } = useGetPostsQuery((Number(page) - 1) * 10);
  const posts = data?.articles || [];
  const maxPages = Math.floor(data?.articlesCount / 10) || 1;

  const handlePageChange = (currentPage: number) => {
    navigate(`/page/${currentPage}`);
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
            defaultCurrent={Number(page)}
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
