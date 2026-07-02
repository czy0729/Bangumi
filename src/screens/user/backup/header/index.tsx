/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:17:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 06:00:00
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { useNavigation } from '@utils/hooks'
import { ANDROID } from '@constants'
import { openDownloadDir } from '../export'
import { COMPONENT, HM } from './ds'

function Header() {
  const navigation = useNavigation(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        {ANDROID && (
          <IconTouchable name='md-folder-open' color={_.colorDesc} onPress={openDownloadDir} />
        )}
        <IconTouchable
          name='md-info-outline'
          color={_.colorDesc}
          onPress={() => {
            navigation.push('Information', {
              title: '本地备份',
              message: [
                '条目地址和封面地址为可选导出项。',
                '因为这些值长度较长，对于部分有大量收藏记录的用户来说，很可能导致内存溢出导出失败，请自行尝试。',
                '「导入收藏」因功能难以维护，目前已不作维护，后续有需求也仅支持有偿修复。'
              ]
            })
          }}
        />
      </>
    ),
    [navigation]
  )

  return <HeaderV2 title='本地备份' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
