"use client"

import { Suspense } from "react"
import { CgSpinnerAlt } from "react-icons/cg"
import React from "react"
import DiseaseTable from "@/components/DiseaseTable"

export default function Home() {

  return (
    <main className="flex flex-col container max-w-6xl min-h-screen mx-auto">

      <section className="flex flex-col justify-center w-full flex-1">

        <Suspense fallback={
          <div className="flex w-full h-full justify-center my-auto">
            <CgSpinnerAlt className="w-10 h-10 animate-spin" />
          </div>
        }>

          <DiseaseTable efoId="EFO_0001071" />

        </Suspense>

      </section>

    </main>
  )
}
