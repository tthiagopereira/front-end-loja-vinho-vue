import CreateProduct from "./components/create/CreateProduct";
import Home from "./components/home/Home";
import CreateClient from "./components/create/CreateClient";
import Show from "./components/show/Show";
import FechaPedido from "./components/checkout/Checkout ";
import Resume from "./components/shared/resumo/Resume";

export const routes = [
  {path: '', component: Home},
  {path: '/create/product', component: CreateProduct},
  {path: '/create/client', component: CreateClient},
  {path: '/show/product/:id', component: Show},
  {path: '/checkout', component: FechaPedido},
  {path: '/resume', component: Resume}
]
