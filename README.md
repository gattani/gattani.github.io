# Abhishek Gattani - Personal Website & Resume

![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge&logo=google-chrome)

Welcome to the repository for my personal resume website. This site serves as a digital portfolio and professional summary, showcasing my experience as a Customer Engineer at Google Cloud and Data & Analytics Leader.

## 🔗 Live Site

You can visit the live website at: **[abhishek.gattani.ca](http://abhishek.gattani.ca)**

## 🛠️ Built With

- **Jekyll**: Static site generator.
- **Liquid**: Templating engine.
- **HTML5/CSS3**: Custom structure and styling.
- **GitHub Pages**: Hosting and deployment.

## 📝 How to Update Content

The content of the resume is separated from the design. You can update your information by editing the YAML files in the `_data/` directory.

### 1. **Profile & Contact Info** (`_data/profile.yml`)
Update your name, title, summary, email, linkedin, and location.

### 2. **Experience** (`_data/experience.yml`)
Add or edit jobs. Each job has:
- `role`: Job title
- `company`: Company name
- `date`: Employment period
- `description`: List of bullet points describing your work

### 3. **Education** (`_data/education.yml`)
Update your degrees and schools.

### 4. **Certifications** (`_data/certifications.yml`)
Add new certifications. You'll need:
- `name`: Certification title
- `image`: URL to the badge image
- `link`: URL to the Credly/verification page

### 5. **Skills** (`_data/skills.yml`)
Update skills categorized by group (e.g., Strategy, Technical, Cloud).

## 💻 Local Development

To run this project locally, you need [Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Bundler](https://bundler.io/) installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gattani/gattani.github.io.git
    cd gattani.github.io
    ```

2.  **Install dependencies:**
    ```bash
    bundle install
    ```

3.  **Run the server:**
    ```bash
    bundle exec jekyll serve
    ```

4.  **View the site:**
    Open `http://localhost:4000` in your browser.

## 🚀 Deployment

This site is hosted on GitHub Pages. To deploy changes:

1.  Make your edits.
2.  Commit and push to the `main` branch.
    ```bash
    git add .
    git commit -m "Update resume content"
    git push
    ```
3.  GitHub Actions will automatically build and deploy the site.

## 📄 License

&copy; Abhishek Gattani. All rights reserved.
