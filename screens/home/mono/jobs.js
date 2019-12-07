/*
 * @Author: czy0729
 * @Date: 2019-06-03 00:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-07 01:16:53
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { SectionTitle, Tag } from '@screens/_'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'

function Jobs({ style }, { $, navigation }) {
  const { jobs = [] } = $.mono
  if (!jobs.length) {
    return null
  }

  const styles = memoStyles()
  return (
    <View style={[styles.container, style]}>
      <SectionTitle>出演</SectionTitle>
      <View style={_.mt.md}>
        {jobs.map((item, index) => (
          <Flex
            key={item.href}
            style={[styles.item, index !== 0 && styles.border]}
            align='start'
          >
            <Flex.Item flex={3}>
              <Flex align='start'>
                <Image
                  size={48}
                  src={item.cover}
                  radius
                  border={_.colorBorder}
                  onPress={() => appNavigate(item.href, navigation)}
                />
                <Flex.Item style={_.ml.sm}>
                  <Text style={_.mt.xs}>{item.name}</Text>
                  <Flex style={_.mt.xs} align='start'>
                    <Tag value={item.staff} />
                    <Text style={_.ml.xs} size={12} type='sub' lineHeight={14}>
                      {item.nameCn}
                    </Text>
                  </Flex>
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item style={_.ml.md} flex={2}>
              <Flex align='start'>
                <Flex.Item>
                  <Text style={_.mt.xs} align='right'>
                    {item.cast}
                  </Text>
                  {!!item.castTag && (
                    <Text style={_.mt.xs} size={12} type='sub' align='right'>
                      {item.castTag}
                    </Text>
                  )}
                </Flex.Item>
                {!!item.castCover && (
                  <Image
                    style={_.ml.sm}
                    size={48}
                    src={item.castCover}
                    radius
                    border={_.colorBorder}
                    onPress={() => appNavigate(item.castHref, navigation)}
                  />
                )}
              </Flex>
            </Flex.Item>
          </Flex>
        ))}
      </View>
    </View>
  )
}

Jobs.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Jobs)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
