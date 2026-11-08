-- Rotela database schema (per TRD Section 7)
-- Run: psql -d rotela -f schema.sql

CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  short_name VARCHAR(50),
  town VARCHAR(100),
  rooms INTEGER,
  currency VARCHAR(10) DEFAULT 'IDR',
  timezone VARCHAR(50) DEFAULT 'Asia/Jakarta',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(200),
  roles JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  short_name VARCHAR(30),
  icon VARCHAR(30),
  head_employee_id UUID,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_titles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  hourly_rate NUMERIC(10,2),
  salary NUMERIC(12,2)
);

CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id VARCHAR(20) NOT NULL UNIQUE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  role VARCHAR(100),
  department VARCHAR(100),
  site VARCHAR(100),
  status VARCHAR(30) DEFAULT 'active',
  email VARCHAR(200),
  phone VARCHAR(30),
  start_date DATE,
  salary NUMERIC(12,2),
  hourly_rate NUMERIC(10,2),
  hours INTEGER DEFAULT 40,
  pronouns VARCHAR(30),
  city VARCHAR(100),
  access VARCHAR(50),
  bday_month INTEGER,
  bday_day INTEGER,
  allowance INTEGER DEFAULT 28,
  taken INTEGER DEFAULT 0,
  manager_id UUID,
  hue INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
  department VARCHAR(100),
  site VARCHAR(100),
  week_start DATE NOT NULL,
  day INTEGER NOT NULL CHECK (day >= 0 AND day <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(30) DEFAULT 'scheduled',
  open BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_by UUID REFERENCES employees(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leave_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  entitlement INTEGER DEFAULT 28
);

CREATE TABLE IF NOT EXISTS leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  type_id UUID REFERENCES leave_types(id),
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  days INTEGER NOT NULL,
  status VARCHAR(30) DEFAULT 'pending',
  note TEXT,
  asked_at TIMESTAMPTZ DEFAULT NOW(),
  decided_at TIMESTAMPTZ,
  decided_by UUID REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS leave_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  leave_type_id UUID REFERENCES leave_types(id),
  entitlement INTEGER DEFAULT 28,
  taken INTEGER DEFAULT 0,
  pending INTEGER DEFAULT 0,
  remaining INTEGER DEFAULT 28,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, leave_type_id)
);

CREATE TABLE IF NOT EXISTS payroll_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  starts_at DATE NOT NULL,
  ends_at DATE NOT NULL,
  pays_on DATE,
  status VARCHAR(30) DEFAULT 'open',
  currency VARCHAR(10) DEFAULT 'IDR',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payroll_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_id UUID NOT NULL REFERENCES payroll_periods(id) ON DELETE CASCADE,
  status VARCHAR(30) DEFAULT 'draft',
  gross_total NUMERIC(14,2) DEFAULT 0,
  net_total NUMERIC(14,2) DEFAULT 0,
  finalized_by UUID REFERENCES employees(id),
  finalized_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payroll_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES payroll_runs(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  gross_pay NUMERIC(12,2) DEFAULT 0,
  overtime NUMERIC(12,2) DEFAULT 0,
  additions NUMERIC(12,2) DEFAULT 0,
  deductions NUMERIC(12,2) DEFAULT 0,
  net_pay NUMERIC(12,2) DEFAULT 0,
  payslip_id UUID
);

CREATE TABLE IF NOT EXISTS audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  actor_id UUID REFERENCES employees(id),
  action VARCHAR(100) NOT NULL,
  target_table VARCHAR(50),
  target_id UUID,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shifts_week ON shifts(week_start);
