import { ItemMenu } from "@interfaces/TopBar";

export const topBar: ItemMenu[] = [
 
  {
    url: "/admin/productos",
    title: "Productos",
    items: [],
  },
  {
    url: "/admin/productos/detalle/:id",
    title: "Detalle de producto",
    items: [],
  },
  {
    url: "/admin/productos/editar/:id",
    title: "Editar producto",
    items: [],
  },
  {
    url: "/admin/productos/crear-producto",
    title: "Crear producto",
    items: [],
  },
  {
    url: "/admin/usuarios",
    title: "Usuarios",
    items: [],
  },
  {
    url: "/admin/usuarios/crear-usuario",
    title: "Crear usuario",
    items: [],
  },

  {
    url: "/admin/perfil",
    title: "Mi Pefil",
    items: [],
  },
];
