import { useGetSinglePostQuery } from '@/entities/api/rtkApi';
import { useAppSelector } from '@/shared/hooks/hooks';
import Header from '@/widgets/header/index.ts';
import NewArticleForm from '@/widgets/newArticle';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

function EditArticlePage() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { user } = useAppSelector((store) => store.user);
  const { data, isLoading, isError } = useGetSinglePostQuery(slug);

  const defaultValues = {
    tagList: data?.article?.tagList || [],
    title: data?.article?.title || '',
    description: data?.article?.description || '',
    body: data?.article?.body || '',
  };

  useEffect(() => {
    if (data.article.author.username !== user.username) {
      navigate('/');
    }
  }, [data.article.author.username, navigate, user.username]);

  return (
    <>
      <Header />
      {isError && <p>Something went wrong :/</p>}
      {isLoading && (
        <div className="post wrapper">
          <Spin size="large" />
        </div>
      )}
      {!isLoading && <NewArticleForm defaultValues={defaultValues} action="create" slug={slug || ''} />}
    </>
  );
}

export default EditArticlePage;
