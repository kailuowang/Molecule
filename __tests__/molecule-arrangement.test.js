/**
 * Tests for molecule arrangement - ensuring atoms are positioned correctly based on bonds
 */

// Simple mock classes that replicate the essential behavior
const BOND_DISTANCE = 80;
const ATOM_RADIUS = 25;
const FRICTION = 0.95;
const BOUNCE = 0.7;

// Mock app object
global.app = {
    mousePos: { x: 0, y: 0 },
    atoms: [],
    molecules: []
};

// Simple Atom class for testing
class Atom {
    constructor(element, color, name, x, y) {
        this.element = element;
        this.color = color;
        this.name = name;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = ATOM_RADIUS;
        this.isDragging = false;
        this.moleculeId = null;
    }
}

// Extract the arrangeMolecule and arrangeMoleculeByBonds logic
// This is a simplified version for testing
class Molecule {
    constructor(atoms, data) {
        this.id = Date.now() + Math.random();
        this.atoms = atoms;
        this.data = data;
        this.centerX = 0;
        this.centerY = 0;

        atoms.forEach(atom => {
            atom.moleculeId = this.id;
            this.centerX += atom.x;
            this.centerY += atom.y;
        });

        this.centerX /= atoms.length;
        this.centerY /= atoms.length;

        this.arrangeMolecule();
    }

    arrangeMolecule() {
        const atoms = this.atoms;
        const formula = this.data.formula;

        if (atoms.length === 1) {
            atoms[0].x = this.centerX;
            atoms[0].y = this.centerY;
        } else if (atoms.length === 2) {
            atoms[0].x = this.centerX - BOND_DISTANCE / 2;
            atoms[0].y = this.centerY;
            atoms[1].x = this.centerX + BOND_DISTANCE / 2;
            atoms[1].y = this.centerY;
        } else if (atoms.length === 3) {
            if (formula === 'NaOH') {
                const hydrogen = atoms.find(a => a.element === 'H');
                const oxygen = atoms.find(a => a.element === 'O');
                const sodium = atoms.find(a => a.element === 'Na');
                oxygen.x = this.centerX;
                oxygen.y = this.centerY;
                hydrogen.x = this.centerX - BOND_DISTANCE;
                hydrogen.y = this.centerY;
                sodium.x = this.centerX + BOND_DISTANCE;
                sodium.y = this.centerY;
            } else {
                const elementCounts = {};
                atoms.forEach(atom => {
                    elementCounts[atom.element] = (elementCounts[atom.element] || 0) + 1;
                });

                let centerAtom = null;
                let peripheralAtoms = [];

                for (let atom of atoms) {
                    if (elementCounts[atom.element] === 1) {
                        centerAtom = atom;
                    } else {
                        peripheralAtoms.push(atom);
                    }
                }

                if (centerAtom && peripheralAtoms.length === 2) {
                    centerAtom.x = this.centerX;
                    centerAtom.y = this.centerY;
                    const angle1 = Math.PI * 0.75;
                    const angle2 = Math.PI * 0.25;
                    peripheralAtoms[0].x = this.centerX + Math.cos(angle1) * BOND_DISTANCE;
                    peripheralAtoms[0].y = this.centerY + Math.sin(angle1) * BOND_DISTANCE;
                    peripheralAtoms[1].x = this.centerX + Math.cos(angle2) * BOND_DISTANCE;
                    peripheralAtoms[1].y = this.centerY + Math.sin(angle2) * BOND_DISTANCE;
                }
            }
        } else if (atoms.length === 4) {
            if (formula === 'H₂O₂') {
                const hydrogens = atoms.filter(a => a.element === 'H');
                const oxygens = atoms.filter(a => a.element === 'O');
                oxygens[0].x = this.centerX - BOND_DISTANCE / 2;
                oxygens[0].y = this.centerY;
                oxygens[1].x = this.centerX + BOND_DISTANCE / 2;
                oxygens[1].y = this.centerY;
                hydrogens[0].x = this.centerX - BOND_DISTANCE * 1.5;
                hydrogens[0].y = this.centerY - BOND_DISTANCE * 0.5;
                hydrogens[1].x = this.centerX + BOND_DISTANCE * 1.5;
                hydrogens[1].y = this.centerY + BOND_DISTANCE * 0.5;
            } else {
                const elementCounts = {};
                atoms.forEach(atom => {
                    elementCounts[atom.element] = (elementCounts[atom.element] || 0) + 1;
                });

                let centerAtom = null;
                let peripheralAtoms = [];

                for (let atom of atoms) {
                    if (elementCounts[atom.element] === 1) {
                        centerAtom = atom;
                    } else {
                        peripheralAtoms.push(atom);
                    }
                }

                if (centerAtom && peripheralAtoms.length === 3) {
                    centerAtom.x = this.centerX;
                    centerAtom.y = this.centerY;
                    const angleStep = (Math.PI * 2) / 3;
                    peripheralAtoms.forEach((atom, i) => {
                        const angle = angleStep * i;
                        atom.x = this.centerX + Math.cos(angle) * BOND_DISTANCE;
                        atom.y = this.centerY + Math.sin(angle) * BOND_DISTANCE;
                    });
                } else {
                    const angle = (Math.PI * 2) / atoms.length;
                    atoms.forEach((atom, i) => {
                        atom.x = this.centerX + Math.cos(angle * i) * BOND_DISTANCE;
                        atom.y = this.centerY + Math.sin(angle * i) * BOND_DISTANCE;
                    });
                }
            }
        } else if (atoms.length === 5) {
            const elementCounts = {};
            atoms.forEach(atom => {
                elementCounts[atom.element] = (elementCounts[atom.element] || 0) + 1;
            });

            let centerAtom = null;
            let peripheralAtoms = [];

            for (let atom of atoms) {
                if (elementCounts[atom.element] === 1) {
                    centerAtom = atom;
                } else {
                    peripheralAtoms.push(atom);
                }
            }

            if (centerAtom && (peripheralAtoms.length === 3 || peripheralAtoms.length === 4)) {
                centerAtom.x = this.centerX;
                centerAtom.y = this.centerY;
                const angleStep = (Math.PI * 2) / peripheralAtoms.length;
                peripheralAtoms.forEach((atom, i) => {
                    const angle = angleStep * i;
                    atom.x = this.centerX + Math.cos(angle) * BOND_DISTANCE;
                    atom.y = this.centerY + Math.sin(angle) * BOND_DISTANCE;
                });
            }
        } else {
            // For larger molecules (6+ atoms), use bond-based graph layout
            if (this.data.bonds && this.data.bonds.length > 0) {
                this.arrangeMoleculeByBonds();
            } else {
                // Fallback: circular arrangement if no bond data
                const angle = (Math.PI * 2) / atoms.length;
                atoms.forEach((atom, i) => {
                    atom.x = this.centerX + Math.cos(angle * i) * BOND_DISTANCE;
                    atom.y = this.centerY + Math.sin(angle * i) * BOND_DISTANCE;
                });
            }
        }
    }

