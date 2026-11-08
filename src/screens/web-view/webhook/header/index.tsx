/*
 * @Author: czy0729
 * @Date: 2022-11-24 15:39:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 头部: 浏览器打开 Webhook 文档
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { HTML_SINGLE_DOC } from '@constants'
import { DOC_KEY, HM } from './ds'

/** 头部 */
function Header() {
  const handleOpen = useCallback(() => {
    open(HTML_SINGLE_DOC(DOC_KEY))
  }, [])

  const handleHeaderRight = useCallback(
    () => (
      <IconTouchable
        name='md-open-in-new'
        size={20}
        color={_.colorDesc}
        onPress={handleOpen}
      />
    ),
    [handleOpen]
  )

  return <HeaderV2 title='Webhook' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
