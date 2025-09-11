import { useState } from "react";
import emailjs from "emailjs-com";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  const [formData, setFormData] = useState({email: "", message: "" });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(() => {
        alert("Message Sent!");
        setFormData({email: "", message: "" });
      })
      .catch(() => alert("Oops! Something went wrong. Please try again."));
  };

  return (
    <footer id="footer" className="bg-slate-900 text-gray-200 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-5 items-start">
          {/* Contact form (60%) */}
          <div className="md:col-span-4 max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
            <form onSubmit={handleOnSubmit} className="space-y-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                required
                placeholder="Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-white/10 rounded bg-white/5 text-white focus:outline-none focus:border-blue-500"
              />
              <textarea
                name="message"
                value={formData.message}
                required
                placeholder="Your message…"
                rows={3}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-white/10 rounded bg-white/5 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Send
              </button>
            </form>
          </div>

          {/* Socials (40%) */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Connect</h2>
            <ul className="space-y-3">
            <li>
                <a
                  href="https://www.linkedin.com/in/ravi-chandu-bollepalli/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <FaLinkedin className="text-blue-400" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rcb1409"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <FaGithub className="text-blue-400" /> GitHub
                </a>
              </li>
            </ul>
            <p className="mt-14 text-sm text-gray-400">
              © {new Date().getFullYear()} RaviChanduBollepalli.me
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
