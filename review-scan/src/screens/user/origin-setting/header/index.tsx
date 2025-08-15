/*
 * @Author: czy0729
 * @Date: 2022-05-11 04:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 05:29:04
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  const navigation = useNavigation()
  return (
    <HeaderV2
      title='自定义源头'
      hm={HM}
      headerRight={() => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === '说明') {
              navigation.push('Tips', {
                key: 'qcgrso5g70d6gusf'
              })
            }

            t('自定义源头.右上角菜单', {
              key: title
            })
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
