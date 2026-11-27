import ExpoModulesCore
import Foundation

/**
 * 单次请求, 不跟随 3xx:
 * - 3xx: 合成 200 + JSON { location } + x-set-cookie, 与 Worker 节点 / Android 原生返回一致
 * - 其它: 原样返回状态码、响应头与响应体
 *
 * 使用 ephemeral session 且关闭 cookie 存储, 保证不会混入系统 cookie, 请求 cookie 全部由 JS 手写
 */
public class BangumiNativeHttpModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BangumiNativeHttp")

    AsyncFunction("fetchNoRedirect") { (url: String, method: String, headers: [String: String], body: String?) async throws -> [String: Any] in
      guard let requestURL = URL(string: url) else {
        throw NativeHttpError.invalidURL
      }

      var request = URLRequest(
        url: requestURL,
        cachePolicy: .reloadIgnoringLocalCacheData,
        timeoutInterval: 20
      )
      request.httpMethod = method.uppercased()
      request.httpShouldHandleCookies = false
      for (key, value) in headers {
        request.setValue(value, forHTTPHeaderField: key)
      }
      if let body, !body.isEmpty {
        request.httpBody = body.data(using: .utf8)
      }

      let configuration = URLSessionConfiguration.ephemeral
      configuration.httpShouldSetCookies = false
      configuration.httpCookieStorage = nil
      configuration.requestCachePolicy = .reloadIgnoringLocalCacheData

      let delegate = NoRedirectDelegate()
      let session = URLSession(configuration: configuration, delegate: delegate, delegateQueue: nil)
      defer { session.invalidateAndCancel() }

      let (data, response) = try await session.data(for: request, delegate: delegate)
      guard let http = response as? HTTPURLResponse else {
        throw NativeHttpError.invalidResponse
      }

      var resultHeaders: [String: String] = [:]
      for (key, value) in http.allHeaderFields {
        let name = String(describing: key)
        if let list = value as? [String] {
          resultHeaders[name] = list.joined(separator: ", ")
        } else {
          resultHeaders[name] = String(describing: value)
        }
      }

      let cookie = Self.headerValue(resultHeaders, name: "set-cookie")
      if !cookie.isEmpty {
        resultHeaders["x-set-cookie"] = cookie
      }

      #if DEBUG
        if (300...399).contains(http.statusCode), !cookie.contains("chii_auth") {
          print("[BangumiNativeHttp] 3xx without chii_auth, location=\(Self.headerValue(resultHeaders, name: "location"))")
        }
      #endif

      if (300...399).contains(http.statusCode) {
        // 与节点同款形态: 200 + location + cookie
        let location = Self.headerValue(resultHeaders, name: "location")
        resultHeaders.removeValue(forKey: "content-length")
        resultHeaders.removeValue(forKey: "content-length".capitalized)
        resultHeaders["content-type"] = "application/json; charset=utf-8"

        let payload = try JSONSerialization.data(withJSONObject: ["location": location])
        return [
          "status": 200,
          "headers": resultHeaders,
          "body": String(data: payload, encoding: .utf8) ?? "{\"location\":\"\"}"
        ]
      }

      return [
        "status": http.statusCode,
        "headers": resultHeaders,
        "body": String(data: data, encoding: .utf8) ?? ""
      ]
    }
  }

  /// 响应头大小写不敏感读取
  private static func headerValue(_ headers: [String: String], name: String) -> String {
    if let value = headers[name] {
      return value
    }

    for (key, value) in headers where key.lowercased() == name {
      return value
    }

    return ""
  }
}

/// 拦截跳转: 返回 nil 表示不跟随, 直接把 3xx 交给调用方
private final class NoRedirectDelegate: NSObject, URLSessionTaskDelegate {
  func urlSession(
    _ session: URLSession,
    task: URLSessionTask,
    willPerformHTTPRedirection response: HTTPURLResponse,
    newRequest request: URLRequest
  ) async -> URLRequest? {
    return nil
  }
}

private enum NativeHttpError: Error {
  case invalidURL
  case invalidResponse
}
