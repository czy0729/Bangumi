/*
 * @Author: czy0729
 * @Date: 2020-05-04 17:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 21:25:53
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Touchable, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'

function Tags(props, { $, navigation }) {
  const styles = memoStyles()
  const { tags } = $.channel
  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>标签</SectionTitle>
      <Flex style={styles.container} wrap='wrap'>
        {tags.map(item => (
          <Touchable
            key={item}
            style={styles.tag}
            onPress={() => {
              t('频道.跳转', {
                to: 'Tag',
                from: 'tags',
                type: $.type,
                tag: item
              })

              navigation.push('Tag', {
                type: $.type,
                tag: item
              })
            }}
          >
            <Text type='desc' size={13}>
              {item}
            </Text>
          </Touchable>
        ))}
      </Flex>
    </View>
  )
}

Tags.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Tags)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingHorizontal: _.wind,
    marginTop: 12
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 12,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs
  }
}))
