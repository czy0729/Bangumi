/*
 * @Author: czy0729
 * @Date: 2019-09-12 19:58:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-20 18:19:43
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'

const LIMIT = 5

function Records({ style }, { $ }) {
  const styles = memoStyles()
  const { expand } = $.state
  const { bidHistory, askHistory } = $.userLogs
  const needShowExpand = bidHistory.length > 10 || askHistory.length > 10
  return (
    <View style={[styles.container, style]}>
      <Flex align='start'>
        <Flex.Item>
          <Text style={_.mb.sm} type='bid' size={16}>
            买入记录
          </Text>
          {bidHistory.length === 0 && <Text type='tinygrailText'>-</Text>}
          {bidHistory
            .filter((item, index) => (expand ? true : index < LIMIT))
            .map((item, index) => (
              <Touchable
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={styles.item}
                onPress={() => {
                  t('交易.显示时间', {
                    monoId: $.monoId
                  })

                  info(`成交时间: ${String(item.time).replace('T', ' ')}`)
                }}
              >
                <Flex>
                  <Flex.Item>
                    <Text size={12} type='tinygrailPlain'>
                      {formatNumber(item.price)} /{' '}
                      <Text type='tinygrailText' size={12}>
                        {formatNumber(item.amount, 0)}
                      </Text>
                    </Text>
                  </Flex.Item>
                  <Text size={12} type='tinygrailPlain'>
                    -{formatNumber(item.price * item.amount)}
                  </Text>
                </Flex>
              </Touchable>
            ))}
        </Flex.Item>
        <Flex.Item style={_.ml.wind}>
          <Text style={_.mb.sm} type='ask' size={16}>
            卖出记录
          </Text>
          {askHistory.length === 0 && <Text type='tinygrailText'>-</Text>}
          {askHistory
            .filter((item, index) => (expand ? true : index < LIMIT))
            .map((item, index) => (
              <Touchable
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={styles.item}
                onPress={() => {
                  t('交易.显示时间', {
                    monoId: $.monoId
                  })

                  info(`成交时间: ${String(item.time).replace('T', ' ')}`)
                }}
              >
                <Flex>
                  <Flex.Item>
                    <Text type='tinygrailPlain' size={12}>
                      {formatNumber(item.price)} /{' '}
                      <Text type='tinygrailText' size={12}>
                        {formatNumber(item.amount, 0)}
                      </Text>
                    </Text>
                  </Flex.Item>
                  <Text type='tinygrailPlain' size={12}>
                    +{formatNumber(item.price * item.amount)}
                  </Text>
                </Flex>
              </Touchable>
            ))}
        </Flex.Item>
      </Flex>
      {needShowExpand && (
        <Touchable style={[styles.expand, _.mt.sm]} onPress={$.toggleExpand}>
          <Text type='warning' align='center'>
            {expand ? '收起' : '展开'}
          </Text>
        </Touchable>
      )}
    </View>
  )
}

Records.contextTypes = {
  $: PropTypes.object
}

export default observer(Records)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 120,
    paddingTop: _.md,
    paddingBottom: _.lg,
    paddingHorizontal: _.wind,
    borderTopWidth: _.sm,
    borderTopColor: _.colorTinygrailBg
  },
  item: {
    width: '100%',
    paddingVertical: 6
  },
  cancel: {
    paddingVertical: _.sm,
    paddingLeft: _.sm
  },
  expand: {
    paddingVertical: _.sm
  }
}))
