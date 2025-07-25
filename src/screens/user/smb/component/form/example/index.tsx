/*
 * @Author: czy0729
 * @Date: 2023-11-16 22:38:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:22:25
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { ReactNode } from '@types'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Example({ store }: { store: Ctx['$'] }) {
  let { $ } = useStore<Ctx>()
  $ = $?.state ? $ : store

  const { webDAV } = $.state
  let el: ReactNode
  if (WEB) {
    el = (
      <>
        <Text size={10} lineHeight={12} type='sub'>
          <Text size={10} lineHeight={12} type='sub' underline>
            ddplay:
          </Text>
          ①{' '}
          <Text size={10} lineHeight={12} type='sub' underline>
            D:/Anime
          </Text>
          ② /{' '}
          <Text size={10} lineHeight={12} type='sub' underline>
            2023S4/[bangumi-404115] 星灵感应/01.mp4
          </Text>
          ③
        </Text>
        <Text style={_.mt.xs} size={10} lineHeight={12} type='sub'>
          ①调用协议 ②路径[PATH] ③文件[FILE]
        </Text>
        <Text style={_.mt.sm} size={10} lineHeight={12} type='sub'>
          上面例子为选择了 D:/Anime/2023S4 文件夹，你需要在路径里面填
          D:/Anime。不建议读取太深文件夹，否则可能会崩溃。
        </Text>
      </>
    )
  } else if (webDAV) {
    el = (
      <>
        <Text size={10} lineHeight={12} type='sub'>
          http://{' '}
          <Text size={10} lineHeight={12} type='sub' underline>
            192.168.1.1
          </Text>
          ① :{' '}
          <Text size={10} lineHeight={12} type='sub' underline>
            5081
          </Text>
          ② /{' '}
          <Text size={10} lineHeight={12} type='sub' underline>
            my_dav/anime
          </Text>
          ③
        </Text>
        <Text size={10} lineHeight={12} type='sub'>
          ①主机 ②端口 ③路径
        </Text>
      </>
    )
  } else {
    el = (
      <>
        <Text size={10} lineHeight={12} type='sub'>
          smb://{' '}
          <Text size={10} lineHeight={12} type='sub' underline>
            192.168.1.1
          </Text>
          ① :{' '}
          <Text size={10} lineHeight={12} type='sub' underline>
            445
          </Text>
          ② /{' '}
          <Text size={10} lineHeight={12} type='sub' underline>
            my_smb
          </Text>
          ③ /{' '}
          <Text size={10} lineHeight={12} type='sub' underline>
            anime
          </Text>
          ④
        </Text>
        <Text size={10} lineHeight={12} type='sub'>
          ①主机 ②端口 ③路径 ④文件夹
        </Text>
      </>
    )
  }

  return (
    <Flex style={_.mv.sm} align='start'>
      <Text style={styles.label} size={12} lineHeight={13}>
        说明
      </Text>
      <Flex.Item>{el}</Flex.Item>
    </Flex>
  )
}

export default ob(Example)
