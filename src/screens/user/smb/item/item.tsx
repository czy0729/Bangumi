/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 16:34:55
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { memo } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import Subject from '../subject'
import Cover from './cover'
import Folders from './folders'
import DevJA from './dev-ja'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({ navigation, styles, subjectId, loaded, jp, cn, image, type, folder, merge }) => {
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

              {/* {!!folder.tags.length && (
                <Flex style={_.mt.sm}>
                  {folder.tags
                    .filter((item, index) => index < 5)
                    .map(item => (
                      <Text key={item} style={_.mr.sm} size={12} type='sub'>
                        {item}
                      </Text>
                    ))}
                </Flex>
              )} */}
            </Flex.Item>
          </Flex>
          <Folders subjectId={subjectId} folder={folder} merge={merge} />
        </View>
      </View>
    )
  },
  DEFAULT_PROPS
)
