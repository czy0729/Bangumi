/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-26 06:46:37
 */
import React from 'react'
import { Heatmap } from '@components'
import { InView, SectionTitle, HorizontalList } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import IconCharacter from '../icon/character'
import IconHidden from '../icon/hidden'
import { DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(
  ({ navigation, showCharacter, subjectId, crt, crtCounts, onSwitchBlock }) => {
    rerender('Subject.Character.Main')

    return (
      <InView style={stl(styles.container, !showCharacter && _.short)}>
        <SectionTitle
          style={_.container.wind}
          right={
            showCharacter ? (
              <IconCharacter />
            ) : (
              <IconHidden name='角色' value='showCharacter' />
            )
          }
          icon={!showCharacter && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showCharacter')}
        >
          角色
        </SectionTitle>
        {showCharacter && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={crt}
              counts={crtCounts}
              quality={false}
              initialRenderNums={_.device(
                Math.floor(_.window.contentWidth / 56) + 1,
                8
              )}
              onPress={({ id, name, nameJP, _image }) => {
                t('条目.跳转', {
                  to: 'Mono',
                  from: '角色',
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
                  from: '角色',
                  subjectId
                })

                navigation.push('Mono', {
                  monoId: `person/${actorId}`,
                  _name: desc
                })
              }}
            />
            <Heatmap id='条目.跳转' from='角色' />
          </>
        )}
      </InView>
    )
  },
  DEFAULT_PROPS
)
