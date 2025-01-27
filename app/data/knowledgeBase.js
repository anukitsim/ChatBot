  import React from "react";

  const knowledgeBase = [
    {
      mainTopic: "Investment Options",
      description:
        "Explore investment opportunities, tax benefits, and exclusive events with Mardi Holding in Georgia.",
      subtopics: [
        {
          subtopic: "Tax Benefits for Investors",
          response: [
            "Georgia offers an investor-friendly tax environment with key benefits:",
            <ul key="1">
              <li>
                <strong>Property Tax:</strong> Starting as low as 1%, making
                Georgia one of the most affordable property markets in the region.
              </li>
              <li>
                <strong>Corporate Profit Tax:</strong> Flat 15%, with deferrals on
                reinvested profits to encourage business growth.
              </li>
              <li>
                <strong>Income Tax:</strong> Scaled rates of 1%, 5%, or 20%,
                tailored to income levels to accommodate diverse investors.
              </li>
              <li>
                <strong>Double Taxation Avoidance Agreements:</strong> Signed with
                56 countries, ensuring minimal tax burdens for foreign investors.
              </li>
            </ul>,
            "Learn more about Georgia's tax advantages by visiting our ",
            <a
              key="2"
              href="https://mardi.ge/for-investors/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Benefits of Doing Business in Georgia
            </a>,
            " page or viewing the ",
            <a
              key="3"
              href="https://mardi-holding-dubai-even-btqvqyx.gamma.site/"
              target="_blank"
              rel="noopener noreferrer"
            >
              comprehensive presentation
            </a>,
            ".",
            <br key="4" />,
            "For personalized guidance, ",
            <a
              key="5"
              href="https://mardi.ge/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact our team
            </a>,
            " or ",
            <a
              key="6"
              href="https://mardi.ge/for-investors/"
              target="_blank"
              rel="noopener noreferrer"
            >
              schedule an appointment
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Explore available investments.",
              target: "Available Investment Opportunities",
            },
          ],
        },

        {
          subtopic: "Available Investment Opportunities",
          response: [
            "Explore Mardi Holding's top investment opportunities in three key areas:",
            <ul key="investment-opportunities">
              <li>
                <strong>Luxury Apartments:</strong> High-end residential
                properties like{" "}
                <a
                  href="https://mardi.ge/novotel-living-batumi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Novotel Living Batumi
                </a>{" "}
                and Mardi AquaPark. Mardi AquaPark is currently under development,
                designed to offer future high ROI (Return on Investment) and
                premium living.
              </li>
              <li>
                <strong>Commercial Spaces:</strong> Strategic business locations
                such as Azure Batumi, offering offices, shops, and co-working
                areas tailored for professional success.
              </li>
              <li>
                <strong>Mixed-Use Developments:</strong> Dynamic projects like
                Mardi Business Bay and Mardi Mountain Wellness, blending
                residential, retail, and leisure facilities into vibrant
                communities.
              </li>
            </ul>,
            "To learn more about these opportunities, explore the following resources:",
            <ul key="resources-list">
              <li>
                <a
                  href="https://mardi-holding-dubai-even-btqvqyx.gamma.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Detailed Presentation
                </a>
              </li>
              <li>
                <a
                  href="https://mardi.ge/for-investors/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Investor Guide
                </a>{" "}
                (includes a booking option at the bottom of the page to schedule a
                consultation)
              </li>
              <li>
                <a
                  href="https://mardiinvest.ge/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Investment Website
                </a>
              </li>
            </ul>,
            "Contact us directly to discuss your investment goals or schedule a visit. Visit our ",
            <a
              key="contact-page-link"
              href="https://mardi.ge/for-investors/"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact page
            </a>,
            " to book an appointment or get in touch with our team.",
          ],
          followUpOptions: [
            {
              label: "Steps to start investing.",
              target: "Steps to Start Investing",
            },
          ],
        },

        {
          subtopic: "Steps to Start Investing",
          response: [
            "Getting started with Mardi Holding is simple and straightforward:",
            <ol key="4">
              <li>
                <strong>Contact Us:</strong> Schedule a consultation to discuss
                your goals. Visit the{" "}
                <a
                  href="https://mardi.ge/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Page
                </a>
                .
              </li>
              <li>
                <strong>Review Opportunities:</strong> Explore the available
                properties and projects based on your preferences.
              </li>
              <li>
                <strong>Select an Investment:</strong> Choose from options like
                fixed income or equity investments.
              </li>
              <li>
                <strong>Sign Agreements:</strong> Our team will guide you through
                the necessary legal and financial steps.
              </li>
              <li>
                <strong>Finalize Payments:</strong> Opt for a single payment or an
                interest-free installment plan.
              </li>
            </ol>,
            "If you're ready to start, ",
            <a
              key="7"
              href="https://mardi.ge/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact us today
            </a>,
            " for personalized support.",
          ],
          followUpOptions: [
            {
              label: "Explore tax benefits.",
              target: "Tax Benefits for Investors",
            },
          ],
        },
        {
          subtopic: "Exclusive Investor Events",
          response: [
            "Join Mardi Holding's exclusive events to network with global investors and explore premium opportunities:",
            <ul key="5">
              <li>
                <strong>Brokers' Event:</strong> January 15, 2025, Ritz Carlton,
                Dubai.
              </li>
              <li>
                <strong>Launch Event:</strong> January 28, 2025, Grand Hyatt.
              </li>
            </ul>,
            "Reserve your spot by visiting the ",
            <a
              key="8"
              href="https://mardiinvest.ge/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Events Page
            </a>,
            " or ",
            <a
              key="9"
              href="https://mardi.ge/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              contacting us
            </a>,
            " for more details.",
          ],
          followUpOptions: [
            {
              label: "Learn about available investments.",
              target: "Available Investment Opportunities",
            },
          ],
        },
      ],
    },

    {
      mainTopic: "Properties",
      description:
        "Explore details about available properties, features, and services designed for your convenience.",
      subtopics: [
        {
          subtopic: "Available Properties",
          response: [
            "Mardi Holding offers a selection of high-quality properties designed for modern living and investment:",
            <ul key="1">
              <li>
                <strong>Novotel Living Batumi:</strong> Luxury apartments with a
                beachfront location, infinity pools, and co-living spaces.
              </li>
              <li>
                <strong>Aquapark Residences:</strong> Family-oriented apartments
                featuring wellness facilities, swimming pools, and a water park.
              </li>
              <li>
                <strong>Mardi Hills:</strong> Spacious and sophisticated living
                spaces near Batumi’s main attractions.
              </li>
            </ul>,
            "Would you like to learn more about a specific property?",
          ],
          followUpOptions: [
            {
              label: "Tell me about Novotel Living Batumi.",
              target: "Novotel Living Batumi",
            },
            {
              label: "What are Aquapark Residences?",
              target: "Aquapark Residences",
            },
            { label: "I’m interested in Mardi Hills.", target: "Mardi Hills" },
          ],
        },
        {
          subtopic: "Novotel Living Batumi",
          response: [
            "Located near Batumi's beach, Novotel Living Batumi combines luxury and convenience with highlights such as:",
            <ul key="2">
              <li>Infinity rooftop pool and rooftop dining</li>
              <li>Co-living spaces for professionals and families</li>
              <li>
                Close proximity to Batumi Botanical Garden and Mtirala National
                Park
              </li>
            </ul>,
            "For more information, visit the ",
            <a
              key="3"
              href="https://mardi.ge/novotel-living-batumi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Novotel Living Batumi page
            </a>,
            " or contact our team to schedule a visit.",
          ],
          followUpOptions: [
            {
              label: "Explore Aquapark Residences.",
              target: "Aquapark Residences",
            },
            { label: "Learn about Mardi Hills.", target: "Mardi Hills" },
          ],
        },
        {
          subtopic: "Aquapark Residences",
          response: [
            "Aquapark Residences is designed for family-friendly living with unique amenities such as:",
            <ul key="3">
              <li>On-site water park and entertainment areas for children</li>
              <li>Wellness and spa facilities for relaxation</li>
              <li>Proximity to the Black Sea coast</li>
            </ul>,
            "Discover more on the ",
            <a
              key="4"
              href="https://mardi.ge/aquapark-residences/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aquapark Residences page
            </a>,
            " or schedule a consultation with our team.",
          ],
          followUpOptions: [
            { label: "What’s special about Mardi Hills?", target: "Mardi Hills" },
            {
              label: "View Novotel Living Batumi.",
              target: "Novotel Living Batumi",
            },
          ],
        },
        {
          subtopic: "Mardi Hills",
          response: [
            "Mardi Hills offers a blend of urban convenience and scenic beauty. Key features include:",
            <ul key="4">
              <li>Modern apartments with breathtaking views</li>
              <li>Gastronomic restaurants and wellness facilities</li>
              <li>Located near Batumi Boulevard and vibrant city attractions</li>
            </ul>,
            "For detailed information, visit the ",
            <a
              key="5"
              href="https://mardi.ge/mardi-hills/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mardi Hills page
            </a>,
            " or contact us to schedule a visit.",
          ],
          followUpOptions: [
            {
              label: "Learn about Aquapark Residences.",
              target: "Aquapark Residences",
            },
            {
              label: "Explore Novotel Living Batumi.",
              target: "Novotel Living Batumi",
            },
          ],
        },
        {
          subtopic: "Upcoming Projects",
          response: [
            "Discover Mardi Holding’s upcoming projects, redefining modern living and investment:",
            <ul key="5">
              <li>
                <strong>Georgian Mountain Wellness Retreat:</strong> A tranquil
                luxury escape (Q3 2025).
              </li>
              <li>
                <strong>Batumi Business Bay:</strong> A state-of-the-art business
                hub (Q4 2025).
              </li>
              <li>
                <strong>Mardi Residential:</strong> Stylish apartments designed
                for comfort and elegance (Q3 2025).
              </li>
            </ul>,
            "For more details, contact our team to discuss opportunities.",
          ],
          followUpOptions: [
            {
              label: "Learn about investment opportunities.",
              target: "Investment Options",
            },
            {
              label: "Explore Aquapark Residences.",
              target: "Aquapark Residences",
            },
          ],
        },
        {
          subtopic: "Schedule a Visit",
          response: [
            "Let us help you explore our properties in person. Here’s how you can schedule a visit:",
            <ol key="6">
              <li>
                Visit our ",
                <a
                  href="https://mardi.ge/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact page
                </a>
                , " and fill out the form with your preferred property and date.
              </li>
              <li>
                Our team will confirm your appointment and provide additional
                details.
              </li>
            </ol>,
            "Alternatively, reach us directly at +995 574 20 20 20 or email us at ",
            <a
              href="mailto:info@mardi.ge"
              target="_blank"
              rel="noopener noreferrer"
            >
              info@mardi.ge
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Learn about available properties.",
              target: "Available Properties",
            },
            { label: "Explore upcoming projects.", target: "Upcoming Projects" },
          ],
        },
      ],
      internalSubtopics: {},
    },

    {
      mainTopic: "Buying Process",
      description:
        "Guidance on the property purchase process for local and international buyers.",
      subtopics: [
        {
          subtopic: "Steps to Purchase a Property",
          response: [
            "The property purchase process with Mardi Holding is designed to be seamless and efficient:",
            <ol key="1">
              <li>
                <strong>Initial Consultation:</strong> Reach out to discuss your
                property needs. Visit the{" "}
                <a
                  href="https://mardi.ge/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Page
                </a>{" "}
                to get started.
              </li>
              <li>
                <strong>Property Selection:</strong> Choose a property after
                reviewing our options. You can schedule a virtual or in-person
                visit.
              </li>
              <li>
                <strong>Agreement Preparation:</strong> Our team prepares a
                bilingual purchase agreement tailored to your needs.
              </li>
              <li>
                <strong>Payment:</strong> Opt for a single payment or an
                installment plan with a 30% down payment.
              </li>
              <li>
                <strong>Registration:</strong> Mardi Holding ensures your property
                is registered with all legal formalities.
              </li>
              <li>
                <strong>Handover:</strong> Receive the keys and documents to
                officially take possession of your new property.
              </li>
            </ol>,
            "For personalized assistance, visit the ",
            <a
              href="https://mardi.ge/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Page
            </a>,
            " or call us at +995 574 20 20 20.",
          ],
          followUpOptions: [
            {
              label: "Learn about payment options.",
              target: "Payment Options",
            },
            {
              label: "View available properties.",
              target: "Available Properties",
            },
          ],
        },
        {
          subtopic: "Payment Options",
          response: [
            "Mardi Holding provides flexible payment options to suit various buyers:",
            <ul key="2">
              <li>
                <strong>Single Payment:</strong> Offers a 5% discount on the total
                property price.
              </li>
              <li>
                <strong>Installment Plan:</strong> Interest-free installment plans
                up to 36 months with a 30% down payment.
              </li>
            </ul>,
            "For more information, contact our team at +995 574 20 20 20 or visit the ",
            <a
              href="https://mardi.ge/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Page
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "How does the registration process work?",
              target: "Property Registration",
            },
            {
              label: "Explore properties.",
              target: "Available Properties",
            },
          ],
        },
        {
          subtopic: "Property Registration",
          response: [
            "Mardi Holding handles the entire registration process for your property:",
            <ul key="3">
              <li>
                <strong>Legal Support:</strong> Assistance with notarization and
                submission of documents.
              </li>
              <li>
                <strong>Registration Confirmation:</strong> Property is officially
                recorded in your name in Georgia's public registry.
              </li>
            </ul>,
            "To get started, visit the ",
            <a
              href="https://mardi.ge/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Page
            </a>,
            " or call us at +995 574 20 20 20.",
          ],
          followUpOptions: [
            {
              label: "Learn about foreign buyer guidance.",
              target: "For Foreign Buyers",
            },
            {
              label: "Steps to purchase a property.",
              target: "Steps to Purchase a Property",
            },
          ],
        },
        {
          subtopic: "For Foreign Buyers",
          response: [
            "Mardi Holding provides dedicated support for international buyers to ensure a smooth process:",
            <ul key="4">
              <li>
                <strong>Residency Benefits:</strong> Real estate investments over
                $100,000 USD may qualify you for temporary residency.
              </li>
              <li>
                <strong>Language Support:</strong> Purchase agreements are
                bilingual (Georgian and your preferred language).
              </li>
              <li>
                <strong>Ownership Rules:</strong> Foreign citizens are eligible to
                buy real estate, except agricultural land.
              </li>
              <li>
                <strong>Remote Buying:</strong> Legal documents can be notarized
                remotely if you cannot travel to Georgia.
              </li>
            </ul>,
            "For additional guidance, please visit our ",
            <a
              href="https://mardi.ge/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Page
            </a>,
            " or email us at ",
            <a
              href="mailto:info@mardi.ge"
              target="_blank"
              rel="noopener noreferrer"
            >
              info@mardi.ge
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Learn about payment options.",
              target: "Payment Options",
            },
            {
              label: "Steps to purchase a property.",
              target: "Steps to Purchase a Property",
            },
          ],
        },
      ],
      internalSubtopics: {},
    },
    {
      mainTopic: "Mardi Ventures",
      description: "Exploring the company’s diverse ventures beyond real estate.",
      subtopics: [
        {
          subtopic: "Mardi Comfort",
          response: [
            "Mardi Comfort is the hospitality subsidiary of Mardi Holding, focusing on managing hotels and tourism-related ventures across Georgia.",
            <ul key="1">
              <li>
                Aims to provide premium accommodations and services for tourists
                and residents alike.
              </li>
              <li>
                Upcoming projects include boutique hotels and modern tourism
                infrastructure.
              </li>
            </ul>,
            "For updates, visit the ",
            <a
              href="https://mardi.ge/mardi-comfort/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Mardi Comfort page
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Learn about Mardi Travel Lab.",
              target: "Mardi Travel Lab",
            },
            { label: "Explore Mardi Energy projects.", target: "Mardi Energy" },
          ],
        },
        {
          subtopic: "Mardi Energy",
          response: [
            "Mardi Energy leads the way in sustainable energy projects with innovative solutions:",
            <ul key="2">
              <li>
                <strong>Hydropower:</strong> Leveraging Georgia's natural
                resources to develop eco-friendly energy solutions.
              </li>
              <li>
                <strong>Future Expansion:</strong> Plans for solar and wind energy
                projects to promote sustainability.
              </li>
            </ul>,
            "Learn more by visiting the ",
            <a
              href="https://mardi.ge/mardi-energy/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Mardi Energy page
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Discover Adjarian Wine House.",
              target: "Adjarian Wine House",
            },
            { label: "Explore Mardi Comfort.", target: "Mardi Comfort" },
          ],
        },
        {
          subtopic: "Mardi Investment",
          response: [
            "Mardi Investment offers tailored opportunities for property and business investments:",
            <ul key="3">
              <li>
                Access to premium properties and commercial spaces in prime
                locations.
              </li>
              <li>
                Professional guidance for local and international investors.
              </li>
              <li>
                Focus on maximizing returns and delivering high-quality assets.
              </li>
            </ul>,
            "For detailed investment opportunities, visit the ",
            <a
              href="https://mardiinvest.ge/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Mardi Investment website
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Learn about Adjarian Wine House.",
              target: "Adjarian Wine House",
            },
            {
              label: "View Mardi Travel Lab projects.",
              target: "Mardi Travel Lab",
            },
          ],
        },
        {
          subtopic: "Adjarian Wine House",
          response: [
            "Adjarian Wine House celebrates Georgia’s rich winemaking heritage:",
            <ul key="4">
              <li>Produces premium wines using traditional Georgian methods.</li>
              <li>
                Offers wine-tasting experiences and guided tours at its
                state-of-the-art facilities.
              </li>
              <li>
                Highlights Georgia's diverse wine culture with an emphasis on
                authenticity and quality.
              </li>
            </ul>,
            "For more details, visit the ",
            <a
              href="https://awh.ge/ka/about"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Adjarian Wine House website
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Explore Mardi Energy initiatives.",
              target: "Mardi Energy",
            },
            {
              label: "Learn about Mardi Travel Lab.",
              target: "Mardi Travel Lab",
            },
          ],
        },
        {
          subtopic: "Mardi Travel Lab",
          response: [
            "Mardi Travel Lab offers curated tourism experiences that showcase Georgia's unique culture and landscapes:",
            <ul key="5">
              <li>
                <strong>Adventure Tours:</strong> Trekking, rafting, and more for
                thrill-seekers.
              </li>
              <li>
                <strong>Cultural Immersion:</strong> Discover Georgia's ancient
                traditions and modern lifestyle.
              </li>
              <li>
                <strong>Leisure Travel:</strong> Tailored packages for a relaxed
                and luxurious getaway.
              </li>
            </ul>,
            "To learn more or book a tour, visit the ",
            <a
              href="https://travelab.ge/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Mardi Travel Lab website
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Learn about Mardi Investment.",
              target: "Mardi Investment",
            },
            {
              label: "Explore Adjarian Wine House.",
              target: "Adjarian Wine House",
            },
          ],
        },
      ],
    },

    {
      mainTopic: "Contact & Support",
      description: "Quick access to connect with Mardi Holding representatives.",
      subtopics: [
        {
          subtopic: "How to Reach Us",
          response: [
            "You can easily get in touch with Mardi Holding via the following methods:",
            <ul key="1">
              <li>
                <strong>Phone:</strong> + (995) 574 20 20 20
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@mardi.ge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  info@mardi.ge
                </a>
              </li>
            </ul>,
            "For more information, visit our ",
            <a
              key="2"
              href="https://mardi.ge/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Page
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Visit the contact page.",
              target: "Visit Contact Page",
            },
          ],
        },
        {
          subtopic: "Office Locations",
          response: [
            "Visit our offices in Georgia or Dubai:",
            <ul key="3">
              <li>
                <strong>Georgia:</strong> Egnate Ninoshvili Street, 6
              </li>
              <li>
                <strong>Dubai:</strong> 1102-1104 Bay View Tower, Business Bay
              </li>
            </ul>,
            "Need directions? Check our ",
            <a
              key="4"
              href="https://mardi.ge/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Page
            </a>,
            ".",
          ],
          followUpOptions: [
            {
              label: "Call or email us.",
              target: "How to Reach Us",
            },
          ],
        },
      ],
    },
  ];

  export default knowledgeBase;
