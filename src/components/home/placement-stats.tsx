import { cn } from "@/lib/utils"
import { useState } from "react"
import StatsGraph from "../stats-graph"
import CommonLayout from "../common-layout"
import { placementStats as statsTabs } from "@/data"
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
      <StatsGraph yearData={statsTabs[activeIdx].data}/>
    </CommonLayout>
  )
}
export default PlacementStats