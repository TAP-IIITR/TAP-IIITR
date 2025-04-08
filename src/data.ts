//Alumni Images
import aniket_singh from "@/assets/alumni/aniket_sinha.jpeg";
import ankit_yadav from "@/assets/alumni/ankit_yadav.jpeg";
import Devansh_srivastav from "@/assets/alumni/Devansh_srivastav.jpeg";
import Kashish_gupta from "@/assets/alumni/Kashish_gupta.jpeg";
import kavita_yadav from "@/assets/alumni/kavita_yadav.jpeg";
import khushi_sahu from "@/assets/alumni/khushi_sahu.jpeg";
import Kolluru_yashwant from "@/assets/alumni/Kolluru_yashwant.jpeg";
import Prabhat_suman from "@/assets/alumni/Prabhat_suman.jpeg";
import saloni_seth_grow from "@/assets/alumni/saloni_seth_grow.jpeg";
import Shaurya_shrivastav from "@/assets/alumni/Shaurya_shrivastav.jpeg";
import Shubham_kumar_oracle from "@/assets/alumni/Shubham_kumar_oracle.jpeg";
import Vishal_pratap_singh from "@/assets/alumni/Vishal_pratap_singh.jpeg";
import wriddheman from "@/assets/alumni/wriddheman.jpeg";
import Yash_pandey from "@/assets/alumni/Yash_pandey.jpeg";

//Team Images

//Faculty Images
import noopur from "@/assets/noopur-mam.png";
import pooja_mam from "@/assets/team/faculty/pooja_mam.jpg";
import ranjan_sir from "@/assets/team/faculty/ranjan_sir.jpg";
import shadab_Sir from "@/assets/team/faculty/shadab_sir.jpg";
import sonali_mam from "@/assets/team/faculty/sonali-mam.jpg";

//Student Images
import shivam from "@/assets/team/students/shivam.jpg";
import manu from "@/assets/team/students/manu.jpeg";
import mrinmoy from "@/assets/team/students/Mrinmoy.jpg";
import shivang from "@/assets/team/students/shivang.jpg";
import sakshi from "@/assets/team/students/sakshi.jpg";
import manjeet from "@/assets/team/students/manjeet.jpg";
import yash from "@/assets/team/students/yash.jpg";
import sudhanshu from "@/assets/team/students/sudhanshu.jpg";
import akshat from "@/assets/team/students/akshat.jpg";
import adarsh from "@/assets/team/students/adarsh.jpg";
import prashant from "@/assets/team/students/Prashant.jpg";
import adityaS from "@/assets/team/students/adityaS.jpg";
import pratham from "@/assets/team/students/Pratham.jpg";

//Why Recruit Images
import nt from "@/assets/whyRecruit/nt.svg";
import fc from "@/assets/whyRecruit/fc.svg";
import st from "@/assets/whyRecruit/st.svg";
import cesi from "@/assets/whyRecruit/cesi.svg";
import swie from "@/assets/whyRecruit/swie.svg";
import ard from "@/assets/whyRecruit/ard.svg";

//Overview Images
import iiitRImg from "@/assets/background-img.jpg";
import dirImg from "@/assets/director-sir.jpg";
import nopImg from "@/assets/noopur-mam.png";

//Social Media Icons
import fb from "@/assets/fb.svg";
import tw from "@/assets/twitter.svg";
import ln from "@/assets/linkedin.svg";
import insta from "@/assets/insta.svg";
import yt from "@/assets/youtube.svg";

type OverviewCardProps = {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  designation?: { name: string; designation: string; loc: string };
  buttonText: string;
  socialLinks?: { icon: string; url: string }[];
};

type Alumni = {
  image: string;
  name: string;
  company: string;
};

type PlacementStats = {
  label: string;
  data: {
    label: string;
    value: number;
    color: string;
  }[];
};
type WhyRecuritCardProps = {
  image: string;
  title: string;
  description: string;
};

