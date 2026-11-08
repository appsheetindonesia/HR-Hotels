# Functional Requirements Document (FRD)

## 1. Informasi Dokumen

| Atribut | Nilai |
|---|---|
| Produk | Rotela — People & Shift Management |
| Versi | 1.0 |
| Tanggal | 8 November 2026 |
| Status | Draft baseline |

> **Catatan sumber dan ketepatan acuan**  
> Tautan yang diberikan dalam permintaan mengarah ke `https://demo.codeandchill.store/rotela/`. Halaman tersebut mengidentifikasi produk sebagai **Rotela — the people desk of Saltwick Hotels**, yaitu aplikasi HR dan staff rota untuk hotel serta tim kerja berbasis shift. Teks label tautan pengguna menyebut `konveksi.toko-abi.com`, tetapi alamat tujuan sebenarnya bukan situs konveksi. Paket dokumen ini mengikuti **alamat URL tujuan (Rotela)**. Apabila yang dimaksud benar-benar sistem konveksi, seluruh paket perlu disusun ulang menggunakan URL konveksi yang benar.  
> Demo publik mengharuskan JavaScript untuk berjalan; daftar modul dan perilaku fungsional di bawah disusun dari halaman demo yang tersedia serta deskripsi produk resmi Rotela. Detail piksel, warna, font, urutan kontrol, microcopy, dan isi setiap record harus dikunci melalui inspeksi visual langsung terhadap seluruh layar demo sebelum dinyatakan lulus verifikasi 100%.  
> Sumber: [Demo Rotela](https://demo.codeandchill.store/rotela/) · [Deskripsi resmi template Rotela](https://codeandchill.store/templates/rotela) · Tanggal pemeriksaan: 8 November 2026.

## 2. Tujuan

Mendefinisikan fungsi sistem secara rinci beserta input, proses, output, validasi, alur alternatif, dan aturan akses. Requirement di bawah menjadi acuan implementasi dan test case.

## 3. Aktor Sistem

Owner/Admin, HR Admin, Operations Manager, Department Manager, Payroll Admin, Recruiter, Employee, serta external integration service. Hak akses harus diterapkan pada server/API, bukan hanya menyembunyikan tombol di frontend.

## 4. Functional Requirements

### 4.1 Authentication, Session & Access

| ID | Requirement | Acceptance |
|---|---|---|
| FR-AUTH-001 | Pengguna dapat login dengan kredensial yang valid | Session dibuat dan diarahkan sesuai role |
| FR-AUTH-002 | Pengguna dapat logout | Session/token dinonaktifkan |
| FR-AUTH-003 | Sistem membatasi akses berdasarkan role dan scope organisasi | Request di luar izin ditolak server |
| FR-AUTH-004 | Sistem menyediakan password reset/invitation sesuai konfigurasi | Token reset sekali pakai dan kedaluwarsa |
| FR-AUTH-005 | Session memiliki expiry dan mekanisme revoke | Session tidak dapat digunakan setelah revoke |

### 4.2 Today Dashboard

| ID | Requirement | Acceptance |
|---|---|---|
| FR-TOD-001 | Menampilkan ringkasan staf yang sedang bekerja/bertugas | Data sesuai tanggal, shift dan timezone |
| FR-TOD-002 | Menampilkan staffing per jam dan departemen | Timeline mengikuti shift aktif pada periode |
| FR-TOD-003 | Menampilkan approvals, attendance, headcount, hiring dan starters | Angka sesuai sumber data modul |
| FR-TOD-004 | Menandai late dan missing people | Status ditentukan oleh shift dan attendance record |
| FR-TOD-005 | Menyediakan chase action untuk late/missing | Aksi tercatat, target dan waktu tindak lanjut tersimpan |
| FR-TOD-006 | Filter dashboard sesuai organisasi/departemen/role | Pengguna tidak melihat data di luar scope |

### 4.3 People Directory & Profile

| ID | Requirement | Acceptance |
|---|---|---|
| FR-PEO-001 | Membuat employee record | ID unik dan field wajib tervalidasi |
| FR-PEO-002 | Melihat daftar people | Pencarian, filter dan sort konsisten |
| FR-PEO-003 | Mengubah data profil | Perubahan tersimpan dan diaudit |
| FR-PEO-004 | Mengarsipkan/nonaktifkan karyawan | Record historis tetap terhubung ke transaksi lama |
| FR-PEO-005 | Menampilkan org chart | Hubungan manager/reporting tervisualisasi |
| FR-PEO-006 | Mengelola department | Departemen dapat dibuat/diubah sesuai izin |
| FR-PEO-007 | Mencegah duplikasi employee identifier | Duplikat ditolak dengan pesan yang jelas |

### 4.4 Attendance & Live Floor Board

| ID | Requirement | Acceptance |
|---|---|---|
| FR-ATT-001 | Menampilkan roster dan status kehadiran aktual | Perbandingan jadwal vs catatan aktual tersedia |
| FR-ATT-002 | Menampilkan live floor board | Filter dan data status sesuai waktu aktif |
| FR-ATT-003 | Menandai late, absent, missing punch dan exception | Aturan status dapat dikonfigurasi |
| FR-ATT-004 | Memungkinkan manager menindaklanjuti exception | Setiap tindak lanjut memiliki actor dan timestamp |
| FR-ATT-005 | Menerima catatan attendance dari adapter eksternal | Data tervalidasi dan idempotent |

### 4.5 Rota / Shift Scheduling

| ID | Requirement | Acceptance |
|---|---|---|
| FR-ROT-001 | Menampilkan rota mingguan | Minggu dan staf/departemen yang dipilih tampil tepat |
| FR-ROT-002 | Membuat shift | Tanggal, waktu, person, department dan field wajib tervalidasi |
| FR-ROT-003 | Mengedit/menghapus shift | Perubahan hanya oleh role berwenang dan tercatat |
| FR-ROT-004 | Memindahkan shift dengan drag-and-drop | Drop memperbarui penugasan setelah validasi |
| FR-ROT-005 | Memeriksa overlap/benturan shift | Konflik dideteksi pada waktu penyimpanan dan publikasi |
| FR-ROT-006 | Memeriksa approved leave | Penempatan pada periode cuti menghasilkan peringatan/penolakan sesuai policy |
| FR-ROT-007 | Mengelola draft dan publish | Hanya jadwal yang dipublikasikan menjadi jadwal resmi |
| FR-ROT-008 | Menyimpan histori perubahan rota | Versi lama dan perubahan dapat ditelusuri |
| FR-ROT-009 | Memungkinkan pembatalan/undo tindakan bila tersedia pada UI reference | State kembali konsisten dan tidak menggandakan shift |

**Validasi konflik minimal:** overlap untuk karyawan yang sama; waktu selesai sebelum/waktu mulai; shift ganda; approved leave; status employment; dan aturan jam minimum/maximum bila dikonfigurasi. Konflik hanya dapat di-override role khusus dengan alasan dan audit event.

### 4.6 Timesheets

| ID | Requirement | Acceptance |
|---|---|---|
| FR-TIM-001 | Menyusun timesheet dari planned shift dan actual time record | Jumlah jam sesuai aturan break/timezone |
| FR-TIM-002 | Menampilkan catatan yang tidak lengkap | Missing punch terlihat pada queue |
| FR-TIM-003 | Mengoreksi actual time | Memerlukan izin dan alasan koreksi |
| FR-TIM-004 | Mengirim timesheet untuk approval | Status berubah dan approver mendapat notifikasi |
| FR-TIM-005 | Menyetujui/menolak timesheet | Keputusan tercatat dan mengunci state sesuai policy |
| FR-TIM-006 | Mengekspor timesheet | CSV memiliki kolom konsisten dan encoding yang benar |

### 4.7 Leave, Calendar & Balances

| ID | Requirement | Acceptance |
|---|---|---|
| FR-LEV-001 | Mengelola leave type dan entitlement | Policy dapat diatur oleh admin |
| FR-LEV-002 | Mengajukan leave | Tanggal, tipe, alasan dan dokumen tervalidasi |
| FR-LEV-003 | Menampilkan leave calendar | Pending/approved/rejected dibedakan |
| FR-LEV-004 | Menghitung remaining balance | Rumus sesuai policy dan transaksi terkait |
| FR-LEV-005 | Memvalidasi saldo dan overlap | Pengajuan invalid ditolak atau ditandai sesuai policy |
| FR-LEV-006 | Memperbarui balance setelah keputusan | Hanya transaksi approved memengaruhi saldo sesuai aturan |

### 4.8 Shift Swap & Overtime

| ID | Requirement | Acceptance |
|---|---|---|
| FR-SWP-001 | Karyawan/manajer dapat membuat permintaan swap | Shift asal dan pengganti tervalidasi |
| FR-SWP-002 | Sistem memeriksa kelayakan penerima swap | Tidak ada overlap atau konflik leave |
| FR-OT-001 | Membuat permintaan overtime | Periode dan alasan tersedia |
| FR-OT-002 | Mengirim swap/overtime ke approval queue | Approver sesuai policy |
| FR-APR-001 | Approver dapat approve/reject/request changes | Status, komentar, actor dan timestamp disimpan |

### 4.9 Payroll & Payslip

| ID | Requirement | Acceptance |
|---|---|---|
| FR-PAY-001 | Membuat payroll period dan monthly pay run | Periode unik dan parameter jelas |
| FR-PAY-002 | Mengumpulkan payroll input | Sumber data dan cutoff tercatat |
| FR-PAY-003 | Menandai data yang belum lengkap | Run tidak difinalisasi tanpa penyelesaian/override berizin |
| FR-PAY-004 | Menghitung payroll berdasarkan configured rules/provider | Hasil dapat direkonsiliasi dan diuji |
| FR-PAY-005 | Membuat payslip tiap karyawan yang memenuhi syarat | Detail sesuai hasil payroll run |
| FR-PAY-006 | Mencetak/unduh payslip | Format print tidak terpotong dan akses terbatas |
| FR-PAY-007 | Menampilkan pay history | Periode, status dan ringkasan konsisten |
| FR-PAY-008 | Mencegah finalisasi ganda | Idempotency dan lock per periode diterapkan |

### 4.10 Performance — Reviews, Goals & Kudos

| ID | Requirement | Acceptance |
|---|---|---|
| FR-PER-001 | Membuat review cycle | Periode, peserta dan reviewer ditetapkan |
| FR-PER-002 | Menyimpan review | Status draft/submitted/completed sesuai alur |
| FR-PER-003 | Membuat dan memantau goals | Owner, due date dan progress tersedia |
| FR-PER-004 | Memberikan kudos | Pengirim, penerima, waktu dan visibilitas tersimpan |

### 4.11 Recruitment

| ID | Requirement | Acceptance |
|---|---|---|
| FR-REC-001 | Membuat/mengubah open role | Jabatan dan status tervalidasi |
| FR-REC-002 | Membuat kandidat | Data kontak dan sumber kandidat tersimpan |
| FR-REC-003 | Menampilkan hiring board | Kandidat dikelompokkan berdasarkan pipeline stage |
| FR-REC-004 | Memindahkan kandidat antar-stage | Drag/drop dan alternatif menu bekerja; histori tahap tersimpan |
| FR-REC-005 | Menutup lowongan | Status closed dan perubahan tidak menghilangkan historis kandidat |
| FR-REC-006 | Mengubah kandidat menjadi employee | Data ditransfer tanpa duplikasi dan melalui verifikasi HR |

### 4.12 Onboarding

| ID | Requirement | Acceptance |
|---|---|---|
| FR-ONB-001 | Membuat checklist template | Item, urutan dan owner dapat ditentukan |
| FR-ONB-002 | Menugaskan checklist ke starter | Due date dan assignee tersedia |
| FR-ONB-003 | Menandai item selesai | Actor, waktu dan bukti bila diperlukan disimpan |
| FR-ONB-004 | Menampilkan progress onboarding | Progress berdasarkan item wajib selesai |

### 4.13 Analytics

| ID | Requirement | Acceptance |
|---|---|---|
| FR-ANL-001 | Menampilkan people analytics | Angka berasal dari data operasional |
| FR-ANL-002 | Memfilter periode/departemen | Semua widget mengikuti filter yang sama |
| FR-ANL-003 | Drill-down ke daftar sumber bila diizinkan | Hak akses tetap diterapkan |
| FR-ANL-004 | Mengekspor laporan jika tersedia pada scope | File sesuai filter dan periode |

### 4.14 Settings, Search & Help

| ID | Requirement | Acceptance |
|---|---|---|
| FR-SET-001 | Mengelola company settings | Validasi dan audit untuk perubahan kritis |
| FR-SET-002 | Mengelola roles dan permissions | Perubahan izin diterapkan pada server/API |
| FR-SET-003 | Mengubah appearance | Light/dark theme konsisten dan dipersistenkan |
| FR-SET-004 | Mengelola notification preferences | Pengaturan channel dan jenis event bekerja |
| FR-SEA-001 | Membuka global search dengan Cmd+K | Finder muncul dan keyboard navigation berfungsi |
| FR-SEA-002 | Mencari halaman dan record yang diizinkan | Hasil menghormati akses pengguna |
| FR-HLP-001 | Menampilkan FAQ | Pertanyaan dan jawaban dapat dinavigasi |
| FR-HLP-002 | Mengirim question form | Input tervalidasi dan menghasilkan confirmation |

## 5. Validasi Umum

- Field wajib tidak boleh kosong.
- Format tanggal, waktu, email, angka dan mata uang divalidasi.
- Waktu memakai timezone organisasi/lokasi dan menangani pergantian daylight saving bila relevan.
- Data yang telah dipakai transaksi tidak boleh dihapus secara hard delete tanpa proses khusus.
- Mutasi penting menyertakan actor, timestamp, organization scope dan correlation/request ID.
- Konflik concurrent update harus ditangani dengan optimistic locking atau mekanisme setara.

## 6. Status dan Workflow

Status yang digunakan harus konsisten dengan istilah UI reference. Secara internal, gunakan state machine eksplisit untuk Shift, LeaveRequest, Approval, Timesheet, PayrollRun, Candidate dan OnboardingTask. Setiap perpindahan state harus didefinisikan, memiliki guard, dan dapat diaudit.

## 7. Output dan Integrasi

- CSV export untuk data timesheet/report yang disetujui.
- Printable payslip.
- Notification event.
- Import/export terstruktur untuk data awal dan integrasi HR/payroll/time-clock.
- API harus mendokumentasikan schema, authorization, error response, pagination dan versioning.

## 8. Acceptance Test Utama

- Buat karyawan → tempatkan ke departemen → buat shift → publish → tampil di Today.
- Buat leave request → approve → saldo berubah → rota memberi leave conflict.
- Geser shift → sistem mendeteksi overlap → penjadwalan tidak publish sebelum konflik diselesaikan/di-override.
- Attendance exception → koreksi dengan alasan → timesheet review → approved → masuk payroll input.
- Payroll run → payslip → print → pay history.
- Open role → candidate → stage movement → hired → onboarding checklist.
- Verifikasi employee hanya melihat data pribadi dan manajer hanya melihat scope yang diizinkan.
