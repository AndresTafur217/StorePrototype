import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { Content } from "./Content";
import { Products } from "./Products";
import { Favorites } from "./Favorites";
import { Orders } from "./Orders";
import { Invoices } from "./Invoices";
import { History } from "./History";
import { User } from "./User";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />
          <Route path="productos" element={<Products />} />
          <Route path="guardados" element={<Favorites />} />
          <Route path="pedidos" element={<Orders />} />
          <Route path="pedidos-realizados" element={<Invoices />} />
          <Route path="historial" element={<History />} />
          <Route path="perfil" element={<User />} />
        </Route>
      </Routes>
    </Router>
  )
}