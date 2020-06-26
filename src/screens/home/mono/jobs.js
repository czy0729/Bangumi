/*
 * @Author: czy0729
 * @Date: 2019-06-03 00:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 16:52:14
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { SectionTitle, Cover, Tag } from '@screens/_'
import { _ } from '@stores'
import { appNavigate, getCoverMedium } from '@utils/app'

const event = {
  id: '人物.跳转',
  data: {
    from: '出演'
  }
}

function Jobs({ style }, { $, navigation }) {
  if (!$.jobs.length) {
    return null
  }

  const styles = memoStyles()
  return (
    <View style={[styles.container, style]}>
      <SectionTitle>出演</SectionTitle>
      <View style={_.mt.md}>
        {$.jobs.map((item, index) => (
          <Flex
            key={item.href}
            style={[styles.item, index !== 0 && !_.flat && styles.border]}
            align='start'
          >
            <Flex.Item flex={3}>
              <Flex align='start'>
                <Cover
                  size={40}
                  src={item.cover}
                  radius
                  shadow
                  onPress={() =>
                    appNavigate(
                      item.href,
                      navigation,
                      {
                        _jp: item.name,
                        _cn: item.nameCn,
                        _image: item.cover
                      },
                      event
                    )
                  }
                />
                <Flex.Item style={_.ml.sm}>
                  <Flex align='start'>
                    <Text size={12} bold numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Tag style={styles.tag} value={item.staff} />
                  </Flex>
                  <Text
                    style={_.mt.xs}
                    size={10}
                    type='sub'
                    lineHeight={12}
                    bold
                  >
                    {item.nameCn}
                  </Text>
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item flex={2}>
              <Flex align='start'>
                <Flex.Item>
                  <Text style={_.mt.xs} size={12} align='right' bold>
                    {item.cast}
                  </Text>
                  {!!item.castTag && (
                    <Text style={_.mt.xs} size={10} type='sub' align='right'>
                      {item.castTag}
                    </Text>
                  )}
                </Flex.Item>
                {!!item.castCover && (
                  <Image
                    style={_.ml.sm}
                    size={40}
                    src={item.castCover}
                    radius
                    shadow
                    onPress={() =>
                      appNavigate(
                        item.castHref,
                        navigation,
                        {
                          _name: item.cast,
                          _image: getCoverMedium(item.castCover)
                        },
                        event
                      )
                    }
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
    paddingLeft: _.wind,
    paddingBottom: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  tag: {
    marginTop: 1,
    marginRight: _.sm,
    marginLeft: _.xs
  }
}))
