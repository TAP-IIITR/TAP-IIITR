import { cn } from "@/lib/utils";
import { BarChartComp } from "./bar-chart";
import { PieChartComp } from "./pie-chart";
import { Card } from "./ui/card";

interface StatsGraphProps {
    year: string;
}
const StatsGraph = ({ year }: StatsGraphProps) => {

    console.log(year)
    const packageList = [
        {
            label: "Highest Package",
            value: 28,
            color: "#017B41"
        },
        {
            label: "Average Package",
            value: 12,
            color: "#5028c6"
        },
        {
            label: "Median Package",
            value: 13,
            color: "#F03C3F"
        },
    ]
    return (
        <Card className="flex items-center justify-between mt-6 py-8 px-10 gap-x-10">
            <div className="w-1/2 flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    {
                        packageList.map((item, i) => {
                            return <div key={i} style={{ background: item.color }} className={cn(`text-white rounded-md px-4 py-2`)}>
                                {item.label} - {item.value}
                            </div>
                        })
                    }
                </div>
                <PieChartComp />
            </div>
            <div className="w-1/2 border rounded-md p-6">
                <BarChartComp />
            </div>
        </Card>
    )
}
export default StatsGraph