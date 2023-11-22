/*
 * @Author: czy0729
 * @Date: 2023-11-19 11:39:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 09:27:39
 */
import React, { useState } from 'react'
import { Linking } from 'react-native'
import { Button, Flex, Text, Touchable } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { copy, desc } from '@utils'
import { c } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { Ctx, SMBListItem } from '../../types'
import { timeAgo } from '../utils'
import { SORT_ORDER } from '../ds'
import { getEp } from './utils'
import { styles } from './styles'
import {
  ACTION_COPY_LINK,
  ACTION_COPY_PATH,
  ACTION_DDPLAY,
  ACTION_LINKING,
  ACTION_MPV,
  ACTION_OPEN_DIRECTORY,
  ACTION_POTPLAYER,
  ACTION_VLC,
  EPS_TYPE_COUNT,
  URL_TEMPLATES
} from './ds'

function FolderEp(
  {
    folder
  }: {
    folder: SMBListItem
  },
  { $ }: Ctx
) {
  const [filter, setFilter] = useState('')
  const [fulltime, setFulltime] = useState(false)

  return useObserver(() => {
    const { name, lastModified, list: folderList } = folder
    const list = folderList
      .filter(item => item.type === 'video')
      .sort((a, b) => {
        const typeA = SORT_ORDER[a.type] || 0
        const typeB = SORT_ORDER[b.type] || 0
        if (typeA === typeB) return desc(a.name, b.name)
        return desc(SORT_ORDER[a.type] || 0, SORT_ORDER[b.type] || 0)
      })

    const epsRepeat = {}
    const epsType = {
      ...EPS_TYPE_COUNT
    }

    const { sharedFolder, url } = $.current.smb
    const actions = [
      ACTION_COPY_PATH,
      ACTION_DDPLAY,
      ACTION_POTPLAYER,
      ACTION_VLC,
      ACTION_MPV
    ]
    if (url) actions.unshift(ACTION_LINKING, ACTION_COPY_LINK)

    return (
      <>
        <Flex style={styles.btns} wrap='wrap'>
          {list.map((item, index) => {
            const [ep, type] = getEp(item.name)
            let epText = ep === null ? `[${index}]` : ep
            if (type) epText = ep === null ? type : `${type}\n${epText}`
            if (type) {
              epsType[type in epsType ? type : 'other'] += 1
            } else {
              epsType.ep += 1
            }

            const btnType = epsRepeat[epText] ? 'disabled' : 'ghostPlain'
            epsRepeat[epText] = true
            if (
              !filter ||
              filter === type ||
              (filter === 'ep' && !type) ||
              (filter === 'other' && type && !(type in epsType))
            ) {
              return (
                <Popover
                  key={item.name}
                  // @ts-expect-error
                  title={[item.name]}
                  data={actions}
                  onSelect={title => {
                    const { isWindows } = $.state
                    if (title === ACTION_LINKING) {
                      const link = $.url(sharedFolder, folder.path, name, item.name)
                      Linking.openURL(link)
                      return
                    }

                    if (title === ACTION_COPY_LINK) {
                      const link = $.url(sharedFolder, folder.path, name, item.name)
                      copy(link, '已复制')
                      return
                    }

                    // browser not allowed
                    if (title === ACTION_OPEN_DIRECTORY) {
                      let link = [sharedFolder, folder.path, name]
                        .filter(item => item)
                        .join('/')
                      if (isWindows) link = link.replace(/\//g, '\\')
                      window.open(link)
                      return
                    }

                    if (title === ACTION_COPY_PATH) {
                      let link = [sharedFolder, folder.path, name, item.name]
                        .filter(item => item)
                        .join('/')
                      if (isWindows) link = link.replace(/\//g, '\\')
                      copy(link, '已复制')
                      return
                    }

                    if (Object.keys(URL_TEMPLATES).includes(title)) {
                      const link = $.url(
                        sharedFolder,
                        folder.path,
                        name,
                        item.name,
                        URL_TEMPLATES[title]
                      )
                      Linking.openURL(link)
                      return
                    }
                  }}
                >
                  <Button
                    style={styles.btn}
                    styleText={styles.btnText}
                    type={btnType}
                    size='sm'
                    noWrap={false}
                  >
                    {epText}
                  </Button>
                </Popover>
              )
            }

            return null
          })}
        </Flex>
        <Flex style={_.mt.sm}>
          <Flex.Item>
            <Flex>
              {Object.entries(epsType)
                .filter(([, value]) => value)
                .map(([key, value]) => (
                  <Touchable
                    key={key}
                    style={_.mr.xs}
                    onPress={() => {
                      setFilter(filter === key ? '' : key)
                    }}
                  >
                    <Text size={12} type={filter && filter === key ? 'desc' : 'icon'}>
                      [{key}*{value}]
                    </Text>
                  </Touchable>
                ))}
            </Flex>
          </Flex.Item>
          <Touchable
            style={_.mr.xs}
            onPress={() => {
              $.onFile(name)
            }}
          >
            <Text size={12} type='icon'>
              [视频]
            </Text>
          </Touchable>
          <Touchable
            onPress={() => {
              setFulltime(!fulltime)
            }}
          >
            <Text size={11} lineHeight={12} type='icon'>
              [{fulltime ? lastModified : timeAgo(lastModified)}]
            </Text>
          </Touchable>
        </Flex>
      </>
    )
  })
}

export default c(FolderEp)
