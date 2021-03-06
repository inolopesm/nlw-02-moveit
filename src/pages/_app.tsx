import { ChallengesContextProvider } from '../contexts/ChallengesContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesContextProvider>
    <Component {...pageProps} />
    </ChallengesContextProvider>
  )
}

export default MyApp