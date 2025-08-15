/*
 * @Author: czy0729
 * @Date: 2024-03-11 10:49:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:59:39
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import { COMPONENT, HM } from './ds'

function Header() {
  const navigation = useNavigation()
  return (
    <TinygrailHeader
      title='番市首富'
      hm={HM}
      headerRight={() => (
        <IconTouchable
          style={_.mr.xs}
          name='md-insert-chart-outlined'
          color={_.colorTinygrailPlain}
          onPress={() => {
            t('番市首富.跳转', {
              to: 'TinygrailTreeRich'
            })

            navigation.push('TinygrailTreeRich')
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
