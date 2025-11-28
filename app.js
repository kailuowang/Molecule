// Main application state
const app = {
    canvas: null,
    ctx: null,
    atoms: [],
    molecules: [],
    currentLesson: null,
    selectedAtom: null,
    selectedMolecule: null,
    dragOffset: { x: 0, y: 0 },
    mousePos: { x: 0, y: 0 },
    discoveredMolecules: new Set(),
    lastReactionCheck: 0
};

// Constants
const ATOM_RADIUS = 25;
const BOND_DISTANCE = 80;
const REACTION_DISTANCE = 80; // Distance for molecule detection
const FRICTION = 0.95;
const BOUNCE = 0.7;

// Atom class
class Atom {
    constructor(element, color, name, x, y) {
        this.element = element;
        this.color = color;
        this.name = name;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = ATOM_RADIUS;
        this.isDragging = false;
        this.moleculeId = null;
    }

    update(width, height) {
        // If part of a molecule, don't update position (molecule handles it)
        if (this.moleculeId) return;

        if (this.isDragging) {
            this.x = app.mousePos.x;
            this.y = app.mousePos.y;
            this.vx = 0;
            this.vy = 0;
            return;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -BOUNCE;
        }
        if (this.x + this.radius > width) {
            this.x = width - this.radius;
            this.vx *= -BOUNCE;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy *= -BOUNCE;
        }
        if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.vy *= -BOUNCE;
        }

        this.vx *= FRICTION;
        this.vy *= FRICTION;
    }

    draw(ctx) {
        // Check if this atom is near other compatible atoms
        const isNearCompatible = this.checkNearbyAtoms();

        // Draw glow effect if near compatible atoms
        if (isNearCompatible && !this.moleculeId) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 8, 0, Math.PI * 2);
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        // Draw atom
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.moleculeId ? '#FFD700' : '#333';
        ctx.lineWidth = this.moleculeId ? 3 : 2;
        ctx.stroke();

        // Draw element symbol
        ctx.fillStyle = '#000';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.element, this.x, this.y);
    }

    checkNearbyAtoms() {
        if (this.moleculeId) return false;

        for (let atom of app.atoms) {
            if (atom === this || atom.moleculeId) continue;
            const dist = Math.hypot(atom.x - this.x, atom.y - this.y);
            if (dist < REACTION_DISTANCE) {
                return true;
            }
        }
        return false;
    }

    contains(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        return dx * dx + dy * dy <= this.radius * this.radius;
    }
}

