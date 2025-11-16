# 🚀 Digi Invoice ERP - Complete Implementation Roadmap

**Version:** 1.0
**Last Updated:** 2025-11-16
**Project:** Complete ERP System with FBR Integration for Pakistan

---

## 📊 Project Overview

### **Modules to Build:**
1. Database Models (Foundation)
2. FBR Integration System
3. Authentication & Authorization
4. Chart of Accounts
5. Sales Module (Registered + Unregistered)
6. Purchase Module (Registered + Unregistered)
7. Inventory/Stock Management
8. Accounting Engine
9. HR & Payroll
10. Reporting System

### **Total Estimated Time:** 12-16 weeks (3-4 months)

### **Team Size:** 1-2 developers

---

## 🎯 Development Phases

---

# PHASE 1: Foundation Setup (Week 1-2)

**Status:** ✅ COMPLETED
**Duration:** 2 weeks
**Priority:** CRITICAL

## Completed Tasks:

### ✅ 1.1 Project Setup
- [x] Initialize Next.js 15 project
- [x] Install all dependencies (90 packages)
- [x] Configure TypeScript
- [x] Setup Tailwind CSS
- [x] Configure ESLint & Prettier
- [x] Setup testing (Vitest, Playwright)
- [x] Configure Git hooks (Husky)

### ✅ 1.2 Project Structure
- [x] Create folder structure
- [x] Setup path aliases (@/components, @/lib, etc.)
- [x] Create MongoDB connection utility
- [x] Setup providers (React Query, Toaster)
- [x] Create utility functions

### ✅ 1.3 Environment Configuration
- [x] Create .env.example
- [x] Create .env.local
- [x] Configure environment variables

**Deliverables:**
- ✅ Working Next.js development server
- ✅ All dependencies installed
- ✅ Project structure ready
- ✅ Git repository initialized

---

# PHASE 2: Database Models & Schema (Week 2-3)

**Status:** 🔄 NEXT PHASE
**Duration:** 1.5 weeks
**Priority:** CRITICAL

## 2.1 Core Models (Week 2)

### Task 2.1.1: User & Authentication Models
**File:** `models/User.ts`

```typescript
Fields:
- username, email, passwordHash
- role (ADMIN, ACCOUNTANT, HR_MANAGER, SALES_USER, STOCK_MANAGER)
- permissions array
- isActive, lastLogin
- createdAt, updatedAt

Indexes:
- username (unique)
- email (unique)

Methods:
- comparePassword()
- generateAuthToken()
```

**Time:** 2 hours

---

### Task 2.1.2: Company Settings Model
**File:** `models/CompanySettings.ts`

```typescript
Fields:
- companyName, ntn, strn
- address, phone, email
- logo
- province (code + name)
- Financial year settings
- Invoice prefix & counter
- Tax settings
- Currency settings

Singleton pattern (only one document)
```

**Time:** 2 hours

---

### Task 2.1.3: FBR Settings Model
**File:** `models/FBRSettings.ts`

```typescript
Fields:
- sandboxToken (encrypted)
  - token, generatedAt, expiresAt, isActive
- productionToken (encrypted)
  - token, generatedAt, expiresAt, isActive
- registrationStatus
- registrationType
- lastVerifiedAt

Methods:
- encryptToken()
- decryptToken()
- isTokenValid()
```

**Time:** 3 hours

---

### Task 2.1.4: FBR Reference Data Model
**File:** `models/FBRReferenceData.ts`

```typescript
Fields:
- dataType (provinces, hsCode, uom, transactionTypes, etc.)
- data (array of objects)
- fetchedAt, expiresAt
- isExpired (virtual)

Methods:
- isCacheValid()
- refreshCache()
```

**Time:** 2 hours

---

## 2.2 Chart of Accounts Models (Week 2)

### Task 2.2.1: Chart of Accounts Model
**File:** `models/ChartOfAccounts.ts`

```typescript
Fields:
- code (unique, e.g., "1000")
- name
- type (ASSET, LIABILITY, EQUITY, INCOME, EXPENSE)
- category
- parentAccount (ObjectId, self-reference)
- level (1, 2, 3, 4)
- isActive
- openingBalance
- balanceType (DEBIT, CREDIT)

Indexes:
- code (unique)
- type
- parentAccount

Methods:
- getChildren()
- getParent()
- getBalance()
```

**Time:** 4 hours

---

## 2.3 Master Data Models (Week 2-3)

### Task 2.3.1: Customer Model
**File:** `models/Customer.ts`

