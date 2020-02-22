/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-22 09:44:56
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import {
  HeaderPlaceholder,
  RenderHtml,
  Expand,
  Flex,
  Image,
  Text,
  Loading
} from '@components'
import { _ } from '@stores'
import { getCoverLarge } from '@utils/app'
import { t } from '@utils/fetch'
import { IOS } from '@constants'

function Info(props, { $, navigation }) {
  const {
    title,
    avatar,
    content,
    progress,
    nickname,
    userId,
    time,
    _loaded
  } = $.catalogDetail
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
            size={80}
            border
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
        </Flex>
      )}
      {!!content && (
        <Expand style={_.mt.md} ratio={0.64}>
          <RenderHtml html={content} />
        </Expand>
      )}
      <Flex style={_.mt.md}>
        <Flex.Item>
          <Text type='sub'>进度 {progress}</Text>
        </Flex.Item>
        <Text
          type='sub'
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
          by {nickname} / {time}
        </Text>
      </Flex>
      {!_loaded && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
    </View>
  )
}

Info.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Info)

const styles = StyleSheet.create({
  container: {
    ..._.container.inner,
    minHeight: 248
  },
  loading: {
    height: 120
  }
})
