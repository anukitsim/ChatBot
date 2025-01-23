// app/data/knowledgeBase.js

import React from "react";

const knowledgeBase = [
  {
    mainTopic: "Investment Options",
    description: "Explore various investment opportunities and financial benefits available in Georgia.",
    subtopics: [
      {
        subtopic: "Why Invest in Georgia?",
        response: [
          "Georgia is a growing investment hub with significant benefits for investors, including:",
          <ul key="1">
            <li><strong>Easy Business Environment:</strong> Ranked among the top 10 globally.</li>
            <li><strong>Tax Incentives:</strong> Minimal property tax and no capital gains tax after two years.</li>
            <li><strong>Residency Benefits:</strong> Invest over $100,000 USD to apply for permanent residency.</li>
          </ul>,
          "Learn more about investing in Georgia."
        ],
        followUpOptions: [
          { label: "Tell me about tax advantages.", target: "Tax Advantages for Investors" },
          { label: "View available properties.", target: "Available Properties" }
        ]
      },
      {
        subtopic: "Tax Advantages for Investors",
        response: [
          "Georgia offers one of the most investor-friendly tax systems:",
          <ul key="2">
            <li><strong>Property Tax:</strong> Up to 1%.</li>
            <li><strong>Corporate Profit Tax:</strong> 15%.</li>
            <li><strong>Income Tax:</strong> 1%, 5%, or 20% based on income levels.</li>
            <li><strong>Double Taxation Avoidance Agreements</strong> with 56 countries.</li>
          </ul>,
          "Explore Georgia’s tax advantages."
        ],
        followUpOptions: [
          { label: "How do I benefit from tax agreements?", target: "Tax Agreements Benefits" },
          { label: "Learn about exclusive investment events.", target: "Exclusive Investment Events" }
        ]
      },
      {
        subtopic: "Exclusive Investment Events",
        response: [
          "Join our upcoming events designed to connect investors globally:",
          <ul key="3">
            <li><strong>Brokers' Event:</strong> January 15, 2025, at Ritz Carlton, DIFC, Dubai.</li>
            <li><strong>Launch Event:</strong> January 28, 2025, at Grand Hyatt.</li>
          </ul>,
          <a href="#" key="4" target="_blank" rel="noopener noreferrer">Register for our next event here</a>
        ],
        followUpOptions: [
          { label: "Tell me about investing in Georgia.", target: "Why Invest in Georgia?" },
          { label: "Book a consultation with Mardi.", target: "Book a Consultation" }
        ]
      },
      {
        subtopic: "Book a Consultation",
        response: [
          "Let’s connect! Follow these steps to schedule a consultation:",
          <ol key="5">
            <li><strong>Visit our Contact Page.</strong></li>
            <li><strong>Fill in your details:</strong> name, email, phone number, and preferred time.</li>
            <li><strong>Select the topic of your interest</strong> (e.g., investment opportunities).</li>
            <li><strong>Submit the form,</strong> and our team will confirm your appointment.</li>
          </ol>,
          "You can also reach us directly:",
          <ul key="6">
            <li>📞 <strong>Phone:</strong> + (995) 574 20 20 20</li>
            <li>📧 <strong>Email:</strong> info@mardi.ge</li>
          </ul>
        ],
        followUpOptions: [
          { label: "Learn about available properties.", target: "Available Properties" },
          { label: "Explore tax advantages.", target: "Tax Advantages for Investors" }
        ]
      },
      {
        subtopic: "Available Properties",
        response: [
          "Here are the available properties for investment:",
          <ol key="7">
            <li><strong>Property A:</strong> Prime location with high ROI potential.</li>
            <li><strong>Property B:</strong> Luxury apartments in the heart of the city.</li>
          </ol>,
          <a href="#" key="8" target="_blank" rel="noopener noreferrer">Contact us</a>,
          "to learn more or schedule a viewing."
        ],
        followUpOptions: [
          { label: "Book a consultation with Mardi.", target: "Book a Consultation" },
          { label: "Tell me about tax advantages.", target: "Tax Advantages for Investors" }
        ]
      },
      {
        subtopic: "Tax Agreements Benefits",
        response: [
          "By benefiting from Georgia's double taxation agreements, you can:",
          <ul key="9">
            <li><strong>Avoid being taxed twice</strong> on the same income.</li>
            <li><strong>Reduce your overall tax burden.</strong></li>
            <li><strong>Streamline your financial planning.</strong></li>
          </ul>,
          <a href="#" key="10" target="_blank" rel="noopener noreferrer">Contact us</a>,
          "to learn how you can leverage these agreements for your investments."
        ],
        followUpOptions: [
          { label: "Learn about exclusive investment events.", target: "Exclusive Investment Events" },
          { label: "View available properties.", target: "Available Properties" }
        ]
      }
    ]
  },
  // ... (other main topics)
];

export default knowledgeBase;

