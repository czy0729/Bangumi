/*
 * @Author: czy0729
 * @Date: 2025-05-13 14:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 12:00:00
 */
import { Suspense } from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { Flex } from '../flex'
import { Portal } from '../portal'
import Body from './body'
import { useDrawerProgress } from './hooks'
import Mask from './mask'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as DrawerProps } from './types'
export type { DrawerProps }

/** 抽屉 */
export const Drawer = observer(
  ({
    style,
    show,
    position = 'right',
    maskColor,
    swipeToClose,
    onToggle,
    children
  }: DrawerProps) => {
    r(COMPONENT)

    const progress = useDrawerProgress(show)

    const isLeft = position === 'left'

    return (
      <Portal>
        <Suspense>
          <Flex style={styles.menu} pointerEvents={show ? 'auto' : 'none'}>
            {!isLeft && <Flex.Item />}
            <Mask progress={progress} color={maskColor} onToggle={onToggle} />
            <Body
              style={style}
              show={show}
              swipeToClose={swipeToClose}
              progress={progress}
              position={position}
              onToggle={onToggle}
            >
              {children}
            </Body>
            {isLeft && <Flex.Item />}
          </Flex>
        </Suspense>
      </Portal>
    )
  }
)

export default Drawer
