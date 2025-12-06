/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-21 00:35:26
 */
import React, { useCallback, useMemo } from 'react'
import { Heatmap, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { truncateMiddle } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import { TITLE_COMIC } from '../../ds'
import IconRelation from '../icon/relation'
import { COMPONENT_MAIN, COVER_HEIGHT, COVER_WIDTH, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

import type { SubjectFromHtmlComitItem } from '@stores/subject/types'
import type { SubjectTypeCn } from '@types'

const Comic = memo(
  ({ navigation, subjectId = 0, comic }) => {
    const processedComic = (comic || []).map(item => ({
      ...item,
      // iOS 文字组件是可以原生中间省略的
      name: IOS ? item.name : truncateMiddle(item.name, 20)
    }))

    const elRight = useMemo(() => <IconRelation title='单行本' list={comic} />, [comic])

    const handlePress = useCallback(
      ({ id, name, image }: SubjectFromHtmlComitItem, type: SubjectTypeCn) => {
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
      },
      [navigation, subjectId]
    )

    return (
      <InView style={styles.container}>
        <SectionTitle style={_.container.wind} right={elRight} splitStyles>
          {TITLE_COMIC}{' '}
          {!!comic?.length && (
            <Text type='sub' size={18} lineHeight={18} bold>
              {comic.length}
            </Text>
          )}
        </SectionTitle>
        <HorizontalList
          style={_.mt.sm}
          data={processedComic}
          width={COVER_WIDTH}
          height={COVER_HEIGHT}
          ellipsizeMode='middle'
          initialRenderNums={_.device(Math.floor(_.window.contentWidth / COVER_WIDTH) + 1, 6)}
          typeCn='书籍'
          onPress={handlePress}
        />
        <Heatmap id='条目.跳转' from={TITLE_COMIC} />
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Comic
