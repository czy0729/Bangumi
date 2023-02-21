/*
 * @Author: czy0729
 * @Date: 2023-02-22 02:21:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-22 02:25:57
 */
import React from 'react'
import { Image } from '@components'
import { Cover as CoverComp } from '@_'
import { ob } from '@utils/decorators'
import { IMG_DEFAULT, IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { ICONS } from '../../ds'

function Cover({ navigation, loaded, subjectId, image, typeCn, jp, cn }) {
  if (!loaded) {
    return (
      <Image
        src={ICONS.folder}
        size={IMG_WIDTH}
        placeholder={false}
        resizeMode='contain'
      />
    )
  }

  return (
    <CoverComp
      src={image || IMG_DEFAULT}
      width={IMG_WIDTH}
      height={IMG_HEIGHT}
      radius
      shadow
      type={typeCn}
      onPress={() => {
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
