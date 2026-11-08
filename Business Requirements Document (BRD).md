# Business Requirements Document (BRD)

## 1. Informasi Dokumen

| Atribut | Nilai |
|---|---|
| Produk | Rotela — People & Shift Management |
| Versi | 1.0 |
| Status | Draft baseline |
| Tanggal | 8 November 2026 |

> **Catatan sumber dan ketepatan acuan**  
> Tautan yang diberikan dalam permintaan mengarah ke `https://demo.codeandchill.store/rotela/`. Halaman tersebut mengidentifikasi produk sebagai **Rotela — the people desk of Saltwick Hotels**, yaitu aplikasi HR dan staff rota untuk hotel serta tim kerja berbasis shift. Teks label tautan pengguna menyebut `konveksi.toko-abi.com`, tetapi alamat tujuan sebenarnya bukan situs konveksi. Paket dokumen ini mengikuti **alamat URL tujuan (Rotela)**. Apabila yang dimaksud benar-benar sistem konveksi, seluruh paket perlu disusun ulang menggunakan URL konveksi yang benar.  
> Demo publik mengharuskan JavaScript untuk berjalan; daftar modul dan perilaku fungsional di bawah disusun dari halaman demo yang tersedia serta deskripsi produk resmi Rotela. Detail piksel, warna, font, urutan kontrol, microcopy, dan isi setiap record harus dikunci melalui inspeksi visual langsung terhadap seluruh layar demo sebelum dinyatakan lulus verifikasi 100%.  
> Sumber: [Demo Rotela](https://demo.codeandchill.store/rotela/) · [Deskripsi resmi template Rotela](https://codeandchill.store/templates/rotela) · Tanggal pemeriksaan: 8 November 2026.

## 2. Tujuan Bisnis

Membangun sistem operasional people management yang menyatukan data tenaga kerja dan aktivitas harian untuk organisasi berbasis shift. Sistem diharapkan mengurangi duplikasi administrasi, mempercepat keputusan manajer, meningkatkan kualitas data kehadiran dan payroll preparation, serta menyediakan audit trail untuk perubahan penting.

## 3. Sasaran Bisnis

| ID | Sasaran | Ukuran |
|---|---|---|
| BR-01 | Satu sumber data karyawan | Rasio profil aktif yang memiliki data wajib lengkap |
| BR-02 | Roster lebih efisien | Durasi pembuatan roster dan jumlah edit setelah publikasi |
| BR-03 | Cakupan shift lebih baik | Jumlah shift kosong, benturan dan shift tanpa penanggung jawab |
| BR-04 | Persetujuan tertib | SLA approval dan permintaan yang melewati SLA |
| BR-05 | Payroll preparation akurat | Jumlah anomali timesheet dan koreksi payroll |
| BR-06 | Proses rekrutmen terukur | Waktu per tahap dan conversion kandidat |
| BR-07 | Pengembangan karyawan terdokumentasi | Kelengkapan review dan sasaran aktif |

## 4. Lingkup Bisnis

### 4.1 In Scope
- Pengelolaan perusahaan, departemen, jabatan, lokasi (bila dikonfigurasi), dan role.
- Pengelolaan karyawan dan organizational chart.
- Dashboard operasi harian dan live floor board.
- Roster/shift mingguan, pengecekan benturan dan cuti.
- Attendance dan timesheet.
- Cuti, kalender, saldo, shift swap, dan overtime approval.
- Payroll run, payslip, dan pay history.
- Performance reviews, goals, dan kudos.
- Job openings, kandidat, hiring pipeline, dan onboarding.
- People analytics, settings, notification, dan help centre.

### 4.2 Out of Scope untuk Baseline
- Hotel Property Management System, reservasi kamar, POS, inventory, purchasing, dan accounting ledger.
- Transfer uang atau instruksi bank otomatis; payslip dan pay history tidak otomatis membuktikan pembayaran bank telah dilakukan.
- Perhitungan pajak dan kepatuhan payroll lintas negara tanpa modul hukum yang divalidasi.
- Biometrik, GPS, face recognition, atau hardware clock terminal yang tidak ditampilkan pada referensi.

## 5. Pemangku Kepentingan

| Stakeholder | Tanggung jawab |
|---|---|
| Sponsor / Owner | Menetapkan tujuan, anggaran, kebijakan dan keputusan go-live |
| HR Lead | Pemilik proses data people, leave, hiring, onboarding, performance |
| Operations Lead | Pemilik roster, attendance dan cakupan shift |
| Payroll Lead | Validasi komponen payroll, periode, payslip dan rekonsiliasi |
| Department Manager | Menyusun shift, memantau kehadiran, dan memproses approval |
| Employee | Melihat data sendiri dan mengirim permintaan |
| IT / Security | Infrastruktur, akses, integrasi, backup dan keamanan |

## 6. Proses Bisnis Target

### 6.1 People Lifecycle

1. HR membuat lowongan pada Hiring.
2. Recruiter membuat dan memelihara kandidat dalam pipeline.
3. Kandidat yang diterima diubah atau ditautkan menjadi employee record.
4. HR menetapkan departemen, jabatan, atasan, tanggal mulai, dan checklist onboarding.
5. Karyawan aktif muncul pada people directory serta dapat dimasukkan ke roster.
6. Review, goals, kudos, perubahan status, dan offboarding (jika dikonfigurasi) dicatat pada profil.

### 6.2 Daily Operations

1. Sistem menyusun ringkasan jadwal hari ini per jam dan departemen.
2. Dashboard menampilkan staf aktif, terlambat, belum hadir, kebutuhan headcount, approvals, hiring, dan starters.
3. Manajer membuka live floor board untuk melihat siapa yang berada pada status kerja tertentu.
4. Pengecualian ditindaklanjuti oleh manajer yang berwenang; tindakan dicatat.

### 6.3 Rota Planning

1. Manajer memilih minggu dan departemen.
2. Manajer membuat, mengubah, memindahkan, atau menyalin shift.
3. Sistem memeriksa konflik antarshift, overlap, dan cuti yang sudah disetujui.
4. Sistem memperingatkan konflik sebelum jadwal disimpan atau dipublikasikan.
5. Jadwal dipublikasikan dan tersedia pada tampilan/akses yang relevan.
6. Perubahan setelah publikasi tercatat dan dapat memicu notifikasi.

### 6.4 Leave, Swap, dan Overtime

1. Karyawan membuat permintaan dengan jenis, rentang tanggal/waktu, dan alasan bila diwajibkan.
2. Sistem memvalidasi saldo, kebijakan, overlap jadwal, dan kelengkapan.
3. Permintaan masuk ke approvals queue sesuai approver.
4. Approver menyetujui, menolak, atau meminta revisi dengan catatan.
5. Keputusan memperbarui status permintaan, saldo/kalender atau roster sesuai jenis transaksi.
6. Sistem mencatat waktu, pelaku, status lama/baru, serta komentar.

### 6.5 Attendance dan Timesheet

1. Data kehadiran masuk melalui input manual atau integrasi time-clock yang disetujui.
2. Sistem membandingkan jadwal dengan catatan aktual.
3. Catatan terlambat, absen, missing punch, dan overtime ditandai untuk review.
4. Manajer memperbaiki atau menyetujui timesheet dengan alasan.
5. Timesheet yang telah disetujui menjadi sumber data payroll preparation.

### 6.6 Payroll

1. Payroll administrator memilih periode bulanan.
2. Sistem mengumpulkan data karyawan, timesheet, komponen pendapatan/potongan, dan penyesuaian yang tersedia.
3. Anomali atau data belum lengkap ditampilkan untuk rekonsiliasi.
4. Payroll run dihitung berdasarkan aturan yang telah dikonfigurasi dan diberi status.
5. Payslip dibuat, disimpan, dicetak, dan aksesnya dibatasi.
6. Pay history menyimpan ringkasan periode dan status.

**Kontrol penting:** kalkulasi pajak, tunjangan, lembur, dan potongan harus divalidasi terhadap aturan yurisdiksi pelanggan. Jika mesin kalkulasi legal tidak termasuk, sistem menandai data sebagai payroll preparation dan menyediakan ekspor ke sistem payroll yang berwenang.

## 7. Kebutuhan Bisnis

| ID | Pernyataan kebutuhan bisnis | Prioritas |
|---|---|---|
| BRQ-001 | Perusahaan memiliki sumber data karyawan yang terpusat | Must |
| BRQ-002 | Manajer memiliki visibilitas staf per jam dan departemen | Must |
| BRQ-003 | Penjadwalan harus mendeteksi shift clash dan konflik cuti | Must |
| BRQ-004 | Approval leave, swap dan overtime harus terpusat | Must |
| BRQ-005 | Timesheet harus dapat ditinjau sebelum payroll run | Must |
| BRQ-006 | Payslip dan riwayat payroll dapat diakses sesuai otorisasi | Must |
| BRQ-007 | Pipeline hiring dan onboarding harus terdokumentasi | Must |
| BRQ-008 | Review, goals dan kudos mendukung proses pengembangan people | Should |
| BRQ-009 | Laporan people dan operasional dapat dianalisis | Should |
| BRQ-010 | Pengaturan role, appearance dan notifikasi tersedia | Must |
| BRQ-011 | Semua perubahan sensitif dapat diaudit | Must |
| BRQ-012 | Data pelanggan dapat diekspor dalam format terbuka | Should |

## 8. Kebijakan dan Aturan Bisnis

- **BB-01:** setiap karyawan aktif memiliki satu employee identifier unik per organisasi.
- **BB-02:** setiap shift memiliki tanggal, waktu mulai, waktu selesai, departemen/lokasi, dan status.
- **BB-03:** sistem menolak atau memberi hard warning pada benturan shift sesuai konfigurasi kebijakan.
- **BB-04:** cuti yang disetujui harus diperhitungkan pada saldo dan validasi roster.
- **BB-05:** perubahan timesheet setelah approval memerlukan otorisasi dan alasan.
- **BB-06:** satu periode payroll tidak boleh diproses ganda tanpa mekanisme reopen/void yang diaudit.
- **BB-07:** payslip hanya dapat diakses pemilik payslip dan role payroll/HR yang diotorisasi.
- **BB-08:** perubahan data sensitif harus merekam actor, timestamp, record, dan nilai sebelum/sesudah.
- **BB-09:** hak akses minimum mengikuti prinsip least privilege.
- **BB-10:** aturan cuti, lembur, jam kerja, dan payroll bersifat configurable per perusahaan dan tidak boleh dikodekan sebagai asumsi tunggal.

## 9. Role Bisnis dan Hak Akses Konseptual

| Role | Akses utama |
|---|---|
| Owner / Admin | Seluruh perusahaan, pengaturan, role dan analytics |
| HR Admin | People, leave policy, hiring, onboarding, performance; payroll sesuai izin |
| Operations Manager | Today, attendance, rota dan approval sesuai area |
| Department Manager | Data dan jadwal departemen yang menjadi tanggung jawabnya |
| Recruiter | Open roles, kandidat, interview notes dan onboarding handoff |
| Payroll Admin | Timesheet yang disetujui, payroll runs, payslip dan pay history |
| Employee | Profil sendiri, jadwal sendiri, permintaan, payslip/review sesuai kebijakan |

Role aktual pada implementasi harus dapat disesuaikan pada Settings > Roles. Tabel ini merupakan baseline izin, bukan klaim nama role persis pada UI demo.

## 10. Data dan Pelaporan Bisnis

### Data inti
Organization, user, role, permission, employee, department, job title, manager relationship, shift, rota, attendance, timesheet, leave type, leave balance, leave request, shift swap, overtime request, approval, payroll period, payroll run, payslip, pay history, job opening, candidate, recruitment stage, onboarding checklist, review, goal, kudos, notification, audit event.

### Laporan minimum
- Headcount aktif per departemen.
- Staffing coverage per jam dan hari.
- Shift terbuka, shift clash, dan jadwal yang belum dipublikasikan.
- Attendance summary dan daftar pengecualian.
- Timesheet completion serta perubahan setelah approval.
- Leave taken, remaining balance dan permintaan pending.
- Payroll run summary dan pay history.
- Hiring pipeline dan waktu pada tiap tahap.
- Onboarding checklist completion.
- Review dan goal completion.

## 11. KPI dan Definisi

| KPI | Rumus / definisi |
|---|---|
| Roster preparation time | Durasi dari mulai membuat hingga jadwal siap dipublikasikan |
| Shift coverage rate | Shift terisi ÷ total shift yang direncanakan × 100% |
| Attendance exception rate | Shift dengan exception ÷ total shift yang berjalan × 100% |
| Approval SLA | Waktu dari submitted_at sampai decision_at |
| Timesheet completeness | Shift dengan catatan aktual lengkap ÷ shift yang selesai × 100% |
| Hiring stage duration | Median waktu kandidat berada pada satu tahap |
| Onboarding completion | Checklist selesai ÷ checklist wajib × 100% |

## 12. Kepatuhan, Privasi, dan Retensi

- Perusahaan bertanggung jawab menetapkan dasar pemrosesan, tujuan, retensi, dan hak akses data personal.
- Sistem harus mendukung data access/export, koreksi, dan penghapusan sesuai ketentuan yang berlaku.
- Dokumen identitas, kompensasi, payslip, catatan review dan alasan cuti memerlukan akses terbatas.
- Data demo tidak boleh dicampur dengan data pelanggan.
- Lokasi penyimpanan, backup, retensi, dan subprocessor harus diumumkan serta disetujui sesuai kontrak.
- Ketentuan hukum ketenagakerjaan, pajak, dan perlindungan data diperiksa untuk yurisdiksi deployment sebelum produksi.

## 13. Kriteria Penerimaan Bisnis

- Proses bisnis people lifecycle, rota, leave, attendance, payroll preparation, hiring, dan onboarding berjalan end-to-end.
- Data antarhalaman konsisten dan tidak perlu dimasukkan ulang tanpa alasan.
- KPI utama dapat dihasilkan dari data sumber yang sama.
- Tidak ada role yang dapat melihat data kompensasi atau personal di luar wewenangnya.
- Aktivitas penting memiliki audit trail.
- Pimpinan dapat mengekspor data operasional tanpa vendor lock-in.

## 14. Risiko dan Dependensi

Kebutuhan terpenting sebelum go-live: pemilik kebijakan payroll dan cuti; definisi struktur organisasi; kualitas data awal; daftar integrasi; kebijakan persetujuan; serta keputusan hosting, retensi dan lokasi data.
