/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 11:59:56
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
  showLike: true,
  subjectId: 0,
  staff: [],
  onSwitchBlock: Function.prototype
}

const Like = memo(({ navigation, showLike, subjectId, like, onSwitchBlock }) => {
  rerender('Subject.Like.Main')

  return (
    <View style={[_.mt.lg, !showLike && _.short]}>
      <SectionTitle
        style={_.container.wind}
        right={!showLike && <IconHidden name='猜你喜欢' value='showLike' />}
        icon={!showLike && 'md-navigate-next'}
        onPress={() => onSwitchBlock('showLike')}
      >
        猜你喜欢
      </SectionTitle>
      {showLike && (
        <>
          <HorizontalList
            style={_.mt.sm}
            data={like}
            width={coverWidth}
            height={coverHeight}
            initialRenderNums={_.device(
              Math.floor(_.window.contentWidth / coverWidth) + 1,
              6
            )}
            onPress={({ id, name, image }, type) => {
              t('条目.跳转', {
                to: 'Subject',
                from: '猜你喜欢',
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
              from: '猜你喜欢'
            }}
          />
        </>
      )}
    </View>
  )
}, defaultProps)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Like')

  const { showLike } = systemStore.setting
  if (showLike === -1 || !$.like.length) return null

  return (
    <Like
      navigation={navigation}
      showLike={systemStore.setting.showLike}
      subjectId={$.subjectId}
      like={$.like}
      onSwitchBlock={$.switchBlock}
    />
  )
})
