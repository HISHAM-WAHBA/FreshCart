import {
  brands,
  categories,
  demoUser,
  products,
  subcategories,
} from "./mockData";

const KEYS = {
  users: "freshcart_mock_users",
  resetCode: "freshcart_mock_reset_code",
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const pause = () => new Promise((resolve) => setTimeout(resolve, 80));

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : clone(fallback);
  } catch {
    return clone(fallback);
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

function makeError(message, statusCode = 400) {
  const error = new Error(message);
  error.response = { data: { message } };
  return { success: false, error, message, statusCode };
}

function ok(data, statusCode = 200) {
  return { success: true, data, statusCode };
}

function getUsers() {
  let users = read(KEYS.users, null);
  if (!users) {
    users = [clone(demoUser)];
    write(KEYS.users, users);
  }
  return users;
}

function getUserFromToken(token) {
  if (!token || !token.startsWith("mock.")) return null;
  try {
    const email = atob(token.split(".")[1]);
    return getUsers().find((user) => user.email === email) || null;
  } catch {
    return null;
  }
}

function requireUser(config) {
  const token = config.headers?.token || getToken();
  const user = getUserFromToken(token);
  if (!user) throw makeError("Please login first", 401);
  return { user, token };
}

function getPath(config) {
  return (config.url || "")
    .split("?")[0]
    .replace(/^\/api\/(v1\/)?/, "");
}

function getQuery(config) {
  const search = (config.url || "").split("?")[1] || "";
  return new URLSearchParams(search);
}

function findProduct(id) {
  return products.find((product) => product._id === id || product.id === id);
}

// ---------- Cart ----------
function cartKey(token) {
  return `freshcart_mock_cart_${token}`;
}

function emptyCart() {
  return {
    cartId: "mock-cart",
    numOfCartItems: 0,
    data: { products: [], totalCartPrice: 0 },
  };
}

function normalizeCart(cart) {
  const items = cart.data.products;
  cart.data.totalCartPrice = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  cart.numOfCartItems = items.reduce((sum, item) => sum + item.count, 0);
  return cart;
}

function getCart(token) {
  return normalizeCart(read(cartKey(token), emptyCart()));
}

function saveCart(token, cart) {
  const value = normalizeCart(cart);
  write(cartKey(token), value);
  return value;
}

// ---------- Wishlist ----------
function wishlistKey(token) {
  return `freshcart_mock_wishlist_${token}`;
}

function emptyWishlist() {
  return { data: [], count: 0, myWishlists: [] };
}

function normalizeWishlist(wishlist) {
  wishlist.count = wishlist.data.length;
  return wishlist;
}

function getWishlist(token) {
  return normalizeWishlist(read(wishlistKey(token), emptyWishlist()));
}

function saveWishlist(token, wishlist) {
  const value = normalizeWishlist(wishlist);
  write(wishlistKey(token), value);
  return value;
}

// ---------- Orders ----------
function ordersKey(token) {
  return `freshcart_mock_orders_${token}`;
}

function getOrders(token) {
  return read(ordersKey(token), { data: [] });
}

// ---------- Handlers ----------
function handleGetProducts(query) {
  let list = [...products];

  const keyword = query.get("keyword")?.toLowerCase();
  if (keyword) {
    list = list.filter((product) =>
      [product.title, product.description, product.category?.name]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }

  const category = query.get("category[in]");
  if (category) {
    list = list.filter((product) => product.category?._id === category);
  }

  const brand = query.get("brand");
  if (brand) {
    list = list.filter((product) => product.brand?._id === brand);
  }

  const min = Number(query.get("price[gte]"));
  const max = Number(query.get("price[lte]"));
  const priceOf = (product) => product.priceAfterDiscount || product.price;
  if (min) list = list.filter((product) => priceOf(product) >= min);
  if (max) list = list.filter((product) => priceOf(product) <= max);

  const sort = query.get("sort");
  if (sort === "price") list.sort((a, b) => priceOf(a) - priceOf(b));
  else if (sort === "-price") list.sort((a, b) => priceOf(b) - priceOf(a));
  else if (sort === "-ratingsAverage")
    list.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
  else if (sort === "-createdAt")
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return ok({ data: list });
}

function handleAuth(config, path, body) {
  if (path === "/auth/signup" && config.method === "POST") {
    const users = getUsers();
    if (users.some((user) => user.email === body.email)) {
      throw makeError("Email already exists");
    }
    const user = {
      name: body.name,
      email: body.email,
      password: body.password,
      phone: body.phone,
    };
    write(KEYS.users, [...users, user]);
    const token = `mock.${btoa(user.email)}.demo`;
    write("freshcart_mock_pending_user", user);
    return ok({ token, user: { name: user.name, email: user.email } }, 201);
  }

  if (path === "/auth/signin" && config.method === "POST") {
    const user = getUsers().find(
      (item) =>
        item.email === body.email && item.password === body.password
    );
    if (!user) throw makeError("Incorrect email or password", 401);
    const token = `mock.${btoa(user.email)}.demo`;
    return ok({ token, user: { name: user.name, email: user.email } });
  }

  if (path === "/auth/forgotPasswords" && config.method === "POST") {
    write(KEYS.resetCode, { email: body.email, code: "123456" });
    return ok({ status: "Success", message: "Reset code: 123456" });
  }

  if (path === "/auth/verifyResetCode" && config.method === "POST") {
    const saved = read(KEYS.resetCode, null);
    if (!saved || saved.code !== body.resetCode) {
      throw makeError("Invalid or expired reset code");
    }
    return ok({ status: "Success" });
  }

  if (path === "/auth/resetPassword" && config.method === "PUT") {
    const users = getUsers();
    const index = users.findIndex((user) => user.email === body.email);
    if (index === -1) throw makeError("User not found");
    users[index].password = body.newPassword;
    write(KEYS.users, users);
    localStorage.removeItem(KEYS.resetCode);
    return ok({ status: "Success", message: "Password updated" });
  }

  return null;
}

function handleCart(config, path, body, token) {
  const cart = getCart(token);

  if (path === "/cart" && config.method === "GET") return ok(cart);

  if (path === "/cart" && config.method === "POST") {
    const product = findProduct(body.productId);
    if (!product) throw makeError("Product not found", 404);
    const items = cart.data.products;
    const existing = items.find((item) => item.product._id === product._id);
    if (existing) existing.count += 1;
    else
      items.push({
        _id: product._id,
        id: product._id,
        count: 1,
        price: product.priceAfterDiscount || product.price,
        product: clone(product),
      });
    return ok({ ...saveCart(token, cart), message: "Product added to cart" });
  }

  if (path.startsWith("/cart/") && config.method === "DELETE") {
    const id = path.split("/")[2];
    cart.data.products = cart.data.products.filter(
      (item) => item.product._id !== id && item._id !== id
    );
    return ok({ ...saveCart(token, cart), message: "Product removed" });
  }

  if (path.startsWith("/cart/") && config.method === "PUT") {
    const id = path.split("/")[2];
    const item = cart.data.products.find(
      (entry) => entry.product._id === id || entry._id === id
    );
    if (!item) throw makeError("Item not found", 404);
    item.count = Number(body.count);
    if (item.count <= 0) {
      cart.data.products = cart.data.products.filter(
        (entry) => entry !== item
      );
    }
    return ok({ ...saveCart(token, cart), message: "Cart updated" });
  }

  if (path === "/cart" && config.method === "DELETE") {
    return ok({ ...saveCart(token, emptyCart()), message: "Cart cleared" });
  }

  return null;
}

function handleWishlist(config, path, body, token) {
  const wishlist = getWishlist(token);

  if (path === "/wishlist" && config.method === "GET") return ok(wishlist);

  if (path === "/wishlist" && config.method === "POST") {
    const product = findProduct(body.productId);
    if (!product) throw makeError("Product not found", 404);
    if (!wishlist.data.some((item) => item._id === product._id)) {
      wishlist.data.push(clone(product));
    }
    return ok({
      ...saveWishlist(token, wishlist),
      message: "Added to wishlist",
    });
  }

  if (path.startsWith("/wishlist/") && config.method === "DELETE") {
    const id = path.split("/")[2];
    wishlist.data = wishlist.data.filter((item) => item._id !== id);
    return ok({
      ...saveWishlist(token, wishlist),
      message: "Removed from wishlist",
    });
  }

  return null;
}

function handleOrders(config, path, body, token) {
  if (path === "/orders" && config.method === "GET") {
    return ok(getOrders(token));
  }

  const checkoutMatch = path.match(/^\/orders\/checkout-session\/(.+)$/);
  const codMatch = path.match(/^\/orders\/(.+)$/);
  if (
    config.method === "POST" &&
    (checkoutMatch || codMatch) &&
    !path.startsWith("/orders/checkout-session/")
  ) {
    const cart = getCart(token);
    if (!cart.data.products.length) throw makeError("Your cart is empty");

    const subtotal = cart.data.totalCartPrice;
    const order = {
      _id: `o${Date.now()}`,
      createdAt: new Date().toISOString(),
      isPaid: false,
      isDelivered: false,
      cartItems: cart.data.products.map((item) => ({
        _id: item._id,
        product: clone(item.product),
        count: item.count,
        price: item.price,
      })),
      shippingAddress: body.shippingAddress,
      totalOrderPrice: subtotal + 70 + Math.trunc(subtotal * 0.14),
    };

    const all = getOrders(token);
    write(ordersKey(token), { data: [order, ...all.data] });
    saveCart(token, emptyCart());
    return ok({ message: "Order created successfully", order }, 201);
  }

  if (config.method === "POST" && checkoutMatch) {
    const cart = getCart(token);
    const subtotal = cart.data.totalCartPrice;
    const order = {
      _id: `o${Date.now()}`,
      createdAt: new Date().toISOString(),
      isPaid: true,
      isDelivered: false,
      cartItems: cart.data.products.map((item) => ({
        _id: item._id,
        product: clone(item.product),
        count: item.count,
        price: item.price,
      })),
      shippingAddress: body.shippingAddress,
      totalOrderPrice: subtotal + 70 + Math.trunc(subtotal * 0.14),
    };
    const all = getOrders(token);
    write(ordersKey(token), { data: [order, ...all.data] });
    saveCart(token, emptyCart());
    return ok({ message: "Order created successfully", order }, 201);
  }

  const idMatch = path.match(/^\/orders\/([^/]+)$/);
  if (config.method === "GET" && idMatch) {
    const order = getOrders(token).data.find((item) => item._id === idMatch[1]);
    if (!order) throw makeError("Order not found", 404);
    return ok({ data: order });
  }

  return null;
}

export async function mockRequest(config) {
  await pause();

  const path = getPath(config);
  const query = getQuery(config);
  config.method = (config.method || "GET").toUpperCase();
  const method = config.method;
  const body = config.data || {};

  // Public catalogue
  if (method === "GET" && path === "/categories")
    return ok({ data: clone(categories) });
  if (method === "GET" && path === "/subcategories")
    return ok({ data: clone(subcategories) });
  if (method === "GET" && path === "/brands")
    return ok({ data: clone(brands) });
  if (method === "GET" && path === "/products")
    return handleGetProducts(query);

  const productMatch = path.match(/^\/products\/([^/]+)$/);
  if (method === "GET" && productMatch) {
    const product = findProduct(productMatch[1]);
    if (!product) throw makeError("Product not found", 404);
    return ok({ data: clone(product) });
  }

  // Auth
  const authResult = handleAuth(config, path, body);
  if (authResult) return authResult;

  // Protected routes
  const { token } = requireUser(config);

  const cartResult = handleCart(config, path, body, token);
  if (cartResult) return cartResult;

  const wishlistResult = handleWishlist(config, path, body, token);
  if (wishlistResult) return wishlistResult;

  const ordersResult = handleOrders(config, path, body, token);
  if (ordersResult) return ordersResult;

  throw makeError(`Mock endpoint not found: ${method} ${path}`, 404);
}
