/*
 * @Author: czy0729
 * @Date: 2019-05-11 17:19:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 21:31:23
 */
import React from 'react'
import { View } from 'react-native'
import {
  Flex,
  Text,
  Image,
  HeaderPlaceholder,
  Divider,
  Touchable,
  Iconfont,
  Heatmap
} from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { getCoverLarge } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS, API_MONO_COVER } from '@constants'
import { TopicId } from '@types'
import Content from '../content'
import Detail from '../detail'
import Voice from '../voice'
import Works from '../works'
import Jobs from '../jobs'
import Collabs from '../collabs'
import Collected from '../collected'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Info(props, { $, navigation }: Ctx) {
  // global.rerender('Mono.Info')

  const styles = memoStyles()
  const maxSize = _.r(_.window.contentWidth * 0.5)
  const isCharacter = $.monoId.includes('character/')

  // 安卓端 autoSize 对 API 不起作用
  const src = IOS
    ? API_MONO_COVER($.id, 'large', isCharacter ? 'characters' : 'persons')
    : getCoverLarge($.cover)

  const { _count } = $.params
  return (
    <>
      <HeaderPlaceholder />
      <View style={styles.container}>
        <Flex wrap='wrap'>
          <Text size={20} bold>
            {$.nameTop}{' '}
          </Text>
          <Text type='sub' lineHeight={20} bold>
            {$.nameBottom}
          </Text>
        </Flex>
        <Flex style={_.mt.md} justify='center'>
          <Image
            key={src}
            src={src}
            autoSize={maxSize}
            shadow
            imageViewer
            fallback
            event={{
              id: '人物.封面图查看',
              data: {
                monoId: $.monoId
              }
            }}
          />
          <Heatmap id='人物.封面图查看' />
        </Flex>
        <Content />
        <Detail />
        {!!$.cn && (
          <Flex style={_.mt.lg} justify='end'>
            <Touchable style={styles.touch} onPress={$.onMore}>
              <Flex>
                <Text style={_.ml.sm} type='sub'>
                  更多资料
                </Text>
                <Iconfont
                  style={_.ml.xs}
                  name='md-open-in-new'
                  color={_.colorSub}
                  size={16}
                />
              </Flex>
            </Touchable>
          </Flex>
        )}
      </View>
      <Divider />
      <Voice style={_.mt.md} />
      <Works style={_.mt.md} />
      <Jobs style={_.mt.md} />
      <Collabs style={_.mt.md} />
      <Collected style={_.mt.md} />
      <SectionTitle
        style={styles.title}
        right={
          <Touchable
            style={styles.touchTopic}
            onPress={() => {
              t('人物.跳转', {
                to: 'Topic',
                from: '去吐槽',
                monoId: $.monoId
              })

              const type = isCharacter ? 'crt' : 'prsn'
              navigation.push('Topic', {
                topicId: `${type}/${($.monoId || '').match(/\d+/g)[0]}` as TopicId
              })
            }}
          >
            <Flex>
              <Text type='sub'>去吐槽</Text>
              <Iconfont name='md-navigate-next' />
            </Flex>
            <Heatmap id='人物.跳转' from='去吐槽' />
            <Heatmap right={66} id='人物.跳转' to='Topic' alias='帖子' transparent />
          </Touchable>
        }
      >
        吐槽{' '}
        {!!_count && (
          <Text size={12} type='sub' lineHeight={24}>
            {_count}+
          </Text>
        )}
      </SectionTitle>
    </>
  )
}

export default obc(Info)
