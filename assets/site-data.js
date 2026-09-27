/* =====================================================================
   CONFIGURACIÓN DEL NEGOCIO
   -----------------------------------------------------------------
   Edita únicamente los valores de este bloque antes de publicar el
   sitio: número de WhatsApp, usuario de Instagram, dirección y
   horario. El resto del código (assets/site.js) los usa
   automáticamente en TODAS las páginas para construir los enlaces y
   el badge de "Abierto ahora".
===================================================================== */
const SITE_CONFIG = {
  // Número en formato internacional, solo dígitos (sin "+", sin espacios).
  // Ejemplo España: "34600000000"
  whatsappNumber: "34722592199", // Número real del local

  whatsappMessage: "Hola, quiero reservar una mesa en Pizzería Mejor Sabe...",

  instagramHandle: "pizzeriamejorsabe", // https://www.instagram.com/pizzeriamejorsabe/

  address: "Calle Dr. Nacher, 45, 46370 Chiva, Valencia",

  // Horario semanal. "shifts" es un array de turnos [apertura, cierre].
  // Deja "shifts: null" en los días de cierre.
  // index: 0 = Domingo ... 6 = Sábado (coincide con Date.getDay())
  hours: [
    { index: 0, day: "Domingo",  shifts: [["17:00", "00:30"]] },
    { index: 1, day: "Lunes",    shifts: null }, // cerrado
    { index: 2, day: "Martes",   shifts: [["17:00", "00:30"]] },
    { index: 3, day: "Miércoles",shifts: [["17:00", "00:30"]] },
    { index: 4, day: "Jueves",   shifts: [["17:00", "00:30"]] },
    { index: 5, day: "Viernes",  shifts: [["17:00", "00:30"]] },
    { index: 6, day: "Sábado",   shifts: [["17:00", "00:30"]] },
  ],

  // Horario de cocina (se muestra debajo del horario del local).
  kitchenHours: ["19:00", "23:00"],};

/* =====================================================================
   CARTA — DATOS DE LOS PLATOS
   -----------------------------------------------------------------
   Cada objeto representa un plato. Esta estructura está pensada para
   poder sustituirse en el futuro por una llamada a una API / TPV:
   basta con reemplazar el array MENU_DATA por el resultado de un
   fetch() que devuelva el mismo formato, por ejemplo:
     const MENU_DATA = await fetch('/api/carta').then(r => r.json());
   Se usa en carta.html (la carta interactiva vive ahora en su propia
   página, separada de index.html).
===================================================================== */
const MENU_DATA = [
  // Los platos sin "price" se muestran sin precio hasta que se rellene.

  // ---- ENTRANTES ----
  {
    id: "fingers-queso",
    category: "entrantes",
    name: "Fingers de Queso",
    description: "Bastones de mozzarella empanados y fritos al momento, con salsa barbacoa casera.",
    price: 7.5,
    image: "ImagenesMejorSabe/fingersQeso.png",
    tags: ["Vegetariano"],
  },
  {
    id: "patatas-mejor-sabe",
    category: "entrantes",
    name: "Patatas Mejor Sabe",
    description: "Patatas fritas caseras cubiertas de queso fundido y bacon crujiente.",
    price: 7.0,
    image: "ImagenesMejorSabe/PatatasMejorSabe.png",
    tags: [],
  },
  {
    id: "empanada-criolla",
    category: "entrantes",
    name: "Empanada Criolla de Ternera",
    description: "Empanada argentina al horno, rellena de ternera cortada a cuchillo, cebolla, huevo y aceituna.",
    price: null,
    image: null,
    tags: [],
  },
  {
    id: "ensalada-cesar",
    category: "entrantes",
    name: "Ensalada César",
    description: "Lechuga romana, picatostes crujientes, parmesano y nuestra salsa César.",
    price: null,
    image: null,
    tags: [],
  },
  {
    id: "calamares-romana",
    category: "entrantes",
    name: "Calamares a la Romana",
    description: "Anillas de calamar rebozadas y fritas al momento, con limón.",
    price: null,
    image: null,
    tags: [],
  },
  {
    id: "patatas-bravas",
    category: "entrantes",
    name: "Patatas Bravas Caseras",
    description: "Patatas caseras fritas al momento con nuestra salsa brava.",
    price: null,
    image: null,
    tags: ["Vegetariano"],
  },
  {
    id: "nachos-caseros",
    category: "entrantes",
    name: "Nachos Caseros con Guacamole y Cheddar",
    description: "Nachos crujientes hechos en casa, con guacamole y cheddar fundido.",
    price: null,
    image: "ImagenesMejorSabe/nachoMejorSabe.png",
    tags: ["Vegetariano"],
  },

  // ---- PIZZAS ----
  {
    id: "pizza-serrana",
    category: "pizzas",
    name: "Pizza Serrana",
    description: "Base de tomate natural, mozzarella fundida al horno de piedra y jamón serrano curado.",
    price: 11.5,
    image: "ImagenesMejorSabe/Pizza.png",
    tags: [],
  },
  {
    id: "pizza-especial",
    category: "pizzas",
    name: "Pizza Especial Mejor Sabe",
    description: "Mitad y mitad: carbonara de huevo y jamón, y pollo a la brasa bañado en salsa barbacoa casera.",
    price: 13.0,
    image: "ImagenesMejorSabe/pizza2.png",
    tags: [],
  },
  {
    id: "pizza-muzzarella",
    category: "pizzas",
    name: "Pizza Muzzarella",
    description: "Doble mozzarella y cebolla al horno de piedra, con un toque de salsa verde de la casa.",
    price: 9.5,
    image: "ImagenesMejorSabe/PizzaMuzzarella.png",
    tags: ["Vegetariano"],
  },
  {
    id: "pizza-pina",
    category: "pizzas",
    name: "Pizza Piña",
    description: "Jamón, mozzarella y piña natural sobre base de tomate. La favorita de los que se atreven.",
    price: 10.5,
    image: "ImagenesMejorSabe/PIzzaPina.png",
    tags: [],
  },

  // ---- CALZONIS ----
  {
    id: "calzone-mar-del-plata",
    category: "calzonis",
    name: "Calzone Mar del Plata",
    description: "Nuestra masa horneada y doblada, rellena de jamón, mozzarella y tomate, dorada al horno de piedra.",
    price: 11.0,
    image: "ImagenesMejorSabe/CalzoneMarDelPlata.png",
    tags: [],
  },
  {
    id: "calzone-patagonia",
    category: "calzonis",
    name: "Calzone Patagonia",
    description: "Calzone relleno de mozzarella y salsa verde de la casa, con un toque de ajo y perejil.",
    price: 11.5,
    image: "ImagenesMejorSabe/CalzonePatagonia.png",
    tags: ["Vegetariano"],
  },

  // ---- HAMBURGUESAS ----
  {
    id: "hamburguesa",
    category: "hamburguesas",
    name: "Hamburguesa Mejor Sabe",
    description: "Ternera 100%, bacon crujiente, huevo frito y queso fundido en pan de ciabatta, con patatas caseras.",
    price: 12.5,
    image: "ImagenesMejorSabe/hambuerugesa.png",
    tags: [],
  },

  // ---- BOCADILLOS ----
  {
    id: "chivito",
    category: "bocadillos",
    name: "Chivito",
    description: "Filete de ternera, jamón, queso, huevo, lechuga y tomate.",
    price: null,
    image: null,
    tags: [],
  },
  {
    id: "brascada",
    category: "bocadillos",
    name: "Brascada",
    description: "El clásico valenciano: ternera a la plancha, jamón y cebolla pochada.",
    price: null,
    image: null,
    tags: [],
  },
  {
    id: "almussafes",
    category: "bocadillos",
    name: "Almussafes",
    description: "Sobrasada, queso fundido y cebolla caramelizada.",
    price: null,
    image: null,
    tags: [],
  },

  // ---- POSTRES ----
  {
    id: "coulant",
    category: "postres",
    name: "Coulant de Chocolate",
    description: "Bizcocho de chocolate templado con corazón líquido, helado de vainilla y virutas de chocolate blanco.",
    price: 5.5,
    image: "ImagenesMejorSabe/coulantPostre.png",
    tags: ["Vegetariano"],
  },
  {
    id: "crepe-dulce-de-leche",
    category: "postres",
    name: "Crepe con Dulce de Leche",
    description: "Crepe recién hecha rellena de dulce de leche.",
    price: null,
    image: null,
    tags: ["Vegetariano"],
  },
  {
    id: "brownie",
    category: "postres",
    name: "Brownie de Chocolate",
    description: "Brownie de chocolate templado. Con bola de helado opcional.",
    price: null,
    image: null,
    tags: ["Vegetariano"],
  },
  {
    id: "tarta-de-queso",
    category: "postres",
    name: "Tarta de Queso",
    description: "Tarta de queso casera, cremosa por dentro.",
    price: null,
    image: null,
    tags: ["Vegetariano"],
  },

  // ---- BEBIDAS ----
  {
    id: "cocteles",
    category: "bebidas",
    name: "Coctelería de la Casa",
    description: "Mojito, Old Fashioned, Cosmopolitan y más clásicos, preparados al momento en barra.",
    price: 7.5,
    priceLabel: "Desde 7,50 €",
    image: "ImagenesMejorSabe/cocteles.png",
    tags: [],
  },
];

