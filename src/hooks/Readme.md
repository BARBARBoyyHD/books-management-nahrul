# 📘 React Query Hooks — Documentation

A collection of reusable React Query hooks for handling **CRUD**, **pagination**, **search**, and **file uploads** in a clean and scalable way.

This README covers:

* `useGetData` (with pagination & refetching)
* `useGetSingleData`
* `usePostData`
* `useUpdateData` (with pagination-aware invalidation)
* `useDeleteData`

# 🚀 Features

* 🔄 **Automatic pagination & search**
* ♻️ **Smart cache invalidation**
* 🔁 **Live data refetch interval**
* 📦 **FormData support for file uploads**
* ❌ **Graceful error handling with toast**
* 🧹 **Single-record cache cleanup on delete**

---

# 📦 Installation

```bash
npm install @tanstack/react-query sonner
```

---

# 🧩 Hook: `useGetData<T>()`

### Fetch paginated and searchable list data from an API endpoint.

### **Signature**

```ts
useGetData<T>({
  endpoint: string;
  queryKeyBase: string;
  params: PaginationParams;
}): UseQueryResult<FetchResponse<T>, Error>
```

---

## 🔧 Parameters

### `endpoint`

API URL (e.g. `/api/books`)

### `queryKeyBase`

React Query cache key, e.g. `"books"`

### `params`

Pagination/search config:

```ts
interface PaginationParams {
  page: number;
  limit?: number;
  search?: string;
}
```

---

## 📌 Behavior

* Sends GET request:

  ```
  /api/books?page=1&limit=6&search=abc
  ```

* Auto-refetch every **2 seconds**

* Refetch automatically pauses when:

  * Searching AND results are empty
  * API returns an error

---

## 🧩 Example

```tsx
const [params, setParams] = useState({
  page: 1,
  limit: 6,
  search: "",
});

const { data, isLoading } = useGetData<BookResponse>({
  endpoint: "/api/books",
  queryKeyBase: "books",
  params,
});
```

### Pagination buttons:

```tsx
<Button
  disabled={params.page === 1}
  onClick={() => setParams(p => ({ ...p, page: p.page - 1 }))}
>
  Prev
</Button>

<Button
  disabled={data?.data?.length < params.limit}
  onClick={() => setParams(p => ({ ...p, page: p.page + 1 }))}
>
  Next
</Button>
```

---

# 🧩 Hook: `useGetSingleData<T>()`

Fetch a single record by ID.

### Signature

```ts
useGetSingleData<T>(
  id: string,
  endpoint: string,
  queryKey: string,
  option?: { enabled: boolean }
)
```

Example:

```ts
const { data, isLoading } = useGetSingleData<Book>(
  id,
  "/api/books",
  "book",
  { enabled: !!id }
);
```

---

# 🟢 Hook: `usePostData<T>()`

Insert new data. Supports **JSON** and **FormData**.

### Signature

```ts
usePostData<T>(endpoint: string, queryKey: string)
```

Example:

```tsx
const createAuthor = usePostData<Author>("/api/authors", "authors");

createAuthor.mutate({
  name: "John Doe",
});
```

### Example w/ FormData

```ts
const fd = new FormData();
fd.append("image", file);
fd.append("name", name);

createAuthor.mutate(fd);
```

---

# 🟣 Hook: `useUpdateData<T>()`

Update an existing record by ID.
Supports **JSON** or **FormData**.

### Signature

```ts
useUpdateData<T>(
  endpoint: string,
  queryKeyBase: string,
  params?: PaginationParams
)
```

---

## 💡 Why does this hook require `params`?

Because your list view uses:

```ts
queryKey: ["books", params]
```

React Query must invalidate that **exact key**, so passing `params` is required.

---

## 🧩 Example (JSON update)

```tsx
const updateBook = useUpdateData<Book>(
  "/api/books",
  "books",
  params // MUST pass params
);

updateBook.mutate({
  id: bookId,
  updates: { title: "Updated title" }
});
```

---

## 📁 Example (FormData update)

```ts
const formData = new FormData();
formData.append("title", title);
formData.append("image", file);

updateBook.mutate({
  id: bookId,
  updates: formData
});
```

---

# 🔴 Hook: `useDeleteData()`

Delete item by ID and invalidate list.

### Signature

```ts
useDeleteData(endpoint: string, queryKey: string)
```

Example:

```ts
const deleteBook = useDeleteData("/api/books", "books");

deleteBook.mutate(bookId);
```

Deletes:

* list cache (`["books"]`)
* single record cache (`["123"]`)

---

# 📊 Hook Comparison Table

| Hook               | Method | Supports FormData | Pagination-aware | Auto Refetch | Cache Invalidation                |
| ------------------ | ------ | ----------------- | ---------------- | ------------ | --------------------------------- |
| `useGetData`       | GET    | ❌                 | ✅                | ✅            | ❌                                 |
| `useGetSingleData` | GET    | ❌                 | ❌                | ❌            | ❌                                 |
| `usePostData`      | POST   | ✅                 | ❌                | ❌            | List refresh                      |
| `useUpdateData`    | PUT    | ✅                 | ✅                | ❌            | List refresh w/ exact params      |
| `useDeleteData`    | DELETE | ❌                 | ❌                | ❌            | List refresh + single key removal |

---


