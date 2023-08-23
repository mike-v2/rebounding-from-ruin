'use client'

import { Chrono } from 'react-chrono'
import data from "./data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="App">
        <div style={{ width: "100%", height: "95vh" }}>
          <Chrono
            items={data}
            mode="VERTICAL_ALTERNATING"
            cardHeight={250}
            slideShow
          />
        </div>
      </div>
    </main>
  )
}
