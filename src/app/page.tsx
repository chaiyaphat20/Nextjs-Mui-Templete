import Config from '../../config/config'

export default function Home() {
  console.log(JSON.stringify(Config.NEXT_PUBLIC_ENV))
  return <main>NEXT_PUBLIC_ENV= {Config.NEXT_PUBLIC_ENV}</main>
}
