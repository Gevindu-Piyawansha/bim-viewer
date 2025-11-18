# 🏗️ BIM Viewer

> Building a 3D BIM viewer to strengthen my skills in Building Information Modeling (Revit, Navisworks, AutoCAD) and full-stack development.

## 🎯 Purpose

Developing this project to:

- Master BIM workflows and IFC standards
- Build expertise with industry tools (Revit, Navisworks, AutoCAD)
- Advance React and Three.js skills
- Create a complete full-stack application

## What it does

A web-based BIM viewer that lets you upload IFC files, explore 3D building models, inspect elements, measure distances, and visualize project data.

## ✨ Current Features

- **View 3D Models**: Upload IFC files (the standard format for BIM) and see your building in 3D
- **Measure Distances**: Click two points to measure distances - helpful for quick checks
- **Element Inspector**: Click on any building element to see details like material, dimensions, and cost
- **Dashboard View**: Charts showing project progress, materials, and costs
- **Screenshot Tool**: Capture views to share with others
- **Camera Controls**: Orbit, pan, and zoom with smooth interactions

## 🚧 In Development

I'm actively working on:

- 4D construction timeline visualization
- Clash detection between building elements
- Element search and filtering
- Performance optimization for large models
- Better IFC property extraction

## 🛠️ Tech Stack

- **React** - Component-based UI architecture
- **Three.js** - 3D rendering and scene management
- **IFC.js** - BIM file format handling
- **Recharts** - Data visualization
- **Vite** - Fast development environment

## 🚀 Try It Yourself

1. Clone this repo

   ```bash
   git clone https://github.com/Gevindu-Piyawansha/bim-viewer.git
   cd bim-viewer
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the dev server

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173`

You'll need an IFC file to see it in action. You can find free sample files on [buildingSMART](https://github.com/buildingSMART/Sample-Test-Files).

## 📖 Skills I'm Building

- **BIM Tools**: Revit, Navisworks, AutoCAD workflows and IFC standards
- **Frontend**: React, Three.js, 3D rendering, state management
- **Full-Stack**: File processing, data visualization, user interactions

## 🤔 Known Limitations

- Large IFC files (>50MB) can be slow to load
- Some IFC element properties might not display correctly
- Line thickness in measurements isn't showing properly on all browsers
- Need to add WASM files manually for IFC loading

## 💭 Roadmap

**Next up:**

- [ ] 4D timeline showing construction phases
- [ ] Clash detection algorithm
- [ ] Mobile-responsive design
- [ ] AR viewing capability

**Considering:**

- [ ] Multi-user collaboration
- [ ] Cost estimation tools
- [ ] Export to PDF reports
- [ ] Integration with project management tools

## 🙏 Acknowledgments

This project is possible thanks to:

- The IFC.js team for making BIM accessible on the web
- Three.js documentation and community
- Construction professionals who provide feedback

## 📬 Contributions & Feedback

This is a learning project, but I welcome:

- Bug reports and feature suggestions
- Code reviews and improvements
- Industry insights from BIM professionals
- Collaboration opportunities

Feel free to open an issue or reach out!

---

_Currently in active development. Expect frequent updates and improvements._ 🚧✨
