# Release Checklist for Google Play Store

## Pre-Submission Tasks

### 1. App Build
- [ ] Build release APK or AAB (Android App Bundle)
- [ ] Sign APK with release keystore
- [ ] Test signed APK on multiple devices
- [ ] Verify version code and version name in build.gradle or capacitor.config.ts
- [ ] Enable ProGuard/R8 for code optimization
- [ ] Remove all debug logs and console.log statements

### 2. App Store Assets

#### Required Assets
- [ ] App Icon (512x512 PNG, 32-bit with alpha)
- [ ] Feature Graphic (1024x500 JPEG or PNG)
- [ ] At least 2 screenshots (minimum 320px on shortest side)
- [ ] High-res icon (512x512 PNG)

#### Screenshot Requirements
- [ ] Screenshot 1: Home view with assignments
- [ ] Screenshot 2: Calendar view
- [ ] Screenshot 3: Assignment details/creation
- [ ] Screenshot 4: Settings/customization
- [ ] Screenshot 5: Stats dashboard
- [ ] Screenshot 6: All assignments with filters
- [ ] Screenshot 7: Mobile responsive view
- [ ] Screenshot 8: Tablet view (optional)

**Dimensions**: 
- Phone: 1080x1920 to 7680x4320
- Tablet: 1200x1920 to 7680x4320

### 3. Store Listing Content

#### Text Content
- [ ] App title (max 50 characters)
- [ ] Short description (max 80 characters)
- [ ] Full description (max 4000 characters)
- [ ] What's new / Release notes (max 500 characters)

#### Categorization
- [ ] Select primary category: Education
- [ ] Select tags/keywords
- [ ] Choose content rating

### 4. Legal & Policy Documents

- [ ] Privacy Policy (hosted URL or in-app)
- [ ] Terms of Service (if applicable)
- [ ] README.md documentation
- [ ] LICENSE file (MIT, Apache, etc.)
- [ ] Copyright notices

### 5. App Information

- [ ] Developer/Organization name
- [ ] Contact email
- [ ] Website URL (optional)
- [ ] Support URL (optional)

### 6. Content Rating Questionnaire

Answer Google's questionnaire about:
- [ ] Violence
- [ ] Sexual content
- [ ] Profanity
- [ ] Controlled substances
- [ ] User-generated content
- [ ] Location sharing
- [ ] Personal information collection
- [ ] In-app purchases

**For StudyFlow**: Should be rated "Everyone" (no sensitive content)

### 7. App Access

- [ ] Provide instructions for testing (if app requires login)
- [ ] Demo credentials (if applicable)
- [ ] List any special access requirements

**For StudyFlow**: No special access needed - fully functional without login

### 8. Ads Declaration

- [ ] Declare if app contains ads
- [ ] Specify ad types if present

**For StudyFlow**: No ads

### 9. Target Audience & Content

- [ ] Declare target age group
- [ ] COPPA compliance (if targeting children under 13)
- [ ] Teacher approved program (optional)

**For StudyFlow**: 
- Target: 13+ (suitable for all ages)
- COPPA compliant (no data collection)

### 10. App Permissions

Review and justify all permissions requested:
- [ ] Storage: For saving custom backgrounds
- [ ] Internet: For PWA functionality (if applicable)
- [ ] No other permissions required

### 11. Testing

- [ ] Test on Android 6.0+ (minimum supported version)
- [ ] Test on different screen sizes
- [ ] Test on tablets
- [ ] Test offline functionality
- [ ] Test app startup time
- [ ] Test memory usage
- [ ] Verify no crashes or ANRs
- [ ] Test with accessibility features enabled

### 12. Performance

- [ ] App size under 150MB (preferably under 50MB)
- [ ] Startup time under 5 seconds
- [ ] No memory leaks
- [ ] Battery efficient
- [ ] 60fps animations where possible

### 13. Security

- [ ] HTTPS for all network requests (if any)
- [ ] No hardcoded secrets or API keys
- [ ] Secure data storage practices
- [ ] ProGuard/R8 obfuscation enabled

### 14. Localization (Optional)

- [ ] English (required)
- [ ] Additional languages (if supported)
- [ ] Localized screenshots for each language

### 15. Pre-Launch Report

- [ ] Run Google Play pre-launch report
- [ ] Fix any issues found
- [ ] Verify accessibility
- [ ] Check security issues

## Submission Process

### Step 1: Google Play Console Setup
1. [ ] Create Google Play Console account ($25 one-time fee)
2. [ ] Accept Developer Agreement
3. [ ] Set up merchant account (if offering paid apps/IAP)

### Step 2: Create App Listing
1. [ ] Create new app in console
2. [ ] Fill in app details
3. [ ] Upload assets (icon, screenshots, feature graphic)
4. [ ] Write store listing text
5. [ ] Complete content rating questionnaire
6. [ ] Set pricing and distribution

### Step 3: Upload APK/AAB
1. [ ] Create release (Production, Beta, or Alpha)
2. [ ] Upload signed APK or AAB
3. [ ] Fill in release notes
4. [ ] Review release details

### Step 4: Complete All Sections
- [ ] Store listing
- [ ] Content rating
- [ ] Pricing & distribution
- [ ] App content (target audience, ads, access)
- [ ] Select countries for distribution

### Step 5: Submit for Review
1. [ ] Review all information
2. [ ] Submit for review
3. [ ] Wait for approval (typically 1-7 days)

## Post-Submission

- [ ] Monitor review status
- [ ] Respond to any review feedback
- [ ] Prepare marketing materials
- [ ] Plan launch announcement
- [ ] Set up app analytics (optional)
- [ ] Monitor user reviews and ratings
- [ ] Prepare for user feedback and bug reports

## Common Rejection Reasons to Avoid

- [ ] Misleading app description
- [ ] Copyright violations (icons, images, name)
- [ ] Broken functionality
- [ ] Privacy policy missing or inadequate
- [ ] Target audience mismatch
- [ ] Inappropriate content for declared rating
- [ ] Permissions not justified
- [ ] Crashes or major bugs

## Quick Reference: Google Play Requirements

**Minimum Requirements:**
- Target API Level: Android 12 (API 31) or higher
- Minimum SDK: Android 6.0 (API 23) recommended
- App Bundle format preferred over APK
- 64-bit architecture support required
- Privacy Policy URL (required for apps that access sensitive data)

**File Size Limits:**
- APK: 100MB
- App Bundle: 150MB
- Expansion files: 2GB each (up to 2 files)

**Icon Requirements:**
- 512x512 px
- 32-bit PNG with alpha
- No rounded corners (Google Play adds them)
- Up to 1MB file size

**Feature Graphic:**
- 1024x500 px
- JPG or PNG
- No transparency

## Resources

- Google Play Console: https://play.google.com/console
- Developer Policy Center: https://play.google.com/about/developer-content-policy/
- Launch Checklist: https://developer.android.com/distribute/best-practices/launch/launch-checklist
- Design Guidelines: https://developer.android.com/design

---

**Note**: Keep this checklist updated as you progress through the submission process. Some requirements may change over time, so always refer to the official Google Play documentation for the most current information.
