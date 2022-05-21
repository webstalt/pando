import { forwardRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { Roles, setRole } from '../../app/user/userSlice'
import { Button } from '../button/Button'
import { Backlight } from '../backlight/Backlight'

import { SellerView } from './sellerView/SellerView'
import { InvestorView } from './investorView/InvestorView'
import classes from './mintingScreen.module.scss'

const MintingScreenComponent = ({ data }, ref) => {
  const role = useSelector((state) => state.user.role)
  const [highlightSide, setHighlightSide] = useState('left')

  const dispatch = useDispatch()

  return (
    <Backlight>
      <div className={classes.content} ref={ref}>
        {!role ? (
          <>
            <div className={classes.heading}>
              Select your role to start using the app
            </div>

            <div className={classes.optionsWrapper}>
              <div className={classes.option}>
                <Button
                  onClick={() => dispatch(setRole(Roles.SELLER))}
                  onMouseEnter={
                    highlightSide !== 'left'
                      ? () => setHighlightSide('left')
                      : null
                  }
                >
                  Continue as a project
                </Button>
              </div>
              <div className={classes.option}>
                <Button
                  onClick={() => dispatch(setRole(Roles.INVESTOR))}
                  onMouseEnter={
                    highlightSide !== 'right'
                      ? () => setHighlightSide('right')
                      : null
                  }
                >
                  Become an investor
                </Button>
              </div>
            </div>
            {/* <div className={classes.roadmap} /> */}
            <div className={classes.roadmapWrapper}>
              <div
                className={classnames(classes.row, classes.rowLeftPart)}
                onMouseEnter={
                  highlightSide !== 'left'
                    ? () => setHighlightSide('left')
                    : null
                }
              >
                <div
                  className={
                    highlightSide === 'left'
                      ? classnames(classes.block, classes.highlight)
                      : classes.block
                  }
                >
                  Complete NFT information form
                </div>
              </div>
              <div
                className={classnames(classes.row, classes.rowLeftPart)}
                onMouseEnter={
                  highlightSide !== 'left'
                    ? () => setHighlightSide('left')
                    : null
                }
              >
                <div
                  className={
                    highlightSide === 'left'
                      ? classnames(classes.block, classes.highlight)
                      : classes.block
                  }
                >
                  Mint NFT
                </div>
              </div>
              <div
                className={classnames(classes.row, classes.rowLeftPart)}
                onMouseEnter={
                  highlightSide !== 'left'
                    ? () => setHighlightSide('left')
                    : null
                }
              >
                <div
                  className={
                    highlightSide === 'left'
                      ? classnames(classes.block, classes.highlight)
                      : classes.block
                  }
                >
                  List NFT royalty for sale
                </div>
              </div>
              <div
                className={classnames(classes.row, classes.rowRightPart)}
                onMouseEnter={
                  highlightSide !== 'right'
                    ? () => setHighlightSide('right')
                    : null
                }
              >
                <div
                  className={
                    highlightSide === 'right'
                      ? classnames(classes.block, classes.highlight)
                      : classes.block
                  }
                >
                  Select NFT royalty stream to buy
                </div>
              </div>
              <div
                className={classnames(classes.row, classes.rowRightPart)}
                onMouseEnter={
                  highlightSide !== 'right'
                    ? () => setHighlightSide('right')
                    : null
                }
              >
                <div
                  className={
                    highlightSide === 'right'
                      ? classnames(classes.block, classes.highlight)
                      : classes.block
                  }
                >
                  Submit offer for NFT royalty stream
                </div>
              </div>
              <div
                className={classnames(classes.row, classes.rowLeftPart)}
                onMouseEnter={
                  highlightSide !== 'left'
                    ? () => setHighlightSide('left')
                    : null
                }
              >
                <div
                  className={
                    highlightSide === 'left'
                      ? classnames(classes.block, classes.highlight)
                      : classes.block
                  }
                >
                  Accept offer
                </div>
              </div>
              <div
                className={classnames(classes.row, classes.rowLeftPart)}
                onMouseEnter={
                  highlightSide !== 'left'
                    ? () => setHighlightSide('left')
                    : null
                }
              >
                <div
                  className={
                    highlightSide === 'left'
                      ? classnames(classes.block, classes.highlight)
                      : classes.block
                  }
                >
                  Receive funds
                </div>
              </div>
              <div className={classnames(classes.row, classes.rowRightPart)}>
                <div
                  className={
                    highlightSide === 'right'
                      ? classnames(classes.block, classes.highlight)
                      : classes.block
                  }
                  onMouseEnter={
                    highlightSide !== 'right'
                      ? () => setHighlightSide('right')
                      : null
                  }
                >
                  Seed funds
                </div>
              </div>
            </div>
          </>
        ) : role === Roles.SELLER ? (
          <SellerView />
        ) : (
          <InvestorView />
        )}
      </div>
    </Backlight>
  )
}

export const MintingScreen = forwardRef(MintingScreenComponent)
