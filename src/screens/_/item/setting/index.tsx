/*
 * @Author: czy0729
 * @Date: 2019-05-24 02:02:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:58:58
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, Flex, Highlight, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { navigationReference, showImageViewer, stl } from '@utils'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ItemSettingProps } from './types'
export type { ItemSettingProps }

export const ItemSetting = observer(
  ({
    style,
    contentStyle,
    show = true,
    hd,
    hdSize = WEB ? 13 : 14,
    ft,
    arrow,
    arrowStyle,
    arrowIcon = 'md-navigate-next',
    arrowSize = 22,
    information,
    informationType = 'sub',
    thumb,
    filter,
    sub,
    children,
    onInfoPress,
    onPress,
    ...other
  }: ItemSettingProps) => {
    r(COMPONENT)

    if (!show) return null

    const styles = memoStyles()

    const content = (
      <View style={stl(styles.item, contentStyle, sub && styles.sub)}>
        <Flex>
          <Flex.Item>
            <Flex>
              <Highlight type='title' size={hdSize} lineHeight={hdSize + 1} bold value={filter}>
                {hd}
              </Highlight>
              {!!thumb && (
                <Touchable
                  style={_.ml.xs}
                  onPress={() => {
                    if (WEB) {
                      const navigation = navigationReference()
                      if (navigation) {
                        navigation.push('Information', {
                          title: String(hd),
                          message: [information],
                          images: thumb.map(item => item.url)
                        })
                        return
                      }
                    }

                    showImageViewer(thumb, 0, true)
                  }}
                >
                  <Iconfont name='md-info-outline' size={16} />
                </Touchable>
              )}
              {!!onInfoPress && (
                <Touchable style={_.ml.xs} onPress={onInfoPress}>
                  <Iconfont name='md-info-outline' size={16} />
                </Touchable>
              )}
            </Flex>
          </Flex.Item>
          {typeof ft === 'string' ? <Text type='sub'>{ft}</Text> : ft}
          {arrow && <Iconfont style={stl(_.ml.xs, arrowStyle)} name={arrowIcon} size={arrowSize} />}
        </Flex>
        <Flex>
          {!!information && (
            <View style={styles.information}>
              <Highlight type={informationType} size={12} lineHeight={13} value={filter}>
                {information}
              </Highlight>
            </View>
          )}
        </Flex>
        {children}
      </View>
    )

    if (onPress) {
      return (
        <Component id='item-setting' data-type='press'>
          <Touchable style={stl(styles.touchable, style)} onPress={onPress} {...other}>
            {content}
          </Touchable>
        </Component>
      )
    }

    return (
      <Component id='item-setting' style={stl(styles.touchable, style)} {...other}>
        {content}
      </Component>
    )
  }
)

export default ItemSetting
