#include <openssl/ssl.h>
#include <openssl/ech.h>
#include <openssl/bio.h>
#include <openssl/err.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/* Connect with GREASE ECH, return retry-config binary via out params.
   Returns: 1 = got retry-config, 0 = failed. */
int ech_get_retry_config(
    const char *host, int port,
    const char *outer_sni,
    unsigned char **out_config, size_t *out_len)
{
    if (!host || !outer_sni || !out_config || !out_len) return 0;
    *out_config = NULL;
    *out_len = 0;

    SSL_CTX *ctx = SSL_CTX_new(TLS_client_method());
    if (!ctx) return 0;

    SSL_CTX_set_min_proto_version(ctx, TLS1_3_VERSION);
    SSL_CTX_set_verify(ctx, SSL_VERIFY_NONE, NULL);
    SSL_CTX_set_options(ctx, SSL_OP_ECH_GREASE);

    char hostname[256];
    snprintf(hostname, sizeof(hostname), "%s:%d", host, port);

    BIO *bio = BIO_new_ssl_connect(ctx);
    if (!bio) { SSL_CTX_free(ctx); return 0; }

    BIO_set_conn_hostname(bio, hostname);

    // 设置连接超时: 通过 SSL_CTX 的 session timeout 控制 (10秒)
    SSL_CTX_set_timeout(ctx, 10);

    SSL *ssl = NULL;
    BIO_get_ssl(bio, &ssl);
    if (!ssl) { BIO_free_all(bio); SSL_CTX_free(ctx); return 0; }

    SSL_set_tlsext_host_name(ssl, outer_sni);

    int ret = 0;
    if (BIO_do_connect(bio) > 0) {
        int st = SSL_ech_get1_status(ssl, NULL, NULL);
        if (st != 1) {
            unsigned char *ec = NULL;
            size_t eclen = 0;
            if (SSL_ech_get1_retry_config(ssl, &ec, &eclen) == 1 && ec && eclen > 0) {
                // Use OPENSSL_malloc for consistency with OpenSSL's allocator
                *out_config = (unsigned char *)OPENSSL_malloc(eclen);
                if (*out_config) {
                    memcpy(*out_config, ec, eclen);
                    *out_len = eclen;
                    ret = 1;
                }
                OPENSSL_free(ec);
            }
        }
    }

    BIO_free_all(bio);
    SSL_CTX_free(ctx);
    return ret;
}

// Use OPENSSL_free to match OPENSSL_malloc in ech_get_retry_config
#include <openssl/crypto.h>
void ech_free(void *p) { if (p) OPENSSL_free(p); }
