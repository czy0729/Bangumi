/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-22 21:51:40
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { SectionTitle } from '@screens/_'
import _, { colorBg, colorBorder, radiusXs } from '@styles'

const Tags = ({ style }, { $ }) => {
  const { tags = [] } = $.subjectFormHTML
  let _tags
  // 标签太多时过滤一部分
  if (tags.length > 12) {
    _tags = tags.filter(item => parseInt(item.count) >= 10)
  } else {
    _tags = tags
  }
  return (
    <View style={[_.container.wind, style]}>
      <SectionTitle>标签</SectionTitle>
      <Flex style={_.mt.sm} wrap='wrap'>
        {_tags.map(({ name, count }) => (
          <Flex key={name} style={styles.item}>
            <Text size={13}>{name}</Text>
            <Text style={_.ml.xs} type='sub' size={13}>
              {count}
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
