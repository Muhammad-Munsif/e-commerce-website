import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  CreditCard,
  ShoppingBag,
  ChevronRight,
  Printer,
  Download,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingData, setTrackingData] = useState(null);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Account", path: "/account" },
    { label: "Orders", path: "/orders" },
    ...(orderId
      ? [{ label: `Order ${orderId}`, path: `/orders/${orderId}` }]
      : []),
  ];

  // Mock order data - in real app, fetch from API
  useEffect(() => {
    const fetchOrder = () => {
      // Try to get from localStorage first
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      let foundOrder;

      if (orderId) {
        foundOrder = savedOrders.find((o) => o.id === orderId);
      } else {
        foundOrder = savedOrders[0]; // Get most recent order
      }

      if (foundOrder) {
        setOrder(foundOrder);

        // Generate mock tracking data
        const statuses = [
          {
            status: "ordered",
            label: "Order Placed",
            description: "We have received your order",
            date: new Date(foundOrder.date),
            icon: ShoppingBag,
          },
          {
            status: "processing",
            label: "Processing",
            description: "Your order is being prepared",
            date: new Date(new Date(foundOrder.date).getTime() + 3600000),
            icon: Package,
          },
          {
            status: "shipped",
            label: "Shipped",
            description: "Your order is on the way",
            date: new Date(new Date(foundOrder.date).getTime() + 86400000),
            icon: Truck,
          },
          {
            status: "delivered",
            label: "Delivered",
            description: "Your order has been delivered",
            date: new Date(new Date(foundOrder.date).getTime() + 172800000),
            icon: CheckCircle,
          },
        ];

        const currentStatus = foundOrder.status || "processing";
        const statusIndex = statuses.findIndex(
          (s) => s.status === currentStatus
        );

        setTrackingData({
          currentStatus,
          estimatedDelivery: new Date(
            new Date(foundOrder.date).getTime() + 172800000
          ),
          trackingNumber: `TRK${Date.now().toString().slice(-10)}`,
          carrier: "UPS",
          statuses: statuses.map((status, index) => ({
            ...status,
            completed: index <= statusIndex,
            current: index === statusIndex,
          })),
        });
      }
      setLoading(false);
    };

    // Simulate API call
    setTimeout(fetchOrder, 500);
  }, [orderId]);

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    // In real app, generate PDF invoice
    alert("Invoice download functionality would generate a PDF file.");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="section-padding">
          <div className="container-custom text-center">
            <XCircle className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Order Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {orderId ? `Order ${orderId} was not found.` : "No orders found."}
            </p>
            <Link to="/shop" className="btn-primary mr-4">
              Continue Shopping
            </Link>
            <Link to="/account" className="btn-secondary">
              View All Orders
            </Link>
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
          {/* Order Header */}
          <div className="bg-gradient-to-r from-gold/10 to-bronze/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-playfair font-bold mb-2">
                  Order #{order.id}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Placed on{" "}
                  {new Date(order.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span
                  className={`inline-block px-4 py-2 rounded-full font-medium ${
                    order.status === "processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Tracking */}
            <div className="lg:col-span-2">
              {/* Tracking Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold">Order Tracking</h2>
                  {trackingData && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="font-bold">{trackingData.trackingNumber}</p>
                    </div>
                  )}
                </div>

                {trackingData && (
                  <>
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Estimated Delivery
                          </p>
                          <p className="text-xl font-bold">
                            {trackingData.estimatedDelivery.toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Carrier</p>
                          <p className="font-bold">{trackingData.carrier}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="space-y-8">
                        {trackingData.statuses.map((step, index) => (
                          <div
                            key={index}
                            className="relative flex items-start"
                          >
                            <div
                              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                                step.completed
                                  ? "bg-gold text-white"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                              }`}
                            >
                              <step.icon className="w-6 h-6" />
                            </div>
                            <div className="ml-6 flex-1">
                              <div
                                className={`font-semibold ${
                                  step.completed
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-500"
                                }`}
                              >
                                {step.label}
                                {step.current && (
                                  <span className="ml-2 text-sm bg-gold text-white px-2 py-1 rounded-full">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mt-1">
                                {step.description}
                              </p>
                              <p className="text-sm text-gray-500 mt-2">
                                {step.date.toLocaleDateString()} •{" "}
                                {step.date.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Order Items */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Order Items</h2>
                <div className="space-y-6">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.material && item.material.join(" • ")}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </span>
                            {item.discount > 0 && (
                              <span className="ml-4 text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                                -{item.discount}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gold">
                          $
                          {(
                            (item.discount
                              ? item.price * (1 - item.discount / 100)
                              : item.price) * item.quantity
                          ).toFixed(2)}
                        </p>
                        {item.discount > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary & Actions */}
            <div className="lg:col-span-1">
              {/* Order Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {order.shipping === 0
                        ? "FREE"
                        : `$${order.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>
                        ${(order.total + order.shipping + order.tax).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Address
                </h3>
                {order.shippingAddress ? (
                  <div className="space-y-2">
                    <p>
                      {order.shippingAddress.firstName}{" "}
                      {order.shippingAddress.lastName}
                    </p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                    <p>Phone: {order.shippingAddress.phone}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">No shipping address provided</p>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </h3>
                <div className="flex items-center">
                  <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-3">
                    {order.paymentMethod === "creditCard" ? (
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    ) : (
                      <span className="font-bold">
                        {order.paymentMethod === "paypal" ? "PP" : ""}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {order.paymentMethod === "creditCard"
                        ? "Credit Card"
                        : order.paymentMethod === "paypal"
                        ? "PayPal"
                        : "Apple Pay"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.paymentMethod === "creditCard"
                        ? "Ending in 4242"
                        : "Connected"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6">Actions</h3>
                <div className="space-y-4">
                  <button
                    onClick={handlePrintInvoice}
                    className="w-full flex items-center justify-center p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Printer className="w-5 h-5 mr-2" />
                    Print Invoice
                  </button>
                  <button
                    onClick={handleDownloadInvoice}
                    className="w-full flex items-center justify-center p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Invoice
                  </button>
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Need Help?
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Actions */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-gray-50 to-gold/5 dark:from-gray-800 dark:to-gold/10 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Questions about your order?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our customer service team is here to help
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-4">
                  <Link to="/contact" className="btn-primary">
                    Contact Support
                  </Link>
                  <Link to="/shop" className="btn-secondary">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          nav,
          footer,
          button,
          .no-print {
            display: none !important;
          }
          body {
            font-size: 12pt;
          }
          .container-custom {
            max-width: 100% !important;
            padding: 0 !important;
          }
          .bg-white,
          .bg-gray-50,
          .bg-gradient-to-r {
            background: white !important;
          }
          .text-gray-900,
          .text-gray-800,
          .text-gray-700 {
            color: black !important;
          }
          .border,
          .border-t,
          .border-b {
            border-color: #ccc !important;
          }
          .shadow-lg,
          .shadow-xl {
            box-shadow: none !important;
          }
          .rounded-xl,
          .rounded-lg,
          .rounded-full {
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default OrderTracking;
