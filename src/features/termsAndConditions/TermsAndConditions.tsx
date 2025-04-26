
export function TermsAndConditions() {
  return (
    <div className="bg-gray-100 font-sans min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-0">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms and Conditions</h1>

          <p className="text-gray-700 mb-4">
            Welcome to our website! By using our platform, you agree to the following terms and conditions:
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Content Use</h2>
          <p className="text-gray-700 mb-4">
            All menus and content on this website are provided for personal, non-commercial use only. You are strictly
            prohibited from copying, reproducing, distributing, selling, or otherwise exploiting the content without
            explicit written permission.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Accuracy</h2>
          <p className="text-gray-700 mb-4">
            We strive to ensure the accuracy of all information presented on our website, including menu details. However,
            restaurant menus and information can change, and we cannot guarantee that all details are always up-to-date or
            entirely correct. We are not responsible for any outdated or inaccurate menu details. Please verify critical
            information directly with the respective restaurants.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">User Behavior</h2>
          <p className="text-gray-700 mb-4">
            By using our website, you agree to conduct yourself in a responsible and respectful manner. You specifically
            agree not to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Misuse the website in any way, including attempting to gain unauthorized access to our systems or networks
              (hacking).
            </li>
            <li>
              Engage in any data mining, scraping, or other automated means of collecting content from our website without
              our express written consent.
            </li>
            <li>Transmit any unsolicited or unauthorized advertising, promotional materials, spam, or other forms of
              solicitation.
            </li>
            <li>Interfere with or disrupt the operation of our website or the servers and networks used to make it
              available.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Changes</h2>
          <p className="text-gray-700 mb-4">
            We may update our site, policies, or these terms at any time. Your continued use of our website following any
            such changes constitutes your acceptance of the new terms. It is your responsibility to review these terms
            periodically for any updates.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Third-Party Links</h2>
          <p className="text-gray-700 mb-4">
            Some links may go to restaurant websites or delivery services. We are not responsible for their content or
            policies. Your interactions with these linked websites are solely between you and the respective third
            parties.
          </p>

          <p className="text-gray-700 mb-4">
            If you do not agree with any part of these terms, please do not use our website.
          </p>

          <p className="text-gray-700 font-semibold">Thank You.</p>
        </div>
      </div>
    </div>
  );
}

TermsAndConditions.displayName = "TermsAndConditions";