export const OverviewData: OverviewCardProps[] = [
  {
    image: iiitRImg,
    title: "IIIT Ranchi",
    subtitle: "Indian Institute of Information Technology Ranchi  ",
    description:
      "is an autonomous institute setup by the MoE, Government of India, and Government of Jharkhand along with the industry partners TTL, TCS and CCL on a Public Private Partnership. The IIIT Ranchi is funded by Government of India (50%), Government of Jharkhand (35%) and Industry Partners (15%). The institute is expected to meet operating expenses from tuition fees, grants, sponsorships, consultancy, donations etc. Additionally, the Government of Jharkhand has lent support to the institute by granting land for setting up the Campus at Digital Valley campus (Kanke Block), Ranchi, Jharkhand. IIIT Ranchi is autonomous, not-for-profit, self-sustaining, teaching and research-led education Institution. The institute is managed by professionals from the area of academics and research, under the guidance of a Board of Governors of the Institute that has representatives of participating Industry partners, eminent academicians & researchers and representatives from Government. Currently, IIIT Ranchi is focusing on applied teaching, research and consultancy in IT and selected domain areas.",
    buttonText: "https://iiitranchi.ac.in",
    socialLinks: [
      {
        icon: fb,
        url: "https://www.facebook.com/iiitranchi",
      },
      {
        icon: tw,
        url: "https://twitter.com/iiitranchi",
      },
      {
        icon: ln,
        url: "https://www.linkedin.com/school/iiitranchi",
      },
      {
        icon: insta,
        url: "https://www.instagram.com/iiitranchi",
      },
      {
        icon: yt,
        url: "https://www.instagram.com/iiitranchi",
      },
    ],
  },
  {
    image: dirImg,
    title: "Director's Message",
    description:
      "Indian Institute of Information Technology (IIIT) Ranchi, established in Year 2016 as an Institute of National Importance by an act of Parliament, in a Public Private Partnership (PPP) mode with an aim to be a self-sustainable institute within five years and achieved excellence in teaching and research in information technology. In this endeavor, Government of India, Government of Jharkhand, and private partners - Central Coalfield Limited, Tata Consultancy Services and Tata Technologies Limited -are working in unison to establish an Institute that bridges the gap between academics and industry, creating a pool of skilled Electronic Communication Engineers, Computer Scientists &Engineers that are readily employable in Industry. The curriculum and labs at IIIT Ranchi commensurate with industry standards, established so that students get exposure at the earliest to the environment and work culture of industry. In coming years, the institute will contribute profusely in research and scientific discovery by adding various research programs. It is my earnest appeal to all stakeholders to contribute in the progress of the Institute and to all major players of IT industries to provide opportunities to students of IIIT Ranchi in terms of campus placement.",
    designation: {
      name: "Prof. Rajeev Srivastava",
      designation: "Director",
      loc: "IIIT Ranchi",
    },
    buttonText: "director@iiitranchi.ac.in",
  },
  {
    image: nopImg,
    title: "TPO's Message",
    subtitle:
      '"Believe in yourself! Have faith in your abilities! A humble but reasonable confidence in your own powers can make you a successful person."',
    description:
      "Dear Recruiter, it gives me great pleasure to invite you to visit the Indian Institute of Information Technology Ranchi campus for the 2024-25 placement session. As an Institute of National Importance, IIIT Ranchi always focuses on its solid visionary objectives. Our Institution inculcates the very idea of preparing students to face various technical and non-technical issues. As a result of constant endeavour by the Training and Placement Cell members under the guidance of the honourable Director, Institute has succeeded in obtaining an overwhelming response from various recruiters. Activities of Training and Placement Cell centre on making strong relationships with Industries and to leverage the relationship for personality and skill development of the graduating students through various interactive programmes.Training and Placement Cell looks forward to more robust collaboration with Industries so that deserving students can get the best platform to nurture their talents and improve their credibility for better placement prospects.",
    designation: {
      name: "Dr. Noopur",
      designation: "Faculty Coordinator Training & Placement Cell",
      loc: "IIIT Ranchi",
    },
    buttonText: "tpo@iiitranchi.ac.in",
  },
];

export const alumniData: Alumni[] = [
  { image: aniket_singh, name: "Aniket Sinha", company: "C-DAC" },
  { image: ankit_yadav, name: "Ankit Yadav", company: "Nvidia" },
  {
    image: Devansh_srivastav,
    name: "Devansh Srivastav",
    company: "IISC Banglore",
  },
  { image: Kashish_gupta, name: "Kashish Gupta", company: "Google" },
  { image: kavita_yadav, name: "Kavita Yadav", company: "Walmart" },
  { image: khushi_sahu, name: "Khushi Sahu", company: "Amazon" },
  {
    image: Kolluru_yashwant,
    name: "Kolluru Yashwant",
    company: "PhD IIT Delhi",
  },
  { image: Prabhat_suman, name: "Prabhat Suman", company: "FLOW" },
  { image: saloni_seth_grow, name: "Saloni Seth", company: "Groww" },
  {
    image: Shaurya_shrivastav,
    name: "Shaurya Shrivastav",
    company: "Microsoft",
  },
  { image: Shubham_kumar_oracle, name: "Shubham Kumar", company: "Oracle" },
  {
    image: Vishal_pratap_singh,
    name: "Vishal Pratap Singh",
    company: "Nurix AI",
  },
  { image: wriddheman, name: "Wriddheman", company: "Phd IIT Delhi" },
  { image: Yash_pandey, name: "Yash Pandey", company: "Nasdaq" },
];

