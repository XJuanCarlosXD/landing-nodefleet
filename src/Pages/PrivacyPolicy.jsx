import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Collection of Personal Information",
      content: `We collect personally identifiable information, such as name, surname, email address, and 
      job title. If you make a purchase, we also collect billing and credit card information. 
      Additionally, we may collect anonymous demographic data, such as age, gender, and 
      location. Any information shared in public forums on Nodefleet may be viewed and used by 
      others.`,
    },
    {
      title: "2. Use of Information",
      content: `We use your information to operate our website, provide the requested products and 
      services, respond to inquiries, and offer customer support. We also use it to personalize 
      content, prevent fraud, and improve website functionality.`,
    },
    {
      title: "3. Disclosure of Information",
      content: `We do not sell your personal information. However, we may share it with trusted service 
      providers who assist us with operations such as customer support, marketing, and payment 
      processing. We may also disclose information as required by law or to protect our rights.`,
    },
    {
      title: "4. User Behavior Tracking",
      content: `We may track user behavior within our website to enhance our services and provide 
      personalized content.`,
    },
    {
      title: "5. Automatically Collected Information",
      content: `We automatically collect information about your device, such as IP address, browser type, 
      and visited pages, to improve the user experience.`,
    },
    {
      title: "6. Use of Cookies",
      content: `We use cookies to store information on your device and facilitate future visits. You can 
      manage or disable cookies in your browser settings, but this may affect site functionality.`,
    },
    {
      title: "7. Third-Party Links",
      content: `Our site may contain links to other websites. We are not responsible for their privacy 
      practices and recommend reading their policies before providing personal information.`,
    },
    {
      title: "8. Information Security",
      content: `We implement security measures such as encryption and firewalls to protect your 
      information. Although no system is completely secure, we continuously work to improve our 
      security practices.`,
    },
    {
      title: "9. Children's Information",
      content: `We do not knowingly collect information from children under 13 years old. If you are under 
      13, please obtain permission from a parent or guardian before using our services.`,
    },
    {
      title: "10. GDPR Compliance and International Transfers",
      content: `If you reside in the EU or the UK, your information may be transferred to other countries 
      with different privacy laws. We ensure that these transfers comply with applicable 
      regulations.`,
    },
    {
      title: "11. Your Rights",
      content: `You have the right to access, correct, delete, or restrict the processing of your personal 
      information. You can also request data portability and withdraw your consent at any time.`,
    },
    {
      title: "12. Data Retention",
      content: `We retain your information as long as necessary for the purposes described in this policy, 
      typically up to seven years. Thereafter, we delete or anonymize it unless required by law.`,
    },
    {
      title: "13. Email Communications",
      content: `We may send you emails with announcements, promotions, and other communications. You 
      can opt out at any time by clicking "Unsubscribe" in the emails.`,
    },
    {
      title: "14. Changes to the Privacy Policy",
      content: `We reserve the right to modify this policy at any time. We will notify significant changes via 
      email or by posting them on our site.`,
    },
  ];

  return (
    <div className="relative -mt-24">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <img
          src="https://appbot.nyc3.digitaloceanspaces.com/Landing_Nodefleet/home-lan.png"
          alt="home"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-morado1/50 to-morado2/90"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The future of web3 is{" "}
            <span className="text-green-300">private</span> and{" "}
            <span className="text-green-300">secure</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            At Nodefleet, we believe in a future where blockchain infrastructure
            is private, trustless, and censorship resistant.
          </p>
          <p className="text-lg text-gray-400 mt-4">
            Our mission is to help blockchain ecosystems scale while protecting
            your privacy.
          </p>
        </motion.div>
      </div>

      {/* Privacy Policy Content */}
      <div className="min-h-screen bg-gradient-to-b from-morado2 to-morado2 px-4 md:px-8 py-10">
        <motion.div
          className="max-w-4xl mx-auto bg-morado3/80 rounded-2xl p-6 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 mb-8">Last Updated: August 22, 2024</p>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-8">
              At Nodefleet, protecting your information is our priority. This
              Privacy Policy applies to Nodefleet and the products and services
              provided by Nodefleet, Inc. By using our website or products, you
              agree to the data practices described in this policy.
            </p>

            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-300">{section.content}</p>
              </motion.div>
            ))}

            <motion.div
              className="mt-12 border-t border-gray-700 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <p className="text-gray-300">
                If you have questions about this Privacy Policy, contact us
                through our website or email us at{" "}
                <a
                  href="mailto:nodes@nodefleet.net"
                  className="text-[#7a65d0] hover:text-[#5538ce] transition-colors"
                >
                  nodes@nodefleet.net
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
