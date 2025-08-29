"use client"

import { useSuspenseQuery } from "@apollo/client/react"
import { AssociatedDisease, GET_DISEASE } from "@/lib/queries"
import { useMemo, useState } from "react"
import Link from "next/link"
import { BiMinus, BiPlus } from "react-icons/bi"
import React from "react"
import ErrorComponent from "@/components/ErrorComponent"
import GraphMenu from "@/components/GraphMenu"

interface DiseaseTableProps {
  efoId: string
}

export default function DiseaseTable({ efoId }: DiseaseTableProps) {
  
  const { data, error } = useSuspenseQuery(GET_DISEASE, {
    variables: { efoId },
    errorPolicy: "all"
  })

  const sortedGenes = useMemo(() => {
    if (!data || !data.disease || !data.disease.associatedTargets || !data.disease.associatedTargets.rows) return []
    return data.disease.associatedTargets.rows.slice().sort((a, b) => b.score - a.score)
  }, [data])

  const [ selectedGene, setSelectedGene ] = useState<AssociatedDisease | null>(null)

  if (error) return <ErrorComponent error={error.message} />
  if (!data || !data.disease || !data.disease.associatedTargets || !data.disease.associatedTargets.rows) return <ErrorComponent error="No data returned from server" />

  function toggleGene(targetGene: AssociatedDisease) {
    if (selectedGene && targetGene.target.id === selectedGene.target.id)
      setSelectedGene(null)
    else setSelectedGene(targetGene)
  }

  const headers = [
    "Approved Symbol",
    "Gene Name",
    "Overall Association Score"
  ]

  return (
    <div className="overflow-x-auto">
      <h1 className="text-lg md:text-3xl text-slate-700 font-bold leading-relaxed mb-4 w-fit">
        Genes associated with {data?.disease.name}
      </h1>
      <table className="bg-white border border-neutral-400 border-collapse w-full">
        <thead>
          <tr>
            <th/>
            {headers.map((header, idx) => (
              <th key={"header-" + idx} className="text-xs md:text-base border border-neutral-400 px-2 py-0.5 md:px-4 md:py-2 font-bold text-neutral-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedGenes.map((gene: AssociatedDisease) => {

            const selected = selectedGene && selectedGene.target.id === gene.target.id

            const rows = [
                (
                  <Link
                    key={"link-" + gene.target.id}
                    href={`https://platform.opentargets.org/target/${gene.target.id}`}
                    className="text-blue-600 hover:text-blue-800 focus:outline-2 focus:outline-offset-4 focus:outline-[#2973a7] outline-blue-600 transition-colors"
                  >
                    {gene.target.approvedSymbol}
                  </Link>
                ),
                gene.target.approvedName,
                gene.score.toFixed(3)
            ]

            return (
              <React.Fragment key={gene.target.id}>
                <tr>
                  <td 
                    onClick={() => { toggleGene(gene) }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter')
                        toggleGene(gene)
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={selected ? "Collapse Graphs" : "Expand Graphs"}
                    className="border border-neutral-400 bg-[#3489CA] hover:bg-[#3b97db] active:bg-[#2973a7] focus:bg-[#2973a7] hover:cursor-pointer transition-all px-2 py-0.5 md:px-4 md:py-2 focus:outline-0"
                  >
                    { !selected ? (
                      <BiPlus className="text-white mx-auto" />
                    ) : <BiMinus className="text-white mx-auto" />}
                  </td>
                  {rows.map((cell, idx) => (
                    <td key={"cell-" + idx} className="text-xs md:text-base border border-neutral-400 px-2 py-0.5 md:px-4 md:py-2 tracking-wide text-neutral-900">{cell}</td>
                  ))}
                </tr>
                { selected && (
                  <tr>
                    <td colSpan={4} className="border border-neutral-400 px-4 py-6">
                      <GraphMenu disease={data!.disease} gene={selectedGene} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

  