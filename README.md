# FreshCart | E-Commerce | Store 

##pachages
[1] Design [UI] styles >>>>Tailwind
[2] Icons              >>>>Fontawsom 
[3] Routing            >>>>React Router
[4] API                >>>>Axios
[5] workin with Forms  >>>>Formik&Yup
[6] Validation         >>>>Yup
[7] Fonts              >>>>Fontsource

## Demo data (no backend required)

The app runs with a built-in static catalog by default:

- Products, categories, subcategories and brands: `src/Data/mockData.js`
- Mock API (auth, cart, wishlist, orders): `src/Data/mockApi.js`
- Demo login: `demo@freshcart.com` / `Demo@12345`
- Password reset code: `123456`

Cart, wishlist, orders and users saved through the demo account are stored in `localStorage`, so they persist after refresh.

To connect a real API later, set `VITE_API_BASE_URL` in a `.env` file. When that variable is set, the static demo adapter is disabled automatically.
