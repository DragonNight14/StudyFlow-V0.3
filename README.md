# StudyFlow v0.3 - Advanced Assignment Tracker# 📚 StudyFlow v0.3 - Advanced Assignment Tracker



**Track your assignments with style and intelligence**A modern, glassmorphic Progressive Web App for tracking academic assignments with **Classes Management**, real-time Canvas LMS and Google Classroom integration, featuring offline-first functionality and premium features.



StudyFlow is a modern, feature-rich assignment tracking application designed to help students manage their academic workload efficiently. With its beautiful glassmorphic UI and intelligent priority system, staying organized has never been easier.> **🧹 Clean Architecture**: This version features a simplified file structure with all functionality integrated into the main app. No external HTML files required - everything works through overlays and modals within `index.html`.



## 🌟 Features## ✨ New in v0.3



### Core Functionality### 📚 Classes Management

- **Smart Priority System**: Automatically categorizes assignments into High Priority, Coming Up, and Worry About Later- **Class organization** with customizable colors and descriptions

- **Beautiful Glassmorphism UI**: Modern, elegant design with customizable backgrounds- **Assignment categorization** by class/subject with visual labels

- **Calendar Integration**: Visual calendar view with assignment deadlines- **Progress tracking** showing completion percentage per class

- **Progress Tracking**: Monitor your completion rate and maintain study streaks- **Integrated creation** - create assignments directly from class views

- **Comprehensive Stats Dashboard**: Track active tasks, completed assignments, overdue items, and daily streaks- **CRUD operations** - create, edit, delete classes with modal interfaces



### Assignment Management### 🎯 Enhanced User Experience  

- **Quick Creation**: Easily add new assignments with title, description, due date, and priority- **Unified interface** - no page redirects, everything in overlays

- **Subject Organization**: Color-coded subjects for easy visual identification- **Assignment labels** - clear subject badges on all assignment cards

- **Rich Details**: Add class names, descriptions, priorities, and custom colors- **Streamlined workflow** - faster assignment creation and management

- **Status Tracking**: Mark assignments as completed, pending, or overdue- **Cleaner codebase** - removed redundant files and dependencies

- **Edit & Delete**: Full CRUD operations for managing your assignments

## ✨ Features

### Customization

- **Background Options**:### 🎨 Modern Glassmorphic Design

  - Gradient backgrounds with custom color pickers- Translucent cards with blur effects

  - Pattern overlays (dots, lines, grid, waves, noise)- Smooth 60fps animations

  - Custom image uploads- Dynamic priority sections (High Priority, Coming Up, Worry About It Later)

  - Video backgrounds (up to 5MB)- Customizable assignment cards with color streaks

  - Solid colors- Dark mode with tinted black styling

- **Glassmorphism Toggle**: Enable or disable glass effects

- **Theme Support**: Dark mode compatible### 📅 Smart Assignment Management

- **Visual Modes**: Performance mode for lower-end devices- Dynamic priority categorization based on due dates

- Customizable assignment cards with gradients, colors, and images

### Mobile Optimized- Calendar view with tap-and-hold pip markers

- **Touch-Friendly**: 44px minimum tap targets (Material Design standard)- Assignment editing functionality

- **Responsive Design**: Optimized for phones, tablets, and desktops- Completion celebrations with fade-out animations

- **Safe Area Support**: Works perfectly with notched devices

- **Smooth Scrolling**: Optimized animations for 60fps performance### 🔗 Real-time API Integration

- **Offline Support**: Progressive Web App capabilities with service worker- Canvas LMS direct integration (no manual API keys)

- Google Classroom OAuth integration

## 📱 Installation- Real-time sync with error handling

- Offline-first with background sync

### As a Progressive Web App (PWA)- Assignment merging and conflict resolution

1. Open StudyFlow in your mobile browser

2. Tap the browser menu### 🎯 Premium Features

3. Select "Add to Home Screen" or "Install App"- Advanced Analytics with productivity reports

4. Access StudyFlow like a native app- Cloud Sync for cross-device backup

- Premium Themes with special effects

### As an Android APK- Upgrade prompts and feature gating

1. Download the APK from the releases section

2. Enable "Install from Unknown Sources" in your Android settings### 📱 PWA & Offline Support

3. Install the APK file- Service worker caching

4. Launch StudyFlow from your app drawer- IndexedDB storage

- Push notifications for deadlines

## 🚀 Getting Started- Background sync queue

- Installable on mobile and desktop

### Creating Your First Assignment

1. Tap the **Create** button (📝) at the bottom right## 🚀 Quick Start

2. Fill in the assignment details:

   - **Title**: Name of the assignment### Prerequisites

   - **Description**: Additional details or notes- Modern web browser (Chrome/Edge recommended)

   - **Subject**: Choose or create a subject- Internet connection for API integrations

   - **Due Date & Time**: When it's due- Optional: Node.js for development

   - **Priority**: High, Medium, or Low

3. Tap **Create Assignment**### Installation

1. Clone or download this project

