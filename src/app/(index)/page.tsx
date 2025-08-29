"use client"

import { Suspense } from "react"
import { CgSpinnerAlt } from "react-icons/cg"
import React from "react"
import DiseaseTable from "@/components/DiseaseTable"
import Link from "next/link"

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 flex flex-col items-center justify-center bg-neutral-50">
        <div className="container max-w-6xl w-full px-4 py-8">
          <Suspense
            fallback={
              <div className="flex w-full h-64 justify-center items-center">
                <CgSpinnerAlt className="w-10 h-10 animate-spin text-neutral-400" />
              </div>
            }
          >
            <DiseaseTable efoId="EFO_0001071" />
          </Suspense>
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center py-4 text-sm text-neutral-500">
            made by{" "}
            <Link
              href="https://ssheera.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-700"
            >
              ssheera.dev
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
