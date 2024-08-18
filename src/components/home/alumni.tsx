import { alumniData } from "@/data"
import AlumniCard from "../alumni-card"

const Alumni = () => {
  return (
    <div className="flex flex-col md:w-[74rem] m-auto">
      <h1 className="text-primary font-bold text-2xl md:text-4xl text-center my-12">
        Our Alumni
      </h1>

      <div className="grid  md:grid-cols-4 gap-6">
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
    </div>
  )
}
export default Alumni