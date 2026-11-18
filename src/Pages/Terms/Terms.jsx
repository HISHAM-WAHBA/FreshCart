import StaticPage from "../../Components/StaticPage/StaticPage";

export default function Terms() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Terms of Service"
      lead="Please read these terms carefully before using FreshCart. By placing an order, you agree to the following."
      sections={[
        {
          heading: "1. Using our store",
          paragraphs: [
            "You must provide accurate information when creating an account and placing an order. We reserve the right to refuse orders that appear fraudulent or violate these terms.",
          ],
        },
        {
          heading: "2. Orders & pricing",
          items: [
            "All prices are shown in EGP and include VAT where applicable.",
            "Order confirmation is sent after payment or placement successfully.",
            "We may cancel an order if a product becomes unavailable.",
            "Delivery fees and taxes are shown before you confirm checkout.",
          ],
        },
        {
          heading: "3. Returns & refunds",
          paragraphs: [
            "Perishable items can be returned within 24 hours of delivery if they arrive damaged or spoiled. Non-perishable items may be returned within 30 days in their original condition.",
          ],
        },
        {
          heading: "4. Accounts & security",
          paragraphs: [
            "You are responsible for keeping your password secure. Notify us immediately if you suspect unauthorized access to your account.",
          ],
        },
        {
          heading: "5. Changes to these terms",
          paragraphs: [
            "We may update these terms from time to time. The current version is always available on this page.",
          ],
        },
      ]}
    />
  );
}
