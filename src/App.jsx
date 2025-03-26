import BlogPost from "./components/BlogPost";
import BlogPosts from "./components/BlogPosts";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* DYNAMIC ROUTES */}
          <Route path="blogposts" element={<BlogPosts />} />
          <Route path="blogposts/:id" element={<BlogPost />} />

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
