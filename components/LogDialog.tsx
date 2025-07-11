'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import SleepForm from '@/components/forms/SleepForm'
import { useState } from 'react'
import MoodForm from '@/components/forms/MoodForm'
import { Button } from '@/components/ui/button'
import TagsForm from '@/components/forms/TagsForm'
import CommentForm from '@/components/forms/CommentForm'

type Step = 1 | 2 | 3 | 4

export default function LogDialog() {
  const [step, setStep] = useState<Step>(1)

  function handleClose() {
    setStep(1)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{"Log today's mood"}</Button>
      </DialogTrigger>
      <DialogContent
        onAnimationEnd={handleClose}
        className="rounded-16 bg-light-gradient px-250 py-400 tablet:w-[600px] tablet:px-500 tablet:py-600"
      >
        <DialogHeader className="flex flex-col gap-y-400">
          <DialogTitle className="txt-preset-2">Log your mood</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Log your mood</DialogDescription>
          </VisuallyHidden>
          <Progress step={step} />
          {step === 1 && (
            <MoodForm
              onComplete={() => setStep(2)}
              initValues={{ mood: 'neutral' }}
            />
          )}
          {step === 2 && (
            <TagsForm onComplete={() => setStep(3)} initValues={{ tags: [] }} />
          )}
          {step === 3 && (
            <CommentForm
              onComplete={() => setStep(4)}
              initValues={{ comment: '' }}
            />
          )}
          {step === 4 && (
            <SleepForm onComplete={() => {}} initValues={{ sleep: '7-8' }} />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

function Progress({ step }: { step: Step }) {
  return (
    <div className="flex gap-x-200">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className={`h-1.5 w-full rounded-full ${
            index < step ? 'bg-blue-600' : 'bg-blue-200'
          }`}
        />
      ))}
    </div>
  )
}
