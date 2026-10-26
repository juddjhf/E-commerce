
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    detail: "support@shopease.com",
    description: "For product and order-related questions",
    href: "mailto:support@shopease.com",
  },
  {
    icon: Phone,
    title: "Phone Support",
    detail: "+91 98765 43210",
    description: "Replace with your business phone number",
    href: "tel:+919876543210",
  },
  {
    icon: Clock,
    title: "Support Hours",
    detail: "Mon – Sat",
    description: "10:00 AM – 6:00 PM",
    href: null,
  },
];

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Once order tracking is connected to your backend, customers will be able to check their order status from their account or through the tracking link.",
  },
  {
    question: "How can I request a return or refund?",
    answer:
      "Contact the support team with your order details. The return and refund process will depend on the store's published policy.",
  },
  {
    question: "Which payment methods are available?",
    answer:
      "Available payment methods will be displayed during checkout. This demo page does not process payments or confirm payment availability.",
  },
  {
    question: "How can I get help with a product?",
    answer:
      "Send us a message using the contact form and include the product name and your question so the support team can assist you.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    orderNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Demo only: no email or backend API is connected.
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "General Inquiry",
      orderNumber: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/[0.04]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-300">
              <MessageCircle size={16} />
              We're here to help
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let's start a
              <span className="block text-gray-400">conversation.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              Have a question about a product, your order, or our store?
              Send us a message and let us know how we can help.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-300">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} />
                Product questions
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} />
                Order assistance
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} />
                General inquiries
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact information and form */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left side */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Contact information
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              We'd love to hear from you.
            </h2>

            <p className="mt-4 max-w-md leading-7 text-gray-600">
              Choose a contact option below or use the form to send your
              question to our team.
            </p>

            <div className="mt-8 space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <div
                    key={method.title}
                    className="flex gap-4 rounded-2xl border border-gray-200 p-5 transition hover:border-gray-400"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold">{method.title}</h3>

                      {method.href ? (
                        <a
                          href={method.href}
                          className="mt-1 block break-words text-sm font-medium text-gray-900 hover:underline"
                        >
                          {method.detail}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium">
                          {method.detail}
                        </p>
                      )}

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {method.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-gray-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                  <MapPin size={21} />
                </div>
                <div>
                  <h3 className="font-semibold">Our Location</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add your business address here
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: contact form */}
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Send a message
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                How can we help?
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Fill in the details below. Fields marked with * are required.
              </p>
            </div>

            {submitted && (
              <div
                role="status"
                className="mt-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
              >
                <CheckCircle2 size={21} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Form submitted successfully!</p>
                  <p className="mt-1 text-sm leading-6">
                    This is a demo confirmation only. Connect the backend
                    to actually deliver your message.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Full Name *
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Email Address *
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Subject *
                  </label>

                  <div className="relative">
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                    >
                      <option>General Inquiry</option>
                      <option>Product Question</option>
                      <option>Order Status</option>
                      <option>Shipping & Delivery</option>
                      <option>Return & Refund</option>
                      <option>Payment Issue</option>
                      <option>Other</option>
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-order"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Order Number
                    <span className="font-normal text-gray-400"> (Optional)</span>
                  </label>

                  <input
                    id="contact-order"
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    placeholder="e.g. ORD-1001"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Your Message *
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  aria-invalid={Boolean(errors.message)}
                  className={`w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 ${
                    errors.message ? "border-red-500" : "border-gray-200"
                  }`}
                />

                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:w-auto"
              >
                Send Message
                <Send size={17} />
              </button>

              <p className="text-xs leading-5 text-gray-500">
                Demo form only. Messages are not saved or sent until a
                backend API or email service is connected.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              FAQs
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Quick answers to common questions.
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Need help with something else? Send us a message using the
              contact form.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 font-semibold hover:gap-3"
            >
              Explore the store
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                      <p className="text-sm leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-gray-950 p-7 text-white sm:p-10 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ShoppingBag size={17} />
              ShopEase
            </div>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Looking for something special?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-300">
              Browse our collection and discover your next favorite product.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-gray-950 transition hover:bg-gray-200"
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
