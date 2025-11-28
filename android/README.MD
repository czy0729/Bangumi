# 开发安卓或打包 apk 前请先阅读

0. 安卓是 expo 下的 bare workflow，已经脱离了 expo 的环境很多年了，有条件请先尝试 iOS 环境开发，因为后面诸多问题，比如特定的 jdk 版本、子库的一次微小的版本发布，都会导致就是启动不起来。

1. 本 repo 默认提交 iOS 环境的 `package.json`，若你想开发安卓请先用 `./packages/android/package.json` 替换掉 `./package.json`，`/patches` 复制到根目录，再安装包。

2. 手机 USB 连接后允许调试授权，运行 `yarn dev` 会自动编译一个版本到手机，若后面报错 metro 无法正常启动，可以运行 `yarn metro` 不打包直接打开调试进程。

3. 若需要打包 apk 前请先使用自己的环境生成 `my-release-key.keystore` 放到 `./android/app/my-release-key.keystore`。

4. `./android/gradle_yours.properties` 重命名为 `gradle.properties`，并根据上面生成的 keystore 自行修改 `***` 的内容。可能还需要你手动创建 `local.properties` 编写 `sdk.dir=/Yours/Android/sdk`

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=***
MYAPP_RELEASE_STORE_PASSWORD=***
MYAPP_RELEASE_KEY_PASSWORD=***
```

5. 打包命令为 `yarn build`。

6. 打包完成后可以使用 `yarn open` or `yarn open:mac` 直达 apk 输出目录。
