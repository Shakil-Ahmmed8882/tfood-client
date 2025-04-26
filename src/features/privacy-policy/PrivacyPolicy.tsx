export function PrivacyPolicy() {
  return (
    <div className="bg-gray-100 font-sans min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-0">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

          <p className="text-gray-700 mb-4">
            This Privacy Policy describes how we collect, use, and share your personal information.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Personal information you provide directly (e.g., name, email address, contact information).</li>
            <li>Information collected automatically as you use our services (e.g., IP address, browser type, device information).</li>
            <li>Usage data, such as the pages you visit and the actions you take on our website.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Provide and improve our services:</strong> To deliver the services you request and to enhance their
              functionality and user experience.
            </li>
            <li>
              <strong>Respond to your inquiries or requests:</strong> To communicate with you and address any questions or
              support needs you may have.
            </li>
            <li>
              <strong>Maintain the security and functionality of our website:</strong> To ensure our website is secure,
              stable, and operating correctly.
            </li>
            <li>
              <strong>Analyze user activity to enhance your experience:</strong> To understand how users interact with our
              website and make improvements based on this analysis.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Sharing Your Information</h2>
          <p className="text-gray-700 mb-4">
            <strong>We do not sell your personal information to third parties.</strong> We may share your information with
            trusted service providers who assist us in operating our website, conducting our business, or servicing you, as
            long as those parties agree to keep this information confidential.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Security</h2>
          <p className="text-gray-700 mb-4">
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
            However, no method of transmission over the internet or electronic storage is completely secure.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Rights</h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have certain rights regarding your personal information, such as the right
            to access, correct, or delete your data. Please contact us if you wish to exercise these rights.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting
            the new policy on our website.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at [Your Contact Information].
          </p>
        </div>
      </div>
    </div>
  );
}

 PrivacyPolicy.displayName = "PrivacyPolicy";