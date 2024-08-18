
import WhyRecuritCard from "@/components/why-recurit-card";
import { whyRecuitData } from "@/data";

type WhyRecuritCardProps = {
  image: string;
  title: string;
  description: string;
}

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
