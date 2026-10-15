'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Heart, Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import buildYourOwnSoapImage from '../assets/buildyourownsoap.png'
import giftBoxImage from '../assets/giftbox.png'
import moodSoapImage from '../assets/moodsoap.png'
import bannerImage from '../assets/banner/banner.jpg'
import bannerImage2 from '../assets/banner/banner2.jpg'
import bannerImage3 from '../assets/banner/banner3.jpg'
import storyImage from '../assets/story.jpg'
import mellowLogoImage from '../assets/logo.png'
import vuLeHieuKhanhImage from '../assets/people/Vu Le Hieu Khanh.jpg'
import hoangBichTienImage from '../assets/people/Hoang Bich Tien.jpg'
import haThiNgocLanImage from '../assets/people/Ha Thi Ngoc Lan.jpg'
import ninhHaiNamImage from '../assets/people/Ninh Hai Nam.jpg'
import nguyenNgocLinhImage from '../assets/people/Nguyen Ngoc Linh.jpg'
import nguyenHuyThaiImage from '../assets/people/Nguyen Huy Thai.jpg'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-removebg-preview-ZOZI9nhcalkCZpzhRfHzVyYFU4b6ay.png'
const moods = [{ title: 'Calm', scent: 'Lavender', tone: 'lavender', icon: '☾' }, { title: 'Energy', scent: 'Citrus', tone: 'yellow', icon: '☼' }, { title: 'Focus', scent: 'Mint', tone: 'sage', icon: '⌁' }, { title: 'Love', scent: 'Rose', tone: 'rose', icon: '♡' }, { title: 'Comfort', scent: 'Vanilla', tone: 'blue', icon: '☁' }, { title: 'Reset', scent: 'Oat', tone: 'sand', icon: '✦' }]
const collections = [
  { title: 'Mood Soap Collection', caption: 'Core Product Line · 6 moods, 6 feelings', image: moodSoapImage, description: 'Six 130 g bars connect scent and color to a mood: CALM (lavender), GLOW (citrus), FOCUS (mint and rosemary), LOVE (rose), COMFORT (vanilla and floral), and PURE (oat and herbs). Choose a bar by asking, “How do you want to feel today?” Each kraft-wrapped bar has a QR code linking to its mood playlist.' },
  { title: 'Build Your Own Soap', caption: 'Made to order · Your soap, your way', image: buildYourOwnSoapImage, description: 'Personalize a 130 g bar in five steps: mood, scent, color, shape, and a short message. Choose from six scents, six colors, and six standard shapes. Each bar is engraved with a name or message and made within three working days.' },
  { title: 'Mood Gift Box', caption: 'A little something for every occasion', image: giftBoxImage, description: 'One thoughtful gift box with a Mood Soap of your choice, a foaming mesh bag, a MELLOW keychain, and a personal QR card. Choose one of three card designs: Need a Break, Good Luck, or Self-Love.' },
]
const banners = [
  { image: bannerImage, alt: 'MELLOW handmade soap collection and Build Your Own Soap banner' },
  { image: bannerImage2, alt: 'Build Your Own Soap customization steps banner' },
  { image: bannerImage3, alt: 'MELLOW Mood Gift Box details banner' },
]
const teamMembers = [
  { name: 'Vu Le Hieu Khanh', role: 'Founder & Creative Director', image: vuLeHieuKhanhImage, experience: 'Experience in business planning and project coordination through academic projects and team activities.' },
  { name: 'Hoang Bich Tien', role: 'Soap Formulation & Product Development Specialist', image: hoangBichTienImage, experience: 'Coursework and independent research in ingredient research and product development.' },
  { name: 'Ha Thi Ngoc Lan', role: 'Production & Supply Chain Manager', image: haThiNgocLanImage, experience: 'Experience in planning, resource allocation, and task coordination through group projects and operational activities.' },
  { name: 'Ninh Hai Nam', role: 'Brand & Marketing Manager', image: ninhHaiNamImage, experience: 'Practical experience in digital content creation, market research, and brand communication through academic and extracurricular projects.' },
  { name: 'Nguyen Ngoc Linh', role: 'Sales & Customer Experience Manager', image: nguyenNgocLinhImage, experience: 'Experience in communication, customer engagement, and event coordination through team projects and extracurricular activities.' },
  { name: 'Nguyen Huy Thai', role: 'Finance & Operations Manager', image: nguyenHuyThaiImage, experience: 'Experience applying budgeting, quantitative analysis, and financial planning in academic assignments and analytical projects.' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [teamSlide, setTeamSlide] = useState(0)
  const [bannerSlide, setBannerSlide] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  useEffect(() => { const onScroll = () => setIsScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { const timer = window.setInterval(() => setTeamSlide((current) => (current + 1) % teamMembers.length), 4500); return () => window.clearInterval(timer) }, [])
  useEffect(() => { const timer = window.setInterval(() => setBannerSlide((current) => (current + 1) % banners.length), 5000); return () => window.clearInterval(timer) }, [])
  const closeMenu = () => setMenuOpen(false)
  return <main className="mellow-page">
    <header className={isScrolled ? 'reference-header is-scrolled' : 'reference-header'}><a className="nav-logo" href="#home" aria-label="Mellow home"><img src={logoUrl} alt="Mellow Handmade Soap" /></a><nav className={menuOpen ? 'reference-nav open' : 'reference-nav'}><a href="#home" onClick={closeMenu}>Home</a><a href="#collections" onClick={closeMenu}>Collection</a><a href="#about" onClick={closeMenu}>About Us</a><a href="#contact" onClick={closeMenu}>Contact</a></nav><div className="nav-tools"><button aria-label="Search"><Search /></button><button aria-label="Account"><Heart /></button><button aria-label="Shopping bag"><ShoppingBag /><b>0</b></button><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button></div></header>
    <section id="home" className="reference-hero" aria-label="MELLOW featured banners"><div className="hero-brand-panel"><p className="script-note">Handmade with love ♡</p><h1><em>How do you want to feel today?</em></h1><p className="hero-lede">Natural handmade soaps for<br />your everyday mood.</p><a className="shop-button" href="#collections">Shop now <ArrowRight /></a></div><div className="hero-banner-carousel"><div className="hero-banner-track" aria-live="off">{banners.map((banner, index) => <div className={`hero-banner-slide ${index === bannerSlide ? 'active' : ''}`} key={banner.alt} aria-hidden={index !== bannerSlide}><img className="hero-banner-image" src={banner.image.src} alt={banner.alt} /></div>)}</div><div className="hero-banner-dots" aria-label="Choose a banner">{banners.map((banner, index) => <button key={banner.alt} type="button" className={index === bannerSlide ? 'active' : ''} onClick={() => setBannerSlide(index)} aria-label={`Show banner ${index + 1}`} aria-current={index === bannerSlide ? 'true' : undefined} />)}</div></div></section>
    <section id="moods" className="mood-strip"><div className="section-intro"><p className="section-kicker"><Sparkles /> Find your mood</p><p>Let your skin feel it.</p><a href="#collections">View all <ArrowRight /></a></div><div className="mood-row">{moods.map((mood) => <a className="mood-item" href="#collections" key={mood.title}><span className={`mood-circle ${mood.tone}`}>{mood.icon}</span><em>{mood.title}</em><small>{mood.scent}</small></a>)}</div></section>
    <section id="story" className="story-section"><div className="section-heading"><p className="section-kicker"><Heart /> Our story</p></div><div className="story-split"><div className="story-photo"><img className="story-photo-image" src={storyImage.src} alt="MELLOW’s six mood soaps: Calm, Glow, Focus, Love, Comfort, and Pure" /></div><div className="story-content"><h3 className="story-subtitle"><em>Bestsellers</em></h3><p>Our most-loved scents, crafted with gentle fragrance for a complete moment of calm.</p><a className="under-link" href="#collections">Explore collection <ArrowRight /></a><div className="polaroids"><div className="polaroid one">Good<br />Things<br />Take Time ♡</div><div className="polaroid two">Small<br />moments.<br />Big changes.</div></div></div></div></section>
    <section className="promise-row"><div><span>♧</span><p>100% natural<br />ingredients</p></div><div><span>♡</span><p>Safe for<br />sensitive skin</p></div><div><span>♧</span><p>Thoughtfully handmade,<br />bar by bar</p></div><div><span>◎</span><p>Kind to<br />the planet</p></div><strong>Small soap,<br /><em>Big care</em></strong></section>
    <section id="collections" className="collection-section"><div className="section-intro"><p className="section-kicker"><Sparkles /> Collection</p></div><div className="collection-row">{collections.map((collection, index) => <article className="collection-tile" key={collection.title}><div className="tile-image"><img src={collection.image.src} alt={collection.title} /><span>0{index + 1}</span></div><div className="tile-label"><div><h3>{collection.title}</h3><p>{collection.caption}</p></div></div><p className="collection-description">{collection.description}</p></article>)}</div></section>
    <section id="about" className="about-team-section"><div className="about-team-heading"><p className="section-kicker"><Heart /> About us</p><p>Meet the people behind every MELLOW bar.</p></div><div className="team-carousel"><div className="team-track" style={{ transform: `translateX(-${teamSlide * 100}%)` }}>{teamMembers.map((member) => <article className="team-card" key={member.name}><img src={member.image.src} alt={`${member.name}, ${member.role}`} /><div className="team-card-copy"><p>{member.role}</p><h3>{member.name}</h3><span>{member.experience}</span></div></article>)}</div><button className="team-arrow team-arrow-prev" onClick={() => setTeamSlide((teamSlide - 1 + teamMembers.length) % teamMembers.length)} aria-label="Previous team member"><ArrowRight /></button><button className="team-arrow team-arrow-next" onClick={() => setTeamSlide((teamSlide + 1) % teamMembers.length)} aria-label="Next team member"><ArrowRight /></button><div className="team-controls"><div className="team-dots">{teamMembers.map((member, index) => <button key={member.name} className={index === teamSlide ? 'active' : ''} onClick={() => setTeamSlide(index)} aria-label={`Show ${member.name}`} />)}</div><span>0{teamSlide + 1} / 0{teamMembers.length}</span></div></div></section>
    <section id="contact" className="contact-section"><div className="contact-heading"><p className="section-kicker"><Heart /> Contact us</p><h2>We&apos;d love to<br /><em>hear from you.</em></h2><p>Have a question, a kind thought, or simply want to say hello? Drop us a note and we&apos;ll get back to you soon.</p><div className="contact-details"><a href="mailto:hello@mellowsoap.com">hello@mellowsoap.com</a><span>Mon–Fri · 9am–5pm</span></div></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setContactSent(true) }}>{contactSent ? <div className="contact-success" role="status">Thank you for reaching out. We&apos;ll be in touch soon.</div> : <><label>Your name<input required type="text" name="name" /></label><label>Email address<input required type="email" name="email" /></label><label>Your message<textarea required name="message" rows={4} /></label><button type="submit">Send message <ArrowRight /></button></>}</form></section>
    <footer id="journal" className="reference-footer"><div className="footer-top"><div className="footer-brand"><img src={logoUrl} alt="Mellow Handmade Soap" /><p>Gentle care. Brighter days.</p></div><div className="footer-column"><h3>Explore</h3><nav aria-label="Footer navigation"><a href="#collections">Shop all soaps</a><a href="#story">Our story</a><a href="#about">Meet the team</a><a href="#contact">Contact us</a></nav></div><div className="footer-column"><h3>Care &amp; help</h3><nav aria-label="Customer service navigation"><a href="#contact">Shipping &amp; returns</a><a href="#contact">Soap care guide</a><a href="#contact">FAQs</a><a href="mailto:hello@mellowsoap.com">hello@mellowsoap.com</a></nav></div><div className="footer-socials-column"><h3>Socials</h3><div className="footer-socials"><a href="#contact" aria-label="Instagram">Instagram</a><a href="#contact" aria-label="Pinterest">Pinterest</a><a href="#contact" aria-label="TikTok">TikTok</a><a href="#contact" aria-label="Facebook">Facebook</a></div></div></div></footer>
  </main>
}
