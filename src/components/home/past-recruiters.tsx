import { group1, group2, group3, group4 } from "@/pastRecruitersImp";
import CommonLayout from "../common-layout";

const ImageCard = (company: string, index: number) => (
  <img
    key={index}
    src={company}
    alt="company logo"
    className="w-32 h-24 object-contain"
  />
);

const PastRecruiters = () => {
  return (
    <CommonLayout title="Past Companies">
      <div className="relative flex flex-col md:flex-row  h-[100%] md:h-[300px] overflow-hidden w-[80%] m-auto">
        <div className="flex md:flex-col md:gap-4 gap-5 animate-scroll-right md:animate-scroll-up w-[25%]">
          {group1.map((company, index) => ImageCard(company, index))}
        </div>
        <div className="flex md:flex-col md:gap-4 gap-5 animate-scroll-left md:animate-scroll-down w-[25%]">
          {group2.map((company, index) => ImageCard(company, index))}
        </div>
        <div className="flex md:flex-col md:gap-4 gap-5 animate-scroll-right md:animate-scroll-up w-[25%]">
          {group3.map((company, index) => ImageCard(company, index))}
        </div>
        <div className="flex md:flex-col md:gap-4 gap-5 animate-scroll-left md:animate-scroll-down w-[25%]">
          {group4.map((company, index) => ImageCard(company, index))}
        </div>
      </div>
    </CommonLayout>
  );
};

export default PastRecruiters;
