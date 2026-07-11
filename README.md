# WeddingKu — Wedding Invitation SaaS (Multi-Template)

Platform SaaS undangan pernikahan digital. User berlangganan membuat undangan
dari 4 template, mengelola tamu/RSVP/ucapan, dan membagikan link personal.
Admin memegang kontrol penuh. **Next.js 14 + Supabase**, siap deploy ke **Vercel**.

## Fitur
- **Auth** (Supabase) — register/login, profil, role user/admin.
- **4 Template** data-driven: Classic, Floral, Minimalist, Luxury.
- **Editor** form terstruktur + **live preview** + upload foto (Supabase Storage).
- **Undangan publik** `/i/[slug]` + personalisasi `?to=Nama` atau `?g=token`.
- **RSVP & Ucapan** per undangan + **view counter**.
- **Manajemen tamu** + import massal + **generate link personal** (copy / WhatsApp).
- **Analitik** per undangan (view, RSVP rate, tamu dibuka).
- **Billing manual** — user minta upgrade, admin aktifkan.
- **Kuota paket** Free vs Premium (undangan, tamu, foto, template, watermark).
- **Admin panel** — pengguna, langganan, template, undangan, statistik global.

## Paket
| | Free | Premium |
|---|---|---|
| Undangan aktif | 1 | 10 |
| Template | Classic | Semua (4) |
| Maks tamu/undangan | 50 | 1000 |
| Foto/undangan | 3 | 20 |
| Watermark | Ya | Tidak |

## Setup Lokal
```bash
npm install
cp .env.local.example .env.local   # isi kredensial Supabase
npm run dev
```

## Setup Supabase
1. Buat project di https://supabase.com
2. **SQL Editor** → jalankan `supabase/migration.sql`
   (membuat tabel, RLS, trigger auto-profile, storage bucket, seed 4 template).
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
- `config/defaults.ts` — data awal undangan; `config/plans.ts` — kuota paket.
- `lib/supabase/*` — client browser/server/admin + middleware sesi.
- Alur data undangan disimpan sebagai JSONB di `invitations.data`.

## Menambah Template Baru
1. Tambah tema di `templates/theme.ts`.
2. Tambah komponen + entri di `templates/index.tsx` (`TEMPLATE_REGISTRY`).
3. Tambah metadata di `config/templates.ts` dan baris seed di tabel `templates`.

## Catatan
- Pembayaran = aktivasi manual (v1). Integrasi gateway bisa ditambah kemudian.
- Custom domain/subdomain per user di luar cakupan v1.
