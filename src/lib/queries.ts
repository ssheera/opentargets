import { gql, TypedDocumentNode } from "@apollo/client"

export type ScoredComponent = {
  score: number
  id: string
}

export type Target = {
  id: string
  approvedSymbol: string
  approvedName: string
}

export type AssociatedDisease = {
  score: number
  target: Target
  datatypeScores: ScoredComponent[]
}

export type AssociatedDiseases = {
  rows: AssociatedDisease[]
}

export type Disease = {
  name: string
  associatedTargets: AssociatedDiseases
}

export type DiseaseQuery = {
  disease: Disease
}

export type DiseaseQueryVariables = {
  efoId: string
}

export const GET_DISEASE: TypedDocumentNode<DiseaseQuery, DiseaseQueryVariables> = gql`
query GetDiseaseAssociatedTargets($efoId: String!) {
  disease(efoId: $efoId) {
    name
    associatedTargets(page: { index: 0, size: 10 }) {
      rows {
        target {
          id
          approvedSymbol
          approvedName
        }
        score
        datatypeScores {
          id
          score
        }
      }
    }
  }
}
` 