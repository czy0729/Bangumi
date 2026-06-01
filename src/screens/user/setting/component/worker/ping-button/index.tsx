/*
 * @Author: czy0729
 * @Date: 2026-06-01 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 02:41:53
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { styles } from './styles'

import type { Props } from './types'

/** Ping 测试按钮组件 */
function PingButton({ status, ms, onPress }: Props) {
  return (
    <Touchable style={styles.container} onPress={onPress}>
      <Flex align='center'>
        <Iconfont
          name={
            status === 'testing'
              ? 'md-refresh'
              : status === 'fail'
              ? 'md-close'
              : status === 'done'
              ? 'md-check-circle-outline'
              : 'md-radio-button-off'
          }
          size={13}
          color={
            status === 'done' ? _.colorSuccess : status === 'fail' ? _.colorDanger : _.colorIcon
          }
        />
        {status === 'testing' && (
          <Text style={styles.text} size={10} type='sub'>
            检测中
          </Text>
        )}
        {status === 'done' && (
          <Text style={styles.text} size={10} type='sub'>
            {ms}ms
          </Text>
        )}
        {status === 'fail' && (
          <Text style={styles.text} size={10} type='danger'>
            失败
          </Text>
        )}
      </Flex>
    </Touchable>
  )
}

export default observer(PingButton)
