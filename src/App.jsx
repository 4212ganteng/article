import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddNew from "./pages/AddNew";
import AllPost from "./pages/AllPost";
import PostDetail from "./pages/PostDetail";
import Preview from "./pages/Preview";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const client = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={client}>
        <Navigation />
        <Routes>
          <Route exac path="/" element={<AllPost />} />
          <Route exac path="/addNew" element={<AddNew />} />
          <Route exac path="/preview" element={<Preview />} />
          <Route exac path="/postDetail" element={<PostDetail />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
