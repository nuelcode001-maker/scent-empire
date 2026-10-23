// ========================================
// SCENT EMPIRE — PERFUME STORE
// Perfume collection + shopping cart
// ========================================

// We will add your real WhatsApp number at the end.
const WHATSAPP_NUMBER = "2349135745543";

const perfumes = [
  {
    name: "Afnan 9PM",
    category: "men",
    price: 45000,
    description: "Sweet, warm and captivating.",
    image: "https://fimgs.net/mdimg/perfume/375x500.65414.jpg",
  },
  {
    name: "Lattafa Asad",
    category: "men",
    price: 35000,
    description: "Bold spices and a warm finish.",
    image:
      "https://elmeira.ae/cdn/shop/files/lattafa-asad-edp-100ml-at-elmeira-12.avif?v=1784754192&width=1301",
  },
  {
    name: "Club de Nuit Intense Man",
    category: "men",
    price: 65000,
    description: "Bold, smoky and sophisticated.",
    image:
      "https://armaf.com/cdn/shop/files/Q-106DCLUBDENUITINTENSE_M_FIF_900x_f04752b1-087d-4206-8985-e13e96c5896d.webp?v=1762289750&width=900",
  },
  {
    name: "Dior Sauvage",
    category: "men",
    price: 180000,
    description: "Fresh, powerful and sophisticated.",
    image: "https://fimgs.net/mdimg/perfume/375x500.31861.jpg",
  },
  {
    name: "Le Male Elixir",
    category: "men",
    price: 200000,
    description: "Warm vanilla and aromatic notes.",
    image: "https://fimgs.net/mdimg/perfume/375x500.81642.jpg",
  },
  {
    name: "YSL Y Eau de Parfum",
    category: "men",
    price: 190000,
    description: "Fresh, modern and elegant.",
    image:
      "https://www.yslbeauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-NGYSL-ILM-Library/default/dw6a7927e8/landing-pages/2025_LP/y-franchise-page/y-franchise-page-content-tile-3.webp?q=85&sfrm=jpg&sh=500&sm=cut&sw=500",
  },
  {
    name: "Lattafa Khamrah",
    category: "unisex",
    price: 50000,
    description: "Sweet, spicy and luxurious.",
    image: "https://fimgs.net/mdimg/perfume/375x500.75805.jpg",
  },
  {
    name: "Versace Eros",
    category: "men",
    price: 120000,
    description: "Fresh, vibrant and captivating.",
    image: "https://fimgs.net/mdimg/perfume/375x500.16657.jpg",
  },
  {
    name: "Coco Mademoiselle",
    category: "women",
    price: 220000,
    description: "Elegant, feminine and timeless.",
    image: "https://fimgs.net/mdimg/perfume/375x500.611.jpg",
  },
  {
    name: "La Vie Est Belle",
    category: "women",
    price: 190000,
    description: "Sweet, graceful and elegant.",
    image: "https://fimgs.net/mdimg/perfume/375x500.14982.jpg",
  },
  {
    name: "Baccarat Rouge 540",
    category: "unisex",
    price: 350000,
    description: "Distinctive and luxurious.",
    image: "https://fimgs.net/mdimg/perfume/375x500.33519.jpg",
  },
  {
    name: "Tom Ford Oud Wood",
    category: "unisex",
    price: 300000,
    description: "Rich woods and refined elegance.",
    image: "https://fimgs.net/mdimg/perfume/375x500.1826.jpg",
  },
];

// Find the website elements.
const productGrid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

// Store selected perfumes and their quantities.
const cart = new Map();

// Format prices in Nigerian naira.
function formatPrice(price) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

// ========================================
// DISPLAY PERFUME COLLECTION
// ========================================

