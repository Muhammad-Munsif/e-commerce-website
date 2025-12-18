import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, Edit2, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import { toast } from 'react-toastify';

const Account = () => {
  const { user, login, register, logout, updateProfile } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Account', path: '/account' }
  ];

  // Load orders from localStorage
  React.useEffect(() => {
    if (user) {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders);
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(loginData.email, loginData.password);
    if (result.success) {
      setLoginData({ email: '', password: '' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const result = await register(registerData);
    if (result.success) {
      setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(profileData);
    setIsEditing(false);
  };

  const accountTabs = [
    { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: orders.length },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: 0 },
    { id: 'addresses', label: 'Addresses', icon: MapPin, count: 1 },
    { id: 'settings', label: 'Settings', icon: Settings, count: 0 }
  ];

  if (!user) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="section-padding">
          <div className="container-custom max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-gold" />
                </div>
                <h2 className="text-2xl font-bold">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {isLogin ? 'Sign in to your account' : 'Register for a new account'}
                </p>
              </div>

              {/* Toggle Login/Register */}
              <div className="flex mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 text-center font-medium rounded-l-lg transition-colors ${
                    isLogin
                      ? 'bg-gold text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 text-center font-medium rounded-r-lg transition-colors ${
                    !isLogin
                      ? 'bg-gold text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Register
                </button>
              </div>

              {isLogin ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-gold focus:ring-gold mr-2" />
                      <span className="text-sm">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-gold hover:underline">Forgot password?</a>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Sign In
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-gold focus:ring-gold mr-2"
                      required
                    />
                    <span className="text-sm">
                      I agree to the{' '}
                      <a href="#" className="text-gold hover:underline">Terms & Conditions</a>
                    </span>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Create Account
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                {/* Profile Info */}
                <div className="flex items-center mb-8">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{user.email}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-gold hover:underline mt-1 flex items-center"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {accountTabs.map((tab) => (
                    <Link
                      key={tab.id}
                      to={`#${tab.id}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center">
                        <tab.icon className="w-5 h-5 mr-3" />
                        <span>{tab.label}</span>
                      </div>
                      {tab.count > 0 && (
                        <span className="bg-gold text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          {tab.count}
                        </span>
                      )}
                    </Link>
                  ))}
                  <button
                    onClick={logout}
                    className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-500"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Profile Editing */}
              {isEditing && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Edit Profile</h3>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="input-field"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Address</label>
                        <textarea
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          className="input-field"
                          rows="3"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary flex-1">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Orders Section */}
              <div id="orders" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-6">Recent Orders</h3>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-4">No orders yet</p>
                    <Link to="/shop" className="btn-primary">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-600 dark:text-gray-300">
                            {order.items.length} items • ${order.total.toFixed(2)}
                          </p>
                          <Link
                            to={`/orders/${order.id}`}
                            className="text-gold hover:underline text-sm font-medium"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Account Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-gold/10 to-bronze/10 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gold bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <ShoppingBag className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{orders.length}</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                  </div>
                  <Link to="#orders" className="text-gold hover:underline text-sm">
                    View all orders →
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-gray-600">Wishlist Items</p>
                    </div>
                  </div>
                  <Link to="/wishlist" className="text-blue-600 hover:underline text-sm">
                    View wishlist →
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                  </div>
                  <Link to="#orders" className="text-green-600 hover:underline text-sm">
                    View statistics →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;