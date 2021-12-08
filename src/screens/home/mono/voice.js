/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 07:34:08
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Image, Text, Heatmap } from '@components'
import { SectionTitle, Cover, Tag } from '@screens/_'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { appNavigate, cnjp } from '@utils/app'
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
  styles: {},
  style: {},
  voices: []
}

const Voice = memo(({ navigation, styles, style, voices }) => {
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
        {voices.map(item => {
          const nameTop = cnjp(item.nameCn, item.name)
          const nameBottom = cnjp(item.name, item.nameCn)
          const onPress = () =>
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

          const subjectTop = cnjp(item.subjectNameCn, item.subjectName)
          const subjectBottom = cnjp(item.subjectName, item.subjectNameCn)
          const onPressSubject = () =>
            appNavigate(item.subjectHref, navigation, {}, event)
          return (
            <Flex key={item.href} style={styles.item} align='start'>
              <Flex flex={1} align='start'>
                <Image
                  src={item.cover}
                  size={imgWidth}
                  radius
                  shadow
                  onPress={onPress}
                />
                <Flex.Item style={_.ml.sm}>
                  <Touchable style={_.mt.xs} onPress={onPress}>
                    <Text size={12} bold>
                      {nameTop}
                    </Text>
                    {!!nameBottom && nameBottom !== nameTop && (
                      <Text style={_.mt.xs} size={10} type='sub' bold>
                        {nameBottom}
                      </Text>
                    )}
                  </Touchable>
                  <Flex style={_.mt.xs}>
                    <Tag value={item.staff} />
                  </Flex>
                </Flex.Item>
              </Flex>
              <Flex style={_.ml.md} flex={1.44} align='start'>
                <Flex.Item>
                  <Touchable style={_.mt.xs} onPress={onPressSubject}>
                    <Text size={12} align='right' bold>
                      {subjectTop}
                    </Text>
                    {!!subjectBottom && subjectBottom !== subjectTop && (
                      <Text style={_.mt.xs} size={10} type='sub' align='right'>
                        {subjectBottom}
                      </Text>
                    )}
                  </Touchable>
                </Flex.Item>
                {!!item.subjectCover && (
                  <Cover
                    style={_.ml.sm}
                    src={item.subjectCover}
                    size={coverWidth * 0.88}
                    height={coverHeight * 0.88}
                    radius
                    shadow
                    onPress={onPressSubject}
                  />
                )}
              </Flex>
            </Flex>
          )
        })}
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

  return (
    <Voice
      styles={memoStyles()}
      navigation={navigation}
      style={style}
      voices={$.voices}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
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
}))