```typescript
Fields:
- customerCode (auto-generated)
- name, contactPerson
- phone, email, address, city
- isRegistered (boolean)
- ntn, strn (if registered)
- cnic (if unregistered)
- province (code + name)
- accountId (link to COA)
- creditLimit
- openingBalance, balanceType
- isActive

Indexes:
- customerCode (unique)
- ntn
- isRegistered
- name

Methods:
- getBalance()
- getOutstandingInvoices()
```

**Time:** 3 hours

---

### Task 2.3.2: Vendor Model
**File:** `models/Vendor.ts`

```typescript
Similar to Customer model
Fields:
- vendorCode
- isRegistered
- ntn, strn
- creditDays
- accountId (link to COA - Payables)

Methods:
- getBalance()
- getOutstandingBills()
```

**Time:** 2 hours

---

### Task 2.3.3: Item Model
**File:** `models/Item.ts`

```typescript
Fields:
- itemCode (unique)
- name, description
- category
- hsCode (for FBR)
- unit (UOM)
- purchaseRate, saleRate
- taxRate
- saleType (standard, reduced, exempt, etc.)
- sroScheduleNo, sroItemSerialNo
- stockAccount, cogsAccount, salesAccount (links to COA)
- isActive

Indexes:
- itemCode (unique)
- hsCode
- category

Methods:
- getStockBalance()
- getValuation()
```

**Time:** 3 hours

---

### Task 2.3.4: Employee Model
**File:** `models/Employee.ts`

```typescript
Fields:
- employeeCode
- name, cnic
- phone, email
- joiningDate, designation, department
- baseSalary
- allowances array [{name, amount}]
- deductions array [{name, amount}]
- accountId (link to COA)
- bankAccount
- isActive

Methods:
- calculateGrossSalary()
- calculateNetSalary()
```

**Time:** 3 hours

---

## 2.4 Transaction Models (Week 3)

### Task 2.4.1: Sales Invoice Model
**File:** `models/SalesInvoice.ts`

```typescript
Fields:
- invoiceNo (unique, auto-generated)
- invoiceDate
- invoiceType (Sale Invoice, Debit Note)
- invoiceRefNo (for Debit Note)

Seller (from company settings):
- sellerNTN, sellerBusinessName
- sellerProvince, sellerAddress

Buyer:
- customerId
- buyerNTN, buyerBusinessName
- buyerProvince, buyerAddress
- buyerRegistrationType (Registered/Unregistered)

Items array:
- itemId, hsCode, productDescription
- rate, uoM, quantity
- valueSalesExcludingST
- salesTaxApplicable
- totalValues
- saleType, sroScheduleNo, etc.

Totals:
- subtotal, totalTax, discount, grandTotal

FBR Data:
- invoiceNumber, qrCode
- submittedAt, status

Status:
- status (DRAFT, POSTED, CANCELLED)
- isFBRSynced, isLocked

Accounting:
- journalEntryId

Audit:
- createdBy, createdAt, updatedAt

Methods:
- calculateTotals()
- prepareFBRPayload()
- lock()
- cancel()
```

**Time:** 6 hours

---

### Task 2.4.2: Purchase Invoice Model
**File:** `models/PurchaseInvoice.ts`

```typescript
Similar to SalesInvoice
Key differences:
- vendorId instead of customerId
- Buyer becomes Seller (company)
- Seller becomes Buyer (vendor)

Methods:
- calculateTotals()
- prepareFBRPayload()
```

**Time:** 4 hours

---

### Task 2.4.3: Stock Ledger Model
**File:** `models/StockLedger.ts`

```typescript
Fields:
- itemId, itemName
- transactionType (PURCHASE, SALE, ADJUSTMENT, OPENING)
- transactionId, transactionNo
- transactionDate
- isRegistered (boolean)

Quantities:
- qtyIn, qtyOut
- balanceQty
- registeredQtyIn, registeredQtyOut
- registeredBalanceQty
- unregisteredQtyIn, unregisteredQtyOut
- unregisteredBalanceQty

Valuation:
- rate, value

Indexes:
- itemId + transactionDate
- transactionType
- isRegistered

Methods:
- calculateBalance()
```

**Time:** 4 hours

---

### Task 2.4.4: Journal Entry Model
**File:** `models/JournalEntry.ts`

```typescript
Fields:
- journalNo (unique, auto-generated)
- journalDate
- voucherType (SALES, PURCHASE, PAYMENT, RECEIPT, JOURNAL, PAYROLL)
- referenceType, referenceId, referenceNo

Entries array:
- accountId, accountCode, accountName
- debit, credit
- description

Totals:
- totalDebit, totalCredit

Status:
- isPosted

Audit:
- createdBy, createdAt

Validation:
- totalDebit must equal totalCredit

Methods:
- validate()
- post()
- reverse()
```