type Team = {
  image: string;
  name: string;
  designation?: string;
  department?: string;
};

export const profTeamData: Team[] = [
  {
    image: noopur,
    name: "Dr. Noopur",
    designation: "Faculty Coordinator",
    department: "Training & Placement Cell, IIIT Ranchi",
  },
  {
    image: pooja_mam,
    name: "Dr. Puja Ghosh ",
    designation: "Faculty Coordinator",
    department: "Training & Placement Cell, IIIT Ranchi",
  },
  {
    image: ranjan_sir,
    name: "Dr. Ranjan Behera",
    designation: "Faculty Coordinator",
    department: "Training & Placement Cell, IIIT Ranchi",
  },
  {
    image: shadab_Sir,
    name: "Dr. S.Shadab Hassan",
    designation: "Faculty Coordinator",
    department: "Training & Placement Cell, IIIT Ranchi",
  },
];

export const TPOData: Team[] = [
  {
    image: sonali_mam,
    name: "Ms. Sonali Malviya",
    designation: "Training and Placement Officer",
    department: "Training & Placement Cell, IIIT Ranchi",
  },
];

export const studentTeamData: Team[] = [
  {
    image: shivam,
    name: "Shivam Bharadwaj",
  },
  {
    image: manu,
    name: "Manu Shukla",
  },
  {
    image: mrinmoy,
    name: "Mrinmoy Mahato",
  },
  {
    image: shivang,
    name: "Shivang Sharma",
  },
  {
    image: sakshi,
    name: "Sakshi Ekka",
  },
  {
    image: manjeet,
    name: "Manjeet Singh",
  },
  {
    image: yash,
    name: "Yash Raj",
  },
  {
    image: sudhanshu,
    name: "Sudhanshu Mittal",
  },
  {
    image: akshat,
    name: "Akshat kumar",
  },
  {
    image: adarsh,
    name: "Adarsh Sharma",
  },
  {
    image: prashant,
    name: "Prashant Kr. Singh ",
  },
  {
    image: adityaS,
    name: "Aditya Singh",
  },
  {
    image: pratham,
    name: "Pratham  Dwivedi",
  },
];

export const whyRecuitData: WhyRecuritCardProps[] = [
  {
    image: nt,
    title: "Nation's Best Talent",
    description:
      "The students of B.Tech.(CSE and ECE) are admitted through JEE and represents the top 5% of the candidates that appear for the exam nation-wide. This creamy layer of students possess excellent analytical skills, have a thirst for knowledge and are quick learners. Admissions to the M.Tech.programme is made on the basis of GATE scores.",
  },
  {
    image: fc,
    title: "Finest Curriculum",
    description:
      "The institute's curriculum, developed by academic and industry experts, reflects the evolving world of technology. With a world-class faculty possessing extensive knowledge and research experience, the institute consistently produces students with strong fundamentals and expertise in their chosen fields.",
  },
  {
    image: st,
    title: "Superlative Thinker",
    description:
      "Our students every year take part in renowned programming competitions like ACM-ICPC, Google Summer of Code, Google Code Jam and have always made their presence felt by securing high ranks. We also have a large number of students honing their coding skills on websites like TopCoder, SPOJ, CodeChef etc.",
  },
  {
    image: cesi,
    title: "Cutting Edge Research Infrastructure",
    description:
      "The infrastructure and research facilities of the institute are among the best in the field of IT and ECE. The student here get a hands on experience by working in world class labs with cutting edge equipment. This has led to 11 patents being filed till now and more than 350 research paper are published every year.",
  },
  {
    image: swie,
    title: "Students with Experience in Industry",
    description:
      "The institute in collaboration with the government of India, MHRD, Ministry of Science & IT, Ministry of Telecom and other national and international universities, is actively involved in a lot of research projects. The students also take up research project and go through pre-final year internship to streamline their knowledge with current industry practices.",
  },
  {
    image: ard,
    title: "All-Round Development",
    description:
      "The Institute is committed to providing the students opportunities to develop an all-rounded personality. Many essential soft skills, including communication, conflict resolution, creative problem solving, strategic thinking, team building, are inculcated in the students through various classroom and co-curricular activities.",
  },
];

