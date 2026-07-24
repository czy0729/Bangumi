/*
 * @Author: czy0729
 * @Date: 2024-04-21 20:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 18:27:03
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Highlight, Iconfont, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { info } from '@utils'
import { t } from '@utils/fetch'
import { TEXTS } from '../../ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Item({ filter, label, name, size, show, handleSet }: Props) {
  const styles = memoStyles()

  return (
    <Flex.Item>
      <Touchable
        animate
        onPress={() => {
          if (label === 'Home') {
            info('进度暂不允许关闭')
            return
          }

          if (label === 'User') {
            info('时光机暂不允许关闭')
            return
          }

          handleSet(systemStore.calcHomeRenderTabs(label))

          t('设置.切换', {
            title: '首页功能块',
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
            {TEXTS.blocks[label.toLocaleLowerCase()]}
          </Highlight>
          {!show && <View style={styles.disabledLine} />}
        </Flex>
      </Touchable>
    </Flex.Item>
  )
}

export default observer(Item)
