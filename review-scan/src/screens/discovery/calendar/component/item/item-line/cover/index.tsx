/*
 * @Author: czy0729
 * @Date: 2024-03-29 04:34:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 10:54:18
 */
import React from 'react'
import { Cover as CoverComp, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { InView } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { styles } from './styles'

function Cover({ index, subjectId, image, name }) {
  const navigation = useNavigation()
  const { minWidth: width, minHeight: height } = styles.inView
  return (
    <InView style={styles.inView} y={(height + _.md) * (index + 1)}>
      <Touchable
        onPress={() => {
          navigation.push('Subject', {
            subjectId,
            _cn: name,
            _image: getCoverSrc(image, width)
          })

          t('每日放送.跳转', {
            to: 'Subject',
            subjectId
          })
        }}
      >
        <CoverComp width={width} height={height} src={image} radius />
      </Touchable>
    </InView>
  )
}

export default ob(Cover)