**Time:** 5 hours

---

### Task 2.4.5: Ledger Model
**File:** `models/Ledger.ts`

```typescript
Fields:
- accountId, accountCode, accountName
- journalEntryId, journalNo
- journalDate
- description
- debit, credit
- balance (running balance)
- balanceType (DEBIT, CREDIT)

Indexes:
- accountId + journalDate
- journalEntryId

Methods:
- calculateRunningBalance()
```

**Time:** 3 hours

---

### Task 2.4.6: Attendance Model
**File:** `models/Attendance.ts`

```typescript
Fields:
- employeeId, employeeName
- date
- checkIn, checkOut
- status (PRESENT, ABSENT, LEAVE, HALF_DAY)
- workingHours, overtimeHours
- notes

Indexes:
- employeeId + date (unique composite)
- date
- status

Methods:
- calculateWorkingHours()
```

**Time:** 2 hours

---

### Task 2.4.7: Payroll Model
**File:** `models/Payroll.ts`

```typescript
Fields:
- payrollNo (unique)
- month, year
- employeeId, employeeName
- baseSalary
- allowances array [{name, amount}]
- deductions array [{name, amount}]
- grossSalary, totalDeductions, netSalary
- workingDays, presentDays, absentDays
- overtimeHours, overtimeAmount
- journalEntryId
- status (DRAFT, POSTED, PAID)
- paidDate

Indexes:
- employeeId + month + year (unique)
- status

Methods:
- calculate()
- post()
- markPaid()
```

**Time:** 4 hours

---

## 2.5 FBR Integration Models (Week 3)

### Task 2.5.1: FBR Invoice Sync Model
**File:** `models/FBRInvoiceSync.ts`

```typescript
Fields:
- salesInvoiceId, invoiceNo
- buyerNTN, buyerName, buyerRegistrationType
- fbrRequestPayload (complete JSON)
- fbrResponse (IRN, UVIN, QRCode, status)
- syncStatus (pending, processing, success, failed)
- syncAttempts, maxAttempts
- error (code, message, canRetry)
- firstAttemptAt, lastAttemptAt, successAt
- environment (sandbox/production)
- tokenUsed
- logs array

Methods:
- retry()
- markSuccess()
- markFailed()
```

**Time:** 3 hours

---

### Task 2.5.2: FBR Scenarios Model
**File:** `models/FBRScenario.ts`

```typescript
Fields:
- scenarioId (e.g., SN001)
- scenarioName, scenarioDescription
- payload (complete JSON)
- testResults array
  - testedAt, environment
  - apiType (validate/post)
  - status, response
  - testedBy
- totalTests, successfulTests, failedTests
- lastTestedAt

Methods:
- addTestResult()
```

**Time:** 2 hours

---

### Task 2.5.3: FBR Logs Model
**File:** `models/FBRLog.ts`

```typescript
Fields:
- logType (api_call, error, sync_attempt, token_refresh)
- endpoint, method
- environment, tokenType
- requestHeaders, requestBody
- responseStatus, responseHeaders, responseBody
- requestSentAt, responseReceivedAt, duration
- userId, invoiceId, scenarioId
- error (code, message)
- timestamp

Indexes:
- logType
- timestamp
- invoiceId
```

**Time:** 2 hours

---

### Task 2.5.4: Audit Log Model
**File:** `models/AuditLog.ts`

```typescript
Fields:
- userId, username
- action (CREATE_INVOICE, DELETE_CUSTOMER, etc.)
- entity (sales_invoice, customer, etc.)
- entityId
- oldValue (JSON)
- newValue (JSON)
- ipAddress
- createdAt

Indexes:
- userId
- entity
- createdAt

Methods:
- logAction()
```

**Time:** 2 hours

---

## 2.6 Model Relationships & Indexes

### Task 2.6.1: Define All Relationships
**Time:** 2 hours

### Task 2.6.2: Create All Indexes
**Time:** 2 hours

### Task 2.6.3: Test Models
**File:** `tests/unit/models/`
- Write unit tests for each model
**Time:** 4 hours

---

## Phase 2 Deliverables:
- ✅ 18 Mongoose models created
- ✅ All relationships defined
- ✅ All indexes created
- ✅ All validation rules implemented
- ✅ All model methods tested
- ✅ Complete database schema documented

**Total Time for Phase 2:** 70-80 hours (1.5-2 weeks)

