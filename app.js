// =============================================
// Teacher Portfolio - Main Application Logic
// =============================================

const APP = {
  state: {
    darkMode: false,
    currentPage: 'dashboard',
    currentSection: null,
    sections: [],
    activities: [],
    notifications: [],
    driveConnected: false,
    teacherData: {},
    searchQuery: '',
    signature: null,
  },

  // ===================== DATA =====================
  sectionsData: [
    {
      id: 'duties',
      title: 'أداء الواجبات الوظيفية',
      subtitle: 'الالتزام والانضباط المهني',
      icon: '📋',
      colorClass: 'c1',
      weight: 10,
      evidence: [
        'سجل الدوام الرسمي',
        'سجل المناوبة والإشراف',
        'سجل الانتظار',
        'خطة توزيع المنهج'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'professional',
      title: 'التفاعل مع المجتمع المهني',
      subtitle: 'التطوير والنمو المهني المستمر',
      icon: '🤝',
      colorClass: 'c2',
      weight: 10,
      evidence: [
        'سجل مجتمعات التعلم',
        'سجل تبادل الزيارات',
        'تقرير درس تطبيقي',
        'شهادات حضور'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'parents',
      title: 'التفاعل مع أولياء الأمور',
      subtitle: 'الشراكة المجتمعية وتواصل الأسرة',
      icon: '👨‍👩‍👧',
      colorClass: 'c3',
      weight: 10,
      evidence: [
        'صور من الجمعية العمومية',
        'تقرير اجتماع مع ولي الأمور',
        'نسخة من الخطة الأسبوعية'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'strategies',
      title: 'التنويع في استراتيجيات التدريس',
      subtitle: 'أساليب تدريس حديثة وفعّالة',
      icon: '🎯',
      colorClass: 'c4',
      weight: 10,
      evidence: [
        'تقرير عن تطبيق استراتيجية',
        'ملف إنجاز المعلم'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'results',
      title: 'تحسين نتائج المتعلمين',
      subtitle: 'قياس وتعزيز مخرجات التعلم',
      icon: '📈',
      colorClass: 'c5',
      weight: 10,
      evidence: [
        'نتائج الاختبارات القبلية',
        'نتائج الاختبارات البعدية',
        'كشف متابعة الطلاب'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'planning',
      title: 'إعداد وتنفيذ خطة التعلم',
      subtitle: 'التخطيط الدراسي وتنفيذ المنهج',
      icon: '📝',
      colorClass: 'c6',
      weight: 10,
      evidence: [
        'خطة توزيع المنهج',
        'نماذج من إعداد الدروس',
        'نماذج من الواجبات',
        'نماذج من الاختبارات'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'technology',
      title: 'توظيف التقنيات ووسائل التعليم',
      subtitle: 'تقنيات حديثة لتحسين التعلم',
      icon: '💻',
      colorClass: 'c7',
      weight: 10,
      evidence: [
        'صور من الوسائل التعليمية',
        'تقرير عن برنامج تقني'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'environment',
      title: 'تهيئة بيئة تعليمية',
      subtitle: 'بيئة محفزة وداعمة للتعلم',
      icon: '🏫',
      colorClass: 'c8',
      weight: 5,
      evidence: [
        'تقرير تصنيف الطلاب حسب أنماط التعلم',
        'نماذج من التحفيز المادي والمعنوي'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'classroom',
      title: 'الإدارة الصفية',
      subtitle: 'إدارة بيئة الفصل وضبط السلوك',
      icon: '🎒',
      colorClass: 'c9',
      weight: 5,
      evidence: [
        'كشف المتابعة',
        'تطبيق إدارة الفصل'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'analysis',
      title: 'تحليل نتائج المتعلمين وتشخيص مستوياتهم',
      subtitle: 'تشخيص الفاقد التعليمي ومعالجته',
      icon: '🔬',
      colorClass: 'c10',
      weight: 10,
      evidence: [
        'تحليل نتائج الطلاب',
        'معالجة الفاقد التعليمي'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    },
    {
      id: 'evaluation',
      title: 'تنوع أساليب التقويم',
      subtitle: 'تقييم شامل ومتنوع للمتعلمين',
      icon: '🏆',
      colorClass: 'c11',
      weight: 10,
      evidence: [
        'نماذج من الاختبارات',
        'ملفات إنجاز الطلاب',
        'نماذج من المهام الأدائية',
        'نماذج من المشاريع'
      ],
      files: [],
      notes: '',
      driveFolder: null,
      status: 'pending',
    }
  ],

  // ===================== INIT =====================
  init() {
    this.loadData();
    this.renderAll();
    this.setupEvents();
    this.startAnimations();
    this.checkNotifications();
    this.showWelcomeToast();
  },

  loadData() {
    const saved = localStorage.getItem('teacherPortfolio');
    if (saved) {
      const data = JSON.parse(saved);
      this.state.darkMode = data.darkMode || false;
      this.state.teacherData = data.teacherData || {};
      if (data.sections) {
        data.sections.forEach((saved, i) => {
          if (this.sectionsData[i]) {
            this.sectionsData[i].files = saved.files || [];
            this.sectionsData[i].notes = saved.notes || '';
            this.sectionsData[i].status = saved.status || 'pending';
            this.sectionsData[i].driveFolder = saved.driveFolder || null;
          }
        });
      }
      this.state.activities = data.activities || this.getDefaultActivities();
    } else {
      this.state.activities = this.getDefaultActivities();
      this.state.teacherData = {
        name: 'المعلمة',
        school: 'مدرسة التميز',
        subject: 'الرياضيات',
        grade: 'الصف الثالث',
        year: '1446 - 1447',
        id: '1234567890',
        phone: '0501234567',
        email: 'teacher@school.edu.sa',
        qualification: 'بكالوريوس تربية',
        license: 'RL-2024-001234'
      };
    }

    if (this.state.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  },

  saveData() {
    const data = {
      darkMode: this.state.darkMode,
      teacherData: this.state.teacherData,
      sections: this.sectionsData.map(s => ({
        id: s.id,
        files: s.files,
        notes: s.notes,
        status: s.status,
        driveFolder: s.driveFolder
      })),
      activities: this.state.activities.slice(0, 20)
    };
    localStorage.setItem('teacherPortfolio', JSON.stringify(data));
  },

  getDefaultActivities() {
    return [
      { type: 'new', icon: 'fa-star', text: 'تم إنشاء سجل التوثيق', time: 'منذ لحظات', color: 'new' },
      { type: 'info', icon: 'fa-info-circle', text: 'مرحباً بك في نظام توثيق الأداء الوظيفي', time: 'الآن', color: 'warning' }
    ];
  },

  // ===================== CALCULATIONS =====================
  getOverallProgress() {
    const totalWeight = this.sectionsData.reduce((acc, s) => acc + s.weight, 0);
    let completed = 0;
    this.sectionsData.forEach(s => {
      const sectionProgress = this.getSectionProgress(s);
      completed += (sectionProgress / 100) * s.weight;
    });
    return Math.round((completed / totalWeight) * 100);
  },

  getSectionProgress(section) {
    if (!section.evidence || section.evidence.length === 0) return 0;
    const uploaded = Math.min(section.files.length, section.evidence.length);
    return Math.round((uploaded / section.evidence.length) * 100);
  },

  getCompletedSections() {
    return this.sectionsData.filter(s => this.getSectionProgress(s) === 100).length;
  },

  getInProgressSections() {
    return this.sectionsData.filter(s => {
      const p = this.getSectionProgress(s);
      return p > 0 && p < 100;
    }).length;
  },

  getTotalFiles() {
    return this.sectionsData.reduce((acc, s) => acc + s.files.length, 0);
  },

  updateSectionStatus(section) {
    const p = this.getSectionProgress(section);
    if (p === 100) section.status = 'complete';
    else if (p > 0) section.status = 'in-progress';
    else section.status = 'pending';
  },

  // ===================== RENDER =====================
  renderAll() {
    this.renderDashboard();
    this.renderSections();
    this.renderProfile();
    this.updateStats();
  },

  renderDashboard() {
    const progress = this.getOverallProgress();

    // Circular progress
    const circle = document.querySelector('.progress-bar');
    if (circle) {
      const circumference = 339.3;
      const offset = circumference - (progress / 100) * circumference;
      setTimeout(() => { circle.style.strokeDashoffset = offset; }, 300);
    }

    const pctEl = document.querySelector('.progress-percent');
    if (pctEl) {
      this.animateCounter(pctEl, 0, progress, 1500, '%');
    }

    // Update progress bars in overview
    this.updateOverviewBars();

    // Smart alert
    const remaining = this.sectionsData.length - this.getCompletedSections();
    const alertEl = document.getElementById('smartAlert');
    if (alertEl) {
      if (remaining > 0) {
        alertEl.querySelector('.smart-alert-title').textContent = `تنبيه ذكي: باقي ${remaining} قسم للإكمال`;
        alertEl.querySelector('.smart-alert-desc').textContent = `أكمل التوثيق لرفع نسبة الإنجاز إلى 100%`;
      } else {
        alertEl.style.display = 'none';
      }
    }
  },

  updateOverviewBars() {
    const categories = [
      { label: 'مكتمل', count: this.getCompletedSections(), total: this.sectionsData.length, color: 'green' },
      { label: 'جاري', count: this.getInProgressSections(), total: this.sectionsData.length, color: 'blue' },
      { label: 'لم يبدأ', count: this.sectionsData.filter(s => s.files.length === 0).length, total: this.sectionsData.length, color: 'orange' }
    ];

    categories.forEach((cat, i) => {
      const bar = document.getElementById(`overviewBar${i}`);
      const pct = document.getElementById(`overviewPct${i}`);
      if (bar && pct) {
        const percentage = Math.round((cat.count / cat.total) * 100);
        setTimeout(() => { bar.style.width = percentage + '%'; }, 500 + i * 100);
        pct.textContent = cat.count + '/' + cat.total;
      }
    });
  },

  updateStats() {
    const stats = {
      progress: this.getOverallProgress(),
      completed: this.getCompletedSections(),
      inProgress: this.getInProgressSections(),
      totalFiles: this.getTotalFiles()
    };

    const els = {
      statProgress: stats.progress + '%',
      statCompleted: stats.completed,
      statInProgress: stats.inProgress,
      statFiles: stats.totalFiles
    };

    Object.entries(els).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  },

  renderSections() {
    const grid = document.getElementById('sectionsGrid');
    if (!grid) return;

    const query = this.state.searchQuery.toLowerCase();
    const filtered = this.sectionsData.filter(s =>
      s.title.toLowerCase().includes(query) ||
      s.subtitle.toLowerCase().includes(query) ||
      s.evidence.some(e => e.toLowerCase().includes(query))
    );

    grid.innerHTML = '';
    filtered.forEach((section, i) => {
      const progress = this.getSectionProgress(section);
      this.updateSectionStatus(section);

      const card = document.createElement('div');
      card.className = 'section-card';
      card.style.animationDelay = `${i * 0.06}s`;
      card.innerHTML = `
        <div class="section-card-header">
          <div class="section-icon ${section.colorClass}">${section.icon}</div>
          <div class="section-meta">
            <div class="section-title">${section.title}</div>
            <div class="section-subtitle">${section.subtitle}</div>
          </div>
          <div class="section-weight">${section.weight}%</div>
        </div>
        <div class="section-progress-wrap">
          <div class="section-progress-info">
            <span class="section-progress-label">التوثيق (${section.files.length}/${section.evidence.length} شاهد)</span>
            <span class="section-progress-pct">${progress}%</span>
          </div>
          <div class="section-bar">
            <div class="section-bar-fill ${section.colorClass}" style="width:0" data-target="${progress}"></div>
          </div>
        </div>
        <div class="section-footer">
          <div class="file-count">
            <i class="fas fa-file"></i>
            <span>${section.files.length} ملف</span>
          </div>
          <div class="section-status ${this.getStatusClass(section.status)}">
            <span class="status-dot"></span>
            ${this.getStatusLabel(section.status)}
          </div>
        </div>
        <div class="section-actions">
          <button class="btn btn-primary btn-sm" onclick="APP.openAddEvidence('${section.id}')">
            <i class="fas fa-plus"></i> إضافة شاهد
          </button>
          <button class="btn btn-outline btn-sm" onclick="APP.openSectionDetail('${section.id}')">
            <i class="fas fa-eye"></i> عرض
          </button>
          <button class="btn btn-ghost btn-sm btn-icon" onclick="APP.showQRCode('${section.id}')" title="رمز QR">
            <i class="fas fa-qrcode"></i>
          </button>
          <button class="btn btn-ghost btn-sm btn-icon" onclick="APP.openNotes('${section.id}')" title="ملاحظات">
            <i class="fas fa-sticky-note"></i>
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    // Animate progress bars
    setTimeout(() => {
      document.querySelectorAll('.section-bar-fill[data-target]').forEach(bar => {
        bar.style.width = bar.dataset.target + '%';
      });
    }, 200);
  },

  renderProfile() {
    const td = this.state.teacherData;
    const fields = ['name', 'school', 'subject', 'grade', 'year', 'id', 'phone', 'email', 'qualification', 'license'];
    fields.forEach(f => {
      const el = document.getElementById(`profile_${f}`);
      if (el) el.textContent = td[f] || '—';
    });
    const nameEl = document.getElementById('profileHeaderName');
    if (nameEl) nameEl.textContent = td.name || 'المعلمة';
    const schoolEl = document.getElementById('profileHeaderSchool');
    if (schoolEl) schoolEl.textContent = td.school || '';
  },

  // ===================== STATUS HELPERS =====================
  getStatusClass(status) {
    const map = { complete: 'status-complete', 'in-progress': 'status-in-progress', pending: 'status-pending' };
    return map[status] || 'status-pending';
  },

  getStatusLabel(status) {
    const map = { complete: 'مكتمل', 'in-progress': 'جارٍ', pending: 'لم يبدأ' };
    return map[status] || 'لم يبدأ';
  },

  // ===================== MODALS =====================
  openModal(id) {
    document.getElementById(id)?.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeModal(id) {
    document.getElementById(id)?.classList.remove('open');
    document.body.style.overflow = '';
  },

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  },

  // ===================== ADD EVIDENCE =====================
  openAddEvidence(sectionId) {
    this.state.currentSection = this.sectionsData.find(s => s.id === sectionId);
    const section = this.state.currentSection;
    if (!section) return;

    document.getElementById('evidenceModalTitle').textContent = `إضافة شاهد - ${section.title}`;

    // Populate evidence checklist
    const list = document.getElementById('evidenceChecklist');
    list.innerHTML = section.evidence.map((e, i) => `
      <label class="evidence-check-item" style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;border:1px solid var(--border);margin-bottom:8px;cursor:pointer;transition:var(--transition)">
        <input type="checkbox" value="${i}" style="width:16px;height:16px;accent-color:var(--primary)" ${section.files.some(f => f.evidenceIndex === i) ? 'checked' : ''}>
        <span style="font-size:13px;color:var(--text-primary)">${e}</span>
        ${section.files.some(f => f.evidenceIndex === i) ? '<span class="badge badge-success" style="margin-right:auto">✓ موثق</span>' : ''}
      </label>
    `).join('');

    this.openModal('evidenceModal');
  },

  // ===================== FILE HANDLING =====================
  handleFileUpload(files, sectionId) {
    const section = this.sectionsData.find(s => s.id === sectionId) || this.state.currentSection;
    if (!section) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    Array.from(files).forEach(file => {
      const icon = this.getFileIcon(file.type);
      const fileObj = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: this.formatSize(file.size),
        type: file.type,
        icon: icon,
        date: new Date().toLocaleDateString('ar-SA'),
        evidenceIndex: section.files.length
      };
      section.files.push(fileObj);

      this.addActivity('upload', 'fa-upload', `تم رفع "${file.name}"`, `في قسم: ${section.title}`);
    });

    this.updateSectionStatus(section);
    this.renderSections();
    this.renderDashboard();
    this.updateStats();
    this.saveData();
    this.showToast('success', 'تم الرفع بنجاح', `تم رفع ${files.length} ملف`);
  },

  getFileIcon(type) {
    if (type.includes('pdf')) return 'fa-file-pdf';
    if (type.includes('image')) return 'fa-file-image';
    if (type.includes('word') || type.includes('document')) return 'fa-file-word';
    if (type.includes('excel') || type.includes('sheet')) return 'fa-file-excel';
    if (type.includes('video')) return 'fa-file-video';
    return 'fa-file';
  },

  getFileClass(type) {
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('image')) return 'img';
    if (type.includes('word') || type.includes('document')) return 'doc';
    return 'other';
  },

  formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  },

  deleteFile(sectionId, fileId) {
    const section = this.sectionsData.find(s => s.id === sectionId);
    if (!section) return;
    section.files = section.files.filter(f => f.id !== fileId);
    this.updateSectionStatus(section);
    this.renderSections();
    this.updateStats();
    this.saveData();
    if (this.state.currentSection?.id === sectionId) {
      this.renderSectionDetail(sectionId);
    }
    this.showToast('info', 'تم الحذف', 'تم حذف الملف بنجاح');
  },

  // ===================== SECTION DETAIL =====================
  openSectionDetail(sectionId) {
    this.state.currentSection = this.sectionsData.find(s => s.id === sectionId);
    this.renderSectionDetail(sectionId);
    this.openModal('sectionDetailModal');
  },

  renderSectionDetail(sectionId) {
    const section = this.sectionsData.find(s => s.id === sectionId);
    if (!section) return;

    const progress = this.getSectionProgress(section);

    const header = document.getElementById('detailHeader');
    header.innerHTML = `
      <div class="section-detail-header">
        <div class="section-detail-icon">${section.icon}</div>
        <div class="section-detail-title">
          <h2>${section.title}</h2>
          <p>${section.subtitle}</p>
        </div>
        <div class="section-detail-weight">${section.weight}%</div>
      </div>
    `;

    // Files list
    const filesList = document.getElementById('detailFilesList');
    filesList.innerHTML = section.files.length === 0
      ? `<div style="text-align:center;padding:30px;color:var(--text-secondary)"><i class="fas fa-inbox" style="font-size:36px;margin-bottom:12px;opacity:0.4;display:block"></i><p>لا توجد ملفات مرفوعة بعد</p></div>`
      : section.files.map(f => `
        <div class="file-item">
          <div class="file-type-icon ${this.getFileClass(f.type)}"><i class="fas ${f.icon}"></i></div>
          <div class="file-info">
            <div class="file-name">${f.name}</div>
            <div class="file-size">${f.size} • ${f.date}</div>
          </div>
          <div class="file-actions">
            <button class="file-action-btn view" title="عرض"><i class="fas fa-eye"></i></button>
            <button class="file-action-btn" onclick="APP.deleteFile('${section.id}', ${f.id})" title="حذف"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `).join('');

    // Evidence list
    const evidenceList = document.getElementById('detailEvidenceList');
    evidenceList.innerHTML = section.evidence.map((e, i) => {
      const uploaded = section.files.some(f => f.evidenceIndex === i);
      return `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:var(--bg-primary);margin-bottom:8px;border:1px solid var(--border)">
          <div style="width:28px;height:28px;border-radius:50%;background:${uploaded ? 'rgba(16,185,129,0.15)' : 'rgba(148,163,184,0.1)'};color:${uploaded ? 'var(--success)' : 'var(--text-light)'};display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">
            <i class="fas ${uploaded ? 'fa-check' : 'fa-clock'}"></i>
          </div>
          <span style="font-size:13px;color:var(--text-primary);flex:1">${e}</span>
          ${uploaded ? '<span class="badge badge-success">موثق</span>' : '<span class="badge" style="background:rgba(148,163,184,0.1);color:var(--text-secondary)">لم يرفع</span>'}
        </div>
      `;
    }).join('');

    // Notes
    const notesArea = document.getElementById('detailNotes');
    if (notesArea) notesArea.value = section.notes || '';

    // Progress
    const progressEl = document.getElementById('detailProgress');
    if (progressEl) {
      progressEl.textContent = progress + '%';
      const bar = document.getElementById('detailProgressBar');
      if (bar) setTimeout(() => { bar.style.width = progress + '%'; }, 100);
    }
  },

  saveNotes(sectionId) {
    const section = this.sectionsData.find(s => s.id === sectionId);
    if (!section) return;
    const notesArea = document.getElementById('detailNotes');
    if (notesArea) section.notes = notesArea.value;
    this.saveData();
    this.showToast('success', 'تم الحفظ', 'تم حفظ الملاحظات بنجاح');
  },

  // ===================== NOTES MODAL =====================
  openNotes(sectionId) {
    const section = this.sectionsData.find(s => s.id === sectionId);
    if (!section) return;
    this.state.currentSection = section;
    document.getElementById('notesModalTitle').textContent = `ملاحظات - ${section.title}`;
    document.getElementById('notesTextarea').value = section.notes || '';
    this.openModal('notesModal');
  },

  saveNotesModal() {
    const section = this.state.currentSection;
    if (!section) return;
    section.notes = document.getElementById('notesTextarea').value;
    this.saveData();
    this.closeModal('notesModal');
    this.showToast('success', 'تم الحفظ', 'تم حفظ الملاحظات');
  },

  // ===================== QR CODE =====================
  showQRCode(sectionId) {
    const section = this.sectionsData.find(s => s.id === sectionId);
    if (!section) return;
    this.state.currentSection = section;

    document.getElementById('qrModalTitle').textContent = `رمز QR - ${section.title}`;

    const url = section.driveFolder
      ? section.driveFolder
      : `https://drive.google.com/section/${section.id}`;

    document.getElementById('qrLinkText').textContent = url;

    // Generate QR Code
    const canvas = document.getElementById('qrCanvas');
    if (canvas) {
      try {
        QRCode.toCanvas(canvas, url, {
          width: 180,
          margin: 2,
          color: { dark: '#1e40af', light: '#ffffff' },
          errorCorrectionLevel: 'H'
        });
      } catch (e) {
        // Fallback: simple placeholder
        const ctx = canvas.getContext('2d');
        canvas.width = 180;
        canvas.height = 180;
        ctx.fillStyle = '#1e40af';
        ctx.fillRect(0, 0, 180, 180);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Cairo';
        ctx.textAlign = 'center';
        ctx.fillText('QR Code', 90, 90);
        ctx.font = '11px Cairo';
        ctx.fillText(section.title, 90, 115);
      }
    }

    this.openModal('qrModal');
  },

  downloadQR() {
    const canvas = document.getElementById('qrCanvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `qr-${this.state.currentSection?.id || 'section'}.png`;
    link.href = canvas.toDataURL();
    link.click();
    this.showToast('success', 'تم التحميل', 'تم تحميل رمز QR');
  },

  // ===================== GOOGLE DRIVE =====================
  connectDrive() {
    this.showLoading('جاري الاتصال بـ Google Drive...');
    setTimeout(() => {
      this.hideLoading();
      this.state.driveConnected = true;
      this.showToast('success', 'تم الاتصال', 'تم الاتصال بـ Google Drive بنجاح');
      this.updateDriveStatus();
    }, 2000);
  },

  createDriveFolders() {
    if (!this.state.driveConnected) {
      this.showToast('warning', 'غير متصل', 'يرجى الاتصال بـ Google Drive أولاً');
      this.openDriveModal();
      return;
    }

    this.showLoading('جاري إنشاء مجلدات Google Drive...');

    setTimeout(() => {
      const teacherName = this.state.teacherData.name || 'المعلمة';
      const mainFolderUrl = `https://drive.google.com/drive/folders/main_${Date.now()}`;

      this.sectionsData.forEach(section => {
        section.driveFolder = `https://drive.google.com/drive/folders/${section.id}_${Date.now()}`;
      });

      this.saveData();
      this.hideLoading();

      this.showToast('success', 'تم إنشاء المجلدات', `تم إنشاء ${this.sectionsData.length + 1} مجلد في Google Drive`);
      this.addActivity('complete', 'fa-folder', 'تم إنشاء مجلدات Google Drive', `${this.sectionsData.length} قسم`);
      this.renderSections();
    }, 3000);
  },

  updateDriveStatus() {
    const statusEl = document.getElementById('driveStatus');
    if (statusEl) {
      if (this.state.driveConnected) {
        statusEl.className = 'drive-status';
        statusEl.innerHTML = `
          <i class="fas fa-check-circle" style="color:var(--success)"></i>
          <div class="drive-status-info">
            <h5>متصل بـ Google Drive</h5>
            <p>يمكنك الآن إنشاء المجلدات ورفع الملفات</p>
          </div>
        `;
      }
    }
  },

  openDriveModal() {
    this.updateDriveStatus();
    this.renderDriveFolders();
    this.openModal('driveModal');
  },

  renderDriveFolders() {
    const grid = document.getElementById('driveFoldersGrid');
    if (!grid) return;

    grid.innerHTML = this.sectionsData.map(s => `
      <div class="drive-folder" onclick="APP.openDriveFolder('${s.id}')">
        <div class="drive-folder-icon">${s.icon}</div>
        <div class="drive-folder-name">${s.title}</div>
        <div class="drive-folder-count">${s.files.length} ملف</div>
        ${s.driveFolder ? '<div style="font-size:10px;color:var(--success);margin-top:4px">✓ متصل</div>' : '<div style="font-size:10px;color:var(--text-light);margin-top:4px">غير متصل</div>'}
      </div>
    `).join('');
  },

  openDriveFolder(sectionId) {
    const section = this.sectionsData.find(s => s.id === sectionId);
    if (section?.driveFolder) {
      window.open(section.driveFolder, '_blank');
    } else {
      this.showToast('info', 'لا يوجد مجلد', 'يرجى إنشاء المجلدات أولاً');
    }
  },

  // ===================== PDF EXPORT =====================
  exportPDF() {
    this.showLoading('جاري إنشاء ملف PDF...');
    setTimeout(() => {
      try {
        PDFExporter.generate(this.sectionsData, this.state.teacherData, this.getOverallProgress());
        this.hideLoading();
        this.showToast('success', 'تم إنشاء PDF', 'جاري تحميل الملف...');
        this.addActivity('complete', 'fa-file-pdf', 'تم تصدير ملف PDF', 'سجل التوثيق');
        this.saveData();
      } catch (e) {
        this.hideLoading();
        this.showToast('error', 'خطأ', 'حدث خطأ أثناء إنشاء PDF');
        console.error(e);
      }
    }, 500);
  },

  // ===================== SHARE =====================
  openShare() {
    const shareLink = `${window.location.origin}${window.location.pathname}?teacher=${encodeURIComponent(this.state.teacherData.name || 'teacher')}`;
    document.getElementById('shareLink').value = shareLink;
    this.openModal('shareModal');
  },

  copyShareLink() {
    const input = document.getElementById('shareLink');
    input.select();
    document.execCommand('copy');
    this.showToast('success', 'تم النسخ', 'تم نسخ الرابط إلى الحافظة');
  },

  shareWhatsApp() {
    const link = document.getElementById('shareLink').value;
    window.open(`https://wa.me/?text=${encodeURIComponent('سجل توثيق الأداء الوظيفي: ' + link)}`, '_blank');
  },

  shareEmail() {
    const link = document.getElementById('shareLink').value;
    window.location.href = `mailto:?subject=سجل توثيق الأداء الوظيفي&body=${encodeURIComponent('رابط السجل: ' + link)}`;
  },

  // ===================== DARK MODE =====================
  toggleDarkMode() {
    this.state.darkMode = !this.state.darkMode;
    document.documentElement.setAttribute('data-theme', this.state.darkMode ? 'dark' : '');
    const btn = document.getElementById('darkModeBtn');
    if (btn) btn.innerHTML = `<i class="fas ${this.state.darkMode ? 'fa-sun' : 'fa-moon'}"></i>`;
    this.saveData();
    this.showToast('info', this.state.darkMode ? 'الوضع الليلي' : 'الوضع النهاري', 'تم تغيير المظهر');
  },

  // ===================== NAVIGATION =====================
  navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.add('active');

    const navEl = document.querySelector(`[data-page="${page}"]`);
    if (navEl) navEl.classList.add('active');

    this.state.currentPage = page;

    // Close sidebar on mobile
    if (window.innerWidth < 900) {
      document.querySelector('.sidebar')?.classList.remove('open');
      document.querySelector('.sidebar-overlay')?.classList.remove('visible');
    }

    // Update breadcrumb
    const pageNames = {
      dashboard: 'لوحة التحكم',
      sections: 'الأقسام والشواهد',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      activities: 'سجل الأنشطة'
    };

    const breadEl = document.getElementById('currentPage');
    if (breadEl) breadEl.textContent = pageNames[page] || page;

    if (page === 'sections') this.renderSections();
    if (page === 'activities') this.renderActivities();
    if (page === 'profile') this.renderProfile();
  },

  // ===================== ACTIVITIES =====================
  addActivity(type, icon, text, detail) {
    const activity = {
      type, icon, text, detail,
      time: 'الآن',
      color: type === 'upload' ? 'upload' : type === 'complete' ? 'complete' : type === 'new' ? 'new' : 'warning'
    };
    this.state.activities.unshift(activity);
    if (this.state.activities.length > 50) this.state.activities.pop();
    this.renderActivitiesPreview();
  },

  renderActivitiesPreview() {
    const list = document.getElementById('activityList');
    if (!list) return;
    list.innerHTML = this.state.activities.slice(0, 5).map(a => `
      <li class="activity-item">
        <div class="activity-dot ${a.color}"><i class="fas ${a.icon}"></i></div>
        <div class="activity-info">
          <h5>${a.text}</h5>
          <p>${a.detail || ''}</p>
        </div>
        <span class="activity-time">${a.time}</span>
      </li>
    `).join('');
  },

  renderActivities() {
    const list = document.getElementById('fullActivityList');
    if (!list) return;
    list.innerHTML = this.state.activities.map(a => `
      <li class="activity-item">
        <div class="activity-dot ${a.color}"><i class="fas ${a.icon}"></i></div>
        <div class="activity-info">
          <h5>${a.text}</h5>
          <p>${a.detail || ''}</p>
        </div>
        <span class="activity-time">${a.time}</span>
      </li>
    `).join('');
  },

  // ===================== NOTIFICATIONS =====================
  checkNotifications() {
    const notifs = [];
    const pending = this.sectionsData.filter(s => s.files.length === 0).length;
    if (pending > 0) notifs.push({ icon: 'fa-exclamation-triangle', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', title: 'أقسام بحاجة للتوثيق', text: `${pending} قسم لم يبدأ بعد`, unread: true });

    const progress = this.getOverallProgress();
    if (progress < 50) notifs.push({ icon: 'fa-chart-line', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', title: 'نسبة الإنجاز', text: `نسبة إنجازك الحالية ${progress}%`, unread: true });

    notifs.push({ icon: 'fa-check-circle', color: '#10b981', bg: 'rgba(16,185,129,0.1)', title: 'النظام جاهز', text: 'سجل التوثيق جاهز للاستخدام', unread: false });

    this.state.notifications = notifs;
    this.renderNotifications();
    this.updateNotifBadge();
  },

  renderNotifications() {
    const list = document.getElementById('notifList');
    if (!list) return;
    list.innerHTML = this.state.notifications.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}">
        <div class="notif-item-icon" style="background:${n.bg};color:${n.color}"><i class="fas ${n.icon}"></i></div>
        <div class="notif-item-content">
          <h5>${n.title}</h5>
          <p>${n.text}</p>
          <div class="notif-item-time">منذ لحظات</div>
        </div>
      </div>
    `).join('');
  },

  updateNotifBadge() {
    const unread = this.state.notifications.filter(n => n.unread).length;
    const dot = document.querySelector('.notif-dot');
    if (dot) dot.style.display = unread > 0 ? 'block' : 'none';
  },

  toggleNotifPanel() {
    document.getElementById('notifPanel')?.classList.toggle('open');
  },

  // ===================== EVENTS =====================
  setupEvents() {
    // Click outside modals
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeAllModals();
      });
    });

    // Search
    const searchInput = document.getElementById('mainSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value;
        if (this.state.currentPage === 'sections') this.renderSections();
      });
    }

    // Upload zones
    this.setupUploadZone('mainUploadZone', null);

    // Signature
    this.setupSignaturePad();

    // Mobile sidebar
    const hamburger = document.getElementById('hamburger');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        document.querySelector('.sidebar')?.classList.toggle('open');
        sidebarOverlay?.classList.toggle('visible');
      });
    }

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', () => {
        document.querySelector('.sidebar')?.classList.remove('open');
        sidebarOverlay.classList.remove('visible');
      });
    }

    // Theme toggle in settings
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.checked = this.state.darkMode;
      themeToggle.addEventListener('change', () => this.toggleDarkMode());
    }
  },

  setupUploadZone(zoneId, sectionId) {
    const zone = document.getElementById(zoneId);
    if (!zone) return;

    zone.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx';
      input.onchange = (e) => {
        const sid = sectionId || this.state.currentSection?.id;
        if (sid && e.target.files.length > 0) {
          this.handleFileUpload(e.target.files, sid);
          this.closeAllModals();
        }
      };
      input.click();
    });

    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      const sid = sectionId || this.state.currentSection?.id;
      if (sid && e.dataTransfer.files.length > 0) {
        this.handleFileUpload(e.dataTransfer.files, sid);
        this.closeAllModals();
      }
    });
  },

  setupSignaturePad() {
    const canvas = document.getElementById('signatureCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let drawing = false;
    let lastX = 0, lastY = 0;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    canvas.addEventListener('mousedown', (e) => {
      drawing = true;
      const pos = getPos(e);
      lastX = pos.x; lastY = pos.y;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!drawing) return;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      lastX = pos.x; lastY = pos.y;
    });

    canvas.addEventListener('mouseup', () => {
      drawing = false;
      this.state.signature = canvas.toDataURL();
    });

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      drawing = true;
      const pos = getPos(e);
      lastX = pos.x; lastY = pos.y;
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!drawing) return;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      lastX = pos.x; lastY = pos.y;
    }, { passive: false });

    canvas.addEventListener('touchend', () => {
      drawing = false;
      this.state.signature = canvas.toDataURL();
    });
  },

  clearSignature() {
    const canvas = document.getElementById('signatureCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.state.signature = null;
  },

  saveSignature() {
    if (!this.state.signature) {
      this.showToast('warning', 'لا يوجد توقيع', 'يرجى التوقيع أولاً');
      return;
    }
    this.showToast('success', 'تم حفظ التوقيع', 'تم حفظ توقيعك الإلكتروني');
    this.closeModal('signatureModal');
  },

  // ===================== ANIMATIONS =====================
  startAnimations() {
    this.renderActivitiesPreview();
    this.renderNotifications();

    // Animate counter
    setTimeout(() => {
      const progress = this.getOverallProgress();
      const circle = document.querySelector('.progress-bar');
      if (circle) {
        const circumference = 339.3;
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
      }
    }, 500);
  },

  animateCounter(el, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },

  // ===================== TOAST =====================
  showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fas ${icons[type] || icons.info} toast-icon ${type}"></i>
      <div class="toast-content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  },

  // ===================== LOADING =====================
  showLoading(text = 'جاري المعالجة...', sub = '') {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.querySelector('.loading-text').textContent = text;
      overlay.querySelector('.loading-subtext').textContent = sub;
      overlay.style.display = 'flex';
    }
  },

  hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
  },

  // ===================== WELCOME =====================
  showWelcomeToast() {
    setTimeout(() => {
      this.showToast('success', 'مرحباً بك!', 'نظام توثيق الأداء الوظيفي للمعلمة');
    }, 800);
  },

  // ===================== CREATE RECORD =====================
  createRecord() {
    this.showLoading('جاري إنشاء السجل...', 'يرجى الانتظار');
    setTimeout(() => {
      this.hideLoading();
      this.addActivity('new', 'fa-star', 'تم إنشاء سجل جديد', 'سجل التوثيق الوظيفي');
      this.saveData();

      if (this.state.driveConnected) {
        this.createDriveFolders();
      } else {
        this.showToast('success', 'تم إنشاء السجل', 'يمكنك الآن البدء في توثيق الشواهد');
      }
    }, 1500);
  },

  // ===================== PROFILE EDIT =====================
  openEditProfile() {
    const td = this.state.teacherData;
    const fields = ['name', 'school', 'subject', 'grade', 'year', 'id', 'phone', 'email', 'qualification', 'license'];
    fields.forEach(f => {
      const el = document.getElementById(`edit_${f}`);
      if (el) el.value = td[f] || '';
    });
    this.openModal('editProfileModal');
  },

  saveProfile() {
    const fields = ['name', 'school', 'subject', 'grade', 'year', 'id', 'phone', 'email', 'qualification', 'license'];
    fields.forEach(f => {
      const el = document.getElementById(`edit_${f}`);
      if (el) this.state.teacherData[f] = el.value;
    });
    this.saveData();
    this.renderProfile();
    this.closeModal('editProfileModal');
    this.showToast('success', 'تم الحفظ', 'تم تحديث البيانات الشخصية');
  },

  // ===================== TABS =====================
  switchTab(tabGroup, tabId) {
    document.querySelectorAll(`[data-tab-group="${tabGroup}"]`).forEach(t => t.classList.remove('active'));
    document.querySelectorAll(`[data-panel-group="${tabGroup}"]`).forEach(p => p.classList.remove('active'));

    document.querySelector(`[data-tab-group="${tabGroup}"][data-tab="${tabId}"]`)?.classList.add('active');
    document.querySelector(`[data-panel-group="${tabGroup}"][data-panel="${tabId}"]`)?.classList.add('active');
  },

  // ===================== DOWNLOAD ALL =====================
  downloadAllEvidence() {
    this.showToast('info', 'قريباً', 'ميزة تحميل كل الشواهد ستكون متاحة قريباً');
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => APP.init());
