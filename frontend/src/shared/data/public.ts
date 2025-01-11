import { IconShield, IconShoppingBag, IconTruck } from "@tabler/icons-react";

export const PUBLIC_NAV_LINKS = [
  { path: "/#top", label: "Inicio" },
  { path: "/catalogo#top", label: "Catálogo" },
  { path: "/contacto#top", label: "Contactanos" },
];

export const FEATURES = [
  {
    title: "Variedad de artículos",
    description: "Encontrarás una gran variedad de artículo de todo tipo",
    icon: IconShoppingBag,
  },
  {
    title: "Envíos a todo el país",
    description:
      "Realizamos envíos a domicilio a cualquier parte de la Republica Dominicana",
    icon: IconShield,
  },
  {
    title: "Garantía y calidad",
    description:
      "Nos aseguramos de que su producto sea de la mayor calidad posible y garantizada",
    icon: IconTruck,
  },
];

export const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description:
      "Premium wireless headphones with active noise cancellation for an immersive audio experience.",
    code: "BTS-J1",
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 199.99,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description:
      "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.",
    code: "BTS-J2",
  },
];

export const SAMPLE_CATEGORIES = [
  {
    name: "Todos",
    id: "all",
  },
  {
    name: "Electronicos",
    id: "electronics",
  },
  {
    name: "Libros",
    id: "books",
  },
  {
    name: "Ropa",
    id: "clothing",
  },
  {
    name: "Hogar y cocina",
    id: "home-kitchen",
  },
];
