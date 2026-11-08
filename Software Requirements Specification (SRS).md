# Software Requirements Specification (SRS)

## 1. Informasi Dokumen

| Atribut | Nilai |
|---|---|
| Produk | Rotela — People & Shift Management |
| Versi | 1.0 |
| Tanggal | 8 November 2026 |
| Status | Draft baseline |
| Standard style | SRS terstruktur berbasis requirement ID |

> **Catatan sumber dan ketepatan acuan**  
> Tautan yang diberikan dalam permintaan mengarah ke `https://demo.codeandchill.store/rotela/`. Halaman tersebut mengidentifikasi produk sebagai **Rotela — the people desk of Saltwick Hotels**, yaitu aplikasi HR dan staff rota untuk hotel serta tim kerja berbasis shift. Teks label tautan pengguna menyebut `konveksi.toko-abi.com`, tetapi alamat tujuan sebenarnya bukan situs konveksi. Paket dokumen ini mengikuti **alamat URL tujuan (Rotela)**. Apabila yang dimaksud benar-benar sistem konveksi, seluruh paket perlu disusun ulang menggunakan URL konveksi yang benar.  
> Demo publik mengharuskan JavaScript untuk berjalan; daftar modul dan perilaku fungsional di bawah disusun dari halaman demo yang tersedia serta deskripsi produk resmi Rotela. Detail piksel, warna, font, urutan kontrol, microcopy, dan isi setiap record harus dikunci melalui inspeksi visual langsung terhadap seluruh layar demo sebelum dinyatakan lulus verifikasi 100%.  
> Sumber: [Demo Rotela](https://demo.codeandchill.store/rotela/) · [Deskripsi resmi template Rotela](https://codeandchill.store/templates/rotela) · Tanggal pemeriksaan: 8 November 2026.

## 2. Pendahuluan

### 2.1 Tujuan

SRS ini menetapkan perilaku perangkat lunak yang akan dibangun dengan mengacu pada aplikasi Rotela. Dokumen ini menjadi kontrak kebutuhan antara product owner, designer, engineer, QA, security, dan stakeholder bisnis.

### 2.2 Ruang Lingkup

Sistem adalah aplikasi web untuk mengelola tenaga kerja berbasis shift, mulai dari people directory, jadwal, attendance, timesheet, leave, approvals, payroll preparation, performance, recruitment, onboarding, hingga analytics dan pengaturan.

### 2.3 Istilah

| Istilah | Definisi |
|---|---|
| Rota | Jadwal kerja/shift dalam rentang hari atau minggu |
| Shift | Periode kerja yang ditugaskan ke employee |
| Floor board | Tampilan status operasional staf pada hari berjalan |
| Timesheet | Catatan jam kerja aktual dan hasil peninjauan |
| Leave | Cuti/ketidakhadiran terencana berdasarkan jenis dan kebijakan |
| Approval queue | Daftar permintaan yang menunggu keputusan |
| Pay run | Proses pengumpulan/perhitungan payroll untuk satu periode |
| Payslip | Dokumen rincian pembayaran untuk seorang karyawan |
| Starter | Karyawan baru yang sedang menjalani onboarding |

### 2.4 Referensi

- Demo Rotela: https://demo.codeandchill.store/rotela/
- Deskripsi resmi: https://codeandchill.store/templates/rotela

## 3. Deskripsi Umum

### 3.1 Perspektif Produk

Aplikasi terdiri dari frontend web responsif, backend API, database terpusat, file storage privat dan integrasi pihak ketiga bila diaktifkan. Demo publik merupakan contoh frontend dengan sample data; sistem yang dispesifikasikan di sini menambahkan persistensi server dan kontrol produksi.

### 3.2 Kelas Pengguna

Owner/Admin, HR Admin, Operations Manager, Department Manager, Payroll Admin, Recruiter, Employee, dan Integration Service.

### 3.3 Lingkungan Operasi

Browser modern pada desktop, tablet dan ponsel; koneksi HTTPS; server/database managed atau infrastruktur cloud yang setara. Timezone, locale, format tanggal, dan mata uang mengikuti konfigurasi organisasi.

### 3.4 Batasan

- UI mengacu pada URL Rotela, bukan situs konveksi.
- Stack referensi: React, Vite, CSS dan GSAP.
- Demo sample data tidak digunakan sebagai penyimpanan produksi.
- Perhitungan payroll dan aturan cuti harus dikonfigurasi dan divalidasi terhadap yurisdiksi pelanggan.

### 3.5 Asumsi

- Setiap pengguna terhubung ke satu atau lebih organisasi dengan membership yang terdaftar.
- Organisasi menetapkan departemen, role, policy, approver dan timezone.
- Sumber actual attendance dapat berupa input manual atau integrasi.

## 4. Kebutuhan Antarmuka Eksternal

### 4.1 User Interface

Sistem harus menyediakan app shell, sidebar collapsible, global finder Cmd+K, light/dark theme, modul navigasi dan semua page family yang terdaftar pada UIRD. Detail visual harus mengikuti baseline screenshot.

### 4.2 Software Interfaces

- API frontend-backend melalui HTTPS dan schema versioned.
- PostgreSQL atau relational database setara.
- Email/notification provider.
- HRIS, payroll dan time-clock provider melalui adapter opsional.
- CSV import/export dan private object storage.

### 4.3 Communications

Semua komunikasi menggunakan TLS. Webhook diverifikasi. Error API memiliki kode dan pesan standar tanpa membocorkan detail internal.

## 5. Kebutuhan Fungsional Sistem

### 5.1 Akses Pengguna

- **SRS-AUTH-01:** Sistem harus mengautentikasi pengguna sebelum mengakses data organisasi.
- **SRS-AUTH-02:** Sistem harus memeriksa permission pada setiap request sensitif.
- **SRS-AUTH-03:** Sistem harus mencatat login penting, perubahan role, dan revoke session.

### 5.2 Dashboard Today

- **SRS-TOD-01:** Sistem harus menampilkan status staf untuk tanggal terpilih.
- **SRS-TOD-02:** Sistem harus mengelompokkan staffing berdasarkan waktu dan departemen.
- **SRS-TOD-03:** Sistem harus mengidentifikasi late/missing berdasarkan jadwal dan catatan attendance.
- **SRS-TOD-04:** Sistem harus menyediakan chase action bagi pengguna berizin dan menyimpan hasil tindak lanjut.

### 5.3 People

- **SRS-PEO-01:** Sistem harus menyediakan create/read/update/archive employee.
- **SRS-PEO-02:** Sistem harus menyediakan directory search, filter dan sort.
- **SRS-PEO-03:** Sistem harus menampilkan employee profile dan relasi organisasi.
- **SRS-PEO-04:** Sistem harus menampilkan organizational chart dan departments.

### 5.4 Attendance & Rota

- **SRS-OPS-01:** Sistem harus menyediakan live floor board.
- **SRS-OPS-02:** Sistem harus menyediakan week rota.
- **SRS-OPS-03:** Sistem harus mendukung create/edit/move/cancel shift sesuai permission.
- **SRS-OPS-04:** Sistem harus mendeteksi overlap dan konflik approved leave.
- **SRS-OPS-05:** Sistem harus membedakan draft rota dan published rota.
- **SRS-OPS-06:** Sistem harus mencatat perubahan shift dan publication version.

### 5.5 Timesheet

- **SRS-TIM-01:** Sistem harus mengaitkan actual time entry dengan planned shift bila tersedia.
- **SRS-TIM-02:** Sistem harus menampilkan missing punch dan exception.
- **SRS-TIM-03:** Sistem harus memerlukan alasan serta izin untuk koreksi yang telah direview.
- **SRS-TIM-04:** Sistem harus menyediakan review, approval dan export.

### 5.6 Leave & Approval

- **SRS-LEV-01:** Sistem harus mengelola leave type dan policy.
- **SRS-LEV-02:** Sistem harus menerima leave request dan menghitung balance sesuai konfigurasi.
- **SRS-LEV-03:** Sistem harus menyediakan calendar dan request status.
- **SRS-APR-01:** Sistem harus menggabungkan permintaan leave, shift swap dan overtime ke approval queue.
- **SRS-APR-02:** Sistem harus mencatat keputusan, komentar, approver dan timestamp.

### 5.7 Payroll

- **SRS-PAY-01:** Sistem harus membuat monthly pay run untuk periode yang ditentukan.
- **SRS-PAY-02:** Sistem harus menandai input yang belum lengkap atau tidak konsisten.
- **SRS-PAY-03:** Sistem harus menghasilkan hasil payroll/payslip dari configured payroll engine atau provider.
- **SRS-PAY-04:** Sistem harus menyediakan printable payslip dan pay history.
- **SRS-PAY-05:** Sistem harus mengunci periode final dan mencegah finalisasi duplikat.

### 5.8 Performance

- **SRS-PER-01:** Sistem harus mengelola review cycles dan review records.
- **SRS-PER-02:** Sistem harus mengelola employee goals dan progress.
- **SRS-PER-03:** Sistem harus merekam kudos dengan kontrol visibilitas.

### 5.9 Recruitment & Onboarding

- **SRS-REC-01:** Sistem harus mengelola open roles.
- **SRS-REC-02:** Sistem harus memelihara candidate pipeline dan stage history.
- **SRS-REC-03:** Sistem harus mendukung perpindahan kandidat antar-stage melalui drag/drop atau menu alternatif.
- **SRS-ONB-01:** Sistem harus menugaskan onboarding checklist kepada starter.
- **SRS-ONB-02:** Sistem harus melacak owner, due date, status dan penyelesaian item.

### 5.10 Analytics, Settings & Help

- **SRS-ANL-01:** Sistem harus menyediakan people analytics berdasarkan filter dan izin pengguna.
- **SRS-SET-01:** Sistem harus mengelola company settings dan organization profile.
- **SRS-SET-02:** Sistem harus mengelola roles/permissions.
- **SRS-SET-03:** Sistem harus menyimpan appearance dan notification preferences.
- **SRS-HLP-01:** Sistem harus menyediakan FAQ dan question form.
- **SRS-SEA-01:** Sistem harus menyediakan global finder dengan shortcut Cmd+K.

## 6. Use Case Specification

### UC-01 — Publikasikan Rota Mingguan

**Aktor utama:** Department Manager.  
**Precondition:** pengguna login; minggu aktif; data department dan employee tersedia.  
**Trigger:** manager memilih aksi publish.

**Alur utama:**
1. Sistem memuat roster draft.
2. Manager menambahkan atau memindahkan shift.
3. Sistem memvalidasi durasi, assignment, overlap dan approved leave.
4. Jika valid, sistem menampilkan ringkasan publikasi.
5. Manager mengonfirmasi publish.
6. Backend menyimpan publication version secara atomik.
7. Sistem membuat notification event dan menampilkan status published.

**Alternate flow:** jika ada konflik, sistem menandai shift terkait dan menyebut penyebab; manager memperbaiki atau melakukan override bila memiliki izin khusus dan memberikan alasan.  
**Postcondition:** versi rota terpublikasi dapat dibaca pengguna terkait dan audit event tercatat.

### UC-02 — Approve Leave Request

**Aktor utama:** Approver/Manager.  
**Precondition:** permintaan pending dan approver memiliki permission.  
**Alur:** buka queue → pilih request → lihat tanggal, tipe, saldo dan dampak roster → approve/reject dengan komentar → sistem mengubah status, memperbarui saldo bila approved, mengirim notifikasi dan menulis audit event.  
**Postcondition:** keputusan tersimpan dan terlihat oleh pemohon.

### UC-03 — Review Timesheet

**Aktor utama:** Manager.  
**Precondition:** attendance records tersedia untuk periode.  
**Alur:** buka timesheet → filter exception → buka record → koreksi dengan alasan jika perlu → approve → lock sesuai policy → record menjadi payroll eligible.  
**Postcondition:** versi timesheet final dan histori koreksi tersedia.

### UC-04 — Finalize Monthly Pay Run

**Aktor utama:** Payroll Admin.  
**Precondition:** periode terbuka dan data input telah direkonsiliasi.  
**Alur:** pilih periode → sistem mengumpulkan input → tampilkan warning → payroll admin memperbaiki atau mengotorisasi exception → jalankan kalkulasi → preview totals → finalisasi → buat payslip dan pay history.  
**Postcondition:** run terkunci; payslip tersedia bagi penerima yang berhak.

### UC-05 — Hire Candidate dan Mulai Onboarding

**Aktor utama:** Recruiter/HR Admin.  
**Alur:** buka hiring board → pilih kandidat → pindahkan ke tahap hired → validasi data → buat employee record → tetapkan departemen/manager → buat onboarding checklist → assign task → pantau progress.  
**Postcondition:** candidate terhubung ke employee record dan onboarding aktif.

## 7. Aturan Bisnis

- Satu employee identifier unik dalam organisasi.
- Shift tidak dapat memiliki waktu selesai lebih awal dari waktu mulai tanpa aturan overnight yang eksplisit.
- Approved leave menjadi input conflict check.
- Approval memerlukan approver aktif dan berizin.
- Koreksi timesheet setelah approval memerlukan reason dan audit record.
- Payroll run per periode memiliki status draft/review/final (nama UI final mengikuti referensi).
- Payslip tidak dapat diakses melalui URL publik tanpa authorization.
- Employee yang dinonaktifkan tetap memiliki histori transaksi yang tidak boleh hilang.

## 8. Data Requirements

### Data minimum Employee
Employee ID, organization, first/last name, work email (jika ada), department, job title, manager, employment status, start date, end date (opsional), timezone/location assignment, dan audit fields.

### Data minimum Shift
Shift ID, organization, employee/assignment, department, start_at, end_at, timezone context, status, role/skill tag (jika digunakan), notes, created_by, published version.

### Data minimum Approval
Request ID/type, requester, approver, submitted_at, status, decision_at, comment, old/new values bila perubahan, audit ID.

### Data minimum Payroll
Period, currency, employee, earnings/deductions, approved time input, calculation source/version, gross/net totals, status, payslip reference, finalized_by dan finalized_at.

## 9. Non-Functional Requirements

- **SRS-NFR-01 Performance:** p95 operasi utama ≤ 2.5 detik pada beban normal yang disepakati.
- **SRS-NFR-02 Availability:** target ≥ 99.5% per bulan.
- **SRS-NFR-03 Security:** TLS, encryption at rest, RBAC, tenant isolation, audit, secure session.
- **SRS-NFR-04 Privacy:** retensi, ekspor, koreksi dan penghapusan mengikuti kebijakan/hukum.
- **SRS-NFR-05 Accessibility:** target WCAG 2.2 AA.
- **SRS-NFR-06 Compatibility:** browser modern pada desktop/tablet/mobile.
- **SRS-NFR-07 Reliability:** backup terjadwal, restore test, idempotency dan error handling.
- **SRS-NFR-08 Maintainability:** modular architecture, API contract, migrations, automated tests.
- **SRS-NFR-09 UI parity:** setiap route/state diuji dengan screenshot baseline.

## 10. Prioritas Requirement

- **Must:** auth, Today, People, Attendance, Rota, conflicts, Timesheets, Leave, Approvals, Settings/security, responsive UI.
- **Should:** Payroll, Recruitment, Onboarding, Performance, Analytics, global search dan help centre sesuai fase rilis yang disetujui.
- **Could:** integrasi tambahan, advanced reporting dan automasi di luar referensi setelah baseline stabil.

## 11. Traceability Matrix Ringkas

| Business Need | PRD | FRD | UIRD | Test domain |
|---|---|---|---|---|
| Daily staffing visibility | P-01 | FR-TOD | Today | Dashboard E2E |
| People master data | P-02 | FR-PEO | People | People CRUD/RBAC |
| Shift coverage | P-03/P-04 | FR-ATT/FR-ROT | Attendance/Rota | Rota conflict E2E |
| Leave governance | P-07/P-08 | FR-LEV/FR-APR | Leave/Approvals | Balance/approval E2E |
| Payroll preparation | P-09 | FR-PAY | Payroll | Payroll reconciliation |
| Hiring and onboarding | P-10/P-11 | FR-REC/FR-ONB | Recruitment/Onboarding | Candidate lifecycle E2E |
| People development | P-12 | FR-PER | Performance | Review/goal tests |
| Analytics | P-13 | FR-ANL | Analytics | Metric reconciliation |
| Reference fidelity | P-16/P-17/P-18 | FR-SEA/FR-SET | Global shell | Visual regression |

## 12. Acceptance Criteria Global

- Semua requirement Must yang disetujui lulus test.
- Seluruh journey utama dapat dijalankan tanpa manipulasi database manual.
- Data lintas modul konsisten dan terjaga oleh constraint.
- Hak akses diuji di backend.
- UI lolos sign-off terhadap reference baseline.
- Tidak ada defect Critical terbuka; defect Major pada alur Must ditutup atau di-waive tertulis.
- Backup, restore, monitoring, dan prosedur dukungan tersedia.

## 13. Hal yang Belum Dapat Dipastikan dari Demo Publik

- Pixel values, font family, exact component dimensions, route names, dan semua microcopy.
- Detail role bawaan dan matriks permission default.
- Kalkulasi payroll, definisi overtime, serta leave policy.
- Format file import/export rinci dan konektor vendor tertentu.
- Mekanisme attendance hardware atau mobile app mandiri.

Item tersebut harus dikonfirmasi melalui inspeksi visual/fungsional langsung dan discovery dengan pemilik produk; jangan mengisi kekosongan dengan asumsi yang dianggap fakta.
