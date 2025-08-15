/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:43:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 19:49:14
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Katakana, Text } from '@components'
import { _, systemStore, uiStore } from '@stores'
import { feedback, findSubjectCn, getCoverMedium } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { styles } from './styles'

function Desc({ navigation, subject, subjectId, image, comment, replyContent, replyCount, event }) {
  const { id, data = {} } = event
  return (
    <>
      {!!subject && (
        <View style={_.mt.sm}>
          <Katakana.Provider>
            <Katakana
              type='main'
              bold
              onPress={() => {
                const eventData = {
                  to: 'Subject',
                  subjectId,
                  ...data
                }
                if (subjectId && systemStore.setting.timelinePopable) {
                  uiStore.showPopableSubject({
                    subjectId
                  })
                  feedback(true)

                  t('时间胶囊.缩略框', eventData)
                  return
                }

                t(id, eventData)
                navigation.push('Subject', {
                  subjectId,
                  _cn: findSubjectCn(subject, subjectId),
                  _jp: subject,
                  _image: getCoverMedium(!!image.length && image[0])
                })
              }}
            >
              {findSubjectCn(subject, subjectId)}
            </Katakana>
          </Katakana.Provider>
        </View>
      )}
      {!!(comment || replyContent || replyCount) && (
        <View style={_.mt.sm}>
          <Expand moreStyle={styles.more} ratio={0.64}>
            <Text lineHeight={20}>{comment || replyContent || replyCount}</Text>
          </Expand>
        </View>
      )}
    </>
  )
}

export default ob(Desc)
