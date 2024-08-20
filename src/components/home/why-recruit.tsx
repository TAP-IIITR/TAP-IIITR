
import WhyRecuritCard from "@/components/why-recurit-card";
import { whyRecuitData } from "@/data";
import CommonLayout from "../common-layout";

type WhyRecuritCardProps = {
  image: string;
  title: string;
  description: string;
}

const WhyRecruit = () => {
  return (
    <CommonLayout title="Why Recruit from IIIT Ranchi ?">
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
    </CommonLayout>
  );
};
export default WhyRecruit;
