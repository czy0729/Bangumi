/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-27 16:02:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { memo } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import Subject from '../subject'
import Cover from './cover'
import DevJA from './dev-ja'
import Folders from './folders'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    navigation,
    styles,
    subjectId = 0,
    loaded = false,
    jp = '',
    cn = '',
    image = '',
    type = '',
    folder = {
      name: '',
      lastModified: '',
      path: '',
      list: [],
      ids: [],
      tags: []
    },
    merge = []
  }) => {
    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)

    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Flex align='start'>
            <Cover
              navigation={navigation}
              loaded={loaded}
              subjectId={subjectId}
              image={image}
              typeCn={typeCn}
              jp={jp}
              cn={cn}
            />
            <Flex.Item style={styles.body}>
              {loaded ? (
                <Subject subjectId={subjectId} />
              ) : (
                <>
                  <Text size={15} bold>
                    {folder.name}
                  </Text>
                  <DevJA folderName={folder.name} />
                </>
              )}
            </Flex.Item>
          </Flex>
          <Folders folder={folder} merge={merge} />
        </View>
      </View>
    )
  },
  DEFAULT_PROPS
)
