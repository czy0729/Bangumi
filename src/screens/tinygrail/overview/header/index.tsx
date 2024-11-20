/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:52:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:43:07
 */
import { Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import IconGo from '@tinygrail/_/icon-go'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title='热门榜单'
      hm={['tinygrail/overview', 'TinygrailOverview']}
      statusBarEvents={false}
      statusBarEventsType='Tinygrail'
      headerRight={() => <IconGo $={$} />}
    />
  )
}

export default ob(Header, COMPONENT)
