import React from "react";

export default function NewsLetter() {
  return (
    <>
    <section className="bg-primary-100">
      <div className=" py-16 px-4 sm:px-6 lg:px-8 container">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Subscribe to our Newsletter
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Stay updated with our latest offers, recipes, and health tips.
          </p>
          <form className="mt-6 flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 form-control"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white  rounded-r-md hover:bg-primary-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

    </section>


    </>
  );
}
