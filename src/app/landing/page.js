'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, TrendingUp, Brain, Calendar, BarChart3, 
  Zap, Target, Rocket, ArrowRight, Play, Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import './landing.css';

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    router.push('/dashboard/overview');
  };

  const handleMeetCompanion = () => {
    router.push('/ai-mentor/chat');
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Content Generator",
      description: "Transform ideas into viral content with advanced AI that understands your brand voice and audience."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Viral Pattern Detector",
      description: "Analyze millions of posts to identify trending patterns and predict what will go viral next."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Success Predictor",
      description: "Get AI-powered predictions on content performance before you publish."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Scheduler",
      description: "Optimize posting times based on audience behavior and platform algorithms."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Trend Analyzer",
      description: "Real-time trend analysis across all major platforms to keep you ahead of the curve."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Insights",
      description: "Get actionable insights and recommendations powered by machine learning."
    }
  ];

  const steps = [
    { number: "01", title: "Idea Input", description: "Share your content concept or let AI generate ideas" },
    { number: "02", title: "AI Analysis", description: "Our AI analyzes trends, audience, and viral patterns" },
    { number: "03", title: "Content Creation", description: "Generate optimized content with AI assistance" },
    { number: "04", title: "Publishing Strategy", description: "Get the perfect timing and platform recommendations" }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Sparkles className="w-6 h-6 text-teal-400" />
            <span className="nav-brand">Craftantra AI</span>
          </div>
          <div className="nav-actions">
            <Link href="/login">
              <button className="nav-link">Log In</button>
            </Link>
            <Link href="/signup">
              <Button className="nav-signup">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="hero-bg">
          <div className="mesh-gradient">
            <div className="mesh-blob mesh-blob-1" />
            <div className="mesh-blob mesh-blob-2" />
            <div className="mesh-blob mesh-blob-3" />
            <div className="mesh-blob mesh-blob-4" />
          </div>
          <div className="noise-overlay" />
          <div className="light-rays">
            <div className="ray ray-1" />
            <div className="ray ray-2" />
            <div className="ray ray-3" />
          </div>
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-badge"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Growth Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-title"
          >
            Craftantra AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-subtitle"
          >
            The Modern Alchemy of Content
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hero-description"
          >
            Transform raw ideas into viral content with AI-powered intelligence that understands 
            trends, audience psychology, and platform algorithms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="hero-buttons"
          >
            <Button className="btn-primary" onClick={handleGetStarted}>
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button className="btn-secondary" onClick={handleMeetCompanion}>
              <Play className="w-4 h-4 mr-2" /> Meet Your Companion
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="hero-stats"
          >
            <div className="stat-item">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Active Creators</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">2M+</div>
              <div className="stat-label">Content Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">AI-Powered Features</h2>
            <p className="section-subtitle">
              Everything you need to dominate social media with artificial intelligence
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              From idea to viral content in four simple steps
            </p>
          </motion.div>

          <div className="steps-timeline">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="step-item"
              >
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < steps.length - 1 && <div className="step-connector" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Showcase */}
      <section className="showcase-section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Trusted by Top Creators</h2>
            <p className="section-subtitle">
              Join thousands of creators achieving viral success
            </p>
          </motion.div>

          <div className="showcase-carousel">
            <div className="carousel-track">
              {[
                'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop',
                'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&h=400&fit=crop',
              ].map((img, i) => (
                <div key={i} className="showcase-card">
                  <img src={img} alt={`Creator content ${i + 1}`} className="showcase-image" />
                  <div className="showcase-overlay">
                    <Check className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="dashboard-section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Powerful Analytics Dashboard</h2>
            <p className="section-subtitle">
              Track performance and optimize your content strategy in real-time
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="dashboard-preview"
          >
            <div className="dashboard-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span /><span /><span />
                </div>
                <div className="mockup-title">Analytics Dashboard</div>
              </div>
              <div className="mockup-content">
                <div className="mockup-chart">
                  <div className="chart-bars">
                    <div className="bar" style={{ height: '60%' }} />
                    <div className="bar" style={{ height: '75%' }} />
                    <div className="bar" style={{ height: '45%' }} />
                    <div className="bar" style={{ height: '85%' }} />
                    <div className="bar" style={{ height: '70%' }} />
                    <div className="bar" style={{ height: '90%' }} />
                    <div className="bar" style={{ height: '65%' }} />
                    <div className="bar" style={{ height: '80%' }} />
                  </div>
                  <div className="chart-line">
                    <svg viewBox="0 0 400 200" className="line-chart">
                      <path
                        d="M 0 150 Q 50 120, 100 130 T 200 100 T 300 80 T 400 60"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                      />
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="mockup-stats">
                  <div className="mockup-stat">
                    <div className="stat-icon">📈</div>
                    <div className="stat-info">
                      <div className="stat-number">2.4M</div>
                      <div className="stat-text">Total Views</div>
                    </div>
                  </div>
                  <div className="mockup-stat">
                    <div className="stat-icon">❤️</div>
                    <div className="stat-info">
                      <div className="stat-number">156K</div>
                      <div className="stat-text">Engagement</div>
                    </div>
                  </div>
                  <div className="mockup-stat">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-info">
                      <div className="stat-number">94%</div>
                      <div className="stat-text">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="cta-content"
        >
          <Rocket className="cta-icon" />
          <h2 className="cta-title">Start Growing With AI</h2>
          <p className="cta-description">
            Join the future of content creation. Get started in minutes.
          </p>
          <div className="cta-buttons">
            <Button className="btn-primary-large" onClick={handleGetStarted}>
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button className="btn-secondary-large">Book Demo</Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <Sparkles className="w-6 h-6 text-teal-400" />
                <span>Craftantra AI</span>
              </div>
              <p className="footer-tagline">The Modern Alchemy of Content</p>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">API</a>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <a href="#">Docs</a>
              <a href="#">Blog</a>
              <a href="#">Support</a>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Careers</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Craftantra AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
