


# 📚 Book Management System — Next.js + Supabase + React Query

A full-stack **Book Management Web App** built with:

* **Next.js 16 App Router**
* **Supabase Auth (Email / Password)**
* **Supabase SSR helpers**
* **React Query v5** for data fetching
* **Tailwind CSS v4** for styling
* **Radix UI + shadcn components**
* **TypeScript**
* Clean API architecture with **REST endpoints** for Admin and Users

This project includes **authentication**, **admin CRUD**, **pagination**, **search**, and a fully reusable data-fetch layer.



# 🚀 Tech Stack

### **Frontend**

* Next.js 16 (App Router)
* React 19
* TypeScript 5
* TailwindCSS 4
* Radix UI
* Lucide Icons
* Sonner (toast)
* Framer Motion

### **Backend / API**

* Next.js API Routes
* Supabase (Auth + Database access)
* Fully typed with TypeScript
* SSR authentication (cookies)

### **State / Data**

* @tanstack/react-query v5
* Infinite caching system
* Reusable CRUD hooks
* Auto pagination + search

---

# 📂 Folder Structure

```
src
├── app
│   ├── (auth)
│   │   ├── login
│   │   └── register
│   ├── (users)
│   │   ├── authors
│   │   ├── books
│   │   └── publishers
│   ├── admin
│   │   ├── authors
│   │   ├── books
│   │   └── publishers
│   └── api
│       ├── auth
│       │   ├── login
│       │   ├── logout
│       │   └── register
│       ├── users
│       │   ├── authors
│       │   ├── books
│       │   └── publishers
│       └── v1
│           └── admin
│               ├── author
│               │   ├── delete/[id]
│               │   ├── get/[id]
│               │   ├── post
│               │   └── put/[id]
│               ├── books
│               │   ├── delete/[id]
│               │   ├── get/[id]
│               │   ├── post
│               │   └── put/[id]
│               └── publisher
│                   ├── delete/[id]
│                   ├── get/[id]
│                   ├── post
│                   └── put/[id]
├── components
│   ├── admin
│   │   ├── author/form
│   │   ├── books/form
│   │   └── publishers/form
│   ├── auth
│   │   ├── login
│   │   └── register
│   ├── navbar
│   ├── ui
│   └── users
│       ├── author
│       ├── books
│       └── publishers
├── config
├── database
├── handler
├── hooks
├── lib
├── services
├── types
└── utils/supabase
```

---

# 🔐 Authentication (Supabase)

This project uses:

### ✔ Supabase Auth (Email/Password)

### ✔ Supabase SSR (server-side cookies)

### ✔ Client-side Supabase (for user session)

### `utils/supabase`

Contains:

* `supabase.ts` → browser client
* `server.ts` → server client with cookies
* `action.ts` → login / register / logout helpers

Example usage:

```ts
import { createClient } from "@/utils/supabase/supabaseClient";

const supabase = createClient();

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

---

# ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/book-management.git
cd book-management-nahrul
```

### 2. Install dependencies

```bash
npm install
```

---

# 🔧 Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_JWT_SECRET=...
```

(Use values from Supabase Dashboard → Project Settings → API)

---

# ▶️ Running the Project

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

# 🧠 Data Fetching (React Query)

Located in:

```
src/hooks/use-Fetch.ts
```

Includes:

* `useGetData` → paginated list fetching
* `useGetSingleData` → get record by ID
* `usePostData` → POST
* `useUpdateData` → PUT (with params for pagination)
* `useDeleteData` → DELETE

All hooks automatically:

* handle errors
* handle FormData
* invalidate React Query cache
* support pagination via `params`

---

# 📡 API Structure (REST)

### Admin Endpoints (CRUD)

```
/api/v1/admin/author
/api/v1/admin/books
/api/v1/admin/publisher
```

Supports:

* POST → create
* GET → get single item
* PUT → update
* DELETE → delete

### User Endpoints (public listing)

```
/api/users/authors
/api/users/books
/api/users/publishers
```

Supports pagination:

```
?page=1&limit=6&search=abc
```

---

# ✨ Features

### 🔐 Authentication

* Register
* Login
* Logout
* Supabase SSR & cookies

### 📚 Book Management

* CRUD Authors
* CRUD Books
* CRUD Publishers

### 👨‍💼 Admin Dashboard

* Fully protected routes
* Search + pagination
* Create & Update modals
* Delete confirmation

### 🚀 React Query v5

* Smart caching
* Auto refetching
* Paginated queries
* FormData support

### 🎨 UI/UX

* TailwindCSS 4
* Radix UI components
* Lucide icons
* Smooth animations (Framer Motion)
* Global Toaster (Sonner)

---

# 📜 Scripts (from package.json)

```json
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "eslint"
```

---

# 🤝 Contributing

PRs are welcome!
Fork the project → create a branch → submit PR.

---

# 📄 License

This project is **MIT Licensed**.

---

