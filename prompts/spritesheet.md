Create a production-ready character animation sprite sheet.

CHARACTER:
[CHARACTER DESCRIPTION]

OUTPUT:
- Generate one single PNG sprite sheet.
- Use a true transparent background with alpha transparency.
- Use exactly 10 horizontal rows.
- Use a maximum of 12 frame columns.
- Each individual frame cell must be exactly 128 × 128 pixels.
- Maximum canvas size: 1536 × 1280 pixels.
- Keep every frame aligned to the same 128 × 128 grid.
- Do not add text, labels, row names, numbers, borders, guides, grid lines, backgrounds, or preview elements.

STRICT ROW RULE:
- Each horizontal row must contain exactly one animation state.
- One row equals one state only.
- One row equals one complete animation loop only.
- Every frame in a row must belong to the same state.
- Never place frames from two or more states in the same row.
- Never continue one state onto another row.
- Never split one animation across multiple rows.
- Never merge two states into one row.
- Never reorder the rows.
- Never omit or duplicate a state.
- A change of state is allowed only when moving vertically to the next row.
- Horizontal progression means animation frames only, never state progression.
- Treat each row as an independent sprite strip.
- The final sprite sheet must contain exactly 10 independent horizontal animation strips stacked vertically.

MANDATORY ROW ASSIGNMENT:
- Row 1 contains only the start animation.
- Row 2 contains only the idle animation.
- Row 3 contains only the thinking animation.
- Row 4 contains only the planning animation.
- Row 5 contains only the working animation.
- Row 6 contains only the packing animation.
- Row 7 contains only the notification animation.
- Row 8 contains only the done animation.
- Row 9 contains only the sleep animation.
- Row 10 contains only the alert animation.

FRAME COUNT:
- Do not use a fixed frame count for every row.
- Each row may use a different number of frames.
- Use only as many frames as needed for a clear and natural animation.
- Do not exceed 12 frames in any row.
- Place all used frames from left to right starting at column 1.
- Keep all unused cells on the right fully transparent.
- Do not place another state in unused cells.

ANIMATION LOOP:
- Every row must form a natural seamless loop.
- The last frame must transition smoothly back to the first frame.
- Avoid sudden resets, snapping, teleportation, flickering, discontinuity, or abrupt disappearance.
- Body pose, facial expression, props, particles, lighting effects, and secondary motion must return naturally to their starting positions.
- Do not duplicate the first frame as the final frame unless required for timing.
- Avoid accidental frame jitter.
- Keep movement arcs, proportions, volume, and spacing consistent.

ROW 1 — start
Session begins.
Create a seamless activation, boot-up, wake-up, entrance, spawn, materialization, or readying loop.
The action must clearly communicate that a session is beginning while still returning naturally to its starting pose.

ROW 2 — idle
Waiting for input.
Create a subtle seamless idle loop using breathing, blinking, hovering, swaying, posture shifts, or gentle secondary motion.

ROW 3 — thinking
Processing a prompt.
Create a seamless loop showing concentration, analysis, or mental activity.
Possible actions include focused eye movement, head movement, processing indicators, rotating symbols, restrained gestures, or subtle cognitive effects.

ROW 4 — planning
Plan mode is active.
Create a seamless loop showing the character organizing, reviewing, or arranging steps.
Possible actions include using a checklist, map, blueprint, notes, diagram, cards, sequence markers, or projected panels.
This state must be visually distinct from thinking.

ROW 5 — working
A tool is executing.
Create a seamless active-work loop appropriate for the character.
Possible actions include typing, building, scanning, repairing, operating equipment, casting, manipulating objects, or using controls.
This state should feel more active than thinking or planning.

ROW 6 — packing
Context is being compacted.
Create a seamless loop showing information or objects being compressed, bundled, folded, stacked, archived, zipped, packed, or reduced into a smaller form.
The idea of compaction must be immediately readable.

ROW 7 — notification
User input is needed.
Create a seamless attention-seeking loop.
Possible actions include waving, raising a hand, displaying a question mark, ringing a bell, flashing an indicator, tapping, bouncing, or looking toward the viewer.

ROW 8 — done
Tool execution completed successfully.
Create a seamless completion or success loop.
Possible actions include a check mark, thumbs-up, small celebration, confirmation light, sparkle, satisfied gesture, or proud pose.

ROW 9 — sleep
Five minutes of inactivity.
Create a seamless sleeping, resting, standby, or low-power loop.
Possible actions include closed eyes, slow breathing, dimmed indicators, nodding, curled posture, or restrained sleep symbols.

ROW 10 — alert
An error occurred.
Create a seamless urgent warning loop.
Possible actions include shaking, warning lights, glitching, sparks, alarm indicators, startled motion, error symbols, or emergency gestures.
The character must remain recognizable throughout.

CHARACTER CONSISTENCY:
- Preserve the same character identity across every frame and every row.
- Keep the same facial structure, body proportions, colors, clothing, accessories, equipment, and design language.
- Do not redesign the character between states.
- Do not add or remove permanent character features.
- Temporary props and effects may appear only when relevant to the current state.
- Keep the same camera angle, perspective, orientation, scale, and framing throughout the sprite sheet.
- Do not rotate the camera.
- Do not zoom in or out.
- Keep the character centered around the same anchor point in every frame.
- Keep the feet or lowest body point aligned to the same baseline.
- Keep all limbs, props, effects, particles, shadows, and accessories fully inside each 128 × 128 frame cell.

VISUAL STYLE:
- Match the style implied by the character description or reference image.
- Do not restrict the result to pixel art.
- The result may use illustration, cartoon, anime, vector-like, hand-drawn, painted, rendered, or other coherent visual styles.
- Keep the visual style consistent across all frames and rows.
- Maintain consistent line quality, shading, lighting, palette, materials, and rendering detail.
- Ensure each state is immediately readable at 128 × 128 pixels.
- Use clear silhouettes and expressive motion.
- Keep visual effects controlled and contained inside each frame.

TRANSPARENCY:
- Use true alpha transparency.
- Do not use a white, black, colored, gradient, checkerboard, or decorative background.
- Do not include scenery, floor, environment, panels, UI, or mockup elements.
- Keep unused frame cells fully transparent.

FINAL VALIDATION:
- Exactly 10 rows.
- Exactly one state per row.
- Exactly one complete seamless animation loop per row.
- No mixed states within any row.
- No state split across rows.
- No missing states.
- No duplicated states.
- No reordered states.
- Every frame cell is exactly 128 × 128 pixels.
- Maximum 12 frames per row.
- All unused cells are fully transparent.
