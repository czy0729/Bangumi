/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:32:30
 */
import React from 'react'
import { Heatmap, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { truncateMiddle } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_ARRAY, IOS } from '@constants'
import { TITLE_COMIC } from '../../ds'
import IconRelation from '../icon/relation'
import { COMPONENT_MAIN, COVER_HEIGHT, COVER_WIDTH, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Comic = memo(
  ({ navigation, subjectId = 0, comic = FROZEN_ARRAY }) => {
    return (
      <InView style={styles.container}>
        <SectionTitle
          style={_.container.wind}
          right={<IconRelation title='单行本' list={comic} />}
          splitStyles
        >
          {TITLE_COMIC}{' '}
          {!!comic?.length && (
            <Text type='sub' size={18} lineHeight={18} bold>
              {comic.length}
            </Text>
          )}
        </SectionTitle>
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
          initialRenderNums={_.device(Math.floor(_.window.contentWidth / COVER_WIDTH) + 1, 6)}
          typeCn='书籍'
          onPress={({ id, name, image }, type) => {
            navigation.push('Subject', {
              subjectId: id,
              _jp: name,
              _image: getCoverSrc(image, COVER_WIDTH),
              _type: type
            })

            t('条目.跳转', {
              to: 'Subject',
              from: TITLE_COMIC,
              subjectId
            })
          }}
        />
        <Heatmap id='条目.跳转' from={TITLE_COMIC} />
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Comic