function displayPerfumes(category = "all") {
  if (!productGrid) return;

  const filteredPerfumes =
    category === "all"
      ? perfumes
      : perfumes.filter((perfume) => perfume.category === category);

  productGrid.innerHTML = "";

  filteredPerfumes.forEach((perfume) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
        <div class="product-image">
            <img
                src="${perfume.image}"
                alt="${perfume.name}"
                loading="lazy"
                onerror="this.onerror=null;this.src='https://placehold.co/600x700/171717/D4AF65?text=SCENT+EMPIRE'"
            >
        </div>

        <div class="product-info">
            <p class="product-category">${perfume.category}</p>
            <h3>${perfume.name}</h3>
            <p class="product-description">${perfume.description}</p>
            <p class="product-price">${formatPrice(perfume.price)}</p>

            <button class="order-button add-to-cart-button" type="button">
                ADD TO CART +
            </button>
        </div>
    `;

    card.querySelector(".add-to-cart-button").addEventListener("click", () => {
      addToCart(perfume.name);
    });

    productGrid.appendChild(card);
  });

  // Animate cards when they enter the screen.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    productGrid.querySelectorAll(".product-card").forEach((card) => {
      card.classList.add("reveal-card");
      observer.observe(card);
    });
  }
}

// ========================================
// ADD PERFUME TO CART
// ========================================

function addToCart(perfumeName) {
  const perfume = perfumes.find((item) => item.name === perfumeName);

  if (!perfume) return;

  const existingItem = cart.get(perfumeName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.set(perfumeName, {
      ...perfume,
      quantity: 1,
    });
  }

  renderCart();
}

// ========================================
// DISPLAY SHOPPING CART
// ========================================
// ========================================
// DISPLAY SHOPPING CART
// ========================================

function renderCart() {
  // Update the cart counter.
  const cartCountElement = document.getElementById("cart-count");
  let itemCount = 0;

  cart.forEach(function (item) {
    itemCount += item.quantity;
  });

  if (cartCountElement) {
    cartCountElement.textContent = itemCount;
  }

  // Check that the cart elements exist.
  if (!cartItemsContainer || !cartTotalElement || !checkoutButton) {
    return;
  }

  // Clear the previous cart display.
  cartItemsContainer.innerHTML = "";

  // Show a message if the cart is empty.
  if (cart.size === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart">Your cart is empty. Add a perfume to get started.</p>';

    cartTotalElement.textContent = formatPrice(0);
    checkoutButton.disabled = true;
    return;
  }

  let total = 0;

  // Display each perfume in the cart.
  cart.forEach(function (item) {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${formatPrice(item.price)} each</p>
                <p>Subtotal: ${formatPrice(subtotal)}</p>
            </div>

            <div class="cart-item-actions">
                <button type="button" class="decrease-quantity">−</button>
                <span>${item.quantity}</span>
                <button type="button" class="increase-quantity">+</button>
                <button type="button" class="remove-item">Remove</button>
            </div>
        `;

    cartItem
      .querySelector(".decrease-quantity")
      .addEventListener("click", function () {
        changeQuantity(item.name, -1);
      });

    cartItem
      .querySelector(".increase-quantity")
      .addEventListener("click", function () {
        changeQuantity(item.name, 1);
      });

    cartItem
      .querySelector(".remove-item")
      .addEventListener("click", function () {
        cart.delete(item.name);
        renderCart();
      });

    cartItemsContainer.appendChild(cartItem);
  });

  // Update the total and enable checkout.
  cartTotalElement.textContent = formatPrice(total);
  checkoutButton.disabled = false;
}

// ========================================
// CHANGE QUANTITY
// ========================================

function changeQuantity(perfumeName, change) {
  const item = cart.get(perfumeName);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart.delete(perfumeName);
  }

  renderCart();
}

// ========================================
// WHATSAPP CHECKOUT
// ========================================

function checkoutOnWhatsApp() {
  if (cart.size === 0) return;

  let total = 0;

  const orderLines = [];

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    orderLines.push(
      `${item.name} x ${item.quantity} — ${formatPrice(subtotal)}`,
    );
  });

  const message = [
    "Hello Scent Empire! I'd like to place an order.",
    "",
    ...orderLines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "Please confirm availability. Thank you!",
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

// ========================================
// CATEGORY FILTER BUTTONS
// ========================================

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    displayPerfumes(button.dataset.category);
  });
});

// Connect checkout button.
if (checkoutButton) {
  checkoutButton.addEventListener("click", checkoutOnWhatsApp);
}

// Display products and the empty cart on page load.
displayPerfumes();
renderCart();
