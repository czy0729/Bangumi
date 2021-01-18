/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-18 22:01:45
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import IconCharacter from './icon/character'

const initialRenderNums = _.isPad
  ? 0
  : Math.floor(_.window.contentWidth / 56) + 1

function Character({ style }, { $, navigation }) {
  if (!$.crt.length) {
    return null
  }

  const { showCharacter } = systemStore.setting
  return (
    <View style={[style, !showCharacter && _.short]}>
      <SectionTitle
        style={_.container.wind}
        right={<IconCharacter />}
        icon={!showCharacter && 'right'}
        onPress={() => $.switchBlock('showCharacter')}
      >
        角色
      </SectionTitle>
      {showCharacter && (
        <>
          <HorizontalList
            style={_.mt.sm}
            data={$.crt}
            quality={false}
            initialRenderNums={initialRenderNums}
            onPress={({ id, name, nameJP, _image }) => {
              t('条目.跳转', {
                to: 'Mono',
                from: '角色',
                subjectId: $.subjectId
              })
              navigation.push('Mono', {
                monoId: `character/${id}`,
                _name: name,
                _jp: nameJP,
                _image
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
}

export default obc(Character)
