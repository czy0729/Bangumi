/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:43:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 13:39:19
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Expand, Katakana, RenderHtml } from '@components'
import { _, systemStore, uiStore } from '@stores'
import { appNavigate, feedback, findSubjectCn, getCoverMedium } from '@utils'
import { t } from '@utils/fetch'
import { styles } from './styles'

function Desc({ navigation, subject, subjectId, image, comment, replyContent, replyCount, event }) {
  const { id, data = {} } = event
  const text = comment || replyContent || replyCount

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

                navigation.push('Subject', {
                  subjectId,
                  _cn: findSubjectCn(subject, subjectId),
                  _jp: subject,
                  _image: getCoverMedium(!!image.length && image[0])
                })

                t(id, eventData)
              }}
            >
              {findSubjectCn(subject, subjectId)}
            </Katakana>
          </Katakana.Provider>
        </View>
      )}
      {!!text && (
        <View style={_.mv.sm}>
          <Expand moreStyle={styles.more} ratio={0.64}>
            <RenderHtml
              html={text}
              baseFontStyle={{
                ..._.baseFontStyle.md,
                color: _.colorDesc
              }}
              onLinkPress={href => appNavigate(href, navigation)}
            />
          </Expand>
        </View>
      )}
    </>
  )
}

export default observer(Desc)
