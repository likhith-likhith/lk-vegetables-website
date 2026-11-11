# LK Vegetables – Full Multilingual Website

This version restores the full original LK Vegetables website sections and combines them with the expanded English/Kannada/Hindi catalogue.

## Included
- Original full landing page: top location bar, sticky navigation, hero section, trust/service strip, vegetable catalogue, special-function section, about section, contact card and footer.
- English, Kannada and Hindi language selector.
- 36 vegetables and leafy greens with English, Kannada and Hindi names.
- Catalogue search across all three languages and category filters.
- Select vegetables only. There are no kilogram, quantity or price inputs.
- Selected items are sent to WhatsApp: +91 93535 67963.
- Call button, WhatsApp buttons and floating WhatsApp shortcut.
- Hassan and Chikkamagaluru service-area information.
- Wedding, Gruha Pravesha/housewarming, family function, wholesale, retail and home-delivery enquiries.
- No fixed prices; customers are asked to message for current market rates.
- Responsive layout for desktop and mobile.

## Run on Windows
1. Extract the ZIP.
2. Open the `lk-vegetables-website` folder in VS Code (the folder containing `package.json`).
3. Open Terminal in that folder and run:

```powershell
npm install
npm run dev
```

4. Open the localhost URL printed by Vite (usually http://localhost:5173/).

## Edit products
Open `src/data.js`. Each product is stored with English (`en`), Kannada (`kn`), Hindi (`hi`), emoji and category. Keep all three names when adding or editing a product.

## Contact details
The WhatsApp/call number is configured in `src/App.jsx` as `919353567963`.
