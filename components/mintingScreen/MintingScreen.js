import { useSelector, useDispatch } from 'react-redux'

import { Roles, setRole } from '../../app/user/userSlice'
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
                <Button onClick={() => dispatch(setRole(Roles.SELLER))}>
                  Continue as a project
                </Button>
              </div>
              <div className={classes.option}>
                <Button onClick={() => dispatch(setRole(Roles.INVESTOR))}>
                  Become an investor
                </Button>
              </div>
            </div>
            <div className={classes.roadmap} />
          </>
        ) : role === Roles.SELLER ? (
          <SellerView />
        ) : null}
      </div>
    </Backlight>
  )
}
