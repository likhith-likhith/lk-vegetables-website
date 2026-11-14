import React, { useEffect, useMemo, useRef, useState } from "react";
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
    selected:"items selected", selectionHint:"Enter KG for regular vegetables and bunches for leafy vegetables.", send:"Send order on WhatsApp", empty:"No matching vegetables. Message us for availability.",
    kg:"KG", bunch:"Bunch", customTitle:"Add another vegetable", customName:"Vegetable name", customNamePlaceholder:"Enter vegetable name", customKg:"Quantity", customUnitKg:"KG", customUnitBunch:"Bunch", addCustom:"Add to order", customRemove:"Remove", tapSelect:"Tap anywhere to select", selectedStatus:"Selected · enter quantity", customRequired:"Enter a vegetable name and a quantity greater than 0.", orderSummary:"Your order",
    servicesEyebrow:"FOR YOUR SPECIAL DAYS", servicesTitle:"Big celebrations.", servicesAccent:"Fresh beginnings.",
    servicesText:"Planning a wedding feast, housewarming or family function? Tell us your event date and vegetable requirements. We’ll help you plan a bulk order.", functionOrder:"Enquire for function orders",
    wedding:"Weddings", weddingSub:"Bulk vegetable supply", housewarming:"Housewarmings", housewarmingSub:"Gruha Pravesha orders", functions:"All functions", functionsSub:"Plan your requirements", homeOrders:"Home orders", homeOrdersSub:"Ask about delivery",
    aboutEyebrow:"A LOCAL PARTNER YOU CAN CONTACT", aboutTitle:"Freshness made", aboutAccent:"simple.", aboutText:"LK Vegetables helps households, caterers and event organisers source fresh vegetables through wholesale, retail and home-delivery enquiries in Chikkamagaluru and Hassan.",
    point1:"Easy WhatsApp ordering", point2:"Bulk order enquiries", point3:"Direct contact with Lohith Kumar",
    contactEyebrow:"LET'S GET YOUR ORDER STARTED", contactTitle:"Need fresh vegetables?", contactText:"Contact us for today's prices, bulk quantities and delivery availability.", contactPerson:"YOUR CONTACT", contactName:"Lohith Kumar", callLabel:"CALL US", waLabel:"WHATSAPP ORDERS", chat:"Chat with us", location:"Chikkamagaluru & Hassan, Karnataka",
    footerLine:"Fresh vegetables for homes, markets and celebrations.", rights:"All rights reserved.", floating:"Chat on WhatsApp", askPrices:"Ask for today's prices"
  },
  kn: {
    navProducts:"ತರಕಾರಿಗಳು", navServices:"ನಮ್ಮ ಸೇವೆಗಳು", navAbout:"ನಮ್ಮ ಬಗ್ಗೆ", navContact:"ಸಂಪರ್ಕ", language:"ಭಾಷೆ",
    badge:"ತಾಜಾ • ಸಗಟು • ಮನೆಗೆ ವಿತರಣೆ", title:"ತಾಜಾ ತರಕಾರಿಗಳು.", titleAccent:"ಸಂತೋಷದ ಸಮಾರಂಭಗಳು.",
    subtitle:"ಮನೆಗಳು, ಮದುವೆಗಳು, ಗೃಹಪ್ರವೇಶಗಳು ಮತ್ತು ಪ್ರತಿಯೊಂದು ವಿಶೇಷ ಸಂದರ್ಭಕ್ಕೂ ನಿಮ್ಮ ನಂಬಿಕೆಯ ತರಕಾರಿ ಪೂರೈಕೆದಾರರು.",
    order:"ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ", call:"ನಮಗೆ ಕರೆ ಮಾಡಿ", wholesaleNote:"ಸಗಟು ಮತ್ತು ಚಿಲ್ಲರೆ ವಿಚಾರಣೆಗಳಿಗೆ ಸ್ವಾಗತ", browse:"ತರಕಾರಿಗಳನ್ನು ನೋಡಿ",
    trust1:"ಮನೆಗೆ ವಿತರಣೆ", trust1s:"ನಿಮ್ಮ ಪ್ರದೇಶದ ಬಗ್ಗೆ ಕೇಳಿ", trust2:"ಸಗಟು ಮತ್ತು ಚಿಲ್ಲರೆ", trust2s:"ಕಡಿಮೆ ಅಥವಾ ಹೆಚ್ಚಿನ ಆರ್ಡರ್", trust3:"ಸಮಾರಂಭಗಳಿಗೆ ಪೂರೈಕೆ", trust3s:"ನಿಮ್ಮ ಕಾರ್ಯಕ್ರಮದ ಆರ್ಡರ್", trust4:"ಸ್ಥಳೀಯ ಸೇವೆ", trust4s:"ಚಿಕ್ಕಮಗಳೂರು ಮತ್ತು ಹಾಸನ",
    market:"ನಮ್ಮ ತರಕಾರಿ ಆಯ್ಕೆ", choose:"ಪ್ರತಿದಿನಕ್ಕೂ", chooseAccent:"ತಾಜಾ ತರಕಾರಿಗಳು.", chooseSub:"ನಿಮಗೆ ಬೇಕಾದ ತರಕಾರಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ ಪಟ್ಟಿಯನ್ನು ನೇರವಾಗಿ ನಮಗೆ ಕಳುಹಿಸಿ.", search:"ತರಕಾರಿ ಹುಡುಕಿ...",
    priceNote:"ತರಕಾರಿಗಳ ಬೆಲೆಗಳು ದೈನಂದಿನ ಮಾರುಕಟ್ಟೆಯಂತೆ ಬದಲಾಗುತ್ತವೆ.", priceBold:"ಇಂದಿನ ಖಚಿತ ಬೆಲೆಗಾಗಿ ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ.",
    selected:"ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ", selectionHint:"ಸಾಮಾನ್ಯ ತರಕಾರಿಗಳಿಗೆ ಕೆ.ಜಿ. ಮತ್ತು ಸೊಪ್ಪುಗಳಿಗೆ ಕಟ್ಟುಗಳಲ್ಲಿ ಪ್ರಮಾಣ ನಮೂದಿಸಿ.", send:"ಆರ್ಡರ್ ಅನ್ನು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕಳುಹಿಸಿ", empty:"ತರಕಾರಿ ಸಿಗಲಿಲ್ಲ. ಲಭ್ಯತೆಗಾಗಿ ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ.",
    kg:"ಕೆ.ಜಿ.", bunch:"ಕಟ್ಟು", customTitle:"ಇನ್ನೊಂದು ತರಕಾರಿ ಸೇರಿಸಿ", customName:"ತರಕಾರಿ ಹೆಸರು", customNamePlaceholder:"ತರಕಾರಿ ಹೆಸರನ್ನು ನಮೂದಿಸಿ", customKg:"ಪ್ರಮಾಣ", customUnitKg:"ಕೆ.ಜಿ.", customUnitBunch:"ಕಟ್ಟು", addCustom:"ಆರ್ಡರ್‌ಗೆ ಸೇರಿಸಿ", customRemove:"ತೆಗೆದುಹಾಕಿ", tapSelect:"ಆಯ್ಕೆ ಮಾಡಲು ತರಕಾರಿಯನ್ನು ಎಲ್ಲಿಯಾದರೂ ಒತ್ತಿರಿ", selectedStatus:"ಆಯ್ಕೆಯಾಗಿದೆ · ಪ್ರಮಾಣ ನಮೂದಿಸಿ", customRequired:"ತರಕಾರಿ ಹೆಸರು ಮತ್ತು 0 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಪ್ರಮಾಣವನ್ನು ನಮೂದಿಸಿ.", orderSummary:"ನಿಮ್ಮ ಆರ್ಡರ್",
    servicesEyebrow:"ನಿಮ್ಮ ವಿಶೇಷ ದಿನಗಳಿಗಾಗಿ", servicesTitle:"ದೊಡ್ಡ ಸಂಭ್ರಮಗಳು.", servicesAccent:"ತಾಜಾ ಆರಂಭಗಳು.",
    servicesText:"ಮದುವೆ, ಗೃಹಪ್ರವೇಶ ಅಥವಾ ಕುಟುಂಬ ಸಮಾರಂಭವನ್ನು ಯೋಜಿಸುತ್ತಿದ್ದೀರಾ? ಕಾರ್ಯಕ್ರಮದ ದಿನಾಂಕ ಮತ್ತು ತರಕಾರಿ ಅಗತ್ಯಗಳನ್ನು ತಿಳಿಸಿ. ಹೆಚ್ಚಿನ ಪ್ರಮಾಣದ ಆರ್ಡರ್ ಯೋಜಿಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.", functionOrder:"ಸಮಾರಂಭದ ಆರ್ಡರ್‌ಗಾಗಿ ವಿಚಾರಿಸಿ",
    wedding:"ಮದುವೆಗಳು", weddingSub:"ಹೆಚ್ಚಿನ ಪ್ರಮಾಣದ ತರಕಾರಿ ಪೂರೈಕೆ", housewarming:"ಗೃಹಪ್ರವೇಶ", housewarmingSub:"ಗೃಹಪ್ರವೇಶದ ಆರ್ಡರ್‌ಗಳು", functions:"ಎಲ್ಲಾ ಸಮಾರಂಭಗಳು", functionsSub:"ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ಯೋಜಿಸಿ", homeOrders:"ಮನೆಗೆ ಆರ್ಡರ್", homeOrdersSub:"ವಿತರಣೆಯ ಬಗ್ಗೆ ವಿಚಾರಿಸಿ",
    aboutEyebrow:"ನೀವು ಸಂಪರ್ಕಿಸಬಹುದಾದ ಸ್ಥಳೀಯ ಪಾಲುದಾರರು", aboutTitle:"ತಾಜಾತನವನ್ನು", aboutAccent:"ಸರಳಗೊಳಿಸಿ.", aboutText:"ಚಿಕ್ಕಮಗಳೂರು ಮತ್ತು ಹಾಸನ ಪ್ರದೇಶದ ಮನೆಗಳು, ಅಡುಗೆದಾರರು ಮತ್ತು ಕಾರ್ಯಕ್ರಮ ಆಯೋಜಕರಿಗೆ ಸಗಟು, ಚಿಲ್ಲರೆ ಮತ್ತು ಮನೆ ವಿತರಣೆಯ ವಿಚಾರಣೆಗಳ ಮೂಲಕ LK Vegetables ತಾಜಾ ತರಕಾರಿಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    point1:"ಸುಲಭ ವಾಟ್ಸಾಪ್ ಆರ್ಡರ್", point2:"ಹೆಚ್ಚಿನ ಪ್ರಮಾಣದ ಆರ್ಡರ್ ವಿಚಾರಣೆ", point3:"ಲೋಹಿತ್ ಕುಮಾರ್ ಅವರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ",
    contactEyebrow:"ನಿಮ್ಮ ಆರ್ಡರ್ ಪ್ರಾರಂಭಿಸೋಣ", contactTitle:"ತಾಜಾ ತರಕಾರಿಗಳು ಬೇಕೇ?", contactText:"ಇಂದಿನ ಬೆಲೆಗಳು, ಹೆಚ್ಚಿನ ಪ್ರಮಾಣದ ಆರ್ಡರ್ ಮತ್ತು ವಿತರಣೆಯ ಲಭ್ಯತೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.", contactPerson:"ನಿಮ್ಮ ಸಂಪರ್ಕ", contactName:"ಲೋಹಿತ್ ಕುಮಾರ್", callLabel:"ಕರೆ ಮಾಡಿ", waLabel:"ವಾಟ್ಸಾಪ್ ಆರ್ಡರ್", chat:"ಚಾಟ್ ಮಾಡಿ", location:"ಚಿಕ್ಕಮಗಳೂರು ಮತ್ತು ಹಾಸನ, ಕರ್ನಾಟಕ",
    footerLine:"ಮನೆಗಳು, ಮಾರುಕಟ್ಟೆಗಳು ಮತ್ತು ಸಂಭ್ರಮಗಳಿಗೆ ತಾಜಾ ತರಕಾರಿಗಳು.", rights:"ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.", floating:"ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ", askPrices:"ಇಂದಿನ ಬೆಲೆ ಕೇಳಿ"
  },
  hi: {
    navProducts:"सब्ज़ियाँ", navServices:"हमारी सेवाएँ", navAbout:"हमारे बारे में", navContact:"संपर्क", language:"भाषा",
    badge:"ताज़ा • थोक • घर तक डिलीवरी", title:"ताज़ी सब्ज़ियाँ।", titleAccent:"खुशियों भरे आयोजन।",
    subtitle:"घर, शादी, गृह प्रवेश और हर खास मौके के लिए आपका भरोसेमंद सब्ज़ी आपूर्ति साथी।",
    order:"WhatsApp पर ऑर्डर करें", call:"हमें कॉल करें", wholesaleNote:"थोक और खुदरा पूछताछ का स्वागत है", browse:"सब्ज़ियाँ देखें",
    trust1:"घर तक डिलीवरी", trust1s:"अपने क्षेत्र के बारे में पूछें", trust2:"थोक और खुदरा", trust2s:"छोटे या बड़े ऑर्डर", trust3:"समारोह के लिए आपूर्ति", trust3s:"कार्यक्रम का ऑर्डर तय करें", trust4:"स्थानीय सेवा", trust4s:"चिक्कमगलुरु और हासन",
    market:"हमारी सब्ज़ियों का चयन", choose:"हर दिन के लिए", chooseAccent:"ताज़ी पसंद।", chooseSub:"अपनी ज़रूरत की सब्ज़ियाँ चुनें और सूची सीधे हमें भेजें।", search:"सब्ज़ी खोजें...",
    priceNote:"सब्ज़ियों के दाम रोज़ाना बाज़ार के अनुसार बदलते हैं।", priceBold:"आज के पक्के दाम जानने के लिए संदेश भेजें।",
    selected:"आइटम चुने गए", selectionHint:"सामान्य सब्ज़ियों के लिए KG और पत्तेदार सब्ज़ियों के लिए गड्डी की संख्या दर्ज करें।", send:"ऑर्डर WhatsApp पर भेजें", empty:"कोई सब्ज़ी नहीं मिली। उपलब्धता के लिए संदेश भेजें।",
    kg:"KG", bunch:"गड्डी", customTitle:"एक और सब्ज़ी जोड़ें", customName:"सब्ज़ी का नाम", customNamePlaceholder:"सब्ज़ी का नाम लिखें", customKg:"मात्रा", customUnitKg:"KG", customUnitBunch:"गड्डी", addCustom:"ऑर्डर में जोड़ें", customRemove:"हटाएँ", tapSelect:"चुनने के लिए सब्ज़ी पर कहीं भी टैप करें", selectedStatus:"चुना गया · मात्रा दर्ज करें", customRequired:"सब्ज़ी का नाम और 0 से अधिक मात्रा दर्ज करें।", orderSummary:"आपका ऑर्डर",
    servicesEyebrow:"आपके खास दिनों के लिए", servicesTitle:"बड़े उत्सव।", servicesAccent:"ताज़ी शुरुआत।",
    servicesText:"क्या आप शादी, गृह प्रवेश या पारिवारिक समारोह की योजना बना रहे हैं? कार्यक्रम की तारीख और सब्ज़ियों की ज़रूरत बताएँ। थोक ऑर्डर की योजना बनाने में हम मदद करेंगे।", functionOrder:"समारोह के ऑर्डर के लिए पूछें",
    wedding:"शादियाँ", weddingSub:"थोक में सब्ज़ियों की आपूर्ति", housewarming:"गृह प्रवेश", housewarmingSub:"गृह प्रवेश के ऑर्डर", functions:"सभी समारोह", functionsSub:"अपनी ज़रूरत बताएँ", homeOrders:"घर के ऑर्डर", homeOrdersSub:"डिलीवरी के बारे में पूछें",
    aboutEyebrow:"आपका स्थानीय संपर्क साथी", aboutTitle:"ताज़गी को बनाएँ", aboutAccent:"आसान।", aboutText:"LK Vegetables, चिक्कमगलुरु और हासन में परिवारों, कैटरर्स और कार्यक्रम आयोजकों को थोक, खुदरा और होम डिलीवरी पूछताछ के माध्यम से ताज़ी सब्ज़ियाँ उपलब्ध कराता है।",
    point1:"आसान WhatsApp ऑर्डर", point2:"थोक ऑर्डर की पूछताछ", point3:"लोहित कुमार से सीधा संपर्क",
    contactEyebrow:"अपना ऑर्डर शुरू करें", contactTitle:"ताज़ी सब्ज़ियाँ चाहिए?", contactText:"आज के दाम, थोक मात्रा और डिलीवरी की उपलब्धता के लिए संपर्क करें।", contactPerson:"आपका संपर्क", contactName:"लोहित कुमार", callLabel:"कॉल करें", waLabel:"WHATSAPP ऑर्डर", chat:"चैट करें", location:"चिक्कमगलुरु और हासन, कर्नाटक",
    footerLine:"घर, बाज़ार और समारोहों के लिए ताज़ी सब्ज़ियाँ।", rights:"सर्वाधिकार सुरक्षित।", floating:"WhatsApp पर चैट करें", askPrices:"आज के दाम पूछें"
  }
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({});
  // Keep a reference to each quantity box so it can receive focus after selection.
  const quantityRefs = useRef({});
  const [focusVegetableId, setFocusVegetableId] = useState(null);
  const [customName, setCustomName] = useState("");
  const [customKg, setCustomKg] = useState("1");
  const [customUnit, setCustomUnit] = useState("kg");
  const [customItems, setCustomItems] = useState([]);
  const [customError, setCustomError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];
  const filtered = useMemo(() => products.filter(p =>
    (category === "all" || p.category === category) &&
    [p.en, p.kn, p.hi].some(v => v.toLowerCase().includes(query.toLowerCase()))
  ), [category, query]);
  const label = p => lang === "kn" ? p.kn : lang === "hi" ? p.hi : p.en;
  const unitFor = p => p.category === "leafy" ? t.bunch : t.kg;
  const unitCodeFor = p => p.category === "leafy" ? "Bunch" : "KG";
  const toggle = id => {
    if (selected[id] !== undefined) {
      setSelected(old => {
        const next = { ...old };
        delete next[id];
        return next;
      });
      setFocusVegetableId(null);
    } else {
      // Start with 1 so the quantity field is ready; selecting it lets typing replace it.
      setSelected(old => ({ ...old, [id]: "1" }));
      setFocusVegetableId(id);
    }
  };

  // After the selected vegetable's quantity input appears, focus and select its value.
  useEffect(() => {
    if (focusVegetableId === null || selected[focusVegetableId] === undefined) return;

    const frame = window.requestAnimationFrame(() => {
      const input = quantityRefs.current[focusVegetableId];
      if (input) {
        input.focus();
        input.select();
      }
      setFocusVegetableId(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusVegetableId, selected]);

  const updateKg = (id, value) => setSelected(old => ({ ...old, [id]: value }));
  const addCustom = () => {
    const name = customName.trim();
    const amount = Number(customKg);
    if (!name || !Number.isFinite(amount) || amount <= 0) { setCustomError(t.customRequired); return; }
    setCustomItems(old => [...old, { id: Date.now() + Math.random(), name, kg: String(customKg), unit: customUnit }]);
    setCustomName(""); setCustomKg("1"); setCustomUnit("kg"); setCustomError("");
  };
  const sendOrder = () => {
    const selectedIds = Object.keys(selected);
    if (!selectedIds.length && !customItems.length) return;
    if (selectedIds.some(id => !Number.isFinite(Number(selected[id])) || Number(selected[id]) <= 0)) {
      alert("Please enter a quantity greater than 0 for every selected item.");
      return;
    }
    const list = selectedIds.map(id => {
      const p = products.find(x => x.id === id);
      return `• ${p.en} / ${p.kn} / ${p.hi} — ${selected[id]} ${unitCodeFor(p)}`;
    }).concat(customItems.map(item => `• ${item.name} — ${item.kg} ${item.unit === "bunch" ? "Bunch" : "KG"}`)).join("\n");
    const intro = lang === "kn" ? "ನಮಸ್ಕಾರ LK Vegetables, ನನಗೆ ಈ ತರಕಾರಿಗಳು ಬೇಕು:" : lang === "hi" ? "नमस्ते LK Vegetables, मुझे ये सब्ज़ियाँ चाहिए:" : "Hello LK Vegetables, I would like to order these vegetables:";
    window.open(wa(`${intro}\n\n${list}\n\nPlease confirm availability and today's prices.`), "_blank", "noopener,noreferrer");
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
        <div className="product-grid">{filtered.map(p => {
          const isSelected = selected[p.id] !== undefined;
          return <div
            className={`product-card selectable ${isSelected ? "chosen" : ""}`}
            key={p.id}
            role="group"
            tabIndex={0}
            aria-label={`${label(p)}. ${isSelected ? t.selectedStatus : t.tapSelect}`}
            onClick={e => {
              // Tapping the card selects it; tapping the quantity field only edits the number.
              if (e.target.closest("input, label, button, select, a")) return;
              toggle(p.id);
            }}
            onKeyDown={e => {
              if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                toggle(p.id);
              }
            }}
          >
            <div className="product-emoji">{p.emoji}</div>
            <div className="product-info"><small>{categories.find(c => c.id === p.category)?.[lang] || "Fresh picks"}</small><h3>{label(p)}</h3><p>{lang === "en" ? p.kn : p.en}</p>
              <div className="product-bottom"><span className="selection-hint">{isSelected ? `✓ ${t.selectedStatus}` : t.tapSelect}</span><span className="select-indicator">{isSelected ? "✓" : "○"}</span></div>
              {isSelected && <label className="kg-control" onClick={e => e.stopPropagation()}><span>{unitFor(p)}</span><input
                ref={element => { quantityRefs.current[p.id] = element; }}
                type="number"
                inputMode="decimal"
                min="0.1"
                step={p.category === "leafy" ? "1" : "0.5"}
                value={selected[p.id]}
                onChange={e => updateKg(p.id, e.target.value)}
                onClick={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
                aria-label={`${label(p)} quantity in ${unitFor(p)}`}
              /></label>}
            </div>
          </div>;
        })}</div>
        {filtered.length === 0 && <p className="empty">{t.empty}</p>}
        <div className="custom-order"><h3>{t.customTitle}</h3><div className="custom-fields"><label><span>{t.customName}</span><input value={customName} onChange={e => setCustomName(e.target.value)} placeholder={t.customNamePlaceholder}/></label><label><span>{t.customKg}</span><input type="number" min="0.1" step={customUnit === "bunch" ? "1" : "0.5"} value={customKg} onChange={e => setCustomKg(e.target.value)}/></label><label><span>{t.customTitle}</span><select className="custom-unit-select" value={customUnit} onChange={e => setCustomUnit(e.target.value)}><option value="kg">{t.customUnitKg}</option><option value="bunch">{t.customUnitBunch}</option></select></label><button type="button" className="btn btn-primary" onClick={addCustom}>+ {t.addCustom}</button></div>{customError && <p className="custom-error">{customError}</p>}{customItems.length > 0 && <div className="custom-list">{customItems.map(item => <div key={item.id}><span>{item.name} — {item.kg} {item.unit === "bunch" ? t.bunch : t.kg}</span><button type="button" onClick={() => setCustomItems(old => old.filter(x => x.id !== item.id))}>{t.customRemove}</button></div>)}</div>}</div>
        <div className="cart-bar"><div><b>{Object.keys(selected).length + customItems.length} {t.selected}</b><small>{t.selectionHint}</small><small>{Object.keys(selected).length + customItems.length ? [...Object.keys(selected).map(id => `${label(products.find(p => p.id === id))} (${selected[id]} ${unitFor(products.find(p => p.id === id))})`), ...customItems.map(item => `${item.name} (${item.kg} ${item.unit === "bunch" ? t.bunch : t.kg})`)].join(" • ") : ""}</small></div><button className={`btn ${Object.keys(selected).length || customItems.length ? "btn-primary" : "btn-disabled"}`} disabled={!Object.keys(selected).length && !customItems.length} onClick={sendOrder}>◉ &nbsp;{t.send}</button></div>
      </section>

      <section className="occasion-section" id="services"><div className="occasion-inner"><div><span className="eyebrow light">{t.servicesEyebrow}</span><h2>{t.servicesTitle}<br/><em>{t.servicesAccent}</em></h2><p>{t.servicesText}</p><a className="btn btn-white" href={wa("Hello LK Vegetables! I need vegetables for a function. Please contact me to discuss bulk quantities and prices.")} target="_blank" rel="noreferrer">{t.functionOrder} ↗</a></div><div className="occasion-cards"><div className="occasion-card"><span>💍</span><b>{t.wedding}</b><small>{t.weddingSub}</small></div><div className="occasion-card"><span>🏡</span><b>{t.housewarming}</b><small>{t.housewarmingSub}</small></div><div className="occasion-card"><span>🎉</span><b>{t.functions}</b><small>{t.functionsSub}</small></div><div className="occasion-card"><span>🛒</span><b>{t.homeOrders}</b><small>{t.homeOrdersSub}</small></div></div></div></section>

      <section className="section about-section" id="about"><div className="about-icon">🌿</div><div><span className="eyebrow">{t.aboutEyebrow}</span><h2>{t.aboutTitle} <em>{t.aboutAccent}</em></h2><p>{t.aboutText}</p><div className="about-points"><span>✓ &nbsp;{t.point1}</span><span>✓ &nbsp;{t.point2}</span><span>✓ &nbsp;{t.point3}</span></div></div></section>

      <section className="contact-section" id="contact"><div><span className="eyebrow light">{t.contactEyebrow}</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><p className="contact-location">📍 {t.location}</p></div><div className="contact-card"><div className="contact-person"><div className="avatar">LK</div><div><small>{t.contactPerson}</small><b>{t.contactName}</b><span>LK Vegetables</span></div></div><a className="contact-line" href="tel:+919353567963"><span>☎</span><span><small>{t.callLabel}</small><b>93535 67963</b></span><span className="line-arrow">↗</span></a><a className="contact-line" href={wa("Hello LK Vegetables! I would like to order vegetables.")} target="_blank" rel="noreferrer"><span>◉</span><span><small>{t.waLabel}</small><b>{t.chat}</b></span><span className="line-arrow">↗</span></a></div></section>
    </main>

    <footer><a className="brand footer-brand" href="#home"><span className="brand-mark">LK</span><span><b>LK VEGETABLES</b><small>FRESHNESS YOU CAN TRUST</small></span></a><p>{t.footerLine}</p><small>© {new Date().getFullYear()} LK Vegetables. {t.rights}</small><a className="footer-wa" href={wa("Hello LK Vegetables!")} target="_blank" rel="noreferrer">◉ &nbsp;{t.order}</a></footer>
    <a className="floating-wa" href={wa("Hello LK Vegetables! I would like to place an order.")} target="_blank" rel="noreferrer" aria-label={t.floating}>◉</a>
  </div>;
}
