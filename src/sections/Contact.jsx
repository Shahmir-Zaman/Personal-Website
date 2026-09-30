import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/Models/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      setLoading(false);
      return;
    }

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      // Reset form and show success message
      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });

    } catch (error) {
      // The provider's own error text is for the console, not the visitor — it
      // leaks EmailJS internals and tells them nothing they can act on.
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message: "That didn't send — something went wrong on our end.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding mb-15">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch"
          sub="Open to roles, internships and freelance work"
        />
        <p className="mt-5 text-center text-white-50/80 text-sm md:text-base">
          Based in Germany &amp; the UAE · working across CET and GST (UTC+4) time zones
        </p>
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>

                {/* Status message — glass on the void like every other surface,
                    never a light-mode chip. A failure always offers a way out,
                    so a broken form is never a dead end. */}
                {status.message && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`form-status ${status.type === "success" ? "form-status-success" : "form-status-error"}`}
                  >
                    <p>{status.message}</p>
                    {status.type === "error" && (
                      <p className="form-status-fallback">
                        You can also reach me on{" "}
                        <a href="https://www.linkedin.com/in/shahmir-zaman-b90a61217" target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                        .
                      </p>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
