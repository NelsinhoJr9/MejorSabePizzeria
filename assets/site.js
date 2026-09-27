/* =====================================================================
   LÓGICA COMPARTIDA DEL SITIO
   -----------------------------------------------------------------
   Este archivo se carga (después de assets/site-data.js) en las
   cuatro páginas del sitio: index.html, carta.html, aviso-legal.html
   y cookies.html. Como no todas las páginas tienen los mismos
   elementos (por ejemplo, solo index.html tiene horario y reseñas,
   y solo carta.html tiene la grilla de platos), cada función
   comprueba primero si su elemento existe antes de tocarlo — así una
   misma función puede llamarse en cualquier página sin romper nada.
===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  applyConfigLinks();
  renderMenu("entrantes"); // Arranca mostrando una sola categoría, no la carta entera (solo aplica en carta.html)
  setupTabs();
  setupMobileMenu();
  setupHeaderScroll();
  renderHours();
  updateOpenBadge();
  renderReviews();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (window.lucide) lucide.createIcons();
});

/* ---------------------------------------------------------------------
   Aplica la configuración del negocio a todos los enlaces del sitio
   (WhatsApp, Instagram y Google Maps) para no repetirlos a mano.
   Cada elemento se busca con getElementById/querySelectorAll y se
   comprueba antes de usarlo, porque no todas las páginas los tienen.
--------------------------------------------------------------------- */
function applyConfigLinks() {
  const waLink =
    "https://wa.me/" +
    SITE_CONFIG.whatsappNumber +
    "?text=" +
    encodeURIComponent(SITE_CONFIG.whatsappMessage);

  const waFloat = document.getElementById("whatsapp-float");
  if (waFloat) waFloat.href = waLink;

  const reservarBtn = document.getElementById("reservar-btn");
  if (reservarBtn) reservarBtn.href = waLink;

  const mapsLink =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(SITE_CONFIG.address);

  const heroMapsBtn = document.getElementById("hero-maps-btn");
  if (heroMapsBtn) heroMapsBtn.href = mapsLink;

  const ubicacionMapsBtn = document.getElementById("ubicacion-maps-btn");
  if (ubicacionMapsBtn) ubicacionMapsBtn.href = mapsLink;

  const addressMapsLink = document.getElementById("address-maps-link");
  if (addressMapsLink) addressMapsLink.href = mapsLink;

  const addressText = document.getElementById("address-text");
  if (addressText) addressText.textContent = SITE_CONFIG.address;

  document.querySelectorAll('a[href*="instagram.com/tuusuario"]').forEach((a) => {
    a.href = "https://instagram.com/" + SITE_CONFIG.instagramHandle;
  });
  document
    .querySelectorAll("#comunidad h3")
    .forEach((el) => (el.textContent = "Síguenos en @" + SITE_CONFIG.instagramHandle));
}

/* ---------------------------------------------------------------------
   Renderiza únicamente los platos de la categoría seleccionada. Así
   el cliente ve solo lo que le interesa, sin tener que bajar por
   toda la carta para llegar, por ejemplo, a las bebidas.
   Solo existe #menu-grid en carta.html; en el resto de páginas esta
   función no hace nada.
--------------------------------------------------------------------- */
function renderMenu(category) {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  const empty = document.getElementById("menu-empty");
  grid.innerHTML = "";

  const items = MENU_DATA.filter((d) => d.category === category);

  if (items.length === 0) {
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

  items.forEach((dish) => grid.appendChild(buildDishCard(dish)));
  if (window.lucide) lucide.createIcons();
}

function buildDishCard(dish) {
  const card = document.createElement("article");
  card.className =
    "dish-card bg-white border border-black/10 rounded-2xl overflow-hidden flex flex-col";
  card.dataset.category = dish.category;

  // Si un plato aún no tiene precio, la tarjeta se muestra sin él.
  const priceText = dish.priceLabel
    ? dish.priceLabel
    : typeof dish.price === "number"
      ? dish.price.toFixed(2).replace(".", ",") + " €"
      : "";

  card.innerHTML = `
    ${
      dish.image
        ? `<div class="aspect-[4/3] overflow-hidden bg-creamdark">
             <img src="${dish.image}" alt="${dish.name}" loading="lazy" class="w-full h-full object-cover" />
           </div>`
        : ""
    }
    <div class="p-5 flex flex-col gap-2 flex-1">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-display text-lg leading-snug">${dish.name}</h3>
        ${priceText ? `<span class="font-medium whitespace-nowrap">${priceText}</span>` : ""}
      </div>
      <p class="text-sm text-ink/60 flex-1">${dish.description}</p>
      ${
        dish.tags && dish.tags.length
          ? `<div class="flex flex-wrap gap-1.5 pt-1">
               ${dish.tags
                 .map(
                   (t) =>
                     `<span class="text-[11px] uppercase tracking-wide border border-black/15 rounded-full px-2.5 py-1 text-ink/60">${t}</span>`
                 )
                 .join("")}
             </div>`
          : ""
      }
    </div>
  `;
  return card;
}

/* ---------------------------------------------------------------------
   Pestañas de categoría: filtran el grid sin recargar la página.
   Si la página no tiene pestañas (.tab-btn), simplemente no hay nada
   que enlazar y la función no hace nada.
--------------------------------------------------------------------- */
function setupTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderMenu(btn.dataset.category);
    });
  });
}

/* ---------------------------------------------------------------------
   Menú móvil: abre/cierra el panel y cierra al pulsar un enlace.
   El header (y por lo tanto este menú) es igual en todas las páginas.
--------------------------------------------------------------------- */
function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    btn.setAttribute("aria-expanded", String(!isOpen));
    btn.innerHTML = isOpen
      ? '<i data-lucide="menu" class="w-5 h-5"></i>'
      : '<i data-lucide="x" class="w-5 h-5"></i>';
    if (window.lucide) lucide.createIcons();
  });

  menu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
      if (window.lucide) lucide.createIcons();
    });
  });
}

