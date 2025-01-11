import { postsResponse } from '@/shared/types/articleType.ts';

const getData = async (url: string) => {
  const result = await fetch(url);

  if (result.status === 500) {
    return getData(url);
  }

  if (!result.ok) {
    throw new Error('Could not fetch');
  }
  const parsedResult = await result.json();
  return parsedResult;
};

const getPosts = async () => {
  const postsRes: postsResponse = await getData('https://blog-platform.kata.academy/api/articles');

  return postsRes;
};

export default getPosts;
