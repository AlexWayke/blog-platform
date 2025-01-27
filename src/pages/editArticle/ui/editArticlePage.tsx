import { useGetSinglePostQuery } from '@/entities/api/rtkApi';
import Header from '@/widgets/header/index.ts';
import NewArticleForm from '@/widgets/newArticle';
import { Spin } from 'antd';
import { useParams } from 'react-router';

function EditArticlePage() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetSinglePostQuery(slug);

  const defaultValues = {
    tagList: data?.article?.tagList || [],
    title: data?.article?.title || '',
    description: data?.article?.description || '',
    body: data?.article?.body || '',
  };

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