/* ---------------------------------------------------------------------
   Header: añade fondo + blur en cuanto el usuario hace scroll.
   Presente en todas las páginas.
--------------------------------------------------------------------- */
function setupHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add("bg-cream/90", "backdrop-blur-md", "border-black/10", "shadow-sm");
    } else {
      header.classList.remove("bg-cream/90", "backdrop-blur-md", "border-black/10", "shadow-sm");
    }
  };
  document.addEventListener("scroll", onScroll);
  onScroll();
}

/* ---------------------------------------------------------------------
   Pinta la lista de horarios a partir de SITE_CONFIG.hours.
   Solo existe #hours-list en index.html.
--------------------------------------------------------------------- */
function renderHours() {
  const list = document.getElementById("hours-list");
  if (!list) return;

  const today = new Date().getDay();

  list.innerHTML = SITE_CONFIG.hours
    .map((d) => {
      const isToday = d.index === today;
      const shiftsText = d.shifts
        ? d.shifts.map((s) => `${s[0]}–${s[1]}`).join("  /  ")
        : "Cerrado";
      return `
        <li class="flex items-center justify-between py-3 text-sm ${
          isToday ? "font-semibold" : "text-ink/70"
        }">
          <span>${d.day}${isToday ? " · hoy" : ""}</span>
          <span>${shiftsText}</span>
        </li>`;
    })
    .join("");

  const kitchen = document.getElementById("kitchen-hours-text");
  if (kitchen && SITE_CONFIG.kitchenHours) {
    const [from, to] = SITE_CONFIG.kitchenHours;
    kitchen.textContent = `Cocina abierta de ${from} a ${to}`;
  }
}

/* ---------------------------------------------------------------------
   Pinta la pasarela de reseñas. El array REVIEWS_DATA se dibuja dos
   veces, una a continuación de la otra, para que la animación CSS
   (translateX(-50%)) genere un scroll infinito sin cortes visibles.
   Solo existe #reviews-track en index.html.
--------------------------------------------------------------------- */
function renderReviews() {
  const track = document.getElementById("reviews-track");
  if (!track) return;

  const doubled = [...REVIEWS_DATA, ...REVIEWS_DATA];
  track.innerHTML = doubled.map(buildReviewCardHTML).join("");
}

function buildReviewCardHTML(review) {
  const initial = review.name.trim().charAt(0).toUpperCase();
  const stars = '<i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>'.repeat(5);

  return `
    <article class="review-card shrink-0 bg-white border border-black/10 rounded-2xl p-6 flex flex-col gap-3 text-left" aria-hidden="true">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-ink text-cream flex items-center justify-center font-display text-base shrink-0">
          ${initial}
        </div>
        <div class="min-w-0">
          <p class="font-medium text-sm truncate">${review.name}</p>
          <p class="text-xs text-ink/50 truncate">
            ${review.badge ? review.badge + " · " : ""}${review.meta}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="flex gap-0.5">${stars}</div>
        <span class="text-xs text-ink/40">${review.time}</span>
      </div>

      <p class="text-sm text-ink/70 leading-relaxed">${review.text}</p>
    </article>
  `;
}

/* ---------------------------------------------------------------------
   Calcula si el local está abierto ahora mismo y actualiza el badge
   del hero ("Abierto ahora..." / "Cerrado ahora..."). Solo existen
   #open-dot y #open-text en index.html.
--------------------------------------------------------------------- */
function updateOpenBadge() {
  const dot = document.getElementById("open-dot");
  const text = document.getElementById("open-text");
  if (!dot || !text) return;

  const now = new Date();
  const today = SITE_CONFIG.hours.find((d) => d.index === now.getDay());
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const toMinutes = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h === 0 ? 24 * 60 + m : h * 60 + m; // 00:00 se trata como cierre de madrugada
  };

  let isOpenNow = false;
  let currentOrNextShift = null;

  // Turno de ayer que cruza la medianoche (p. ej. 17:00–00:30): entre
  // las 00:00 y el cierre seguimos abiertos aunque hoy sea día de cierre.
  const yesterday = SITE_CONFIG.hours.find((d) => d.index === (now.getDay() + 6) % 7);
  if (yesterday && yesterday.shifts) {
    for (const [open, close] of yesterday.shifts) {
      const c = toMinutes(close);
      if (c > 24 * 60 && nowMinutes < c - 24 * 60) {
        isOpenNow = true;
        currentOrNextShift = [open, close];
      }
    }
  }

  if (!isOpenNow && today && today.shifts) {
    for (const [open, close] of today.shifts) {
      const o = toMinutes(open);
      const c = toMinutes(close);
      if (nowMinutes >= o && nowMinutes < c) {
        isOpenNow = true;
        currentOrNextShift = [open, close];
        break;
      }
      if (nowMinutes < o && !currentOrNextShift) {
        currentOrNextShift = [open, close];
      }
    }
  }

  if (isOpenNow) {
    dot.className = "w-2 h-2 rounded-full bg-green-600";
    text.textContent = `Abierto ahora · hasta las ${currentOrNextShift[1]}`;
  } else if (currentOrNextShift) {
    dot.className = "w-2 h-2 rounded-full bg-amber-500";
    text.textContent = `Cerrado ahora · hoy abrimos a las ${currentOrNextShift[0]}`;
  } else {
    dot.className = "w-2 h-2 rounded-full bg-red-500";
    text.textContent = "Hoy cerrado";
  }
}