/* =====================================================================
   RESEÑAS DE GOOGLE
   -----------------------------------------------------------------
   Reseñas reales copiadas de la ficha de Google del local. Para
   añadir o quitar una, basta con editar este array: la pasarela se
   regenera sola. El orden aquí es el orden en que aparecen (la de
   Mario Fernandez se deja al final a propósito). Se usa en index.html.
===================================================================== */
const REVIEWS_DATA = [
  {
    name: "Anabel Saavedra Ramirez",
    meta: "3 reseñas · 2 fotos",
    time: "Hace 5 meses",
    text: "La comida, el servicio y el ambiente… sin palabras de lo bien que hemos estado. Los nachos y las pizzas, deliciosas 😊",
  },
  {
    name: "Carmen Payá",
    meta: "8 reseñas · 3 fotos",
    time: "Hace 7 meses",
    text: "Es un restaurante al que volvería, y que vale muchísimo la pena, tanto por la calidad de la comida como por el buen servicio. ¡Un 10 de 10 sin lugar a dudas!",
  },
  {
    name: "Librepensador Estoico",
    badge: "Local Guide",
    meta: "38 reseñas · 6 fotos",
    time: "Hace 2 meses",
    text: "Un excelente lugar donde disfrutar de una buena pizza y muchas cosas más. Un ambiente perfecto, muy buena ubicación y un servicio genial.",
  },
  {
    name: "Chiara Soltys",
    meta: "10 reseñas · 2 fotos",
    time: "Hace 8 meses",
    text: "Excelente servicio y amabilidad, de las mejores pizzas que he probado. Muy buena la atención de Lautaro, ¡súper recomendable! Volveremos cada fin de semana.",
  },
  {
    name: "Mario Fernandez",
    meta: "3 reseñas",
    time: "Hace 3 años",
    text: "Una mezcla de etnias muy amables, con un gran recibimiento. Es más que agradable disfrutar de la gastronomía italiana con ingredientes españoles, elaborada por un argentino y servida con un trato que no necesita tu cartera. Imposible encontrar mejor experiencia gastronómica y multicultural en Chiva.",
  },
];
