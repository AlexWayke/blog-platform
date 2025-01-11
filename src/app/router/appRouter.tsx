import { BrowserRouter, Routes, Route } from 'react-router';
import PostsList from '@/pages/postsList/index.ts';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PostsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