    // Graph-based molecule arrangement using bond connectivity
    arrangeMoleculeByBonds() {
        const atoms = this.atoms;
        const bonds = this.data.bonds;

        // Build adjacency list from bonds
        const adjacency = new Map();
        atoms.forEach((_, i) => adjacency.set(i, []));
        bonds.forEach(([a, b]) => {
            if (a < atoms.length && b < atoms.length) {
                adjacency.get(a).push(b);
                adjacency.get(b).push(a);
            }
        });

        // Find the atom with the most connections (likely central)
        let startAtom = 0;
        let maxConnections = 0;
        adjacency.forEach((neighbors, atomIndex) => {
            if (neighbors.length > maxConnections) {
                maxConnections = neighbors.length;
                startAtom = atomIndex;
            }
        });

        // BFS to position atoms layer by layer
        const positioned = new Set();
        const queue = [startAtom];

        // Position the first atom at center
        atoms[startAtom].x = this.centerX;
        atoms[startAtom].y = this.centerY;
        positioned.add(startAtom);

        while (queue.length > 0) {
            const currentIndex = queue.shift();
            const currentAtom = atoms[currentIndex];
            const neighbors = adjacency.get(currentIndex);

            // Filter to unpositioned neighbors
            const unpositionedNeighbors = neighbors.filter(n => !positioned.has(n));

            if (unpositionedNeighbors.length === 0) continue;

            // Calculate base angle - try to position neighbors away from already positioned ones
            let baseAngle = 0;
            const positionedNeighbors = neighbors.filter(n => positioned.has(n));

            if (positionedNeighbors.length > 0) {
                // Average angle of positioned neighbors, then go opposite
                let avgX = 0, avgY = 0;
                positionedNeighbors.forEach(n => {
                    avgX += atoms[n].x - currentAtom.x;
                    avgY += atoms[n].y - currentAtom.y;
                });
                baseAngle = Math.atan2(avgY, avgX) + Math.PI; // Opposite direction
            }

            // Calculate angle spread for unpositioned neighbors
            const spreadAngle = Math.min(Math.PI * 2 / 3, Math.PI / unpositionedNeighbors.length);
            const totalSpread = spreadAngle * (unpositionedNeighbors.length - 1);
            const startAngle = baseAngle - totalSpread / 2;

            unpositionedNeighbors.forEach((neighborIndex, i) => {
                const angle = startAngle + spreadAngle * i;
                atoms[neighborIndex].x = currentAtom.x + Math.cos(angle) * BOND_DISTANCE;
                atoms[neighborIndex].y = currentAtom.y + Math.sin(angle) * BOND_DISTANCE;
                positioned.add(neighborIndex);
                queue.push(neighborIndex);
            });
        }

        // Handle any disconnected atoms
        atoms.forEach((atom, i) => {
            if (!positioned.has(i)) {
                const angle = (Math.PI * 2 * i) / atoms.length;
                atom.x = this.centerX + Math.cos(angle) * BOND_DISTANCE;
                atom.y = this.centerY + Math.sin(angle) * BOND_DISTANCE;
            }
        });

        // Recenter the molecule
        let sumX = 0, sumY = 0;
        atoms.forEach(atom => {
            sumX += atom.x;
            sumY += atom.y;
        });
        const offsetX = this.centerX - sumX / atoms.length;
        const offsetY = this.centerY - sumY / atoms.length;
        atoms.forEach(atom => {
            atom.x += offsetX;
            atom.y += offsetY;
        });
    }
}

