/*
 * @Author: czy0729
 * @Date: 2021-05-27 10:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:05:29
 */
import React from 'react'
import { Flex, Text, Heatmap } from '@components'
import { IconTouchable, FolderManageModal } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SHARE_MODE } from '@constants'
import { Ctx } from '../types'

function IconFolder(props, { $ }: Ctx) {
  if (SHARE_MODE) return null

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
          <Heatmap id='条目.管理目录' />
        </IconTouchable>
        {isInclude && (
          <Text style={styles.num} size={10} type='icon' bold>
            {$.catalogIncludes}
          </Text>
        )}
      </Flex>
      <FolderManageModal id={$.subjectId} visible={folder} onClose={$.toggleFolder} />
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
