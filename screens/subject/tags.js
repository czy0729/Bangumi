/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 00:34:31
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Flex, Text, Touchable } from '@components'
import { SectionTitle } from '@screens/_'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'

function Tags({ style }, { $, navigation }) {
  const { type } = $.subject
  const { tags = [] } = $.subjectFormHTML
  const { tag = [] } = $.collection
  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle>标签</SectionTitle>
      {!!tags.length && (
        <Expand style={_.mt.sm}>
          <Flex wrap='wrap'>
            {tags
              .filter(item => !!item.name)
              .map(({ name, count }, index) => (
                <Touchable
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={[styles.item, tag.includes(name) && styles.selected]}
                  onPress={() => {
                    navigation.push('Tag', {
                      type: MODEL_SUBJECT_TYPE.getLabel(type),
                      tag: name
                    })
                  }}
                >
                  <Flex>
                    <Text size={13}>{name}</Text>
                    <Text style={_.ml.xs} type='sub' size={13}>
                      {count}
                    </Text>
                  </Flex>
                </Touchable>
              ))}
          </Flex>
        </Expand>
      )}
    </View>
  )
}

Tags.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Tags)

const styles = StyleSheet.create({
  container: {
    minHeight: 120
  },
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
