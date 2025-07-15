'use client'

import IconSleep from '@/assets/images/icon-sleep.svg'
import { DataPoint, sleepValues } from '@/types'
import { useEffect, useRef } from 'react'
import DisplayBox from '@/components/DisplayBox'
import TrendsGraph from '@/components/TrendsGraph'

export default function TrendsDisplay({ data }: { data: DataPoint[] }) {
  const graphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (graphRef.current) {
      const scrollWidth = graphRef.current.scrollWidth
      graphRef.current.scrollLeft = scrollWidth - graphRef.current.clientWidth
    }
  }, [])

  return (
    <DisplayBox>
      <span className="txt-preset-3">Mood and sleep trends</span>
      <div className="flex gap-x-200">
        <div className="z-10 flex flex-col gap-y-[39px] bg-neutral-0">
          {sleepValues
            .slice()
            .reverse()
            .map((value) => (
              <div key={value} className="flex items-center gap-x-075">
                <IconSleep className="h-2.5 w-2.5 fill-neutral-600" />
                <span className="txt-preset-9 text-neutral-600">{`${value} hours`}</span>
              </div>
            ))}
        </div>
        <div className="flex-1 overflow-x-auto" ref={graphRef}>
          <div className="relative min-w-max pt-1.5 pb-0.5">
            <div className="absolute top-0 left-0 flex w-full flex-col gap-y-[51px] pt-1.5">
              {sleepValues.map((value) => (
                <div key={value} className="h-px w-full bg-blue-100/30" />
              ))}
            </div>
            <TrendsGraph data={data} />
          </div>
        </div>
      </div>
    </DisplayBox>
  )
}
