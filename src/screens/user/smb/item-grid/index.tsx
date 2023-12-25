/*
 * @Author: czy0729
 * @Date: 2023-11-24 07:56:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 15:03:45
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Touchable, Flex, Image, Cover, Text, Hover, HoverProps } from '@components'
import { _, collectionStore } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { ASSETS_ICONS, MODEL_SUBJECT_TYPE, STORYBOOK } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx, MergeListItem } from '../types'
import { memoStyles } from './styles'

const colors = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.24)',
  'rgba(0, 0, 0, 0.72)',
  'rgba(0, 0, 0, 0.92)'
]

function ItemGrid(
  { subjectId, merge, ...folder }: MergeListItem,
  { $, navigation }: Ctx
) {
  const styles = memoStyles()
  const { jp, cn, image, type } = $.subjectV2(subjectId)
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
  const collect = collectionStore.collect(subjectId, typeCn)
  let hoverType: HoverProps['type'] = ''
  if (collect.includes('过')) {
    hoverType = 'warning'
  } else if (collect.includes('在')) {
    hoverType = 'primary'
  } else if (collect.includes('想')) {
    hoverType = 'main'
  } else if (collect.includes('搁置')) {
    hoverType = 'desc'
  } else if (collect.includes('抛弃')) {
    hoverType = 'desc'
  }

  const { layoutGridNums } = $.state.configs
  const width = (_.window.contentWidth - _.md * (layoutGridNums - 1)) / layoutGridNums
  const height = Math.floor(width * 1.4)
  const title = cn || jp || folder.name

  const showModalFoldersHandle = () => {
    $.onShowModalFolders({
      title,
      subjectId,
      folder,
      merge
    })
  }

  let size: number
  if (STORYBOOK) {
    size = !subjectId ? 12 : title.length >= 16 ? 14 : 15
  } else {
    size = layoutGridNums >= 4 ? 10 : layoutGridNums >= 3 ? 12 : 14
  }
  const elTitle = (
    <>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={colors}
        pointerEvents='none'
      />
      <View style={stl(styles.content, !subjectId && styles.folderContent)}>
        <Touchable onPress={showModalFoldersHandle}>
          <Flex style={styles.title} align='end'>
            <Text size={size} bold>
              {title}
            </Text>
          </Flex>
        </Touchable>
      </View>
    </>
  )

  return (
    <Touchable
      style={[
        styles.container,
        {
          width
        }
      ]}
      onPress={() => {
        if (subjectId) {
          navigation.push('Subject', {
            subjectId,
            _jp: jp,
            _cn: cn,
            _image: image,
            _type: typeCn
          })

          t('SMB.跳转', {
            to: 'Subject',
            subjectId,
            from: 'ItemGrid'
          })
          return
        }

        showModalFoldersHandle()
      }}
    >
      {subjectId ? (
        <Cover src={image} size={width} height={height} />
      ) : (
        <Image
          src={ASSETS_ICONS.folder}
          size={width}
          height={height}
          placeholder={false}
          resizeMode='contain'
        />
      )}
      {subjectId ? <Hover type={hoverType}>{elTitle}</Hover> : elTitle}
    </Touchable>
  )
}

export default obc(ItemGrid)
