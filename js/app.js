(function () {
  const $ = (id) => document.getElementById(id);

  let cart = JSON.parse(localStorage.getItem("qr_cart") || "{}");
  let activeCat = "All";
  let mode = "delivery";

  const cur = RESTAURANT.currency || "Rs";
  const money = (n) => cur + " " + n.toLocaleString("en-PK");
  const del = RESTAURANT.delivery || { charge: 0, freeAbove: 0, note: "" };

  function save() {
    localStorage.setItem("qr_cart", JSON.stringify(cart));
  }

  function cartQty() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }

  function cartSum() {
    return Object.entries(cart).reduce((sum, [id, q]) => {
      const item = RESTAURANT.items.find((i) => i.id === Number(id));
      return item ? sum + item.price * q : sum;
    }, 0);
  }

  function deliveryFee() {
    const sub = cartSum();
    if (!sub || mode !== "delivery") return 0;
    if (del.freeAbove && sub >= del.freeAbove) return 0;
    return del.charge || 0;
  }

  function grandTotal() {
    return cartSum() + deliveryFee();
  }

  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function header() {
    document.title = RESTAURANT.name + " — Online Shop";
    $("rName").textContent = RESTAURANT.name;
    $("rNameUrdu").textContent = RESTAURANT.nameUrdu || "";
    $("rTag").textContent = RESTAURANT.tagline || "";
    $("brandBadge").textContent = RESTAURANT.poweredBy || "QR Shop";
    $("footAddr").textContent = RESTAURANT.address || "";
    $("footBrand").textContent = RESTAURANT.poweredBy ? "Powered by " + RESTAURANT.poweredBy : "";

    if (RESTAURANT.nameFont) {
      $("rName").style.fontFamily = '"' + RESTAURANT.nameFont + '", Outfit, sans-serif';
    }

    if (RESTAURANT.logoImg) {
      const logo = $("logoImg");
      logo.src = RESTAURANT.logoImg;
      logo.hidden = false;
      logo.onload = () => { $("logoFallback").hidden = true; };
      logo.onerror = () => logo.remove();
    }

    const wa = "https://wa.me/" + RESTAURANT.whatsapp + "?text=" + encodeURIComponent("Assalam o Alaikum! " + RESTAURANT.name + " se order karna tha.");
    $("chatLink").href = wa;
    $("mapLink").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent((RESTAURANT.name || "") + " " + (RESTAURANT.address || ""));

    if (del.note) $("delNote").textContent = "🚚 " + del.note;
  }

  function updateBadge() {
    $("tableBadge").textContent = mode === "delivery" ? "🚚 Home Delivery" : "🏪 Store Pickup";
  }

  function setMode(m) {
    mode = m;
    document.querySelectorAll(".mode").forEach((b) => {
      b.classList.toggle("active", b.dataset.mode === m);
    });
    $("deliveryFields").hidden = m !== "delivery";
    $("pickupNote").hidden = m !== "pickup";
    $("delRow").hidden = m !== "delivery";
    $("orderHint").textContent = m === "delivery"
      ? "Order WhatsApp par store ko chala jayega — Cash on Delivery."
      : "Order tayyar hote hi aapko WhatsApp par update aayega.";
    updateBadge();
    renderTotals();
  }

  function renderCats() {
    const cats = ["All", ...RESTAURANT.categories];
    $("cats").innerHTML = cats
      .map((c) => `<button class="pill${c === activeCat ? " active" : ""}" data-cat="${c}" type="button">${c}</button>`)
      .join("");
    $("cats").querySelectorAll(".pill").forEach((p) => {
      p.addEventListener("click", () => {
        activeCat = p.dataset.cat;
        renderCats();
        renderMenu();
      });
    });
  }

  function picHtml(i) {
    return `<div class="card-pic">
      <span class="pic-emoji">${i.emoji || "🛒"}</span>
      ${i.img ? `<img src="${i.img}" alt="" loading="lazy" onerror="this.remove()">` : ""}
    </div>`;
  }

  function renderMenu() {
    const list = RESTAURANT.items.filter((i) => activeCat === "All" || i.cat === activeCat);
    $("menuList").innerHTML = list
      .map((i) => {
        const q = cart[i.id] || 0;
        const ctrl = q > 0
          ? `<div class="qty">
               <button class="qbtn" data-act="minus" data-id="${i.id}" type="button">−</button>
               <span class="qnum">${q}</span>
               <button class="qbtn" data-act="plus" data-id="${i.id}" type="button">+</button>
             </div>`
          : `<button class="add-btn" data-act="plus" data-id="${i.id}" type="button">+ Add</button>`;
        return `<article class="card">
          ${picHtml(i)}
          <div class="card-body">
            <div class="card-title">
              <h3>${i.name}</h3>
              ${i.popular ? '<span class="star">★ Popular</span>' : ""}
            </div>
            <p class="urdu card-urdu">${i.nameUrdu || ""}</p>
            <p class="card-desc">${i.desc || ""}</p>
            <div class="card-foot">
              <span class="price">${money(i.price)}</span>
              ${ctrl}
            </div>
          </div>
        </article>`;
      })
      .join("");

    $("menuList").querySelectorAll("[data-act]").forEach((b) => {
      b.addEventListener("click", () => changeQty(Number(b.dataset.id), b.dataset.act === "plus" ? 1 : -1));
    });
  }

  function changeQty(id, delta) {
    const next = (cart[id] || 0) + delta;
    if (next <= 0) delete cart[id];
    else cart[id] = next;
    save();
    renderMenu();
    renderCart();
    if (delta > 0) toast("Added ✓");
  }

  function renderFab() {
    const q = cartQty();
    $("cartCount").textContent = q === 1 ? "1 item" : q + " items";
    $("cartTotal").textContent = money(grandTotal());
  }

  function renderTotals() {
    const sub = cartSum();
    const fee = deliveryFee();
    $("tSub").textContent = money(sub);
    if (mode === "delivery") {
      $("tDel").innerHTML = sub && fee === 0 && del.freeAbove
        ? '<span class="free-tag">FREE</span>'
        : sub ? money(fee) : "—";
    }
    $("drawerTotal").textContent = money(grandTotal());
    renderFab();
  }

  function renderCart() {
    const entries = Object.entries(cart);
    renderTotals();

    if (!entries.length) {
      $("cartItems").innerHTML = '<p class="empty">Cart is empty — products add karein.</p>';
      $("orderBtn").disabled = true;
      $("orderBtn").classList.add("disabled");
      return;
    }
    $("orderBtn").disabled = false;
    $("orderBtn").classList.remove("disabled");

    $("cartItems").innerHTML = entries
      .map(([id, q]) => {
        const i = RESTAURANT.items.find((x) => x.id === Number(id));
        if (!i) return "";
        return `<div class="cart-row">
          <div class="cart-info">
            <span class="cart-name">${i.name}</span>
            <span class="cart-line">${q} × ${money(i.price)}</span>
          </div>
          <div class="qty">
            <button class="qbtn" data-act="minus" data-id="${i.id}" type="button">−</button>
            <span class="qnum">${q}</span>
            <button class="qbtn" data-act="plus" data-id="${i.id}" type="button">+</button>
          </div>
          <span class="cart-sub">${money(i.price * q)}</span>
        </div>`;
      })
      .join("");

    $("cartItems").querySelectorAll("[data-act]").forEach((b) => {
      b.addEventListener("click", () => changeQty(Number(b.dataset.id), b.dataset.act === "plus" ? 1 : -1));
    });
  }

  function openDrawer() {
    $("drawer").classList.add("open");
    $("overlay").classList.add("show");
    $("drawer").setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeDrawer() {
    $("drawer").classList.remove("open");
    $("overlay").classList.remove("show");
    $("drawer").setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function orderLines() {
    return Object.entries(cart).map(([id, q]) => {
      const i = RESTAURANT.items.find((x) => x.id === Number(id));
      return `${q} x ${i.name} — ${money(i.price * q)}`;
    });
  }

  function sendOrder() {
    if (!cartQty()) return;

    const name = $("nameInput").value.trim();
    const note = $("noteInput").value.trim();
    const sub = cartSum();
    const fee = deliveryFee();

    const phone = $("phoneInput").value.replace(/[^\d+]/g, "");
    if (phone.replace(/\D/g, "").length < 10) {
      $("phoneInput").focus();
      toast("Valid phone number daalein");
      return;
    }

    let head = "";
    if (mode === "delivery") {
      const addr = $("addrInput").value.trim();
      if (addr.length < 8) {
        $("addrInput").focus();
        toast("Pura address likhein");
        return;
      }
      head = `🚚 HOME DELIVERY\n`;
      if (name) head += `Customer: ${name}\n`;
      head += `Phone: ${phone}\n`;
      head += `Address: ${addr}\n`;
    } else {
      head = `🏪 STORE PICKUP\n`;
      if (name) head += `Customer: ${name}\n`;
      head += `Phone: ${phone}\n`;
    }

    let msg = `*NEW ORDER — ${RESTAURANT.name}*\n`;
    msg += head;
    msg += "————————————\n";
    msg += orderLines().join("\n");
    msg += "\n————————————\n";
    msg += `Subtotal: ${money(sub)}\n`;
    if (mode === "delivery") {
      msg += fee === 0 ? "Delivery: FREE\n" : `Delivery: ${money(fee)}\n`;
    }
    msg += `*TOTAL: ${money(grandTotal())}*\n`;
    if (note) msg += `Note: ${note}\n`;
    msg += "(Ordered via QR Shop)";

    window.open("https://wa.me/" + RESTAURANT.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");

    cart = {};
    save();
    renderMenu();
    renderCart();
    closeDrawer();
    toast("WhatsApp khula — order bhej dein ✓");
  }

  function clearOrder() {
    cart = {};
    save();
    renderMenu();
    renderCart();
    toast("Cart cleared");
  }

  $("cartFab").addEventListener("click", openDrawer);
  $("closeDrawer").addEventListener("click", closeDrawer);
  $("overlay").addEventListener("click", closeDrawer);
  $("orderBtn").addEventListener("click", sendOrder);
  $("clearBtn").addEventListener("click", clearOrder);
  document.querySelectorAll(".mode").forEach((b) => {
    b.addEventListener("click", () => setMode(b.dataset.mode));
  });

  header();
  setMode(mode);
  renderCats();
  renderMenu();
  renderCart();
})();
