import { OverviewData } from "@/data";
import CommonLayout from "../common-layout";
import OverviewCard from "../overview-card";
type OverviewCardProps = {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  designation?: { name: string; designation: string; loc: string };
  buttonText: string;
  socialLinks?: { icon: string; url: string }[];
};

const Overview = () => {
  return (
    <CommonLayout title="OVERVIEW OF OUR INSTITUTE" id="About">
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
