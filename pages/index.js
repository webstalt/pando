import { MainLayout } from '../components/mainLayout/MainLayout'
import { HelloScreen } from '../components/helloScreen/HelloScreen'

export default function Index() {
  return (
    <MainLayout title="Main page">
      <HelloScreen />
      <HelloScreen />
      <HelloScreen />
    </MainLayout>
  )
}
