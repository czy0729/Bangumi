/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:19:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:19:40
 */
import React, { memo } from 'react'
import { View } from 'react-native'
import { Text } from '@components/text'
import { Touchable } from '@components/touchable'
import { stl } from '@utils'
import { useHoldMenu } from '../../context'
import { memoStyles } from './styles'

import type { MenuPressEvent } from '../../types'
import type { Props } from './types'

/** 单个菜单项, 点击后执行回调并关闭菜单 */
function MenuItemComponent({ item, isLast, actionParams }: Props) {
  const { close } = useHoldMenu()
  const styles = memoStyles()

  const handlePress = (evt?: MenuPressEvent) => {
    item.onPress?.(evt, ...(actionParams?.[item.text] || []))
    close()
  }

  return (
    <View>
      <Touchable
        style={stl(styles.item, !isLast && styles.border)}
        withoutFeedback={item.isTitle}
        onPress={item.isTitle ? undefined : handlePress}
      >
        <Text
          style={
            item.isTitle ? styles.title : item.isDestructive ? styles.destructive : styles.text
          }
          size={item.isTitle ? 14 : 16}
          align={item.isTitle ? 'center' : 'left'}
          numberOfLines={item.isTitle ? undefined : 1}
          ellipsizeMode='middle'
          s2t={false}
        >
          {item.text}
        </Text>
      </Touchable>
      {item.withSeparator && <View style={styles.separator} />}
    </View>
  )
}

const MenuItem = memo(MenuItemComponent)

export default MenuItem
