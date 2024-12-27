import React from "react";
import CustomButton from "@shared/components/Buttons/CustomButton";
import { ItemMenu } from "@interfaces/TopBar";
import { LinkButton } from "@shared/components/Link/LinkButton";
import { Tabs } from '@shared/components/Screen/Tabs'


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
    header:
      <LinkButton to="/admin/facturacion/nueva-factura">
        Nueva Factura
      </LinkButton>
  },
  {
    url: "/admin/notas-credito",
    title: "Notas de Creditos",
    items: [],
    header:
      <LinkButton to="/admin/facturacion/nueva-factura">
        Nueva Nota de Crédito
      </LinkButton>
  },
  {
    url: "/admin/facturacion/nueva-factura",
    title: "Nueva Factura",
    items: [],
    header:
      <LinkButton to="/admin/facturacion">
        &nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;
      </LinkButton>
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
    header:
      <LinkButton to="/admin/productos">
        &nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;
      </LinkButton>
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
    header:
      <LinkButton to="/admin/usuarios">
        &nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;
      </LinkButton>
  },
  {
    url: "/admin/configuracion",
    title: "Configuración",
    items: [],
  },
  
];
