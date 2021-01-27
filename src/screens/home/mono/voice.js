/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:54:09
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Heatmap } from '@components'
import { SectionTitle, Cover, Tag } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
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
        right={
          <>
            <SectionRight event={event} text='更多角色' to='Voices' />
            <Heatmap
              id='人物.跳转'
              data={{
                to: 'Voices',
                alias: '更多角色'
              }}
            />
          </>
        }
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
                  <Text style={_.mt.xs} bold size={12}>
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
            <Flex.Item style={_.ml.sm} flex={3.8}>
              <Flex align='start'>
                <Flex.Item>
                  <Text style={_.mt.xs} align='right' size={12}>
                    {item.subjectName}
                  </Text>
                  <Flex style={_.mt.xs} align='start'>
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
                  size={48}
                  height={62}
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
        <Heatmap
          id='人物.跳转'
          data={{
            from: '最近演出角色'
          }}
        />
      </View>
    </View>
  )
}

export default obc(Voice)

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
  }
}))