CREATE INDEX IF NOT EXISTS idx_shifts_employee ON shifts(employee_id);
CREATE INDEX IF NOT EXISTS idx_employees_org ON employees(organization_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_org ON leave_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_org ON audit_events(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_created ON audit_events(created_at);

-- Seed: Saltwick Hotels organization
INSERT INTO organizations (id, name, short_name, town, rooms, currency, timezone)
VALUES ('org-1', 'Saltwick Hotels Ltd', 'Saltwick', 'Whitby', 86, 'IDR', 'Asia/Jakarta')
ON CONFLICT (id) DO NOTHING;

-- Seed: departments
INSERT INTO departments (id, organization_id, name, short_name, icon, description)
VALUES
  ('dept-front', 'org-1', 'Front desk', 'Front', 'bell', 'Arrivals, reservations, concierge and nights'),
  ('dept-house', 'org-1', 'Housekeeping', 'House', 'bed', 'Rooms, laundry and public areas'),
  ('dept-kitchen', 'org-1', 'Kitchen', 'Kitchen', 'chef', 'Breakfast, lunch, dinner and pastry'),
  ('dept-food', 'org-1', 'Restaurant & bar', 'Restaurant', 'cup', 'The dining room, the bar and room service'),
  ('dept-spa', 'org-1', 'Spa & leisure', 'Spa', 'drop', 'Treatments, pool and the gym'),
  ('dept-ops', 'org-1', 'Operations', 'Ops', 'wrench', 'Maintenance, finance, people, sales and events')
ON CONFLICT (id) DO NOTHING;

-- Seed: employees (extracted from reference deterministic engine)
INSERT INTO employees (id, employee_id, organization_id, name, role, department, site, status, email, phone, start_date, salary, hourly_rate, hours, pronouns, city, access, bday_month, bday_day, allowance, taken, manager_id, hue)
VALUES
  ('emp-E1001', 'E1001', 'org-1', 'Priya Raman', 'Head of People', 'Operations', 'Saltwick Harbour', 'active', 'priya@saltwick.com', '07700 123456', '2019-01-01', 46500, NULL, 40, 'she/her', NULL, 'Admin', 10, 4, 28, 6, NULL, 1),
  ('emp-E1002', 'E1002', 'org-1', 'Callum Hart', 'General manager', 'Operations', 'Saltwick Harbour', 'active', 'callum@saltwick.com', '07700 123457', '2016-01-01', 64000, NULL, 40, 'he/him', NULL, 'Admin', 1, 1, 28, 6, NULL, 2),
  ('emp-E1003', 'E1003', 'org-1', 'Ingrid Solberg', 'Finance manager', 'Operations', 'Saltwick Harbour', 'active', 'ingrid@saltwick.com', '07700 123458', '2020-01-01', 48200, NULL, 40, 'she/her', NULL, 'People team', 1, 1, 28, 6, 'emp-E1002', 3),
  ('emp-E1004', 'E1004', 'org-1', 'Tomás Ferreira', 'Front office manager', 'Front desk', 'Saltwick Harbour', 'active', 'tomas@saltwick.com', '07700 123459', '2018-01-01', 36800, NULL, 40, 'he/him', NULL, 'Manager', 1, 1, 28, 6, 'emp-E1002', 4),
  ('emp-E1005', 'E1005', 'org-1', 'Grace Mbeki', 'Executive housekeeper', 'Housekeeping', 'Saltwick Harbour', 'active', 'grace@saltwick.com', '07700 123460', '2017-01-01', 34200, NULL, 40, 'she/her', NULL, 'Manager', 1, 1, 28, 6, 'emp-E1002', 5),
  ('emp-E1006', 'E1006', 'org-1', 'Daniel Okafor', 'Head chef', 'Kitchen', 'Saltwick Harbour', 'active', 'daniel@saltwick.com', '07700 123461', '2019-01-01', 44500, NULL, 40, 'he/him', NULL, 'Manager', 1, 1, 28, 6, 'emp-E1002', 6),
  ('emp-E1007', 'E1007', 'org-1', 'Lucía Romero', 'Restaurant manager', 'Restaurant & bar', 'Saltwick Harbour', 'active', 'lucia@saltwick.com', '07700 123462', '2021-01-01', 35600, NULL, 40, 'she/her', NULL, 'Manager', 1, 1, 28, 6, 'emp-E1002', 7),
  ('emp-E1008', 'E1008', 'org-1', 'Hana Kobayashi', 'Head of spa', 'Spa & leisure', 'Saltwick Harbour', 'active', 'hana@saltwick.com', '07700 123463', '2020-01-01', 38000, NULL, 40, 'she/her', NULL, 'Manager', 1, 1, 28, 6, 'emp-E1002', 1)
ON CONFLICT (employee_id) DO NOTHING;

-- Seed: default payroll period (November 2026)
INSERT INTO payroll_periods (id, organization_id, name, starts_at, ends_at, pays_on, status, currency)
VALUES ('period-nov-2026', 'org-1', 'November 2026', '2026-11-01', '2026-11-30', '2026-11-27', 'open', 'IDR')
ON CONFLICT (id) DO NOTHING;
