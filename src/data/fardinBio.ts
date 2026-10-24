export interface CoreBio {
  fullNameBn: string;
  fullNameEn: string;
  preferredName: string;
  birthdate: string;
  ageRef: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  address: string;
  email: string;
  phone: string;
  roles: string[];
  tone: string;
  academicGoal: string;
  careerGoal: string;
  personalGoal: string;
  interests: { topic: string; desc: string }[];
  hobbies: { topic: string; desc: string }[];
  skills: {
    name: string;
    category: string;
    tools: string[];
    description: string;
  }[];
  socials: { [key: string]: string };
}

export const FARDIN_SYSTEM_DATA: CoreBio = {
  fullNameBn: "মো. হুজাইফা ইসলাম ফারদিন",
  fullNameEn: "Md. Huzaifa Islam Fardin",
  preferredName: "Fardin (ফারদিন)",
  birthdate: "29 March, 2009 (২৯ মার্চ, ২০০৯)",
  ageRef: "২০০৯ সালে জন্ম",
  bloodGroup: "O+ (O Positive)",
  nationality: "Bangladeshi (বাংলাদেশি)",
  religion: "Islam (ইসলাম)",
  address: "জামিরদিয়া, ভালুকা, ময়মনসিংহ, বাংলাদেশ (Jamirdia, Bhaluka, Mymensingh)",
  email: "mdfardin20101@gmail.com",
  phone: "+8801645282868",
  roles: [
    "Tech Enthusiast",
    "Active Learner & Builder",
    "AI Vibe Coder",
    "Hardware & Electronics Explorer"
  ],
  tone: "নম্র, মার্জিত, প্রফেশনাল, টু-দ্য-পয়েন্ট এবং বন্ধুত্বপূর্ণ। অতিরিক্ত কথা না বলে সরাসরি প্রশ্নের সঠিক উত্তর দেওয়া।",
  academicGoal: "বিজ্ঞান, গণিত ও কম্পিউটার সিস্টেমসে গভীর সমস্যা সমাধান ও বিশ্লেষণধর্মী চিন্তাভাবনার মাধ্যমে শক্তিশালী একাডেমিক ভিত্তি গড়া।",
  careerGoal: "একটি সফটওয়্যার ও প্রযুক্তিভিত্তিক ব্যবসা বা স্টার্টআপ প্রতিষ্ঠা করা, যা কার্যকর ডিজিটাল প্রোডাক্ট, উদ্ভাবনী অ্যাপ্লিকেশন এবং বুদ্ধিমান সিস্টেম তৈরি করবে।",
  personalGoal: "শৃঙ্খলা, সৃজনশীলতা ও প্রযুক্তিগত দক্ষতা নিয়মিত বৃদ্ধির মাধ্যমে নিজেকে ভবিষ্যৎ প্রযুক্তির সাথে খাপ খাইয়ে চলা আত্মবিশ্বাসী মানুষ হিসেবে গড়ে তোলা।",
  interests: [
    { topic: "Science", desc: "পদার্থবিজ্ঞান, কসমোলজি ও মহাবিশ্বের মৌলিক নিয়মাবলী।" },
    { topic: "AI & Technology", desc: "মেশিন লার্নিং, ইন্টেলিজেন্ট সিস্টেম ও আধুনিক প্রযুক্তির বিকাশ।" },
    { topic: "Electronics", desc: "সার্কিট বোর্ড, এমবেডেড সিস্টেম ও মাইক্রোকন্ট্রোলার আর্কিটেকচার।" },
    { topic: "Robotics", desc: "সেন্সর, কন্ট্রোলার ও মেকানিক্যাল মুভমেন্টের সমন্বয়ে তৈরি অটোনোমাস সিস্টেম।" }
  ],
  hobbies: [
    { topic: "Gaming", desc: "কম্পিটিটিভ গেমপ্লে সিস্টেম ও গেম ইঞ্জিনের মেকানিক্স নিয়ে জানাশোনা।" },
    { topic: "Electronics & CAD", desc: "ESP32 মাইক্রোকন্ট্রোলার সার্কিট এবং থ্রিডি ক্যাড মডেলিং ও প্রিন্টিং।" },
    { topic: "AI Assisted Vibe Coding", desc: "আধুনিক এআই টুলস দিয়ে দ্রুত সফটওয়্যার তৈরি ও লজিক ডেভেলপমেন্ট।" },
    { topic: "Sandbox Experimentation", desc: "ট্রায়াল ও এররের মাধ্যমে নতুন প্রযুক্তি ও কোডিং আইডিয়া টেস্ট করা।" }
  ],
  skills: [
    {
      name: "React & Web Development",
      category: "Specialized Engineering",
      tools: ["React", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "Git", "GitHub"],
      description: "রেসপনসিভ ওয়েব অ্যাপ্লিকেশন, ক্লিন কম্পোনেন্ট আর্কিটেকচার ও মডার্ন ইউজার ইন্টারফেস তৈরিতে ফারদিন পারদর্শী।"
    },
    {
      name: "Electronics & PCB Design",
      category: "Hardware Engineering",
      tools: ["EasyEDA", "KiCAD", "Circuit SPICE Simulation", "ESP32", "Arduino IDE"],
      description: "সার্কিট স্কিম্যাটিক ডিজাইন, পিসিবি রাউটিং এবং হার্ডওয়্যার প্রোটোটাইপিং ফারদিনের বিশেষ দক্ষতার একটি।"
    },
    {
      name: "3D CAD Modeling & Prototyping",
      category: "Spatial Engineering",
      tools: ["Fusion 360", "FreeCAD", "Tinkercad", "Cura Slicer"],
      description: "সার্কিট বক্স/এনক্লোজার ডিজাইন, প্যারামেট্রিক থ্রিডি মডেলিং এবং থ্রিডি প্রিন্টিং প্রিপারেশন।"
    },
    {
      name: "Scientific & Technical Visualization",
      category: "Analytical Modeling",
      tools: ["Python", "Matplotlib", "NumPy", "D3.js", "Desmos", "GeoGebra"],
      description: "গাণিতিক ইকুয়েশন, ফিজিক্স সিমুলেশন ও ডাটা থেকে ইন্টারঅ্যাক্টিভ গ্রাফ তৈরি।"
    },
    {
      name: "Digital Documentation & Presentation",
      category: "Specialized Engineering",
      tools: ["Markdown", "Canva", "Figma", "LaTeX", "Notion"],
      description: "সিস্টেম ডকুমেন্টেশন ও ডিজিটাল প্রেজেন্টেশন ডিজাইন।"
    },
    {
      name: "Computer & Software Literacy",
      category: "Foundational Literacy",
      tools: ["Linux Bash", "Zsh", "Windows PowerTools", "Git CLI", "Browser DevTools"],
      description: "লিনাক্স টার্মিনাল, ফাইল সিস্টেম এবং সিস্টেম অটোমেশনে সাবলীল দক্ষতা।"
    }
  ],
  socials: {
    email: "mdfardin20101@gmail.com",
    phone: "+8801645282868",
    whatsapp: "https://wa.me/qr/PN34JMARK4WXF1",
    facebook: "https://www.facebook.com/md.fardin.179815",
    instagram: "https://www.instagram.com/md_fardin_2010",
    twitter: "https://x.com/mdfardin20101"
  }
};

export const QUICK_SUGGESTIONS = [
  "ফারদিনের পুরো নাম কী?",
  "সে কি React দিয়ে কাজ করে?",
  "ইলেকট্রনিক্স ও ESP32 এ কি তার অভিজ্ঞতা আছে?",
  "ফারদিনের ক্যারিয়ার গোল কী?",
  "ফারদিনের বাড়ি কোথায়?"
];
