document.addEventListener('DOMContentLoaded', () => {
    console.log('Resume Builder Loaded');

    // --- Helper Functions ---
    const updateText = (sourceId, targetId, defaultText) => {
        const source = document.getElementById(sourceId);
        const target = document.getElementById(targetId);
        if (source && target) {
            source.addEventListener('input', (e) => {
                target.textContent = e.target.value || defaultText;
            });
        }
    };

    // --- Static Fields Binding ---
    updateText('fullName', 'preview-name', 'Your Name');
    updateText('jobTitle', 'preview-title', 'Job Title');
    updateText('email', 'preview-email', 'email@example.com');
    updateText('phone', 'preview-phone', '123-456-7890');
    updateText('location', 'preview-location', 'Location');
    updateText('website', 'preview-website', 'website.com');
    updateText('summary', 'preview-summary', 'Professional summary goes here...');

    // Skills - Custom formatting for bullet points
    const skillsInput = document.getElementById('skills');
    const skillsPreview = document.getElementById('preview-skills');
    if (skillsInput && skillsPreview) {
        skillsInput.addEventListener('input', (e) => {
            const text = e.target.value;
            if (!text) {
                skillsPreview.innerHTML = '<li>List of skills...</li>';
                return;
            }
            // Split by comma, trim whitespace, filter empty
            const skills = text.split(',').map(s => s.trim()).filter(s => s);

            // Render list items
            skillsPreview.innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');
        });
    }

    // --- Dynamic Experience Section ---
    const experienceList = document.getElementById('experience-list');
    const previewExperienceList = document.getElementById('preview-experience-list');
    const addExperienceBtn = document.getElementById('add-experience');

    const addExperience = () => {
        const id = Date.now() + Math.random().toString(16).slice(2);

        // Create Form Item
        const formItem = document.createElement('div');
        formItem.className = 'experience-item';
        formItem.id = `exp-form-${id}`;
        formItem.innerHTML = `
            <button class="remove-btn" onclick="removeSection('${id}', 'exp')">Remove</button>
            <div class="form-group">
                <label>Company</label>
                <input type="text" data-type="company" placeholder="Company Name">
            </div>
            <div class="form-group">
                <label>Position</label>
                <input type="text" data-type="position" placeholder="Position">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="date" data-type="start">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="date" data-type="end">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea data-type="desc" rows="3" placeholder="Job description..."></textarea>
            </div>
        `;

        // Create Preview Item
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.id = `exp-preview-${id}`;
        previewItem.innerHTML = `
            <div class="preview-item-header">
                <span class="preview-item-title" data-preview="company">Company Name</span>
                <span class="preview-item-date">
                    <span data-preview="start">Jan 2020</span> - <span data-preview="end">Present</span>
                </span>
            </div>
            <div class="preview-item-subtitle" data-preview="position">Position</div>
            <p data-preview="desc">Job description...</p>
        `;

        // Append to DOM
        experienceList.appendChild(formItem);
        previewExperienceList.appendChild(previewItem);

        // Add Listeners
        const inputs = formItem.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const type = e.target.dataset.type;
                const previewEl = previewItem.querySelector(`[data-preview="${type}"]`);
                if (previewEl) {
                    if (input.type === 'date' && e.target.value) {
                        const date = new Date(e.target.value);
                        previewEl.textContent = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                    } else {
                        previewEl.textContent = e.target.value;
                    }
                }
            });
        });
    };

    if (addExperienceBtn) addExperienceBtn.addEventListener('click', addExperience);

    // --- Dynamic Education Section ---
    const educationList = document.getElementById('education-list');
    const previewEducationList = document.getElementById('preview-education-list');
    const addEducationBtn = document.getElementById('add-education');

    const addEducation = () => {
        const id = Date.now() + Math.random().toString(16).slice(2);

        const formItem = document.createElement('div');
        formItem.className = 'education-item';
        formItem.id = `edu-form-${id}`;
        formItem.innerHTML = `
            <button class="remove-btn" onclick="removeSection('${id}', 'edu')">Remove</button>
            <div class="form-group">
                <label>School/University</label>
                <input type="text" data-type="school" placeholder="University Name">
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" data-type="degree" placeholder="Degree">
            </div>
            <div class="form-group">
                <label>Marks / Grade</label>
                <input type="text" data-type="marks" placeholder="e.g. 8.5 CGPA / 85%">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="date" data-type="start">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="date" data-type="end">
                </div>
            </div>
        `;

        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.id = `edu-preview-${id}`;
        previewItem.innerHTML = `
            <div class="preview-item-header">
                <span class="preview-item-title" data-preview="school">University Name</span>
                <span class="preview-item-date">
                    <span data-preview="start">2020</span> - <span data-preview="end">2024</span>
                </span>
            </div>
            <div class="preview-item-subtitle" data-preview="degree">Degree</div>
            <div class="preview-item-subtitle" data-preview="marks" style="font-size: 0.9rem; margin-top: 0.25rem;"></div>
        `;

        educationList.appendChild(formItem);
        previewEducationList.appendChild(previewItem);

        const inputs = formItem.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const type = e.target.dataset.type;
                const previewEl = previewItem.querySelector(`[data-preview="${type}"]`);
                if (previewEl) {
                    if (input.type === 'date' && e.target.value) {
                        const date = new Date(e.target.value);
                        previewEl.textContent = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                    } else {
                        previewEl.textContent = e.target.value;
                    }
                }
            });
        });
    };

    if (addEducationBtn) addEducationBtn.addEventListener('click', addEducation);

    // --- Dynamic Projects Section ---
    const projectsList = document.getElementById('projects-list');
    const previewProjectsList = document.getElementById('preview-projects-list');
    const addProjectBtn = document.getElementById('add-project');
    const previewProjectsSection = document.getElementById('preview-projects-section');

    const checkProjectsVisibility = () => {
        if (previewProjectsList && previewProjectsSection) {
            previewProjectsSection.style.display = previewProjectsList.children.length > 0 ? 'block' : 'none';
        }
    };

    const addProject = () => {
        const id = Date.now() + Math.random().toString(16).slice(2);

        const formItem = document.createElement('div');
        formItem.className = 'experience-item'; // Reusing style
        formItem.id = `proj-form-${id}`;
        formItem.innerHTML = `
            <button class="remove-btn" onclick="removeSection('${id}', 'proj')">Remove</button>
            <div class="form-group">
                <label>Project Name</label>
                <input type="text" data-type="name" placeholder="Project Name">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea data-type="desc" rows="2" placeholder="Describe the project..."></textarea>
            </div>
        `;

        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.id = `proj-preview-${id}`;
        previewItem.innerHTML = `
            <div class="preview-item-header">
                <span class="preview-item-title" data-preview="name">Project Name</span>
            </div>
            <p data-preview="desc">Project description...</p>
        `;

        projectsList.appendChild(formItem);
        previewProjectsList.appendChild(previewItem);

        checkProjectsVisibility();

        const inputs = formItem.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const type = e.target.dataset.type;
                const previewEl = previewItem.querySelector(`[data-preview="${type}"]`);
                if (previewEl) previewEl.textContent = e.target.value;
            });
        });
    };

    if (addProjectBtn) addProjectBtn.addEventListener('click', addProject);

    // --- Dynamic Certifications Section ---
    const certificationsList = document.getElementById('certifications-list');
    const previewCertificationsList = document.getElementById('preview-certifications-list');
    const addCertificationBtn = document.getElementById('add-certification');
    const previewCertificationsSection = document.getElementById('preview-certifications-section');

    const checkCertificationsVisibility = () => {
        if (previewCertificationsList && previewCertificationsSection) {
            previewCertificationsSection.style.display = previewCertificationsList.children.length > 0 ? 'block' : 'none';
        }
    };

    const addCertification = () => {
        const id = Date.now() + Math.random().toString(16).slice(2);

        const formItem = document.createElement('div');
        formItem.className = 'experience-item'; // Reusing style
        formItem.id = `cert-form-${id}`;
        formItem.innerHTML = `
            <button class="remove-btn" onclick="removeSection('${id}', 'cert')">Remove</button>
            <div class="form-group">
                <label>Certificate Name</label>
                <input type="text" data-type="name" placeholder="Certificate Name">
            </div>
            <div class="form-group">
                <label>Issuer / Year</label>
                <input type="text" data-type="issuer" placeholder="e.g. Google, 2024">
            </div>
        `;

        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.id = `cert-preview-${id}`;
        previewItem.innerHTML = `
            <div class="preview-item-header">
                <span class="preview-item-title" data-preview="name">Certificate Name</span>
                <span class="preview-item-date" data-preview="issuer">Issuer, Year</span>
            </div>
        `;

        certificationsList.appendChild(formItem);
        previewCertificationsList.appendChild(previewItem);

        checkCertificationsVisibility();

        const inputs = formItem.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const type = e.target.dataset.type;
                const previewEl = previewItem.querySelector(`[data-preview="${type}"]`);
                if (previewEl) previewEl.textContent = e.target.value;
            });
        });
    };

    if (addCertificationBtn) addCertificationBtn.addEventListener('click', addCertification);

    // --- Dynamic Achievements Section ---
    const achievementsList = document.getElementById('achievements-list');
    const previewAchievementsList = document.getElementById('preview-achievements-list');
    const startAchievementsBtn = document.getElementById('add-achievement');
    const previewAchievementsSection = document.getElementById('preview-achievements-section');

    const checkAchievementsVisibility = () => {
        if (previewAchievementsList.children.length > 0) {
            previewAchievementsSection.style.display = 'block';
        } else {
            previewAchievementsSection.style.display = 'none';
        }
    };

    const addAchievement = () => {
        const id = Date.now() + Math.random().toString(16).slice(2);

        const formItem = document.createElement('div');
        formItem.className = 'experience-item';
        formItem.id = `achieve-form-${id}`;
        formItem.innerHTML = `
            <button class="remove-btn" onclick="removeSection('${id}', 'achieve')">Remove</button>
            <div class="form-group">
                <label>Achievement</label>
                <textarea data-type="text" rows="2" placeholder="Describe achievement..."></textarea>
            </div>
        `;

        const previewItem = document.createElement('li');
        previewItem.id = `achieve-preview-${id}`;
        previewItem.textContent = 'Achievement description...';

        achievementsList.appendChild(formItem);
        previewAchievementsList.appendChild(previewItem);

        checkAchievementsVisibility();

        const inputs = formItem.querySelectorAll('textarea');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                previewItem.textContent = e.target.value;
            });
        });
    };

    if (startAchievementsBtn) startAchievementsBtn.addEventListener('click', addAchievement);


    // --- Global Remove Function ---
    window.removeSection = (id, type) => {
        document.getElementById(`${type}-form-${id}`)?.remove();
        document.getElementById(`${type}-preview-${id}`)?.remove();

        if (type === 'achieve') checkAchievementsVisibility();
        if (type === 'proj') checkProjectsVisibility();
        if (type === 'cert') checkCertificationsVisibility();
    };

    // --- Print Functionality ---
    const downloadBtn = document.getElementById('download-pdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

    // --- Clear All Functionality ---
    const clearAllBtn = document.getElementById('clear-all');
    clearAllBtn.addEventListener('click', () => {
        if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) return;

        // Clear Inputs
        document.querySelectorAll('input, textarea').forEach(input => {
            input.value = '';
            input.dispatchEvent(new Event('input')); // Trigger update
        });

        // Remove Dynamic Sections (Loop backwards)
        const removeAll = (listId, btnId) => {
            const list = document.getElementById(listId);
            const btn = document.getElementById(btnId);
            while (list.firstChild) {
                // Find delete button inside item and click it to ensure proper cleanup including logic
                const removeBtn = list.firstChild.querySelector('.remove-btn');
                if (removeBtn) removeBtn.click();
                else list.removeChild(list.firstChild);
            }
        };

        removeAll('experience-list', 'add-experience');
        removeAll('education-list', 'add-education');
        removeAll('projects-list', 'add-project');
        removeAll('certifications-list', 'add-certification');
        removeAll('achievements-list', 'add-achievement');

        // Reset visibility checks implicitly handled by .click() on remove buttons

        // Reset manual fields defaults
        document.getElementById('preview-name').textContent = 'Your Name';
        document.getElementById('preview-title').textContent = 'Job Title';
        document.getElementById('preview-email').textContent = 'email@example.com';
        document.getElementById('preview-phone').textContent = '123-456-7890';
        document.getElementById('preview-location').textContent = 'Location';
        document.getElementById('preview-website').textContent = 'website.com';
        document.getElementById('preview-summary').textContent = 'Professional summary goes here...';
        document.getElementById('preview-skills').innerHTML = '<li>List of skills...</li>';
    });

    // Add default items on load (Keep one empty item or just load clean?)
    // Let's keep the defaults for the first load, but Clear All should wipe them.
    if (!localStorage.getItem('loaded')) {
        addExperience();
        addEducation();
        localStorage.setItem('loaded', 'true');
    }
});
