/*
 * @Author: czy0729
 * @Date: 2019-09-03 22:06:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 17:49:47
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

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
                style={{
                  color: _.colorTinygrailPlain
                }}
                size={15}
                onPress={() =>
                  navigation.push('TinygrailTrade', {
                    monoId: item
                  })
                }
              >
                {$.chara(item).name || item}
              </Text>
            </Flex.Item>
            <Touchable
              style={[styles.close, _.ml.md]}
              onPress={() => $.deleteHistory(item)}
            >
              <Iconfont name='close' size={12} color={_.colorTinygrailIcon} />
            </Touchable>
          </Flex>
        </View>
      ))}
    </View>
  )
}

History.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(History)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingHorizontal: _.wind
  },
  content: {
    paddingVertical: _.sm,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorTinygrailBorder
  },
  close: {
    padding: _.sm
  }
}))
