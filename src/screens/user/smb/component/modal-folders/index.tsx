/*
 * @Author: czy0729
 * @Date: 2023-11-24 14:59:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:29:36
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, ModalFixed, ScrollView } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import { Ctx } from '../../types'
import Folders from '../item/folders'
import Subject from '../subject'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ModalFolders() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { folders } = $.state
  const { visible, subjectId, folder, merge } = folders
  const { jp, cn, image } = $.subjectV2(subjectId)
  const width = IMG_WIDTH_SM / 1.2
  return (
    <ModalFixed style={styles.modal} visible={visible} onClose={$.onCloseModalFolders}>
      {!!subjectId && (
        <Flex style={_.mb.md}>
          <View style={_.mr.md}>
            <Cover
              src={image}
              size={width}
              height={IMG_HEIGHT_SM / 1.2}
              onPress={() => {
                navigation.push('Subject', {
                  subjectId,
                  _jp: jp,
                  _cn: cn,
                  _image: getCoverSrc(image, width)
                })

                t('SMB.跳转', {
                  to: 'Subject',
                  subjectId,
                  from: 'ModalFolders'
                })

                setTimeout(() => {
                  $.onCloseModalFolders()
                }, 40)
              }}
            />
          </View>
          <Flex.Item style={styles.subject}>
            <Subject subjectId={subjectId} />
          </Flex.Item>
        </Flex>
      )}
      <ScrollView style={styles.body}>
        <View style={styles.folders}>
          <Folders fixedStyle={false} folder={folder} merge={merge} defaultShow />
        </View>
      </ScrollView>
    </ModalFixed>
  )
}

export default ob(ModalFolders, COMPONENT)
