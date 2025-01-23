import { BrowserRouter, Routes, Route } from 'react-router';
import PostsList from '@/pages/postsList';
import PostPage from '@/pages/post';
import SignInPage from '@/pages/signIn';
import SignUpPage from '@/pages/signUp';
import EditProfilePage from '@/pages/editProfile';
import NewArticlePage from '@/pages/newArticle';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/:slug" element={<PostPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/new-article" element={<NewArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
