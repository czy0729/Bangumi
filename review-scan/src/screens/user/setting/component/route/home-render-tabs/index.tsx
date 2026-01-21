/*
 * @Author: czy0729
 * @Date: 2024-04-23 03:21:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 03:59:03
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Highlight, Text } from '@components'
import { _, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { ITEMS, TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import Item from './item'
import { memoStyles } from './styles'

/** 功能块 */
function HomeRenderTabs({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('homeRenderTabs')
  const passProps = {
    filter,
    handleSet
  }

  return useObserver(() => {
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
          {(['discovery', 'timeline', 'home', 'rakuen', 'user'] as const).map(item => (
            <Item
              key={item}
              {...passProps}
              {...ITEMS[item]}
              show={value.includes(ITEMS[item].label)}
            />
          ))}
          {systemStore.setting.tinygrail && (
            <>
              <View style={styles.split} />
              <Item
                {...passProps}
                {...ITEMS.tinygrail}
                show={value.includes(ITEMS.tinygrail.label)}
              />
            </>
          )}
        </Flex>
        <Heatmap id='设置.切换' title='首页功能块' />
      </View>
    )
  })
}

export default HomeRenderTabs
