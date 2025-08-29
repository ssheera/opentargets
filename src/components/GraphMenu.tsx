"use client"

import { AssociatedDisease, Disease } from "@/lib/queries"
import { useState, useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Label, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface GraphMenuProps {
  disease: Disease
  gene: AssociatedDisease
}

export default function GraphMenu({ disease, gene }: GraphMenuProps) {
  
  const tabs = [
    { label: "Bar chart", value: "bar" },
    { label: "Radar chart", value: "radar" }
  ]

  const [activeTab, setActiveTab] = useState(tabs[0].value)
  
  const chartData = useMemo(
    () =>
      gene.datatypeScores.map((item) => ({
        x: item.id
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        y: item.score,
      })),
    [gene]
  )

  return (
    <div className="flex flex-col h-full w-full">

      <nav className="border-b border-b-gray-500">
        <ul className="flex">
          {tabs.map((tab) => (
            <li
              key={tab.value}
              className={`text-xs lg:text-base cursor-pointer px-3 py-0.5 tracking-wide ${
                activeTab === tab.value
                  ? "bg-[#3489CA] text-white border-t border-x border-neutral-300 font-bold"
                  : "text-neutral-900"
              }`}
              onClick={() => setActiveTab(tab.value)}
              role="tab"
              aria-selected={activeTab === tab.value}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col p-4 w-full items-center">
        <div className="text-sm lg:text-lg mb-2 text-neutral-500">
          Data Type Score: {gene.target.approvedSymbol} and {disease.name}
        </div>
        <div className="w-full lg:w-10/12 h-full">
          { activeTab === "bar" && (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={chartData}
                className="[&>*]:outline-offset-8 [&>*]:outline-[#3489CA]"
              >
                <CartesianGrid />
                <XAxis 
                  dataKey="x"
                  padding="gap"
                  tick={{
                    className: "text-xs",
                  }}
                >
                  <Label value="Data Type" offset={-2} position="insideBottom" className="text-sm" />
                </XAxis>
                <YAxis domain={[0, 1]} tickCount={5} />
                <Tooltip formatter={(value: number) => value.toFixed(3)} labelFormatter={(label) => `Data Type: ${label}`} />
                <Bar dataKey="y" fill="#3489CA" name="Score" />
              </BarChart>
            </ResponsiveContainer>
          )}
          { activeTab === "radar" && (
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart
                data={chartData}
                className="[&>*]:outline-offset-8 [&>*]:outline-[#3489CA]"
              >
                <PolarGrid gridType="circle" />
                <PolarAngleAxis 
                  dataKey="x" 
                  tick={{ className: "text-xs" }} 
                />
                <PolarRadiusAxis angle={90} domain={[0, 1]} />
                <Tooltip formatter={(value: number) => value.toFixed(3)} labelFormatter={(label) => `Data Type: ${label}`} />
                <Radar 
                  name="Score" 
                  dataKey="y" 
                  stroke="#3489CA" 
                  fill="#00000000" 
                  dot={{ r: 4, fill: "#3489CA", stroke: "#fff", strokeWidth: 1.5 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    
    </div>
  )

}