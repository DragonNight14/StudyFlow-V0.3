// Enhanced Service Worker for StudyFlow v0.3 PWA (Signed)
const CACHE_NAME = 'studyflow-v0.3-cache';
const STATIC_CACHE = 'studyflow-static-v0.3';
const DYNAMIC_CACHE = 'studyflow-dynamic-v0.3';

// Security configuration for signed PWA
const SECURITY_CONFIG = {
    allowedOrigins: [
        self.location.origin,
        'https://studyflow.app',
        'https://*.studyflow.app'
    ],
    integrityCheck: true,
    signatureValidation: true
};

// Core app shell files - always cached
const CORE_FILES = [
    './',
    './index.html',
    './styles.css',
    './enhanced-script.js',
    './assignment-editor.js',
    './classes-manager.js',
    './background-manager.js',
    './manifest.json',
    './icon-192x192.png'
];

// Additional resources to cache dynamically
const CACHE_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
    /\.(?:css|js)$/,
    /\.(?:html)$/
];

// Android-specific optimizations
const ANDROID_OPTIMIZATIONS = {
    // Enable background sync for offline functionality
    enableBackgroundSync: true,
    // Cache strategy for better performance
    cacheStrategy: 'cache-first',
    // Enable push notifications
    enablePushNotifications: true
};

// Install event
self.addEventListener('install', event => {
    console.log('StudyFlow SW: Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('StudyFlow SW: Caching core files');
                return cache.addAll(CORE_FILES);
            })
            .catch(error => {
                console.log('StudyFlow SW: Cache installation failed:', error);
            })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Take control of all clients immediately
    self.clients.claim();
});

// Security validation function
function validateRequest(request) {
    const url = new URL(request.url);
    
    // Check if origin is allowed
    if (SECURITY_CONFIG.allowedOrigins.some(origin => 
        origin === url.origin || (origin.includes('*') && url.origin.includes(origin.replace('*', ''))))) {
        return true;
    }
    
    // Allow same-origin requests
    if (url.origin === self.location.origin) {
        return true;
    }
    
    return false;
}

// Fetch event with security validation
self.addEventListener('fetch', event => {
    // Validate request security
    if (!validateRequest(event.request)) {
        console.warn('StudyFlow SW: Blocked unauthorized request to:', event.request.url);
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                
                // Clone the request because it's a stream
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(response => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response because it's a stream
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                }).catch(() => {
                    // Return offline page for navigation requests
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});

// Push event for notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Assignment reminder!',
        icon: './icon-192x192.png',
        badge: './icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        // Android-specific notification options
        actions: [
            {
                action: 'view',
                title: 'View Assignment',
                icon: './icon-192x192.png'
            },
            {
                action: 'complete',
                title: 'Mark Complete',
                icon: './icon-192x192.png'
            }
        ],
        requireInteraction: true,
        tag: 'assignment-reminder'
    };

    event.waitUntil(
        self.registration.showNotification('Assignment Tracker', options)
    );
});

// Notification click event
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('./')
        );
    } else if (event.action === 'complete') {
        // Mark assignment as complete
        event.waitUntil(
            clients.openWindow('./?action=complete')
        );
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

// Background sync for offline data
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    } else if (event.tag === 'assignment-sync') {
        event.waitUntil(syncAssignments());
    }
});

function doBackgroundSync() {
    // Sync any pending data when connection is restored
    return Promise.resolve();
}

function syncAssignments() {
    // Sync assignments when connection is restored
    return fetch('/api/assignments/sync', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // Sync data here
        })
    }).catch(() => {
        // Handle offline case
        console.log('Background sync failed - will retry later');
    });
}
