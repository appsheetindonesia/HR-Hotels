# Market Requirements Document (MRD)

## 1. Informasi Dokumen

| Atribut | Nilai |
|---|---|
| Nama produk | Rotela — People & Shift Management |
| Jenis dokumen | Market Requirements Document |
| Versi | 1.0 |
| Status | Draft baseline untuk analisis dan implementasi |
| Tanggal | 8 November 2026 |
| Referensi utama | https://demo.codeandchill.store/rotela/ |

> **Catatan sumber dan ketepatan acuan**  
> Tautan yang diberikan dalam permintaan mengarah ke `https://demo.codeandchill.store/rotela/`. Halaman tersebut mengidentifikasi produk sebagai **Rotela — the people desk of Saltwick Hotels**, yaitu aplikasi HR dan staff rota untuk hotel serta tim kerja berbasis shift. Teks label tautan pengguna menyebut `konveksi.toko-abi.com`, tetapi alamat tujuan sebenarnya bukan situs konveksi. Paket dokumen ini mengikuti **alamat URL tujuan (Rotela)**. Apabila yang dimaksud benar-benar sistem konveksi, seluruh paket perlu disusun ulang menggunakan URL konveksi yang benar.  
> Demo publik mengharuskan JavaScript untuk berjalan; daftar modul dan perilaku fungsional di bawah disusun dari halaman demo yang tersedia serta deskripsi produk resmi Rotela. Detail piksel, warna, font, urutan kontrol, microcopy, dan isi setiap record harus dikunci melalui inspeksi visual langsung terhadap seluruh layar demo sebelum dinyatakan lulus verifikasi 100%.  
> Sumber: [Demo Rotela](https://demo.codeandchill.store/rotela/) · [Deskripsi resmi template Rotela](https://codeandchill.store/templates/rotela) · Tanggal pemeriksaan: 8 November 2026.

## 2. Ringkasan Eksekutif

Rotela adalah aplikasi pengelolaan tenaga kerja untuk organisasi yang menjalankan operasi berdasarkan shift. Produk menyatukan data karyawan, departemen, jadwal kerja, kehadiran, timesheet, cuti, payroll bulanan, kinerja, perekrutan, onboarding, dan analitik dalam satu workspace. Fokus nilai bisnisnya adalah mengurangi pekerjaan administratif yang tersebar di spreadsheet, chat, dan proses manual; meningkatkan keterlihatan siapa yang sedang bekerja; serta menjaga seluruh permintaan dan persetujuan berada dalam alur yang dapat ditelusuri.

Target implementasi adalah merekonstruksi pengalaman aplikasi Rotela dengan kesetiaan visual dan konten setinggi mungkin, sambil menambahkan backend produksi yang aman dan dapat digunakan oleh organisasi nyata. Tampilan, label, struktur halaman, navigasi, sample data yang relevan, perilaku interaksi, dan tema harus mengikuti referensi. Data produksi, autentikasi, audit, serta konektor eksternal harus dibangun secara nyata dan tidak boleh sekadar meniru simulasi browser.

## 3. Latar Belakang dan Masalah Pasar

Bisnis hotel, restoran, care home, dan organisasi berbasis shift menghadapi beberapa masalah umum:

- Jadwal kerja berubah cepat dan sulit dipantau lintas departemen.
- Manajer terlambat mengetahui karyawan yang belum hadir, terlambat, atau shift yang belum terisi.
- Permintaan cuti, pertukaran shift, dan lembur masuk melalui saluran berbeda sehingga status dan persetujuannya sulit dilacak.
- Data profil, struktur organisasi, timesheet, dan histori pembayaran tersebar.
- Rekrutmen dan onboarding tidak konsisten karena checklist tidak terpusat.
- Evaluasi kinerja, sasaran individu, dan pengakuan karyawan sering tidak tercatat secara sistematis.

## 4. Peluang Pasar

Peluang utama berada pada organisasi dengan beberapa departemen, jadwal berulang, pergantian shift, serta kebutuhan koordinasi antara manajer operasional dan HR. Produk dapat dipakai oleh satu lokasi maupun beberapa unit operasional, dengan pengaturan hak akses dan pelaporan yang mengikuti struktur organisasi.

### 4.1 Segmen Prioritas

| Segmen | Kebutuhan dominan | Nilai yang ditawarkan |
|---|---|---|
| Hotel dan grup hotel | Shift per departemen, roster mingguan, kehadiran, payroll | Operasi harian dan people administration dalam satu aplikasi |
| Restoran dan hospitality | Cakupan shift, pergantian jadwal, cuti, lembur | Mengurangi kekosongan shift dan koordinasi manual |
| Care home / layanan perawatan | Ketersediaan personel dan pembagian jadwal | Visibilitas kebutuhan staf per jam dan per departemen |
| Tim layanan berbasis shift | Direktori, timesheet, persetujuan dan evaluasi | Catatan tenaga kerja yang lebih konsisten |

## 5. Pengguna dan Pembeli

**Economic buyer:** pemilik usaha, general manager, atau pimpinan grup.  
**Operational buyer:** HR manager, people operations, atau operations manager.  
**Pengguna harian:** kepala departemen, supervisor, recruiter, staf payroll, dan karyawan.

## 6. Proposisi Nilai

1. **Satu sumber data people:** profil, jabatan, departemen, dan struktur organisasi berada di satu direktori.
2. **Visibilitas operasional harian:** siapa yang sedang bekerja, siapa yang terlambat, siapa yang belum hadir, dan posisi yang belum terisi terlihat pada halaman Today dan live floor board.
3. **Penjadwalan yang terkendali:** perencanaan shift mingguan menggunakan interaksi drag-and-drop dengan pemeriksaan konflik jadwal dan cuti.
4. **Alur persetujuan terpadu:** cuti, tukar shift, dan lembur masuk ke antrean persetujuan.
5. **Administrasi people end-to-end:** payroll, rekrutmen, onboarding, performance, dan analytics dapat diakses dari workspace yang sama.
6. **Pengalaman fleksibel:** sidebar dapat diciutkan, pencarian global dapat dibuka dengan Cmd+K, dan tema terang/gelap serta layout lintas ukuran layar tersedia.

## 7. Alternatif yang Digantikan

Alternatif proses yang umum adalah spreadsheet jadwal, grup percakapan, formulir manual, folder dokumen, serta sistem payroll atau absensi yang tidak terintegrasi. MRD ini tidak menetapkan bahwa Rotela harus menggantikan sistem legal payroll atau HRIS yang sudah berjalan; integrasi dan ekspor data tetap disediakan sebagai strategi transisi.

## 8. Tujuan Produk dan Indikator Pasar

| Tujuan | Indikator keberhasilan | Target awal yang diusulkan |
|---|---|---|
| Memusatkan operasi tenaga kerja | Persentase proses inti yang dilakukan dalam aplikasi | ≥ 80% proses terpilih dalam 90 hari setelah go-live |
| Mempercepat penyusunan roster | Waktu penyusunan roster mingguan | Turun ≥ 30% dibanding baseline pelanggan |
| Mengurangi shift tidak terisi | Jumlah shift terbuka pada saat publikasi | Turun ≥ 25% dibanding baseline |
| Mempercepat persetujuan | Waktu median dari permintaan sampai keputusan | Turun ≥ 30% |
| Meningkatkan kelengkapan catatan kerja | Persentase shift dengan timesheet lengkap | ≥ 98% |
| Mendukung adopsi | Pengguna aktif mingguan / pengguna yang diundang | ≥ 75% setelah masa adopsi |

Target di atas adalah sasaran awal produk yang harus divalidasi lewat pilot; bukan klaim performa yang sudah terbukti.

## 9. Ruang Lingkup Pasar

### Termasuk
- Direktori people, profil, departemen, dan organizational chart.
- Today dashboard, attendance overview, live floor board, rota mingguan, timesheets.
- Leave request, kalender cuti, saldo, serta approvals.
- Payroll run bulanan, payslip yang dapat dicetak, dan pay history.
- Reviews, goals, kudos.
- Hiring board, open roles, kandidat, onboarding checklist.
- People analytics, company settings, roles, appearance, notifications, help centre.

### Tidak termasuk pada baseline
- Sistem penjualan kamar hotel, reservasi, POS, inventori, procurement, atau akuntansi penuh.
- Mesin payroll legal multi-negara tanpa konfigurasi dan validasi hukum terpisah.
- Perangkat biometrik, GPS geofencing, atau clock-in berbasis selfie kecuali diputuskan sebagai integrasi tambahan.
- Portal publik karier atau aplikasi native terpisah jika tidak ditemukan pada referensi yang disetujui.

## 10. Risiko Pasar dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Referensi demo berisi sample data dan belum terhubung backend | Perbedaan antara demo dan operasi produksi | Dokumentasikan batas demo; buat backend dan migrasi data secara eksplisit |
| Detail visual setiap halaman tidak seluruhnya dapat diinspeksi otomatis | Risiko klaim 100% identik tanpa bukti | Lakukan screenshot baseline, inventaris state, dan visual regression |
| Aturan kerja berbeda antar negara/perusahaan | Perhitungan cuti/lembur/payroll keliru | Buat kebijakan dapat dikonfigurasi dan validasi lokal sebelum go-live |
| Adopsi karyawan rendah | Data kehadiran dan jadwal tidak lengkap | Onboarding pengguna, notifikasi, desain mobile responsif, dan panduan |
| Hak akses terlalu luas | Kebocoran data personal dan kompensasi | RBAC, branch/department scope, audit log, dan pengujian akses |

## 11. Asumsi dan Ketergantungan

- URL tujuan Rotela adalah acuan utama; teks label `konveksi.toko-abi.com` dianggap label yang keliru.
- Fitur yang tercantum pada halaman resmi template menjadi baseline cakupan.
- Sample data pada demo merupakan data demonstrasi, bukan data produksi.
- Detail kebijakan payroll, mata uang, kalender libur, dan hukum ketenagakerjaan harus ditetapkan per organisasi dan yurisdiksi.
- Integrasi HR, payroll, dan time-clock menggunakan API atau mekanisme impor/ekspor yang disepakati.

## 12. Kriteria Keberhasilan Market Fit

Produk dianggap siap diuji pada pelanggan target setelah: alur people-to-payroll dapat dilakukan dari awal hingga akhir; jadwal shift dan persetujuan dapat dilacak; manajer mendapatkan gambaran kebutuhan staf harian; pengguna memahami navigasi tanpa pelatihan intensif; dan organisasi dapat mengekspor data operasionalnya.

## 13. Referensi

- Demo: https://demo.codeandchill.store/rotela/
- Spesifikasi resmi Rotela: https://codeandchill.store/templates/rotela
