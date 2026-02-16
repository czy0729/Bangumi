/*
 * @Author: czy0729
 * @Date: 2021-05-27 10:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:50:20
 */
import React from 'react'
import { Flex, Heatmap, Text } from '@components'
import { FolderManageModal, IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SHARE_MODE } from '@constants'
import { Ctx } from '../../types'
import { styles } from './styles'

function IconFolder() {
  const { $ } = useStore<Ctx>()
  if (SHARE_MODE) return null

  const isInclude = !!$.catalogIncludes
  return (
    <>
      <Flex style={isInclude && _.mr.xs}>
        <IconTouchable name='md-folder-open' size={20} color={_.colorIcon} onPress={$.toggleFolder}>
          <Heatmap id='条目.管理目录' />
        </IconTouchable>
        {isInclude && (
          <Text style={styles.num} size={10} type='icon' bold>
            {$.catalogIncludes}
          </Text>
        )}
      </Flex>
      <FolderManageModal id={$.subjectId} visible={$.state.folder} onClose={$.toggleFolder} />
    </>
  )
}

export default ob(IconFolder)
