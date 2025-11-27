/**
 * Tests for Atom class
 */

describe('Atom Class', () => {
  let Atom;
  const ATOM_RADIUS = 25;
  const FRICTION = 0.95;
  const BOUNCE = 0.7;

  beforeAll(() => {
    // Mock canvas and app for testing
    global.app = {
      mousePos: { x: 0, y: 0 },
      atoms: []
    };

    // Extract Atom class from app.js
    const fs = require('fs');
    const path = require('path');
    const appContent = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');

    const classMatch = appContent.match(/class Atom \{[\s\S]*?\n\}/);
    if (classMatch) {
      eval(classMatch[0]);
    }
  });

  describe('Constructor', () => {
    test('should create atom with correct properties', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 100, 200);

      expect(atom.element).toBe('H');
      expect(atom.color).toBe('#FFB6C1');
      expect(atom.name).toBe('Hydrogen');
      expect(atom.x).toBe(100);
      expect(atom.y).toBe(200);
      expect(atom.radius).toBe(ATOM_RADIUS);
      expect(atom.isDragging).toBe(false);
      expect(atom.moleculeId).toBeNull();
    });

    test('should initialize with random velocity', () => {
      const atom = new Atom('O', '#FF6B6B', 'Oxygen', 50, 50);

      expect(atom.vx).toBeDefined();
      expect(atom.vy).toBeDefined();
      expect(Math.abs(atom.vx)).toBeLessThanOrEqual(1);
      expect(Math.abs(atom.vy)).toBeLessThanOrEqual(1);
    });
  });

  describe('contains method', () => {
    test('should return true when point is inside atom', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 100, 100);

      expect(atom.contains(100, 100)).toBe(true); // Center
      expect(atom.contains(110, 100)).toBe(true); // Within radius
      expect(atom.contains(100, 110)).toBe(true); // Within radius
    });

    test('should return false when point is outside atom', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 100, 100);

      expect(atom.contains(200, 200)).toBe(false);
      expect(atom.contains(130, 100)).toBe(false); // Outside radius
    });

    test('should handle edge cases at boundary', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 100, 100);
      const boundaryX = 100 + ATOM_RADIUS;
      const boundaryY = 100;

      // At exactly the radius, should be inside (<=)
      expect(atom.contains(boundaryX, boundaryY)).toBe(true);
    });
  });

  describe('update method - physics', () => {
    test('should not update position when dragging', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 100, 100);
      atom.isDragging = true;
      atom.vx = 5;
      atom.vy = 5;
      app.mousePos = { x: 150, y: 150 };

      atom.update(800, 600);

      expect(atom.x).toBe(150);
      expect(atom.y).toBe(150);
      expect(atom.vx).toBe(0);
      expect(atom.vy).toBe(0);
    });

    test('should not update position when part of molecule', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 100, 100);
      atom.moleculeId = 'test-molecule-id';
      const originalX = atom.x;
      const originalY = atom.y;

      atom.update(800, 600);

      expect(atom.x).toBe(originalX);
      expect(atom.y).toBe(originalY);
    });

    test('should apply friction to velocity', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 100, 100);
      atom.vx = 10;
      atom.vy = 10;

      atom.update(800, 600);

      expect(atom.vx).toBe(10 * FRICTION);
      expect(atom.vy).toBe(10 * FRICTION);
    });

    test('should bounce off left wall', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 10, 100);
      atom.vx = -5;

      atom.update(800, 600);

      expect(atom.x).toBe(ATOM_RADIUS);
      expect(atom.vx).toBeGreaterThan(0); // Reversed and dampened
    });

    test('should bounce off right wall', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 790, 100);
      atom.vx = 5;

      atom.update(800, 600);

      expect(atom.x).toBe(800 - ATOM_RADIUS);
      expect(atom.vx).toBeLessThan(0); // Reversed
    });

    test('should bounce off top wall', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 100, 10);
      atom.vy = -5;

      atom.update(800, 600);

      expect(atom.y).toBe(ATOM_RADIUS);
      expect(atom.vy).toBeGreaterThan(0);
    });

    test('should bounce off bottom wall', () => {
      const atom = new Atom('H', '#FFB6C1', 'Hydrogen', 100, 590);
      atom.vy = 5;

      atom.update(800, 600);

      expect(atom.y).toBe(600 - ATOM_RADIUS);
      expect(atom.vy).toBeLessThan(0);
    });
  });

  describe('checkNearbyAtoms method', () => {
    beforeEach(() => {
      app.atoms = [];
    });

    test('should return false when no other atoms nearby', () => {
      const atom1 = new Atom('H', '#FFB6C1', 'Hydrogen', 0, 0);
      const atom2 = new Atom('O', '#FF6B6B', 'Oxygen', 200, 200);
      app.atoms = [atom1, atom2];

      expect(atom1.checkNearbyAtoms()).toBe(false);
    });

    test('should return true when atoms are close', () => {
      const atom1 = new Atom('H', '#FFB6C1', 'Hydrogen', 0, 0);
      const atom2 = new Atom('O', '#FF6B6B', 'Oxygen', 50, 0);
      app.atoms = [atom1, atom2];

      expect(atom1.checkNearbyAtoms()).toBe(true);
    });

    test('should ignore atoms in molecules', () => {
      const atom1 = new Atom('H', '#FFB6C1', 'Hydrogen', 0, 0);
      const atom2 = new Atom('O', '#FF6B6B', 'Oxygen', 50, 0);
      atom2.moleculeId = 'test-id';
      app.atoms = [atom1, atom2];

      expect(atom1.checkNearbyAtoms()).toBe(false);
    });

    test('should return false if atom itself is in molecule', () => {
      const atom1 = new Atom('H', '#FFB6C1', 'Hydrogen', 0, 0);
      atom1.moleculeId = 'test-id';
      const atom2 = new Atom('O', '#FF6B6B', 'Oxygen', 50, 0);
      app.atoms = [atom1, atom2];

      expect(atom1.checkNearbyAtoms()).toBe(false);
    });
  });
});
