/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-09 15:48:20
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { SectionTitle } from '@screens/_'
import { appNavigate } from '@utils/app'
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
  const { subjectId } = $.params
  const { rating = initialRating, rank } = $.subject
  const { friend = {} } = $.subjectFormHTML
  return (
    <View style={[_.container.wind, style]}>
      <SectionTitle
        right={
          <Touchable
            onPress={() =>
              appNavigate(`https://netaba.re/subject/${subjectId}`)
            }
          >
            <Flex>
              <Text type='sub'>netabare</Text>
              <Iconfont name='right' size={16} />
            </Flex>
          </Touchable>
        }
      >
        评分分布
      </SectionTitle>
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
              <Text style={_.mt.xs} size={12} align='center'>
                {item}
              </Text>
            </Flex.Item>
          ))}
      </Flex>
      <Text style={_.mt.sm} size={12}>
        <Text size={12} type='main'>
          {rating.score}
        </Text>{' '}
        / {rating.total} votes / Ranked:{' '}
        <Text size={12} type='main'>
          #{rank}
        </Text>
      </Text>
      {!!friend.score && (
        <Text style={_.mt.sm} size={12}>
          好友{' '}
          <Text size={12} type='main'>
            {friend.score}
          </Text>{' '}
          / {friend.total} votes
        </Text>
      )}
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
