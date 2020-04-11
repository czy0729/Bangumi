/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-12 02:01:32
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { SectionTitle, Tag, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'

const event = {
  id: '人物.跳转',
  data: {
    from: '最近演出角色'
  }
}

function Voice({ style }, { $, navigation }) {
  if (!$.voices.length) {
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
            onPress={() =>
              appNavigate(`/${monoId}/works/voice`, undefined, {}, event)
            }
          />
        }
      >
        最近演出角色
      </SectionTitle>
      <View style={_.mt.md}>
        {$.voices.map((item, index) => (
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
                  <Text style={_.mt.xs} bold>
                    {item.name}
                  </Text>
                  {!!item.nameCn && (
                    <Text style={_.mt.xs} size={13} type='sub'>
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
                      <Text
                        size={13}
                        type='sub'
                        align='right'
                        lineHeight={14}
                        bold
                      >
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
                  onPress={() =>
                    appNavigate(item.subjectHref, navigation, {}, event)
                  }
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
