// import React, { useState } from "react";
// import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const contactInfo = [
//     {
//       icon: <Phone className="w-6 h-6" />,
//       title: "Phone",
//       details: "+1 (555) 123-4567",
//       subtitle: "Mon-Fri 9am-6pm EST",
//     },
//     {
//       icon: <Mail className="w-6 h-6" />,
//       title: "Email",
//       details: "support@luxuryhaven.com",
//       subtitle: "Response within 24 hours",
//     },
//     {
//       icon: <MapPin className="w-6 h-6" />,
//       title: "Store Location",
//       details: "123 Luxury Avenue",
//       subtitle: "New York, NY 10001",
//     },
//     {
//       icon: <Clock className="w-6 h-6" />,
//       title: "Business Hours",
//       details: "Monday - Friday",
//       subtitle: "9:00 AM - 6:00 PM EST",
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Thank you for your message! We will get back to you soon.");
//     setFormData({ name: "", email: "", subject: "", message: "" });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="py-12">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
//             Contact <span className="text-gold">Us</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Have questions about our jewelry, wallets, or perfumes? We're here
//             to help.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//           {/* Contact Information */}
//           <div>
//             <h2 className="text-2xl font-playfair font-bold mb-8">
//               Get in Touch
//             </h2>
//             <div className="space-y-8">
//               {contactInfo.map((info, index) => (
//                 <div key={index} className="flex items-start">
//                   <div className="bg-gold text-white p-3 rounded-lg mr-4">
//                     {info.icon}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
//                     <p className="text-gray-800 font-medium">{info.details}</p>
//                     <p className="text-gray-600">{info.subtitle}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* FAQ Section */}
//             <div className="mt-12">
//               <h3 className="text-xl font-semibold mb-6 flex items-center">
//                 <MessageSquare className="w-5 h-5 mr-2" />
//                 Quick Questions
//               </h3>
//               <div className="space-y-4">
//                 <div className="border-b pb-4">
//                   <h4 className="font-semibold mb-1">
//                     What is your return policy?
//                   </h4>
//                   <p className="text-gray-600 text-sm">
//                     30-day return policy for unused items with original
//                     packaging.
//                   </p>
//                 </div>
//                 <div className="border-b pb-4">
//                   <h4 className="font-semibold mb-1">
//                     Do you offer international shipping?
//                   </h4>
//                   <p className="text-gray-600 text-sm">
//                     Yes, we ship to over 50 countries worldwide.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-1">
//                     Can I customize jewelry?
//                   </h4>
//                   <p className="text-gray-600 text-sm">
//                     Yes, we offer customization services for select jewelry
//                     items.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-2xl font-playfair font-bold mb-6">
//                 Send Us a Message
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2">Subject *</label>
//                   <select
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
//                   >
//                     <option value="">Select a subject</option>
//                     <option value="jewelry">Jewelry Inquiry</option>
//                     <option value="wallets">Wallets Inquiry</option>
//                     <option value="perfumes">Perfumes Inquiry</option>
//                     <option value="order">Order Status</option>
//                     <option value="custom">Customization</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2">Message *</label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows="6"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
//                     placeholder="Please describe your inquiry in detail..."
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-gold to-bronze text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center"
//                 >
//                   <Send className="w-5 h-5 mr-2" />
//                   Send Message
//                 </button>
//               </form>
//             </div>

//             {/* Map */}
//             <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
//               <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                 <div className="text-center">
//                   <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold mb-2">
//                     Visit Our Flagship Store
//                   </h3>
//                   <p className="text-gray-600">
//                     123 Luxury Avenue, New York, NY 10001
//                   </p>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h4 className="font-semibold text-lg mb-2">
//                   Store Information
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
//                   <div>
//                     <strong>Parking:</strong> Available in building garage
//                   </div>
//                   <div>
//                     <strong>Metro:</strong> 5 min walk from station
//                   </div>
//                   <div>
//                     <strong>Accessibility:</strong> Wheelchair accessible
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Support Section */}
//         <div className="mt-16 bg-gradient-to-r from-gold/10 to-bronze/10 rounded-2xl p-8 text-center">
//           <h2 className="text-2xl font-playfair font-bold mb-4">
//             Need Immediate Assistance?
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Our customer support team is ready to help you.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <a
//               href="tel:+15551234567"
//               className="inline-flex items-center justify-center bg-gold text px-6 py-3 rounded-lg hover:bg-yellow-600 transition shadow-lg"
//             >
//               <Phone className="w-5 h-5 mr-2" />
//               Call Now: (555) 123-4567
//             </a>
//             <a
//               href="mailto:support@luxuryhaven.com"
//               className="inline-flex items-center justify-center bg-white text-gold px-6 py-3 rounded-lg hover:bg-gray-50 transition border-2 border-gold"
//             >
//               <Mail className="w-5 h-5 mr-2" />
//               Email Support
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
