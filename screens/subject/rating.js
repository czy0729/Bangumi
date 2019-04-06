/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 03:31:58
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import _, { colorBg, colorWait } from '@styles'

const initialRating = {
  count: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0
  },
  score: 0,
  total: 0
}

const getHeight = (total, current) => {
  if (!total) {
    return 0
  }
  let percent = current / total
  if (percent > 0 && percent < 0.01) {
    percent = 0.01
  }
  return `${percent * 100}%`
}

const Ranting = ({ style }, { $ }) => {
  const { rating = initialRating, rank } = $.subject
  return (
    <View style={[_.container.wind, style]}>
      <Text size={20}>评分分布</Text>
      <Flex style={_.mt.md}>
        {Object.keys(rating.count)
          .reverse()
          .map((item, index) => (
            <Flex.Item key={item} style={index > 0 && _.ml.xs}>
              <Flex style={styles.item} align='end'>
                <View
                  style={[
                    styles.itemFill,
                    { height: getHeight(rating.total, rating.count[item]) }
                  ]}
                />
              </Flex>
              <Text style={_.mt.xs} type='desc' size={12} align='center'>
                {item}
              </Text>
            </Flex.Item>
          ))}
      </Flex>
      <Flex style={_.mt.sm}>
        <Text type='main' size={13}>
          {rating.score}
        </Text>
        <Text type='desc' size={13}>
          {' '}
          / {rating.total} votes{' '}
        </Text>
        <Text type='desc' size={13}>
          / Ranked:
        </Text>
        <Text style={_.ml.xs} type='main' size={13}>
          #{rank}
        </Text>
      </Flex>
    </View>
  )
}

Ranting.contextTypes = {
  $: PropTypes.object
}

export default observer(Ranting)

const styles = StyleSheet.create({
  item: {
    height: 96,
    backgroundColor: colorBg
  },
  itemFill: {
    width: '100%',
    height: 0,
    backgroundColor: colorWait
  }
})
