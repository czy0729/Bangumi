/*
 * @Author: czy0729
 * @Date: 2024-03-07 16:33:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:14:30
 */
import React from 'react'
import { Flex, Switch, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Head() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { showSacrifice } = $.state
    if (!showSacrifice) {
      return (
        <Touchable onPress={$.toggleSacrifice}>
          <Text style={styles.touch} type='tinygrailPlain' size={13} align='center'>
            献祭
          </Text>
        </Touchable>
      )
    }

    return (
      <Flex>
        <Flex.Item>
          <Touchable onPress={$.toggleSacrifice}>
            <Text style={styles.touch} type='tinygrailPlain' size={13}>
              {$.state.isSale ? '出售：出售给英灵殿获得现金' : '献祭：转化为固定资产并获得现金道具'}
            </Text>
          </Touchable>
        </Flex.Item>
        <Switch style={styles.switch} checked={$.state.isSale} onChange={$.switchIsSale} />
      </Flex>
    )
  })
}

export default Head
