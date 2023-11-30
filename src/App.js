import "./App.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useEffect, useState, useRef } from "react";
import logoImg from "./assets/logo192.png";
import { Chart } from "chart.js";
import ColumnChart from "./ColumnChart";
import {
  logoImage,
  measureImg,
  AimImg,
  reduceImg,
  offsetImg,
  communicateImg,
  complyImg,
  childrensImg,
  carbonOffsetLogo,
  childrenWithWater,
  nature,
  groupPhoto,
} from "./base64images/images";

// import { generateChartImage } from "recharts-to-image";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// let pieChartImage = null; // Declare outside the component

// export function createPieChart(data, options) {
//   const canvas = document.createElement("canvas");
//   canvas.width = options.width || 400;
//   canvas.height = options.height || 400;

//   new Chart(canvas.getContext("2d"), {
//     type: "pie",
//     data: {
//       labels: data.labels,
//       datasets: [
//         {
//           data: data.values,
//           backgroundColor: options.colors || ["#FF6384", "#36A2EB", "#FFCE56"],
//         },
//       ],
//     },
//     options: options.chartOptions || {},
//   });

//   return new Promise((resolve, reject) => {
//     if (options.returnAsBlob) {
//       canvas.toBlob((blob) => resolve(blob));
//     } else {
//       resolve(canvas.toDataURL());
//     }
//   });
// }

