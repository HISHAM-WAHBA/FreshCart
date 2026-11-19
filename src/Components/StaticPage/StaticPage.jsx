import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";

import PageMetaData from "../PageMetaData/PageMetaData";

export default function StaticPage({
  title,
  eyebrow = "MartCart",
  lead,
  sections = [],
  children,
}) {
  return (
    <>
      <PageMetaData title={`${title} | MartCart`} description={lead} />
      <main className="page-enter">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary-50/70 py-12 md:py-20">
          <div className="absolute -right-20 -top-24 size-72 rounded-full bg-primary-200/60 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 size-64 rounded-full bg-primary-200/50 blur-3xl" />
          <div className="container relative">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-5">
              <Link to="/" className="hover:text-primary-600">
                <FontAwesomeIcon icon={faHome} className="me-1" />
                Home
              </Link>
              <FontAwesomeIcon icon={faArrowRight} className="text-[9px]" />
              <span className="font-semibold text-gray-700">{title}</span>
            </nav>
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">{title}</h1>
            {lead && <p className="mt-3 text-gray-600 max-w-2xl">{lead}</p>}
          </div>
        </section>

        {/* Body */}
        <section className="container py-10 md:py-16 space-y-6">
          {sections.map((section) => (
            <article key={section.heading} className="card-surface p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-gray-600 leading-8 mb-3 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="grid sm:grid-cols-2 gap-3 mt-5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700"
                    >
                      <span className="size-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
          {children}
        </section>
      </main>
    </>
  );
}
