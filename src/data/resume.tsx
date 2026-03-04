import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, FolderIcon, FileIcon, BotIcon, UserIcon } from "lucide-react";

export const DATA = {
  name: "Dylan Li",
  initials: "DL",
  url: "https://lidylan.dev",
  location: "Ann Arbor, MI",
  locationLink: "https://www.google.com/maps/place/annarbor",
  description:
    `Computer Science and Engineering Physics
University of Michigan`,
  summary:
      `I'm Dylan, a student at the University of Michigan. Go Blue!
I'm extremely interested in technology, startups, physics, and problem-solving.
In my spare time, I love to work on side-projects, hit the gym, run with friends, eat food, and MonkeyType.`,
    //"At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++",
  ],
  navbar: [
    { href: "/", icon: BotIcon, label: "Chat" },
    { href: "/about", icon: UserIcon, label: "About" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" }
  ],
  contact: {
    email: "lidylan@umich.edu",
    tel: "+17349722779",
    social: {
      Mail: {
        name: "Mail",
        url: "mailto:lidylan@umich.edu",
        icon: Icons.email,
        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Cryplo",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/lidylan/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Resume: {
        name: "Resume",
        url: "https://www.lidylan.dev/resume.pdf", //10/8 resume version
        icon: FileIcon,
        navbar: true,
      },
      /*
      X: {
        name: "X",
        url: "https://dub.sh/dillion-twitter",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://dub.sh/dillion-youtube",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },*/
    },
  },

  work: [
    {
      company: "V1 Michigan",
      href: "https://v1michigan.com",
      badges: [],
      location: "Ann Arbor, Michigan",
      title: "Software Developer",
      logoUrl: "/v1.jpeg",
      start: "January 2026",
      end: "Present",
      description:
        "W26 Product Studio Cohort",
    },
    {
      company: "Future of Programming Lab",
      href: "https://hazel.org",
      badges: [],
      location: "Ann Arbor, Michigan",
      title: "Lab Member",
      logoUrl: "/michigan2.png",
      start: "May 2025",
      end: "Present",
      description:
`Researching Vim-style keybinds and action macros in the Hazel editor.`,
    },
    {
      company: "Menlo Innovations",
      href: "https://google.com",
      badges: [],
      location: "Ann Arbor, Michigan",
      title: "Student Software Consultant",
      logoUrl: "/menlo_innovations_logo.jpeg",
      start: "September 2025",
      end: "December 2025",
      description:
        "Developed internal payroll system. Associated with Innovation for Impact club.",
    },
    {
      company: "CLAWS",
      href: "https://claws.engin.umich.edu",
      badges: [],
      location: "Ann Arbor, Michigan",
      title: "Augmented Reality Software Engineer",
      logoUrl: "/claws.jpeg",
      start: "September 2025",
      end: "December 2025",
      description:
        "Developing AR interfaces in Unity for the NASA Suit's challenge.",
    }, 
    {
      company: "The Future Innovators Academy",
      badges: [],
      href: "http://thefutureinnovatorsacademy.com",
      location: "Ann Arbor, Michigan",
      title: "Summer Camp Instructor",
      logoUrl: "/fia.png",
      start: "July 2025",
      end: "August 2025",
      description:
        "Instructed children ages 5–13 in programming, Arduino, electronics, CAD, and graphic design.",
    },
    
  ],
  education: [
    {
      school: "University of Michigan",
      href: "https://umich.edu",
      badges: [],
      location: "Ann Arbor, Michigan",
      degree: "B.S.E. Computer Science and Engineering Physics",
      logoUrl: "/michigan2.png",
      start: "August 2025",
      end: "Present",
      gpa:"4.0",
      description:
      `Current:
EECS 281: Data Structures and Algorithms
EECS 370: Introduction to Computer Organization
PHYSICS 390: Modern Physics
PHYSICS 391: Modern Physics Lab
URP 357: Architecture, Sustainability and the City

Completed:
EECS 280: Programming and Intro Data Structures
EECS 203: Discrete Mathematics
EECS 201: Computer Science Pragmatics
PHYSICS 340: Waves, Heat, and Light
ENGR 100: Robotics Mechanisms`
    },
    {
      school: "University of Michigan",
      href: "https://umich.edu",
      badges: [],
      location: "Ann Arbor, Michigan",
      degree: "High School Dual Enrollment",
      logoUrl: "/michigan2.png",
      start: "August 2023",
      end: "December 2024",
      gpa:"4.0",
      description:
      `MATH 215: Multivariable and Vector Calculus
MATH 214: Applied Linear Algebra
PHYSICS 240: General Physics II`
    },
    {
      school: "Pioneer High School",
      href: "https://pioneer.a2schools.org",
      badges: [],
      location: "Ann Arbor, Michigan",
      degree: "High School Degree",
      logoUrl: "/phs.png",
      start: "August 2021",
      end: "May 2025",
      gpa:"4.0",
      description:
      "FRC Team 1076, Varsity Tennis, Wharton Global Youth Investment Competition"
    },
  ],
  projects: [
    {
      title: "GlitterCode",
      href: "",
      dates: "December 2025 - January 2026",
      active: true,
      scale: true,
      description:
        "Cursor for block coding education. AI assistant that tutors students through explaining code, developing step-by-step tutoris, and even making small edits itself.",
      technologies: [
        "NextJS",
        "React",
        "TypeScript",
        "Python",
        "FastAPI",
        "LangGraph",
        "Microsoft Foundry",
        "Microsft Azure",
        "Docker"
      ],
      links: [
      ],
      image: "",
      video:
        "/glittercode.mp4",
    },
    {
      title: "V1 Michigan Shipmas",
      href: "",
      dates: "December 2025 - January 2026",
      active: true,
      scale: true,
      description:
        "Built 12 projects over the course of 12 days for the V1 Michigan Shipmas challenge. Each project is built around the prompt of the day.",
      technologies: [
        "NextJS",
        "React",
        "TypeScript",
        "Microsoft Foundry",
        "Tavily"
      ],
      links: [
        {
          type: "Gallery",
          href: "https://shipmas-gallery.vercel.app",
          icon: <Icons.globe className="size-3" />        }
      ],
      image: "",
      video:
        "/shipmas.mov",
    },
    {
      title: "xAI Hackathon: Grok Lens",
      href: "",
      dates: "December 2025",
      active: true,
      scale: true,
      description:
        "AI-powered research and learning partner that turns multiple Grokipedia pages into an intelligent, interactive notebook. Instead of searching across scattered and potentially incorrect notes and web pages, you simply search for your articles on Grokipedia and Grok Lens creates a truth-seeking AI with additional tools inspired by NotebookLM.",
      technologies: [
        "NextJS",
        "FastAPI",
        "RAG",
        "Selenium",
        "Langchain",
        "React",
        "Tailwind",
        "TypeScript",
        "Grok"
      ],
      links: [
        {
          type: "Devpost",
          href: "https://devpost.com/software/grok-lens?ref_content=my-projects-tab&ref_feature=my_projects",
          icon: <Icons.globe className="size-3" />        }
      ],
      image: "",
      video:
        "/groklens-short.mp4",
    },
    {
      title: "LODE Recruiter Dashboard",
      href: "",
      dates: "November 2025",
      active: true,
      description:
        "Recruiter dashboard utilizing AI to analyze candidates quickly.",
      technologies: [
        "NextJS",
        "React",
        "Tailwind",
        "TypeScript",
        "Gemini",
      ],
      links: [
      ],
      image: "",
      video:
        "/lode.mov",
    },
    {
      title: "MHacks: clAI - Command Line AI",
      href: "",
      dates: "September 2025",
      active: true,
      description:
        "Project that won MHacks 2025 Google Gemini Track. Allows users to input natural language, translating into and executing as a shell command.",
      technologies: [
        "Electron",
        "React",
        "Tailwind",
        "TypeScript",
        "Gemini",
        "WebSockets",
        "Python"
      ],
      links: [
        {
          type: "Devpost",
          href: "https://devpost.com/software/clai?_gl=1*pffobo*_gcl_au*MTI3MTc3Njg5MS4xNzU4OTk4Mjg5*_ga*MTM2NzIyMzY2OC4xNzU4OTk4Mjg5*_ga_0YHJK3Y10M*czE3NTk1NTI3ODgkbzgkZzEkdDE3NTk1NTI4NDAkajgkbDAkaDA",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/cryplo/mhacks25",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/clai-logo.png",
      video:
        "",
    },
    {
      title: "Scrappy Shell",
      href: "",
      dates: "May 2025 - June 2025",
      active: true,
      description:
        'Built a UNIX-style shell in C++ with custom parsing and execution features, replicating essential UNIX commands and operators within a functional shell environment.',
      technologies: [
        "C++",
        "Unix",
        "Shell Commands",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/cryplo/scrappyshell",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/scrappyshell.mov",
    },
    {
      title: "F1 Racing Game",
      href: "",
      dates: "February 2023 - March 2023; August 2025",
      active: true,
      description:
        "Developed a racing game in Unity with C#, featuring computer-controlled opponents and fast-paced gameplay. Utilized Unity’s reinforcement learning framework to train AI models to race optimally against other cars.",
      technologies: [
        "Unity",
        "C#",
        "ML-Agents",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/cryplo/f1game",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/f1.mov",
    },
    {
      title: "Productivity Website",
      href: "",
      dates: "April 2023 - March 2023",
      active: true,
      description:
        "Built a dynamic productivity website with features to allow users to manage multiple to-do lists, notes, and timers with full customization",
      technologies: [
       "HTML",
       "CSS",
       "JS" 
      ],
      links: [
        {
          type: "Website",
          href: "https://cryplo.github.io/Productivity-Website/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/cryplo/Productivity-Website/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "/productivity.mov",
    },
  ],
  
  
} as const;
