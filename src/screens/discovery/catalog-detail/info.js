/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-30 19:49:05
 */
import React from 'react'
import { View } from 'react-native'
import {
  HeaderPlaceholder,
  RenderHtml,
  Expand,
  Flex,
  Image,
  Text,
  Loading,
  SegmentedControl,
  Button,
  Heatmap
} from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { getCoverLarge } from '@utils/app'
import { t } from '@utils/fetch'
import { IOS } from '@constants'

const sortDS = ['默认', '时间', '评分']

function Info(props, { $, navigation }) {
  const { sort } = $.state
  const { title, avatar, content, progress, nickname, userId, time, _loaded } =
    $.catalogDetail
  return (
    <View style={styles.container}>
      {!IOS && <HeaderPlaceholder />}
      <Text size={20} bold>
        {title}
      </Text>
      {!!avatar && (
        <Flex style={_.mt.md} justify='center'>
          <Image
            src={getCoverLarge(avatar)}
            size={80 * _.ratio}
            shadow
            placholder={false}
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
        <Expand style={_.mt.md} ratio={0.64}>
          <RenderHtml html={content} />
        </Expand>
      )}
      <Flex style={_.mt.md}>
        <Flex.Item>
          <Text type='sub' size={12}>
            by{' '}
            <Text
              type='title'
              size={12}
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
            </Text>{' '}
            / {time}
          </Text>
        </Flex.Item>
        <Text type='sub' size={12}>
          进度 {progress.replace('/', ' / ')}
        </Text>
      </Flex>
      <Flex style={_.mt.lg}>
        <Flex.Item>
          <Button
            style={styles.btn}
            styleText={_.fontSize11}
            size='mini'
            type='plain'
            onPress={$.fetchSubjectQueue}
          >
            更新分数
          </Button>
        </Flex.Item>
        <SegmentedControl
          style={styles.segmentedControl}
          size={11}
          values={sortDS}
          selectedIndex={sort || 0}
          onValueChange={$.sort}
        />
        <Heatmap id='目录详情.排序' />
      </Flex>
      {!_loaded && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
    </View>
  )
}

export default obc(Info)

const styles = _.create({
  container: {
    ..._.container.inner,
    minHeight: 248
  },
  segmentedControl: {
    width: 144 * _.ratio,
    height: 22 * _.ratio
  },
  loading: {
    height: 120
  },
  btn: {
    width: 82 * _.ratio,
    height: 22 * _.ratio
  }
})
