import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from '../models/User';
import { Profile } from '../models/Profile';
import { About } from '../models/About';
import { Skill } from '../models/Skill';
import { Education } from '../models/Education';
import { Experience } from '../models/Experience';
import { Project } from '../models/Project';
import { Certification } from '../models/Certification';
import { Achievement } from '../models/Achievement';
import { Service } from '../models/Service';
import { Resume } from '../models/Resume';
import { SocialLink } from '../models/SocialLink';
import { Message } from '../models/Message';
import { PortfolioSettings } from '../models/PortfolioSettings';

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db';
    console.log(`[Seed] Connecting to MongoDB: ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('[Seed] Clearing all existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      About.deleteMany({}),
      Skill.deleteMany({}),
      Education.deleteMany({}),
      Experience.deleteMany({}),
      Project.deleteMany({}),
      Certification.deleteMany({}),
      Achievement.deleteMany({}),
      Service.deleteMany({}),
      Resume.deleteMany({}),
      SocialLink.deleteMany({}),
      Message.deleteMany({}),
      PortfolioSettings.deleteMany({})
    ]);

    // 1. Admin User
    console.log('[Seed] Creating default Admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    await User.create({
      name: 'Portfolio Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });
    console.log(`  ✓ Admin created: ${adminEmail} (password: ${adminPassword})`);

    // 2. Profile
    console.log('[Seed] Inserting Profile...');
    await Profile.create({
      name: 'Alex Morgan',
      title: 'Full-Stack Developer & Cloud Architect',
      shortIntro:
        'A passionate Full-Stack Developer who enjoys building modern, accessible, and high-performance web applications using React, Node.js, and TypeScript.',
      bio: 'Over 5 years of engineering experience delivering mission-critical applications. Dedicated to clean code, test-driven development, and scalable cloud microservices.',
      email: 'alex.morgan.dev@example.com',
      phone: '+1 (555) 382-9104',
      location: 'San Francisco, CA',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status: 'Available for full-time & freelance projects'
    });

    // 3. About
    console.log('[Seed] Inserting About...');
    await About.create({
      aboutDescription:
        'I am a passionate software engineer with extensive experience across modern frontend and backend architectures. I transform complex business specifications into elegant, intuitive, and performant user experiences.',
      personalInfo:
        'Living in the Bay Area, I spend my spare time contributing to open-source software, tinkering with IoT microcontrollers, and organizing local developer meetups.',
      careerObjective:
        'To architect and scale resilient software systems that empower millions of users worldwide, collaborating with forward-thinking engineering teams that prioritize developer ergonomics and engineering excellence.',
      interests:
        'Microservices, distributed database indexing, React server components, generative AI pipelines, and accessible UI component systems.',
      otherInfo: 'Available for speaking engagements, technical consulting, and full-stack software development roles.'
    });

    // 4. Skills
    console.log('[Seed] Inserting Skills...');
    await Skill.insertMany([
      { name: 'JavaScript (ES6+)', category: 'Languages', percentage: 95, icon: 'filetype-js' },
      { name: 'TypeScript', category: 'Languages', percentage: 92, icon: 'filetype-tsx' },
      { name: 'React', category: 'Frontend', percentage: 94, icon: 'layers' },
      { name: 'Bootstrap 5', category: 'Frontend', percentage: 90, icon: 'bootstrap' },
      { name: 'HTML5 & CSS3', category: 'Frontend', percentage: 95, icon: 'code-slash' },
      { name: 'Node.js', category: 'Backend', percentage: 90, icon: 'hdd-network' },
      { name: 'Express.js', category: 'Backend', percentage: 90, icon: 'server' },
      { name: 'REST APIs & OpenAPI', category: 'Backend', percentage: 95, icon: 'arrow-left-right' },
      { name: 'MongoDB & Mongoose', category: 'Databases', percentage: 88, icon: 'database' },
      { name: 'PostgreSQL', category: 'Databases', percentage: 82, icon: 'database-fill' },
      { name: 'Git & GitHub', category: 'Tools', percentage: 92, icon: 'git' },
      { name: 'Docker & CI/CD', category: 'Tools', percentage: 85, icon: 'boxes' }
    ]);

    // 5. Education
    console.log('[Seed] Inserting Education...');
    await Education.insertMany([
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California, Berkeley',
        startYear: '2020',
        endYear: '2024',
        description:
          'Graduated Magna Cum Laude. Rigorous coursework in Distributed Systems, Data Structures & Algorithms, Database Engineering, and Software Design Patterns.',
        grade: '3.92 GPA'
      },
      {
        degree: 'Full-Stack Software Engineering Immersion',
        institution: 'Tech Innovators Academy',
        startYear: '2019',
        endYear: '2020',
        description:
          '1000-hour intensive engineering bootcamp covering end-to-end MERN stack development, automated testing, code review workflows, and cloud deployments.',
        grade: 'Top 5% Cohort'
      }
    ]);

    // 6. Experience
    console.log('[Seed] Inserting Experience...');
    await Experience.insertMany([
      {
        company: 'TechWave Solutions',
        position: 'Full-Stack Developer Associate',
        startDate: '2024',
        endDate: 'Present',
        description:
          'Architected responsive client applications using React, TypeScript, and Bootstrap. Engineered high-throughput REST APIs in Express.js with MongoDB indexing optimizations.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Bootstrap 5']
      },
      {
        company: 'NextGen Innovators',
        position: 'Full-Stack Engineering Intern',
        startDate: '2023',
        endDate: '2024',
        description:
          'Developed reusable UI component library supporting accessible dark/light themes and responsive mobile layouts. Implemented JWT authentication and contact form handlers.',
        technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB']
      }
    ]);

    // 7. Projects
    console.log('[Seed] Inserting Projects...');
    await Project.insertMany([
      {
        title: 'Used Products App',
        description:
          'A web application for buying and selling used products. Features peer-to-peer messaging, category filtering, real-time negotiation chat, Stripe payments, and automated image compression pipelines.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Bootstrap 5'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80',
        githubUrl: 'https://github.com/example/used-products-marketplace',
        liveUrl: 'https://marketplace-demo.example.com',
        category: 'Full-Stack',
        featured: true
      },
      {
        title: 'Smart Healthcare IoT System',
        description:
          'Enterprise hospital telemetry dashboard monitoring live patient vitals streamed from medical hardware. Includes anomaly detection, instant clinician alert notifications, and HIPAA-compliant audit trails.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'WebSockets'],
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
        githubUrl: 'https://github.com/example/smart-healthcare-iot',
        liveUrl: 'https://healthcare-iot-demo.example.com',
        category: 'Full-Stack',
        featured: true
      },
      {
        title: 'Dynamic Portfolio Platform',
        description:
          'A complete full-stack portfolio and CMS with an admin management dashboard, Swagger/OpenAPI documentation, dark/light theme switching, and live MongoDB data bindings.',
        technologies: ['React', 'TypeScript', 'Bootstrap 5', 'Node.js', 'Express', 'MongoDB', 'Swagger UI'],
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
        githubUrl: 'https://github.com/example/dynamic-portfolio',
        liveUrl: 'https://portfolio-demo.example.com',
        category: 'Full-Stack',
        featured: true
      },
      {
        title: 'AI Task & Workflow Assistant',
        description:
          'Intelligent productivity workspace combining Kanban task management with generative AI workflow summarization, automated scheduling recommendations, and cross-team activity feeds.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
        githubUrl: 'https://github.com/example/ai-workflow-assistant',
        liveUrl: 'https://workflow-ai-demo.example.com',
        category: 'AI / Full-Stack',
        featured: false
      }
    ]);

    // 8. Certifications
    console.log('[Seed] Inserting Certifications...');
    await Certification.insertMany([
      {
        name: 'AWS Certified Solutions Architect – Associate',
        issuingOrganization: 'Amazon Web Services (AWS)',
        issueDate: '2025',
        certificateId: 'AWS-SAA-839201',
        certificateUrl: 'https://aws.amazon.com/verification',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Meta Front-End Developer Professional Certificate',
        issuingOrganization: 'Meta / Coursera',
        issueDate: '2024',
        certificateId: 'META-FED-55201',
        certificateUrl: 'https://coursera.org/verify/professional-cert',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'MongoDB Certified Developer Associate',
        issuingOrganization: 'MongoDB University',
        issueDate: '2024',
        certificateId: 'MDB-DEV-99201',
        certificateUrl: 'https://learn.mongodb.com/c/verification',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80'
      }
    ]);

    // 9. Achievements
    console.log('[Seed] Inserting Achievements...');
    await Achievement.insertMany([
      {
        title: '1st Place Winner – National Full-Stack Hackathon',
        organization: 'Silicon Valley Hackathon Series',
        date: 'November 2024',
        description: 'Built a collaborative real-time disaster relief routing application that won first place out of 120 participating engineering teams.',
        awardUrl: 'https://example.com/hackathon-awards'
      },
      {
        title: 'Open Source Contributor Excellence Recognition',
        organization: 'Open Source Initiative Community',
        date: 'July 2024',
        description: 'Contributed key performance enhancements, type fixes, and documentation improvements to popular React and TypeScript open-source packages.',
        awardUrl: 'https://github.com'
      },
      {
        title: 'Best Senior Capstone Engineering Project',
        organization: 'UC Berkeley Computer Science Department',
        date: 'May 2024',
        description: 'Recognized for highest architectural rigor and usability in developing an end-to-end distributed telemedicine platform.',
        awardUrl: 'https://berkeley.edu'
      }
    ]);

    // 10. Services
    console.log('[Seed] Inserting Services...');
    await Service.insertMany([
      {
        title: 'Full-Stack Web Development',
        description: 'End-to-end web applications built from scratch with React, TypeScript, Node.js, Express, and MongoDB.',
        icon: 'laptop',
        features: ['Custom SPA / SSR Architectures', 'Clean TypeScript Codebases', 'Robust Database Schemas', 'Responsive Mobile-First UI']
      },
      {
        title: 'Frontend UI/UX Engineering',
        description: 'Modern, accessible, pixel-perfect user interfaces with Bootstrap 5, interactive state management, and dark/light modes.',
        icon: 'palette',
        features: ['Component Libraries', 'Cross-browser Compatibility', 'Performance & Core Web Vitals', 'WCAG Accessibility']
      },
      {
        title: 'RESTful API & Microservice Design',
        description: 'Secure, high-throughput REST APIs documented with OpenAPI/Swagger and protected with JWT authorization.',
        icon: 'hdd-network',
        features: ['OpenAPI 3.0 Documentation', 'JWT & OAuth Authentication', 'Rate Limiting & Security Headers', 'MongoDB Indexing & Aggregations']
      },
      {
        title: 'Cloud Deployment & DevOps',
        description: 'Streamlined CI/CD automation, cloud hosting setup, environment isolation, and production monitoring.',
        icon: 'cloud-arrow-up',
        features: ['Docker Containerization', 'Automated GitHub Actions CI/CD', 'Environment Secrets Management', 'Zero-Downtime Deployment']
      }
    ]);

    // 11. Resume
    console.log('[Seed] Inserting Resume...');
    await Resume.create({
      title: 'Alex Morgan – Full-Stack Software Engineer Resume',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      summary:
        'Software Engineer with 5+ years of experience specializing in TypeScript, React, Node.js, Express, and MongoDB. Proven track record of shipping production-grade platforms with high performance and accessibility.',
      lastUpdated: 'October 2026'
    });

    // 12. Social Links
    console.log('[Seed] Inserting Social Links...');
    await SocialLink.insertMany([
      { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
      { platform: 'Twitter / X', url: 'https://twitter.com', icon: 'twitter-x' },
      { platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
      { platform: 'YouTube', url: 'https://youtube.com', icon: 'youtube' }
    ]);

    // 13. Messages
    console.log('[Seed] Inserting sample Contact Messages...');
    await Message.insertMany([
      {
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@techrecruiter.com',
        phone: '+1 (555) 782-9901',
        subject: 'Senior Full-Stack Developer Opportunity',
        message: 'Hi Alex, I was thoroughly impressed by your portfolio and recent IoT projects. Would love to schedule a brief introductory call regarding an engineering role!',
        isRead: false
      },
      {
        name: 'Marcus Vance',
        email: 'marcus@startupstudio.io',
        phone: '+1 (555) 432-8877',
        subject: 'Contract Collaboration for SaaS Platform',
        message: 'Hey Alex, we are looking for a senior full-stack contractor to build a React & Express MVP over the next 3 months. Let us know if you are available.',
        isRead: true
      }
    ]);

    // 14. Settings
    console.log('[Seed] Inserting Portfolio Settings...');
    await PortfolioSettings.create({
      siteTitle: 'Alex Morgan | Full-Stack Developer & Software Architect',
      metaDescription: 'Modern Full-Stack Developer Portfolio showcasing web applications, skills, certifications, and credentials.',
      primaryColor: '#6366f1',
      enableContactForm: true,
      showResumeButton: true,
      customFooterText: 'Built with React, TypeScript, Express & MongoDB • Fully Dynamic & Admin Managed'
    });

    console.log('\n==================================================');
    console.log('✅ All 14 Portfolio collections seeded successfully!');
    console.log(`🔑 Admin Login: ${adminEmail} / ${adminPassword}`);
    console.log('==================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}
