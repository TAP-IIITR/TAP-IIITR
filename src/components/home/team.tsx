import { teamsData } from "@/data"
import CommonLayout from "../common-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"

const Team = () => {
  return (
    <CommonLayout title="Our Team">
      <div className="flex items-center gap-y-10 flex-col">
        <div className="flex flex-col gap-y-1 leading-tight items-center">
          <img className="rounded-full w-40 h-40 object-cover object-top" src={teamsData[0].image} alt="" />
          <p className="font-bold text-2xl">{teamsData[0].name}</p>
          <p className="text-sm">{teamsData[0].designation}</p>
          <p className="text-sm">{teamsData[0].department}</p>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1  gap-6 w-full place-items-center">
          {
            teamsData.slice(1).map((member, i) => {
              return (
                <div key={i} className="flex flex-col gap-y-2">
                  <img className="rounded-full w-40 h-40 object-cover object-top" src={member.image} alt="" />
                  <p className="font-bold text-xl">{member.name}</p>
                </div>
              )
            })
          }
        </div>

        <div className="flex md:flex-row flex-col items-center gap-x-10 gap-y-2 md:gap-y-0 w-[80%]">
          <Card className="md:w-1/2 w-fit">
            <CardHeader>
              <CardTitle>
                Training and Placement Cell
              </CardTitle>
            </CardHeader>
            <CardContent>
              IIIT Ranchi<br />
              Science & Technology Campus<br />
              Khojatoli, Namkum, Ranchi,<br />
              Jharkhand - 834 010
              <a href={`mailto:placementcell@iiitranchi.ac.in`}>
                <p className="mt-4 text-blueColor font-medium">placementcell@iiitranchi.ac.in</p>
              </a>
            </CardContent>
            <CardFooter className="flex items-start flex-col">
              <p>156498949861</p>
              <p>156498949861</p>
            </CardFooter>
          </Card>
          <Card className="w-fit md:w-1/2">
            <CardHeader>
              <CardTitle>
                Dr.Santosh Kumar Mahato
              </CardTitle>
            </CardHeader>

            <CardContent>
              Associate Dean, Training and Placement Notation <br />
              Associate Dean, Research & Development <br />
              IIIT Ranchi

              <div className="mt-4 text-blueColor flex flex-col font-medium">
                <a href="mailto:tpo@iiitranchi.ac.in">tpo@iiitranchi.ac.in</a>
                <a href="mailto:skumar@iiitranchi.ac.in">skumar@iiitranchi.ac.in</a>
                <a href="mailto:assodean.tnp@iiitranchi.ac.in">assodean.tnp@iiitranchi.ac.in</a>
              </div>
            </CardContent>
            <CardFooter className="flex items-start flex-col">
              156498949861
            </CardFooter>
          </Card>
        </div>
      </div>
    </CommonLayout>
  )
}
export default Team