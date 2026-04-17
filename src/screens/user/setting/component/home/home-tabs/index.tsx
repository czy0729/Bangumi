/*
 * @Author: czy0729
 * @Date: 2024-07-10 10:54:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 23:26:55
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Highlight, Text } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useAsyncSetSetting, useAsyncSwitchSetting } from '../../../hooks'
import Item from './item'
import { ITEMS, TEXTS } from './ds'
import { memoStyles } from './styles'

import type { HomeTabs as HomeTabsType } from '@stores/system/types'
import type { WithFilterProps } from '../../../types'

/** 首页进度 Tabs 范围 */
function HomeTabs({ filter }: WithFilterProps) {
  const { value: homeTabs, handleSet } = useAsyncSetSetting('homeTabs')
  const { value: showGame, handleSwitch } = useAsyncSwitchSetting('showGame')

  const styles = memoStyles()

  return (
    <View style={styles.blocks}>
      <Highlight type='title' size={16} bold value={filter}>
        {TEXTS.blocks.setting}
      </Highlight>
      <Text style={_.mt.sm} type='sub' size={12}>
        点击切换是否显示，切换后需要重新启动才能生效
      </Text>
      <Flex style={styles.tabs}>
        {ITEMS.map(item => (
          <Item
            key={item.key}
            label={item.label}
            value={item.key}
            show={homeTabs.includes(item.key)}
            filter={filter}
            onPress={(value: HomeTabsType[number]) => {
              if (homeTabs.includes(value)) {
                handleSet(homeTabs.filter(item => item !== value))
                return
              }

              const next = []
              const map = {
                all: 0,
                anime: 1,
                book: 2,
                real: 3
              } as const
              homeTabs.forEach(item => {
                next[map[item]] = item
              })
              next[map[value]] = value

              const nextHomeTabs = next.filter(item => !!item)
              handleSet(nextHomeTabs)

              t('设置.切换', {
                title: '进度选项卡',
                length: nextHomeTabs.length
              })
            }}
          />
        ))}
        <View style={styles.split} />
        <Item
          label='游戏'
          value='game'
          show={showGame}
          filter={filter}
          onPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '显示游戏',
              checked: !showGame
            })
          }}
        />
      </Flex>
    </View>
  )
}

export default observer(HomeTabs)
