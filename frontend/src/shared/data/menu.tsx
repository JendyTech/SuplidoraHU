import React from "react";
import { ItemMenu } from "@interfaces/TopBar";
import { LinkButton } from "@shared/components/Link/LinkButton";

export const topBar: ItemMenu[] = [
  {
    url: "/admin/productos",
    title: "Productos",
    items: [],
    header: (
      <LinkButton to="/admin/productos/crear-producto">
        Añadir producto
      </LinkButton>
    ),
  },

  {
    url: "/admin/productos/detalle/:id",
    title: "Detalle de Producto",
    items: [],
    header: (
      <LinkButton to="/admin/productos">
        &nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;
      </LinkButton>
    ),
  },
  {
    url: "/admin/productos/editar/:id",
    title: "Editar Producto",
    items: [],
    header: (
      <LinkButton to="/admin/productos">
        &nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;
      </LinkButton>
    ),



  },
  {
    url: "/admin/productos/crear-producto",
    title: "Crear producto",
    items: [],
    header: (
      <LinkButton to="/admin/productos">
        &nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;
      </LinkButton>
    ),
  },
  {
    url: "/admin/usuarios",
    title: "Usuarios",
    items: [],
    header: (
      <LinkButton to="/admin/usuarios/crear-usuario">Añadir usuario</LinkButton>
    ),
  },
  {
    url: "/admin/usuarios/detalle/:id",
    title: "Detalle de Usuario",
    items: [],
    header: (
      <LinkButton to="/admin/usuarios">
        &nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;
      </LinkButton>
    ),
  },
  {
    url: "/admin/usuarios/editar/:id",
    title: "Editar Usuario",
    items: [],
    header: (
      <LinkButton to="/admin/usuarios">
        &nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;
      </LinkButton>
    ),
  },
  {
    url: "/admin/usuarios/crear-usuario",
    title: "Crear Usuario",
    items: [],
    header: (
      <LinkButton to="/admin/usuarios">
        &nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;
      </LinkButton>
    ),
  },
  {
    url: "/admin/configuracion",
    title: "Configuración",
    items: [],
  },
  {
    url: "/admin/productos/:id",
    title: "Detalle de producto",
    items: [],
  },

  {
    url: "/admin/perfil",
    title: "Mi Pefil",
    items: [],
  },
];
