import { v4 as uuidv4 } from 'uuid';
import Card from '@/entities/card/index.ts';
import Pagination from '@/entities/pagination/index.ts';
import Like from '@/features/like/index.ts';

import './listOfPosts.scss';

function ListOfPosts() {
  const cardsData = [
    {
      title: 'Some article title',
      tags: ['tag1', 'tag2'],
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae at blanditiis eum ducimus fuga.',
      author: 'John Doe',
      date: 'March 5, 2020',
    },
    {
      title: 'Some article title',
      tags: ['tag1', 'tag2'],
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae at blanditiis eum ducimus fuga consectetur facere asperiores reiciendis ad excepturi. Minima ex assumenda error blanditiis possimus tenetur porro amet vero.',
      author: 'John Doe',
      date: 'March 5, 2020',
    },
  ];

  const cards = cardsData.map((cardData) => <Card cardData={cardData} actionSlot={<Like />} key={uuidv4()} />);

  return (
    <div className="posts wrapper">
      <div className="posts_list">{cards}</div>
      <Pagination />
    </div>
  );
}

export default ListOfPosts;
