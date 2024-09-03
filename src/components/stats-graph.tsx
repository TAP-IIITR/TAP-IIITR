import { cn } from "@/lib/utils";
import { BarChartComp } from "./bar-chart";
import { Card } from "./ui/card";
import { barChartData } from "@/data";

interface StatsGraphProps {
  yearData: {
    label: string;
    value: number;
    color: string;
  }[];
  activeIdx: number;
}
interface BarChartData {
  branch: string;
  eligible: number;
  offers: number;
}
const chartData: BarChartData[][] = barChartData;
const StatsGraph = ({ yearData ,activeIdx}: StatsGraphProps) => {
  return (
    <Card className="flex md:flex-row flex-col items-center justify-evenly mt-6 md:py-8 py-6 md:px-10 px-4 gap-x-10">
      <div className="lg:w-1/2 w-full flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          {yearData.map((item, i) => {
            return (
              <div
                key={i}
                style={{ background: item.color }}
                className={cn(`text-white rounded-md px-4 py-2`)}
              >
                {item.label} - {item.value}
              </div>
            );
          })}
        </div>
        {/* <PieChartComp /> */}
      </div>
      <div className="lg:w-1/2 w-full border rounded-md p-6">
        <BarChartComp  chartData={chartData[activeIdx]}/>
      </div>
    </Card>
  );
};
export default StatsGraph;
