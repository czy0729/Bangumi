/*
 * @Author: czy0729
 * @Date: 2025-10-16 19:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 16:48:42
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Portal, Text, Touchable } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as FixedBtnProps } from './types'
export type { FixedBtnProps }

export const FixedBtn = observer(({ onPress, children }: FixedBtnProps) => {
  r(COMPONENT)

  const styles = memoStyles()

  return (
    <Portal>
      <Flex style={styles.fixed} justify='center'>
        <Touchable style={styles.btn} onPress={onPress}>
          <Text type='main' size={11} bold>
            {children}
          </Text>
        </Touchable>
      </Flex>
    </Portal>
  )
})

export default FixedBtn
