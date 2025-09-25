// Classes Management System for StudyFlow v0.3

class ClassesManager {
    constructor(tracker) {
        this.tracker = tracker;
        this.classes = JSON.parse(localStorage.getItem('studyflow-classes')) || [];
        this.currentClassId = null;
        this.notes = JSON.parse(localStorage.getItem('studyflow-notes')) || {};
        
        this.initializeEventListeners();
        this.detectDeviceType();
        this.initializeSubscriptionBanner();
    }

    initializeEventListeners() {
        // Classes navigation
        const classesBtn = document.getElementById('classes-btn');
        if (classesBtn) {
            classesBtn.addEventListener('click', () => this.showClassesView());
        }


        // Back buttons
        const backToClasses = document.getElementById('back-to-classes');
        if (backToClasses) {
            backToClasses.addEventListener('click', () => this.showClassesView());
        }

        const backFromNotes = document.getElementById('back-from-notes');
        if (backFromNotes) {
            backFromNotes.addEventListener('click', () => this.showClassDetail(this.currentClassId));
        }

        // Save notes
        const saveNotesBtn = document.getElementById('save-notes-btn');
        if (saveNotesBtn) {
            saveNotesBtn.addEventListener('click', () => this.saveNotes());
        }

        // Notes toolbar
        this.initializeNotesToolbar();
    }

    detectDeviceType() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const userAgent = navigator.userAgent;
        
        let deviceType = 'desktop';
        if (width <= 768) {
            deviceType = 'phone';
        } else if (width <= 1024) {
            deviceType = 'tablet';
        }

        // Store device info
        this.deviceInfo = {
            type: deviceType,
            width: width,
            height: height,
            userAgent: userAgent,
            pixelRatio: window.devicePixelRatio || 1
        };

        console.log('Device detected:', this.deviceInfo);
        
