// src/menuData.js

export const MENU = [
  // ===== coffee =====
  {
    id: 1,
    name: "Еспресо",
    price: 80,
    category: "coffee",
    desc: "Міцно, швидко, чесно.",
    tags: ["хит"],
    image: "espresso.png",
  },
  {
    id: 2,
    name: "Капучіно",
    price: 90,
    category: "coffee",
    desc: "Молочна класика.",
    tags: [],
    image: "cappuccino.png",
  },
  {
    id: 3,
    name: "Раф",
    price: 120,
    category: "coffee",
    desc: "Солодко та м'яко.",
    tags: ["сладко"],
    image: "raf.png",
  },
  {
    id: 4,
    name: "Амерікано",
    price: 70,
    category: "coffee",
    desc: "Довго, чисто, бадьоро.",
    tags: [],
    image: "americano.png",
  },
  {
    id: 5,
    name: "Латте",
    price: 110,
    category: "coffee",
    desc: "М'яко та вершкове.",
    tags: [],
    image: "latte.png",
  },

  // ===== dessert =====
  {
    id: 101,
    name: "Брауні",
    price: 95,
    category: "dessert",
    desc: "Шоколадний, цупкий, вологий.",
    tags: ["хит"],
    image: "brownie.png",
  },
  {
    id: 102,
    name: "Чізкейк",
    price: 140,
    category: "dessert",
    desc: "Ніжний крем-сир, класика.",
    tags: [],
    image: "cheesecake.png",
  },
  {
    id: 103,
    name: "Круасан",
    price: 80,
    category: "dessert",
    desc: "Листковий, хрумкий, свіжий.",
    tags: [],
    image: "croissant.png",
  },

  // ===== tea =====
  {
    id: 201,
    name: "Зелений чай",
    price: 60,
    category: "tea",
    desc: "Легкий та свіжий.",
    tags: [],
    image: "green-tea.png",
  },
  {
    id: 202,
    name: "Чорний чай",
    price: 55,
    category: "tea",
    desc: "Міцний і бадьорий.",
    tags: [],
    image: "black-tea.png",
  },
  {
    id: 203,
    name: "Матча",
    price: 120,
    category: "tea",
    desc: "Яскравий смак, енергія.",
    tags: ["хит"],
    image: "matcha.png",
  },
];

export const TABS = [
  { id: "coffee", label: "Кофе" },
  { id: "dessert", label: "Десерти" },
  { id: "tea", label: "Чай" },
];
