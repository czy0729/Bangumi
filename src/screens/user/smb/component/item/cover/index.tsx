/*
 * @Author: czy0729
 * @Date: 2023-02-22 02:21:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 04:53:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover as CoverComp } from '@_'
import { x18 } from '@utils'
import { t } from '@utils/fetch'
import { ASSETS_ICONS, IMG_DEFAULT, IMG_HEIGHT_LG, IMG_WIDTH_LG } from '@constants'

function Cover({ navigation, loaded, subjectId, image, typeCn, jp, cn }) {
  if (!loaded) {
    return (
      <Image
        src={ASSETS_ICONS.folder}
        size={IMG_WIDTH_LG}
        placeholder={false}
        resizeMode='contain'
      />
    )
  }

  return (
    <CoverComp
      src={image || IMG_DEFAULT}
      width={IMG_WIDTH_LG}
      height={IMG_HEIGHT_LG}
      radius
      type={typeCn}
      cdn={!x18(subjectId)}
      onPress={() => {
        navigation.push('Subject', {
          subjectId,
          _jp: jp,
          _cn: cn,
          _image: getCoverSrc(image, IMG_WIDTH_LG),
          _type: typeCn
        })

        t('SMB.跳转', {
          to: 'Subject',
          subjectId,
          from: 'Item'
        })
      }}
    />
  )
}

export default observer(Cover)
