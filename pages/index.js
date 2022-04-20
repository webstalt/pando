import { MainLayout } from '../components/mainLayout/MainLayout'
import { HelloScreen } from '../components/helloScreen/HelloScreen'
import { BacklightScreen } from '../components/backlightScreen/BacklightScreen'

export default function Index() {
  return (
    <MainLayout title="Main page">
      <HelloScreen />
      <BacklightScreen />
      <HelloScreen />
      <HelloScreen />
    </MainLayout>
  )
}

// export async function getServerSideProps(context) {
//   const response = await fetch(`${process.env.API_URL}/data`)
//   const data = await response.json()

//   return { props: { data } }
// }
