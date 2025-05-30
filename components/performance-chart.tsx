"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const data = [
  {
    date: "Jan 1",
    value: 45000,
  },
  {
    date: "Jan 15",
    value: 47500,
  },
  {
    date: "Feb 1",
    value: 44000,
  },
  {
    date: "Feb 15",
    value: 46000,
  },
  {
    date: "Mar 1",
    value: 48500,
  },
  {
    date: "Mar 15",
    value: 51000,
  },
  {
    date: "Apr 1",
    value: 49500,
  },
  {
    date: "Apr 15",
    value: 52000,
  },
  {
    date: "May 1",
    value: 54500,
  },
  {
    date: "May 15",
    value: 56000,
  },
  {
    date: "Jun 1",
    value: 58000,
  },
  {
    date: "Jun 15",
    value: 61000,
  },
]

export function PerformanceChart() {
  return (
    <Tabs defaultValue="1m" className="w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="1w">1W</TabsTrigger>
          <TabsTrigger value="1m">1M</TabsTrigger>
          <TabsTrigger value="3m">3M</TabsTrigger>
          <TabsTrigger value="1y">1Y</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="1w" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.slice(-4)}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className="py-2 px-3">
                        <div className="text-sm font-medium">{payload[0].payload.date}</div>
                        <div className="text-sm font-bold">${payload[0].value?.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="1m" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.slice(-8)}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className="py-2 px-3">
                        <div className="text-sm font-medium">{payload[0].payload.date}</div>
                        <div className="text-sm font-bold">${payload[0].value?.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="3m" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className="py-2 px-3">
                        <div className="text-sm font-medium">{payload[0].payload.date}</div>
                        <div className="text-sm font-bold">${payload[0].value?.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="1y" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className="py-2 px-3">
                        <div className="text-sm font-medium">{payload[0].payload.date}</div>
                        <div className="text-sm font-bold">${payload[0].value?.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="all" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className="py-2 px-3">
                        <div className="text-sm font-medium">{payload[0].payload.date}</div>
                        <div className="text-sm font-bold">${payload[0].value?.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  )
}

