/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 15:56:46
 */
import React from 'react'
import { View } from 'react-native'
import {
  Header,
  RenderHtml,
  Expand,
  Flex,
  Image,
  Text,
  Loading,
  SegmentedControl,
  Button,
  Heatmap,
  Touchable
} from '@components'
import { _ } from '@stores'
import { getCoverLarge, appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'
import { HOST } from '@constants'

const LAYOUT_DS = ['列表', '网格'] as const

const SORT_DS = ['默认', '时间', '评分'] as const

function Info(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { sort } = $.state
  const {
    title,
    avatar,
    content,
    progress,
    nickname,
    userId,
    time,
    replyCount,
    _loaded
  } = $.catalogDetail
  const replyText = replyCount == 5 ? `5+` : replyCount
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
              {time}
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
            <RenderHtml
              html={content}
              onLinkPress={href => appNavigate(href, navigation)}
            />
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
          <Text type='sub' size={12} bold>
            完成度{'  '}
            {progress.replace('/', ' / ')}
          </Text>
        </Flex>
        <Flex style={_.mt.lg}>
          <Flex.Item>
            <Button
              style={styles.btn}
              styleText={_.fontSize11}
              type='plain'
              bold
              onPress={$.fetchSubjectsQueue}
            >
              更新分数
            </Button>
          </Flex.Item>
          {$.state._loaded && (
            <>
              <SegmentedControl
                style={styles.layout}
                size={11}
                values={LAYOUT_DS}
                selectedIndex={$.isList ? 0 : 1}
                onValueChange={$.switchLayout}
              />
              <SegmentedControl
                style={styles.sort}
                size={11}
                values={SORT_DS}
                selectedIndex={sort || 0}
                onValueChange={$.sort}
              />
              <Heatmap id='目录详情.排序' />
            </>
          )}
        </Flex>
      </View>
      {!_loaded && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
    </View>
  )
}

export default obc(Info)
