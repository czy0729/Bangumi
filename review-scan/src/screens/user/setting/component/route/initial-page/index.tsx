/*
 * @Author: czy0729
 * @Date: 2024-04-23 03:26:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 03:50:45
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Highlight } from '@components'
import { systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { ITEMS, TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import Item from './item'
import { memoStyles } from './styles'

/** 启动页 */
function InitialPage({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('initialPage')
  const passProps = {
    filter,
    handleSet
  }

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View style={styles.blocks}>
        <Highlight type='title' size={16} bold value={filter}>
          {TEXTS.initialPage.setting}
        </Highlight>
        <Flex style={styles.tabs}>
          {(['discovery', 'timeline', 'home', 'rakuen', 'user'] as const).map(item => (
            <Item key={item} {...passProps} {...ITEMS[item]} active={value === ITEMS[item].label} />
          ))}
          {systemStore.setting.tinygrail && (
            <>
              <View style={styles.split} />
              <Item {...passProps} {...ITEMS.tinygrail} active={value === ITEMS.tinygrail.label} />
            </>
          )}
        </Flex>
        <Heatmap id='设置.切换' title='启动页' />
      </View>
    )
  })
}

export default InitialPage
