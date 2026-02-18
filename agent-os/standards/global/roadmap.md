Phase 1: The Skeleton (UI & Setup)
Initialize Vite + TS + Tailwind.

Create the Layout: Split screen (Left: Camera View, Right: Cart/Bill).

Create the ProductDatabase (Mock Data mapping Class Labels to Prices).

Phase 2: The Brain (AI Integration)
Implement useImageModel hook.

Load the Teachable Machine model URL.

Setup the Webcam component.

Goal: Console log the prediction results with confidence scores > 85%.

Phase 3: The Logic (Smart Cart)
Connect AI predictions to the Cart State.

Implement "Debounce Logic": A product must be seen for X consecutive frames to be added (prevents flickering/spamming items).

Calculate totals in real-time.