---

# PHASE 3: FBR Integration Core (Week 3-4)

**Status:** 🔜 UPCOMING
**Duration:** 1.5 weeks
**Priority:** CRITICAL

## 3.1 FBR Settings Module

### Task 3.1.1: FBR Settings API Routes
**Files:**
- `app/api/fbr/settings/route.ts` - GET, POST
- `app/api/fbr/settings/verify-ntn/route.ts` - POST
- `app/api/fbr/settings/tokens/route.ts` - POST

**Endpoints:**
```typescript
GET  /api/fbr/settings - Get current settings
POST /api/fbr/settings - Save/update settings
POST /api/fbr/settings/verify-ntn - Call FBR STATL API
POST /api/fbr/settings/tokens - Save tokens
```

**Time:** 6 hours

---

### Task 3.1.2: FBR Settings Service
**File:** `services/fbr-settings.service.ts`

```typescript
Functions:
- getSettings()
- saveSettings()
- verifyNTN(ntn, date) // Call FBR STATL API
- saveTokens(sandboxToken, productionToken)
- validateToken(tokenType)
```

**Time:** 4 hours

---

### Task 3.1.3: FBR Settings UI Page
**File:** `app/(dashboard)/settings/fbr/page.tsx`

Components:
- FBR Settings Form
- NTN/STRN input fields
- Province selector (loads from FBR API)
- Token input fields
- "Fetch Registration Info" button
- Save button

**Time:** 8 hours

---

### Task 3.1.4: Province Selector Component
**File:** `components/fbr/province-selector.tsx`

Features:
- Fetch provinces from FBR API
- Cache for 24 hours
- Searchable dropdown
- Auto-fill on select

**Time:** 4 hours

---

## 3.2 FBR Reference Data System

### Task 3.2.1: FBR Reference Data API Routes
**Files:**
- `app/api/fbr/reference/provinces/route.ts`
- `app/api/fbr/reference/hs-codes/route.ts`
- `app/api/fbr/reference/uom/route.ts`
- `app/api/fbr/reference/transaction-types/route.ts`
- `app/api/fbr/reference/refresh/route.ts`

**Time:** 6 hours

---

### Task 3.2.2: FBR Reference Data Service
**File:** `services/fbr-reference.service.ts`

```typescript
Functions:
- getProvinces()
- getHSCodes()
- getUOM()
- getTransactionTypes()
- refreshCache(dataType)
- isCacheValid(dataType)
```

**Time:** 6 hours

---

### Task 3.2.3: FBR API Client
**File:** `lib/fbr/api-client.ts`

```typescript
Functions:
- callFBRAPI(endpoint, method, data, tokenType)
- handleRetry()
- handleError()

Features:
- Axios instance with interceptors
- Token management
- Error handling
- Retry logic
- Logging
```

**Time:** 8 hours

---

## 3.3 FBR Scenario Testing

### Task 3.3.1: Load Scenarios from JSON
**File:** `lib/fbr/scenarios.json`
- Copy all 28 scenarios from specification

**Time:** 2 hours

---

### Task 3.3.2: Scenario Testing API
**Files:**
- `app/api/fbr/scenarios/list/route.ts`
- `app/api/fbr/scenarios/validate/route.ts`
- `app/api/fbr/scenarios/post/route.ts`
- `app/api/fbr/scenarios/post-all/route.ts`

**Time:** 6 hours

---

### Task 3.3.3: Scenario Testing UI
**File:** `app/(dashboard)/fbr/scenarios/page.tsx`

Features:
- List all 28 scenarios
- Preview scenario JSON
- Validate button
- Post button
- Post All button
- Mode toggle (Validate/Post)
- Result panel
- Progress indicator

**Time:** 10 hours

---

## 3.4 FBR Invoice Submission

### Task 3.4.1: Invoice Payload Builder
**File:** `lib/fbr/payload-builder.ts`

```typescript
Functions:
- buildFBRPayload(salesInvoice)
- validatePayload(payload)
- detectBuyerType(customer)
```

**Time:** 6 hours

---

### Task 3.4.2: FBR Submission Service
**File:** `services/fbr-submission.service.ts`

```typescript
Functions:
- validateInvoice(invoiceId)
- submitToFBR(invoiceId)
- generateQRCode(invoiceData)
- handleSuccess(fbrResponse)
- handleError(error)
- retrySubmission(invoiceId)
```

**Time:** 8 hours

---

