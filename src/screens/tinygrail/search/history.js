/*
 * @Author: czy0729
 * @Date: 2019-09-03 22:06:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-20 18:38:23
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
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

                  $.doSearch(navigation, item)
                }}
              >
                {$.chara(item).name || item}
                {!!$.chara(item).id && ` #${$.chara(item).id}`}
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
