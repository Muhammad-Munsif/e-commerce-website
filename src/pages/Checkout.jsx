import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    shippingSameAsBilling: true
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' },
    { label: 'Checkout', path: '/checkout' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    for (const field of required) {
      if (!formData[field].trim()) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (paymentMethod === 'creditCard') {
      if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Please enter a valid 16-digit card number');
        return false;
      }
      if (!paymentData.cardName) {
        toast.error('Please enter name on card');
        return false;
      }
      if (!paymentData.expiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentData.expiry)) {
        toast.error('Please enter valid expiry date (MM/YY)');
        return false;
      }
      if (!paymentData.cvv || paymentData.cvv.length !== 3) {
        toast.error('Please enter valid CVV');
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateStep2()) return;

    try {
      // Simulate API call
      const newOrderId = `ORD${Date.now()}`;
      setOrderId(newOrderId);
      setOrderPlaced(true);
      
      // Save order to localStorage
      const order = {
        id: newOrderId,
        date: new Date().toISOString(),
        items: cart.items,
        total: cartTotal,
        shipping: cartTotal >= 100 ? 0 : 9.99,
        tax: cartTotal * 0.08,
        shippingAddress: formData,
        paymentMethod,
        status: 'processing'
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));
      
      // Clear cart
      clearCart();
      
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  const steps = [
    { number: 1, title: 'Shipping Address' },
    { number: 2, title: 'Payment Method' },
    { number: 3, title: 'Review & Place Order' }
  ];

  if (cartCount === 0 && !orderPlaced) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="section-padding">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add items to your cart before checking out.</p>
            <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Thank you for your order. Your order ID is:
          </p>
          <p className="text-2xl font-bold text-gold mb-6">{orderId}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            We've sent a confirmation email with order details and tracking information.
          </p>
          <div className="space-y-4">
            <Link
              to="/orders"
              className="btn-primary w-full block"
            >
              View Order Status
            </Link>
            <Link
              to="/shop"
              className="btn-secondary w-full block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl font-playfair font-bold mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {steps.map((s, index) => (
                <React.Fragment key={s.number}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      step >= s.number ? 'bg-gold text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}>
                      {step > s.number ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-bold">{s.number}</span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{s.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 ${step > s.number ? 'bg-gold' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="shippingSameAsBilling"
                        checked={formData.shippingSameAsBilling}
                        onChange={handleInputChange}
                        className="rounded text-gold focus:ring-gold mr-2"
                      />
                      Billing address same as shipping address
                    </label>
                  </div>
                  <button
                    onClick={() => validateStep1() && setStep(2)}
                    className="btn-primary mt-8 w-full"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { id: 'creditCard', label: 'Credit/Debit Card', icon: CreditCard },
                      { id: 'paypal', label: 'PayPal', icon: 'PP' },
                      { id: 'applePay', label: 'Apple Pay', icon: '' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-gold bg-gold bg-opacity-10'
                            : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-4"
                        />
                        <div className="flex items-center">
                          {method.icon === CreditCard ? (
                            <CreditCard className="w-6 h-6 mr-3" />
                          ) : (
                            <span className="w-6 h-6 mr-3 flex items-center justify-center">{method.icon}</span>
                          )}
                          <span>{method.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === 'creditCard' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="1234 5678 9012 3456"
                          className="input-field"
                          maxLength="19"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Name on Card</label>
                        <input
                          type="text"
                          name="cardName"
                          value={paymentData.cardName}
                          onChange={handlePaymentChange}
                          placeholder="John Doe"
                          className="input-field"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={paymentData.expiry}
                            onChange={handlePaymentChange}
                            placeholder="MM/YY"
                            className="input-field"
                            maxLength="5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={paymentData.cvv}
                            onChange={handlePaymentChange}
                            placeholder="123"
                            className="input-field"
                            maxLength="3"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => validateStep2() && setStep(3)}
                      className="btn-primary flex-1"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-6">Review Your Order</h2>
                  
                  {/* Order Summary */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Items ({cartCount})</h3>
                    <div className="space-y-4">
                      {cart.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg mr-4"
                            />
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold">
                            ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}<br />
                      {formData.country}<br />
                      Phone: {formData.phone}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {paymentMethod === 'creditCard' ? 'Credit Card' : paymentMethod}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mt-8 pt-8 border-t dark:border-gray-700">
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      <span>SSL encrypted</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="btn-primary flex-1"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{cartTotal >= 100 ? 'FREE' : '$9.99'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${(cartTotal + (cartTotal >= 100 ? 0 : 9.99) + (cartTotal * 0.08)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="mt-8">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Lock className="w-6 h-6 text-gold" />
                      </div>
                      <span className="text-xs">Secure Payment</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Shield className="w-6 h-6 text-gold" />
                      </div>
                      <span className="text-xs">30-Day Returns</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-500">
                    Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;