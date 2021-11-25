/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-24 09:44:45
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import IconCharacter from './icon/character'
import IconHidden from './icon/hidden'

const initialRenderNums = _.device(Math.floor(_.window.contentWidth / 56) + 1, 8)
const defaultProps = {
  navigation: {},
  showCharacter: true,
  subjectId: 0,
  crt: [],
  onSwitchBlock: Function.prototype
}

const Character = memo(
  ({ navigation, showCharacter, subjectId, crt, onSwitchBlock }) => {
    rerender('Subject.Character.Main')
    return (
      <View style={[_.mt.lg, !showCharacter && _.short]}>
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
              quality={false}
              initialRenderNums={initialRenderNums}
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
                  _image
                })
              }}
              onSubPress={({ actorId }) => {
                t('条目.跳转', {
                  to: 'Mono',
                  from: '角色',
                  subjectId
                })

                navigation.push('Mono', {
                  monoId: `person/${actorId}`
                })
              }}
            />
            <Heatmap
              id='条目.跳转'
              data={{
                from: '角色'
              }}
            />
          </>
        )}
      </View>
    )
  },
  defaultProps
)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Character')

  const { showCharacter } = systemStore.setting
  if (showCharacter === -1 || !$.crt.length) return null

  return (
    <Character
      navigation={navigation}
      showCharacter={showCharacter}
      subjectId={$.subjectId}
      crt={$.crt}
      onSwitchBlock={$.switchBlock}
    />
  )
})
