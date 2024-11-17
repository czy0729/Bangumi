/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:48:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:40:17
 */
import React from 'react'
import { View } from 'react-native'
import {
  Expand,
  Flex,
  HeaderPlaceholder,
  Heatmap,
  Image,
  Loading,
  RenderHtml,
  Text
} from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Info() {
  const { $ } = useStore<Ctx>()
  return (
    <View style={[styles.container, _.container.inner]}>
      <HeaderPlaceholder />
      <Text size={20} bold>
        {$.groupInfo.title || $.params._title}
      </Text>
      {!!$.groupThumb && (
        <Flex style={_.mt.md} justify='center'>
          <Image
            src={$.groupThumb}
            size={_.r(80)}
            shadow
            placeholder={false}
            imageViewer
            event={{
              id: '小组.封面图查看',
              data: {
                groupId: $.groupId
              }
            }}
          />
          <Heatmap id='小组.封面图查看' />
        </Flex>
      )}
      {!!$.groupInfo.content && (
        <Expand style={_.mt.lg} ratio={0.64}>
          <RenderHtml
            html={`${$.groupInfo.content}<p style="text-align:right;color:#999">${$.groupInfo.create}</p><br/>`}
          />
        </Expand>
      )}
      {!$.groupInfo._loaded && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
    </View>
  )
}

export default ob(Info, COMPONENT)
