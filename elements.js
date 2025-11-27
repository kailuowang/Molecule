// Element information database
const ELEMENTS = {
    H: {
        name: "Hydrogen",
        symbol: "H",
        color: "#FFB6C1",
        description: "Hydrogen is the simplest and most abundant element in the universe, making up about 75% of all normal matter. It has just one proton and one electron. Hydrogen is the fuel that powers stars through nuclear fusion. On Earth, it's found in water, all living things, and most compounds. Hydrogen gas (H₂) is extremely light and was once used in airships like the Hindenburg.",
        properties: [
            "Atomic number: 1 (simplest element)",
            "Lightest element in existence",
            "Most abundant element in universe",
            "Colorless, odorless, tasteless gas",
            "Highly flammable - burns with pale blue flame",
            "Found in water and all organic compounds",
            "Powers the Sun through nuclear fusion",
            "Can be used as clean fuel (only produces water)",
            "Discovered in 1766 by Henry Cavendish",
            "Named from Greek 'hydro' (water) and 'genes' (forming)"
        ],
        image: "⚛️"
    },
    C: {
        name: "Carbon",
        symbol: "C",
        color: "#4A4A4A",
        description: "Carbon is the foundation of all life on Earth! Every living thing contains carbon - it's in your DNA, proteins, fats, and sugars. Carbon is unique because it can form four bonds, allowing it to create millions of different compounds. Carbon exists in many forms: diamond (the hardest natural material), graphite (in pencils), and graphene (thinnest material ever made). We're made of carbon!",
        properties: [
            "Atomic number: 6",
            "Basis of all organic chemistry and life",
            "Can form 4 bonds with other atoms",
            "Forms millions of different compounds",
            "Exists as diamond, graphite, graphene, fullerenes",
            "Found in all living organisms",
            "In coal, oil, natural gas, and limestone",
            "Essential element in DNA and proteins",
            "Named from Latin 'carbo' (coal)",
            "Carbon-14 used for dating ancient objects"
        ],
        image: "💎"
    },
    N: {
        name: "Nitrogen",
        symbol: "N",
        color: "#4169E1",
        description: "Nitrogen makes up 78% of Earth's atmosphere - you're breathing it right now! Despite being all around us, nitrogen gas is quite unreactive due to its strong triple bond. Nitrogen is essential for life - it's found in all proteins, DNA, and many other biological molecules. However, plants can't use atmospheric nitrogen directly; special bacteria must 'fix' it first by converting it into usable forms like ammonia.",
        properties: [
            "Atomic number: 7",
            "78% of Earth's atmosphere",
            "Colorless, odorless, tasteless gas",
            "Essential for proteins and DNA",
            "Very unreactive as N₂ gas (triple bond)",
            "Must be 'fixed' for plants to use it",
            "Used in fertilizers (as ammonia or nitrates)",
            "Liquid nitrogen is extremely cold (-196°C)",
            "Discovered in 1772 by Daniel Rutherford",
            "Named from 'nitre' (potassium nitrate)"
        ],
        image: "🌫️"
    },
    O: {
        name: "Oxygen",
        symbol: "O",
        color: "#FF6B6B",
        description: "Oxygen is essential for almost all life on Earth - we breathe it to survive! It makes up 21% of the atmosphere and is the third most abundant element in the universe. Oxygen is highly reactive and forms compounds with almost every other element. When you breathe, oxygen is transported by your blood to every cell to help convert food into energy. Oxygen also makes fire burn - without it, flames cannot exist!",
        properties: [
            "Atomic number: 8",
            "21% of Earth's atmosphere",
            "Third most abundant element in universe",
            "Essential for cellular respiration",
            "Required for combustion (fire)",
            "Slightly magnetic (paramagnetic)",
            "Pale blue as liquid, colorless as gas",
            "Produced by plants during photosynthesis",
            "Discovered in 1770s by Priestley and Scheele",
            "Named from Greek 'oxy' (acid) and 'genes' (forming)"
        ],
        image: "💨"
    },
    S: {
        name: "Sulfur",
        symbol: "S",
        color: "#FFD700",
        description: "Sulfur is a bright yellow element known for its distinctive smell - think of rotten eggs or volcanic gases! It's found in volcanic areas and hot springs. Sulfur is essential for life - it's in two important amino acids that make up proteins. Industrially, sulfur is used to make sulfuric acid (the most produced chemical in the world), matches, gunpowder, and rubber for car tires.",
        properties: [
            "Atomic number: 16",
            "Bright yellow solid at room temperature",
            "Strong smell (like rotten eggs in compounds)",
            "Found in volcanic regions and hot springs",
            "Essential for proteins (in amino acids)",
            "Used to make sulfuric acid",
            "Used in matches, gunpowder, and fireworks",
            "Vulcanizes rubber for car tires",
            "Ancient element known since prehistoric times",
            "Named from Latin 'sulphurium'"
        ],
        image: "🔥"
    },
    P: {
        name: "Phosphorus",
        symbol: "P",
        color: "#FFA500",
        description: "Phosphorus is a highly reactive element that glows in the dark (in its white form) - its name means 'light bearer' in Greek! It's essential for life - found in DNA, RNA, and ATP (the molecule that stores energy in cells). Phosphorus is also in your bones and teeth as calcium phosphate. White phosphorus is so reactive it spontaneously catches fire in air, while red phosphorus is used in matches.",
        properties: [
            "Atomic number: 15",
            "Name means 'light bearer' in Greek",
            "Essential for DNA, RNA, and ATP",
            "Found in bones and teeth (as phosphates)",
            "White form glows in dark and ignites in air",
            "Red form used on matchbox striking surface",
            "Key ingredient in fertilizers",
            "Never found free in nature (too reactive)",
            "Discovered in 1669 by Hennig Brand",
            "Used in fireworks and bombs"
        ],
        image: "✨"
    },
    Cl: {
        name: "Chlorine",
        symbol: "Cl",
        color: "#7FFF00",
        description: "Chlorine is a yellow-green poisonous gas with a strong, choking smell. Despite being toxic, chlorine is extremely useful - it's added to drinking water and swimming pools to kill harmful bacteria and make water safe. Chlorine is also used to make bleach (sodium hypochlorite) which whitens clothes and disinfects surfaces. As table salt (NaCl), chlorine combined with sodium is essential for life!",
        properties: [
            "Atomic number: 17",
            "Yellow-green gas with choking smell",
            "Highly toxic and reactive halogen",
            "Used to purify drinking water",
            "Disinfects swimming pools",
            "Makes bleach for cleaning and whitening",
            "Part of table salt (NaCl)",
            "Used to make PVC plastic",
            "Discovered in 1774 by Carl Scheele",
            "Named from Greek 'chloros' (greenish-yellow)"
        ],
        image: "🏊"
    },
    Na: {
        name: "Sodium",
        symbol: "Na",
        color: "#FFA500",
        description: "Sodium is a soft, silvery metal that's so reactive it must be stored in oil - it explodes violently when it touches water! Despite being dangerous alone, sodium combines with chlorine to form table salt (NaCl), which is essential for life. Sodium is in every cell in your body, helping nerves send signals and muscles contract. When burned, sodium produces a bright yellow-orange flame used in street lamps.",
        properties: [
            "Atomic number: 11",
            "Soft, silvery metal that can be cut with knife",
            "Explodes violently in water",
            "Essential for nerve and muscle function",
            "Part of table salt (NaCl)",
            "Sixth most abundant element on Earth",
            "Produces bright yellow-orange flame when burned",
            "Used in sodium vapor street lamps",
            "Symbol 'Na' from Latin 'natrium'",
            "Never found free in nature (too reactive)"
        ],
        image: "🧂"
    },
    F: {
        name: "Fluorine",
        symbol: "F",
        color: "#90EE90",
        description: "Fluorine is the most reactive element in the entire periodic table - it will react with almost anything, even gold and platinum! It's a pale yellow-green, highly toxic gas. Despite being dangerous, fluorine compounds are everywhere: fluoride in toothpaste prevents cavities, Teflon makes non-stick pans, and fluorinated compounds are used in refrigerators and air conditioners. Fluorine was incredibly difficult to isolate safely.",
        properties: [
            "Atomic number: 9",
            "Most reactive element known",
            "Pale yellow-green gas",
            "Extremely toxic and corrosive",
            "Reacts with nearly every element",
            "Fluoride compounds prevent tooth decay",
            "Used to make Teflon (non-stick coating)",
            "Used in refrigerants and air conditioning",
            "Very difficult and dangerous to produce",
            "Named from Latin 'fluere' (to flow)"
        ],
        image: "⚡"
    },
    Xe: {
        name: "Xenon",
        symbol: "Xe",
        color: "#B0C4DE",
        description: "Xenon is a noble gas that was thought to be completely unreactive for over 100 years! Scientists were shocked in 1962 when xenon compounds were discovered. Xenon is extremely rare - there's only 1 part xenon in 20 million parts of air. It's used in camera flashes, plasma TVs, high-intensity lamps, and even as anesthesia in surgery. When xenon glows, it produces a beautiful blue-white light.",
        properties: [
            "Atomic number: 54",
            "Noble gas - very unreactive (usually)",
            "Extremely rare in atmosphere",
            "Colorless, odorless, tasteless gas",
            "Used in camera flash tubes",
            "Produces bright blue-white light",
            "Used in plasma TVs and high-intensity lamps",
            "Can be used as anesthesia",
            "Forms compounds with fluorine (surprised scientists!)",
            "Named from Greek 'xenos' (stranger)"
        ],
        image: "💡"
    },
    Ar: {
        name: "Argon",
        symbol: "Ar",
        color: "#B0C4DE",
        description: "Argon is a noble gas that makes up about 1% of Earth's atmosphere - making it the third most abundant gas we breathe! The name argon comes from Greek meaning 'lazy' or 'inactive' because it almost never reacts with anything. This chemical laziness makes argon perfect for protecting things from oxygen: it's used in light bulbs, welding, preserving old documents, and in double-pane windows for insulation.",
        properties: [
            "Atomic number: 18",
            "Third most abundant gas in air (0.93%)",
            "Noble gas - completely unreactive",
            "Colorless, odorless, tasteless",
            "Used to fill light bulbs",
            "Protects materials from oxygen",
            "Used in welding to shield molten metal",
            "In double-pane windows for insulation",
            "Used in neon signs (produces blue color)",
            "Name means 'lazy' in Greek"
        ],
        image: "⚪"
    },
    Si: {
        name: "Silicon",
        symbol: "Si",
        color: "#A9A9A9",
        description: "Silicon is the second most abundant element in Earth's crust (after oxygen) - it makes up 28% of the crust! Sand, rocks, clay, and glass are mostly silicon dioxide. Silicon is the foundation of the computer age - it's used to make all computer chips and electronics, giving us 'Silicon Valley.' Pure silicon crystals are grown into giant cylinders, sliced into wafers, and processed into the chips that power smartphones, computers, and modern technology.",
        properties: [
            "Atomic number: 14",
            "Second most abundant element in Earth's crust",
            "Main ingredient in sand, rocks, and glass",
            "Foundation of computer chip technology",
            "Used in all electronics and semiconductors",
            "Enables modern computers and smartphones",
            "Forms silicon dioxide (SiO₂) - quartz, sand",
            "Used in solar panels for renewable energy",
            "Shiny gray metalloid with crystal structure",
            "Named from Latin 'silex' (flint)"
        ],
        image: "🖥️"
    }
};
