// Lesson data - easily editable for educators
const LESSONS = [
    {
        id: 1,
        name: "Lesson 1: Simple Molecules",
        description: "Learn about water, oxygen gas, and hydrogen gas",
        atoms: [
            { element: "H", count: 10, color: "#FFB6C1", name: "Hydrogen" },
            { element: "O", count: 6, color: "#FF6B6B", name: "Oxygen" }
        ],
        molecules: [
            {
                name: "Water",
                formula: "H₂O",
                composition: { H: 2, O: 1 },
                bonds: [[0, 2], [1, 2]],
                description: "Water is the most essential molecule for life on Earth. It covers 71% of our planet's surface and makes up about 60% of the human body. Water has unique properties that make it perfect for supporting life - it can dissolve many substances, regulate temperature, and exists in all three states (solid, liquid, gas) in Earth's environment.",
                properties: [
                    "Liquid at room temperature (20-25°C)",
                    "Freezes at 0°C (32°F) to form ice",
                    "Boils at 100°C (212°F) at sea level",
                    "Universal solvent - dissolves many substances",
                    "Expands when it freezes (ice floats!)",
                    "Has high surface tension",
                    "Excellent heat capacity - regulates climate",
                    "Bent molecular shape (104.5° angle)",
                    "Polar molecule - has positive and negative ends",
                    "Forms hydrogen bonds with other water molecules"
                ],
                image: "💧"
            },
            {
                name: "Oxygen Gas",
                formula: "O₂",
                composition: { O: 2 },
                bonds: [[0, 1]],
                description: "Oxygen is the gas we breathe to stay alive, making up 21% of Earth's atmosphere. Every cell in your body needs oxygen to produce energy from food through a process called cellular respiration. Without oxygen, most animals and humans would die within minutes. Oxygen was first discovered in the 1770s and revolutionized our understanding of chemistry and biology.",
                properties: [
                    "Colorless, odorless, and tasteless gas",
                    "Essential for cellular respiration in animals",
                    "Supports combustion - fires need oxygen to burn",
                    "Second most abundant element in atmosphere (21%)",
                    "Slightly magnetic (paramagnetic)",
                    "Produced by plants during photosynthesis",
                    "Dissolves in water (fish breathe dissolved oxygen)",
                    "Forms double bond between two oxygen atoms",
                    "Becomes liquid at -183°C (pale blue color)",
                    "Used in medical treatment and scuba diving"
                ],
                image: "🌬️"
            },
            {
                name: "Hydrogen Gas",
                formula: "H₂",
                composition: { H: 2 },
                bonds: [[0, 1]],
                description: "Hydrogen is the lightest and most abundant element in the entire universe, making up about 75% of all matter. Two hydrogen atoms bond together to form hydrogen gas (H₂). It's extremely light and rises quickly in air, which is why hydrogen-filled balloons float so well. Hydrogen is also a clean fuel source - when it burns, it only produces water!",
                properties: [
                    "Lightest element in the universe",
                    "Highly flammable - burns with pale blue flame",
                    "Colorless, odorless, and tasteless gas",
                    "14 times lighter than air",
                    "Used as rocket fuel in space missions",
                    "Burns in oxygen to produce only water",
                    "Most abundant element in the Sun and stars",
                    "Can be used in fuel cells for clean energy",
                    "Forms explosive mixtures with air",
                    "Discovered in 1766 by Henry Cavendish"
                ],
                image: "🎈"
            },
            {
                name: "Ozone",
                formula: "O₃",
                composition: { O: 3 },
                bonds: [[0, 1], [1, 2]],
                description: "Ozone is a special form of oxygen made of three oxygen atoms instead of two. High in the atmosphere, the ozone layer acts like Earth's sunscreen, protecting all life from harmful ultraviolet (UV) radiation from the Sun. Without this protective layer, the Sun's rays would be too strong for most life to survive. The ozone layer was damaged by chemicals called CFCs, but it's slowly recovering thanks to environmental protection efforts.",
                properties: [
                    "Forms protective layer 15-35 km above Earth",
                    "Pale blue gas with sharp, clean smell",
                    "Powerful oxidizer - very reactive",
                    "Blocks 97-99% of harmful UV radiation",
                    "Can be created by lightning storms",
                    "Used to purify water and sanitize air",
                    "Unstable - breaks down into O₂ over time",
                    "Beneficial high in atmosphere, harmful at ground level",
                    "Creates that fresh smell after thunderstorms",
                    "Montreal Protocol helped protect ozone layer"
                ],
                image: "🛡️"
            },
            {
                name: "Hydrogen Peroxide",
                formula: "H₂O₂",
                composition: { H: 2, O: 2 },
                bonds: [[0, 2], [2, 3], [3, 1]],
                description: "Hydrogen peroxide is like water's more reactive cousin - it has one extra oxygen atom. You've probably seen it bubble and fizz when cleaning a cut - that's oxygen gas being released! It's a powerful disinfectant that kills bacteria and germs. Hydrogen peroxide is unstable and slowly breaks down into plain water and oxygen, which is why it's stored in dark bottles.",
                properties: [
                    "Disinfects and cleans wounds",
                    "Bleaches hair and whitens teeth",
                    "Breaks down into water and oxygen",
                    "Bubbles and fizzes on contact with blood",
                    "Pale blue liquid (looks like water)",
                    "Stored in dark bottles to prevent breakdown",
                    "Used to clean contact lenses",
                    "Naturally produced by white blood cells",
                    "More reactive than water due to extra oxygen",
                    "Used as rocket propellant in high concentrations"
                ],
                image: "🩹"
            }
        ]
    },
    {
        id: 2,
        name: "Lesson 2: Carbon Compounds",
        description: "Explore carbon dioxide, methane, and carbon monoxide",
        atoms: [
            { element: "C", count: 5, color: "#4A4A4A", name: "Carbon" },
            { element: "O", count: 6, color: "#FF6B6B", name: "Oxygen" },
            { element: "H", count: 12, color: "#FFB6C1", name: "Hydrogen" }
        ],
        molecules: [
            {
                name: "Carbon Dioxide",
                formula: "CO₂",
                composition: { C: 1, O: 2 },
                bonds: [[0, 1], [0, 2]],
                description: "Carbon dioxide is the gas you breathe out with every breath! Plants need CO₂ for photosynthesis to make food and oxygen. While CO₂ is natural and necessary for life, too much in the atmosphere traps heat and contributes to climate change. When carbon dioxide is frozen into a solid, we call it \"dry ice\" - it's so cold it goes straight from solid to gas without becoming liquid!",
                properties: [
                    "Greenhouse gas that traps Earth's heat",
                    "Makes soda and sparkling water fizzy",
                    "Dry ice is solid CO₂ at -78°C (-109°F)",
                    "Essential for plant photosynthesis",
                    "Colorless and heavier than air",
                    "Makes up only 0.04% of atmosphere",
                    "Used in fire extinguishers",
                    "Breathed out by animals, used by plants",
                    "Linear molecule with carbon in the center",
                    "Dissolves in water to form carbonic acid"
                ],
                image: "☁️"
            },
            {
                name: "Methane",
                formula: "CH₄",
                composition: { C: 1, H: 4 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
                description: "Methane is natural gas - the fuel many people use for cooking and heating homes. It's the simplest hydrocarbon (molecule made of carbon and hydrogen). Surprisingly, cows burp out lots of methane when they digest grass! Methane is also found trapped under the ocean floor and in Arctic ice. While it's a valuable fuel, it's a powerful greenhouse gas that's 25 times stronger than CO₂ at trapping heat.",
                properties: [
                    "Main component of natural gas (70-90%)",
                    "Produced by cows, termites, and wetlands",
                    "25 times more powerful greenhouse gas than CO₂",
                    "Burns with a blue flame",
                    "Colorless and odorless gas",
                    "Tetrahedral shape - carbon in center with 4 hydrogens",
                    "Lighter than air",
                    "Can form explosive mixtures with air (5-15%)",
                    "Found in coal mines (called \"firedamp\")",
                    "Used to generate electricity in power plants"
                ],
                image: "🔥"
            },
            {
                name: "Carbon Monoxide",
                formula: "CO",
                composition: { C: 1, O: 1 },
                bonds: [[0, 1]],
                description: "Carbon monoxide is a deadly poison gas created when fuels don't burn completely. It's especially dangerous because you can't see it, smell it, or taste it. Carbon monoxide is produced by cars, gas stoves, and furnaces. It's poisonous because it tricks your blood into carrying it instead of oxygen, which can be fatal. This is why carbon monoxide detectors are so important in homes!",
                properties: [
                    "Highly toxic - binds to blood instead of oxygen",
                    "Colorless, odorless, and tasteless",
                    "Produced by incomplete combustion",
                    "Car exhaust contains carbon monoxide",
                    "Detected by special CO detectors",
                    "Causes headaches, dizziness, and death",
                    "Lighter than air",
                    "Burns with a blue flame to form CO₂",
                    "Used in industrial chemical production",
                    "Triple bond between carbon and oxygen"
                ],
                image: "⚠️"
            },
            {
                name: "Formaldehyde",
                formula: "CH₂O",
                composition: { C: 1, H: 2, O: 1 },
                bonds: [[0, 1], [0, 2], [0, 3]],
                description: "Formaldehyde is a preservative chemical that keeps things from decaying. You might have seen biology specimens (like frogs or fish) preserved in jars with formaldehyde solution. It's also used to make plywood, particleboard, and some plastics. While very useful in industry, formaldehyde has a strong smell and can irritate your eyes, nose, and throat. In nature, formaldehyde is actually produced in small amounts by our own bodies!",
                properties: [
                    "Pungent, suffocating smell",
                    "Used in building materials and plywood",
                    "Preserves biological specimens in labs",
                    "Can irritate eyes, nose, and throat",
                    "Colorless gas at room temperature",
                    "Dissolves in water (called formalin)",
                    "Used to make resins and plastics",
                    "Naturally produced in small amounts by cells",
                    "Flat molecule with C-O double bond",
                    "First discovered in 1859"
                ],
                image: "🏭"
            },
            {
                name: "Ethane",
                formula: "C₂H₆",
                composition: { C: 2, H: 6 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 7]],
                description: "Ethane is the second simplest hydrocarbon, containing two carbon atoms bonded together with six hydrogen atoms surrounding them. It's found in natural gas and petroleum. When ethane is heated and broken apart (a process called cracking), it forms ethylene, which is used to make plastics like polyethylene - the plastic in bags, bottles, and toys. Ethane burns cleanly and is used as a refrigerant and fuel.",
                properties: [
                    "Colorless, odorless gas",
                    "Second simplest hydrocarbon (after methane)",
                    "Found in natural gas (1-7%)",
                    "Used to make ethylene for plastics",
                    "Clean burning fuel",
                    "Two carbon atoms bonded together",
                    "Non-toxic but can displace oxygen",
                    "Freezes at -183°C",
                    "Used as a refrigerant",
                    "Slightly heavier than air"
                ],
                image: "⚡"
            }
        ]
    },
    {
        id: 3,
        name: "Lesson 3: Nitrogen Compounds",
        description: "Learn about ammonia and nitrogen oxides",
        atoms: [
            { element: "N", count: 6, color: "#4169E1", name: "Nitrogen" },
            { element: "H", count: 12, color: "#FFB6C1", name: "Hydrogen" },
            { element: "O", count: 6, color: "#FF6B6B", name: "Oxygen" }
        ],
        molecules: [
            {
                name: "Ammonia",
                formula: "NH₃",
                composition: { N: 1, H: 3 },
                bonds: [[0, 1], [0, 2], [0, 3]],
                description: "Ammonia has a very strong, sharp smell that you might recognize from some cleaning products. It's one of the most important chemicals in agriculture - farmers use ammonia-based fertilizers to help crops grow by providing nitrogen that plants need. Your body also produces small amounts of ammonia as a waste product. Ammonia has an unusual pyramid shape with the nitrogen atom at the top and three hydrogen atoms forming the base.",
                properties: [
                    "Strong, pungent, suffocating smell",
                    "Powerful cleaning agent - dissolves grease",
                    "Essential ingredient in fertilizers",
                    "Dissolves very easily in water",
                    "Colorless gas at room temperature",
                    "Pyramid-shaped molecule (trigonal pyramidal)",
                    "Lighter than air",
                    "Turns red litmus paper blue (basic/alkaline)",
                    "Can be toxic in high concentrations",
                    "Used to make nylon, explosives, and plastics"
                ],
                image: "🧼"
            },
            {
                name: "Nitrogen Gas",
                formula: "N₂",
                composition: { N: 2 },
                bonds: [[0, 1]],
                description: "Nitrogen gas makes up 78% of the air you breathe - almost four out of every five breaths you take is nitrogen! Despite being all around us, nitrogen gas is quite unreactive because the two nitrogen atoms are held together by a very strong triple bond. Plants can't use nitrogen gas directly from the air - special bacteria in soil must first convert it into forms like ammonia. Nitrogen gas is also used to preserve foods by displacing oxygen that would cause spoilage.",
                properties: [
                    "Most abundant gas in Earth's atmosphere (78%)",
                    "Colorless, odorless, and tasteless",
                    "Very unreactive due to strong triple bond",
                    "Used to preserve food and prevent oxidation",
                    "Inert gas - doesn't support combustion",
                    "Makes up most of the air in potato chip bags",
                    "Used in light bulbs to prevent filament burning",
                    "Can be converted to ammonia by lightning",
                    "Essential for all proteins and DNA",
                    "Discovered in 1772 by Daniel Rutherford"
                ],
                image: "💨"
            },
            {
                name: "Nitrous Oxide",
                formula: "N₂O",
                composition: { N: 2, O: 1 },
                bonds: [[0, 1], [1, 2]],
                description: "Nitrous oxide is commonly known as \"laughing gas\" because it can make people feel giddy and relaxed. Dentists and doctors use it as a mild anesthetic to help patients feel calm during procedures. It got its funny nickname because people sometimes giggle when breathing it in! Nitrous oxide is also used in car racing to make engines more powerful, and unfortunately, it's a greenhouse gas that contributes to climate change.",
                properties: [
                    "Sweet-smelling gas with pleasant odor",
                    "Used in dentistry and minor surgery",
                    "Called laughing gas - causes euphoria",
                    "Greenhouse gas (300x stronger than CO₂)",
                    "Non-flammable but supports combustion",
                    "Used in whipped cream dispensers",
                    "Makes engines more powerful (NOS in racing)",
                    "Discovered in 1772 by Joseph Priestley",
                    "Linear molecule: N-N-O",
                    "Breaks down in upper atmosphere"
                ],
                image: "😄"
            },
            {
                name: "Nitric Oxide",
                formula: "NO",
                composition: { N: 1, O: 1 },
                bonds: [[0, 1]],
                description: "Nitric oxide is a remarkable molecule that acts as a messenger in your body, helping cells communicate with each other. It helps control blood pressure by relaxing blood vessels, and your immune system uses it to fight off germs. Scientists were so surprised to discover that this simple gas was so important in the body that they won a Nobel Prize in 1998! Unfortunately, nitric oxide is also produced by car engines and contributes to air pollution and smog.",
                properties: [
                    "Colorless gas at room temperature",
                    "Important biological signaling molecule",
                    "Regulates blood pressure and flow",
                    "Air pollutant from vehicle emissions",
                    "Helps immune system fight infections",
                    "Produced naturally by the body",
                    "Discovery won 1998 Nobel Prize",
                    "Reacts quickly with oxygen to form NO₂",
                    "Free radical with unpaired electron",
                    "Used in medical treatments for newborns"
                ],
                image: "🔬"
            },
            {
                name: "Hydrazine",
                formula: "N₂H₄",
                composition: { N: 2, H: 4 },
                bonds: [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5]],
                description: "Hydrazine is a powerful rocket fuel that helps launch spacecraft and satellites into orbit. It's similar to ammonia but with two nitrogen atoms bonded together instead of one. When hydrazine burns, it releases a huge amount of energy very quickly - perfect for rockets! However, hydrazine is very dangerous: it's toxic, corrosive, and can explode. Only trained professionals handle it with special protective equipment. It's also used in some industrial processes and to treat water in power plants.",
                properties: [
                    "Highly toxic and corrosive liquid",
                    "Powerful rocket and spacecraft fuel",
                    "Colorless, oily liquid with ammonia-like smell",
                    "Burns violently - releases lots of energy",
                    "Used in emergency power units on aircraft",
                    "Powerful reducing agent in chemistry",
                    "Can ignite spontaneously with oxidizers",
                    "Treated as hazardous material",
                    "Two nitrogen atoms bonded together",
                    "Used in water treatment for boilers"
                ],
                image: "🚀"
            }
        ]
    },
    {
        id: 4,
        name: "Lesson 4: Salts and Acids",
        description: "Discover table salt and other ionic compounds",
        atoms: [
            { element: "Na", count: 4, color: "#FFA500", name: "Sodium" },
            { element: "Cl", count: 4, color: "#90EE90", name: "Chlorine" },
            { element: "H", count: 6, color: "#FFB6C1", name: "Hydrogen" },
            { element: "O", count: 4, color: "#FF6B6B", name: "Oxygen" }
        ],
        molecules: [
            {
                name: "Table Salt",
                formula: "NaCl",
                composition: { Na: 1, Cl: 1 },
                bonds: [[0, 1]],
                description: "Table salt is sodium chloride - the white crystals you sprinkle on food to make it tastier! Salt is made of sodium and chlorine atoms bonded together in a perfect cubic pattern, forming beautiful square crystals you can see under a microscope. Humans have used salt for thousands of years to preserve food and add flavor. Interestingly, both sodium (which explodes in water) and chlorine (a toxic gas) are dangerous alone, but together they form the safe, essential salt your body needs!",
                properties: [
                    "Enhances flavor of food",
                    "Preserves food by preventing bacteria growth",
                    "Forms perfect cubic crystals",
                    "Dissolves easily in water",
                    "Essential for human health (electrolyte)",
                    "Melts ice on roads in winter",
                    "Found naturally in ocean water",
                    "Body needs it for nerves and muscles",
                    "Mined from underground deposits or evaporated from seawater",
                    "Has been used as currency in ancient times"
                ],
                image: "🧂"
            },
            {
                name: "Hydrochloric Acid",
                formula: "HCl",
                composition: { H: 1, Cl: 1 },
                bonds: [[0, 1]],
                description: "Hydrochloric acid is a powerful acid found in your stomach! Your stomach produces this acid to help break down food and kill harmful bacteria in what you eat. The acid in your stomach is so strong it could burn your skin, but your stomach has a special protective lining that keeps it safe. Hydrochloric acid is also used in laboratories and industry for cleaning metals and making other chemicals. It's a colorless liquid that releases acidic fumes.",
                properties: [
                    "Very strong acid (pH around 0-1)",
                    "Main component of stomach acid",
                    "Helps digest proteins in food",
                    "Highly corrosive - can burn skin",
                    "Kills harmful bacteria in food",
                    "Colorless liquid with sharp, pungent smell",
                    "Used to clean metals (pickling)",
                    "Dissolves in water releasing H+ ions",
                    "Also called muriatic acid",
                    "Produced naturally by stomach cells"
                ],
                image: "🧪"
            },
            {
                name: "Sodium Hydroxide",
                formula: "NaOH",
                composition: { Na: 1, O: 1, H: 1 },
                bonds: [[0, 1], [1, 2]],
                description: "Sodium hydroxide, also called lye or caustic soda, is the opposite of an acid - it's a strong base. People have used it for centuries to make soap by mixing it with fats and oils. Sodium hydroxide is extremely caustic, meaning it can burn skin and dissolve organic materials like hair and grease - that's why it's in drain cleaners! It's a white solid that dissolves in water and gets very hot. Always handle with extreme care!",
                properties: [
                    "Very strong base (pH around 14)",
                    "Essential for making soap (saponification)",
                    "Extremely caustic - burns skin badly",
                    "Dissolves grease, hair, and fats",
                    "White solid pellets or flakes",
                    "Gets very hot when dissolved in water",
                    "Used in drain cleaners (Drano)",
                    "Used to make paper, textiles, and detergents",
                    "Also called lye or caustic soda",
                    "Must be handled with protective equipment"
                ],
                image: "🧴"
            },
            {
                name: "Chlorine Gas",
                formula: "Cl₂",
                composition: { Cl: 2 },
                bonds: [[0, 1]],
                description: "Chlorine is a yellow-green gas with a very strong, sharp smell that you might recognize from swimming pools. It's added to pool water and drinking water to kill harmful bacteria and make water safe. Chlorine is also used to make bleach, which whitens clothes and disinfects surfaces. While chlorine is very useful, the pure gas is toxic and was even used as a weapon in World War I. Thankfully, the small amounts used in pools and water treatment are safe.",
                properties: [
                    "Yellow-green gas with choking odor",
                    "Purifies water by killing bacteria",
                    "Strong, pungent smell (like bleach)",
                    "Used to disinfect swimming pools",
                    "Main ingredient in household bleach",
                    "Toxic in high concentrations",
                    "Heavier than air - sinks to ground",
                    "Very reactive with most elements",
                    "Used to make PVC plastic and pesticides",
                    "Discovered in 1774 by Carl Wilhelm Scheele"
                ],
                image: "🏊"
            },
            {
                name: "Water",
                formula: "H₂O",
                composition: { H: 2, O: 1 },
                bonds: [[0, 2], [1, 2]],
                description: "Water is essential for life. It covers 71% of Earth's surface.",
                properties: [
                    "Liquid at room temperature",
                    "Freezes at 0°C",
                    "Boils at 100°C",
                    "Universal solvent"
                ],
                image: "💧"
            }
        ]
    },
    {
        id: 5,
        name: "Lesson 5: Sulfur Compounds",
        description: "Explore sulfur dioxide, hydrogen sulfide, and sulfuric acid",
        atoms: [
            { element: "S", count: 4, color: "#FFFF00", name: "Sulfur" },
            { element: "O", count: 8, color: "#FF6B6B", name: "Oxygen" },
            { element: "H", count: 8, color: "#FFB6C1", name: "Hydrogen" }
        ],
        molecules: [
            {
                name: "Sulfur Dioxide",
                formula: "SO₂",
                composition: { S: 1, O: 2 },
                bonds: [[0, 1], [0, 2]],
                description: "Sulfur dioxide is a colorless gas with a sharp, choking smell that's produced when sulfur burns. Volcanoes release huge amounts of it during eruptions, and it's also created when we burn coal and oil. Sulfur dioxide is a major air pollutant that can cause acid rain, which damages forests and buildings. However, it's also useful - winemakers add small amounts to wine to keep it fresh, and it's used to preserve dried fruits like apricots and raisins.",
                properties: [
                    "Colorless gas at room temperature",
                    "Sharp, irritating, suffocating smell",
                    "Major air pollutant causing acid rain",
                    "Produced by volcanoes and burning coal",
                    "Used as preservative in food and wine",
                    "Can trigger asthma attacks",
                    "Heavier than air",
                    "Dissolves in water to form acidic solution",
                    "Bent molecular shape like water",
                    "Can bleach and disinfect materials"
                ],
                image: "🌋"
            },
            {
                name: "Hydrogen Sulfide",
                formula: "H₂S",
                composition: { H: 2, S: 1 },
                bonds: [[0, 2], [1, 2]],
                description: "Hydrogen sulfide is the gas responsible for the terrible smell of rotten eggs! It's produced naturally when organic matter decays in the absence of oxygen, like in swamps and sewers. This gas is extremely dangerous - it's more toxic than carbon monoxide and can kill quickly at high concentrations. The worst part is that it can temporarily paralyze your sense of smell, so you might not realize you're in danger. Small amounts are found in natural gas and volcanic gases.",
                properties: [
                    "Unmistakable rotten egg smell",
                    "Extremely toxic - more poisonous than CO",
                    "Found in natural gas, volcanoes, and swamps",
                    "Corrosive to metals",
                    "Produced by decaying organic matter",
                    "Heavier than air - collects in low areas",
                    "Paralyzes sense of smell at high concentration",
                    "Colorless gas",
                    "Flammable - burns with blue flame",
                    "Bent molecular shape like water"
                ],
                image: "🥚"
            },
            {
                name: "Sulfur Trioxide",
                formula: "SO₃",
                composition: { S: 1, O: 3 },
                bonds: [[0, 1], [0, 2], [0, 3]],
                description: "Sulfur trioxide is a highly reactive compound that's the main ingredient needed to make sulfuric acid - one of the world's most important industrial chemicals. It reacts violently with water, releasing lots of heat and forming sulfuric acid immediately. In nature, sulfur trioxide forms in the atmosphere from sulfur dioxide and contributes to acid rain. It exists as a colorless liquid or white solid, and it's so reactive that it must be handled with extreme care.",
                properties: [
                    "Highly reactive and corrosive",
                    "Key ingredient for making sulfuric acid",
                    "Reacts violently with water (exothermic)",
                    "White solid or colorless liquid",
                    "Exists in atmosphere - causes acid rain",
                    "Planar triangular molecular shape",
                    "Fumes in moist air",
                    "Used in sulfonation reactions",
                    "Must be stored in sealed containers",
                    "Extremely important industrial chemical"
                ],
                image: "⚗️"
            },
            {
                name: "Sulfuric Acid",
                formula: "H₂SO₄",
                composition: { H: 2, S: 1, O: 4 },
                bonds: [[0, 3], [2, 3], [1, 4], [2, 4], [2, 5], [2, 6]],
                description: "Sulfuric acid is called the \"king of chemicals\" because it's the most produced chemical in the world! Industries use it to make fertilizers, refine oil, process metals, and manufacture countless other products. It's one of the strongest acids and is extremely corrosive - it can burn through skin, cloth, and many materials instantly. The acid in car batteries is sulfuric acid. Despite being dangerous, it's absolutely essential for modern industry and agriculture.",
                properties: [
                    "Strongest common acid (very low pH)",
                    "Most produced chemical globally",
                    "Extremely corrosive - burns organic matter",
                    "Main ingredient in car batteries",
                    "Used to make fertilizers and explosives",
                    "Colorless, oily, dense liquid",
                    "Generates intense heat when mixed with water",
                    "Used in petroleum refining",
                    "Can char sugar and dehydrate compounds",
                    "Essential for producing phosphate fertilizers"
                ],
                image: "🔋"
            },
            {
                name: "Water",
                formula: "H₂O",
                composition: { H: 2, O: 1 },
                bonds: [[0, 2], [1, 2]],
                description: "Water is essential for life. It covers 71% of Earth's surface.",
                properties: [
                    "Liquid at room temperature",
                    "Freezes at 0°C",
                    "Boils at 100°C",
                    "Universal solvent"
                ],
                image: "💧"
            }
        ]
    },
    {
        id: 6,
        name: "Lesson 6: Alcohols and Ethers",
        description: "Learn about methanol, ethanol, and simple organic compounds",
        atoms: [
            { element: "C", count: 6, color: "#4A4A4A", name: "Carbon" },
            { element: "H", count: 18, color: "#FFB6C1", name: "Hydrogen" },
            { element: "O", count: 6, color: "#FF6B6B", name: "Oxygen" }
        ],
        molecules: [
            {
                name: "Methanol",
                formula: "CH₃OH",
                composition: { C: 1, H: 4, O: 1 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 5], [5, 4]],
                description: "Methanol is the simplest alcohol, also called wood alcohol because it was once made by heating wood. It's a clear liquid that looks and smells somewhat like drinking alcohol, but it's extremely poisonous - even small amounts can cause blindness or death! Methanol is used as antifreeze, fuel for racing cars, and to make other chemicals like formaldehyde. It's also being developed as a cleaner-burning fuel alternative to gasoline.",
                properties: [
                    "Colorless liquid with faint alcohol smell",
                    "Highly toxic - causes blindness and death",
                    "Used as racing car fuel and antifreeze",
                    "Simplest alcohol (only 1 carbon)",
                    "Burns with nearly invisible flame",
                    "Made from natural gas or biomass",
                    "Used to make formaldehyde and plastics",
                    "Also called wood alcohol or methyl alcohol",
                    "Lighter than water",
                    "Can be used in fuel cells for electricity"
                ],
                image: "🧴"
            },
            {
                name: "Ethanol",
                formula: "C₂H₅OH",
                composition: { C: 2, H: 6, O: 1 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 8], [8, 7]],
                description: "Ethanol is the type of alcohol found in beer, wine, and spirits that adults drink. It's made by yeast fermenting sugars from fruits, grains, or vegetables. Besides being in alcoholic beverages, ethanol is used as hand sanitizer (kills germs), biofuel (E85 gas), and in medicines. Pure ethanol is colorless with a characteristic smell. While safer than methanol, drinking too much ethanol is still dangerous and affects the brain and body.",
                properties: [
                    "Alcohol found in alcoholic beverages",
                    "Powerful disinfectant - kills bacteria and viruses",
                    "Made by fermentation of sugars by yeast",
                    "Used as biofuel (ethanol gas blends)",
                    "Colorless liquid with characteristic odor",
                    "Burns with blue flame",
                    "Main ingredient in hand sanitizer",
                    "Can be distilled from corn, sugarcane, or wheat",
                    "Also called grain alcohol or ethyl alcohol",
                    "Toxic in large amounts - affects brain function"
                ],
                image: "🍷"
            },
            {
                name: "Dimethyl Ether",
                formula: "CH₃OCH₃",
                composition: { C: 2, H: 6, O: 1 },
                bonds: [[0, 8], [1, 8], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 7]],
                description: "Dimethyl ether (DME) is an interesting molecule - it has the same atoms as ethanol (C₂H₆O) but they're arranged differently, making it a gas instead of a liquid! It has a slightly sweet smell and is used as a propellant in aerosol spray cans like hairspray and deodorant. DME is also being developed as a clean diesel fuel alternative because it burns without producing soot. It's non-toxic and biodegradable, making it environmentally friendly.",
                properties: [
                    "Colorless gas at room temperature",
                    "Propellant in aerosol spray cans",
                    "Slightly sweet, ether-like smell",
                    "Same formula as ethanol, different structure (isomer)",
                    "Being developed as clean diesel fuel",
                    "Burns without producing soot",
                    "Non-toxic and biodegradable",
                    "Can be made from natural gas or biomass",
                    "Used in refrigeration",
                    "Environmentally friendly compared to CFCs"
                ],
                image: "💨"
            },
            {
                name: "Formaldehyde",
                formula: "CH₂O",
                composition: { C: 1, H: 2, O: 1 },
                bonds: [[0, 1], [0, 2], [0, 3]],
                description: "Formaldehyde is used as a preservative and disinfectant.",
                properties: [
                    "Pungent smelling gas",
                    "Used in building materials",
                    "Preserves specimens",
                    "Can irritate eyes"
                ],
                image: "🏭"
            },
            {
                name: "Acetic Acid",
                formula: "CH₃COOH",
                composition: { C: 2, H: 4, O: 2 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 6], [1, 7], [7, 5]],
                description: "Acetic acid is what gives vinegar its sour taste and sharp smell! When you eat vinegar on your salad or fish and chips, you're tasting acetic acid. It's made by bacteria fermenting alcohol in a two-step process - first yeast makes alcohol from sugar, then special bacteria convert the alcohol into acetic acid. Vinegar is typically 4-8% acetic acid mixed with water. Pure acetic acid is called glacial acetic acid because it freezes into ice-like crystals.",
                properties: [
                    "Main component of vinegar (4-8% solution)",
                    "Sour, tart taste and pungent smell",
                    "Natural food preservative and flavoring",
                    "Weak acid compared to strong acids",
                    "Made by bacterial fermentation of alcohol",
                    "Pure form called glacial acetic acid",
                    "Colorless liquid",
                    "Used in pickling and food preservation",
                    "Can be produced by wood distillation",
                    "Also called ethanoic acid"
                ],
                image: "🥗"
            }
        ]
    },
    {
        id: 7,
        name: "Lesson 7: Phosphorus and Silicon",
        description: "Discover phosphine, phosphoric acid, and silane",
        atoms: [
            { element: "P", count: 4, color: "#FFA500", name: "Phosphorus" },
            { element: "Si", count: 2, color: "#C0C0C0", name: "Silicon" },
            { element: "H", count: 14, color: "#FFB6C1", name: "Hydrogen" },
            { element: "O", count: 8, color: "#FF6B6B", name: "Oxygen" }
        ],
        molecules: [
            {
                name: "Phosphine",
                formula: "PH₃",
                composition: { P: 1, H: 3 },
                bonds: [[0, 1], [0, 2], [0, 3]],
                description: "Phosphine is a highly toxic gas with a distinctive fishy or garlic-like smell. It's similar in structure to ammonia (NH₃) but with phosphorus instead of nitrogen. Phosphine occurs naturally in swamps from decaying organic matter and some scientists think it might even exist on Venus! It's used as a fumigant to kill pests in stored grain. Recently, scientists discovered phosphine in Venus's atmosphere, which sparked excitement because it could be a sign of life!",
                properties: [
                    "Colorless, highly toxic gas",
                    "Fishy or garlic-like smell",
                    "Pyramid shape like ammonia",
                    "Used as fumigant for grain storage",
                    "Spontaneously flammable in air",
                    "Found naturally in swamps",
                    "Detected in Venus's atmosphere (possible biosignature)",
                    "More toxic than ammonia",
                    "Heavier than air",
                    "Reacts with oxygen to form phosphoric acid"
                ],
                image: "☠️"
            },
            {
                name: "Phosphoric Acid",
                formula: "H₃PO₄",
                composition: { H: 3, P: 1, O: 4 },
                bonds: [[0, 4], [3, 4], [1, 5], [3, 5], [2, 6], [3, 6], [3, 7]],
                description: "Phosphoric acid is the tangy ingredient that gives cola drinks their sharp taste! It's a weak acid that's much safer than strong acids like sulfuric acid. Farmers use huge amounts of phosphoric acid to make fertilizers that help plants grow strong roots. It's also used to remove rust from metal and in many foods as a flavoring and preservative. Your body needs phosphorus (from phosphoric acid compounds) for strong bones and teeth!",
                properties: [
                    "Gives cola drinks their tangy taste",
                    "Used to make phosphate fertilizers",
                    "Weak acid - safer than strong acids",
                    "Removes rust from metal surfaces",
                    "Colorless, syrupy liquid",
                    "Used as food additive (E338)",
                    "Essential for bone and tooth formation",
                    "Non-toxic in small amounts",
                    "Used in dental cement",
                    "Also called orthophosphoric acid"
                ],
                image: "🥤"
            },
            {
                name: "Silane",
                formula: "SiH₄",
                composition: { Si: 1, H: 4 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
                description: "Silane is a crucial chemical for making computer chips and solar panels - the technology that powers our modern world! It's similar to methane (CH₄) but with silicon instead of carbon. Silane is used in a process called chemical vapor deposition to create ultra-pure silicon layers on computer chips. When silane decomposes, it deposits pure silicon - perfect for making the tiny circuits in smartphones and computers. It's highly flammable and will even catch fire spontaneously in air!",
                properties: [
                    "Colorless gas used in semiconductor industry",
                    "Essential for making computer chips",
                    "Used to manufacture solar panels",
                    "Highly flammable - ignites spontaneously in air",
                    "Similar structure to methane (CH₄)",
                    "Decomposes to form pure silicon",
                    "Tetrahedral molecular shape",
                    "Used in chemical vapor deposition",
                    "Enables modern electronics technology",
                    "Sweet smell but highly toxic"
                ],
                image: "💻"
            },
            {
                name: "Silicon Dioxide",
                formula: "SiO₂",
                composition: { Si: 1, O: 2 },
                bonds: [[0, 1], [0, 2]],
                description: "Silicon dioxide is everywhere - it's sand on the beach, quartz crystals, and the main ingredient in glass! It's one of the most common compounds on Earth's surface. When you build a sandcastle, you're playing with billions of silicon dioxide molecules. Silicon dioxide is incredibly useful: it's melted to make glass for windows and bottles, used in concrete, and even in toothpaste to help clean your teeth. Quartz, amethyst, and citrine are all beautiful crystalline forms of silicon dioxide.",
                properties: [
                    "Main component of sand on beaches",
                    "Forms beautiful quartz crystals",
                    "Used to make glass and windows",
                    "One of Earth's most abundant compounds",
                    "Very hard - ranks 7 on hardness scale",
                    "Melting point of 1710°C (3110°F)",
                    "Used in concrete and ceramics",
                    "Found in toothpaste as abrasive",
                    "Forms gems: amethyst, citrine, agate",
                    "Essential component of fiber optic cables"
                ],
                image: "🏖️"
            },
            {
                name: "Water",
                formula: "H₂O",
                composition: { H: 2, O: 1 },
                bonds: [[0, 2], [1, 2]],
                description: "Water is essential for life. It covers 71% of Earth's surface.",
                properties: [
                    "Liquid at room temperature",
                    "Freezes at 0°C",
                    "Boils at 100°C",
                    "Universal solvent"
                ],
                image: "💧"
            }
        ]
    },
    {
        id: 8,
        name: "Lesson 8: Noble Gas Compounds",
        description: "Learn about rare compounds with noble gases",
        atoms: [
            { element: "Xe", count: 2, color: "#87CEEB", name: "Xenon" },
            { element: "F", count: 10, color: "#98FB98", name: "Fluorine" },
            { element: "O", count: 6, color: "#FF6B6B", name: "Oxygen" },
            { element: "H", count: 4, color: "#FFB6C1", name: "Hydrogen" }
        ],
        molecules: [
            {
                name: "Xenon Difluoride",
                formula: "XeF₂",
                composition: { Xe: 1, F: 2 },
                bonds: [[0, 1], [0, 2]],
                description: "Xenon difluoride shocked the scientific world when it was discovered in 1962! For over 100 years, scientists thought noble gases like xenon couldn't form compounds because they were too \"stable\" and \"lazy\" to react. But xenon can be forced to bond with highly reactive fluorine! This colorless crystalline compound is used in the semiconductor industry to etch (carve) patterns on silicon chips. It's a remarkable example of how science constantly surprises us with new discoveries!",
                properties: [
                    "Colorless crystalline solid",
                    "One of few stable noble gas compounds",
                    "Strong oxidizing agent",
                    "Used to etch silicon in chip manufacturing",
                    "Linear molecular shape",
                    "Discovered in 1962 - shocked scientists",
                    "Reacts with water to release oxygen",
                    "Made by heating xenon and fluorine together",
                    "Used in chemical synthesis",
                    "Proves noble gases aren't completely inert"
                ],
                image: "💎"
            },
            {
                name: "Xenon Tetrafluoride",
                formula: "XeF₄",
                composition: { Xe: 1, F: 4 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
                description: "Xenon tetrafluoride is an even more impressive noble gas compound than XeF₂ - it has four fluorine atoms bonded to xenon! This colorless crystal has a beautiful square planar shape, with all four fluorines arranged in a perfect square around the xenon atom. It's a powerful fluorinating agent, meaning it can transfer fluorine atoms to other molecules. This is useful in making specialized chemicals, though it must be handled very carefully because it's extremely reactive.",
                properties: [
                    "Colorless crystalline solid",
                    "Beautiful square planar molecular shape",
                    "Very reactive fluorinating agent",
                    "Used to make other fluorine compounds",
                    "More reactive than XeF₂",
                    "Decomposes when heated",
                    "Can oxidize many substances",
                    "Must be handled with extreme care",
                    "Made at high pressure and temperature",
                    "Example of expanded valence in noble gases"
                ],
                image: "⬜"
            },
            {
                name: "Hydrogen Fluoride",
                formula: "HF",
                composition: { H: 1, F: 1 },
                bonds: [[0, 1]],
                description: "Hydrogen fluoride is one of the few chemicals that can etch (eat away) glass! It's used to frost glass, create patterns on windows, and make non-stick Teflon coatings for frying pans. Hydrogen fluoride is extremely dangerous - it's highly corrosive and toxic, and can cause severe burns. Despite being dangerous, it's essential for many industrial processes. Fun fact: fluoride in toothpaste comes from hydrogen fluoride compounds, but in safe, tooth-protecting amounts!",
                properties: [
                    "Colorless gas or liquid",
                    "Extremely corrosive - eats through glass",
                    "Used to etch and frost glass",
                    "Essential for making Teflon (non-stick coating)",
                    "Very dangerous - causes severe chemical burns",
                    "Forms strong hydrogen bonds",
                    "Used to make fluoride in toothpaste",
                    "Can dissolve most materials",
                    "Stored in plastic or wax containers (not glass!)",
                    "Used in petroleum refining"
                ],
                image: "🪟"
            },
            {
                name: "Fluorine Gas",
                formula: "F₂",
                composition: { F: 2 },
                bonds: [[0, 1]],
                description: "Fluorine gas holds the title of the most reactive element in the entire periodic table - it will react with almost anything, even gold and platinum! It's a pale yellow-green gas that's extremely toxic and corrosive. Fluorine is so reactive that it was incredibly difficult to isolate - it took scientists decades and even caused injuries and deaths during research. Despite being dangerous, fluorine compounds are everywhere: in toothpaste (fluoride), non-stick pans (Teflon), and refrigerants.",
                properties: [
                    "Pale yellow-green gas",
                    "Most reactive element known",
                    "Extremely toxic and corrosive",
                    "Reacts with almost every element",
                    "Can make water burn!",
                    "Very difficult and dangerous to produce",
                    "Used to make Teflon and refrigerants",
                    "Fluoride compounds prevent tooth decay",
                    "Lighter than air",
                    "Strong oxidizing agent"
                ],
                image: "⚡"
            },
            {
                name: "Oxygen Difluoride",
                formula: "OF₂",
                composition: { O: 1, F: 2 },
                bonds: [[0, 1], [0, 2]],
                description: "Oxygen difluoride is a strange and dangerous molecule where oxygen is bonded to fluorine - normally oxygen is the reactive one, but fluorine is even more reactive! This colorless, poisonous gas is an extremely powerful oxidizer that was considered for use as rocket propellant because it releases so much energy when it reacts. It's similar in shape to water but far more dangerous. Oxygen difluoride must be handled with extreme care in specialized equipment.",
                properties: [
                    "Colorless, poisonous gas",
                    "Extremely powerful oxidizing agent",
                    "Considered for rocket propellant",
                    "More reactive than oxygen alone",
                    "Highly toxic - even small amounts dangerous",
                    "Bent molecular shape like water",
                    "Reacts violently with most materials",
                    "Unstable - decomposes easily",
                    "Used in specialized chemical synthesis",
                    "Must be stored at low temperatures"
                ],
                image: "🚀"
            }
        ]
    },
    {
        id: 9,
        name: "Lesson 9: Atmospheric Chemistry",
        description: "Explore molecules found in Earth's atmosphere",
        atoms: [
            { element: "N", count: 6, color: "#4169E1", name: "Nitrogen" },
            { element: "O", count: 10, color: "#FF6B6B", name: "Oxygen" },
            { element: "Ar", count: 2, color: "#B0C4DE", name: "Argon" },
            { element: "C", count: 2, color: "#4A4A4A", name: "Carbon" },
            { element: "H", count: 4, color: "#FFB6C1", name: "Hydrogen" }
        ],
        molecules: [
            {
                name: "Nitrogen Gas",
                formula: "N₂",
                composition: { N: 2 },
                bonds: [[0, 1]],
                description: "Nitrogen gas makes up an incredible 78% of the air you're breathing right now - it's by far the most abundant gas in Earth's atmosphere! Despite being all around us, nitrogen is quite unreactive due to its very strong triple bond. This \"laziness\" makes it perfect for preserving food - potato chip bags are filled with nitrogen to prevent staleness. Nitrogen is also essential for life: all proteins and DNA contain nitrogen atoms, though plants and animals can't use atmospheric nitrogen directly.",
                properties: [
                    "78% of Earth's atmosphere",
                    "Colorless, odorless, and tasteless gas",
                    "Has strong triple bond (N≡N)",
                    "Relatively unreactive under normal conditions",
                    "Used to preserve packaged foods",
                    "Essential element for all living things",
                    "Must be \"fixed\" for plants to use it",
                    "Converted to ammonia for fertilizers",
                    "Used to freeze food instantly (liquid nitrogen)",
                    "Non-toxic - we breathe it constantly"
                ],
                image: "💨"
            },
            {
                name: "Oxygen Gas",
                formula: "O₂",
                composition: { O: 2 },
                bonds: [[0, 1]],
                description: "Oxygen gas makes up 21% of Earth's atmosphere and is absolutely essential for almost all life on our planet! Every breath you take brings oxygen into your lungs, where it's transported by your blood to every cell in your body to help convert food into energy. Oxygen is also what makes fire burn - without oxygen, flames cannot exist. Interestingly, oxygen gas is slightly magnetic and pale blue when liquified, and it was only discovered in the 1770s despite being all around us!",
                properties: [
                    "21% of Earth's atmosphere",
                    "Absolutely necessary for respiration",
                    "Required for fire to burn",
                    "Pale blue as liquid, colorless as gas",
                    "Slightly magnetic (paramagnetic)",
                    "Discovered independently by Priestley and Scheele",
                    "Produced by plants during photosynthesis",
                    "Forms ozone (O₃) in upper atmosphere",
                    "Used in hospitals for medical treatment",
                    "Essential for most aerobic life forms"
                ],
                image: "🌬️"
            },
            {
                name: "Argon",
                formula: "Ar",
                composition: { Ar: 1 },
                bonds: [],
                description: "Argon is a noble gas that makes up about 1% of Earth's atmosphere - that makes it the third most abundant gas after nitrogen and oxygen! As a noble gas, argon is completely unreactive and never forms compounds under normal conditions. This chemical laziness makes it perfect for protecting things from oxygen: argon is used to fill light bulbs to prevent the filament from burning out, to preserve old documents, and to create inert atmospheres in welding. Its name comes from the Greek word \"argos,\" meaning \"lazy\" or \"inactive\"!",
                properties: [
                    "Third most abundant gas in air (0.93%)",
                    "Completely unreactive noble gas",
                    "Used to fill incandescent light bulbs",
                    "Colorless, odorless, and tasteless",
                    "Protects materials from oxygen damage",
                    "Used in welding to shield hot metal",
                    "Name means \"lazy\" in Greek",
                    "Discovered in 1894 by Rayleigh and Ramsay",
                    "Produced by radioactive decay of potassium",
                    "Used in neon signs for blue color"
                ],
                image: "💡"
            },
            {
                name: "Carbon Dioxide",
                formula: "CO₂",
                composition: { C: 1, O: 2 },
                bonds: [[0, 1], [0, 2]],
                description: "Carbon dioxide is a critical molecule in Earth's life cycle - you exhale it with every breath, and plants absorb it to make food through photosynthesis! While it makes up only about 0.04% of our atmosphere, it's incredibly important as a greenhouse gas that helps keep Earth warm enough for life. However, too much CO₂ from burning fossil fuels is causing climate change. Carbon dioxide is also what makes soda fizzy, dry ice smoky, and fire extinguishers work!",
                properties: [
                    "About 0.04% of atmosphere (but increasing)",
                    "Important greenhouse gas - traps heat",
                    "Essential for plant photosynthesis",
                    "Produced when we breathe out",
                    "Makes carbonated drinks fizzy",
                    "Dry ice is solid carbon dioxide",
                    "Used in fire extinguishers",
                    "Heavier than air - sinks to ground",
                    "Dissolved in oceans - affects ocean pH",
                    "Rising levels contribute to climate change"
                ],
                image: "☁️"
            },
            {
                name: "Ozone",
                formula: "O₃",
                composition: { O: 3 },
                bonds: [[0, 1], [1, 2]],
                description: "Ozone is Earth's natural sunscreen - a layer of this molecule high in the stratosphere protects all life on Earth from the Sun's harmful ultraviolet radiation! Ozone is made of three oxygen atoms (instead of the usual two) and has a distinctive sharp smell - you might smell it after lightning strikes or near electric motors. While ozone high in the atmosphere protects us, ozone at ground level is a pollutant that can harm our lungs. The \"ozone hole\" discovered in the 1980s led to a worldwide ban on chemicals that were destroying this protective layer.",
                properties: [
                    "Protective layer in stratosphere (15-35 km up)",
                    "Pale blue gas with sharp, clean smell",
                    "Blocks harmful UV radiation from Sun",
                    "Made of three oxygen atoms (O₃)",
                    "Created by UV light hitting O₂ molecules",
                    "Smells like fresh air after thunderstorms",
                    "Ground-level ozone is an air pollutant",
                    "CFCs damaged ozone layer (now banned)",
                    "Ozone layer is slowly recovering",
                    "Very reactive and unstable molecule"
                ],
                image: "🛡️"
            }
        ]
    }
];
