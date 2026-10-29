# TableOpen

TableOpen is a full-stack clone of [OpenTable](https://www.opentable.com/), the restaurant reservation platform. Users can browse and search New York City restaurants, book and manage reservations, write multi-category reviews, and save favorites to a personal dining dashboard.

Built with a **Ruby on Rails** JSON API, a **React/Redux** single-page frontend, **PostgreSQL**, and **AWS S3** for restaurant photos.

> Try it without signing up: click **Sign in**, then **Use demo instead**.

## Features

**Authentication**
- Sign up, log in, and log out with session-token auth backed by `bcrypt` (`has_secure_password`)
- CSRF protection on every API request
- One-click demo login

**Restaurants and search**
- Landing page listing all restaurants with photos, cuisine, cost, and average star rating
- Live search bar that suggests matches by restaurant name, cuisine, or neighborhood
- Search results page with suggested reservation time slots for each restaurant
- Restaurant detail pages with description, hours, dress code, parking, payment options, and more

**Reservations (full CRUD)**
- Pick a date, time, and party size, then confirm with contact details, occasion, and special requests
- Confirmation page after booking
- Modify or cancel upcoming reservations
- Server-side validation for phone number format, party size, and required fields

**Reviews (full CRUD)**
- Three-step review form: star ratings for overall, food, service, ambience, and value, then a written review and a nickname
- Edit or delete your own reviews
- Validation on rating range (1 to 5), review length (50 to 2,000 characters), and nickname length

**Dining dashboard**
- Personal page showing upcoming and past reservations
- Saved restaurants (favorites), with add and remove from any restaurant page

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Backend | Ruby 3.1.1, Rails 7.0 (API mode), Jbuilder, Puma |
| Database | PostgreSQL |
| Frontend | React 18, Redux, Redux Thunk, React Router 5, react-datepicker, date-fns |
| Storage | Active Storage with AWS S3 |
| Deployment | Render (`bin/render-build.sh`) |

## Architecture

```
React/Redux SPA (frontend/)  ──fetch + CSRF token──▶  Rails API (/api/*)  ──▶  PostgreSQL
                                                              │
                                                              └──▶  AWS S3 (restaurant photos)
```

The React app is built into Rails' `public/` folder, and Rails serves it for every non-API route (`static_pages#frontend_index`), so the whole app deploys as a single service.

### API endpoints

| Resource | Routes |
| --- | --- |
| Session | `GET / POST / DELETE /api/session` |
| Users | `GET /api/users/:id`, `POST /api/users`, `PATCH /api/users/:id` |
| Restaurants | `GET /api/restaurants`, `GET /api/restaurants/:id` |
| Reservations | `GET / POST /api/reservations`, `GET / PATCH / DELETE /api/reservations/:id` |
| Reviews | `GET / POST /api/reviews`, `GET / PATCH / DELETE /api/reviews/:id` |
| Favorites | `GET / POST /api/favorites`, `GET / DELETE /api/favorites/:id` |

### Data model

- **User**: authenticated account; owns reservations, reviews, and favorites
- **Restaurant**: listing details plus one attached photo; has many reviews
- **Reservation**, **Review**, and **Favorite** each belong to a user and a restaurant (a user can favorite a restaurant only once)

## Running Locally

### Prerequisites

- Ruby 3.1.1 and Bundler
- Node.js 18
- PostgreSQL running locally
- AWS S3 credentials (photos use Active Storage with S3 in development)

### Setup

```bash
git clone https://github.com/dobosh28/TableOpen.git
cd TableOpen

# Backend
bundle install
rails db:create db:migrate db:seed

# Frontend
npm install --prefix frontend
```

Add your AWS keys to Rails credentials (`rails credentials:edit`):

```yaml
aws:
  access_key_id: YOUR_KEY
  secret_access_key: YOUR_SECRET
  region: us-east-1
  dev:
    bucket: YOUR_DEV_BUCKET
  prod:
    bucket: YOUR_PROD_BUCKET
```

### Start the app

Run each in its own terminal:

```bash
rails s                     # API on http://localhost:5001
npm start --prefix frontend # React on http://localhost:3006 (proxies API calls to 5001)
```

Then open http://localhost:3006.

### Production build

```bash
npm run build   # builds the React app into public/
```

`bin/render-build.sh` runs the build, installs gems, and migrates and seeds the database on deploy.

## Seed Data

`db/seeds.rb` creates 16 real NYC restaurants (with photos pulled from S3), sample users, and reviews. Demo account:

- Email: `demo@user.io`
- Password: `123456`

## Author

**Yosyp Dobosh**
[GitHub](https://github.com/dobosh28) · [LinkedIn](https://www.linkedin.com/in/yosypdobosh)
