# 💰 Spendy - Personal Finance Tracker

Spendy is a modern web application for tracking personal finances, managing expenses and income, and visualizing financial statistics. Built with Next.js 16 and TypeScript, it provides an intuitive interface for managing your budget across all devices.

## 📋 About the Project

Spendy helps users:
- **Track transactions** - Record income and expenses with categories
- **Monitor balance** - Real-time balance updates with every transaction
- **Analyze spending** - Visual statistics and charts by category and period
- **Stay informed** - Live currency exchange rates (UAH, USD, EUR)
- **Access anywhere** - Fully responsive design for mobile, tablet, and desktop

## 🚀 Technologies Used

### Core
- **Next.js 16.1.3** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **CSS Modules** - Component-scoped styling

### State Management & Data Fetching
- **Zustand** - Lightweight state management
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client

### Forms & Validation
- **Formik** - Form management
- **Yup** - Schema validation
- **React Datepicker** - Date selection

### UI Components & Visualization
- **Recharts** - Data visualization and charts
- **React Hot Toast** - Toast notifications
- **React Loader Spinner** - Loading indicators
- **React Select** - Enhanced select inputs
- **React Icons** - Icon library

### Styling
- **Modern Normalize** - CSS reset
- **Google Fonts** - Inter & Poppins fonts
- **CSS Variables** - Consistent theming

## 📦 Installation and Setup

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/web-spendy-expence-tracker.git
cd web-spendy-expence-tracker
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🏗️ Project Structure

```
web-spendy-expence-tracker/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages (public routes)
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Dashboard pages (private routes)
│   │   ├── transactions/    # Home tab - transaction list
│   │   ├── statistics/      # Statistics with charts
│   │   └── currency/        # Currency rates (mobile)
│   ├── api/                 # API Route Handlers
│   ├── globals.css          # Global styles and CSS variables
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── Auth/               # Login & Registration forms
│   ├── HomeTab/            # Transaction list & items
│   ├── StatisticsTab/      # Charts and statistics
│   ├── UserAcountLayout/   # Header, Sidebar, Navigation
│   ├── Modal*/             # Modal windows
│   └── ...
├── lib/                     # Utilities and services
│   ├── api/                # API client functions
│   ├── hooks/              # Custom React hooks
│   ├── stores/             # Zustand stores
│   ├── services/           # Business logic
│   └── validations/        # Yup schemas
├── public/                  # Static assets
├── middleware.ts            # Route protection middleware
└── package.json
```

## 🔐 Authentication

The app uses JWT-based authentication with:
- **Public routes**: `/login`, `/register`
- **Private routes**: `/`, `/transactions`, `/statistics`, `/currency`
- **Middleware protection**: Automatic redirects based on auth status
- **Persistent sessions**: Zustand with localStorage

## 🎨 Features

### 📊 Transaction Management
- Add, edit, and delete transactions
- Categorize as income or expenses
- Add comments and select dates
- Real-time balance updates

### 📈 Statistics & Analytics
- Interactive charts (Recharts)
- Filter by month and year
- Toggle between income/expenses
- Category breakdown

### 💱 Currency Rates
- Live exchange rates from Monobank API
- Cached for 1 hour (localStorage)
- UAH, USD, EUR support

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 768px, 1280px
- Optimized layouts for all devices

## 🌐 Deployment

The application can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Custom server** with Node.js

### Deploy to Vercel
```bash
vercel deploy
```

## 📝 API Integration

The app connects to a backend API with the following endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/users/current` - Get current user
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PATCH /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/summary/:period` - Get statistics
- `GET /api/categories` - Get categories


## 📄 License

This project was created for educational purposes.

## 👥 Team

This project was developed as the final capstone for our Fullstack Development course, showcasing our skills in both Backend and Frontend technologies:

👩‍💻 **Olena Akatieva** - Team Lead, Fullstack Developer ([LinkedIn](https://www.linkedin.com/in/olenaakatieva/)) <br>
👨‍💻 **Denis Shulga** - Scrum Master, Fullstack Developer ([LinkedIn](https://www.linkedin.com/in/denis-shullga/)) <br>
👨‍💻 **Roman Kniazhyk** - Fullstack Developer ([LinkedIn](https://www.linkedin.com/in/roman-kniazhyk/)) <br>
👩‍💻 **Faina Kusiaka** - Fullstack Developer ([LinkedIn](https://www.linkedin.com/in/faina-kusiaka-88008838b/)) <br>
👨‍💻 **Anton Shuvalov** - Fullstack Developer ([LinkedIn](https://www.linkedin.com/in/anton-shuvalov38/)) <br>
👩‍💻 **Anastasiia Mamatova** - Fullstack Developer ([LinkedIn](https://www.linkedin.com/in/anastasiia-mamatova/)) <br>
👨‍💻 **Artem Ivanichenko** - Fullstack Developer ([LinkedIn](https://www.linkedin.com/in/artem-ivanichenko/)) <br>
👨‍💻 **Dmytro Kravchenko** - Fullstack Developer ([LinkedIn](https://www.linkedin.com/in/dima-k-bb9386119/))

## 🙏 Acknowledgments

- Design inspiration from modern fintech apps
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Monobank API](https://api.monobank.ua/docs/) for currency rates
- All open-source libraries used in this project

---

**Made with ❤️ for better financial management**