export const procedureData = [
  {
    label: "Invitation",
    data: "Training and Placement (TAP) Cell, IIIT Ranchi invites companies/organizations or full-time hiring/internship hiring of the students.",
  },
  {
    label: "FinalJNF/INF",
    data: "TAP Cell provides the link to download the Job Notification Form (JNF) & Internship Notification Form (INF) that needs to be filled by the company and sent through email to tpo@iiitranchi.ac.in",
  },
  {
    label: "Assign a Coordinator",
    data: "A student from the tap coordinators is assigned to every company as Point of Contact (POC) to coordinate with HRs and students for smooth conduct of hiring process",
  },
  {
    label: "PPT & OA",
    data: "On receipt of JNF/INF, TAP Cell invites the companies to visit the campus for a Pre-Placement Talk (PPT) either before the selection process or during the final recruitment process",
  },
  {
    label: "Schedule",
    data: "TAP finalizes a suitable date for the selection process and communicates to the company. Dates are allotted on the basis of students' perception of the job/internship offered viz, job profile and growth prospects, CTC/Stipend offered by company, past record recruitment.",
  },
  {
    label: "Final List",
    data: "After completion of the selection process, the company is requested to furnish the final list of selected and/or wait-listed students.",
  },
];

/* Banner data */

export const JNF = "https://forms.gle/p453mYrHb1qtRr4HA";
export const contactEmail = "mailto:tpo@iiitranchi.ac.in";
export const PlacementBrochure =
  "https://drive.google.com/file/d/1fJUSEmC2O8VjdXn8yO7GMsb1HiuFzi1t/view?usp=drivesdk";

/**Chart datas */

export const placementStats: PlacementStats[] = [
  {
    label: "2020 - 2024",
    data: [
      {
        label: "Highest Package",
        value: 28,
        color: "#017B41",
      },
      {
        label: "Average Package",
        value: 10.62,
        color: "#5028c6",
      },
      {
        label: "Median Package",
        value: 9,
        color: "#F03C3F",
      },
    ],
  },
  {
    label: "2019 - 2023",
    data: [
      {
        label: "Highest Package",
        value: 83,
        color: "#017B41",
      },
      {
        label: "Average Package",
        value: 16.7,
        color: "#5028c6",
      },
      {
        label: "Median Package",
        value: 13.5,
        color: "#F03C3F",
      },
    ],
  },
  {
    label: "2018 - 2022",
    data: [
      {
        label: "Highest Package",
        value: 31,
        color: "#017B41",
      },
      {
        label: "Average Package",
        value: 7.2,
        color: "#5028c6",
      },
      {
        label: "Median Package",
        value: 6.3,
        color: "#F03C3F",
      },
    ],
  },
  // {
  //   label: "2017 - 2021",
  //   data: [
  //     {
  //       label: "Highest Package",
  //       value: 22,
  //       color: "#017B41",
  //     },
  //     {
  //       label: "Average Package",
  //       value: 7,
  //       color: "#5028c6",
  //     },
  //     {
  //       label: "Median Package",
  //       value: 6,
  //       color: "#F03C3F",
  //     },
  //   ],
  // },
];

interface BarChartData {
  year: string;
  branch: string;
  eligible: number;
  offers: number;
}

export const barChartData: BarChartData[][] = [
  [
    { year: "2020 - 2024 ", branch: "CSE", eligible: 63, offers: 42 },
    { year: "2020 - 2024 ", branch: "ECE", eligible: 58, offers: 34 },
  ],
  [
    { year: "2019 - 2023 ", branch: "CSE", eligible: 61, offers: 51 },
    { year: "2019 - 2023 ", branch: "ECE", eligible: 46, offers: 36 },
  ],
  [
    { year: "2018 - 2022 ", branch: "CSE", eligible: 45, offers: 40 },
    { year: "2018 - 2022 ", branch: "ECE", eligible: 38, offers: 33 },
  ],
];
