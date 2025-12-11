/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-12 00:02:02
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import { TITLE_RELATIONS } from '../../ds'
import IconHidden from '../icon/hidden'
import IconRelation from '../icon/relation'
import { COMPONENT_MAIN, COVER_HEIGHT, COVER_WIDTH, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

import type { SubjectTypeCn } from '@types'

const Relations = memo(
  ({
    navigation,
    showRelations = true,
    subjectId = 0,
    relations,
    typeCn = '' as SubjectTypeCn,
    name,
    onSwitchBlock = FROZEN_FN
  }) => {
    const showMultiRelations = useMemo(() => {
      if (!relations?.length) return false

      const keywords = '前传|续集|总集篇|全集|番外篇|相同世界观|不同世界观|不同演绎|衍生|主线故事'
      const reg = new RegExp(keywords)

      return relations.some(item => reg.test(item.desc))
    }, [relations])

    const elRight = useMemo(
      () =>
        showRelations ? (
          <>
            {showMultiRelations && (
              <Touchable
                onPress={() => {
                  navigation.push('SubjectLink', {
                    subjectId,
                    name
                  })
                }}
              >
                <Flex>
                  <Text type='sub'>多级</Text>
                  <Text style={_.ml.xs} type='icon'>
                    ·
                  </Text>
                </Flex>
              </Touchable>
            )}
            <IconRelation title='关联' list={relations} />
          </>
        ) : (
          <IconHidden name={TITLE_RELATIONS} value='showRelations' />
        ),
      [name, navigation, relations, showMultiRelations, showRelations, subjectId]
    )

    const handleToggle = useCallback(() => onSwitchBlock('showRelations'), [onSwitchBlock])

    const handleNavigate = useCallback(
      ({ id, name, image }, type: SubjectTypeCn) => {
        navigation.push('Subject', {
          subjectId: id,
          _jp: name,
          _image: getCoverSrc(image, COVER_WIDTH),
          _type: type
        })

        t('条目.跳转', {
          to: 'Subject',
          from: '关联条目',
          subjectId
        })
      },
      [navigation, subjectId]
    )

    return (
      <InView style={showRelations ? styles.container : styles.hide}>
        <SectionTitle
          style={_.container.wind}
          right={elRight}
          icon={!showRelations && 'md-navigate-next'}
          splitStyles
          onPress={handleToggle}
        >
          {TITLE_RELATIONS}
        </SectionTitle>

        {showRelations && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={relations}
              width={COVER_WIDTH}
              height={COVER_HEIGHT}
              findCn
              relationTypeCn={typeCn}
              initialRenderNums={_.device(Math.floor(_.window.contentWidth / COVER_WIDTH) + 1, 6)}
              onPress={handleNavigate}
            />
            <Heatmap id='条目.跳转' from='关联条目' />
          </>
        )}
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Relations
