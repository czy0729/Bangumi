/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-07 01:21:13
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { SectionTitle, Tag, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'

function Voice({ style }, { $, navigation }) {
  const { voice = [] } = $.mono
  if (!voice.length) {
    return null
  }

  const styles = memoStyles()
  const { monoId } = $.params
  return (
    <View style={[styles.container, style]}>
      <SectionTitle
        right={
          <IconHeader
            name='right'
            color={_.title}
            onPress={() => appNavigate(`/${monoId}/works/voice`)}
          />
        }
      >
        最近演出角色
      </SectionTitle>
      <View style={_.mt.md}>
        {voice.map((item, index) => (
          <Flex
            key={item.href}
            style={[styles.item, index !== 0 && styles.border]}
            align='start'
          >
            <Flex.Item flex={2}>
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
                  {!!item.nameCn && (
                    <Text style={_.mt.xs} size={12} type='sub'>
                      {item.nameCn}
                    </Text>
                  )}
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item style={_.ml.md} flex={3}>
              <Flex align='start'>
                <Flex.Item>
                  <Text style={_.mt.xs} align='right'>
                    {item.subjectName}
                  </Text>
                  <Flex style={_.mt.xs} align='start'>
                    <Flex.Item>
                      <Text size={12} type='sub' align='right' lineHeight={14}>
                        {item.subjectNameCn}
                      </Text>
                    </Flex.Item>
                    <Tag style={_.ml.xs} value={item.staff} />
                  </Flex>
                </Flex.Item>
                <Image
                  style={_.ml.sm}
                  size={48}
                  src={item.subjectCover}
                  radius
                  border={_.colorBorder}
                  onPress={() => appNavigate(item.subjectHref, navigation)}
                />
              </Flex>
            </Flex.Item>
          </Flex>
        ))}
      </View>
    </View>
  )
}

Voice.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Voice)

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
