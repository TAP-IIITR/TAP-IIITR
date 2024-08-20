import { cn } from "@/lib/utils"
import { useState } from "react"
import StatsGraph from "../stats-graph"
import CommonLayout from "../common-layout"

const statsTabs = [
  {
    label: "2020 - 2024"
  },
  {
    label: "2019 - 2023"
  },
  {
    label: "2018 - 2022"
  },
  {
    label: "2017 - 2021"
  },
]
const PlacementStats = () => {

  const [activeIdx, setActiveIdx] = useState(0)

  const updateTabs = (i: number) => {
    setActiveIdx(i)
  }
  return (
    <CommonLayout title="Placement Statistics">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
        {
          statsTabs.map((year, i) => {
            return <div key={i} onClick={() => updateTabs(i)} className={cn(`bg-white rounded-md font-bold text-lg py-3 hover:bg-primary hover:text-white cursor-pointer transition-all flex items-center justify-center`, activeIdx === i && "bg-primary text-white")}>{year.label}</div>
          })
        }
      </div>
      <StatsGraph year={statsTabs[activeIdx].label} />
    </CommonLayout>
  )
}
export default PlacementStats