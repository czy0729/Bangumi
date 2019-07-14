/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:48:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 00:54:34
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
  Text
} from '@components'
import { IOS } from '@constants'
import _ from '@styles'

const maxSize = _.window.width - _.wind * 2

const Info = (props, { $ }) => {
  const { title, content, cover } = $.groupInfo
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
            autoSize={maxSize}
            border
            shadow
            placholder={false}
            imageViewer
          />
        </Flex>
      )}
      {!!content && (
        <Expand style={_.mt.lg} ratio={0.64}>
          <RenderHtml html={content} />
        </Expand>
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
  }
})
