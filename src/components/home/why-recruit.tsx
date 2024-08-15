import nt from "../../assets/nt.svg";
import fc from "../../assets/fc.svg";
import st from "../../assets/st.svg";
import cesi from "../../assets/cesi.svg";
import swie from "../../assets/swie.svg";
import ard from "../../assets/ard.svg";
import WhyRecuritCard from "../why-recurit-card";
interface WhyRecuritCardProps {
  image: string;
  title: string;
  description: string;
}

const whyRecuitData: WhyRecuritCardProps[] = [
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
      "The academic curriculum of the institute is designed by academicians and industry experts keeping in mind the dynamically changing world of technology. The institute had the advantage of having a world class faculty who with their vast knowledge and huge research experience have consistently produced students with strong fundamentals and expertise in their preferred research area.",
  },
  {
    image: st,
    title: "Superlative Thinker ",
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

const WhyRecruit = () => {
  return (
    <div className="flex flex-col md:w-[74rem]  m-auto">
      <h1 className="text-[#0928A0] font-bold text-2xl md:text-4xl text-center mb-8">
      Why Recruit from IIIT Ranchi ?
      </h1>
      <div className="flex flex-wrap justify-around gap-4">
        {
          whyRecuitData.map((e: WhyRecuritCardProps, index: number) => (
           <WhyRecuritCard 
            key={index}
            image={e.image}
            title={e.title}
            description={e.description}
           />
          ))
        }
      </div>
    </div>
  );
};
export default WhyRecruit;
