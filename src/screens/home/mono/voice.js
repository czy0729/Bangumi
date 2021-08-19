/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-19 09:26:39
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Heatmap } from '@components'
import { SectionTitle, Cover, Tag } from '@screens/_'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import SectionRight from './section-right'
import { coverWidth, coverHeight } from './jobs'

const event = {
  id: '人物.跳转',
  data: {
    from: '最近演出角色'
  }
}
const imgWidth = 40 * _.ratio
const defaultProps = {
  navigation: {},
  style: {},
  voices: []
}

const Voice = memo(({ navigation, style, voices }) => {
  rerender('Mono.Voice.Main')

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
        {voices.map(item => (
          <Flex key={item.href} style={styles.item} align='start'>
            <Flex.Item flex={2}>
              <Flex align='start'>
                <Image
                  size={imgWidth}
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
                <Flex.Item style={_.mr.sm}>
                  <Text style={_.mt.xs} align='right' size={12}>
                    {item.subjectName}
                  </Text>
                  <Flex style={_.mt.xs} align='start'>
                    <Flex.Item>
                      <Text size={10} type='sub' align='right' lineHeight={12} bold>
                        {item.subjectNameCn}
                      </Text>
                    </Flex.Item>
                    <Tag style={_.ml.xs} value={item.staff} />
                  </Flex>
                </Flex.Item>
                <Cover
                  size={coverWidth}
                  height={coverHeight}
                  src={item.subjectCover}
                  radius
                  shadow
                  onPress={() => appNavigate(item.subjectHref, navigation, {}, event)}
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
}, defaultProps)

export default obc(({ style }, { $, navigation }) => {
  rerender('Mono.Voice')

  if (!$.voices.length) return null

  return <Voice navigation={navigation} style={style} voices={$.voices} />
})

const styles = _.create({
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
  }
})
