/*
 * @Author: czy0729
 * @Date: 2020-05-04 17:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:40:50
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
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

export default obc(Tags)

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
