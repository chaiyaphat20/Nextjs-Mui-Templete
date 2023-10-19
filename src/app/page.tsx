'use client'
import Config from '../../config/config'

export default function Home() {
  console.log(JSON.stringify(Config.NEXT_PUBLIC_ENV));
  console.log(JSON.stringify("CC"))
  return (
    <div>
      NEXT_PUBLIC_ENV = {Config.NEXT_PUBLIC_ENV}
    </div>
  )
}
