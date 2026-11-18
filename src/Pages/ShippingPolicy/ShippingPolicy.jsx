import StaticPage from "../../Components/StaticPage/StaticPage";

export default function ShippingPolicy() {
  return (
    <StaticPage
      eyebrow="Delivery info"
      title="Shipping Policy"
      lead="Fresh groceries, delivered on your schedule. Here's everything you need to know about our delivery service."
      sections={[
        {
          heading: "Delivery areas & times",
          paragraphs: [
            "We deliver across major cities during 9 AM – 10 PM, every day. Available slots are shown at checkout based on your address.",
          ],
          items: [
            "Same-day delivery for orders placed before 2 PM",
            "Next-day delivery for later orders",
            "Live updates from preparation to doorstep",
          ],
        },
        {
          heading: "Shipping fees",
          items: [
            "Standard delivery: 70 EGP per order",
            "Free delivery on eligible orders over 50 EGP",
            "Final fee is always shown before payment",
          ],
        },
        {
          heading: "Damaged or missing items",
          paragraphs: [
            "If anything arrives damaged or missing, contact support within 24 hours with your order number. We'll arrange a replacement or refund quickly.",
          ],
        },
      ]}
    />
  );
}
