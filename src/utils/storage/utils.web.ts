/*
 * Web 中使用 IndexedDB 替代 LocalStorage 以获得更大的本地存储
 * @Author: czy0729
 * @Date: 2023-11-01 13:41:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 14:23:26
 */
import { openDB } from 'idb'

const DB_NAME = 'bangumi-pro-db'
const STORE_NAME = 'bangumi-pro-store'
let db: Awaited<ReturnType<typeof openDB>>

/** 打开 IndexedDB 数据库 */
const openDatabase = () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      // 创建对象存储空间
      db.createObjectStore(STORE_NAME)
    }
  })

/** 将数据存储到 IndexedDB 中 */
export const setItem = async (key: string, value: any) => {
  if (!db) db = await openDatabase()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  store.put(value, key)
  await tx.done
}

/** 从 IndexedDB 中读取数据 */
export const getItem = async (key: string) => {
  if (!db) db = await openDatabase()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const result = await store.get(key)
  await tx.done
  return result
}

/** 获取所有的键值对 */
export const getAllKeys = async () => {
  if (!db) db = await openDatabase()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const keys = await store.getAllKeys()
  await tx.done
  return keys
}

/** 获取多个键对应的值 */
export const multiGet = async (keys: string[]) => {
  if (!db) db = await openDatabase()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const results = await Promise.all(keys.map(key => store.get(key)))
  await tx.done
  return results
}

/** 删除 IndexedDB 中的数据 */
export const removeItem = async (key: string) => {
  if (!db) db = await openDatabase()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  store.delete(key)
  await tx.done
}
