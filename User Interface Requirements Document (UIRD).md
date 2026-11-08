# User Interface Requirements Document (UIRD)

## 1. Informasi Dokumen

| Atribut | Nilai |
|---|---|
| Produk | Rotela — People & Shift Management |
| Versi | 1.0 |
| Status | Baseline UI clone; menunggu visual sign-off |
| Tanggal | 8 November 2026 |
| Referensi | https://demo.codeandchill.store/rotela/ |

> **Catatan sumber dan ketepatan acuan**  
> Tautan yang diberikan dalam permintaan mengarah ke `https://demo.codeandchill.store/rotela/`. Halaman tersebut mengidentifikasi produk sebagai **Rotela — the people desk of Saltwick Hotels**, yaitu aplikasi HR dan staff rota untuk hotel serta tim kerja berbasis shift. Teks label tautan pengguna menyebut `konveksi.toko-abi.com`, tetapi alamat tujuan sebenarnya bukan situs konveksi. Paket dokumen ini mengikuti **alamat URL tujuan (Rotela)**. Apabila yang dimaksud benar-benar sistem konveksi, seluruh paket perlu disusun ulang menggunakan URL konveksi yang benar.  
> Demo publik mengharuskan JavaScript untuk berjalan; daftar modul dan perilaku fungsional di bawah disusun dari halaman demo yang tersedia serta deskripsi produk resmi Rotela. Detail piksel, warna, font, urutan kontrol, microcopy, dan isi setiap record harus dikunci melalui inspeksi visual langsung terhadap seluruh layar demo sebelum dinyatakan lulus verifikasi 100%.  
> Sumber: [Demo Rotela](https://demo.codeandchill.store/rotela/) · [Deskripsi resmi template Rotela](https://codeandchill.store/templates/rotela) · Tanggal pemeriksaan: 8 November 2026.

## 2. Tujuan dan Prinsip

UIRD ini mengatur pembangunan antarmuka yang **semirip mungkin dan ditargetkan 100% identik** dengan Rotela pada URL referensi. Identik berarti struktur, urutan informasi, label, perilaku, visual states, responsivitas dan konten yang terlihat, bukan hanya kesamaan warna atau tampilan dashboard pertama.

Prinsip wajib:
- Reference-first: implementasi mengikuti referensi, tidak melakukan redesign.
- Content fidelity: label, headings, status, helper text dan sample content tidak diganti secara sepihak.
- Interaction fidelity: drag-and-drop, tab, modal, drawer, dropdown, search, theme, sidebar, filter, dan feedback mereplikasi perilaku aktual.
- State fidelity: setiap halaman harus mempunyai loading, empty, populated, error, disabled, hover, focus dan success states yang relevan.
- Responsive fidelity: desktop, tablet dan phone mengikuti perubahan layout referensi.

## 3. Identitas dan Gaya Visual

- Nama produk dan identitas visual: **Rotela**; subtitle pada demo mengacu pada “the people desk of Saltwick Hotels”.
- Pertahankan logo/wordmark, ikon, ilustrasi, avatar, foto, warna, bayangan, garis batas, radius, font, ukuran teks dan spacing sebagaimana terlihat pada demo.
- Sediakan tema terang dan gelap dengan switching dan persistensi sesuai perilaku referensi.
- Jangan mengganti identitas menjadi merek konveksi atau menambahkan modul produksi/stock konveksi.
- Nilai HEX/RGB, family font, font weights, ukuran komponen, breakpoints dan elevation harus diambil dari hasil inspeksi aktual; jangan menebak nilai.

## 4. Kerangka Layout Global

### 4.1 App Shell

- Aplikasi berjalan sebagai workspace web.
- Sidebar utama menyediakan navigasi modul dan dapat diciutkan menjadi ikon.
- Main content menyesuaikan lebar sidebar dan viewport.
- Header/topbar mempertahankan komponen global yang ada pada referensi, termasuk pencarian global bila tampil.
- Area konten memiliki scroll behavior yang konsisten.
- Komponen overlay (popover, dropdown, modal, drawer, tooltip) berada di atas konten dengan layering yang sama seperti referensi.

### 4.2 Navigation & Finder

- Item sidebar, urutan, label, ikon, active indicator dan grouping harus identik dengan screenshot baseline.
- Sidebar collapsed menampilkan ikon dan tooltip yang relevan.
- Shortcut Cmd+K membuka finder global.
- Finder dapat mencari halaman/aksi/record sesuai cakupan yang benar-benar disediakan referensi.
- Escape menutup overlay; fokus dikembalikan ke trigger.

### 4.3 Theme

- Mode light dan dark tersedia.
- Semua komponen (table, chart, calendar, board, cards, popovers, form controls) harus mengikuti token tema.
- Pilihan tema dipertahankan sesuai pola persistensi referensi.

## 5. Inventaris Halaman dan Kebutuhan UI

> Nama halaman berikut adalah inventaris modul dari spesifikasi resmi. Urutan final, istilah menu, dan sub-navigation dikunci berdasarkan inspeksi langsung aplikasi.

### 5.1 Today
- Ringkasan who is on now, approvals, attendance, headcount, hiring dan starters.
- Staffing ditampilkan hour-by-hour dan dikelompokkan berdasarkan departemen.
- Late/missing people memiliki status visual jelas serta chase action.
- Gunakan card, stat, timeline, list dan chart sesuai bentuk referensi.

### 5.2 People
- Directory dengan pencarian/filter/sort.
- Employee profile dengan identitas, employment information, hubungan organisasi dan panel aktivitas.
- Org chart memperlihatkan hierarchy.
- Department view/list memiliki nama, jumlah orang dan informasi yang terlihat pada referensi.

### 5.3 Attendance
- Live floor board menampilkan siapa sedang bertugas dan status operasional.
- Status attendance ditunjukkan dengan label/indikator warna yang konsisten.
- Late/missing dan exception memiliki affordance tindak lanjut.

### 5.4 Rota / Week Schedule
- Roster mingguan dengan kolom hari dan entri shift.
- Shift dapat dipindahkan dengan drag-and-drop.
- Shift memiliki informasi orang, waktu, departemen, dan status sebagaimana contoh di referensi.
- Clash dan approved leave ditampilkan tanpa ambiguity.
- Pertahankan navigasi minggu, filter, toolbar dan aksi publish jika terlihat.

### 5.5 Timesheets
- List/tabel catatan waktu kerja.
- Status review, missing data, overtime dan approval terlihat.
- Detail timesheet membuka informasi yang diperlukan untuk review.
- Aksi perubahan/approval dibedakan secara visual.

### 5.6 Leave
- Request list, leave calendar, balance summary.
- Form permintaan memuat field sesuai referensi.
- Status pending/approved/rejected dan sisa saldo dapat dibedakan.

### 5.7 Payroll
- Monthly pay run dengan kontrol periode.
- Tabel/summary payroll, status proses, detail karyawan dan payslip.
- Payslip memiliki printable layout dengan hierarki informasi konsisten.
- Pay history menunjukkan periode lampau.

### 5.8 Performance
- Reviews, goals dan kudos.
- Kartu/daftar status review dan progress goal mengikuti referensi.
- Konten personal hanya terlihat bagi role yang berhak.

### 5.9 Recruitment
- Hiring board berbentuk pipeline yang mendukung drag-and-drop kandidat.
- Open roles ditampilkan dalam daftar/kartu sesuai referensi.
- Candidate detail menampilkan informasi tahap dan aktivitas yang tersedia.

### 5.10 Onboarding
- Checklist untuk new starters.
- Tiap tugas memiliki status dan progress.
- Tampilan daftar, detail dan penyelesaian mengikuti komponen referensi.

### 5.11 Analytics
- People analytics dengan chart, metric card, filter periode dan visualisasi sesuai demo.
- Label sumbu, angka, tooltip, legend dan empty state harus direplikasi.

### 5.12 Settings
- Company settings.
- Roles and permissions.
- Appearance.
- Notifications.
- Form controls, tabs, save/cancel states dan feedback harus identik.

### 5.13 Help Centre
- FAQ.
- Question form.
- Validasi, confirmation, dan state pengiriman.

## 6. Komponen UI yang Harus Diinventarisasi

- Sidebar expanded/collapsed, nav item, tooltip, topbar, breadcrumbs bila ada.
- Search/finder overlay, keyboard hints dan result item.
- Statistic cards, content cards, chart cards, profile card, avatar, badges/status pills.
- Table, pagination, filter chips, sorting, tabs, segmented controls.
- Daily timeline, weekly rota grid, shift card, drag preview, conflict marker.
- Calendar, date picker, time picker, balance meter.
- Kanban/hiring board dan candidate cards.
- Forms, labels, inputs, textarea, selects, toggles, checkboxes, validation messages.
- Modal, confirmation dialog, drawer, dropdown, popover, toast, tooltip.
- Empty, loading/skeleton, error, no-results, disabled, success states.
- Print stylesheet untuk payslip.

## 7. Interaksi Wajib

| ID | Interaksi | Hasil UI yang diwajibkan |
|---|---|---|
| UI-INT-01 | Collapse/expand sidebar | Main content menyesuaikan; state sesuai referensi |
| UI-INT-02 | Cmd+K | Finder overlay terbuka dan dapat dicari dengan keyboard |
| UI-INT-03 | Theme switch | Seluruh aplikasi berganti light/dark konsisten |
| UI-INT-04 | Drag shift pada rota | Kartu berpindah, konflik diperiksa, undo/cancel jika tersedia pada referensi |
| UI-INT-05 | Drag kandidat | Kandidat berpindah tahap dengan status tersimpan |
| UI-INT-06 | Buka approvals queue | Detail item tampil dan kontrol keputusan jelas |
| UI-INT-07 | Filter/sort | Konten diperbarui dan filter aktif terlihat |
| UI-INT-08 | Print payslip | Layout cetak tidak menampilkan navigasi aplikasi |
| UI-INT-09 | Submit form | Validasi dan confirmation/error state ditampilkan |
| UI-INT-10 | Responsive navigation | Navigasi tetap dapat digunakan pada phone/tablet |

## 8. Responsivitas

- Desktop: gunakan layout/sidebar dan density seperti referensi.
- Tablet: pertahankan fungsi utama; sidebar dan grid menyesuaikan tanpa overlap.
- Mobile: prioritaskan informasi dan kontrol yang penting; navigasi mengikuti pola mobile referensi.
- Rota, tabel dan chart boleh menggunakan scroll/alternate presentation sesuai referensi; jangan memaksakan penyusutan teks yang membuat jadwal tidak terbaca.
- Breakpoint final harus diukur dari perubahan layout yang terlihat pada demo, bukan ditetapkan berdasarkan tebakan.

## 9. Konten dan Data Tampilan

- Reproduksi judul, label, helper text, status, menu, CTA, empty-state copy, FAQ, serta sample data yang terlihat pada referensi.
- Konsistensi nama orang, departemen, shift, tanggal, status, kandidat dan nominal harus dijaga antarhalaman.
- Gunakan sample data terpisah dari data produksi.
- Jangan menampilkan data personal asli pada screenshot, demo publik atau automated test.

## 10. Aksesibilitas dan Keyboard

- Fokus keyboard terlihat dan urutan tab logis.
- Semua drag action memiliki alternatif aksesibel (menu move/edit atau keyboard operation).
- Status tidak disampaikan hanya melalui warna.
- Dialog memiliki title, deskripsi, close control dan focus management.
- Form memiliki label dan pesan error yang terhubung ke input.

## 11. Kriteria Visual Acceptance 100%

100% identik adalah target pengujian, bukan asumsi yang dapat diklaim dari teks spesifikasi saja. Kriteria berikut wajib dilakukan:

1. Rekam screenshot baseline setiap route pada ukuran viewport yang sama dengan implementasi.
2. Uji light dan dark mode.
3. Rekam keadaan normal, hover/focus, open dropdown, open modal, filter, empty state, populated state dan error/success state.
4. Ambil screenshot untuk desktop, tablet dan mobile.
5. Bandingkan overlay/pixel diff dan periksa perbedaan font, line-height, spacing, warna, ukuran, alignment, border, radius, shadow, icon dan konten.
6. Catat setiap selisih sebagai defect dengan severity; seluruh defect visual kritis dan mayor harus ditutup sebelum sign-off.
7. Jalankan kembali tes setelah perubahan CSS/komponen global.

### Gate Sign-off
- Semua route dan state yang terinventarisasi telah dibandingkan.
- Tidak ada teks yang hilang/ditambahkan tanpa persetujuan.
- Tidak ada perbedaan layout, warna, font, ikon atau spacing yang belum diterima.
- Semua interaksi terlihat dan berperilaku sesuai referensi.
- Pemilik produk menyetujui screenshot final.

## 12. Batasan Verifikasi Saat Penyusunan

Halaman demo yang dapat dibaca melalui browser menyatakan bahwa aplikasi membutuhkan JavaScript; tampilan penuh tidak tersedia dalam ekstraksi halaman. Daftar fitur diketahui dari deskripsi resmi Rotela, tetapi detail visual pixel-level dan microcopy tiap route belum dapat dikunci hanya dari teks tersebut. Karena itu UIRD ini mengikat tim implementasi pada proses inspeksi/screenshot baseline sebelum coding final dan sebelum klaim kesesuaian 100%.
