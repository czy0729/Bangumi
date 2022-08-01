/*
 * @Author: czy0729
 * @Date: 2019-05-24 02:02:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-01 07:17:05
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Highlight, Iconfont } from '@components'
import { _ } from '@stores'
import { showImageViewer } from '@utils/ui'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as ItemSettingProps } from './types'

export { ItemSettingProps }

export const ItemSetting = ob(
  ({
    style,
    show = true,
    hd,
    ft,
    arrow,
    arrowStyle,
    arrowIcon = 'md-navigate-next',
    arrowSize = 22,
    information,
    informationType = 'sub',
    thumb,
    filter,
    children,
    onPress,
    ...other
  }: ItemSettingProps) => {
    if (!show) return null

    const styles = memoStyles()
    const content = (
      <View style={styles.item}>
        <Flex>
          <Flex.Item>
            <Flex>
              <Highlight type='title' size={16} bold value={filter}>
                {hd}
              </Highlight>
              {!!thumb && (
                <Touchable
                  style={_.ml.sm}
                  onPress={() =>
                    showImageViewer([
                      {
                        url: thumb
                      }
                    ])
                  }
                >
                  <Iconfont name='md-info-outline' size={16} />
                </Touchable>
              )}
            </Flex>
          </Flex.Item>
          {typeof ft === 'string' ? <Text type='sub'>{ft}</Text> : ft}
          {arrow && (
            <Iconfont style={[_.ml.xs, arrowStyle]} name={arrowIcon} size={arrowSize} />
          )}
        </Flex>
        <Flex>
          {!!information && (
            <Highlight
              style={styles.information}
              type={informationType}
              size={12}
              lineHeight={13}
              value={filter}
            >
              {information}
            </Highlight>
          )}
        </Flex>
        {children}
      </View>
    )

    if (onPress) {
      return (
        <Touchable style={[styles.touchable, style]} onPress={onPress} {...other}>
          {content}
        </Touchable>
      )
    }

    return (
      <View style={[styles.touchable, style]} {...other}>
        {content}
      </View>
    )
  }
)
