# WeddingKu — Wedding Invitation SaaS (Multi-Template)

Platform SaaS undangan pernikahan digital. User berlangganan membuat undangan
dari **8 template**, mengelola tamu/RSVP/ucapan, dan membagikan link personal.
Admin memegang kontrol penuh. **Next.js 15 (App Router) + Supabase + Tailwind**,
siap deploy ke **Vercel**.

Tema publik/marketing menggunakan tampilan *futuristik* (dark + neon gradient +
glassmorphism), sementara undangan itu sendiri tetap romantis sesuai tiap template.

## Fitur
- **Auth** (Supabase) — register/login, profil, role `user`/`admin`.
- **8 Template** data-driven: Classic Elegant (gratis) + Floral Romance,
  Modern Minimalist, Luxury Gold, Garden Rose, Bohemian Bloom, Vintage Bloom,
  Spring Meadow (premium).
- **Editor** form terstruktur + **live preview** + upload foto (Supabase Storage).
- **Undangan publik** `/i/[slug]` + personalisasi `?to=Nama` atau `?g=token`.
- **RSVP & Ucapan** per undangan + **view counter** + musik latar.
- **Manajemen tamu** + import massal (CSV) + **generate link personal** (copy / WhatsApp).
- **Analitik** per undangan (view, RSVP rate, tamu dibuka).
- **Billing manual** — user minta upgrade, admin aktifkan (tanpa gateway).
- **Kuota paket** Free vs Premium (undangan, tamu, foto, template, watermark).
- **Admin panel** — pengguna, langganan, template, undangan, statistik global.
- **Mobile-first & responsif 100%** (navbar mengikat icon-only di layar kecil).

## Demo Langsung
Landing page menautkan setiap template ke undangan contoh milik admin yang
sudah `published` (diambil otomatis via `getDemoMap()` di `app/page.tsx`):
`classic-elegant`, `floral-romance`, `rangga-sinta`, `contoh-garden`,
`contoh-boho`, `contoh-minimalist`, `contoh-vintage`, `contoh-luxury`.

## Paket
| | Free | Premium |
|---|---|---|
| Undangan aktif | 1 | 10 |
| Template | Classic Elegant | Semua (8) |
| Maks tamu/undangan | 50 | 1000 |
| Foto/undangan | 3 | 20 |
| Watermark | Ya | Tidak |
| Harga | Rp0 | Rp149.000 / event |

Pembayaran manual via SeaBank `901526904190` a.n. Muhamad Akbar Sinyo;
aktivasi dilakukan admin dari `/admin/users`.

## Setup Lokal
```bash
npm install
cp .env.local.example .env.local   # isi kredensial Supabase
npm run dev
```

## Setup Supabase
1. Buat project di https://supabase.com
2. **SQL Editor** → jalankan `supabase/migration.sql`
   (membuat tabel, RLS, trigger auto-profile, storage bucket, seed 8 template,
   rate-limit, fungsi kuota & view counter).
3. **Project Settings → API** → salin ke `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. (Opsional) **Authentication → Providers** → matikan "Confirm email" agar
   register langsung bisa login tanpa verifikasi email.

### Menjadikan diri sendiri Admin
Setelah register, jalankan di SQL Editor:
```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'email-anda@contoh.com');
```
Lalu buka `/admin`.

### Membuat Undangan Contoh (untuk landing)
Login sebagai admin, buat undangan dari tiap template lalu publish. Landing
otomatis menautkan kartu template ke slug tersebut. Pastikan `user_id` undangan
= admin dan `status = 'published'`.

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL          # mis. https://weddingku.vercel.app
```

## Deploy ke Vercel
1. Push repo ke GitHub.
2. Import ke Vercel (framework Next.js terdeteksi otomatis).
3. Tambahkan 4 environment variable di atas (Production & Preview).
4. Deploy.

## Arsitektur Singkat
- `templates/base-template.tsx` — renderer data-driven (dipakai semua template).
- `templates/theme.ts` — token warna/font tiap template.
- `templates/index.tsx` — registry `slug → komponen` (+ `TemplateRenderer`).
- `config/templates.ts` — metadata & preview tiap template; `config/plans.ts` — kuota paket.
- `lib/supabase/*` — client browser/server/admin + middleware sesi.
- `lib/auth.ts` — `getUser` / `getSessionData` (cache) / guard `requireUser` / `requireAdmin`.
- `lib/validators.ts` + `lib/rate-limit.ts` — validasi & batas form publik per-IP.
- Alur data undangan disimpan sebagai JSONB di `invitations.data`.

## Menambah Template Baru
1. Tambah tema di `templates/theme.ts`.
2. Tambah komponen + entri di `templates/index.tsx` (`TEMPLATE_REGISTRY`).
3. Tambah metadata di `config/templates.ts` dan baris seed di tabel `templates`
   (`is_active`/`premium` menentukan ketersediaan & akses paket).

## Catatan
- Pembayaran = aktivasi manual (v1). Integrasi gateway bisa ditambah kemudian.
- Custom domain/subdomain per user di luar cakupan v1.
- Keamanan: RLS ketat, validasi server-side, rate-limit per-IP pada form publik,
  redirect aman (`safeRedirect`), dan view counter best-effort agar tidak
  membatalkan render.
