/**
 * Tests for molecule expansion - adding atoms to existing molecules to form new ones
 */

describe('Molecule Expansion', () => {
    let findAtomsForMolecule, findCluster;
    const REACTION_DISTANCE = 150;

    beforeAll(() => {
        // Mock REACTION_DISTANCE constant
        global.REACTION_DISTANCE = REACTION_DISTANCE;

        // Extract functions from app.js
        const fs = require('fs');
        const path = require('path');
        const appContent = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');

        // Extract and evaluate the functions
        // Find function definitions more robustly
        const lines = appContent.split('\n');
        let inFunction = false;
        let functionCode = '';
        let braceCount = 0;
        let functionName = '';

        for (let line of lines) {
            if (line.match(/^function findAtomsForMolecule/) || line.match(/^function findCluster/)) {
                inFunction = true;
                functionCode = line + '\n';
                functionName = line.match(/function (\w+)/)[1];
                braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
                continue;
            }

            if (inFunction) {
                functionCode += line + '\n';
                braceCount += (line.match(/\{/g) || []).length;
                braceCount -= (line.match(/\}/g) || []).length;

                if (braceCount === 0) {
                    eval(functionCode);
                    if (functionName === 'findAtomsForMolecule') {
                        findAtomsForMolecule = eval('findAtomsForMolecule');
                    } else if (functionName === 'findCluster') {
                        findCluster = eval('findCluster');
                    }
                    inFunction = false;
                    functionCode = '';
                    functionName = '';
                }
            }
        }
    });

    // Helper to create mock atoms
    function createAtom(element, x, y, moleculeId = null) {
        return { element, x, y, moleculeId };
    }

    describe('Expanding molecules with additional atoms', () => {
        test('should find XeF4 when XeF2 molecule exists and 2 free F atoms are nearby', () => {
            const moleculeAtoms = [
                createAtom('Xe', 100, 100, 'mol-1'),
                createAtom('F', 80, 100, 'mol-1'),
                createAtom('F', 120, 100, 'mol-1')
            ];

            const freeAtoms = [
                createAtom('F', 100, 80),
                createAtom('F', 100, 120)
            ];

            const allAtoms = [...moleculeAtoms, ...freeAtoms];
            const composition = { Xe: 1, F: 4 }; // XeF4

            const result = findAtomsForMolecule(allAtoms, composition);

            // Should find all 5 atoms (1 Xe + 4 F)
            expect(result).not.toBeNull();
            expect(result).toHaveLength(5);
            expect(result.filter(a => a.element === 'Xe')).toHaveLength(1);
            expect(result.filter(a => a.element === 'F')).toHaveLength(4);
        });

        test('should not form molecule when only one additional atom is added', () => {
            const moleculeAtoms = [
                createAtom('Xe', 100, 100, 'mol-1'),
                createAtom('F', 80, 100, 'mol-1'),
                createAtom('F', 120, 100, 'mol-1')
            ];

            const freeAtoms = [
                createAtom('F', 100, 80) // Only one free F
            ];

            const allAtoms = [...moleculeAtoms, ...freeAtoms];
            const composition = { Xe: 1, F: 4 }; // XeF4 needs 4 F atoms

            const result = findAtomsForMolecule(allAtoms, composition);

            // Should not find enough atoms
            expect(result).toBeNull();
        });

        test('should form H2O2 from two H2O molecules broken and recombined', () => {
            // Scenario: Two water molecules broken, atoms rearranged to form H2O2
            const allAtoms = [
                createAtom('H', 100, 100),
                createAtom('O', 120, 100),
                createAtom('O', 140, 100),
                createAtom('H', 160, 100)
            ];

            const composition = { H: 2, O: 2 }; // H2O2

            const result = findAtomsForMolecule(allAtoms, composition);

            expect(result).not.toBeNull();
            expect(result).toHaveLength(4);
            expect(result.filter(a => a.element === 'H')).toHaveLength(2);
            expect(result.filter(a => a.element === 'O')).toHaveLength(2);
        });

        test('should include molecule atoms in cluster when they are close to free atoms', () => {
            const moleculeAtoms = [
                createAtom('C', 100, 100, 'mol-1'),
                createAtom('H', 80, 100, 'mol-1'),
                createAtom('H', 120, 100, 'mol-1')
            ];

            const freeAtoms = [
                createAtom('H', 100, 80),
                createAtom('H', 100, 120)
            ];

            const allAtoms = [...moleculeAtoms, ...freeAtoms];
            const composition = { C: 1, H: 4 }; // CH4

            const result = findAtomsForMolecule(allAtoms, composition);

            expect(result).not.toBeNull();
            expect(result).toHaveLength(5);

            // Should include both molecule atoms and free atoms
            const resultMoleculeIds = result.map(a => a.moleculeId);
            expect(resultMoleculeIds.filter(id => id === 'mol-1')).toHaveLength(3);
            expect(resultMoleculeIds.filter(id => id === null)).toHaveLength(2);
        });

        test('should not include atoms from different molecules', () => {
            const mol1Atoms = [
                createAtom('H', 100, 100, 'mol-1'),
                createAtom('O', 120, 100, 'mol-1')
            ];

            const mol2Atoms = [
                createAtom('H', 140, 100, 'mol-2'),
                createAtom('O', 160, 100, 'mol-2')
            ];

            const allAtoms = [...mol1Atoms, ...mol2Atoms];
            const composition = { H: 2, O: 2 }; // H2O2

            const result = findAtomsForMolecule(allAtoms, composition);

            // Should not mix atoms from different molecules
            expect(result).toBeNull();
        });

        test('should handle atoms too far from molecule atoms', () => {
            const moleculeAtoms = [
                createAtom('Xe', 100, 100, 'mol-1'),
                createAtom('F', 80, 100, 'mol-1')
            ];

            const freeAtoms = [
                createAtom('F', 500, 100), // Too far away
                createAtom('F', 600, 100)  // Too far away
            ];

            const allAtoms = [...moleculeAtoms, ...freeAtoms];
            const composition = { Xe: 1, F: 4 }; // XeF4

            const result = findAtomsForMolecule(allAtoms, composition);

            // Should not find atoms that are too far
            expect(result).toBeNull();
        });
    });

    describe('Cluster detection with mixed atoms', () => {
        test('should build cluster including molecule atoms when connected', () => {
            const moleculeAtoms = [
                createAtom('N', 100, 100, 'mol-1')
            ];

            const freeAtoms = [
                createAtom('H', 80, 100),
                createAtom('H', 120, 100),
                createAtom('H', 100, 80)
            ];

            const allAtoms = [...moleculeAtoms, ...freeAtoms];
            const neededElements = ['N', 'H', 'H', 'H'];

            const cluster = findCluster(moleculeAtoms[0], allAtoms, neededElements);

            expect(cluster).not.toBeNull();
            expect(cluster).toHaveLength(4);
        });
    });
});
