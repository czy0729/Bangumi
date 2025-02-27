/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-16 18:50:52
 */
import React from 'react'
import { Katakana, Text } from '@components'
import { systemStore, uiStore } from '@stores'
import { feedback, findSubjectCn, getCoverMedium, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST_NAME } from '@constants'
import { matchSubjectId } from '../utils'

function P3({ image, p3Text, p3Url, onNavigate }) {
  let $p3: any | any[] = null

  if (p3Text.length > 1) {
    $p3 = []
    p3Text.forEach((item: string, index: number) => {
      const text = HTMLDecode(item)
      const url = String(p3Url[index])
      const isSubject = url.includes(`${HOST_NAME}/subject/`) && !url.includes('/ep/')
      const subjectId = isSubject ? matchSubjectId(url) : 0

      $p3.push(
        <Katakana
          key={text || index}
          type={isSubject ? 'main' : 'title'}
          lineHeight={16}
          bold
          onPress={() => {
            if (isSubject && subjectId && systemStore.setting.timelinePopable) {
              uiStore.showPopableSubject({
                subjectId
              })
              feedback(true)

              t('时间胶囊.缩略框', {
                to: 'Subject',
                subjectId
              })
              return
            }

            onNavigate(
              url,
              isSubject && {
                _jp: text,
                _cn: findSubjectCn(text, subjectId),
                _name: text,
                _image: getCoverMedium(image[index] || '')
              }
            )
          }}
        >
          {isSubject ? findSubjectCn(text, subjectId) : text}
        </Katakana>,
        <Text key={`${text}.`} lineHeight={16} type='sub'>
          、
        </Text>
      )
    })
    $p3.pop()
  } else if (p3Text.length === 1) {
    const text = HTMLDecode(p3Text[0])
    const url = p3Url[0]
    const isSubject =
      !!String(!!p3Url.length && url).includes(`${HOST_NAME}/subject/`) && !url.includes('/ep/')
    const subjectId = isSubject ? matchSubjectId(!!p3Url.length && url) : 0

    $p3 = (
      <Katakana
        type={isSubject ? 'main' : 'title'}
        lineHeight={16}
        bold
        onPress={() => {
          if (isSubject && subjectId && systemStore.setting.timelinePopable) {
            uiStore.showPopableSubject({
              subjectId
            })
            feedback(true)

            t('时间胶囊.缩略框', {
              to: 'Subject',
              subjectId
            })
            return
          }

          onNavigate(
            !!p3Url.length && url,
            isSubject && {
              _jp: !!p3Text.length && text,
              _cn: findSubjectCn(!!p3Text.length && text, subjectId),
              _name: !!p3Text.length && text,
              _image: getCoverMedium((!!image.length && image[0]) || '')
            }
          )
        }}
      >
        {isSubject ? findSubjectCn(!!p3Text.length && text, subjectId) : !!p3Text.length && text}
      </Katakana>
    )
  }

  return $p3
}

export default ob(P3)
