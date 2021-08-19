/*
 * @Author: czy0729
 * @Date: 2019-06-02 23:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-19 09:47:05
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Heatmap } from '@components'
import { SectionTitle, Cover, Tag } from '@screens/_'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { appNavigate, findSubjectCn } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import SectionRight from './section-right'
import { coverWidth, coverHeight } from './jobs'

const event = {
  id: '人物.跳转',
  data: {
    from: '最近参与'
  }
}
const defaultProps = {
  navigation: {},
  style: {},
  works: []
}

const Works = memo(({ navigation, style, works }) => {
  rerender('Mono.Works.Main')

  return (
    <View style={[styles.container, style]}>
      <SectionTitle
        style={styles.section}
        right={
          <>
            <SectionRight event={event} text='更多作品' to='Works' />
            <Heatmap
              id='人物.跳转'
              data={{
                to: 'Works',
                alias: '更多作品'
              }}
            />
          </>
        }
      >
        最近参与
      </SectionTitle>
      <View style={_.mt.md}>
        {works.map(item => (
          <Flex key={item.href} style={styles.item} align='start'>
            <Cover
              size={coverWidth}
              height={coverHeight}
              src={item.cover}
              radius
              shadow
              type={MODEL_SUBJECT_TYPE.getTitle(item.type)}
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
            <Flex.Item style={styles.content}>
              <Flex align='start'>
                <Flex.Item>
                  <Text style={styles.text} bold size={12}>
                    {findSubjectCn(item.name)}
                  </Text>
                </Flex.Item>
                <Tag style={styles.tag} value={item.staff} />
              </Flex>
            </Flex.Item>
          </Flex>
        ))}
        <Heatmap
          id='人物.跳转'
          data={{
            from: '最近参与'
          }}
        />
      </View>
    </View>
  )
}, defaultProps)

export default obc(({ style }, { $, navigation }) => {
  rerender('Mono.Works')

  if (!$.works.length) return null

  return <Works navigation={navigation} style={style} works={$.works} />
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
  },
  content: {
    marginLeft: _.sm + 4
  },
  text: {
    width: '66%',
    marginTop: _.xs
  },
  tag: {
    marginTop: 2,
    marginLeft: _.xs
  }
})
