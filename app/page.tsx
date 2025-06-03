import Header from '@/components/Header'
import Spacer from '@/components/Spacer'
import MoodLogPrompt from '@/components/MoodLogPrompt'

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col items-center px-200 pt-400 pb-1000">
      <Header />
      <Spacer className="h-600" />
      <MoodLogPrompt />
    </div>
  )
}
