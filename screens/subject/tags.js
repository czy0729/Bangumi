/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-08 14:06:52
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import _, { colorBg, colorBorder, radiusXs } from '@styles'

const Tags = ({ style }, { $ }) => {
  const { tags = [], counts = [] } = $.subjectFormHTML
  let _tags = []
  let _counts = []
  // 标签太多时过滤一部分
  if (tags.length > 12) {
    _counts = counts.filter((item, index) => {
      const isFilter = parseInt(item) >= 10
      if (isFilter) {
        _tags.push(tags[index])
      }
      return isFilter
    })
  } else {
    _tags = tags
    _counts = counts
  }
  return (
    <View style={[_.container.wind, style]}>
      <Text size={18}>标签</Text>
      <Flex style={_.mt.sm} wrap='wrap'>
        {_tags.map((item, index) => (
          <Flex key={item} style={styles.item}>
            <Text size={13}>{item}</Text>
            <Text style={_.ml.xs} type='sub' size={13}>
              {_counts[index]}
            </Text>
          </Flex>
        ))}
      </Flex>
    </View>
  )
}

Tags.contextTypes = {
  $: PropTypes.object
}

export default observer(Tags)

const styles = StyleSheet.create({
  item: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 12,
    backgroundColor: colorBg,
    borderWidth: 1,
    borderColor: colorBorder,
    borderRadius: radiusXs
  }
})
