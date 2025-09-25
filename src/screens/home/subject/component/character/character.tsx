/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 23:29:06
 */
import React, { useCallback } from 'react'
import { Heatmap } from '@components'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { desc, stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_FN, FROZEN_OBJECT } from '@constants'
import { TITLE_CHARACTER } from '../../ds'
import { Crt } from '../../types'
import IconCharacter from '../icon/character'
import IconHidden from '../icon/hidden'
import { getSortValue } from './utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Character = memo(
  ({
    navigation,
    showCharacter = true,
    subjectId = 0,
    crt,
    crtCounts = FROZEN_OBJECT,
    subjectName,
    onSwitchBlock = FROZEN_FN
  }) => {
    const handleToggle = useCallback(() => onSwitchBlock('showCharacter'), [onSwitchBlock])

    // 处理角色图片，避免重复逻辑
    const processedCrt = (crt || [])
      .map(item => {
        try {
          let image = item?.image || ''
          if (typeof image === 'string' && image.includes('/r/')) {
            const parts = image.split('/l/')
            image = parts[1] ? `https://lain.bgm.tv/pic/crt/g/${parts[1]}` : image
          }
          return { ...item, image }
        } catch {
          return item
        }
      })
      .sort((a, b) => desc(getSortValue(a), getSortValue(b)))

    const handleNavigate = useCallback(
      ({ id, name, nameJP, _image }: Crt) => {
        navigation.push('Mono', {
          monoId: `character/${id}`,
          _name: name,
          _jp: nameJP,
          _image,
          _count: crtCounts[id] || 0,
          _subjectName: subjectName
        })

        t('条目.跳转', {
          to: 'Mono',
          from: TITLE_CHARACTER,
          subjectId
        })
      },
      [navigation, crtCounts, subjectName, subjectId]
    )

    const handleSubPress = useCallback(
      ({ actorId, desc }: Crt) => {
        navigation.push('Mono', {
          monoId: `person/${actorId}`,
          _name: desc
        })

        t('条目.跳转', {
          to: 'Mono',
          from: TITLE_CHARACTER,
          subjectId
        })
      },
      [navigation, subjectId]
    )

    return (
      <InView style={stl(styles.container, !showCharacter && _.short)}>
        <SectionTitle
          style={_.container.wind}
          right={
            showCharacter ? (
              <IconCharacter />
            ) : (
              <IconHidden name={TITLE_CHARACTER} value='showCharacter' />
            )
          }
          icon={!showCharacter && 'md-navigate-next'}
          splitStyles
          onPress={handleToggle}
        >
          {TITLE_CHARACTER}
        </SectionTitle>
        {showCharacter && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={processedCrt}
              counts={crtCounts}
              typeCn='角色'
              initialRenderNums={_.device(Math.floor(_.window.contentWidth / 56) + 1, 8)}
              onPress={handleNavigate}
              onSubPress={handleSubPress}
            />
            <Heatmap id='条目.跳转' from={TITLE_CHARACTER} />
          </>
        )}
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Character