### Managing Assignments2. Open `index.html` in your browser

- **Check Off**: Tap the checkbox to mark as complete3. Or serve via local server for full PWA features

- **View Details**: Tap the info button (ℹ️) to see full details4. Install as PWA using browser's "Add to Home Screen"

- **Edit**: Tap the edit button (✏️) to modify

- **Delete**: Tap the delete button (🗑️) to remove## 🎨 Customization



### Navigating Views### Theme & Colors

Use the bottom navigation bar to switch between:- **Color Palettes**: Ocean, Sunset, Forest, Lavender, Rose Gold, Monochrome

- **Home**: Priority-organized assignments- **Custom Colors**: Primary, secondary, and accent color pickers

- **All**: Complete list with search and filters- **Background Options**: Gradient, patterns (dots, grid, waves, hexagon), custom images, solid colors

- **Calendar**: Monthly calendar view- **Dark Mode**: Tinted black styling with glassmorphic elements

- **Settings**: Customize appearance and behavior

### Assignment Cards

## 🎨 Customization- **Color Streaks**: Visual indicators for Canvas LMS (blue) and Google Classroom (green)

- **Custom Backgrounds**: Gradients, solid colors, and uploaded images

### Changing Backgrounds- **Priority Levels**: High (red), Medium (yellow), Low (green) with visual indicators

1. Go to **Settings**- **Editable**: Modify title, description, due date, colors, and priority

2. Scroll to **Background & Appearance**

3. Choose from:### Settings & Preferences

   - **Gradient**: Select two colors for a gradient- **Notifications**: Push notifications, deadline reminders, completion celebrations

   - **Pattern**: Add dot, line, grid, wave, or noise overlays- **API Integration**: Toggle Canvas and Google Classroom sync

   - **Image**: Upload a custom image- **Data Management**: Export, import, and clear data options

   - **Video**: Upload a video background (max 5MB)- **Shader Effects**: Toggle glassmorphic blur effects

   - **Solid Color**: Choose a single color

## 📱 Mobile & PWA Features

### Managing Subjects

1. Go to **Settings**### Installation

2. Scroll to **Subjects & Classes**1. Open the app in Chrome/Edge on mobile

3. Add, edit, or delete subjects2. Tap the "Add to Home Screen" prompt

4. Assign custom colors to each subject3. Or use browser menu > "Install App"

4. App will appear as native app icon

## 🔧 Technical Details

### Offline Functionality

### Built With- All assignments cached locally

- **Vanilla JavaScript**: No framework dependencies- Create and edit assignments offline

- **CSS3**: Modern styling with backdrop-filter effects- Background sync when connection restored

- **HTML5**: Semantic markup- Service worker handles caching strategies

- **Capacitor**: For native Android features

- **Service Workers**: Offline functionality### Push Notifications

- Assignment deadline reminders

### Browser Support- Completion celebrations

- Chrome/Edge 79+- Sync status updates

- Safari 13+- Configurable in settings

- Firefox 70+

- Samsung Internet 10+## 🔧 Debugging



### Storage### Common Issues & Solutions

- Uses localStorage for data persistence

- All data stored locally on your device#### Missing Icons

- No external servers or data collection- **Problem**: `icon-192x192.png` or `icon-512x512.png` not found

- **Solution**: Run `npm run generate-icons` or open `create-icons.html`

## 📊 Statistics

#### Service Worker Not Registering

Track your productivity with:- **Problem**: App doesn't work offline

- **Active Tasks**: Current pending assignments- **Solution**: Check browser console for errors, ensure HTTPS or localhost

- **Completed Count**: Total completed assignments

- **Overdue Items**: Assignments past their due date#### Manifest Issues

- **Day Streak**: Consecutive days of completing tasks- **Problem**: "Add to Home Screen" not working

- **Solution**: Validate manifest.json using the debug script

## 🔒 Privacy

#### Android SDK Issues

StudyFlow respects your privacy:- **Problem**: Cannot build APK locally

- ✅ All data stored locally on your device- **Solution**: Use PWA Builder cloud service instead

- ✅ No user accounts required

- ✅ No data sent to external servers### Debug Checklist

- ✅ No tracking or analytics- [ ] All icon files present (192x192, 512x512)

- ✅ No ads- [ ] manifest.json is valid JSON

- [ ] Service worker registered successfully

## 🐛 Known Issues- [ ] PWA installable in browser

- [ ] Offline functionality works

- Video backgrounds may cause performance issues on lower-end devices- [ ] All features tested on mobile

- localStorage has a ~5-10MB limit per domain

## 📋 Project Structure

## 📝 Changelog

