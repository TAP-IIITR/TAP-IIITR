import { alumniData } from "@/data";
import AlumniCard from "../alumni-card";
import CommonLayout from "../common-layout";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Alumni = () => {
  return (
    <CommonLayout title="Our Alumni" id="Students">
      <Carousel
        className="w-full "
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        
      >
        <CarouselPrevious className="hidden" />
        <CarouselContent className="-ml-1">
          {alumniData.map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <AlumniCard {..._} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext className="hidden " />
      </Carousel>
    </CommonLayout>
  );
};

export default Alumni;
