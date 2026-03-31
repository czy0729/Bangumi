/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:48:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 06:57:08
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
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
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Info() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <View style={styles.container}>
      <HeaderPlaceholder />
      <Text size={20} bold>
        {$.groupInfo.title || $.params._title}
      </Text>
      {!!$.groupThumb && (
        <Flex style={_.mt.md} justify='center'>
          <Image
            src={$.groupThumb}
            size={_.r(72)}
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
        <Expand style={_.mt.lg} ratio={0.56}>
          <RenderHtml
            html={`${$.groupInfo.content}<p style="font-size:13px;text-align:right;color:#999">${$.groupInfo.create}</p><br/>`}
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

export default observer(Info)
