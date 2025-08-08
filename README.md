# Ehab Ashraf Muhammed - DevOps Engineer Portfolio

A modern, responsive portfolio website showcasing DevOps and Cloud Engineering expertise. Built with HTML5, CSS3, and vanilla JavaScript.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Fast loading with optimized assets and code
- **SEO Ready**: Meta tags and structured data for better search visibility

## 📁 Project Structure

```
ehabwebsite/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── Ehab_Ashraf_DevOps_Engineer.pdf  # Resume file
├── image.jpg           # Profile image (placeholder)
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript**: Vanilla JS with ES6+ features
- **Font Awesome**: Icons for better visual appeal
- **Google Fonts**: Inter and JetBrains Mono for typography

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme
- **Gradient Accents**: Cyan and blue gradients for visual appeal
- **Smooth Animations**: CSS animations and JavaScript-powered interactions
- **Interactive Elements**: Hover effects and smooth transitions
- **Floating Elements**: Animated tech icons and orbital animations

## 📱 Sections

1. **Hero Section**: Introduction with social links
2. **About**: Personal story, philosophy, and language skills
3. **Experience**: Professional timeline with achievements
4. **Skills**: Interactive skill categories with progress bars
5. **Projects**: Featured projects with technologies used
6. **Certifications**: Professional certifications and achievements
7. **Contact**: Contact information and call-to-action

## 🚀 Deployment

### Amazon S3 Deployment

1. **Create S3 Bucket**:
   ```bash
   # Create a new S3 bucket
   aws s3 mb s3://your-portfolio-bucket-name
   ```

2. **Configure for Static Website**:
   - Go to S3 bucket properties
   - Enable "Static website hosting"
   - Set index document to `index.html`
   - Set error document to `index.html` (for SPA routing)

3. **Upload Files**:
   ```bash
   # Upload all files to S3
   aws s3 sync . s3://your-portfolio-bucket-name --exclude "*.md"
   ```

4. **Set Permissions**:
   ```bash
   # Make files publicly readable
   aws s3 cp s3://your-portfolio-bucket-name s3://your-portfolio-bucket-name --recursive --acl public-read
   ```

### Alternative: GitHub Pages

1. **Create Repository**: Create a new GitHub repository
2. **Upload Files**: Push all files to the repository
3. **Enable Pages**: Go to Settings > Pages and enable GitHub Pages
4. **Select Source**: Choose main branch as source

## 🔧 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #00f5ff;
    --secondary-color: #0099cc;
    --accent-color: #ff6b6b;
    /* ... other variables */
}
```

### Content
- Update personal information in `index.html`
- Replace placeholder image with your photo
- Update resume file with your actual resume
- Modify project descriptions and technologies

### Contact Information
Update contact details in the contact section:
- Email address: ehabxm25@gmail.com
- Phone: +201022871019
- LinkedIn profile: https://www.linkedin.com/in/ehab-ashraf-mu
- GitHub profile: https://www.github.com/EhabAshrafMu
- Location: Egypt

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Loading Speed**: Optimized for fast loading
- **SEO**: Proper meta tags and structured data
- **Accessibility**: WCAG 2.1 AA compliant

## 🔒 Security

- **HTTPS**: Use HTTPS for production deployment
- **CSP**: Consider adding Content Security Policy headers
- **External Links**: All external links use `rel="noopener noreferrer"`

## 📈 Analytics

To add analytics, include Google Analytics or other tracking scripts in the `<head>` section of `index.html`.

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements, please open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: ehabxm25@gmail.com
- **Phone**: +201022871019
- **LinkedIn**: [linkedin.com/in/ehab-ashraf-mu](https://www.linkedin.com/in/ehab-ashraf-mu)
- **GitHub**: [github.com/EhabAshrafMu](https://www.github.com/EhabAshrafMu)
- **Location**: Egypt (Remote Available)

---

Built with ❤️ by Ehab Ashraf Muhammed
