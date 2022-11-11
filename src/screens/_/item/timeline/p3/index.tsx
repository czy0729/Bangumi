/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 20:01:16
 */
import React from 'react'
import { Katakana, Text } from '@components'
import { uiStore, systemStore } from '@stores'
import { findSubjectCn, getCoverMedium } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST_NAME } from '@constants'
import { matchSubjectId } from '../utils'

function P3({ image, p3Text, p3Url, onNavigate }) {
  let $p3: any | any[]
  if (p3Text.length > 1) {
    $p3 = []
    p3Text.forEach((item: string, index: number) => {
      const url = String(p3Url[index])
      const isSubject = url.includes(`${HOST_NAME}/subject/`) && !url.includes('/ep/')
      const subjectId = isSubject ? matchSubjectId(url) : 0
      $p3.push(
        <Katakana
          key={item || index}
          type={isSubject ? 'main' : 'title'}
          lineHeight={16}
          bold
          onPress={() => {
            if (isSubject && subjectId && systemStore.setting.timelinePopable) {
              t('时间胶囊.缩略框', {
                to: 'Subject',
                subjectId
              })

              uiStore.showPopableSubject({
                subjectId
              })
              return
            }

            onNavigate(
              url,
              isSubject && {
                _jp: item,
                _cn: findSubjectCn(item, subjectId),
                _name: item,
                _image: getCoverMedium(image[index] || '')
              }
            )
          }}
        >
          {isSubject ? findSubjectCn(item, subjectId) : item}
        </Katakana>,
        <Text key={`${item}.`} lineHeight={16} type='sub'>
          、
        </Text>
      )
    })
    $p3.pop()
  } else if (p3Text.length === 1) {
    const isSubject =
      !!String(!!p3Url.length && p3Url[0]).includes(`${HOST_NAME}/subject/`) &&
      !p3Url[0].includes('/ep/')
    const subjectId = isSubject ? matchSubjectId(!!p3Url.length && p3Url[0]) : 0
    $p3 = (
      <Katakana
        type={isSubject ? 'main' : 'title'}
        lineHeight={16}
        bold
        onPress={() => {
          if (isSubject && subjectId && systemStore.setting.timelinePopable) {
            t('时间胶囊.缩略框', {
              to: 'Subject',
              subjectId
            })
            uiStore.showPopableSubject({
              subjectId
            })
            return
          }

          onNavigate(
            !!p3Url.length && p3Url[0],
            isSubject && {
              _jp: !!p3Text.length && p3Text[0],
              _cn: findSubjectCn(!!p3Text.length && p3Text[0], subjectId),
              _name: !!p3Text.length && p3Text[0],
              _image: getCoverMedium((!!image.length && image[0]) || '')
            }
          )
        }}
      >
        {isSubject
          ? findSubjectCn(!!p3Text.length && p3Text[0], subjectId)
          : !!p3Text.length && p3Text[0]}
      </Katakana>
    )
  }

  return $p3
}

export default ob(P3)
