/*
 * @Author: czy0729
 * @Date: 2021-05-27 10:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-07 08:25:07
 */
import React from 'react'
import { Flex, Text, Heatmap } from '@components'
import { IconTouchable, FolderManageModal } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconFolder(props, { $ }) {
  const { folder } = $.state
  const isInclude = !!$.catalogIncludes
  return (
    <>
      <Flex style={isInclude && _.mr.xs}>
        <IconTouchable
          name='md-folder-open'
          size={20}
          color={_.colorIcon}
          onPress={$.toggleFolder}
        >
          <Heatmap id='条目.目录管理' />
        </IconTouchable>
        {isInclude && (
          <Text style={styles.num} size={10} type='icon' bold>
            {$.catalogIncludes}
          </Text>
        )}
      </Flex>
      <FolderManageModal
        id={$.subjectId}
        visible={folder}
        onClose={$.toggleFolder}
      />
    </>
  )
}

export default obc(IconFolder)

const styles = _.create({
  num: {
    position: 'absolute',
    zIndex: 1,
    right: -2,
    bottom: 6
  }
})
