# 开发安卓或打包 apk 前请先阅读

1. 本 repo 默认提交 iOS 环境的 `package.json`, 若你想开发安卓, 请先用 `./web/android/package.json` 替换掉 `./package.json`, 开发命令 `react-native run-android --no-jetifier`

2. 打包 apk 前请先使用自己的环境生成 `my-release-key.keystore` 放到 `./android/app/my-release-key.keystore`

3. `./android/gradle_yours.properties` 重命名为 `gradle.properties`, 并根据上面生成的 keystore 自行修改 `***` 的内容

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=***
MYAPP_RELEASE_STORE_PASSWORD=***
MYAPP_RELEASE_KEY_PASSWORD=***
```

4. 打包命令为 `cd android && ./gradlew assembleRelease`

5. 打包完成后可以使用 `open ./android/app/build/outputs/apk/release/` 直达
