# Quality Requirements Document (QRD)

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

## 2. Tujuan Kualitas

Menetapkan ukuran kualitas yang dapat diuji untuk menjaga kesesuaian UI, kebenaran data jadwal dan people, keamanan informasi personal, keandalan operasi, serta kemudahan penggunaan Rotela.

## 3. Quality Attributes dan Target

| ID | Aspek | Target awal | Metode verifikasi |
|---|---|---|---|
| QR-UI-01 | Visual fidelity | Semua route/state yang disetujui match dengan baseline | Screenshot overlay/pixel diff dan review |
| QR-UI-02 | Responsive | Tidak ada overlap/overflow yang merusak fungsi pada desktop, tablet, mobile | Device/viewport matrix |
| QR-UI-03 | Theme parity | Light/dark konsisten pada semua komponen | Visual regression |
| QR-FN-01 | Functional correctness | 100% acceptance test Must lulus | E2E dan UAT |
| QR-DAT-01 | Data integrity | Tidak ada orphan record atau perubahan tanpa audit untuk transaksi kritis | Constraint test dan audit validation |
| QR-SEC-01 | Authorization | 100% test matrix role/scope lulus | API security tests |
| QR-PERF-01 | Latency | p95 operasi umum ≤ 2.5 detik pada beban yang disepakati | Load test/APM |
| QR-AVL-01 | Availability | ≥ 99.5% per bulan | Monitoring uptime |
| QR-ACC-01 | Accessibility | Target WCAG 2.2 AA | Automated dan manual audit |
| QR-REC-01 | Recovery | RPO ≤ 24 jam; RTO ≤ 8 jam sebagai target awal | Restore drill |
| QR-COMP-01 | Compatibility | Browser modern terkini yang disepakati | Cross-browser tests |

Target adalah baseline rancangan dan harus difinalkan bersama pemilik sistem berdasarkan beban, biaya, dan ketentuan kontrak.

## 4. Kualitas Visual dan Konsistensi

- Seluruh halaman harus memiliki visual baseline sebelum implementasi dinyatakan selesai.
- Font, line-height, spacing, ukuran, warna, ikon, radius, shadow, border dan alignment tidak boleh berubah tanpa perubahan yang disetujui.
- Komponen bersama menggunakan design tokens sehingga seluruh modul konsisten.
- Perubahan global diuji ulang pada semua halaman terkait.
- Tidak boleh ada teks terpotong, overlap, overflow tidak disengaja, atau chart yang salah skala.
- Light/dark theme diuji pada setiap modul.

## 5. Kualitas Fungsional

- Rota dan attendance menghitung waktu dalam timezone yang benar.
- Conflict detection berjalan di server dan UI.
- Leave balance tidak berubah sebelum transaksi yang sah.
- Approval tidak dapat diproses dua kali secara tidak sengaja.
- Timesheet yang disetujui dan payroll yang difinalisasi memiliki snapshot/jejak yang konsisten.
- Candidate stage movement dan onboarding completion tercatat.
- Error message harus memberi tindakan perbaikan yang jelas.

## 6. Kualitas Data

- Employee identifier unik per organisasi.
- Referential integrity untuk shift, assignment, employee, department, timesheet dan payroll.
- Tidak ada duplikasi event eksternal ketika webhook dikirim berulang.
- Angka dashboard harus konsisten dengan data detail setelah filter dan timezone diterapkan.
- Payroll total dapat direkonsiliasi dengan line items.
- Semua perubahan data penting dapat ditelusuri ke actor dan timestamp.

## 7. Keamanan dan Privasi

- Tidak ada akses lintas tenant.
- Employee tidak dapat melihat data kompensasi/review karyawan lain.
- Department manager hanya dapat mengakses lingkup yang ditugaskan.
- Payroll/payslip dibatasi role dan pemilik record.
- Data terenkripsi saat transit dan saat tersimpan.
- Tidak ada secret di source code/log/browser.
- Audit trail untuk akses/ubah yang sensitif.
- Upload divalidasi jenis, ukuran dan malware scanning bila tersedia.
- Dependency dan container image dipindai secara berkala.

## 8. Usability

- Pengguna dapat menyelesaikan tugas utama tanpa instruksi eksternal setelah onboarding singkat.
- Istilah, label, ikon dan pola navigasi konsisten.
- State pending, approved, rejected, late dan conflict dapat dibedakan dengan teks/ikon selain warna.
- Aksi destruktif memiliki confirmation.
- Form mempertahankan input jika validasi gagal, bila aman.
- Search dan filter menunjukkan hasil kosong dengan pesan yang jelas.

## 9. Accessibility

- Kontras teks minimal sesuai WCAG 2.2 AA.
- Semua kontrol mempunyai accessible name.
- Navigasi keyboard tersedia untuk modal, menu, tab, tabel dan board.
- Drag-and-drop memiliki alternatif non-pointer.
- Focus trap dan focus return pada modal berfungsi.
- Chart memiliki ringkasan/alternative text atau tabel data bila diperlukan.
- Reduced motion dihormati.

## 10. Reliability dan Recovery

- Error jaringan tidak boleh menyebabkan mutasi ganda.
- Kegagalan job email/export tidak boleh menggagalkan transaksi inti.
- Backup dan restore diuji.
- Monitoring mengirim alert untuk anomali yang berdampak pada proses payroll atau jadwal.
- Deployment menyediakan rollback dan kompatibilitas migration.

## 11. Testing & Quality Gates

| Gate | Kriteria lulus |
|---|---|
| Code quality | Lint, typecheck, build dan dependency scan lulus |
| Unit | Semua unit test kritis lulus; coverage target modul domain ≥ 80% |
| Integration | API, database transaction, RBAC dan adapter lulus |
| E2E | Semua journey Must lulus pada staging |
| Visual | Semua screenshot approved dibandingkan; defect major/critical = 0 |
| Accessibility | Tidak ada pelanggaran critical/serious pada audit terpilih; manual keyboard check lulus |
| Security | Tidak ada critical/high yang belum dimitigasi |
| Performance | p95 dan throughput memenuhi target beban yang disepakati |
| UAT | Business owner menandatangani skenario utama |

## 12. Defect Severity

- **Critical:** data bocor, payroll salah material, seluruh sistem tidak dapat dipakai, atau mutasi data tidak dapat dipulihkan.
- **Major:** fungsi utama gagal, konflik shift tidak terdeteksi, approval salah, atau visual menyimpang besar dari acuan.
- **Minor:** masalah UI/teks/format yang tidak menghalangi tugas utama.
- **Trivial:** perbedaan kosmetik kecil yang tidak terlihat berdampak pada penggunaan.

Release tidak boleh dilakukan dengan defect Critical terbuka. Defect Major pada alur Must atau fidelity UI harus ditutup atau mendapat waiver tertulis.

## 13. Quality Acceptance

Kualitas produk diterima setelah semua quality gate lulus, tidak ada pelanggaran akses kritis, data transaksi dapat direkonsiliasi, backup dapat dipulihkan, pengguna bisnis menyetujui UAT, dan UI telah disign-off terhadap referensi untuk viewport serta state yang disepakati.
