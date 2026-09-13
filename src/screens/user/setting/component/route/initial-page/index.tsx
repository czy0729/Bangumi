/*
 * @Author: czy0729
 * @Date: 2024-04-23 03:26:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-20 00:24:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Highlight } from '@components'
import { _, systemStore } from '@stores'
import { WEB } from '@constants'
import { IconRocket } from '../../icons'
import { ITEMS, TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import Item from './item'
import { memoStyles } from './styles'

import type { WithFilterProps } from '../../../types'

/** 启动页 */
function InitialPage({ filter }: WithFilterProps) {
  const { value, handleSet } = useAsyncSetSetting('initialPage')
  const passProps = {
    filter,
    handleSet
  }

  const styles = memoStyles()

  return (
    <View style={styles.blocks}>
      <Flex>
        <View style={_.mr.sm}>
          <IconRocket />
        </View>
        <Highlight type='title' size={WEB ? 13 : 14} bold value={filter}>
          {TEXTS.initialPage.setting}
        </Highlight>
      </Flex>
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
}

export default observer(InitialPage)
