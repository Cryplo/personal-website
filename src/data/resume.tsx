import { Icons } from "@/components/icons";
import { NotebookIcon, FolderIcon, FileIcon, BotIcon, UserIcon } from "lucide-react";

export const DATA = {
  name: "Dylan Li",
  initials: "DL",
  url: "https://lidylan.dev",
  location: "Ann Arbor, MI",
  locationLink: "https://www.google.com/maps/place/annarbor",
  description:
    `Computer Science · University of Michigan
Physics & Math minors · Class of 2028`,
  summary:
      `I'm Dylan, a Computer Science student at the University of Michigan, with minors in Physics and Math and an expected graduation in May 2028. Go Blue!
I spent summer 2026 at AWS building monitoring infrastructure and customer-facing metrics for Parallel Computing Service. I also build AI tools, developer tools, and projects that help people learn.
I'm extremely interested in technology, startups, physics, and problem-solving.
In my spare time, I love to work on side-projects, hit the gym, run with friends, eat food, and MonkeyType.`,
  avatarUrl: "/me.png",
  skills: [
    "Java", "Python", "C", "C++", "C#", "TypeScript", "HTML/CSS",
    "Go", "Git", "AWS", "Azure", "Vim", "Unix", "LangGraph", "React",
    "Next.js", "FastAPI", "Docker",
  ],
  hackathons: ["HackMIT", "MHacks", "xAI Hackathon"],
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
        url: "/resume.pdf",
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
      company: "Amazon Web Services",
      href: "https://aws.amazon.com/",
      badges: [],
      location: "Boston, Massachusetts",
      title: "Software Development Engineering Intern",
      logoUrl: "/aws.png",
      start: "June 2026",
      end: "August 2026",
      description:
        `Developed monitoring infrastructure for ECS agents running on thousands of cluster management EC2 instances globally, improving observability and simplifying on-call debugging for Parallel Computing Service.

Worked across engineering and product teams to implement customer-facing cluster capacity metrics, giving users visibility into compute node states, billing information, and potential program failures.

Created an AutoSDE rule to proactively catch missing cross-account API permissions in new code review changes.`,
    },
    {
      company: "V1 Michigan",
      href: "https://v1michigan.com",
      badges: [],
      location: "Ann Arbor, Michigan",
      title: "Product Studio Member and Community Team",
      logoUrl: "/v1.jpeg",
      start: "January 2026",
      end: "May 2026",
      description:
        `Built Syllog, a full-stack strategy builder for prediction markets using Next.js, React, and Go. Its visual node-based editor composes market, logic, and trading workflows with the ability to deploy to Kalshi.

Developed a Slack agent for information retrieval and made website improvements to streamline internal team operations.`,
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
`Researching Vim-style keybinds and action macros in the Hazel editor`,
    },
    {
      company: "FIRST Robotics Competition Team 1076",
      href: "https://pihisamurai.org/",
      badges: [],
      location: "Ann Arbor, Michigan",
      title: "Engineering Captain",
      logoUrl: "/pihi.png",
      start: "Sep 2021",
      end: "May 2025",
      description:
`Directed a 70-person team to design, build, and program three robots, managing the engineering process and coordinating work across subteams.

Migrated the software stack from Python to Java, adopted functional programming practices, and improved odometry precision, computer vision reliability, and motion control accuracy.

Advanced the team from the 40th to the 93rd percentile worldwide over three years of leadership.`,
    },
  ],
  education: [
    {
      school: "University of Michigan",
      href: "https://umich.edu",
      badges: [],
      location: "Ann Arbor, Michigan",
      degree: "B.S.E. Computer Science, Minors in Physics and Math",
      logoUrl: "/michigan2.png",
      start: "August 2025",
      end: "May 2028 (expected)",
      gpa:"3.9",
      description:
      `Coursework:
Distributed Systems
GPU Parallel Programming
Data Structures and Algorithms
Computer Organization
Discrete Math
Modern Physics
Physics III
Computer Science Pragmatics
Proof-Based Linear Algebra`
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
      title: "Syllog",
      href: "",
      dates: "January 2026 - May 2026",
      active: true,
      description:
        "Built at V1 Michigan: a full-stack strategy builder for prediction markets. A visual node-based editor lets users compose market, logic, and trading workflows, with the ability to deploy to Kalshi.",
      technologies: ["Next.js", "React", "Go"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "GlitterCode",
      href: "",
      dates: "December 2025 - January 2026",
      active: true,
      scale: true,
      description:
        "Built an AI-assisted block coding platform for Microsoft Imagine Cup, validating and iterating features with 8 students and 2 teachers. Four specialized LangGraph agents support learning, with a FastAPI backend connected to a Next.js frontend through WebSockets. Deployed both services as Docker containers on Azure Container Apps, and created a pitch deck, pitch recording, and product demo covering product-market fit and go-to-market strategy.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Python",
        "FastAPI",
        "LangGraph",
        "Microsoft Foundry",
        "Azure Container Apps",
        "WebSockets",
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
        "Next.js",
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
        "Built as a selected participant in the xAI Hackathon: a NotebookLM-style AI research agent that turns Grokipedia pages into an interactive study notebook. Designed the full-stack architecture with dedicated FastAPI endpoints calling Grok APIs for each study tool and React components for a consistent user experience.",
      technologies: [
        "Next.js",
        "FastAPI",
        "RAG",
        "Selenium",
        "LangChain",
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
        "Next.js",
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
        'Built a UNIX-style shell in C++ with custom parsing and execution, replicating essential UNIX commands and operators. Explored process management, file descriptors, recursive descent parsing, and lexing to deepen understanding of operating systems and interpreter design.',
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
