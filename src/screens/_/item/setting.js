/*
 * @Author: czy0729
 * @Date: 2019-05-24 02:02:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 20:11:50
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { showImageViewer } from '@utils/ui'
import { ob } from '@utils/decorators'

export const ItemSetting = ob(
  ({
    style,
    show = true,
    hd,
    ft,
    arrow,
    information,
    informationType = 'sub',
    thumb,
    children,
    onPress,
    ...other
  }) => {
    if (!show) {
      return null
    }

    const styles = memoStyles()
    const content = (
      <View style={styles.item}>
        <Flex>
          <Flex.Item>
            <Flex>
              <Text type='title' size={16} bold>
                {hd}
              </Text>
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
                  <Iconfont name='information' />
                </Touchable>
              )}
            </Flex>
          </Flex.Item>
          {typeof ft === 'string' ? <Text type='sub'>{ft}</Text> : ft}
          {arrow && <Iconfont style={_.ml.xs} size={14} name='right' />}
        </Flex>
        <Flex>
          {information && (
            <Text style={styles.information} type={informationType} size={12}>
              {information}
            </Text>
          )}
        </Flex>
        {children}
      </View>
    )

    if (onPress) {
      return (
        <Touchable
          style={[styles.touchable, style]}
          onPress={onPress}
          {...other}
        >
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

const memoStyles = _.memoStyles(_ => ({
  touchable: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  item: {
    paddingVertical: _.md - 2,
    paddingRight: _.wind
  },
  information: {
    maxWidth: '80%',
    marginTop: _.xs
  }
}))
