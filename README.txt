SMART OBJECT EXPLORER — CUSTOM CATEGORY EDITION

This version uses your Teachable Machine model as the ONLY image classifier.
It then creates a ChatGPT prompt from the predicted category name only. The
uploaded photo is not attached to ChatGPT and ChatGPT is explicitly told not
to identify or inspect an image.

INSTALL / UPDATE ON GITHUB PAGES
1. Open your smart-object-explorer GitHub repository.
2. Replace the existing root files index.html, style.css and app.js with the
   three files in this folder. Upload them to the repository root (not inside
   another folder) and commit the changes.
3. Wait for GitHub Pages to finish deploying, then refresh your website.
4. Export your Teachable Machine project as TensorFlow.js and copy its hosted
   model URL. Paste that URL into Model URL and tap Load model.
5. Upload a picture and tap Classify uploaded picture.
6. Tap Ask ChatGPT about this category. The button opens ChatGPT with a
   category-only prompt. If the prompt is not prefilled in your browser, use
   Copy prompt and paste it into ChatGPT manually.

IMPORTANT
- Your website only predicts among the classes in your trained model.
- A classifier may still force an unfamiliar image into one of its known
  classes. Add an Other / Unknown class with varied non-target images to
  improve rejection of unsupported objects. This is not a perfect guarantee.
- ChatGPT provides the written explanation; it does not see the uploaded image.
- This static GitHub Pages version does not call an AI API or display AI
  answers directly inside the website. That would require a separate backend
  and an AI service/API, which may have usage costs or limits.
