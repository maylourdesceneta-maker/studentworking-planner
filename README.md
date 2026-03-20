# 📚 Student Planner App

A comprehensive planning and scheduling application designed specifically for students who are balancing academic responsibilities with part-time work.

## ✨ Features

### 📅 **Planner**
- Monthly calendar view showing all tasks and schedule blocks
- Color-coded events for easy visualization
- Quick overview of your workload by date
- Navigate through months with ease

### ✅ **To-Do List**
- Create tasks with title, due date, priority level, and category
- Categories: Assignment, Exam, Work Shift, Study Session, Project, Other
- Priority levels: Low, Medium, High
- Filter tasks by status (All, Pending, Completed, Urgent)
- Mark tasks as completed with visual feedback
- Quick statistics showing total, completed, pending, and urgent tasks

### ⏰ **Schedule Maker**
- Plan your weekly schedule with time blocks
- Activity types: Class, Work Shift, Study Session, Break/Meal
- Add location information for classes and work
- Weekly grid view for quick overview
- Detailed timeline of all schedule items
- Perfect for managing class times, work shifts, and study blocks

## 🎯 Key Features for Students

- **Persistent Storage**: All data is saved to your browser's local storage - your plan persists between sessions
- **Dual Planning**: Manage both academic tasks and work obligations in one place
- **Visual Organization**: Color-coded by type and priority for quick scanning
- **Quick Add**: Rapidly add assignments, work shifts, and study sessions
- **Statistics**: Track your productivity with task completion metrics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will open automatically at `http://localhost:3000`

## 📦 Technology Stack

- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **Local Storage API** - Data persistence
- **CSS Grid/Flexbox** - Responsive layouts

## 🎨 Color Scheme

- **Primary Purple**: #667eea
- **Secondary Purple**: #764ba2
- **Accent Colors**: Green (completed), Orange (urgent), Blue (study)

## 💾 Data Storage

All your data is stored locally in your browser using Local Storage. No data is sent to any server. Your information stays on your device.

## 📱 Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🛠️ Building Your Own Version

The app uses Vite for fast development and production builds. To customize:

1. Edit component files in `src/components/` for UI changes
2. Modify CSS files in the same component directories for styling
3. Check `App.jsx` for main app logic and state management

## 📝 Tips for Using the App

1. **Plan Regularly**: Spend 10 minutes on Sunday planning your week in the Schedule Maker
2. **Prioritize**: Mark high-priority assignments and important work shifts
3. **Track Progress**: Check the statistics in the To-Do List to see your progress
4. **Use Categories**: Tag tasks by type (Work vs Assignment) for better organization
5. **Set Due Dates**: Always include due dates for better calendar visualization

## ⚙️ Notes

- Tasks and schedule items are automatically saved as you add them
- Delete any item to remove it permanently from your plan
- The app works offline - no internet connection needed once loaded
- Clearing your browser cache will reset your data

Made with ❤️ for students managing school and work!
