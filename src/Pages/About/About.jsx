import StaticPage from "../../Components/StaticPage/StaticPage";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";

export default function About() {
  return (
    <>
      <StaticPage
        eyebrow="Our story"
        title="About FreshCart"
        lead="FreshCart is a modern grocery experience built around one simple idea: fresh food, fair prices, and delivery that just works."
        sections={[
          {
            heading: "Who we are",
            paragraphs: [
              "We started FreshCart to make everyday shopping feel effortless. From farm-fresh produce to everyday essentials, we bring carefully selected products straight to your doorstep.",
              "Our team works with trusted suppliers and local farms so that every item you receive meets the quality you'd pick yourself in store.",
            ],
          },
          {
            heading: "Why customers choose us",
            items: [
              "Hand-picked products checked for freshness",
              "Same-day and next-day delivery options",
              "Transparent pricing with no surprise fees",
              "Secure payments and easy returns",
              "Friendly support that's always available",
              "A seamless experience on any screen",
            ],
          },
          {
            heading: "Our promise",
            paragraphs: [
              "If something isn't right, we'll make it right. Your satisfaction is at the heart of every order, every delivery, and every interaction with our team.",
            ],
          },
        ]}
      />
      <NewsLetter />
    </>
  );
}
