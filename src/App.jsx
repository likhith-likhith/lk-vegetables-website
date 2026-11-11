import React, { useMemo, useState } from "react";
import { products, categories } from "./data";

const PHONE = "919353567963";
const wa = (message) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

const copy = {
  en: {
    navProducts:"Products", navServices:"Our services", navAbout:"About us", navContact:"Contact", language:"Language",
    badge:"FRESH • WHOLESALE • HOME DELIVERY", title:"Fresh vegetables.", titleAccent:"Happier gatherings.",
    subtitle:"Your trusted vegetable supply partner for homes, weddings, housewarmings and every special occasion.",
    order:"Order on WhatsApp", call:"Call us", wholesaleNote:"Wholesale & retail enquiries welcome", browse:"Explore vegetables",
    trust1:"Home delivery", trust1s:"Ask about your area", trust2:"Wholesale & retail", trust2s:"Small or bulk orders", trust3:"Function supplies", trust3s:"Plan your event order", trust4:"Local service", trust4s:"Chikkamagaluru & Hassan",
    market:"OUR VEGETABLE SELECTION", choose:"Fresh picks for", chooseAccent:"everyday.", chooseSub:"Choose what you need and send your list directly to us.", search:"Find a vegetable...",
    priceNote:"Vegetable prices change with the daily market.", priceBold:"Message us for today's confirmed price.",
    selected:"vegetables selected", selectionHint:"Select products only — no kg or quantity required.", send:"Send selection on WhatsApp", empty:"No matching vegetables. Message us for availability.",
    servicesEyebrow:"FOR YOUR SPECIAL DAYS", servicesTitle:"Big celebrations.", servicesAccent:"Fresh beginnings.",
    servicesText:"Planning a wedding feast, housewarming or family function? Tell us your event date and vegetable requirements. We’ll help you plan a bulk order.", functionOrder:"Enquire for function orders",
    wedding:"Weddings", weddingSub:"Bulk vegetable supply", housewarming:"Housewarmings", housewarmingSub:"Gruha Pravesha orders", functions:"All functions", functionsSub:"Plan your requirements", homeOrders:"Home orders", homeOrdersSub:"Ask about delivery",
    aboutEyebrow:"A LOCAL PARTNER YOU CAN CONTACT", aboutTitle:"Freshness made", aboutAccent:"simple.", aboutText:"LK Vegetables helps households, caterers and event organisers source fresh vegetables through wholesale, retail and home-delivery enquiries in Chikkamagaluru and Hassan.",
    point1:"Easy WhatsApp ordering", point2:"Bulk order enquiries", point3:"Direct contact with Lohith Kumar",
    contactEyebrow:"LET'S GET YOUR ORDER STARTED", contactTitle:"Need fresh vegetables?", contactText:"Contact us for today's prices, bulk quantities and delivery availability.", contactPerson:"YOUR CONTACT", contactName:"Lohith Kumar", callLabel:"CALL US", waLabel:"WHATSAPP ORDERS", chat:"Chat with us", location:"Chikkamagaluru & Hassan, Karnataka",
    footerLine:"Fresh vegetables for homes, weddings, events, restaurants and celebrations.", rights:"All rights reserved.", floating:"Chat on WhatsApp", askPrices:"Ask for today's prices"
  },
  kn: {
    navProducts:"ತರಕಾರಿಗಳು", navServices:"ನಮ್ಮ ಸೇವೆಗಳು", navAbout:"ನಮ್ಮ ಬಗ್ಗೆ", navContact:"ಸಂಪರ್ಕ", language:"ಭಾಷೆ",
    badge:"ತಾಜಾ • ಸಗಟು • ಮನೆಗೆ ವಿತರಣೆ", title:"ತಾಜಾ ತರಕಾರಿಗಳು.", titleAccent:"ಸಂತೋಷದ ಸಮಾರಂಭಗಳು.",
    subtitle:"ಮನೆಗಳು, ಮದುವೆಗಳು, ಗೃಹಪ್ರವೇಶಗಳು ಮತ್ತು ಪ್ರತಿಯೊಂದು ವಿಶೇಷ ಸಂದರ್ಭಕ್ಕೂ ನಿಮ್ಮ ನಂಬಿಕೆಯ ತರಕಾರಿ ಪೂರೈಕೆದಾರರು.",
    order:"ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ", call:"ನಮಗೆ ಕರೆ ಮಾಡಿ", wholesaleNote:"ಸಗಟು ಮತ್ತು ಚಿಲ್ಲರೆ ವಿಚಾರಣೆಗಳಿಗೆ ಸ್ವಾಗತ", browse:"ತರಕಾರಿಗಳನ್ನು ನೋಡಿ",
    trust1:"ಮನೆಗೆ ವಿತರಣೆ", trust1s:"ನಿಮ್ಮ ಪ್ರದೇಶದ ಬಗ್ಗೆ ಕೇಳಿ", trust2:"ಸಗಟು ಮತ್ತು ಚಿಲ್ಲರೆ", trust2s:"ಕಡಿಮೆ ಅಥವಾ ಹೆಚ್ಚಿನ ಆರ್ಡರ್", trust3:"ಸಮಾರಂಭಗಳಿಗೆ ಪೂರೈಕೆ", trust3s:"ನಿಮ್ಮ ಕಾರ್ಯಕ್ರಮದ ಆರ್ಡರ್", trust4:"ಸ್ಥಳೀಯ ಸೇವೆ", trust4s:"ಹಾಸನ ಮತ್ತು ಚಿಕ್ಕಮಗಳೂರು",
    market:"ನಮ್ಮ ತರಕಾರಿ ಆಯ್ಕೆ", choose:"ಪ್ರತಿದಿನಕ್ಕೂ", chooseAccent:"ತಾಜಾ ತರಕಾರಿಗಳು.", chooseSub:"ನಿಮಗೆ ಬೇಕಾದ ತರಕಾರಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ ಪಟ್ಟಿಯನ್ನು ನೇರವಾಗಿ ನಮಗೆ ಕಳುಹಿಸಿ.", search:"ತರಕಾರಿ ಹುಡುಕಿ...",
    priceNote:"ತರಕಾರಿಗಳ ಬೆಲೆಗಳು ದೈನಂದಿನ ಮಾರುಕಟ್ಟೆಯಂತೆ ಬದಲಾಗುತ್ತವೆ.", priceBold:"ಇಂದಿನ ಖಚಿತ ಬೆಲೆಗಾಗಿ ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ.",
    selected:"ತರಕಾರಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ", selectionHint:"ತರಕಾರಿಗಳನ್ನು ಮಾತ್ರ ಆಯ್ಕೆಮಾಡಿ — ಕೆ.ಜಿ. ಅಥವಾ ಪ್ರಮಾಣದ ಅಗತ್ಯವಿಲ್ಲ.", send:"ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆಯ್ಕೆಯನ್ನು ಕಳುಹಿಸಿ", empty:"ತರಕಾರಿ ಸಿಗಲಿಲ್ಲ. ಲಭ್ಯತೆಗಾಗಿ ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ.",
    servicesEyebrow:"ನಿಮ್ಮ ವಿಶೇಷ ದಿನಗಳಿಗಾಗಿ", servicesTitle:"ದೊಡ್ಡ ಸಂಭ್ರಮಗಳು.", servicesAccent:"ತಾಜಾ ಆರಂಭಗಳು.",
    servicesText:"ಮದುವೆ, ಗೃಹಪ್ರವೇಶ ಅಥವಾ ಕುಟುಂಬ ಸಮಾರಂಭವನ್ನು ಯೋಜಿಸುತ್ತಿದ್ದೀರಾ? ಕಾರ್ಯಕ್ರಮದ ದಿನಾಂಕ ಮತ್ತು ತರಕಾರಿ ಅಗತ್ಯಗಳನ್ನು ತಿಳಿಸಿ. ಹೆಚ್ಚಿನ ಪ್ರಮಾಣದ ಆರ್ಡರ್ ಯೋಜಿಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.", functionOrder:"ಸಮಾರಂಭದ ಆರ್ಡರ್‌ಗಾಗಿ ವಿಚಾರಿಸಿ",
    wedding:"ಮದುವೆಗಳು", weddingSub:"ಹೆಚ್ಚಿನ ಪ್ರಮಾಣದ ತರಕಾರಿ ಪೂರೈಕೆ", housewarming:"ಗೃಹಪ್ರವೇಶ", housewarmingSub:"ಗೃಹಪ್ರವೇಶದ ಆರ್ಡರ್‌ಗಳು", functions:"ಎಲ್ಲಾ ಸಮಾರಂಭಗಳು", functionsSub:"ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ಯೋಜಿಸಿ", homeOrders:"ಮನೆಗೆ ಆರ್ಡರ್", homeOrdersSub:"ವಿತರಣೆಯ ಬಗ್ಗೆ ವಿಚಾರಿಸಿ",
    aboutEyebrow:"ನೀವು ಸಂಪರ್ಕಿಸಬಹುದಾದ ಸ್ಥಳೀಯ ಪಾಲುದಾರರು", aboutTitle:"ತಾಜಾತನವನ್ನು", aboutAccent:"ಸರಳಗೊಳಿಸಿ.", aboutText:"ಹಾಸನ ಮತ್ತು ಚಿಕ್ಕಮಗಳೂರು ಪ್ರದೇಶದ ಮನೆಗಳು, ಅಡುಗೆದಾರರು ಮತ್ತು ಕಾರ್ಯಕ್ರಮ ಆಯೋಜಕರಿಗೆ ಸಗಟು, ಚಿಲ್ಲರೆ ಮತ್ತು ಮನೆ ವಿತರಣೆಯ ವಿಚಾರಣೆಗಳ ಮೂಲಕ LK Vegetables ತಾಜಾ ತರಕಾರಿಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    point1:"ಸುಲಭ ವಾಟ್ಸಾಪ್ ಆರ್ಡರ್", point2:"ಹೆಚ್ಚಿನ ಪ್ರಮಾಣದ ಆರ್ಡರ್ ವಿಚಾರಣೆ", point3:"ಲೋಹಿತ್ ಕುಮಾರ್ ಅವರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ",
    contactEyebrow:"ನಿಮ್ಮ ಆರ್ಡರ್ ಪ್ರಾರಂಭಿಸೋಣ", contactTitle:"ತಾಜಾ ತರಕಾರಿಗಳು ಬೇಕೇ?", contactText:"ಇಂದಿನ ಬೆಲೆಗಳು, ಹೆಚ್ಚಿನ ಪ್ರಮಾಣದ ಆರ್ಡರ್ ಮತ್ತು ವಿತರಣೆಯ ಲಭ್ಯತೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.", contactPerson:"ನಿಮ್ಮ ಸಂಪರ್ಕ", contactName:"ಲೋಹಿತ್ ಕುಮಾರ್", callLabel:"ಕರೆ ಮಾಡಿ", waLabel:"ವಾಟ್ಸಾಪ್ ಆರ್ಡರ್", chat:"ಚಾಟ್ ಮಾಡಿ", location:"ಹಾಸನ ಮತ್ತು ಚಿಕ್ಕಮಗಳೂರು, ಕರ್ನಾಟಕ",
    footerLine:"ಮನೆಗಳು, ಮಾರುಕಟ್ಟೆಗಳು ಮತ್ತು ಸಂಭ್ರಮಗಳಿಗೆ ತಾಜಾ ತರಕಾರಿಗಳು.", rights:"ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.", floating:"ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ", askPrices:"ಇಂದಿನ ಬೆಲೆ ಕೇಳಿ"
  },
  hi: {
    navProducts:"सब्ज़ियाँ", navServices:"हमारी सेवाएँ", navAbout:"हमारे बारे में", navContact:"संपर्क", language:"भाषा",
    badge:"ताज़ा • थोक • घर तक डिलीवरी", title:"ताज़ी सब्ज़ियाँ।", titleAccent:"खुशियों भरे आयोजन।",
    subtitle:"घर, शादी, गृह प्रवेश और हर खास मौके के लिए आपका भरोसेमंद सब्ज़ी आपूर्ति साथी।",
    order:"WhatsApp पर ऑर्डर करें", call:"हमें कॉल करें", wholesaleNote:"थोक और खुदरा पूछताछ का स्वागत है", browse:"सब्ज़ियाँ देखें",
    trust1:"घर तक डिलीवरी", trust1s:"अपने क्षेत्र के बारे में पूछें", trust2:"थोक और खुदरा", trust2s:"छोटे या बड़े ऑर्डर", trust3:"समारोह के लिए आपूर्ति", trust3s:"कार्यक्रम का ऑर्डर तय करें", trust4:"स्थानीय सेवा", trust4s:"हासन और चिक्कमगलुरु",
    market:"हमारी सब्ज़ियों का चयन", choose:"हर दिन के लिए", chooseAccent:"ताज़ी पसंद।", chooseSub:"अपनी ज़रूरत की सब्ज़ियाँ चुनें और सूची सीधे हमें भेजें।", search:"सब्ज़ी खोजें...",
    priceNote:"सब्ज़ियों के दाम रोज़ाना बाज़ार के अनुसार बदलते हैं।", priceBold:"आज के पक्के दाम जानने के लिए संदेश भेजें।",
    selected:"सब्ज़ियाँ चुनी गईं", selectionHint:"केवल सब्ज़ियाँ चुनें — किलो या मात्रा की ज़रूरत नहीं।", send:"चयन WhatsApp पर भेजें", empty:"कोई सब्ज़ी नहीं मिली। उपलब्धता के लिए संदेश भेजें।",
    servicesEyebrow:"आपके खास दिनों के लिए", servicesTitle:"बड़े उत्सव।", servicesAccent:"ताज़ी शुरुआत।",
    servicesText:"क्या आप शादी, गृह प्रवेश या पारिवारिक समारोह की योजना बना रहे हैं? कार्यक्रम की तारीख और सब्ज़ियों की ज़रूरत बताएँ। थोक ऑर्डर की योजना बनाने में हम मदद करेंगे।", functionOrder:"समारोह के ऑर्डर के लिए पूछें",
    wedding:"शादियाँ", weddingSub:"थोक में सब्ज़ियों की आपूर्ति", housewarming:"गृह प्रवेश", housewarmingSub:"गृह प्रवेश के ऑर्डर", functions:"सभी समारोह", functionsSub:"अपनी ज़रूरत बताएँ", homeOrders:"घर के ऑर्डर", homeOrdersSub:"डिलीवरी के बारे में पूछें",
    aboutEyebrow:"आपका स्थानीय संपर्क साथी", aboutTitle:"ताज़गी को बनाएँ", aboutAccent:"आसान।", aboutText:"LK Vegetables, हासन और चिक्कमगलुरु में परिवारों, कैटरर्स और कार्यक्रम आयोजकों को थोक, खुदरा और होम डिलीवरी पूछताछ के माध्यम से ताज़ी सब्ज़ियाँ उपलब्ध कराता है।",
    point1:"आसान WhatsApp ऑर्डर", point2:"थोक ऑर्डर की पूछताछ", point3:"लोहित कुमार से सीधा संपर्क",
    contactEyebrow:"अपना ऑर्डर शुरू करें", contactTitle:"ताज़ी सब्ज़ियाँ चाहिए?", contactText:"आज के दाम, थोक मात्रा और डिलीवरी की उपलब्धता के लिए संपर्क करें।", contactPerson:"आपका संपर्क", contactName:"लोहित कुमार", callLabel:"कॉल करें", waLabel:"WHATSAPP ऑर्डर", chat:"चैट करें", location:"हासन और चिक्कमगलुरु, कर्नाटक",
    footerLine:"घर, बाज़ार और समारोहों के लिए ताज़ी सब्ज़ियाँ।", rights:"सर्वाधिकार सुरक्षित।", floating:"WhatsApp पर चैट करें", askPrices:"आज के दाम पूछें"
  }
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];
  const filtered = useMemo(() => products.filter(p =>
    (category === "all" || p.category === category) &&
    [p.en, p.kn, p.hi].some(v => v.toLowerCase().includes(query.toLowerCase()))
  ), [category, query]);
  const label = p => lang === "kn" ? p.kn : lang === "hi" ? p.hi : p.en;
  const toggle = id => setSelected(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const sendOrder = () => {
    if (!selected.length) return;
    const list = selected.map(id => { const p = products.find(x => x.id === id); return `${p.en} / ${p.kn} / ${p.hi}`; }).join("\n");
    const intro = lang === "kn" ? "ನಮಸ್ಕಾರ LK Vegetables, ನನಗೆ ಈ ತರಕಾರಿಗಳು ಬೇಕು:" : lang === "hi" ? "नमस्ते LK Vegetables, मुझे ये सब्ज़ियाँ चाहिए:" : "Hello LK Vegetables, I would like these vegetables:";
    window.open(wa(`${intro}\n${list}`), "_blank", "noopener,noreferrer");
  };

  return <div className="site-shell">
    <div className="topbar"><span>⌖ &nbsp;{t.location}</span><span>{t.wholesaleNote}</span></div>
    <header className="header">
      <a className="brand" href="#home"><span className="brand-mark">LK</span><span><b>LK VEGETABLES</b><small>FRESHNESS YOU CAN TRUST</small></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "✕" : "☰"}</button>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <a href="#products" onClick={() => setMenuOpen(false)}>{t.navProducts}</a><a href="#services" onClick={() => setMenuOpen(false)}>{t.navServices}</a><a href="#about" onClick={() => setMenuOpen(false)}>{t.navAbout}</a><a href="#contact" onClick={() => setMenuOpen(false)}>{t.navContact}</a>
        <a className="nav-order" href={wa("Hello LK Vegetables! I would like to place an order.")} target="_blank" rel="noreferrer">◉ &nbsp;{t.order}</a>
      </nav>
      <label className="language">{t.language}<select value={lang} onChange={e => setLang(e.target.value)} aria-label="Choose language"><option value="en">English</option><option value="kn">ಕನ್ನಡ</option><option value="hi">हिन्दी</option></select></label>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> {t.badge}</div><h1>{t.title}<br/><em>{t.titleAccent}</em></h1><p className="hero-text">{t.subtitle}</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#products">{t.browse} <span>↗</span></a><a className="btn btn-light" href={wa("Hello LK Vegetables! Please share today's vegetable list and prices.")} target="_blank" rel="noreferrer">◉ {t.order}</a><a className="btn btn-light" href="tel:+919353567963">☎ {t.call}</a></div>
          <div className="hero-note">✓ &nbsp;{t.wholesaleNote}</div>
        </div>
        <div className="hero-art"><div className="art-glow"/><div className="art-card"><span className="art-tag">FRESH PICKS</span><div className="produce">🥬 🍅 🥕<br/>🧅 🥦 🫑</div><div className="art-caption"><b>Picked for freshness</b><small>Quality vegetables for your kitchen</small></div></div><span className="float float-one">🥕</span><span className="float float-two">🍅</span><span className="float float-three">🥬</span></div>
        <div className="hero-bottom"><span>01 / FRESHNESS FIRST</span><span>GOOD FOOD STARTS HERE ↓</span></div>
      </section>

      <section className="trust-strip"><div><span className="trust-icon">🚚</span><span><b>{t.trust1}</b><small>{t.trust1s}</small></span></div><div><span className="trust-icon">🧺</span><span><b>{t.trust2}</b><small>{t.trust2s}</small></span></div><div><span className="trust-icon">🎉</span><span><b>{t.trust3}</b><small>{t.trust3s}</small></span></div><div><span className="trust-icon">📍</span><span><b>{t.trust4}</b><small>{t.trust4s}</small></span></div></section>

      <section className="section products-section" id="products">
        <div className="section-heading"><div><span className="eyebrow">{t.market}</span><h2>{t.choose} <em>{t.chooseAccent}</em></h2><p>{t.chooseSub}</p></div><div className="search-box"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search}/></div></div>
        <div className="catalog-tools"><div className="tabs">{categories.map(c => <button className={category === c.id ? "active" : ""} onClick={() => setCategory(c.id)} key={c.id}>{c[lang]}</button>)}</div><div className="price-note">◷ &nbsp;{t.priceNote} <b>{t.priceBold}</b></div></div>
        <div className="product-grid">{filtered.map(p => <button type="button" className={`product-card selectable ${selected.includes(p.id) ? "chosen" : ""}`} key={p.id} onClick={() => toggle(p.id)} aria-pressed={selected.includes(p.id)}><div className="product-emoji">{p.emoji}</div><div className="product-info"><small>{categories.find(c => c.id === p.category)?.[lang] || "Fresh picks"}</small><h3>{label(p)}</h3><p>{lang === "en" ? p.kn : p.en}</p><div className="product-bottom"><b>{selected.includes(p.id) ? "✓ Selected" : "+ Select"}</b><span className="select-indicator">{selected.includes(p.id) ? "✓" : "+"}</span></div></div></button>)}</div>
        {filtered.length === 0 && <p className="empty">{t.empty}</p>}
        <div className="cart-bar"><div><b>{selected.length} {t.selected}</b><small>{t.selectionHint}</small><small>{selected.length ? selected.map(id => label(products.find(p => p.id === id))).join(" • ") : ""}</small></div><button className={`btn ${selected.length ? "btn-primary" : "btn-disabled"}`} disabled={!selected.length} onClick={sendOrder}>◉ &nbsp;{t.send}</button></div>
      </section>

      <section className="occasion-section" id="services"><div className="occasion-inner"><div><span className="eyebrow light">{t.servicesEyebrow}</span><h2>{t.servicesTitle}<br/><em>{t.servicesAccent}</em></h2><p>{t.servicesText}</p><a className="btn btn-white" href={wa("Hello LK Vegetables! I need vegetables for a function. Please contact me to discuss bulk quantities and prices.")} target="_blank" rel="noreferrer">{t.functionOrder} ↗</a></div><div className="occasion-cards"><div className="occasion-card"><span>💍</span><b>{t.wedding}</b><small>{t.weddingSub}</small></div><div className="occasion-card"><span>🏡</span><b>{t.housewarming}</b><small>{t.housewarmingSub}</small></div><div className="occasion-card"><span>🎉</span><b>{t.functions}</b><small>{t.functionsSub}</small></div><div className="occasion-card"><span>🛒</span><b>{t.homeOrders}</b><small>{t.homeOrdersSub}</small></div></div></div></section>

      <section className="section about-section" id="about"><div className="about-icon">🌿</div><div><span className="eyebrow">{t.aboutEyebrow}</span><h2>{t.aboutTitle} <em>{t.aboutAccent}</em></h2><p>{t.aboutText}</p><div className="about-points"><span>✓ &nbsp;{t.point1}</span><span>✓ &nbsp;{t.point2}</span><span>✓ &nbsp;{t.point3}</span></div></div></section>

      <section className="contact-section" id="contact"><div><span className="eyebrow light">{t.contactEyebrow}</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><p className="contact-location">📍 {t.location}</p></div><div className="contact-card"><div className="contact-person"><div className="avatar">LK</div><div><small>{t.contactPerson}</small><b>{t.contactName}</b><span>LK Vegetables</span></div></div><a className="contact-line" href="tel:+919353567963"><span>☎</span><span><small>{t.callLabel}</small><b>93535 67963</b></span><span className="line-arrow">↗</span></a><a className="contact-line" href={wa("Hello LK Vegetables! I would like to order vegetables.")} target="_blank" rel="noreferrer"><span>◉</span><span><small>{t.waLabel}</small><b>{t.chat}</b></span><span className="line-arrow">↗</span></a></div></section>
    </main>

    <footer><a className="brand footer-brand" href="#home"><span className="brand-mark">LK</span><span><b>LK VEGETABLES</b><small>FRESHNESS YOU CAN TRUST</small></span></a><p>{t.footerLine}</p><small>© {new Date().getFullYear()} LK Vegetables. {t.rights}</small><a className="footer-wa" href={wa("Hello LK Vegetables!")} target="_blank" rel="noreferrer">◉ &nbsp;{t.order}</a></footer>
    <a className="floating-wa" href={wa("Hello LK Vegetables! I would like to place an order.")} target="_blank" rel="noreferrer" aria-label={t.floating}>◉</a>
  </div>;
}
