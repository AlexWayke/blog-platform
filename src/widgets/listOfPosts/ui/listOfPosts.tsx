import { v4 as uuidv4 } from 'uuid';
import Card from '@/entities/card/index.ts';
import { Pagination } from 'antd';
import { useGetPostsQuery } from '@/entities/api/rtkApi';
import { Spin } from 'antd';
import { useState } from 'react';
import { ArticleType } from '@/shared/types/articleType';
import './listOfPosts.scss';

function ListOfPosts() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetPostsQuery((currentPage - 1) * 10);
  const posts = data?.articles || [];
  const maxPages = Math.floor(data?.articlesCount / 10) || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const cards = posts.map((post: ArticleType) => <Card cardData={post} showBody={false} key={uuidv4()} />);

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
