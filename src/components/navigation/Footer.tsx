import { Link } from "react-router-dom";
import { Container } from "../wrapper/Container";
import { Mail, Phone } from "lucide-react";
import { ReactNode } from "react";
import { Logo, LogoText } from "../ui/TFLogo";

// Container layer
export default function Footer() {
  const companyInfo = {
    name: "tfood",
    email: "tfoodbangladesh@gmail.com",
    phone: "+8801979401082",
    description: "Reduce waste and increase restaurant experience",
    copyright: " tfood All Rights Reserved",
  };

  const links = [
    { label: "FAQ", path: "/faq" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms and Conditions", path: "/terms-and-conditions" },
  ];

  const socialLinks = [
    {
      href: "https://www.instagram.com/tfoodbd/",
      label: "Instagram",
      color: "hover:text-pink-600",
      iconSrc: "https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000",
    },
    {
      href: "https://www.facebook.com/tfoodbangladesh",
      label: "Facebook",
      color: "hover:text-blue-600",
      iconSrc: "https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000",
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
    <footer className="bg-gray-100 py-10 mt-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left Section: Logo & Description */}
          <div className="flex flex-col">
            <Logo className="mb-4" />
            <p className="text-sm text-gray-600 max-w-xs">
              {company.description}
            </p>
          </div>

          {/* Middle Section: Navigation Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-gray-700 hover:text-blue-400 transition-colors duration-200"
                aria-label={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section: Contact & Social Media */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Contact Us
            </h3>
            <ContactItem
              icon={<Mail size={20} className="text-gray-500" />}
              text={company.email}
              href={`mailto:${company.email}`}
            />
            <ContactItem
              icon={<Phone size={20} className="text-gray-500" />}
              text={company.phone}
              href={`tel:${company.phone}`}
            />
          </div>
        </div>

        {/* Bottom Section: Copyright & Social Media */}
        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}
            {company.copyright}
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map(({ href, label, color, iconSrc }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 ${color} transition-transform duration-200 hover:scale-110`}
                aria-label={`Visit our ${label} page`}
              >
                <img
                  src={iconSrc}
                  alt={label}
                  className="w-7 h-7"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

// Reusable Contact Item Component
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
    <div className="flex items-center space-x-3 mb-3 group">
      <span className="text-gray-500 transition-colors duration-200 group-hover:text-blue-400">
        {icon}
      </span>
      <a
        href={href}
        className="text-sm text-gray-700 hover:text-blue-400 transition-colors duration-200"
        aria-label={text}
      >
        {text}
      </a>
    </div>
  );
}

// Type Definitions
type FooterPresentationProps = {
  company: {
    name: string;
    email: string;
    phone: string;
    description: string;
    copyright: string;
  };
  links: { label: string; path: string }[];
  socialLinks: { href: string; label: string; color: string; iconSrc: string }[];
};