# 🎨 Color Theory App

An interactive web app to explore color harmonies and relationships between colors, built with Astro and Tailwind CSS.

## ✨ Features

- **Interactive color picker**: Choose any color using the picker or by entering hex codes
- **Comprehensive color analysis**: For each selected color, the app shows:
  - Complementary color
  - Analogous colors (2 adjacent colors)
  - Triadic scheme (3 equidistant colors)
  - Tetradic scheme (4 colors in a rectangle)
  - Lightened version (tint)
  - Darkened version (shade)

- **Detailed information**: For each color the app displays:
  - Visual color swatch
  - Hex code
  - RGB values
  - Color name (when identifiable)

- **Modern and responsive UI**:
  - Clean design with good contrast
  - Organized by color harmony categories
  - Works perfectly on desktop and mobile
  - Light/Dark mode toggle
  - Smooth animations

- **Additional functionality**:
  - Copy-to-clipboard buttons for color codes
  - Real-time preview
  - Improved accessibility (WCAG)
  - Toast notifications for feedback

## 🚀 Installation & Usage

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

    ```bash
    git clone <url-del-repositorio>
    cd color-theory
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Start the development server:

    ```bash
    pnpm dev
    ```

4. Open your browser at `http://localhost:3000`

### Available commands

- `pnpm dev` - Start the development server
- `pnpm build` - Build the app for production
- `pnpm preview` - Preview the production build

## 🎯 How to use the app

1. **Pick a color**: Use the color picker or enter a hex code in the text field
2. **Explore harmonies**: The app automatically calculates all color harmonies
3. **Copy codes**: Click the copy buttons to get HEX or RGB codes
4. **Switch theme**: Use the top-right toggle to switch between light and dark modes

## 🛠️ Technologies used

- **[Astro](https://astro.build/)** - Modern web framework
- **[Tailwind CSS](https://tailwindcss.com/)** - v4 via `@tailwindcss/vite`
- **[Preact](https://preactjs.com/)** - UI islands via `@astrojs/preact`
- **TypeScript** - Static typing for JavaScript
- **Vite** - Dev server and build tool (Astro under the hood)
- **[Biome](https://biomejs.dev/)** - Formatter and linter
- **pnpm** - Package manager
- **Color theory algorithms** - Mathematical calculations for color harmonies

## 📁 Project structure

```bash
color-theory/
├── src/
│   ├── components/
│   │   ├── ColorPicker.astro           # Color input control
│   │   ├── ColorSection.astro          # Color harmony section wrapper
│   │   ├── islands/                    # Interactive islands (Preact)
│   │   │   ├── ColorAnalysis.tsx
│   │   │   ├── ColorCard.tsx
│   │   │   └── CopyButton.tsx
│   │   └── ui/
│   │       ├── Footer.astro
│   │       ├── Header.astro
│   │       └── ThemeToggle.astro
│   ├── layouts/
│   │   └── Layout.astro                # Main application layout
│   ├── pages/
│   │   └── index.astro                 # Home page
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   └── colorUtils.ts               # Utilities for color calculations
│   ├── constants/
│   │   └── sections.ts
│   └── env.d.ts
├── public/
│   └── favicon.svg                     # App icon
├── astro.config.mjs
├── biome.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

## 🎨 Implemented color algorithms

### Complementary

Calculates the opposite color on the color wheel (180° difference in HSL).

### Analogous

Finds adjacent colors (±30° on the color wheel).

### Triadic

Three equidistant colors (120° apart).

### Tetradic

Four colors forming a rectangle on the color wheel (90° apart).

### Tint and Shade

- **Tint**: Lighter version (increases lightness)
- **Shade**: Darker version (decreases lightness)

## 🌟 Accessibility features

- Appropriate ARIA labels
- Optimized color contrast
- Keyboard navigation
- Alt text for visual elements
- Visible focus indicators

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Upcoming features

- [ ] Select color by name
- [ ] Export color palettes
- [ ] Color blindness simulator
