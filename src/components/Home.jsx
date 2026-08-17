import React, { useState, useEffect } from 'react';
import '../assets/style/Home.css';

// Import local image assets
import heroRigImg from '../assets/images/hero-rig.jpg';
import rebuildBeforeImg from '../assets/images/rebuild-before.jpg';
import rebuildAfterImg from '../assets/images/rebuild-after.jpg';
import productTitanImg from '../assets/images/product-titan.jpg';
import productLaptopImg from '../assets/images/product-laptop.jpg';
import productPs5Img from '../assets/images/product-ps5.jpg';
import productGpuImg from '../assets/images/product-gpu.jpg';
import productDistroImg from '../assets/images/product-distro.jpg';
import productItxImg from '../assets/images/product-itx.jpg';
import avatar1Img from '../assets/images/avatar-1.jpg';
import avatar2Img from '../assets/images/avatar-2.jpg';
import avatar3Img from '../assets/images/avatar-3.jpg';

export default function Home() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Before/After comparison slider percentage (0-100)
  const [sliderPosition, setSliderPosition] = useState(50);

  // Catalog category filter state
  const [activeCategory, setActiveCategory] = useState('all');

  // Testimonials carousel active index
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    deviceType: 'pc', // pc, rig, laptop, ps5
    currentSpecs: '',
    performanceTarget: '4k-144hz',
    services: [], // Array of checked services
    budget: '1000-2500',
    dropoffDate: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    handoverPreference: 'dropoff'
  });
  const [bookingErrors, setBookingErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Auto-slide Testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prevIndex) => (prevIndex + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Products Dataset
  const products = [
    {
      id: 'titan',
      name: 'NEXUS TITAN-X',
      category: 'pcs',
      image: productTitanImg,
      badge: 'Custom Order',
      badgeType: 'custom',
      price: '₹4,89,999',
      specs: 'RTX 4090 / i9-14900KS / 64GB DDR5 / Custom Loop'
    },
    {
      id: 'laptop',
      name: 'APEX RAIDER 17',
      category: 'laptops',
      image: productLaptopImg,
      badge: 'In Stock',
      badgeType: 'stock',
      price: '₹2,65,000',
      specs: 'RTX 4080 / i9-13980HX / 32GB RAM / 240Hz QHD'
    },
    {
      id: 'ps5',
      name: 'PS5 STEALTH CHASSIS',
      category: 'console',
      image: productPs5Img,
      badge: 'Custom Order',
      badgeType: 'custom',
      price: '₹84,999',
      specs: 'Matte Liquid Cooling Mod / High-Flow Fan / 2TB SSD'
    },
    {
      id: 'gpu',
      name: 'RTX 4090 WATERBLOCK EDITION',
      category: 'parts',
      image: productGpuImg,
      badge: 'In Stock',
      badgeType: 'stock',
      price: '₹1,89,999',
      specs: 'Pre-fitted EK Vector block / Premium Thermal Pads'
    },
    {
      id: 'distro',
      name: 'AURAFLOW RESERVOIR',
      category: 'parts',
      image: productDistroImg,
      badge: 'In Stock',
      badgeType: 'stock',
      price: '₹32,000',
      specs: 'O11D Custom Distro Plate / D5 Pump / Addressable RGB'
    },
    {
      id: 'itx',
      name: 'NEON BEAST ITX',
      category: 'pcs',
      image: productItxImg,
      badge: 'Custom Order',
      badgeType: 'custom',
      price: '₹2,99,999',
      specs: 'RTX 4070 Ti / R7 7800X3D / Custom SFF Tubing'
    }
  ];

  // Testimonials Dataset
  const testimonials = [
    {
      name: 'Marcus "Viper" Vance',
      tag: '@vipergaming',
      avatar: avatar1Img,
      badge: 'RTX 4090 Custom Loop Owner',
      improvement: '+42% FPS / -28°C Thermals',
      review: 'NEXUS Rigs rebuilt my system from scratch. The cable combing is literal art, and my CPU load temperatures dropped from 89°C to a chilled 61°C. Incredible craftsmanship!'
    },
    {
      name: 'Elena "Cipher" Rostova',
      tag: '@cipher_dev',
      avatar: avatar2Img,
      badge: 'PS5 Cooling Mod Owner',
      improvement: 'Zero Fan Noise / Peak Speed',
      review: 'My stock PS5 sounded like a jet engine. The matte black custom armor and liquid metal cooling mod made it dead silent. Highly recommend their console overhaul!'
    },
    {
      name: 'Jaxson "Pulse" Mercer',
      tag: '@pulsar_fps',
      avatar: avatar3Img,
      badge: 'APEX ITX Custom Owner',
      improvement: 'SFF High-Airflow Overhaul',
      review: 'Building a powerful ITX system that doesn\'t thermal throttle is extremely difficult. The team at NEXUS optimized the static pressure curves perfectly. It runs like a beast.'
    }
  ];

  // Filter products based on category selection
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Toggle checklist service in state
  const handleServiceChange = (serviceName) => {
    setBookingForm(prev => {
      const services = prev.services.includes(serviceName)
        ? prev.services.filter(s => s !== serviceName)
        : [...prev.services, serviceName];
      return { ...prev, services };
    });
  };

  // Form Validations
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!bookingForm.customerName.trim()) errors.customerName = 'Name is required';
    if (!bookingForm.customerPhone.trim()) errors.customerPhone = 'WhatsApp/Phone is required';
    if (!bookingForm.customerEmail.trim()) {
      errors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bookingForm.customerEmail)) {
      errors.customerEmail = 'Invalid email address';
    }
    if (!bookingForm.currentSpecs.trim()) errors.currentSpecs = 'Please describe your current specifications';
    if (!bookingForm.dropoffDate) errors.dropoffDate = 'Please select a preferred date';

    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      setBookingSuccess(false);
    } else {
      setBookingErrors({});
      setBookingSuccess(true);
      // Reset form (except structural dropdowns)
      setBookingForm(prev => ({
        ...prev,
        currentSpecs: '',
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        dropoffDate: '',
        services: []
      }));
    }
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (enquiryForm.name.trim() && enquiryForm.phone.trim() && enquiryForm.message.trim()) {
      setEnquirySuccess(true);
      setEnquiryForm({ name: '', phone: '', message: '' });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="nx-wrapper">
      {/* GLOWING ORBS BACKGROUND */}
      <div className="nx-background-grid">
        <div className="nx-ambient-orb orb-1"></div>
        <div className="nx-ambient-orb orb-2"></div>
        <div className="nx-ambient-orb orb-3"></div>
      </div>

      {/* STICKY HEADER & NAVBAR */}
      <header className="nx-header">
        <div className="nx-header-container">
          <div className="nx-logo-area">
            <span className="nx-logo-brand">NEXUS</span>
            <span className="nx-logo-divider">//</span>
            <span className="nx-logo-sub">RIGS</span>
          </div>

          <nav className="nx-desktop-nav">
            <a href="#overview">Overview</a>
            <a href="#re-assembly">Re-Assembly Mod</a>
            <a href="#rigs-spares">Rigs &amp; Spares</a>
            <a href="#upgrade-deals">Upgrade Deals</a>
            <a href="#showcase">Showcase</a>
            <a href="#reviews">Reviews</a>
            <a href="#workshop">Workshop</a>
          </nav>

          <a href="#booking" className="nx-cta-btn">Book Re-Build</a>

          <button 
            className={`nx-hamburger ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            id="nx-hamburger-trigger"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`nx-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="nx-mobile-nav">
            <a href="#overview" onClick={() => setMobileMenuOpen(false)}>Overview</a>
            <a href="#re-assembly" onClick={() => setMobileMenuOpen(false)}>Re-Assembly Mod</a>
            <a href="#rigs-spares" onClick={() => setMobileMenuOpen(false)}>Rigs &amp; Spares</a>
            <a href="#upgrade-deals" onClick={() => setMobileMenuOpen(false)}>Upgrade Deals</a>
            <a href="#showcase" onClick={() => setMobileMenuOpen(false)}>Showcase</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
            <a href="#workshop" onClick={() => setMobileMenuOpen(false)}>Workshop</a>
            <a href="#booking" className="nx-mobile-cta" onClick={() => setMobileMenuOpen(false)}>Book Re-Build</a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="overview" className="nx-hero">
          <div className="nx-hero-content">
            <div className="nx-hero-pill">
              <span className="nx-pill-icon">⚡</span>
              <span>NEXT-GEN RE-ASSEMBLY &amp; CUSTOM BUILDS</span>
            </div>
            
            <h1 className="nx-hero-title">
              Transform Your PC Into A <span className="nx-highlight-cyan">Liquid-Cooled</span> Cyber Weapon
            </h1>
            
            <p className="nx-hero-subtitle">
              We dismantle, optimize, re-paste with liquid metal, and reconstruct stock systems into pristine, high-airflow masterpieces. Zero thermal throttling. Peak frames.
            </p>

            <div className="nx-hero-buttons">
              <a href="#booking" className="nx-btn-primary">Configure &amp; Book Re-Build</a>
              <a href="#rigs-spares" className="nx-btn-secondary">Browse Inventory</a>
            </div>
          </div>

          <div className="nx-hero-showcase">
            <div className="nx-cyber-card-wrapper">
              <div className="nx-corner-bracket tl"></div>
              <div className="nx-corner-bracket tr"></div>
              <div className="nx-corner-bracket bl"></div>
              <div className="nx-corner-bracket br"></div>
              
              <div className="nx-showcase-image-holder">
                <img src={heroRigImg} alt="Flagship custom PC loop" className="nx-showcase-img" />
                
                {/* Floating Benchmark Chips */}
                <div className="nx-benchmark-chip chip-fps">
                  <span className="nx-chip-val">+78.4 FPS Boost</span>
                  <span className="nx-chip-sub">Cyberpunk 4K Ultra</span>
                </div>
                <div className="nx-benchmark-chip chip-thermal">
                  <span className="nx-chip-val">-23.5°C Thermals</span>
                  <span className="nx-chip-sub">Liquid Metal Mod</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="nx-stats-bar">
          <div className="nx-stats-container">
            <div className="nx-stat-item">
              <h2 className="nx-stat-number">3,500+</h2>
              <p className="nx-stat-label">Rigs Rebuilt &amp; Delivered</p>
            </div>
            <div className="nx-stat-item">
              <h2 className="nx-stat-number">99.8%</h2>
              <p className="nx-stat-label">Stability Rate (Prime95 + FurMark)</p>
            </div>
            <div className="nx-stat-item">
              <h2 className="nx-stat-number">4.9 / 5.0</h2>
              <p className="nx-stat-label">Gamer Satisfaction Rating</p>
            </div>
            <div className="nx-stat-item">
              <h2 className="nx-stat-number">24-48 Hrs</h2>
              <p className="nx-stat-label">Rapid Overhaul Turnaround</p>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER SLIDER SHOWCASE */}
        <section id="re-assembly" className="nx-section nx-slider-section">
          <div className="nx-section-header">
            <span className="nx-section-tag">REMODELS &amp; RE-ASSEMBLY</span>
            <h2 className="nx-section-title">Cleanse Your Hardware Void</h2>
            <p className="nx-section-desc">See the ultimate transition: from a dusty, thermal-throttling stock machine to a pristine, cable-combed liquid metal layout.</p>
          </div>

          <div className="nx-slider-container">
            <div className="nx-slider-inner">
              {/* Draggable slider container */}
              <div className="nx-image-comparison" style={{ '--slider-pos': `${sliderPosition}%` }}>
                {/* After image (underneath/right side) */}
                <img src={rebuildAfterImg} alt="Pristine Custom Rig Rebuild" className="nx-image-after" />
                
                {/* Before image (on top/left side, clipped) */}
                <div className="nx-image-before-wrapper">
                  <img src={rebuildBeforeImg} alt="Dusty Stock Rig Before" className="nx-image-before" />
                </div>

                {/* Glowing vertical seam divider */}
                <div className="nx-slider-divider">
                  <div className="nx-slider-glowing-handle">
                    <span className="nx-handle-arrows">&lt;&nbsp;&gt;</span>
                  </div>
                </div>

                {/* Range Input mapping on top to handle slide */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderPosition} 
                  onChange={(e) => setSliderPosition(e.target.value)} 
                  className="nx-comparison-range"
                  aria-label="Before and after image comparison slider"
                />
              </div>

              {/* Checklist of modifications */}
              <div className="nx-specs-checklist">
                <h3 className="nx-checklist-title">NEXUS Rig Overhaul Protocol</h3>
                <div className="nx-checklist-grid">
                  <div className="nx-checklist-item">
                    <span className="nx-check-icon">✓</span>
                    <div>
                      <h4>Liquid Metal Repasting</h4>
                      <p>Conductivity upgrade replacing cheap stock paste with Thermal Grizzly Conductonaut.</p>
                    </div>
                  </div>
                  <div className="nx-checklist-item">
                    <span className="nx-check-icon">✓</span>
                    <div>
                      <h4>Static Pressure Fan Curves</h4>
                      <p>Optimized pull-push fan ratios mapped directly to dynamic GPU/CPU hot-spots.</p>
                    </div>
                  </div>
                  <div className="nx-checklist-item">
                    <span className="nx-check-icon">✓</span>
                    <div>
                      <h4>Custom Sleeved Cable Routing</h4>
                      <p>Precision routing using premium acrylic combs for zero airflow resistance.</p>
                    </div>
                  </div>
                  <div className="nx-checklist-item">
                    <span className="nx-check-icon">✓</span>
                    <div>
                      <h4>Memory BIOS Optimization</h4>
                      <p>Enabling custom XMP/EXPO subtimings for latency minimization.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE PRODUCTS & CATALOG */}
        <section id="rigs-spares" className="nx-section nx-catalog">
          <div className="nx-section-header">
            <span className="nx-section-tag">HARDWARE VAULT</span>
            <h2 className="nx-section-title">Engineered Cybernetics</h2>
            <p className="nx-section-desc">Select a category to filter our ready-to-ship components, custom modded systems, and high-performance gaming rigs.</p>
          </div>

          {/* Dynamic Category Selector */}
          <div className="nx-filter-tabs">
            <button className={`nx-tab-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All Gear</button>
            <button className={`nx-tab-btn ${activeCategory === 'pcs' ? 'active' : ''}`} onClick={() => setActiveCategory('pcs')}>Gaming PCs</button>
            <button className={`nx-tab-btn ${activeCategory === 'laptops' ? 'active' : ''}`} onClick={() => setActiveCategory('laptops')}>Gaming Laptops</button>
            <button className={`nx-tab-btn ${activeCategory === 'console' ? 'active' : ''}`} onClick={() => setActiveCategory('console')}>PlayStation Mods</button>
            <button className={`nx-tab-btn ${activeCategory === 'parts' ? 'active' : ''}`} onClick={() => setActiveCategory('parts')}>Spare Parts</button>
          </div>

          {/* Filtered Grid */}
          <div className="nx-products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="nx-product-card">
                <div className="nx-product-image-container">
                  <img src={product.image} alt={product.name} className="nx-product-img" />
                  <span className={`nx-product-badge ${product.badgeType}`}>{product.badge}</span>
                </div>
                <div className="nx-product-details">
                  <h3 className="nx-product-name">{product.name}</h3>
                  <p className="nx-product-specs">{product.specs}</p>
                  <div className="nx-product-pricing-bar">
                    <span className="nx-product-price">{product.price}</span>
                    <a href="#booking" className="nx-product-cta">Add to Build</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TACTICAL OFFERS & UPGRADE BUNDLES */}
        <section id="upgrade-deals" className="nx-section nx-offers">
          <div className="nx-section-header">
            <span className="nx-section-tag">TACTICAL OFFERS</span>
            <h2 className="nx-section-title">Performance Upgrades &amp; Trade-ins</h2>
            <p className="nx-section-desc">Accelerate your upgrade cycle with specialized hardware configurations and trade programs.</p>
          </div>

          <div className="nx-offers-grid">
            {/* Card 1 */}
            <div className="nx-offer-card bg-magenta-glow">
              <span className="nx-offer-badge">TRADE-IN PROGRAM</span>
              <h3 className="nx-offer-title">Trade-In Swap &amp; Credit</h3>
              <p className="nx-offer-text">
                Exchange your dusty stock GPU or CPU setup. Receive up to 40% trade-in valuation applied directly as credit towards any fully custom liquid-metal loop gaming beast.
              </p>
              <a href="#booking" className="nx-offer-btn">Claim Trade Value</a>
            </div>

            {/* Card 2 */}
            <div className="nx-offer-card bg-cyan-glow">
              <span className="nx-offer-badge">SYSTEM BUNDLE</span>
              <h3 className="nx-offer-title">Free 360mm ARGB Cooler</h3>
              <p className="nx-offer-text">
                Configure a custom build with any Intel Core i9 or AMD Ryzen 9 processor this month and get a free 360mm ARGB high-static pressure liquid cooling loop integration.
              </p>
              <a href="#booking" className="nx-offer-btn">Apply to Build</a>
            </div>

            {/* Card 3 */}
            <div className="nx-offer-card bg-purple-glow">
              <span className="nx-offer-badge">CONSOLES</span>
              <h3 className="nx-offer-title">PS5 Stealth Pro Overhaul</h3>
              <p className="nx-offer-text">
                Includes full disassembly, dust clearance, replacing the standard APU thermal material with liquid metal, high-flow fan mods, and custom matte armor plates.
              </p>
              <a href="#booking" className="nx-offer-btn">Book Console Mod</a>
            </div>
          </div>
        </section>

        {/* INTERACTIVE BOOKING FORM */}
        <section id="booking" className="nx-section nx-booking">
          <div className="nx-booking-box">
            <div className="nx-section-header text-center">
              <span className="nx-section-tag">ALTERATION HUB</span>
              <h2 className="nx-section-title">Configure Your Build Protocol</h2>
              <p className="nx-section-desc">Submit your hardware blueprints. Our technical modification specialists will verify compatibility and respond with a detailed pricing quote.</p>
            </div>

            {bookingSuccess && (
              <div className="nx-success-banner">
                <span className="nx-success-icon">✓</span>
                <div>
                  <h4>RE-BUILD Blueprints Registered!</h4>
                  <p>We've logged your machine specifications. Check your WhatsApp/Email within the next 2 hours for your detailed pricing quote &amp; drop-off booking slot.</p>
                </div>
              </div>
            )}

            <form className="nx-booking-form" onSubmit={handleBookingSubmit} noValidate>
              <div className="nx-form-grid">
                
                {/* Radio Pills for Device Type */}
                <div className="nx-form-group span-full">
                  <label className="nx-form-label">Target Device Type</label>
                  <div className="nx-radio-pills">
                    <label className={`nx-radio-pill ${bookingForm.deviceType === 'pc' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="deviceType" 
                        value="pc" 
                        checked={bookingForm.deviceType === 'pc'} 
                        onChange={() => setBookingForm(prev => ({ ...prev, deviceType: 'pc' }))} 
                      />
                      🖥️ Standard PC
                    </label>
                    <label className={`nx-radio-pill ${bookingForm.deviceType === 'rig' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="deviceType" 
                        value="rig" 
                        checked={bookingForm.deviceType === 'rig'} 
                        onChange={() => setBookingForm(prev => ({ ...prev, deviceType: 'rig' }))} 
                      />
                      ⚡ Custom Rig
                    </label>
                    <label className={`nx-radio-pill ${bookingForm.deviceType === 'laptop' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="deviceType" 
                        value="laptop" 
                        checked={bookingForm.deviceType === 'laptop'} 
                        onChange={() => setBookingForm(prev => ({ ...prev, deviceType: 'laptop' }))} 
                      />
                      💻 Laptop
                    </label>
                    <label className={`nx-radio-pill ${bookingForm.deviceType === 'ps5' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="deviceType" 
                        value="ps5" 
                        checked={bookingForm.deviceType === 'ps5'} 
                        onChange={() => setBookingForm(prev => ({ ...prev, deviceType: 'ps5' }))} 
                      />
                      🎮 PS5 / Pro
                    </label>
                  </div>
                </div>

                {/* Current Specs Input */}
                <div className="nx-form-group span-full">
                  <label htmlFor="currentSpecs" className="nx-form-label">Current Specs / Model Details</label>
                  <textarea 
                    id="currentSpecs" 
                    className={`nx-form-control ${bookingErrors.currentSpecs ? 'error' : ''}`}
                    placeholder="e.g. Intel i7-11700K, RTX 3070 OEM, 16GB RAM, thermal throttling at 95°C..." 
                    value={bookingForm.currentSpecs}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, currentSpecs: e.target.value }))}
                  />
                  {bookingErrors.currentSpecs && <span className="nx-error-text">{bookingErrors.currentSpecs}</span>}
                </div>

                {/* Performance Target Dropdown */}
                <div className="nx-form-group">
                  <label htmlFor="performanceTarget" className="nx-form-label">Performance Target</label>
                  <select 
                    id="performanceTarget" 
                    className="nx-form-control"
                    value={bookingForm.performanceTarget}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, performanceTarget: e.target.value }))}
                  >
                    <option value="4k-144hz">4K 144Hz Ultra Preset</option>
                    <option value="raytracing">Max Ray-Tracing (DLSS/FSR Off)</option>
                    <option value="silent">Silent Workspace (Zero Noise Target)</option>
                    <option value="esports">Competitive Esports 360FPS</option>
                  </select>
                </div>

                {/* Budget Dropdown */}
                <div className="nx-form-group">
                  <label htmlFor="budgetRange" className="nx-form-label">Estimated Mod Budget</label>
                  <select 
                    id="budgetRange" 
                    className="nx-form-control"
                    value={bookingForm.budget}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, budget: e.target.value }))}
                  >
                    <option value="under-50000">Under ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-250000">₹1,00,000 - ₹2,50,000</option>
                    <option value="250000-500000">₹2,50,000 - ₹5,00,000</option>
                    <option value="500000+">₹5,00,000+</option>
                  </select>
                </div>

                {/* Services Checklist */}
                <div className="nx-form-group span-full">
                  <label className="nx-form-label">Desired Modification Protocols</label>
                  <div className="nx-services-checklist">
                    {[
                      'Full Teardown & Chemical Cleanse',
                      'EKWB Custom Liquid Cooling Loop',
                      'Liquid Metal APU Repasting Mod',
                      'GPU Upgrade & Thermal Pad Repad',
                      'Noctua High-Flow Fan Custom Map',
                      'Custom Combat Cable Comb Sleeve',
                      'Memory Subtiming & BIOS Optimization'
                    ].map((service, idx) => (
                      <label key={idx} className={`nx-checkbox-label ${bookingForm.services.includes(service) ? 'checked' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={bookingForm.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                        />
                        <span className="nx-checkbox-box"></span>
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Picker */}
                <div className="nx-form-group">
                  <label htmlFor="dropoffDate" className="nx-form-label">Preferred Drop-Off Date</label>
                  <input 
                    type="date" 
                    id="dropoffDate" 
                    className={`nx-form-control ${bookingErrors.dropoffDate ? 'error' : ''}`}
                    value={bookingForm.dropoffDate}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, dropoffDate: e.target.value }))}
                  />
                  {bookingErrors.dropoffDate && <span className="nx-error-text">{bookingErrors.dropoffDate}</span>}
                </div>

                {/* Handover Preference */}
                <div className="nx-form-group">
                  <label htmlFor="handoverPreference" className="nx-form-label">Handover Preference</label>
                  <select 
                    id="handoverPreference" 
                    className="nx-form-control"
                    value={bookingForm.handoverPreference}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, handoverPreference: e.target.value }))}
                  >
                    <option value="dropoff">Physical Workshop Drop-Off</option>
                    <option value="courier">Insured Hardcase Courier Inward</option>
                    <option value="collect">NEXUS Secured Bangalore Pick-up (+₹4,000)</option>
                  </select>
                </div>

                <div className="nx-form-divider span-full">
                  <span>Verification &amp; Contact Blueprints</span>
                </div>

                {/* Customer Name */}
                <div className="nx-form-group">
                  <label htmlFor="customerName" className="nx-form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="customerName" 
                    className={`nx-form-control ${bookingErrors.customerName ? 'error' : ''}`}
                    placeholder="e.g. Jordan Mercer" 
                    value={bookingForm.customerName}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, customerName: e.target.value }))}
                  />
                  {bookingErrors.customerName && <span className="nx-error-text">{bookingErrors.customerName}</span>}
                </div>

                {/* Phone */}
                <div className="nx-form-group">
                  <label htmlFor="customerPhone" className="nx-form-label">WhatsApp / Secure Phone</label>
                  <input 
                    type="tel" 
                    id="customerPhone" 
                    className={`nx-form-control ${bookingErrors.customerPhone ? 'error' : ''}`}
                    placeholder="e.g. +91-9586523658" 
                    value={bookingForm.customerPhone}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                  />
                  {bookingErrors.customerPhone && <span className="nx-error-text">{bookingErrors.customerPhone}</span>}
                </div>

                {/* Email */}
                <div className="nx-form-group span-full">
                  <label htmlFor="customerEmail" className="nx-form-label">Secure Email Address</label>
                  <input 
                    type="email" 
                    id="customerEmail" 
                    className={`nx-form-control ${bookingErrors.customerEmail ? 'error' : ''}`}
                    placeholder="e.g. user@nexusrigs.com" 
                    value={bookingForm.customerEmail}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                  />
                  {bookingErrors.customerEmail && <span className="nx-error-text">{bookingErrors.customerEmail}</span>}
                </div>

              </div>

              <button type="submit" className="nx-btn-submit span-full">
                Deploy Build blueprint to Nexus Rigs 🚀
              </button>
            </form>
          </div>
        </section>

        {/* CRAFTSMANSHIP GALLERY */}
        <section id="showcase" className="nx-section nx-gallery">
          <div className="nx-section-header">
            <span className="nx-section-tag">CRAFTSMANSHIP VAULT</span>
            <h2 className="nx-section-title">Nexus Forge Gallery</h2>
            <p className="nx-section-desc">Explore the builds that left our cleanrooms. Every rig represents zero compromised components.</p>
          </div>

          <div className="nx-gallery-grid">
            {/* Item 1 */}
            <div className="nx-gallery-item size-tall">
              <img src={productTitanImg} alt="Titan Loop System" />
              <div className="nx-gallery-overlay">
                <span className="nx-gallery-category">Custom PC</span>
                <h4>Titan-X Hardline Cyber-Rig</h4>
              </div>
            </div>
            {/* Item 2 */}
            <div className="nx-gallery-item">
              <img src={rebuildAfterImg} alt="Rig modification showcase" />
              <div className="nx-gallery-overlay">
                <span className="nx-gallery-category">Rebuild Mod</span>
                <h4>OEM Liquidation Rebuild</h4>
              </div>
            </div>
            {/* Item 3 */}
            <div className="nx-gallery-item">
              <img src={productPs5Img} alt="PS5 mod custom" />
              <div className="nx-gallery-overlay">
                <span className="nx-gallery-category">Console Mod</span>
                <h4>Matte PS5 Stealth Armour</h4>
              </div>
            </div>
            {/* Item 4 */}
            <div className="nx-gallery-item size-wide">
              <img src={heroRigImg} alt="Custom RGB Loop" />
              <div className="nx-gallery-overlay">
                <span className="nx-gallery-category">Rig Mod</span>
                <h4>Hydro-Locked Battlestation Core</h4>
              </div>
            </div>
            {/* Item 5 */}
            <div className="nx-gallery-item">
              <img src={productDistroImg} alt="Acrylic loop distro plate" />
              <div className="nx-gallery-overlay">
                <span className="nx-gallery-category">Spare Parts</span>
                <h4>AuraFlow Dual pump mod</h4>
              </div>
            </div>
            {/* Item 6 */}
            <div className="nx-gallery-item">
              <img src={productItxImg} alt="Custom ITX setup" />
              <div className="nx-gallery-overlay">
                <span className="nx-gallery-category">ITX Build</span>
                <h4>Mini-ITX Neon Overload</h4>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDING TESTIMONIALS CAROUSEL */}
        <section id="reviews" className="nx-section nx-testimonials">
          <div className="nx-section-header">
            <span className="nx-section-tag">VERIFIED DATABANKS</span>
            <h2 className="nx-section-title">Transmitted Reviews</h2>
            <p className="nx-section-desc">Verifiable hardware benchmark updates straight from the NEXUS RIGS Discord and Steam community networks.</p>
          </div>

          <div className="nx-testimonials-carousel-wrapper">
            <div 
              className="nx-testimonials-track" 
              style={{ transform: `translateX(-${(currentTestimonial * 100) / testimonials.length}%)` }}
            >
              {testimonials.map((t, idx) => (
                <div key={idx} className="nx-testimonial-slide">
                  <div className="nx-testimonial-card">
                    <div className="nx-testimonial-user">
                      <img src={t.avatar} alt={t.name} className="nx-user-avatar" />
                      <div>
                        <h4 className="nx-user-name">{t.name}</h4>
                        <p className="nx-user-handle">{t.tag} <span className="nx-green-glow">Discord Verified</span></p>
                      </div>
                      <div className="nx-user-stats">
                        <span className="nx-val-badge">{t.improvement}</span>
                      </div>
                    </div>
                    <p className="nx-testimonial-text">"{t.review}"</p>
                    <div className="nx-star-row">⭐⭐⭐⭐⭐ <span className="nx-sub-badge">{t.badge}</span></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="nx-carousel-dots">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`nx-dot ${currentTestimonial === idx ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* PHYSICAL WORKSHOP LOCATION, MAP & ENQUIRY */}
        <section id="workshop" className="nx-section nx-workshop">
          <div className="nx-workshop-grid">
            
            {/* Quick enquiry card & phone info */}
            <div className="nx-workshop-left">
              <h2 className="nx-workshop-title">Nexus HQ drop point</h2>
              <p className="nx-workshop-intro">
                Drop off your rig physically in our secure high-tech modifications cleanroom or submit a quick component availability inquiry.
              </p>

              <div className="nx-workshop-contact-list">
                <div className="nx-contact-item">
                  <span className="nx-contact-icon">📞</span>
                  <div>
                    <h5>Secure Line</h5>
                    <p><a href="tel:+919586523658" className="nx-highlight-cyan">+91-9586523658</a></p>
                  </div>
                </div>
                <div className="nx-contact-item">
                  <span className="nx-contact-icon">💬</span>
                  <div>
                    <h5>WhatsApp Support</h5>
                    <p><a href="https://wa.me/919586523658" target="_blank" rel="noopener noreferrer" className="nx-highlight-cyan">+91-9586523658</a></p>
                  </div>
                </div>
                <div className="nx-contact-item">
                  <span className="nx-contact-icon">⏱</span>
                  <div>
                    <h5>Cleanroom Hours</h5>
                    <p>Mon - Sat | 09:00 - 21:00 GMT</p>
                  </div>
                </div>
              </div>

              {/* Flash Enquiry Form */}
              <div className="nx-enquiry-card">
                <h4>⚡ Flash Workshop Enquiry</h4>
                {enquirySuccess ? (
                  <div className="nx-success-banner mt-2">
                    <span className="nx-success-icon">✓</span>
                    <div>
                      <h4>Enquiry Transmitted!</h4>
                      <p>A workshop rep will WhatsApp you shortly with stock levels.</p>
                    </div>
                  </div>
                ) : (
                  <form className="nx-enquiry-form" onSubmit={handleEnquirySubmit}>
                    <div className="nx-form-group">
                      <input 
                        type="text" 
                        className="nx-form-control-sm" 
                        placeholder="Your Name" 
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="nx-form-group">
                      <input 
                        type="tel" 
                        className="nx-form-control-sm" 
                        placeholder="WhatsApp/Phone" 
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="nx-form-group">
                      <textarea 
                        className="nx-form-control-sm" 
                        placeholder="e.g., Do you have RTX 4080 custom loop plates ready in stock?" 
                        rows="2"
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                        required
                      />
                    </div>
                    <button type="submit" className="nx-enquiry-btn">Transmit Enquiry</button>
                  </form>
                )}
              </div>
            </div>

            {/* Dark themed Google Map */}
            <div className="nx-workshop-right">
              <div className="nx-map-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9749723223067!2d77.59456267597143!3d12.973449987341995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1672c1000001%3A0xf1d32fc657abfb38!2sUB%20City!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%)' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Bangalore Cleanroom"
                ></iframe>
                <div className="nx-map-coordinates">
                  <span>HQ: LAT: 12.9734° N / LON: 77.5946° E</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* COMPREHENSIVE FOOTER */}
      <footer className="nx-footer">
        <div className="nx-footer-inner">
          
          <div className="nx-footer-branding">
            <div className="nx-logo-area">
              <span className="nx-logo-brand">NEXUS</span>
              <span className="nx-logo-divider">//</span>
              <span className="nx-logo-sub">RIGS</span>
            </div>
            <p className="nx-footer-desc-text">
              Futuristic custom liquid-cooled gaming battlestations, premium modification components, and console cooling overhauls. We build weapons, not just PCs.
            </p>
            <div className="nx-warranty-badge">
              <span className="nx-badge-icon">🛡️</span>
              <div>
                <h6>2-Year Warranty Protocol</h6>
                <p>Full loop leak cover &amp; technical assistance</p>
              </div>
            </div>
          </div>

          <div className="nx-footer-col">
            <h4>Protocols</h4>
            <ul>
              <li><a href="#re-assembly">Re-Assembly Mods</a></li>
              <li><a href="#booking">Alteration Hub</a></li>
              <li><a href="#rigs-spares">Inventory Catalog</a></li>
              <li><a href="#upgrade-deals">Stealth Console Overhauls</a></li>
            </ul>
          </div>

          <div className="nx-footer-col">
            <h4>Community</h4>
            <ul>
              <li><a href="#discord">Join Discord Server</a></li>
              <li><a href="#steam">Steam Group Hub</a></li>
              <li><a href="#instagram">Forge Instagram Feed</a></li>
              <li><a href="#github">Build Source Code</a></li>
            </ul>
          </div>

          <div className="nx-footer-newsletter">
            <h4>Transmit Newsletter</h4>
            <p>Sign up to receive system drops, rare stock updates, and workshop alerts.</p>
            {newsletterSuccess ? (
              <div className="nx-success-banner mt-2">
                <span className="nx-success-icon">✓</span>
                <p>Email Registered!</p>
              </div>
            ) : (
              <form className="nx-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="name@nexusrigs.com" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="nx-form-control-sm"
                  required
                />
                <button type="submit" className="nx-btn nx-newsletter-btn">Register</button>
              </form>
            )}
          </div>

        </div>

        <div className="nx-footer-bottom-bar">
          <p>© {new Date().getFullYear()} NEXUS RIGS. ALL PROTOCOLS DEPLOYED.</p>
          <div className="nx-footer-legal">
            <a href="#privacy">Privacy Databank</a>
            <a href="#terms">Terms of Engagement</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
