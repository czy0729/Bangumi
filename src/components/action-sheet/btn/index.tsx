/*
 * @Author: czy0729
 * @Date: 2024-11-04 17:57:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 23:50:13
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { Flex } from '../../flex'
import { SafeAreaBottom } from '../../safe-area-bottom'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { memoStyles } from './styles'

import type { Props } from '../types'

function Btn({ onClose }: Pick<Props, 'onClose'>) {
  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Touchable style={styles.close} onPress={onClose}>
        <SafeAreaBottom
          style={_.ios(styles.btnContainer, undefined)}
          type={_.ios('height', 'paddingBottom')}
        >
          <Flex style={styles.btn} justify='center'>
            <Text size={15} bold type='sub'>
              收起
            </Text>
          </Flex>
        </SafeAreaBottom>
      </Touchable>
    )
  })
}

export default Btn
