/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:43:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 21:30:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Expand, Katakana, RenderHtml } from '@components'
import { _, systemStore, uiStore } from '@stores'
import { appNavigate, feedback, findSubjectCn, getCoverMedium } from '@utils'
import { globalWarn } from '@utils/dev'
import { t } from '@utils/fetch'
import { styles } from './styles'

import type { Props } from './types'

const warned = new Set<string>()

function Desc({
  navigation,
  subject,
  subjectId,
  image,
  comment,
  replyContent,
  replyCount,
  event
}: Props) {
  const { id, data = {} } = event
  const text = String(comment || replyContent || replyCount || '')

  // subject 契约是字符串, 非字符串直接跳过渲染 (对象进 children 会触发 React 红屏)
  if (subject && typeof subject !== 'string') {
    const value = String(subject)
    if (!warned.has(value)) {
      warned.add(value)
      globalWarn('[Desc] subject 非字符串', value)
    }
  }
  const subjectName = typeof subject === 'string' ? subject : ''

  return (
    <>
      {!!subjectName && (
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
                  _cn: findSubjectCn(subjectName, subjectId),
                  _jp: subjectName,
                  _image: getCoverMedium(!!image.length && image[0])
                })

                t(id, eventData)
              }}
            >
              {findSubjectCn(subjectName, subjectId)}
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
