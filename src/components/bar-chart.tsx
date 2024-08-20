
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import {barChartData as chartData} from "@/data"

const chartConfig = {
    eligible: {
        label: "Eligible Students",
        color: "#2563eb",
    },
    offers: {
        label: "Number of Offers",
        color: "#60a5fa",
    },
} satisfies ChartConfig

export function BarChartComp() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] sm:w-auto w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="branch"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="eligible" fill="#0928a0" radius={4} />
                <Bar dataKey="offers" fill="#F03C3F" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
