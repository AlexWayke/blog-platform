import { Routes, Route, Navigate, Outlet, HashRouter } from 'react-router';
import PostsList from '@/pages/postsList';
import PostPage from '@/pages/post';
import SignInPage from '@/pages/signIn';
import SignUpPage from '@/pages/signUp';
import EditProfilePage from '@/pages/editProfile';
import NewArticlePage from '@/pages/newArticle';
import { useAppSelector } from '@/shared/hooks/hooks';
import EditArticlePage from '@/pages/editArticle';

function AppRouter() {
  const { isLogged } = useAppSelector((store) => store.user);
  const ProtectedNotAuthRoute = ({ redirectedPath = '/sign-in' }) =>
    isLogged ? <Outlet /> : <Navigate to={redirectedPath} />;
  const ProtectedAuthRoute = ({ redirectedPath = '/' }) => (!isLogged ? <Outlet /> : <Navigate to={redirectedPath} />);

  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<PostsList />} />
        <Route path="/articles?" element={<PostsList />} />
        <Route path="/articles/:slug" element={<PostPage />} />
        <Route element={<ProtectedNotAuthRoute />}>
          <Route path="/profile" element={<EditProfilePage />} />
          <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
          <Route path="/new-article" element={<NewArticlePage />} />
        </Route>
        <Route element={<ProtectedAuthRoute />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
