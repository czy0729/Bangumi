/*
 * @Author: czy0729
 * @Date: 2023-02-22 02:21:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 10:18:07
 */
import React from 'react'
import { Image } from '@components'
import { Cover as CoverComp } from '@_'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { ASSETS_ICONS, IMG_DEFAULT, IMG_WIDTH_LG, IMG_HEIGHT_LG } from '@constants'

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
      shadow
      type={typeCn}
      onPress={() => {
        t('SMB.跳转', {
          to: 'Subject',
          subjectId,
          from: 'Item'
        })

        navigation.push('Subject', {
          subjectId,
          _jp: jp,
          _cn: cn,
          _image: image,
          _type: typeCn
        })
      }}
    />
  )
}

export default ob(Cover)
