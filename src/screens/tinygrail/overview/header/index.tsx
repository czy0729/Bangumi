/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:52:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 04:53:49
 */
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import IconGo from '@tinygrail/_/icon-go'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
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

export default obc(Header, COMPONENT)
