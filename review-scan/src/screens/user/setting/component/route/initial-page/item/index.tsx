/*
 * @Author: czy0729
 * @Date: 2024-04-21 20:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 03:53:07
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Highlight, Iconfont, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { HomeRenderTabs } from '@stores/system/types'
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
  active,
  handleSet
}: {
  filter: string
  label: HomeRenderTabs[number]
  name: IconfontNames
  size: number
  active: boolean
  handleSet: Fn
}) {
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
          <Highlight type={show ? undefined : 'icon'} size={11} bold value={filter}>
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

export default ob(Item)
