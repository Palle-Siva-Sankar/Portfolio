# 🚀 Palle Siva Sankar - Portfolio Website

A modern, responsive portfolio website featuring stunning **3D tilt effects** on cards and buttons, built with pure HTML, CSS, and JavaScript.

## ✨ Features

### 🎨 Design
- **Dark Theme**: Elegant dark color scheme (#161513) with gradient accents
- **Gradient Highlights**: Beautiful purple-to-orange gradient (270deg, #DF8908 to #B415FF)
- **Modern Typography**: Outfit for body text, Ovo for headings
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices

### 🎭 3D Effects
- **3D Card Tilt**: Service cards, work cards, and about cards tilt based on mouse position
- **3D Button Hover**: All buttons have interactive 3D hover effects
- **Smooth Transitions**: Silky smooth animations using CSS transforms
- **Perspective Effects**: Realistic depth using CSS perspective(1000px)

### 📱 Sections
1. **Hero/Header**: Eye-catching introduction with profile and CTA buttons
2. **About**: Personal information, education, and skills showcase
3. **Services**: 4 service cards with 3D tilt effects
4. **Work/Portfolio**: Project showcase with gradient backgrounds
5. **Contact**: Contact form with 3D effects and social links
6. **Footer**: Newsletter subscription and links

### 🔧 Interactive Features
- **Smooth Scroll**: Smooth scrolling navigation
- **Active Nav Highlighting**: Current section highlighted in navbar
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Scroll Reveal**: Cards fade in as you scroll
- **Form Validation**: Contact form with basic validation
- **Mouse-Tracking 3D**: Cards rotate based on cursor position

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Advanced features including:
  - CSS Grid & Flexbox
  - CSS Transforms (perspective, rotateX, rotateY)
  - CSS Gradients
  - CSS Transitions & Animations
- **JavaScript (Vanilla)**: 
  - DOM Manipulation
  - Event Listeners
  - Intersection Observer API
  - Smooth Scroll

## 📂 File Structure

```
fitness_coder_portfolio/
├── index.html          # Main HTML structure
├── style.css           # All styles and 3D effects
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🚀 How to Run

### Option 1: Python Server (Recommended)
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 2: VS Code Live Server
Right-click `index.html` and select "Open with Live Server"

### Option 3: Any Web Server
Use any local web server to serve the files.

## 🎯 3D Effects Explained

### Card Tilt Effect
The 3D card tilt is achieved using:
```css
.3d-card {
    transform-style: preserve-3d;
    transition: transform 0.3s;
}

.3d-card:hover {
    transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-10px);
}
```

And enhanced with JavaScript:
```javascript
card.addEventListener('mousemove', (e) => {
    // Calculate rotation based on mouse position
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
```

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --bg-color: #161513;
    --accent-gradient: linear-gradient(270deg, #DF8908 10%, #B415FF 100%);
}
```

### Content
Update sections in `index.html`:
- Personal info in Hero section
- Projects in Work section
- Services in Services section
- Contact details in Contact section

### 3D Effect Intensity
Adjust rotation values in `script.js`:
```javascript
const rotateX = ((y - centerY) / centerY) * -10; // Change -10 to adjust intensity
const rotateY = ((x - centerX) / centerX) * 10;  // Change 10 to adjust intensity
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (Full 3D effects)
- **Tablet**: 768px (Optimized layout)
- **Mobile**: < 768px (Simplified layout, mobile menu)

## ✅ Browser Support

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile Browsers

## 🎓 Key Learning Points

This portfolio demonstrates:
1. **CSS 3D Transforms**: Using perspective, rotateX, rotateY
2. **JavaScript Mouse Tracking**: Calculating relative mouse position
3. **Intersection Observer**: For scroll reveal animations
4. **Responsive Design**: Mobile-first approach
5. **Modern CSS**: Grid, Flexbox, Custom Properties

## 📞 Contact Information

- **Email**: Sivasankarpalle3@gmail.com
- **Phone**: +91 7207944231
- **LinkedIn**: [Siva Sankar Palle](https://www.linkedin.com/in/siva-sankar-palle-38ab39283/)
- **Location**: Bukkapatnam, Andhra Pradesh, India

## 🎉 Credits

**Design Inspiration**: GreatStack Portfolio
**Developer**: Palle Siva Sankar
**Built with**: ❤️ and lots of ☕

---

**© 2025 Palle Siva Sankar. All rights reserved.**
