import { v4 as uuidv4 } from 'uuid';
import Card from '@/entities/card/index.ts';
import { useGetSinglePostQuery } from '@/entities/api/rtkApi';
import { Spin } from 'antd';

import './post.scss';
import { useParams } from 'react-router';
import { useAppSelector } from '@/shared/hooks/hooks';

function Post() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetSinglePostQuery(slug);
  const { user } = useAppSelector((store) => store.user);
  const isUserPost = data?.article?.author?.username == user.username;

  return (
    <div className="post wrapper">
      {isError && <p>Something went wrong :/</p>}
      {isLoading && <Spin size="large" />}
      {!isLoading && (
        <div className="layout">
          <Card cardData={data.article} showBody={true} key={uuidv4()} cutTitles={false} isUserPost={isUserPost} />
        </div>
      )}
    </div>
  );
}

export default Post;
