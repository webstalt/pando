import { MainLayout } from '../components/mainLayout/MainLayout'
import { HelloScreen } from '../components/helloScreen/HelloScreen'
import { MintingScreen } from '../components/mintingScreen/MintingScreen'
import { FeaturesScreen } from '../components/featuresScreen/FeaturesScreen'

export default function Index() {
  return (
    <MainLayout title="Main page">
      <HelloScreen />
      <FeaturesScreen />
      {/* <MintingScreen /> */}
    </MainLayout>
  )
}

// export async function getServerSideProps(context) {
//   const response = await fetch(`${process.env.API_URL}/data`)
//   const data = await response.json()

//   return { props: { data } }
// }
