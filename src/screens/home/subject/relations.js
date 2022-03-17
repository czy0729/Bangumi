/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 12:01:33
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { SectionTitle, HorizontalList } from '@_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import IconHidden from './icon/hidden'

const coverWidth = 80
const coverHeight = coverWidth * 1.4
const defaultProps = {
  navigation: {},
  showRelations: true,
  subjectId: 0,
  relations: [],
  onSwitchBlock: Function.prototype
}

const Relations = memo(
  ({ navigation, showRelations, subjectId, relations, onSwitchBlock }) => {
    rerender('Subject.Relations.Main')
    return (
      <View style={[_.mt.lg, !showRelations && _.short]}>
        <SectionTitle
          style={_.container.wind}
          right={!showRelations && <IconHidden name='关联' value='showRelations' />}
          icon={!showRelations && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showRelations')}
        >
          关联
        </SectionTitle>
        {showRelations && (
          <>
            <HorizontalList
              style={_.mt.sm}
              data={relations}
              width={coverWidth}
              height={coverHeight}
              findCn
              initialRenderNums={_.device(
                Math.floor(_.window.contentWidth / coverWidth) + 1,
                6
              )}
              onPress={({ id, name, image }, type) => {
                t('条目.跳转', {
                  to: 'Subject',
                  from: '关联条目',
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
            <Heatmap
              id='条目.跳转'
              data={{
                from: '关联条目'
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
  rerender('Subject.Relations')

  const { showRelations } = systemStore.setting
  if (showRelations === -1 || !$.relations.length) return null

  return (
    <Relations
      navigation={navigation}
      showRelations={showRelations}
      subjectId={$.subjectId}
      relations={$.relations}
      onSwitchBlock={$.switchBlock}
    />
  )
})
