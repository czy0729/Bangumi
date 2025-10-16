/*
 * @Author: czy0729
 * @Date: 2025-10-16 19:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-16 21:37:38
 */
import React from 'react'
import { Flex, Portal, Text, Touchable } from '@components'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

import type { Props as FixedBtnProps } from './types'

export { FixedBtnProps }

export function FixedBtn({ children, onPress }: FixedBtnProps) {
  return useObserver(() => {
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
}

export default FixedBtn
