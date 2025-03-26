import BlogPost from "./components/BlogPost";
import BlogPosts from "./components/BlogPosts";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import NewPost from "./pages/NewPost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* DYNAMIC ROUTES */}
          <Route path="blogposts" element={<BlogPosts />} />
          <Route path="blogposts/:id" element={<BlogPost />} />
          <Route path="new" element={<NewPost />} />

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
