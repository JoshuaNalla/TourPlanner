# Tour Planner Frontend

A modern, responsive React application for displaying and managing tourist trip plans. Built with React, Vite, and modern CSS for a beautiful user experience.

SWENG 411 final project.
Team members:
Joshua Nallaraja
Riley Fry
Matthew Maccari
Daniel Squair

## Features

- 🎨 **Modern UI Design**: Beautiful gradient backgrounds, glassmorphism effects, and smooth animations
- 🔍 **Search & Filter**: Search trips by title, destination, or description with category filtering
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎯 **Interactive Cards**: Hover effects and smooth transitions for better user experience
- 📊 **Trip Information**: Detailed trip cards showing budget, duration, travelers, and more
- 🏷️ **Category System**: Organize trips by adventure, cultural, relaxation, business, and family

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Navigation header
│   ├── SearchAndFilter.jsx  # Search and filter controls
│   ├── TripPlansGrid.jsx    # Grid layout for trip cards
│   └── TripPlanCard.jsx     # Individual trip card component
├── data/
│   └── sampleData.js        # Sample trip data
├── App.jsx                  # Main application component
├── main.jsx                 # React entry point
└── index.css                # Global styles
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **CSS3** - Modern styling with gradients, animations, and glassmorphism
- **ESLint** - Code linting and formatting

## Customization

### Adding New Trip Categories

1. Update the categories array in `SearchAndFilter.jsx`
2. Add corresponding icons and colors in `TripPlanCard.jsx`
3. Update sample data with new category values

### Styling

The application uses CSS custom properties and modern styling techniques. Key styling features:

- Gradient backgrounds
- Glassmorphism effects
- Smooth animations and transitions
- Responsive grid layouts
- Modern button designs

### Sample Data

The application comes with 10 sample trip plans covering different categories and destinations. You can modify `src/data/sampleData.js` to add your own trip data.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
