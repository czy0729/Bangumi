/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 18:31:12
 */
import React from 'react'
import { Heatmap } from '@components'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { desc, stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_ARRAY, FROZEN_FN, FROZEN_OBJECT } from '@constants'
import { TITLE_CHARACTER } from '../../ds'
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
    crt = FROZEN_ARRAY,
    crtCounts = FROZEN_OBJECT,
    subjectName,
    onSwitchBlock = FROZEN_FN
  }) => {
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
          onPress={() => onSwitchBlock('showCharacter')}
        >
          {TITLE_CHARACTER}
        </SectionTitle>
        {showCharacter && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={crt
                .map((item: any) => {
                  try {
                    let image = item?.image || ''
                    if (item?.image?.includes?.('/r/')) {
                      image = `https://lain.bgm.tv/pic/crt/g/${item.image.split('/l/')?.[1]}` || ''
                    }

                    return {
                      ...item,
                      image
                    }
                  } catch (error) {
                    return item
                  }
                })
                .sort((a, b) => desc(getSortValue(a), getSortValue(b)))}
              counts={crtCounts}
              typeCn='角色'
              initialRenderNums={_.device(Math.floor(_.window.contentWidth / 56) + 1, 8)}
              onPress={({ id, name, nameJP, _image }) => {
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
              }}
              onSubPress={({ actorId, desc }) => {
                navigation.push('Mono', {
                  monoId: `person/${actorId}`,
                  _name: desc
                })

                t('条目.跳转', {
                  to: 'Mono',
                  from: TITLE_CHARACTER,
                  subjectId
                })
              }}
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
