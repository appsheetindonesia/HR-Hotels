# Customer Requirements Document (CRD)

## 1. Informasi Dokumen

| Atribut | Nilai |
|---|---|
| Produk | Rotela — People & Shift Management |
| Versi dokumen | 1.0 |
| Status | Draft baseline |
| Tanggal | 8 November 2026 |

> **Catatan sumber dan ketepatan acuan**  
> Tautan yang diberikan dalam permintaan mengarah ke `https://demo.codeandchill.store/rotela/`. Halaman tersebut mengidentifikasi produk sebagai **Rotela — the people desk of Saltwick Hotels**, yaitu aplikasi HR dan staff rota untuk hotel serta tim kerja berbasis shift. Teks label tautan pengguna menyebut `konveksi.toko-abi.com`, tetapi alamat tujuan sebenarnya bukan situs konveksi. Paket dokumen ini mengikuti **alamat URL tujuan (Rotela)**. Apabila yang dimaksud benar-benar sistem konveksi, seluruh paket perlu disusun ulang menggunakan URL konveksi yang benar.  
> Demo publik mengharuskan JavaScript untuk berjalan; daftar modul dan perilaku fungsional di bawah disusun dari halaman demo yang tersedia serta deskripsi produk resmi Rotela. Detail piksel, warna, font, urutan kontrol, microcopy, dan isi setiap record harus dikunci melalui inspeksi visual langsung terhadap seluruh layar demo sebelum dinyatakan lulus verifikasi 100%.  
> Sumber: [Demo Rotela](https://demo.codeandchill.store/rotela/) · [Deskripsi resmi template Rotela](https://codeandchill.store/templates/rotela) · Tanggal pemeriksaan: 8 November 2026.

## 2. Tujuan Dokumen

Mendefinisikan kebutuhan, masalah, harapan, dan kriteria penerimaan dari pihak yang menggunakan atau mengelola aplikasi Rotela. Kebutuhan ditulis berdasarkan peran pengguna, bukan berdasarkan desain database atau pilihan teknologi.

## 3. Kelompok Pelanggan dan Persona

### 3.1 Owner / General Manager

- **Tujuan:** mengetahui kondisi tenaga kerja, biaya dan kesiapan operasional secara menyeluruh.
- **Kebutuhan:** dashboard lintas departemen, headcount, status hiring, laporan people, konfigurasi perusahaan, serta akses seluruh unit yang menjadi tanggung jawabnya.
- **Masalah:** laporan datang terlambat dan data dari tiap kepala departemen berbeda format.
- **Kriteria sukses:** dapat melihat kondisi hari ini dan tren tenaga kerja tanpa mengumpulkan spreadsheet manual.

### 3.2 HR / People Administrator

- **Tujuan:** menjaga data karyawan, cuti, onboarding, payroll preparation, dan siklus review tetap tertib.
- **Kebutuhan:** direktori, profil, departemen, struktur organisasi, saldo cuti, persetujuan, payroll run, payslip, hiring, onboarding, dan pengaturan kebijakan.
- **Masalah:** data karyawan ganda, dokumen tidak lengkap, permintaan terlewat, dan histori sulit ditelusuri.
- **Kriteria sukses:** satu record karyawan menjadi rujukan utama dan setiap perubahan penting memiliki jejak audit.

### 3.3 Department Manager / Supervisor

- **Tujuan:** memastikan jumlah staf yang tepat tersedia pada jam dan departemen yang tepat.
- **Kebutuhan:** Today dashboard, live floor board, roster mingguan, attendance, timesheets, approval queue, dan tombol tindak lanjut terhadap staf terlambat atau belum hadir.
- **Masalah:** perubahan jadwal mendadak, benturan shift, kekurangan personel, dan informasi absensi tidak real-time.
- **Kriteria sukses:** dapat menyusun roster, mengetahui gap, menyelesaikan pengecualian, dan menyetujui permintaan dengan cepat.

### 3.4 Employee / Team Member

- **Tujuan:** mengetahui jadwalnya, melihat catatan kerja, mengajukan cuti atau pertukaran shift, serta mengetahui keputusan permintaan.
- **Kebutuhan:** profil sendiri, jadwal, kalender, saldo cuti, permintaan, payslip yang diizinkan, goals/reviews, dan notifikasi.
- **Masalah:** tidak yakin jadwal terbaru, status pengajuan tidak jelas, atau koreksi data memerlukan banyak perantara.
- **Kriteria sukses:** informasi pribadi mudah ditemukan dan status setiap pengajuan dapat dipantau.

### 3.5 Recruiter / Hiring Manager

- **Tujuan:** mengelola kandidat dan lowongan sampai kandidat siap bekerja.
- **Kebutuhan:** open roles, candidate pipeline, detail kandidat, perpindahan kandidat antar tahap, serta checklist onboarding.
- **Masalah:** status kandidat tidak konsisten dan proses transisi dari kandidat menjadi karyawan tidak terdokumentasi.
- **Kriteria sukses:** pipeline selalu menunjukkan tahap terakhir dan kandidat yang diterima dapat ditindaklanjuti ke onboarding.

### 3.6 Payroll Administrator

- **Tujuan:** mempersiapkan pembayaran bulanan dengan data jam dan komponen kompensasi yang dapat diverifikasi.
- **Kebutuhan:** payroll run, ringkasan periode, payslip, pay history, serta status persiapan dan persetujuan.
- **Masalah:** timesheet tidak lengkap atau data perubahan tidak terlacak.
- **Kriteria sukses:** payroll run dapat direkonsiliasi dengan timesheet dan riwayat pembayaran.

## 4. Customer Jobs-to-be-Done

| ID | Ketika pengguna... | Ia ingin... | Sehingga... |
|---|---|---|---|
| CJ-01 | Memulai hari operasional | Melihat siapa yang sedang/akan bekerja | Kekurangan staf dapat segera ditangani |
| CJ-02 | Menyusun jadwal mingguan | Menempatkan orang ke shift yang sesuai | Cakupan kerja terpenuhi tanpa benturan |
| CJ-03 | Karyawan meminta cuti | Melihat saldo dan memproses persetujuan | Keputusan transparan dan kapasitas tetap terjaga |
| CJ-04 | Mengubah atau menutup timesheet | Memperbaiki data dengan alasan | Catatan payroll tetap akurat dan dapat diaudit |
| CJ-05 | Memproses payroll bulanan | Meninjau ringkasan dan payslip | Pembayaran dapat dipersiapkan konsisten |
| CJ-06 | Membuka lowongan | Memindahkan kandidat melalui tahapan | Perekrutan dapat dipantau |
| CJ-07 | Menerima karyawan baru | Menjalankan checklist onboarding | Karyawan siap bekerja dengan dokumen lengkap |
| CJ-08 | Melakukan evaluasi | Mencatat review dan sasaran | Perkembangan individu dapat ditindaklanjuti |

## 5. Kebutuhan Pelanggan Fungsional

| ID | Kebutuhan | Prioritas |
|---|---|---|
| CR-001 | Pengguna dapat mengakses dashboard Today sesuai hak aksesnya | Must |
| CR-002 | Pengguna berwenang dapat melihat people directory, profil, departemen dan org chart | Must |
| CR-003 | Manajer dapat mengelola jadwal mingguan dengan drag-and-drop | Must |
| CR-004 | Sistem dapat menandai benturan shift dan konflik cuti | Must |
| CR-005 | Pengguna dapat melihat status kehadiran dan timesheet | Must |
| CR-006 | Permintaan leave, shift swap, dan overtime diproses melalui satu approvals queue | Must |
| CR-007 | Admin dapat membuat payroll run bulanan, mencetak payslip, dan melihat pay history | Must |
| CR-008 | HR dapat mengelola reviews, goals, dan kudos | Should |
| CR-009 | Recruiter dapat mengelola open roles dan pipeline kandidat | Must |
| CR-010 | HR dapat menugaskan checklist onboarding | Must |
| CR-011 | Owner/HR dapat melihat people analytics | Should |
| CR-012 | Admin dapat mengelola company, roles, appearance, dan notifications settings | Must |
| CR-013 | Pengguna dapat mencari fungsi dan record melalui pencarian global Cmd+K | Should |
| CR-014 | Pengguna dapat beralih tema terang/gelap dan sidebar dapat diciutkan | Must |
| CR-015 | Help centre menyediakan FAQ dan question form | Should |

## 6. Kebutuhan Non-Fungsional dari Perspektif Pelanggan

- Aplikasi harus dapat digunakan pada desktop, tablet, dan ponsel.
- Navigasi dan istilah harus konsisten antarmodul.
- Perubahan jadwal dan keputusan persetujuan harus terlihat setelah disimpan.
- Data pribadi, kompensasi, dan review hanya dapat diakses pihak yang berwenang.
- Kesalahan input harus dijelaskan dengan bahasa yang dapat dimengerti.
- Riwayat perubahan data kritis harus tersedia bagi role yang berwenang.
- Format tanggal, jam, mata uang, dan aturan cuti harus mengikuti konfigurasi perusahaan.

## 7. Kebutuhan Konten dan Bahasa

Untuk mode referensi, pertahankan nama produk, label modul, urutan navigasi, istilah, microcopy, dan contoh konten yang tampak pada Rotela. Bahasa dan sample data tidak boleh diterjemahkan, diganti mereknya, atau disesuaikan dengan industri konveksi tanpa persetujuan perubahan ruang lingkup. Untuk deployment pelanggan, lokalisasi dapat disediakan sebagai konfigurasi tambahan dengan tetap mempertahankan baseline visual.

## 8. Kebutuhan Aksesibilitas dan Responsivitas

- Seluruh fungsi utama dapat dioperasikan dengan keyboard.
- Fokus keyboard harus terlihat.
- Label kontrol tidak hanya mengandalkan warna atau ikon.
- Tabel, board, dan kalender harus tetap dapat dipahami pada layar kecil; gunakan scroll horizontal yang terkontrol bila memang diperlukan.
- Kontras teks dan status harus memadai dalam tema terang maupun gelap.

## 9. Skenario Penggunaan Prioritas

1. Manajer membuka Today, memeriksa staf yang sedang bertugas, lalu menindaklanjuti orang yang terlambat atau belum hadir.
2. Manajer membuka week rota, memindahkan shift, menerima peringatan konflik, memperbaiki penempatan, lalu menyimpan/publikasikan jadwal.
3. Karyawan mengajukan cuti atau shift swap; permintaan masuk ke antrean; approver menyetujui/menolak dengan catatan; saldo dan kalender diperbarui.
4. HR memeriksa people directory, melengkapi profil karyawan baru, lalu menuntaskan onboarding checklist.
5. Payroll administrator meninjau periode, data timesheet dan komponen pembayaran, membuat payroll run, lalu menghasilkan payslip.

## 10. Kriteria Penerimaan Pelanggan

Pelanggan menerima baseline apabila seluruh modul yang dijanjikan dapat dibuka sesuai role; alur utama di atas berhasil dari awal sampai akhir; perubahan data tersimpan setelah refresh/login ulang; konflik dan validasi muncul dengan jelas; ekspor/cetak berjalan; dan UI telah dibandingkan dengan referensi untuk seluruh halaman dan state yang disetujui.

## 11. Asumsi yang Perlu Dikonfirmasi saat Discovery

- Struktur organisasi dan jumlah lokasi/departemen.
- Daftar role, kewenangan, dan cakupan data per lokasi.
- Definisi shift, jam kerja, istirahat, overtime, dan toleransi keterlambatan.
- Aturan cuti, saldo, carry-forward, hari libur, dan approval matrix.
- Komponen payroll dan sumber kebenaran perhitungan gaji.
- Kebijakan retensi dokumen dan data personal.
- API HRIS, payroll, atau time-clock yang akan disambungkan.
