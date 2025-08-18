/*
 * @Author: czy0729
 * @Date: 2024-04-21 20:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 16:19:34
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Highlight, Iconfont, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { HomeRenderTabs } from '@stores/system/types'
import { info } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Fn, IconfontNames } from '@types'
import { TEXTS } from '../../ds'
import { memoStyles } from './styles'

function Item({
  filter,
  label,
  name,
  size,
  show,
  handleSet
}: {
  filter: string
  label: HomeRenderTabs[number]
  name: IconfontNames
  size: number
  show: boolean
  handleSet: Fn
}) {
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
          <Highlight type={show ? undefined : 'icon'} size={11} bold value={filter}>
            {TEXTS.blocks[label.toLocaleLowerCase()]}
          </Highlight>
          {!show && <View style={styles.disabledLine} />}
        </Flex>
      </Touchable>
    </Flex.Item>
  )
}

export default ob(Item)
