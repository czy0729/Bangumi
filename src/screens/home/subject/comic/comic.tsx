/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-21 01:27:56
 */
import React from 'react'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList, InView } from '@_'
import { _ } from '@stores'
import { truncateMiddle } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import { IOS } from '@constants'
import { COVER_WIDTH, COVER_HEIGHT, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(({ navigation, subjectId, comic }) => {
  rerender('Subject.Comic.Main')

  return (
    <InView style={styles.container}>
      <SectionTitle style={_.container.wind}>单行本</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={comic.map(item => ({
          ...item,
          // iOS 文字组件是可以原生中间省略的
          name: IOS ? item.name : truncateMiddle(item.name, 20)
        }))}
        width={COVER_WIDTH}
        height={COVER_HEIGHT}
        ellipsizeMode='middle'
        initialRenderNums={_.device(
          Math.floor(_.window.contentWidth / COVER_WIDTH) + 1,
          6
        )}
        onPress={({ id, name, image }, type) => {
          t('条目.跳转', {
            to: 'Subject',
            from: '单行本',
            subjectId
          })
          navigation.push('Subject', {
            subjectId: id,
            _jp: name,
            _image: image,
            _type: type
          })
        }}
      />
      <Heatmap id='条目.跳转' from='单行本' />
    </InView>
  )
}, DEFAULT_PROPS)
