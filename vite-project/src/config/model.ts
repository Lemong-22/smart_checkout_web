/**
 * TEACHABLE MACHINE MODEL CONFIGURATION
 * 
 * Instructions:
 * 1. Train your model at https://teachablemachine.withgoogle.com/
 * 2. Export as "TensorFlow.js" format
 * 3. Upload to Google Cloud or use the provided URL
 * 4. Replace the MODEL_URL below with your model's URL
 * 
 * Example URL format:
 * https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/
 * 
 * Make sure the URL ends with a forward slash (/)
 */

export const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/uBjyWBBu4/';

/**
 * Minimum confidence threshold for predictions (0.0 to 1.0)
 * Predictions below this threshold will be ignored
 * Set to 0.70 (70%) to balance detection accuracy and false positives
 */
export const CONFIDENCE_THRESHOLD = 0.70;

/**
 * Number of consecutive frames a product must be detected
 * before being added to cart (for Phase 3)
 */
export const DETECTION_FRAME_COUNT = 10;
