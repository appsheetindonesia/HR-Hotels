# Technical Requirements Document (TRD)

## 1. Informasi Dokumen

| Atribut | Nilai |
|---|---|
| Produk | Rotela — People & Shift Management |
| Versi | 1.0 |
| Tanggal | 8 November 2026 |
| Status | Proposed production architecture |

> **Catatan sumber dan ketepatan acuan**  
> Tautan yang diberikan dalam permintaan mengarah ke `https://demo.codeandchill.store/rotela/`. Halaman tersebut mengidentifikasi produk sebagai **Rotela — the people desk of Saltwick Hotels**, yaitu aplikasi HR dan staff rota untuk hotel serta tim kerja berbasis shift. Teks label tautan pengguna menyebut `konveksi.toko-abi.com`, tetapi alamat tujuan sebenarnya bukan situs konveksi. Paket dokumen ini mengikuti **alamat URL tujuan (Rotela)**. Apabila yang dimaksud benar-benar sistem konveksi, seluruh paket perlu disusun ulang menggunakan URL konveksi yang benar.  
> Demo publik mengharuskan JavaScript untuk berjalan; daftar modul dan perilaku fungsional di bawah disusun dari halaman demo yang tersedia serta deskripsi produk resmi Rotela. Detail piksel, warna, font, urutan kontrol, microcopy, dan isi setiap record harus dikunci melalui inspeksi visual langsung terhadap seluruh layar demo sebelum dinyatakan lulus verifikasi 100%.  
> Sumber: [Demo Rotela](https://demo.codeandchill.store/rotela/) · [Deskripsi resmi template Rotela](https://codeandchill.store/templates/rotela) · Tanggal pemeriksaan: 8 November 2026.

## 2. Tujuan Teknis

Membangun ulang antarmuka Rotela dengan fidelity tinggi dan mengubah demo berbasis sample data browser menjadi aplikasi produksi dengan autentikasi, backend, database, penyimpanan file, audit trail, integrasi, observability, serta kontrol keamanan.

## 3. Baseline Referensi Teknis

Deskripsi resmi Rotela menyebut React, Vite, CSS dan GSAP. Template dijalankan melalui npm dan sample data demo disimpan di browser. Implementasi produksi wajib mempertahankan stack frontend tersebut sejauh memungkinkan, tetapi penyimpanan browser bukan sumber kebenaran untuk data pelanggan.

## 4. Arsitektur Target

### 4.1 Rekomendasi Komponen

- **Frontend:** React + TypeScript + Vite.
- **Styling:** CSS modular/design tokens; CSS harus mengikuti asset dan perhitungan hasil inspeksi referensi.
- **Motion:** GSAP untuk transisi/animasi yang memang terlihat pada reference; sediakan reduced-motion path.
- **Backend API:** REST API berbasis TypeScript (misalnya Node.js/NestJS atau framework setara) dengan OpenAPI contract.
- **Database:** PostgreSQL untuk transaksi relasional dan konsistensi data.
- **Authentication:** OIDC/OAuth2 atau auth service dengan secure session, MFA opsional, dan RBAC.
- **File storage:** object storage privat untuk dokumen onboarding dan payslip.
- **Cache/queue:** Redis atau layanan setara untuk rate limit, job queue dan cache bila dibutuhkan.
- **Hosting:** cloud hosting yang mendukung frontend, API, database dan private storage; pilihan vendor ditetapkan saat deployment discovery.

Pilihan vendor di atas adalah rekomendasi arsitektur, bukan fitur yang diklaim ada pada demo Rotela.

### 4.2 Diagram Konseptual

```text
Browser (React/Vite)
   | HTTPS + session token
   v
API Gateway / Backend API
   |-- Auth & RBAC
   |-- People / Organization
   |-- Rota & Attendance
   |-- Leave & Approvals
   |-- Payroll
   |-- Recruitment & Onboarding
   |-- Performance & Analytics
   |-- Notifications / Search
   |-- Audit & Integration adapters
   |
   +--> PostgreSQL
   +--> Private Object Storage
   +--> Queue / Cache (optional)
   +--> Email / HRIS / Payroll / Time-clock APIs
```

## 5. Frontend Technical Requirements

- TypeScript strict mode diaktifkan.
- Struktur route modular per halaman: today, people, attendance, rota, leave, payroll, performance, recruitment, onboarding, analytics, settings, help.
- Shared UI kit untuk buttons, cards, status, tables, forms, dialogs, popovers, charts dan navigation.
- State server dikelola melalui query/cache layer dengan invalidation yang eksplisit.
- State UI lokal digunakan untuk theme, sidebar, open dialogs, filters dan drag previews.
- Global finder mendukung Cmd+K; hasil harus diotorisasi server-side.
- GSAP hanya untuk motion yang diperlukan dan tidak boleh menghambat aksesibilitas/performa.
- CSS visual regression dijalankan pada route dan viewport yang telah dibaseline.
- Error boundary dan retry behavior disediakan untuk kegagalan API.

## 6. Backend/API Requirements

- API versioning (contoh `/api/v1`).
- Validasi input server-side menggunakan schema.
- Authorization per resource, organization, department dan action.
- Pagination, sorting dan filtering server-side untuk daftar besar.
- Idempotency key untuk operasi yang berpotensi terkirim ulang seperti approval/finalize payroll.
- Optimistic concurrency atau version field untuk perubahan rota/timesheet.
- Transaction boundary untuk keputusan approval, update saldo leave, publish rota dan payroll finalization.
- Rate limiting, request size limit dan audit logging.
- OpenAPI specification dan contract tests.

### API Domain (konseptual)

| Domain | Resource contoh |
|---|---|
| Organization | `/organizations`, `/departments`, `/roles` |
| People | `/employees`, `/employees/{id}`, `/org-chart` |
| Rota | `/rota/weeks`, `/shifts`, `/shifts/{id}/publish` |
| Attendance | `/attendance`, `/attendance/exceptions` |
| Timesheets | `/timesheets`, `/timesheets/{id}/approve` |
| Leave | `/leave/types`, `/leave/requests`, `/leave/balances` |
| Approvals | `/approvals`, `/approvals/{id}/decision` |
| Payroll | `/payroll/periods`, `/payroll/runs`, `/payslips` |
| Performance | `/reviews`, `/goals`, `/kudos` |
| Recruitment | `/roles/openings`, `/candidates`, `/candidate-stages` |
| Onboarding | `/onboarding/checklists`, `/onboarding/tasks` |
| Analytics | `/analytics/people`, `/analytics/operations` |
| Settings | `/settings/company`, `/settings/appearance`, `/settings/notifications` |

Endpoint akhir harus mengikuti API contract yang disepakati; daftar ini contoh struktur, bukan endpoint yang telah tersedia.

## 7. Database Requirements

### 7.1 Prinsip

- PostgreSQL sebagai source of truth.
- Semua tabel tenant-scoped memiliki `organization_id`.
- Gunakan UUID atau identifier kuat, foreign key, unique constraints dan indexes.
- Simpan timestamp dalam UTC; tampilkan dalam timezone organisasi/lokasi.
- Gunakan soft delete/archive untuk master data yang telah direferensikan transaksi.
- Gunakan migration versioning dan backup/restore tests.

### 7.2 Tabel Inti

`organizations`, `users`, `organization_memberships`, `roles`, `permissions`, `role_permissions`, `departments`, `job_titles`, `employees`, `manager_relations`, `shifts`, `shift_assignments`, `rota_publications`, `attendance_records`, `timesheets`, `timesheet_revisions`, `leave_types`, `leave_balances`, `leave_requests`, `shift_swap_requests`, `overtime_requests`, `approvals`, `payroll_periods`, `payroll_runs`, `payroll_lines`, `payslips`, `pay_history`, `review_cycles`, `reviews`, `goals`, `kudos`, `job_openings`, `candidates`, `candidate_stage_history`, `onboarding_templates`, `onboarding_tasks`, `notifications`, `help_requests`, `audit_events`, `integration_connections`, `integration_sync_logs`.

## 8. Aturan Transaksi Kritis

- **Publish rota:** validasi seluruh shift dalam scope, cek konflik, simpan publication snapshot dan buat notifications secara transaction-safe.
- **Approve leave:** kunci/validasi saldo dan overlap, ubah request, update balance, tulis audit event.
- **Approve timesheet:** verifikasi versi terbaru, set approval state, simpan revision dan tandai payroll eligibility.
- **Finalize payroll:** lock period, idempotency key, snapshot input, hasil per karyawan, payslip version, dan audit event.
- **Hire candidate:** cegah pembuatan employee ganda dan catat relasi candidate-to-employee.

## 9. Integrasi

- Sediakan adapter per provider untuk HRIS, payroll, dan time-clock.
- Gunakan OAuth2/API key/secret sesuai dukungan provider; rahasia dienkripsi dan tidak pernah dikirim ke frontend.
- Webhook diverifikasi signature dan timestamp; gunakan idempotency.
- Sinkronisasi memiliki retry/backoff, dead-letter handling dan log yang dapat diperiksa admin.
- Import batch memiliki dry-run, validasi, error report dan opsi rollback.
- Export CSV menggunakan UTF-8 dan format kolom terdokumentasi.

## 10. Security Requirements

- TLS untuk seluruh komunikasi.
- Encryption at rest untuk database, backup dan file storage.
- RBAC dan tenant isolation ditegakkan pada API/query layer.
- MFA untuk admin/payroll role direkomendasikan.
- Password hashing memakai algoritme modern seperti Argon2id bila autentikasi lokal dipilih.
- CSRF protection untuk cookie-based session; secure, HttpOnly, SameSite cookies.
- XSS, SQL injection, SSRF, IDOR, privilege escalation dan upload abuse diuji.
- Payslip/dokumen menggunakan private bucket dan signed URL berumur pendek.
- Audit log append-only atau kontrol setara; hanya admin terbatas dapat mengakses.
- Secret management via managed vault/environment secret, bukan source control.
- Data personal sensitif tidak dimasukkan ke analytics event atau log bebas.

## 11. Privacy, Retention & Compliance

- Dukung ekspor data karyawan dan penghapusan/anonymization sesuai kebijakan yang berlaku.
- Retensi payslip, attendance, dokumen dan audit log dapat dikonfigurasi.
- Definisikan data controller/processor, subprocessors, lokasi data dan DPA sebelum produksi.
- Aturan payroll dan leave memerlukan validasi hukum lokal.
- Pisahkan development, staging dan production; gunakan synthetic data di non-production.

## 12. Performance, Scalability & Reliability

- Indeks untuk pencarian nama/kode karyawan, rentang tanggal shift, status approval, payroll period dan organization scope.
- Caching untuk reference data; invalidasi setelah mutasi.
- Paginate daftar people, candidates, timesheets dan audit events.
- Queue untuk email, import/export besar, analytics aggregation dan integration sync.
- Load test berdasarkan headcount, jumlah shift, concurrent users dan periode payroll pelanggan.
- Target awal: 95th percentile operasi umum ≤ 2.5 detik; availability ≥ 99.5% bulanan, di luar maintenance terjadwal.

## 13. Observability & Operations

- Structured logs dengan request ID/correlation ID.
- Metrics untuk latency, error rate, queue depth, DB utilization, failed sync dan notification delivery.
- Tracing lintas API/database/integration bila tersedia.
- Alert untuk downtime, error rate, backup failure, payroll finalization error dan integration outage.
- Dashboard operasional tidak boleh mengekspos data personal sensitif.

## 14. Backup & Disaster Recovery

- Backup database otomatis harian dengan point-in-time recovery bila tersedia.
- File storage memiliki versioning/backup sesuai kebutuhan.
- Uji restore berkala.
- Target awal RPO ≤ 24 jam dan RTO ≤ 8 jam; target harus disesuaikan dampak bisnis dan biaya.
- Rencana incident response dan data breach notification terdokumentasi.

## 15. Deployment & Environment

- Environments: local, development, staging, production.
- CI: lint, typecheck, unit test, integration test, build, dependency/security scan.
- CD: deployment staging otomatis; production melalui approval dan rollback plan.
- Feature flags untuk rollout modul berisiko.
- Database migration dijalankan sebagai langkah terkontrol dan kompatibel dengan versi aplikasi.
- Domain/HTTPS, backup dan secrets diverifikasi sebelum go-live.

## 16. Testing Requirements

- Unit tests untuk validasi shift, leave balance, payroll formula adapter dan state transitions.
- API integration tests untuk RBAC, tenancy dan transaction rules.
- E2E tests untuk seluruh journey utama.
- Visual regression tests untuk tiap route, light/dark theme dan viewport.
- Accessibility tests untuk keyboard, focus, contrast dan semantics.
- Load tests untuk dashboard, rota mingguan dan payroll period.
- Security tests termasuk IDOR/tenant isolation dan permission matrix.
- Migration/import tests dengan data sintetis representatif.

## 17. Risiko Teknis

| Risiko | Mitigasi |
|---|---|
| Demo bergantung browser storage | Migrasi ke backend; import/export data dan contract tests |
| Data jadwal bersifat concurrent | Versioning, conflict check server-side, transaction dan locking |
| Payroll salah akibat aturan lokal | Configurable rules; validasi payroll oleh subject-matter expert |
| Data personal terekspos | RBAC, field-level access, encryption, audit dan penetration testing |
| Visual drift saat modul bertambah | Shared tokens/components dan screenshot regression |
| Integrasi eksternal gagal | Adapter, retry, idempotency, monitoring dan manual reconciliation |

## 18. Definition of Done Teknis

Fitur selesai hanya jika source code teruji, API dan permission terdokumentasi, audit event tersedia untuk perubahan sensitif, migration disertakan, UI cocok dengan baseline, error/loading/empty states ditangani, aksesibilitas diuji, observability tersedia, dan dokumentasi operator diperbarui.
