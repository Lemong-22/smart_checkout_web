# 🚀 Deploying Smart Checkout AI to Vercel

This guide will walk you through deploying your Smart Checkout AI application to Vercel.

---

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ A GitHub account (you already pushed your code!)
- ✅ A Vercel account (free tier is sufficient)
- ✅ Your repository: `https://github.com/Lemong-22/smart_checkout_web`

---

## 🎯 Quick Deployment (Recommended)

### Method 1: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Sign Up/Login to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub repositories

#### Step 2: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Find your repository: `Lemong-22/smart_checkout_web`
3. Click **"Import"**

#### Step 3: Configure Build Settings
Vercel will auto-detect Vite. Verify these settings:

```
Framework Preset: Vite
Root Directory: vite-project
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 1-2 minutes for build to complete
3. Your app will be live at: `https://smart-checkout-web.vercel.app` (or similar)

---

## 🔧 Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy from Project Directory
```bash
cd /home/yosiedmund/projects/smart_checkout_web/vite-project
vercel
```

### Step 4: Follow Prompts
```
? Set up and deploy "~/projects/smart_checkout_web/vite-project"? [Y/n] Y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] N
? What's your project's name? smart-checkout-ai
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

### Step 5: Production Deployment
```bash
vercel --prod
```

---

## ⚙️ Configuration Files

### Create `vercel.json` (Optional but Recommended)

Create this file in `/vite-project/` directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures proper routing for your single-page application.

---

## 🎥 Camera Permissions on Vercel

### Important: HTTPS Requirement
- ✅ Vercel automatically provides HTTPS
- ✅ Camera access requires HTTPS (getUserMedia API)
- ✅ Your deployed app will work with camera

### Browser Permissions
Users will need to:
1. Allow camera access when prompted
2. Ensure they're using a supported browser (Chrome, Firefox, Safari, Edge)

---

## 🔍 Troubleshooting

### Issue 1: Build Fails
**Error:** `Command "npm run build" exited with 1`

**Solution:**
```bash
# Test build locally first
cd vite-project
npm run build

# If it works locally, check:
# 1. All dependencies in package.json
# 2. No TypeScript errors
# 3. No missing imports
```

### Issue 2: Camera Not Working
**Error:** Camera permission denied or black screen

**Solution:**
- Ensure you're accessing via HTTPS (Vercel provides this)
- Check browser console for errors
- Try different browser
- Ensure camera is not being used by another app

### Issue 3: 404 on Refresh
**Error:** Page not found when refreshing

**Solution:** Add `vercel.json` with rewrites (see Configuration Files above)

### Issue 4: Build Size Too Large
**Error:** Deployment exceeds size limits

**Solution:**
```bash
# Optimize build
npm run build

# Check dist size
du -sh dist/

# If too large, consider:
# 1. Code splitting
# 2. Lazy loading components
# 3. Removing unused dependencies
```

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `smartcheckout.yourdomain.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

---

## 📊 Environment Variables (If Needed)

If you add API keys or secrets in the future:

1. Go to **"Settings"** → **"Environment Variables"**
2. Add variables:
   ```
   VITE_API_KEY=your_key_here
   VITE_API_URL=https://api.example.com
   ```
3. Redeploy for changes to take effect

**Note:** Current project doesn't need environment variables!

---

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically builds and deploys!
```

### Preview Deployments
- Every branch gets a preview URL
- Pull requests get automatic preview deployments
- Test before merging to main

---

## 📈 Monitoring & Analytics

### Vercel Analytics (Optional)
1. Go to **"Analytics"** tab in Vercel Dashboard
2. Enable Web Analytics
3. Add to your project:
   ```bash
   npm install @vercel/analytics
   ```
4. Update `src/main.tsx`:
   ```typescript
   import { inject } from '@vercel/analytics';
   inject();
   ```

---

## 🎯 Post-Deployment Checklist

After deployment, verify:

- [ ] App loads at Vercel URL
- [ ] Camera permission prompt appears
- [ ] Object detection works
- [ ] Cart functionality works
- [ ] Checkout flow completes
- [ ] Animations play smoothly
- [ ] Audio feedback works
- [ ] Mobile responsive
- [ ] All pages accessible

---

## 📱 Share Your Project

Your deployed app URL will be something like:
```
https://smart-checkout-ai.vercel.app
```

Share this URL:
- ✅ In your presentation
- ✅ On your resume/portfolio
- ✅ With potential employers
- ✅ On social media

---

## 🚀 Quick Commands Reference

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]

# Link to existing project
vercel link
```

---

## 💡 Pro Tips

1. **Use Preview Deployments:** Test changes before production
2. **Enable Analytics:** Track user engagement
3. **Set Up Alerts:** Get notified of deployment failures
4. **Use Custom Domain:** More professional for presentations
5. **Monitor Performance:** Check Vercel's performance metrics
6. **Optimize Images:** Use WebP format for better loading
7. **Enable Caching:** Vercel handles this automatically
8. **Test on Mobile:** Ensure responsive design works

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Custom Domains Guide](https://vercel.com/docs/concepts/projects/domains)

---

## 🎓 For Your Presentation

### Demo URL
Once deployed, add this to your presentation:

**Live Demo:** `https://your-app.vercel.app`

### QR Code
Generate a QR code for easy mobile access:
1. Go to [qr-code-generator.com](https://www.qr-code-generator.com/)
2. Enter your Vercel URL
3. Download QR code
4. Add to presentation slide

---

## ✅ Success!

Your Smart Checkout AI is now live on the internet! 🎉

**Next Steps:**
1. Test thoroughly on different devices
2. Share with your team
3. Prepare presentation demo
4. Gather feedback
5. Iterate and improve

---

*Last Updated: February 2026*  
*Deployment Platform: Vercel*  
*Framework: Vite + React + TypeScript*