### Task 3.4.3: FBR Submission API
**Files:**
- `app/api/fbr/invoice/submit/route.ts`
- `app/api/fbr/invoice/retry/route.ts`
- `app/api/fbr/invoice/status/route.ts`

**Time:** 6 hours

---

## 3.5 QR Code Generation

### Task 3.5.1: QR Code Service
**File:** `lib/fbr/qr-code.ts`

```typescript
Functions:
- generateQRCode(invoiceData)
- validateQRCode(qrCode)

Specs:
- Version: 2.0 (25×25)
- Size: 1.0 x 1.0 inch
- Format: PNG base64
```

**Time:** 4 hours

---

## Phase 3 Deliverables:
- ✅ FBR Settings module complete
- ✅ FBR Reference data caching
- ✅ Scenario testing system
- ✅ Invoice submission to FBR
- ✅ QR code generation
- ✅ Error handling & retry logic
- ✅ Complete FBR integration tested

**Total Time for Phase 3:** 80-90 hours (2 weeks)

---

# PHASE 4: Authentication & Authorization (Week 5)

**Status:** 🔜 UPCOMING
**Duration:** 1 week
**Priority:** HIGH

## 4.1 NextAuth v5 Setup

### Task 4.1.1: NextAuth Configuration
**File:** `auth.config.ts`

```typescript
Providers:
- Credentials (email/password)

Session:
- Strategy: JWT
- Max age: 30 days

Callbacks:
- jwt: Add user role & permissions
- session: Expose user data
```

**Time:** 4 hours

---

### Task 4.1.2: Auth API Routes
**File:** `app/api/auth/[...nextauth]/route.ts`

**Time:** 2 hours

---

### Task 4.1.3: Login Page
**File:** `app/(auth)/login/page.tsx`

Features:
- Email/password form
- Remember me checkbox
- Forgot password link
- Error messages
- Loading state

**Time:** 6 hours

---

### Task 4.1.4: Register Page
**File:** `app/(auth)/register/page.tsx`

Features:
- User registration form
- Email validation
- Password strength indicator
- Terms acceptance

**Time:** 6 hours

---

### Task 4.1.5: Protected Routes Middleware
**File:** `middleware.ts`

```typescript
Features:
- Check authentication
- Check authorization (role-based)
- Redirect to login if needed
```

**Time:** 4 hours

---

## 4.2 User Management

### Task 4.2.1: User Service
**File:** `services/user.service.ts`

```typescript
Functions:
- createUser()
- updateUser()
- deleteUser()
- getUserByEmail()
- hashPassword()
- verifyPassword()
- assignRole()
- grantPermissions()
```

**Time:** 6 hours

---

### Task 4.2.2: User Management UI
**File:** `app/(dashboard)/settings/users/page.tsx`

Features:
- List all users
- Add new user
- Edit user
- Delete user
- Assign roles
- Manage permissions

**Time:** 8 hours

---

## 4.3 Role-Based Access Control

### Task 4.3.1: Permission Constants
**File:** `lib/permissions.ts`

```typescript
Roles:
- ADMIN
- ACCOUNTANT
- HR_MANAGER
- SALES_USER
- STOCK_MANAGER

Permissions:
- view_dashboard
- create_invoice
- edit_invoice
- delete_invoice
- view_reports
- create_journal
- etc.
```

**Time:** 2 hours

---

### Task 4.3.2: Authorization Utilities
**File:** `lib/auth-utils.ts`

```typescript
Functions:
- hasPermission(user, permission)
- hasRole(user, role)
- canAccessRoute(user, route)
```

**Time:** 3 hours

---

### Task 4.3.3: Protected Component Wrapper
**File:** `components/auth/protected.tsx`

```typescript
<Protected permission="create_invoice">
  <CreateInvoiceButton />
</Protected>
```

**Time:** 3 hours

---

## Phase 4 Deliverables:
- ✅ NextAuth v5 configured
- ✅ Login/Register pages
- ✅ User management system
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Permission system

**Total Time for Phase 4:** 44 hours (1 week)

---

# PHASE 5: Chart of Accounts (Week 6)

**Status:** 🔜 UPCOMING
**Duration:** 1 week
**Priority:** HIGH

## 5.1 COA Service

### Task 5.1.1: COA Service
**File:** `services/coa.service.ts`

```typescript
Functions:
- createAccount(data)
- updateAccount(id, data)
- deleteAccount(id)
- getAccountByCode(code)
- getAccountsByType(type)
- getAccountHierarchy()
- getBalance(accountId, date)
```

**Time:** 6 hours

---

## 5.2 COA API Routes

