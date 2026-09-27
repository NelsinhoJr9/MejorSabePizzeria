/* =====================================================================
   CONFIGURACIÓN DE TAILWIND — compartida por todas las páginas del sitio
   -----------------------------------------------------------------
   Se carga en <head>, justo después del script de Tailwind (CDN), en
   index.html, carta.html, aviso-legal.html y cookies.html. Si cambian
   los colores de marca, la tipografía o el breakpoint "xs", este es
   el único archivo que hay que tocar.
===================================================================== */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        cream: "#F9F6F0",
        creamdark: "#F1EBDD",
        ink: "#1A1A1A",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      // Breakpoint extra para textos cortos en botones muy pequeños (móviles estrechos)
      screens: {
        xs: "420px",
      },
    },
  },
};
