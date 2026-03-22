/*
 * @Author: czy0729
 * @Date: 2024-01-07 20:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:41:50
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { stl } from '@utils'
import { useInsets } from '@utils/hooks'
import { IOS } from '@constants'
import { IS_IOS_5_6_7_8 } from '@styles'
import Back from './back'
import MenuComp from './menu'
import MesumeChat from './mesume-chat'
import { styles } from './styles'

function Menu() {
  const { statusBarHeight } = useInsets()

  const memoHeaderStyle = useMemo(
    () =>
      ({
        right: {
          position: 'absolute',
          top: IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12,
          right: 8
        }
      } as const),
    [statusBarHeight]
  )

  return (
    <>
      <Back />
      <Flex style={stl(memoHeaderStyle.right, styles.right)}>
        <MesumeChat />
        <MenuComp />
      </Flex>
    </>
  )
}

export default observer(Menu)
