// src/menuData.js

export const MENU = [
  // ===== coffee =====
  {
    id: 1,
    name: "Эспрессо",
    price: 80,
    category: "coffee",
    desc: "Крепко, быстро, честно.",
    tags: ["хит"],
    image: "espresso.png",
  },
  {
    id: 2,
    name: "Капучино",
    price: 90,
    category: "coffee",
    desc: "Молочная классика.",
    tags: [],
    image: "cappuccino.png",
  },
  {
    id: 3,
    name: "Раф",
    price: 120,
    category: "coffee",
    desc: "Сладко и мягко.",
    tags: ["сладко"],
    image: "raf.png",
  },
  {
    id: 4,
    name: "Американо",
    price: 70,
    category: "coffee",
    desc: "Долго, чисто, бодро.",
    tags: [],
    image: "americano.png",
  },
  {
    id: 5,
    name: "Латте",
    price: 110,
    category: "coffee",
    desc: "Мягко и сливочно.",
    tags: [],
    image: "latte.png",
  },

  // ===== dessert =====
  {
    id: 101,
    name: "Брауни",
    price: 95,
    category: "dessert",
    desc: "Шоколадный, плотный, влажный.",
    tags: ["хит"],
    image: "brownie.png",
  },
  {
    id: 102,
    name: "Чизкейк",
    price: 140,
    category: "dessert",
    desc: "Нежный крем-сыр, классика.",
    tags: [],
    image: "cheesecake.png",
  },
  {
    id: 103,
    name: "Круассан",
    price: 80,
    category: "dessert",
    desc: "Слоёный, хрустящий, свежий.",
    tags: [],
    image: "croissant.png",
  },

  // ===== tea =====
  {
    id: 201,
    name: "Зелёный чай",
    price: 60,
    category: "tea",
    desc: "Лёгкий и свежий.",
    tags: [],
    image: "green-tea.png",
  },
  {
    id: 202,
    name: "Чёрный чай",
    price: 55,
    category: "tea",
    desc: "Крепкий и бодрый.",
    tags: [],
    image: "black-tea.png",
  },
  {
    id: 203,
    name: "Матча",
    price: 120,
    category: "tea",
    desc: "Яркий вкус, энергия.",
    tags: ["хит"],
    image: "matcha.png",
  },
];

export const TABS = [
  { id: "coffee", label: "Кофе" },
  { id: "dessert", label: "Десерты" },
  { id: "tea", label: "Чай" },
];
