/*
 * @Author: czy0729
 * @Date: 2025-08-06 15:52:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 14:01:18
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

function Header({ title, url, onRefresh }) {
  r(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconTouchable name='md-refresh' color={_.colorTitle} onPress={onRefresh} />
        <IconTouchable
          style={_.ml.xs}
          name='md-open-in-new'
          color={_.colorTitle}
          size={19}
          onPress={() => {
            open(url)
          }}
        />
      </>
    ),
    [onRefresh, url]
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
