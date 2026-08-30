# House Search (Next.js)

A rebuild of the House Search site in Next.js (App Router), with a real
backend for the pay-to-unlock-address flow, view/booking tracking, and an
admin dashboard — backed by a free Supabase (Postgres) database.

## What's in this version

- **Framework**: Next.js (React), split into reusable components
  (`Header`, `Footer`, `PropertyCard`, `PropertyModal`, `Logo`).
- **Logo**: a small custom SVG mark (house + magnifying glass) instead of
  an emoji.
- **Copy**: no "Ask landlord" placeholders — unknown fields read "Contact
  for details."
- **Free contact**: every listing has direct **Call** and **WhatsApp**
  buttons (real WhatsApp icon, plus a floating WhatsApp button site-wide).
- **Favorites**: a heart button on every listing, saved in the visitor's
  browser.
- **View counts**: shown on every card and in the detail view.
- **Pay-to-unlock exact location** (the backend):
  1. A listing shows everything except the exact address/landmark.
  2. The tenant sends KSh 300 via M-Pesa **Send Money** to your number and
     submits their phone + M-Pesa code on the site.
  3. You review it on `/admin` (password-protected) and **Approve** or
     **Reject** it against your actual M-Pesa messages.
  4. On approval, the tenant's page automatically reveals the exact
     location (it polls in the background — no refresh needed).
  5. Right after that, a **"Book a viewing"** form appears. Submitting it
     creates a booking you can see and confirm/cancel from `/admin`.

Everything the tenant doesn't see — the exact address, the submission
review queue, the bookings list — lives in a Supabase Postgres database
and is only ever read/written from server-side API routes. It is never
bundled into the browser JavaScript.

## 1. Set up Supabase

1. Open your Supabase project → **SQL Editor** → **New query**.
2. Paste the contents of `supabase-schema.sql` (in this folder) and run it.
   This creates three tables: `listing_locations`, `unlock_submissions`,
   and `bookings`.
3. Go to **Table Editor → listing_locations** and add one row per listing
   you want to be unlockable, matching the `id` values in
   `data/properties.js`:

   | listing_id | exact_location |
   |---|---|
   | 12 | Gate C, blue metal gate opposite the mini-mart, house 4 |
   | 16 | Gate A, next to the police post, green gate |

   (Only listings with a row here can be unlocked — others will show a
   "location not set yet" message if someone tries.)

4. Go to **Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (not the anon key!) → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — from step 1.
- `ADMIN_USERNAME`, `ADMIN_PASSWORD` — your login for `/admin`. **Change
  the password from the default.**
- `ADMIN_SESSION_SECRET` — any long random string, e.g. generate one with
  `openssl rand -hex 32`.

`.env.local` is already in `.gitignore` — never commit it.

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/admin`
for the admin dashboard.

## Edit your listings

All listing data (title, rent, description, landlord contact, etc.) lives
in `data/properties.js` — add, remove, or edit an entry to update the
site. Each listing needs a `landlord.phone` in local format
(e.g. `"0758 917 689"`), converted automatically into `tel:`/`wa.me` links.

The **exact location** for the pay-to-unlock flow is kept separately, in
Supabase's `listing_locations` table (see step 1.3 above) — not in this
file, since anything in `data/properties.js` ships to every visitor's
browser.

The agency-wide phone/WhatsApp number shown in the header, footer, and
unlock card comes from the `AGENCY` object at the top of the same file.

## Day-to-day: approving payments & bookings

1. Someone sends KSh 300 via M-Pesa Send Money, then submits their phone +
   code on the site.
2. Open `/admin`, log in, check the code against the M-Pesa SMS you
   actually received.
3. Click **Approve** or **Reject**. The tenant's page updates within a
   few seconds (it auto-polls) and reveals the address if approved.
4. Once they submit a viewing request, it appears under the **Bookings**
   tab in `/admin`. Call or WhatsApp them to confirm a time, then click
   **Confirm** (or **Cancel** if it falls through) so your dashboard stays
   accurate.

The admin dashboard auto-refreshes every 8 seconds.

## Deploy to Vercel (free)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import
   the repo. Vercel auto-detects Next.js.
3. Before deploying, add your environment variables under **Settings →
   Environment Variables** (the same ones from `.env.local`):
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USERNAME`,
   `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
4. Click **Deploy**. You'll get a free `https://your-project.vercel.app`
   URL, and every future push redeploys automatically.

## What this does NOT do (yet)

- No automatic M-Pesa verification against Safaricom — you're still the
  manual check, same as the original backend (Daraja API needs a
  Till/Paybill number, not a personal Send Money number).
- No SMS/WhatsApp notification to you when a new submission or booking
  comes in — you have to check `/admin` (or leave it open, since it
  auto-refreshes).
 
