























/*
* This component follows the Container-Presentation pattern, improving
* maintainability, readability, and reusability. It consists of:
* 
* 1. **Footer (Container)**
*    - Manages data and state.
*    - Defines company information, navigation links, and social media details.
*    - Passes relevant props to the presentation component.
* 
* 2. **FooterPresentation (Presentation)**
*    - Handles UI rendering based on props.
*    - Ensures a clean, structured layout using Tailwind CSS.

*/

import { Link } from "react-router-dom";

import { Container } from "../wrapper/Container";
import { Mail, Phone } from "lucide-react";
import { ReactNode } from "react";
import { TFLogo } from "../ui/TFLogo";



// Container layer
export default function Footer() {
  const companyInfo = {
    name: "tfood",
    email: "abc@gmail.com",
    phone: "0123456789",
    description:
      "Doloremque quia maiores animi tenetur consequatur saepe mollitia",
    copyright: "©2024 tfood All Rights Reserved",
  };

  const links = [
    { label: "FAQ", path: "/faq" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms and Conditions", path: "/terms-and-conditions" },
  ];

  const socialLinks = [
    {
      href: "https://instagram.com",
      label: "Instagram",
      color: "hover:text-pink-600",
      iconSrc: "https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000", // Image source URL
    },
    {
      href: "https://facebook.com",
      label: "Facebook",
      color: "hover:text-blue-600",
      iconSrc: "https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000", // Image source URL
    },
  ];

  return (
    <FooterPresentation
      company={companyInfo}
      links={links}
      socialLinks={socialLinks}
    />
  );
}




// Presentation layer
function FooterPresentation({
  company,
  links,
  socialLinks,
}: FooterPresentationProps) {
  return (
    <footer className="bg-gray-50 py-8 mt-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <TFLogo />
            <p className="mt-3 text-gray-600">{company.description}</p>

          </div>

          {/* === Middle Section: Navigation Links === */}
          <div className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* === Right Section: Contact & Social Media === */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Us</h3>
            <ContactItem
              icon={<Mail size={18} />}
              text={company.email}
              href={`mailto:${company.email}`}
            />
            <ContactItem
              icon={<Phone size={18} />}
              text={company.phone}
              href={`tel:${company.phone}`}
            />


          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 flex items-center justify-between flex-wrap">
        <p className=" text-sm text-gray-500">{company.copyright}</p>
                    {/* Social Media Links */}
            <div className="flex justify-end space-x-3">
              {socialLinks.map(({ href, label, color, iconSrc }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 ${color}`}
                >
                  {/* Render the image icon */}
                  <img src={iconSrc} alt={label} className="w-6 h-6" />
                </a>
              ))}
            </div>
        </div>
      </Container>
    </footer>
  );
}

// ====== Reusable Contact Item Component ======
function ContactItem({
  icon,
  text,
  href,
}: {
  icon: ReactNode;
  text: string;
  href: string;
}) {
  return (
    <div className="flex items-center space-x-2 mb-3">
      <span className="text-gray-500">{icon}</span>
      <a href={href} className="text-gray-700 hover:text-gray-900">
        {text}
      </a>
    </div>
  );
}

// ====== Type Definitions ======
type FooterPresentationProps = {
  company: {
    name: string;
    email: string;
    phone: string;
    description: string;
    copyright: string;
  };
  links: { label: string; path: string }[];
  socialLinks: { href: string; label: string; color: string; iconSrc: string }[]; // Changed to use `iconSrc` instead of `icon`
};
