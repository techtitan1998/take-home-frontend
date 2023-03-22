import Public from "./layout/Public";
import Private from "./layout/Private";
import AuthGuard from "./auth/Guard";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Profile from "./pages/profile";
import PostDetail from "./pages/post-detail";
import Categories from "./pages/categories";
import NewsFeed from "./pages/news-feed";
const routes = [
  {
    path: "/",
    element: <Public />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element: <Contact /> },
      { path: "/article-detail", element: <PostDetail /> },
      { path: "/categories/:category", element: <Categories /> },
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Private />
      </AuthGuard>
    ),
    children: [
      { path: "/profile", element: <Profile /> },
      { path: "/news-feed", element: <NewsFeed /> },
    ],
  },
];

export default routes;