// Molecule class
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

        if (atoms.length === 1) {
            // Single atom molecules (noble gases like Argon)
            atoms[0].x = this.centerX;
            atoms[0].y = this.centerY;
        } else if (atoms.length === 2) {
            // Diatomic molecules: H2, O2, CO, HCl, NaCl
            atoms[0].x = this.centerX - BOND_DISTANCE / 2;
            atoms[0].y = this.centerY;
            atoms[1].x = this.centerX + BOND_DISTANCE / 2;
            atoms[1].y = this.centerY;
        } else {
            // For all molecules with 3+ atoms, use bond-based layout if bond data available
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

        // Handle any disconnected atoms (shouldn't happen with valid bond data)
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

    update(width, height) {
        // If molecule is being dragged, move all atoms together
        if (this.atoms.some(a => a.isDragging)) {
            const draggedAtom = this.atoms.find(a => a.isDragging);
            const dx = app.mousePos.x - draggedAtom.x;
            const dy = app.mousePos.y - draggedAtom.y;

            // Move all atoms in the molecule by the same delta
            this.atoms.forEach(atom => {
                atom.x += dx;
                atom.y += dy;
            });
        }

        // Calculate center
        this.centerX = 0;
        this.centerY = 0;
        this.atoms.forEach(atom => {
            this.centerX += atom.x;
            this.centerY += atom.y;
        });
        this.centerX /= this.atoms.length;
        this.centerY /= this.atoms.length;
    }

    draw(ctx) {
        // Draw bonds based on actual molecular structure
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 4;

        const atoms = this.atoms;

        if (atoms.length === 2) {
            // Diatomic: single bond
            ctx.beginPath();
            ctx.moveTo(atoms[0].x, atoms[0].y);
            ctx.lineTo(atoms[1].x, atoms[1].y);
            ctx.stroke();
        } else {
            // For all molecules with 3+ atoms, use bond data if available
            if (this.data.bonds && this.data.bonds.length > 0) {
                this.data.bonds.forEach(bond => {
                    const [atomIndex1, atomIndex2] = bond;
                    if (atomIndex1 < atoms.length && atomIndex2 < atoms.length) {
                        ctx.beginPath();
                        ctx.moveTo(atoms[atomIndex1].x, atoms[atomIndex1].y);
                        ctx.lineTo(atoms[atomIndex2].x, atoms[atomIndex2].y);
                        ctx.stroke();
                    }
                });
            } else {
                // Fallback: connect atoms in sequence
                for (let i = 0; i < atoms.length - 1; i++) {
                    ctx.beginPath();
                    ctx.moveTo(atoms[i].x, atoms[i].y);
                    ctx.lineTo(atoms[i + 1].x, atoms[i + 1].y);
                    ctx.stroke();
                }
            }
        }

        // Draw molecule name above the highest atom
        const highestY = Math.min(...this.atoms.map(a => a.y));
        const nameY = highestY - ATOM_RADIUS - 15; // Position above the highest atom
        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.data.name, this.centerX, nameY);
    }

    contains(x, y) {
        const dx = x - this.centerX;
        const dy = y - this.centerY;
        const maxDist = BOND_DISTANCE + ATOM_RADIUS;
        return dx * dx + dy * dy <= maxDist * maxDist;
    }
}

// Initialize the application
function init() {
    app.canvas = document.getElementById('canvas');
    app.ctx = app.canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    setupEventListeners();
    loadLessonSelector();
    loadLesson(LESSONS[0]);

    animate();
}

function resizeCanvas() {
    const container = document.getElementById('game-area');
    app.canvas.width = container.clientWidth - 20;
    app.canvas.height = container.clientHeight - 80;
}

function setupEventListeners() {
    // Mouse events
    app.canvas.addEventListener('mousedown', onMouseDown);
    app.canvas.addEventListener('mousemove', onMouseMove);
    app.canvas.addEventListener('mouseup', onMouseUp);
    app.canvas.addEventListener('click', onCanvasClick);
    app.canvas.addEventListener('dblclick', onCanvasDoubleClick);

    // Touch events for mobile/tablet support
    app.canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    app.canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    app.canvas.addEventListener('touchend', onTouchEnd, { passive: false });

    document.getElementById('reset-btn').addEventListener('click', resetAtoms);
    document.getElementById('clear-btn').addEventListener('click', clearAll);
    document.getElementById('close-info').addEventListener('click', () => {
        document.getElementById('molecule-info').classList.add('hidden');
    });
    document.getElementById('lesson-select').addEventListener('change', (e) => {
        const lesson = LESSONS.find(l => l.id === parseInt(e.target.value));
        if (lesson) loadLesson(lesson);
    });
}

function loadLessonSelector() {
    const select = document.getElementById('lesson-select');
    LESSONS.forEach(lesson => {
        const option = document.createElement('option');
        option.value = lesson.id;
        option.textContent = lesson.name;
        select.appendChild(option);
    });
}

function loadLesson(lesson) {
    app.currentLesson = lesson;
    app.discoveredMolecules.clear();
    clearAll();
    resetAtoms();
    updateMoleculeList();
    document.getElementById('molecule-info').classList.add('hidden');
}

function resetAtoms() {
    app.molecules = [];
    app.atoms = [];

    const lesson = app.currentLesson;
    const width = app.canvas.width;
    const height = app.canvas.height;
    const padding = 50;

    lesson.atoms.forEach(atomType => {
        for (let i = 0; i < atomType.count; i++) {
            const x = padding + Math.random() * (width - padding * 2);
            const y = padding + Math.random() * (height - padding * 2);
            app.atoms.push(new Atom(atomType.element, atomType.color, atomType.name, x, y));
        }
    });
}

