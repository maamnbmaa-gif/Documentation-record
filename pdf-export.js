// =============================================
// Teacher Portfolio - PDF Exporter
// Uses jsPDF library
// =============================================

const PDFExporter = {
  generate(sections, teacherData, overallProgress) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const W = 210;
    const H = 297;

    // ── Helpers ──
    const addText = (text, x, y, opts = {}) => {
      doc.setFont('Helvetica', opts.bold ? 'bold' : 'normal');
      doc.setFontSize(opts.size || 12);
      doc.setTextColor(...(opts.color || [30, 30, 30]));
      const align = opts.align || 'right';
      doc.text(String(text), x, y, { align });
    };

    const addRect = (x, y, w, h, color, filled = true) => {
      doc.setFillColor(...color);
      doc.setDrawColor(...color);
      if (filled) doc.rect(x, y, w, h, 'F');
      else doc.rect(x, y, w, h, 'S');
    };

    const addRoundRect = (x, y, w, h, r, color) => {
      doc.setFillColor(...color);
      doc.roundedRect(x, y, w, h, r, r, 'F');
    };

    // ══════════════════════════════════════════
    // PAGE 1 - COVER
    // ══════════════════════════════════════════
    // Background gradient effect
    addRect(0, 0, W, H, [30, 64, 175]);
    addRect(0, 0, W, H / 2, [30, 64, 175]);

    // Decorative circles
    doc.setFillColor(255, 255, 255);
    doc.setGlobalAlpha(0.05);
    doc.circle(170, 50, 60, 'F');
    doc.circle(30, 200, 80, 'F');
    doc.circle(190, 250, 40, 'F');
    doc.setGlobalAlpha(1);

    // White card center
    addRoundRect(20, 60, W - 40, 170, 8, [255, 255, 255]);

    // Logo area top
    doc.setFillColor(255, 255, 255);
    doc.circle(W / 2, 62, 22, 'F');
    doc.setFillColor(30, 64, 175);
    doc.circle(W / 2, 62, 18, 'F');

    // 📚 icon area
    addText('📚', W / 2, 67, { align: 'center', size: 18 });

    // Main title
    addText('سجل توثيق شواهد الأداء الوظيفي', W / 2, 100, {
      align: 'center', bold: true, size: 18, color: [30, 64, 175]
    });

    addText('للمعلمة', W / 2, 110, {
      align: 'center', size: 13, color: [100, 116, 139]
    });

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(40, 118, W - 40, 118);

    // Teacher info box
    const infoY = 126;
    addText('اسم المعلمة:', W - 30, infoY + 4, { bold: true, size: 10, color: [100, 116, 139] });
    addText(teacherData.name || '___________', W / 2, infoY + 4, { align: 'center', bold: true, size: 12, color: [30, 64, 175] });

    addText('المدرسة:', W - 30, infoY + 14, { bold: true, size: 10, color: [100, 116, 139] });
    addText(teacherData.school || '___________', W / 2, infoY + 14, { align: 'center', size: 11, color: [30, 30, 30] });

    addText('المادة:', W - 30, infoY + 24, { bold: true, size: 10, color: [100, 116, 139] });
    addText(teacherData.subject || '___________', W / 2, infoY + 24, { align: 'center', size: 11, color: [30, 30, 30] });

    addText('العام الدراسي:', W - 30, infoY + 34, { bold: true, size: 10, color: [100, 116, 139] });
    addText(teacherData.year || '1446 - 1447', W / 2, infoY + 34, { align: 'center', size: 11, color: [30, 30, 30] });

    // Progress badge
    addRoundRect(W / 2 - 25, infoY + 42, 50, 18, 4, [30, 64, 175]);
    addText(`نسبة الإنجاز: ${overallProgress}%`, W / 2, infoY + 53, {
      align: 'center', bold: true, size: 10, color: [255, 255, 255]
    });

    // Saudi Vision badge
    addRoundRect(60, 195, 90, 20, 4, [16, 185, 129]);
    addText('رؤية المملكة 2030', W / 2, 207, {
      align: 'center', bold: true, size: 10, color: [255, 255, 255]
    });

    // Footer on cover
    addText('وزارة التعليم - المملكة العربية السعودية', W / 2, 225, {
      align: 'center', size: 9, color: [255, 255, 255]
    });

    // Date
    const now = new Date();
    const dateStr = now.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
    addText(dateStr, W / 2, 232, { align: 'center', size: 8, color: [200, 220, 255] });

    // ══════════════════════════════════════════
    // PAGE 2 - TABLE OF CONTENTS
    // ══════════════════════════════════════════
    doc.addPage();

    addRect(0, 0, W, 35, [30, 64, 175]);
    addText('الفهرس', W / 2, 22, { align: 'center', bold: true, size: 18, color: [255, 255, 255] });

    let tocY = 50;
    const tocItems = [
      { num: '1', title: 'المقدمة والرؤية والرسالة', page: 3 },
      { num: '2', title: 'القيم والأهداف', page: 4 },
      { num: '3', title: 'البيانات الشخصية وميثاق الأخلاقيات', page: 5 },
      { num: '4', title: 'أداء الواجبات الوظيفية (10%)', page: 6 },
      { num: '5', title: 'التفاعل مع المجتمع المهني (10%)', page: 7 },
      { num: '6', title: 'التفاعل مع أولياء الأمور (10%)', page: 8 },
      { num: '7', title: 'التنويع في استراتيجيات التدريس (10%)', page: 9 },
      { num: '8', title: 'تحسين نتائج المتعلمين (10%)', page: 10 },
      { num: '9', title: 'إعداد وتنفيذ خطة التعلم (10%)', page: 11 },
      { num: '10', title: 'توظيف التقنيات ووسائل التعليم (10%)', page: 12 },
      { num: '11', title: 'تهيئة البيئة التعليمية (5%)', page: 13 },
      { num: '12', title: 'الإدارة الصفية (5%)', page: 14 },
      { num: '13', title: 'تحليل النتائج وتشخيص المستويات (10%)', page: 15 },
      { num: '14', title: 'تنوع أساليب التقويم (10%)', page: 16 },
      { num: '15', title: 'الخاتمة والتوصيات', page: 17 },
    ];

    tocItems.forEach((item, i) => {
      const bg = i % 2 === 0 ? [248, 250, 252] : [255, 255, 255];
      addRect(15, tocY - 4, W - 30, 12, bg);
      addText(item.num + '.', W - 20, tocY + 4, { size: 10, bold: true, color: [30, 64, 175] });
      addText(item.title, W - 28, tocY + 4, { size: 10, color: [30, 30, 30] });
      // Dots
      doc.setTextColor(180, 180, 180);
      doc.setFontSize(9);
      for (let d = 50; d < 150; d += 10) doc.text('.', d, tocY + 4, { align: 'center' });
      addText(item.page.toString(), 20, tocY + 4, { align: 'left', size: 10, color: [100, 116, 139] });
      tocY += 13;
    });

    // ══════════════════════════════════════════
    // PAGE 3 - INTRO / VISION / MISSION
    // ══════════════════════════════════════════
    doc.addPage();
    this._addPageHeader(doc, W, 'المقدمة والرؤية والرسالة', [30, 64, 175]);

    let y = 55;

    // Intro box
    addRoundRect(15, y, W - 30, 55, 5, [239, 246, 255]);
    doc.setDrawColor(30, 64, 175);
    doc.setLineWidth(0.3);
    doc.roundedRect(15, y, W - 30, 55, 5, 5, 'S');

    addText('المقدمة', W - 22, y + 10, { bold: true, size: 12, color: [30, 64, 175] });
    const introText = 'يُعدّ هذا السجل وسيلةً منهجيةً تبرز مهام المعلمة ودورها الفاعل في دعم الطالبات وتقديم صورة واضحة عن العمل التعليمي. ويمثّل أداةً محوريةً في تعزيز الجودة وتحقيق متطلبات رؤية المملكة العربية السعودية 2030.';
    const wrappedIntro = doc.splitTextToSize(introText, W - 50);
    addText(wrappedIntro, W - 22, y + 22, { size: 10, color: [50, 60, 80] });

    y += 65;

    // Vision box
    addRoundRect(15, y, (W - 38) / 2, 60, 5, [239, 246, 255]);
    addText('الرؤية', W - 22, y + 10, { bold: true, size: 11, color: [30, 64, 175] });
    const visionText = 'صنع بيئة صفية رائدة ومبتكرة تجسّد معايير الجودة والتميز';
    const wrappedVision = doc.splitTextToSize(visionText, (W - 38) / 2 - 10);
    addText(wrappedVision, W - 22, y + 22, { size: 10, color: [50, 60, 80] });

    // Mission box
    const missionX = 15 + (W - 38) / 2 + 8;
    addRoundRect(missionX, y, (W - 38) / 2, 60, 5, [240, 253, 244]);
    addText('الرسالة', missionX + (W - 38) / 2 - 8, y + 10, { bold: true, size: 11, color: [16, 185, 129] });
    const missionText = 'تمكين الطلاب من التعلم العميق عبر بيئة محفزة وتقنيات حديثة';
    const wrappedMission = doc.splitTextToSize(missionText, (W - 38) / 2 - 10);
    addText(wrappedMission, missionX + (W - 38) / 2 - 8, y + 22, { size: 10, color: [50, 60, 80] });

    y += 70;

    // Values
    addText('القيم الجوهرية', W - 22, y, { bold: true, size: 12, color: [30, 64, 175] });
    y += 10;

    const values = ['الاحترام والتقدير', 'التعاون والعمل الجماعي', 'التطوير المستمر', 'المسؤولية والأمانة', 'التميز والإبداع'];
    const colors = [[30, 64, 175], [16, 185, 129], [245, 158, 11], [124, 58, 237], [239, 68, 68]];
    values.forEach((val, i) => {
      const x = 15 + (i % 3) * 62;
      const vy = y + Math.floor(i / 3) * 22;
      addRoundRect(x, vy, 58, 16, 4, colors[i]);
      addText(val, x + 29, vy + 10, { align: 'center', size: 8, bold: true, color: [255, 255, 255] });
    });

    this._addPageFooter(doc, W, H, 3);

    // ══════════════════════════════════════════
    // PAGES 4+ - SECTIONS
    // ══════════════════════════════════════════
    const sectionColors = [
      [30, 64, 175], [124, 58, 237], [6, 182, 212],
      [16, 185, 129], [245, 158, 11], [239, 68, 68],
      [236, 72, 153], [139, 92, 246], [20, 184, 166],
      [249, 115, 22], [14, 165, 233]
    ];

    sections.forEach((section, idx) => {
      doc.addPage();
      const color = sectionColors[idx % sectionColors.length];
      this._addPageHeader(doc, W, section.title, color);

      let sy = 55;

      // Section info row
      addRoundRect(15, sy, W - 30, 28, 5, [...color, 0.1]);
      addRect(15, sy, W - 30, 28, [...color.map(c => Math.floor(c * 0.15 + 230))]);

      addText(`الوزن: ${section.weight}%`, W - 22, sy + 12, { bold: true, size: 11, color });
      addText(`الملفات المرفوعة: ${section.files.length}`, W - 22, sy + 22, { size: 10, color: [100, 116, 139] });

      const progress = APP.getSectionProgress(section);
      addText(`نسبة التوثيق: ${progress}%`, 22, sy + 12, { align: 'left', bold: true, size: 11, color: progress === 100 ? [16, 185, 129] : [245, 158, 11] });

      // Progress bar
      const pbY = sy + 22;
      addRoundRect(22, pbY - 4, W - 44, 6, 3, [226, 232, 240]);
      if (progress > 0) {
        addRoundRect(22 + (W - 44) * (1 - progress / 100), pbY - 4, (W - 44) * (progress / 100), 6, 3, color);
      }

      sy += 38;

      // Evidence table
      addText('قائمة الشواهد المطلوبة', W - 22, sy, { bold: true, size: 12, color });
      sy += 8;

      // Table header
      addRect(15, sy, W - 30, 10, color);
      addText('م', W - 22, sy + 7, { size: 9, bold: true, color: [255, 255, 255] });
      addText('الشاهد المطلوب', W - 35, sy + 7, { size: 9, bold: true, color: [255, 255, 255] });
      addText('الحالة', 22, sy + 7, { align: 'left', size: 9, bold: true, color: [255, 255, 255] });
      sy += 10;

      section.evidence.forEach((ev, i) => {
        const rowBg = i % 2 === 0 ? [248, 250, 252] : [255, 255, 255];
        addRect(15, sy, W - 30, 10, rowBg);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.2);
        doc.rect(15, sy, W - 30, 10, 'S');

        addText((i + 1).toString(), W - 22, sy + 7, { size: 9, color: [100, 116, 139] });
        addText(ev, W - 35, sy + 7, { size: 9, color: [30, 30, 30] });

        const uploaded = section.files.some(f => f.evidenceIndex === i);
        const statusColor = uploaded ? [16, 185, 129] : [245, 158, 11];
        addRoundRect(18, sy + 2, 22, 7, 2, statusColor);
        addText(uploaded ? 'موثق' : 'لم يرفع', 29, sy + 7, { align: 'center', size: 7, bold: true, color: [255, 255, 255] });
        sy += 10;
      });

      sy += 8;

      // Uploaded files
      if (section.files.length > 0) {
        addText('الملفات المرفوعة', W - 22, sy, { bold: true, size: 11, color });
        sy += 8;
        section.files.forEach((f, i) => {
          addRoundRect(15, sy, W - 30, 10, [248, 250, 252]);
          addText(`${i + 1}. ${f.name}`, W - 22, sy + 7, { size: 9, color: [30, 30, 30] });
          addText(f.size, 22, sy + 7, { align: 'left', size: 8, color: [100, 116, 139] });
          sy += 12;
          if (sy > H - 30) { doc.addPage(); sy = 25; }
        });
      }

      // Notes
      if (section.notes) {
        sy += 5;
        addRoundRect(15, sy, W - 30, 30, 5, [255, 251, 235]);
        addText('الملاحظات:', W - 22, sy + 10, { bold: true, size: 10, color: [245, 158, 11] });
        const wrappedNotes = doc.splitTextToSize(section.notes, W - 50);
        addText(wrappedNotes, W - 22, sy + 20, { size: 9, color: [50, 60, 80] });
        sy += 35;
      }

      // QR placeholder
      if (sy < H - 50) {
        addRoundRect(W / 2 - 20, sy, 40, 40, 4, [226, 232, 240]);
        addText('QR', W / 2, sy + 22, { align: 'center', size: 12, bold: true, color: [30, 64, 175] });
        addText('مجلد Google Drive', W / 2, sy + 35, { align: 'center', size: 8, color: [100, 116, 139] });
      }

      this._addPageFooter(doc, W, H, idx + 4);
    });

    // ══════════════════════════════════════════
    // LAST PAGE - CLOSING
    // ══════════════════════════════════════════
    doc.addPage();
    addRect(0, 0, W, H, [30, 64, 175]);

    doc.setFillColor(255, 255, 255);
    doc.setGlobalAlpha(0.07);
    doc.circle(160, 80, 70, 'F');
    doc.circle(40, 220, 90, 'F');
    doc.setGlobalAlpha(1);

    addRoundRect(25, 80, W - 50, 140, 10, [255, 255, 255]);

    addText('خاتمة', W / 2, 105, { align: 'center', bold: true, size: 20, color: [30, 64, 175] });

    const closingText = 'يُجسّد هذا السجل مسيرةً مهنيةً متميزة، وأداةً حقيقيةً للتطوير والإتقان. كل توثيق فيه يعكس التزاماً راسخاً بتقديم تعليم نوعي يُعلي من شأن الوطن ويحقق رؤيته الطموحة 2030.';
    const wrappedClosing = doc.splitTextToSize(closingText, W - 80);
    addText(wrappedClosing, W / 2, 125, { align: 'center', size: 11, color: [50, 70, 100] });

    addText('توقيع المعلمة', W - 50, 185, { size: 10, color: [100, 116, 139] });
    doc.setDrawColor(30, 64, 175);
    doc.setLineWidth(0.5);
    doc.line(W - 90, 195, W - 20, 195);

    addText('توقيع المشرف', 50, 185, { align: 'left', size: 10, color: [100, 116, 139] });
    doc.line(20, 195, 90, 195);

    addText('وزارة التعليم - المملكة العربية السعودية', W / 2, 230, { align: 'center', size: 10, color: [200, 220, 255] });
    addText('تصميم: نظام توثيق الأداء الوظيفي الذكي', W / 2, 242, { align: 'center', size: 9, color: [150, 180, 240] });

    // Save
    const fileName = `سجل_الأداء_الوظيفي_${teacherData.name || 'المعلمة'}.pdf`;
    doc.save(fileName);
  },

  _addPageHeader(doc, W, title, color) {
    const addRect = (x, y, w, h, c, filled = true) => {
      doc.setFillColor(...c);
      doc.setDrawColor(...c);
      if (filled) doc.rect(x, y, w, h, 'F');
    };

    addRect(0, 0, W, 40, color);

    // Decorative element
    doc.setFillColor(255, 255, 255);
    doc.setGlobalAlpha(0.15);
    doc.circle(W - 20, 20, 30, 'F');
    doc.setGlobalAlpha(1);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(title, W - 15, 25, { align: 'right' });

    // Page line decoration
    doc.setFillColor(255, 255, 255);
    doc.setGlobalAlpha(0.3);
    doc.rect(0, 38, W, 2, 'F');
    doc.setGlobalAlpha(1);
  },

  _addPageFooter(doc, W, H, pageNum) {
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(15, H - 18, W - 15, H - 18);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('سجل توثيق شواهد الأداء الوظيفي للمعلمة', W - 15, H - 10, { align: 'right' });
    doc.text(pageNum.toString(), W / 2, H - 10, { align: 'center' });
    doc.text(new Date().getFullYear().toString(), 15, H - 10, { align: 'left' });
  }
};
