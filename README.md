# Bureau des Étudiants (BDE) - ESTBM Official Website

Welcome to the official repository for the **Bureau des Étudiants (BDE)** of the Ecole Supérieure de Technologie de Béni Mellal (ESTBM). This platform serves as the central hub for student life, event management, and recruitment.

## 🚀 Overview

This modern, responsive web application is designed to showcase BDE activities, manage member profiles, and facilitate student engagement through a streamlined recruitment process.

### ✨ Key Features
- **Admin Dashboard**: Secure management of members and events (Add, Edit, Delete).
- **Dynamic Event Archive**: Showcase past events with detailed reports and galleries.
- **Recruitment System**: Integrated "Nous Rejoindre" form with role-specific applications and CV upload support.
- **Modern UI/UX**: Premium design with smooth animations using Framer Motion and a polished light-themed aesthetic.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Moadchafir/SubRosa.git
   cd fractal-eclipse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   AUTH_SECRET=your_generated_secret_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Administration

To access management features, scroll to the **Footer** and click the **Lock icon**.

- **Default Username**: `admin`
- **Default Password**: `admin123`

> [!NOTE]
> For production deployments, ensure `AUTH_SECRET` is set to a secure, random string and update credentials in `auth.ts`.

## 📜 License
This project is developed for the student community of ESTBM. All rights reserved.

---
*Built with ❤️ by Moad Chafir and the ESTBM BDE Team.*
