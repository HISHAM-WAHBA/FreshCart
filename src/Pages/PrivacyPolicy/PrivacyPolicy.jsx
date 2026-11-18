import StaticPage from "../../Components/StaticPage/StaticPage";

export default function PrivacyPolicy() {
  return (
    <StaticPage
      eyebrow="Your privacy"
      title="Privacy Policy"
      lead="We collect only what we need to give you a great shopping experience — and we never sell your personal data."
      sections={[
        {
          heading: "What we collect",
          items: [
            "Account details such as your name, email and phone number",
            "Delivery addresses you save for checkout",
            "Order history and payment status (never full card details)",
            "Basic usage data to help us improve the store",
          ],
        },
        {
          heading: "How we use it",
          items: [
            "To process and deliver your orders",
            "To send order updates and important account notices",
            "To personalise product recommendations",
            "To detect and prevent fraud or abuse",
          ],
        },
        {
          heading: "Cookies & storage",
          paragraphs: [
            "We use browser storage to remember your session and preferences. You can clear this data at any time from your browser settings.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can request access to, correction of, or deletion of your personal data by contacting our support team. We'll respond within a reasonable timeframe.",
          ],
        },
      ]}
    />
  );
}
