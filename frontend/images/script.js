document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cartCount = document.getElementById("cart-count");
    const searchInput = document.querySelector(".nav-right input");
    const categoryCards = document.querySelectorAll(".category-card");
    const productGrid = document.getElementById("product-grid");

    const API = "http://localhost:5000";
    let allProducts = [];

    // ================= CART COUNT =================
    async function updateCartCount() {
        if (!user) {
            if (cartCount) cartCount.innerText = 0;
            return;
        }

        try {
            const res = await fetch(`${API}/cart/${user._id}`);
            const data = await res.json();

            let count = 0;

            if (data && data.items) {
                data.items.forEach(item => {
                    count += item.quantity;
                });
            }

            cartCount.innerText = count;
        } catch (err) {
            console.log("Cart Count Error:", err);
            cartCount.innerText = 0;
        }
    }

    // ================= LOAD PRODUCTS =================
    async function loadProducts() {
        try {
            const res = await fetch(`${API}/products`);
            const products = await res.json();

            allProducts = products;
            renderProducts(products);

        } catch (err) {
            console.log("Load Products Error:", err);
        }
    }

    // ================= RENDER PRODUCTS =================
    function renderProducts(products) {
        productGrid.innerHTML = "";

        products.forEach(product => {
            productGrid.innerHTML += `
                <div class="card" data-id="${product._id}">
                    <img src="${API}${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>⭐⭐⭐⭐</p>
                    <h4>₹${product.price}</h4>
                    <div class="btns">
                        <button class="cart-btn">Add to Cart</button>
                        <button class="buy-btn">Buy Now</button>
                    </div>
                </div>
            `;
        });

        attachCartEvents();
        attachBuyEvents();
    }

    // ================= ADD TO CART =================
    function attachCartEvents() {
        document.querySelectorAll(".cart-btn").forEach(button => {
            button.addEventListener("click", async () => {

                if (!user) {
                    alert("Please login first");
                    window.location.href = "login.html";
                    return;
                }

                const card = button.closest(".card");
                const productId = card.dataset.id;

                const product = {
                    productId,
                    name: card.querySelector("h3").innerText,
                    price: parseInt(card.querySelector("h4").innerText.replace("₹", "")),
                    image: card.querySelector("img").src,
                    quantity: 1
                };

                try {
                    const res = await fetch(`${API}/cart/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: user._id,
                            product
                        })
                    });

                    const data = await res.json();

                    if (res.ok) {
                        alert(data.message || "Added to cart");
                        updateCartCount();
                    } else {
                        alert(data.message || "Failed");
                    }

                } catch (err) {
                    console.log("Cart Error:", err);
                    alert("Server error");
                }
            });
        });
    }

    // ================= BUY NOW =================
    function attachBuyEvents() {
        document.querySelectorAll(".buy-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const card = btn.closest(".card");
                alert("Buy Now: " + card.querySelector("h3").innerText);
            });
        });
    }

    // ================= SEARCH =================
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = searchInput.value.toLowerCase();

            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(value)
            );

            renderProducts(filtered);
        });
    }

    // ================= CATEGORY FILTER =================
    categoryCards.forEach(category => {
        category.addEventListener("click", function () {
            const selected = category.innerText.toLowerCase();

            let filtered = [];

            if (selected.includes("vegetables")) {
                filtered = allProducts.filter(p => p.category === "vegetables");
            } else if (selected.includes("fruits")) {
                filtered = allProducts.filter(p => p.category === "fruits");
            } else if (selected.includes("dairy")) {
                filtered = allProducts.filter(p => p.category === "dairy");
            } else if (selected.includes("bakery")) {
                filtered = allProducts.filter(p => p.category === "bakery");
            }

            renderProducts(filtered);
        });
    });

    // ================= HERO TEXT =================
    const heroText = document.querySelector(".hero-left h1");

    const heroMessages = [
        "Fresh Organic Groceries Delivered Daily",
        "Healthy Food For Healthy Life",
        "Best Quality At Best Prices"
    ];

    let current = 0;

    if (heroText) {
        setInterval(() => {
            current = (current + 1) % heroMessages.length;
            heroText.innerText = heroMessages[current];
        }, 3000);
    }

    updateCartCount();
    loadProducts();
});