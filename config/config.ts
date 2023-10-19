interface Config {
  NEXT_PUBLIC_ENV?: string
}

let Config: Config = {}
if (process.env.NODE_ENV === 'production') {
  Config = {
    NEXT_PUBLIC_ENV: '$NEXT_PUBLIC_ENV' //$NEXT_PUBLIC_ENV env บน docker จะติด $ มาด้วย
  }
} else {
  Config = {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV
  }
}
export default Config
