// Edit this file to change the text in the hero section.
const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${path}`

export const hero = {
  firstName: 'Bhanu Prakash Reddy',
  lastName: 'Gadikota',
  // Put your photo at public/hero/profile.png (a PNG with transparent background looks best)
  photo: '/hero/profile.png',
  logo: '/hero/logo.png',
  // Title is shown as: <highlight in orange> <title>
  highlight: 'Java',
  title: 'Backend Developer',
  description:
    'I build scalable, secure and high-performance backend systems with Java and Spring Boot — from clean REST APIs and microservices to well-tuned databases and event-driven pipelines.',
  // Lines typed out one by one under the title
  typing: [
    'building REST APIs with Spring Boot',
    'designing microservices that scale',
    'tuning SQL & JPA for performance',
    'streaming events with Apache Kafka',
    'shipping with Docker & Kubernetes',
  ],
  cta: { label: 'Get in touch', href: '#contact' },
  openToWork: true,
  email: 'gbhanuprakashreddy6@gmail.com',
  // Put your CV at public/cv.pdf
  cv: '/cv.pdf',
}

// Small tech badges floating around the photo
export const floatingBadges = [
  { label: 'Java 21', icon: devicon('java/java-original.svg'), pos: 'left-0 top-[18%] sm:-left-10' },
  { label: 'Spring Boot', icon: devicon('spring/spring-original.svg'), pos: 'right-0 top-[42%] sm:-right-12' },
  { label: 'Kafka', icon: devicon('apachekafka/apachekafka-original.svg'), pos: 'left-2 top-[62%] hidden sm:flex sm:-left-14' },
  { label: 'Docker', icon: devicon('docker/docker-original.svg'), pos: 'right-6 top-[72%] hidden sm:flex sm:-right-6' },
]

export const socials = [
  // { name: 'instagram', href: 'https://instagram.com/' },
  { name: 'github', href: 'https://github.com/GBhanuPrakashReddy6' },
  { name: 'linkedin', href: 'https://www.linkedin.com/in/bhanuprakash0225/' },
]
