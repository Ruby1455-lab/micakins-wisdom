/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Montserrat', sans-serif;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
}

/* Header & Navigation */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 8%;
    background-color: #1a222d; /* Premium Dark Navy Slate */
    position: sticky;
    top: 0;
    z-index: 1000;
}

header .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #d4af37; /* Metallic Gold Accent */
    letter-spacing: 1px;
}

nav a {
    color: #ffffff;
    text-decoration: none;
    margin-left: 25px;
    font-size: 0.9rem;
    font-weight: 400;
    transition: color 0.3s;
}

nav a:hover {
    color: #d4af37;
}

nav .btn-contact {
    background-color: #d4af37;
    color: #1a222d;
    padding: 8px 18px;
    border-radius: 4px;
    font-weight: 600;
}

nav .btn-contact:hover {
    background-color: #ffffff;
    color: #1a222d;
}

/* Hero Section */
.hero {
    position: relative;
    height: 85vh;
    background: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80') no-repeat center center/cover;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(26, 34, 45, 0.75); /* Dark tint overlay */
}

.hero-content {
    position: relative;
    z-index: 1;
    color: #ffffff;
    padding: 0 20px;
}

.hero-content h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 15px;
    letter-spacing: 2px;
}

.hero-content h1 span {
    color: #d4af37;
    font-size: 2.2rem;
    display: block;
    margin-top: 5px;
}

.hero-content .tagline {
    font-size: 1.2rem;
    font-weight: 300;
    margin-bottom: 30px;
    letter-spacing: 1px;
}

.cta-btn {
    display: inline-block;
    padding: 12px 30px;
    background-color: #d4af37;
    color: #1a222d;
    text-decoration: none;
    font-weight: 600;
    border-radius: 4px;
    transition: transform 0.3s, background-color 0.3s;
}

.cta-btn:hover {
    transform: translateY(-3px);
    background-color: #fff;
}

/* Services Section */
.services-section {
    padding: 80px 8%;
    text-align: center;
    background-color: #ffffff;
}

.services-section h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #1a222d;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
}

.service-card {
    background-color: #fdfdfd;
    padding: 35px 25px;
    border: 1px solid #eee;
    border-radius: 6px;
    transition: box-shadow 0.3s, transform 0.3s;
}

.service-card:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    transform: translateY(-5px);
    border-top: 4px solid #d4af37;
}

.service-card h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    color: #1a222d;
    margin-bottom: 15px;
}

.service-card p {
    font-size: 0.9rem;
    color: #666;
}

/* Showcase Gallery Section */
.gallery-section {
    padding: 80px 8%;
    background-color: #f4f5f7;
}

.gallery-section h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 40px;
    color: #1a222d;
}

.gallery-container {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 20px;
}

.main-image img, .side-images img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

.main-image {
    height: 500px;
}

.side-images {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 153px);
    gap: 20px;
}

/* Footer Section */
footer {
    background-color: #1a222d;
    color: #fff;
    padding: 60px 8% 20px 8%;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 40px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 40px;
}

.footer-info h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #d4af37;
}

.footer-info p {
    font-size: 0.9rem;
    color: #aaa;
}

.footer-contact h4 {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: #d4af37;
}

.footer-contact p, .footer-contact ul {
    font-size: 0.9rem;
    color: #ccc;
    margin-bottom: 10px;
}

.footer-contact ul {
    list-style: none;
    padding-left: 0;
}

.footer-contact a {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;
}

.footer-contact a:hover {
    color: #d4af37;
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
    font-size: 0.8rem;
    color: #777;
}

/* Responsive Adjustments */
@media(max-width: 768px) {
    header {
        flex-direction: column;
        gap: 15px;
    }
    nav a {
        margin: 0 10px;
    }
    .hero-content h1 {
        font-size: 2.3rem;
    }
    .hero-content h1 span {
        font-size: 1.6rem;
    }
    .gallery-container {
        grid-template-columns: 1fr;
    }
    .main-image {
        height: 300px;
    }
    .side-images {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 120px;
    }
    .footer-container {
        flex-direction: column;
    }
}
