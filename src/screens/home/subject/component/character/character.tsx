/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 01:58:36
 */
import React from 'react'
import { Heatmap } from '@components'
import { HorizontalList, InView, SectionTitle } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TITLE_CHARACTER } from '../../ds'
import IconCharacter from '../icon/character'
import IconHidden from '../icon/hidden'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Character = memo(
  ({ navigation, showCharacter, subjectId, crt, crtCounts, onSwitchBlock }) => {
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
          onPress={() => onSwitchBlock('showCharacter')}
        >
          {TITLE_CHARACTER}
        </SectionTitle>
        {showCharacter && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={crt}
              counts={crtCounts}
              initialRenderNums={_.device(Math.floor(_.window.contentWidth / 56) + 1, 8)}
              onPress={({ id, name, nameJP, _image }) => {
                t('条目.跳转', {
                  to: 'Mono',
                  from: TITLE_CHARACTER,
                  subjectId
                })

                navigation.push('Mono', {
                  monoId: `character/${id}`,
                  _name: name,
                  _jp: nameJP,
                  _image,
                  _count: crtCounts[id] || 0
                })
              }}
              onSubPress={({ actorId, desc }) => {
                t('条目.跳转', {
                  to: 'Mono',
                  from: TITLE_CHARACTER,
                  subjectId
                })

                navigation.push('Mono', {
                  monoId: `person/${actorId}`,
                  _name: desc
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
