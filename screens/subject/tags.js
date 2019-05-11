/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-11 02:00:40
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Flex, Text } from '@components'
import { SectionTitle } from '@screens/_'
import _ from '@styles'

const Tags = ({ style }, { $ }) => {
  const { tags = [] } = $.subjectFormHTML
  const { tag = [] } = $.collection
  return (
    <View style={[_.container.wind, style]}>
      <SectionTitle>标签</SectionTitle>
      <Expand style={_.mt.sm} maxHeight={154}>
        <Flex wrap='wrap'>
          {tags
            .filter(item => !!item.name)
            .map(({ name, count }) => (
              <Flex
                key={name}
                style={[styles.item, tag.includes(name) && styles.selected]}
              >
                <Text size={13}>{name}</Text>
                <Text style={_.ml.xs} type='sub' size={13}>
                  {count}
                </Text>
              </Flex>
            ))}
        </Flex>
      </Expand>
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
    backgroundColor: _.colorBg,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs
  },
  selected: {
    backgroundColor: _.colorPrimaryLight,
    borderColor: _.colorPrimaryBorder
  }
})