### Task 5.2.1: COA APIs
**Files:**
- `app/api/coa/route.ts` - GET, POST
- `app/api/coa/[id]/route.ts` - GET, PUT, DELETE
- `app/api/coa/balance/route.ts` - GET

**Time:** 6 hours

---

## 5.3 COA UI

### Task 5.3.1: COA List Page
**File:** `app/(dashboard)/accounting/coa/page.tsx`

Features:
- Tree view of accounts
- Expand/collapse
- Add account
- Edit account
- Delete account
- Filter by type

**Time:** 10 hours

---

### Task 5.3.2: COA Form Component
**File:** `components/accounting/coa-form.tsx`

Fields:
- Code (auto-generate or manual)
- Name
- Type dropdown
- Category
- Parent account selector
- Opening balance
- Balance type

**Time:** 6 hours

---

## 5.4 Default COA Setup

### Task 5.4.1: Create Default COA
**File:** `lib/accounting/default-coa.ts`

```typescript
Create standard COA structure:
ASSETS
  - Current Assets
    - Cash
    - Bank
    - Accounts Receivable
    - Inventory
  - Fixed Assets
LIABILITIES
  - Current Liabilities
    - Accounts Payable
    - Sales Tax Payable
  - Long-term Liabilities
EQUITY
  - Capital
  - Retained Earnings
  - Drawings
INCOME
  - Sales
  - Other Income
EXPENSES
  - COGS
  - Salary
  - Rent
  - Utilities
```

**Time:** 4 hours

---

### Task 5.4.2: COA Seeder
**File:** `lib/db/seeders/coa-seeder.ts`

Function to populate default COA on first setup.

**Time:** 3 hours

---

## Phase 5 Deliverables:
- ✅ Complete COA system
- ✅ CRUD operations
- ✅ Tree view UI
- ✅ Default COA structure
- ✅ Balance calculation

**Total Time for Phase 5:** 35 hours (1 week)

---

# PHASE 6: Sales Module (Week 7-8)

**Status:** 🔜 UPCOMING
**Duration:** 2 weeks
**Priority:** CRITICAL

## 6.1 Customer Management

### Task 6.1.1: Customer Service
**File:** `services/customer.service.ts`

**Time:** 6 hours

---

### Task 6.1.2: Customer APIs
**Files:**
- `app/api/customers/route.ts`
- `app/api/customers/[id]/route.ts`

**Time:** 4 hours

---

### Task 6.1.3: Customer List Page
**File:** `app/(dashboard)/sales/customers/page.tsx`

**Time:** 8 hours

---

### Task 6.1.4: Customer Form
**File:** `components/sales/customer-form.tsx`

Features:
- Registered/Unregistered toggle
- NTN/STRN fields (if registered)
- Province selector
- Auto-create account in COA

**Time:** 8 hours

---

## 6.2 Sales Invoice

### Task 6.2.1: Sales Invoice Service
**File:** `services/sales-invoice.service.ts`

```typescript
Functions:
- createInvoice(data)
- updateInvoice(id, data)
- deleteInvoice(id)
- getInvoice(id)
- getInvoices(filters)
- calculateTotals(invoice)
- submitToFBR(invoiceId)
- lockInvoice(invoiceId)
- generatePDF(invoiceId)
```

**Time:** 12 hours

---

### Task 6.2.2: Sales Invoice APIs
**Files:**
- `app/api/sales/invoices/route.ts`
- `app/api/sales/invoices/[id]/route.ts`
- `app/api/sales/invoices/[id]/submit-fbr/route.ts`
- `app/api/sales/invoices/[id]/pdf/route.ts`

**Time:** 8 hours

---

### Task 6.2.3: Sales Invoice List Page
**File:** `app/(dashboard)/sales/invoices/page.tsx`

Features:
- List all invoices
- Filter by status, date, customer
- Show FBR sync status
- Actions: View, Edit, Delete, Send to FBR, Download PDF

**Time:** 10 hours

---

### Task 6.2.4: Sales Invoice Form
**File:** `app/(dashboard)/sales/invoices/new/page.tsx`

Features:
- Customer selector
- Date picker
- Line items table
  - Item selector (with HS Code)
  - Quantity, Rate inputs
  - Tax rate (from item)
  - Auto-calculate line total
- Add/Remove line items
- Totals section
  - Subtotal
  - Tax
  - Discount
  - Grand Total
- Save Draft button
- Send to FBR button

**Time:** 16 hours

---

### Task 6.2.5: Invoice PDF Template
**File:** `components/pdf/invoice-template.tsx`