describe('Molecule Arrangement', () => {
    // Helper to create atoms for a molecule
    function createAtoms(composition, centerX = 300, centerY = 300) {
        const atoms = [];
        const defaultColors = {
            'H': '#FFB6C1', 'C': '#444444', 'O': '#FF6B6B', 'N': '#4169E1',
            'S': '#FFFF00', 'P': '#FFA500', 'F': '#90EE90', 'Cl': '#00FF00',
            'Ar': '#87CEEB', 'A': '#888888', 'B': '#999999', 'X': '#AAAAAA'
        };

        for (const [element, count] of Object.entries(composition)) {
            for (let i = 0; i < count; i++) {
                atoms.push(new Atom(element, defaultColors[element] || '#888888', element, centerX, centerY));
            }
        }
        return atoms;
    }

    // Helper to calculate distance between two atoms
    function distance(atom1, atom2) {
        const dx = atom1.x - atom2.x;
        const dy = atom1.y - atom2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Helper to check if two atoms are bonded (close to BOND_DISTANCE apart)
    function areBonded(atom1, atom2, tolerance = 10) {
        const dist = distance(atom1, atom2);
        return Math.abs(dist - BOND_DISTANCE) < tolerance;
    }

    describe('Small molecules (1-5 atoms)', () => {
        test('single atom should be at center', () => {
            const atoms = createAtoms({ Ar: 1 }, 300, 300);
            const molecule = new Molecule(atoms, { formula: 'Ar', name: 'Argon', composition: { Ar: 1 }, bonds: [] });
            expect(atoms[0].x).toBe(300);
            expect(atoms[0].y).toBe(300);
        });

        test('diatomic molecule should have atoms at BOND_DISTANCE apart', () => {
            const atoms = createAtoms({ H: 2 }, 300, 300);
            const molecule = new Molecule(atoms, { formula: 'H₂', name: 'Hydrogen Gas', composition: { H: 2 }, bonds: [[0, 1]] });
            expect(areBonded(atoms[0], atoms[1])).toBe(true);
        });

        test('H2O should have O at center with H atoms bonded', () => {
            const atoms = createAtoms({ H: 2, O: 1 }, 300, 300);
            const molecule = new Molecule(atoms, { formula: 'H₂O', name: 'Water', composition: { H: 2, O: 1 }, bonds: [[0, 2], [1, 2]] });
            const oxygen = atoms.find(a => a.element === 'O');
            const hydrogens = atoms.filter(a => a.element === 'H');
            hydrogens.forEach(h => expect(areBonded(h, oxygen)).toBe(true));
        });

        test('NH3 should have N at center with 3 H atoms around it', () => {
            const atoms = createAtoms({ N: 1, H: 3 }, 300, 300);
            const molecule = new Molecule(atoms, { formula: 'NH₃', name: 'Ammonia', composition: { N: 1, H: 3 }, bonds: [[0, 1], [0, 2], [0, 3]] });
            const nitrogen = atoms.find(a => a.element === 'N');
            const hydrogens = atoms.filter(a => a.element === 'H');
            hydrogens.forEach(h => expect(areBonded(h, nitrogen)).toBe(true));
        });

        test('CH4 should have C at center with 4 H atoms around it', () => {
            const atoms = createAtoms({ C: 1, H: 4 }, 300, 300);
            const molecule = new Molecule(atoms, { formula: 'CH₄', name: 'Methane', composition: { C: 1, H: 4 }, bonds: [[0, 1], [0, 2], [0, 3], [0, 4]] });
            const carbon = atoms.find(a => a.element === 'C');
            const hydrogens = atoms.filter(a => a.element === 'H');
            hydrogens.forEach(h => expect(areBonded(h, carbon)).toBe(true));
        });
    });

    describe('Larger molecules (6+ atoms) - bond-based arrangement', () => {
        test('Ethane (C2H6) should have correct structure with C-C bond', () => {
            const atoms = createAtoms({ C: 2, H: 6 }, 300, 300);
            const data = {
                formula: 'C₂H₆',
                name: 'Ethane',
                composition: { C: 2, H: 6 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 7]]
            };
            const molecule = new Molecule(atoms, data);

            // The two carbons should be bonded to each other
            expect(areBonded(atoms[0], atoms[1])).toBe(true);

            // H atoms 2,3,4 should be bonded to first carbon (index 0)
            expect(areBonded(atoms[2], atoms[0])).toBe(true);
            expect(areBonded(atoms[3], atoms[0])).toBe(true);
            expect(areBonded(atoms[4], atoms[0])).toBe(true);

            // H atoms 5,6,7 should be bonded to second carbon (index 1)
            expect(areBonded(atoms[5], atoms[1])).toBe(true);
            expect(areBonded(atoms[6], atoms[1])).toBe(true);
            expect(areBonded(atoms[7], atoms[1])).toBe(true);
        });

        test('H2SO4 should have correct structure based on bonds', () => {
            const atoms = createAtoms({ H: 2, S: 1, O: 4 }, 300, 300);
            const data = {
                formula: 'H₂SO₄',
                name: 'Sulfuric Acid',
                composition: { H: 2, S: 1, O: 4 },
                bonds: [[0, 3], [2, 3], [1, 4], [2, 4], [2, 5], [2, 6]]
            };
            const molecule = new Molecule(atoms, data);

            // S is at index 2, bonds to O at indices 3,4,5,6
            expect(areBonded(atoms[2], atoms[3])).toBe(true);
            expect(areBonded(atoms[2], atoms[4])).toBe(true);
            expect(areBonded(atoms[2], atoms[5])).toBe(true);
            expect(areBonded(atoms[2], atoms[6])).toBe(true);
        });

        test('Ethanol (C2H5OH) should have correct chain structure', () => {
            const atoms = createAtoms({ C: 2, H: 6, O: 1 }, 300, 300);
            const data = {
                formula: 'C₂H₅OH',
                name: 'Ethanol',
                composition: { C: 2, H: 6, O: 1 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 8], [8, 7]]
            };
            const molecule = new Molecule(atoms, data);

            // The two carbons should be bonded
            expect(areBonded(atoms[0], atoms[1])).toBe(true);
            // C1 (index 1) should be bonded to O (index 8)
            expect(areBonded(atoms[1], atoms[8])).toBe(true);
            // O (index 8) should be bonded to H (index 7)
            expect(areBonded(atoms[8], atoms[7])).toBe(true);
        });

        test('Phosphoric acid (H3PO4) should have P bonded to all 4 oxygens', () => {
            const atoms = createAtoms({ H: 3, P: 1, O: 4 }, 300, 300);
            const data = {
                formula: 'H₃PO₄',
                name: 'Phosphoric Acid',
                composition: { H: 3, P: 1, O: 4 },
                bonds: [[0, 4], [3, 4], [1, 5], [3, 5], [2, 6], [3, 6], [3, 7]]
            };
            const molecule = new Molecule(atoms, data);

            const phosphorus = atoms[3];
            expect(areBonded(phosphorus, atoms[4])).toBe(true);
            expect(areBonded(phosphorus, atoms[5])).toBe(true);
            expect(areBonded(phosphorus, atoms[6])).toBe(true);
            expect(areBonded(phosphorus, atoms[7])).toBe(true);
        });

        test('Linear chain of 6 atoms should maintain all bonds', () => {
            const atoms = createAtoms({ A: 6 }, 300, 300);
            const data = {
                formula: 'A₆',
                name: 'Chain A',
                composition: { A: 6 },
                bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]
            };
            const molecule = new Molecule(atoms, data);

            for (let i = 0; i < 5; i++) {
                expect(areBonded(atoms[i], atoms[i + 1])).toBe(true);
            }
        });
    });

    describe('Molecule centering', () => {
        test('molecule should be approximately centered around initial center', () => {
            const centerX = 400;
            const centerY = 350;
            const atoms = createAtoms({ C: 2, H: 6 }, centerX, centerY);
            const data = {
                formula: 'C₂H₆',
                name: 'Ethane',
                composition: { C: 2, H: 6 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 7]]
            };
            const molecule = new Molecule(atoms, data);

            let sumX = 0, sumY = 0;
            atoms.forEach(a => { sumX += a.x; sumY += a.y; });
            const actualCenterX = sumX / atoms.length;
            const actualCenterY = sumY / atoms.length;

            expect(Math.abs(actualCenterX - centerX)).toBeLessThan(5);
            expect(Math.abs(actualCenterY - centerY)).toBeLessThan(5);
        });
    });

    describe('No atom overlap', () => {
        test('atoms in ethane should not overlap', () => {
            const atoms = createAtoms({ C: 2, H: 6 }, 300, 300);
            const data = {
                formula: 'C₂H₆',
                name: 'Ethane',
                composition: { C: 2, H: 6 },
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 7]]
            };
            const molecule = new Molecule(atoms, data);

            for (let i = 0; i < atoms.length; i++) {
                for (let j = i + 1; j < atoms.length; j++) {
                    const dist = distance(atoms[i], atoms[j]);
                    expect(dist).toBeGreaterThan(ATOM_RADIUS);
                }
            }
        });

        test('atoms in H2SO4 should not overlap', () => {
            const atoms = createAtoms({ H: 2, S: 1, O: 4 }, 300, 300);
            const data = {
                formula: 'H₂SO₄',
                name: 'Sulfuric Acid',
                composition: { H: 2, S: 1, O: 4 },
                bonds: [[0, 3], [2, 3], [1, 4], [2, 4], [2, 5], [2, 6]]
            };
            const molecule = new Molecule(atoms, data);

            for (let i = 0; i < atoms.length; i++) {
                for (let j = i + 1; j < atoms.length; j++) {
                    const dist = distance(atoms[i], atoms[j]);
                    expect(dist).toBeGreaterThan(ATOM_RADIUS);
                }
            }
        });
    });

    describe('Fallback for molecules without bond data', () => {
        test('should arrange in circle when no bond data provided for 6+ atoms', () => {
            const atoms = createAtoms({ X: 6 }, 300, 300);
            const data = { formula: 'X₆', name: 'Hexaexium', composition: { X: 6 }, bonds: [] };
            const molecule = new Molecule(atoms, data);

            const center = { x: 0, y: 0 };
            atoms.forEach(a => { center.x += a.x; center.y += a.y; });
            center.x /= atoms.length;
            center.y /= atoms.length;

            const distances = atoms.map(a => distance(a, center));
            const avgDist = distances.reduce((sum, d) => sum + d, 0) / distances.length;

            distances.forEach(d => {
                expect(Math.abs(d - avgDist)).toBeLessThan(10);
            });
        });
    });

    describe('Edge cases', () => {
        test('should handle molecules with disconnected atoms gracefully', () => {
            const atoms = createAtoms({ A: 3, B: 3 }, 300, 300);
            const data = {
                formula: 'A₃B₃',
                name: 'Test',
                composition: { A: 3, B: 3 },
                bonds: [[0, 1], [1, 2]]
            };

            expect(() => new Molecule(atoms, data)).not.toThrow();
        });
    });
});
