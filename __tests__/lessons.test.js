/**
 * Tests for lessons.js - Lesson data structure validation
 */

const fs = require('fs');
const path = require('path');

// Load lessons.js content
const lessonsContent = fs.readFileSync(path.join(__dirname, '../lessons.js'), 'utf8');
eval(lessonsContent);

describe('Lessons Data Structure', () => {
  test('LESSONS array should be defined', () => {
    expect(LESSONS).toBeDefined();
    expect(Array.isArray(LESSONS)).toBe(true);
  });

  test('should have at least 4 lessons', () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(4);
  });

  describe('Lesson structure validation', () => {
    LESSONS.forEach((lesson, index) => {
      describe(`Lesson ${index + 1}: ${lesson.name}`, () => {
        test('should have required properties', () => {
          expect(lesson).toHaveProperty('id');
          expect(lesson).toHaveProperty('name');
          expect(lesson).toHaveProperty('description');
          expect(lesson).toHaveProperty('atoms');
          expect(lesson).toHaveProperty('molecules');
        });

        test('id should be unique', () => {
          const ids = LESSONS.map(l => l.id);
          const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
          expect(duplicates).toHaveLength(0);
        });

        test('atoms array should be valid', () => {
          expect(Array.isArray(lesson.atoms)).toBe(true);
          expect(lesson.atoms.length).toBeGreaterThan(0);

          lesson.atoms.forEach(atom => {
            expect(atom).toHaveProperty('element');
            expect(atom).toHaveProperty('count');
            expect(atom).toHaveProperty('color');
            expect(atom).toHaveProperty('name');
            expect(typeof atom.element).toBe('string');
            expect(typeof atom.count).toBe('number');
            expect(atom.count).toBeGreaterThan(0);
            expect(typeof atom.color).toBe('string');
            expect(atom.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
          });
        });

        test('molecules array should be valid', () => {
          expect(Array.isArray(lesson.molecules)).toBe(true);
          expect(lesson.molecules.length).toBeGreaterThan(0);

          lesson.molecules.forEach(molecule => {
            expect(molecule).toHaveProperty('name');
            expect(molecule).toHaveProperty('formula');
            expect(molecule).toHaveProperty('composition');
            expect(molecule).toHaveProperty('bonds');
            expect(molecule).toHaveProperty('description');
            expect(molecule).toHaveProperty('properties');
            expect(molecule).toHaveProperty('image');

            expect(typeof molecule.name).toBe('string');
            expect(typeof molecule.formula).toBe('string');
            expect(typeof molecule.composition).toBe('object');
            expect(Array.isArray(molecule.bonds)).toBe(true);
            expect(typeof molecule.description).toBe('string');
            expect(Array.isArray(molecule.properties)).toBe(true);
            expect(typeof molecule.image).toBe('string');
          });
        });

        test('molecule compositions should be achievable with available atoms', () => {
          lesson.molecules.forEach(molecule => {
            Object.entries(molecule.composition).forEach(([element, count]) => {
              const availableAtom = lesson.atoms.find(a => a.element === element);
              expect(availableAtom).toBeDefined();
              expect(availableAtom.count).toBeGreaterThanOrEqual(count);
            });
          });
        });
      });
    });
  });

  describe('Specific molecule tests', () => {
    test('Lesson 1 should contain water molecule', () => {
      const lesson1 = LESSONS.find(l => l.id === 1);
      const water = lesson1.molecules.find(m => m.formula === 'H₂O');
      expect(water).toBeDefined();
      expect(water.composition).toEqual({ H: 2, O: 1 });
    });

    test('Water molecule should have correct properties', () => {
      const lesson1 = LESSONS.find(l => l.id === 1);
      const water = lesson1.molecules.find(m => m.formula === 'H₂O');
      expect(water.bonds).toHaveLength(2);
      expect(water.properties.length).toBeGreaterThan(0);
    });
  });
});
