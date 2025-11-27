// Lesson data - easily editable for educators
const LESSONS = [
    {
        id: 1,
        name: "Lesson 1: Simple Molecules",
        description: "Learn about water, oxygen gas, and hydrogen gas",
        atoms: [
            { element: "H", count: 6, color: "#FFB6C1", name: "Hydrogen" },
            { element: "O", count: 3, color: "#FF6B6B", name: "Oxygen" }
        ],
        molecules: [
            {
                name: "Water",
                formula: "H₂O",
                composition: { H: 2, O: 1 },
                bonds: [[0, 2], [1, 2]], // H-O-H (H at 0, H at 1, O at 2)
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
                bonds: [[0, 1]], // O=O (double bond shown as one line)
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
                bonds: [[0, 1]], // H-H
                description: "Hydrogen is the lightest and most abundant element in the universe.",
                properties: [
                    "Lightest element",
                    "Highly flammable",
                    "Colorless and odorless",
                    "Used as rocket fuel"
                ],
                image: "🎈"
            }
        ]
    },
    {
        id: 2,
        name: "Lesson 2: Carbon Compounds",
        description: "Explore carbon dioxide, methane, and carbon monoxide",
        atoms: [
            { element: "C", count: 3, color: "#4A4A4A", name: "Carbon" },
            { element: "O", count: 4, color: "#FF6B6B", name: "Oxygen" },
            { element: "H", count: 8, color: "#FFB6C1", name: "Hydrogen" }
        ],
        molecules: [
            {
                name: "Carbon Dioxide",
                formula: "CO₂",
                composition: { C: 1, O: 2 },
                bonds: [[0, 1], [0, 2]], // O=C=O (carbon center bonded to both oxygens)
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
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]], // Carbon center bonded to all 4 hydrogens
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
                bonds: [[0, 1]], // C≡O (triple bond shown as one line)
                description: "Carbon monoxide is a dangerous gas produced by incomplete combustion.",
                properties: [
                    "Toxic to humans",
                    "Colorless and odorless",
                    "Produced by cars",
                    "Detected by CO detectors"
                ],
                image: "⚠️"
            }
        ]
    },
    {
        id: 3,
        name: "Lesson 3: Household Compounds",
        description: "Learn about ammonia, hydrogen peroxide, and more water",
        atoms: [
            { element: "N", count: 2, color: "#4169E1", name: "Nitrogen" },
            { element: "H", count: 8, color: "#FFB6C1", name: "Hydrogen" },
            { element: "O", count: 4, color: "#FF6B6B", name: "Oxygen" }
        ],
        molecules: [
            {
                name: "Ammonia",
                formula: "NH₃",
                composition: { N: 1, H: 3 },
                bonds: [[0, 3], [1, 3], [2, 3]], // N at index 3, H's at 0,1,2
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
                name: "Hydrogen Peroxide",
                formula: "H₂O₂",
                composition: { H: 2, O: 2 },
                bonds: [[0, 2], [2, 3], [3, 1]], // H-O-O-H (H at 0, H at 1, O at 2, O at 3)
                description: "Hydrogen peroxide is used as a disinfectant and bleaching agent.",
                properties: [
                    "Disinfects wounds",
                    "Bleaches hair",
                    "Breaks down into water and oxygen",
                    "Bubbles on cuts"
                ],
                image: "🩹"
            },
            {
                name: "Water",
                formula: "H₂O",
                composition: { H: 2, O: 1 },
                bonds: [[0, 2], [1, 2]], // H-O-H (H at 0, H at 1, O at 2)
                description: "Water is essential for life. It covers 71% of Earth's surface.",
                properties: [
                    "Liquid at room temperature",
                    "Freezes at 0°C (32°F)",
                    "Boils at 100°C (212°F)",
                    "Universal solvent"
                ],
                image: "💧"
            }
        ]
    },
    {
        id: 4,
        name: "Lesson 4: Salt and More",
        description: "Discover table salt and other ionic compounds",
        atoms: [
            { element: "Na", count: 3, color: "#FFA500", name: "Sodium" },
            { element: "Cl", count: 3, color: "#90EE90", name: "Chlorine" },
            { element: "H", count: 4, color: "#FFB6C1", name: "Hydrogen" },
            { element: "O", count: 2, color: "#FF6B6B", name: "Oxygen" }
        ],
        molecules: [
            {
                name: "Table Salt",
                formula: "NaCl",
                composition: { Na: 1, Cl: 1 },
                bonds: [[0, 1]], // Cl at 0, Na at 1
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
                bonds: [[0, 1]], // Cl at 0, H at 1
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
                bonds: [[0, 2], [1, 2]], // H at 0, Na at 1, O at 2 -> H-O-Na
                description: "Sodium hydroxide, or lye, is used in soap making and drain cleaners.",
                properties: [
                    "Strong base",
                    "Used in soap making",
                    "Very caustic",
                    "Dissolves grease"
                ],
                image: "🧴"
            }
        ]
    }
];
