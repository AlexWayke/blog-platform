import { BrowserRouter, Routes, Route } from 'react-router';
import PostsList from '@/pages/postsList/index.ts';
import PostPage from '@/pages/post';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/:slug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
