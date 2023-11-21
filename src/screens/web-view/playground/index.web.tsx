/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-15 12:41:56
 */
import React, { useRef } from 'react'
import { useObserver } from 'mobx-react'
import { Page, Header, Flex, Component } from '@components'

const Playground = () => {
  const inputRef = useRef(null)

  const handleFileChange = async () => {
    const files = inputRef.current.files
    if (files.length > 0) {
      readFiles(files)
    }
  }

  const folders = []
  const readFiles = files => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      folders.push({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath
      })
    }
    console.log(transformData(folders))
  }

  return useObserver(() => (
    <Component id='screen-playground'>
      <Header title=' ' />
      <Page>
        <Flex
          style={{
            flex: 1
          }}
          justify='center'
        >
          <input
            type='file'
            id='folderInput'
            // @ts-ignore
            webkitdirectory='true'
            directory='true'
            multiple
            ref={inputRef}
            onChange={handleFileChange}
          />
        </Flex>
      </Page>
    </Component>
  ))
}

export default Playground

function transformData(inputData) {
  const result = []
  const map = new Map()

  inputData.forEach(item => {
    const match = item.webkitRelativePath.match(/bangumi-(\d+)/)
    const folderName = item.webkitRelativePath.split('/').slice(0, -1).join('/')

    if (!map.has(folderName)) {
      map.set(folderName, {
        ids: [],
        lastModified: item.lastModifiedDate,
        list: [],
        name: folderName
      })
    }

    if (match) {
      const id = match[1]
      if (!map.get(folderName).ids.includes(id)) {
        map.get(folderName).ids.push(id)
      }
    }

    map.get(folderName).list.push({
      lastModified: item.lastModifiedDate,
      name: item.name,
      type: item.type
    })
  })

  map.forEach(value => {
    result.push(value)
  })

  return result
}
