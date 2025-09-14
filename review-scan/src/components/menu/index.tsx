/*
 * @Author: czy0729
 * @Date: 2019-04-06 06:57:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 21:53:02
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN, WEB } from '@constants'
import { Component } from '../component'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { platformFix, removeDuplicateStrings } from './utils'
import { COMPONENT } from './ds'
import { Props as MenuProps } from './types'
import { memoStyles } from './styles'

export { MenuProps }

/** iOS 风格菜单 */
export const Menu = observer(
  ({ style, title = [], desc = '', data = [], onSelect = FROZEN_FN }: MenuProps) => {
    r(COMPONENT)

    const styles = memoStyles()
    return (
      <Component id='component-menu'>
        <View style={stl(styles.container, style)}>
          {title.length !== 0 && (
            <View style={styles.title}>
              {title.map((item, index) => {
                if (typeof item !== 'string') return null

                return (
                  <Text
                    key={index}
                    style={index !== 0 && _.mt.sm}
                    type='sub'
                    size={12}
                    align='center'
                    selectable={false}
                  >
                    {item}
                  </Text>
                )
              })}
            </View>
          )}
          {!!desc && (
            <Text style={_.mt.sm} type='sub' size={10} lineHeight={16} align='center'>
              {desc}
            </Text>
          )}
          {removeDuplicateStrings(data).map(
            (item: string | { title: string; type: string }, index: number) => {
              const showBorder = title.length !== 0 || (title.length === 0 && index !== 0)
              if (typeof item === 'string') {
                return (
                  <View key={item} style={showBorder && styles.border}>
                    <Touchable style={styles.item} onPress={() => onSelect(item, index)}>
                      <Text
                        align='center'
                        size={WEB ? 13 : 14}
                        numberOfLines={WEB ? undefined : 1}
                        noWrap={WEB ? false : true}
                        selectable={false}
                      >
                        {platformFix(item)}
                      </Text>
                    </Touchable>
                  </View>
                )
              }

              if (item.type === 'divider')
                return <View key={`divider|${index}`} style={styles.border} />

              return (
                <View key={`title|${index}`} style={showBorder && styles.border}>
                  <Touchable style={styles.item} onPress={() => onSelect(item.title, index)}>
                    {item.title}
                  </Touchable>
                </View>
              )
            }
          )}
        </View>
      </Component>
    )
  }
)

export default Menu
