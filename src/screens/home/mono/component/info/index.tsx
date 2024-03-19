/*
 * @Author: czy0729
 * @Date: 2019-05-11 17:19:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-19 19:40:32
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, HeaderPlaceholder, Heatmap, Iconfont, Text, Touchable } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TopicId } from '@types'
import { Ctx } from '../../types'
import Collabs from '../collabs'
import Collected from '../collected'
import Content from '../content'
import Cover from '../cover'
import Detail from '../detail'
import Jobs from '../jobs'
import Voice from '../voice'
import Works from '../works'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const isCharacter = $.monoId.includes('character/')
  const { _count } = $.params
  return (
    <View style={styles.info}>
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
        <Cover thumb={$.thumb} src={$.cover} monoId={$.monoId} />
        <Content />
        <Detail />
        {!!$.cn && (
          <Flex style={_.mt.lg} justify='end'>
            <Touchable style={styles.touch} onPress={$.onMore}>
              <Flex>
                <Text style={_.ml.sm} type='sub'>
                  更多资料
                </Text>
                <Iconfont style={_.ml.xs} name='md-open-in-new' color={_.colorSub} size={16} />
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
    </View>
  )
}

export default obc(Info, COMPONENT)
