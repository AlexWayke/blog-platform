import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from '@/entities/card/index.ts';
import Pagination from '@/entities/pagination/index.ts';
import Like from '@/features/like/index.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks.ts';
import { fetchPosts } from '../model/postsSlice.ts';

import './listOfPosts.scss';

function ListOfPosts() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  console.log('posts', posts);

  useEffect(() => {
    dispatch(fetchPosts());
  });

  const cards = posts.map((post) => <Card cardData={post} actionSlot={<Like />} key={uuidv4()} />);

  return (
    <div className="posts wrapper">
      <div className="posts_list">{cards}</div>
      <Pagination />
    </div>
  );
}

export default ListOfPosts;
