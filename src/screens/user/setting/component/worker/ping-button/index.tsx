/*
 * @Author: czy0729
 * @Date: 2026-06-01 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 09:27:53
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
          color={status === 'done' ? _.colorSuccess : status === 'fail' ? _.colorIcon : _.colorIcon}
        />
        {status === 'testing' && (
          <Text style={styles.text} type='sub' size={10}>
            检测中
          </Text>
        )}
        {status === 'done' && (
          <Text style={styles.text} type='sub' size={10}>
            {ms}ms
          </Text>
        )}
        {status === 'fail' && (
          <Text style={styles.text} type='icon' size={10}>
            缓慢或失败
          </Text>
        )}
      </Flex>
    </Touchable>
  )
}

export default observer(PingButton)
