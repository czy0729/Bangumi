/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 16:52:24
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { SectionTitle, Cover, Tag } from '@screens/_'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'
import SectionRight from './section-right'

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
  return (
    <View style={[styles.container, style]}>
      <SectionTitle
        style={styles.section}
        right={<SectionRight event={event} text='更多角色' to='Voices' />}
      >
        最近演出角色
      </SectionTitle>
      <View style={_.mt.md}>
        {$.voices.map((item, index) => (
          <Flex
            key={item.href}
            style={[styles.item, index !== 0 && !_.flat && styles.border]}
            align='start'
          >
            <Flex.Item flex={2}>
              <Flex align='start'>
                <Image
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
                  <Text bold size={12}>
                    {item.name}
                  </Text>
                  {!!item.nameCn && (
                    <Text style={_.mt.xs} size={10} type='sub'>
                      {item.nameCn}
                    </Text>
                  )}
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item style={_.ml.sm} flex={3.2}>
              <Flex align='start'>
                <Flex.Item>
                  <Text align='right' size={12}>
                    {item.subjectName}
                  </Text>
                  <Flex style={styles.mt}>
                    <Flex.Item>
                      <Text
                        size={10}
                        type='sub'
                        align='right'
                        lineHeight={12}
                        bold
                      >
                        {item.subjectNameCn}
                      </Text>
                    </Flex.Item>
                    <Tag style={_.ml.xs} value={item.staff} />
                  </Flex>
                </Flex.Item>
                <Cover
                  style={_.ml.sm}
                  size={40}
                  src={item.subjectCover}
                  radius
                  shadow
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
    paddingLeft: _.wind,
    paddingBottom: _.md
  },
  section: {
    paddingRight: _.wind - _._wind
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  mt: {
    marginTop: 2
  }
}))
