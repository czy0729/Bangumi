/*
 * @Author: czy0729
 * @Date: 2019-05-11 17:19:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 13:25:33
 */
import React from 'react'
import { View } from 'react-native'
import {
  Flex,
  Katakana,
  Text,
  Image,
  HeaderPlaceholder,
  RenderHtml,
  Divider,
  Touchable,
  Iconfont,
  Heatmap
} from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { getCoverLarge } from '@utils/app'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import Voice from './voice'
import Works from './works'
import Jobs from './jobs'

const maxSize = (_.window.width - 2 * _.wind) * 0.5

function Info(props, { $, navigation }) {
  const { collectUrl, eraseCollectUrl } = $.mono
  return (
    <>
      {!IOS && <HeaderPlaceholder />}
      <View style={styles.container}>
        <Flex align='start'>
          <Flex.Item>
            <Flex align='baseline'>
              <Katakana.Provider size={20}>
                <Katakana size={20} bold>
                  {$.jp}
                </Katakana>
                {$.jp !== $.cn && (
                  <Text type='sub' lineHeight={20} bold>
                    {' '}
                    {$.cn}
                  </Text>
                )}
              </Katakana.Provider>
            </Flex>
          </Flex.Item>
          {!!collectUrl && (
            <Touchable style={_.ml.sm} onPress={$.doCollect}>
              <Flex>
                <Iconfont size={14} name='like' color={_.colorMain} />
                <Text style={_.ml.xs} lineHeight={22} type='sub'>
                  收藏
                </Text>
              </Flex>
              <Heatmap id='人物.收藏人物' />
              <Heatmap right={52} id='人物.取消收藏人物' transparent />
            </Touchable>
          )}
          {!!eraseCollectUrl && (
            <Touchable style={_.ml.sm} onPress={$.doEraseCollect}>
              <Flex>
                <Iconfont size={14} name='like-full' color={_.colorDanger} />
                <Text style={_.ml.xs} type='danger'>
                  已收藏
                </Text>
              </Flex>
              <Heatmap id='人物.取消收藏人物' />
            </Touchable>
          )}
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
        {!!$.info && <RenderHtml style={styles.info} html={$.info} />}
        {!!$.detail && <RenderHtml style={_.mt.lg} html={$.detail} />}
      </View>
      <Divider />
      <Voice style={_.mt.md} />
      <Works style={_.mt.md} />
      <Jobs style={_.mt.md} />
      <SectionTitle
        style={styles.title}
        right={
          <Touchable
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
              <Iconfont name='right' size={16} />
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

const styles = _.create({
  container: {
    minHeight: _.window.height * 0.56,
    ..._.container.inner
  },
  loading: {
    minHeight: _.window.height * 0.48
  },
  info: {
    paddingHorizontal: _.xs,
    marginTop: _.md
  },
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginBottom: _.md
  }
})
