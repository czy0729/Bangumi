/*
 * @Author: czy0729
 * @Date: 2020-11-05 12:14:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:22:16
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'

function Result({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { list } = $.state
  return (
    <View style={style}>
      {list.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} style={styles.item}>
          <Flex style={[styles.wrap, index !== 0 && !_.flat && styles.border]}>
            {!!item.icon && (
              <Avatar
                style={styles.avatar}
                src={tinygrailOSS(item.icon)}
                size={28}
                borderColor='transparent'
                onPress={() => {
                  t('人物直达.跳转', {
                    to: 'Mono',
                    monoId: item.id
                  })

                  navigation.push('Mono', {
                    monoId: `character/${item.id}`,
                    _name: item.name
                  })
                }}
              />
            )}
            <Flex.Item>
              <Touchable
                onPress={() => {
                  $.addHistory(item.id)

                  if (item.ico) {
                    t('人物直达.跳转', {
                      to: 'TinygrailICODeal',
                      monoId: item.id
                    })
                    navigation.push('TinygrailICODeal', {
                      monoId: `character/${item.id}`
                    })
                    return
                  }

                  t('人物直达.跳转', {
                    to: 'TinygrailDeal',
                    monoId: item.id
                  })
                  navigation.push('TinygrailDeal', {
                    monoId: `character/${item.id}`,
                    type: 'asks'
                  })
                }}
              >
                <Text type='tinygrailPlain' bold>
                  <Text type='bid'>{item.ico ? '[ICO] ' : ''}</Text>
                  {item.name} #{item.id}
                </Text>
              </Touchable>
            </Flex.Item>
          </Flex>
        </View>
      ))}
    </View>
  )
}

export default obc(Result)

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  },
  item: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingVertical: _.sm + 4,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorTinygrailBorder,
    borderTopWidth: _.hairlineWidth
  },
  avatar: {
    marginRight: _.sm,
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
