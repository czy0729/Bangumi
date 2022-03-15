/*
 * @Author: czy0729
 * @Date: 2019-09-03 22:06:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-20 09:33:25
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function History({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { history } = $.state
  return (
    <View style={style}>
      {history.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} style={styles.item}>
          <Flex style={styles.content}>
            <Flex.Item>
              <Text
                type='tinygrailPlain'
                size={15}
                onPress={() => {
                  t('人物直达.跳转', {
                    monoId: item
                  })

                  $.doSearchNumber(navigation, item)
                }}
              >
                {$.chara(item).name || item}
                {!!$.chara(item).id && ` #${$.chara(item).id}`}
              </Text>
            </Flex.Item>
            <Touchable
              style={styles.close}
              onPress={() => $.deleteHistory(item)}
            >
              <Iconfont name='md-close' color={_.colorTinygrailPlain} />
            </Touchable>
          </Flex>
        </View>
      ))}
    </View>
  )
}

export default obc(History)

const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind
  },
  content: {
    paddingVertical: _.sm
  },
  close: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.md
  }
}))
