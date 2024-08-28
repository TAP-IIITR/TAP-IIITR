import { group1, group2} from "@/pastRecruitersImp";
import CommonLayout from "../common-layout";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCardProps {
  company: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ company }) => {
  return (
    <img
      src={company}
      alt="company logo"
      className="w-32 h-24 object-contain"
    />
  );
};

const PastRecruiters = () => {
  return (
    <CommonLayout title="Past Companies" id="Recruiters">
      <Carousel
        className="w-full mb-10 "
        opts={{align:"start", loop: true }}
        plugins={[

          Autoplay({
            delay: 950,
          }),
        ]}
        scrollDirection="rtl" 
      >
        <CarouselPrevious className="hidden" />
        <CarouselContent className="-ml-1 transition-transform duration-1000 linear repeat-infinite">
          {group1.map((e, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5">
              <ImageCard company={e} />
            {/* <div className="p-1">
            </div> */}
          </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext className="hidden " />
      </Carousel>
      <Carousel
        className="w-full"
        opts={{align:"start", loop: true }}
        plugins={[
          Autoplay({
            delay: 950,
          }),
        ]}
        scrollDirection="ltr" 
        
      >
        <CarouselContent className="-ml-1 transition-transform duration-1000 linear repeat-infinite">
          {group2.map((e, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5">
              <ImageCard company={e} />
            {/* <div className="p-1">
            </div> */}
          </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </CommonLayout>
  );
};

export default PastRecruiters;
