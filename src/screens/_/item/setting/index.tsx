/*
 * @Author: czy0729
 * @Date: 2019-05-24 02:02:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-13 22:34:56
 */
import React, { useContext } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import {
  Component,
  Flex,
  Hairline,
  HairlineContext,
  Highlight,
  Iconfont,
  Text,
  Touchable
} from '@components'
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
    icon,
    hd,
    hdSize = WEB ? 13 : 14,
    ft,
    arrow,
    arrowStyle,
    arrowIcon = 'md-navigate-next',
    arrowSize = 22,
    information,
    informationStyle,
    informationType = 'sub',
    thumb,
    filter,
    sub,
    extra,
    children,
    onInfoPress,
    onPress,
    ...other
  }: ItemSettingProps) => {
    r(COMPONENT)

    /** 处于分组卡片内时, 行顶部绘制细线 (卡片会裁掉第一行的细线) */
    const divided = useContext(HairlineContext)

    if (!show) return null

    const styles = memoStyles()

    const content = (
      <View
        style={stl(styles.item, contentStyle, sub && styles.sub, !!extra && styles.itemWithExtra)}
      >
        <Flex>
          <Flex.Item>
            <Flex>
              {!!icon && <View style={_.mr.sm}>{icon}</View>}
              <Highlight type='title' size={hdSize} lineHeight={hdSize + 1} bold value={filter}>
                {hd}
              </Highlight>
              {!!thumb && (
                <Touchable
                  style={styles.touch}
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
                  <Iconfont name='md-info-outline' size={14} />
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
            <View style={stl(styles.information, informationStyle)}>
              <Highlight type={informationType} size={12} lineHeight={13} value={filter}>
                {information}
              </Highlight>
            </View>
          )}
        </Flex>
        {children}
      </View>
    )

    let el: React.ReactNode

    if (onPress) {
      if (extra) {
        el = (
          <Component id='item-setting' data-type='press'>
            <Flex>
              <Flex.Item>
                <Touchable style={stl(styles.touchable, style)} onPress={onPress} {...other}>
                  {content}
                </Touchable>
              </Flex.Item>
              <View style={styles.split} />
              {extra}
            </Flex>
          </Component>
        )
      } else {
        el = (
          <Component id='item-setting' data-type='press'>
            <Touchable style={stl(styles.touchable, style)} onPress={onPress} {...other}>
              {content}
            </Touchable>
          </Component>
        )
      }
    } else {
      el = (
        <Component id='item-setting' style={stl(styles.touchable, style)} {...other}>
          {content}
        </Component>
      )
    }

    if (!divided) return el

    return (
      <>
        <Hairline />
        {el}
      </>
    )
  }
)

export default ItemSetting
