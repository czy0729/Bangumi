/*
 * @Author: czy0729
 * @Date: 2023-11-24 14:59:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 13:24:44
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, ModalFixed, Flex, Cover } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import Subject from '../subject'
import Folders from '../item/folders'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function ModalFolders(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { folders } = $.state
  const { visible, subjectId, folder, merge } = folders
  const { jp, cn, image } = $.subjectV2(subjectId)
  return (
    <ModalFixed style={styles.modal} visible={visible} onClose={$.onCloseModalFolders}>
      {!!subjectId && (
        <Flex style={_.mb.md}>
          <View style={_.mr.md}>
            <Cover
              src={image}
              size={IMG_WIDTH_SM / 1.2}
              height={IMG_HEIGHT_SM / 1.2}
              onPress={() => {
                navigation.push('Subject', {
                  subjectId,
                  _jp: jp,
                  _cn: cn,
                  _image: image
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

export default obc(ModalFolders)
