import { MainLayout } from '../components/mainLayout/MainLayout'
import { HelloScreen } from '../components/helloScreen/HelloScreen'
import { BacklightScreen } from '../components/backlightScreen/BacklightScreen'

function Index(props) {
  return (
    <MainLayout title="Main page">
      <HelloScreen />
      <BacklightScreen data={props?.data} />
      <HelloScreen />
      <HelloScreen />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch('http://localhost:4200/data')
  const data = await response.json()

  return { props: { data } }
}

export default Index
