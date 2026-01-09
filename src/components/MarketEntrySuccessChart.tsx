"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { sector: "FinTech", success: 85 },
  { sector: "E-Commerce", success: 78 },
  { sector: "HealthTech", success: 92 },
  { sector: "EdTech", success: 75 },
  { sector: "Logistics/AI", success: 88 },
]

export function MarketEntrySuccessChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>MEA Market Entry Success</CardTitle>
        <CardDescription>Tech Companies by Sector</CardDescription>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="sector" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip
              wrapperStyle={{ fontSize: "0.875rem" }}
              cursor={{ fill: "var(--muted)" }}
              contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            />
            <Bar
              dataKey="success"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground">
        Based on real-world expansion metrics from Uzbek startups across MEA in 2024.
      </CardFooter>
    </Card>
  )
}
