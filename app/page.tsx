"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { rollItems, rollCategories } from "@/data/rollItems";
import { ShoppingCart, Menu, Phone, Navigation, X } from "lucide-react";

export default function RollPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(rollCategories[0]);
  const [cart, setCart] = useState<{ [id: number]: number }>({});
  const [showCartModal, setShowCartModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id]--;
      else delete updated[id];
      return updated;
    });
  };

  const filtered = rollItems.filter(
    (item) => item.category === selectedCategory
  );

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const item = rollItems.find((i) => i.id === Number(id));
      return item ? { ...item, quantity: qty } : null;
    })
    .filter(Boolean) as Array<
    (typeof rollItems)[number] & { quantity: number }
  >;

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handleSendOrder = () => {
    if (!name || !phone) return alert("Введите имя и номер телефона");
    if (cartItems.length === 0) return alert("Корзина пуста");
    const lines = cartItems.map(
      (i) =>
        `• ${i.title} × ${i.quantity} = ${
          Number(i.price) * Number(i.quantity)
        } ₽`
    );
    const msg = `🏩 Новый заказ:
Имя: ${name}
Телефон: ${phone}
Тип: ${deliveryType === "pickup" ? "Самовывоз" : "Доставка"}
${deliveryType === "delivery" ? `Адрес: ${address}` : ""}
${comment ? `Комментарий: ${comment}` : ""}

${lines.join("\n")}

ИТОГО: ${total} ₽`;

    const whatsappNumber = "+79180220228";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(url, "_blank");
    setShowOrderModal(false);
  };

  return (
    <div className="bg-[#fdfaf5] text-[#1a1a1a] min-h-screen pb-28">
      {/* 🧢 Шапка */}
      <div className="w-full bg-[#fdfaf5] text-[#5c2c1b] flex flex-col items-center py-10 border-b border-[#8B4513]/30">
        <div className="border-2 border-[#5c2c1b] px-6 py-4 text-center mb-4">
          <h1 className="text-4xl font-bold tracking-widest">МЯТА-ROLL</h1>
          <div className="h-[1px] bg-[#5c2c1b] my-2"></div>
          <p className="uppercase tracking-wider text-md font-medium">
            СУШИ • РОЛЛЫ • БОЛЛЫ
          </p>
        </div>
        <h2 className="text-3xl font-light tracking-widest mt-4">М Е Н Ю</h2>
        <p className="mt-1 text-sm text-[#8B4513]">EST 2025</p>
      </div>

      {/* 📢 Акции */}
      <div className="bg-[#fff7e8] text-[#8B4513] py-4 px-6 text-sm space-y-2 border-b border-[#e0c7a1]">
        <p className="font-bold text-lg drop-shadow-md">
          🚚 Бесплатная доставка от 1500 ₽
        </p>
        <p className="font-bold text-lg drop-shadow-md">
          🎂 Скидка 10% в день рождения (по паспорту, действует 3 дня после дня
          рождения)
        </p>
        <p className="font-bold text-lg drop-shadow-md">
          ⏰ Счастливые часы: -10% с 12:00 до 16:00 при самовывозе
        </p>
        <p className="text-xs italic">* Акции не суммируются</p>
      </div>

      {/* 📱 Боковая навигация */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute top-0 left-0 w-3/4 h-full bg-[#fdfaf5] p-6 flex flex-col gap-3 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#8B4513]">Категории</h2>
              <button onClick={() => setShowSidebar(false)}>
                <X className="text-[#8B4513]" />
              </button>
            </div>
            {rollCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowSidebar(false);
                }}
                className={`text-left py-2 px-3 rounded-lg font-medium ${
                  selectedCategory === cat
                    ? "bg-[#8B4513] text-white"
                    : "text-[#8B4513] hover:bg-[#eee0c6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🍣 Меню */}
      <main className="px-4 py-10">
        <h1 className="text-2xl font-bold text-[#8B4513] mb-6 text-center">
          Меню | {selectedCategory}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-[#e8dfd3] rounded-xl p-4 text-center shadow"
            >
              <Image
                src={item.image} // Например: "/images/rolls/philadelphia.webp"
                alt={item.title}
                width={400}
                height={160}
                className="rounded-lg mb-4 w-full h-40 object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <h3 className="text-lg font-bold text-[#8B4513]">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{item.description}</p>
              <p className="text-md font-semibold text-[#8B4513]">
                {item.price}₽
              </p>
              <div className="flex justify-center items-center gap-2 mt-3">
                {cart[item.id] ? (
                  <>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1 bg-[#F5F5DC] text-[#CD7F32] rounded shadow-md hover:bg-[#F8F8F0] hover:text-[#B8860B]"
                    >
                      −
                    </button>
                    <span>{cart[item.id]}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-3 py-1 bg-[#F5F5DC] text-[#CD7F32] rounded shadow-md hover:bg-[#F8F8F0] hover:text-[#B8860B]"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => addToCart(item.id)}
                    className="px-4 py-2 bg-[#8B4513] text-white rounded-xl"
                  >
                    Добавить
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* 🧾 Модалка корзины */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold mb-2 text-[#8B4513]">Корзина</h2>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-sm py-1"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-0.5 bg-red-500 text-white rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="px-2 py-0.5 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <p className="mt-4 text-lg font-bold text-[#8B4513]">
              Итого: {total}₽
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCartModal(false)}
                className="px-4 py-2 text-gray-600"
              >
                Назад
              </button>
              <button
                onClick={() => {
                  setShowCartModal(false);
                  setShowOrderModal(true);
                }}
                className="px-4 py-2 bg-[#8B4513] text-white rounded"
              >
                Перейти к оформлению
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧾 Модалка оформления */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold mb-2 text-[#8B4513]">
              Оформление заказа
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Телефон"
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex items-center gap-4">
              <label>
                <input
                  type="radio"
                  value="pickup"
                  checked={deliveryType === "pickup"}
                  onChange={() => setDeliveryType("pickup")}
                />{" "}
                Самовывоз
              </label>
              <label>
                <input
                  type="radio"
                  value="delivery"
                  checked={deliveryType === "delivery"}
                  onChange={() => setDeliveryType("delivery")}
                />{" "}
                Доставка
              </label>
            </div>
            {deliveryType === "delivery" && (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Адрес доставки"
                className="w-full p-2 border rounded mb-2"
              />
            )}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Комментарий к заказу"
              className="w-full p-2 border rounded mb-2"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowOrderModal(false)}
                className="px-4 py-2 text-gray-600"
              >
                Отмена
              </button>
              <button
                onClick={handleSendOrder}
                className="px-4 py-2 bg-[#8B4513] text-white rounded"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📞 О нас */}
      <footer className="bg-[#fdfaf5] text-[#8B4513] text-center text-sm py-6 border-t border-[#e0c7a1] mt-10">
        <div className="space-y-2">
          <p>
            📞{" "}
            <a href="tel:+79180220228" className="underline">
              +7 918 022 02 28
            </a>
          </p>
          <p>
            📸{" "}
            <a
              href="https://www.instagram.com/myata_roll/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Instagram
            </a>
          </p>
          <p>
            💬{" "}
            <a
              href="https://wa.me/79180220228"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              WhatsApp
            </a>
          </p>
          <p className="text-sm text-[#5c2c1b]">
            🕒 Работаем ежедневно с 11:00 до 23:00
          </p>
          <p className="mt-2">© Все права защищены</p>
          <p className="text-xs">
            Разработка by{" "}
            <a href="https://t.me/NoNO2332" className="underline">
              @NoNO2332
            </a>
          </p>
        </div>
      </footer>

      {/* 📱 Нижняя навигация */}
      <div className="fixed bottom-0 left-0 w-full bg-[#fdfaf5] text-[#8B4513] flex justify-around items-center h-16 z-40 md:hidden border-t border-[#8B4513]/20">
        <button
          className="flex flex-col items-center text-xs"
          onClick={() => setShowSidebar(true)}
        >
          <Menu className="w-5 h-5" />
          Меню
        </button>
        <button
          className="flex flex-col items-center text-xs"
          onClick={() => setShowCartModal(true)}
        >
          <ShoppingCart className="w-5 h-5" />
          Корзина
        </button>
        <a
          href="https://yandex.ru/maps/10991/goryachiy-kluch/?ll=39.119584%2C44.635181&mode=poi&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D176681529106&z=19"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-xs"
        >
          <Navigation className="w-5 h-5" />
          Как проехать
        </a>
        <a
          href="tel:+79180220228"
          className="flex flex-col items-center text-xs"
        >
          <Phone className="w-5 h-5" />
          Позвонить
        </a>
      </div>
    </div>
  );
}