Using @react-pdf/renderer:
- Company header with logo
- FBR Digital Invoicing logo
- Invoice details
- Customer details
- Items table
- Totals
- QR code (1.0 x 1.0 inch)
- Terms & conditions

**Time:** 10 hours

---

## 6.3 Sales Workflow Integration

### Task 6.3.1: Journal Entry Creation
On invoice posting:
- Create journal entry
- Dr. Customer (Receivable)
- Cr. Sales
- Cr. Sales Tax

**Time:** 6 hours

---

### Task 6.3.2: Stock Update
On invoice posting:
- Reduce stock (registered or unregistered)
- Create stock ledger entry

**Time:** 6 hours

---

### Task 6.3.3: FBR Integration
On "Send to FBR" button:
- Validate invoice
- Call FBR API
- Generate QR code
- Update invoice with FBR data
- Lock invoice

**Time:** 8 hours

---

## 6.4 Payment Receipt

### Task 6.4.1: Payment Receipt Service
**File:** `services/payment-receipt.service.ts`

**Time:** 6 hours

---

### Task 6.4.2: Payment Receipt APIs
**Time:** 4 hours

---

### Task 6.4.3: Payment Receipt Form
Features:
- Customer selector
- Outstanding balance display
- Invoice allocation
- Payment method
- Amount received

**Time:** 8 hours

---

## Phase 6 Deliverables:
- ✅ Complete customer management
- ✅ Sales invoice CRUD
- ✅ Invoice form with calculations
- ✅ FBR integration (submit invoice)
- ✅ PDF generation
- ✅ Journal entry creation
- ✅ Stock update
- ✅ Payment receipt

**Total Time for Phase 6:** 110 hours (2 weeks)

---

# PHASE 7: Purchase Module (Week 9)

**Status:** 🔜 UPCOMING
**Duration:** 1 week
**Priority:** HIGH

## 7.1 Vendor Management
Similar to Customer Management

**Time:** 20 hours

---

## 7.2 Purchase Invoice
Similar to Sales Invoice (with reverse flow)

**Time:** 40 hours

---

## 7.3 Payment Made
Similar to Payment Receipt

**Time:** 8 hours

---

## Phase 7 Deliverables:
- ✅ Vendor management
- ✅ Purchase invoice
- ✅ Payment made
- ✅ FBR integration

**Total Time for Phase 7:** 68 hours (1 week)

---

# PHASE 8: Inventory Management (Week 10)

**Status:** 🔜 UPCOMING
**Duration:** 1 week
**Priority:** HIGH

## 8.1 Item Management
Already covered in models

**Time:** 16 hours

---

## 8.2 Stock Adjustment
**Time:** 12 hours

---

## 8.3 Stock Reports
- Stock summary
- Stock movements
- Stock valuation
- Low stock alerts

**Time:** 16 hours

---

## Phase 8 Deliverables:
- ✅ Item CRUD
- ✅ Stock adjustment
- ✅ Stock tracking (registered/unregistered)
- ✅ Stock reports

**Total Time for Phase 8:** 44 hours (1 week)

---

# PHASE 9: Accounting Engine (Week 11)

**Status:** 🔜 UPCOMING
**Duration:** 1 week
**Priority:** CRITICAL

## 9.1 Journal Entry System

### Task 9.1.1: Journal Entry Service
**File:** `services/journal-entry.service.ts`

**Time:** 10 hours

---

### Task 9.1.2: Journal Entry APIs
**Time:** 6 hours

---

### Task 9.1.3: Journal Entry Form
**Time:** 12 hours

---

## 9.2 Ledger System

### Task 9.2.1: Ledger Service
**Time:** 8 hours

---

### Task 9.2.2: Ledger APIs
**Time:** 4 hours

---

### Task 9.2.3: Ledger Page
Display account ledger with running balance.

**Time:** 10 hours

---

## Phase 9 Deliverables:
- ✅ Journal entry system
- ✅ Ledger display
- ✅ Double-entry validation
- ✅ Auto-posting from transactions

**Total Time for Phase 9:** 50 hours (1 week)

---

# PHASE 10: HR & Payroll (Week 12)

**Status:** 🔜 UPCOMING
**Duration:** 1 week
**Priority:** MEDIUM

## 10.1 Employee Management
**Time:** 16 hours

---

## 10.2 Attendance System
**Time:** 16 hours

---

## 10.3 Payroll Processing
**Time:** 20 hours

---

## Phase 10 Deliverables:
- ✅ Employee CRUD
- ✅ Attendance tracking
- ✅ Payroll calculation
- ✅ Journal entry for salary

