/*
 * @Author: czy0729
 * @Date: 2019-06-02 23:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-12 02:02:26
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
    from: '最近参与'
  }
}

function Works({ style }, { $, navigation }) {
  if (!$.works.length) {
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
              appNavigate(`/${monoId}/works`, undefined, {}, event)
            }
          />
        }
      >
        最近参与
      </SectionTitle>
      <View style={_.mt.md}>
        {$.works.map((item, index) => (
          <Flex
            key={item.href}
            style={[styles.item, index !== 0 && styles.border]}
            align='start'
          >
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
              <Text bold>{item.name}</Text>
              <Flex style={_.mt.xs}>
                <Tag value={item.staff} />
              </Flex>
            </Flex.Item>
          </Flex>
        ))}
      </View>
    </View>
  )
}

Works.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Works)

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
