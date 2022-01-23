/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-23 02:39:48
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function History({ navigation, style, data = [], onDelete = Function.prototype }) {
  const styles = memoStyles()
  if (!data.length) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.item}>
          <Flex style={styles.content}>
            <Text type='title' size={15} bold>
              空
            </Text>
          </Flex>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {data.map(item => (
        <View key={item} style={styles.item}>
          <Flex style={styles.content}>
            <Flex.Item>
              <Text
                size={15}
                bold
                onPress={() => {
                  if (!navigation) return

                  try {
                    const [, userId] = item.replace('@undefined', '').split('@')
                    if (userId)
                      navigation.push('Zone', {
                        userId
                      })
                  } catch (error) {}
                }}
              >
                {item.replace('@undefined', '')}
              </Text>
            </Flex.Item>
            <Touchable style={[styles.touch, _.ml.md]} onPress={() => onDelete(item)}>
              <Flex style={styles.icon} justify='center'>
                <Iconfont name='md-close' size={20} />
              </Flex>
            </Touchable>
          </Flex>
        </View>
      ))}
    </View>
  )
}

export default ob(History)

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _._wind,
    paddingBottom: _.sm
  },
  item: {
    paddingRight: _.sm
  },
  content: {
    marginTop: _.sm
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
}))
