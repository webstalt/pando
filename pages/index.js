import { useRef, useCallback } from 'react'
import { MainLayout } from '../components/mainLayout/MainLayout'
import { HelloScreen } from '../components/helloScreen/HelloScreen'
import { MintingScreen } from '../components/mintingScreen/MintingScreen'
import { FeaturesScreen } from '../components/featuresScreen/FeaturesScreen'

export default function Index() {
  const secondScreenRef = useRef(null)

  const executeScroll = useCallback(() => {
    secondScreenRef &&
      secondScreenRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [secondScreenRef])

  return (
    <MainLayout title="Main page">
      <HelloScreen executeScroll={executeScroll} />
      <MintingScreen ref={secondScreenRef} />
      <FeaturesScreen />
    </MainLayout>
  )
}

// export async function getServerSideProps(context) {
//   const response = await fetch(`${process.env.API_URL}/data`)
//   const data = await response.json()

//   return { props: { data } }
// }
