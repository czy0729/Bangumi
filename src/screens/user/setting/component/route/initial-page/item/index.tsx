/*
 * @Author: czy0729
 * @Date: 2024-04-21 20:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 18:28:04
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Highlight, Iconfont, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { TEXTS } from '../../ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Item({ filter, label, name, size, active, handleSet }: Props) {
  const styles = memoStyles()

  const { homeRenderTabs } = systemStore.setting
  const show = homeRenderTabs.includes(label)

  return (
    <Flex.Item>
      <Touchable
        animate
        onPress={() => {
          handleSet(label)

          t('设置.切换', {
            title: '启动页',
            label
          })
        }}
      >
        <Flex style={styles.tab} justify='center' direction='column'>
          <View style={styles.icon}>
            <Iconfont name={name} color={show ? _.colorDesc : _.colorIcon} size={size} />
          </View>
          <Highlight
            type={show ? undefined : _.select('sub', 'icon')}
            size={11}
            bold
            value={filter}
          >
            {TEXTS.initialPage[label.toLocaleLowerCase()]}
          </Highlight>
        </Flex>
      </Touchable>
      <Flex style={styles.activeBar} justify='center'>
        {active && <View style={styles.activeLine} />}
      </Flex>
    </Flex.Item>
  )
}

export default observer(Item)