**Total Time for Phase 10:** 52 hours (1 week)

---

# PHASE 11: Reporting System (Week 13-14)

**Status:** 🔜 UPCOMING
**Duration:** 2 weeks
**Priority:** HIGH

## 11.1 Financial Reports

### Reports to Build:
1. Trial Balance
2. Profit & Loss Statement
3. Balance Sheet
4. Cash Flow Statement
5. Ledger Report
6. Aging Report (Receivables/Payables)
7. Stock Report
8. FBR Sales Report
9. Tax Report

**Time per report:** 6-8 hours
**Total:** 70 hours (2 weeks)

---

## Phase 11 Deliverables:
- ✅ All financial reports
- ✅ PDF export
- ✅ Excel export
- ✅ Date range filters
- ✅ Print functionality

**Total Time for Phase 11:** 70 hours (2 weeks)

---

# PHASE 12: Testing & Refinement (Week 15-16)

**Status:** 🔜 UPCOMING
**Duration:** 2 weeks
**Priority:** CRITICAL

## 12.1 Unit Testing
- Test all services
- Test all utilities
- Test accounting calculations

**Time:** 30 hours

---

## 12.2 Integration Testing
- Test complete workflows
- Test FBR integration
- Test accounting flows

**Time:** 20 hours

---

## 12.3 E2E Testing
- Test critical user journeys
- Test invoice creation → FBR submission
- Test payment flows

**Time:** 20 hours

---

## 12.4 Bug Fixes & Refinement
**Time:** 30 hours

---

## 12.5 Performance Optimization
- Database query optimization
- API response optimization
- Frontend performance

**Time:** 20 hours

---

## 12.6 Documentation
- API documentation
- User manual
- Developer guide

**Time:** 20 hours

---

## Phase 12 Deliverables:
- ✅ All tests passing
- ✅ Bugs fixed
- ✅ Performance optimized
- ✅ Documentation complete
- ✅ Production ready

**Total Time for Phase 12:** 140 hours (2 weeks)

---

# 📊 TOTAL PROJECT ESTIMATE

| Phase | Duration | Hours | Status |
|-------|----------|-------|--------|
| **Phase 1: Foundation** | 2 weeks | 40h | ✅ DONE |
| **Phase 2: Database Models** | 1.5 weeks | 75h | 🔄 NEXT |
| **Phase 3: FBR Integration** | 1.5 weeks | 85h | 🔜 |
| **Phase 4: Authentication** | 1 week | 44h | 🔜 |
| **Phase 5: Chart of Accounts** | 1 week | 35h | 🔜 |
| **Phase 6: Sales Module** | 2 weeks | 110h | 🔜 |
| **Phase 7: Purchase Module** | 1 week | 68h | 🔜 |
| **Phase 8: Inventory** | 1 week | 44h | 🔜 |
| **Phase 9: Accounting Engine** | 1 week | 50h | 🔜 |
| **Phase 10: HR & Payroll** | 1 week | 52h | 🔜 |
| **Phase 11: Reporting** | 2 weeks | 70h | 🔜 |
| **Phase 12: Testing** | 2 weeks | 140h | 🔜 |
| **TOTAL** | **16 weeks** | **813 hours** | |

---

# 🎯 PRIORITY ORDER (Recommended)

If you need to launch MVP faster:

## MVP Phase 1 (6 weeks):
1. ✅ Foundation (Done)
2. Database Models
3. FBR Integration
4. Authentication
5. Chart of Accounts
6. Sales Module (without Purchase)
7. Basic Reporting (Trial Balance, Ledger)

## MVP Phase 2 (4 weeks):
8. Purchase Module
9. Inventory Management
10. More Reports

## MVP Phase 3 (3 weeks):
11. HR & Payroll
12. Complete Reports

## Final Phase (3 weeks):
13. Testing & Refinement

---

# 📝 NOTES

## Dependencies:
- Database Models → Everything
- FBR Integration → Sales/Purchase
- Authentication → All UI
- COA → Accounting Engine
- Sales → Purchase (similar structure)

## Can Work in Parallel:
- FBR Integration + Authentication
- Sales + Purchase (if 2 developers)
- HR + Reports (different modules)

## Critical Path:
Database Models → FBR Integration → Sales Module → Accounting Engine

---

# 🚀 START HERE

**Current Status:** Phase 1 Complete ✅

**Next Step:** Phase 2 - Database Models

**First Task:** Create User Model (`models/User.ts`)

**Let's begin!** 💪

---

**Last Updated:** 2025-11-16
**Document Version:** 1.0
