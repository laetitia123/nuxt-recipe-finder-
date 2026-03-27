# 🍽️ Nuxt Recipe Finder

> Discover, Save & Cook — Your Personal Recipe Assistant

A dark, sleek recipe finder app built with **Nuxt 3** and **Tailwind CSS**. Search thousands of meals by name or ingredient, explore categories, view step-by-step cooking instructions, watch YouTube tutorials, and save your favorite recipes — all powered by the free [TheMealDB API](https://www.themealdb.com/api.php).

---

## ✨ Features

- 🏠 **Home page** — browse all meal categories (Breakfast, Seafood, Dessert and more)
- 🔍 **Search** — find meals by name or ingredient
- 📄 **Meal detail page** — full recipe image, ingredient list, step-by-step instructions and YouTube video link
- ❤️ **Saved recipes** — save and remove favorites using Nuxt `useState`
- 🎲 **Surprise Me** — random meal generator with one click
- 🌙 **Dark UI** — sleek dark theme built with Tailwind CSS

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Nuxt 3](https://nuxt.com) | Full-stack Vue framework |
| [Vue 3](https://vuejs.org) | Frontend UI framework |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS styling |
| [TheMealDB API](https://www.themealdb.com/api.php) | Free recipe data source |
| Nuxt Server Routes | Backend API routes |

---

## 📋 System Requirements

| Tool | Version | Download |
|---|---|---|
| Node.js | 18 LTS or 20 LTS | [nodejs.org](https://nodejs.org/en/download) |
| npm | 8+ (comes with Node.js) | Included with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com/downloads) |
| VS Code | Latest | [code.visualstudio.com](https://code.visualstudio.com/download) |

### Recommended VS Code Extensions
- **Volar** — Vue/Nuxt language support
- **ESLint** — catches code errors
- **Prettier** — formats your code automatically

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nuxt-recipe-finder.git
cd nuxt-recipe-finder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the root of your project:
```bash
touch .env
```

Add the following inside it:
```env
NUXT_PUBLIC_MEAL_DB_BASE_URL=https://www.themealdb.com/api/json/v1/1
```

### 4. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## ⚙️ Configuration
```ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  css: ['~/assets/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      mealDbBaseUrl: 'https://www.themealdb.com/api/json/v1/1'
    }
  }
})
```

> No API key is required. TheMealDB is completely free to use.

---

## 📁 Project Structure
```
nuxt-recipe-finder/
├── assets/
│   └── main.css                  → Dark theme base styles
├── components/
│   ├── Navbar.vue                → Dark sticky navbar
│   ├── MealCard.vue              → Recipe card with image
│   ├── SearchBar.vue             → Search input component
│   └── CategoryFilter.vue        → Filter by category
├── layouts/
│   └── default.vue               → Dark layout wrapper
├── pages/
│   ├── index.vue                 → Home (categories + featured)
│   ├── search.vue                → Search results page
│   ├── favorites.vue             → Saved recipes page
│   └── meal/
│       └── [id].vue              → Meal detail page
├── server/
│   └── api/
│       ├── categories.get.js     → Returns all meal categories
│       ├── search.get.js         → Search meals by name or ingredient
│       ├── random.get.js         → Returns a random meal
│       └── meal/
│           └── [id].get.js       → Returns single meal details
├── composables/
│   └── useFavorites.js           → Save/remove favorites logic
├── public/
├── .env
├── nuxt.config.ts
└── package.json
```

---

## 💻 Usage

### Browse categories
Visit `http://localhost:3000` to see all meal categories. Click any card to explore meals in that category.

### Search for a meal
```
http://localhost:3000/search?q=chicken
http://localhost:3000/search?category=Seafood
```

### View a meal
```
http://localhost:3000/meal/52772
```

### API Routes

| Endpoint | Description |
|---|---|
| `/api/categories` | Returns all meal categories |
| `/api/search?q=chicken` | Search meals by name |
| `/api/search?category=Beef` | Filter meals by category |
| `/api/meal/52772` | Get single meal by ID |
| `/api/random` | Get a random meal |

---

## 🔧 Troubleshooting

### Blank black page on first run
```bash
rm -rf .nuxt
npm run dev
```

### Page not found error for `/`
Make sure `pages/index.vue` exists and `pages: true` is set in `nuxt.config.ts`.

### Vue Router warning — no match for `/`
Make sure `app.vue` is at the root of the project, not inside an `app/` folder.
```bash
find . -not -path '*/node_modules/*' -name "app.vue"
```

### API returns empty or fails
Visit `http://localhost:3000/api/categories` to verify the API is responding. Check your `.env` file and restart the server.

### Tailwind CSS not applying styles
```bash
npx nuxi@latest module add tailwindcss
npm install
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
```bash
git checkout -b feature/your-feature-name
```
3. Commit your changes
```bash
git commit -m "feat: add your feature description"
```
4. Push and open a Pull Request
```bash
git push origin feature/your-feature-name
```

### Commit Convention

| Prefix | Use for |
|---|---|
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `style:` | UI or styling changes |
| `refactor:` | Code restructure |
| `docs:` | Documentation updates |

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgements

- [TheMealDB](https://www.themealdb.com) — free and open recipe API
- [Nuxt](https://nuxt.com) — full-stack Vue framework
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling

---

<p align="center">Built with ❤️ using Nuxt 3 & Tailwind CSS</p>
