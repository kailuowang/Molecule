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
                description: "Water is essential for life. It covers 71% of Earth's surface.",
                properties: [
                    "Liquid at room temperature",
                    "Freezes at 0°C (32°F)",
                    "Boils at 100°C (212°F)",
                    "Universal solvent"
                ],
                image: "💧"
            },
            {
                name: "Oxygen Gas",
                formula: "O₂",
                composition: { O: 2 },
                bonds: [[0, 1]],
                description: "Oxygen gas is what we breathe. It makes up 21% of Earth's atmosphere.",
                properties: [
                    "Colorless and odorless gas",
                    "Necessary for respiration",
                    "Supports combustion",
                    "Slightly magnetic"
                ],
                image: "🌬️"
            },
            {
                name: "Hydrogen Gas",
                formula: "H₂",
                composition: { H: 2 },
                bonds: [[0, 1]],
                description: "Hydrogen is the lightest and most abundant element in the universe.",
                properties: [
                    "Lightest element",
                    "Highly flammable",
                    "Colorless and odorless",
                    "Used as rocket fuel"
                ],
                image: "🎈"
            },
            {
                name: "Ozone",
                formula: "O₃",
                composition: { O: 3 },
                bonds: [[0, 1], [1, 2]],
                description: "Ozone protects Earth from harmful UV radiation in the atmosphere.",
                properties: [
                    "Forms a protective layer",
                    "Blue gas with sharp smell",
                    "Powerful oxidizer",
                    "Protects from UV rays"
                ],
                image: "🛡️"
            },
            {
                name: "Hydrogen Peroxide",
                formula: "H₂O₂",
                composition: { H: 2, O: 2 },
                bonds: [[0, 2], [2, 3], [3, 1]],
                description: "Hydrogen peroxide is used as a disinfectant and bleaching agent.",
                properties: [
                    "Disinfects wounds",
                    "Bleaches hair",
                    "Breaks down into water",
                    "Bubbles on cuts"
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
                description: "Carbon dioxide is what we exhale. Plants use it for photosynthesis.",
                properties: [
                    "Greenhouse gas",
                    "Used in carbonated drinks",
                    "Dry ice is solid CO₂",
                    "Plants need it to grow"
                ],
                image: "☁️"
            },
            {
                name: "Methane",
                formula: "CH₄",
                composition: { C: 1, H: 4 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
                description: "Methane is natural gas, used for cooking and heating.",
                properties: [
                    "Main component of natural gas",
                    "Produced by cows and wetlands",
                    "Greenhouse gas",
                    "Burns with blue flame"
                ],
                image: "🔥"
            },
            {
                name: "Carbon Monoxide",
                formula: "CO",
                composition: { C: 1, O: 1 },
                bonds: [[0, 1]],
                description: "Carbon monoxide is a dangerous gas produced by incomplete combustion.",
                properties: [
                    "Toxic to humans",
                    "Colorless and odorless",
                    "Produced by cars",
                    "Detected by CO detectors"
                ],
                image: "⚠️"
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
                name: "Ethane",
                formula: "C₂H₆",
                composition: { C: 2, H: 6 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 6], [6, 4], [6, 5]],
                description: "Ethane is a component of natural gas and is used as a fuel.",
                properties: [
                    "Colorless gas",
                    "Found in natural gas",
                    "Used to make plastics",
                    "Clean burning fuel"
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
                bonds: [[0, 3], [1, 3], [2, 3]],
                description: "Ammonia is used in cleaning products and fertilizers.",
                properties: [
                    "Strong smell",
                    "Cleaning agent",
                    "Used in fertilizers",
                    "Dissolves easily in water"
                ],
                image: "🧼"
            },
            {
                name: "Nitrogen Gas",
                formula: "N₂",
                composition: { N: 2 },
                bonds: [[0, 1]],
                description: "Nitrogen makes up 78% of Earth's atmosphere.",
                properties: [
                    "Most abundant gas in air",
                    "Colorless and odorless",
                    "Relatively unreactive",
                    "Used to preserve food"
                ],
                image: "💨"
            },
            {
                name: "Nitrous Oxide",
                formula: "N₂O",
                composition: { N: 2, O: 1 },
                bonds: [[0, 1], [1, 2]],
                description: "Nitrous oxide is laughing gas, used as an anesthetic.",
                properties: [
                    "Sweet smelling gas",
                    "Used in dentistry",
                    "Called laughing gas",
                    "Greenhouse gas"
                ],
                image: "😄"
            },
            {
                name: "Nitric Oxide",
                formula: "NO",
                composition: { N: 1, O: 1 },
                bonds: [[0, 1]],
                description: "Nitric oxide is a signaling molecule in the body.",
                properties: [
                    "Colorless gas",
                    "Important in biology",
                    "Air pollutant",
                    "Regulates blood pressure"
                ],
                image: "🔬"
            },
            {
                name: "Hydrazine",
                formula: "N₂H₄",
                composition: { N: 2, H: 4 },
                bonds: [[0, 4], [1, 4], [4, 5], [2, 5], [3, 5]],
                description: "Hydrazine is used as rocket fuel and in chemical synthesis.",
                properties: [
                    "Toxic and corrosive",
                    "Used as rocket fuel",
                    "Powerful reducing agent",
                    "Colorless liquid"
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
                description: "Table salt is sodium chloride, used to flavor food and preserve it.",
                properties: [
                    "Flavors food",
                    "Preserves food",
                    "Forms cubic crystals",
                    "Dissolves in water"
                ],
                image: "🧂"
            },
            {
                name: "Hydrochloric Acid",
                formula: "HCl",
                composition: { H: 1, Cl: 1 },
                bonds: [[0, 1]],
                description: "Hydrochloric acid is found in stomach acid and helps digest food.",
                properties: [
                    "Strong acid",
                    "In stomach acid",
                    "Helps digest food",
                    "Corrosive"
                ],
                image: "🧪"
            },
            {
                name: "Sodium Hydroxide",
                formula: "NaOH",
                composition: { Na: 1, O: 1, H: 1 },
                bonds: [[0, 2], [1, 2]],
                description: "Sodium hydroxide, or lye, is used in soap making and drain cleaners.",
                properties: [
                    "Strong base",
                    "Used in soap making",
                    "Very caustic",
                    "Dissolves grease"
                ],
                image: "🧴"
            },
            {
                name: "Chlorine Gas",
                formula: "Cl₂",
                composition: { Cl: 2 },
                bonds: [[0, 1]],
                description: "Chlorine gas is used to purify water and make bleach.",
                properties: [
                    "Yellow-green gas",
                    "Purifies water",
                    "Strong smell",
                    "Used in pools"
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
                description: "Sulfur dioxide is produced by volcanoes and burning fossil fuels.",
                properties: [
                    "Colorless gas",
                    "Sharp, irritating smell",
                    "Air pollutant",
                    "Used as preservative"
                ],
                image: "🌋"
            },
            {
                name: "Hydrogen Sulfide",
                formula: "H₂S",
                composition: { H: 2, S: 1 },
                bonds: [[0, 2], [1, 2]],
                description: "Hydrogen sulfide smells like rotten eggs and is highly toxic.",
                properties: [
                    "Rotten egg smell",
                    "Highly toxic",
                    "Found in natural gas",
                    "Corrosive"
                ],
                image: "🥚"
            },
            {
                name: "Sulfur Trioxide",
                formula: "SO₃",
                composition: { S: 1, O: 3 },
                bonds: [[0, 1], [1, 2], [2, 0]],
                description: "Sulfur trioxide is used to make sulfuric acid.",
                properties: [
                    "Highly reactive",
                    "Makes sulfuric acid",
                    "White solid",
                    "Dissolves in water"
                ],
                image: "⚗️"
            },
            {
                name: "Sulfuric Acid",
                formula: "H₂SO₄",
                composition: { H: 2, S: 1, O: 4 },
                bonds: [[0, 2], [1, 2], [2, 6], [3, 6], [4, 6], [5, 6]],
                description: "Sulfuric acid is one of the most important industrial chemicals.",
                properties: [
                    "Very strong acid",
                    "Highly corrosive",
                    "Used in car batteries",
                    "Makes fertilizers"
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
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [4, 5]],
                description: "Methanol is the simplest alcohol, used as fuel and solvent.",
                properties: [
                    "Colorless liquid",
                    "Toxic if ingested",
                    "Used as fuel",
                    "Makes formaldehyde"
                ],
                image: "🧴"
            },
            {
                name: "Ethanol",
                formula: "C₂H₅OH",
                composition: { C: 2, H: 6, O: 1 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 6], [6, 4], [6, 5], [6, 7], [7, 8]],
                description: "Ethanol is drinking alcohol, also used as fuel and disinfectant.",
                properties: [
                    "Found in alcoholic drinks",
                    "Disinfectant",
                    "Biofuel",
                    "Made by fermentation"
                ],
                image: "🍷"
            },
            {
                name: "Dimethyl Ether",
                formula: "CH₃OCH₃",
                composition: { C: 2, H: 6, O: 1 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 6], [6, 7], [7, 4], [7, 5], [7, 8]],
                description: "Dimethyl ether is used as a propellant in aerosol sprays.",
                properties: [
                    "Colorless gas",
                    "Used in aerosols",
                    "Alternative fuel",
                    "Sweet smell"
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
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [4, 5], [4, 6], [6, 7]],
                description: "Acetic acid gives vinegar its sour taste and smell.",
                properties: [
                    "Main component of vinegar",
                    "Sour taste",
                    "Preservative",
                    "Weak acid"
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
                bonds: [[0, 3], [1, 3], [2, 3]],
                description: "Phosphine is a toxic gas with a fishy smell.",
                properties: [
                    "Colorless gas",
                    "Fishy smell",
                    "Highly toxic",
                    "Used as fumigant"
                ],
                image: "☠️"
            },
            {
                name: "Phosphoric Acid",
                formula: "H₃PO₄",
                composition: { H: 3, P: 1, O: 4 },
                bonds: [[0, 4], [1, 4], [2, 4], [4, 5], [4, 6], [4, 7], [5, 3]],
                description: "Phosphoric acid is used in soft drinks and fertilizers.",
                properties: [
                    "Found in cola drinks",
                    "Makes fertilizers",
                    "Weak acid",
                    "Rust remover"
                ],
                image: "🥤"
            },
            {
                name: "Silane",
                formula: "SiH₄",
                composition: { Si: 1, H: 4 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
                description: "Silane is used in making computer chips and solar panels.",
                properties: [
                    "Colorless gas",
                    "Highly flammable",
                    "Makes silicon chips",
                    "Used in electronics"
                ],
                image: "💻"
            },
            {
                name: "Silicon Dioxide",
                formula: "SiO₂",
                composition: { Si: 1, O: 2 },
                bonds: [[0, 1], [0, 2]],
                description: "Silicon dioxide is quartz and sand, used to make glass.",
                properties: [
                    "Main component of sand",
                    "Forms quartz crystals",
                    "Makes glass",
                    "Very hard"
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
                description: "Xenon difluoride is one of the few noble gas compounds.",
                properties: [
                    "Colorless crystals",
                    "Strong oxidizer",
                    "Etches silicon",
                    "Very reactive"
                ],
                image: "💎"
            },
            {
                name: "Xenon Tetrafluoride",
                formula: "XeF₄",
                composition: { Xe: 1, F: 4 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
                description: "Xenon tetrafluoride is a powerful fluorinating agent.",
                properties: [
                    "Colorless crystals",
                    "Very reactive",
                    "Makes fluorocarbons",
                    "Square planar shape"
                ],
                image: "⬜"
            },
            {
                name: "Hydrogen Fluoride",
                formula: "HF",
                composition: { H: 1, F: 1 },
                bonds: [[0, 1]],
                description: "Hydrogen fluoride is used to etch glass and make Teflon.",
                properties: [
                    "Colorless gas",
                    "Very corrosive",
                    "Etches glass",
                    "Makes Teflon"
                ],
                image: "🪟"
            },
            {
                name: "Fluorine Gas",
                formula: "F₂",
                composition: { F: 2 },
                bonds: [[0, 1]],
                description: "Fluorine is the most reactive element in the periodic table.",
                properties: [
                    "Pale yellow gas",
                    "Most reactive element",
                    "Very toxic",
                    "Reacts with almost everything"
                ],
                image: "⚡"
            },
            {
                name: "Oxygen Difluoride",
                formula: "OF₂",
                composition: { O: 1, F: 2 },
                bonds: [[0, 1], [0, 2]],
                description: "Oxygen difluoride is a powerful oxidizer used in rocketry.",
                properties: [
                    "Colorless gas",
                    "Strong oxidizer",
                    "Toxic",
                    "Rocket propellant"
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
                description: "Nitrogen makes up 78% of Earth's atmosphere.",
                properties: [
                    "Most abundant in air",
                    "Colorless and odorless",
                    "Relatively unreactive",
                    "Used to preserve food"
                ],
                image: "💨"
            },
            {
                name: "Oxygen Gas",
                formula: "O₂",
                composition: { O: 2 },
                bonds: [[0, 1]],
                description: "Oxygen gas is what we breathe. It makes up 21% of Earth's atmosphere.",
                properties: [
                    "21% of atmosphere",
                    "Necessary for respiration",
                    "Supports combustion",
                    "Slightly magnetic"
                ],
                image: "🌬️"
            },
            {
                name: "Argon",
                formula: "Ar",
                composition: { Ar: 1 },
                bonds: [],
                description: "Argon is a noble gas that makes up 1% of Earth's atmosphere.",
                properties: [
                    "Third most abundant in air",
                    "Completely unreactive",
                    "Used in light bulbs",
                    "Colorless and odorless"
                ],
                image: "💡"
            },
            {
                name: "Carbon Dioxide",
                formula: "CO₂",
                composition: { C: 1, O: 2 },
                bonds: [[0, 1], [0, 2]],
                description: "Carbon dioxide is what we exhale. Plants use it for photosynthesis.",
                properties: [
                    "0.04% of atmosphere",
                    "Greenhouse gas",
                    "Plants need it",
                    "We exhale it"
                ],
                image: "☁️"
            },
            {
                name: "Ozone",
                formula: "O₃",
                composition: { O: 3 },
                bonds: [[0, 1], [1, 2]],
                description: "Ozone protects Earth from harmful UV radiation in the atmosphere.",
                properties: [
                    "Forms protective layer",
                    "Blue gas with sharp smell",
                    "Protects from UV rays",
                    "Found in stratosphere"
                ],
                image: "🛡️"
            }
        ]
    }
];
