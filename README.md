# Interactive Resume Website

A creative, non-commercial, interactive resume website featuring fancy JavaScript animations, particle networks, and dynamic visualizations.

## Features

### 🎨 Visual Elements
- **Particle Network Background**: Animated particle network representing telecommunications/networking background
- **Terminal Intro**: Type-writer effect terminal introduction with auto-executing commands
- **Interactive Skills Graph**: D3.js-powered network visualization showing interconnected skills
- **Smooth Scroll Animations**: Intersection Observer-based animations throughout the site
- **3D Card Effects**: Project cards with mouse-tracking 3D tilt effects
- **Animated Timeline**: Visual career timeline with hover effects

### 🚀 Technologies Used
- Pure HTML5, CSS3, and Vanilla JavaScript
- D3.js for data visualization
- Canvas API for particle effects
- CSS Grid and Flexbox for responsive layouts
- GitHub Actions for CI/CD
- GitHub Pages for hosting

### 🎯 Design Philosophy
- Non-commercial, personal portfolio
- Dark theme with cyan/green accents (terminal aesthetic)
- Interactive and engaging user experience
- Fully responsive design
- No frameworks - lightweight and fast

## Structure

```
resume/
├── index.html              # Main HTML structure
├── css/
│   └── style.css          # All styling and animations
├── js/
│   ├── particles.js       # Particle network animation
│   ├── terminal.js        # Terminal intro effect
│   ├── skills-graph.js    # D3.js skills visualization
│   └── main.js           # Main interactions and scroll animations
├── pdf/
│   └── YuChengLIAO_Resume.pdf  # Original resume PDF
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
└── README.md
```

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions.

### Setup GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Under "Source", select "GitHub Actions"
4. Push to main/master branch to trigger deployment

### Manual Deployment

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Interactive resume website"

# Add remote
git remote add origin git@github.com:tobliao/website.git

# Push to main branch
git branch -M main
git push -u origin main
```

The GitHub Actions workflow will automatically deploy your site to:
`https://tobliao.github.io/website/`

## Local Development

Simply open `index.html` in a modern web browser. For best experience:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Then visit http://localhost:8000
```

## Easter Egg

Try the Konami Code for a surprise!
⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ B A

## Sections

1. **Hero**: Terminal-style introduction with animated commands
2. **About**: Personal summary with animated statistics
3. **Experience**: Interactive timeline of work history
4. **Education**: Academic background with achievements
5. **Projects**: Side projects and research work with 3D card effects
6. **Skills**: Interactive network graph visualization of technical skills
7. **Contact**: Contact information and CTA

## Customization

To customize for your own use:

1. Update personal information in `index.html`
2. Modify colors in `css/style.css` (CSS variables at top)
3. Update skills data in `js/skills-graph.js`
4. Replace terminal commands in `js/terminal.js`
5. Add your own resume PDF to `pdf/` folder

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## Performance

- Lightweight: ~50KB total (excluding D3.js CDN)
- Fast load times with vanilla JavaScript
- Smooth 60fps animations
- Responsive on all devices

## License

This is a personal portfolio website. Feel free to use as inspiration, but please don't copy directly.

## Credits

Built with passion by YuCheng LIAO (Toby)

"Teaching is the best teacher of learning"
