/**
 * Tests for molecule detection logic
 */

describe('Molecule Detection Logic', () => {
  let findAtomsForMolecule;

  // Mock constants and structures
  const REACTION_DISTANCE = 100;

  beforeAll(() => {
    // Extract the findAtomsForMolecule function from app.js
    const fs = require('fs');
    const path = require('path');
    const appContent = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');

    // Create a safe eval context
    const functionMatch = appContent.match(/function findAtomsForMolecule\(atoms, composition\) \{[\s\S]*?\n\}/);
    if (functionMatch) {
      eval(`findAtomsForMolecule = ${functionMatch[0]}`);
    }
  });

  // Helper to create mock atoms
  function createAtom(element, x, y) {
    return { element, x, y };
  }

  describe('Basic composition checking', () => {
    test('should return null when not enough atoms', () => {
      const atoms = [
        createAtom('H', 0, 0),
        createAtom('O', 50, 50)
      ];
      const composition = { H: 2, O: 1 }; // Need H2O

      const result = findAtomsForMolecule(atoms, composition);
      expect(result).toBeNull();
    });

    test('should find atoms when enough are available', () => {
      const atoms = [
        createAtom('H', 0, 0),
        createAtom('H', 50, 0),
        createAtom('O', 25, 50)
      ];
      const composition = { H: 2, O: 1 }; // H2O

      const result = findAtomsForMolecule(atoms, composition);
      expect(result).not.toBeNull();
      expect(result).toHaveLength(3);
    });
  });

  describe('Proximity checking', () => {
    test('should return null when atoms are too far apart', () => {
      const atoms = [
        createAtom('H', 0, 0),
        createAtom('H', 200, 0), // Too far
        createAtom('O', 25, 25)
      ];
      const composition = { H: 2, O: 1 };

      const result = findAtomsForMolecule(atoms, composition);
      expect(result).toBeNull();
    });

    test('should find atoms when they are close enough', () => {
      const atoms = [
        createAtom('H', 0, 0),
        createAtom('H', 50, 0),
        createAtom('O', 25, 25)
      ];
      const composition = { H: 2, O: 1 };

      const result = findAtomsForMolecule(atoms, composition);
      expect(result).not.toBeNull();
    });
  });

  describe('Multiple element types', () => {
    test('should handle diatomic molecules', () => {
      const atoms = [
        createAtom('O', 0, 0),
        createAtom('O', 50, 0)
      ];
      const composition = { O: 2 }; // O2

      const result = findAtomsForMolecule(atoms, composition);
      expect(result).not.toBeNull();
      expect(result).toHaveLength(2);
      expect(result.every(a => a.element === 'O')).toBe(true);
    });

    test('should handle complex molecules', () => {
      const atoms = [
        createAtom('C', 100, 100),
        createAtom('H', 120, 100),
        createAtom('H', 80, 100),
        createAtom('H', 100, 120),
        createAtom('H', 100, 80)
      ];
      const composition = { C: 1, H: 4 }; // CH4

      const result = findAtomsForMolecule(atoms, composition);
      expect(result).not.toBeNull();
      expect(result).toHaveLength(5);
    });
  });

  describe('Order independence', () => {
    test('should find molecules regardless of atom order', () => {
      const atoms1 = [
        createAtom('H', 0, 0),
        createAtom('O', 50, 0),
        createAtom('H', 100, 0)
      ];

      const atoms2 = [
        createAtom('O', 50, 0),
        createAtom('H', 0, 0),
        createAtom('H', 100, 0)
      ];

      const composition = { H: 2, O: 1 };

      const result1 = findAtomsForMolecule(atoms1, composition);
      const result2 = findAtomsForMolecule(atoms2, composition);

      expect(result1).not.toBeNull();
      expect(result2).not.toBeNull();
      expect(result1.length).toBe(result2.length);
    });
  });

  describe('Edge cases', () => {
    test('should handle empty atom array', () => {
      const atoms = [];
      const composition = { H: 2 };

      const result = findAtomsForMolecule(atoms, composition);
      expect(result).toBeNull();
    });

    test('should handle single atom molecules', () => {
      const atoms = [createAtom('H', 0, 0)];
      const composition = { H: 1 };

      const result = findAtomsForMolecule(atoms, composition);
      expect(result).not.toBeNull();
      expect(result).toHaveLength(1);
    });

    test('should prefer closest atoms when multiple options exist', () => {
      const atoms = [
        createAtom('H', 0, 0),
        createAtom('H', 30, 0), // Closest to first H
        createAtom('H', 200, 0) // Far away
      ];
      const composition = { H: 2 };

      const result = findAtomsForMolecule(atoms, composition);
      expect(result).not.toBeNull();
      expect(result).toHaveLength(2);

      // Should not include the far atom
      const distances = result.map(a => Math.sqrt(a.x * a.x + a.y * a.y));
      expect(Math.max(...distances)).toBeLessThan(150);
    });
  });
});