```

### v0.3 (Current)homework-tracker/

- Redesigned assignment cards with horizontal action buttons├── index.html                    # Main app interface

- Added comprehensive mobile and tablet optimizations├── create-assignment-enhanced.html # Enhanced assignment creation

- Improved touch targets for better usability├── login.html                   # Login page

- Fixed background persistence issues├── manifest.json               # PWA manifest

- Enhanced glassmorphism effects├── enhanced-sw.js              # Enhanced service worker

- Optimized performance for 60fps animations├── styles.css                  # Glassmorphic styles

- Added safe area support for notched devices├── animations.css              # 60fps animations

- Removed quick background palette for cleaner UI├── settings.css               # Settings page styles

├── enhanced-script.js          # Main app logic

### v0.2├── enhanced-settings.js        # Settings manager

- Added Canvas LMS integration├── assignment-editor.js        # Assignment editing

- Implemented glassmorphism UI├── background-manager.js       # Background customization

- Added premium features├── api-integration.js          # Canvas/Google Classroom APIs

- Enhanced settings page├── paid-features/             # Premium features folder

│   ├── advanced-analytics.js   # Productivity reports

### v0.1│   ├── cloud-sync.js           # Cross-device sync

- Initial release│   └── premium-themes.js       # Special themes

- Basic assignment tracking├── android-config.json         # Android PWA config

- Calendar view└── package.json               # Project metadata

- Subject management```



## 🤝 Contributing## 🔧 API Integration Setup



This is an open-source project. Contributions are welcome!### Canvas LMS Integration

1. Open Settings > API Integration

## 📄 License2. Click "Connect Canvas LMS"

3. OAuth flow handles authentication automatically

MIT License - Free to use, modify, and distribute4. Assignments sync in real-time

5. Blue color streak indicates Canvas assignments

## 💬 Support

### Google Classroom Integration

For issues or feature requests, please visit the GitHub repository.1. Open Settings > API Integration

2. Click "Connect Google Classroom"

---3. Google OAuth handles authentication

4. Courses and assignments sync automatically

**Made with ❤️ for students who want to stay organized**5. Green color streak indicates Classroom assignments



Version: 0.3  ### Offline Queue

Last Updated: October 2025- Failed syncs queued automatically

- Background sync processes queue when online
- User-friendly error messages
- Retry mechanisms with exponential backoff

### Data Management
- **Export**: Download all data as JSON
- **Import**: Upload previously exported data
- **Clear**: Reset all assignments and settings
- **Sync Status**: Real-time connection indicators

## 💎 Premium Features

### Advanced Analytics
- Productivity reports and trends
- Completion streak tracking
- Subject-wise breakdown
- Time management insights
- Visual dashboards with charts

### Cloud Sync
- Cross-device backup and sync
- Real-time data synchronization
- Conflict resolution
- Multiple device support
- Secure cloud storage

### Premium Themes
- Neon Glow effects
- Holographic backgrounds
- Particle systems
- Advanced animations
- Exclusive color schemes

### Upgrade System
- Feature gating for free users
- Upgrade prompts and CTAs
- Premium badge indicators
- Trial periods and demos

## 🚀 Development & Deployment

### Local Development
1. Serve files via local server (Python: `python -m http.server`)
2. Open `http://localhost:8000` in browser
3. Enable service worker and PWA features
4. Test API integrations with real accounts

### Production Deployment
1. Upload files to web server with HTTPS
2. Ensure service worker registration
3. Test PWA installation on mobile
4. Configure push notification keys
5. Set up API OAuth credentials

### Android APK Build
1. Use PWA Builder: https://www.pwabuilder.com
2. Enter your deployed app URL
3. Configure Android settings
4. Download and sign APK
5. Test on Android devices

## 🔍 Troubleshooting

### Common Issues

#### Service Worker Not Loading
- Ensure HTTPS or localhost
- Check browser console for errors
- Clear browser cache and reload
- Verify `enhanced-sw.js` is accessible

#### API Integration Failures
- Check network connectivity
- Verify OAuth credentials
- Review browser console for API errors
- Test with different accounts

#### Offline Functionality Issues
- Confirm service worker registration
- Check IndexedDB storage
- Test offline mode in DevTools
- Verify background sync queue

#### Assignment Sync Problems
- Check API connection status in settings
- Review sync queue in DevTools > Application
- Test manual sync triggers
- Verify assignment data format

### Debug Tools
- Browser DevTools > Application tab
- Service Worker status and cache
- IndexedDB data inspection
- Network tab for API calls
- Console for error messages

## 🎯 Usage Tips

### Getting Started
1. Create your first assignment using the enhanced creation page
2. Connect Canvas LMS or Google Classroom for automatic sync
3. Customize colors and themes in Settings
4. Enable notifications for deadline reminders
5. Install as PWA for native app experience

### Best Practices
- Use priority levels to organize assignments
- Set up background patterns or images for personalization
- Enable dark mode for better night usage
- Regularly sync with your learning management systems
- Export data periodically as backup

### Power User Features
- Edit assignments by long-pressing cards
- Use calendar view for deadline visualization
- Customize card colors for visual organization
- Set up push notifications for important deadlines
- Explore premium features for advanced analytics

## 📄 License

MIT License - Open source and free to use

---

**Built with modern web technologies**: Glassmorphic design, PWA standards, real-time API integration, and offline-first architecture for the ultimate homework tracking experience.
