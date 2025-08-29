interface ErrorComponentProps {
  error: string
}

export default function ErrorComponent({ error }: ErrorComponentProps) {

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Sorry, an error has occured!</h2>
      <p className="text-slate-600">Reason: {error}</p>
    </div>
  )
    
}