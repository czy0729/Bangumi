/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-19 04:38:07
 */
import React from 'react'
import { View } from 'react-native'
import {
  Expand,
  Flex,
  Header,
  Heatmap,
  Image,
  Loading,
  RenderHtml,
  Text,
  Touchable
} from '@components'
import { _, userStore } from '@stores'
import { appNavigate, getCoverLarge } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const catalogDetail = $.catalogDetail.title ? $.catalogDetail : $.catalogDetailFromOSS
  const { title, avatar, content, progress, nickname, userId, time, replyCount, _loaded } =
    catalogDetail
  const replyText = replyCount == 5 ? '5+' : replyCount
  return (
    <View style={styles.container}>
      <Header.Placeholder />
      <View style={_.container.inner}>
        <Text size={20} bold>
          {title}
        </Text>
        {!!(nickname || time) && (
          <Flex style={_.mt.sm}>
            <Text
              type='title'
              size={13}
              lineHeight={15}
              bold
              onPress={() => {
                t('目录详情.跳转', {
                  to: 'Zone',
                  catalogId: $.catalogId,
                  userId
                })

                navigation.push('Zone', {
                  userId,
                  _id: userId,
                  _name: nickname,
                  _image: avatar
                })
              }}
            >
              {nickname}
            </Text>
            <Text type='sub' size={13} lineHeight={15} bold>
              {nickname ? ` · ` : ''}
              {String(time).replace(/\n/g, '')}
            </Text>
          </Flex>
        )}
        {!!avatar && (
          <Flex style={_.mt.lg} justify='center'>
            <Image
              src={getCoverLarge(avatar)}
              size={_.r(80)}
              shadow
              placeholder={false}
              imageViewer
              event={{
                id: '目录详情.封面图查看',
                data: {
                  catalogId: $.catalogId
                }
              }}
            />
            <Heatmap id='目录详情.封面图查看' />
          </Flex>
        )}
        {!!content && (
          <Expand style={_.mt.lg} ratio={0.64}>
            <RenderHtml html={content} onLinkPress={href => appNavigate(href, navigation)} />
          </Expand>
        )}
        <Flex style={_.mt.md}>
          <Flex.Item>
            <Flex>
              <Touchable
                onPress={() => {
                  navigation.push('WebBrowser', {
                    url: `${HOST}/index/${$.catalogId}/comments`,
                    title: '目录留言'
                  })

                  t('目录详情.跳转', {
                    to: 'WebBrowser',
                    catalogId: $.catalogId,
                    userId
                  })
                }}
              >
                <Text type='sub' size={12} bold>
                  留言{replyText ? ` (${replyText})` : ''}
                </Text>
              </Touchable>
              <Text type='sub' size={12} bold>
                {' '}
                ·{' '}
              </Text>
              <Touchable
                onPress={() => {
                  navigation.push('Catalogs', {
                    userId
                  })

                  t('目录详情.跳转', {
                    to: 'Catalogs',
                    catalogId: $.catalogId,
                    userId
                  })
                }}
              >
                <Text type='sub' size={12} bold>
                  TA 的其他目录
                </Text>
              </Touchable>
            </Flex>
          </Flex.Item>
          {userStore.isLogin && (
            <Text type='sub' size={12} bold>
              完成度{'  '}
              {String(progress).replace('/', ' / ')}
            </Text>
          )}
        </Flex>
        <View style={_.mt.lg}>
          <ToolBar />
          <Heatmap id='目录详情.排序' />
        </View>
      </View>
      {!_loaded && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
    </View>
  )
}

export default obc(Info, COMPONENT)