        // Apply device-specific styles for dev controls
        this.applyDeviceSpecificStyles();
    }

    applyDeviceSpecificStyles() {
        const devControls = document.querySelector('.dev-controls');
        if (devControls) {
            if (this.deviceInfo.type === 'phone') {
                devControls.style.position = 'fixed';
                devControls.style.bottom = '0';
                devControls.style.left = '0';
                devControls.style.right = '0';
                devControls.style.top = 'auto';
                devControls.style.transform = 'translateY(100%)';
                devControls.style.transition = 'transform 0.3s ease';
            } else if (this.deviceInfo.type === 'tablet') {
                devControls.style.position = 'fixed';
                devControls.style.top = '1rem';
                devControls.style.right = '1rem';
                devControls.style.bottom = 'auto';
                devControls.style.left = 'auto';
            }
        }
    }

    initializeSubscriptionBanner() {
        const banner = document.getElementById('subscription-banner');
        const bannerText = document.getElementById('banner-text');
        const bannerAction = document.getElementById('banner-action');

        if (!banner || !bannerText || !bannerAction) return;

        // Check subscription status
        const subscriptionData = this.getSubscriptionStatus();
        
        if (subscriptionData.showBanner) {
            bannerText.textContent = subscriptionData.message;
            bannerAction.textContent = subscriptionData.actionText;
            banner.style.display = 'block';

            bannerAction.addEventListener('click', () => {
                this.handleSubscriptionAction(subscriptionData.type);
            });
        }
    }

    getSubscriptionStatus() {
        // Check if user has a subscription
        const subscriptionType = localStorage.getItem('subscription-type') || 'trial';
        const subscriptionStart = localStorage.getItem('subscription-start') || Date.now();
        const subscriptionEnd = localStorage.getItem('subscription-end') || (Date.now() + (7 * 24 * 60 * 60 * 1000)); // 7 days trial

        const now = Date.now();
        const timeLeft = subscriptionEnd - now;
        const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));

        if (subscriptionType === 'trial') {
            if (daysLeft > 0) {
                return {
                    showBanner: true,
                    type: 'trial',
                    message: `Free trial: ${daysLeft} day${daysLeft !== 1 ? 's' : ''} remaining`,
                    actionText: 'Upgrade'
                };
            } else {
                return {
                    showBanner: true,
                    type: 'expired',
                    message: 'Trial expired - Limited features available',
                    actionText: 'Subscribe'
                };
            }
        } else if (subscriptionType === 'paid') {
            if (daysLeft > 7) {
                return { showBanner: false };
            } else {
                return {
                    showBanner: true,
                    type: 'expiring',
                    message: `Subscription expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`,
                    actionText: 'Renew'
                };
            }
        }

        return { showBanner: false };
    }

    handleSubscriptionAction(type) {
        // Handle subscription actions
        console.log('Subscription action:', type);
        
        // For demo purposes, show a modal or redirect
        const message = type === 'trial' ? 
            'Upgrade to StudyFlow Pro for unlimited features!' :
            type === 'expired' ?
            'Subscribe to StudyFlow Pro to continue using all features!' :
            'Renew your StudyFlow Pro subscription!';
            
        alert(message + '\n\nThis would normally redirect to the payment page.');
    }

    showClassesView() {
        this.tracker.switchToView('classes-view');
        this.renderClasses();
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('classes-btn')?.classList.add('active');
    }

    renderClasses() {
        const container = document.getElementById('classes-container');
        if (!container) return;

        if (this.classes.length === 0) {
            // Auto-detect classes from assignments if none exist
            this.autoDetectClasses();
        } else {
            // Link any unlinked assignments to existing classes
            this.linkAssignmentsToClasses();
        }

        container.innerHTML = '';

        // Add class cards
        this.classes.forEach(classData => {
            const classCard = this.createClassCard(classData);
            container.appendChild(classCard);
        });

    }

    autoDetectClasses() {
        // Extract unique classes from existing assignments
        const assignments = this.tracker.assignments || [];
        const detectedClasses = new Map();

        assignments.forEach(assignment => {
            if (assignment.courseName && assignment.subject) {
                const key = `${assignment.courseName}-${assignment.subject}`;
                if (!detectedClasses.has(key)) {
                    const classId = `class_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                    detectedClasses.set(key, {
                        id: classId,
                        name: assignment.courseName,
                        subject: assignment.subject,
                        teacher: assignment.teacher || 'Not specified',
                        color: assignment.customColor || '#667eea',
                        assignments: [],
                        notes: '',
                        createdAt: Date.now()
                    });
                    
                    // Link assignment to this class
                    assignment.classId = classId;
                }
            }
        });

        // Add detected classes and update assignments with class IDs
        detectedClasses.forEach((classData, key) => {
            this.classes.push(classData);
            
            // Update all assignments that belong to this class
            assignments.forEach(assignment => {
                if (assignment.courseName === classData.name && assignment.subject === classData.subject) {
                    assignment.classId = classData.id;
                }
            });
        });

        // Save both classes and updated assignments
        this.saveClasses();
        this.tracker.saveAssignments();
        console.log('Auto-detected classes:', this.classes);
        console.log('Updated assignments with class IDs:', assignments);
    }

    createClassCard(classData) {
        const card = document.createElement('div');
        card.className = 'class-card-large glass-card animate-fade-in';
        card.style.setProperty('--accent-color', classData.color);
        
        const assignmentCount = this.getAssignmentCountForClass(classData.id);
        
        card.innerHTML = `
            <div class="class-card-content">
                <div class="class-name-section">
                    <h2 class="class-name-large">${classData.name}</h2>
                </div>
                <div class="assignment-badge">
                    <span># assignments</span>
                    <div class="assignment-count-large">${assignmentCount}</div>
                </div>
            </div>
            <div class="class-card-overlay"></div>
        `;

        card.addEventListener('click', () => this.showClassDetail(classData.id));
        
        return card;
    }

    getAssignmentCountForClass(classId) {
        // First try to find assignments by classId (preferred method)
        const assignmentsByClassId = this.tracker.assignments.filter(assignment => 
            assignment.classId === classId
        );
        
        if (assignmentsByClassId.length > 0) {
            return assignmentsByClassId.length;
        }
        
        // Fallback: find by courseName and subject (for legacy assignments)
        const classData = this.classes.find(c => c.id === classId);
        if (!classData) return 0;
        
        return this.tracker.assignments.filter(assignment => 
            assignment.courseName === classData.name && 
            assignment.subject === classData.subject
        ).length;
    }

    showClassDetail(classId) {
        const classData = this.classes.find(c => c.id === classId);
        if (!classData) return;

        this.currentClassId = classId;
        this.tracker.switchToView('class-detail-view');
        
        // Update title
        document.getElementById('class-detail-title').textContent = classData.name;
        
        // Render class details
        this.renderClassDetail(classData);
    }

    renderClassDetail(classData) {
        const container = document.getElementById('class-detail-content');
        if (!container) return;

        // Get assignments for this class using classId (preferred) or fallback to name/subject
        let assignments = this.tracker.assignments.filter(assignment => 
            assignment.classId === classData.id
        );
        
        // Fallback for legacy assignments without classId
        if (assignments.length === 0) {
            assignments = this.tracker.assignments.filter(assignment => 
                assignment.courseName === classData.name && 
                assignment.subject === classData.subject
            );
            
            // Update legacy assignments with classId
            assignments.forEach(assignment => {
                assignment.classId = classData.id;
            });
            this.tracker.saveAssignments();
        }

        container.innerHTML = `
            <div class="class-info glass-card" style="margin-bottom: 2rem;">
                <h3>📚 Class Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Subject:</strong> ${classData.subject}
                    </div>
                    <div class="info-item">
                        <strong>Teacher:</strong> ${classData.teacher}
                    </div>
                    <div class="info-item">
                        <strong>Total Assignments:</strong> ${assignments.length}
                    </div>
                    <div class="info-item">
                        <strong>Completed:</strong> ${assignments.filter(a => a.completed).length}
                    </div>
                </div>
            </div>

            <div class="class-actions" style="margin-bottom: 2rem;">
                <button class="btn btn-primary" onclick="classesManager.showNotes('${classData.id}')">
                    📝 View Notes
                </button>
                <button class="btn btn-secondary" onclick="classesManager.createAssignmentForClass('${classData.id}')">
                    ➕ Add Assignment
                </button>
            </div>

            <div class="class-assignments glass-card">
                <h3>📋 Class Assignments</h3>
                <div class="assignments-list">
                    ${assignments.length > 0 ? 
                        assignments.map(assignment => `
                            <div class="assignment-item-detailed ${assignment.completed ? 'completed' : ''}" data-id="${assignment.id}">
                                <div class="assignment-main">
                                    <div class="assignment-checkbox ${assignment.completed ? 'checked' : ''}" 
                                         onclick="classesManager.toggleAssignment('${assignment.id}')"
                                         role="checkbox"
                                         aria-checked="${assignment.completed}"
                                         title="${assignment.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                                    </div>
                                    <div class="assignment-content">
                                        <div class="assignment-title">${assignment.title}</div>
                                        ${assignment.description ? `<div class="assignment-description">${assignment.description}</div>` : ''}
                                        <div class="assignment-meta">
                                            <span class="assignment-due ${this.getPriorityClass(assignment.dueDate)}">
                                                📅 Due: ${this.formatDueDate(assignment.dueDate, assignment.dueTime)}
                                            </span>
                                            <span class="assignment-priority priority-${assignment.priority || 'medium'}">
                                                ${this.getPriorityIcon(assignment.priority)} ${(assignment.priority || 'medium').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="assignment-actions">
                                    <button class="action-btn edit-btn" 
                                            onclick="classesManager.editAssignment('${assignment.id}')"
                                            title="Edit assignment">
                                        ✏️
                                    </button>
                                    <button class="action-btn delete-btn" 
                                            onclick="classesManager.deleteAssignment('${assignment.id}')"
                                            title="Delete assignment">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        `).join('') : 
                        '<div class="empty-state">No assignments yet. Click "Add Assignment" to create one!</div>'
                    }
                </div>
            </div>
        `;
    }

    showNotes(classId) {
        this.currentClassId = classId;
        this.tracker.switchToView('notes-view');
        
        // Load existing notes
        const notes = this.notes[classId] || '';
        const editor = document.getElementById('notes-editor');
        if (editor) {
            editor.innerHTML = notes;
        }
    }

    initializeNotesToolbar() {
        const toolbar = document.querySelector('.notes-toolbar');
        if (!toolbar) return;

        toolbar.addEventListener('click', (e) => {
            if (e.target.classList.contains('notes-tool')) {
                const action = e.target.dataset.action;
                this.executeNotesCommand(action);
                
                // Toggle active state
                e.target.classList.toggle('active');
            }
        });
    }

    executeNotesCommand(command) {
        const editor = document.getElementById('notes-editor');
        if (!editor) return;

        editor.focus();

        switch (command) {
            case 'bold':
                document.execCommand('bold');
                break;
            case 'italic':
                document.execCommand('italic');
                break;
            case 'underline':
                document.execCommand('underline');
                break;
            case 'list':
                document.execCommand('insertUnorderedList');
                break;
            case 'heading':
                document.execCommand('formatBlock', false, 'h3');
                break;
        }
    }

    saveNotes() {
        if (!this.currentClassId) return;

        const editor = document.getElementById('notes-editor');
        if (!editor) return;

        this.notes[this.currentClassId] = editor.innerHTML;
        localStorage.setItem('studyflow-notes', JSON.stringify(this.notes));
        
        // Show success feedback
        const saveBtn = document.getElementById('save-notes-btn');
        if (saveBtn) {
            const originalText = saveBtn.textContent;
            saveBtn.textContent = '✅ Saved!';
            saveBtn.style.background = '#10b981';
            
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.style.background = '';
            }, 2000);
        }
    }


    createAssignmentForClass(classId) {
        const classData = this.classes.find(c => c.id === classId);
        if (!classData) return;

        // Pre-fill assignment form with class data including classId
        this.tracker.showCreateAssignmentDialog({
            classId: classData.id,
            courseName: classData.name,
            subject: classData.subject,
            customColor: classData.color,
            teacher: classData.teacher
        });
    }

    saveClasses() {
        localStorage.setItem('studyflow-classes', JSON.stringify(this.classes));
    }

    // Get class information for an assignment
    getClassForAssignment(assignment) {
        // First try to find by classId
        if (assignment.classId) {
            return this.classes.find(c => c.id === assignment.classId);
        }
        
        // Fallback: find by courseName and subject
        if (assignment.courseName && assignment.subject) {
            return this.classes.find(c => 
                c.name === assignment.courseName && 
                c.subject === assignment.subject
            );
        }
        
        return null;
    }

    // Link existing assignments to classes
    linkAssignmentsToClasses() {
        let updated = false;
        
        this.tracker.assignments.forEach(assignment => {
            if (!assignment.classId && assignment.courseName && assignment.subject) {
                const matchingClass = this.classes.find(c => 
                    c.name === assignment.courseName && 
                    c.subject === assignment.subject
                );
                
                if (matchingClass) {
                    assignment.classId = matchingClass.id;
                    updated = true;
                    console.log(`Linked assignment "${assignment.title}" to class "${matchingClass.name}"`);
                }
            }
        });
        
        if (updated) {
            this.tracker.saveAssignments();
        }
        
        return updated;
    }

    // Create a class from assignment data
    createClassFromAssignment(assignment) {
        if (!assignment.courseName || !assignment.subject) return null;
        
        const classId = `class_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newClass = {
            id: classId,
            name: assignment.courseName,
            subject: assignment.subject,
            teacher: assignment.teacher || 'Not specified',
            color: assignment.customColor || '#667eea',
            createdAt: Date.now()
        };
        
        this.classes.push(newClass);
        assignment.classId = classId;
        
        this.saveClasses();
        this.tracker.saveAssignments();
        
        console.log('Created new class from assignment:', newClass);
        return newClass;
    }

    // Helper methods for assignment display
    getPriorityClass(dueDate) {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'overdue';
        if (diffDays <= 1) return 'urgent';
        if (diffDays <= 3) return 'soon';
        return 'normal';
    }

    getPriorityIcon(priority) {
        switch (priority) {
            case 'high': return '📕';
            case 'medium': return '📙';
            case 'low': return '📗';
            default: return '📙';
        }
    }

    formatDueDate(dueDate, dueTime) {
        const date = new Date(dueDate);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        let dateStr;
        if (date.toDateString() === today.toDateString()) {
            dateStr = 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            dateStr = 'Tomorrow';
        } else {
            dateStr = date.toLocaleDateString();
        }
        
        if (dueTime && dueTime !== '23:59') {
            const time = new Date(`2000-01-01T${dueTime}`);
            dateStr += ` at ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        }
        
        return dateStr;
    }

    // Assignment action methods
    toggleAssignment(assignmentId) {
        const assignment = this.tracker.assignments.find(a => a.id == assignmentId);
        if (!assignment) return;

        assignment.completed = !assignment.completed;
        this.tracker.saveAssignments();
        
        // Update the visual state
        const checkbox = document.querySelector(`[data-id="${assignmentId}"] .assignment-checkbox`);
        const item = document.querySelector(`[data-id="${assignmentId}"]`);
        
        if (checkbox && item) {
            if (assignment.completed) {
                checkbox.classList.add('checked');
                item.classList.add('completed');
            } else {
                checkbox.classList.remove('checked');
                item.classList.remove('completed');
            }
        }

        // Show notification
        const status = assignment.completed ? 'completed' : 'marked as incomplete';
        this.tracker.showNotification(`Assignment "${assignment.title}" ${status}! ✨`, 'success');
        
        // Refresh class detail to update counts
        this.renderClassDetail(this.classes.find(c => c.id === this.currentClassId));
    }

    editAssignment(assignmentId) {
        if (window.assignmentEditor) {
            window.assignmentEditor.editAssignment(assignmentId);
        } else {
            this.tracker.showNotification('Assignment editor not available', 'error');
        }
    }

    deleteAssignment(assignmentId) {
        const assignment = this.tracker.assignments.find(a => a.id == assignmentId);
        if (!assignment) return;

        // Show custom confirmation modal
        this.showDeleteConfirmation(assignment);
    }

    showDeleteConfirmation(assignment) {
        const modal = document.createElement('div');
        modal.className = 'delete-confirmation-modal';
        modal.innerHTML = `
            <div class="delete-confirmation-content glass-card">
                <div class="delete-header">
                    <div class="delete-icon">🗑️</div>
                    <h3>Delete Assignment</h3>
                </div>
                
                <div class="delete-body">
                    <p>Are you sure you want to delete this assignment?</p>
                    <div class="assignment-preview">
                        <div class="preview-title">${assignment.title}</div>
                        <div class="preview-meta">
                            <span class="preview-course">${assignment.courseName || 'No course'}</span>
                            <span class="preview-due">Due: ${assignment.dueDate}</span>
                        </div>
                    </div>
                    <div class="warning-text">
                        ⚠️ This action cannot be undone
                    </div>
                </div>
                
                <div class="delete-actions">
                    <button class="btn btn-secondary cancel-delete" onclick="this.closest('.delete-confirmation-modal').remove()">
                        Cancel
                    </button>
                    <button class="btn btn-danger confirm-delete" data-assignment-id="${assignment.id}">
                        🗑️ Delete Assignment
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listener for confirm button
        const confirmBtn = modal.querySelector('.confirm-delete');
        confirmBtn.addEventListener('click', () => {
            this.confirmDeleteAssignment(assignment.id);
            modal.remove();
        });

        // Add escape key listener
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Add click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    confirmDeleteAssignment(assignmentId) {
        const assignment = this.tracker.assignments.find(a => a.id == assignmentId);
        if (!assignment) return;

        // Remove from assignments array
        this.tracker.assignments = this.tracker.assignments.filter(a => a.id != assignmentId);
        this.tracker.saveAssignments();
        
        // Show notification
        this.tracker.showNotification(`Assignment "${assignment.title}" deleted successfully! 🗑️`, 'success');
        
        // Refresh class detail view
        this.renderClassDetail(this.classes.find(c => c.id === this.currentClassId));
        
        // Refresh main assignments view if visible
        if (this.tracker.currentView === 'all-view' || this.tracker.currentView === 'home-view') {
            this.tracker.renderAssignments();
        }
    }

    // Enhanced visual settings application
    applyVisualSettings() {
        const performanceMode = localStorage.getItem('performance-mode') === 'true';
        const glassmorphism = localStorage.getItem('glassmorphism-enabled') !== 'false';
        const animations = localStorage.getItem('animations-enabled') !== 'false';
        
        const body = document.body;
        
        // Apply performance mode
        if (performanceMode) {
            body.classList.add('performance-mode');
        } else {
            body.classList.remove('performance-mode');
        }
        
        // Apply glassmorphism
        if (!glassmorphism) {
            body.classList.add('no-glassmorphism');
        } else {
            body.classList.remove('no-glassmorphism');
        }
        
        // Apply animations (keep unless performance mode is on)
        if (!animations || performanceMode) {
            body.classList.add('no-animations');
        } else {
            body.classList.remove('no-animations');
        }
        
        // Apply to settings page immediately
        this.applySettingsPageVisuals();
    }

    applySettingsPageVisuals() {
        const settingsView = document.getElementById('settings-view');
        if (!settingsView) return;
        
        // Force re-render of settings to apply current visual state
        if (typeof settingsManager !== 'undefined' && settingsManager.renderSettingsPage) {
            setTimeout(() => {
                settingsManager.renderSettingsPage();
            }, 100);
        }
    }

    // Video background limit increase
    increaseVideoBackgroundLimit() {
        // Update the video background size limit to 100MB
        const videoInput = document.querySelector('input[type="file"][accept*="video"]');
        if (videoInput) {
            // Remove existing size restrictions
            videoInput.removeAttribute('data-max-size');
            // Set new limit to 100MB (100 * 1024 * 1024 bytes)
            videoInput.setAttribute('data-max-size', '104857600');
        }
    }

    // Fixed background implementation
    enableFixedBackground() {
        const body = document.body;
        body.classList.add('fixed-background');
        
        // Ensure background doesn't scroll with content
        const style = document.createElement('style');
        style.textContent = `
            body.fixed-background {
                background-attachment: fixed !important;
            }
            
            @media (max-width: 768px) {
                body.fixed-background {
                    background-attachment: scroll !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof tracker !== 'undefined') {
        window.classesManager = new ClassesManager(tracker);
        
        // Add version info to console
        console.log(`%cStudyFlow v0.3%c - Classes Manager Loaded`, 
            'color: #f59e0b; font-weight: bold; font-size: 16px;',
            'color: #10b981; font-weight: normal;'
        );
        
        // Log device and screen info
        console.log('Device Info:', classesManager.deviceInfo);
        console.log('Screen Resolution:', `${window.screen.width}x${window.screen.height}`);
        console.log('Viewport:', `${window.innerWidth}x${window.innerHeight}`);
        console.log('Pixel Ratio:', window.devicePixelRatio);
    }
});
