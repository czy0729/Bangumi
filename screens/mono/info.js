/*
 * @Author: czy0729
 * @Date: 2019-05-11 17:19:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-26 21:57:27
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import {
  Flex,
  Text,
  Image,
  HeaderPlaceholder,
  RenderHtml,
  Divider
} from '@components'
import { SectionTitle } from '@screens/_'
import { IOS } from '@constants'
import _ from '@styles'

const maxSize = _.window.width - _.wind * 2

const Info = (props, { $ }) => {
  const { name, nameCn, cover, info, detail } = $.mono
  const { _name, _image } = $.params
  return (
    <>
      {!IOS && <HeaderPlaceholder />}
      <View style={_.container.inner}>
        <Flex align='baseline'>
          <Text size={20} bold>
            {name}
          </Text>
          <Text style={_.ml.xs} type='sub'>
            {nameCn || _name}
          </Text>
        </Flex>
        {!!cover && (
          <Flex style={_.mt.md} justify='center'>
            <Image
              src={cover || _image}
              autoSize={maxSize}
              border
              shadow
              placholder={false}
              imageViewer
            />
          </Flex>
        )}
        {!!info && <RenderHtml style={[styles.info, _.mt.md]} html={info} />}
        {!!detail && <RenderHtml style={_.mt.lg} html={detail} />}
      </View>
      <Divider />
      <SectionTitle style={[styles.title, _.mt.lg, _.mb.md]}>
        吐槽箱
      </SectionTitle>
    </>
  )
}

Info.contextTypes = {
  $: PropTypes.object
}

export default observer(Info)

const styles = StyleSheet.create({
  info: {
    paddingHorizontal: _.wind
  },
  title: {
    paddingHorizontal: _.wind
  }
})
