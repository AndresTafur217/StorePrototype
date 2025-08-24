import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { Content } from "./Content";
import { Products } from "./Products";
import { Favorites } from "./Favorites";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />
          <Route path="productos" element={<Products />} />
          <Route path="guardados" element={<Favorites />} />
        </Route>
      </Routes>
    </Router>
  )
}