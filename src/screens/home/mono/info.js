/*
 * @Author: czy0729
 * @Date: 2019-05-11 17:19:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-20 22:55:16
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
import { obc } from '@utils/decorators'
import { getCoverLarge } from '@utils/app'
import { t } from '@utils/fetch'
import Content from './content'
import Detail from './detail'
import Voice from './voice'
import Works from './works'
import Jobs from './jobs'

function Info(props, { $, navigation }) {
  rerender('Mono.Info')

  const styles = memoStyles()
  const maxSize = _.window.contentWidth * 0.5 * _.ratio
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
        {!!$.cover && (
          <Flex style={_.mt.md} justify='center'>
            <Image
              src={getCoverLarge($.cover)}
              autoSize={maxSize}
              shadow
              placholder={false}
              imageViewer
              event={{
                id: '人物.封面图查看',
                data: {
                  monoId: $.monoId
                }
              }}
            />
            <Heatmap id='人物.封面图查看' />
          </Flex>
        )}
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

              const type = $.monoId.includes('character/') ? 'crt' : 'prsn'
              navigation.push('Topic', {
                topicId: `${type}/${($.monoId || '').match(/\d+/g)[0]}`
              })
            }}
          >
            <Flex>
              <Text type='sub'>去吐槽</Text>
              <Iconfont name='md-navigate-next' />
            </Flex>
            <Heatmap
              id='人物.跳转'
              data={{
                from: '去吐槽'
              }}
            />
            <Heatmap
              right={66}
              id='人物.跳转'
              data={{
                to: 'Topic',
                alias: '帖子'
              }}
              transparent
            />
          </Touchable>
        }
      >
        吐槽
      </SectionTitle>
    </>
  )
}

export default obc(Info)

const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.window.height * 0.56,
    ..._.container.inner
  },
  loading: {
    minHeight: _.window.height * 0.48
  },
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginBottom: _.md
  },
  touch: {
    paddingHorizontal: _.xs,
    marginRight: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touchTopic: {
    paddingLeft: _.xs,
    marginRight: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
