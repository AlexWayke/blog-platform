import Header from '@/widgets/header/index.ts';
import NewArticleForm from '@/widgets/newArticle';

function NewArticlePage() {
  const defaultValues = {
    tagList: [],
    title: '',
    description: '',
    body: '',
  };

  return (
    <>
      <Header />
      <NewArticleForm defaultValues={defaultValues} action="create" slug="" />
    </>
  );
}

export default NewArticlePage;
