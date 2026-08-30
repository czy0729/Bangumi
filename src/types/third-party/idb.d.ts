/*
 * idb 类型声明 (Web 平台使用，移动端不装此包)
 *
 * @Author: czy0729
 * @Date: 2026-08-30 07:02:43
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-30 07:02:43
 */
declare module 'idb' {
  export interface IDBUpgradeDB {
    createObjectStore(name: string): void
  }

  interface IDBTransaction {
    objectStore(name: string): IDBObjectStore
    done: Promise<void>
  }

  interface IDBObjectStore {
    put(value: unknown, key: string): void
    get(key: string): Promise<unknown>
    getAllKeys(): Promise<string[]>
    delete(key: string): void
  }

  interface IDBDatabase {
    transaction(name: string, mode?: 'readonly' | 'readwrite'): IDBTransaction
  }

  export function openDB(
    name: string,
    version: number,
    options?: {
      upgrade?: (db: IDBUpgradeDB) => void
    }
  ): Promise<IDBDatabase>
}
