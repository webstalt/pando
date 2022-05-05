import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'

import { Roles, setRole } from '../../app/user/userSlice'
import sellersRoadmap from '../../public/sellers-roadmap.png'
import investorsRoadmap from '../../public/investors-roadmap.png'
import { Button } from '../button/Button'
import { Backlight } from '../backlight/Backlight'
import { SellerView } from './sellerView/SellerView'


import classes from './mintingScreen.module.scss'

export function MintingScreen({ data }) {
  const role = useSelector((state) => state.user.role)

  const dispatch = useDispatch()

  return (
    <Backlight>
      <div className={classes.content}>
        {!role ? (
          <>
            <div className={classes.heading}>
              Select your role to start using the app
            </div>
            <div className={classes.optionsWrapper}>
              <div className={classes.option}>
                <Image
                  src={sellersRoadmap}
                  alt="sellers-roadmap"
                  height="500"
                  width="250"
                />
                <Button onClick={() => dispatch(setRole(Roles.SELLER))}>
                  Continue as a project
                </Button>
              </div>
              <div className={classes.option}>
                <Image
                  src={investorsRoadmap}
                  alt="investors-roadmap"
                  height="320"
                  width="250"
                />
                <Button onClick={() => dispatch(setRole(Roles.INVESTOR))}>
                  Become an investor
                </Button>
              </div>
            </div>
          </>
        ) : role === Roles.SELLER ? (
          <SellerView />
        ) : null}
      </div>
      {/* <div className={classes.table}>
        <div className={classes.row}>
          <div className={classes.cell}>table head</div>
          <div className={classes.cell}>table head2</div>
          <div className={classes.cell}>table head3</div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>table cell</div>
          <div className={classes.cell}>table cell2</div>
          <div className={classes.cell}>table cell3</div>
        </div>
      </div> */}
    </Backlight>
  )
}
