/*
 * @Author: czy0729
 * @Date: 2019-09-03 22:06:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-21 00:25:28
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBorder, colorIcon } from '../styles'

function History({ style }, { $, navigation }) {
  const { history } = $.state
  return (
    <View style={style}>
      {history.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index} style={styles.item}>
          <Flex style={styles.content}>
            <Flex.Item>
              <Text
                size={15}
                type='plain'
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
              <Iconfont name='close' size={12} color={colorIcon} />
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

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: _.wind
  },
  content: {
    paddingVertical: _.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorBorder
  },
  close: {
    padding: _.sm
  }
})
