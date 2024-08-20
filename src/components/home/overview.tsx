import OverviewCard from "../overview-card";
import iiitRImg from "../../assets/background-img.jpg";
import dirImg from "../../assets/director-sir.jpg";
import nopImg from "../../assets/noopur-mam.png";
import fb from '../../assets/fb.svg';
import tw from '../../assets/twitter.svg';
import ln from '../../assets/linkedin.svg';
import insta from '../../assets/insta.svg';
import yt from '../../assets/youtube.svg';
import CommonLayout from "../common-layout";
interface OverviewCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  designation?: { name: string; designation: string; loc: string };
  buttonText: string;
  socialLinks?: { icon: string; url: string }[];
}

const OverviewData: OverviewCardProps[] = [
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
      "Indian Institute of Information Technology (IT) Ranchi, established ni Year 2016 as an Institute of National Importance by an act of Parliament, in a Public Private Partnership (PPP) mode with an aim to be a self-sustainable institute within five years and achieved excellence in teaching and research in information technology. In this endeavor, Government of India, Government of Jharkhand, and private partners - Central Coalfield Limited, Tata Consultancy Services and Tata Technologies Limited -are working ni unison to establish an Institute that bridges the gap between academics and industry, creating a pool of skilled Electronic Communication Engineers, Computer Scientists &Engineers that are readily employable in Industry. The curriculum and labs at IT Ranchi commensurate with industry standards, established so that students get exposure at the earliest to the environment and work culture of industry. nI coming years, the institute wil contribute profusely ni research and scientific discovery by adding various research programs. tI is my earnest appeal to al stakeholders to contribute ni the progress of the Institute and to al major players of TI industries to provide opportunities to students of IT Ranchi ni terms of campus placement.",
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
      "Dear Recruiter, It gives me great pleasure to invite you to visit the Indian Institute of Information Technology Ranchi campus for the 2023-24 placement session. As an Institute of National Importance, IIIT Ranchi always focuses on its solid visionary objectives. Our Institution inculcates the very idea of preparing students to face various technical and non-technical issues. As a result of constant endeavour by the Training and Placement Cell members under the guidance of the honourable Director, Institute has succeeded in obtaining an overwhelming response from various recruiters. Activities of Training and Placement Cell centre on making strong relationships with Industries and to exploit the relationship for personality and skill development of the graduating students through various interactive programmes.Training and Placement Cell looks forward to more robust collaboration with Industries so that deserving students can get the best platform to nurture their talents and improve their credibility for better placement prospects.",
    designation: {
      name: "Dr. Noopur Pandey",
      designation: "Faculty Coordinator Training & Placement Cell",
      loc: "IIIT Ranchi",
    },
    buttonText: "tpo@iiitranchi.ac.in",
  },
];

const Overview = () => {
  return (
    <CommonLayout title="OVERVIEW OF OUR INSTITUTE">
      {OverviewData.map((e: OverviewCardProps, index: number) => (
        <OverviewCard
          key={index}
          image={e.image}
          title={e.title}
          subtitle={e.subtitle}
          description={e.description}
          designation={e.designation}
          buttonText={e.buttonText}
          socialLinks={e.socialLinks}
        />
      ))}
    </CommonLayout>
  );
};
export default Overview;
