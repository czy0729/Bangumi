/*
 * @Author: czy0729
 * @Date: 2019-03-16 10:54:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-09
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN, IOS } from '@constants'
import { HoldItem } from '../../hold-menu'

import type { PopoverIOSItems } from './types'

function Popover({ activateOn, children, ...other }) {
  const data = other.data || other.overlay?.props?.data || []
  const title = other.title || other.overlay?.props?.title || ''
  const onSelect = other.onSelect || other.overlay?.props?.onSelect || FROZEN_FN

  const items = useMemo<PopoverIOSItems>(() => {
    const itemsValue = (
      systemStore.setting.s2t
        ? data.map((item: string) => (typeof item === 'string' ? s2t(item) : item))
        : data
    ).map((item: any, index: number) => ({
      text: item,
      onPress: (evt?: { pageX?: number; pageY?: number }) => {
        // 等菜单收起动画(120ms)结束再触发动作, 避免跳转/弹窗与关闭动画重叠
        setTimeout(() => {
          onSelect(data[index], index, evt)
        }, 160)
      }
    }))

    if (title) {
      itemsValue.unshift({
        text: systemStore.setting.s2t ? s2t(title) : title,
        isTitle: true
      })
    }

    return itemsValue
  }, [title, data, onSelect])

  return (
    <View style={other.style}>
      <HoldItem
        key={items.map(item => item.text).join()}
        items={items}
        activateOn={activateOn || 'tap'}
        closeOnTap
        hapticFeedback={IOS ? 'Light' : 'None'}
      >
        {children}
      </HoldItem>
    </View>
  )
}

export default Popover
