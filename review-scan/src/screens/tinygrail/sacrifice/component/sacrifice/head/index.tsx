/*
 * @Author: czy0729
 * @Date: 2024-03-07 16:33:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:18:24
 */
import React from 'react'
import { Flex, Switch, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Head() {
  const { $ } = useStore<Ctx>()
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
}

export default ob(Head)
