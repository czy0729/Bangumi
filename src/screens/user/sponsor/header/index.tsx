/*
 * @Author: czy0729
 * @Date: 2022-09-07 15:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-07 19:06:39
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { alert } from '@utils'
import { ob } from '@utils/decorators'
import { timeDiff } from '../utils'

function Header() {
  return (
    <CompHeader
      title='赞助者'
      hm={['sponsor', 'Sponsor']}
      headerRight={() => (
        <IconTouchable
          name='md-info-outline'
          color={_.colorTitle}
          onPress={() =>
            alert(
              `应用已存活 ${timeDiff()}\n图表根据赞助额按比例划分\n点击方格隐藏1格，高级会员长按可进入空间\n除此外还有30多个赞助者没有留名\n@senken 提供的100刀iOS开发账号\n@magma 提供的服务器和OSS服务\n数据不定期更新\n感谢各位的支持！`,
              '生存情况'
            )
          }
        />
      )}
    />
  )
}

export default ob(Header)
