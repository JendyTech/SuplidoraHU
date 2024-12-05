import { ItemMenu } from "@interfaces/TopBar";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { LinkButton } from "@shared/components/Link/LinkButton";
import React from "react";

export const topBar: ItemMenu[] = [
  {
    url: "/admin",
    title: "Dashboard",
    items: [],
  },
  {
    url: "/admin/facturacion",
    title: "Facturación",
    items: [],
  },
  {
    url: "/admin/productos",
    title: "Productos",
    items: [],
    header:
      <LinkButton to="/admin/productos/crear-producto">
        Añadir producto
      </LinkButton>
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
    header:
      <LinkButton to="/admin/usuarios/crear-usuario">
        Añadir usuario
      </LinkButton>
  },
  {
    url: "/admin/usuarios/crear-usuario",
    title: "Crear Usuario",
    items: [],
  },
  {
    url: "/admin/configuracion",
    title: "Configuración",
    items: [],
  },
];
