"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ComplaintBox() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    complaint: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendComplaint = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.complaint.trim()) {
      alert("Please enter your complaint.");
      return;
    }

    setLoading(true);

    const message = `
New Complaint Received

Name: ${form.name || "Not Provided"}
Email: ${form.email || "Not Provided"}
Phone: ${form.phone || "Not Provided"}
Department: ${form.department || "Not Provided"}

Complaint:
${form.complaint}
`;

    try {
      const response = await emailjs.send(
        "service_uowwx9f",     // Service ID
        "template_kcy9mmv",    // Template ID
        {
          message: message,    // Template variable
        },
        "K-th3dE-aiwvi_9NO"     // Public Key
      );

      alert("Complaint submitted successfully.");

      setForm({
        name: "",
        email: "",
        phone: "",
        department: "",
        complaint: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint.");
    }

    setLoading(false);
  };

  return (
    <section className="py-16 px-4 bg-slate-950">
      <div className="max-w-4xl mx-auto">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10 shadow-xl">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">
              Complaint Box
            </h2>

            <p className="mt-2 text-slate-400">
              Share your concerns or suggestions. Only the complaint description
              is required. Your identity details are optional.
            </p>
          </div>

          <form
            onSubmit={sendComplaint}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                name="name"
                placeholder="Name (Optional)"
                value={form.name}
                onChange={handleChange}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email (Optional)"
                value={form.email}
                onChange={handleChange}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone (Optional)"
                value={form.phone}
                onChange={handleChange}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />

              <input
                type="text"
                name="department"
                placeholder="Department (Optional)"
                value={form.department}
                onChange={handleChange}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />

            </div>

            <textarea
              required
              name="complaint"
              rows={7}
              placeholder="Describe your complaint *"
              value={form.complaint}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500 resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-yellow-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}