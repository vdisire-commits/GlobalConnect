import { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);
    const [isAnnual, setIsAnnual] = useState(false);

    const features = [
        { icon: '🤝', title: 'Smart Connections', description: 'Build meaningful professional relationships with intelligent connection suggestions based on skills and location. Send requests and grow your network.' },
        { icon: '💬', title: 'Real-Time Chat', description: 'Communicate instantly with your connections. Experience seamless messaging with typing indicators, delivery status, and unread notifications.' },
        { icon: '📰', title: 'Dynamic Feed', description: 'Share updates, insights, and achievements with your network. Like, comment, and engage in meaningful professional conversations instantly.' },
        { icon: '💼', title: 'Job Board', description: 'Discover opportunities that match your skills. Post jobs, browse listings, apply with cover letters, and track your applications in real-time.' },
        { icon: '🔔', title: 'Smart Notifications', description: 'Stay updated on connections, messages, and job opportunities. Receive real-time alerts for relevant activities without missing anything important.' },
        { icon: '🤖', title: 'AI-Ready Matching', description: 'Our platform uses intelligent algorithms to recommend jobs, connections, and opportunities perfectly aligned with your skills and career goals.' },
    ];

    const steps = [
        { number: 1, title: 'Sign Up', description: 'Create your account with email or Google. Takes less than 2 minutes to get started.' },
        { number: 2, title: 'Build Profile', description: 'Add your experience, education, and skills. Upload a profile picture to complete your professional identity.' },
        { number: 3, title: 'Connect', description: 'Send connection requests, browse suggestions, and build your network of professionals.' },
        { number: 4, title: 'Grow & Apply', description: 'Share updates, chat with connections, and discover job opportunities tailored to your profile.' },
    ];

    const testimonials = [
        { name: 'Sarah Khan', role: 'Senior Product Manager', initials: 'SK', text: '"GlobalConnect helped me land my dream job within 3 months. The connections I made through the platform were invaluable."' },
        { name: 'Mike Johnson', role: 'Founder & CEO', initials: 'MJ', text: '"The job board feature is a game-changer. I found top talent for my team and the entire hiring process became so much smoother."' },
        { name: 'Aisha Williams', role: 'Data Scientist', initials: 'AW', text: '"Real-time chat and notifications keep me connected with my professional circle. It\'s like having a powerful networking assistant in my pocket."' },
    ];

    const faqs = [
        { question: 'Is GlobalConnect free to use?', answer: 'Yes! GlobalConnect is completely free to use. You can create an account, build your profile, make connections, chat, and browse jobs at no cost. We\'re focused on making professional networking accessible to everyone.' },
        { question: 'How secure is my data on GlobalConnect?', answer: 'Your data security is our top priority. We use industry-standard encryption, secure authentication with JWT tokens, and follow GDPR compliance standards. All communications are encrypted end-to-end, and your personal information is never shared without your consent.' },
        { question: 'Can I post and apply for jobs on the platform?', answer: 'Absolutely! Both job seekers and employers can use GlobalConnect. Job seekers can browse opportunities, apply with cover letters, and save jobs for later. Employers can post job listings, track applicants, and find talent within your network.' },
        { question: 'How does the AI matching feature work?', answer: 'Our AI-ready matching system analyzes your skills, experience, and location to recommend jobs and connections that align with your profile. The smarter you make your profile, the better recommendations you\'ll receive.' },
        { question: 'Can I message people I\'m not connected with?', answer: 'Currently, you can only message people you\'re connected with. This ensures a positive and focused networking environment. Send a connection request first, and once accepted, you can start chatting!' },
        { question: 'Is there a mobile app?', answer: 'GlobalConnect is fully responsive and works seamlessly on desktop, tablet, and mobile browsers. We\'re currently developing native mobile apps for iOS and Android to enhance your experience on the go.' },
    ];

    return (
        <div className="min-h-screen bg-primary">
            {/* Header */}
            <header className="bg-primary border-b border-border sticky top-0 z-50 backdrop-blur-lg">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-accent">GlobalConnect</Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex gap-8">
                        <li><a href="#features" className="text-text-primary hover:text-accent transition-colors">Features</a></li>
                        <li><a href="#how-it-works" className="text-text-primary hover:text-accent transition-colors">How It Works</a></li>
                        <li><a href="#pricing" className="text-text-primary hover:text-accent transition-colors">Pricing</a></li>
                        <li><a href="#faq" className="text-text-primary hover:text-accent transition-colors">FAQ</a></li>
                    </ul>

                    <div className="hidden md:flex gap-4">
                        <Link to="/login" className="btn-secondary">Log In</Link>
                        <Link to="/register" className="btn-primary">Sign Up</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col gap-1.5"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className={`w-6 h-0.5 bg-text-primary transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-text-primary transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-text-primary transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-primary border-t border-border px-4 py-4">
                        <ul className="flex flex-col gap-4">
                            <li><a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-text-primary hover:text-accent transition-colors">Features</a></li>
                            <li><a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-text-primary hover:text-accent transition-colors">How It Works</a></li>
                            <li><a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-text-primary hover:text-accent transition-colors">Pricing</a></li>
                            <li><a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-text-primary hover:text-accent transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="relative py-20 md:py-32 px-4 text-center overflow-hidden bg-gradient-to-br from-primary to-secondary">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Connect. Share. <span className="text-accent">Grow Professionally.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                        Join thousands of professionals building meaningful connections, sharing insights, and advancing their careers on GlobalConnect.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="btn-primary px-8 py-3 text-lg">Get Started Free</Link>
                        <a href="#pricing" className="btn-secondary px-8 py-3 text-lg">View Plans</a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-secondary">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Powerful Features for <span className="text-accent">Professional Growth</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-primary p-8 rounded-xl border border-border hover:border-accent transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20 cursor-pointer"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-accent mb-3">{feature.title}</h3>
                                <p className="text-text-secondary">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-4 bg-primary">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Get Started in <span className="text-accent">4 Simple Steps</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-accent text-primary-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {step.number}
                                </div>
                                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                                <p className="text-text-secondary text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-4 bg-primary">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                        Simple, Transparent <span className="text-accent">Pricing</span>
                    </h2>

                    <div className="flex justify-center items-center gap-4 mb-12">
                        <span className="text-text-secondary">Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-14 h-8 rounded-full transition-colors ${isAnnual ? 'bg-accent' : 'bg-border'}`}
                        >
                            <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${isAnnual ? 'translate-x-6' : ''}`}></span>
                        </button>
                        <span className="text-text-secondary">Annual <span className="bg-accent text-primary-900 px-2 py-1 rounded-full text-xs font-bold ml-2">Save 2 Months</span></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Free Plan */}
                        <div className="bg-secondary border border-border rounded-xl p-8 hover:border-accent transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20">
                            <h3 className="text-xl font-semibold mb-2">Free</h3>
                            <p className="text-text-secondary mb-4">Perfect for getting started</p>
                            <div className="text-4xl font-bold text-accent mb-2">$0</div>
                            <div className="text-text-secondary mb-6">Forever free</div>
                            <Link to="/register" className="btn-primary w-full block text-center mb-6">Get Started</Link>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Create profile & upload image</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Connect with professionals</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Post updates</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Apply to jobs (5/month limit)</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Basic notifications</li>
                            </ul>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-secondary border-2 border-accent rounded-xl p-8 relative transform scale-105 shadow-xl shadow-accent/20">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary-900 px-4 py-1 rounded-full text-xs font-bold uppercase">Most Popular</div>
                            <h3 className="text-xl font-semibold mb-2">Pro</h3>
                            <p className="text-text-secondary mb-4">Best for active professionals</p>
                            <div className="text-4xl font-bold text-accent mb-2">${isAnnual ? '108' : '12'}</div>
                            <div className="text-text-secondary mb-6">per {isAnnual ? 'year' : 'month'}</div>
                            <Link to="/register" className="btn-primary w-full block text-center mb-6">Start Free Trial</Link>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Unlimited connections</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Unlimited job applications</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Advanced search & filters</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Real-time notifications & messaging</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> AI job recommendations</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> View profile visitors</li>
                            </ul>
                        </div>

                        {/* Business Plan */}
                        <div className="bg-secondary border border-border rounded-xl p-8 hover:border-accent transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20">
                            <h3 className="text-xl font-semibold mb-2">Business / Recruiter</h3>
                            <p className="text-text-secondary mb-4">For recruiters & teams</p>
                            <div className="text-4xl font-bold text-accent mb-2">${isAnnual ? '348' : '39'}</div>
                            <div className="text-text-secondary mb-6">per {isAnnual ? 'year' : 'month'}</div>
                            <Link to="/register" className="btn-primary w-full block text-center mb-6">Contact Sales</Link>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Post jobs (unlimited)</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Advanced analytics & reports</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Candidate search & outreach</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Priority support</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Team collaboration tools</li>
                                <li className="flex items-center gap-2 text-text-secondary"><span className="text-accent font-bold">✓</span> Custom branding</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 bg-secondary">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        What Our Users <span className="text-accent">Are Saying</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-primary p-8 rounded-xl border-l-4 border-accent">
                                <p className="text-text-secondary italic mb-6">{testimonial.text}</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center text-primary-900 font-bold">
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <p className="text-text-secondary text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-20 px-4 bg-primary">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Frequently Asked <span className="text-accent">Questions</span>
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-border pb-4">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full flex justify-between items-center text-left font-semibold hover:text-accent transition-colors"
                                >
                                    <span>{faq.question}</span>
                                    <span className={`text-accent text-2xl transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}>+</span>
                                </button>
                                {activeFaq === index && (
                                    <p className="mt-4 text-text-secondary">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16 px-4 bg-gradient-to-br from-secondary to-primary border-t border-border text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-text-secondary mb-8">Get the latest features, tips, and opportunities delivered to your inbox.</p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input-field flex-1 max-w-md"
                            required
                        />
                        <button type="submit" className="btn-primary px-8">Subscribe</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0f0f0f] border-t border-border py-12 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-accent font-semibold mb-4">GlobalConnect</h3>
                        <p className="text-text-secondary text-sm">Empowering professionals to connect, share, and grow in their careers.</p>
                    </div>
                    <div>
                        <h3 className="text-accent font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#features" className="text-text-secondary hover:text-accent transition-colors">Features</a></li>
                            <li><a href="#pricing" className="text-text-secondary hover:text-accent transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Security</a></li>
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Roadmap</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-accent font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">About Us</a></li>
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Blog</a></li>
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Careers</a></li>
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-accent font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Compliance</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border pt-8 text-center text-text-secondary text-sm">
                    <p>&copy; 2024 GlobalConnect. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
