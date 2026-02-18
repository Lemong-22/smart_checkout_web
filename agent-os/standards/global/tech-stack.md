Understood. We will skip the file overhead and define the Master Protocol directly here. This will serve as the "System Prompt" or "Context" for our development session.

Here is the Agent OS Specification for the Smart Checkout AI project.

📂 PROJECT: SMART CHECKOUT AI
Manifesto: Build a real-time, computer-vision-based point of sale system that identifies products without barcodes using browser-based AI.

🛠️ 1. TECH STACK (The Arsenal)
Core: React 18+ (Vite)

Language: TypeScript (Strict Mode)

AI Engine: @teachablemachine/image & @tensorflow/tfjs

Styling: Tailwind CSS (Utility-first)

Icons: lucide-react

State Management: React Context API (or simple State for MVP)

Package Manager: npm

📜 2. DEVELOPMENT RULES (The Law)
Strict Typing: any type is strictly forbidden. All props, state, and AI predictions must have defined Interfaces.

Hook-Based AI: All TensorFlow/Teachable Machine logic must be encapsulated in a custom hook (useImageModel.ts), keeping UI components pure.

Performance First: The camera feed and prediction loop must not block the main thread. Use requestAnimationFrame for the prediction loop.

Fail-Safe: The UI must handle cases where the camera is blocked or the model fails to load gracefully.

Clean Architecture:

components/: Reusable UI elements.

features/: Logic specific to checkout (Cart, Camera).

utils/: Helper functions (Currency formatting, etc.).