function App() {
  const [chartImage, setChartImage] = useState(null);

  // Your images dictionary

  // const generateImage = async () => {
  //   const image = await generateChartImage(<ColumnChart />);
  //   setChartImage(image);
  // };

  const red = "#FFC0CB"; // Light Red color
  const green = "#00FF00"; // Green color

  const docDefinition = {
    content: [
      {
        columns: [
          {
            text: "Measured - You have completed the first step of your Carbon Footprint Journey",
            style: "header",
            margin: [0, 15, 0, 0],
            fontSize: 10,
          },
          {
            image: logoImage,
            width: 100, // Adjust the width of the image as needed
            alignment: "right",
          },
        ],
      },
      {
        columns: [
          {
            image: measureImg,
            width: 80,
            height: 100,
          },
          {
            image: AimImg,
            width: 80,
            height: 100,
          },
          {
            image: reduceImg,
            width: 80,
            height: 100,
          },
          {
            image: offsetImg,
            width: 80,
            height: 100,
          },
          {
            image: communicateImg,
            width: 80,
            height: 100,
          },
          {
            image: complyImg,
            width: 80,
            height: 100,
          },
        ],
      },
      {
        columns: [
          {
            text: "CFP Self Assessed",
            margin: [0, 30, 0, 0],
            style: "largeTextCol3",
          },
        ],
      },
      {
        columns: [{ text: "Carbon Footprint", style: "largeTextCol3" }],
      },
      {
        columns: [{ text: "Results & Recommendation", style: "largeTextCol3" }],
      },
      {
        columns: [
          {
            style: "tableExample",
            table: {
              widths: [100, 100],
              heights: 20,

              body: [
                ["Company Name", "CFP"],
                ["Data entered by", "MH"],
                ["Number of employees", "15"],
                ["Date period", "not specified"],
              ],
            },
          },
        ],
      },
      //   {
      //     columns: [
      //       {
      //         style: "pieChart",
      //         image: pieChartImage,
      //       },
      //     ],
      //   },
      {
        columns: [
          {
            style: "pieDescriptionText",
            text: "Your total carbon footprint is 10.6 tonnes C02e \n Carbon intensity (tonnes CO /employees) = 0.7 \n Read on for your full report & recommendations",
          },
        ],
      },
      {
        columns: [
          {
            text: "To achieve Net Zero now, your organisation needs to adapt a carbon management process in the following order:",
            style: "cbfListPage1",
          },
        ],
      },
      {
        columns: [
          {
            style: "cbfListPage1",
            ol: [
              "Measure- Assess your organisation’s footprint (If you are reading this report you have already made the first step).",
              "Carbon Offset- compensate for the damage already done.",
              "Reduce emissions in-house- reduce your footprint to decrease the amount of offsetting needed and your ongoing emissions.",
            ],
          },
        ],
      },
      {
        columns: [
          {
            // fillColor: "#f2f2f2", // Light gray background color
            columns: [
              {
                width: "70%", // Adjust the width as needed
                stack: [
                  "Carbon Neutrality - For CFP",
                  "Become Carbon Neutral now from just £95.68",
                  "Offset your businesses’ emissions now at:",
                  {
                    text: "www.carbonfootprint.com/offset=10.6",
                    link: "http://www.carbonfootprint.com/offset=10.6",
                    color: "blue", // You can customize the color if needed
                  },
                  {
                    text: "If your emissions are above 100 tonnes CO please ",
                  },
                  {
                    text: "Contact us",
                    link: "mailto:your-email@example.com", // Add your email address here
                    color: "blue", // You can customize the color if needed
                  },
                  {
                    text: ` for a personalised offsetting proposal.`,
                  },
                ],
                margin: [10, 10, 10, 10], // Adjust margins as needed
              },

              {
                image: childrensImg,
                width: 180,
                height: 130,
                alignment: "right",
                margin: [10, 10, 10, 10], // Adjust margins as needed
              },
            ],
            pageBreak: "before",
          },
        ],
      },
      {
        stack: [
          {
            text: `Carbon Offsetting funds the solution to the climate emergency by:
          `,
          },
          {
            ul: [
              ` Decarbonising national grids (for renewable energy projects)
                `,
              ` Reducing emissions (via avoided deforestation projects - e.g. protecting the Amazon)
                `,
              ` Enabling more efficient/greener energy use (e.g. cookstoves projects)
              `,
            ],
          },
          {
            text: [
              "Carbon offseting projects, which are commonly large-scale decarbonisation projects that deliver crucial emissions reductions around the globe are often found in developing countries where they have added social, educational and economic benefits. Moreover, climate change is a global issue (1 tonne CO2 in Manchester is the same as 1 tonne CO2 in Mumbai).",
            ],
          },
          {
            text: "www.carbonfootprint.com/carbonoffsetprojects.html",
            link: "http://www.carbonfootprint.com/carbonoffsetprojects.html", // Add the URL here
            margin: [100, 5, 0, 5],
            color: "blue", // You can customize the color if needed
          },
        ],
      },
      {
        absolutePosition: { x: 0, y: 780 },
        columns: [
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 600, // Adjust the width of the line as needed
                y2: 0,
                lineWidth: 0.5, // Adjust the line thickness as needed
              },
            ],
          },
          //   {
          //     text: "CBF self Assessed Carbon Footprint",
          //     style: "pageEndingText", // Define the style for the page number text
          //     absolutePosition: { x: 10, y: 790 }, // Adjust the y-coordinate as needed
          //   },
          //   {
          //     text: "Page 1 of 7",
          //     style: "pageNumber", // Define the style for the page number text
          //     absolutePosition: { x: 490, y: 790 }, // Adjust the y-coordinate as needed
          //   },
        ],
      },
      {
        pageBreak: "before",
        margin: [0, 10, 0, 40],
        columns: [
          {
            columns: [
              {
                text: "Measured - You have completed the first step of your Carbon Footprint Journey",
                style: "header",
                margin: [0, 10, 0, 0],
              },
              {
                image: logoImage,
                width: 50, // Adjust the width of the image as needed
                alignment: "right",
              },
            ],
          },
        ],
      },
      {
        columns: [
          {
            text: `Your Carbon Footprint Report & Carbon Management Journey
        `,
            style: "carbonManagementJourney",
          },
        ],
      },
      {
        columns: [
          {
            text: `Congratulations - you have completed the responsible first step of the 6 stage carbon management journey.
                   Best practice is to complete the following stages on a 12-month cyclical basis.`,
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        columns: [
          {
            image: measureImg,
            width: 80,
            height: 100,
          },
          {
            image: AimImg,
            width: 80,
            height: 100,
          },
          {
            image: reduceImg,
            width: 80,
            height: 100,
          },
          {
            image: offsetImg,
            width: 80,
            height: 100,
          },
          {
            image: communicateImg,
            width: 80,
            height: 100,
          },
          {
            image: complyImg,
            width: 80,
            height: 100,
          },
        ],
      },
      {
        margin: [0, 50],
        stack: [
          {
            text: `The purpose of this report is to`,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          {
            ul: [
              " Summarise your results ",
              " Provide some tips for how you can set aims for your carbon management",
              " Help you to set a realistic carbon reduction target",
              " Suggest carbon offsetting to render your organization carbon neutral",
              " Work out the best way to communicate your carbon management/carbon neutrality internally and externally for your business’s benefit",
              " Comply with either legislative or supply chain requirements",
            ],
          },
        ],
      },
      {
        columns: [
          { image: measureImg, width: 60, height: 80 },
          {
            text: `Measure - Results`,
            margin: [30, 20],
            color: "#47b5a3",
            fontSize: 18,
            bold: true,
          },
        ],
      },
      {
        columns: [
          {
            text: "The data you have entered into the calculator is shown on the next page",
            margin: [0, 20],
          },
        ],
      },
      {
        pageBreak: "before",
        columns: [
          {
            text: "Measured - You have completed the first step of your Carbon Footprint Journey",
            style: "header",
            margin: [0, 10, 0, 30],
          },
          {
            image: logoImage,
            width: 50, // Adjust the width of the image as needed
            alignment: "right",
          },
        ],
      },
      {
        columns: [
          {
            text: "Buildings",
            bold: true,
            fontSize: 14,
          },
        ],
      },
      {
        margin: [0, 5, 0, 10],
        columns: [
          {
            columns: [
              {
                stack: [
                  { text: "Tonnes of CO2e", bold: true },
                  { text: "0.0", style: "content" },
                  { text: "0.0", bold: true },
                ],
                width: "20%", // Adjust the width as needed
              },
              {
                stack: [
                  { text: "Energy Type", bold: true },
                  { text: "(no data supplied)", style: "content" },
                  {
                    text: "Total building emissions footprint",
                    bold: true,
                  },
                ],
                width: "60%", // Adjust the width as needed
              },
            ],
          },
        ],
      },
      {
        columns: [
          {
            text: "flights",
            bold: true,
            fontSize: 14,
          },
        ],
      },
      {
        margin: [0, 5, 0, 10],

        columns: [
          {
            columns: [
              {
                stack: [
                  { text: "Tonnes of CO2e", bold: true },
                  { text: "0.0", style: "content" },
                  { text: "0.0", bold: true },
                ],
                width: "20%", // Adjust the width as needed
              },
              {
                stack: [
                  { text: "Energy Type", bold: true },
                  { text: "(no data supplied)", style: "content" },
                  {
                    text: "Total building emissions footprint",
                    bold: true,
                  },
                ],
                width: "60%", // Adjust the width as needed
              },
            ],
          },
        ],
      },
      {
        columns: [
          {
            text: "Cars and Vans",
            bold: true,
            fontSize: 14,
          },
        ],
      },
      {
        margin: [0, 5, 0, 10],

        columns: [
          {
            columns: [
              {
                stack: [
                  { text: "Tonnes of CO2e", bold: true },
                  { text: "0.0", style: "content" },
                  { text: "0.0", bold: true },
                ],
                width: "20%", // Adjust the width as needed
              },
              {
                stack: [
                  { text: "Energy Type", bold: true },
                  { text: "(no data supplied)", style: "content" },
                  {
                    text: "Total building emissions footprint",
                    bold: true,
                  },
                ],
                width: "60%", // Adjust the width as needed
              },
            ],
          },
        ],
      },
      {
        columns: [
          {
            text: "Vehicle Fuel",
            bold: true,
            fontSize: 14,
          },
        ],
      },
      {
        margin: [0, 5, 0, 10],

        columns: [
          {
            columns: [
              {
                stack: [
                  { text: "Tonnes of CO2e", bold: true },
                  { text: "0.0", style: "content" },
                  { text: "0.0", bold: true },
                ],
                width: "20%", // Adjust the width as needed
              },
              {
                stack: [
                  { text: "Energy Type", bold: true },
                  { text: "(no data supplied)", style: "content" },
                  {
                    text: "Total building emissions footprint",
                    bold: true,
                  },
                ],
                width: "60%", // Adjust the width as needed
              },
            ],
          },
        ],
      },
      {
        margin: [0, 5, 0, 10],

        columns: [
          {
            text: "Bus and Rail",
            bold: true,
            fontSize: 14,
          },
        ],
      },
      {
        margin: [0, 5, 0, 10],

        columns: [
          {
            columns: [
              {
                stack: [
                  { text: "Tonnes of CO2e", bold: true },
                  { text: "0.0", style: "content" },
                  { text: "0.0", bold: true },
                ],
                width: "20%", // Adjust the width as needed
              },
              {
                stack: [
                  { text: "Energy Type", bold: true },
                  { text: "(no data supplied)", style: "content" },
                  {
                    text: "Total building emissions footprint",
                    bold: true,
                  },
                ],
                width: "60%", // Adjust the width as needed
              },
            ],
          },
        ],
      },
      {
        pageBreak: "before",
        columns: [
          {
            text: "Measured - You have completed the first step of your Carbon Footprint Journey",
            style: "header",
            margin: [0, 10, 0, 30],
          },
          {
            image: logoImage,
            width: 50, // Adjust the width of the image as needed
            alignment: "right",
          },
        ],
      },
      {
        columns: [
          {
            text: `The results have been calculated automatically using DEFRA and other internationally recognised metrics. Datasets have been entered entirely by the client and no checking has been done by CarbonFootprint Ltd as to validity or completeness of the dataset. To have confidence in your results, particularly if you need to report to your supply chain/stakeholders or to promote in your markets, we strongly recommend you commission us to complete a Carbon Footprint Verification.`,
          },
        ],
      },
      {
        text: `How good are these results?`,
        margin: [0, 5, 0, 5],
        fontSize: 18,
        bold: true,
      },
      {
        margin: [0, 10],
        stack: [
          {
            text: `Office administration based organisations generally have a carbon footprint of between 2 and 5 tonnes per employee.`,
          },
          {
            text: `High energy businesses such as manufacturing and those with very high travel/transport usage (e.g. logistics, waste management) will have a much higher footprint at around 10-30 tonnes per employee.`,
            margin: [0, 10, 0, 10],
          },
          {
            text: `Here's how your carbon footprint compares:
          `,
          },
        ],
      },
      {
        columns: [{ text: "column chart" }],
      },
      {
        margin: [0, 20, 0, 10],
        columns: [
          {
            stack: [{ image: AimImg, width: 60, height: 80 }],
          },
          {
            text: "Aim - Setting realistic goal",
            margin: [-150, 30],
            color: "#47b5a3",
          },
        ],
      },
      {
        stack: [
          {
            text: "Reducing your carbon emissions can save you money and reduce your impact on climate change.",
            margin: [0, 5, 0, 5],
          },
          {
            text: "Now that you have completed your Carbon Footprint, you should consider setting Suitable Measurable Achievable Realistic and Time-bound (SMART) targets to help achieve these reductions. A few key points and resources to consider are:",
            margin: [0, 5, 0, 5],
          },
          {
            margin: [0, 5, 0, 5],
            ul: [
              `Setting up a Carbon Management Plan - the old adage applies here - 'fail to plan - plan to fail'.`,
              `Achieving easy carbon reduction first - even if these actions may yield only small results, these are psychologically important and will help your organization to get a 'taste' of success and develop a culture that enables you to tackle the bigger reduction opportunities.`,
              `Get quantitative - use our Energy Efficiency Test to work out your capacity to save. Find it at`,
              {
                text: `www.carbonfootprint.com/energy_efficiency_test.html`,
                link: "http://www.carbonfootprint.com/energy_efficiency_test.html", // Add the URL here
                color: "blue", // You can customize the color if needed
              },
              `Be realistic - if your target is dependent on a massive capex that has yet to be signed or on a large cultural shift, you may want to be more conservative with your aims.`,
            ],
          },
        ],
      },
      {
        pageBreak: "before",
        columns: [
          {
            text: "Measured - You have completed the first step of your Carbon Footprint Journey",
            style: "header",
            margin: [0, 10, 0, 0],
          },
          {
            image: logoImage,
            width: 50, // Adjust the width of the image as needed
            alignment: "right",
          },
        ],
      },
      {
        margin: [0, 20, 0, 10],
        columns: [
          {
            stack: [{ image: reduceImg, width: 60, height: 80 }],
          },
          {
            text: "Reduce - How to make it work and stay working",
            margin: [-170, 30],
            color: "#47b5a3",
          },
        ],
      },
      {
        stack: [
          {
            text: `Once your targets are set, you will need to implement suitable methods to reach them.
      `,
          },
          {
            text: [
              "You will probably be heavily reliant on the actions of your teams for reductions to be achieved. Awareness campaigns including the use of tools such as informative posters and 'Lunch and Learn' sessions can help motivate such behavioral changes. ",
              {
                text: "Contact us",
                link: "mailto:your-email@example.com", // Add your email address here
                color: "blue", // You can customize the color if needed
              },
              ".",
            ],
          },
          {
            text: `Rather than relying on a volunteer committee and carbon champions, make your scheme more official by
          giving specific team members ownership of the reductions and placing the targets in their KPIs.
          `,
          },
          {
            text: `Celebrate successes with your staff when they occur and be clear on the difference and value this brings
          to the business. (Also see Communicate section).`,
          },
        ],
      },
      {
        margin: [0, 20, 0, 10],
        columns: [
          {
            stack: [{ image: offsetImg, width: 60, height: 80 }],
          },
          {
            text: `Offset - Compensate carbon emissions you cannot reasonably reduce
            `,
            color: "#47b5a3",
            margin: [-170, 30],
          },
        ],
      },
      {
        columns: [
          {
            text: `Carbon offsetting can render your organization carbon neutral - but it's
            much more than that. External programmes such as CDP (formerly Carbon Disclosure Project) award extra points for carbon offsetting organisations and offsetting is positively looked upon within sales tender/PQQs.

            Carbon offsetting also frequently supports broader CSR and community outreach programmes. However, we only advocate carbon offsetting if you also have a carbon measurement and carbon reduction plan.          
            `,
          },
          { image: carbonOffsetLogo, width: 140, height: 150 },
        ],
      },
      {
        columns: [
          {
            text: [
              "The cost to offset your carbon emissions is likely to be very small compared with your energy costs (frequently it's less than 2% of the spend) and much easier to implement compared with a behavior change program. We offer a range of projects for you to choose from which support biodiversity, provide habitats for endangered species and support developing communities Reforestation and avoided deforestation carbon offset programs are hugely popular as they tackle one of the most potent threats to our planet. (Visit ",
              {
                text: "www.carbonfootprint.com/deforestation.html",
                link: "http://www.carbonfootprint.com/deforestation.html", // Add the URL here
                color: "blue", // You can customize the color if needed
              },
              " for more information). However, we also have more community and energy-focused projects.",
            ],
          },
        ],
      },
      {
        pageBreak: "before",
        columns: [
          {
            text: "Measured - You have completed the first step of your Carbon Footprint Journey",
            style: "header",
            margin: [0, 10, 0, 30],
          },
          {
            image: logoImage,
            width: 50, // Adjust the width of the image as needed
            alignment: "right",
          },
        ],
      },
      {
        columns: [
          { image: groupPhoto, width: 180, height: 160 },
          { image: nature, height: 160, width: 180 },
          { image: childrenWithWater, height: 160, width: 180 },
        ],
      },
      {
        stack: [
          {
            text: `Sample Carbon Offsetting Projects - UK Schools Tree Planting - Amazon Avoided Deforestation, Brazil - Clean Water projects, Rwanda
        `,
            fontSize: 9,
          },
          {
            text: [
              "The offsetting process is simple and straightforward - just visit ",
              {
                text: "www.carbonfootprint.com/carbonoffset.html",
                link: "http://www.carbonfootprint.com/carbonoffset.html", // Add the URL here
                color: "blue", // You can customize the color if needed
              },
              " and type in your CO tonnage (from the front page of this report) and this will show you the latest range of projects and their pricings. Certification is available to download online.",
            ],
          },
        ],
      },
      {
        margin: [0, 20, 0, 10],
        columns: [
          {
            stack: [{ image: communicateImg, width: 60, height: 80 }],
          },
          {
            stack: [
              {
                text: `Communicate - Internally & Externally`,
                margin: [-150, 30, 0, 0],
                color: "#47b5a3",
              },
              {
                text: `Make sure you communicate your actions & achievements effectively, both within your
                organisation, to help develop your culture and externally to help improve your brand image.`,
                margin: [-150, 5, 0, 0],
              },
            ],
          },
        ],
      },
      {
        text: `When promoting externally be sure to promote your actions via all marketing channels
      available to you - such as web-site, newsletters, brochures, press releases, conferences/events and social media etc. Ensure to:`,
        margin: [0, 0, 0, 5],
      },
      {
        ul: [
          `Explain why climate change matters to you (visit www.carbonfootprint.com/warning.html for more
            information)
            `,
          `Be clear and accurate about what you've done
        `,
          ` Don't be tempted to exaggerate - this sector hates "green-wash" even if it's unintentional
          `,
          ` Evidence - use pictures more than words. Certificates, images of offset projects you are
          supporting and graphs of your carbon performance, all of which we can supply, can help
          communicate your point in a clearer and more enticing manner
          `,
          ` Tell a story - show where you have come from, the progress you have made and what your
          commitment is for the future
          `,
        ],
      },
      {
        text: `When promoting internally, ensure to:
      `,
      },
      {
        ul: [
          `Explain Climate Change & Why it matters (visit for more www.carbonfootprint,com/warning.html
            for more information)
            `,
          ` Get people involved (Also see Reduce section)

        `,
        ],
      },
      {
        pageBreak: "before",
        columns: [
          {
            text: "Measured - You have completed the first step of your Carbon Footprint Journey",
            style: "header",
            margin: [0, 10, 0, 0],
          },
          {
            image: logoImage,
            width: 50, // Adjust the width of the image as needed
            alignment: "right",
          },
        ],
      },

      {
        margin: [0, 20, 0, 10],
        columns: [
          {
            stack: [{ image: complyImg, width: 60, height: 80 }],
          },
          {
            text: `Comply - legislation and best practise
            `,
            color: "#47b5a3",
            margin: [-170, 30],
          },
        ],
      },
      {
        stack: [
          {
            text: `Make sure you do adhere to relevant legislation/supply chain needs. These may vary dependent on your location and the markets that you serve. We support businesses with compliance to a range of schemes, such as Streamlined Energy and Carbon Reporting (SECR), Carbon Reduction Commitment (CRC) and CDPs as well as ISO and OHSAS standards.
        `,
          },
          {
            text: [
              "Please review our compliance pages at ",
              {
                text: "www.carbonfootprint.com/compliance.html",
                link: "http://www.carbonfootprint.com/compliance.html",
                color: "blue",
              },
              " for more information.",
            ],
            margin: [0, 0, 0, 10],
          },
          {
            text: [
              "Keep up to date on law and best practice. ",
              {
                text: "Contact us",
                link: "mailto:your-email@example.com", // Add your email address here
                color: "blue", // You can customize the color if needed
              },
              " to subscribe to our newsletters for regular updates.",
            ],
          },
          {
            text: `You have completed your carbon footprint calculation and have begun your carbon management journey. In doing so you are differentiating your business whilst doing your bit to combat climate change. Carbon Footprint is proud to assist companies along this journey to help reduce the impact on the environment and ensure high business standards.`,
          },
          {
            text: [
              "For further assistance or information on our other services, please or visit our website at ",
              {
                text: "www.carbonfootprint.com",
                link: "http://www.carbonfootprint.com", // Add the URL here
                color: "blue", // You can customize the color if needed
              },
            ],
          },
        ],
      },
    ],

    styles: {
      header: {
        fontSize: 12,
        bold: false,
      },
      anotherStyle: {
        italics: true,
        alignment: "right",
      },
      largeTextCol3: {
        fontSize: 28,
        bold: true,
      },
      tableExample: {
        margin: [150, 30],
        alignment: "center",
      },
      pieChart: {
        margin: [150, 0],
      },
      pieDescriptionText: {
        margin: [110, 20, 0, 20],
        fontSize: 15,
      },
      cbfListPage1: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 0],
      },
      pageEndingText: {
        margin: [],
      },
      carbonManagementJourney: {
        bold: true,
        fontSize: 15,
      },
    },
  };
  const [url, setUrl] = useState(null);

  const createPdf = async () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    pdfGenerator.getBlob((blob) => {
      const pdfUrl = URL.createObjectURL(blob);
      setUrl(pdfUrl);
      // Open the PDF in a new tab or window
      window.open(pdfUrl, "_blank");
    });
  };

  return (
    <div className="App">
      <button
        style={{ padding: "10px 10px", cursor: "pointer" }}
        onClick={createPdf}
      >
        Generate PDF
      </button>
      {url && <div>{url}</div>}
    </div>
  );
}

export default App;
