/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 预览图列表: 图片合并去重逻辑见 store/computed 的 images
 */
import { observer } from 'mobx-react'
import { Flex, Image, ScrollView, Text, Touchable } from '@components'
import { InView } from '@_'
import { _, useStore } from '@stores'
import { showImageViewer } from '@utils'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ImageProps } from '@components'
import type { Ctx } from '../../types'

function List() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const passProps: ImageProps = {
    fallback: true
  }

  if ($.isDouban) {
    passProps.autoSize = styles.item.width
  } else {
    passProps.width = styles.item.width
    passProps.height = styles.item.minHeight
  }

  return (
    <ScrollView style={_.mt.sm} contentContainerStyle={styles.container} onScroll={$.onScroll}>
      {$.images.map((item, index) => (
        <InView key={item} style={styles.item} y={styles.item.minHeight * (index + 1)}>
          <Touchable withoutFeedback onPress={() => showImageViewer($.viewerData, index)}>
            <Flex>
              <Image {...passProps} src={item} headers={$.displayHeaders} errorToHide />
            </Flex>
          </Touchable>
        </InView>
      ))}

      {!!(WEB && $.subjectId) && (
        <Touchable
          style={_.mt.lg}
          onPress={() => {
            navigation.push('Subject', {
              subjectId: $.subjectId
            })
          }}
        >
          <Text align='center' underline>
            返回条目
          </Text>
        </Touchable>
      )}
    </ScrollView>
  )
}

export default observer(List)
