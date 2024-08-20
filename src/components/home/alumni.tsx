import { alumniData } from "@/data"
import AlumniCard from "../alumni-card"
import CommonLayout from "../common-layout"

const Alumni = () => {
  return (
    <CommonLayout title="Our Alumni">

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {alumniData.map((alumni, index) => (
          <AlumniCard
            key={index}
            image={alumni.image}
            name={alumni.name}
            lpa={alumni.lpa}
            company={alumni.company}
          />
        ))}
      </div>
    </CommonLayout>
  )
}
export default Alumni