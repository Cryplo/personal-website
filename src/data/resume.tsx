import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, FolderIcon, FileIcon, BotIcon } from "lucide-react";

export const DATA = {
  name: "Dylan Li",
  initials: "DL",
  url: "https://lidylan.dev",
  location: "Ann Arbor, MI",
  locationLink: "https://www.google.com/maps/place/annarbor",
  description:
    `Computer Science and Engineering Physics
@ University of Michigan`,
  summary:
      `I'm Dylan, a student at the University of Michigan. Go Blue!
Currently, I'm contributing to the Hazel editor in the Future of Programming Lab.
I'm also involved with CLAWS and Innovation for Impact, two software-related clubs.
In my spare time, I love to work on side-projects, run with friends, eat food, and MonkeyType.`,
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
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: FolderIcon, label: "Projects"},
    { href: "/chat", icon: BotIcon, label: "Chat"},
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
      company: "Innovation for Impact",
      href: "https://google.com",
      badges: [],
      location: "Ann Arbor, Michigan",
      title: "Software Engineer",
      logoUrl: "/ifi.jpg",
      start: "September 2025",
      end: "Present",
      description:
        "Working with Menlo Innovations, a local software development company.",
    },
    {
      company: "CLAWS",
      href: "https://claws.engin.umich.edu",
      badges: [],
      location: "Ann Arbor, Michigan",
      title: "Augmented Reality Software Engineer",
      logoUrl: "/claws.jpeg",
      start: "September 2025",
      end: "Present",
      description:
        "Developing AR interfaces in Unity for the NASA Suit's challenge.",
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
`Researching Vim-style keybinds and action macros in the Hazel editor.
Enhanced Hazel code editor by resolving UI bugs and developing new features.`,
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
        "Instructed children ages 5–13 in programming, Arduino, electronics, CAD, and graphic design, fostering both technical skills and healthy personal habits in an engaging learning environment",
    },
    {
      company: "Pioneer High School FRC Robotics",
      href: "https://pihisamurai.org",
      badges: [],
      location: "Ann Arbor, Michigan",
      title: "Engineering Captain",
      logoUrl: "/pihi.png",
      start: "September 2021",
      end: "May 2025",
      description:
        "Directed a 70-person team to design, build, and program three robots, managing the entire engineering process, coordinating cross-team collaboration, and ensuring timely project completion. Transformed software stack by migrating from Python to Java, adopting functional programming practices, and improving odometry precision, computer vision reliability, and motion control accuracy. Advanced team ranking from 40th percentile to 93rd percentile worldwide in three years",
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
      gpa:"n/a",
      description:
      `EECS 280: Programming and Intro Data Structures
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
      "FRC Team 1076, Varsity Tennis, Wharton Global Youth Investment Competition, Asian Youth Club"
    },
  ],
  projects: [
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
        "/groklens.mov",
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
