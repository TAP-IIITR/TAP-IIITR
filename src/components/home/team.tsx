import { studentTeamData, profTeamData as teamsData } from "@/data";
import { TPOData } from "@/data";
import CommonLayout from "../common-layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Team = () => {
  return (
    <CommonLayout title="Our Team" id="Team">
      <div className="flex items-center gap-y-10 flex-col">
        <h2 className="text-2xl text-center text-blue-800 font-bold mb-4">
          Training and Placement Officer
        </h2>
        <div className="flex flex-col md:flex-row gap-20">
          {TPOData.map((team, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-y-1 leading-tight items-center"
              >
                <img
                  className="rounded-full w-40 h-40 object-cover object-top"
                  src={team.image}
                  alt=""
                />
                <p className="font-bold text-2xl">{team.name}</p>
                <p className="text-sm">{team.designation}</p>
                <p className="text-sm">{team.department}</p>
              </div>
            );
          })}
        </div>
        <h2 className="text-2xl text-center text-blue-800 font-bold mb-4">
          Faculty Committee
        </h2>
        <div className="flex flex-col md:flex-row gap-20">
          {teamsData.map((team, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-y-1 leading-tight items-center"
              >
                <img
                  className="rounded-full w-40 h-40 object-cover object-top"
                  src={team.image}
                  alt=""
                />
                <p className="font-bold text-2xl">{team.name}</p>
                <p className="text-sm">{team.designation}</p>
                <p className="text-sm">{team.department}</p>
              </div>
            );
          })}
        </div>
        <h2 className="text-2xl text-center text-blue-800 font-bold mb-4">
          Student Coordinators
        </h2>
        <Carousel
          className="w-3/4 mx-auto "
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselPrevious />
          <CarouselContent className="-ml-1">
            {studentTeamData.map((member, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div
                  key={index}
                  className="flex flex-col gap-y-2  items-center"
                >
                  <img
                    className="aspect-auto rounded-full w-40 h-40 object-cover"
                    src={member.image}
                    alt=""
                  />
                  <p className="font-bold text-xl">{member.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext />
        </Carousel>

        <div
          className="flex md:flex-row flex-col items-center gap-x-10 gap-y-2 md:gap-y-0 w-[80%]"
          id="Contact"
        >
          <Card className="md:w-1/2 w-[15rem] flex flex-col flex-wrap lg:min-h-[18rem] min-h-[20rem]">
            <CardHeader>
              <CardTitle>Training and Placement Cell</CardTitle>
            </CardHeader>
            <CardContent>
              IIIT Ranchi
              <br />
              Advanced Regional Telecom Training Centre (ARTTC), BSNL
              <br />
              Near Jumar River Bridge, Hazaribag Road, Ranchi
              <br />
              Jharkhand 835217, India
              <a href={`mailto:tpo@iiitranchi.ac.in`}>
                <p className="mt-4 text-blueColor font-medium">
                  tpo@iiitranchi.ac.in
                </p>
              </a>
            </CardContent>
          </Card>

          <Card className="w-[15rem] md:w-1/2 flex flex-col flex-wrap lg:min-h-[18rem] min-h-[20rem]">
            <CardHeader>
              <CardTitle>Dr. Noopur</CardTitle>
            </CardHeader>

            <CardContent>
              Faculty Coordinator <br />
              Training & Placement Cell
              <br />
              IIIT Ranchi
              <div className="mt-4 text-blueColor flex flex-col font-medium">
                <a href="mailto:noopur@iiitranchi.ac.in">
                  noopur@iiitranchi.ac.in
                </a>
              </div>
            </CardContent>
            <CardFooter className="flex items-start flex-col">
              +91 8171760675
            </CardFooter>
          </Card>
        </div>
      </div>
    </CommonLayout>
  );
};
export default Team;
