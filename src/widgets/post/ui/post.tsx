import { v4 as uuidv4 } from 'uuid';
import Card from '@/entities/card/index.ts';
import { useGetSinglePostQuery } from '@/entities/api/rtkApi';
import { Spin } from 'antd';

import './post.scss';
import { useParams } from 'react-router';

function Post() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetSinglePostQuery(slug);

  return (
    <div className="post wrapper">
      {isError && <p></p>}
      {isLoading && <Spin size="large" />}
      {!isLoading && (
        <div className="layout">
          <Card cardData={data.article} showBody={true} key={uuidv4()} />
        </div>
      )}
    </div>
  );
}

export default Post;
