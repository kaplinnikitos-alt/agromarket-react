import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';

const API_URL = 'http://localhost:3001/products';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Сервер ответил со статусом ' + response.status);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить товары. Проверьте, запущен ли json-server на порту 3001.');
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  function handleAddToCart() {
    setCartCount(cartCount + 1);
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="header">
        <a className="logo" href="#">
          <span className="logo-mark">АМ</span>
          АгроМаркет
        </a>
        <p className="cart">
          Корзина
          <span id="cart-count">{cartCount}</span>
        </p>
      </header>

      <section className="hero">
        <h1>Продукты от фермеров Алматинской области</h1>
        <p>Собрали утром, привезли днём. Доставка по городу в день заказа.</p>
      </section>

      <main>
        <section className="catalog">
          <h2>Каталог</h2>

          <input
            className="search"
            type="text"
            placeholder="Поиск товара..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading && <p className="status">Загрузка...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <div className="catalog-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Лабораторная работа №3 · Fullstack-разработка</p>
      </footer>
    </>
  );
}

export default App;