function clearAll() {
    app.atoms = [];
    app.molecules = [];
}

function onMouseDown(e) {
    const rect = app.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check atoms
    for (let atom of app.atoms) {
        if (!atom.moleculeId && atom.contains(x, y)) {
            atom.isDragging = true;
            app.selectedAtom = atom;
            return;
        }
    }

    // Check molecules
    for (let molecule of app.molecules) {
        if (molecule.contains(x, y)) {
            molecule.atoms.forEach(atom => atom.isDragging = true);
            return;
        }
    }
}

function onMouseMove(e) {
    const rect = app.canvas.getBoundingClientRect();
    app.mousePos.x = e.clientX - rect.left;
    app.mousePos.y = e.clientY - rect.top;
}

function onMouseUp() {
    app.atoms.forEach(atom => atom.isDragging = false);
    app.selectedAtom = null;

    // Force immediate reaction check after a tiny delay to let atoms settle
    // Keep checking until no more molecules can be formed
    app.lastReactionCheck = 0;
    setTimeout(() => {
        checkAllReactions();
    }, 50); // 50ms delay to allow atoms to settle
}

// Touch event handlers for mobile/tablet support
function getTouchPos(e) {
    const rect = app.canvas.getBoundingClientRect();
    const touch = e.touches[0] || e.changedTouches[0];
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

function onTouchStart(e) {
    e.preventDefault();
    const pos = getTouchPos(e);

    // Check atoms
    for (let atom of app.atoms) {
        if (!atom.moleculeId && atom.contains(pos.x, pos.y)) {
            atom.isDragging = true;
            app.selectedAtom = atom;
            app.mousePos.x = pos.x;
            app.mousePos.y = pos.y;
            return;
        }
    }

    // Check molecules
    for (let molecule of app.molecules) {
        if (molecule.contains(pos.x, pos.y)) {
            molecule.atoms.forEach(atom => atom.isDragging = true);
            app.mousePos.x = pos.x;
            app.mousePos.y = pos.y;
            return;
        }
    }
}

function onTouchMove(e) {
    e.preventDefault();
    const pos = getTouchPos(e);
    app.mousePos.x = pos.x;
    app.mousePos.y = pos.y;
}

function onTouchEnd(e) {
    e.preventDefault();
    const pos = getTouchPos(e);

    // Check if it was a tap (no drag) to show info
    const wasDragging = app.atoms.some(atom => atom.isDragging);

    app.atoms.forEach(atom => atom.isDragging = false);
    app.selectedAtom = null;

    // Force immediate reaction check after a tiny delay
    app.lastReactionCheck = 0;
    setTimeout(() => {
        checkAllReactions();
    }, 50);

    // If it wasn't a drag, treat as tap to show info
    if (!wasDragging) {
        for (let molecule of app.molecules) {
            if (molecule.contains(pos.x, pos.y)) {
                showMoleculeInfo(molecule.data);
                return;
            }
        }
        for (let atom of app.atoms) {
            if (atom.contains(pos.x, pos.y)) {
                showElementInfo(atom);
                return;
            }
        }
    }
}

function checkAllReactions() {
    // Check if we're still in cooldown period (e.g., after breaking a molecule)
    const now = Date.now();
    if (app.lastReactionCheck > now) {
        return; // Still in cooldown, don't check
    }

    // Keep checking for reactions until no more molecules can be formed
    let foundMolecule = false;
    do {
        foundMolecule = checkReactions();
    } while (foundMolecule);
}

function onCanvasClick(e) {
    const rect = app.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking molecule for info
    for (let molecule of app.molecules) {
        if (molecule.contains(x, y)) {
            showMoleculeInfo(molecule.data);
            return;
        }
    }

    // Check if clicking an atom for element info
    for (let atom of app.atoms) {
        if (atom.contains(x, y)) {
            showElementInfo(atom);
            return;
        }
    }
}

function onCanvasDoubleClick(e) {
    const rect = app.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if double-clicking molecule to break it
    for (let molecule of app.molecules) {
        if (molecule.contains(x, y)) {
            breakMolecule(molecule);
            return;
        }
    }
}

function checkReactions() {
    const lesson = app.currentLesson;

    if (!lesson) {
        return false;
    }

    const freeAtoms = app.atoms.filter(a => !a.moleculeId);

    // First, try to form molecules from only free atoms
    for (let moleculeData of lesson.molecules) {
        const composition = moleculeData.composition;
        const foundAtoms = findAtomsForMolecule(freeAtoms, composition);

        if (foundAtoms) {
            createMolecule(foundAtoms, moleculeData);
            app.discoveredMolecules.add(moleculeData.name);
            updateMoleculeList();
            return true; // Found a molecule
        }
    }

    // Second, try to expand existing molecules by adding free atoms
    for (let molecule of app.molecules) {
        const moleculeAtoms = molecule.atoms;
        const candidateAtoms = [...moleculeAtoms, ...freeAtoms];

        for (let moleculeData of lesson.molecules) {
            const composition = moleculeData.composition;

            // Skip if this is the same molecule type we already have
            if (molecule.data.name === moleculeData.name) {
                continue;
            }

            const foundAtoms = findAtomsForMolecule(candidateAtoms, composition);

            // Check if this is a TRUE expansion: ALL atoms from the existing molecule must be used
            if (foundAtoms) {
                const existingMoleculeAtoms = foundAtoms.filter(a => a.moleculeId === molecule.id);
                const freeAtomsUsed = foundAtoms.filter(a => !a.moleculeId);

                // CRITICAL: Only expand if ALL atoms from the old molecule are included AND at least one free atom is added
                // This prevents breaking a molecule and forming a smaller one with only some of its atoms
                if (existingMoleculeAtoms.length === moleculeAtoms.length &&
                    freeAtomsUsed.length > 0 &&
                    foundAtoms.length === (moleculeAtoms.length + freeAtomsUsed.length)) {
                    // Break the old molecule and create the new one
                    breakMoleculeForExpansion(molecule);
                    createMolecule(foundAtoms, moleculeData);
                    app.discoveredMolecules.add(moleculeData.name);
                    updateMoleculeList();
                    return true; // Found a molecule expansion
                }
            }
        }
    }

    // Third, try to combine two molecules that are close together
    for (let i = 0; i < app.molecules.length; i++) {
        for (let j = i + 1; j < app.molecules.length; j++) {
            const mol1 = app.molecules[i];
            const mol2 = app.molecules[j];

            // Check if molecules are close enough
            const dist = Math.hypot(mol1.centerX - mol2.centerX, mol1.centerY - mol2.centerY);
            if (dist > REACTION_DISTANCE * 2) {
                continue; // Too far apart
            }

            // Combine atoms from both molecules
            const combinedAtoms = [...mol1.atoms, ...mol2.atoms];

            for (let moleculeData of lesson.molecules) {
                const composition = moleculeData.composition;

                // Skip if this is the same as either existing molecule
                if (moleculeData.name === mol1.data.name || moleculeData.name === mol2.data.name) {
                    continue;
                }

                const foundAtoms = findAtomsForMolecule(combinedAtoms, composition);

                // Check if this uses ALL atoms from BOTH molecules
                if (foundAtoms) {
                    const mol1Atoms = foundAtoms.filter(a => a.moleculeId === mol1.id);
                    const mol2Atoms = foundAtoms.filter(a => a.moleculeId === mol2.id);

                    // CRITICAL: Only combine if ALL atoms from both molecules are used and nothing else
                    // This prevents breaking two molecules and forming a smaller one with only some atoms
                    if (mol1Atoms.length === mol1.atoms.length &&
                        mol2Atoms.length === mol2.atoms.length &&
                        foundAtoms.length === (mol1.atoms.length + mol2.atoms.length)) {
                        // Break both molecules and create the new one
                        breakMoleculeForExpansion(mol1);
                        breakMoleculeForExpansion(mol2);
                        createMolecule(foundAtoms, moleculeData);
                        app.discoveredMolecules.add(moleculeData.name);
                        updateMoleculeList();
                        return true; // Found a molecule combination
                    }
                }
            }
        }
    }

    return false; // No molecule found
}

function findAtomsForMolecule(atoms, composition) {
    // Group available atoms by element
    const availableByElement = {};
    atoms.forEach(atom => {
        if (!availableByElement[atom.element]) {
            availableByElement[atom.element] = [];
        }
        availableByElement[atom.element].push(atom);
    });

    // Check if we have enough atoms of each type
    for (let element in composition) {
        const needed = composition[element];
        const available = availableByElement[element] || [];
        if (available.length < needed) {
            return null; // Not enough atoms of this type
        }
    }

    // Build list of needed atoms with their elements
    const neededElements = [];
    for (let element in composition) {
        for (let i = 0; i < composition[element]; i++) {
            neededElements.push(element);
        }
    }

    if (atoms.length === 0) return null;

    // Try each possible starting atom
    const candidateAtoms = atoms.filter(a => neededElements.includes(a.element));

    for (let startAtom of candidateAtoms) {
        const cluster = findCluster(startAtom, atoms, neededElements);
        if (cluster && cluster.length === neededElements.length) {
            // Verify we have the right composition
            const clusterComposition = {};
            cluster.forEach(atom => {
                clusterComposition[atom.element] = (clusterComposition[atom.element] || 0) + 1;
            });

            let matches = true;
            for (let element in composition) {
                if (clusterComposition[element] !== composition[element]) {
                    matches = false;
                    break;
                }
            }

            if (matches) {
                // Sort cluster atoms to match the order expected by bond indices
                // Bond indices are based on composition order: for { H: 2, S: 1, O: 4 }
                // the expected order is [H, H, S, O, O, O, O]
                const sortedCluster = [];
                const usedAtoms = new Set();

                for (let element in composition) {
                    const count = composition[element];
                    const atomsOfElement = cluster.filter(a => a.element === element && !usedAtoms.has(a));
                    for (let i = 0; i < count; i++) {
                        sortedCluster.push(atomsOfElement[i]);
                        usedAtoms.add(atomsOfElement[i]);
                    }
                }

                return sortedCluster;
            }
        }
    }

    return null;
}

function findCluster(startAtom, allAtoms, neededElements) {
    // Find a cluster of atoms where each atom is within REACTION_DISTANCE of at least one other atom in the cluster
    const cluster = [startAtom];
    const remaining = [...neededElements];
    const startIdx = remaining.indexOf(startAtom.element);
    if (startIdx !== -1) {
        remaining.splice(startIdx, 1);
    }

    // Keep adding atoms that are close to ANY atom already in the cluster
    let addedAtom = true;
    while (addedAtom && remaining.length > 0) {
        addedAtom = false;

        for (let i = remaining.length - 1; i >= 0; i--) {
            const element = remaining[i];

            // Find atoms of this element that aren't already in cluster
            const candidates = allAtoms.filter(a =>
                a.element === element && !cluster.includes(a)
            );

            // Check if any candidate is close to any atom in the cluster
            for (let candidate of candidates) {
                let isClose = false;
                for (let clusterAtom of cluster) {
                    const dist = Math.hypot(candidate.x - clusterAtom.x, candidate.y - clusterAtom.y);
                    if (dist < REACTION_DISTANCE) {
                        isClose = true;
                        break;
                    }
                }

                if (isClose) {
                    cluster.push(candidate);
                    remaining.splice(i, 1);
                    addedAtom = true;
                    break;
                }
            }

            if (addedAtom) break;
        }
    }

    return remaining.length === 0 ? cluster : null;
}

function createMolecule(atoms, data) {
    const molecule = new Molecule(atoms, data);
    app.molecules.push(molecule);
}

function breakMolecule(molecule) {
    const centerX = molecule.centerX;
    const centerY = molecule.centerY;

    molecule.atoms.forEach(atom => {
        atom.moleculeId = null;

        // Push atoms away from center with stronger force
        const angle = Math.atan2(atom.y - centerY, atom.x - centerX);
        const force = 8 + Math.random() * 4;
        atom.vx = Math.cos(angle) * force;
        atom.vy = Math.sin(angle) * force;
    });

    app.molecules = app.molecules.filter(m => m.id !== molecule.id);

    // Prevent immediate re-sticking by setting a longer cooldown (1 second)
    app.lastReactionCheck = Date.now() + 1000; // Add 1000ms to current time
}

function breakMoleculeForExpansion(molecule) {
    // Quietly break molecule for expansion - no velocity, no cooldown
    molecule.atoms.forEach(atom => {
        atom.moleculeId = null;
    });

    app.molecules = app.molecules.filter(m => m.id !== molecule.id);
}

function showMoleculeInfo(data) {
    document.getElementById('molecule-name').textContent = data.name;
    document.getElementById('molecule-formula').innerHTML = `<strong>Formula:</strong> ${data.formula}`;

    const imageDiv = document.getElementById('molecule-image');
    imageDiv.innerHTML = `<div class="molecule-emoji">${data.image}</div>`;

    const propsDiv = document.getElementById('molecule-properties');
    propsDiv.innerHTML = `
        <p><strong>Description:</strong></p>
        <p>${data.description}</p>
        <p><strong>Properties:</strong></p>
        <ul>
            ${data.properties.map(p => `<li>${p}</li>`).join('')}
        </ul>
    `;

    document.getElementById('molecule-info').classList.remove('hidden');
}

function showElementInfo(atom) {
    const elementData = ELEMENTS[atom.element];

    if (!elementData) {
        console.warn(`No data found for element: ${atom.element}`);
        return;
    }

    document.getElementById('molecule-name').textContent = elementData.name;
    document.getElementById('molecule-formula').innerHTML = `<strong>Symbol:</strong> ${elementData.symbol}`;

    const imageDiv = document.getElementById('molecule-image');
    imageDiv.innerHTML = `<div class="molecule-emoji">${elementData.image}</div>`;

    const propsDiv = document.getElementById('molecule-properties');
    propsDiv.innerHTML = `
        <p><strong>Description:</strong></p>
        <p>${elementData.description}</p>
        <p><strong>Properties:</strong></p>
        <ul>
            ${elementData.properties.map(p => `<li>${p}</li>`).join('')}
        </ul>
    `;

    document.getElementById('molecule-info').classList.remove('hidden');
}

function updateMoleculeList() {
    const list = document.getElementById('molecule-list');
    list.innerHTML = '';

    app.currentLesson.molecules.forEach(mol => {
        const item = document.createElement('div');
        item.className = 'molecule-item';
        if (app.discoveredMolecules.has(mol.name)) {
            item.classList.add('discovered');
        }

        item.innerHTML = `
            <span class="molecule-emoji">${mol.image}</span>
            <div class="molecule-details">
                <strong>${mol.name}</strong>
                <div class="molecule-formula">${mol.formula}</div>
            </div>
            ${app.discoveredMolecules.has(mol.name) ? '<span class="checkmark">✓</span>' : ''}
        `;

        if (app.discoveredMolecules.has(mol.name)) {
            item.addEventListener('click', () => showMoleculeInfo(mol));
            item.style.cursor = 'pointer';
        }

        list.appendChild(item);
    });
}

function update() {
    // Update molecules first (they handle their atoms' positions)
    app.molecules.forEach(molecule => molecule.update(app.canvas.width, app.canvas.height));

    // Then update free atoms
    app.atoms.forEach(atom => atom.update(app.canvas.width, app.canvas.height));

    // Check for reactions periodically (every 500ms) only if nothing is being dragged
    const now = Date.now();
    const anyDragging = app.atoms.some(a => a.isDragging);
    if (!anyDragging && now - app.lastReactionCheck > 500) {
        if (app.atoms.some(a => !a.moleculeId)) {
            checkReactions();
        }
        app.lastReactionCheck = now;
    }
}

function draw() {
    app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);

    // Draw background
    app.ctx.fillStyle = '#f5f5f5';
    app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);

    // Draw molecules
    app.molecules.forEach(molecule => molecule.draw(app.ctx));

    // Draw atoms
    app.atoms.forEach(atom => atom.draw(app.ctx));
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

// Start the app when page loads
window.addEventListener('load', init);
