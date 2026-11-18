import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHeadset,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import StaticPage from "../../Components/StaticPage/StaticPage";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e) {
    e.preventDefault();
    toast.success("Thanks! We'll get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  }

  const channels = [
    { icon: faPhone, label: "Call us", value: "+1 (800) 123-4567" },
    { icon: faEnvelope, label: "Email us", value: "support@freshcart.com" },
    { icon: faLocationDot, label: "Visit us", value: "123 Fresh Street, Green City" },
    { icon: faHeadset, label: "Live chat", value: "Available 24 / 7" },
  ];

  return (
    <StaticPage
      eyebrow="Get in touch"
      title="Contact Us"
      lead="Questions about an order, a product, or anything else? Our team is always happy to help."
      sections={[]}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 card-surface p-6 md:p-8">
          <h2 className="text-xl font-bold mb-5">Send us a message</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Your name
                </label>
                <input
                  id="name"
                  required
                  className="form-control mt-1"
                  placeholder="Mahmoud"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="form-control mt-1"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                required
                rows="6"
                className="form-control mt-1 resize-none"
                placeholder="How can we help?"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="btn bg-primary-600 text-white hover:bg-primary-700 px-8"
            >
              Send message
            </button>
          </form>
        </div>

        {/* Channels */}
        <div className="space-y-4">
          {channels.map((channel) => (
            <div key={channel.label} className="card-surface p-5 flex gap-4">
              <div className="size-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={channel.icon} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{channel.label}</p>
                <p className="font-semibold text-sm mt-1">{channel.value}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl overflow-hidden shadow-sm h-48 bg-primary-100 grid place-items-center text-primary-700 text-sm font-semibold">
            Find us on the map 📍
          </div>
        </div>
      </div>
    </StaticPage>
  );
}
