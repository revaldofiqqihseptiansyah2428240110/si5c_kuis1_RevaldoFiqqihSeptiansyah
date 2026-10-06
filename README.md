# SI5C Kuis 1 - Refactor RESTful API (Topik 8: Hotel - Kamar)

Refactor Tugas 1 ke arsitektur backend terstruktur: routes, controllers, models, middlewares.

## Cara Menjalankan
```bash
npm install
cp .env.example .env   # lalu isi API_KEY
npm run dev
```

## Struktur Folder
- `models/` - penyimpanan data & fungsi pengolahannya (tanpa req/res)
- `controllers/` - request, validasi, response
- `routes/` - pemetaan endpoint ke controller
- `middlewares/` - logger, cekApiKey, errorHandler

## Endpoint
| Metode | Alamat | API key | Status sukses |
|---|---|---|---|
| GET | /rooms | Tidak | 200 |
| GET | /rooms/:id | Tidak | 200 |
| POST | /rooms | Ya (x-api-key) | 201 |
| PUT | /rooms/:id | Ya (x-api-key) | 200 |
| DELETE | /rooms/:id | Ya (x-api-key) | 204 |
