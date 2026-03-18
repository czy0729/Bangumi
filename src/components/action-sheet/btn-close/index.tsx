/*
 * @Author: czy0729
 * @Date: 2024-11-04 17:57:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 03:43:58
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Flex } from '../../flex'
import { SafeAreaBottom } from '../../safe-area-bottom'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { memoStyles } from './styles'

import type { Props } from '../types'

function BtnClose({ onClose }: Pick<Props, 'onClose'>) {
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
}

export default observer(BtnClose)
