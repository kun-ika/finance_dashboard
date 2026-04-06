# Finance Dashboard UI

I am designing and developing a clean, intuitive, and responsive Finance Dashboard UI that helps users effectively track and understand their financial activities. The goal of this project is to demonstrate strong frontend development skills, including component structuring, state management, data handling, and user-centric design thinking. 

Overall, this project reflects my ability to translate a problem statement into a well-structured, scalable, and user-friendly interface while maintaining code quality, modularity, and thoughtful design decisions.

## Features

- **Comprehensive Overview**: Summary cards calculating total balance, income, and expenses dynamically.
- **Visualizations**: Time-based balance trend (Area Chart) and a categorical spending breakdown (Donut Chart) using Recharts.
- **Transactions Module**: View detailed financial records (date, amount, category, type) with robust search and type-filtering to enhance usability.
- **Role-Based UI Configuration**: Switch between `Admin` and `Viewer` roles. Admin users have permissions to securely add, edit, or delete transactions, while Viewers have strictly read-only access.
- **Actionable Insights**: Data-derived metrics highlighting your highest spending categories across transactions.
- **Data Persistence**: Uses `localStorage` to preserve all transactions and roles across sessions.
- **Premium Design System**: Complete with a visually engaging glassmorphism dark mode UI, smooth animations, and edge-case rendering built with responsive, clean standard CSS.

## Technology Stack

- **React Ecosystem**: Bootstrapped via `Vite` for lightning-fast HMR and optimized builds.
- **Advanced Patterns**: Custom React Hooks (`useLocalStorage`, `useFinanceData`) for clean state and logic separation.
- **Styling**: Vanilla CSS utilizing modern CSS Variables, Flexbox, and Grid for a performant, modular, and accessible experience.
- **Charting**: `Chart.js` integrated via React `useRef` and `useEffect` for high-performance SVG/Canvas visualizations.
- **Icons**: Lucide-style iconography and emojis.
- **A11y**: Full WCAG-compliant semantic HTML and ARIA support.

## Project Structure (Modular Architecture)

- `src/components/`: Modular UI components (`Sidebar`, `Topbar`, `Overview`, etc.).
- `src/components/charts/`: Extracted Chart.js logic into dedicated components.
- `src/hooks/`: Custom React hooks for enterprise-grade state management.
- `src/utils/`: Utility functions for formatting and common logic.
- `src/data.js`: Centralized mock data storage.

## Setup Instructions

Want to run this project locally? 

1. **Clone the repository** (if applicable) and navigate into the folder:
   ```bash
   cd dashboard-repo
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173/` to explore the dashboard!

## Usage Guide
- You'll start as a **Viewer**. Use the top right toggle inside the header to switch to **Admin**. 
- Once an Admin, an **Add New** button will appear on the transaction panel and you can configure your dummy data and see the charts respond in real time.
