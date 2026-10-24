import { FARDIN_SYSTEM_DATA } from '../data/fardinBio';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

/**
 * Intelligent, polite, and strictly to-the-point response handler.
 * Answers ONLY what is asked without info-dumping.
 */
export function getAssistantResponse(userPrompt: string): string {
  const q = userPrompt.trim().toLowerCase();

  // Greetings (Salam, Hi, Hello)
  if (q.match(/^(hi|hello|hey|salam|assalamu|কেমন আছ|হাই|হ্যালো|সালাম|নমস্কার)/i)) {
    return `ওয়ালাইকুমুস সালাম! আমি ফারদিনের ব্যক্তিগত অ্যাসিস্ট্যান্ট। ফারদিন সম্পর্কে আপনার নির্দিষ্ট কোনো প্রশ্ন থাকলে বলুন, আমি জানিয়ে দিচ্ছি।`;
  }

  // 1. Full Name / Specific Name
  if (
    q.includes('পুরো নাম') || 
    q.includes('full name') || 
    q.includes('আসল নাম') ||
    q.includes('নাম কি') ||
    q.includes('নাম কী')
  ) {
    return `ফারদিনের পুরো নাম **${FARDIN_SYSTEM_DATA.fullNameBn}** (${FARDIN_SYSTEM_DATA.fullNameEn})। আপনি তাকে সংক্ষেপে **ফারদিন (Fardin)** বলে ডাকতে পারেন।`;
  }

  // 2. Address / Location
  if (q.includes('ঠিকানা') || q.includes('বাড়ি') || q.includes('বাড়ি') || q.includes('address') || q.includes('কোথায় থাকে') || q.includes('location')) {
    return `ফারদিনের ঠিকানা: **${FARDIN_SYSTEM_DATA.address}**।`;
  }

  // 3. Birthdate / Age
  if (q.includes('জন্ম') || q.includes('birthdate') || q.includes('birthday') || q.includes('বয়স') || q.includes('বয়স') || q.includes('age')) {
    return `ফারদিনের জন্ম তারিখ **${FARDIN_SYSTEM_DATA.birthdate}**।`;
  }

  // 4. Blood Group
  if (q.includes('রক্ত') || q.includes('blood') || q.includes('blood group')) {
    return `ফারদিনের রক্তের গ্রুপ **${FARDIN_SYSTEM_DATA.bloodGroup}**।`;
  }

  // 5. Nationality
  if (q.includes('জাতীয়তা') || q.includes('জাতীয়তা') || q.includes('দেশ') || q.includes('nationality') || q.includes('country')) {
    return `ফারদিন জন্মসূত্রে একজন গর্বিত **${FARDIN_SYSTEM_DATA.nationality}**।`;
  }

  // 6. Religion
  if (q.includes('ধর্ম') || q.includes('religion')) {
    return `ফারদিনের ধর্ম **${FARDIN_SYSTEM_DATA.religion}**।`;
  }

  // 7. SPECIFIC SKILL QUERIES (Precise & To-the-point)
  // React
  if (q.includes('react')) {
    return `হ্যাঁ, ফারদিন **React**-এ অত্যন্ত দক্ষ। তিনি React ও TypeScript ব্যবহার করে ক্লিন আর্কিটেকচারের আধুনিক ও দ্রুতগতির ওয়েব অ্যাপ্লিকেশন তৈরি করেন।`;
  }

  // TypeScript / JavaScript
  if (q.includes('typescript') || q.includes('javascript') || q.includes('js') || q.includes('ts')) {
    return `হ্যাঁ, ফারদিন **TypeScript** ও জাভাস্ক্রিপ্টে দক্ষ। তিনি কোডের নির্ভরযোগ্যতা ও টাইপ-সেফটির জন্য নিয়মিত TypeScript ব্যবহার করেন।`;
  }

  // Tailwind CSS
  if (q.includes('tailwind') || q.includes('css') || q.includes('ডিজাইন')) {
    return `হ্যাঁ, ফারদিন স্টাইলিং ও মডার্ন রেসপনসিভ UI তৈরির জন্য **Tailwind CSS** চমৎকারভাবে ব্যবহার করেন।`;
  }

  // Electronics / Circuit / Hardware / ESP32 / PCB
  if (q.includes('esp32') || q.includes('arduino') || q.includes('ইলেকট্রনিক্স') || q.includes('electronics') || q.includes('pcb') || q.includes('সার্কিট')) {
    return `হ্যাঁ, ইলেকট্রনিক্স ও পিসিবি ডিজাইন ফারদিনের প্রধান দক্ষতার একটি। তিনি **ESP32**, **EasyEDA**, **KiCAD** এবং সার্কিট সিমুলেশন ব্যবহার করে প্রোটোটাইপ তৈরি করেন।`;
  }

  // CAD / 3D Modeling / Printing
  if (q.includes('cad') || q.includes('fusion') || q.includes('3d') || q.includes('থ্রিডি') || q.includes('মডেলিং')) {
    return `হ্যাঁ, ফারদিনের **3D CAD Modeling**-এ দক্ষতা রয়েছে। তিনি Fusion 360 ও Tinkercad দিয়ে সার্কিট এনক্লোজার ও ৩ডি প্রিন্টিং পার্টস ডিজাইন করেন।`;
  }

  // Python / Data / Visualization
  if (q.includes('python') || q.includes('পাইথন')) {
    return `হ্যাঁ, ফারদিন টেকনিক্যাল ও সায়েন্টিফিক ভিজ্যুয়ালাইজেশনের জন্য **Python (Matplotlib, NumPy)** এবং ডাটাসেট নিয়ে কাজ করেন।`;
  }

  // Linux / Terminal
  if (q.includes('linux') || q.includes('লিনাক্স') || q.includes('bash') || q.includes('terminal')) {
    return `হ্যাঁ, ফারদিন লিনাক্স (Linux Bash/Zsh) টার্মিনাল, ফাইল সিস্টেম এবং সিস্টেম অটোমেশনে পুরোপুরি স্বাচ্ছন্দ্যবোধ করেন।`;
  }

  // General Skills (Only if asked broadly)
  if (q.includes('skill') || q.includes('স্কিল') || q.includes('দক্ষতা') || q.includes('কি কি পারে') || q.includes('কী পারে')) {
    return `ফারদিনের মূল দক্ষতাগুলো সংক্ষেপে:
1. **Web Development** (React, TypeScript, Tailwind CSS)
2. **Electronics & PCB Design** (EasyEDA, ESP32, Circuits)
3. **3D CAD Modeling** (Fusion 360, Enclosures)
4. **AI-Assisted Vibe Coding** (LLM চালিত দ্রুত সফটওয়্যার ডেভেলপমেন্ট)

আপনি নির্দিষ্ট কোনো প্রযুক্তি সম্পর্কে জানতে চাইলে নাম উল্লেখ করে জিজ্ঞেস করতে পারেন।`;
  }

  // 8. Goals (Specific vs General)
  // Academic Goal
  if (q.includes('পড়াশোনা') || q.includes('academic') || q.includes('শিক্ষা')) {
    return `ফারদিনের একাডেমিক লক্ষ্য হলো: **${FARDIN_SYSTEM_DATA.academicGoal}**`;
  }

  // Career Goal
  if (q.includes('ক্যারিয়ার') || q.includes('career') || q.includes('ব্যবসা') || q.includes('business')) {
    return `ফারদিনের ক্যারিয়ার গোল: **${FARDIN_SYSTEM_DATA.careerGoal}**`;
  }

  // General Goals
  if (q.includes('goal') || q.includes('লক্ষ্য') || q.includes('উদ্দেশ্য') || q.includes('স্বপ্ন')) {
    return `ফারদিনের প্রধান লক্ষ্য হলো একটি উদ্ভাবনী সফটওয়্যার ও প্রযুক্তি প্রতিষ্ঠান গড়ে তোলা এবং বিজ্ঞান ও প্রযুক্তিতে গভীর পাণ্ডিত্য অর্জন করা।`;
  }

  // 9. Interests (আগ্রহ)
  if (q.includes('আগ্রহ') || q.includes('interest')) {
    return `ফারদিনের মূল আগ্রহের বিষয়গুলো হলো: **বিজ্ঞান (পদার্থবিজ্ঞান ও কসমোলজি)**, **কৃত্রিম বুদ্ধিমত্তা (AI)**, **ইলেকট্রনিক্স** এবং **রোবোটিক্স**।`;
  }

  // 10. Hobbies (শখ)
  if (q.includes('শখ') || q.includes('hobby') || q.includes('hobbies') || q.includes('গেমিং') || q.includes('game') || q.includes('পছন্দ')) {
    return `ফারদিনের শখ হলো: **গেমিং**, **ইলেকট্রনিক্স সার্কিট প্রোটোটাইপিং**, **AI Vibe Coding** এবং নতুন নতুন প্রযুক্তি নিয়ে **Sandbox Experimentation** করা।`;
  }

  // 11. Contact (Specific vs General)
  // Phone / WhatsApp
  if (q.includes('phone') || q.includes('ফোন') || q.includes('মোবাইল') || q.includes('নাম্বার') || q.includes('call')) {
    return `ফারদিনের ফোন নম্বর: **${FARDIN_SYSTEM_DATA.phone}**।`;
  }

  // Email
  if (q.includes('email') || q.includes('ইমেইল') || q.includes('মেইল')) {
    return `ফারদিনের ইমেইল এড্রেস: **${FARDIN_SYSTEM_DATA.email}**।`;
  }

  // Facebook / Instagram / Social
  if (q.includes('facebook') || q.includes('ফেসবুক')) {
    return `ফারদিনের ফেসবুক প্রোফাইল: ${FARDIN_SYSTEM_DATA.socials.facebook}`;
  }
  if (q.includes('instagram') || q.includes('ইনস্টাগ্রাম')) {
    return `ফারদিনের ইনস্টাগ্রাম: ${FARDIN_SYSTEM_DATA.socials.instagram}`;
  }
  if (q.includes('whatsapp') || q.includes('হোয়াটসঅ্যাপ')) {
    return `ফারদিনের হোয়াটসঅ্যাপ লিংক: ${FARDIN_SYSTEM_DATA.socials.whatsapp} (বা নম্বর: ${FARDIN_SYSTEM_DATA.phone})`;
  }
  if (q.includes('contact') || q.includes('যোগাযোগ') || q.includes('কথা')) {
    return `ফারদিনের সাথে যোগাযোগ করতে পারেন:\n📧 ইমেইল: ${FARDIN_SYSTEM_DATA.email}\n📞 ফোন / হোয়াটসঅ্যাপ: ${FARDIN_SYSTEM_DATA.phone}`;
  }

  // 12. Short Bio / Who is Fardin
  if (q.includes('ফারদিন কে') || q.includes('who is fardin') || q.includes('পরিচয়') || q.includes('bio') || q.includes('about')) {
    return `**মো. হুজাইফা ইসলাম ফারদিন** একজন তরুণ টেক এনথুজিয়াস্ট, লার্নার ও বিল্ডার। তিনি হার্ডওয়্যার ইলেকট্রনিক্স, থ্রিডি ক্যাড, এআই ভাইব কোডিং এবং ওয়েব অ্যাপ্লিকেশন নিয়ে কাজ করতে ভালোবাসেন।`;
  }

  // Polite fall-through: short & helpful
  return `আমি আপনার প্রশ্নের সঠিক উত্তর দিতে প্রস্তুত। আপনি ফারদিনের কোনো নির্দিষ্ট স্কিল (যেমন React, ESP32), শিক্ষা, ক্যারিয়ার লক্ষ্য বা যোগাযোগের তথ্য জানতে চাইলে সরাসরি লিখে জানান।`;
}
