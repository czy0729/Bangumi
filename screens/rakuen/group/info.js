/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:48:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-24 02:55:47
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
import { IOS } from '@constants'
import _ from '@styles'

function Info(props, { $ }) {
  const { title, content, cover, create, _loaded } = $.groupInfo
  return (
    <View style={[_.container.inner, styles.container]}>
      {!IOS && <HeaderPlaceholder />}
      <Text size={20} bold>
        {title}
      </Text>
      {!!cover && (
        <Flex style={_.mt.md} justify='center'>
          <Image
            src={cover}
            size={80}
            border
            shadow
            placholder={false}
            imageViewer
          />
        </Flex>
      )}
      {!!content && (
        <Expand style={_.mt.lg} ratio={0.64}>
          <RenderHtml
            html={`${content}<p style="text-align:right;font-size:12px;line-height:16px;color:#999">${create}</p><br/>`}
          />
        </Expand>
      )}
      {!_loaded && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
    </View>
  )
}

Info.contextTypes = {
  $: PropTypes.object
}

export default observer(Info)

const styles = StyleSheet.create({
  container: {
    minHeight: 328
  },
  loading: {
    height: 200
  }
})
