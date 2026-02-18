# 🧠 AI Model Setup Guide

## Phase 2 Complete ✅

Your Smart Checkout AI is now ready to receive a trained Teachable Machine model. Follow these steps to train and deploy your model.

---

## 📚 Step 1: Train Your Model

### 1.1 Go to Teachable Machine
Visit: **https://teachablemachine.withgoogle.com/**

### 1.2 Create an Image Project
- Click **"Get Started"**
- Select **"Image Project"** → **"Standard image model"**

### 1.3 Create Classes
Create a class for each product you want to detect. For example:
- **Class 1:** Teh Botol Sosro
- **Class 2:** Chitato
- **Class 3:** Buku Tulis
- **Class 4:** Indomie
- **Class 5:** Aqua

### 1.4 Collect Training Data
For **each class**:
1. Click **"Webcam"** under the class
2. Hold the product in front of your camera
3. Click and hold **"Hold to Record"** to capture ~50-100 images
4. **Vary the angles, distances, and lighting** for better accuracy

**Tips:**
- Use good lighting
- Capture from multiple angles
- Include the product at different distances
- Use plain backgrounds when possible

### 1.5 Train the Model
1. Click **"Train Model"** (this may take 2-5 minutes)
2. Wait for training to complete
3. Test the model using the **"Preview"** panel

---

## 🚀 Step 2: Export & Deploy Your Model

### 2.1 Export the Model
1. Click **"Export Model"** at the top
2. Select the **"TensorFlow.js"** tab
3. Choose **"Upload my model"** (recommended) or **"Download"**

### 2.2 Get Your Model URL
If you chose **"Upload my model"**:
- Teachable Machine will provide a shareable link
- Copy the full URL (e.g., `https://teachablemachine.withgoogle.com/models/abc123xyz/`)

If you chose **"Download"**:
- Host the files on a server (GitHub Pages, Netlify, etc.)
- Use the hosted URL

---

## ⚙️ Step 3: Configure Your App

### 3.1 Update the Model URL
Open: **`src/config/model.ts`**

Replace this line:
```typescript
export const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/YOUR_ID/';
```

With your actual model URL:
```typescript
export const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/abc123xyz/';
```

**Important:** Make sure the URL ends with a forward slash `/`

### 3.2 Update Product Database (Optional)
If your trained classes don't match the mock products, update: **`src/data/products.ts`**

Make sure the `name` field matches your Teachable Machine class names **exactly**.

Example:
```typescript
export const PRODUCTS: Product[] = [
  {
    id: 'teh-botol-1',
    name: 'Teh Botol',  // ← Must match your TM class name
    price: 5000,
    category: 'Minuman',
  },
  // ... more products
];
```

---

## 🧪 Step 4: Test Your Model

### 4.1 Start the Dev Server
```bash
npm run dev
```

### 4.2 Grant Camera Permissions
- Your browser will ask for camera access
- Click **"Allow"**

### 4.3 Test Detection
1. Hold a product in front of your camera
2. Watch the **prediction overlay** at the bottom of the camera view
3. The detected product name and confidence % should appear

**Expected Behavior:**
- ✅ Product name appears when confidence > 50%
- ✅ Confidence bar animates smoothly
- ✅ "Scanning for products..." shows when nothing is detected

---

## 🔧 Troubleshooting

### Camera Not Working
- **Check browser permissions:** Settings → Privacy → Camera
- **Use HTTPS or localhost:** Browsers block camera on HTTP
- **Try a different browser:** Chrome/Edge work best

### Model Not Loading
- **Check the URL:** Must end with `/`
- **Check CORS:** Model must be publicly accessible
- **Check console:** Open DevTools (F12) for error messages

### Low Accuracy
- **Retrain with more samples:** 100+ images per class
- **Improve lighting:** Use consistent, bright lighting
- **Reduce background noise:** Use plain backgrounds
- **Adjust confidence threshold:** Edit `CONFIDENCE_THRESHOLD` in `src/config/model.ts`

---

## 📊 Configuration Options

### `src/config/model.ts`

```typescript
// Your model URL
export const MODEL_URL = 'https://...';

// Minimum confidence (0.0 to 1.0)
// Lower = more detections, but less accurate
export const CONFIDENCE_THRESHOLD = 0.5;

// Frames needed for Phase 3 (auto-add to cart)
export const DETECTION_FRAME_COUNT = 10;
```

---

## ✅ Phase 2 Checklist

- [x] Custom hook (`useImageModel.ts`) implemented
- [x] Camera component (`CameraView.tsx`) created
- [x] Real-time prediction overlay working
- [x] Error handling for camera/model failures
- [x] Loading states implemented
- [x] Configuration file created
- [ ] **Train your Teachable Machine model**
- [ ] **Update MODEL_URL in `src/config/model.ts`**
- [ ] **Test with real products**

---

## 🎯 Next: Phase 3 - Smart Cart Integration

Once your model is working and detecting products correctly, you'll implement:
- **Debounce logic** (product must be seen X frames before adding)
- **Auto-add to cart** when detection is stable
- **Prevent duplicate additions**
- **Real-time cart updates**

---

**Need Help?** Check the browser console (F12) for detailed error messages.
