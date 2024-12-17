/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:52:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 19:54:10
 */
import { HeaderV2 } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import IconGo from '@tinygrail/_/icon-go'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      backgroundStyle={_.container.tinygrail}
      title='热门榜单'
      hm={HM}
      headerRight={() => <IconGo $={$} />}
    />
  )
}

export default ob(Header, COMPONENT)
