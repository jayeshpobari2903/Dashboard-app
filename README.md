# Dashboard-app
# 📊 Angular 17 Timesheet Dashboard  

A fully responsive **Dashboard Application** built with **Angular 17**, **Angular Signals**, and **Chart.js**.  
This project was created as part of a **practical interview assignment**.  

The dashboard provides insights into:  
- ✅ Overall Hours (Tracked vs Expected)  
- ✅ Timesheet Summary (Created vs Expected)  
- ✅ Hours Per Project (Bar Chart)  
- ✅ Employee Metrics (Timesheets & Hours)  

---

## 🚀 Features
- **Angular 17** with latest **Signals API** (reactive state management)  
- **Chart.js v4** for interactive charts (Doughnut & Bar)  
- **Angular Material** for modern UI components  
- **Responsive UI** (desktop, tablet, mobile)  
- Dynamic filtering by:
  - Fiscal Year 📅  
  - Integration (Jira, Slack, Asana, Salesforce, etc.)  
- **Reusable & modular components** → easy to maintain and extend  

---

## 🏗️ Component Architecture  

The app follows a **modular component-based structure**:  

- `dashboard-app` → **Main Component** (container layout)  
- `header` → Shows client name, fiscal year selector, and integration filters  
- `overall-hours` → Total tracked vs expected hours  
- `timesheet-summary` → Timesheets created vs expected  
- `hours-per-project` → Bar chart of project hours  
- `employee-matric-card` → Reusable card for employee-specific metrics  

👉 **Why this design?**  
Each feature lives in its **own component**, so if changes are required (e.g., update hours chart), only that component needs to be updated.  
This makes the app **scalable, reusable, and clean**.  

---

## 🛠️ Technologies Used  
- **Angular 17** (standalone components, signals, computed, effect)  
- **RxJS** (tap, async data handling)  
- **Chart.js v4** (loaded dynamically via service)  
- **Angular Material** (`MatCard`, `MatFormField`, `MatSelect`, `MatProgressBar`)  
- **JSON Server** (mock REST API with `db.json`)  

---

## 📦 Installation & Setup  

### 1. Clone the Repository  
```bash
git clone https://github.com/jayeshpobari2903/Dashboard-app.git
cd your-repo-name
```

### 2. Install Dependencies  
```bash
npm install --force
```
> ⚠️ `--force` is used to bypass peer dependency warnings with Angular 17.  

### 3. Start JSON Server (Mock API)  
```bash
npx json-server --watch db.json --port 3000
```
API available at 👉 `http://localhost:3000/dashboardData`  

### 4. Start Angular Development Server  
```bash
ng serve -o
```
App available at 👉 `http://localhost:4200`  

---

## 📂 Project Structure  
```
src/
 ┣ app/
 ┃ ┣ components/
 ┃ ┃ ┣ dashboard-app/        # Main container
 ┃ ┃ ┣ dashboardheader/      # Header (client name, filters)
 ┃ ┃ ┣ hours-per-project/    # Hours summary
 ┃ ┃ ┣ matric-card/          # Timesheet summary
 ┃ ┃ ┣ matric-card/          # Project hours bar chart
 ┃ ┃ ┗ employee-matric-card/ # Employee metrics card
 ┃ ┣ services/
 ┃ ┃ ┣ dashboard.service.ts  # API service
 ┃ ┃
 ┃ ┣ types/
 ┃ ┃ ┗ type.ts
 ┣ assets/
 ┃ ┗ screenshots/ (for README images)
 ┗ db.json   # mock data for JSON server
```

---

## 📸 Screenshots (Responsive UI)  

### 🖥️ Desktop  
![Dashboard Desktop](../dashboard-app/src/assets/desktop-app-large-laptop.png)  

### 🖥️ Tablate  
![Dashboard Tablate](../dashboard-app/src/assets/desktop-app-tablate.png)  

### 📱 Mobile  
![Dashboard Mobile](../dashboard-app/src/assets/desktop-app-mobile-screen.png)  

---

## ⚡ How It Works  
1. Data is served from `db.json` using **JSON Server**.  
2. **DashboardService** fetches data from API.  
3. **Signals** store reactive state like selected year & integration.  
4. **Computed signals** calculate derived values (hours, employees, projects).  
5. **ChartService** loads Chart.js once and renders charts.  
6. **Main Component** (`dashboard-app`) simply consumes **child components**.  

---

## 🧑‍💻 Author  
**Jayesh**  
📧 jayeshpobari2903@gmail.com.com  
🔗 [LinkedIn](https://www.linkedin.com/in/jayesh-pobari-5a8465244/) | [GitHub](https://github.com/jayeshpobari2903)  
