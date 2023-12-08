import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useEffect, useState } from "react";
import {
  logoImage,
  measureImg,
  AimImg,
  reduceImg,
  offsetImg,
  communicateImg,
  complyImg,
  carbonOffsetLogo,
  childrensImg,
  lastPageImages,
  combinedRowImages,
} from "../base64images/images";
import PieChart from "../PieChart";
import html2canvas from "html2canvas";
import BarChart from "../BarChart";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CbfPdf() {
  const [downlaod, setDownloaded] = useState(false);
  const [url, setUrl] = useState(null);

  // DATA SUMMARY FUNCTION
  const emissionParams = {
    abc: {
      emissions: 1.2,
      energyType: "234 litres of petrol",
      title: "Buildings",
    },
    def: { emissions: 2.2, title: "Flights" },
    fgh: { emissions: 3.2, title: "Cars and Rail" },
    numberOfEmployees: 30,
    barChartData: {
      officeBased: 3.5,
      highEnergyOrganizations: 20,
    },
  };

  function generateEmissionDetails(emissionParams) {
    const dynamicData = [];
    let totalEmissions = 0;

    Object.keys(emissionParams).forEach((type) => {
      if (emissionParams[type].emissions !== undefined) {
        const energyType =
          emissionParams[type].energyType || "(no data supplied)";

        const emissionsValue = emissionParams[type].emissions;
        totalEmissions += emissionsValue;

        carbonoIntensityValue =
          totalEmissions / emissionParams.numberOfEmployees;
        const title = emissionParams[type].title;

        const data = {
          margin: [0, 0, 0, 10],
          stack: [
            {
              text: title,
              bold: true,
              fontSize: 14,
              margin: [0, 0, 0, 10],
            },
            {
              columns: [
                {
                  stack: [
                    {
                      text: "Tonnes of CO2e",
                      bold: true,
                      margin: [0, 0, 0, 10],
                    },
                    {
                      text: emissionsValue.toString(),
                      style: "content",
                      alignment: "center",
                      margin: [5, 0, 0, 0],
                    },
                    {
                      text: emissionsValue.toString(),
                      bold: true,
                      alignment: "center",
                      margin: [5, 0, 0, 0],
                    },
                  ],
                  width: "16%",
                },
                {
                  stack: [
                    {
                      text: `${title} Details`,
                      bold: true,
                      margin: [0, 0, 0, 10],
                    },
                    { text: energyType, style: "content" },
                    { text: `Total ${title} emissions footprint`, bold: true },
                  ],
                  width: "60%",
                },
              ],
            },
          ],
        };

        dynamicData.push(data);
      }
    });

    return dynamicData;
  }
  function generatePieDescriptionText(emissionParams) {
    const dynamicData = generateEmissionDetails(emissionParams);

    const totalEmissions = dynamicData.reduce(
      (total, data) =>
        total + parseFloat(data.stack[1].columns[0].stack[1].text),
      0
    );

    const carbonoIntensityValue =
      totalEmissions / emissionParams.numberOfEmployees;

    const pieDescriptionText = {
      style: "pieDescriptionText",
      text: `Your total carbon footprint is ${totalEmissions.toFixed(
        2
      )} tonnes CO2e \n Carbon intensity (tonnes CO / employees) = ${carbonoIntensityValue.toFixed(
        2
      )} \n Read on for your full report & recommendations`,
    };

    return pieDescriptionText;
  }
  const dynamicDataArray = generateEmissionDetails(emissionParams);

  const pieDescriptionText = generatePieDescriptionText(emissionParams);

  const createHeader = (includePageBreak = false) => {
    const header = {
      columns: [
        {
          text: "Measured - You have completed the first step of your Carbon Footprint Journey",
          style: "header",
          margin: [0, 55, 0, includePageBreak ? 10 : 0],
        },
        {
          image: logoImage,
          width: 70,
          height: 80,
          alignment: "right",
          margin: [0, 20, 0, 0],
        },
      ],
    };

    if (includePageBreak) {
      header.pageBreak = "before";
    }

    return header;
  };

  const createRowImages = (combinedRowImages, customMargins = [0, 0, 0, 0]) => {
    return {
      columns: [
        {
          image: combinedRowImages,
          width: 700,
          margin: customMargins,
        },
      ],
    };
  };
  const customMarginsValue = [0, 40, 0, 0];
  const rowImagesCustomMargins = createRowImages(
    combinedRowImages,
    customMarginsValue
  );
  const customMarginsValue2 = [0, 30, 0, 0];
  const rowImagesCustomMargins2 = createRowImages(
    combinedRowImages,
    customMarginsValue2
  );

  const cbfJourneySteps = (image, text) => {
    return {
      columns: [
        { image, width: 60, height: 80 },
        {
          text,
          margin: [14, 15, 0, 0],
          color: "#188c79",
          fontSize: 19,
          bold: true,
        },
      ],
    };
  };

  const createFooter = (
    currentPage,
    pageCount,
    customMargin = [0, 80, 10, 20]
  ) => {
    return {
      margin: customMargin,
      layout: "noBorders",
      stack: [
        {
          canvas: [{ type: "line", x1: 0, y1: 0, x2: 630, y2: 0 }],
          margin: [0, 0, 0, 10],
        },
        {
          margin: [0, 0, 0, 0],
          columns: [
            { text: `CFP Self Assessed Carbon Footprint`, alignment: "left" },
            { text: `Page ${currentPage} of ${pageCount}`, alignment: "right" },
          ],
        },
      ],
    };
  };
  const customMargin2 = [10, 780, 30, 40];
  const footerCustomMargin = createFooter(2, 7, customMargin2);

  const customMargin3 = [10, 1150, 30, 40];
  const footerCustomMargin3 = createFooter(3, 7, customMargin3);

  const customMargin4 = [10, 600, 30, 40];
  const footerCustomMargin4 = createFooter(4, 7, customMargin4);

  const customMargin5 = [10, 760, 30, 40];
  const footerCustomMargin5 = createFooter(5, 7, customMargin5);

  const customMargin6 = [10, 720, 30, 40];
  const footerCustomMargin6 = createFooter(6, 7, customMargin6);

  const customMargin7 = [10, 1120, 30, 40];
  const footerCustomMargin7 = createFooter(7, 7, customMargin7);

  var carbonoIntensityValue;

  const createPdf = async () => {
    try {
      const chartRef = document.getElementById("chart");
      const canvas = await html2canvas(chartRef);
      const dataUrl = canvas.toDataURL("image/jpeg");

      const getBarChartDataUrl = async () => {
        const canvas = document.getElementById("Barchart");
        const barCanvas = await html2canvas(canvas);
        return barCanvas.toDataURL("image/jpeg");
      };

      const barChartDataUrl = await getBarChartDataUrl();
      const docDefinition = {
        pageSize: {
          width: 840,
          height: 1650,
        },
        pageMargins: [80, 30, 80, 0],

        content: [
          createHeader(false),
          rowImagesCustomMargins,
          {
            columns: [
              {
                text: "CFP Self Assessed",
                margin: [0, 20, 0, 0],
                style: "largeTextCol3",
              },
            ],
          },
          {
            columns: [{ text: "Carbon Footprint", style: "largeTextCol3" }],
          },
          {
            columns: [
              {
                text: "Results & Recommendation",
                style: "largeTextCol3",
                margin: [0, 0, 0, 30],
              },
            ],
          },

          {
            columns: [
              {
                style: "tableExample",
                fontSize: 15,
                table: {
                  widths: [140, 100],
                  heights: 30,

                  body: [
                    [
                      { text: "Company name", alignment: "left" },
                      { text: "CFP", alignment: "left" },
                    ],
                    [
                      { text: "Data entered by", alignment: "left" },
                      { text: "MH", alignment: "left" },
                    ],
                    [
                      { text: "Number of employees", alignment: "left" },
                      {
                        text: `${emissionParams.numberOfEmployees}`,
                        alignment: "left",
                      },
                    ],
                    // ["Date period", "not specified"],
                  ],
                },
              },
            ],
          },
          {
            columns: [
              {
                image: dataUrl,
                width: 280,
                height: 280,
                margin: [260, 0, 0, 0],
              },
            ],
          },

          // PIE CHART COMES HERE
          pieDescriptionText,
          {
            columns: [
              {
                text: `To achieve Net Zero now, your organisation needs to adapt a carbon management 
               process in the following order:`,
                style: "cbfListPage1",
              },
            ],
          },
          {
            columns: [
              {
                style: "cbfListPage1",
                ol: [
                  `Measure - Assess your organisation’s footprint (If you are reading this report you have 
                 already made the first step).`,
                  `Carbon Offset- compensate for the damage already done.`,
                  `Reduce emissions in-house- reduce your footprint to decrease the amount of 
                 offsetting needed and your ongoing emissions.`,
                ],
              },
            ],
          },
          {
            margin: [0, 20, 0, 0],
            fontSize: 16,
            columns: [
              {
                columns: [
                  {
                    width: "68%",
                    stack: [
                      `Carbon Neutrality - For CFP`,
                      {
                        margin: [0, 5, 0, 5],
                        text: [
                          "Become Carbon Neutral now from just ",

                          {
                            text: "£95.68",
                            bold: true,
                          },
                        ],
                      },

                      {
                        text: "Offset your businesses’ emissions now at, ",
                        bold: true,
                      },

                      {
                        text: `www.carbonfootprint.com/offset=${carbonoIntensityValue.toFixed(
                          2
                        )}`,
                        link: `http://www.carbonfootprint.com/offset${carbonoIntensityValue.toFixed(
                          2
                        )}`,
                        color: "blue",
                      },
                      {
                        margin: [0, 5, 0, 0],
                        fontSize: 11,
                        text: [
                          "If your emissions are above 100 tonnes CO, ",
                          {
                            text: "Contact us",
                            link: "mailto:your-email@example.com",
                            fontSize: 12,
                            color: "blue",
                          },
                          " for a personalized offsetting proposal.",
                        ],
                      },
                    ],
                    margin: [10, 10, 10, 10],
                  },

                  {
                    image: childrensImg,
                    width: 180,
                    height: 130,
                    alignment: "right",
                    margin: [10, 10, 10, 10],
                  },
                ],
              },
            ],
          },
          {
            fontSize: 16,
            stack: [
              {
                text: `Carbon Offsetting funds the solution to the climate emergency by:
            `,
              },
              {
                margin: [30, 0, 0, 10],
                ul: [
                  {
                    text: " Decarbonising national grids (for renewable energy projects)",
                  },
                  {
                    margin: [0, 5, 0, 5],
                    text: " Reducing emissions (via avoided deforestation projects - e.g. protecting the Amazon)",
                  },
                  {
                    text: " Enabling more efficient/greener energy use (e.g. cookstoves projects)",
                  },
                ],
              },
              {
                text: [
                  "Carbon offseting projects, which are commonly large-scale decarbonisation projects that deliver crucial emissions reductions around the globe are often found in developing countries where they have added social, educational and economic benefits. Moreover, climate change is a global issue (1 tonne CO2 in Manchester is the same as 1 tonne CO2 in Mumbai).",
                ],
              },
              {
                text: "www.carbonfootprint.com/carbonoffsetprojects.html",
                link: "http://www.carbonfootprint.com/carbonoffsetprojects.html",
                margin: [140, 5, 0, 5],
                color: "blue",
              },
            ],
          },

          createFooter(1, 7),

          // page one ends //
          createHeader(true),

          {
            margin: [0, 20, 0, 0],

            columns: [
              {
                text: `Your Carbon Footprint Report & Carbon Management Journey
          `,
                fontSize: 16,
                style: "carbonManagementJourney",
              },
            ],
          },
          {
            columns: [
              {
                text: `Congratulations - you have completed the responsible first step of the 6 stage carbon management journey.
                     Best practice is to complete the following stages on a 12-month cyclical basis.`,
                margin: [0, -10, 0, 0],
              },
            ],
          },
          rowImagesCustomMargins2,
          {
            margin: [20, 50],
            stack: [
              {
                text: `The purpose of this report is to`,
                fontSize: 16,
                bold: true,
                margin: [0, -10, 0, 10],
              },
              {
                margin: [30, 0, 0, 0],
                fontSize: 16,
                ul: [
                  { text: "Summarise your results", margin: [0, 0, 0, 5] },
                  {
                    text: "Provide some tips for how you can set aims for your carbon management",
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: "Help you to set a realistic carbon reduction target",
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: "Suggest carbon offsetting to render your organization carbon neutral",
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: "Work out the best way to communicate your carbon management/carbon neutrality internally and externally for your business’s benefit",
                    margin: [0, 0, 0, 5],
                  },
                  {
                    text: "Comply with either legislative or supply chain requirements",
                    margin: [0, 0, 0, 5],
                  },
                ],
              },
            ],
          },
          cbfJourneySteps(measureImg, `Measure - Results`),
          {
            columns: [
              {
                text: "The data you have entered into the calculator is shown on the next page",
                margin: [0, 20],
                fontSize: 15,
              },
            ],
          },
          footerCustomMargin,
          createHeader(true),

          {
            margins: [0, 30, 0, 40],
            columns: [
              {
                text: `Summary of Data Supplied`,
                color: `#188c79`,
                fontSize: 16,
                bold: true,
                margin: [0, 0, 0, 30],
              },
            ],
          },

          //   /// SUMMARY of emmisionss/////

          dynamicDataArray,

          footerCustomMargin3,
          createHeader(true),
          {
            margin: [0, 30, 0, 0],
            columns: [
              {
                text: `The results have been calculated automatically using DEFRA and other internationally recognised metrics. Datasets have been entered entirely by the client and no checking has been done by CarbonFootprint Ltd as to validity or completeness of the dataset. To have confidence in your results, particularly if you need to report to your supply chain/stakeholders or to promote in your markets, we strongly recommend you commission us to complete a Carbon Footprint Verification.`,
                fontSize: 15,
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
                fontSize: 15,
              },
              {
                text: `High energy businesses such as manufacturing and those with very high travel/transport usage (e.g. logistics, waste management) will have a much higher footprint at around 10-30 tonnes per employee.`,
                margin: [0, 10, 0, 10],
                fontSize: 15,
              },
              {
                text: `Here's how your carbon footprint compares:
            `,
                fontSize: 15,
              },
            ],
          },

          //  COLUMN CHART IS HEREEEE ///////
          {
            columns: [
              {
                image: barChartDataUrl,
                width: 480,
                height: 180,
                margin: [120, 10, 0, 30],
              },
            ],
          },

          cbfJourneySteps(AimImg, `Aim - Setting realistic goal`),
          {
            stack: [
              {
                text: "Reducing your carbon emissions can save you money and reduce your impact on climate change.",
                margin: [0, 5, 0, 5],
                fontSize: 15,
              },
              {
                text: "Now that you have completed your Carbon Footprint, you should consider setting Suitable Measurable Achievable Realistic and Time-bound (SMART) targets to help achieve these reductions. A few key points and resources to consider are:",
                margin: [0, 5, 0, 5],
                fontSize: 15,
              },
              {
                margin: [30, 0, 0, 0],
                fontSize: 15,

                ul: [
                  {
                    text: 'Setting up a Carbon Management Plan - the old adage applies here - "fail to plan - plan to fail".',
                  },
                  {
                    margin: [0, 5, 0, 5],
                    text: 'Achieving easy carbon reduction first - even if these actions may yield only small results, these are psychologically important and will help your organization to get a "taste" of success and develop a culture that enables you to tackle the bigger reduction opportunities.',
                  },
                  {
                    margin: [0, 5, 0, 5],

                    text: [
                      "Get quantitative - use our Energy Efficiency Test to work out your capacity to save. Find it at ",
                      {
                        text: "www.carbonfootprint.com/energy_efficiency_test.html",
                        link: "http://www.carbonfootprint.com/energy_efficiency_test.html",
                        color: "blue",
                      },
                    ],
                  },
                  {
                    text: "Be realistic - if your target is dependent on a massive capex that has yet to be signed or on a large cultural shift, you may want to be more conservative with your aims.",
                  },
                ],
              },
            ],
          },
          footerCustomMargin4,

          createHeader(true),

          cbfJourneySteps(
            reduceImg,
            `Reduce - How to make it work and stay working`
          ),
          {
            margin: [0, 0, 0, 20],
            stack: [
              {
                text: `Once your targets are set, you will need to implement suitable methods to reach them.
        `,
                fontSize: 15,
              },
              {
                fontSize: 15,

                text: [
                  {
                    text: "You will probably be heavily reliant on the actions of your teams for reductions to be achieved. Awareness campaigns including the use of tools such as informative posters and 'Lunch and Learn' sessions can help motivate such behavioral changes. ",
                  },
                  {
                    text: "Contact us",
                    link: "mailto:your-email@example.com",
                    color: "blue",
                  },
                  ".",
                ],
              },
              {
                text: "Rather than relying on a volunteer committee and carbon champions, make your scheme more official by giving specific team members ownership of the reductions and placing the targets in their KPIs.",
                fontSize: 15,
              },
              {
                text: "Celebrate successes with your staff when they occur and be clear on the difference and value this brings to the business. (Also see Communicate section).",
                fontSize: 15,
              },
            ],
          },

          cbfJourneySteps(
            offsetImg,
            `Offset - Compensate carbon emissions you cannot reasonably reduce`
          ),
          {
            fontSize: 15,

            columns: [
              {
                width: "70%",
                text: `Carbon offsetting can render your organization carbon neutral - but it's
              much more than that. External programmes such as CDP (formerly Carbon Disclosure Project) award extra points for carbon offsetting organisations and offsetting is positively looked upon within sales tender/PQQs.
  
              Carbon offsetting also frequently supports broader CSR and community outreach programmes. However, we only advocate carbon offsetting if you also have a carbon measurement and carbon reduction plan.          
              `,
                fontSize: 15,
              },
              {
                image: carbonOffsetLogo,
                fit: [200, 200],
                margin: [10, 0, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                fontSize: 15,
                text: [
                  "The cost to offset your carbon emissions is likely to be very small compared with your energy costs (frequently it's less than 2% of the spend) and much easier to implement compared with a behavior change program. We offer a range of projects for you to choose from which support biodiversity, provide habitats for endangered species and support developing communities Reforestation and avoided deforestation carbon offset programs are hugely popular as they tackle one of the most potent threats to our planet. (Visit ",
                  {
                    text: "www.carbonfootprint.com/deforestation.html",
                    link: "http://www.carbonfootprint.com/deforestation.html",
                    color: "blue",
                  },
                  " for more information). However, we also have more community and energy-focused projects.",
                ],
              },
            ],
          },
          footerCustomMargin5,
          createHeader(true),
          {
            margin: [0, 20, 0, 0],
            columns: [{ image: lastPageImages, width: 660, height: 160 }],
          },
          {
            stack: [
              {
                text: `Sample Carbon Offsetting Projects - UK Schools Tree Planting - Amazon Avoided Deforestation, Brazil - Clean Water projects, Rwanda
          `,
                fontSize: 9,
              },
              {
                fontSize: 15,
                text: [
                  "The offsetting process is simple and straightforward - just visit ",
                  {
                    text: "www.carbonfootprint.com/carbonoffset.html",
                    link: "http://www.carbonfootprint.com/carbonoffset.html",
                    color: "blue",
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
                margin: [20, 20, 0, 0],
                stack: [{ image: communicateImg, width: 60, height: 80 }],
              },
              {
                stack: [
                  {
                    text: `Communicate - Internally & Externally`,
                    fontSize: 19,
                    margin: [-240, 30, 0, 0],
                    color: "#188c79",
                    bold: true,
                  },
                  {
                    text: `Make sure you communicate your actions & achievements effectively, both within your
                  organisation, to help develop your culture and externally to help improve your brand image.`,
                    fontSize: 15,
                    margin: [-240, 5, 0, 0],
                  },
                ],
              },
            ],
          },
          {
            text: `When promoting externally be sure to promote your actions via all marketing channels
        available to you - such as web-site, newsletters, brochures, press releases, conferences/events and social media etc. Ensure to:`,
            margin: [0, 0, 0, 5],
            fontSize: 15,
          },
          {
            margin: [30, 0, 0, 0],
            fontSize: 15,
            ul: [
              {
                text: "Explain why climate change matters to you (visit www.carbonfootprint.com/warning.html for more information)",
              },
              {
                margin: [0, 5, 0, 5],
                text: "Be clear and accurate about what you've done",
              },
              {
                text: ` Don't be tempted to exaggerate - this sector hates "green-wash" even if its unintentional`,
              },
              {
                margin: [0, 5, 0, 5],

                text: " Evidence - use pictures more than words. Certificates, images of offset projects you are supporting and graphs of your carbon performance, all of which we can supply, can helpcommunicate your point in a clearer and more enticing manner",
              },
              {
                text: ` Tell a story - show where you have come from, the progress you have made and what your
              commitment is for the future
              `,
              },
            ],
          },
          {
            margin: [0, 0, 0, 5],
            text: [
              "When promoting ",
              {
                text: "internally",
                italics: true,
              },
              ", ensure to:",
            ],
            fontSize: 15,
          },

          {
            fontSize: 15,
            ul: [
              {
                text: "Explain Climate Change & Why it matters (visit for more www.carbonfootprint,com/warning.html for more information)",
              },
              {
                margin: [0, 5, 0, 0],
                text: " Get people involved (Also see Reduce section)",
              },
            ],
          },
          footerCustomMargin6,
          createHeader(true),

          cbfJourneySteps(complyImg, `Comply - legislation and best practise`),
          {
            fontSize: 15,
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
                    link: "mailto:your-email@example.com",
                    color: "blue",
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
                    link: "http://www.carbonfootprint.com",
                    color: "blue",
                  },
                ],
              },
            ],
          },
          footerCustomMargin7,
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
            margin: [0, 5, 0, 5],
          },
          tableExample: {
            margin: [200, 5, 0, 0],
            alignment: "center",
          },
          pieChart: {
            margin: [150, 0],
          },
          pieDescriptionText: {
            margin: [170, 0, 0, 40],
            fontSize: 16,
          },
          cbfListPage1: {
            fontSize: 16,
            bold: true,
            margin: [20, 10, 0, 0],
          },
          pageEndingText: {
            margin: [],
          },
          carbonManagementJourney: {
            bold: true,
          },
          rowImgMeasure: {
            margin: [0, 0, 30, 0],
          },
        },
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      pdfMake.createPdf(docDefinition).download();

      // Set the downloaded state to true
      setDownloaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (downlaod) {
      // Add any logic you need to handle the download completion
      console.log("Download completed!");

      // Reset the downloaded state for the next download
      setDownloaded(false);
    }
  }, [downlaod]);
  const pieChartData = {
    labels: Object.keys(emissionParams)
      .filter((key) => emissionParams[key].hasOwnProperty("emissions"))
      .map((key) => emissionParams[key].title || key),
    datasets: [
      {
        label: "Monthly Sales",
        data: Object.keys(emissionParams)
          .filter((key) => emissionParams[key].hasOwnProperty("emissions"))
          .map((key) => emissionParams[key].emissions),
        backgroundColor: ["#f56942", "purple", "#ad5650", "yellow"],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
  const barChartData = {
    labels: ["Your footprint", "Office based", "High energy organziation"],
    datasets: [
      {
        data: [
          carbonoIntensityValue,
          emissionParams.barChartData.officeBased || 3.5,
          emissionParams.barChartData.highEnergyOrganizations || 20,
        ],
        backgroundColor: ["#48c268"],
        borderColor: "green",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <button
        style={{ padding: "10px 10px", cursor: "pointer" }}
        onClick={createPdf}
      >
        Download PDF
      </button>
      {url && <div>{url}</div>}
      <PieChart data={pieChartData} />
      <BarChart data={barChartData} />
    </div>
  );
}

export default CbfPdf;
