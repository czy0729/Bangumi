/*
 * @Author: czy0729
 * @Date: 2025-08-06 15:52:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 头部: 刷新 + 浏览器打开
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT, HM } from './ds'
import { styles } from './styles'

import type { Props } from './types'

/** 头部 */
function Header({ title, url, onRefresh }: Props) {
  r(COMPONENT)

  const handleOpen = useCallback(() => {
    open(url)
  }, [url])

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconTouchable name='md-refresh' color={_.colorTitle} onPress={onRefresh} />
        <IconTouchable
          style={_.ml.xs}
          name='md-open-in-new'
          color={_.colorTitle}
          size={19}
          onPress={handleOpen}
        />
      </>
    ),
    [handleOpen, onRefresh]
  )

  return (
    <HeaderV2
      headerTitleStyle={styles.headerTitle}
      title={title || '浏览器'}
      hm={HM}
      headerTitleAlign='left'
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
