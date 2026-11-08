# Product Requirements Document (PRD) — 18 Sections

## 1. Informasi Produk

| Atribut | Nilai |
|---|---|
| Produk | Rotela — People & Shift Management |
| Versi | 1.0 |
| Tanggal | 8 November 2026 |
| Status | Draft baseline |
| Platform | Web responsif, desktop-first dengan dukungan tablet dan mobile |

> **Catatan sumber dan ketepatan acuan**  
> Tautan yang diberikan dalam permintaan mengarah ke `https://demo.codeandchill.store/rotela/`. Halaman tersebut mengidentifikasi produk sebagai **Rotela — the people desk of Saltwick Hotels**, yaitu aplikasi HR dan staff rota untuk hotel serta tim kerja berbasis shift. Teks label tautan pengguna menyebut `konveksi.toko-abi.com`, tetapi alamat tujuan sebenarnya bukan situs konveksi. Paket dokumen ini mengikuti **alamat URL tujuan (Rotela)**. Apabila yang dimaksud benar-benar sistem konveksi, seluruh paket perlu disusun ulang menggunakan URL konveksi yang benar.  
> Demo publik mengharuskan JavaScript untuk berjalan; daftar modul dan perilaku fungsional di bawah disusun dari halaman demo yang tersedia serta deskripsi produk resmi Rotela. Detail piksel, warna, font, urutan kontrol, microcopy, dan isi setiap record harus dikunci melalui inspeksi visual langsung terhadap seluruh layar demo sebelum dinyatakan lulus verifikasi 100%.  
> Sumber: [Demo Rotela](https://demo.codeandchill.store/rotela/) · [Deskripsi resmi template Rotela](https://codeandchill.store/templates/rotela) · Tanggal pemeriksaan: 8 November 2026.

## 2. Visi dan Tujuan Produk

Menjadi people desk terpusat bagi organisasi berbasis shift: pengguna dapat memahami kondisi tenaga kerja hari ini, mengatur jadwal, menyelesaikan permintaan, menjaga data people, menyiapkan payroll, serta mengelola hiring dan pengembangan dalam satu pengalaman yang konsisten.

Tujuan terukur: mempercepat roster, mengurangi shift kosong dan konflik, memperbaiki kelengkapan timesheet, mempercepat approval, serta meningkatkan kualitas data people.

## 3. Masalah dan Peluang

Operasional shift sangat dinamis. Data yang tersebar membuat manajer terlambat mengetahui perubahan, HR mengulang entri data, dan payroll menerima timesheet yang belum lengkap. Rotela menyatukan alur tersebut. Diferensiasi pengalaman yang harus dipertahankan adalah staffing timeline harian, chase untuk keterlambatan/ketidakhadiran, satu approval queue, drag-and-drop rota mingguan dengan conflict/leave check, serta modul people-to-payroll dan hiring.

## 4. Target Pengguna dan Role

- Owner / company administrator.
- HR / people administrator.
- Operations manager.
- Department manager / supervisor.
- Payroll administrator.
- Recruiter / hiring manager.
- Employee / team member.

Setiap role memperoleh permission dan scope organisasi/departemen yang dapat dikonfigurasi. Pengguna dapat memiliki lebih dari satu role apabila kebijakan perusahaan mengizinkan.

## 5. Ruang Lingkup Produk

### In scope
Today; people directory, employee profile, org chart, departments; attendance, live floor board, week rota, timesheets; leave requests, leave calendar dan balances; monthly payroll run, printable payslips dan pay history; performance reviews, goals dan kudos; hiring board dan open roles; onboarding checklist; people analytics; company/roles/appearance/notifications settings; help centre FAQ dan question form; global search; light/dark theme; responsive screens.

### Out of scope baseline
Reservasi hotel, POS, inventori, akuntansi umum, transfer bank, perangkat attendance khusus, native iOS/Android, AI assistant, serta payroll legal lintas negara sebelum aturan dan lisensi tervalidasi.

## 6. Arsitektur Informasi dan Navigasi

Struktur modul baseline:

1. **Today** — staffing hari ini, approvals, attendance, headcount, hiring, starters.
2. **People** — directory, profile, org chart, departments.
3. **Attendance** — live floor board, daily attendance, exception follow-up.
4. **Rota** — weekly rota, shift details, conflict checks, publish.
5. **Timesheets** — catatan jam, exception, review dan approval.
6. **Leave** — requests, calendar, balances.
7. **Payroll** — monthly pay run, payslips, pay history.
8. **Performance** — reviews, goals, kudos.
9. **Recruitment** — hiring board, candidates, open roles.
10. **Onboarding** — checklists dan progress starters.
11. **Analytics** — people analytics dan laporan.
12. **Settings** — company, roles, appearance, notifications.
13. **Help** — FAQ dan question form.

Nama, urutan, ikon, pengelompokan dan label final harus mengikuti hasil inspeksi UI aktual, bukan sekadar daftar konseptual di atas.

## 7. User Journey Utama

### Journey A — Memulai hari
Login → Today → lihat who is on now dan staffing per departemen → identifikasi late/missing → gunakan chase action → pantau status tindak lanjut.

### Journey B — Membuat roster
Rota → pilih minggu → tambah/pilih shift → drag shift ke slot/staf lain → sistem memeriksa clash dan approved leave → koreksi peringatan → save → publish → jadwal menjadi versi aktif.

### Journey C — Memproses permintaan
Approvals queue → pilih leave/swap/overtime → tinjau detail dan dampak jadwal/saldo → approve/reject/request changes → status dan kalender/rota diperbarui → audit event tercatat.

### Journey D — Payroll bulanan
Payroll → pilih periode → tinjau data timesheet dan anomali → hitung/review run → finalisasi sesuai role → cetak atau unduh payslip → lihat pay history.

### Journey E — Hiring ke onboarding
Recruitment → buka role → tambah kandidat → pindahkan kartu pada hiring board → tandai hired → buat employee record atau tautkan record → tetapkan onboarding checklist → pantau penyelesaian.

## 8. Daftar Fitur dan Prioritas

| ID | Fitur | Prioritas | Release |
|---|---|---|---|
| P-01 | Today overview dan staffing timeline | Must | MVP |
| P-02 | People directory, profile, org chart, departments | Must | MVP |
| P-03 | Attendance dan live floor board | Must | MVP |
| P-04 | Week rota dengan drag-and-drop | Must | MVP |
| P-05 | Shift clash dan leave checks | Must | MVP |
| P-06 | Timesheets dan exception review | Must | MVP |
| P-07 | Leave requests, calendar, balances | Must | MVP |
| P-08 | Approval queue untuk leave/swap/overtime | Must | MVP |
| P-09 | Monthly payroll run, payslip, history | Must | R1 |
| P-10 | Hiring board dan open roles | Must | R1 |
| P-11 | Onboarding checklists | Must | R1 |
| P-12 | Reviews, goals, kudos | Should | R2 |
| P-13 | People analytics | Should | R2 |
| P-14 | Company, roles, appearance, notifications settings | Must | MVP/R1 |
| P-15 | FAQ dan question form | Should | R2 |
| P-16 | Cmd+K global search | Should | R1 |
| P-17 | Light/dark theme dan collapsible sidebar | Must | MVP |
| P-18 | Responsive mobile/tablet/desktop | Must | MVP |

## 9. Persyaratan Fungsional Produk

### Today
- Menampilkan ringkasan staf yang sedang/akan bertugas, approval, attendance, headcount, hiring dan starters.
- Menampilkan staffing per jam dan departemen.
- Menandai keterlambatan dan staf yang belum hadir.
- Tombol chase memulai aksi tindak lanjut yang dapat dilacak dan tidak boleh menyatakan berhasil sebelum tindakan tersimpan.

### People
- Cari, filter, urutkan dan buka employee profile.
- Profil menampung data identitas kerja, kontak sesuai izin, jabatan, departemen, atasan, status, tanggal mulai, serta tautan ke jadwal, leave, payroll dan performance.
- Org chart memvisualisasikan relasi pelaporan.
- Perubahan profil tervalidasi dan diaudit.

### Attendance / Live Floor Board
- Menampilkan staf dan status operasionalnya saat ini.
- Menyediakan filter tanggal, departemen, status dan lokasi bila tersedia.
- Menampilkan catatan yang terlambat, missing atau perlu review.
- Aksi follow-up hanya tersedia bagi role yang memiliki izin.

### Rota
- Tampilan kalender mingguan per staf/departemen.
- Membuat, mengubah, menghapus, memindahkan dan menyalin shift.
- Interaksi drag-and-drop harus mendukung keyboard atau alternatif form.
- Validasi overlap shift, availability yang dikonfigurasi, dan approved leave.
- Konflik harus terlihat, menyebut penyebab, dan memberi pilihan perbaikan.
- Simpan draft dan publish harus dibedakan secara jelas.

### Timesheets
- Menyatukan planned shift dan actual time entries.
- Menangani missing clock-in/out, keterlambatan, overtime, dan koreksi.
- Perubahan setelah persetujuan membutuhkan alasan dan tercatat dalam audit log.
- Status minimal: draft/pending/reviewed/approved/locked (label akhir mengikuti referensi/kebijakan).

### Leave
- Jenis cuti dapat dikonfigurasi.
- Pengajuan memuat tanggal/waktu, jenis, catatan/dokumen jika wajib.
- Kalender memperlihatkan cuti dan dampaknya pada roster.
- Saldo menampilkan entitlement, used, pending, dan remaining sesuai kebijakan.
- Pengajuan yang disetujui memperbarui saldo dan menjadi input conflict check.

### Approvals
- Satu queue menggabungkan leave, shift swaps dan overtime.
- Approver dapat melihat pemohon, periode, alasan, dampak operasional, dan saldo terkait.
- Keputusan disimpan dengan actor, timestamp, komentar dan status.

### Payroll
- Membuat pay run bulanan berdasarkan periode dan populasi karyawan yang memenuhi syarat.
- Mengambil timesheet/komponen yang telah divalidasi.
- Menampilkan item belum lengkap dan anomali sebelum finalisasi.
- Menghasilkan payslip per karyawan yang dapat dicetak.
- Menyediakan pay history dan status run.
- Tidak boleh mengklaim transfer bank sukses tanpa integrasi konfirmasi pembayaran.

### Performance
- Membuat siklus review dan mengaitkan review kepada employee/manager.
- Menyimpan review, status, tanggal, reviewer dan catatan.
- Mengelola goals, due date dan progress.
- Memberikan kudos/pengakuan dengan aturan visibilitas.

### Recruitment & Onboarding
- Membuat open roles dengan detail jabatan dan status.
- Menyimpan kandidat dan tahap pipeline.
- Mengubah tahap melalui drag-and-drop dan alternatif menu.
- Menjaga catatan perubahan tahap.
- Saat kandidat diterima, alihkan informasi ke employee record secara terkendali.
- Checklist onboarding memiliki item, owner, due date dan status.

### Analytics, Settings, Help
- Analytics menampilkan metrik people yang dapat ditelusuri ke sumber data.
- Settings mengelola company, roles, appearance dan notification preferences.
- Help centre menyediakan FAQ dan question form.

## 10. Persyaratan UX/UI

- UI harus mereplikasi komposisi, hierarki, sidebar, topbar, tipografi, palet, ikon, spacing, card, tabel, board, kalender, chart, tombol, modal, dropdown, tooltip, empty state, loading state, dan microcopy dari referensi.
- Menyediakan light dan dark theme sesuai perilaku referensi.
- Sidebar dapat collapse menjadi ikon.
- Global finder dapat dibuka dengan Cmd+K (dan Ctrl+K pada sistem yang sesuai jika perilaku referensi mengizinkan).
- Antarmuka bekerja pada phone, tablet dan desktop.
- Tidak melakukan redesign, penggantian brand, atau perubahan struktur tanpa persetujuan change request.
- Nilai desain final harus diambil dari screenshot dan inspeksi aktual; dokumen ini tidak mengarang kode warna/font yang tidak terbaca.

## 11. Data dan Entitas Utama

Organization, User, Role, Permission, Department, JobTitle, Employee, EmploymentStatus, ManagerRelation, Shift, RotaWeek, ShiftAssignment, AttendanceRecord, Timesheet, TimesheetRevision, LeaveType, LeaveBalance, LeaveRequest, ShiftSwapRequest, OvertimeRequest, Approval, PayrollPeriod, PayrollRun, PayrollLine, Payslip, PayHistory, ReviewCycle, Review, Goal, Kudos, JobOpening, Candidate, CandidateStageHistory, OnboardingTemplate, OnboardingTask, Notification, HelpRequest, AuditEvent.

Semua entitas harus memiliki identifier, organization scope, created_at, updated_at dan metadata audit yang sesuai. Data karyawan/payslip harus memiliki kebijakan akses yang ketat.

## 12. Integrasi dan Sistem Eksternal

- HRIS: impor atau sinkronisasi employee master data.
- Payroll provider: ekspor timesheet/payroll input dan/atau sinkronisasi hasil payroll.
- Time-clock: impor actual time entries.
- Email provider: undangan, notifikasi dan reset password.
- Calendar: ekspor jadwal atau integrasi kalender jika disetujui.
- File storage: dokumen onboarding dan payslip.

Setiap integrasi harus menggunakan adapter terisolasi, credentials aman, retry terkontrol, idempotency, dan log sinkronisasi. API provider belum ditentukan; jangan mengasumsikan vendor tertentu.

## 13. Notifikasi

Notifikasi untuk shift assigned/changed/cancelled, leave/swap/overtime submitted/decided, approval pending, timesheet exception, onboarding task, review/goal due date, recruitment activity, dan system announcements. Channel, template, penerima dan frekuensi dapat dikonfigurasi. Sistem harus mencegah duplikasi notifikasi untuk event yang sama.

## 14. Analytics dan Instrumentasi Produk

Event minimum: login, page_view, employee_created/updated, shift_created/updated/published, shift_conflict_detected, attendance_exception_created/resolved, leave_submitted/decided, timesheet_approved, payroll_run_created/finalized, candidate_stage_changed, onboarding_task_completed, theme_changed, search_used. Event analytics tidak boleh mengandung payslip, alasan cuti, atau data personal sensitif secara mentah.

## 15. Persyaratan Non-Fungsional

- Availability target awal ≥ 99.5% per bulan di luar maintenance terjadwal.
- 95th percentile response time untuk operasi umum ≤ 2.5 detik pada beban normal.
- Aksi perubahan jadwal/approval harus memberi feedback segera dan konsisten.
- Sistem harus mendukung backup terjadwal dan uji pemulihan.
- Enkripsi saat transit dan saat tersimpan.
- RBAC, session management, rate limiting, audit log dan proteksi OWASP.
- WCAG 2.2 AA sebagai target aksesibilitas.
- Browser modern terkini; responsive phone/tablet/desktop.
- Retensi dan lokasi data configurable sesuai kontrak dan hukum.

Target harus disahkan lewat arsitektur dan pengujian beban; bukan hasil pengukuran demo.

## 16. Acceptance Criteria Produk

Produk diterima apabila: semua halaman prioritas tersedia sesuai role; CRUD inti tervalidasi; drag-and-drop dan conflict detection berjalan; approval queue mengubah state dengan benar; perubahan tersimpan di backend; payroll run menghasilkan payslip dan history yang konsisten; pipeline kandidat dan onboarding bekerja; data sensitif dibatasi; light/dark dan responsive lulus; serta visual comparison mencapai kesesuaian yang disetujui pada seluruh layar dan state.

## 17. Roadmap dan Release Plan

| Tahap | Isi | Exit criteria |
|---|---|---|
| Discovery & UI baseline | Inventaris screen, screenshot, state, tokens dan route | Approved UI baseline dan scope |
| MVP Foundation | Auth, organization, roles, people, departments, Today | Data inti dan akses stabil |
| Workforce Operations | Attendance, live board, rota, conflict rules, timesheet, leave, approvals | Alur jadwal dan operasi lulus UAT |
| People Lifecycle | Hiring, onboarding, performance | Kandidat sampai employee record berjalan |
| Payroll & Analytics | Payroll run, payslip, history, analytics | Rekonsiliasi dan ekspor disetujui |
| Hardening & Go-live | Security, load, backup, migration, training, visual regression | Go-live checklist lulus |

Urutan dapat disesuaikan berdasarkan prioritas bisnis, tetapi semua fitur baseline yang dijanjikan harus tercakup dalam rencana rilis.

## 18. Asumsi, Risiko, dan Dependensi

- Alamat URL Rotela diprioritaskan dibanding teks label yang menyebut situs konveksi.
- Demo memiliki sample data browser-side; versi produksi memerlukan penyimpanan server-side dan autentikasi nyata.
- Akurasi visual 100% memerlukan inspeksi screenshot/interaction langsung pada semua state.
- Ketentuan payroll, cuti, overtime dan retensi bergantung yurisdiksi pelanggan.
- Integrasi bergantung dokumentasi dan akses API milik vendor.
- Risiko data personal, perubahan roster, dan perhitungan kompensasi harus ditangani dengan permission, audit, validasi dan pengujian khusus.
