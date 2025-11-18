import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Package, CheckCircle } from 'lucide-react';

const EcommerceApp = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop Pro', price: 1299, image: '💻', category: 'Electrónica' },
    { id: 2, name: 'Smartphone X', price: 899, image: '📱', category: 'Electrónica' },
    { id: 3, name: 'Auriculares Wireless', price: 199, image: '🎧', category: 'Audio' },
    { id: 4, name: 'Tablet Plus', price: 599, image: '📱', category: 'Electrónica' },
    { id: 5, name: 'Smartwatch', price: 299, image: '⌚', category: 'Accesorios' },
    { id: 6, name: 'Cámara 4K', price: 799, image: '📷', category: 'Fotografía' }
  ]);

  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products');
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setView('checkout');
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }
    
    setTimeout(() => {
      setOrderComplete(true);
      setCart([]);
      setTimeout(() => {
        setView('products');
        setOrderComplete(false);
        setPaymentMethod('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">TechStore</h1>
          </div>
          <button
            onClick={() => setView('cart')}
            className="relative bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Carrito</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Products View */}
        {view === 'products' && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Productos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-purple-600 uppercase">{product.category}</span>
                    <h3 className="text-xl font-bold mt-2 text-gray-800">{product.name}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart View */}
        {view === 'cart' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Tu Carrito</h2>
              <button
                onClick={() => setView('products')}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                ← Seguir Comprando
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{item.image}</span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                        <p className="text-purple-600 font-semibold">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-3 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bold text-xl text-gray-800 w-24 text-right">
                        ${item.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                  <div className="flex justify-between items-center text-2xl font-bold mb-6">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-purple-600">${getTotal()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition font-bold text-lg"
                  >
                    Proceder al Pago
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Checkout View */}
        {view === 'checkout' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Finalizar Compra</h2>
            
            {orderComplete ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h3>
                <p className="text-gray-600">Tu pedido ha sido confirmado</p>
              </div>
            ) : (
              <form onSubmit={handlePayment} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800">Información de Entrega</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Dirección"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Método de Pago
                  </h3>
                  <div className="space-y-3">
                    {['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Transferencia', 'Mercado Pago'].map(method => (
                      <label key={method} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 cursor-pointer transition">
                        <input
                          type="radio"
                          name="payment"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span className="font-semibold text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center text-2xl font-bold mb-6">
                    <span className="text-gray-800">Total a Pagar:</span>
                    <span className="text-purple-600">${getTotal()}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition font-bold text-lg"
                  >
                    Confirmar y Pagar
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('cart')}
                    className="w-full mt-3 text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Volver al Carrito
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcommerceApp;