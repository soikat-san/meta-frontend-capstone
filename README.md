# Little Lemon Restaurant — Table Booking App

A React web application for the Little Lemon Mediterranean restaurant, featuring an online table reservation system.

## Features

- Browse the restaurant's weekly specials
- Reserve a table via an accessible booking form
- Dynamic available time slots based on selected date
- Form validation with error handling
- Responsive design across all screen sizes
- Booking confirmation page

## Tech Stack

- React 18
- React Router v6
- Vite
- CSS (no UI library)

## Prerequisites

- Node.js v18 or higher
- npm v9 or higher

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/little-lemon-capstone.git
cd little-lemon-capstone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Running Tests

```bash
npm test
```

To run tests in watch mode:

```bash
npm test -- --watch
```

## Project Structure

```
src/
├── __tests__/
│   └── BookingForm.test.jsx   # Unit tests
├── components/
│   ├── BookingForm.jsx        # Reservation form with validation
│   ├── Description.jsx        # Restaurant description section
│   ├── Footer.jsx             # Site footer
│   ├── Header.jsx             # Site header with logo and nav
│   ├── Hero.jsx               # Hero section
│   ├── Menu.jsx               # Weekly specials
│   ├── Nav.jsx                # Navigation (desktop + mobile)
│   └── testimonial.jsx        # Customer testimonials
├── pages/
│   ├── booking.jsx            # Booking page (manages availableTimes state)
│   ├── confirmbooking.jsx     # Booking confirmation page
│   └── homepage.jsx           # Home page
├── api.js                     # fetchAPI and submitAPI
├── App.jsx                    # Root component with routing
├── index.css                  # Global styles
└── main.jsx                   # Entry point
```

## Booking Form — Grading Criteria

| Criteria                   | Implementation                                                                  |
| -------------------------- | ------------------------------------------------------------------------------- |
| UX/UI design               | Follows Little Lemon brand guidelines (colors, typography)                      |
| Accessibility              | `aria-required`, `aria-describedby`, semantic HTML, proper label associations   |
| Unit tests                 | `src/__tests__/BookingForm.test.jsx` covers render, interactions, edge cases    |
| Form validation            | HTML5 `required`, `pattern`, `min`/`max`, disabled submit on no available times |
| Semantics & responsiveness | Semantic HTML tags, media queries from 822px down to 400px                      |
| Git repository             | All code committed to GitHub                                                    |
| Code structure             | Component-based architecture, clear naming, inline comments                     |
| Edge cases                 | Empty available times handled, default time synced, date minimum enforced       |
| Documentation              | This README                                                                     |

## Known Limitations

- `submitAPI` always returns `true` (mock implementation as provided by course)
- About, Menu (nav), Order Online, and Login pages are placeholders
