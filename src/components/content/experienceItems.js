export const experienceItems = [
  {
    role: "Full-Stack Developer Intern",
    company: "Finding Finance Association",
    location: "Remote / USA",
    dates: "May 2025 – Aug 2025",
    summary:
      "Built a Next.js + Firebase course platform with role-based access and server components.",
    highlights: [
      "Implemented RBAC via Firebase Admin custom claims and route guards.",
      "Reduced client JS ~35% by moving views to Server Components and caching reads.",
      "Added Cloud Functions for thumbnails, audit logs, and scheduled cleanups."
    ],
    techStack: ["Next.js", "Firebase Auth", "Firestore", "Cloud Storage", "Cloud Functions", "Tailwind CSS", "Vercel"],
    link: "https://findingfinanceassociation.com"
  },
  {
    role: "Software Developer Intern",
    company: "Astragen",
    location: "India",
    dates: "Dec 2023 – Apr 2024",
    summary:
      "Delivered an offline-first classroom desktop app and optimized backend services.",
    highlights: [
      "Shipped Flutter desktop app with S3 presigned delivery and background sync to 2,400+ schools.",
      "Improved API P95 latency via MySQL indexing and stored procedures.",
      "Containerized services and automated CI with GitHub Actions."
    ],
    techStack: ["Flutter (desktop)", "Node.js (Express)", "MySQL", "AWS S3", "Airflow", "Docker", "GitHub Actions"],
  },
  {
    role: "Engineering Lead (Full-Stack)",
    company: "amFOSS Open Source Club",
    location: "India",
    dates: "Sep 2022 – Jun 2023",
    summary:
      "Led a platform showcasing 1,000+ open-source projects from 5,600+ students.",
    highlights: [
      "Designed React + Django + PostgreSQL architecture with S3 + CloudFront media.",
      "Automated CI/CD and containerized backend with Docker.",
      "Drove code reviews, issue triage, and release tracking."
    ],
    techStack: ["React", "Django REST Framework", "PostgreSQL", "AWS S3", "CloudFront", "Docker", "GitHub Actions"],
    link: "https://ssramritapuri.vercel.app/"
  }
]
