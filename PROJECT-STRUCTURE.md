# StudyFlow v0.3 - Project Structure

## 📁 Root Files
- `index.html` - Main application entry point
- `app.js` - Core application logic (EnhancedAssignmentTracker)
- `sw.js` / `sw-android.js` - Service workers for PWA functionality

## 📂 Directory Structure

### `/styles/`
CSS styling files
- `styles.css` - Main application styles with glassmorphism design
- `settings.css` - Settings page specific styles
- `animations.css` - Animation definitions

### `/config/`
Configuration files for build and deployment
- `manifest.json` - PWA manifest
- `package.json` - Node.js dependencies
- `capacitor.config.ts` - Capacitor mobile app configuration
- `android-config.json` - Android-specific settings

### `/docs/`
Documentation and guides
- `README.md` - Main project documentation
- `APK-BUILD-GUIDE.md` - Android APK build instructions
- `UNIFIED-CODEBASE-DOCS.md` - Codebase architecture documentation
- `privacy-policy.txt` - Privacy policy text

### `/build-scripts/`
Build and deployment automation
- `build-apk.bat` - Full Android APK build
- `build-apk-simple.bat` - Simplified APK build
- `quick-apk.bat` - Quick build for testing
- `debug-and-build.bat` - Debug mode build
- `install-dependencies.bat` - Install required dependencies
- `build-apk.sh` - Unix/Linux build script

### `/scripts/`
Utility scripts
- `android-payment-bridge.js` - Payment integration for Android
- `generate_play_store_assets.py` - Generate Play Store graphics

### `/graphics/`
Image assets and icons

### `/paid-features/`
Premium feature modules (modular architecture)

### `/ideas/`
Experimental features and prototypes

## 🚀 Quick Start

1. Open `index.html` in a modern browser
2. Or build APK: run `build-scripts/quick-apk.bat`
3. Documentation: see `docs/README.md`

## 🎨 Key Features

- ✨ Glassmorphism UI with accessibility features
- 📅 Calendar view with day overlay
- 📊 Assignment tracking with priority categories
- 🌓 Dark mode support
- 📱 PWA ready with service worker
- 🎯 Focus trapping and ARIA labels
- 🔄 Safari/iOS compatible (webkit prefixes)
- 🧹 Production-ready (no console.log spam)

## 📝 Recent Cleanup (Oct 22, 2025)

Removed:
- ❌ `CLEANUP-SUMMARY.md`
- ❌ `PHASE1-2-CLEANUP-PLAN.md`
- ❌ `CALENDAR-REBUILD-SUMMARY.md`
- ❌ `verification-test.js`
- ❌ `fix-android-studio.bat`

Organized into folders:
- ✅ All CSS → `/styles/`
- ✅ All configs → `/config/`
- ✅ All docs → `/docs/`
- ✅ All build scripts → `/build-scripts/`
- ✅ All utility scripts → `/scripts/`
