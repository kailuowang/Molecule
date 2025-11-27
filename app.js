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
const REACTION_DISTANCE = 100; // Increased for easier reactions
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
        const formula = this.data.formula;

        // Determine molecular structure based on composition and chemistry
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
        } else if (atoms.length === 3) {
            // H2O, CO2, NaOH, or similar
            if (formula === 'NaOH') {
                // H-O-Na linear structure
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
                // H2O, CO2: center atom with two peripheral atoms
                const elementCounts = {};
                atoms.forEach(atom => {
                    elementCounts[atom.element] = (elementCounts[atom.element] || 0) + 1;
                });

                // Find the center atom (the one with count 1 in H2O, CO2, etc.)
                let centerAtom = null;
                let peripheralAtoms = [];

                // For H2O: O is center (1 O, 2 H)
                // For CO2: C is center (1 C, 2 O)
                for (let atom of atoms) {
                    if (elementCounts[atom.element] === 1) {
                        centerAtom = atom;
                    } else {
                        peripheralAtoms.push(atom);
                    }
                }

                if (centerAtom && peripheralAtoms.length === 2) {
                    // Star pattern: center bonded to two others
                    centerAtom.x = this.centerX;
                    centerAtom.y = this.centerY;

                    const angle1 = Math.PI * 0.75; // 135 degrees
                    const angle2 = Math.PI * 0.25; // 45 degrees

                    peripheralAtoms[0].x = this.centerX + Math.cos(angle1) * BOND_DISTANCE;
                    peripheralAtoms[0].y = this.centerY + Math.sin(angle1) * BOND_DISTANCE;
                    peripheralAtoms[1].x = this.centerX + Math.cos(angle2) * BOND_DISTANCE;
                    peripheralAtoms[1].y = this.centerY + Math.sin(angle2) * BOND_DISTANCE;
                }
            }
        } else if (atoms.length === 4) {
            // H2O2 (chain) or NH3 (star)
            if (formula === 'H₂O₂') {
                // H-O-O-H chain
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
                // NH3 and other 4-atom molecules - star pattern
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
                    // Star pattern: center bonded to 3 peripheral atoms
                    centerAtom.x = this.centerX;
                    centerAtom.y = this.centerY;

                    const angleStep = (Math.PI * 2) / 3;
                    peripheralAtoms.forEach((atom, i) => {
                        const angle = angleStep * i;
                        atom.x = this.centerX + Math.cos(angle) * BOND_DISTANCE;
                        atom.y = this.centerY + Math.sin(angle) * BOND_DISTANCE;
                    });
                } else {
                    // Fallback to circular
                    const angle = (Math.PI * 2) / atoms.length;
                    atoms.forEach((atom, i) => {
                        atom.x = this.centerX + Math.cos(angle * i) * BOND_DISTANCE;
                        atom.y = this.centerY + Math.sin(angle * i) * BOND_DISTANCE;
                    });
                }
            }
        } else if (atoms.length === 5) {
            // CH4 - star pattern with center atom
            const elementCounts = {};
            atoms.forEach(atom => {
                elementCounts[atom.element] = (elementCounts[atom.element] || 0) + 1;
            });

            // Find center atom (the one with count 1)
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
                // Star pattern: center bonded to all peripheral atoms
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
            // Default circular arrangement for other molecules
            const angle = (Math.PI * 2) / atoms.length;
            atoms.forEach((atom, i) => {
                atom.x = this.centerX + Math.cos(angle * i) * BOND_DISTANCE;
                atom.y = this.centerY + Math.sin(angle * i) * BOND_DISTANCE;
            });
        }
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

        const formula = this.data.formula;
        const atoms = this.atoms;

        if (atoms.length === 2) {
            // Diatomic: single bond
            ctx.beginPath();
            ctx.moveTo(atoms[0].x, atoms[0].y);
            ctx.lineTo(atoms[1].x, atoms[1].y);
            ctx.stroke();
        } else if (atoms.length === 3) {
            // H2O, CO2, NaOH: center bonded to two others
            if (formula === 'NaOH') {
                // H-O-Na linear
                const hydrogen = atoms.find(a => a.element === 'H');
                const oxygen = atoms.find(a => a.element === 'O');
                const sodium = atoms.find(a => a.element === 'Na');

                // H-O
                ctx.beginPath();
                ctx.moveTo(hydrogen.x, hydrogen.y);
                ctx.lineTo(oxygen.x, oxygen.y);
                ctx.stroke();

                // O-Na
                ctx.beginPath();
                ctx.moveTo(oxygen.x, oxygen.y);
                ctx.lineTo(sodium.x, sodium.y);
                ctx.stroke();
            } else {
                // H2O, CO2: center bonded to two peripheral atoms
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
                    // Draw bonds from center to each peripheral atom
                    peripheralAtoms.forEach(atom => {
                        ctx.beginPath();
                        ctx.moveTo(centerAtom.x, centerAtom.y);
                        ctx.lineTo(atom.x, atom.y);
                        ctx.stroke();
                    });
                }
            }
        } else if (atoms.length === 4) {
            // H2O2 (chain) or NH3 (star)
            if (formula === 'H₂O₂') {
                // H-O-O-H chain
                const hydrogens = atoms.filter(a => a.element === 'H');
                const oxygens = atoms.filter(a => a.element === 'O');

                // H-O
                ctx.beginPath();
                ctx.moveTo(hydrogens[0].x, hydrogens[0].y);
                ctx.lineTo(oxygens[0].x, oxygens[0].y);
                ctx.stroke();

                // O-O
                ctx.beginPath();
                ctx.moveTo(oxygens[0].x, oxygens[0].y);
                ctx.lineTo(oxygens[1].x, oxygens[1].y);
                ctx.stroke();

                // O-H
                ctx.beginPath();
                ctx.moveTo(oxygens[1].x, oxygens[1].y);
                ctx.lineTo(hydrogens[1].x, hydrogens[1].y);
                ctx.stroke();
            } else {
                // NH3: star pattern
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
                    // Draw bonds from center to all 3 peripheral atoms
                    peripheralAtoms.forEach(atom => {
                        ctx.beginPath();
                        ctx.moveTo(centerAtom.x, centerAtom.y);
                        ctx.lineTo(atom.x, atom.y);
                        ctx.stroke();
                    });
                }
            }
        } else if (atoms.length === 5) {
            // CH4: star pattern
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

            if (centerAtom && peripheralAtoms.length === 4) {
                // Draw bonds from center to all peripheral atoms
                peripheralAtoms.forEach(atom => {
                    ctx.beginPath();
                    ctx.moveTo(centerAtom.x, centerAtom.y);
                    ctx.lineTo(atom.x, atom.y);
                    ctx.stroke();
                });
            }
        } else {
            // Default: connect all atoms
            for (let i = 0; i < atoms.length; i++) {
                for (let j = i + 1; j < atoms.length; j++) {
                    ctx.beginPath();
                    ctx.moveTo(atoms[i].x, atoms[i].y);
                    ctx.lineTo(atoms[j].x, atoms[j].y);
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
    app.canvas.addEventListener('mousedown', onMouseDown);
    app.canvas.addEventListener('mousemove', onMouseMove);
    app.canvas.addEventListener('mouseup', onMouseUp);
    app.canvas.addEventListener('click', onCanvasClick);
    app.canvas.addEventListener('dblclick', onCanvasDoubleClick);

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

function onMouseUp(e) {
    app.atoms.forEach(atom => atom.isDragging = false);
    app.selectedAtom = null;

    // Force immediate reaction check by resetting cooldown, then check
    app.lastReactionCheck = 0;
    checkReactions();
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
        return;
    }

    const freeAtoms = app.atoms.filter(a => !a.moleculeId);

    for (let moleculeData of lesson.molecules) {
        const composition = moleculeData.composition;
        const foundAtoms = findAtomsForMolecule(freeAtoms, composition);

        if (foundAtoms) {
            createMolecule(foundAtoms, moleculeData);
            app.discoveredMolecules.add(moleculeData.name);
            updateMoleculeList();
            return; // Only create one molecule at a time
        }
    }
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

    // Find a cluster of atoms that are all close to each other
    const needed = [];
    for (let element in composition) {
        for (let i = 0; i < composition[element]; i++) {
            needed.push(element);
        }
    }

    // Start with any atom that matches one of the needed elements
    if (atoms.length === 0) return null;

    const startAtom = atoms.find(a => needed.includes(a.element));
    if (!startAtom) {
        return null;
    }

    const found = [startAtom];
    const remaining = [...needed];
    // Remove only the first occurrence of the start atom's element
    const startIdx = remaining.indexOf(startAtom.element);
    if (startIdx !== -1) {
        remaining.splice(startIdx, 1);
    }

    while (remaining.length > 0) {
        let closestAtom = null;
        let closestDist = Infinity;
        let closestIdx = -1;

        // Look for the closest atom of any needed type to any already found atom
        for (let foundAtom of found) {
            for (let i = 0; i < remaining.length; i++) {
                const element = remaining[i];
                for (let atom of atoms) {
                    if (found.includes(atom)) continue;
                    if (atom.element !== element) continue;

                    const dist = Math.hypot(atom.x - foundAtom.x, atom.y - foundAtom.y);
                    if (dist < REACTION_DISTANCE && dist < closestDist) {
                        closestAtom = atom;
                        closestDist = dist;
                        closestIdx = i;
                    }
                }
            }
        }

        if (!closestAtom) {
            return null; // Can't find a close enough atom
        }

        found.push(closestAtom);
        remaining.splice(closestIdx, 1);
    }

    return found.length === needed.length ? found : null;
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

    // Prevent immediate re-sticking by setting a cooldown
    app.lastReactionCheck = Date.now();
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
