/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:46:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 10:56:05
 */
import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { IMG_WIDTH } from '@constants'
import { SubjectId, SubjectTypeCn } from '@types'
import { COMPONENT, TITLE_HIT_SLOPS } from './ds'
import { styles } from './styles'

function ContainerTouchable({
  subjectId,
  typeCn,
  name,
  name_cn,
  image,
  children
}: PropsWithChildren<{
  subjectId: SubjectId
  typeCn: SubjectTypeCn
  name: string
  name_cn: string
  image: string
}>) {
  const navigation = useNavigation()
  return (
    <View style={systemStore.setting.homeListCompact ? styles.compact : styles.touch}>
      <Touchable
        withoutFeedback
        hitSlop={TITLE_HIT_SLOPS}
        onPress={() => {
          t('首页.跳转', {
            to: 'Subject',
            from: 'list'
          })

          navigation.push('Subject', {
            subjectId,
            _jp: name,
            _cn: name_cn,
            _image: getCoverSrc(image, IMG_WIDTH),
            // _collection: '在看',
            _type: typeCn
          })
        }}
      >
        {children}
      </Touchable>
    </View>
  )
}

export default ob(ContainerTouchable, COMPONENT)
