'use client'

import Timeline from "./components/timeline";
import data from "./data";

export default function Home() {

  return (
    <main className="">
      <div className='w-full h-screen' >
        <Timeline data={data} />
      </div>
    </main>
  )
}
