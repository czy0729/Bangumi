/*
 * @Author: czy0729
 * @Date: 2021-05-27 10:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:22:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Text } from '@components'
import { FolderManageModal, IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { SHARE_MODE } from '@constants'
import { styles } from './styles'

import type { Ctx } from '../../types'

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

export default observer(IconFolder)
