/// <reference types="node" />

import { Blob as Blob_2 } from 'buffer';
import { ConnectionOptions } from 'tls';
import type { DispatchFetch } from 'miniflare';
import { Duplex } from 'stream';
import { EventEmitter } from 'events';
import { EventEmitter as EventEmitter_2 } from 'node:events';
import { IncomingMessage } from 'http';
import type { IncomingRequestCfProperties } from '@cloudflare/workers-types/experimental';
import { IpcNetConnectOpts } from 'net';
import type { Json } from 'miniflare';
import type { MessagePort as MessagePort_2 } from 'worker_threads';
import type { Metafile } from 'esbuild';
import { Miniflare } from 'miniflare';
import type { MiniflareOptions } from 'miniflare';
import type { ModuleRule } from 'miniflare';
import { Mutex } from 'miniflare';
import type { NodeJSCompatMode } from 'miniflare';
import { Readable } from 'stream';
import { ReadableStream } from 'stream/web';
import type { Request as Request_2 } from 'miniflare';
import { Response as Response_2 } from 'miniflare';
import type { Server } from 'node:http';
import { ServerResponse } from 'http';
import { Socket } from 'net';
import { TcpNetConnectOpts } from 'net';
import { TLSSocket } from 'tls';
import { URL as URL_2 } from 'url';
import { UrlObject } from 'url';
import { URLSearchParams as URLSearchParams_2 } from 'url';
import type { WorkerOptions } from 'miniflare';
import { Writable } from 'stream';
import { z } from 'zod';

declare type AbortSignal_2 = unknown;

declare interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean
    passive?: boolean
    signal?: AbortSignal
}

declare class Agent extends Dispatcher{
    constructor(opts?: Agent.Options)
    /** `true` after `dispatcher.close()` has been called. */
    closed: boolean;
    /** `true` after `dispatcher.destroyed()` has been called or `dispatcher.close()` has been called and the dispatcher shutdown has completed. */
    destroyed: boolean;
    /** Dispatches a request. */
    dispatch(options: Agent.DispatchOptions, handler: Dispatcher.DispatchHandlers): boolean;
}

declare namespace Agent {
    interface Options extends Pool.Options {
        /** Default: `(origin, opts) => new Pool(origin, opts)`. */
        factory?(origin: string | URL_2, opts: Object): Dispatcher;
        /** Integer. Default: `0` */
        maxRedirections?: number;

        interceptors?: { Agent?: readonly Dispatcher.DispatchInterceptor[] } & Pool.Options["interceptors"]
    }

    interface DispatchOptions extends Dispatcher.DispatchOptions {
        /** Integer. */
        maxRedirections?: number;
    }
}

declare type ApiCredentials = {
    apiToken: string;
} | {
    authKey: string;
    authEmail: string;
};

declare type AssetConfig = z.infer<typeof AssetConfigSchema>;

declare const AssetConfigSchema: z.ZodObject<{
    html_handling: z.ZodOptional<z.ZodEnum<["auto-trailing-slash", "force-trailing-slash", "drop-trailing-slash", "none"]>>;
    not_found_handling: z.ZodOptional<z.ZodEnum<["single-page-application", "404-page", "none"]>>;
}, "strip", z.ZodTypeAny, {
    html_handling?: "none" | "auto-trailing-slash" | "force-trailing-slash" | "drop-trailing-slash";
    not_found_handling?: "none" | "single-page-application" | "404-page";
}, {
    html_handling?: "none" | "auto-trailing-slash" | "force-trailing-slash" | "drop-trailing-slash";
    not_found_handling?: "none" | "single-page-application" | "404-page";
}>;

declare type Assets = {
    /** Absolute path to assets directory */
    directory: string;
    binding?: string;
    html_handling?: "auto-trailing-slash" | "force-trailing-slash" | "drop-trailing-slash" | "none";
    not_found_handling?: "single-page-application" | "404-page" | "none";
};

declare type AssetsOptions = Pick<Assets, "directory" | "binding"> & {
    routingConfig: RoutingConfig;
    assetConfig: AssetConfig;
};

declare type AsyncHook<T extends HookValues, Args extends unknown[] = []> = Hook<T, Args> | Hook<Promise<T>, Args>;

declare class BalancedPool extends Dispatcher {
    constructor(url: string | string[] | URL_2 | URL_2[], options?: Pool.Options);

    addUpstream(upstream: string | URL_2): BalancedPool;
    removeUpstream(upstream: string | URL_2): BalancedPool;
    upstreams: Array<string>;

    /** `true` after `pool.close()` has been called. */
    closed: boolean;
    /** `true` after `pool.destroyed()` has been called or `pool.close()` has been called and the pool shutdown has completed. */
    destroyed: boolean;
}

declare type BaseErrorEvent<Source = string, Data = undefined> = {
    type: "error";
    reason: string;
    cause: Error | SerializedError;
    source: Source;
    data: Data;
};

declare type BinaryFile = File_2<Uint8Array>;

declare type BinaryType = 'blob' | 'arraybuffer'

declare type Binding = {
    type: "plain_text";
    value: string;
} | {
    type: "json";
    value: Json;
} | ({
    type: "kv_namespace";
} & BindingOmit<CfKvNamespace>) | ({
    type: "send_email";
} & BindingOmit<CfSendEmailBindings>) | {
    type: "wasm_module";
    source: BinaryFile;
} | {
    type: "text_blob";
    source: File_2;
} | {
    type: "browser";
} | {
    type: "ai";
} | {
    type: "version_metadata";
} | {
    type: "data_blob";
    source: BinaryFile;
} | ({
    type: "durable_object_namespace";
} & BindingOmit<CfDurableObject>) | ({
    type: "queue";
} & BindingOmit<CfQueue>) | ({
    type: "r2_bucket";
} & BindingOmit<CfR2Bucket>) | ({
    type: "d1";
} & Omit<CfD1Database, "binding">) | ({
    type: "vectorize";
} & Omit<CfVectorize, "binding">) | ({
    type: "hyperdrive";
} & Omit<CfHyperdrive, "binding">) | ({
    type: "service";
} & Omit<CfService, "binding">) | {
    type: "fetcher";
    fetcher: ServiceFetch;
} | ({
    type: "analytics_engine";
} & Omit<CfAnalyticsEngineDataset, "binding">) | ({
    type: "dispatch_namespace";
} & Omit<CfDispatchNamespace, "binding">) | ({
    type: "mtls_certificate";
} & Omit<CfMTlsCertificate, "binding">) | ({
    type: "pipeline";
} & Omit<CfPipeline, "binding">) | ({
    type: "logfwdr";
} & Omit<CfLogfwdrBinding, "name">) | {
    type: `unsafe_${string}`;
} | {
    type: "assets";
};

declare type BindingOmit<T> = Omit<T, "binding" | "name">;

/**
 * Result of the `getBindingsProxy` utility
 */
export declare type BindingsProxy<Bindings = Record<string, unknown>, CfProperties extends Record<string, unknown> = IncomingRequestCfProperties> = Omit<PlatformProxy<Bindings, CfProperties>, "env"> & {
    /**
     * Object containing the various proxies
     */
    bindings: Bindings;
};

declare interface BlobPropertyBag {
    type?: string
    endings?: 'native' | 'transparent'
}

declare type BodyInit =
| ArrayBuffer
| AsyncIterable<Uint8Array>
| Blob_2
| FormData_2
| Iterable<Uint8Array>
| NodeJS.ArrayBufferView
| URLSearchParams_2
| null
| string

declare interface BodyMixin {
    readonly body: ReadableStream | null
    readonly bodyUsed: boolean

    readonly arrayBuffer: () => Promise<ArrayBuffer>
    readonly blob: () => Promise<Blob_2>
    readonly formData: () => Promise<FormData_2>
    readonly json: () => Promise<unknown>
    readonly text: () => Promise<string>
}

declare class BodyReadable extends Readable {
    constructor(
    resume?: (this: Readable, size: number) => void | null,
    abort?: () => void | null,
    contentType?: string
    )

    /** Consumes and returns the body as a string
     *  https://fetch.spec.whatwg.org/#dom-body-text
     */
    text(): Promise<string>

    /** Consumes and returns the body as a JavaScript Object
     *  https://fetch.spec.whatwg.org/#dom-body-json
     */
    json(): Promise<unknown>

    /** Consumes and returns the body as a Blob
     *  https://fetch.spec.whatwg.org/#dom-body-blob
     */
    blob(): Promise<Blob_2>

    /** Consumes and returns the body as an ArrayBuffer
     *  https://fetch.spec.whatwg.org/#dom-body-arraybuffer
     */
    arrayBuffer(): Promise<ArrayBuffer>

    /** Not implemented
     *
     *  https://fetch.spec.whatwg.org/#dom-body-formdata
     */
    formData(): Promise<never>

    /** Returns true if the body is not null and the body has been consumed
     *
     *  Otherwise, returns false
     *
     * https://fetch.spec.whatwg.org/#dom-body-bodyused
     */
    readonly bodyUsed: boolean

    /** Throws on node 16.6.0
     *
     *  If body is null, it should return null as the body
     *
     *  If body is not null, should return the body as a ReadableStream
     *
     *  https://fetch.spec.whatwg.org/#dom-body-body
     */
    readonly body: never | undefined

    /** Dumps the response body by reading `limit` number of bytes.
     * @param opts.limit Number of bytes to read (optional) - Default: 262144
     */
    dump(opts?: { limit: number }): Promise<void>
}

declare function buildConnector (options?: buildConnector.BuildOptions): buildConnector.connector

declare namespace buildConnector {
    type BuildOptions = (ConnectionOptions | TcpNetConnectOpts | IpcNetConnectOpts) & {
        allowH2?: boolean;
        maxCachedSessions?: number | null;
        socketPath?: string | null;
        timeout?: number | null;
        port?: number;
        keepAlive?: boolean | null;
        keepAliveInitialDelay?: number | null;
    }

    interface Options {
        hostname: string
        host?: string
        protocol: string
        port: string
        servername?: string
        localAddress?: string | null
        httpSocket?: Socket
    }

    type Callback = (...args: CallbackArgs) => void
    type CallbackArgs = [null, Socket | TLSSocket] | [Error, null]

    interface connector {
        (options: buildConnector.Options, callback: buildConnector.Callback): void
    }
}

declare type Bundle = EsbuildBundle;

declare type BundleCompleteEvent = {
    type: "bundleComplete";
    config: StartDevWorkerOptions;
    bundle: Bundle;
};

declare class BundlerController extends Controller<BundlerControllerEventMap> {
    #private;
    onConfigUpdate(event: ConfigUpdateEvent): void;
    teardown(): Promise<void>;
    emitBundleStartEvent(config: StartDevWorkerOptions): void;
    emitBundleCompleteEvent(config: StartDevWorkerOptions, bundle: EsbuildBundle): void;
}

declare type BundlerControllerEventMap = ControllerEventMap & {
    bundleStart: [BundleStartEvent];
    bundleComplete: [BundleCompleteEvent];
};

declare type BundleStartEvent = {
    type: "bundleStart";
    config: StartDevWorkerOptions;
};

declare interface Cache {
    match (request: RequestInfo, options?: CacheQueryOptions): Promise<Response | undefined>,
    matchAll (request?: RequestInfo, options?: CacheQueryOptions): Promise<readonly Response[]>,
    add (request: RequestInfo): Promise<undefined>,
    addAll (requests: RequestInfo[]): Promise<undefined>,
    put (request: RequestInfo, response: Response): Promise<undefined>,
    delete (request: RequestInfo, options?: CacheQueryOptions): Promise<boolean>,
    keys (request?: RequestInfo, options?: CacheQueryOptions): Promise<readonly Request[]>
}

/**
 * No-op implementation of Cache
 */
declare class Cache_2 {
    delete(request: CacheRequest, options?: CacheQueryOptions_2): Promise<boolean>;
    match(request: CacheRequest, options?: CacheQueryOptions_2): Promise<CacheResponse | undefined>;
    put(request: CacheRequest, response: CacheResponse): Promise<void>;
}

declare interface CacheQueryOptions {
    ignoreSearch?: boolean,
    ignoreMethod?: boolean,
    ignoreVary?: boolean
}

declare type CacheQueryOptions_2 = {
    ignoreMethod?: boolean;
};

declare type CacheRequest = any;

declare type CacheResponse = any;

declare const caches: CacheStorage;

declare interface CacheStorage {
    match (request: RequestInfo, options?: MultiCacheQueryOptions): Promise<Response | undefined>,
    has (cacheName: string): Promise<boolean>,
    open (cacheName: string): Promise<Cache>,
    delete (cacheName: string): Promise<boolean>,
    keys (): Promise<string[]>
}

declare const CacheStorage: {
    prototype: CacheStorage
    new(): CacheStorage
};

/**
 * Note about this file:
 *
 * Here we are providing a no-op implementation of the runtime Cache API instead of using
 * the miniflare implementation (via `mf.getCaches()`).
 *
 * We are not using miniflare's implementation because that would require the user to provide
 * miniflare-specific Request objects and they would receive back miniflare-specific Response
 * objects, this (in particular the Request part) is not really suitable for `getPlatformProxy`
 * as people would ideally interact with their bindings in a very production-like manner and
 * requiring them to deal with miniflare-specific classes defeats a bit the purpose of the utility.
 *
 * Similarly the Request and Response types here are set to `undefined` as not to use specific ones
 * that would require us to make a choice right now or the user to adapt their code in order to work
 * with the api.
 *
 * We need to find a better/generic manner in which we can reuse the miniflare cache implementation,
 * but until then the no-op implementation below will have to do.
 */
/**
 * No-op implementation of CacheStorage
 */
declare class CacheStorage_2 {
    constructor();
    open(cacheName: string): Promise<Cache_2>;
    get default(): Cache_2;
}

/**
 * A Cloudflare account.
 */
declare interface CfAccount {
    /**
     * An API token.
     *
     * @link https://api.cloudflare.com/#user-api-tokens-properties
     */
    apiToken: ApiCredentials;
    /**
     * An account ID.
     */
    accountId: string;
}

declare interface CfAnalyticsEngineDataset {
    binding: string;
    dataset?: string;
}

declare type CfCapnp = {
    base_path?: never;
    source_schemas?: never;
    compiled_schema: string;
} | {
    base_path: string;
    source_schemas: string[];
    compiled_schema?: never;
};

declare interface CfD1Database {
    binding: string;
    database_id: string;
    database_name: string;
    preview_database_id?: string;
    database_internal_env?: string;
    migrations_table?: string;
    migrations_dir?: string;
}

declare interface CfDispatchNamespace {
    binding: string;
    namespace: string;
    outbound?: {
        service: string;
        environment?: string;
        parameters?: string[];
    };
}

/**
 * A Durable Object.
 */
declare interface CfDurableObject {
    name: string;
    class_name: string;
    script_name?: string;
    environment?: string;
}

declare interface CfHyperdrive {
    binding: string;
    id: string;
    localConnectionString?: string;
}

/**
 * A KV namespace.
 */
declare interface CfKvNamespace {
    binding: string;
    id: string;
}

declare interface CfLogfwdrBinding {
    name: string;
    destination: string;
}

/**
 * An imported module.
 */
declare interface CfModule {
    /**
     * The module name.
     *
     * @example
     * './src/index.js'
     */
    name: string;
    /**
     * The absolute path of the module on disk, or `undefined` if this is a
     * virtual module. Used as the source URL for this module, so source maps are
     * correctly resolved.
     *
     * @example
     * '/path/to/src/index.js'
     */
    filePath: string | undefined;
    /**
     * The module content, usually JavaScript or WASM code.
     *
     * @example
     * export default {
     *   async fetch(request) {
     *     return new Response('Ok')
     *   }
     * }
     */
    content: string | Buffer;
    /**
     * An optional sourcemap for this module if it's of a ESM or CJS type, this will only be present
     * if we're deploying with sourcemaps enabled. Since we copy extra modules that aren't bundled
     * we need to also copy the relevant sourcemaps into the final out directory.
     */
    sourceMap?: CfWorkerSourceMap;
    /**
     * The module type.
     *
     * If absent, will default to the main module's type.
     */
    type?: CfModuleType;
}

/**
 * A module type.
 */
declare type CfModuleType = "esm" | "commonjs" | "compiled-wasm" | "text" | "buffer" | "python" | "python-requirement" | "nodejs-compat-module";

declare interface CfMTlsCertificate {
    binding: string;
    certificate_id: string;
}

declare interface CfPipeline {
    binding: string;
    pipeline: string;
}

declare interface CfQueue {
    binding: string;
    queue_name: string;
    delivery_delay?: number;
}

declare interface CfR2Bucket {
    binding: string;
    bucket_name: string;
    jurisdiction?: string;
}

/**
 * The type of Worker
 */
declare type CfScriptFormat = "modules" | "service-worker";

/**
 * A binding to send email.
 */
declare interface CfSendEmailBindings {
    name: string;
    destination_address?: string;
    allowed_destination_addresses?: string[];
}

declare interface CfService {
    binding: string;
    service: string;
    environment?: string;
    entrypoint?: string;
}

declare interface CfUnsafe {
    bindings: CfUnsafeBinding[] | undefined;
    metadata: CfUnsafeMetadata | undefined;
    capnp: CfCapnp | undefined;
}

declare interface CfUnsafeBinding {
    name: string;
    type: string;
}

declare type CfUnsafeMetadata = Record<string, unknown>;

declare interface CfVectorize {
    binding: string;
    index_name: string;
}

declare interface CfWorkerSourceMap {
    /**
     * The name of the source map.
     *
     * @example
     * 'out.js.map'
     */
    name: string;
    /**
     * The content of the source map, which is a JSON object described by the v3
     * spec.
     *
     * @example
     * {
     *   "version" : 3,
     *   "file": "out.js",
     *   "sourceRoot": "",
     *   "sources": ["foo.js", "bar.js"],
     *   "sourcesContent": [null, null],
     *   "names": ["src", "maps", "are", "fun"],
     *   "mappings": "A,AAAB;;ABCDE;"
     * }
     */
    content: string | Buffer;
}

/**
 * A basic HTTP/1.1 client, mapped on top a single TCP/TLS connection. Pipelining is disabled by default.
 */
declare class Client extends Dispatcher {
    constructor(url: string | URL_2, options?: Client.Options);
    /** Property to get and set the pipelining factor. */
    pipelining: number;
    /** `true` after `client.close()` has been called. */
    closed: boolean;
    /** `true` after `client.destroyed()` has been called or `client.close()` has been called and the client shutdown has completed. */
    destroyed: boolean;
}

declare namespace Client {
    interface OptionsInterceptors {
        Client: readonly Dispatcher.DispatchInterceptor[];
    }
    interface Options {
        /** TODO */
        interceptors?: OptionsInterceptors;
        /** The maximum length of request headers in bytes. Default: Node.js' `--max-http-header-size` or `16384` (16KiB). */
        maxHeaderSize?: number;
        /** The amount of time, in milliseconds, the parser will wait to receive the complete HTTP headers (Node 14 and above only). Default: `300e3` milliseconds (300s). */
        headersTimeout?: number;
        /** @deprecated unsupported socketTimeout, use headersTimeout & bodyTimeout instead */
        socketTimeout?: never;
        /** @deprecated unsupported requestTimeout, use headersTimeout & bodyTimeout instead */
        requestTimeout?: never;
        /** TODO */
        connectTimeout?: number;
        /** The timeout after which a request will time out, in milliseconds. Monitors time between receiving body data. Use `0` to disable it entirely. Default: `300e3` milliseconds (300s). */
        bodyTimeout?: number;
        /** @deprecated unsupported idleTimeout, use keepAliveTimeout instead */
        idleTimeout?: never;
        /** @deprecated unsupported keepAlive, use pipelining=0 instead */
        keepAlive?: never;
        /** the timeout, in milliseconds, after which a socket without active requests will time out. Monitors time between activity on a connected socket. This value may be overridden by *keep-alive* hints from the server. Default: `4e3` milliseconds (4s). */
        keepAliveTimeout?: number;
        /** @deprecated unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead */
        maxKeepAliveTimeout?: never;
        /** the maximum allowed `idleTimeout`, in milliseconds, when overridden by *keep-alive* hints from the server. Default: `600e3` milliseconds (10min). */
        keepAliveMaxTimeout?: number;
        /** A number of milliseconds subtracted from server *keep-alive* hints when overriding `idleTimeout` to account for timing inaccuracies caused by e.g. transport latency. Default: `1e3` milliseconds (1s). */
        keepAliveTimeoutThreshold?: number;
        /** TODO */
        socketPath?: string;
        /** The amount of concurrent requests to be sent over the single TCP/TLS connection according to [RFC7230](https://tools.ietf.org/html/rfc7230#section-6.3.2). Default: `1`. */
        pipelining?: number;
        /** @deprecated use the connect option instead */
        tls?: never;
        /** If `true`, an error is thrown when the request content-length header doesn't match the length of the request body. Default: `true`. */
        strictContentLength?: boolean;
        /** TODO */
        maxCachedSessions?: number;
        /** TODO */
        maxRedirections?: number;
        /** TODO */
        connect?: buildConnector.BuildOptions | buildConnector.connector;
        /** TODO */
        maxRequestsPerClient?: number;
        /** TODO */
        localAddress?: string;
        /** Max response body size in bytes, -1 is disabled */
        maxResponseSize?: number;
        /** Enables a family autodetection algorithm that loosely implements section 5 of RFC 8305. */
        autoSelectFamily?: boolean;
        /** The amount of time in milliseconds to wait for a connection attempt to finish before trying the next address when using the `autoSelectFamily` option. */
        autoSelectFamilyAttemptTimeout?: number;
        /**
         * @description Enables support for H2 if the server has assigned bigger priority to it through ALPN negotiation.
         * @default false
         */
        allowH2?: boolean;
        /**
         * @description Dictates the maximum number of concurrent streams for a single H2 session. It can be overridden by a SETTINGS remote frame.
         * @default 100
         */
        maxConcurrentStreams?: number
    }
    interface SocketInfo {
        localAddress?: string
        localPort?: number
        remoteAddress?: string
        remotePort?: number
        remoteFamily?: string
        timeout?: number
        bytesWritten?: number
        bytesRead?: number
    }
}

declare interface CloseEvent extends Event_2 {
    readonly code: number
    readonly reason: string
    readonly wasClean: boolean
}

declare const CloseEvent: {
    prototype: CloseEvent
    new (type: string, eventInitDict?: CloseEventInit): CloseEvent
};

declare interface CloseEventInit extends EventInit {
    code?: number
    reason?: string
    wasClean?: boolean
}

/**
 * Configuration in wrangler for Cloudchamber
 */
declare type CloudchamberConfig = {
    image?: string;
    location?: string;
    vcpu?: number;
    memory?: string;
    ipv4?: boolean;
};

/**
 * This is the static type definition for the configuration object.
 *
 * It reflects a normalized and validated version of the configuration that you can write in wrangler.toml,
 * and optionally augment with arguments passed directly to wrangler.
 *
 * For more information about the configuration object, see the
 * documentation at https://developers.cloudflare.com/workers/cli-wrangler/configuration
 *
 * Notes:
 *
 * - Fields that are only specified in `ConfigFields` and not `Environment` can only appear
 * in the top level config and should not appear in any environments.
 * - Fields that are specified in `PagesConfigFields` are only relevant for Pages projects
 * - All top level fields in config and environments are optional in the wrangler.toml file.
 *
 * Legend for the annotations:
 *
 * - `@breaking`: the deprecation/optionality is a breaking change from Wrangler v1.
 * - `@todo`: there's more work to be done (with details attached).
 */
declare type Config = ConfigFields<DevConfig> & PagesConfigFields & Environment;

declare class ConfigController extends Controller<ConfigControllerEventMap> {
    #private;
    latestInput?: StartDevWorkerInput;
    latestConfig?: StartDevWorkerOptions;
    set(input: StartDevWorkerInput, throwErrors?: boolean): Promise<StartDevWorkerOptions | undefined>;
    patch(input: Partial<StartDevWorkerInput>): Promise<StartDevWorkerOptions | undefined>;
    teardown(): Promise<void>;
    emitConfigUpdateEvent(config: StartDevWorkerOptions): void;
}

declare type ConfigControllerEventMap = ControllerEventMap & {
    configUpdate: [ConfigUpdateEvent];
};

declare interface ConfigFields<Dev extends RawDevConfig> {
    configPath: string | undefined;
    /**
     * A boolean to enable "legacy" style wrangler environments (from Wrangler v1).
     * These have been superseded by Services, but there may be projects that won't
     * (or can't) use them. If you're using a legacy environment, you can set this
     * to `true` to enable it.
     */
    legacy_env: boolean;
    /**
     * Whether Wrangler should send usage metrics to Cloudflare for this project.
     *
     * When defined this will override any user settings.
     * Otherwise, Wrangler will use the user's preference.
     */
    send_metrics: boolean | undefined;
    /**
     * Options to configure the development server that your worker will use.
     */
    dev: Dev;
    /**
     * The definition of a Worker Site, a feature that lets you upload
     * static assets with your Worker.
     *
     * More details at https://developers.cloudflare.com/workers/platform/sites
     */
    site: {
        /**
         * The directory containing your static assets.
         *
         * It must be a path relative to your wrangler.toml file.
         * Example: bucket = "./public"
         *
         * If there is a `site` field then it must contain this `bucket` field.
         */
        bucket: string;
        /**
         * The location of your Worker script.
         *
         * @deprecated DO NOT use this (it's a holdover from Wrangler v1.x). Either use the top level `main` field, or pass the path to your entry file as a command line argument.
         * @breaking
         */
        "entry-point"?: string;
        /**
         * An exclusive list of .gitignore-style patterns that match file
         * or directory names from your bucket location. Only matched
         * items will be uploaded. Example: include = ["upload_dir"]
         *
         * @optional
         * @default []
         */
        include?: string[];
        /**
         * A list of .gitignore-style patterns that match files or
         * directories in your bucket that should be excluded from
         * uploads. Example: exclude = ["ignore_dir"]
         *
         * @optional
         * @default []
         */
        exclude?: string[];
    } | undefined;
    /**
     * Old behaviour of serving a folder of static assets with your Worker,
     * without any additional code.
     * This can either be a string, or an object with additional config
     * fields.
     * Will be deprecated in the near future in favor of `assets`.
     */
    legacy_assets: {
        bucket: string;
        include: string[];
        exclude: string[];
        browser_TTL: number | undefined;
        serve_single_page_app: boolean;
    } | string | undefined;
    /**
     * A list of wasm modules that your worker should be bound to. This is
     * the "legacy" way of binding to a wasm module. ES module workers should
     * do proper module imports.
     */
    wasm_modules: {
        [key: string]: string;
    } | undefined;
    /**
     * A list of text files that your worker should be bound to. This is
     * the "legacy" way of binding to a text file. ES module workers should
     * do proper module imports.
     */
    text_blobs: {
        [key: string]: string;
    } | undefined;
    /**
     * A list of data files that your worker should be bound to. This is
     * the "legacy" way of binding to a data file. ES module workers should
     * do proper module imports.
     */
    data_blobs: {
        [key: string]: string;
    } | undefined;
    /**
     * A map of module aliases. Lets you swap out a module for any others.
     * Corresponds with esbuild's `alias` config
     */
    alias: {
        [key: string]: string;
    } | undefined;
    /**
     * By default, wrangler.toml is the source of truth for your environment configuration, like a terraform file.
     *
     * If you change your vars in the dashboard, wrangler *will* override/delete them on its next deploy.
     *
     * If you want to keep your dashboard vars when wrangler deploys, set this field to true.
     *
     * @default false
     * @nonInheritable
     */
    keep_vars?: boolean;
}

/**
 * The possible types for a `Rule`.
 */
declare type ConfigModuleRuleType = "ESModule" | "CommonJS" | "CompiledWasm" | "Text" | "Data" | "PythonModule" | "PythonRequirement" | "NodeJsCompatModule";

declare type ConfigUpdateEvent = {
    type: "configUpdate";
    config: StartDevWorkerOptions;
};

/** Starts two-way communications with the requested resource. */
declare function connect(
url: string | URL_2 | UrlObject,
options?: { dispatcher?: Dispatcher } & Omit<Dispatcher.ConnectOptions, 'origin' | 'path'>
): Promise<Dispatcher.ConnectData>;

declare abstract class Controller<EventMap extends ControllerEventMap = ControllerEventMap> extends TypedEventEmitterImpl<EventMap> {
    emitErrorEvent(data: ErrorEvent): void;
}

declare type ControllerEventMap = {
    error: [ErrorEvent];
};

declare interface Cookie {
    name: string
    value: string
    expires?: Date | number
    maxAge?: number
    domain?: string
    path?: string
    secure?: boolean
    httpOnly?: boolean
    sameSite?: 'Strict' | 'Lax' | 'None'
    unparsed?: string[]
}

declare function createRedirectInterceptor (opts: RedirectInterceptorOpts): Dispatcher.DispatchInterceptor

declare type CustomDomainRoute = {
    pattern: string;
    custom_domain: boolean;
};

declare class DecoratorHandler implements Dispatcher.DispatchHandlers{
    constructor (handler: Dispatcher.DispatchHandlers)
}

declare type DeferredPromise<T> = {
    promise: Promise<T>;
    resolve: (_: MaybePromise<T>) => void;
    reject: (_: Error) => void;
};

declare function deleteCookie (
headers: Headers,
name: string,
attributes?: { name?: string, domain?: string }
): void

/**
 * Publish a directory to an account/project.
 * NOTE: You will need the `CLOUDFLARE_API_KEY` environment
 * variable set
 */
declare function deploy({ directory, accountId, projectName, branch, skipCaching, commitMessage, commitHash, commitDirty, functionsDirectory: customFunctionsDirectory, bundle, sourceMaps, args, }: PagesDeployOptions): Promise<{
    url: string;
    id: string;
    environment: "production" | "preview";
    build_config: {
        build_command: string;
        destination_dir: string;
        root_dir: string;
        web_analytics_tag?: string | undefined;
        web_analytics_token?: string | undefined;
        fast_builds?: boolean | undefined;
    };
    created_on: string;
    production_branch: string;
    project_id: string;
    project_name: string;
    deployment_trigger: {
        metadata: {
            branch: string;
            commit_hash: string;
            commit_message: string;
        };
        type: string;
    };
    latest_stage: {
        name: "queued" | "build" | "deploy" | "initialize" | "clone_repo";
        status: "active" | "idle" | "canceled" | "success" | "failure" | "skipped";
        started_on: string | null;
        ended_on: string | null;
    };
    stages: {
        name: "queued" | "build" | "deploy" | "initialize" | "clone_repo";
        status: "active" | "idle" | "canceled" | "success" | "failure" | "skipped";
        started_on: string | null;
        ended_on: string | null;
    }[];
    aliases: string[];
    modified_on: string;
    short_id: string;
    build_image_major_version: number;
    source?: {
        type: "github" | "gitlab";
        config: {
            owner: string;
            repo_name: string;
            production_branch?: string | undefined;
            pr_comments_enabled?: boolean | undefined;
            deployments_enabled?: boolean | undefined;
            production_deployments_enabled?: boolean | undefined;
            preview_deployment_setting?: "none" | "all" | "custom" | undefined;
            preview_branch_includes?: string[] | undefined;
            preview_branch_excludes?: string[] | undefined;
        };
    } | undefined;
    kv_namespaces?: any;
    env_vars?: any;
    durable_object_namespaces?: any;
    is_skipped?: boolean | undefined;
    files?: {
        [x: string]: string | undefined;
    } | undefined;
}>;

/**
 * Deprecated upload configuration.
 */
declare interface DeprecatedUpload {
    /**
     * The format of the Worker script.
     *
     * @deprecated We infer the format automatically now.
     */
    format?: "modules" | "service-worker";
    /**
     * The directory you wish to upload your Worker from,
     * relative to the wrangler.toml file.
     *
     * Defaults to the directory containing the wrangler.toml file.
     *
     * @deprecated
     */
    dir?: string;
    /**
     * The path to the Worker script, relative to `upload.dir`.
     *
     * @deprecated This will be replaced by a command line argument.
     */
    main?: string;
    /**
     * @deprecated This is now defined at the top level `rules` field.
     */
    rules?: Environment["rules"];
}

declare interface DevConfig {
    /**
     * IP address for the local dev server to listen on,
     *
     * @default localhost
     */
    ip: string;
    /**
     * Port for the local dev server to listen on
     *
     * @default 8787
     */
    port: number | undefined;
    /**
     * Port for the local dev server's inspector to listen on
     *
     * @default 9229
     */
    inspector_port: number | undefined;
    /**
     * Protocol that local wrangler dev server listens to requests on.
     *
     * @default http
     */
    local_protocol: "http" | "https";
    /**
     * Protocol that wrangler dev forwards requests on
     *
     * Setting this to `http` is not currently implemented for remote mode.
     * See https://github.com/cloudflare/workers-sdk/issues/583
     *
     * @default https
     */
    upstream_protocol: "https" | "http";
    /**
     * Host to forward requests to, defaults to the host of the first route of project
     */
    host: string | undefined;
}

declare type DevToolsEvent<Method extends _EventMethods> = Method extends unknown ? {
    method: Method;
    params: _Params<ProtocolMapping.Events[Method]>;
} : never;

declare namespace DiagnosticsChannel {
    interface Request {
        origin?: string | URL_2;
        completed: boolean;
        method?: Dispatcher.HttpMethod;
        path: string;
        headers: string;
        addHeader(key: string, value: string): Request;
    }
    interface Response {
        statusCode: number;
        statusText: string;
        headers: Array<Buffer>;
    }
    type Error = unknown;
    interface ConnectParams {
        host: URL_2["host"];
        hostname: URL_2["hostname"];
        protocol: URL_2["protocol"];
        port: URL_2["port"];
        servername: string | null;
    }
    type Connector = buildConnector.connector;
    interface RequestCreateMessage {
        request: Request;
    }
    interface RequestBodySentMessage {
        request: Request;
    }
    interface RequestHeadersMessage {
        request: Request;
        response: Response;
    }
    interface RequestTrailersMessage {
        request: Request;
        trailers: Array<Buffer>;
    }
    interface RequestErrorMessage {
        request: Request;
        error: Error;
    }
    interface ClientSendHeadersMessage {
        request: Request;
        headers: string;
        socket: Socket;
    }
    interface ClientBeforeConnectMessage {
        connectParams: ConnectParams;
        connector: Connector;
    }
    interface ClientConnectedMessage {
        socket: Socket;
        connectParams: ConnectParams;
        connector: Connector;
    }
    interface ClientConnectErrorMessage {
        error: Error;
        socket: Socket;
        connectParams: ConnectParams;
        connector: Connector;
    }
}

/** Dispatcher is the core API used to dispatch requests. */
declare class Dispatcher extends EventEmitter {
    /** Dispatches a request. This API is expected to evolve through semver-major versions and is less stable than the preceding higher level APIs. It is primarily intended for library developers who implement higher level APIs on top of this. */
    dispatch(options: Dispatcher.DispatchOptions, handler: Dispatcher.DispatchHandlers): boolean;
    /** Starts two-way communications with the requested resource. */
    connect(options: Dispatcher.ConnectOptions): Promise<Dispatcher.ConnectData>;
    connect(options: Dispatcher.ConnectOptions, callback: (err: Error | null, data: Dispatcher.ConnectData) => void): void;
    /** Performs an HTTP request. */
    request(options: Dispatcher.RequestOptions): Promise<Dispatcher.ResponseData>;
    request(options: Dispatcher.RequestOptions, callback: (err: Error | null, data: Dispatcher.ResponseData) => void): void;
    /** For easy use with `stream.pipeline`. */
    pipeline(options: Dispatcher.PipelineOptions, handler: Dispatcher.PipelineHandler): Duplex;
    /** A faster version of `Dispatcher.request`. */
    stream(options: Dispatcher.RequestOptions, factory: Dispatcher.StreamFactory): Promise<Dispatcher.StreamData>;
    stream(options: Dispatcher.RequestOptions, factory: Dispatcher.StreamFactory, callback: (err: Error | null, data: Dispatcher.StreamData) => void): void;
    /** Upgrade to a different protocol. */
    upgrade(options: Dispatcher.UpgradeOptions): Promise<Dispatcher.UpgradeData>;
    upgrade(options: Dispatcher.UpgradeOptions, callback: (err: Error | null, data: Dispatcher.UpgradeData) => void): void;
    /** Closes the client and gracefully waits for enqueued requests to complete before invoking the callback (or returning a promise if no callback is provided). */
    close(): Promise<void>;
    close(callback: () => void): void;
    /** Destroy the client abruptly with the given err. All the pending and running requests will be asynchronously aborted and error. Waits until socket is closed before invoking the callback (or returning a promise if no callback is provided). Since this operation is asynchronously dispatched there might still be some progress on dispatched requests. */
    destroy(): Promise<void>;
    destroy(err: Error | null): Promise<void>;
    destroy(callback: () => void): void;
    destroy(err: Error | null, callback: () => void): void;

    on(eventName: 'connect', callback: (origin: URL_2, targets: readonly Dispatcher[]) => void): this;
    on(eventName: 'disconnect', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    on(eventName: 'connectionError', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    on(eventName: 'drain', callback: (origin: URL_2) => void): this;


    once(eventName: 'connect', callback: (origin: URL_2, targets: readonly Dispatcher[]) => void): this;
    once(eventName: 'disconnect', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    once(eventName: 'connectionError', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    once(eventName: 'drain', callback: (origin: URL_2) => void): this;


    off(eventName: 'connect', callback: (origin: URL_2, targets: readonly Dispatcher[]) => void): this;
    off(eventName: 'disconnect', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    off(eventName: 'connectionError', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    off(eventName: 'drain', callback: (origin: URL_2) => void): this;


    addListener(eventName: 'connect', callback: (origin: URL_2, targets: readonly Dispatcher[]) => void): this;
    addListener(eventName: 'disconnect', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    addListener(eventName: 'connectionError', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    addListener(eventName: 'drain', callback: (origin: URL_2) => void): this;

    removeListener(eventName: 'connect', callback: (origin: URL_2, targets: readonly Dispatcher[]) => void): this;
    removeListener(eventName: 'disconnect', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    removeListener(eventName: 'connectionError', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    removeListener(eventName: 'drain', callback: (origin: URL_2) => void): this;

    prependListener(eventName: 'connect', callback: (origin: URL_2, targets: readonly Dispatcher[]) => void): this;
    prependListener(eventName: 'disconnect', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    prependListener(eventName: 'connectionError', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    prependListener(eventName: 'drain', callback: (origin: URL_2) => void): this;

    prependOnceListener(eventName: 'connect', callback: (origin: URL_2, targets: readonly Dispatcher[]) => void): this;
    prependOnceListener(eventName: 'disconnect', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    prependOnceListener(eventName: 'connectionError', callback: (origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void): this;
    prependOnceListener(eventName: 'drain', callback: (origin: URL_2) => void): this;

    listeners(eventName: 'connect'): ((origin: URL_2, targets: readonly Dispatcher[]) => void)[]
    listeners(eventName: 'disconnect'): ((origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void)[];
    listeners(eventName: 'connectionError'): ((origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void)[];
    listeners(eventName: 'drain'): ((origin: URL_2) => void)[];

    rawListeners(eventName: 'connect'): ((origin: URL_2, targets: readonly Dispatcher[]) => void)[]
    rawListeners(eventName: 'disconnect'): ((origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void)[];
    rawListeners(eventName: 'connectionError'): ((origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError) => void)[];
    rawListeners(eventName: 'drain'): ((origin: URL_2) => void)[];

    emit(eventName: 'connect', origin: URL_2, targets: readonly Dispatcher[]): boolean;
    emit(eventName: 'disconnect', origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError): boolean;
    emit(eventName: 'connectionError', origin: URL_2, targets: readonly Dispatcher[], error: Errors.UndiciError): boolean;
    emit(eventName: 'drain', origin: URL_2): boolean;
}

declare namespace Dispatcher {
    interface DispatchOptions {
        origin?: string | URL_2;
        path: string;
        method: HttpMethod;
        /** Default: `null` */
        body?: string | Buffer | Uint8Array | Readable | null | FormData_2;
        /** Default: `null` */
        headers?: IncomingHttpHeaders | string[] | null;
        /** Query string params to be embedded in the request URL. Default: `null` */
        query?: Record<string, any>;
        /** Whether the requests can be safely retried or not. If `false` the request won't be sent until all preceding requests in the pipeline have completed. Default: `true` if `method` is `HEAD` or `GET`. */
        idempotent?: boolean;
        /** Whether the response is expected to take a long time and would end up blocking the pipeline. When this is set to `true` further pipelining will be avoided on the same connection until headers have been received. */
        blocking?: boolean;
        /** Upgrade the request. Should be used to specify the kind of upgrade i.e. `'Websocket'`. Default: `method === 'CONNECT' || null`. */
        upgrade?: boolean | string | null;
        /** The amount of time, in milliseconds, the parser will wait to receive the complete HTTP headers. Defaults to 300 seconds. */
        headersTimeout?: number | null;
        /** The timeout after which a request will time out, in milliseconds. Monitors time between receiving body data. Use 0 to disable it entirely. Defaults to 300 seconds. */
        bodyTimeout?: number | null;
        /** Whether the request should stablish a keep-alive or not. Default `false` */
        reset?: boolean;
        /** Whether Undici should throw an error upon receiving a 4xx or 5xx response from the server. Defaults to false */
        throwOnError?: boolean;
        /** For H2, it appends the expect: 100-continue header, and halts the request body until a 100-continue is received from the remote server*/
        expectContinue?: boolean;
    }
    interface ConnectOptions {
        path: string;
        /** Default: `null` */
        headers?: IncomingHttpHeaders | string[] | null;
        /** Default: `null` */
        signal?: AbortSignal_2 | EventEmitter | null;
        /** This argument parameter is passed through to `ConnectData` */
        opaque?: unknown;
        /** Default: 0 */
        maxRedirections?: number;
        /** Default: `null` */
        responseHeader?: 'raw' | null;
    }
    interface RequestOptions extends DispatchOptions {
        /** Default: `null` */
        opaque?: unknown;
        /** Default: `null` */
        signal?: AbortSignal_2 | EventEmitter | null;
        /** Default: 0 */
        maxRedirections?: number;
        /** Default: `null` */
        onInfo?: (info: { statusCode: number, headers: Record<string, string | string[]> }) => void;
        /** Default: `null` */
        responseHeader?: 'raw' | null;
        /** Default: `64 KiB` */
        highWaterMark?: number;
    }
    interface PipelineOptions extends RequestOptions {
        /** `true` if the `handler` will return an object stream. Default: `false` */
        objectMode?: boolean;
    }
    interface UpgradeOptions {
        path: string;
        /** Default: `'GET'` */
        method?: string;
        /** Default: `null` */
        headers?: IncomingHttpHeaders | string[] | null;
        /** A string of comma separated protocols, in descending preference order. Default: `'Websocket'` */
        protocol?: string;
        /** Default: `null` */
        signal?: AbortSignal_2 | EventEmitter | null;
        /** Default: 0 */
        maxRedirections?: number;
        /** Default: `null` */
        responseHeader?: 'raw' | null;
    }
    interface ConnectData {
        statusCode: number;
        headers: IncomingHttpHeaders;
        socket: Duplex;
        opaque: unknown;
    }
    interface ResponseData {
        statusCode: number;
        headers: IncomingHttpHeaders;
        body: BodyReadable & BodyMixin;
        trailers: Record<string, string>;
        opaque: unknown;
        context: object;
    }
    interface PipelineHandlerData {
        statusCode: number;
        headers: IncomingHttpHeaders;
        opaque: unknown;
        body: BodyReadable;
        context: object;
    }
    interface StreamData {
        opaque: unknown;
        trailers: Record<string, string>;
    }
    interface UpgradeData {
        headers: IncomingHttpHeaders;
        socket: Duplex;
        opaque: unknown;
    }
    interface StreamFactoryData {
        statusCode: number;
        headers: IncomingHttpHeaders;
        opaque: unknown;
        context: object;
    }
    type StreamFactory = (data: StreamFactoryData) => Writable;
    interface DispatchHandlers {
        /** Invoked before request is dispatched on socket. May be invoked multiple times when a request is retried when the request at the head of the pipeline fails. */
        onConnect?(abort: () => void): void;
        /** Invoked when an error has occurred. */
        onError?(err: Error): void;
        /** Invoked when request is upgraded either due to a `Upgrade` header or `CONNECT` method. */
        onUpgrade?(statusCode: number, headers: Buffer[] | string[] | null, socket: Duplex): void;
        /** Invoked when statusCode and headers have been received. May be invoked multiple times due to 1xx informational headers. */
        onHeaders?(statusCode: number, headers: Buffer[] | string[] | null, resume: () => void, statusText: string): boolean;
        /** Invoked when response payload data is received. */
        onData?(chunk: Buffer): boolean;
        /** Invoked when response payload and trailers have been received and the request has completed. */
        onComplete?(trailers: string[] | null): void;
        /** Invoked when a body chunk is sent to the server. May be invoked multiple times for chunked requests */
        onBodySent?(chunkSize: number, totalBytesSent: number): void;
    }
    type PipelineHandler = (data: PipelineHandlerData) => Readable;
    type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

    /**
     * @link https://fetch.spec.whatwg.org/#body-mixin
     */
    interface BodyMixin {
        readonly body?: never; // throws on node v16.6.0
        readonly bodyUsed: boolean;
        arrayBuffer(): Promise<ArrayBuffer>;
        blob(): Promise<Blob_2>;
        formData(): Promise<never>;
        json(): Promise<unknown>;
        text(): Promise<string>;
    }

    interface DispatchInterceptor {
        (dispatch: Dispatcher['dispatch']): Dispatcher['dispatch']
    }
}

declare interface DispatchNamespaceOutbound {
    /** Name of the service handling the outbound requests */
    service: string;
    /** (Optional) Name of the environment handling the outbound requests. */
    environment?: string;
    /** (Optional) List of parameter names, for sending context from your dispatch Worker to the outbound handler */
    parameters?: string[];
}

declare type DOMException = typeof globalThis extends { DOMException: infer T }
? T
: any

declare type DurableObjectBindings = {
    /** The name of the binding used to refer to the Durable Object */
    name: string;
    /** The exported class name of the Durable Object */
    class_name: string;
    /** The script where the Durable Object is defined (if it's external to this Worker) */
    script_name?: string;
    /** The service environment of the script_name to bind to */
    environment?: string;
}[];

/**
 * Configuration in wrangler for Durable Object Migrations
 */
declare type DurableObjectMigration = {
    /** A unique identifier for this migration. */
    tag: string;
    /** The new Durable Objects being defined. */
    new_classes?: string[];
    /** The new SQLite Durable Objects being defined. */
    new_sqlite_classes?: string[];
    /** The Durable Objects being renamed. */
    renamed_classes?: {
        from: string;
        to: string;
    }[];
    /** The Durable Objects being removed. */
    deleted_classes?: string[];
};

declare interface EnablePagesAssetsServiceBindingOptions {
    proxyPort?: number;
    directory?: string;
}

/**
 * An entry point for the Worker.
 *
 * It consists not just of a `file`, but also of a `directory` that is used to resolve relative paths.
 */
declare type Entry = {
    /** A worker's entrypoint */
    file: string;
    /** A worker's directory. Usually where the wrangler.toml file is located */
    directory: string;
    /** Is this a module worker or a service worker? */
    format: CfScriptFormat;
    /** The directory that contains all of a `--no-bundle` worker's modules. Usually `${directory}/src`. Defaults to path.dirname(file) */
    moduleRoot: string;
    /**
     * A worker's name
     */
    name?: string | undefined;
};

/**
 * The `Environment` interface declares all the configuration fields that
 * can be specified for an environment.
 *
 * This could be the top-level default environment, or a specific named environment.
 */
declare interface Environment extends EnvironmentInheritable, EnvironmentNonInheritable {
}

/**
 * The `EnvironmentInheritable` interface declares all the configuration fields for an environment
 * that can be inherited (and overridden) from the top-level environment.
 */
declare interface EnvironmentInheritable {
    /**
     * The name of your Worker. Alphanumeric + dashes only.
     *
     * @inheritable
     */
    name: string | undefined;
    /**
     * This is the ID of the account associated with your zone.
     * You might have more than one account, so make sure to use
     * the ID of the account associated with the zone/route you
     * provide, if you provide one. It can also be specified through
     * the CLOUDFLARE_ACCOUNT_ID environment variable.
     *
     * @inheritable
     */
    account_id: string | undefined;
    /**
     * A date in the form yyyy-mm-dd, which will be used to determine
     * which version of the Workers runtime is used.
     *
     * More details at https://developers.cloudflare.com/workers/platform/compatibility-dates
     *
     * @inheritable
     */
    compatibility_date: string | undefined;
    /**
     * A list of flags that enable features from upcoming features of
     * the Workers runtime, usually used together with compatibility_flags.
     *
     * More details at https://developers.cloudflare.com/workers/platform/compatibility-dates
     *
     * @default `[]`
     * @inheritable
     */
    compatibility_flags: string[];
    /**
     * The entrypoint/path to the JavaScript file that will be executed.
     *
     * @inheritable
     */
    main: string | undefined;
    /**
     * If true then Wrangler will traverse the file tree below `base_dir`;
     * Any files that match `rules` will be included in the deployed Worker.
     * Defaults to true if `no_bundle` is true, otherwise false.
     *
     * @inheritable
     */
    find_additional_modules: boolean | undefined;
    /**
     * Determines whether Wrangler will preserve bundled file names.
     * Defaults to false.
     * If left unset, files will be named using the pattern ${fileHash}-${basename},
     * for example, `34de60b44167af5c5a709e62a4e20c4f18c9e3b6-favicon.ico`.
     *
     * @inheritable
     */
    preserve_file_names: boolean | undefined;
    /**
     * The directory in which module rules should be evaluated when including additional files into a Worker deployment.
     * This defaults to the directory containing the `main` entry point of the Worker if not specified.
     *
     * @inheritable
     */
    base_dir: string | undefined;
    /**
     * Whether we use <name>.<subdomain>.workers.dev to
     * test and deploy your Worker.
     *
     * // Carmen according to our tests the default is undefined
     * // warning: you must force "workers_dev: true" in tests to match expected behavior
     * @default `true` (This is a breaking change from Wrangler v1)
     * @breaking
     * @inheritable
     */
    workers_dev: boolean | undefined;
    /**
     * A list of routes that your Worker should be published to.
     * Only one of `routes` or `route` is required.
     *
     * Only required when workers_dev is false, and there's no scheduled Worker (see `triggers`)
     *
     * @inheritable
     */
    routes: Route[] | undefined;
    /**
     * A route that your Worker should be published to. Literally
     * the same as routes, but only one.
     * Only one of `routes` or `route` is required.
     *
     * Only required when workers_dev is false, and there's no scheduled Worker
     *
     * @inheritable
     */
    route: Route | undefined;
    /**
     * Path to a custom tsconfig
     *
     * @inheritable
     */
    tsconfig: string | undefined;
    /**
     * The function to use to replace jsx syntax.
     *
     * @default `"React.createElement"`
     * @inheritable
     */
    jsx_factory: string;
    /**
     * The function to use to replace jsx fragment syntax.
     *
     * @default `"React.Fragment"`
     * @inheritable
     */
    jsx_fragment: string;
    /**
     * A list of migrations that should be uploaded with your Worker.
     *
     * These define changes in your Durable Object declarations.
     *
     * More details at https://developers.cloudflare.com/workers/learning/using-durable-objects#configuring-durable-object-classes-with-migrations
     *
     * @default []
     * @inheritable
     */
    migrations: DurableObjectMigration[];
    /**
     * "Cron" definitions to trigger a Worker's "scheduled" function.
     *
     * Lets you call Workers periodically, much like a cron job.
     *
     * More details here https://developers.cloudflare.com/workers/platform/cron-triggers
     *
     * @default `{crons:[]}`
     * @inheritable
     */
    triggers: {
        crons: string[];
    };
    /**
     * Specifies the Usage Model for your Worker. There are two options -
     * [bundled](https://developers.cloudflare.com/workers/platform/limits#bundled-usage-model) and
     * [unbound](https://developers.cloudflare.com/workers/platform/limits#unbound-usage-model).
     * For newly created Workers, if the Usage Model is omitted
     * it will be set to the [default Usage Model set on the account](https://dash.cloudflare.com/?account=workers/default-usage-model).
     * For existing Workers, if the Usage Model is omitted, it will be
     * set to the Usage Model configured in the dashboard for that Worker.
     *
     * @inheritable
     */
    usage_model: "bundled" | "unbound" | undefined;
    /**
     * Specify limits for runtime behavior.
     * Only supported for the "standard" Usage Model
     *
     * @inheritable
     */
    limits: UserLimits | undefined;
    /**
     * An ordered list of rules that define which modules to import,
     * and what type to import them as. You will need to specify rules
     * to use Text, Data, and CompiledWasm modules, or when you wish to
     * have a .js file be treated as an ESModule instead of CommonJS.
     *
     * @inheritable
     */
    rules: Rule[];
    /**
     * Configures a custom build step to be run by Wrangler when building your Worker.
     *
     * Refer to the [custom builds documentation](https://developers.cloudflare.com/workers/cli-wrangler/configuration#build)
     * for more details.
     *
     * @default {watch_dir:"./src"}
     */
    build: {
        /** The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used. */
        command?: string;
        /** The directory in which the command is executed. */
        cwd?: string;
        /** The directory to watch for changes while using wrangler dev, defaults to the current working directory */
        watch_dir?: string | string[];
        /**
         * Deprecated field previously used to configure the build and upload of the script.
         * @deprecated
         */
        upload?: DeprecatedUpload;
    };
    /**
     * Skip internal build steps and directly deploy script
     * @inheritable
     */
    no_bundle: boolean | undefined;
    /**
     * Minify the script before uploading.
     * @inheritable
     */
    minify: boolean | undefined;
    /**
     * Add polyfills for node builtin modules and globals
     * @inheritable
     */
    node_compat: boolean | undefined;
    /**
     * Designates this Worker as an internal-only "first-party" Worker.
     *
     * @inheritable
     */
    first_party_worker: boolean | undefined;
    /**
     * TODO: remove this as it has been deprecated.
     *
     * This is just here for now because the `route` commands use it.
     * So we need to include it in this type so it is available.
     */
    zone_id?: string;
    /**
     * List of bindings that you will send to logfwdr
     *
     * @default `{bindings:[]}`
     * @inheritable
     */
    logfwdr: {
        bindings: {
            /** The binding name used to refer to logfwdr */
            name: string;
            /** The destination for this logged message */
            destination: string;
        }[];
    };
    /**
     * Send Trace Events from this Worker to Workers Logpush.
     *
     * This will not configure a corresponding Logpush job automatically.
     *
     * For more information about Workers Logpush, see:
     * https://blog.cloudflare.com/logpush-for-workers/
     *
     * @inheritable
     */
    logpush: boolean | undefined;
    /**
     * Include source maps when uploading this worker.
     * @inheritable
     */
    upload_source_maps: boolean | undefined;
    /**
     * Specify how the Worker should be located to minimize round-trip time.
     *
     * More details: https://developers.cloudflare.com/workers/platform/smart-placement/
     *
     * @inheritable
     */
    placement: {
        mode: "off" | "smart";
        hint?: string;
    } | undefined;
    /**
     * Specify the directory of static assets to deploy/serve
     *
     * More details at https://developers.cloudflare.com/workers/frameworks/
     *
     * @inheritable
     */
    assets: Assets | undefined;
    /**
     * Specify the observability behavior of the Worker.
     *
     * @inheritable
     */
    observability: Observability | undefined;
}

/**
 * The `EnvironmentNonInheritable` interface declares all the configuration fields for an environment
 * that cannot be inherited from the top-level environment, and must be defined specifically.
 *
 * If any of these fields are defined at the top-level then they should also be specifically defined
 * for each named environment.
 */
declare interface EnvironmentNonInheritable {
    /**
     * A map of values to substitute when deploying your Worker.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{}`
     * @nonInheritable
     */
    define: Record<string, string>;
    /**
     * A map of environment variables to set when deploying your Worker.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{}`
     * @nonInheritable
     */
    vars: Record<string, string | Json>;
    /**
     * A list of durable objects that your Worker should be bound to.
     *
     * For more information about Durable Objects, see the documentation at
     * https://developers.cloudflare.com/workers/learning/using-durable-objects
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{bindings:[]}`
     * @nonInheritable
     */
    durable_objects: {
        bindings: DurableObjectBindings;
    };
    /**
     * Cloudchamber configuration
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{}`
     * @nonInheritable
     */
    cloudchamber: CloudchamberConfig;
    /**
     * These specify any Workers KV Namespaces you want to
     * access from inside your Worker.
     *
     * To learn more about KV Namespaces,
     * see the documentation at https://developers.cloudflare.com/workers/learning/how-kv-works
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    kv_namespaces: {
        /** The binding name used to refer to the KV Namespace */
        binding: string;
        /** The ID of the KV namespace */
        id: string;
        /** The ID of the KV namespace used during `wrangler dev` */
        preview_id?: string;
    }[];
    /**
     * These specify bindings to send email from inside your Worker.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    send_email: {
        /** The binding name used to refer to the this binding */
        name: string;
        /** If this binding should be restricted to a specific verified address */
        destination_address?: string;
        /** If this binding should be restricted to a set of verified addresses */
        allowed_destination_addresses?: string[];
    }[];
    /**
     * Specifies Queues that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{consumers:[],producers:[]}`
     * @nonInheritable
     */
    queues: {
        /** Producer bindings */
        producers?: {
            /** The binding name used to refer to the Queue in the Worker. */
            binding: string;
            /** The name of this Queue. */
            queue: string;
            /** The number of seconds to wait before delivering a message */
            delivery_delay?: number;
        }[];
        /** Consumer configuration */
        consumers?: {
            /** The name of the queue from which this consumer should consume. */
            queue: string;
            /** The consumer type, e.g., worker, http-pull, r2-bucket, etc. Default is worker. */
            type?: string;
            /** The maximum number of messages per batch */
            max_batch_size?: number;
            /** The maximum number of seconds to wait to fill a batch with messages. */
            max_batch_timeout?: number;
            /** The maximum number of retries for each message. */
            max_retries?: number;
            /** The queue to send messages that failed to be consumed. */
            dead_letter_queue?: string;
            /** The maximum number of concurrent consumer Worker invocations. Leaving this unset will allow your consumer to scale to the maximum concurrency needed to keep up with the message backlog. */
            max_concurrency?: number | null;
            /** The number of milliseconds to wait for pulled messages to become visible again */
            visibility_timeout_ms?: number;
            /** The number of seconds to wait before retrying a message */
            retry_delay?: number;
        }[];
    };
    /**
     * Specifies R2 buckets that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    r2_buckets: {
        /** The binding name used to refer to the R2 bucket in the Worker. */
        binding: string;
        /** The name of this R2 bucket at the edge. */
        bucket_name: string;
        /** The preview name of this R2 bucket at the edge. */
        preview_bucket_name?: string;
        /** The jurisdiction that the bucket exists in. Default if not present. */
        jurisdiction?: string;
    }[];
    /**
     * Specifies D1 databases that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    d1_databases: {
        /** The binding name used to refer to the D1 database in the Worker. */
        binding: string;
        /** The name of this D1 database. */
        database_name: string;
        /** The UUID of this D1 database (not required). */
        database_id: string;
        /** The UUID of this D1 database for Wrangler Dev (if specified). */
        preview_database_id?: string;
        /** The name of the migrations table for this D1 database (defaults to 'd1_migrations'). */
        migrations_table?: string;
        /** The path to the directory of migrations for this D1 database (defaults to './migrations'). */
        migrations_dir?: string;
        /** Internal use only. */
        database_internal_env?: string;
    }[];
    /**
     * Specifies Vectorize indexes that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    vectorize: {
        /** The binding name used to refer to the Vectorize index in the Worker. */
        binding: string;
        /** The name of the index. */
        index_name: string;
    }[];
    /**
     * Specifies Hyperdrive configs that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    hyperdrive: {
        /** The binding name used to refer to the project in the Worker. */
        binding: string;
        /** The id of the database. */
        id: string;
        /** The local database connection string for `wrangler dev` */
        localConnectionString?: string;
    }[];
    /**
     * Specifies service bindings (Worker-to-Worker) that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    services: {
        /** The binding name used to refer to the bound service. */
        binding: string;
        /** The name of the service. */
        service: string;
        /** The environment of the service (e.g. production, staging, etc). */
        environment?: string;
        /** Optionally, the entrypoint (named export) of the service to bind to. */
        entrypoint?: string;
    }[] | undefined;
    /**
     * Specifies analytics engine datasets that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    analytics_engine_datasets: {
        /** The binding name used to refer to the dataset in the Worker. */
        binding: string;
        /** The name of this dataset to write to. */
        dataset?: string;
    }[];
    /**
     * A browser that will be usable from the Worker.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{}`
     * @nonInheritable
     */
    browser: {
        binding: string;
    } | undefined;
    /**
     * Binding to the AI project.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{}`
     * @nonInheritable
     */
    ai: {
        binding: string;
        staging?: boolean;
    } | undefined;
    /**
     * Binding to the Worker Version's metadata
     */
    version_metadata: {
        binding: string;
    } | undefined;
    /**
     * "Unsafe" tables for features that aren't directly supported by wrangler.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `{}`
     * @nonInheritable
     */
    unsafe: {
        /**
         * A set of bindings that should be put into a Worker's upload metadata without changes. These
         * can be used to implement bindings for features that haven't released and aren't supported
         * directly by wrangler or miniflare.
         */
        bindings?: {
            name: string;
            type: string;
            [key: string]: unknown;
        }[];
        /**
         * Arbitrary key/value pairs that will be included in the uploaded metadata.  Values specified
         * here will always be applied to metadata last, so can add new or override existing fields.
         */
        metadata?: {
            [key: string]: unknown;
        };
        /**
         * Used for internal capnp uploads for the Workers runtime
         */
        capnp?: {
            base_path: string;
            source_schemas: string[];
            compiled_schema?: never;
        } | {
            base_path?: never;
            source_schemas?: never;
            compiled_schema: string;
        };
    };
    /**
     * Specifies a list of mTLS certificates that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    mtls_certificates: {
        /** The binding name used to refer to the certificate in the Worker */
        binding: string;
        /** The uuid of the uploaded mTLS certificate */
        certificate_id: string;
    }[];
    /**
     * Specifies a list of Tail Workers that are bound to this Worker environment
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    tail_consumers?: TailConsumer[];
    /**
     * Specifies namespace bindings that are bound to this Worker environment.
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    dispatch_namespaces: {
        /** The binding name used to refer to the bound service. */
        binding: string;
        /** The namespace to bind to. */
        namespace: string;
        /** Details about the outbound Worker which will handle outbound requests from your namespace */
        outbound?: DispatchNamespaceOutbound;
    }[];
    /**
     * Specifies list of Pipelines bound to this Worker environment
     *
     * NOTE: This field is not automatically inherited from the top level environment,
     * and so must be specified in every named environment.
     *
     * @default `[]`
     * @nonInheritable
     */
    pipelines: {
        /** The binding name used to refer to the bound service. */
        binding: string;
        /** Name of the Pipeline to bind */
        pipeline: string;
    }[];
}

declare type ErrorEvent = BaseErrorEvent<"ConfigController" | "BundlerController" | "LocalRuntimeController" | "RemoteRuntimeController" | "ProxyWorker" | "InspectorProxyWorker"> | BaseErrorEvent<"ProxyController", {
    config?: StartDevWorkerOptions;
    bundle?: Bundle;
}> | BaseErrorEvent<"BundlerController", {
    config?: StartDevWorkerOptions;
    filePath?: string;
}>;

declare namespace Errors {
    class UndiciError extends Error {
        name: string;
        code: string;
    }

    /** Connect timeout error. */
    class ConnectTimeoutError extends UndiciError {
        name: 'ConnectTimeoutError';
        code: 'UND_ERR_CONNECT_TIMEOUT';
    }

    /** A header exceeds the `headersTimeout` option. */
    class HeadersTimeoutError extends UndiciError {
        name: 'HeadersTimeoutError';
        code: 'UND_ERR_HEADERS_TIMEOUT';
    }

    /** Headers overflow error. */
    class HeadersOverflowError extends UndiciError {
        name: 'HeadersOverflowError'
        code: 'UND_ERR_HEADERS_OVERFLOW'
    }

    /** A body exceeds the `bodyTimeout` option. */
    class BodyTimeoutError extends UndiciError {
        name: 'BodyTimeoutError';
        code: 'UND_ERR_BODY_TIMEOUT';
    }

    class ResponseStatusCodeError extends UndiciError {
        constructor (
        message?: string,
        statusCode?: number,
        headers?: IncomingHttpHeaders | string[] | null,
        body?: null | Record<string, any> | string
        );
        name: 'ResponseStatusCodeError';
        code: 'UND_ERR_RESPONSE_STATUS_CODE';
        body: null | Record<string, any> | string
        status: number
        statusCode: number
        headers: IncomingHttpHeaders | string[] | null;
    }

    /** Passed an invalid argument. */
    class InvalidArgumentError extends UndiciError {
        name: 'InvalidArgumentError';
        code: 'UND_ERR_INVALID_ARG';
    }

    /** Returned an invalid value. */
    class InvalidReturnValueError extends UndiciError {
        name: 'InvalidReturnValueError';
        code: 'UND_ERR_INVALID_RETURN_VALUE';
    }

    /** The request has been aborted by the user. */
    class RequestAbortedError extends UndiciError {
        name: 'AbortError';
        code: 'UND_ERR_ABORTED';
    }

    /** Expected error with reason. */
    class InformationalError extends UndiciError {
        name: 'InformationalError';
        code: 'UND_ERR_INFO';
    }

    /** Request body length does not match content-length header. */
    class RequestContentLengthMismatchError extends UndiciError {
        name: 'RequestContentLengthMismatchError';
        code: 'UND_ERR_REQ_CONTENT_LENGTH_MISMATCH';
    }

    /** Response body length does not match content-length header. */
    class ResponseContentLengthMismatchError extends UndiciError {
        name: 'ResponseContentLengthMismatchError';
        code: 'UND_ERR_RES_CONTENT_LENGTH_MISMATCH';
    }

    /** Trying to use a destroyed client. */
    class ClientDestroyedError extends UndiciError {
        name: 'ClientDestroyedError';
        code: 'UND_ERR_DESTROYED';
    }

    /** Trying to use a closed client. */
    class ClientClosedError extends UndiciError {
        name: 'ClientClosedError';
        code: 'UND_ERR_CLOSED';
    }

    /** There is an error with the socket. */
    class SocketError extends UndiciError {
        name: 'SocketError';
        code: 'UND_ERR_SOCKET';
        socket: Client.SocketInfo | null
    }

    /** Encountered unsupported functionality. */
    class NotSupportedError extends UndiciError {
        name: 'NotSupportedError';
        code: 'UND_ERR_NOT_SUPPORTED';
    }

    /** No upstream has been added to the BalancedPool. */
    class BalancedPoolMissingUpstreamError extends UndiciError {
        name: 'MissingUpstreamError';
        code: 'UND_ERR_BPL_MISSING_UPSTREAM';
    }

    class HTTPParserError extends UndiciError {
        name: 'HTTPParserError';
        code: string;
    }

    /** The response exceed the length allowed. */
    class ResponseExceededMaxSizeError extends UndiciError {
        name: 'ResponseExceededMaxSizeError';
        code: 'UND_ERR_RES_EXCEEDED_MAX_SIZE';
    }
}

declare type EsbuildBundle = {
    id: number;
    path: string;
    entrypointSource: string;
    entry: Entry;
    type: CfModuleType;
    modules: CfModule[];
    dependencies: Metafile["outputs"][string]["inputs"];
    sourceMapPath: string | undefined;
    sourceMapMetadata: SourceMapMetadata | undefined;
};

declare type Event_2 = typeof globalThis extends { Event: infer T }
? T
: {
    readonly bubbles: boolean
    cancelBubble: () => void
    readonly cancelable: boolean
    readonly composed: boolean
    composedPath(): [EventTarget_2?]
    readonly currentTarget: EventTarget_2 | null
    readonly defaultPrevented: boolean
    readonly eventPhase: 0 | 2
    readonly isTrusted: boolean
    preventDefault(): void
    returnValue: boolean
    readonly srcElement: EventTarget_2 | null
    stopImmediatePropagation(): void
    stopPropagation(): void
    readonly target: EventTarget_2 | null
    readonly timeStamp: number
    readonly type: string
}

declare interface EventInit {
    bubbles?: boolean
    cancelable?: boolean
    composed?: boolean
}

declare interface EventListener {
    (evt: Event_2): void
}

declare interface EventListenerObject {
    handleEvent (object: Event_2): void
}

declare interface EventListenerOptions {
    capture?: boolean
}

declare type EventListenerOrEventListenerObject = EventListener | EventListenerObject

declare type _EventMethods = keyof ProtocolMapping.Events;

declare type EventTarget_2 = typeof globalThis extends { EventTarget: infer T }
? T
: {
    addEventListener(
    type: string,
    listener: any,
    options?: any,
    ): void
    dispatchEvent(event: Event_2): boolean
    removeEventListener(
    type: string,
    listener: any,
    options?: any | boolean,
    ): void
}

declare class ExecutionContext {
    waitUntil(promise: Promise<any>): void;
    passThroughOnException(): void;
}

declare function fetch (
input: RequestInfo,
init?: RequestInit
): Promise<Response>

declare class File extends Blob_2 {
    /**
     * Creates a new File instance.
     *
     * @param fileBits An `Array` strings, or [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [`ArrayBufferView`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView), [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) objects, or a mix of any of such objects, that will be put inside the [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File).
     * @param fileName The name of the file.
     * @param options An options object containing optional attributes for the file.
     */
    constructor(fileBits: ReadonlyArray<string | NodeJS.ArrayBufferView | Blob_2>, fileName: string, options?: FilePropertyBag)

    /**
     * Name of the file referenced by the File object.
     */
    readonly name: string

    /**
     * The last modified date of the file as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight). Files without a known last modified date return the current date.
     */
    readonly lastModified: number

    readonly [Symbol.toStringTag]: string
}

declare type File_2<Contents = string, Path = string> = {
    path: Path;
} | {
    contents: Contents;
    path?: Path;
};

declare interface FilePropertyBag extends BlobPropertyBag {
    /**
     * The last modified date of the file as the number of milliseconds since the Unix epoch (January 1, 1970 at midnight). Files without a known last modified date return the current date.
     */
    lastModified?: number
}

declare class FileReader {
    __proto__: EventTarget_2 & FileReader

    constructor ()

    readAsArrayBuffer (blob: Blob_2): void
    readAsBinaryString (blob: Blob_2): void
    readAsText (blob: Blob_2, encoding?: string): void
    readAsDataURL (blob: Blob_2): void

    abort (): void

    static readonly EMPTY = 0
    static readonly LOADING = 1
    static readonly DONE = 2

    readonly EMPTY = 0
    readonly LOADING = 1
    readonly DONE = 2

    readonly readyState: number

    readonly result: string | ArrayBuffer | null

    readonly error: DOMException | null

    onloadstart: null | ((this: FileReader, event: ProgressEvent) => void)
    onprogress: null | ((this: FileReader, event: ProgressEvent) => void)
    onload: null | ((this: FileReader, event: ProgressEvent) => void)
    onabort: null |  ((this: FileReader, event: ProgressEvent) => void)
    onerror: null | ((this: FileReader, event: ProgressEvent) => void)
    onloadend: null | ((this: FileReader, event: ProgressEvent) => void)
}

/**
 * Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using fetch().
 */
declare class FormData_2 {
    /**
     * Appends a new value onto an existing key inside a FormData object,
     * or adds the key if it does not already exist.
     *
     * The difference between `set()` and `append()` is that if the specified key already exists, `set()` will overwrite all existing values with the new one, whereas `append()` will append the new value onto the end of the existing set of values.
     *
     * @param name The name of the field whose data is contained in `value`.
     * @param value The field's value. This can be [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
     or [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File). If none of these are specified the value is converted to a string.
     * @param fileName The filename reported to the server, when a Blob or File is passed as the second parameter. The default filename for Blob objects is "blob". The default filename for File objects is the file's filename.
     */
    append(name: string, value: unknown, fileName?: string): void

    /**
     * Set a new value for an existing key inside FormData,
     * or add the new field if it does not already exist.
     *
     * @param name The name of the field whose data is contained in `value`.
     * @param value The field's value. This can be [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
     or [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File). If none of these are specified the value is converted to a string.
     * @param fileName The filename reported to the server, when a Blob or File is passed as the second parameter. The default filename for Blob objects is "blob". The default filename for File objects is the file's filename.
     *
     */
    set(name: string, value: unknown, fileName?: string): void

    /**
     * Returns the first value associated with a given key from within a `FormData` object.
     * If you expect multiple values and want all of them, use the `getAll()` method instead.
     *
     * @param {string} name A name of the value you want to retrieve.
     *
     * @returns A `FormDataEntryValue` containing the value. If the key doesn't exist, the method returns null.
     */
    get(name: string): FormDataEntryValue | null

    /**
     * Returns all the values associated with a given key from within a `FormData` object.
     *
     * @param {string} name A name of the value you want to retrieve.
     *
     * @returns An array of `FormDataEntryValue` whose key matches the value passed in the `name` parameter. If the key doesn't exist, the method returns an empty list.
     */
    getAll(name: string): FormDataEntryValue[]

    /**
     * Returns a boolean stating whether a `FormData` object contains a certain key.
     *
     * @param name A string representing the name of the key you want to test for.
     *
     * @return A boolean value.
     */
    has(name: string): boolean

    /**
     * Deletes a key and its value(s) from a `FormData` object.
     *
     * @param name The name of the key you want to delete.
     */
    delete(name: string): void

    /**
     * Executes given callback function for each field of the FormData instance
     */
    forEach: (
    callbackfn: (value: FormDataEntryValue, key: string, iterable: FormData_2) => void,
    thisArg?: unknown
    ) => void

    /**
     * Returns an [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) allowing to go through all keys contained in this `FormData` object.
     * Each key is a `string`.
     */
    keys: () => SpecIterableIterator<string>

    /**
     * Returns an [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) allowing to go through all values contained in this object `FormData` object.
     * Each value is a [`FormDataValue`](https://developer.mozilla.org/en-US/docs/Web/API/FormDataEntryValue).
     */
    values: () => SpecIterableIterator<FormDataEntryValue>

    /**
     * Returns an [`iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) allowing to go through the `FormData` key/value pairs.
     * The key of each pair is a string; the value is a [`FormDataValue`](https://developer.mozilla.org/en-US/docs/Web/API/FormDataEntryValue).
     */
    entries: () => SpecIterableIterator<[string, FormDataEntryValue]>

    /**
     * An alias for FormData#entries()
     */
    [Symbol.iterator]: () => SpecIterableIterator<[string, FormDataEntryValue]>

    readonly [Symbol.toStringTag]: string
}

/**
 * A `string` or `File` that represents a single value from a set of `FormData` key-value pairs.
 */
declare type FormDataEntryValue = string | File

/**
 * By reading from a `wrangler.toml` file this function generates proxy binding objects that can be
 * used to simulate the interaction with bindings during local development in a Node.js environment
 *
 * @deprecated use `getPlatformProxy` instead
 *
 * @param options The various options that can tweak this function's behavior
 * @returns An Object containing the generated proxies alongside other related utilities
 */
export declare function getBindingsProxy<Bindings = Record<string, unknown>, CfProperties extends Record<string, unknown> = IncomingRequestCfProperties>(options?: GetBindingsProxyOptions): Promise<BindingsProxy<Bindings, CfProperties>>;

/** Options for the `getBindingsProxy` utility */
export declare type GetBindingsProxyOptions = GetPlatformProxyOptions;

declare function getCookies (headers: Headers): Record<string, string>

declare function getGlobalDispatcher(): Dispatcher;

declare function getGlobalOrigin(): URL | undefined;

/**
 * By reading from a `wrangler.toml` file this function generates proxy objects that can be
 * used to simulate the interaction with the Cloudflare platform during local development
 * in a Node.js environment
 *
 * @param options The various options that can tweak this function's behavior
 * @returns An Object containing the generated proxies alongside other related utilities
 */
export declare function getPlatformProxy<Env = Record<string, unknown>, CfProperties extends Record<string, unknown> = IncomingRequestCfProperties>(options?: GetPlatformProxyOptions): Promise<PlatformProxy<Env, CfProperties>>;

/**
 * Options for the `getPlatformProxy` utility
 */
export declare type GetPlatformProxyOptions = {
    /**
     * The name of the environment to use
     */
    environment?: string;
    /**
     * The path to the config file to use.
     * If no path is specified the default behavior is to search from the
     * current directory up the filesystem for a `wrangler.toml` to use.
     *
     * Note: this field is optional but if a path is specified it must
     *       point to a valid file on the filesystem
     */
    configPath?: string;
    /**
     * Flag to indicate the utility to read a json config file (`wrangler.json`/`wrangler.jsonc`)
     * instead of the toml one (`wrangler.toml`)
     *
     * Note: this feature is experimental
     */
    experimentalJsonConfig?: boolean;
    /**
     * Indicates if and where to persist the bindings data, if not present or `true` it defaults to the same location
     * used by wrangler v3: `.wrangler/state/v3` (so that the same data can be easily used by the caller and wrangler).
     * If `false` is specified no data is persisted on the filesystem.
     */
    persist?: boolean | {
        path: string;
    };
    /**
     * Use the experimental file-based dev registry for service discovery
     *
     * Note: this feature is experimental
     */
    experimentalRegistry?: boolean;
};

declare function getSetCookies (headers: Headers): Cookie[]

declare class Headers implements SpecIterable<[string, string]> {
    constructor (init?: HeadersInit)
    readonly append: (name: string, value: string) => void
    readonly delete: (name: string) => void
    readonly get: (name: string) => string | null
    readonly has: (name: string) => boolean
    readonly set: (name: string, value: string) => void
    readonly getSetCookie: () => string[]
    readonly forEach: (
    callbackfn: (value: string, key: string, iterable: Headers) => void,
    thisArg?: unknown
    ) => void

    readonly keys: () => SpecIterableIterator<string>
    readonly values: () => SpecIterableIterator<string>
    readonly entries: () => SpecIterableIterator<[string, string]>
    readonly [Symbol.iterator]: () => SpecIterator<[string, string]>
}

declare type HeadersInit = string[][] | Record<string, string | ReadonlyArray<string>> | Headers

declare type Hook<T extends HookValues, Args extends unknown[] = []> = T | ((...args: Args) => T);

declare type HookValues = string | number | boolean | object | undefined | null;

/**
 * @property terminate Terminates HTTP server.
 */
declare type HttpTerminator = {
    readonly terminate: () => Promise<void>;
};

/**
 * The header type declaration of `undici`.
 */
declare type IncomingHttpHeaders = Record<string, string | string[] | undefined>;

declare type InspectorProxyWorkerIncomingWebSocketMessage = {
    type: ReloadStartEvent["type"];
} | {
    type: ReloadCompleteEvent["type"];
    proxyData: ProxyData;
};

declare type InspectorProxyWorkerOutgoingRequestBody = {
    type: "error";
    error: SerializedError;
} | {
    type: "runtime-websocket-error";
    error: SerializedError;
} | {
    type: "debug-log";
    args: Parameters<typeof console.debug>;
} | {
    type: "load-network-resource";
    url: string;
};

declare type InspectorProxyWorkerOutgoingWebsocketMessage = DevToolsEvent<"Runtime.consoleAPICalled"> | DevToolsEvent<"Runtime.exceptionThrown">;

declare interface Interceptable extends Dispatcher {
    /** Intercepts any matching requests that use the same origin as this mock client. */
    intercept(options: MockInterceptor.Options): MockInterceptor;
}

declare class Logger {
    #private;
    constructor();
    private overrideLoggerLevel?;
    get loggerLevel(): "error" | "none" | "warn" | "info" | "log" | "debug";
    set loggerLevel(val: "error" | "none" | "warn" | "info" | "log" | "debug");
    columns: number;
    debug: (...args: unknown[]) => void;
    debugWithSanitization: (label: string, ...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    log: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    table<Keys extends string>(data: TableRow<Keys>[]): void;
    console<M extends Exclude<keyof Console, "Console">>(method: M, ...args: Parameters<Console[M]>): void;
    private doLog;
    static registerBeforeLogHook(callback: (() => void) | undefined): void;
    static registerAfterLogHook(callback: (() => void) | undefined): void;
    private formatMessage;
}

declare type LogLevel = "debug" | "info" | "log" | "warn" | "error" | "none";

declare type MaybePromise<T> = T | Promise<T>;

declare interface MessageEvent<T = any> extends Event_2 {
    readonly data: T
    readonly lastEventId: string
    readonly origin: string
    readonly ports: ReadonlyArray<typeof MessagePort_2>
    readonly source: typeof MessagePort_2 | null
    initMessageEvent(
    type: string,
    bubbles?: boolean,
    cancelable?: boolean,
    data?: any,
    origin?: string,
    lastEventId?: string,
    source?: typeof MessagePort_2 | null,
    ports?: (typeof MessagePort_2)[]
    ): void;
}

declare const MessageEvent: {
    prototype: MessageEvent
    new<T>(type: string, eventInitDict?: MessageEventInit<T>): MessageEvent<T>
};

declare interface MessageEventInit<T = any> extends EventInit {
    data?: T
    lastEventId?: string
    origin?: string
    ports?: (typeof MessagePort_2)[]
    source?: typeof MessagePort_2 | null
}

declare interface MIMEType {
    type: string
    subtype: string
    parameters: Map<string, string>
    essence: string
}

declare type MiniflareWorker = Awaited<ReturnType<Miniflare["getWorker"]>>;

/** A mocked Agent class that implements the Agent API. It allows one to intercept HTTP requests made through undici and return mocked responses instead. */
declare class MockAgent<TMockAgentOptions extends MockAgent.Options = MockAgent.Options> extends Dispatcher {
    constructor(options?: MockAgent.Options)
    /** Creates and retrieves mock Dispatcher instances which can then be used to intercept HTTP requests. If the number of connections on the mock agent is set to 1, a MockClient instance is returned. Otherwise a MockPool instance is returned. */
    get<TInterceptable extends Interceptable>(origin: string): TInterceptable;
    get<TInterceptable extends Interceptable>(origin: RegExp): TInterceptable;
    get<TInterceptable extends Interceptable>(origin: ((origin: string) => boolean)): TInterceptable;
    /** Dispatches a mocked request. */
    dispatch(options: Agent.DispatchOptions, handler: Dispatcher.DispatchHandlers): boolean;
    /** Closes the mock agent and waits for registered mock pools and clients to also close before resolving. */
    close(): Promise<void>;
    /** Disables mocking in MockAgent. */
    deactivate(): void;
    /** Enables mocking in a MockAgent instance. When instantiated, a MockAgent is automatically activated. Therefore, this method is only effective after `MockAgent.deactivate` has been called. */
    activate(): void;
    /** Define host matchers so only matching requests that aren't intercepted by the mock dispatchers will be attempted. */
    enableNetConnect(): void;
    enableNetConnect(host: string): void;
    enableNetConnect(host: RegExp): void;
    enableNetConnect(host: ((host: string) => boolean)): void;
    /** Causes all requests to throw when requests are not matched in a MockAgent intercept. */
    disableNetConnect(): void;
    pendingInterceptors(): PendingInterceptor[];
    assertNoPendingInterceptors(options?: {
        pendingInterceptorsFormatter?: PendingInterceptorsFormatter;
    }): void;
}

declare namespace MockAgent {
    /** MockAgent options. */
    interface Options extends Agent.Options {
        /** A custom agent to be encapsulated by the MockAgent. */
        agent?: Agent;
    }
}

/** MockClient extends the Client API and allows one to mock requests. */
declare class MockClient extends Client implements Interceptable {
    constructor(origin: string, options: MockClient.Options);
    /** Intercepts any matching requests that use the same origin as this mock client. */
    intercept(options: MockInterceptor.Options): MockInterceptor;
    /** Dispatches a mocked request. */
    dispatch(options: Dispatcher.DispatchOptions, handlers: Dispatcher.DispatchHandlers): boolean;
    /** Closes the mock client and gracefully waits for enqueued requests to complete. */
    close(): Promise<void>;
}

declare namespace MockClient {
    /** MockClient options. */
    interface Options extends Client.Options {
        /** The agent to associate this MockClient with. */
        agent: MockAgent;
    }
}

declare namespace MockErrors {
    /** The request does not match any registered mock dispatches. */
    class MockNotMatchedError extends Errors.UndiciError {
        constructor(message?: string);
        name: 'MockNotMatchedError';
        code: 'UND_MOCK_ERR_MOCK_NOT_MATCHED';
    }
}

/** The interceptor for a Mock. */
declare class MockInterceptor {
    constructor(options: MockInterceptor.Options, mockDispatches: MockInterceptor.MockDispatch[]);
    /** Mock an undici request with the defined reply. */
    reply<TData extends object = object>(replyOptionsCallback: MockInterceptor.MockReplyOptionsCallback<TData>): MockScope<TData>;
    reply<TData extends object = object>(
    statusCode: number,
    data?: TData | Buffer | string | MockInterceptor.MockResponseDataHandler<TData>,
    responseOptions?: MockInterceptor.MockResponseOptions
    ): MockScope<TData>;
    /** Mock an undici request by throwing the defined reply error. */
    replyWithError<TError extends Error = Error>(error: TError): MockScope;
    /** Set default reply headers on the interceptor for subsequent mocked replies. */
    defaultReplyHeaders(headers: IncomingHttpHeaders): MockInterceptor;
    /** Set default reply trailers on the interceptor for subsequent mocked replies. */
    defaultReplyTrailers(trailers: Record<string, string>): MockInterceptor;
    /** Set automatically calculated content-length header on subsequent mocked replies. */
    replyContentLength(): MockInterceptor;
}

declare namespace MockInterceptor {
    /** MockInterceptor options. */
    interface Options {
        /** Path to intercept on. */
        path: string | RegExp | ((path: string) => boolean);
        /** Method to intercept on. Defaults to GET. */
        method?: string | RegExp | ((method: string) => boolean);
        /** Body to intercept on. */
        body?: string | RegExp | ((body: string) => boolean);
        /** Headers to intercept on. */
        headers?: Record<string, string | RegExp | ((body: string) => boolean)> | ((headers: Record<string, string>) => boolean);
        /** Query params to intercept on */
        query?: Record<string, any>;
    }
    interface MockDispatch<TData extends object = object, TError extends Error = Error> extends Options {
        times: number | null;
        persist: boolean;
        consumed: boolean;
        data: MockDispatchData<TData, TError>;
    }
    interface MockDispatchData<TData extends object = object, TError extends Error = Error> extends MockResponseOptions {
        error: TError | null;
        statusCode?: number;
        data?: TData | string;
    }
    interface MockResponseOptions {
        headers?: IncomingHttpHeaders;
        trailers?: Record<string, string>;
    }

    interface MockResponseCallbackOptions {
        path: string;
        origin: string;
        method: string;
        body?: BodyInit | Dispatcher.DispatchOptions['body'];
        headers: Headers | Record<string, string>;
        maxRedirections: number;
    }

    type MockResponseDataHandler<TData extends object = object> = (
    opts: MockResponseCallbackOptions
    ) => TData | Buffer | string;

    type MockReplyOptionsCallback<TData extends object = object> = (
    opts: MockResponseCallbackOptions
    ) => { statusCode: number, data?: TData | Buffer | string, responseOptions?: MockResponseOptions }
}

/** MockPool extends the Pool API and allows one to mock requests. */
declare class MockPool extends Pool implements Interceptable {
    constructor(origin: string, options: MockPool.Options);
    /** Intercepts any matching requests that use the same origin as this mock pool. */
    intercept(options: MockInterceptor.Options): MockInterceptor;
    /** Dispatches a mocked request. */
    dispatch(options: Dispatcher.DispatchOptions, handlers: Dispatcher.DispatchHandlers): boolean;
    /** Closes the mock pool and gracefully waits for enqueued requests to complete. */
    close(): Promise<void>;
}

declare namespace MockPool {
    /** MockPool options. */
    interface Options extends Pool.Options {
        /** The agent to associate this MockPool with. */
        agent: MockAgent;
    }
}

/** The scope associated with a mock dispatch. */
declare class MockScope<TData extends object = object> {
    constructor(mockDispatch: MockInterceptor.MockDispatch<TData>);
    /** Delay a reply by a set amount of time in ms. */
    delay(waitInMs: number): MockScope<TData>;
    /** Persist the defined mock data for the associated reply. It will return the defined mock data indefinitely. */
    persist(): MockScope<TData>;
    /** Define a reply for a set amount of matching requests. */
    times(repeatTimes: number): MockScope<TData>;
}

declare interface MultiCacheQueryOptions extends CacheQueryOptions {
    cacheName?: string
}

declare interface Observability {
    /** If observability is enabled for this Worker */
    enabled: boolean;
    /** The sampling rate */
    head_sampling_rate?: number;
}

declare interface PagesConfigFields {
    /**
     * The directory of static assets to serve.
     *
     * The presence of this field in `wrangler.toml` indicates a Pages project,
     * and will prompt the handling of the configuration file according to the
     * Pages-specific validation rules.
     */
    pages_build_output_dir?: string;
}

declare interface PagesConfigFields {
    /**
     * The directory of static assets to serve.
     *
     * The presence of this field in `wrangler.toml` indicates a Pages project,
     * and will prompt the handling of the configuration file according to the
     * Pages-specific validation rules.
     */
    pages_build_output_dir?: string;
}

declare interface PagesDeployOptions {
    /**
     * Path to static assets to deploy to Pages
     */
    directory: string;
    /**
     * The Cloudflare Account ID that owns the project that's
     * being published
     */
    accountId: string;
    /**
     * The name of the project to be published
     */
    projectName: string;
    /**
     * Branch name to use. Defaults to production branch
     */
    branch?: string;
    /**
     * Whether or not to skip local file upload result caching
     */
    skipCaching?: boolean;
    /**
     * Commit message associated to deployment
     */
    commitMessage?: string;
    /**
     * Commit hash associated to deployment
     */
    commitHash?: string;
    /**
     * Whether or not the deployment should be considered to be
     * in a dirty commit state
     */
    commitDirty?: boolean;
    /**
     * Path to the project's functions directory. Default uses
     * the current working directory + /functions since this is
     * typically called in a CLI
     */
    functionsDirectory?: string;
    /**
     * Whether to run bundling on `_worker.js` before deploying.
     * Default: true
     */
    bundle?: boolean;
    /**
     * Whether to upload any server-side sourcemaps with this deployment
     */
    sourceMaps: boolean;
    /**
     * Command line args passed to the `pages deploy` cmd
     */
    args?: Record<string, unknown>;
}

declare type _Params<ParamsArray extends [unknown?]> = ParamsArray extends [infer P] ? P : undefined;

/**
 * Parse a string to a {@link MIMEType} object. Returns `failure` if the string
 * couldn't be parsed.
 * @see https://mimesniff.spec.whatwg.org/#parse-a-mime-type
 */
declare function parseMIMEType (input: string): 'failure' | MIMEType

declare interface PendingInterceptor extends MockDispatch {
    origin: string;
}

declare interface PendingInterceptorsFormatter {
    format(pendingInterceptors: readonly PendingInterceptor[]): string;
}

/** For easy use with `stream.pipeline`. */
declare function pipeline(
url: string | URL_2 | UrlObject,
options: { dispatcher?: Dispatcher } & Omit<Dispatcher.PipelineOptions, 'origin' | 'path'>,
handler: Dispatcher.PipelineHandler
): Duplex;

/**
 * Result of the `getPlatformProxy` utility
 */
export declare type PlatformProxy<Env = Record<string, unknown>, CfProperties extends Record<string, unknown> = IncomingRequestCfProperties> = {
    /**
     * Environment object containing the various Cloudflare bindings
     */
    env: Env;
    /**
     * Mock of the context object that Workers received in their request handler, all the object's methods are no-op
     */
    cf: CfProperties;
    /**
     * Mock of the context object that Workers received in their request handler, all the object's methods are no-op
     */
    ctx: ExecutionContext;
    /**
     * Caches object emulating the Workers Cache runtime API
     */
    caches: CacheStorage_2;
    /**
     * Function used to dispose of the child process providing the bindings implementation
     */
    dispose: () => Promise<void>;
};

declare class Pool extends Dispatcher {
    constructor(url: string | URL_2, options?: Pool.Options)
    /** `true` after `pool.close()` has been called. */
    closed: boolean;
    /** `true` after `pool.destroyed()` has been called or `pool.close()` has been called and the pool shutdown has completed. */
    destroyed: boolean;
    /** Aggregate stats for a Pool. */
    readonly stats: PoolStats;
}

declare namespace Pool {
    type PoolStats = PoolStats;
    interface Options extends Client.Options {
        /** Default: `(origin, opts) => new Client(origin, opts)`. */
        factory?(origin: URL_2, opts: object): Dispatcher;
        /** The max number of clients to create. `null` if no limit. Default `null`. */
        connections?: number | null;

        interceptors?: { Pool?: readonly Dispatcher.DispatchInterceptor[] } & Client.Options["interceptors"]
    }
}

declare class PoolStats {
    constructor(pool: Pool);
    /** Number of open socket connections in this pool. */
    connected: number;
    /** Number of open socket connections in this pool that do not have an active request. */
    free: number;
    /** Number of pending requests across all clients in this pool. */
    pending: number;
    /** Number of queued requests across all clients in this pool. */
    queued: number;
    /** Number of currently active requests across all clients in this pool. */
    running: number;
    /** Number of active, pending, or queued requests across all clients in this pool. */
    size: number;
}

declare type PreviewTokenExpiredEvent = {
    type: "previewTokenExpired";
    proxyData: ProxyData;
};

declare class ProgressEvent {
    __proto__: Event_2 & ProgressEvent

    constructor (type: string, eventInitDict?: ProgressEventInit)

    readonly lengthComputable: boolean
    readonly loaded: number
    readonly total: number
}

declare interface ProgressEventInit extends EventInit {
    lengthComputable?: boolean
    loaded?: number
    total?: number
}

/**********************************************************************
 * Auto-generated by protocol-dts-generator.ts, do not edit manually. *
 **********************************************************************/

/**
 * The Chrome DevTools Protocol.
 * @public
 */
declare namespace Protocol {

    type integer = number

    /**
     * This domain is deprecated - use Runtime or Log instead.
     */
    namespace Console {

        const enum ConsoleMessageSource {
            XML = 'xml',
            Javascript = 'javascript',
            Network = 'network',
            ConsoleAPI = 'console-api',
            Storage = 'storage',
            Appcache = 'appcache',
            Rendering = 'rendering',
            Security = 'security',
            Other = 'other',
            Deprecation = 'deprecation',
            Worker = 'worker',
        }

        const enum ConsoleMessageLevel {
            Log = 'log',
            Warning = 'warning',
            Error = 'error',
            Debug = 'debug',
            Info = 'info',
        }

        /**
         * Console message.
         */
        interface ConsoleMessage {
            /**
             * Message source. (ConsoleMessageSource enum)
             */
            source: ('xml' | 'javascript' | 'network' | 'console-api' | 'storage' | 'appcache' | 'rendering' | 'security' | 'other' | 'deprecation' | 'worker');
            /**
             * Message severity. (ConsoleMessageLevel enum)
             */
            level: ('log' | 'warning' | 'error' | 'debug' | 'info');
            /**
             * Message text.
             */
            text: string;
            /**
             * URL of the message origin.
             */
            url?: string;
            /**
             * Line number in the resource that generated this message (1-based).
             */
            line?: integer;
            /**
             * Column number in the resource that generated this message (1-based).
             */
            column?: integer;
        }

        /**
         * Issued when new console message is added.
         */
        interface MessageAddedEvent {
            /**
             * Console message that has been added.
             */
            message: ConsoleMessage;
        }
    }

    /**
     * Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing
     * breakpoints, stepping through execution, exploring stack traces, etc.
     */
    namespace Debugger {

        /**
         * Breakpoint identifier.
         */
        type BreakpointId = string;

        /**
         * Call frame identifier.
         */
        type CallFrameId = string;

        /**
         * Location in the source code.
         */
        interface Location {
            /**
             * Script identifier as reported in the `Debugger.scriptParsed`.
             */
            scriptId: Runtime.ScriptId;
            /**
             * Line number in the script (0-based).
             */
            lineNumber: integer;
            /**
             * Column number in the script (0-based).
             */
            columnNumber?: integer;
        }

        /**
         * Location in the source code.
         */
        interface ScriptPosition {
            lineNumber: integer;
            columnNumber: integer;
        }

        /**
         * Location range within one script.
         */
        interface LocationRange {
            scriptId: Runtime.ScriptId;
            start: ScriptPosition;
            end: ScriptPosition;
        }

        /**
         * JavaScript call frame. Array of call frames form the call stack.
         */
        interface CallFrame {
            /**
             * Call frame identifier. This identifier is only valid while the virtual machine is paused.
             */
            callFrameId: CallFrameId;
            /**
             * Name of the JavaScript function called on this call frame.
             */
            functionName: string;
            /**
             * Location in the source code.
             */
            functionLocation?: Location;
            /**
             * Location in the source code.
             */
            location: Location;
            /**
             * JavaScript script name or url.
             * Deprecated in favor of using the `location.scriptId` to resolve the URL via a previously
             * sent `Debugger.scriptParsed` event.
             */
            url: string;
            /**
             * Scope chain for this call frame.
             */
            scopeChain: Scope[];
            /**
             * `this` object for this call frame.
             */
            this: Runtime.RemoteObject;
            /**
             * The value being returned, if the function is at return point.
             */
            returnValue?: Runtime.RemoteObject;
            /**
             * Valid only while the VM is paused and indicates whether this frame
             * can be restarted or not. Note that a `true` value here does not
             * guarantee that Debugger#restartFrame with this CallFrameId will be
             * successful, but it is very likely.
             */
            canBeRestarted?: boolean;
        }

        const enum ScopeType {
            Global = 'global',
            Local = 'local',
            With = 'with',
            Closure = 'closure',
            Catch = 'catch',
            Block = 'block',
            Script = 'script',
            Eval = 'eval',
            Module = 'module',
            WasmExpressionStack = 'wasm-expression-stack',
        }

        /**
         * Scope description.
         */
        interface Scope {
            /**
             * Scope type. (ScopeType enum)
             */
            type: ('global' | 'local' | 'with' | 'closure' | 'catch' | 'block' | 'script' | 'eval' | 'module' | 'wasm-expression-stack');
            /**
             * Object representing the scope. For `global` and `with` scopes it represents the actual
             * object; for the rest of the scopes, it is artificial transient object enumerating scope
             * variables as its properties.
             */
            object: Runtime.RemoteObject;
            name?: string;
            /**
             * Location in the source code where scope starts
             */
            startLocation?: Location;
            /**
             * Location in the source code where scope ends
             */
            endLocation?: Location;
        }

        /**
         * Search match for resource.
         */
        interface SearchMatch {
            /**
             * Line number in resource content.
             */
            lineNumber: number;
            /**
             * Line with match content.
             */
            lineContent: string;
        }

        const enum BreakLocationType {
            DebuggerStatement = 'debuggerStatement',
            Call = 'call',
            Return = 'return',
        }

        interface BreakLocation {
            /**
             * Script identifier as reported in the `Debugger.scriptParsed`.
             */
            scriptId: Runtime.ScriptId;
            /**
             * Line number in the script (0-based).
             */
            lineNumber: integer;
            /**
             * Column number in the script (0-based).
             */
            columnNumber?: integer;
            /**
             *  (BreakLocationType enum)
             */
            type?: ('debuggerStatement' | 'call' | 'return');
        }

        interface WasmDisassemblyChunk {
            /**
             * The next chunk of disassembled lines.
             */
            lines: string[];
            /**
             * The bytecode offsets describing the start of each line.
             */
            bytecodeOffsets: integer[];
        }

        /**
         * Enum of possible script languages.
         */
        type ScriptLanguage = ('JavaScript' | 'WebAssembly');

        const enum DebugSymbolsType {
            None = 'None',
            SourceMap = 'SourceMap',
            EmbeddedDWARF = 'EmbeddedDWARF',
            ExternalDWARF = 'ExternalDWARF',
        }

        /**
         * Debug symbols available for a wasm script.
         */
        interface DebugSymbols {
            /**
             * Type of the debug symbols. (DebugSymbolsType enum)
             */
            type: ('None' | 'SourceMap' | 'EmbeddedDWARF' | 'ExternalDWARF');
            /**
             * URL of the external symbol source.
             */
            externalURL?: string;
        }

        const enum ContinueToLocationRequestTargetCallFrames {
            Any = 'any',
            Current = 'current',
        }

        interface ContinueToLocationRequest {
            /**
             * Location to continue to.
             */
            location: Location;
            /**
             *  (ContinueToLocationRequestTargetCallFrames enum)
             */
            targetCallFrames?: ('any' | 'current');
        }

        interface EnableRequest {
            /**
             * The maximum size in bytes of collected scripts (not referenced by other heap objects)
             * the debugger can hold. Puts no limit if parameter is omitted.
             */
            maxScriptsCacheSize?: number;
        }

        interface EnableResponse {
            /**
             * Unique identifier of the debugger.
             */
            debuggerId: Runtime.UniqueDebuggerId;
        }

        interface EvaluateOnCallFrameRequest {
            /**
             * Call frame identifier to evaluate on.
             */
            callFrameId: CallFrameId;
            /**
             * Expression to evaluate.
             */
            expression: string;
            /**
             * String object group name to put result into (allows rapid releasing resulting object handles
             * using `releaseObjectGroup`).
             */
            objectGroup?: string;
            /**
             * Specifies whether command line API should be available to the evaluated expression, defaults
             * to false.
             */
            includeCommandLineAPI?: boolean;
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause
             * execution. Overrides `setPauseOnException` state.
             */
            silent?: boolean;
            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             */
            generatePreview?: boolean;
            /**
             * Whether to throw an exception if side effect cannot be ruled out during evaluation.
             */
            throwOnSideEffect?: boolean;
            /**
             * Terminate execution after timing out (number of milliseconds).
             */
            timeout?: Runtime.TimeDelta;
        }

        interface EvaluateOnCallFrameResponse {
            /**
             * Object wrapper for the evaluation result.
             */
            result: Runtime.RemoteObject;
            /**
             * Exception details.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        interface GetPossibleBreakpointsRequest {
            /**
             * Start of range to search possible breakpoint locations in.
             */
            start: Location;
            /**
             * End of range to search possible breakpoint locations in (excluding). When not specified, end
             * of scripts is used as end of range.
             */
            end?: Location;
            /**
             * Only consider locations which are in the same (non-nested) function as start.
             */
            restrictToFunction?: boolean;
        }

        interface GetPossibleBreakpointsResponse {
            /**
             * List of the possible breakpoint locations.
             */
            locations: BreakLocation[];
        }

        interface GetScriptSourceRequest {
            /**
             * Id of the script to get source for.
             */
            scriptId: Runtime.ScriptId;
        }

        interface GetScriptSourceResponse {
            /**
             * Script source (empty in case of Wasm bytecode).
             */
            scriptSource: string;
            /**
             * Wasm bytecode. (Encoded as a base64 string when passed over JSON)
             */
            bytecode?: string;
        }

        interface DisassembleWasmModuleRequest {
            /**
             * Id of the script to disassemble
             */
            scriptId: Runtime.ScriptId;
        }

        interface DisassembleWasmModuleResponse {
            /**
             * For large modules, return a stream from which additional chunks of
             * disassembly can be read successively.
             */
            streamId?: string;
            /**
             * The total number of lines in the disassembly text.
             */
            totalNumberOfLines: integer;
            /**
             * The offsets of all function bodies, in the format [start1, end1,
             * start2, end2, ...] where all ends are exclusive.
             */
            functionBodyOffsets: integer[];
            /**
             * The first chunk of disassembly.
             */
            chunk: WasmDisassemblyChunk;
        }

        interface NextWasmDisassemblyChunkRequest {
            streamId: string;
        }

        interface NextWasmDisassemblyChunkResponse {
            /**
             * The next chunk of disassembly.
             */
            chunk: WasmDisassemblyChunk;
        }

        interface GetWasmBytecodeRequest {
            /**
             * Id of the Wasm script to get source for.
             */
            scriptId: Runtime.ScriptId;
        }

        interface GetWasmBytecodeResponse {
            /**
             * Script source. (Encoded as a base64 string when passed over JSON)
             */
            bytecode: string;
        }

        interface GetStackTraceRequest {
            stackTraceId: Runtime.StackTraceId;
        }

        interface GetStackTraceResponse {
            stackTrace: Runtime.StackTrace;
        }

        interface PauseOnAsyncCallRequest {
            /**
             * Debugger will pause when async call with given stack trace is started.
             */
            parentStackTraceId: Runtime.StackTraceId;
        }

        interface RemoveBreakpointRequest {
            breakpointId: BreakpointId;
        }

        const enum RestartFrameRequestMode {
            StepInto = 'StepInto',
        }

        interface RestartFrameRequest {
            /**
             * Call frame identifier to evaluate on.
             */
            callFrameId: CallFrameId;
            /**
             * The `mode` parameter must be present and set to 'StepInto', otherwise
             * `restartFrame` will error out. (RestartFrameRequestMode enum)
             */
            mode?: ('StepInto');
        }

        interface RestartFrameResponse {
            /**
             * New stack trace.
             */
            callFrames: CallFrame[];
            /**
             * Async stack trace, if any.
             */
            asyncStackTrace?: Runtime.StackTrace;
            /**
             * Async stack trace, if any.
             */
            asyncStackTraceId?: Runtime.StackTraceId;
        }

        interface ResumeRequest {
            /**
             * Set to true to terminate execution upon resuming execution. In contrast
             * to Runtime.terminateExecution, this will allows to execute further
             * JavaScript (i.e. via evaluation) until execution of the paused code
             * is actually resumed, at which point termination is triggered.
             * If execution is currently not paused, this parameter has no effect.
             */
            terminateOnResume?: boolean;
        }

        interface SearchInContentRequest {
            /**
             * Id of the script to search in.
             */
            scriptId: Runtime.ScriptId;
            /**
             * String to search for.
             */
            query: string;
            /**
             * If true, search is case sensitive.
             */
            caseSensitive?: boolean;
            /**
             * If true, treats string parameter as regex.
             */
            isRegex?: boolean;
        }

        interface SearchInContentResponse {
            /**
             * List of search matches.
             */
            result: SearchMatch[];
        }

        interface SetAsyncCallStackDepthRequest {
            /**
             * Maximum depth of async call stacks. Setting to `0` will effectively disable collecting async
             * call stacks (default).
             */
            maxDepth: integer;
        }

        interface SetBlackboxPatternsRequest {
            /**
             * Array of regexps that will be used to check script url for blackbox state.
             */
            patterns: string[];
        }

        interface SetBlackboxedRangesRequest {
            /**
             * Id of the script.
             */
            scriptId: Runtime.ScriptId;
            positions: ScriptPosition[];
        }

        interface SetBreakpointRequest {
            /**
             * Location to set breakpoint in.
             */
            location: Location;
            /**
             * Expression to use as a breakpoint condition. When specified, debugger will only stop on the
             * breakpoint if this expression evaluates to true.
             */
            condition?: string;
        }

        interface SetBreakpointResponse {
            /**
             * Id of the created breakpoint for further reference.
             */
            breakpointId: BreakpointId;
            /**
             * Location this breakpoint resolved into.
             */
            actualLocation: Location;
        }

        const enum SetInstrumentationBreakpointRequestInstrumentation {
            BeforeScriptExecution = 'beforeScriptExecution',
            BeforeScriptWithSourceMapExecution = 'beforeScriptWithSourceMapExecution',
        }

        interface SetInstrumentationBreakpointRequest {
            /**
             * Instrumentation name. (SetInstrumentationBreakpointRequestInstrumentation enum)
             */
            instrumentation: ('beforeScriptExecution' | 'beforeScriptWithSourceMapExecution');
        }

        interface SetInstrumentationBreakpointResponse {
            /**
             * Id of the created breakpoint for further reference.
             */
            breakpointId: BreakpointId;
        }

        interface SetBreakpointByUrlRequest {
            /**
             * Line number to set breakpoint at.
             */
            lineNumber: integer;
            /**
             * URL of the resources to set breakpoint on.
             */
            url?: string;
            /**
             * Regex pattern for the URLs of the resources to set breakpoints on. Either `url` or
             * `urlRegex` must be specified.
             */
            urlRegex?: string;
            /**
             * Script hash of the resources to set breakpoint on.
             */
            scriptHash?: string;
            /**
             * Offset in the line to set breakpoint at.
             */
            columnNumber?: integer;
            /**
             * Expression to use as a breakpoint condition. When specified, debugger will only stop on the
             * breakpoint if this expression evaluates to true.
             */
            condition?: string;
        }

        interface SetBreakpointByUrlResponse {
            /**
             * Id of the created breakpoint for further reference.
             */
            breakpointId: BreakpointId;
            /**
             * List of the locations this breakpoint resolved into upon addition.
             */
            locations: Location[];
        }

        interface SetBreakpointOnFunctionCallRequest {
            /**
             * Function object id.
             */
            objectId: Runtime.RemoteObjectId;
            /**
             * Expression to use as a breakpoint condition. When specified, debugger will
             * stop on the breakpoint if this expression evaluates to true.
             */
            condition?: string;
        }

        interface SetBreakpointOnFunctionCallResponse {
            /**
             * Id of the created breakpoint for further reference.
             */
            breakpointId: BreakpointId;
        }

        interface SetBreakpointsActiveRequest {
            /**
             * New value for breakpoints active state.
             */
            active: boolean;
        }

        const enum SetPauseOnExceptionsRequestState {
            None = 'none',
            Caught = 'caught',
            Uncaught = 'uncaught',
            All = 'all',
        }

        interface SetPauseOnExceptionsRequest {
            /**
             * Pause on exceptions mode. (SetPauseOnExceptionsRequestState enum)
             */
            state: ('none' | 'caught' | 'uncaught' | 'all');
        }

        interface SetReturnValueRequest {
            /**
             * New return value.
             */
            newValue: Runtime.CallArgument;
        }

        const enum SetScriptSourceResponseStatus {
            Ok = 'Ok',
            CompileError = 'CompileError',
            BlockedByActiveGenerator = 'BlockedByActiveGenerator',
            BlockedByActiveFunction = 'BlockedByActiveFunction',
            BlockedByTopLevelEsModuleChange = 'BlockedByTopLevelEsModuleChange',
        }

        interface SetScriptSourceRequest {
            /**
             * Id of the script to edit.
             */
            scriptId: Runtime.ScriptId;
            /**
             * New content of the script.
             */
            scriptSource: string;
            /**
             * If true the change will not actually be applied. Dry run may be used to get result
             * description without actually modifying the code.
             */
            dryRun?: boolean;
            /**
             * If true, then `scriptSource` is allowed to change the function on top of the stack
             * as long as the top-most stack frame is the only activation of that function.
             */
            allowTopFrameEditing?: boolean;
        }

        interface SetScriptSourceResponse {
            /**
             * New stack trace in case editing has happened while VM was stopped.
             */
            callFrames?: CallFrame[];
            /**
             * Whether current call stack  was modified after applying the changes.
             */
            stackChanged?: boolean;
            /**
             * Async stack trace, if any.
             */
            asyncStackTrace?: Runtime.StackTrace;
            /**
             * Async stack trace, if any.
             */
            asyncStackTraceId?: Runtime.StackTraceId;
            /**
             * Whether the operation was successful or not. Only `Ok` denotes a
             * successful live edit while the other enum variants denote why
             * the live edit failed. (SetScriptSourceResponseStatus enum)
             */
            status: ('Ok' | 'CompileError' | 'BlockedByActiveGenerator' | 'BlockedByActiveFunction' | 'BlockedByTopLevelEsModuleChange');
            /**
             * Exception details if any. Only present when `status` is `CompileError`.
             */
            exceptionDetails?: Runtime.ExceptionDetails;
        }

        interface SetSkipAllPausesRequest {
            /**
             * New value for skip pauses state.
             */
            skip: boolean;
        }

        interface SetVariableValueRequest {
            /**
             * 0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch'
             * scope types are allowed. Other scopes could be manipulated manually.
             */
            scopeNumber: integer;
            /**
             * Variable name.
             */
            variableName: string;
            /**
             * New variable value.
             */
            newValue: Runtime.CallArgument;
            /**
             * Id of callframe that holds variable.
             */
            callFrameId: CallFrameId;
        }

        interface StepIntoRequest {
            /**
             * Debugger will pause on the execution of the first async task which was scheduled
             * before next pause.
             */
            breakOnAsyncCall?: boolean;
            /**
             * The skipList specifies location ranges that should be skipped on step into.
             */
            skipList?: LocationRange[];
        }

        interface StepOverRequest {
            /**
             * The skipList specifies location ranges that should be skipped on step over.
             */
            skipList?: LocationRange[];
        }

        /**
         * Fired when breakpoint is resolved to an actual script and location.
         */
        interface BreakpointResolvedEvent {
            /**
             * Breakpoint unique identifier.
             */
            breakpointId: BreakpointId;
            /**
             * Actual breakpoint location.
             */
            location: Location;
        }

        const enum PausedEventReason {
            Ambiguous = 'ambiguous',
            Assert = 'assert',
            CSPViolation = 'CSPViolation',
            DebugCommand = 'debugCommand',
            DOM = 'DOM',
            EventListener = 'EventListener',
            Exception = 'exception',
            Instrumentation = 'instrumentation',
            OOM = 'OOM',
            Other = 'other',
            PromiseRejection = 'promiseRejection',
            XHR = 'XHR',
            Step = 'step',
        }

        /**
         * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
         */
        interface PausedEvent {
            /**
             * Call stack the virtual machine stopped on.
             */
            callFrames: CallFrame[];
            /**
             * Pause reason. (PausedEventReason enum)
             */
            reason: ('ambiguous' | 'assert' | 'CSPViolation' | 'debugCommand' | 'DOM' | 'EventListener' | 'exception' | 'instrumentation' | 'OOM' | 'other' | 'promiseRejection' | 'XHR' | 'step');
            /**
             * Object containing break-specific auxiliary properties.
             */
            data?: any;
            /**
             * Hit breakpoints IDs
             */
            hitBreakpoints?: string[];
            /**
             * Async stack trace, if any.
             */
            asyncStackTrace?: Runtime.StackTrace;
            /**
             * Async stack trace, if any.
             */
            asyncStackTraceId?: Runtime.StackTraceId;
            /**
             * Never present, will be removed.
             */
            asyncCallStackTraceId?: Runtime.StackTraceId;
        }

        /**
         * Fired when virtual machine fails to parse the script.
         */
        interface ScriptFailedToParseEvent {
            /**
             * Identifier of the script parsed.
             */
            scriptId: Runtime.ScriptId;
            /**
             * URL or name of the script parsed (if any).
             */
            url: string;
            /**
             * Line offset of the script within the resource with given URL (for script tags).
             */
            startLine: integer;
            /**
             * Column offset of the script within the resource with given URL.
             */
            startColumn: integer;
            /**
             * Last line of the script.
             */
            endLine: integer;
            /**
             * Length of the last line of the script.
             */
            endColumn: integer;
            /**
             * Specifies script creation context.
             */
            executionContextId: Runtime.ExecutionContextId;
            /**
             * Content hash of the script, SHA-256.
             */
            hash: string;
            /**
             * Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
             */
            executionContextAuxData?: any;
            /**
             * URL of source map associated with script (if any).
             */
            sourceMapURL?: string;
            /**
             * True, if this script has sourceURL.
             */
            hasSourceURL?: boolean;
            /**
             * True, if this script is ES6 module.
             */
            isModule?: boolean;
            /**
             * This script length.
             */
            length?: integer;
            /**
             * JavaScript top stack frame of where the script parsed event was triggered if available.
             */
            stackTrace?: Runtime.StackTrace;
            /**
             * If the scriptLanguage is WebAssembly, the code section offset in the module.
             */
            codeOffset?: integer;
            /**
             * The language of the script.
             */
            scriptLanguage?: Debugger.ScriptLanguage;
            /**
             * The name the embedder supplied for this script.
             */
            embedderName?: string;
        }

        /**
         * Fired when virtual machine parses script. This event is also fired for all known and uncollected
         * scripts upon enabling debugger.
         */
        interface ScriptParsedEvent {
            /**
             * Identifier of the script parsed.
             */
            scriptId: Runtime.ScriptId;
            /**
             * URL or name of the script parsed (if any).
             */
            url: string;
            /**
             * Line offset of the script within the resource with given URL (for script tags).
             */
            startLine: integer;
            /**
             * Column offset of the script within the resource with given URL.
             */
            startColumn: integer;
            /**
             * Last line of the script.
             */
            endLine: integer;
            /**
             * Length of the last line of the script.
             */
            endColumn: integer;
            /**
             * Specifies script creation context.
             */
            executionContextId: Runtime.ExecutionContextId;
            /**
             * Content hash of the script, SHA-256.
             */
            hash: string;
            /**
             * Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
             */
            executionContextAuxData?: any;
            /**
             * True, if this script is generated as a result of the live edit operation.
             */
            isLiveEdit?: boolean;
            /**
             * URL of source map associated with script (if any).
             */
            sourceMapURL?: string;
            /**
             * True, if this script has sourceURL.
             */
            hasSourceURL?: boolean;
            /**
             * True, if this script is ES6 module.
             */
            isModule?: boolean;
            /**
             * This script length.
             */
            length?: integer;
            /**
             * JavaScript top stack frame of where the script parsed event was triggered if available.
             */
            stackTrace?: Runtime.StackTrace;
            /**
             * If the scriptLanguage is WebAssembly, the code section offset in the module.
             */
            codeOffset?: integer;
            /**
             * The language of the script.
             */
            scriptLanguage?: Debugger.ScriptLanguage;
            /**
             * If the scriptLanguage is WebASsembly, the source of debug symbols for the module.
             */
            debugSymbols?: Debugger.DebugSymbols;
            /**
             * The name the embedder supplied for this script.
             */
            embedderName?: string;
        }
    }

    namespace HeapProfiler {

        /**
         * Heap snapshot object id.
         */
        type HeapSnapshotObjectId = string;

        /**
         * Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes.
         */
        interface SamplingHeapProfileNode {
            /**
             * Function location.
             */
            callFrame: Runtime.CallFrame;
            /**
             * Allocations size in bytes for the node excluding children.
             */
            selfSize: number;
            /**
             * Node id. Ids are unique across all profiles collected between startSampling and stopSampling.
             */
            id: integer;
            /**
             * Child nodes.
             */
            children: SamplingHeapProfileNode[];
        }

        /**
         * A single sample from a sampling profile.
         */
        interface SamplingHeapProfileSample {
            /**
             * Allocation size in bytes attributed to the sample.
             */
            size: number;
            /**
             * Id of the corresponding profile tree node.
             */
            nodeId: integer;
            /**
             * Time-ordered sample ordinal number. It is unique across all profiles retrieved
             * between startSampling and stopSampling.
             */
            ordinal: number;
        }

        /**
         * Sampling profile.
         */
        interface SamplingHeapProfile {
            head: SamplingHeapProfileNode;
            samples: SamplingHeapProfileSample[];
        }

        interface AddInspectedHeapObjectRequest {
            /**
             * Heap snapshot object id to be accessible by means of $x command line API.
             */
            heapObjectId: HeapSnapshotObjectId;
        }

        interface GetHeapObjectIdRequest {
            /**
             * Identifier of the object to get heap object id for.
             */
            objectId: Runtime.RemoteObjectId;
        }

        interface GetHeapObjectIdResponse {
            /**
             * Id of the heap snapshot object corresponding to the passed remote object id.
             */
            heapSnapshotObjectId: HeapSnapshotObjectId;
        }

        interface GetObjectByHeapObjectIdRequest {
            objectId: HeapSnapshotObjectId;
            /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
        }

        interface GetObjectByHeapObjectIdResponse {
            /**
             * Evaluation result.
             */
            result: Runtime.RemoteObject;
        }

        interface GetSamplingProfileResponse {
            /**
             * Return the sampling profile being collected.
             */
            profile: SamplingHeapProfile;
        }

        interface StartSamplingRequest {
            /**
             * Average sample interval in bytes. Poisson distribution is used for the intervals. The
             * default value is 32768 bytes.
             */
            samplingInterval?: number;
            /**
             * By default, the sampling heap profiler reports only objects which are
             * still alive when the profile is returned via getSamplingProfile or
             * stopSampling, which is useful for determining what functions contribute
             * the most to steady-state memory usage. This flag instructs the sampling
             * heap profiler to also include information about objects discarded by
             * major GC, which will show which functions cause large temporary memory
             * usage or long GC pauses.
             */
            includeObjectsCollectedByMajorGC?: boolean;
            /**
             * By default, the sampling heap profiler reports only objects which are
             * still alive when the profile is returned via getSamplingProfile or
             * stopSampling, which is useful for determining what functions contribute
             * the most to steady-state memory usage. This flag instructs the sampling
             * heap profiler to also include information about objects discarded by
             * minor GC, which is useful when tuning a latency-sensitive application
             * for minimal GC activity.
             */
            includeObjectsCollectedByMinorGC?: boolean;
        }

        interface StartTrackingHeapObjectsRequest {
            trackAllocations?: boolean;
        }

        interface StopSamplingResponse {
            /**
             * Recorded sampling heap profile.
             */
            profile: SamplingHeapProfile;
        }

        interface StopTrackingHeapObjectsRequest {
            /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken
             * when the tracking is stopped.
             */
            reportProgress?: boolean;
            /**
             * Deprecated in favor of `exposeInternals`.
             */
            treatGlobalObjectsAsRoots?: boolean;
            /**
             * If true, numerical values are included in the snapshot
             */
            captureNumericValue?: boolean;
            /**
             * If true, exposes internals of the snapshot.
             */
            exposeInternals?: boolean;
        }

        interface TakeHeapSnapshotRequest {
            /**
             * If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
             */
            reportProgress?: boolean;
            /**
             * If true, a raw snapshot without artificial roots will be generated.
             * Deprecated in favor of `exposeInternals`.
             */
            treatGlobalObjectsAsRoots?: boolean;
            /**
             * If true, numerical values are included in the snapshot
             */
            captureNumericValue?: boolean;
            /**
             * If true, exposes internals of the snapshot.
             */
            exposeInternals?: boolean;
        }

        interface AddHeapSnapshotChunkEvent {
            chunk: string;
        }

        /**
         * If heap objects tracking has been started then backend may send update for one or more fragments
         */
        interface HeapStatsUpdateEvent {
            /**
             * An array of triplets. Each triplet describes a fragment. The first integer is the fragment
             * index, the second integer is a total count of objects for the fragment, the third integer is
             * a total size of the objects for the fragment.
             */
            statsUpdate: integer[];
        }

        /**
         * If heap objects tracking has been started then backend regularly sends a current value for last
         * seen object id and corresponding timestamp. If the were changes in the heap since last event
         * then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
         */
        interface LastSeenObjectIdEvent {
            lastSeenObjectId: integer;
            timestamp: number;
        }

        interface ReportHeapSnapshotProgressEvent {
            done: integer;
            total: integer;
            finished?: boolean;
        }
    }

    namespace Profiler {

        /**
         * Profile node. Holds callsite information, execution statistics and child nodes.
         */
        interface ProfileNode {
            /**
             * Unique id of the node.
             */
            id: integer;
            /**
             * Function location.
             */
            callFrame: Runtime.CallFrame;
            /**
             * Number of samples where this node was on top of the call stack.
             */
            hitCount?: integer;
            /**
             * Child node ids.
             */
            children?: integer[];
            /**
             * The reason of being not optimized. The function may be deoptimized or marked as don't
             * optimize.
             */
            deoptReason?: string;
            /**
             * An array of source position ticks.
             */
            positionTicks?: PositionTickInfo[];
        }

        /**
         * Profile.
         */
        interface Profile {
            /**
             * The list of profile nodes. First item is the root node.
             */
            nodes: ProfileNode[];
            /**
             * Profiling start timestamp in microseconds.
             */
            startTime: number;
            /**
             * Profiling end timestamp in microseconds.
             */
            endTime: number;
            /**
             * Ids of samples top nodes.
             */
            samples?: integer[];
            /**
             * Time intervals between adjacent samples in microseconds. The first delta is relative to the
             * profile startTime.
             */
            timeDeltas?: integer[];
        }

        /**
         * Specifies a number of samples attributed to a certain source position.
         */
        interface PositionTickInfo {
            /**
             * Source line number (1-based).
             */
            line: integer;
            /**
             * Number of samples attributed to the source line.
             */
            ticks: integer;
        }

        /**
         * Coverage data for a source range.
         */
        interface CoverageRange {
            /**
             * JavaScript script source offset for the range start.
             */
            startOffset: integer;
            /**
             * JavaScript script source offset for the range end.
             */
            endOffset: integer;
            /**
             * Collected execution count of the source range.
             */
            count: integer;
        }

        /**
         * Coverage data for a JavaScript function.
         */
        interface FunctionCoverage {
            /**
             * JavaScript function name.
             */
            functionName: string;
            /**
             * Source ranges inside the function with coverage data.
             */
            ranges: CoverageRange[];
            /**
             * Whether coverage data for this function has block granularity.
             */
            isBlockCoverage: boolean;
        }

        /**
         * Coverage data for a JavaScript script.
         */
        interface ScriptCoverage {
            /**
             * JavaScript script id.
             */
            scriptId: Runtime.ScriptId;
            /**
             * JavaScript script name or url.
             */
            url: string;
            /**
             * Functions contained in the script that has coverage data.
             */
            functions: FunctionCoverage[];
        }

        interface GetBestEffortCoverageResponse {
            /**
             * Coverage data for the current isolate.
             */
            result: ScriptCoverage[];
        }

        interface SetSamplingIntervalRequest {
            /**
             * New sampling interval in microseconds.
             */
            interval: integer;
        }

        interface StartPreciseCoverageRequest {
            /**
             * Collect accurate call counts beyond simple 'covered' or 'not covered'.
             */
            callCount?: boolean;
            /**
             * Collect block-based coverage.
             */
            detailed?: boolean;
            /**
             * Allow the backend to send updates on its own initiative
             */
            allowTriggeredUpdates?: boolean;
        }

        interface StartPreciseCoverageResponse {
            /**
             * Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
             */
            timestamp: number;
        }

        interface StopResponse {
            /**
             * Recorded profile.
             */
            profile: Profile;
        }

        interface TakePreciseCoverageResponse {
            /**
             * Coverage data for the current isolate.
             */
            result: ScriptCoverage[];
            /**
             * Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
             */
            timestamp: number;
        }

        interface ConsoleProfileFinishedEvent {
            id: string;
            /**
             * Location of console.profileEnd().
             */
            location: Debugger.Location;
            profile: Profile;
            /**
             * Profile title passed as an argument to console.profile().
             */
            title?: string;
        }

        /**
         * Sent when new profile recording is started using console.profile() call.
         */
        interface ConsoleProfileStartedEvent {
            id: string;
            /**
             * Location of console.profile().
             */
            location: Debugger.Location;
            /**
             * Profile title passed as an argument to console.profile().
             */
            title?: string;
        }

        /**
         * Reports coverage delta since the last poll (either from an event like this, or from
         * `takePreciseCoverage` for the current isolate. May only be sent if precise code
         * coverage has been started. This event can be trigged by the embedder to, for example,
         * trigger collection of coverage data immediately at a certain point in time.
         */
        interface PreciseCoverageDeltaUpdateEvent {
            /**
             * Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
             */
            timestamp: number;
            /**
             * Identifier for distinguishing coverage events.
             */
            occasion: string;
            /**
             * Coverage data for the current isolate.
             */
            result: ScriptCoverage[];
        }
    }

    /**
     * Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects.
     * Evaluation results are returned as mirror object that expose object type, string representation
     * and unique identifier that can be used for further object reference. Original objects are
     * maintained in memory unless they are either explicitly released or are released along with the
     * other objects in their object group.
     */
    namespace Runtime {

        /**
         * Unique script identifier.
         */
        type ScriptId = string;

        const enum SerializationOptionsSerialization {
            Deep = 'deep',
            Json = 'json',
            IdOnly = 'idOnly',
        }

        /**
         * Represents options for serialization. Overrides `generatePreview`, `returnByValue` and
         * `generateWebDriverValue`.
         */
        interface SerializationOptions {
            /**
             *  (SerializationOptionsSerialization enum)
             */
            serialization: ('deep' | 'json' | 'idOnly');
            /**
             * Deep serialization depth. Default is full depth. Respected only in `deep` serialization mode.
             */
            maxDepth?: integer;
            /**
             * Embedder-specific parameters. For example if connected to V8 in Chrome these control DOM
             * serialization via `maxNodeDepth: integer` and `includeShadowTree: "none" | "open" | "all"`.
             * Values can be only of type string or integer.
             */
            additionalParameters?: any;
        }

        const enum DeepSerializedValueType {
            Undefined = 'undefined',
            Null = 'null',
            String = 'string',
            Number = 'number',
            Boolean = 'boolean',
            Bigint = 'bigint',
            Regexp = 'regexp',
            Date = 'date',
            Symbol = 'symbol',
            Array = 'array',
            Object = 'object',
            Function = 'function',
            Map = 'map',
            Set = 'set',
            Weakmap = 'weakmap',
            Weakset = 'weakset',
            Error = 'error',
            Proxy = 'proxy',
            Promise = 'promise',
            Typedarray = 'typedarray',
            Arraybuffer = 'arraybuffer',
            Node = 'node',
            Window = 'window',
        }

        /**
         * Represents deep serialized value.
         */
        interface DeepSerializedValue {
            /**
             *  (DeepSerializedValueType enum)
             */
            type: ('undefined' | 'null' | 'string' | 'number' | 'boolean' | 'bigint' | 'regexp' | 'date' | 'symbol' | 'array' | 'object' | 'function' | 'map' | 'set' | 'weakmap' | 'weakset' | 'error' | 'proxy' | 'promise' | 'typedarray' | 'arraybuffer' | 'node' | 'window');
            value?: any;
            objectId?: string;
            /**
             * Set if value reference met more then once during serialization. In such
             * case, value is provided only to one of the serialized values. Unique
             * per value in the scope of one CDP call.
             */
            weakLocalObjectReference?: integer;
        }

        /**
         * Unique object identifier.
         */
        type RemoteObjectId = string;

        /**
         * Primitive value which cannot be JSON-stringified. Includes values `-0`, `NaN`, `Infinity`,
         * `-Infinity`, and bigint literals.
         */
        type UnserializableValue = string;

        const enum RemoteObjectType {
            Object = 'object',
            Function = 'function',
            Undefined = 'undefined',
            String = 'string',
            Number = 'number',
            Boolean = 'boolean',
            Symbol = 'symbol',
            Bigint = 'bigint',
        }

        const enum RemoteObjectSubtype {
            Array = 'array',
            Null = 'null',
            Node = 'node',
            Regexp = 'regexp',
            Date = 'date',
            Map = 'map',
            Set = 'set',
            Weakmap = 'weakmap',
            Weakset = 'weakset',
            Iterator = 'iterator',
            Generator = 'generator',
            Error = 'error',
            Proxy = 'proxy',
            Promise = 'promise',
            Typedarray = 'typedarray',
            Arraybuffer = 'arraybuffer',
            Dataview = 'dataview',
            Webassemblymemory = 'webassemblymemory',
            Wasmvalue = 'wasmvalue',
        }

        /**
         * Mirror object referencing original JavaScript object.
         */
        interface RemoteObject {
            /**
             * Object type. (RemoteObjectType enum)
             */
            type: ('object' | 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol' | 'bigint');
            /**
             * Object subtype hint. Specified for `object` type values only.
             * NOTE: If you change anything here, make sure to also update
             * `subtype` in `ObjectPreview` and `PropertyPreview` below. (RemoteObjectSubtype enum)
             */
            subtype?: ('array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error' | 'proxy' | 'promise' | 'typedarray' | 'arraybuffer' | 'dataview' | 'webassemblymemory' | 'wasmvalue');
            /**
             * Object class (constructor) name. Specified for `object` type values only.
             */
            className?: string;
            /**
             * Remote object value in case of primitive values or JSON values (if it was requested).
             */
            value?: any;
            /**
             * Primitive value which can not be JSON-stringified does not have `value`, but gets this
             * property.
             */
            unserializableValue?: UnserializableValue;
            /**
             * String representation of the object.
             */
            description?: string;
            /**
             * Deprecated. Use `deepSerializedValue` instead. WebDriver BiDi representation of the value.
             */
            webDriverValue?: DeepSerializedValue;
            /**
             * Deep serialized value.
             */
            deepSerializedValue?: DeepSerializedValue;
            /**
             * Unique object identifier (for non-primitive values).
             */
            objectId?: RemoteObjectId;
            /**
             * Preview containing abbreviated property values. Specified for `object` type values only.
             */
            preview?: ObjectPreview;
            customPreview?: CustomPreview;
        }

        interface CustomPreview {
            /**
             * The JSON-stringified result of formatter.header(object, config) call.
             * It contains json ML array that represents RemoteObject.
             */
            header: string;
            /**
             * If formatter returns true as a result of formatter.hasBody call then bodyGetterId will
             * contain RemoteObjectId for the function that returns result of formatter.body(object, config) call.
             * The result value is json ML array.
             */
            bodyGetterId?: RemoteObjectId;
        }

        const enum ObjectPreviewType {
            Object = 'object',
            Function = 'function',
            Undefined = 'undefined',
            String = 'string',
            Number = 'number',
            Boolean = 'boolean',
            Symbol = 'symbol',
            Bigint = 'bigint',
        }

        const enum ObjectPreviewSubtype {
            Array = 'array',
            Null = 'null',
            Node = 'node',
            Regexp = 'regexp',
            Date = 'date',
            Map = 'map',
            Set = 'set',
            Weakmap = 'weakmap',
            Weakset = 'weakset',
            Iterator = 'iterator',
            Generator = 'generator',
            Error = 'error',
            Proxy = 'proxy',
            Promise = 'promise',
            Typedarray = 'typedarray',
            Arraybuffer = 'arraybuffer',
            Dataview = 'dataview',
            Webassemblymemory = 'webassemblymemory',
            Wasmvalue = 'wasmvalue',
        }

        /**
         * Object containing abbreviated remote object value.
         */
        interface ObjectPreview {
            /**
             * Object type. (ObjectPreviewType enum)
             */
            type: ('object' | 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol' | 'bigint');
            /**
             * Object subtype hint. Specified for `object` type values only. (ObjectPreviewSubtype enum)
             */
            subtype?: ('array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error' | 'proxy' | 'promise' | 'typedarray' | 'arraybuffer' | 'dataview' | 'webassemblymemory' | 'wasmvalue');
            /**
             * String representation of the object.
             */
            description?: string;
            /**
             * True iff some of the properties or entries of the original object did not fit.
             */
            overflow: boolean;
            /**
             * List of the properties.
             */
            properties: PropertyPreview[];
            /**
             * List of the entries. Specified for `map` and `set` subtype values only.
             */
            entries?: EntryPreview[];
        }

        const enum PropertyPreviewType {
            Object = 'object',
            Function = 'function',
            Undefined = 'undefined',
            String = 'string',
            Number = 'number',
            Boolean = 'boolean',
            Symbol = 'symbol',
            Accessor = 'accessor',
            Bigint = 'bigint',
        }

        const enum PropertyPreviewSubtype {
            Array = 'array',
            Null = 'null',
            Node = 'node',
            Regexp = 'regexp',
            Date = 'date',
            Map = 'map',
            Set = 'set',
            Weakmap = 'weakmap',
            Weakset = 'weakset',
            Iterator = 'iterator',
            Generator = 'generator',
            Error = 'error',
            Proxy = 'proxy',
            Promise = 'promise',
            Typedarray = 'typedarray',
            Arraybuffer = 'arraybuffer',
            Dataview = 'dataview',
            Webassemblymemory = 'webassemblymemory',
            Wasmvalue = 'wasmvalue',
        }

        interface PropertyPreview {
            /**
             * Property name.
             */
            name: string;
            /**
             * Object type. Accessor means that the property itself is an accessor property. (PropertyPreviewType enum)
             */
            type: ('object' | 'function' | 'undefined' | 'string' | 'number' | 'boolean' | 'symbol' | 'accessor' | 'bigint');
            /**
             * User-friendly property value string.
             */
            value?: string;
            /**
             * Nested value preview.
             */
            valuePreview?: ObjectPreview;
            /**
             * Object subtype hint. Specified for `object` type values only. (PropertyPreviewSubtype enum)
             */
            subtype?: ('array' | 'null' | 'node' | 'regexp' | 'date' | 'map' | 'set' | 'weakmap' | 'weakset' | 'iterator' | 'generator' | 'error' | 'proxy' | 'promise' | 'typedarray' | 'arraybuffer' | 'dataview' | 'webassemblymemory' | 'wasmvalue');
        }

        interface EntryPreview {
            /**
             * Preview of the key. Specified for map-like collection entries.
             */
            key?: ObjectPreview;
            /**
             * Preview of the value.
             */
            value: ObjectPreview;
        }

        /**
         * Object property descriptor.
         */
        interface PropertyDescriptor {
            /**
             * Property name or symbol description.
             */
            name: string;
            /**
             * The value associated with the property.
             */
            value?: RemoteObject;
            /**
             * True if the value associated with the property may be changed (data descriptors only).
             */
            writable?: boolean;
            /**
             * A function which serves as a getter for the property, or `undefined` if there is no getter
             * (accessor descriptors only).
             */
            get?: RemoteObject;
            /**
             * A function which serves as a setter for the property, or `undefined` if there is no setter
             * (accessor descriptors only).
             */
            set?: RemoteObject;
            /**
             * True if the type of this property descriptor may be changed and if the property may be
             * deleted from the corresponding object.
             */
            configurable: boolean;
            /**
             * True if this property shows up during enumeration of the properties on the corresponding
             * object.
             */
            enumerable: boolean;
            /**
             * True if the result was thrown during the evaluation.
             */
            wasThrown?: boolean;
            /**
             * True if the property is owned for the object.
             */
            isOwn?: boolean;
            /**
             * Property symbol object, if the property is of the `symbol` type.
             */
            symbol?: RemoteObject;
        }

        /**
         * Object internal property descriptor. This property isn't normally visible in JavaScript code.
         */
        interface InternalPropertyDescriptor {
            /**
             * Conventional property name.
             */
            name: string;
            /**
             * The value associated with the property.
             */
            value?: RemoteObject;
        }

        /**
         * Object private field descriptor.
         */
        interface PrivatePropertyDescriptor {
            /**
             * Private property name.
             */
            name: string;
            /**
             * The value associated with the private property.
             */
            value?: RemoteObject;
            /**
             * A function which serves as a getter for the private property,
             * or `undefined` if there is no getter (accessor descriptors only).
             */
            get?: RemoteObject;
            /**
             * A function which serves as a setter for the private property,
             * or `undefined` if there is no setter (accessor descriptors only).
             */
            set?: RemoteObject;
        }

        /**
         * Represents function call argument. Either remote object id `objectId`, primitive `value`,
         * unserializable primitive value or neither of (for undefined) them should be specified.
         */
        interface CallArgument {
            /**
             * Primitive value or serializable javascript object.
             */
            value?: any;
            /**
             * Primitive value which can not be JSON-stringified.
             */
            unserializableValue?: UnserializableValue;
            /**
             * Remote object handle.
             */
            objectId?: RemoteObjectId;
        }

        /**
         * Id of an execution context.
         */
        type ExecutionContextId = integer;

        /**
         * Description of an isolated world.
         */
        interface ExecutionContextDescription {
            /**
             * Unique id of the execution context. It can be used to specify in which execution context
             * script evaluation should be performed.
             */
            id: ExecutionContextId;
            /**
             * Execution context origin.
             */
            origin: string;
            /**
             * Human readable name describing given context.
             */
            name: string;
            /**
             * A system-unique execution context identifier. Unlike the id, this is unique across
             * multiple processes, so can be reliably used to identify specific context while backend
             * performs a cross-process navigation.
             */
            uniqueId: string;
            /**
             * Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
             */
            auxData?: any;
        }

        /**
         * Detailed information about exception (or error) that was thrown during script compilation or
         * execution.
         */
        interface ExceptionDetails {
            /**
             * Exception id.
             */
            exceptionId: integer;
            /**
             * Exception text, which should be used together with exception object when available.
             */
            text: string;
            /**
             * Line number of the exception location (0-based).
             */
            lineNumber: integer;
            /**
             * Column number of the exception location (0-based).
             */
            columnNumber: integer;
            /**
             * Script ID of the exception location.
             */
            scriptId?: ScriptId;
            /**
             * URL of the exception location, to be used when the script was not reported.
             */
            url?: string;
            /**
             * JavaScript stack trace if available.
             */
            stackTrace?: StackTrace;
            /**
             * Exception object if available.
             */
            exception?: RemoteObject;
            /**
             * Identifier of the context where exception happened.
             */
            executionContextId?: ExecutionContextId;
            /**
             * Dictionary with entries of meta data that the client associated
             * with this exception, such as information about associated network
             * requests, etc.
             */
            exceptionMetaData?: any;
        }

        /**
         * Number of milliseconds since epoch.
         */
        type Timestamp = number;

        /**
         * Number of milliseconds.
         */
        type TimeDelta = number;

        /**
         * Stack entry for runtime errors and assertions.
         */
        interface CallFrame {
            /**
             * JavaScript function name.
             */
            functionName: string;
            /**
             * JavaScript script id.
             */
            scriptId: ScriptId;
            /**
             * JavaScript script name or url.
             */
            url: string;
            /**
             * JavaScript script line number (0-based).
             */
            lineNumber: integer;
            /**
             * JavaScript script column number (0-based).
             */
            columnNumber: integer;
        }

        /**
         * Call frames for assertions or error messages.
         */
        interface StackTrace {
            /**
             * String label of this stack trace. For async traces this may be a name of the function that
             * initiated the async call.
             */
            description?: string;
            /**
             * JavaScript function name.
             */
            callFrames: CallFrame[];
            /**
             * Asynchronous JavaScript stack trace that preceded this stack, if available.
             */
            parent?: StackTrace;
            /**
             * Asynchronous JavaScript stack trace that preceded this stack, if available.
             */
            parentId?: StackTraceId;
        }

        /**
         * Unique identifier of current debugger.
         */
        type UniqueDebuggerId = string;

        /**
         * If `debuggerId` is set stack trace comes from another debugger and can be resolved there. This
         * allows to track cross-debugger calls. See `Runtime.StackTrace` and `Debugger.paused` for usages.
         */
        interface StackTraceId {
            id: string;
            debuggerId?: UniqueDebuggerId;
        }

        interface AwaitPromiseRequest {
            /**
             * Identifier of the promise.
             */
            promiseObjectId: RemoteObjectId;
            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             */
            generatePreview?: boolean;
        }

        interface AwaitPromiseResponse {
            /**
             * Promise result. Will contain rejected value if promise was rejected.
             */
            result: RemoteObject;
            /**
             * Exception details if stack strace is available.
             */
            exceptionDetails?: ExceptionDetails;
        }

        interface CallFunctionOnRequest {
            /**
             * Declaration of the function to call.
             */
            functionDeclaration: string;
            /**
             * Identifier of the object to call function on. Either objectId or executionContextId should
             * be specified.
             */
            objectId?: RemoteObjectId;
            /**
             * Call arguments. All call arguments must belong to the same JavaScript world as the target
             * object.
             */
            arguments?: CallArgument[];
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause
             * execution. Overrides `setPauseOnException` state.
             */
            silent?: boolean;
            /**
             * Whether the result is expected to be a JSON object which should be sent by value.
             * Can be overriden by `serializationOptions`.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             */
            generatePreview?: boolean;
            /**
             * Whether execution should be treated as initiated by user in the UI.
             */
            userGesture?: boolean;
            /**
             * Whether execution should `await` for resulting value and return once awaited promise is
             * resolved.
             */
            awaitPromise?: boolean;
            /**
             * Specifies execution context which global object will be used to call function on. Either
             * executionContextId or objectId should be specified.
             */
            executionContextId?: ExecutionContextId;
            /**
             * Symbolic group name that can be used to release multiple objects. If objectGroup is not
             * specified and objectId is, objectGroup will be inherited from object.
             */
            objectGroup?: string;
            /**
             * Whether to throw an exception if side effect cannot be ruled out during evaluation.
             */
            throwOnSideEffect?: boolean;
            /**
             * An alternative way to specify the execution context to call function on.
             * Compared to contextId that may be reused across processes, this is guaranteed to be
             * system-unique, so it can be used to prevent accidental function call
             * in context different than intended (e.g. as a result of navigation across process
             * boundaries).
             * This is mutually exclusive with `executionContextId`.
             */
            uniqueContextId?: string;
            /**
             * Deprecated. Use `serializationOptions: {serialization:"deep"}` instead.
             * Whether the result should contain `webDriverValue`, serialized according to
             * https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
             * resulting `objectId` is still provided.
             */
            generateWebDriverValue?: boolean;
            /**
             * Specifies the result serialization. If provided, overrides
             * `generatePreview`, `returnByValue` and `generateWebDriverValue`.
             */
            serializationOptions?: SerializationOptions;
        }

        interface CallFunctionOnResponse {
            /**
             * Call result.
             */
            result: RemoteObject;
            /**
             * Exception details.
             */
            exceptionDetails?: ExceptionDetails;
        }

        interface CompileScriptRequest {
            /**
             * Expression to compile.
             */
            expression: string;
            /**
             * Source url to be set for the script.
             */
            sourceURL: string;
            /**
             * Specifies whether the compiled script should be persisted.
             */
            persistScript: boolean;
            /**
             * Specifies in which execution context to perform script run. If the parameter is omitted the
             * evaluation will be performed in the context of the inspected page.
             */
            executionContextId?: ExecutionContextId;
        }

        interface CompileScriptResponse {
            /**
             * Id of the script.
             */
            scriptId?: ScriptId;
            /**
             * Exception details.
             */
            exceptionDetails?: ExceptionDetails;
        }

        interface EvaluateRequest {
            /**
             * Expression to evaluate.
             */
            expression: string;
            /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
            /**
             * Determines whether Command Line API should be available during the evaluation.
             */
            includeCommandLineAPI?: boolean;
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause
             * execution. Overrides `setPauseOnException` state.
             */
            silent?: boolean;
            /**
             * Specifies in which execution context to perform evaluation. If the parameter is omitted the
             * evaluation will be performed in the context of the inspected page.
             * This is mutually exclusive with `uniqueContextId`, which offers an
             * alternative way to identify the execution context that is more reliable
             * in a multi-process environment.
             */
            contextId?: ExecutionContextId;
            /**
             * Whether the result is expected to be a JSON object that should be sent by value.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             */
            generatePreview?: boolean;
            /**
             * Whether execution should be treated as initiated by user in the UI.
             */
            userGesture?: boolean;
            /**
             * Whether execution should `await` for resulting value and return once awaited promise is
             * resolved.
             */
            awaitPromise?: boolean;
            /**
             * Whether to throw an exception if side effect cannot be ruled out during evaluation.
             * This implies `disableBreaks` below.
             */
            throwOnSideEffect?: boolean;
            /**
             * Terminate execution after timing out (number of milliseconds).
             */
            timeout?: TimeDelta;
            /**
             * Disable breakpoints during execution.
             */
            disableBreaks?: boolean;
            /**
             * Setting this flag to true enables `let` re-declaration and top-level `await`.
             * Note that `let` variables can only be re-declared if they originate from
             * `replMode` themselves.
             */
            replMode?: boolean;
            /**
             * The Content Security Policy (CSP) for the target might block 'unsafe-eval'
             * which includes eval(), Function(), setTimeout() and setInterval()
             * when called with non-callable arguments. This flag bypasses CSP for this
             * evaluation and allows unsafe-eval. Defaults to true.
             */
            allowUnsafeEvalBlockedByCSP?: boolean;
            /**
             * An alternative way to specify the execution context to evaluate in.
             * Compared to contextId that may be reused across processes, this is guaranteed to be
             * system-unique, so it can be used to prevent accidental evaluation of the expression
             * in context different than intended (e.g. as a result of navigation across process
             * boundaries).
             * This is mutually exclusive with `contextId`.
             */
            uniqueContextId?: string;
            /**
             * Deprecated. Use `serializationOptions: {serialization:"deep"}` instead.
             * Whether the result should contain `webDriverValue`, serialized
             * according to
             * https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
             * resulting `objectId` is still provided.
             */
            generateWebDriverValue?: boolean;
            /**
             * Specifies the result serialization. If provided, overrides
             * `generatePreview`, `returnByValue` and `generateWebDriverValue`.
             */
            serializationOptions?: SerializationOptions;
        }

        interface EvaluateResponse {
            /**
             * Evaluation result.
             */
            result: RemoteObject;
            /**
             * Exception details.
             */
            exceptionDetails?: ExceptionDetails;
        }

        interface GetIsolateIdResponse {
            /**
             * The isolate id.
             */
            id: string;
        }

        interface GetHeapUsageResponse {
            /**
             * Used heap size in bytes.
             */
            usedSize: number;
            /**
             * Allocated heap size in bytes.
             */
            totalSize: number;
        }

        interface GetPropertiesRequest {
            /**
             * Identifier of the object to return properties for.
             */
            objectId: RemoteObjectId;
            /**
             * If true, returns properties belonging only to the element itself, not to its prototype
             * chain.
             */
            ownProperties?: boolean;
            /**
             * If true, returns accessor properties (with getter/setter) only; internal properties are not
             * returned either.
             */
            accessorPropertiesOnly?: boolean;
            /**
             * Whether preview should be generated for the results.
             */
            generatePreview?: boolean;
            /**
             * If true, returns non-indexed properties only.
             */
            nonIndexedPropertiesOnly?: boolean;
        }

        interface GetPropertiesResponse {
            /**
             * Object properties.
             */
            result: PropertyDescriptor[];
            /**
             * Internal object properties (only of the element itself).
             */
            internalProperties?: InternalPropertyDescriptor[];
            /**
             * Object private properties.
             */
            privateProperties?: PrivatePropertyDescriptor[];
            /**
             * Exception details.
             */
            exceptionDetails?: ExceptionDetails;
        }

        interface GlobalLexicalScopeNamesRequest {
            /**
             * Specifies in which execution context to lookup global scope variables.
             */
            executionContextId?: ExecutionContextId;
        }

        interface GlobalLexicalScopeNamesResponse {
            names: string[];
        }

        interface QueryObjectsRequest {
            /**
             * Identifier of the prototype to return objects for.
             */
            prototypeObjectId: RemoteObjectId;
            /**
             * Symbolic group name that can be used to release the results.
             */
            objectGroup?: string;
        }

        interface QueryObjectsResponse {
            /**
             * Array with objects.
             */
            objects: RemoteObject;
        }

        interface ReleaseObjectRequest {
            /**
             * Identifier of the object to release.
             */
            objectId: RemoteObjectId;
        }

        interface ReleaseObjectGroupRequest {
            /**
             * Symbolic object group name.
             */
            objectGroup: string;
        }

        interface RunScriptRequest {
            /**
             * Id of the script to run.
             */
            scriptId: ScriptId;
            /**
             * Specifies in which execution context to perform script run. If the parameter is omitted the
             * evaluation will be performed in the context of the inspected page.
             */
            executionContextId?: ExecutionContextId;
            /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
            /**
             * In silent mode exceptions thrown during evaluation are not reported and do not pause
             * execution. Overrides `setPauseOnException` state.
             */
            silent?: boolean;
            /**
             * Determines whether Command Line API should be available during the evaluation.
             */
            includeCommandLineAPI?: boolean;
            /**
             * Whether the result is expected to be a JSON object which should be sent by value.
             */
            returnByValue?: boolean;
            /**
             * Whether preview should be generated for the result.
             */
            generatePreview?: boolean;
            /**
             * Whether execution should `await` for resulting value and return once awaited promise is
             * resolved.
             */
            awaitPromise?: boolean;
        }

        interface RunScriptResponse {
            /**
             * Run result.
             */
            result: RemoteObject;
            /**
             * Exception details.
             */
            exceptionDetails?: ExceptionDetails;
        }

        interface SetAsyncCallStackDepthRequest {
            /**
             * Maximum depth of async call stacks. Setting to `0` will effectively disable collecting async
             * call stacks (default).
             */
            maxDepth: integer;
        }

        interface SetCustomObjectFormatterEnabledRequest {
            enabled: boolean;
        }

        interface SetMaxCallStackSizeToCaptureRequest {
            size: integer;
        }

        interface AddBindingRequest {
            name: string;
            /**
             * If specified, the binding would only be exposed to the specified
             * execution context. If omitted and `executionContextName` is not set,
             * the binding is exposed to all execution contexts of the target.
             * This parameter is mutually exclusive with `executionContextName`.
             * Deprecated in favor of `executionContextName` due to an unclear use case
             * and bugs in implementation (crbug.com/1169639). `executionContextId` will be
             * removed in the future.
             */
            executionContextId?: ExecutionContextId;
            /**
             * If specified, the binding is exposed to the executionContext with
             * matching name, even for contexts created after the binding is added.
             * See also `ExecutionContext.name` and `worldName` parameter to
             * `Page.addScriptToEvaluateOnNewDocument`.
             * This parameter is mutually exclusive with `executionContextId`.
             */
            executionContextName?: string;
        }

        interface RemoveBindingRequest {
            name: string;
        }

        interface GetExceptionDetailsRequest {
            /**
             * The error object for which to resolve the exception details.
             */
            errorObjectId: RemoteObjectId;
        }

        interface GetExceptionDetailsResponse {
            exceptionDetails?: ExceptionDetails;
        }

        /**
         * Notification is issued every time when binding is called.
         */
        interface BindingCalledEvent {
            name: string;
            payload: string;
            /**
             * Identifier of the context where the call was made.
             */
            executionContextId: ExecutionContextId;
        }

        const enum ConsoleAPICalledEventType {
            Log = 'log',
            Debug = 'debug',
            Info = 'info',
            Error = 'error',
            Warning = 'warning',
            Dir = 'dir',
            DirXML = 'dirxml',
            Table = 'table',
            Trace = 'trace',
            Clear = 'clear',
            StartGroup = 'startGroup',
            StartGroupCollapsed = 'startGroupCollapsed',
            EndGroup = 'endGroup',
            Assert = 'assert',
            Profile = 'profile',
            ProfileEnd = 'profileEnd',
            Count = 'count',
            TimeEnd = 'timeEnd',
        }

        /**
         * Issued when console API was called.
         */
        interface ConsoleAPICalledEvent {
            /**
             * Type of the call. (ConsoleAPICalledEventType enum)
             */
            type: ('log' | 'debug' | 'info' | 'error' | 'warning' | 'dir' | 'dirxml' | 'table' | 'trace' | 'clear' | 'startGroup' | 'startGroupCollapsed' | 'endGroup' | 'assert' | 'profile' | 'profileEnd' | 'count' | 'timeEnd');
            /**
             * Call arguments.
             */
            args: RemoteObject[];
            /**
             * Identifier of the context where the call was made.
             */
            executionContextId: ExecutionContextId;
            /**
             * Call timestamp.
             */
            timestamp: Timestamp;
            /**
             * Stack trace captured when the call was made. The async stack chain is automatically reported for
             * the following call types: `assert`, `error`, `trace`, `warning`. For other types the async call
             * chain can be retrieved using `Debugger.getStackTrace` and `stackTrace.parentId` field.
             */
            stackTrace?: StackTrace;
            /**
             * Console context descriptor for calls on non-default console context (not console.*):
             * 'anonymous#unique-logger-id' for call on unnamed context, 'name#unique-logger-id' for call
             * on named context.
             */
            context?: string;
        }

        /**
         * Issued when unhandled exception was revoked.
         */
        interface ExceptionRevokedEvent {
            /**
             * Reason describing why exception was revoked.
             */
            reason: string;
            /**
             * The id of revoked exception, as reported in `exceptionThrown`.
             */
            exceptionId: integer;
        }

        /**
         * Issued when exception was thrown and unhandled.
         */
        interface ExceptionThrownEvent {
            /**
             * Timestamp of the exception.
             */
            timestamp: Timestamp;
            exceptionDetails: ExceptionDetails;
        }

        /**
         * Issued when new execution context is created.
         */
        interface ExecutionContextCreatedEvent {
            /**
             * A newly created execution context.
             */
            context: ExecutionContextDescription;
        }

        /**
         * Issued when execution context is destroyed.
         */
        interface ExecutionContextDestroyedEvent {
            /**
             * Id of the destroyed context
             */
            executionContextId: ExecutionContextId;
            /**
             * Unique Id of the destroyed context
             */
            executionContextUniqueId: string;
        }

        /**
         * Issued when object should be inspected (for example, as a result of inspect() command line API
         * call).
         */
        interface InspectRequestedEvent {
            object: RemoteObject;
            hints: any;
            /**
             * Identifier of the context where the call was made.
             */
            executionContextId?: ExecutionContextId;
        }
    }

    /**
     * This domain is deprecated.
     */
    namespace Schema {

        /**
         * Description of the protocol domain.
         */
        interface Domain {
            /**
             * Domain name.
             */
            name: string;
            /**
             * Domain version.
             */
            version: string;
        }

        interface GetDomainsResponse {
            /**
             * List of supported domains.
             */
            domains: Domain[];
        }
    }

    namespace Accessibility {

        /**
         * Unique accessibility node identifier.
         */
        type AXNodeId = string;

        /**
         * Enum of possible property types.
         */
        type AXValueType = ('boolean' | 'tristate' | 'booleanOrUndefined' | 'idref' | 'idrefList' | 'integer' | 'node' | 'nodeList' | 'number' | 'string' | 'computedString' | 'token' | 'tokenList' | 'domRelation' | 'role' | 'internalRole' | 'valueUndefined');

        /**
         * Enum of possible property sources.
         */
        type AXValueSourceType = ('attribute' | 'implicit' | 'style' | 'contents' | 'placeholder' | 'relatedElement');

        /**
         * Enum of possible native property sources (as a subtype of a particular AXValueSourceType).
         */
        type AXValueNativeSourceType = ('description' | 'figcaption' | 'label' | 'labelfor' | 'labelwrapped' | 'legend' | 'rubyannotation' | 'tablecaption' | 'title' | 'other');

        /**
         * A single source for a computed AX property.
         */
        interface AXValueSource {
            /**
             * What type of source this is.
             */
            type: AXValueSourceType;
            /**
             * The value of this property source.
             */
            value?: AXValue;
            /**
             * The name of the relevant attribute, if any.
             */
            attribute?: string;
            /**
             * The value of the relevant attribute, if any.
             */
            attributeValue?: AXValue;
            /**
             * Whether this source is superseded by a higher priority source.
             */
            superseded?: boolean;
            /**
             * The native markup source for this value, e.g. a `<label>` element.
             */
            nativeSource?: AXValueNativeSourceType;
            /**
             * The value, such as a node or node list, of the native source.
             */
            nativeSourceValue?: AXValue;
            /**
             * Whether the value for this property is invalid.
             */
            invalid?: boolean;
            /**
             * Reason for the value being invalid, if it is.
             */
            invalidReason?: string;
        }

        interface AXRelatedNode {
            /**
             * The BackendNodeId of the related DOM node.
             */
            backendDOMNodeId: DOM.BackendNodeId;
            /**
             * The IDRef value provided, if any.
             */
            idref?: string;
            /**
             * The text alternative of this node in the current context.
             */
            text?: string;
        }

        interface AXProperty {
            /**
             * The name of this property.
             */
            name: AXPropertyName;
            /**
             * The value of this property.
             */
            value: AXValue;
        }

        /**
         * A single computed AX property.
         */
        interface AXValue {
            /**
             * The type of this value.
             */
            type: AXValueType;
            /**
             * The computed value of this property.
             */
            value?: any;
            /**
             * One or more related nodes, if applicable.
             */
            relatedNodes?: AXRelatedNode[];
            /**
             * The sources which contributed to the computation of this property.
             */
            sources?: AXValueSource[];
        }

        /**
         * Values of AXProperty name:
         * - from 'busy' to 'roledescription': states which apply to every AX node
         * - from 'live' to 'root': attributes which apply to nodes in live regions
         * - from 'autocomplete' to 'valuetext': attributes which apply to widgets
         * - from 'checked' to 'selected': states which apply to widgets
         * - from 'activedescendant' to 'owns' - relationships between elements other than parent/child/sibling.
         */
        type AXPropertyName = ('busy' | 'disabled' | 'editable' | 'focusable' | 'focused' | 'hidden' | 'hiddenRoot' | 'invalid' | 'keyshortcuts' | 'settable' | 'roledescription' | 'live' | 'atomic' | 'relevant' | 'root' | 'autocomplete' | 'hasPopup' | 'level' | 'multiselectable' | 'orientation' | 'multiline' | 'readonly' | 'required' | 'valuemin' | 'valuemax' | 'valuetext' | 'checked' | 'expanded' | 'modal' | 'pressed' | 'selected' | 'activedescendant' | 'controls' | 'describedby' | 'details' | 'errormessage' | 'flowto' | 'labelledby' | 'owns');

        /**
         * A node in the accessibility tree.
         */
        interface AXNode {
            /**
             * Unique identifier for this node.
             */
            nodeId: AXNodeId;
            /**
             * Whether this node is ignored for accessibility
             */
            ignored: boolean;
            /**
             * Collection of reasons why this node is hidden.
             */
            ignoredReasons?: AXProperty[];
            /**
             * This `Node`'s role, whether explicit or implicit.
             */
            role?: AXValue;
            /**
             * This `Node`'s Chrome raw role.
             */
            chromeRole?: AXValue;
            /**
             * The accessible name for this `Node`.
             */
            name?: AXValue;
            /**
             * The accessible description for this `Node`.
             */
            description?: AXValue;
            /**
             * The value for this `Node`.
             */
            value?: AXValue;
            /**
             * All other properties
             */
            properties?: AXProperty[];
            /**
             * ID for this node's parent.
             */
            parentId?: AXNodeId;
            /**
             * IDs for each of this node's child nodes.
             */
            childIds?: AXNodeId[];
            /**
             * The backend ID for the associated DOM node, if any.
             */
            backendDOMNodeId?: DOM.BackendNodeId;
            /**
             * The frame ID for the frame associated with this nodes document.
             */
            frameId?: Page.FrameId;
        }

        interface GetPartialAXTreeRequest {
            /**
             * Identifier of the node to get the partial accessibility tree for.
             */
            nodeId?: DOM.NodeId;
            /**
             * Identifier of the backend node to get the partial accessibility tree for.
             */
            backendNodeId?: DOM.BackendNodeId;
            /**
             * JavaScript object id of the node wrapper to get the partial accessibility tree for.
             */
            objectId?: Runtime.RemoteObjectId;
            /**
             * Whether to fetch this node's ancestors, siblings and children. Defaults to true.
             */
            fetchRelatives?: boolean;
        }

        interface GetPartialAXTreeResponse {
            /**
             * The `Accessibility.AXNode` for this DOM node, if it exists, plus its ancestors, siblings and
             * children, if requested.
             */
            nodes: AXNode[];
        }

        interface GetFullAXTreeRequest {
            /**
             * The maximum depth at which descendants of the root node should be retrieved.
             * If omitted, the full tree is returned.
             */
            depth?: integer;
            /**
             * The frame for whose document the AX tree should be retrieved.
             * If omited, the root frame is used.
             */
            frameId?: Page.FrameId;
        }

        interface GetFullAXTreeResponse {
            nodes: AXNode[];
        }

        interface GetRootAXNodeRequest {
            /**
             * The frame in whose document the node resides.
             * If omitted, the root frame is used.
             */
            frameId?: Page.FrameId;
        }

        interface GetRootAXNodeResponse {
            node: AXNode;
        }

        interface GetAXNodeAndAncestorsRequest {
            /**
             * Identifier of the node to get.
             */
            nodeId?: DOM.NodeId;
            /**
             * Identifier of the backend node to get.
             */
            backendNodeId?: DOM.BackendNodeId;
            /**
             * JavaScript object id of the node wrapper to get.
             */
            objectId?: Runtime.RemoteObjectId;
        }

        interface GetAXNodeAndAncestorsResponse {
            nodes: AXNode[];
        }

        interface GetChildAXNodesRequest {
            id: AXNodeId;
            /**
             * The frame in whose document the node resides.
             * If omitted, the root frame is used.
             */
            frameId?: Page.FrameId;
        }

        interface GetChildAXNodesResponse {
            nodes: AXNode[];
        }

        interface QueryAXTreeRequest {
            /**
             * Identifier of the node for the root to query.
             */
            nodeId?: DOM.NodeId;
            /**
             * Identifier of the backend node for the root to query.
             */
            backendNodeId?: DOM.BackendNodeId;
            /**
             * JavaScript object id of the node wrapper for the root to query.
             */
            objectId?: Runtime.RemoteObjectId;
            /**
             * Find nodes with this computed name.
             */
            accessibleName?: string;
            /**
             * Find nodes with this computed role.
             */
            role?: string;
        }

        interface QueryAXTreeResponse {
            /**
             * A list of `Accessibility.AXNode` matching the specified attributes,
             * including nodes that are ignored for accessibility.
             */
            nodes: AXNode[];
        }

        /**
         * The loadComplete event mirrors the load complete event sent by the browser to assistive
         * technology when the web page has finished loading.
         */
        interface LoadCompleteEvent {
            /**
             * New document root node.
             */
            root: AXNode;
        }

        /**
         * The nodesUpdated event is sent every time a previously requested node has changed the in tree.
         */
        interface NodesUpdatedEvent {
            /**
             * Updated node data.
             */
            nodes: AXNode[];
        }
    }

    namespace Animation {

        const enum AnimationType {
            CSSTransition = 'CSSTransition',
            CSSAnimation = 'CSSAnimation',
            WebAnimation = 'WebAnimation',
        }

        /**
         * Animation instance.
         */
        interface Animation {
            /**
             * `Animation`'s id.
             */
            id: string;
            /**
             * `Animation`'s name.
             */
            name: string;
            /**
             * `Animation`'s internal paused state.
             */
            pausedState: boolean;
            /**
             * `Animation`'s play state.
             */
            playState: string;
            /**
             * `Animation`'s playback rate.
             */
            playbackRate: number;
            /**
             * `Animation`'s start time.
             */
            startTime: number;
            /**
             * `Animation`'s current time.
             */
            currentTime: number;
            /**
             * Animation type of `Animation`. (AnimationType enum)
             */
            type: ('CSSTransition' | 'CSSAnimation' | 'WebAnimation');
            /**
             * `Animation`'s source animation node.
             */
            source?: AnimationEffect;
            /**
             * A unique ID for `Animation` representing the sources that triggered this CSS
             * animation/transition.
             */
            cssId?: string;
        }

        /**
         * AnimationEffect instance
         */
        interface AnimationEffect {
            /**
             * `AnimationEffect`'s delay.
             */
            delay: number;
            /**
             * `AnimationEffect`'s end delay.
             */
            endDelay: number;
            /**
             * `AnimationEffect`'s iteration start.
             */
            iterationStart: number;
            /**
             * `AnimationEffect`'s iterations.
             */
            iterations: number;
            /**
             * `AnimationEffect`'s iteration duration.
             */
            duration: number;
            /**
             * `AnimationEffect`'s playback direction.
             */
            direction: string;
            /**
             * `AnimationEffect`'s fill mode.
             */
            fill: string;
            /**
             * `AnimationEffect`'s target node.
             */
            backendNodeId?: DOM.BackendNodeId;
            /**
             * `AnimationEffect`'s keyframes.
             */
            keyframesRule?: KeyframesRule;
            /**
             * `AnimationEffect`'s timing function.
             */
            easing: string;
        }

        /**
         * Keyframes Rule
         */
        interface KeyframesRule {
            /**
             * CSS keyframed animation's name.
             */
            name?: string;
            /**
             * List of animation keyframes.
             */
            keyframes: KeyframeStyle[];
        }

        /**
         * Keyframe Style
         */
        interface KeyframeStyle {
            /**
             * Keyframe's time offset.
             */
            offset: string;
            /**
             * `AnimationEffect`'s timing function.
             */
            easing: string;
        }

        interface GetCurrentTimeRequest {
            /**
             * Id of animation.
             */
            id: string;
        }

        interface GetCurrentTimeResponse {
            /**
             * Current time of the page.
             */
            currentTime: number;
        }

        interface GetPlaybackRateResponse {
            /**
             * Playback rate for animations on page.
             */
            playbackRate: number;
        }

        interface ReleaseAnimationsRequest {
            /**
             * List of animation ids to seek.
             */
            animations: string[];
        }

        interface ResolveAnimationRequest {
            /**
             * Animation id.
             */
            animationId: string;
        }

        interface ResolveAnimationResponse {
            /**
             * Corresponding remote object.
             */
            remoteObject: Runtime.RemoteObject;
        }

        interface SeekAnimationsRequest {
            /**
             * List of animation ids to seek.
             */
            animations: string[];
            /**
             * Set the current time of each animation.
             */
            currentTime: number;
        }

        interface SetPausedRequest {
            /**
             * Animations to set the pause state of.
             */
            animations: string[];
            /**
             * Paused state to set to.
             */
            paused: boolean;
        }

        interface SetPlaybackRateRequest {
            /**
             * Playback rate for animations on page
             */
            playbackRate: number;
        }

        interface SetTimingRequest {
            /**
             * Animation id.
             */
            animationId: string;
            /**
             * Duration of the animation.
             */
            duration: number;
            /**
             * Delay of the animation.
             */
            delay: number;
        }

        /**
         * Event for when an animation has been cancelled.
         */
        interface AnimationCanceledEvent {
            /**
             * Id of the animation that was cancelled.
             */
            id: string;
        }

        /**
         * Event for each animation that has been created.
         */
        interface AnimationCreatedEvent {
            /**
             * Id of the animation that was created.
             */
            id: string;
        }

        /**
         * Event for animation that has been started.
         */
        interface AnimationStartedEvent {
            /**
             * Animation that was started.
             */
            animation: Animation;
        }
    }

    /**
     * Audits domain allows investigation of page violations and possible improvements.
     */
    namespace Audits {

        /**
         * Information about a cookie that is affected by an inspector issue.
         */
        interface AffectedCookie {
            /**
             * The following three properties uniquely identify a cookie
             */
            name: string;
            path: string;
            domain: string;
        }

        /**
         * Information about a request that is affected by an inspector issue.
         */
        interface AffectedRequest {
            /**
             * The unique request id.
             */
            requestId: Network.RequestId;
            url?: string;
        }

        /**
         * Information about the frame affected by an inspector issue.
         */
        interface AffectedFrame {
            frameId: Page.FrameId;
        }

        type CookieExclusionReason = ('ExcludeSameSiteUnspecifiedTreatedAsLax' | 'ExcludeSameSiteNoneInsecure' | 'ExcludeSameSiteLax' | 'ExcludeSameSiteStrict' | 'ExcludeInvalidSameParty' | 'ExcludeSamePartyCrossPartyContext' | 'ExcludeDomainNonASCII' | 'ExcludeThirdPartyCookieBlockedInFirstPartySet' | 'ExcludeThirdPartyPhaseout');

        type CookieWarningReason = ('WarnSameSiteUnspecifiedCrossSiteContext' | 'WarnSameSiteNoneInsecure' | 'WarnSameSiteUnspecifiedLaxAllowUnsafe' | 'WarnSameSiteStrictLaxDowngradeStrict' | 'WarnSameSiteStrictCrossDowngradeStrict' | 'WarnSameSiteStrictCrossDowngradeLax' | 'WarnSameSiteLaxCrossDowngradeStrict' | 'WarnSameSiteLaxCrossDowngradeLax' | 'WarnAttributeValueExceedsMaxSize' | 'WarnDomainNonASCII' | 'WarnThirdPartyPhaseout');

        type CookieOperation = ('SetCookie' | 'ReadCookie');

        /**
         * This information is currently necessary, as the front-end has a difficult
         * time finding a specific cookie. With this, we can convey specific error
         * information without the cookie.
         */
        interface CookieIssueDetails {
            /**
             * If AffectedCookie is not set then rawCookieLine contains the raw
             * Set-Cookie header string. This hints at a problem where the
             * cookie line is syntactically or semantically malformed in a way
             * that no valid cookie could be created.
             */
            cookie?: AffectedCookie;
            rawCookieLine?: string;
            cookieWarningReasons: CookieWarningReason[];
            cookieExclusionReasons: CookieExclusionReason[];
            /**
             * Optionally identifies the site-for-cookies and the cookie url, which
             * may be used by the front-end as additional context.
             */
            operation: CookieOperation;
            siteForCookies?: string;
            cookieUrl?: string;
            request?: AffectedRequest;
        }

        type MixedContentResolutionStatus = ('MixedContentBlocked' | 'MixedContentAutomaticallyUpgraded' | 'MixedContentWarning');

        type MixedContentResourceType = ('AttributionSrc' | 'Audio' | 'Beacon' | 'CSPReport' | 'Download' | 'EventSource' | 'Favicon' | 'Font' | 'Form' | 'Frame' | 'Image' | 'Import' | 'Manifest' | 'Ping' | 'PluginData' | 'PluginResource' | 'Prefetch' | 'Resource' | 'Script' | 'ServiceWorker' | 'SharedWorker' | 'Stylesheet' | 'Track' | 'Video' | 'Worker' | 'XMLHttpRequest' | 'XSLT');

        interface MixedContentIssueDetails {
            /**
             * The type of resource causing the mixed content issue (css, js, iframe,
             * form,...). Marked as optional because it is mapped to from
             * blink::mojom::RequestContextType, which will be replaced
             * by network::mojom::RequestDestination
             */
            resourceType?: MixedContentResourceType;
            /**
             * The way the mixed content issue is being resolved.
             */
            resolutionStatus: MixedContentResolutionStatus;
            /**
             * The unsafe http url causing the mixed content issue.
             */
            insecureURL: string;
            /**
             * The url responsible for the call to an unsafe url.
             */
            mainResourceURL: string;
            /**
             * The mixed content request.
             * Does not always exist (e.g. for unsafe form submission urls).
             */
            request?: AffectedRequest;
            /**
             * Optional because not every mixed content issue is necessarily linked to a frame.
             */
            frame?: AffectedFrame;
        }

        /**
         * Enum indicating the reason a response has been blocked. These reasons are
         * refinements of the net error BLOCKED_BY_RESPONSE.
         */
        type BlockedByResponseReason = ('CoepFrameResourceNeedsCoepHeader' | 'CoopSandboxedIFrameCannotNavigateToCoopPage' | 'CorpNotSameOrigin' | 'CorpNotSameOriginAfterDefaultedToSameOriginByCoep' | 'CorpNotSameSite');

        /**
         * Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
         * code. Currently only used for COEP/COOP, but may be extended to include
         * some CSP errors in the future.
         */
        interface BlockedByResponseIssueDetails {
            request: AffectedRequest;
            parentFrame?: AffectedFrame;
            blockedFrame?: AffectedFrame;
            reason: BlockedByResponseReason;
        }

        type HeavyAdResolutionStatus = ('HeavyAdBlocked' | 'HeavyAdWarning');

        type HeavyAdReason = ('NetworkTotalLimit' | 'CpuTotalLimit' | 'CpuPeakLimit');

        interface HeavyAdIssueDetails {
            /**
             * The resolution status, either blocking the content or warning.
             */
            resolution: HeavyAdResolutionStatus;
            /**
             * The reason the ad was blocked, total network or cpu or peak cpu.
             */
            reason: HeavyAdReason;
            /**
             * The frame that was blocked.
             */
            frame: AffectedFrame;
        }

        type ContentSecurityPolicyViolationType = ('kInlineViolation' | 'kEvalViolation' | 'kURLViolation' | 'kTrustedTypesSinkViolation' | 'kTrustedTypesPolicyViolation' | 'kWasmEvalViolation');

        interface SourceCodeLocation {
            scriptId?: Runtime.ScriptId;
            url: string;
            lineNumber: integer;
            columnNumber: integer;
        }

        interface ContentSecurityPolicyIssueDetails {
            /**
             * The url not included in allowed sources.
             */
            blockedURL?: string;
            /**
             * Specific directive that is violated, causing the CSP issue.
             */
            violatedDirective: string;
            isReportOnly: boolean;
            contentSecurityPolicyViolationType: ContentSecurityPolicyViolationType;
            frameAncestor?: AffectedFrame;
            sourceCodeLocation?: SourceCodeLocation;
            violatingNodeId?: DOM.BackendNodeId;
        }

        type SharedArrayBufferIssueType = ('TransferIssue' | 'CreationIssue');

        /**
         * Details for a issue arising from an SAB being instantiated in, or
         * transferred to a context that is not cross-origin isolated.
         */
        interface SharedArrayBufferIssueDetails {
            sourceCodeLocation: SourceCodeLocation;
            isWarning: boolean;
            type: SharedArrayBufferIssueType;
        }

        interface LowTextContrastIssueDetails {
            violatingNodeId: DOM.BackendNodeId;
            violatingNodeSelector: string;
            contrastRatio: number;
            thresholdAA: number;
            thresholdAAA: number;
            fontSize: string;
            fontWeight: string;
        }

        /**
         * Details for a CORS related issue, e.g. a warning or error related to
         * CORS RFC1918 enforcement.
         */
        interface CorsIssueDetails {
            corsErrorStatus: Network.CorsErrorStatus;
            isWarning: boolean;
            request: AffectedRequest;
            location?: SourceCodeLocation;
            initiatorOrigin?: string;
            resourceIPAddressSpace?: Network.IPAddressSpace;
            clientSecurityState?: Network.ClientSecurityState;
        }

        type AttributionReportingIssueType = ('PermissionPolicyDisabled' | 'UntrustworthyReportingOrigin' | 'InsecureContext' | 'InvalidHeader' | 'InvalidRegisterTriggerHeader' | 'SourceAndTriggerHeaders' | 'SourceIgnored' | 'TriggerIgnored' | 'OsSourceIgnored' | 'OsTriggerIgnored' | 'InvalidRegisterOsSourceHeader' | 'InvalidRegisterOsTriggerHeader' | 'WebAndOsHeaders' | 'NoWebOrOsSupport' | 'NavigationRegistrationWithoutTransientUserActivation');

        /**
         * Details for issues around "Attribution Reporting API" usage.
         * Explainer: https://github.com/WICG/attribution-reporting-api
         */
        interface AttributionReportingIssueDetails {
            violationType: AttributionReportingIssueType;
            request?: AffectedRequest;
            violatingNodeId?: DOM.BackendNodeId;
            invalidParameter?: string;
        }

        /**
         * Details for issues about documents in Quirks Mode
         * or Limited Quirks Mode that affects page layouting.
         */
        interface QuirksModeIssueDetails {
            /**
             * If false, it means the document's mode is "quirks"
             * instead of "limited-quirks".
             */
            isLimitedQuirksMode: boolean;
            documentNodeId: DOM.BackendNodeId;
            url: string;
            frameId: Page.FrameId;
            loaderId: Network.LoaderId;
        }

        interface NavigatorUserAgentIssueDetails {
            url: string;
            location?: SourceCodeLocation;
        }

        type GenericIssueErrorType = ('CrossOriginPortalPostMessageError' | 'FormLabelForNameError' | 'FormDuplicateIdForInputError' | 'FormInputWithNoLabelError' | 'FormAutocompleteAttributeEmptyError' | 'FormEmptyIdAndNameAttributesForInputError' | 'FormAriaLabelledByToNonExistingId' | 'FormInputAssignedAutocompleteValueToIdOrNameAttributeError' | 'FormLabelHasNeitherForNorNestedInput' | 'FormLabelForMatchesNonExistingIdError' | 'FormInputHasWrongButWellIntendedAutocompleteValueError' | 'ResponseWasBlockedByORB');

        /**
         * Depending on the concrete errorType, different properties are set.
         */
        interface GenericIssueDetails {
            /**
             * Issues with the same errorType are aggregated in the frontend.
             */
            errorType: GenericIssueErrorType;
            frameId?: Page.FrameId;
            violatingNodeId?: DOM.BackendNodeId;
            violatingNodeAttribute?: string;
            request?: AffectedRequest;
        }

        /**
         * This issue tracks information needed to print a deprecation message.
         * https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md
         */
        interface DeprecationIssueDetails {
            affectedFrame?: AffectedFrame;
            sourceCodeLocation: SourceCodeLocation;
            /**
             * One of the deprecation names from third_party/blink/renderer/core/frame/deprecation/deprecation.json5
             */
            type: string;
        }

        /**
         * This issue warns about sites in the redirect chain of a finished navigation
         * that may be flagged as trackers and have their state cleared if they don't
         * receive a user interaction. Note that in this context 'site' means eTLD+1.
         * For example, if the URL `https://example.test:80/bounce` was in the
         * redirect chain, the site reported would be `example.test`.
         */
        interface BounceTrackingIssueDetails {
            trackingSites: string[];
        }

        type ClientHintIssueReason = ('MetaTagAllowListInvalidOrigin' | 'MetaTagModifiedHTML');

        interface FederatedAuthRequestIssueDetails {
            federatedAuthRequestIssueReason: FederatedAuthRequestIssueReason;
        }

        /**
         * Represents the failure reason when a federated authentication reason fails.
         * Should be updated alongside RequestIdTokenStatus in
         * third_party/blink/public/mojom/devtools/inspector_issue.mojom to include
         * all cases except for success.
         */
        type FederatedAuthRequestIssueReason = ('ShouldEmbargo' | 'TooManyRequests' | 'WellKnownHttpNotFound' | 'WellKnownNoResponse' | 'WellKnownInvalidResponse' | 'WellKnownListEmpty' | 'WellKnownInvalidContentType' | 'ConfigNotInWellKnown' | 'WellKnownTooBig' | 'ConfigHttpNotFound' | 'ConfigNoResponse' | 'ConfigInvalidResponse' | 'ConfigInvalidContentType' | 'ClientMetadataHttpNotFound' | 'ClientMetadataNoResponse' | 'ClientMetadataInvalidResponse' | 'ClientMetadataInvalidContentType' | 'DisabledInSettings' | 'ErrorFetchingSignin' | 'InvalidSigninResponse' | 'AccountsHttpNotFound' | 'AccountsNoResponse' | 'AccountsInvalidResponse' | 'AccountsListEmpty' | 'AccountsInvalidContentType' | 'IdTokenHttpNotFound' | 'IdTokenNoResponse' | 'IdTokenInvalidResponse' | 'IdTokenInvalidRequest' | 'IdTokenInvalidContentType' | 'ErrorIdToken' | 'Canceled' | 'RpPageNotVisible' | 'SilentMediationFailure' | 'ThirdPartyCookiesBlocked');

        interface FederatedAuthUserInfoRequestIssueDetails {
            federatedAuthUserInfoRequestIssueReason: FederatedAuthUserInfoRequestIssueReason;
        }

        /**
         * Represents the failure reason when a getUserInfo() call fails.
         * Should be updated alongside FederatedAuthUserInfoRequestResult in
         * third_party/blink/public/mojom/devtools/inspector_issue.mojom.
         */
        type FederatedAuthUserInfoRequestIssueReason = ('NotSameOrigin' | 'NotIframe' | 'NotPotentiallyTrustworthy' | 'NoApiPermission' | 'NotSignedInWithIdp' | 'NoAccountSharingPermission' | 'InvalidConfigOrWellKnown' | 'InvalidAccountsResponse' | 'NoReturningUserFromFetchedAccounts');

        /**
         * This issue tracks client hints related issues. It's used to deprecate old
         * features, encourage the use of new ones, and provide general guidance.
         */
        interface ClientHintIssueDetails {
            sourceCodeLocation: SourceCodeLocation;
            clientHintIssueReason: ClientHintIssueReason;
        }

        interface FailedRequestInfo {
            /**
             * The URL that failed to load.
             */
            url: string;
            /**
             * The failure message for the failed request.
             */
            failureMessage: string;
            requestId?: Network.RequestId;
        }

        type StyleSheetLoadingIssueReason = ('LateImportRule' | 'RequestFailed');

        /**
         * This issue warns when a referenced stylesheet couldn't be loaded.
         */
        interface StylesheetLoadingIssueDetails {
            /**
             * Source code position that referenced the failing stylesheet.
             */
            sourceCodeLocation: SourceCodeLocation;
            /**
             * Reason why the stylesheet couldn't be loaded.
             */
            styleSheetLoadingIssueReason: StyleSheetLoadingIssueReason;
            /**
             * Contains additional info when the failure was due to a request.
             */
            failedRequestInfo?: FailedRequestInfo;
        }

        /**
         * A unique identifier for the type of issue. Each type may use one of the
         * optional fields in InspectorIssueDetails to convey more specific
         * information about the kind of issue.
         */
        type InspectorIssueCode = ('CookieIssue' | 'MixedContentIssue' | 'BlockedByResponseIssue' | 'HeavyAdIssue' | 'ContentSecurityPolicyIssue' | 'SharedArrayBufferIssue' | 'LowTextContrastIssue' | 'CorsIssue' | 'AttributionReportingIssue' | 'QuirksModeIssue' | 'NavigatorUserAgentIssue' | 'GenericIssue' | 'DeprecationIssue' | 'ClientHintIssue' | 'FederatedAuthRequestIssue' | 'BounceTrackingIssue' | 'StylesheetLoadingIssue' | 'FederatedAuthUserInfoRequestIssue');

        /**
         * This struct holds a list of optional fields with additional information
         * specific to the kind of issue. When adding a new issue code, please also
         * add a new optional field to this type.
         */
        interface InspectorIssueDetails {
            cookieIssueDetails?: CookieIssueDetails;
            mixedContentIssueDetails?: MixedContentIssueDetails;
            blockedByResponseIssueDetails?: BlockedByResponseIssueDetails;
            heavyAdIssueDetails?: HeavyAdIssueDetails;
            contentSecurityPolicyIssueDetails?: ContentSecurityPolicyIssueDetails;
            sharedArrayBufferIssueDetails?: SharedArrayBufferIssueDetails;
            lowTextContrastIssueDetails?: LowTextContrastIssueDetails;
            corsIssueDetails?: CorsIssueDetails;
            attributionReportingIssueDetails?: AttributionReportingIssueDetails;
            quirksModeIssueDetails?: QuirksModeIssueDetails;
            navigatorUserAgentIssueDetails?: NavigatorUserAgentIssueDetails;
            genericIssueDetails?: GenericIssueDetails;
            deprecationIssueDetails?: DeprecationIssueDetails;
            clientHintIssueDetails?: ClientHintIssueDetails;
            federatedAuthRequestIssueDetails?: FederatedAuthRequestIssueDetails;
            bounceTrackingIssueDetails?: BounceTrackingIssueDetails;
            stylesheetLoadingIssueDetails?: StylesheetLoadingIssueDetails;
            federatedAuthUserInfoRequestIssueDetails?: FederatedAuthUserInfoRequestIssueDetails;
        }

        /**
         * A unique id for a DevTools inspector issue. Allows other entities (e.g.
         * exceptions, CDP message, console messages, etc.) to reference an issue.
         */
        type IssueId = string;

        /**
         * An inspector issue reported from the back-end.
         */
        interface InspectorIssue {
            code: InspectorIssueCode;
            details: InspectorIssueDetails;
            /**
             * A unique id for this issue. May be omitted if no other entity (e.g.
             * exception, CDP message, etc.) is referencing this issue.
             */
            issueId?: IssueId;
        }

        const enum GetEncodedResponseRequestEncoding {
            Webp = 'webp',
            Jpeg = 'jpeg',
            Png = 'png',
        }

        interface GetEncodedResponseRequest {
            /**
             * Identifier of the network request to get content for.
             */
            requestId: Network.RequestId;
            /**
             * The encoding to use. (GetEncodedResponseRequestEncoding enum)
             */
            encoding: ('webp' | 'jpeg' | 'png');
            /**
             * The quality of the encoding (0-1). (defaults to 1)
             */
            quality?: number;
            /**
             * Whether to only return the size information (defaults to false).
             */
            sizeOnly?: boolean;
        }

        interface GetEncodedResponseResponse {
            /**
             * The encoded body as a base64 string. Omitted if sizeOnly is true. (Encoded as a base64 string when passed over JSON)
             */
            body?: string;
            /**
             * Size before re-encoding.
             */
            originalSize: integer;
            /**
             * Size after re-encoding.
             */
            encodedSize: integer;
        }

        interface CheckContrastRequest {
            /**
             * Whether to report WCAG AAA level issues. Default is false.
             */
            reportAAA?: boolean;
        }

        interface CheckFormsIssuesResponse {
            formIssues: GenericIssueDetails[];
        }

        interface IssueAddedEvent {
            issue: InspectorIssue;
        }
    }

    /**
     * Defines commands and events for Autofill.
     */
    namespace Autofill {

        interface CreditCard {
            /**
             * 16-digit credit card number.
             */
            number: string;
            /**
             * Name of the credit card owner.
             */
            name: string;
            /**
             * 2-digit expiry month.
             */
            expiryMonth: string;
            /**
             * 4-digit expiry year.
             */
            expiryYear: string;
            /**
             * 3-digit card verification code.
             */
            cvc: string;
        }

        interface AddressField {
            /**
             * address field name, for example GIVEN_NAME.
             */
            name: string;
            /**
             * address field name, for example Jon Doe.
             */
            value: string;
        }

        interface Address {
            /**
             * fields and values defining a test address.
             */
            fields: AddressField[];
        }

        interface TriggerRequest {
            /**
             * Identifies a field that serves as an anchor for autofill.
             */
            fieldId: DOM.BackendNodeId;
            /**
             * Identifies the frame that field belongs to.
             */
            frameId?: Page.FrameId;
            /**
             * Credit card information to fill out the form. Credit card data is not saved.
             */
            card: CreditCard;
        }

        interface SetAddressesRequest {
            addresses: Address[];
        }
    }

    /**
     * Defines events for background web platform features.
     */
    namespace BackgroundService {

        /**
         * The Background Service that will be associated with the commands/events.
         * Every Background Service operates independently, but they share the same
         * API.
         */
        type ServiceName = ('backgroundFetch' | 'backgroundSync' | 'pushMessaging' | 'notifications' | 'paymentHandler' | 'periodicBackgroundSync');

        /**
         * A key-value pair for additional event information to pass along.
         */
        interface EventMetadata {
            key: string;
            value: string;
        }

        interface BackgroundServiceEvent {
            /**
             * Timestamp of the event (in seconds).
             */
            timestamp: Network.TimeSinceEpoch;
            /**
             * The origin this event belongs to.
             */
            origin: string;
            /**
             * The Service Worker ID that initiated the event.
             */
            serviceWorkerRegistrationId: ServiceWorker.RegistrationID;
            /**
             * The Background Service this event belongs to.
             */
            service: ServiceName;
            /**
             * A description of the event.
             */
            eventName: string;
            /**
             * An identifier that groups related events together.
             */
            instanceId: string;
            /**
             * A list of event-specific information.
             */
            eventMetadata: EventMetadata[];
            /**
             * Storage key this event belongs to.
             */
            storageKey: string;
        }

        interface StartObservingRequest {
            service: ServiceName;
        }

        interface StopObservingRequest {
            service: ServiceName;
        }

        interface SetRecordingRequest {
            shouldRecord: boolean;
            service: ServiceName;
        }

        interface ClearEventsRequest {
            service: ServiceName;
        }

        /**
         * Called when the recording state for the service has been updated.
         */
        interface RecordingStateChangedEvent {
            isRecording: boolean;
            service: ServiceName;
        }

        /**
         * Called with all existing backgroundServiceEvents when enabled, and all new
         * events afterwards if enabled and recording.
         */
        interface BackgroundServiceEventReceivedEvent {
            backgroundServiceEvent: BackgroundServiceEvent;
        }
    }

    /**
     * The Browser domain defines methods and events for browser managing.
     */
    namespace Browser {

        type BrowserContextID = string;

        type WindowID = integer;

        /**
         * The state of the browser window.
         */
        type WindowState = ('normal' | 'minimized' | 'maximized' | 'fullscreen');

        /**
         * Browser window bounds information
         */
        interface Bounds {
            /**
             * The offset from the left edge of the screen to the window in pixels.
             */
            left?: integer;
            /**
             * The offset from the top edge of the screen to the window in pixels.
             */
            top?: integer;
            /**
             * The window width in pixels.
             */
            width?: integer;
            /**
             * The window height in pixels.
             */
            height?: integer;
            /**
             * The window state. Default to normal.
             */
            windowState?: WindowState;
        }

        type PermissionType = ('accessibilityEvents' | 'audioCapture' | 'backgroundSync' | 'backgroundFetch' | 'clipboardReadWrite' | 'clipboardSanitizedWrite' | 'displayCapture' | 'durableStorage' | 'flash' | 'geolocation' | 'idleDetection' | 'localFonts' | 'midi' | 'midiSysex' | 'nfc' | 'notifications' | 'paymentHandler' | 'periodicBackgroundSync' | 'protectedMediaIdentifier' | 'sensors' | 'storageAccess' | 'topLevelStorageAccess' | 'videoCapture' | 'videoCapturePanTiltZoom' | 'wakeLockScreen' | 'wakeLockSystem' | 'windowManagement');

        type PermissionSetting = ('granted' | 'denied' | 'prompt');

        /**
         * Definition of PermissionDescriptor defined in the Permissions API:
         * https://w3c.github.io/permissions/#dictdef-permissiondescriptor.
         */
        interface PermissionDescriptor {
            /**
             * Name of permission.
             * See https://cs.chromium.org/chromium/src/third_party/blink/renderer/modules/permissions/permission_descriptor.idl for valid permission names.
             */
            name: string;
            /**
             * For "midi" permission, may also specify sysex control.
             */
            sysex?: boolean;
            /**
             * For "push" permission, may specify userVisibleOnly.
             * Note that userVisibleOnly = true is the only currently supported type.
             */
            userVisibleOnly?: boolean;
            /**
             * For "clipboard" permission, may specify allowWithoutSanitization.
             */
            allowWithoutSanitization?: boolean;
            /**
             * For "camera" permission, may specify panTiltZoom.
             */
            panTiltZoom?: boolean;
        }

        /**
         * Browser command ids used by executeBrowserCommand.
         */
        type BrowserCommandId = ('openTabSearch' | 'closeTabSearch');

        /**
         * Chrome histogram bucket.
         */
        interface Bucket {
            /**
             * Minimum value (inclusive).
             */
            low: integer;
            /**
             * Maximum value (exclusive).
             */
            high: integer;
            /**
             * Number of samples.
             */
            count: integer;
        }

        /**
         * Chrome histogram.
         */
        interface Histogram {
            /**
             * Name.
             */
            name: string;
            /**
             * Sum of sample values.
             */
            sum: integer;
            /**
             * Total number of samples.
             */
            count: integer;
            /**
             * Buckets.
             */
            buckets: Bucket[];
        }

        interface SetPermissionRequest {
            /**
             * Descriptor of permission to override.
             */
            permission: PermissionDescriptor;
            /**
             * Setting of the permission.
             */
            setting: PermissionSetting;
            /**
             * Origin the permission applies to, all origins if not specified.
             */
            origin?: string;
            /**
             * Context to override. When omitted, default browser context is used.
             */
            browserContextId?: BrowserContextID;
        }

        interface GrantPermissionsRequest {
            permissions: PermissionType[];
            /**
             * Origin the permission applies to, all origins if not specified.
             */
            origin?: string;
            /**
             * BrowserContext to override permissions. When omitted, default browser context is used.
             */
            browserContextId?: BrowserContextID;
        }

        interface ResetPermissionsRequest {
            /**
             * BrowserContext to reset permissions. When omitted, default browser context is used.
             */
            browserContextId?: BrowserContextID;
        }

        const enum SetDownloadBehaviorRequestBehavior {
            Deny = 'deny',
            Allow = 'allow',
            AllowAndName = 'allowAndName',
            Default = 'default',
        }

        interface SetDownloadBehaviorRequest {
            /**
             * Whether to allow all or deny all download requests, or use default Chrome behavior if
             * available (otherwise deny). |allowAndName| allows download and names files according to
             * their dowmload guids. (SetDownloadBehaviorRequestBehavior enum)
             */
            behavior: ('deny' | 'allow' | 'allowAndName' | 'default');
            /**
             * BrowserContext to set download behavior. When omitted, default browser context is used.
             */
            browserContextId?: BrowserContextID;
            /**
             * The default path to save downloaded files to. This is required if behavior is set to 'allow'
             * or 'allowAndName'.
             */
            downloadPath?: string;
            /**
             * Whether to emit download events (defaults to false).
             */
            eventsEnabled?: boolean;
        }

        interface CancelDownloadRequest {
            /**
             * Global unique identifier of the download.
             */
            guid: string;
            /**
             * BrowserContext to perform the action in. When omitted, default browser context is used.
             */
            browserContextId?: BrowserContextID;
        }

        interface GetVersionResponse {
            /**
             * Protocol version.
             */
            protocolVersion: string;
            /**
             * Product name.
             */
            product: string;
            /**
             * Product revision.
             */
            revision: string;
            /**
             * User-Agent.
             */
            userAgent: string;
            /**
             * V8 version.
             */
            jsVersion: string;
        }

        interface GetBrowserCommandLineResponse {
            /**
             * Commandline parameters
             */
            arguments: string[];
        }

        interface GetHistogramsRequest {
            /**
             * Requested substring in name. Only histograms which have query as a
             * substring in their name are extracted. An empty or absent query returns
             * all histograms.
             */
            query?: string;
            /**
             * If true, retrieve delta since last delta call.
             */
            delta?: boolean;
        }

        interface GetHistogramsResponse {
            /**
             * Histograms.
             */
            histograms: Histogram[];
        }

        interface GetHistogramRequest {
            /**
             * Requested histogram name.
             */
            name: string;
            /**
             * If true, retrieve delta since last delta call.
             */
            delta?: boolean;
        }

        interface GetHistogramResponse {
            /**
             * Histogram.
             */
            histogram: Histogram;
        }

        interface GetWindowBoundsRequest {
            /**
             * Browser window id.
             */
            windowId: WindowID;
        }

        interface GetWindowBoundsResponse {
            /**
             * Bounds information of the window. When window state is 'minimized', the restored window
             * position and size are returned.
             */
            bounds: Bounds;
        }

        interface GetWindowForTargetRequest {
            /**
             * Devtools agent host id. If called as a part of the session, associated targetId is used.
             */
            targetId?: Target.TargetID;
        }

        interface GetWindowForTargetResponse {
            /**
             * Browser window id.
             */
            windowId: WindowID;
            /**
             * Bounds information of the window. When window state is 'minimized', the restored window
             * position and size are returned.
             */
            bounds: Bounds;
        }

        interface SetWindowBoundsRequest {
            /**
             * Browser window id.
             */
            windowId: WindowID;
            /**
             * New window bounds. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined
             * with 'left', 'top', 'width' or 'height'. Leaves unspecified fields unchanged.
             */
            bounds: Bounds;
        }

        interface SetDockTileRequest {
            badgeLabel?: string;
            /**
             * Png encoded image. (Encoded as a base64 string when passed over JSON)
             */
            image?: string;
        }

        interface ExecuteBrowserCommandRequest {
            commandId: BrowserCommandId;
        }

        interface AddPrivacySandboxEnrollmentOverrideRequest {
            url: string;
        }

        /**
         * Fired when page is about to start a download.
         */
        interface DownloadWillBeginEvent {
            /**
             * Id of the frame that caused the download to begin.
             */
            frameId: Page.FrameId;
            /**
             * Global unique identifier of the download.
             */
            guid: string;
            /**
             * URL of the resource being downloaded.
             */
            url: string;
            /**
             * Suggested file name of the resource (the actual name of the file saved on disk may differ).
             */
            suggestedFilename: string;
        }

        const enum DownloadProgressEventState {
            InProgress = 'inProgress',
            Completed = 'completed',
            Canceled = 'canceled',
        }

        /**
         * Fired when download makes progress. Last call has |done| == true.
         */
        interface DownloadProgressEvent {
            /**
             * Global unique identifier of the download.
             */
            guid: string;
            /**
             * Total expected bytes to download.
             */
            totalBytes: number;
            /**
             * Total bytes received.
             */
            receivedBytes: number;
            /**
             * Download status. (DownloadProgressEventState enum)
             */
            state: ('inProgress' | 'completed' | 'canceled');
        }
    }

    /**
     * This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles)
     * have an associated `id` used in subsequent operations on the related object. Each object type has
     * a specific `id` structure, and those are not interchangeable between objects of different kinds.
     * CSS objects can be loaded using the `get*ForNode()` calls (which accept a DOM node id). A client
     * can also keep track of stylesheets via the `styleSheetAdded`/`styleSheetRemoved` events and
     * subsequently load the required stylesheet contents using the `getStyleSheet[Text]()` methods.
     */
    namespace CSS {

        type StyleSheetId = string;

        /**
         * Stylesheet type: "injected" for stylesheets injected via extension, "user-agent" for user-agent
         * stylesheets, "inspector" for stylesheets created by the inspector (i.e. those holding the "via
         * inspector" rules), "regular" for regular stylesheets.
         */
        type StyleSheetOrigin = ('injected' | 'user-agent' | 'inspector' | 'regular');

        /**
         * CSS rule collection for a single pseudo style.
         */
        interface PseudoElementMatches {
            /**
             * Pseudo element type.
             */
            pseudoType: DOM.PseudoType;
            /**
             * Pseudo element custom ident.
             */
            pseudoIdentifier?: string;
            /**
             * Matches of CSS rules applicable to the pseudo style.
             */
            matches: RuleMatch[];
        }

        /**
         * Inherited CSS rule collection from ancestor node.
         */
        interface InheritedStyleEntry {
            /**
             * The ancestor node's inline style, if any, in the style inheritance chain.
             */
            inlineStyle?: CSSStyle;
            /**
             * Matches of CSS rules matching the ancestor node in the style inheritance chain.
             */
            matchedCSSRules: RuleMatch[];
        }

        /**
         * Inherited pseudo element matches from pseudos of an ancestor node.
         */
        interface InheritedPseudoElementMatches {
            /**
             * Matches of pseudo styles from the pseudos of an ancestor node.
             */
            pseudoElements: PseudoElementMatches[];
        }

        /**
         * Match data for a CSS rule.
         */
        interface RuleMatch {
            /**
             * CSS rule in the match.
             */
            rule: CSSRule;
            /**
             * Matching selector indices in the rule's selectorList selectors (0-based).
             */
            matchingSelectors: integer[];
        }

        /**
         * Data for a simple selector (these are delimited by commas in a selector list).
         */
        interface Value {
            /**
             * Value text.
             */
            text: string;
            /**
             * Value range in the underlying resource (if available).
             */
            range?: SourceRange;
            /**
             * Specificity of the selector.
             */
            specificity?: Specificity;
        }

        /**
         * Specificity:
         * https://drafts.csswg.org/selectors/#specificity-rules
         */
        interface Specificity {
            /**
             * The a component, which represents the number of ID selectors.
             */
            a: integer;
            /**
             * The b component, which represents the number of class selectors, attributes selectors, and
             * pseudo-classes.
             */
            b: integer;
            /**
             * The c component, which represents the number of type selectors and pseudo-elements.
             */
            c: integer;
        }

        /**
         * Selector list data.
         */
        interface SelectorList {
            /**
             * Selectors in the list.
             */
            selectors: Value[];
            /**
             * Rule selector text.
             */
            text: string;
        }

        /**
         * CSS stylesheet metainformation.
         */
        interface CSSStyleSheetHeader {
            /**
             * The stylesheet identifier.
             */
            styleSheetId: StyleSheetId;
            /**
             * Owner frame identifier.
             */
            frameId: Page.FrameId;
            /**
             * Stylesheet resource URL. Empty if this is a constructed stylesheet created using
             * new CSSStyleSheet() (but non-empty if this is a constructed sylesheet imported
             * as a CSS module script).
             */
            sourceURL: string;
            /**
             * URL of source map associated with the stylesheet (if any).
             */
            sourceMapURL?: string;
            /**
             * Stylesheet origin.
             */
            origin: StyleSheetOrigin;
            /**
             * Stylesheet title.
             */
            title: string;
            /**
             * The backend id for the owner node of the stylesheet.
             */
            ownerNode?: DOM.BackendNodeId;
            /**
             * Denotes whether the stylesheet is disabled.
             */
            disabled: boolean;
            /**
             * Whether the sourceURL field value comes from the sourceURL comment.
             */
            hasSourceURL?: boolean;
            /**
             * Whether this stylesheet is created for STYLE tag by parser. This flag is not set for
             * document.written STYLE tags.
             */
            isInline: boolean;
            /**
             * Whether this stylesheet is mutable. Inline stylesheets become mutable
             * after they have been modified via CSSOM API.
             * `<link>` element's stylesheets become mutable only if DevTools modifies them.
             * Constructed stylesheets (new CSSStyleSheet()) are mutable immediately after creation.
             */
            isMutable: boolean;
            /**
             * True if this stylesheet is created through new CSSStyleSheet() or imported as a
             * CSS module script.
             */
            isConstructed: boolean;
            /**
             * Line offset of the stylesheet within the resource (zero based).
             */
            startLine: number;
            /**
             * Column offset of the stylesheet within the resource (zero based).
             */
            startColumn: number;
            /**
             * Size of the content (in characters).
             */
            length: number;
            /**
             * Line offset of the end of the stylesheet within the resource (zero based).
             */
            endLine: number;
            /**
             * Column offset of the end of the stylesheet within the resource (zero based).
             */
            endColumn: number;
            /**
             * If the style sheet was loaded from a network resource, this indicates when the resource failed to load
             */
            loadingFailed?: boolean;
        }

        /**
         * CSS rule representation.
         */
        interface CSSRule {
            /**
             * The css style sheet identifier (absent for user agent stylesheet and user-specified
             * stylesheet rules) this rule came from.
             */
            styleSheetId?: StyleSheetId;
            /**
             * Rule selector data.
             */
            selectorList: SelectorList;
            /**
             * Array of selectors from ancestor style rules, sorted by distance from the current rule.
             */
            nestingSelectors?: string[];
            /**
             * Parent stylesheet's origin.
             */
            origin: StyleSheetOrigin;
            /**
             * Associated style declaration.
             */
            style: CSSStyle;
            /**
             * Media list array (for rules involving media queries). The array enumerates media queries
             * starting with the innermost one, going outwards.
             */
            media?: CSSMedia[];
            /**
             * Container query list array (for rules involving container queries).
             * The array enumerates container queries starting with the innermost one, going outwards.
             */
            containerQueries?: CSSContainerQuery[];
            /**
             * @supports CSS at-rule array.
             * The array enumerates @supports at-rules starting with the innermost one, going outwards.
             */
            supports?: CSSSupports[];
            /**
             * Cascade layer array. Contains the layer hierarchy that this rule belongs to starting
             * with the innermost layer and going outwards.
             */
            layers?: CSSLayer[];
            /**
             * @scope CSS at-rule array.
             * The array enumerates @scope at-rules starting with the innermost one, going outwards.
             */
            scopes?: CSSScope[];
            /**
             * The array keeps the types of ancestor CSSRules from the innermost going outwards.
             */
            ruleTypes?: CSSRuleType[];
        }

        /**
         * Enum indicating the type of a CSS rule, used to represent the order of a style rule's ancestors.
         * This list only contains rule types that are collected during the ancestor rule collection.
         */
        type CSSRuleType = ('MediaRule' | 'SupportsRule' | 'ContainerRule' | 'LayerRule' | 'ScopeRule' | 'StyleRule');

        /**
         * CSS coverage information.
         */
        interface RuleUsage {
            /**
             * The css style sheet identifier (absent for user agent stylesheet and user-specified
             * stylesheet rules) this rule came from.
             */
            styleSheetId: StyleSheetId;
            /**
             * Offset of the start of the rule (including selector) from the beginning of the stylesheet.
             */
            startOffset: number;
            /**
             * Offset of the end of the rule body from the beginning of the stylesheet.
             */
            endOffset: number;
            /**
             * Indicates whether the rule was actually used by some element in the page.
             */
            used: boolean;
        }

        /**
         * Text range within a resource. All numbers are zero-based.
         */
        interface SourceRange {
            /**
             * Start line of range.
             */
            startLine: integer;
            /**
             * Start column of range (inclusive).
             */
            startColumn: integer;
            /**
             * End line of range
             */
            endLine: integer;
            /**
             * End column of range (exclusive).
             */
            endColumn: integer;
        }

        interface ShorthandEntry {
            /**
             * Shorthand name.
             */
            name: string;
            /**
             * Shorthand value.
             */
            value: string;
            /**
             * Whether the property has "!important" annotation (implies `false` if absent).
             */
            important?: boolean;
        }

        interface CSSComputedStyleProperty {
            /**
             * Computed style property name.
             */
            name: string;
            /**
             * Computed style property value.
             */
            value: string;
        }

        /**
         * CSS style representation.
         */
        interface CSSStyle {
            /**
             * The css style sheet identifier (absent for user agent stylesheet and user-specified
             * stylesheet rules) this rule came from.
             */
            styleSheetId?: StyleSheetId;
            /**
             * CSS properties in the style.
             */
            cssProperties: CSSProperty[];
            /**
             * Computed values for all shorthands found in the style.
             */
            shorthandEntries: ShorthandEntry[];
            /**
             * Style declaration text (if available).
             */
            cssText?: string;
            /**
             * Style declaration range in the enclosing stylesheet (if available).
             */
            range?: SourceRange;
        }

        /**
         * CSS property declaration data.
         */
        interface CSSProperty {
            /**
             * The property name.
             */
            name: string;
            /**
             * The property value.
             */
            value: string;
            /**
             * Whether the property has "!important" annotation (implies `false` if absent).
             */
            important?: boolean;
            /**
             * Whether the property is implicit (implies `false` if absent).
             */
            implicit?: boolean;
            /**
             * The full property text as specified in the style.
             */
            text?: string;
            /**
             * Whether the property is understood by the browser (implies `true` if absent).
             */
            parsedOk?: boolean;
            /**
             * Whether the property is disabled by the user (present for source-based properties only).
             */
            disabled?: boolean;
            /**
             * The entire property range in the enclosing style declaration (if available).
             */
            range?: SourceRange;
            /**
             * Parsed longhand components of this property if it is a shorthand.
             * This field will be empty if the given property is not a shorthand.
             */
            longhandProperties?: CSSProperty[];
        }

        const enum CSSMediaSource {
            MediaRule = 'mediaRule',
            ImportRule = 'importRule',
            LinkedSheet = 'linkedSheet',
            InlineSheet = 'inlineSheet',
        }

        /**
         * CSS media rule descriptor.
         */
        interface CSSMedia {
            /**
             * Media query text.
             */
            text: string;
            /**
             * Source of the media query: "mediaRule" if specified by a @media rule, "importRule" if
             * specified by an @import rule, "linkedSheet" if specified by a "media" attribute in a linked
             * stylesheet's LINK tag, "inlineSheet" if specified by a "media" attribute in an inline
             * stylesheet's STYLE tag. (CSSMediaSource enum)
             */
            source: ('mediaRule' | 'importRule' | 'linkedSheet' | 'inlineSheet');
            /**
             * URL of the document containing the media query description.
             */
            sourceURL?: string;
            /**
             * The associated rule (@media or @import) header range in the enclosing stylesheet (if
             * available).
             */
            range?: SourceRange;
            /**
             * Identifier of the stylesheet containing this object (if exists).
             */
            styleSheetId?: StyleSheetId;
            /**
             * Array of media queries.
             */
            mediaList?: MediaQuery[];
        }

        /**
         * Media query descriptor.
         */
        interface MediaQuery {
            /**
             * Array of media query expressions.
             */
            expressions: MediaQueryExpression[];
            /**
             * Whether the media query condition is satisfied.
             */
            active: boolean;
        }

        /**
         * Media query expression descriptor.
         */
        interface MediaQueryExpression {
            /**
             * Media query expression value.
             */
            value: number;
            /**
             * Media query expression units.
             */
            unit: string;
            /**
             * Media query expression feature.
             */
            feature: string;
            /**
             * The associated range of the value text in the enclosing stylesheet (if available).
             */
            valueRange?: SourceRange;
            /**
             * Computed length of media query expression (if applicable).
             */
            computedLength?: number;
        }

        /**
         * CSS container query rule descriptor.
         */
        interface CSSContainerQuery {
            /**
             * Container query text.
             */
            text: string;
            /**
             * The associated rule header range in the enclosing stylesheet (if
             * available).
             */
            range?: SourceRange;
            /**
             * Identifier of the stylesheet containing this object (if exists).
             */
            styleSheetId?: StyleSheetId;
            /**
             * Optional name for the container.
             */
            name?: string;
            /**
             * Optional physical axes queried for the container.
             */
            physicalAxes?: DOM.PhysicalAxes;
            /**
             * Optional logical axes queried for the container.
             */
            logicalAxes?: DOM.LogicalAxes;
        }

        /**
         * CSS Supports at-rule descriptor.
         */
        interface CSSSupports {
            /**
             * Supports rule text.
             */
            text: string;
            /**
             * Whether the supports condition is satisfied.
             */
            active: boolean;
            /**
             * The associated rule header range in the enclosing stylesheet (if
             * available).
             */
            range?: SourceRange;
            /**
             * Identifier of the stylesheet containing this object (if exists).
             */
            styleSheetId?: StyleSheetId;
        }

        /**
         * CSS Scope at-rule descriptor.
         */
        interface CSSScope {
            /**
             * Scope rule text.
             */
            text: string;
            /**
             * The associated rule header range in the enclosing stylesheet (if
             * available).
             */
            range?: SourceRange;
            /**
             * Identifier of the stylesheet containing this object (if exists).
             */
            styleSheetId?: StyleSheetId;
        }

        /**
         * CSS Layer at-rule descriptor.
         */
        interface CSSLayer {
            /**
             * Layer name.
             */
            text: string;
            /**
             * The associated rule header range in the enclosing stylesheet (if
             * available).
             */
            range?: SourceRange;
            /**
             * Identifier of the stylesheet containing this object (if exists).
             */
            styleSheetId?: StyleSheetId;
        }

        /**
         * CSS Layer data.
         */
        interface CSSLayerData {
            /**
             * Layer name.
             */
            name: string;
            /**
             * Direct sub-layers
             */
            subLayers?: CSSLayerData[];
            /**
             * Layer order. The order determines the order of the layer in the cascade order.
             * A higher number has higher priority in the cascade order.
             */
            order: number;
        }

        /**
         * Information about amount of glyphs that were rendered with given font.
         */
        interface PlatformFontUsage {
            /**
             * Font's family name reported by platform.
             */
            familyName: string;
            /**
             * Indicates if the font was downloaded or resolved locally.
             */
            isCustomFont: boolean;
            /**
             * Amount of glyphs that were rendered with this font.
             */
            glyphCount: number;
        }

        /**
         * Information about font variation axes for variable fonts
         */
        interface FontVariationAxis {
            /**
             * The font-variation-setting tag (a.k.a. "axis tag").
             */
            tag: string;
            /**
             * Human-readable variation name in the default language (normally, "en").
             */
            name: string;
            /**
             * The minimum value (inclusive) the font supports for this tag.
             */
            minValue: number;
            /**
             * The maximum value (inclusive) the font supports for this tag.
             */
            maxValue: number;
            /**
             * The default value.
             */
            defaultValue: number;
        }

        /**
         * Properties of a web font: https://www.w3.org/TR/2008/REC-CSS2-20080411/fonts.html#font-descriptions
         * and additional information such as platformFontFamily and fontVariationAxes.
         */
        interface FontFace {
            /**
             * The font-family.
             */
            fontFamily: string;
            /**
             * The font-style.
             */
            fontStyle: string;
            /**
             * The font-variant.
             */
            fontVariant: string;
            /**
             * The font-weight.
             */
            fontWeight: string;
            /**
             * The font-stretch.
             */
            fontStretch: string;
            /**
             * The font-display.
             */
            fontDisplay: string;
            /**
             * The unicode-range.
             */
            unicodeRange: string;
            /**
             * The src.
             */
            src: string;
            /**
             * The resolved platform font family
             */
            platformFontFamily: string;
            /**
             * Available variation settings (a.k.a. "axes").
             */
            fontVariationAxes?: FontVariationAxis[];
        }

        /**
         * CSS try rule representation.
         */
        interface CSSTryRule {
            /**
             * The css style sheet identifier (absent for user agent stylesheet and user-specified
             * stylesheet rules) this rule came from.
             */
            styleSheetId?: StyleSheetId;
            /**
             * Parent stylesheet's origin.
             */
            origin: StyleSheetOrigin;
            /**
             * Associated style declaration.
             */
            style: CSSStyle;
        }

        /**
         * CSS position-fallback rule representation.
         */
        interface CSSPositionFallbackRule {
            name: Value;
            /**
             * List of keyframes.
             */
            tryRules: CSSTryRule[];
        }

        /**
         * CSS keyframes rule representation.
         */
        interface CSSKeyframesRule {
            /**
             * Animation name.
             */
            animationName: Value;
            /**
             * List of keyframes.
             */
            keyframes: CSSKeyframeRule[];
        }

        /**
         * Representation of a custom property registration through CSS.registerProperty
         */
        interface CSSPropertyRegistration {
            propertyName: string;
            initialValue?: Value;
            inherits: boolean;
            syntax: string;
        }

        /**
         * CSS property at-rule representation.
         */
        interface CSSPropertyRule {
            /**
             * The css style sheet identifier (absent for user agent stylesheet and user-specified
             * stylesheet rules) this rule came from.
             */
            styleSheetId?: StyleSheetId;
            /**
             * Parent stylesheet's origin.
             */
            origin: StyleSheetOrigin;
            /**
             * Associated property name.
             */
            propertyName: Value;
            /**
             * Associated style declaration.
             */
            style: CSSStyle;
        }

        /**
         * CSS keyframe rule representation.
         */
        interface CSSKeyframeRule {
            /**
             * The css style sheet identifier (absent for user agent stylesheet and user-specified
             * stylesheet rules) this rule came from.
             */
            styleSheetId?: StyleSheetId;
            /**
             * Parent stylesheet's origin.
             */
            origin: StyleSheetOrigin;
            /**
             * Associated key text.
             */
            keyText: Value;
            /**
             * Associated style declaration.
             */
            style: CSSStyle;
        }

        /**
         * A descriptor of operation to mutate style declaration text.
         */
        interface StyleDeclarationEdit {
            /**
             * The css style sheet identifier.
             */
            styleSheetId: StyleSheetId;
            /**
             * The range of the style text in the enclosing stylesheet.
             */
            range: SourceRange;
            /**
             * New style text.
             */
            text: string;
        }

        interface AddRuleRequest {
            /**
             * The css style sheet identifier where a new rule should be inserted.
             */
            styleSheetId: StyleSheetId;
            /**
             * The text of a new rule.
             */
            ruleText: string;
            /**
             * Text position of a new rule in the target style sheet.
             */
            location: SourceRange;
        }

        interface AddRuleResponse {
            /**
             * The newly created rule.
             */
            rule: CSSRule;
        }

        interface CollectClassNamesRequest {
            styleSheetId: StyleSheetId;
        }

        interface CollectClassNamesResponse {
            /**
             * Class name list.
             */
            classNames: string[];
        }

        interface CreateStyleSheetRequest {
            /**
             * Identifier of the frame where "via-inspector" stylesheet should be created.
             */
            frameId: Page.FrameId;
        }

        interface CreateStyleSheetResponse {
            /**
             * Identifier of the created "via-inspector" stylesheet.
             */
            styleSheetId: StyleSheetId;
        }

        interface ForcePseudoStateRequest {
            /**
             * The element id for which to force the pseudo state.
             */
            nodeId: DOM.NodeId;
            /**
             * Element pseudo classes to force when computing the element's style.
             */
            forcedPseudoClasses: string[];
        }

        interface GetBackgroundColorsRequest {
            /**
             * Id of the node to get background colors for.
             */
            nodeId: DOM.NodeId;
        }

        interface GetBackgroundColorsResponse {
            /**
             * The range of background colors behind this element, if it contains any visible text. If no
             * visible text is present, this will be undefined. In the case of a flat background color,
             * this will consist of simply that color. In the case of a gradient, this will consist of each
             * of the color stops. For anything more complicated, this will be an empty array. Images will
             * be ignored (as if the image had failed to load).
             */
            backgroundColors?: string[];
            /**
             * The computed font size for this node, as a CSS computed value string (e.g. '12px').
             */
            computedFontSize?: string;
            /**
             * The computed font weight for this node, as a CSS computed value string (e.g. 'normal' or
             * '100').
             */
            computedFontWeight?: string;
        }

        interface GetComputedStyleForNodeRequest {
            nodeId: DOM.NodeId;
        }

        interface GetComputedStyleForNodeResponse {
            /**
             * Computed style for the specified DOM node.
             */
            computedStyle: CSSComputedStyleProperty[];
        }

        interface GetInlineStylesForNodeRequest {
            nodeId: DOM.NodeId;
        }

        interface GetInlineStylesForNodeResponse {
            /**
             * Inline style for the specified DOM node.
             */
            inlineStyle?: CSSStyle;
            /**
             * Attribute-defined element style (e.g. resulting from "width=20 height=100%").
             */
            attributesStyle?: CSSStyle;
        }

        interface GetMatchedStylesForNodeRequest {
            nodeId: DOM.NodeId;
        }

        interface GetMatchedStylesForNodeResponse {
            /**
             * Inline style for the specified DOM node.
             */
            inlineStyle?: CSSStyle;
            /**
             * Attribute-defined element style (e.g. resulting from "width=20 height=100%").
             */
            attributesStyle?: CSSStyle;
            /**
             * CSS rules matching this node, from all applicable stylesheets.
             */
            matchedCSSRules?: RuleMatch[];
            /**
             * Pseudo style matches for this node.
             */
            pseudoElements?: PseudoElementMatches[];
            /**
             * A chain of inherited styles (from the immediate node parent up to the DOM tree root).
             */
            inherited?: InheritedStyleEntry[];
            /**
             * A chain of inherited pseudo element styles (from the immediate node parent up to the DOM tree root).
             */
            inheritedPseudoElements?: InheritedPseudoElementMatches[];
            /**
             * A list of CSS keyframed animations matching this node.
             */
            cssKeyframesRules?: CSSKeyframesRule[];
            /**
             * A list of CSS position fallbacks matching this node.
             */
            cssPositionFallbackRules?: CSSPositionFallbackRule[];
            /**
             * A list of CSS at-property rules matching this node.
             */
            cssPropertyRules?: CSSPropertyRule[];
            /**
             * A list of CSS property registrations matching this node.
             */
            cssPropertyRegistrations?: CSSPropertyRegistration[];
            /**
             * Id of the first parent element that does not have display: contents.
             */
            parentLayoutNodeId?: DOM.NodeId;
        }

        interface GetMediaQueriesResponse {
            medias: CSSMedia[];
        }

        interface GetPlatformFontsForNodeRequest {
            nodeId: DOM.NodeId;
        }

        interface GetPlatformFontsForNodeResponse {
            /**
             * Usage statistics for every employed platform font.
             */
            fonts: PlatformFontUsage[];
        }

        interface GetStyleSheetTextRequest {
            styleSheetId: StyleSheetId;
        }

        interface GetStyleSheetTextResponse {
            /**
             * The stylesheet text.
             */
            text: string;
        }

        interface GetLayersForNodeRequest {
            nodeId: DOM.NodeId;
        }

        interface GetLayersForNodeResponse {
            rootLayer: CSSLayerData;
        }

        interface TrackComputedStyleUpdatesRequest {
            propertiesToTrack: CSSComputedStyleProperty[];
        }

        interface TakeComputedStyleUpdatesResponse {
            /**
             * The list of node Ids that have their tracked computed styles updated.
             */
            nodeIds: DOM.NodeId[];
        }

        interface SetEffectivePropertyValueForNodeRequest {
            /**
             * The element id for which to set property.
             */
            nodeId: DOM.NodeId;
            propertyName: string;
            value: string;
        }

        interface SetKeyframeKeyRequest {
            styleSheetId: StyleSheetId;
            range: SourceRange;
            keyText: string;
        }

        interface SetKeyframeKeyResponse {
            /**
             * The resulting key text after modification.
             */
            keyText: Value;
        }

        interface SetMediaTextRequest {
            styleSheetId: StyleSheetId;
            range: SourceRange;
            text: string;
        }

        interface SetMediaTextResponse {
            /**
             * The resulting CSS media rule after modification.
             */
            media: CSSMedia;
        }

        interface SetContainerQueryTextRequest {
            styleSheetId: StyleSheetId;
            range: SourceRange;
            text: string;
        }

        interface SetContainerQueryTextResponse {
            /**
             * The resulting CSS container query rule after modification.
             */
            containerQuery: CSSContainerQuery;
        }

        interface SetSupportsTextRequest {
            styleSheetId: StyleSheetId;
            range: SourceRange;
            text: string;
        }

        interface SetSupportsTextResponse {
            /**
             * The resulting CSS Supports rule after modification.
             */
            supports: CSSSupports;
        }

        interface SetScopeTextRequest {
            styleSheetId: StyleSheetId;
            range: SourceRange;
            text: string;
        }

        interface SetScopeTextResponse {
            /**
             * The resulting CSS Scope rule after modification.
             */
            scope: CSSScope;
        }

        interface SetRuleSelectorRequest {
            styleSheetId: StyleSheetId;
            range: SourceRange;
            selector: string;
        }

        interface SetRuleSelectorResponse {
            /**
             * The resulting selector list after modification.
             */
            selectorList: SelectorList;
        }

        interface SetStyleSheetTextRequest {
            styleSheetId: StyleSheetId;
            text: string;
        }

        interface SetStyleSheetTextResponse {
            /**
             * URL of source map associated with script (if any).
             */
            sourceMapURL?: string;
        }

        interface SetStyleTextsRequest {
            edits: StyleDeclarationEdit[];
        }

        interface SetStyleTextsResponse {
            /**
             * The resulting styles after modification.
             */
            styles: CSSStyle[];
        }

        interface StopRuleUsageTrackingResponse {
            ruleUsage: RuleUsage[];
        }

        interface TakeCoverageDeltaResponse {
            coverage: RuleUsage[];
            /**
             * Monotonically increasing time, in seconds.
             */
            timestamp: number;
        }

        interface SetLocalFontsEnabledRequest {
            /**
             * Whether rendering of local fonts is enabled.
             */
            enabled: boolean;
        }

        /**
         * Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
         * web font.
         */
        interface FontsUpdatedEvent {
            /**
             * The web font that has loaded.
             */
            font?: FontFace;
        }

        /**
         * Fired whenever an active document stylesheet is added.
         */
        interface StyleSheetAddedEvent {
            /**
             * Added stylesheet metainfo.
             */
            header: CSSStyleSheetHeader;
        }

        /**
         * Fired whenever a stylesheet is changed as a result of the client operation.
         */
        interface StyleSheetChangedEvent {
            styleSheetId: StyleSheetId;
        }

        /**
         * Fired whenever an active document stylesheet is removed.
         */
        interface StyleSheetRemovedEvent {
            /**
             * Identifier of the removed stylesheet.
             */
            styleSheetId: StyleSheetId;
        }
    }

    namespace CacheStorage {

        /**
         * Unique identifier of the Cache object.
         */
        type CacheId = string;

        /**
         * type of HTTP response cached
         */
        type CachedResponseType = ('basic' | 'cors' | 'default' | 'error' | 'opaqueResponse' | 'opaqueRedirect');

        /**
         * Data entry.
         */
        interface DataEntry {
            /**
             * Request URL.
             */
            requestURL: string;
            /**
             * Request method.
             */
            requestMethod: string;
            /**
             * Request headers
             */
            requestHeaders: Header[];
            /**
             * Number of seconds since epoch.
             */
            responseTime: number;
            /**
             * HTTP response status code.
             */
            responseStatus: integer;
            /**
             * HTTP response status text.
             */
            responseStatusText: string;
            /**
             * HTTP response type
             */
            responseType: CachedResponseType;
            /**
             * Response headers
             */
            responseHeaders: Header[];
        }

        /**
         * Cache identifier.
         */
        interface Cache {
            /**
             * An opaque unique id of the cache.
             */
            cacheId: CacheId;
            /**
             * Security origin of the cache.
             */
            securityOrigin: string;
            /**
             * Storage key of the cache.
             */
            storageKey: string;
            /**
             * Storage bucket of the cache.
             */
            storageBucket?: Storage.StorageBucket;
            /**
             * The name of the cache.
             */
            cacheName: string;
        }

        interface Header {
            name: string;
            value: string;
        }

        /**
         * Cached response
         */
        interface CachedResponse {
            /**
             * Entry content, base64-encoded. (Encoded as a base64 string when passed over JSON)
             */
            body: string;
        }

        interface DeleteCacheRequest {
            /**
             * Id of cache for deletion.
             */
            cacheId: CacheId;
        }

        interface DeleteEntryRequest {
            /**
             * Id of cache where the entry will be deleted.
             */
            cacheId: CacheId;
            /**
             * URL spec of the request.
             */
            request: string;
        }

        interface RequestCacheNamesRequest {
            /**
             * At least and at most one of securityOrigin, storageKey, storageBucket must be specified.
             * Security origin.
             */
            securityOrigin?: string;
            /**
             * Storage key.
             */
            storageKey?: string;
            /**
             * Storage bucket. If not specified, it uses the default bucket.
             */
            storageBucket?: Storage.StorageBucket;
        }

        interface RequestCacheNamesResponse {
            /**
             * Caches for the security origin.
             */
            caches: Cache[];
        }

        interface RequestCachedResponseRequest {
            /**
             * Id of cache that contains the entry.
             */
            cacheId: CacheId;
            /**
             * URL spec of the request.
             */
            requestURL: string;
            /**
             * headers of the request.
             */
            requestHeaders: Header[];
        }

        interface RequestCachedResponseResponse {
            /**
             * Response read from the cache.
             */
            response: CachedResponse;
        }

        interface RequestEntriesRequest {
            /**
             * ID of cache to get entries from.
             */
            cacheId: CacheId;
            /**
             * Number of records to skip.
             */
            skipCount?: integer;
            /**
             * Number of records to fetch.
             */
            pageSize?: integer;
            /**
             * If present, only return the entries containing this substring in the path
             */
            pathFilter?: string;
        }

        interface RequestEntriesResponse {
            /**
             * Array of object store data entries.
             */
            cacheDataEntries: DataEntry[];
            /**
             * Count of returned entries from this storage. If pathFilter is empty, it
             * is the count of all entries from this storage.
             */
            returnCount: number;
        }
    }

    /**
     * A domain for interacting with Cast, Presentation API, and Remote Playback API
     * functionalities.
     */
    namespace Cast {

        interface Sink {
            name: string;
            id: string;
            /**
             * Text describing the current session. Present only if there is an active
             * session on the sink.
             */
            session?: string;
        }

        interface EnableRequest {
            presentationUrl?: string;
        }

        interface SetSinkToUseRequest {
            sinkName: string;
        }

        interface StartDesktopMirroringRequest {
            sinkName: string;
        }

        interface StartTabMirroringRequest {
            sinkName: string;
        }

        interface StopCastingRequest {
            sinkName: string;
        }

        /**
         * This is fired whenever the list of available sinks changes. A sink is a
         * device or a software surface that you can cast to.
         */
        interface SinksUpdatedEvent {
            sinks: Sink[];
        }

        /**
         * This is fired whenever the outstanding issue/error message changes.
         * |issueMessage| is empty if there is no issue.
         */
        interface IssueUpdatedEvent {
            issueMessage: string;
        }
    }

    /**
     * This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object
     * that has an `id`. This `id` can be used to get additional information on the Node, resolve it into
     * the JavaScript object wrapper, etc. It is important that client receives DOM events only for the
     * nodes that are known to the client. Backend keeps track of the nodes that were sent to the client
     * and never sends the same node twice. It is client's responsibility to collect information about
     * the nodes that were sent to the client. Note that `iframe` owner elements will return
     * corresponding document elements as their child nodes.
     */
    namespace DOM {

        /**
         * Unique DOM node identifier.
         */
        type NodeId = integer;

        /**
         * Unique DOM node identifier used to reference a node that may not have been pushed to the
         * front-end.
         */
        type BackendNodeId = integer;

        /**
         * Backend node with a friendly name.
         */
        interface BackendNode {
            /**
             * `Node`'s nodeType.
             */
            nodeType: integer;
            /**
             * `Node`'s nodeName.
             */
            nodeName: string;
            backendNodeId: BackendNodeId;
        }

        /**
         * Pseudo element type.
         */
        type PseudoType = ('first-line' | 'first-letter' | 'before' | 'after' | 'marker' | 'backdrop' | 'selection' | 'target-text' | 'spelling-error' | 'grammar-error' | 'highlight' | 'first-line-inherited' | 'scrollbar' | 'scrollbar-thumb' | 'scrollbar-button' | 'scrollbar-track' | 'scrollbar-track-piece' | 'scrollbar-corner' | 'resizer' | 'input-list-button' | 'view-transition' | 'view-transition-group' | 'view-transition-image-pair' | 'view-transition-old' | 'view-transition-new');

        /**
         * Shadow root type.
         */
        type ShadowRootType = ('user-agent' | 'open' | 'closed');

        /**
         * Document compatibility mode.
         */
        type CompatibilityMode = ('QuirksMode' | 'LimitedQuirksMode' | 'NoQuirksMode');

        /**
         * ContainerSelector physical axes
         */
        type PhysicalAxes = ('Horizontal' | 'Vertical' | 'Both');

        /**
         * ContainerSelector logical axes
         */
        type LogicalAxes = ('Inline' | 'Block' | 'Both');

        /**
         * DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
         * DOMNode is a base node mirror type.
         */
        interface Node {
            /**
             * Node identifier that is passed into the rest of the DOM messages as the `nodeId`. Backend
             * will only push node with given `id` once. It is aware of all requested nodes and will only
             * fire DOM events for nodes known to the client.
             */
            nodeId: NodeId;
            /**
             * The id of the parent node if any.
             */
            parentId?: NodeId;
            /**
             * The BackendNodeId for this node.
             */
            backendNodeId: BackendNodeId;
            /**
             * `Node`'s nodeType.
             */
            nodeType: integer;
            /**
             * `Node`'s nodeName.
             */
            nodeName: string;
            /**
             * `Node`'s localName.
             */
            localName: string;
            /**
             * `Node`'s nodeValue.
             */
            nodeValue: string;
            /**
             * Child count for `Container` nodes.
             */
            childNodeCount?: integer;
            /**
             * Child nodes of this node when requested with children.
             */
            children?: Node[];
            /**
             * Attributes of the `Element` node in the form of flat array `[name1, value1, name2, value2]`.
             */
            attributes?: string[];
            /**
             * Document URL that `Document` or `FrameOwner` node points to.
             */
            documentURL?: string;
            /**
             * Base URL that `Document` or `FrameOwner` node uses for URL completion.
             */
            baseURL?: string;
            /**
             * `DocumentType`'s publicId.
             */
            publicId?: string;
            /**
             * `DocumentType`'s systemId.
             */
            systemId?: string;
            /**
             * `DocumentType`'s internalSubset.
             */
            internalSubset?: string;
            /**
             * `Document`'s XML version in case of XML documents.
             */
            xmlVersion?: string;
            /**
             * `Attr`'s name.
             */
            name?: string;
            /**
             * `Attr`'s value.
             */
            value?: string;
            /**
             * Pseudo element type for this node.
             */
            pseudoType?: PseudoType;
            /**
             * Pseudo element identifier for this node. Only present if there is a
             * valid pseudoType.
             */
            pseudoIdentifier?: string;
            /**
             * Shadow root type.
             */
            shadowRootType?: ShadowRootType;
            /**
             * Frame ID for frame owner elements.
             */
            frameId?: Page.FrameId;
            /**
             * Content document for frame owner elements.
             */
            contentDocument?: Node;
            /**
             * Shadow root list for given element host.
             */
            shadowRoots?: Node[];
            /**
             * Content document fragment for template elements.
             */
            templateContent?: Node;
            /**
             * Pseudo elements associated with this node.
             */
            pseudoElements?: Node[];
            /**
             * Deprecated, as the HTML Imports API has been removed (crbug.com/937746).
             * This property used to return the imported document for the HTMLImport links.
             * The property is always undefined now.
             */
            importedDocument?: Node;
            /**
             * Distributed nodes for given insertion point.
             */
            distributedNodes?: BackendNode[];
            /**
             * Whether the node is SVG.
             */
            isSVG?: boolean;
            compatibilityMode?: CompatibilityMode;
            assignedSlot?: BackendNode;
        }

        /**
         * A structure holding an RGBA color.
         */
        interface RGBA {
            /**
             * The red component, in the [0-255] range.
             */
            r: integer;
            /**
             * The green component, in the [0-255] range.
             */
            g: integer;
            /**
             * The blue component, in the [0-255] range.
             */
            b: integer;
            /**
             * The alpha component, in the [0-1] range (default: 1).
             */
            a?: number;
        }

        /**
         * An array of quad vertices, x immediately followed by y for each point, points clock-wise.
         */
        type Quad = number[];

        /**
         * Box model.
         */
        interface BoxModel {
            /**
             * Content box
             */
            content: Quad;
            /**
             * Padding box
             */
            padding: Quad;
            /**
             * Border box
             */
            border: Quad;
            /**
             * Margin box
             */
            margin: Quad;
            /**
             * Node width
             */
            width: integer;
            /**
             * Node height
             */
            height: integer;
            /**
             * Shape outside coordinates
             */
            shapeOutside?: ShapeOutsideInfo;
        }

        /**
         * CSS Shape Outside details.
         */
        interface ShapeOutsideInfo {
            /**
             * Shape bounds
             */
            bounds: Quad;
            /**
             * Shape coordinate details
             */
            shape: any[];
            /**
             * Margin shape bounds
             */
            marginShape: any[];
        }

        /**
         * Rectangle.
         */
        interface Rect {
            /**
             * X coordinate
             */
            x: number;
            /**
             * Y coordinate
             */
            y: number;
            /**
             * Rectangle width
             */
            width: number;
            /**
             * Rectangle height
             */
            height: number;
        }

        interface CSSComputedStyleProperty {
            /**
             * Computed style property name.
             */
            name: string;
            /**
             * Computed style property value.
             */
            value: string;
        }

        interface CollectClassNamesFromSubtreeRequest {
            /**
             * Id of the node to collect class names.
             */
            nodeId: NodeId;
        }

        interface CollectClassNamesFromSubtreeResponse {
            /**
             * Class name list.
             */
            classNames: string[];
        }

        interface CopyToRequest {
            /**
             * Id of the node to copy.
             */
            nodeId: NodeId;
            /**
             * Id of the element to drop the copy into.
             */
            targetNodeId: NodeId;
            /**
             * Drop the copy before this node (if absent, the copy becomes the last child of
             * `targetNodeId`).
             */
            insertBeforeNodeId?: NodeId;
        }

        interface CopyToResponse {
            /**
             * Id of the node clone.
             */
            nodeId: NodeId;
        }

        interface DescribeNodeRequest {
            /**
             * Identifier of the node.
             */
            nodeId?: NodeId;
            /**
             * Identifier of the backend node.
             */
            backendNodeId?: BackendNodeId;
            /**
             * JavaScript object id of the node wrapper.
             */
            objectId?: Runtime.RemoteObjectId;
            /**
             * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
             * entire subtree or provide an integer larger than 0.
             */
            depth?: integer;
            /**
             * Whether or not iframes and shadow roots should be traversed when returning the subtree
             * (default is false).
             */
            pierce?: boolean;
        }

        interface DescribeNodeResponse {
            /**
             * Node description.
             */
            node: Node;
        }

        interface ScrollIntoViewIfNeededRequest {
            /**
             * Identifier of the node.
             */
            nodeId?: NodeId;
            /**
             * Identifier of the backend node.
             */
            backendNodeId?: BackendNodeId;
            /**
             * JavaScript object id of the node wrapper.
             */
            objectId?: Runtime.RemoteObjectId;
            /**
             * The rect to be scrolled into view, relative to the node's border box, in CSS pixels.
             * When omitted, center of the node will be used, similar to Element.scrollIntoView.
             */
            rect?: Rect;
        }

        interface DiscardSearchResultsRequest {
            /**
             * Unique search session identifier.
             */
            searchId: string;
        }

        const enum EnableRequestIncludeWhitespace {
            None = 'none',
            All = 'all',
        }

        interface EnableRequest {
            /**
             * Whether to include whitespaces in the children array of returned Nodes. (EnableRequestIncludeWhitespace enum)
             */
            includeWhitespace?: ('none' | 'all');
        }

        interface FocusRequest {
            /**
             * Identifier of the node.
             */
            nodeId?: NodeId;
            /**
             * Identifier of the backend node.
             */
            backendNodeId?: BackendNodeId;
            /**
             * JavaScript object id of the node wrapper.
             */
            objectId?: Runtime.RemoteObjectId;
        }

        interface GetAttributesRequest {
            /**
             * Id of the node to retrieve attibutes for.
             */
            nodeId: NodeId;
        }

        interface GetAttributesResponse {
            /**
             * An interleaved array of node attribute names and values.
             */
            attributes: string[];
        }

        interface GetBoxModelRequest {
            /**
             * Identifier of the node.
             */
            nodeId?: NodeId;
            /**
             * Identifier of the backend node.
             */
            backendNodeId?: BackendNodeId;
            /**
             * JavaScript object id of the node wrapper.
             */
            objectId?: Runtime.RemoteObjectId;
        }

        interface GetBoxModelResponse {
            /**
             * Box model for the node.
             */
            model: BoxModel;
        }

        interface GetContentQuadsRequest {
            /**
             * Identifier of the node.
             */
            nodeId?: NodeId;
            /**
             * Identifier of the backend node.
             */
            backendNodeId?: BackendNodeId;
            /**
             * JavaScript object id of the node wrapper.
             */
            objectId?: Runtime.RemoteObjectId;
        }

        interface GetContentQuadsResponse {
            /**
             * Quads that describe node layout relative to viewport.
             */
            quads: Quad[];
        }

        interface GetDocumentRequest {
            /**
             * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
             * entire subtree or provide an integer larger than 0.
             */
            depth?: integer;
            /**
             * Whether or not iframes and shadow roots should be traversed when returning the subtree
             * (default is false).
             */
            pierce?: boolean;
        }

        interface GetDocumentResponse {
            /**
             * Resulting node.
             */
            root: Node;
        }

        interface GetFlattenedDocumentRequest {
            /**
             * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
             * entire subtree or provide an integer larger than 0.
             */
            depth?: integer;
            /**
             * Whether or not iframes and shadow roots should be traversed when returning the subtree
             * (default is false).
             */
            pierce?: boolean;
        }

        interface GetFlattenedDocumentResponse {
            /**
             * Resulting node.
             */
            nodes: Node[];
        }

        interface GetNodesForSubtreeByStyleRequest {
            /**
             * Node ID pointing to the root of a subtree.
             */
            nodeId: NodeId;
            /**
             * The style to filter nodes by (includes nodes if any of properties matches).
             */
            computedStyles: CSSComputedStyleProperty[];
            /**
             * Whether or not iframes and shadow roots in the same target should be traversed when returning the
             * results (default is false).
             */
            pierce?: boolean;
        }

        interface GetNodesForSubtreeByStyleResponse {
            /**
             * Resulting nodes.
             */
            nodeIds: NodeId[];
        }

        interface GetNodeForLocationRequest {
            /**
             * X coordinate.
             */
            x: integer;
            /**
             * Y coordinate.
             */
            y: integer;
            /**
             * False to skip to the nearest non-UA shadow root ancestor (default: false).
             */
            includeUserAgentShadowDOM?: boolean;
            /**
             * Whether to ignore pointer-events: none on elements and hit test them.
             */
            ignorePointerEventsNone?: boolean;
        }

        interface GetNodeForLocationResponse {
            /**
             * Resulting node.
             */
            backendNodeId: BackendNodeId;
            /**
             * Frame this node belongs to.
             */
            frameId: Page.FrameId;
            /**
             * Id of the node at given coordinates, only when enabled and requested document.
             */
            nodeId?: NodeId;
        }

        interface GetOuterHTMLRequest {
            /**
             * Identifier of the node.
             */
            nodeId?: NodeId;
            /**
             * Identifier of the backend node.
             */
            backendNodeId?: BackendNodeId;
            /**
             * JavaScript object id of the node wrapper.
             */
            objectId?: Runtime.RemoteObjectId;
        }

        interface GetOuterHTMLResponse {
            /**
             * Outer HTML markup.
             */
            outerHTML: string;
        }

        interface GetRelayoutBoundaryRequest {
            /**
             * Id of the node.
             */
            nodeId: NodeId;
        }

        interface GetRelayoutBoundaryResponse {
            /**
             * Relayout boundary node id for the given node.
             */
            nodeId: NodeId;
        }

        interface GetSearchResultsRequest {
            /**
             * Unique search session identifier.
             */
            searchId: string;
            /**
             * Start index of the search result to be returned.
             */
            fromIndex: integer;
            /**
             * End index of the search result to be returned.
             */
            toIndex: integer;
        }

        interface GetSearchResultsResponse {
            /**
             * Ids of the search result nodes.
             */
            nodeIds: NodeId[];
        }

        interface MoveToRequest {
            /**
             * Id of the node to move.
             */
            nodeId: NodeId;
            /**
             * Id of the element to drop the moved node into.
             */
            targetNodeId: NodeId;
            /**
             * Drop node before this one (if absent, the moved node becomes the last child of
             * `targetNodeId`).
             */
            insertBeforeNodeId?: NodeId;
        }

        interface MoveToResponse {
            /**
             * New id of the moved node.
             */
            nodeId: NodeId;
        }

        interface PerformSearchRequest {
            /**
             * Plain text or query selector or XPath search query.
             */
            query: string;
            /**
             * True to search in user agent shadow DOM.
             */
            includeUserAgentShadowDOM?: boolean;
        }

        interface PerformSearchResponse {
            /**
             * Unique search session identifier.
             */
            searchId: string;
            /**
             * Number of search results.
             */
            resultCount: integer;
        }

        interface PushNodeByPathToFrontendRequest {
            /**
             * Path to node in the proprietary format.
             */
            path: string;
        }

        interface PushNodeByPathToFrontendResponse {
            /**
             * Id of the node for given path.
             */
            nodeId: NodeId;
        }

        interface PushNodesByBackendIdsToFrontendRequest {
            /**
             * The array of backend node ids.
             */
            backendNodeIds: BackendNodeId[];
        }

        interface PushNodesByBackendIdsToFrontendResponse {
            /**
             * The array of ids of pushed nodes that correspond to the backend ids specified in
             * backendNodeIds.
             */
            nodeIds: NodeId[];
        }

        interface QuerySelectorRequest {
            /**
             * Id of the node to query upon.
             */
            nodeId: NodeId;
            /**
             * Selector string.
             */
            selector: string;
        }

        interface QuerySelectorResponse {
            /**
             * Query selector result.
             */
            nodeId: NodeId;
        }

        interface QuerySelectorAllRequest {
            /**
             * Id of the node to query upon.
             */
            nodeId: NodeId;
            /**
             * Selector string.
             */
            selector: string;
        }

        interface QuerySelectorAllResponse {
            /**
             * Query selector result.
             */
            nodeIds: NodeId[];
        }

        interface GetTopLayerElementsResponse {
            /**
             * NodeIds of top layer elements
             */
            nodeIds: NodeId[];
        }

        interface RemoveAttributeRequest {
            /**
             * Id of the element to remove attribute from.
             */
            nodeId: NodeId;
            /**
             * Name of the attribute to remove.
             */
            name: string;
        }

        interface RemoveNodeRequest {
            /**
             * Id of the node to remove.
             */
            nodeId: NodeId;
        }

        interface RequestChildNodesRequest {
            /**
             * Id of the node to get children for.
             */
            nodeId: NodeId;
            /**
             * The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
             * entire subtree or provide an integer larger than 0.
             */
            depth?: integer;
            /**
             * Whether or not iframes and shadow roots should be traversed when returning the sub-tree
             * (default is false).
             */
            pierce?: boolean;
        }

        interface RequestNodeRequest {
            /**
             * JavaScript object id to convert into node.
             */
            objectId: Runtime.RemoteObjectId;
        }

        interface RequestNodeResponse {
            /**
             * Node id for given object.
             */
            nodeId: NodeId;
        }

        interface ResolveNodeRequest {
            /**
             * Id of the node to resolve.
             */
            nodeId?: NodeId;
            /**
             * Backend identifier of the node to resolve.
             */
            backendNodeId?: DOM.BackendNodeId;
            /**
             * Symbolic group name that can be used to release multiple objects.
             */
            objectGroup?: string;
            /**
             * Execution context in which to resolve the node.
             */
            executionContextId?: Runtime.ExecutionContextId;
        }

        interface ResolveNodeResponse {
            /**
             * JavaScript object wrapper for given node.
             */
            object: Runtime.RemoteObject;
        }

        interface SetAttributeValueRequest {
            /**
             * Id of the element to set attribute for.
             */
            nodeId: NodeId;
            /**
             * Attribute name.
             */
            name: string;
            /**
             * Attribute value.
             */
            value: string;
        }

        interface SetAttributesAsTextRequest {
            /**
             * Id of the element to set attributes for.
             */
            nodeId: NodeId;
            /**
             * Text with a number of attributes. Will parse this text using HTML parser.
             */
            text: string;
            /**
             * Attribute name to replace with new attributes derived from text in case text parsed
             * successfully.
             */
            name?: string;
        }

        interface SetFileInputFilesRequest {
            /**
             * Array of file paths to set.
             */
            files: string[];
            /**
             * Identifier of the node.
             */
            nodeId?: NodeId;
            /**
             * Identifier of the backend node.
             */
            backendNodeId?: BackendNodeId;
            /**
             * JavaScript object id of the node wrapper.
             */
            objectId?: Runtime.RemoteObjectId;
        }

        interface SetNodeStackTracesEnabledRequest {
            /**
             * Enable or disable.
             */
            enable: boolean;
        }

        interface GetNodeStackTracesRequest {
            /**
             * Id of the node to get stack traces for.
             */
            nodeId: NodeId;
        }

        interface GetNodeStackTracesResponse {
            /**
             * Creation stack trace, if available.
             */
            creation?: Runtime.StackTrace;
        }

        interface GetFileInfoRequest {
            /**
             * JavaScript object id of the node wrapper.
             */
            objectId: Runtime.RemoteObjectId;
        }

        interface GetFileInfoResponse {
            path: string;
        }

        interface SetInspectedNodeRequest {
            /**
             * DOM node id to be accessible by means of $x command line API.
             */
            nodeId: NodeId;
        }

        interface SetNodeNameRequest {
            /**
             * Id of the node to set name for.
             */
            nodeId: NodeId;
            /**
             * New node's name.
             */
            name: string;
        }

        interface SetNodeNameResponse {
            /**
             * New node's id.
             */
            nodeId: NodeId;
        }

        interface SetNodeValueRequest {
            /**
             * Id of the node to set value for.
             */
            nodeId: NodeId;
            /**
             * New node's value.
             */
            value: string;
        }

        interface SetOuterHTMLRequest {
            /**
             * Id of the node to set markup for.
             */
            nodeId: NodeId;
            /**
             * Outer HTML markup to set.
             */
            outerHTML: string;
        }

        interface GetFrameOwnerRequest {
            frameId: Page.FrameId;
        }

        interface GetFrameOwnerResponse {
            /**
             * Resulting node.
             */
            backendNodeId: BackendNodeId;
            /**
             * Id of the node at given coordinates, only when enabled and requested document.
             */
            nodeId?: NodeId;
        }

        interface GetContainerForNodeRequest {
            nodeId: NodeId;
            containerName?: string;
            physicalAxes?: PhysicalAxes;
            logicalAxes?: LogicalAxes;
        }

        interface GetContainerForNodeResponse {
            /**
             * The container node for the given node, or null if not found.
             */
            nodeId?: NodeId;
        }

        interface GetQueryingDescendantsForContainerRequest {
            /**
             * Id of the container node to find querying descendants from.
             */
            nodeId: NodeId;
        }

        interface GetQueryingDescendantsForContainerResponse {
            /**
             * Descendant nodes with container queries against the given container.
             */
            nodeIds: NodeId[];
        }

        /**
         * Fired when `Element`'s attribute is modified.
         */
        interface AttributeModifiedEvent {
            /**
             * Id of the node that has changed.
             */
            nodeId: NodeId;
            /**
             * Attribute name.
             */
            name: string;
            /**
             * Attribute value.
             */
            value: string;
        }

        /**
         * Fired when `Element`'s attribute is removed.
         */
        interface AttributeRemovedEvent {
            /**
             * Id of the node that has changed.
             */
            nodeId: NodeId;
            /**
             * A ttribute name.
             */
            name: string;
        }

        /**
         * Mirrors `DOMCharacterDataModified` event.
         */
        interface CharacterDataModifiedEvent {
            /**
             * Id of the node that has changed.
             */
            nodeId: NodeId;
            /**
             * New text value.
             */
            characterData: string;
        }

        /**
         * Fired when `Container`'s child node count has changed.
         */
        interface ChildNodeCountUpdatedEvent {
            /**
             * Id of the node that has changed.
             */
            nodeId: NodeId;
            /**
             * New node count.
             */
            childNodeCount: integer;
        }

        /**
         * Mirrors `DOMNodeInserted` event.
         */
        interface ChildNodeInsertedEvent {
            /**
             * Id of the node that has changed.
             */
            parentNodeId: NodeId;
            /**
             * Id of the previous sibling.
             */
            previousNodeId: NodeId;
            /**
             * Inserted node data.
             */
            node: Node;
        }

        /**
         * Mirrors `DOMNodeRemoved` event.
         */
        interface ChildNodeRemovedEvent {
            /**
             * Parent id.
             */
            parentNodeId: NodeId;
            /**
             * Id of the node that has been removed.
             */
            nodeId: NodeId;
        }

        /**
         * Called when distribution is changed.
         */
        interface DistributedNodesUpdatedEvent {
            /**
             * Insertion point where distributed nodes were updated.
             */
            insertionPointId: NodeId;
            /**
             * Distributed nodes for given insertion point.
             */
            distributedNodes: BackendNode[];
        }

        /**
         * Fired when `Element`'s inline style is modified via a CSS property modification.
         */
        interface InlineStyleInvalidatedEvent {
            /**
             * Ids of the nodes for which the inline styles have been invalidated.
             */
            nodeIds: NodeId[];
        }

        /**
         * Called when a pseudo element is added to an element.
         */
        interface PseudoElementAddedEvent {
            /**
             * Pseudo element's parent element id.
             */
            parentId: NodeId;
            /**
             * The added pseudo element.
             */
            pseudoElement: Node;
        }

        /**
         * Called when a pseudo element is removed from an element.
         */
        interface PseudoElementRemovedEvent {
            /**
             * Pseudo element's parent element id.
             */
            parentId: NodeId;
            /**
             * The removed pseudo element id.
             */
            pseudoElementId: NodeId;
        }

        /**
         * Fired when backend wants to provide client with the missing DOM structure. This happens upon
         * most of the calls requesting node ids.
         */
        interface SetChildNodesEvent {
            /**
             * Parent node id to populate with children.
             */
            parentId: NodeId;
            /**
             * Child nodes array.
             */
            nodes: Node[];
        }

        /**
         * Called when shadow root is popped from the element.
         */
        interface ShadowRootPoppedEvent {
            /**
             * Host element id.
             */
            hostId: NodeId;
            /**
             * Shadow root id.
             */
            rootId: NodeId;
        }

        /**
         * Called when shadow root is pushed into the element.
         */
        interface ShadowRootPushedEvent {
            /**
             * Host element id.
             */
            hostId: NodeId;
            /**
             * Shadow root.
             */
            root: Node;
        }
    }

    /**
     * DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript
     * execution will stop on these operations as if there was a regular breakpoint set.
     */
    namespace DOMDebugger {

        /**
         * DOM breakpoint type.
         */
        type DOMBreakpointType = ('subtree-modified' | 'attribute-modified' | 'node-removed');

        /**
         * CSP Violation type.
         */
        type CSPViolationType = ('trustedtype-sink-violation' | 'trustedtype-policy-violation');

        /**
         * Object event listener.
         */
        interface EventListener {
            /**
             * `EventListener`'s type.
             */
            type: string;
            /**
             * `EventListener`'s useCapture.
             */
            useCapture: boolean;
            /**
             * `EventListener`'s passive flag.
             */
            passive: boolean;
            /**
             * `EventListener`'s once flag.
             */
            once: boolean;
            /**
             * Script id of the handler code.
             */
            scriptId: Runtime.ScriptId;
            /**
             * Line number in the script (0-based).
             */
            lineNumber: integer;
            /**
             * Column number in the script (0-based).
             */
            columnNumber: integer;
            /**
             * Event handler function value.
             */
            handler?: Runtime.RemoteObject;
            /**
             * Event original handler function value.
             */
            originalHandler?: Runtime.RemoteObject;
            /**
             * Node the listener is added to (if any).
             */
            backendNodeId?: DOM.BackendNodeId;
        }

        interface GetEventListenersRequest {
            /**
             * Identifier of the object to return listeners for.
             */
            objectId: Runtime.RemoteObjectId;
            /**
             * The maximum depth at which Node children should be retrieved, defaults to 1. Use -1 for the
             * entire subtree or provide an integer larger than 0.
             */
            depth?: integer;
            /**
             * Whether or not iframes and shadow roots should be traversed when returning the subtree
             * (default is false). Reports listeners for all contexts if pierce is enabled.
             */
            pierce?: boolean;
        }

        interface GetEventListenersResponse {
            /**
             * Array of relevant listeners.
             */
            listeners: EventListener[];
        }

        interface RemoveDOMBreakpointRequest {
            /**
             * Identifier of the node to remove breakpoint from.
             */
            nodeId: DOM.NodeId;
            /**
             * Type of the breakpoint to remove.
             */
            type: DOMBreakpointType;
        }

        interface RemoveEventListenerBreakpointRequest {
            /**
             * Event name.
             */
            eventName: string;
            /**
             * EventTarget interface name.
             */
            targetName?: string;
        }

        interface RemoveInstrumentationBreakpointRequest {
            /**
             * Instrumentation name to stop on.
             */
            eventName: string;
        }

        interface RemoveXHRBreakpointRequest {
            /**
             * Resource URL substring.
             */
            url: string;
        }

        interface SetBreakOnCSPViolationRequest {
            /**
             * CSP Violations to stop upon.
             */
            violationTypes: CSPViolationType[];
        }

        interface SetDOMBreakpointRequest {
            /**
             * Identifier of the node to set breakpoint on.
             */
            nodeId: DOM.NodeId;
            /**
             * Type of the operation to stop upon.
             */
            type: DOMBreakpointType;
        }

        interface SetEventListenerBreakpointRequest {
            /**
             * DOM Event name to stop on (any DOM event will do).
             */
            eventName: string;
            /**
             * EventTarget interface name to stop on. If equal to `"*"` or not provided, will stop on any
             * EventTarget.
             */
            targetName?: string;
        }

        interface SetInstrumentationBreakpointRequest {
            /**
             * Instrumentation name to stop on.
             */
            eventName: string;
        }

        interface SetXHRBreakpointRequest {
            /**
             * Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
             */
            url: string;
        }
    }

    /**
     * EventBreakpoints permits setting breakpoints on particular operations and
     * events in targets that run JavaScript but do not have a DOM.
     * JavaScript execution will stop on these operations as if there was a regular
     * breakpoint set.
     */
    namespace EventBreakpoints {

        interface SetInstrumentationBreakpointRequest {
            /**
             * Instrumentation name to stop on.
             */
            eventName: string;
        }

        interface RemoveInstrumentationBreakpointRequest {
            /**
             * Instrumentation name to stop on.
             */
            eventName: string;
        }
    }

    /**
     * This domain facilitates obtaining document snapshots with DOM, layout, and style information.
     */
    namespace DOMSnapshot {

        /**
         * A Node in the DOM tree.
         */
        interface DOMNode {
            /**
             * `Node`'s nodeType.
             */
            nodeType: integer;
            /**
             * `Node`'s nodeName.
             */
            nodeName: string;
            /**
             * `Node`'s nodeValue.
             */
            nodeValue: string;
            /**
             * Only set for textarea elements, contains the text value.
             */
            textValue?: string;
            /**
             * Only set for input elements, contains the input's associated text value.
             */
            inputValue?: string;
            /**
             * Only set for radio and checkbox input elements, indicates if the element has been checked
             */
            inputChecked?: boolean;
            /**
             * Only set for option elements, indicates if the element has been selected
             */
            optionSelected?: boolean;
            /**
             * `Node`'s id, corresponds to DOM.Node.backendNodeId.
             */
            backendNodeId: DOM.BackendNodeId;
            /**
             * The indexes of the node's child nodes in the `domNodes` array returned by `getSnapshot`, if
             * any.
             */
            childNodeIndexes?: integer[];
            /**
             * Attributes of an `Element` node.
             */
            attributes?: NameValue[];
            /**
             * Indexes of pseudo elements associated with this node in the `domNodes` array returned by
             * `getSnapshot`, if any.
             */
            pseudoElementIndexes?: integer[];
            /**
             * The index of the node's related layout tree node in the `layoutTreeNodes` array returned by
             * `getSnapshot`, if any.
             */
            layoutNodeIndex?: integer;
            /**
             * Document URL that `Document` or `FrameOwner` node points to.
             */
            documentURL?: string;
            /**
             * Base URL that `Document` or `FrameOwner` node uses for URL completion.
             */
            baseURL?: string;
            /**
             * Only set for documents, contains the document's content language.
             */
            contentLanguage?: string;
            /**
             * Only set for documents, contains the document's character set encoding.
             */
            documentEncoding?: string;
            /**
             * `DocumentType` node's publicId.
             */
            publicId?: string;
            /**
             * `DocumentType` node's systemId.
             */
            systemId?: string;
            /**
             * Frame ID for frame owner elements and also for the document node.
             */
            frameId?: Page.FrameId;
            /**
             * The index of a frame owner element's content document in the `domNodes` array returned by
             * `getSnapshot`, if any.
             */
            contentDocumentIndex?: integer;
            /**
             * Type of a pseudo element node.
             */
            pseudoType?: DOM.PseudoType;
            /**
             * Shadow root type.
             */
            shadowRootType?: DOM.ShadowRootType;
            /**
             * Whether this DOM node responds to mouse clicks. This includes nodes that have had click
             * event listeners attached via JavaScript as well as anchor tags that naturally navigate when
             * clicked.
             */
            isClickable?: boolean;
            /**
             * Details of the node's event listeners, if any.
             */
            eventListeners?: DOMDebugger.EventListener[];
            /**
             * The selected url for nodes with a srcset attribute.
             */
            currentSourceURL?: string;
            /**
             * The url of the script (if any) that generates this node.
             */
            originURL?: string;
            /**
             * Scroll offsets, set when this node is a Document.
             */
            scrollOffsetX?: number;
            scrollOffsetY?: number;
        }

        /**
         * Details of post layout rendered text positions. The exact layout should not be regarded as
         * stable and may change between versions.
         */
        interface InlineTextBox {
            /**
             * The bounding box in document coordinates. Note that scroll offset of the document is ignored.
             */
            boundingBox: DOM.Rect;
            /**
             * The starting index in characters, for this post layout textbox substring. Characters that
             * would be represented as a surrogate pair in UTF-16 have length 2.
             */
            startCharacterIndex: integer;
            /**
             * The number of characters in this post layout textbox substring. Characters that would be
             * represented as a surrogate pair in UTF-16 have length 2.
             */
            numCharacters: integer;
        }

        /**
         * Details of an element in the DOM tree with a LayoutObject.
         */
        interface LayoutTreeNode {
            /**
             * The index of the related DOM node in the `domNodes` array returned by `getSnapshot`.
             */
            domNodeIndex: integer;
            /**
             * The bounding box in document coordinates. Note that scroll offset of the document is ignored.
             */
            boundingBox: DOM.Rect;
            /**
             * Contents of the LayoutText, if any.
             */
            layoutText?: string;
            /**
             * The post-layout inline text nodes, if any.
             */
            inlineTextNodes?: InlineTextBox[];
            /**
             * Index into the `computedStyles` array returned by `getSnapshot`.
             */
            styleIndex?: integer;
            /**
             * Global paint order index, which is determined by the stacking order of the nodes. Nodes
             * that are painted together will have the same index. Only provided if includePaintOrder in
             * getSnapshot was true.
             */
            paintOrder?: integer;
            /**
             * Set to true to indicate the element begins a new stacking context.
             */
            isStackingContext?: boolean;
        }

        /**
         * A subset of the full ComputedStyle as defined by the request whitelist.
         */
        interface ComputedStyle {
            /**
             * Name/value pairs of computed style properties.
             */
            properties: NameValue[];
        }

        /**
         * A name/value pair.
         */
        interface NameValue {
            /**
             * Attribute/property name.
             */
            name: string;
            /**
             * Attribute/property value.
             */
            value: string;
        }

        /**
         * Index of the string in the strings table.
         */
        type StringIndex = integer;

        /**
         * Index of the string in the strings table.
         */
        type ArrayOfStrings = StringIndex[];

        /**
         * Data that is only present on rare nodes.
         */
        interface RareStringData {
            index: integer[];
            value: StringIndex[];
        }

        interface RareBooleanData {
            index: integer[];
        }

        interface RareIntegerData {
            index: integer[];
            value: integer[];
        }

        type Rectangle = number[];

        /**
         * Document snapshot.
         */
        interface DocumentSnapshot {
            /**
             * Document URL that `Document` or `FrameOwner` node points to.
             */
            documentURL: StringIndex;
            /**
             * Document title.
             */
            title: StringIndex;
            /**
             * Base URL that `Document` or `FrameOwner` node uses for URL completion.
             */
            baseURL: StringIndex;
            /**
             * Contains the document's content language.
             */
            contentLanguage: StringIndex;
            /**
             * Contains the document's character set encoding.
             */
            encodingName: StringIndex;
            /**
             * `DocumentType` node's publicId.
             */
            publicId: StringIndex;
            /**
             * `DocumentType` node's systemId.
             */
            systemId: StringIndex;
            /**
             * Frame ID for frame owner elements and also for the document node.
             */
            frameId: StringIndex;
            /**
             * A table with dom nodes.
             */
            nodes: NodeTreeSnapshot;
            /**
             * The nodes in the layout tree.
             */
            layout: LayoutTreeSnapshot;
            /**
             * The post-layout inline text nodes.
             */
            textBoxes: TextBoxSnapshot;
            /**
             * Horizontal scroll offset.
             */
            scrollOffsetX?: number;
            /**
             * Vertical scroll offset.
             */
            scrollOffsetY?: number;
            /**
             * Document content width.
             */
            contentWidth?: number;
            /**
             * Document content height.
             */
            contentHeight?: number;
        }

        /**
         * Table containing nodes.
         */
        interface NodeTreeSnapshot {
            /**
             * Parent node index.
             */
            parentIndex?: integer[];
            /**
             * `Node`'s nodeType.
             */
            nodeType?: integer[];
            /**
             * Type of the shadow root the `Node` is in. String values are equal to the `ShadowRootType` enum.
             */
            shadowRootType?: RareStringData;
            /**
             * `Node`'s nodeName.
             */
            nodeName?: StringIndex[];
            /**
             * `Node`'s nodeValue.
             */
            nodeValue?: StringIndex[];
            /**
             * `Node`'s id, corresponds to DOM.Node.backendNodeId.
             */
            backendNodeId?: DOM.BackendNodeId[];
            /**
             * Attributes of an `Element` node. Flatten name, value pairs.
             */
            attributes?: ArrayOfStrings[];
            /**
             * Only set for textarea elements, contains the text value.
             */
            textValue?: RareStringData;
            /**
             * Only set for input elements, contains the input's associated text value.
             */
            inputValue?: RareStringData;
            /**
             * Only set for radio and checkbox input elements, indicates if the element has been checked
             */
            inputChecked?: RareBooleanData;
            /**
             * Only set for option elements, indicates if the element has been selected
             */
            optionSelected?: RareBooleanData;
            /**
             * The index of the document in the list of the snapshot documents.
             */
            contentDocumentIndex?: RareIntegerData;
            /**
             * Type of a pseudo element node.
             */
            pseudoType?: RareStringData;
            /**
             * Pseudo element identifier for this node. Only present if there is a
             * valid pseudoType.
             */
            pseudoIdentifier?: RareStringData;
            /**
             * Whether this DOM node responds to mouse clicks. This includes nodes that have had click
             * event listeners attached via JavaScript as well as anchor tags that naturally navigate when
             * clicked.
             */
            isClickable?: RareBooleanData;
            /**
             * The selected url for nodes with a srcset attribute.
             */
            currentSourceURL?: RareStringData;
            /**
             * The url of the script (if any) that generates this node.
             */
            originURL?: RareStringData;
        }

        /**
         * Table of details of an element in the DOM tree with a LayoutObject.
         */
        interface LayoutTreeSnapshot {
            /**
             * Index of the corresponding node in the `NodeTreeSnapshot` array returned by `captureSnapshot`.
             */
            nodeIndex: integer[];
            /**
             * Array of indexes specifying computed style strings, filtered according to the `computedStyles` parameter passed to `captureSnapshot`.
             */
            styles: ArrayOfStrings[];
            /**
             * The absolute position bounding box.
             */
            bounds: Rectangle[];
            /**
             * Contents of the LayoutText, if any.
             */
            text: StringIndex[];
            /**
             * Stacking context information.
             */
            stackingContexts: RareBooleanData;
            /**
             * Global paint order index, which is determined by the stacking order of the nodes. Nodes
             * that are painted together will have the same index. Only provided if includePaintOrder in
             * captureSnapshot was true.
             */
            paintOrders?: integer[];
            /**
             * The offset rect of nodes. Only available when includeDOMRects is set to true
             */
            offsetRects?: Rectangle[];
            /**
             * The scroll rect of nodes. Only available when includeDOMRects is set to true
             */
            scrollRects?: Rectangle[];
            /**
             * The client rect of nodes. Only available when includeDOMRects is set to true
             */
            clientRects?: Rectangle[];
            /**
             * The list of background colors that are blended with colors of overlapping elements.
             */
            blendedBackgroundColors?: StringIndex[];
            /**
             * The list of computed text opacities.
             */
            textColorOpacities?: number[];
        }

        /**
         * Table of details of the post layout rendered text positions. The exact layout should not be regarded as
         * stable and may change between versions.
         */
        interface TextBoxSnapshot {
            /**
             * Index of the layout tree node that owns this box collection.
             */
            layoutIndex: integer[];
            /**
             * The absolute position bounding box.
             */
            bounds: Rectangle[];
            /**
             * The starting index in characters, for this post layout textbox substring. Characters that
             * would be represented as a surrogate pair in UTF-16 have length 2.
             */
            start: integer[];
            /**
             * The number of characters in this post layout textbox substring. Characters that would be
             * represented as a surrogate pair in UTF-16 have length 2.
             */
            length: integer[];
        }

        interface GetSnapshotRequest {
            /**
             * Whitelist of computed styles to return.
             */
            computedStyleWhitelist: string[];
            /**
             * Whether or not to retrieve details of DOM listeners (default false).
             */
            includeEventListeners?: boolean;
            /**
             * Whether to determine and include the paint order index of LayoutTreeNodes (default false).
             */
            includePaintOrder?: boolean;
            /**
             * Whether to include UA shadow tree in the snapshot (default false).
             */
            includeUserAgentShadowTree?: boolean;
        }

        interface GetSnapshotResponse {
            /**
             * The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.
             */
            domNodes: DOMNode[];
            /**
             * The nodes in the layout tree.
             */
            layoutTreeNodes: LayoutTreeNode[];
            /**
             * Whitelisted ComputedStyle properties for each node in the layout tree.
             */
            computedStyles: ComputedStyle[];
        }

        interface CaptureSnapshotRequest {
            /**
             * Whitelist of computed styles to return.
             */
            computedStyles: string[];
            /**
             * Whether to include layout object paint orders into the snapshot.
             */
            includePaintOrder?: boolean;
            /**
             * Whether to include DOM rectangles (offsetRects, clientRects, scrollRects) into the snapshot
             */
            includeDOMRects?: boolean;
            /**
             * Whether to include blended background colors in the snapshot (default: false).
             * Blended background color is achieved by blending background colors of all elements
             * that overlap with the current element.
             */
            includeBlendedBackgroundColors?: boolean;
            /**
             * Whether to include text color opacity in the snapshot (default: false).
             * An element might have the opacity property set that affects the text color of the element.
             * The final text color opacity is computed based on the opacity of all overlapping elements.
             */
            includeTextColorOpacities?: boolean;
        }

        interface CaptureSnapshotResponse {
            /**
             * The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.
             */
            documents: DocumentSnapshot[];
            /**
             * Shared string table that all string properties refer to with indexes.
             */
            strings: string[];
        }
    }

    /**
     * Query and modify DOM storage.
     */
    namespace DOMStorage {

        type SerializedStorageKey = string;

        /**
         * DOM Storage identifier.
         */
        interface StorageId {
            /**
             * Security origin for the storage.
             */
            securityOrigin?: string;
            /**
             * Represents a key by which DOM Storage keys its CachedStorageAreas
             */
            storageKey?: SerializedStorageKey;
            /**
             * Whether the storage is local storage (not session storage).
             */
            isLocalStorage: boolean;
        }

        /**
         * DOM Storage item.
         */
        type Item = string[];

        interface ClearRequest {
            storageId: StorageId;
        }

        interface GetDOMStorageItemsRequest {
            storageId: StorageId;
        }

        interface GetDOMStorageItemsResponse {
            entries: Item[];
        }

        interface RemoveDOMStorageItemRequest {
            storageId: StorageId;
            key: string;
        }

        interface SetDOMStorageItemRequest {
            storageId: StorageId;
            key: string;
            value: string;
        }

        interface DomStorageItemAddedEvent {
            storageId: StorageId;
            key: string;
            newValue: string;
        }

        interface DomStorageItemRemovedEvent {
            storageId: StorageId;
            key: string;
        }

        interface DomStorageItemUpdatedEvent {
            storageId: StorageId;
            key: string;
            oldValue: string;
            newValue: string;
        }

        interface DomStorageItemsClearedEvent {
            storageId: StorageId;
        }
    }

    namespace Database {

        /**
         * Unique identifier of Database object.
         */
        type DatabaseId = string;

        /**
         * Database object.
         */
        interface Database {
            /**
             * Database ID.
             */
            id: DatabaseId;
            /**
             * Database domain.
             */
            domain: string;
            /**
             * Database name.
             */
            name: string;
            /**
             * Database version.
             */
            version: string;
        }

        /**
         * Database error.
         */
        interface Error {
            /**
             * Error message.
             */
            message: string;
            /**
             * Error code.
             */
            code: integer;
        }

        interface ExecuteSQLRequest {
            databaseId: DatabaseId;
            query: string;
        }

        interface ExecuteSQLResponse {
            columnNames?: string[];
            values?: any[];
            sqlError?: Error;
        }

        interface GetDatabaseTableNamesRequest {
            databaseId: DatabaseId;
        }

        interface GetDatabaseTableNamesResponse {
            tableNames: string[];
        }

        interface AddDatabaseEvent {
            database: Database;
        }
    }

    namespace DeviceOrientation {

        interface SetDeviceOrientationOverrideRequest {
            /**
             * Mock alpha
             */
            alpha: number;
            /**
             * Mock beta
             */
            beta: number;
            /**
             * Mock gamma
             */
            gamma: number;
        }
    }

    /**
     * This domain emulates different environments for the page.
     */
    namespace Emulation {

        const enum ScreenOrientationType {
            PortraitPrimary = 'portraitPrimary',
            PortraitSecondary = 'portraitSecondary',
            LandscapePrimary = 'landscapePrimary',
            LandscapeSecondary = 'landscapeSecondary',
        }

        /**
         * Screen orientation.
         */
        interface ScreenOrientation {
            /**
             * Orientation type. (ScreenOrientationType enum)
             */
            type: ('portraitPrimary' | 'portraitSecondary' | 'landscapePrimary' | 'landscapeSecondary');
            /**
             * Orientation angle.
             */
            angle: integer;
        }

        const enum DisplayFeatureOrientation {
            Vertical = 'vertical',
            Horizontal = 'horizontal',
        }

        interface DisplayFeature {
            /**
             * Orientation of a display feature in relation to screen (DisplayFeatureOrientation enum)
             */
            orientation: ('vertical' | 'horizontal');
            /**
             * The offset from the screen origin in either the x (for vertical
             * orientation) or y (for horizontal orientation) direction.
             */
            offset: integer;
            /**
             * A display feature may mask content such that it is not physically
             * displayed - this length along with the offset describes this area.
             * A display feature that only splits content will have a 0 mask_length.
             */
            maskLength: integer;
        }

        interface MediaFeature {
            name: string;
            value: string;
        }

        /**
         * advance: If the scheduler runs out of immediate work, the virtual time base may fast forward to
         * allow the next delayed task (if any) to run; pause: The virtual time base may not advance;
         * pauseIfNetworkFetchesPending: The virtual time base may not advance if there are any pending
         * resource fetches.
         */
        type VirtualTimePolicy = ('advance' | 'pause' | 'pauseIfNetworkFetchesPending');

        /**
         * Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
         */
        interface UserAgentBrandVersion {
            brand: string;
            version: string;
        }

        /**
         * Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
         * Missing optional values will be filled in by the target with what it would normally use.
         */
        interface UserAgentMetadata {
            /**
             * Brands appearing in Sec-CH-UA.
             */
            brands?: UserAgentBrandVersion[];
            /**
             * Brands appearing in Sec-CH-UA-Full-Version-List.
             */
            fullVersionList?: UserAgentBrandVersion[];
            fullVersion?: string;
            platform: string;
            platformVersion: string;
            architecture: string;
            model: string;
            mobile: boolean;
            bitness?: string;
            wow64?: boolean;
        }

        /**
         * Enum of image types that can be disabled.
         */
        type DisabledImageType = ('avif' | 'webp');

        interface CanEmulateResponse {
            /**
             * True if emulation is supported.
             */
            result: boolean;
        }

        interface SetFocusEmulationEnabledRequest {
            /**
             * Whether to enable to disable focus emulation.
             */
            enabled: boolean;
        }

        interface SetAutoDarkModeOverrideRequest {
            /**
             * Whether to enable or disable automatic dark mode.
             * If not specified, any existing override will be cleared.
             */
            enabled?: boolean;
        }

        interface SetCPUThrottlingRateRequest {
            /**
             * Throttling rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc).
             */
            rate: number;
        }

        interface SetDefaultBackgroundColorOverrideRequest {
            /**
             * RGBA of the default background color. If not specified, any existing override will be
             * cleared.
             */
            color?: DOM.RGBA;
        }

        interface SetDeviceMetricsOverrideRequest {
            /**
             * Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.
             */
            width: integer;
            /**
             * Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.
             */
            height: integer;
            /**
             * Overriding device scale factor value. 0 disables the override.
             */
            deviceScaleFactor: number;
            /**
             * Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text
             * autosizing and more.
             */
            mobile: boolean;
            /**
             * Scale to apply to resulting view image.
             */
            scale?: number;
            /**
             * Overriding screen width value in pixels (minimum 0, maximum 10000000).
             */
            screenWidth?: integer;
            /**
             * Overriding screen height value in pixels (minimum 0, maximum 10000000).
             */
            screenHeight?: integer;
            /**
             * Overriding view X position on screen in pixels (minimum 0, maximum 10000000).
             */
            positionX?: integer;
            /**
             * Overriding view Y position on screen in pixels (minimum 0, maximum 10000000).
             */
            positionY?: integer;
            /**
             * Do not set visible view size, rely upon explicit setVisibleSize call.
             */
            dontSetVisibleSize?: boolean;
            /**
             * Screen orientation override.
             */
            screenOrientation?: ScreenOrientation;
            /**
             * If set, the visible area of the page will be overridden to this viewport. This viewport
             * change is not observed by the page, e.g. viewport-relative elements do not change positions.
             */
            viewport?: Page.Viewport;
            /**
             * If set, the display feature of a multi-segment screen. If not set, multi-segment support
             * is turned-off.
             */
            displayFeature?: DisplayFeature;
        }

        interface SetScrollbarsHiddenRequest {
            /**
             * Whether scrollbars should be always hidden.
             */
            hidden: boolean;
        }

        interface SetDocumentCookieDisabledRequest {
            /**
             * Whether document.coookie API should be disabled.
             */
            disabled: boolean;
        }

        const enum SetEmitTouchEventsForMouseRequestConfiguration {
            Mobile = 'mobile',
            Desktop = 'desktop',
        }

        interface SetEmitTouchEventsForMouseRequest {
            /**
             * Whether touch emulation based on mouse input should be enabled.
             */
            enabled: boolean;
            /**
             * Touch/gesture events configuration. Default: current platform. (SetEmitTouchEventsForMouseRequestConfiguration enum)
             */
            configuration?: ('mobile' | 'desktop');
        }

        interface SetEmulatedMediaRequest {
            /**
             * Media type to emulate. Empty string disables the override.
             */
            media?: string;
            /**
             * Media features to emulate.
             */
            features?: MediaFeature[];
        }

        const enum SetEmulatedVisionDeficiencyRequestType {
            None = 'none',
            BlurredVision = 'blurredVision',
            ReducedContrast = 'reducedContrast',
            Achromatopsia = 'achromatopsia',
            Deuteranopia = 'deuteranopia',
            Protanopia = 'protanopia',
            Tritanopia = 'tritanopia',
        }

        interface SetEmulatedVisionDeficiencyRequest {
            /**
             * Vision deficiency to emulate. Order: best-effort emulations come first, followed by any
             * physiologically accurate emulations for medically recognized color vision deficiencies. (SetEmulatedVisionDeficiencyRequestType enum)
             */
            type: ('none' | 'blurredVision' | 'reducedContrast' | 'achromatopsia' | 'deuteranopia' | 'protanopia' | 'tritanopia');
        }

        interface SetGeolocationOverrideRequest {
            /**
             * Mock latitude
             */
            latitude?: number;
            /**
             * Mock longitude
             */
            longitude?: number;
            /**
             * Mock accuracy
             */
            accuracy?: number;
        }

        interface SetIdleOverrideRequest {
            /**
             * Mock isUserActive
             */
            isUserActive: boolean;
            /**
             * Mock isScreenUnlocked
             */
            isScreenUnlocked: boolean;
        }

        interface SetNavigatorOverridesRequest {
            /**
             * The platform navigator.platform should return.
             */
            platform: string;
        }

        interface SetPageScaleFactorRequest {
            /**
             * Page scale factor.
             */
            pageScaleFactor: number;
        }

        interface SetScriptExecutionDisabledRequest {
            /**
             * Whether script execution should be disabled in the page.
             */
            value: boolean;
        }

        interface SetTouchEmulationEnabledRequest {
            /**
             * Whether the touch event emulation should be enabled.
             */
            enabled: boolean;
            /**
             * Maximum touch points supported. Defaults to one.
             */
            maxTouchPoints?: integer;
        }

        interface SetVirtualTimePolicyRequest {
            policy: VirtualTimePolicy;
            /**
             * If set, after this many virtual milliseconds have elapsed virtual time will be paused and a
             * virtualTimeBudgetExpired event is sent.
             */
            budget?: number;
            /**
             * If set this specifies the maximum number of tasks that can be run before virtual is forced
             * forwards to prevent deadlock.
             */
            maxVirtualTimeTaskStarvationCount?: integer;
            /**
             * If set, base::Time::Now will be overridden to initially return this value.
             */
            initialVirtualTime?: Network.TimeSinceEpoch;
        }

        interface SetVirtualTimePolicyResponse {
            /**
             * Absolute timestamp at which virtual time was first enabled (up time in milliseconds).
             */
            virtualTimeTicksBase: number;
        }

        interface SetLocaleOverrideRequest {
            /**
             * ICU style C locale (e.g. "en_US"). If not specified or empty, disables the override and
             * restores default host system locale.
             */
            locale?: string;
        }

        interface SetTimezoneOverrideRequest {
            /**
             * The timezone identifier. If empty, disables the override and
             * restores default host system timezone.
             */
            timezoneId: string;
        }

        interface SetVisibleSizeRequest {
            /**
             * Frame width (DIP).
             */
            width: integer;
            /**
             * Frame height (DIP).
             */
            height: integer;
        }

        interface SetDisabledImageTypesRequest {
            /**
             * Image types to disable.
             */
            imageTypes: DisabledImageType[];
        }

        interface SetHardwareConcurrencyOverrideRequest {
            /**
             * Hardware concurrency to report
             */
            hardwareConcurrency: integer;
        }

        interface SetUserAgentOverrideRequest {
            /**
             * User agent to use.
             */
            userAgent: string;
            /**
             * Browser langugage to emulate.
             */
            acceptLanguage?: string;
            /**
             * The platform navigator.platform should return.
             */
            platform?: string;
            /**
             * To be sent in Sec-CH-UA-* headers and returned in navigator.userAgentData
             */
            userAgentMetadata?: UserAgentMetadata;
        }

        interface SetAutomationOverrideRequest {
            /**
             * Whether the override should be enabled.
             */
            enabled: boolean;
        }
    }

    /**
     * This domain provides experimental commands only supported in headless mode.
     */
    namespace HeadlessExperimental {

        const enum ScreenshotParamsFormat {
            Jpeg = 'jpeg',
            Png = 'png',
            Webp = 'webp',
        }

        /**
         * Encoding options for a screenshot.
         */
        interface ScreenshotParams {
            /**
             * Image compression format (defaults to png). (ScreenshotParamsFormat enum)
             */
            format?: ('jpeg' | 'png' | 'webp');
            /**
             * Compression quality from range [0..100] (jpeg and webp only).
             */
            quality?: integer;
            /**
             * Optimize image encoding for speed, not for resulting size (defaults to false)
             */
            optimizeForSpeed?: boolean;
        }

        interface BeginFrameRequest {
            /**
             * Timestamp of this BeginFrame in Renderer TimeTicks (milliseconds of uptime). If not set,
             * the current time will be used.
             */
            frameTimeTicks?: number;
            /**
             * The interval between BeginFrames that is reported to the compositor, in milliseconds.
             * Defaults to a 60 frames/second interval, i.e. about 16.666 milliseconds.
             */
            interval?: number;
            /**
             * Whether updates should not be committed and drawn onto the display. False by default. If
             * true, only side effects of the BeginFrame will be run, such as layout and animations, but
             * any visual updates may not be visible on the display or in screenshots.
             */
            noDisplayUpdates?: boolean;
            /**
             * If set, a screenshot of the frame will be captured and returned in the response. Otherwise,
             * no screenshot will be captured. Note that capturing a screenshot can fail, for example,
             * during renderer initialization. In such a case, no screenshot data will be returned.
             */
            screenshot?: ScreenshotParams;
        }

        interface BeginFrameResponse {
            /**
             * Whether the BeginFrame resulted in damage and, thus, a new frame was committed to the
             * display. Reported for diagnostic uses, may be removed in the future.
             */
            hasDamage: boolean;
            /**
             * Base64-encoded image data of the screenshot, if one was requested and successfully taken. (Encoded as a base64 string when passed over JSON)
             */
            screenshotData?: string;
        }
    }

    /**
     * Input/Output operations for streams produced by DevTools.
     */
    namespace IO {

        /**
         * This is either obtained from another method or specified as `blob:<uuid>` where
         * `<uuid>` is an UUID of a Blob.
         */
        type StreamHandle = string;

        interface CloseRequest {
            /**
             * Handle of the stream to close.
             */
            handle: StreamHandle;
        }

        interface ReadRequest {
            /**
             * Handle of the stream to read.
             */
            handle: StreamHandle;
            /**
             * Seek to the specified offset before reading (if not specificed, proceed with offset
             * following the last read). Some types of streams may only support sequential reads.
             */
            offset?: integer;
            /**
             * Maximum number of bytes to read (left upon the agent discretion if not specified).
             */
            size?: integer;
        }

        interface ReadResponse {
            /**
             * Set if the data is base64-encoded
             */
            base64Encoded?: boolean;
            /**
             * Data that were read.
             */
            data: string;
            /**
             * Set if the end-of-file condition occurred while reading.
             */
            eof: boolean;
        }

        interface ResolveBlobRequest {
            /**
             * Object id of a Blob object wrapper.
             */
            objectId: Runtime.RemoteObjectId;
        }

        interface ResolveBlobResponse {
            /**
             * UUID of the specified Blob.
             */
            uuid: string;
        }
    }

    namespace IndexedDB {

        /**
         * Database with an array of object stores.
         */
        interface DatabaseWithObjectStores {
            /**
             * Database name.
             */
            name: string;
            /**
             * Database version (type is not 'integer', as the standard
             * requires the version number to be 'unsigned long long')
             */
            version: number;
            /**
             * Object stores in this database.
             */
            objectStores: ObjectStore[];
        }

        /**
         * Object store.
         */
        interface ObjectStore {
            /**
             * Object store name.
             */
            name: string;
            /**
             * Object store key path.
             */
            keyPath: KeyPath;
            /**
             * If true, object store has auto increment flag set.
             */
            autoIncrement: boolean;
            /**
             * Indexes in this object store.
             */
            indexes: ObjectStoreIndex[];
        }

        /**
         * Object store index.
         */
        interface ObjectStoreIndex {
            /**
             * Index name.
             */
            name: string;
            /**
             * Index key path.
             */
            keyPath: KeyPath;
            /**
             * If true, index is unique.
             */
            unique: boolean;
            /**
             * If true, index allows multiple entries for a key.
             */
            multiEntry: boolean;
        }

        const enum KeyType {
            Number = 'number',
            String = 'string',
            Date = 'date',
            Array = 'array',
        }

        /**
         * Key.
         */
        interface Key {
            /**
             * Key type. (KeyType enum)
             */
            type: ('number' | 'string' | 'date' | 'array');
            /**
             * Number value.
             */
            number?: number;
            /**
             * String value.
             */
            string?: string;
            /**
             * Date value.
             */
            date?: number;
            /**
             * Array value.
             */
            array?: Key[];
        }

        /**
         * Key range.
         */
        interface KeyRange {
            /**
             * Lower bound.
             */
            lower?: Key;
            /**
             * Upper bound.
             */
            upper?: Key;
            /**
             * If true lower bound is open.
             */
            lowerOpen: boolean;
            /**
             * If true upper bound is open.
             */
            upperOpen: boolean;
        }

        /**
         * Data entry.
         */
        interface DataEntry {
            /**
             * Key object.
             */
            key: Runtime.RemoteObject;
            /**
             * Primary key object.
             */
            primaryKey: Runtime.RemoteObject;
            /**
             * Value object.
             */
            value: Runtime.RemoteObject;
        }

        const enum KeyPathType {
            Null = 'null',
            String = 'string',
            Array = 'array',
        }

        /**
         * Key path.
         */
        interface KeyPath {
            /**
             * Key path type. (KeyPathType enum)
             */
            type: ('null' | 'string' | 'array');
            /**
             * String value.
             */
            string?: string;
            /**
             * Array value.
             */
            array?: string[];
        }

        interface ClearObjectStoreRequest {
            /**
             * At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
             * Security origin.
             */
            securityOrigin?: string;
            /**
             * Storage key.
             */
            storageKey?: string;
            /**
             * Storage bucket. If not specified, it uses the default bucket.
             */
            storageBucket?: Storage.StorageBucket;
            /**
             * Database name.
             */
            databaseName: string;
            /**
             * Object store name.
             */
            objectStoreName: string;
        }

        interface DeleteDatabaseRequest {
            /**
             * At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
             * Security origin.
             */
            securityOrigin?: string;
            /**
             * Storage key.
             */
            storageKey?: string;
            /**
             * Storage bucket. If not specified, it uses the default bucket.
             */
            storageBucket?: Storage.StorageBucket;
            /**
             * Database name.
             */
            databaseName: string;
        }

        interface DeleteObjectStoreEntriesRequest {
            /**
             * At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
             * Security origin.
             */
            securityOrigin?: string;
            /**
             * Storage key.
             */
            storageKey?: string;
            /**
             * Storage bucket. If not specified, it uses the default bucket.
             */
            storageBucket?: Storage.StorageBucket;
            databaseName: string;
            objectStoreName: string;
            /**
             * Range of entry keys to delete
             */
            keyRange: KeyRange;
        }

        interface RequestDataRequest {
            /**
             * At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
             * Security origin.
             */
            securityOrigin?: string;
            /**
             * Storage key.
             */
            storageKey?: string;
            /**
             * Storage bucket. If not specified, it uses the default bucket.
             */
            storageBucket?: Storage.StorageBucket;
            /**
             * Database name.
             */
            databaseName: string;
            /**
             * Object store name.
             */
            objectStoreName: string;
            /**
             * Index name, empty string for object store data requests.
             */
            indexName: string;
            /**
             * Number of records to skip.
             */
            skipCount: integer;
            /**
             * Number of records to fetch.
             */
            pageSize: integer;
            /**
             * Key range.
             */
            keyRange?: KeyRange;
        }

        interface RequestDataResponse {
            /**
             * Array of object store data entries.
             */
            objectStoreDataEntries: DataEntry[];
            /**
             * If true, there are more entries to fetch in the given range.
             */
            hasMore: boolean;
        }

        interface GetMetadataRequest {
            /**
             * At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
             * Security origin.
             */
            securityOrigin?: string;
            /**
             * Storage key.
             */
            storageKey?: string;
            /**
             * Storage bucket. If not specified, it uses the default bucket.
             */
            storageBucket?: Storage.StorageBucket;
            /**
             * Database name.
             */
            databaseName: string;
            /**
             * Object store name.
             */
            objectStoreName: string;
        }

        interface GetMetadataResponse {
            /**
             * the entries count
             */
            entriesCount: number;
            /**
             * the current value of key generator, to become the next inserted
             * key into the object store. Valid if objectStore.autoIncrement
             * is true.
             */
            keyGeneratorValue: number;
        }

        interface RequestDatabaseRequest {
            /**
             * At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
             * Security origin.
             */
            securityOrigin?: string;
            /**
             * Storage key.
             */
            storageKey?: string;
            /**
             * Storage bucket. If not specified, it uses the default bucket.
             */
            storageBucket?: Storage.StorageBucket;
            /**
             * Database name.
             */
            databaseName: string;
        }

        interface RequestDatabaseResponse {
            /**
             * Database with an array of object stores.
             */
            databaseWithObjectStores: DatabaseWithObjectStores;
        }

        interface RequestDatabaseNamesRequest {
            /**
             * At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
             * Security origin.
             */
            securityOrigin?: string;
            /**
             * Storage key.
             */
            storageKey?: string;
            /**
             * Storage bucket. If not specified, it uses the default bucket.
             */
            storageBucket?: Storage.StorageBucket;
        }

        interface RequestDatabaseNamesResponse {
            /**
             * Database names for origin.
             */
            databaseNames: string[];
        }
    }

    namespace Input {

        interface TouchPoint {
            /**
             * X coordinate of the event relative to the main frame's viewport in CSS pixels.
             */
            x: number;
            /**
             * Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
             * the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
             */
            y: number;
            /**
             * X radius of the touch area (default: 1.0).
             */
            radiusX?: number;
            /**
             * Y radius of the touch area (default: 1.0).
             */
            radiusY?: number;
            /**
             * Rotation angle (default: 0.0).
             */
            rotationAngle?: number;
            /**
             * Force (default: 1.0).
             */
            force?: number;
            /**
             * The normalized tangential pressure, which has a range of [-1,1] (default: 0).
             */
            tangentialPressure?: number;
            /**
             * The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0)
             */
            tiltX?: integer;
            /**
             * The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
             */
            tiltY?: integer;
            /**
             * The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
             */
            twist?: integer;
            /**
             * Identifier used to track touch sources between events, must be unique within an event.
             */
            id?: number;
        }

        type GestureSourceType = ('default' | 'touch' | 'mouse');

        type MouseButton = ('none' | 'left' | 'middle' | 'right' | 'back' | 'forward');

        /**
         * UTC time in seconds, counted from January 1, 1970.
         */
        type TimeSinceEpoch = number;

        interface DragDataItem {
            /**
             * Mime type of the dragged data.
             */
            mimeType: string;
            /**
             * Depending of the value of `mimeType`, it contains the dragged link,
             * text, HTML markup or any other data.
             */
            data: string;
            /**
             * Title associated with a link. Only valid when `mimeType` == "text/uri-list".
             */
            title?: string;
            /**
             * Stores the base URL for the contained markup. Only valid when `mimeType`
             * == "text/html".
             */
            baseURL?: string;
        }

        interface DragData {
            items: DragDataItem[];
            /**
             * List of filenames that should be included when dropping
             */
            files?: string[];
            /**
             * Bit field representing allowed drag operations. Copy = 1, Link = 2, Move = 16
             */
            dragOperationsMask: integer;
        }

        const enum DispatchDragEventRequestType {
            DragEnter = 'dragEnter',
            DragOver = 'dragOver',
            Drop = 'drop',
            DragCancel = 'dragCancel',
        }

        interface DispatchDragEventRequest {
            /**
             * Type of the drag event. (DispatchDragEventRequestType enum)
             */
            type: ('dragEnter' | 'dragOver' | 'drop' | 'dragCancel');
            /**
             * X coordinate of the event relative to the main frame's viewport in CSS pixels.
             */
            x: number;
            /**
             * Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
             * the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
             */
            y: number;
            data: DragData;
            /**
             * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
             * (default: 0).
             */
            modifiers?: integer;
        }

        const enum DispatchKeyEventRequestType {
            KeyDown = 'keyDown',
            KeyUp = 'keyUp',
            RawKeyDown = 'rawKeyDown',
            Char = 'char',
        }

        interface DispatchKeyEventRequest {
            /**
             * Type of the key event. (DispatchKeyEventRequestType enum)
             */
            type: ('keyDown' | 'keyUp' | 'rawKeyDown' | 'char');
            /**
             * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
             * (default: 0).
             */
            modifiers?: integer;
            /**
             * Time at which the event occurred.
             */
            timestamp?: TimeSinceEpoch;
            /**
             * Text as generated by processing a virtual key code with a keyboard layout. Not needed for
             * for `keyUp` and `rawKeyDown` events (default: "")
             */
            text?: string;
            /**
             * Text that would have been generated by the keyboard if no modifiers were pressed (except for
             * shift). Useful for shortcut (accelerator) key handling (default: "").
             */
            unmodifiedText?: string;
            /**
             * Unique key identifier (e.g., 'U+0041') (default: "").
             */
            keyIdentifier?: string;
            /**
             * Unique DOM defined string value for each physical key (e.g., 'KeyA') (default: "").
             */
            code?: string;
            /**
             * Unique DOM defined string value describing the meaning of the key in the context of active
             * modifiers, keyboard layout, etc (e.g., 'AltGr') (default: "").
             */
            key?: string;
            /**
             * Windows virtual key code (default: 0).
             */
            windowsVirtualKeyCode?: integer;
            /**
             * Native virtual key code (default: 0).
             */
            nativeVirtualKeyCode?: integer;
            /**
             * Whether the event was generated from auto repeat (default: false).
             */
            autoRepeat?: boolean;
            /**
             * Whether the event was generated from the keypad (default: false).
             */
            isKeypad?: boolean;
            /**
             * Whether the event was a system key event (default: false).
             */
            isSystemKey?: boolean;
            /**
             * Whether the event was from the left or right side of the keyboard. 1=Left, 2=Right (default:
             * 0).
             */
            location?: integer;
            /**
             * Editing commands to send with the key event (e.g., 'selectAll') (default: []).
             * These are related to but not equal the command names used in `document.execCommand` and NSStandardKeyBindingResponding.
             * See https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/editing/commands/editor_command_names.h for valid command names.
             */
            commands?: string[];
        }

        interface InsertTextRequest {
            /**
             * The text to insert.
             */
            text: string;
        }

        interface ImeSetCompositionRequest {
            /**
             * The text to insert
             */
            text: string;
            /**
             * selection start
             */
            selectionStart: integer;
            /**
             * selection end
             */
            selectionEnd: integer;
            /**
             * replacement start
             */
            replacementStart?: integer;
            /**
             * replacement end
             */
            replacementEnd?: integer;
        }

        const enum DispatchMouseEventRequestType {
            MousePressed = 'mousePressed',
            MouseReleased = 'mouseReleased',
            MouseMoved = 'mouseMoved',
            MouseWheel = 'mouseWheel',
        }

        const enum DispatchMouseEventRequestPointerType {
            Mouse = 'mouse',
            Pen = 'pen',
        }

        interface DispatchMouseEventRequest {
            /**
             * Type of the mouse event. (DispatchMouseEventRequestType enum)
             */
            type: ('mousePressed' | 'mouseReleased' | 'mouseMoved' | 'mouseWheel');
            /**
             * X coordinate of the event relative to the main frame's viewport in CSS pixels.
             */
            x: number;
            /**
             * Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
             * the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
             */
            y: number;
            /**
             * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
             * (default: 0).
             */
            modifiers?: integer;
            /**
             * Time at which the event occurred.
             */
            timestamp?: TimeSinceEpoch;
            /**
             * Mouse button (default: "none").
             */
            button?: MouseButton;
            /**
             * A number indicating which buttons are pressed on the mouse when a mouse event is triggered.
             * Left=1, Right=2, Middle=4, Back=8, Forward=16, None=0.
             */
            buttons?: integer;
            /**
             * Number of times the mouse button was clicked (default: 0).
             */
            clickCount?: integer;
            /**
             * The normalized pressure, which has a range of [0,1] (default: 0).
             */
            force?: number;
            /**
             * The normalized tangential pressure, which has a range of [-1,1] (default: 0).
             */
            tangentialPressure?: number;
            /**
             * The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0).
             */
            tiltX?: integer;
            /**
             * The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
             */
            tiltY?: integer;
            /**
             * The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
             */
            twist?: integer;
            /**
             * X delta in CSS pixels for mouse wheel event (default: 0).
             */
            deltaX?: number;
            /**
             * Y delta in CSS pixels for mouse wheel event (default: 0).
             */
            deltaY?: number;
            /**
             * Pointer type (default: "mouse"). (DispatchMouseEventRequestPointerType enum)
             */
            pointerType?: ('mouse' | 'pen');
        }

        const enum DispatchTouchEventRequestType {
            TouchStart = 'touchStart',
            TouchEnd = 'touchEnd',
            TouchMove = 'touchMove',
            TouchCancel = 'touchCancel',
        }

        interface DispatchTouchEventRequest {
            /**
             * Type of the touch event. TouchEnd and TouchCancel must not contain any touch points, while
             * TouchStart and TouchMove must contains at least one. (DispatchTouchEventRequestType enum)
             */
            type: ('touchStart' | 'touchEnd' | 'touchMove' | 'touchCancel');
            /**
             * Active touch points on the touch device. One event per any changed point (compared to
             * previous touch event in a sequence) is generated, emulating pressing/moving/releasing points
             * one by one.
             */
            touchPoints: TouchPoint[];
            /**
             * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
             * (default: 0).
             */
            modifiers?: integer;
            /**
             * Time at which the event occurred.
             */
            timestamp?: TimeSinceEpoch;
        }

        const enum EmulateTouchFromMouseEventRequestType {
            MousePressed = 'mousePressed',
            MouseReleased = 'mouseReleased',
            MouseMoved = 'mouseMoved',
            MouseWheel = 'mouseWheel',
        }

        interface EmulateTouchFromMouseEventRequest {
            /**
             * Type of the mouse event. (EmulateTouchFromMouseEventRequestType enum)
             */
            type: ('mousePressed' | 'mouseReleased' | 'mouseMoved' | 'mouseWheel');
            /**
             * X coordinate of the mouse pointer in DIP.
             */
            x: integer;
            /**
             * Y coordinate of the mouse pointer in DIP.
             */
            y: integer;
            /**
             * Mouse button. Only "none", "left", "right" are supported.
             */
            button: MouseButton;
            /**
             * Time at which the event occurred (default: current time).
             */
            timestamp?: TimeSinceEpoch;
            /**
             * X delta in DIP for mouse wheel event (default: 0).
             */
            deltaX?: number;
            /**
             * Y delta in DIP for mouse wheel event (default: 0).
             */
            deltaY?: number;
            /**
             * Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
             * (default: 0).
             */
            modifiers?: integer;
            /**
             * Number of times the mouse button was clicked (default: 0).
             */
            clickCount?: integer;
        }

        interface SetIgnoreInputEventsRequest {
            /**
             * Ignores input events processing when set to true.
             */
            ignore: boolean;
        }

        interface SetInterceptDragsRequest {
            enabled: boolean;
        }

        interface SynthesizePinchGestureRequest {
            /**
             * X coordinate of the start of the gesture in CSS pixels.
             */
            x: number;
            /**
             * Y coordinate of the start of the gesture in CSS pixels.
             */
            y: number;
            /**
             * Relative scale factor after zooming (>1.0 zooms in, <1.0 zooms out).
             */
            scaleFactor: number;
            /**
             * Relative pointer speed in pixels per second (default: 800).
             */
            relativeSpeed?: integer;
            /**
             * Which type of input events to be generated (default: 'default', which queries the platform
             * for the preferred input type).
             */
            gestureSourceType?: GestureSourceType;
        }

        interface SynthesizeScrollGestureRequest {
            /**
             * X coordinate of the start of the gesture in CSS pixels.
             */
            x: number;
            /**
             * Y coordinate of the start of the gesture in CSS pixels.
             */
            y: number;
            /**
             * The distance to scroll along the X axis (positive to scroll left).
             */
            xDistance?: number;
            /**
             * The distance to scroll along the Y axis (positive to scroll up).
             */
            yDistance?: number;
            /**
             * The number of additional pixels to scroll back along the X axis, in addition to the given
             * distance.
             */
            xOverscroll?: number;
            /**
             * The number of additional pixels to scroll back along the Y axis, in addition to the given
             * distance.
             */
            yOverscroll?: number;
            /**
             * Prevent fling (default: true).
             */
            preventFling?: boolean;
            /**
             * Swipe speed in pixels per second (default: 800).
             */
            speed?: integer;
            /**
             * Which type of input events to be generated (default: 'default', which queries the platform
             * for the preferred input type).
             */
            gestureSourceType?: GestureSourceType;
            /**
             * The number of times to repeat the gesture (default: 0).
             */
            repeatCount?: integer;
            /**
             * The number of milliseconds delay between each repeat. (default: 250).
             */
            repeatDelayMs?: integer;
            /**
             * The name of the interaction markers to generate, if not empty (default: "").
             */
            interactionMarkerName?: string;
        }

        interface SynthesizeTapGestureRequest {
            /**
             * X coordinate of the start of the gesture in CSS pixels.
             */
            x: number;
            /**
             * Y coordinate of the start of the gesture in CSS pixels.
             */
            y: number;
            /**
             * Duration between touchdown and touchup events in ms (default: 50).
             */
            duration?: integer;
            /**
             * Number of times to perform the tap (e.g. 2 for double tap, default: 1).
             */
            tapCount?: integer;
            /**
             * Which type of input events to be generated (default: 'default', which queries the platform
             * for the preferred input type).
             */
            gestureSourceType?: GestureSourceType;
        }

        /**
         * Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to
         * restore normal drag and drop behavior.
         */
        interface DragInterceptedEvent {
            data: DragData;
        }
    }

    namespace Inspector {

        /**
         * Fired when remote debugging connection is about to be terminated. Contains detach reason.
         */
        interface DetachedEvent {
            /**
             * The reason why connection has been terminated.
             */
            reason: string;
        }
    }

    namespace LayerTree {

        /**
         * Unique Layer identifier.
         */
        type LayerId = string;

        /**
         * Unique snapshot identifier.
         */
        type SnapshotId = string;

        const enum ScrollRectType {
            RepaintsOnScroll = 'RepaintsOnScroll',
            TouchEventHandler = 'TouchEventHandler',
            WheelEventHandler = 'WheelEventHandler',
        }

        /**
         * Rectangle where scrolling happens on the main thread.
         */
        interface ScrollRect {
            /**
             * Rectangle itself.
             */
            rect: DOM.Rect;
            /**
             * Reason for rectangle to force scrolling on the main thread (ScrollRectType enum)
             */
            type: ('RepaintsOnScroll' | 'TouchEventHandler' | 'WheelEventHandler');
        }

        /**
         * Sticky position constraints.
         */
        interface StickyPositionConstraint {
            /**
             * Layout rectangle of the sticky element before being shifted
             */
            stickyBoxRect: DOM.Rect;
            /**
             * Layout rectangle of the containing block of the sticky element
             */
            containingBlockRect: DOM.Rect;
            /**
             * The nearest sticky layer that shifts the sticky box
             */
            nearestLayerShiftingStickyBox?: LayerId;
            /**
             * The nearest sticky layer that shifts the containing block
             */
            nearestLayerShiftingContainingBlock?: LayerId;
        }

        /**
         * Serialized fragment of layer picture along with its offset within the layer.
         */
        interface PictureTile {
            /**
             * Offset from owning layer left boundary
             */
            x: number;
            /**
             * Offset from owning layer top boundary
             */
            y: number;
            /**
             * Base64-encoded snapshot data. (Encoded as a base64 string when passed over JSON)
             */
            picture: string;
        }

        /**
         * Information about a compositing layer.
         */
        interface Layer {
            /**
             * The unique id for this layer.
             */
            layerId: LayerId;
            /**
             * The id of parent (not present for root).
             */
            parentLayerId?: LayerId;
            /**
             * The backend id for the node associated with this layer.
             */
            backendNodeId?: DOM.BackendNodeId;
            /**
             * Offset from parent layer, X coordinate.
             */
            offsetX: number;
            /**
             * Offset from parent layer, Y coordinate.
             */
            offsetY: number;
            /**
             * Layer width.
             */
            width: number;
            /**
             * Layer height.
             */
            height: number;
            /**
             * Transformation matrix for layer, default is identity matrix
             */
            transform?: number[];
            /**
             * Transform anchor point X, absent if no transform specified
             */
            anchorX?: number;
            /**
             * Transform anchor point Y, absent if no transform specified
             */
            anchorY?: number;
            /**
             * Transform anchor point Z, absent if no transform specified
             */
            anchorZ?: number;
            /**
             * Indicates how many time this layer has painted.
             */
            paintCount: integer;
            /**
             * Indicates whether this layer hosts any content, rather than being used for
             * transform/scrolling purposes only.
             */
            drawsContent: boolean;
            /**
             * Set if layer is not visible.
             */
            invisible?: boolean;
            /**
             * Rectangles scrolling on main thread only.
             */
            scrollRects?: ScrollRect[];
            /**
             * Sticky position constraint information
             */
            stickyPositionConstraint?: StickyPositionConstraint;
        }

        /**
         * Array of timings, one per paint step.
         */
        type PaintProfile = number[];

        interface CompositingReasonsRequest {
            /**
             * The id of the layer for which we want to get the reasons it was composited.
             */
            layerId: LayerId;
        }

        interface CompositingReasonsResponse {
            /**
             * A list of strings specifying reasons for the given layer to become composited.
             */
            compositingReasons: string[];
            /**
             * A list of strings specifying reason IDs for the given layer to become composited.
             */
            compositingReasonIds: string[];
        }

        interface LoadSnapshotRequest {
            /**
             * An array of tiles composing the snapshot.
             */
            tiles: PictureTile[];
        }

        interface LoadSnapshotResponse {
            /**
             * The id of the snapshot.
             */
            snapshotId: SnapshotId;
        }

        interface MakeSnapshotRequest {
            /**
             * The id of the layer.
             */
            layerId: LayerId;
        }

        interface MakeSnapshotResponse {
            /**
             * The id of the layer snapshot.
             */
            snapshotId: SnapshotId;
        }

        interface ProfileSnapshotRequest {
            /**
             * The id of the layer snapshot.
             */
            snapshotId: SnapshotId;
            /**
             * The maximum number of times to replay the snapshot (1, if not specified).
             */
            minRepeatCount?: integer;
            /**
             * The minimum duration (in seconds) to replay the snapshot.
             */
            minDuration?: number;
            /**
             * The clip rectangle to apply when replaying the snapshot.
             */
            clipRect?: DOM.Rect;
        }

        interface ProfileSnapshotResponse {
            /**
             * The array of paint profiles, one per run.
             */
            timings: PaintProfile[];
        }

        interface ReleaseSnapshotRequest {
            /**
             * The id of the layer snapshot.
             */
            snapshotId: SnapshotId;
        }

        interface ReplaySnapshotRequest {
            /**
             * The id of the layer snapshot.
             */
            snapshotId: SnapshotId;
            /**
             * The first step to replay from (replay from the very start if not specified).
             */
            fromStep?: integer;
            /**
             * The last step to replay to (replay till the end if not specified).
             */
            toStep?: integer;
            /**
             * The scale to apply while replaying (defaults to 1).
             */
            scale?: number;
        }

        interface ReplaySnapshotResponse {
            /**
             * A data: URL for resulting image.
             */
            dataURL: string;
        }

        interface SnapshotCommandLogRequest {
            /**
             * The id of the layer snapshot.
             */
            snapshotId: SnapshotId;
        }

        interface SnapshotCommandLogResponse {
            /**
             * The array of canvas function calls.
             */
            commandLog: any[];
        }

        interface LayerPaintedEvent {
            /**
             * The id of the painted layer.
             */
            layerId: LayerId;
            /**
             * Clip rectangle.
             */
            clip: DOM.Rect;
        }

        interface LayerTreeDidChangeEvent {
            /**
             * Layer tree, absent if not in the comspositing mode.
             */
            layers?: Layer[];
        }
    }

    /**
     * Provides access to log entries.
     */
    namespace Log {

        const enum LogEntrySource {
            XML = 'xml',
            Javascript = 'javascript',
            Network = 'network',
            Storage = 'storage',
            Appcache = 'appcache',
            Rendering = 'rendering',
            Security = 'security',
            Deprecation = 'deprecation',
            Worker = 'worker',
            Violation = 'violation',
            Intervention = 'intervention',
            Recommendation = 'recommendation',
            Other = 'other',
        }

        const enum LogEntryLevel {
            Verbose = 'verbose',
            Info = 'info',
            Warning = 'warning',
            Error = 'error',
        }

        const enum LogEntryCategory {
            Cors = 'cors',
        }

        /**
         * Log entry.
         */
        interface LogEntry {
            /**
             * Log entry source. (LogEntrySource enum)
             */
            source: ('xml' | 'javascript' | 'network' | 'storage' | 'appcache' | 'rendering' | 'security' | 'deprecation' | 'worker' | 'violation' | 'intervention' | 'recommendation' | 'other');
            /**
             * Log entry severity. (LogEntryLevel enum)
             */
            level: ('verbose' | 'info' | 'warning' | 'error');
            /**
             * Logged text.
             */
            text: string;
            /**
             *  (LogEntryCategory enum)
             */
            category?: ('cors');
            /**
             * Timestamp when this entry was added.
             */
            timestamp: Runtime.Timestamp;
            /**
             * URL of the resource if known.
             */
            url?: string;
            /**
             * Line number in the resource.
             */
            lineNumber?: integer;
            /**
             * JavaScript stack trace.
             */
            stackTrace?: Runtime.StackTrace;
            /**
             * Identifier of the network request associated with this entry.
             */
            networkRequestId?: Network.RequestId;
            /**
             * Identifier of the worker associated with this entry.
             */
            workerId?: string;
            /**
             * Call arguments.
             */
            args?: Runtime.RemoteObject[];
        }

        const enum ViolationSettingName {
            LongTask = 'longTask',
            LongLayout = 'longLayout',
            BlockedEvent = 'blockedEvent',
            BlockedParser = 'blockedParser',
            DiscouragedAPIUse = 'discouragedAPIUse',
            Handler = 'handler',
            RecurringHandler = 'recurringHandler',
        }

        /**
         * Violation configuration setting.
         */
        interface ViolationSetting {
            /**
             * Violation type. (ViolationSettingName enum)
             */
            name: ('longTask' | 'longLayout' | 'blockedEvent' | 'blockedParser' | 'discouragedAPIUse' | 'handler' | 'recurringHandler');
            /**
             * Time threshold to trigger upon.
             */
            threshold: number;
        }

        interface StartViolationsReportRequest {
            /**
             * Configuration for violations.
             */
            config: ViolationSetting[];
        }

        /**
         * Issued when new message was logged.
         */
        interface EntryAddedEvent {
            /**
             * The entry.
             */
            entry: LogEntry;
        }
    }

    namespace Memory {

        /**
         * Memory pressure level.
         */
        type PressureLevel = ('moderate' | 'critical');

        /**
         * Heap profile sample.
         */
        interface SamplingProfileNode {
            /**
             * Size of the sampled allocation.
             */
            size: number;
            /**
             * Total bytes attributed to this sample.
             */
            total: number;
            /**
             * Execution stack at the point of allocation.
             */
            stack: string[];
        }

        /**
         * Array of heap profile samples.
         */
        interface SamplingProfile {
            samples: SamplingProfileNode[];
            modules: Module[];
        }

        /**
         * Executable module information
         */
        interface Module {
            /**
             * Name of the module.
             */
            name: string;
            /**
             * UUID of the module.
             */
            uuid: string;
            /**
             * Base address where the module is loaded into memory. Encoded as a decimal
             * or hexadecimal (0x prefixed) string.
             */
            baseAddress: string;
            /**
             * Size of the module in bytes.
             */
            size: number;
        }

        interface GetDOMCountersResponse {
            documents: integer;
            nodes: integer;
            jsEventListeners: integer;
        }

        interface SetPressureNotificationsSuppressedRequest {
            /**
             * If true, memory pressure notifications will be suppressed.
             */
            suppressed: boolean;
        }

        interface SimulatePressureNotificationRequest {
            /**
             * Memory pressure level of the notification.
             */
            level: PressureLevel;
        }

        interface StartSamplingRequest {
            /**
             * Average number of bytes between samples.
             */
            samplingInterval?: integer;
            /**
             * Do not randomize intervals between samples.
             */
            suppressRandomness?: boolean;
        }

        interface GetAllTimeSamplingProfileResponse {
            profile: SamplingProfile;
        }

        interface GetBrowserSamplingProfileResponse {
            profile: SamplingProfile;
        }

        interface GetSamplingProfileResponse {
            profile: SamplingProfile;
        }
    }

    /**
     * Network domain allows tracking network activities of the page. It exposes information about http,
     * file, data and other requests and responses, their headers, bodies, timing, etc.
     */
    namespace Network {

        /**
         * Resource type as it was perceived by the rendering engine.
         */
        type ResourceType = ('Document' | 'Stylesheet' | 'Image' | 'Media' | 'Font' | 'Script' | 'TextTrack' | 'XHR' | 'Fetch' | 'Prefetch' | 'EventSource' | 'WebSocket' | 'Manifest' | 'SignedExchange' | 'Ping' | 'CSPViolationReport' | 'Preflight' | 'Other');

        /**
         * Unique loader identifier.
         */
        type LoaderId = string;

        /**
         * Unique request identifier.
         */
        type RequestId = string;

        /**
         * Unique intercepted request identifier.
         */
        type InterceptionId = string;

        /**
         * Network level fetch failure reason.
         */
        type ErrorReason = ('Failed' | 'Aborted' | 'TimedOut' | 'AccessDenied' | 'ConnectionClosed' | 'ConnectionReset' | 'ConnectionRefused' | 'ConnectionAborted' | 'ConnectionFailed' | 'NameNotResolved' | 'InternetDisconnected' | 'AddressUnreachable' | 'BlockedByClient' | 'BlockedByResponse');

        /**
         * UTC time in seconds, counted from January 1, 1970.
         */
        type TimeSinceEpoch = number;

        /**
         * Monotonically increasing time in seconds since an arbitrary point in the past.
         */
        type MonotonicTime = number;

        /**
         * Request / response headers as keys / values of JSON object.
         */
        interface Headers {
            [key: string]: string;
        }

        /**
         * The underlying connection technology that the browser is supposedly using.
         */
        type ConnectionType = ('none' | 'cellular2g' | 'cellular3g' | 'cellular4g' | 'bluetooth' | 'ethernet' | 'wifi' | 'wimax' | 'other');

        /**
         * Represents the cookie's 'SameSite' status:
         * https://tools.ietf.org/html/draft-west-first-party-cookies
         */
        type CookieSameSite = ('Strict' | 'Lax' | 'None');

        /**
         * Represents the cookie's 'Priority' status:
         * https://tools.ietf.org/html/draft-west-cookie-priority-00
         */
        type CookiePriority = ('Low' | 'Medium' | 'High');

        /**
         * Represents the source scheme of the origin that originally set the cookie.
         * A value of "Unset" allows protocol clients to emulate legacy cookie scope for the scheme.
         * This is a temporary ability and it will be removed in the future.
         */
        type CookieSourceScheme = ('Unset' | 'NonSecure' | 'Secure');

        /**
         * Timing information for the request.
         */
        interface ResourceTiming {
            /**
             * Timing's requestTime is a baseline in seconds, while the other numbers are ticks in
             * milliseconds relatively to this requestTime.
             */
            requestTime: number;
            /**
             * Started resolving proxy.
             */
            proxyStart: number;
            /**
             * Finished resolving proxy.
             */
            proxyEnd: number;
            /**
             * Started DNS address resolve.
             */
            dnsStart: number;
            /**
             * Finished DNS address resolve.
             */
            dnsEnd: number;
            /**
             * Started connecting to the remote host.
             */
            connectStart: number;
            /**
             * Connected to the remote host.
             */
            connectEnd: number;
            /**
             * Started SSL handshake.
             */
            sslStart: number;
            /**
             * Finished SSL handshake.
             */
            sslEnd: number;
            /**
             * Started running ServiceWorker.
             */
            workerStart: number;
            /**
             * Finished Starting ServiceWorker.
             */
            workerReady: number;
            /**
             * Started fetch event.
             */
            workerFetchStart: number;
            /**
             * Settled fetch event respondWith promise.
             */
            workerRespondWithSettled: number;
            /**
             * Started sending request.
             */
            sendStart: number;
            /**
             * Finished sending request.
             */
            sendEnd: number;
            /**
             * Time the server started pushing request.
             */
            pushStart: number;
            /**
             * Time the server finished pushing request.
             */
            pushEnd: number;
            /**
             * Started receiving response headers.
             */
            receiveHeadersStart: number;
            /**
             * Finished receiving response headers.
             */
            receiveHeadersEnd: number;
        }

        /**
         * Loading priority of a resource request.
         */
        type ResourcePriority = ('VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh');

        /**
         * Post data entry for HTTP request
         */
        interface PostDataEntry {
            bytes?: string;
        }

        const enum RequestReferrerPolicy {
            UnsafeUrl = 'unsafe-url',
            NoReferrerWhenDowngrade = 'no-referrer-when-downgrade',
            NoReferrer = 'no-referrer',
            Origin = 'origin',
            OriginWhenCrossOrigin = 'origin-when-cross-origin',
            SameOrigin = 'same-origin',
            StrictOrigin = 'strict-origin',
            StrictOriginWhenCrossOrigin = 'strict-origin-when-cross-origin',
        }

        /**
         * HTTP request data.
         */
        interface Request {
            /**
             * Request URL (without fragment).
             */
            url: string;
            /**
             * Fragment of the requested URL starting with hash, if present.
             */
            urlFragment?: string;
            /**
             * HTTP request method.
             */
            method: string;
            /**
             * HTTP request headers.
             */
            headers: Headers;
            /**
             * HTTP POST request data.
             */
            postData?: string;
            /**
             * True when the request has POST data. Note that postData might still be omitted when this flag is true when the data is too long.
             */
            hasPostData?: boolean;
            /**
             * Request body elements. This will be converted from base64 to binary
             */
            postDataEntries?: PostDataEntry[];
            /**
             * The mixed content type of the request.
             */
            mixedContentType?: Security.MixedContentType;
            /**
             * Priority of the resource request at the time request is sent.
             */
            initialPriority: ResourcePriority;
            /**
             * The referrer policy of the request, as defined in https://www.w3.org/TR/referrer-policy/ (RequestReferrerPolicy enum)
             */
            referrerPolicy: ('unsafe-url' | 'no-referrer-when-downgrade' | 'no-referrer' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin');
            /**
             * Whether is loaded via link preload.
             */
            isLinkPreload?: boolean;
            /**
             * Set for requests when the TrustToken API is used. Contains the parameters
             * passed by the developer (e.g. via "fetch") as understood by the backend.
             */
            trustTokenParams?: TrustTokenParams;
            /**
             * True if this resource request is considered to be the 'same site' as the
             * request correspondinfg to the main frame.
             */
            isSameSite?: boolean;
        }

        /**
         * Details of a signed certificate timestamp (SCT).
         */
        interface SignedCertificateTimestamp {
            /**
             * Validation status.
             */
            status: string;
            /**
             * Origin.
             */
            origin: string;
            /**
             * Log name / description.
             */
            logDescription: string;
            /**
             * Log ID.
             */
            logId: string;
            /**
             * Issuance date. Unlike TimeSinceEpoch, this contains the number of
             * milliseconds since January 1, 1970, UTC, not the number of seconds.
             */
            timestamp: number;
            /**
             * Hash algorithm.
             */
            hashAlgorithm: string;
            /**
             * Signature algorithm.
             */
            signatureAlgorithm: string;
            /**
             * Signature data.
             */
            signatureData: string;
        }

        /**
         * Security details about a request.
         */
        interface SecurityDetails {
            /**
             * Protocol name (e.g. "TLS 1.2" or "QUIC").
             */
            protocol: string;
            /**
             * Key Exchange used by the connection, or the empty string if not applicable.
             */
            keyExchange: string;
            /**
             * (EC)DH group used by the connection, if applicable.
             */
            keyExchangeGroup?: string;
            /**
             * Cipher name.
             */
            cipher: string;
            /**
             * TLS MAC. Note that AEAD ciphers do not have separate MACs.
             */
            mac?: string;
            /**
             * Certificate ID value.
             */
            certificateId: Security.CertificateId;
            /**
             * Certificate subject name.
             */
            subjectName: string;
            /**
             * Subject Alternative Name (SAN) DNS names and IP addresses.
             */
            sanList: string[];
            /**
             * Name of the issuing CA.
             */
            issuer: string;
            /**
             * Certificate valid from date.
             */
            validFrom: TimeSinceEpoch;
            /**
             * Certificate valid to (expiration) date
             */
            validTo: TimeSinceEpoch;
            /**
             * List of signed certificate timestamps (SCTs).
             */
            signedCertificateTimestampList: SignedCertificateTimestamp[];
            /**
             * Whether the request complied with Certificate Transparency policy
             */
            certificateTransparencyCompliance: CertificateTransparencyCompliance;
            /**
             * The signature algorithm used by the server in the TLS server signature,
             * represented as a TLS SignatureScheme code point. Omitted if not
             * applicable or not known.
             */
            serverSignatureAlgorithm?: integer;
            /**
             * Whether the connection used Encrypted ClientHello
             */
            encryptedClientHello: boolean;
        }

        /**
         * Whether the request complied with Certificate Transparency policy.
         */
        type CertificateTransparencyCompliance = ('unknown' | 'not-compliant' | 'compliant');

        /**
         * The reason why request was blocked.
         */
        type BlockedReason = ('other' | 'csp' | 'mixed-content' | 'origin' | 'inspector' | 'subresource-filter' | 'content-type' | 'coep-frame-resource-needs-coep-header' | 'coop-sandboxed-iframe-cannot-navigate-to-coop-page' | 'corp-not-same-origin' | 'corp-not-same-origin-after-defaulted-to-same-origin-by-coep' | 'corp-not-same-site');

        /**
         * The reason why request was blocked.
         */
        type CorsError = ('DisallowedByMode' | 'InvalidResponse' | 'WildcardOriginNotAllowed' | 'MissingAllowOriginHeader' | 'MultipleAllowOriginValues' | 'InvalidAllowOriginValue' | 'AllowOriginMismatch' | 'InvalidAllowCredentials' | 'CorsDisabledScheme' | 'PreflightInvalidStatus' | 'PreflightDisallowedRedirect' | 'PreflightWildcardOriginNotAllowed' | 'PreflightMissingAllowOriginHeader' | 'PreflightMultipleAllowOriginValues' | 'PreflightInvalidAllowOriginValue' | 'PreflightAllowOriginMismatch' | 'PreflightInvalidAllowCredentials' | 'PreflightMissingAllowExternal' | 'PreflightInvalidAllowExternal' | 'PreflightMissingAllowPrivateNetwork' | 'PreflightInvalidAllowPrivateNetwork' | 'InvalidAllowMethodsPreflightResponse' | 'InvalidAllowHeadersPreflightResponse' | 'MethodDisallowedByPreflightResponse' | 'HeaderDisallowedByPreflightResponse' | 'RedirectContainsCredentials' | 'InsecurePrivateNetwork' | 'InvalidPrivateNetworkAccess' | 'UnexpectedPrivateNetworkAccess' | 'NoCorsRedirectModeNotFollow' | 'PreflightMissingPrivateNetworkAccessId' | 'PreflightMissingPrivateNetworkAccessName' | 'PrivateNetworkAccessPermissionUnavailable' | 'PrivateNetworkAccessPermissionDenied');

        interface CorsErrorStatus {
            corsError: CorsError;
            failedParameter: string;
        }

        /**
         * Source of serviceworker response.
         */
        type ServiceWorkerResponseSource = ('cache-storage' | 'http-cache' | 'fallback-code' | 'network');

        const enum TrustTokenParamsRefreshPolicy {
            UseCached = 'UseCached',
            Refresh = 'Refresh',
        }

        /**
         * Determines what type of Trust Token operation is executed and
         * depending on the type, some additional parameters. The values
         * are specified in third_party/blink/renderer/core/fetch/trust_token.idl.
         */
        interface TrustTokenParams {
            operation: TrustTokenOperationType;
            /**
             * Only set for "token-redemption" operation and determine whether
             * to request a fresh SRR or use a still valid cached SRR. (TrustTokenParamsRefreshPolicy enum)
             */
            refreshPolicy: ('UseCached' | 'Refresh');
            /**
             * Origins of issuers from whom to request tokens or redemption
             * records.
             */
            issuers?: string[];
        }

        type TrustTokenOperationType = ('Issuance' | 'Redemption' | 'Signing');

        /**
         * The reason why Chrome uses a specific transport protocol for HTTP semantics.
         */
        type AlternateProtocolUsage = ('alternativeJobWonWithoutRace' | 'alternativeJobWonRace' | 'mainJobWonRace' | 'mappingMissing' | 'broken' | 'dnsAlpnH3JobWonWithoutRace' | 'dnsAlpnH3JobWonRace' | 'unspecifiedReason');

        /**
         * HTTP response data.
         */
        interface Response {
            /**
             * Response URL. This URL can be different from CachedResource.url in case of redirect.
             */
            url: string;
            /**
             * HTTP response status code.
             */
            status: integer;
            /**
             * HTTP response status text.
             */
            statusText: string;
            /**
             * HTTP response headers.
             */
            headers: Headers;
            /**
             * HTTP response headers text. This has been replaced by the headers in Network.responseReceivedExtraInfo.
             */
            headersText?: string;
            /**
             * Resource mimeType as determined by the browser.
             */
            mimeType: string;
            /**
             * Refined HTTP request headers that were actually transmitted over the network.
             */
            requestHeaders?: Headers;
            /**
             * HTTP request headers text. This has been replaced by the headers in Network.requestWillBeSentExtraInfo.
             */
            requestHeadersText?: string;
            /**
             * Specifies whether physical connection was actually reused for this request.
             */
            connectionReused: boolean;
            /**
             * Physical connection id that was actually used for this request.
             */
            connectionId: number;
            /**
             * Remote IP address.
             */
            remoteIPAddress?: string;
            /**
             * Remote port.
             */
            remotePort?: integer;
            /**
             * Specifies that the request was served from the disk cache.
             */
            fromDiskCache?: boolean;
            /**
             * Specifies that the request was served from the ServiceWorker.
             */
            fromServiceWorker?: boolean;
            /**
             * Specifies that the request was served from the prefetch cache.
             */
            fromPrefetchCache?: boolean;
            /**
             * Total number of bytes received for this request so far.
             */
            encodedDataLength: number;
            /**
             * Timing information for the given request.
             */
            timing?: ResourceTiming;
            /**
             * Response source of response from ServiceWorker.
             */
            serviceWorkerResponseSource?: ServiceWorkerResponseSource;
            /**
             * The time at which the returned response was generated.
             */
            responseTime?: TimeSinceEpoch;
            /**
             * Cache Storage Cache Name.
             */
            cacheStorageCacheName?: string;
            /**
             * Protocol used to fetch this request.
             */
            protocol?: string;
            /**
             * The reason why Chrome uses a specific transport protocol for HTTP semantics.
             */
            alternateProtocolUsage?: AlternateProtocolUsage;
            /**
             * Security state of the request resource.
             */
            securityState: Security.SecurityState;
            /**
             * Security details for the request.
             */
            securityDetails?: SecurityDetails;
        }

        /**
         * WebSocket request data.
         */
        interface WebSocketRequest {
            /**
             * HTTP request headers.
             */
            headers: Headers;
        }

        /**
         * WebSocket response data.
         */
        interface WebSocketResponse {
            /**
             * HTTP response status code.
             */
            status: integer;
            /**
             * HTTP response status text.
             */
            statusText: string;
            /**
             * HTTP response headers.
             */
            headers: Headers;
            /**
             * HTTP response headers text.
             */
            headersText?: string;
            /**
             * HTTP request headers.
             */
            requestHeaders?: Headers;
            /**
             * HTTP request headers text.
             */
            requestHeadersText?: string;
        }

        /**
         * WebSocket message data. This represents an entire WebSocket message, not just a fragmented frame as the name suggests.
         */
        interface WebSocketFrame {
            /**
             * WebSocket message opcode.
             */
            opcode: number;
            /**
             * WebSocket message mask.
             */
            mask: boolean;
            /**
             * WebSocket message payload data.
             * If the opcode is 1, this is a text message and payloadData is a UTF-8 string.
             * If the opcode isn't 1, then payloadData is a base64 encoded string representing binary data.
             */
            payloadData: string;
        }

        /**
         * Information about the cached resource.
         */
        interface CachedResource {
            /**
             * Resource URL. This is the url of the original network request.
             */
            url: string;
            /**
             * Type of this resource.
             */
            type: ResourceType;
            /**
             * Cached response data.
             */
            response?: Response;
            /**
             * Cached response body size.
             */
            bodySize: number;
        }

        const enum InitiatorType {
            Parser = 'parser',
            Script = 'script',
            Preload = 'preload',
            SignedExchange = 'SignedExchange',
            Preflight = 'preflight',
            Other = 'other',
        }

        /**
         * Information about the request initiator.
         */
        interface Initiator {
            /**
             * Type of this initiator. (InitiatorType enum)
             */
            type: ('parser' | 'script' | 'preload' | 'SignedExchange' | 'preflight' | 'other');
            /**
             * Initiator JavaScript stack trace, set for Script only.
             */
            stack?: Runtime.StackTrace;
            /**
             * Initiator URL, set for Parser type or for Script type (when script is importing module) or for SignedExchange type.
             */
            url?: string;
            /**
             * Initiator line number, set for Parser type or for Script type (when script is importing
             * module) (0-based).
             */
            lineNumber?: number;
            /**
             * Initiator column number, set for Parser type or for Script type (when script is importing
             * module) (0-based).
             */
            columnNumber?: number;
            /**
             * Set if another request triggered this request (e.g. preflight).
             */
            requestId?: RequestId;
        }

        /**
         * Cookie object
         */
        interface Cookie {
            /**
             * Cookie name.
             */
            name: string;
            /**
             * Cookie value.
             */
            value: string;
            /**
             * Cookie domain.
             */
            domain: string;
            /**
             * Cookie path.
             */
            path: string;
            /**
             * Cookie expiration date as the number of seconds since the UNIX epoch.
             */
            expires: number;
            /**
             * Cookie size.
             */
            size: integer;
            /**
             * True if cookie is http-only.
             */
            httpOnly: boolean;
            /**
             * True if cookie is secure.
             */
            secure: boolean;
            /**
             * True in case of session cookie.
             */
            session: boolean;
            /**
             * Cookie SameSite type.
             */
            sameSite?: CookieSameSite;
            /**
             * Cookie Priority
             */
            priority: CookiePriority;
            /**
             * True if cookie is SameParty.
             */
            sameParty: boolean;
            /**
             * Cookie source scheme type.
             */
            sourceScheme: CookieSourceScheme;
            /**
             * Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
             * An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
             * This is a temporary ability and it will be removed in the future.
             */
            sourcePort: integer;
            /**
             * Cookie partition key. The site of the top-level URL the browser was visiting at the start
             * of the request to the endpoint that set the cookie.
             */
            partitionKey?: string;
            /**
             * True if cookie partition key is opaque.
             */
            partitionKeyOpaque?: boolean;
        }

        /**
         * Types of reasons why a cookie may not be stored from a response.
         */
        type SetCookieBlockedReason = ('SecureOnly' | 'SameSiteStrict' | 'SameSiteLax' | 'SameSiteUnspecifiedTreatedAsLax' | 'SameSiteNoneInsecure' | 'UserPreferences' | 'ThirdPartyBlockedInFirstPartySet' | 'SyntaxError' | 'SchemeNotSupported' | 'OverwriteSecure' | 'InvalidDomain' | 'InvalidPrefix' | 'UnknownError' | 'SchemefulSameSiteStrict' | 'SchemefulSameSiteLax' | 'SchemefulSameSiteUnspecifiedTreatedAsLax' | 'SamePartyFromCrossPartyContext' | 'SamePartyConflictsWithOtherAttributes' | 'NameValuePairExceedsMaxSize' | 'DisallowedCharacter');

        /**
         * Types of reasons why a cookie may not be sent with a request.
         */
        type CookieBlockedReason = ('SecureOnly' | 'NotOnPath' | 'DomainMismatch' | 'SameSiteStrict' | 'SameSiteLax' | 'SameSiteUnspecifiedTreatedAsLax' | 'SameSiteNoneInsecure' | 'UserPreferences' | 'ThirdPartyBlockedInFirstPartySet' | 'UnknownError' | 'SchemefulSameSiteStrict' | 'SchemefulSameSiteLax' | 'SchemefulSameSiteUnspecifiedTreatedAsLax' | 'SamePartyFromCrossPartyContext' | 'NameValuePairExceedsMaxSize');

        /**
         * A cookie which was not stored from a response with the corresponding reason.
         */
        interface BlockedSetCookieWithReason {
            /**
             * The reason(s) this cookie was blocked.
             */
            blockedReasons: SetCookieBlockedReason[];
            /**
             * The string representing this individual cookie as it would appear in the header.
             * This is not the entire "cookie" or "set-cookie" header which could have multiple cookies.
             */
            cookieLine: string;
            /**
             * The cookie object which represents the cookie which was not stored. It is optional because
             * sometimes complete cookie information is not available, such as in the case of parsing
             * errors.
             */
            cookie?: Cookie;
        }

        /**
         * A cookie with was not sent with a request with the corresponding reason.
         */
        interface BlockedCookieWithReason {
            /**
             * The reason(s) the cookie was blocked.
             */
            blockedReasons: CookieBlockedReason[];
            /**
             * The cookie object representing the cookie which was not sent.
             */
            cookie: Cookie;
        }

        /**
         * Cookie parameter object
         */
        interface CookieParam {
            /**
             * Cookie name.
             */
            name: string;
            /**
             * Cookie value.
             */
            value: string;
            /**
             * The request-URI to associate with the setting of the cookie. This value can affect the
             * default domain, path, source port, and source scheme values of the created cookie.
             */
            url?: string;
            /**
             * Cookie domain.
             */
            domain?: string;
            /**
             * Cookie path.
             */
            path?: string;
            /**
             * True if cookie is secure.
             */
            secure?: boolean;
            /**
             * True if cookie is http-only.
             */
            httpOnly?: boolean;
            /**
             * Cookie SameSite type.
             */
            sameSite?: CookieSameSite;
            /**
             * Cookie expiration date, session cookie if not set
             */
            expires?: TimeSinceEpoch;
            /**
             * Cookie Priority.
             */
            priority?: CookiePriority;
            /**
             * True if cookie is SameParty.
             */
            sameParty?: boolean;
            /**
             * Cookie source scheme type.
             */
            sourceScheme?: CookieSourceScheme;
            /**
             * Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
             * An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
             * This is a temporary ability and it will be removed in the future.
             */
            sourcePort?: integer;
            /**
             * Cookie partition key. The site of the top-level URL the browser was visiting at the start
             * of the request to the endpoint that set the cookie.
             * If not set, the cookie will be set as not partitioned.
             */
            partitionKey?: string;
        }

        const enum AuthChallengeSource {
            Server = 'Server',
            Proxy = 'Proxy',
        }

        /**
         * Authorization challenge for HTTP status code 401 or 407.
         */
        interface AuthChallenge {
            /**
             * Source of the authentication challenge. (AuthChallengeSource enum)
             */
            source?: ('Server' | 'Proxy');
            /**
             * Origin of the challenger.
             */
            origin: string;
            /**
             * The authentication scheme used, such as basic or digest
             */
            scheme: string;
            /**
             * The realm of the challenge. May be empty.
             */
            realm: string;
        }

        const enum AuthChallengeResponseResponse {
            Default = 'Default',
            CancelAuth = 'CancelAuth',
            ProvideCredentials = 'ProvideCredentials',
        }

        /**
         * Response to an AuthChallenge.
         */
        interface AuthChallengeResponse {
            /**
             * The decision on what to do in response to the authorization challenge.  Default means
             * deferring to the default behavior of the net stack, which will likely either the Cancel
             * authentication or display a popup dialog box. (AuthChallengeResponseResponse enum)
             */
            response: ('Default' | 'CancelAuth' | 'ProvideCredentials');
            /**
             * The username to provide, possibly empty. Should only be set if response is
             * ProvideCredentials.
             */
            username?: string;
            /**
             * The password to provide, possibly empty. Should only be set if response is
             * ProvideCredentials.
             */
            password?: string;
        }

        /**
         * Stages of the interception to begin intercepting. Request will intercept before the request is
         * sent. Response will intercept after the response is received.
         */
        type InterceptionStage = ('Request' | 'HeadersReceived');

        /**
         * Request pattern for interception.
         */
        interface RequestPattern {
            /**
             * Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is
             * backslash. Omitting is equivalent to `"*"`.
             */
            urlPattern?: string;
            /**
             * If set, only requests for matching resource types will be intercepted.
             */
            resourceType?: ResourceType;
            /**
             * Stage at which to begin intercepting requests. Default is Request.
             */
            interceptionStage?: InterceptionStage;
        }

        /**
         * Information about a signed exchange signature.
         * https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#rfc.section.3.1
         */
        interface SignedExchangeSignature {
            /**
             * Signed exchange signature label.
             */
            label: string;
            /**
             * The hex string of signed exchange signature.
             */
            signature: string;
            /**
             * Signed exchange signature integrity.
             */
            integrity: string;
            /**
             * Signed exchange signature cert Url.
             */
            certUrl?: string;
            /**
             * The hex string of signed exchange signature cert sha256.
             */
            certSha256?: string;
            /**
             * Signed exchange signature validity Url.
             */
            validityUrl: string;
            /**
             * Signed exchange signature date.
             */
            date: integer;
            /**
             * Signed exchange signature expires.
             */
            expires: integer;
            /**
             * The encoded certificates.
             */
            certificates?: string[];
        }

        /**
         * Information about a signed exchange header.
         * https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#cbor-representation
         */
        interface SignedExchangeHeader {
            /**
             * Signed exchange request URL.
             */
            requestUrl: string;
            /**
             * Signed exchange response code.
             */
            responseCode: integer;
            /**
             * Signed exchange response headers.
             */
            responseHeaders: Headers;
            /**
             * Signed exchange response signature.
             */
            signatures: SignedExchangeSignature[];
            /**
             * Signed exchange header integrity hash in the form of `sha256-<base64-hash-value>`.
             */
            headerIntegrity: string;
        }

        /**
         * Field type for a signed exchange related error.
         */
        type SignedExchangeErrorField = ('signatureSig' | 'signatureIntegrity' | 'signatureCertUrl' | 'signatureCertSha256' | 'signatureValidityUrl' | 'signatureTimestamps');

        /**
         * Information about a signed exchange response.
         */
        interface SignedExchangeError {
            /**
             * Error message.
             */
            message: string;
            /**
             * The index of the signature which caused the error.
             */
            signatureIndex?: integer;
            /**
             * The field which caused the error.
             */
            errorField?: SignedExchangeErrorField;
        }

        /**
         * Information about a signed exchange response.
         */
        interface SignedExchangeInfo {
            /**
             * The outer response of signed HTTP exchange which was received from network.
             */
            outerResponse: Response;
            /**
             * Information about the signed exchange header.
             */
            header?: SignedExchangeHeader;
            /**
             * Security details for the signed exchange header.
             */
            securityDetails?: SecurityDetails;
            /**
             * Errors occurred while handling the signed exchagne.
             */
            errors?: SignedExchangeError[];
        }

        /**
         * List of content encodings supported by the backend.
         */
        type ContentEncoding = ('deflate' | 'gzip' | 'br' | 'zstd');

        type PrivateNetworkRequestPolicy = ('Allow' | 'BlockFromInsecureToMorePrivate' | 'WarnFromInsecureToMorePrivate' | 'PreflightBlock' | 'PreflightWarn');

        type IPAddressSpace = ('Local' | 'Private' | 'Public' | 'Unknown');

        interface ConnectTiming {
            /**
             * Timing's requestTime is a baseline in seconds, while the other numbers are ticks in
             * milliseconds relatively to this requestTime. Matches ResourceTiming's requestTime for
             * the same request (but not for redirected requests).
             */
            requestTime: number;
        }

        interface ClientSecurityState {
            initiatorIsSecureContext: boolean;
            initiatorIPAddressSpace: IPAddressSpace;
            privateNetworkRequestPolicy: PrivateNetworkRequestPolicy;
        }

        type CrossOriginOpenerPolicyValue = ('SameOrigin' | 'SameOriginAllowPopups' | 'RestrictProperties' | 'UnsafeNone' | 'SameOriginPlusCoep' | 'RestrictPropertiesPlusCoep');

        interface CrossOriginOpenerPolicyStatus {
            value: CrossOriginOpenerPolicyValue;
            reportOnlyValue: CrossOriginOpenerPolicyValue;
            reportingEndpoint?: string;
            reportOnlyReportingEndpoint?: string;
        }

        type CrossOriginEmbedderPolicyValue = ('None' | 'Credentialless' | 'RequireCorp');

        interface CrossOriginEmbedderPolicyStatus {
            value: CrossOriginEmbedderPolicyValue;
            reportOnlyValue: CrossOriginEmbedderPolicyValue;
            reportingEndpoint?: string;
            reportOnlyReportingEndpoint?: string;
        }

        type ContentSecurityPolicySource = ('HTTP' | 'Meta');

        interface ContentSecurityPolicyStatus {
            effectiveDirectives: string;
            isEnforced: boolean;
            source: ContentSecurityPolicySource;
        }

        interface SecurityIsolationStatus {
            coop?: CrossOriginOpenerPolicyStatus;
            coep?: CrossOriginEmbedderPolicyStatus;
            csp?: ContentSecurityPolicyStatus[];
        }

        /**
         * The status of a Reporting API report.
         */
        type ReportStatus = ('Queued' | 'Pending' | 'MarkedForRemoval' | 'Success');

        type ReportId = string;

        /**
         * An object representing a report generated by the Reporting API.
         */
        interface ReportingApiReport {
            id: ReportId;
            /**
             * The URL of the document that triggered the report.
             */
            initiatorUrl: string;
            /**
             * The name of the endpoint group that should be used to deliver the report.
             */
            destination: string;
            /**
             * The type of the report (specifies the set of data that is contained in the report body).
             */
            type: string;
            /**
             * When the report was generated.
             */
            timestamp: Network.TimeSinceEpoch;
            /**
             * How many uploads deep the related request was.
             */
            depth: integer;
            /**
             * The number of delivery attempts made so far, not including an active attempt.
             */
            completedAttempts: integer;
            body: any;
            status: ReportStatus;
        }

        interface ReportingApiEndpoint {
            /**
             * The URL of the endpoint to which reports may be delivered.
             */
            url: string;
            /**
             * Name of the endpoint group.
             */
            groupName: string;
        }

        /**
         * An object providing the result of a network resource load.
         */
        interface LoadNetworkResourcePageResult {
            success: boolean;
            /**
             * Optional values used for error reporting.
             */
            netError?: number;
            netErrorName?: string;
            httpStatusCode?: number;
            /**
             * If successful, one of the following two fields holds the result.
             */
            stream?: IO.StreamHandle;
            /**
             * Response headers.
             */
            headers?: Network.Headers;
        }

        /**
         * An options object that may be extended later to better support CORS,
         * CORB and streaming.
         */
        interface LoadNetworkResourceOptions {
            disableCache: boolean;
            includeCredentials: boolean;
        }

        interface SetAcceptedEncodingsRequest {
            /**
             * List of accepted content encodings.
             */
            encodings: ContentEncoding[];
        }

        interface CanClearBrowserCacheResponse {
            /**
             * True if browser cache can be cleared.
             */
            result: boolean;
        }

        interface CanClearBrowserCookiesResponse {
            /**
             * True if browser cookies can be cleared.
             */
            result: boolean;
        }

        interface CanEmulateNetworkConditionsResponse {
            /**
             * True if emulation of network conditions is supported.
             */
            result: boolean;
        }

        interface ContinueInterceptedRequestRequest {
            interceptionId: InterceptionId;
            /**
             * If set this causes the request to fail with the given reason. Passing `Aborted` for requests
             * marked with `isNavigationRequest` also cancels the navigation. Must not be set in response
             * to an authChallenge.
             */
            errorReason?: ErrorReason;
            /**
             * If set the requests completes using with the provided base64 encoded raw response, including
             * HTTP status line and headers etc... Must not be set in response to an authChallenge. (Encoded as a base64 string when passed over JSON)
             */
            rawResponse?: string;
            /**
             * If set the request url will be modified in a way that's not observable by page. Must not be
             * set in response to an authChallenge.
             */
            url?: string;
            /**
             * If set this allows the request method to be overridden. Must not be set in response to an
             * authChallenge.
             */
            method?: string;
            /**
             * If set this allows postData to be set. Must not be set in response to an authChallenge.
             */
            postData?: string;
            /**
             * If set this allows the request headers to be changed. Must not be set in response to an
             * authChallenge.
             */
            headers?: Headers;
            /**
             * Response to a requestIntercepted with an authChallenge. Must not be set otherwise.
             */
            authChallengeResponse?: AuthChallengeResponse;
        }

        interface DeleteCookiesRequest {
            /**
             * Name of the cookies to remove.
             */
            name: string;
            /**
             * If specified, deletes all the cookies with the given name where domain and path match
             * provided URL.
             */
            url?: string;
            /**
             * If specified, deletes only cookies with the exact domain.
             */
            domain?: string;
            /**
             * If specified, deletes only cookies with the exact path.
             */
            path?: string;
        }

        interface EmulateNetworkConditionsRequest {
            /**
             * True to emulate internet disconnection.
             */
            offline: boolean;
            /**
             * Minimum latency from request sent to response headers received (ms).
             */
            latency: number;
            /**
             * Maximal aggregated download throughput (bytes/sec). -1 disables download throttling.
             */
            downloadThroughput: number;
            /**
             * Maximal aggregated upload throughput (bytes/sec).  -1 disables upload throttling.
             */
            uploadThroughput: number;
            /**
             * Connection type if known.
             */
            connectionType?: ConnectionType;
        }

        interface EnableRequest {
            /**
             * Buffer size in bytes to use when preserving network payloads (XHRs, etc).
             */
            maxTotalBufferSize?: integer;
            /**
             * Per-resource buffer size in bytes to use when preserving network payloads (XHRs, etc).
             */
            maxResourceBufferSize?: integer;
            /**
             * Longest post body size (in bytes) that would be included in requestWillBeSent notification
             */
            maxPostDataSize?: integer;
        }

        interface GetAllCookiesResponse {
            /**
             * Array of cookie objects.
             */
            cookies: Cookie[];
        }

        interface GetCertificateRequest {
            /**
             * Origin to get certificate for.
             */
            origin: string;
        }

        interface GetCertificateResponse {
            tableNames: string[];
        }

        interface GetCookiesRequest {
            /**
             * The list of URLs for which applicable cookies will be fetched.
             * If not specified, it's assumed to be set to the list containing
             * the URLs of the page and all of its subframes.
             */
            urls?: string[];
        }

        interface GetCookiesResponse {
            /**
             * Array of cookie objects.
             */
            cookies: Cookie[];
        }

        interface GetResponseBodyRequest {
            /**
             * Identifier of the network request to get content for.
             */
            requestId: RequestId;
        }

        interface GetResponseBodyResponse {
            /**
             * Response body.
             */
            body: string;
            /**
             * True, if content was sent as base64.
             */
            base64Encoded: boolean;
        }

        interface GetRequestPostDataRequest {
            /**
             * Identifier of the network request to get content for.
             */
            requestId: RequestId;
        }

        interface GetRequestPostDataResponse {
            /**
             * Request body string, omitting files from multipart requests
             */
            postData: string;
        }

        interface GetResponseBodyForInterceptionRequest {
            /**
             * Identifier for the intercepted request to get body for.
             */
            interceptionId: InterceptionId;
        }

        interface GetResponseBodyForInterceptionResponse {
            /**
             * Response body.
             */
            body: string;
            /**
             * True, if content was sent as base64.
             */
            base64Encoded: boolean;
        }

        interface TakeResponseBodyForInterceptionAsStreamRequest {
            interceptionId: InterceptionId;
        }

        interface TakeResponseBodyForInterceptionAsStreamResponse {
            stream: IO.StreamHandle;
        }

        interface ReplayXHRRequest {
            /**
             * Identifier of XHR to replay.
             */
            requestId: RequestId;
        }

        interface SearchInResponseBodyRequest {
            /**
             * Identifier of the network response to search.
             */
            requestId: RequestId;
            /**
             * String to search for.
             */
            query: string;
            /**
             * If true, search is case sensitive.
             */
            caseSensitive?: boolean;
            /**
             * If true, treats string parameter as regex.
             */
            isRegex?: boolean;
        }

        interface SearchInResponseBodyResponse {
            /**
             * List of search matches.
             */
            result: Debugger.SearchMatch[];
        }

        interface SetBlockedURLsRequest {
            /**
             * URL patterns to block. Wildcards ('*') are allowed.
             */
            urls: string[];
        }

        interface SetBypassServiceWorkerRequest {
            /**
             * Bypass service worker and load from network.
             */
            bypass: boolean;
        }

        interface SetCacheDisabledRequest {
            /**
             * Cache disabled state.
             */
            cacheDisabled: boolean;
        }

        interface SetCookieRequest {
            /**
             * Cookie name.
             */
            name: string;
            /**
             * Cookie value.
             */
            value: string;
            /**
             * The request-URI to associate with the setting of the cookie. This value can affect the
             * default domain, path, source port, and source scheme values of the created cookie.
             */
            url?: string;
            /**
             * Cookie domain.
             */
            domain?: string;
            /**
             * Cookie path.
             */
            path?: string;
            /**
             * True if cookie is secure.
             */
            secure?: boolean;
            /**
             * True if cookie is http-only.
             */
            httpOnly?: boolean;
            /**
             * Cookie SameSite type.
             */
            sameSite?: CookieSameSite;
            /**
             * Cookie expiration date, session cookie if not set
             */
            expires?: TimeSinceEpoch;
            /**
             * Cookie Priority type.
             */
            priority?: CookiePriority;
            /**
             * True if cookie is SameParty.
             */
            sameParty?: boolean;
            /**
             * Cookie source scheme type.
             */
            sourceScheme?: CookieSourceScheme;
            /**
             * Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
             * An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
             * This is a temporary ability and it will be removed in the future.
             */
            sourcePort?: integer;
            /**
             * Cookie partition key. The site of the top-level URL the browser was visiting at the start
             * of the request to the endpoint that set the cookie.
             * If not set, the cookie will be set as not partitioned.
             */
            partitionKey?: string;
        }

        interface SetCookieResponse {
            /**
             * Always set to true. If an error occurs, the response indicates protocol error.
             */
            success: boolean;
        }

        interface SetCookiesRequest {
            /**
             * Cookies to be set.
             */
            cookies: CookieParam[];
        }

        interface SetExtraHTTPHeadersRequest {
            /**
             * Map with extra HTTP headers.
             */
            headers: Headers;
        }

        interface SetAttachDebugStackRequest {
            /**
             * Whether to attach a page script stack for debugging purpose.
             */
            enabled: boolean;
        }

        interface SetRequestInterceptionRequest {
            /**
             * Requests matching any of these patterns will be forwarded and wait for the corresponding
             * continueInterceptedRequest call.
             */
            patterns: RequestPattern[];
        }

        interface SetUserAgentOverrideRequest {
            /**
             * User agent to use.
             */
            userAgent: string;
            /**
             * Browser langugage to emulate.
             */
            acceptLanguage?: string;
            /**
             * The platform navigator.platform should return.
             */
            platform?: string;
            /**
             * To be sent in Sec-CH-UA-* headers and returned in navigator.userAgentData
             */
            userAgentMetadata?: Emulation.UserAgentMetadata;
        }

        interface GetSecurityIsolationStatusRequest {
            /**
             * If no frameId is provided, the status of the target is provided.
             */
            frameId?: Page.FrameId;
        }

        interface GetSecurityIsolationStatusResponse {
            status: SecurityIsolationStatus;
        }

        interface EnableReportingApiRequest {
            /**
             * Whether to enable or disable events for the Reporting API
             */
            enable: boolean;
        }

        interface LoadNetworkResourceRequest {
            /**
             * Frame id to get the resource for. Mandatory for frame targets, and
             * should be omitted for worker targets.
             */
            frameId?: Page.FrameId;
            /**
             * URL of the resource to get content for.
             */
            url: string;
            /**
             * Options for the request.
             */
            options: LoadNetworkResourceOptions;
        }

        interface LoadNetworkResourceResponse {
            resource: LoadNetworkResourcePageResult;
        }

        /**
         * Fired when data chunk was received over the network.
         */
        interface DataReceivedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * Data chunk length.
             */
            dataLength: integer;
            /**
             * Actual bytes received (might be less than dataLength for compressed encodings).
             */
            encodedDataLength: integer;
        }

        /**
         * Fired when EventSource message is received.
         */
        interface EventSourceMessageReceivedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * Message type.
             */
            eventName: string;
            /**
             * Message identifier.
             */
            eventId: string;
            /**
             * Message content.
             */
            data: string;
        }

        /**
         * Fired when HTTP request has failed to load.
         */
        interface LoadingFailedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * Resource type.
             */
            type: ResourceType;
            /**
             * User friendly error message.
             */
            errorText: string;
            /**
             * True if loading was canceled.
             */
            canceled?: boolean;
            /**
             * The reason why loading was blocked, if any.
             */
            blockedReason?: BlockedReason;
            /**
             * The reason why loading was blocked by CORS, if any.
             */
            corsErrorStatus?: CorsErrorStatus;
        }

        /**
         * Fired when HTTP request has finished loading.
         */
        interface LoadingFinishedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * Total number of bytes received for this request.
             */
            encodedDataLength: number;
        }

        /**
         * Details of an intercepted HTTP request, which must be either allowed, blocked, modified or
         * mocked.
         * Deprecated, use Fetch.requestPaused instead.
         */
        interface RequestInterceptedEvent {
            /**
             * Each request the page makes will have a unique id, however if any redirects are encountered
             * while processing that fetch, they will be reported with the same id as the original fetch.
             * Likewise if HTTP authentication is needed then the same fetch id will be used.
             */
            interceptionId: InterceptionId;
            request: Request;
            /**
             * The id of the frame that initiated the request.
             */
            frameId: Page.FrameId;
            /**
             * How the requested resource will be used.
             */
            resourceType: ResourceType;
            /**
             * Whether this is a navigation request, which can abort the navigation completely.
             */
            isNavigationRequest: boolean;
            /**
             * Set if the request is a navigation that will result in a download.
             * Only present after response is received from the server (i.e. HeadersReceived stage).
             */
            isDownload?: boolean;
            /**
             * Redirect location, only sent if a redirect was intercepted.
             */
            redirectUrl?: string;
            /**
             * Details of the Authorization Challenge encountered. If this is set then
             * continueInterceptedRequest must contain an authChallengeResponse.
             */
            authChallenge?: AuthChallenge;
            /**
             * Response error if intercepted at response stage or if redirect occurred while intercepting
             * request.
             */
            responseErrorReason?: ErrorReason;
            /**
             * Response code if intercepted at response stage or if redirect occurred while intercepting
             * request or auth retry occurred.
             */
            responseStatusCode?: integer;
            /**
             * Response headers if intercepted at the response stage or if redirect occurred while
             * intercepting request or auth retry occurred.
             */
            responseHeaders?: Headers;
            /**
             * If the intercepted request had a corresponding requestWillBeSent event fired for it, then
             * this requestId will be the same as the requestId present in the requestWillBeSent event.
             */
            requestId?: RequestId;
        }

        /**
         * Fired if request ended up loading from cache.
         */
        interface RequestServedFromCacheEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
        }

        /**
         * Fired when page is about to send HTTP request.
         */
        interface RequestWillBeSentEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Loader identifier. Empty string if the request is fetched from worker.
             */
            loaderId: LoaderId;
            /**
             * URL of the document this request is loaded for.
             */
            documentURL: string;
            /**
             * Request data.
             */
            request: Request;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * Timestamp.
             */
            wallTime: TimeSinceEpoch;
            /**
             * Request initiator.
             */
            initiator: Initiator;
            /**
             * In the case that redirectResponse is populated, this flag indicates whether
             * requestWillBeSentExtraInfo and responseReceivedExtraInfo events will be or were emitted
             * for the request which was just redirected.
             */
            redirectHasExtraInfo: boolean;
            /**
             * Redirect response data.
             */
            redirectResponse?: Response;
            /**
             * Type of this resource.
             */
            type?: ResourceType;
            /**
             * Frame identifier.
             */
            frameId?: Page.FrameId;
            /**
             * Whether the request is initiated by a user gesture. Defaults to false.
             */
            hasUserGesture?: boolean;
        }

        /**
         * Fired when resource loading priority is changed
         */
        interface ResourceChangedPriorityEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * New priority
             */
            newPriority: ResourcePriority;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
        }

        /**
         * Fired when a signed exchange was received over the network
         */
        interface SignedExchangeReceivedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Information about the signed exchange response.
             */
            info: SignedExchangeInfo;
        }

        /**
         * Fired when HTTP response is available.
         */
        interface ResponseReceivedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Loader identifier. Empty string if the request is fetched from worker.
             */
            loaderId: LoaderId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * Resource type.
             */
            type: ResourceType;
            /**
             * Response data.
             */
            response: Response;
            /**
             * Indicates whether requestWillBeSentExtraInfo and responseReceivedExtraInfo events will be
             * or were emitted for this request.
             */
            hasExtraInfo: boolean;
            /**
             * Frame identifier.
             */
            frameId?: Page.FrameId;
        }

        /**
         * Fired when WebSocket is closed.
         */
        interface WebSocketClosedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
        }

        /**
         * Fired upon WebSocket creation.
         */
        interface WebSocketCreatedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * WebSocket request URL.
             */
            url: string;
            /**
             * Request initiator.
             */
            initiator?: Initiator;
        }

        /**
         * Fired when WebSocket message error occurs.
         */
        interface WebSocketFrameErrorEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * WebSocket error message.
             */
            errorMessage: string;
        }

        /**
         * Fired when WebSocket message is received.
         */
        interface WebSocketFrameReceivedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * WebSocket response data.
             */
            response: WebSocketFrame;
        }

        /**
         * Fired when WebSocket message is sent.
         */
        interface WebSocketFrameSentEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * WebSocket response data.
             */
            response: WebSocketFrame;
        }

        /**
         * Fired when WebSocket handshake response becomes available.
         */
        interface WebSocketHandshakeResponseReceivedEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * WebSocket response data.
             */
            response: WebSocketResponse;
        }

        /**
         * Fired when WebSocket is about to initiate handshake.
         */
        interface WebSocketWillSendHandshakeRequestEvent {
            /**
             * Request identifier.
             */
            requestId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * UTC Timestamp.
             */
            wallTime: TimeSinceEpoch;
            /**
             * WebSocket request data.
             */
            request: WebSocketRequest;
        }

        /**
         * Fired upon WebTransport creation.
         */
        interface WebTransportCreatedEvent {
            /**
             * WebTransport identifier.
             */
            transportId: RequestId;
            /**
             * WebTransport request URL.
             */
            url: string;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
            /**
             * Request initiator.
             */
            initiator?: Initiator;
        }

        /**
         * Fired when WebTransport handshake is finished.
         */
        interface WebTransportConnectionEstablishedEvent {
            /**
             * WebTransport identifier.
             */
            transportId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
        }

        /**
         * Fired when WebTransport is disposed.
         */
        interface WebTransportClosedEvent {
            /**
             * WebTransport identifier.
             */
            transportId: RequestId;
            /**
             * Timestamp.
             */
            timestamp: MonotonicTime;
        }

        /**
         * Fired when additional information about a requestWillBeSent event is available from the
         * network stack. Not every requestWillBeSent event will have an additional
         * requestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent
         * or requestWillBeSentExtraInfo will be fired first for the same request.
         */
        interface RequestWillBeSentExtraInfoEvent {
            /**
             * Request identifier. Used to match this information to an existing requestWillBeSent event.
             */
            requestId: RequestId;
            /**
             * A list of cookies potentially associated to the requested URL. This includes both cookies sent with
             * the request and the ones not sent; the latter are distinguished by having blockedReason field set.
             */
            associatedCookies: BlockedCookieWithReason[];
            /**
             * Raw request headers as they will be sent over the wire.
             */
            headers: Headers;
            /**
             * Connection timing information for the request.
             */
            connectTiming: ConnectTiming;
            /**
             * The client security state set for the request.
             */
            clientSecurityState?: ClientSecurityState;
            /**
             * Whether the site has partitioned cookies stored in a partition different than the current one.
             */
            siteHasCookieInOtherPartition?: boolean;
        }

        /**
         * Fired when additional information about a responseReceived event is available from the network
         * stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
         * it, and responseReceivedExtraInfo may be fired before or after responseReceived.
         */
        interface ResponseReceivedExtraInfoEvent {
            /**
             * Request identifier. Used to match this information to another responseReceived event.
             */
            requestId: RequestId;
            /**
             * A list of cookies which were not stored from the response along with the corresponding
             * reasons for blocking. The cookies here may not be valid due to syntax errors, which
             * are represented by the invalid cookie line string instead of a proper cookie.
             */
            blockedCookies: BlockedSetCookieWithReason[];
            /**
             * Raw response headers as they were received over the wire.
             */
            headers: Headers;
            /**
             * The IP address space of the resource. The address space can only be determined once the transport
             * established the connection, so we can't send it in `requestWillBeSentExtraInfo`.
             */
            resourceIPAddressSpace: IPAddressSpace;
            /**
             * The status code of the response. This is useful in cases the request failed and no responseReceived
             * event is triggered, which is the case for, e.g., CORS errors. This is also the correct status code
             * for cached requests, where the status in responseReceived is a 200 and this will be 304.
             */
            statusCode: integer;
            /**
             * Raw response header text as it was received over the wire. The raw text may not always be
             * available, such as in the case of HTTP/2 or QUIC.
             */
            headersText?: string;
            /**
             * The cookie partition key that will be used to store partitioned cookies set in this response.
             * Only sent when partitioned cookies are enabled.
             */
            cookiePartitionKey?: string;
            /**
             * True if partitioned cookies are enabled, but the partition key is not serializeable to string.
             */
            cookiePartitionKeyOpaque?: boolean;
        }

        const enum TrustTokenOperationDoneEventStatus {
            Ok = 'Ok',
            InvalidArgument = 'InvalidArgument',
            MissingIssuerKeys = 'MissingIssuerKeys',
            FailedPrecondition = 'FailedPrecondition',
            ResourceExhausted = 'ResourceExhausted',
            AlreadyExists = 'AlreadyExists',
            Unavailable = 'Unavailable',
            Unauthorized = 'Unauthorized',
            BadResponse = 'BadResponse',
            InternalError = 'InternalError',
            UnknownError = 'UnknownError',
            FulfilledLocally = 'FulfilledLocally',
        }

        /**
         * Fired exactly once for each Trust Token operation. Depending on
         * the type of the operation and whether the operation succeeded or
         * failed, the event is fired before the corresponding request was sent
         * or after the response was received.
         */
        interface TrustTokenOperationDoneEvent {
            /**
             * Detailed success or error status of the operation.
             * 'AlreadyExists' also signifies a successful operation, as the result
             * of the operation already exists und thus, the operation was abort
             * preemptively (e.g. a cache hit). (TrustTokenOperationDoneEventStatus enum)
             */
            status: ('Ok' | 'InvalidArgument' | 'MissingIssuerKeys' | 'FailedPrecondition' | 'ResourceExhausted' | 'AlreadyExists' | 'Unavailable' | 'Unauthorized' | 'BadResponse' | 'InternalError' | 'UnknownError' | 'FulfilledLocally');
            type: TrustTokenOperationType;
            requestId: RequestId;
            /**
             * Top level origin. The context in which the operation was attempted.
             */
            topLevelOrigin?: string;
            /**
             * Origin of the issuer in case of a "Issuance" or "Redemption" operation.
             */
            issuerOrigin?: string;
            /**
             * The number of obtained Trust Tokens on a successful "Issuance" operation.
             */
            issuedTokenCount?: integer;
        }

        /**
         * Fired once when parsing the .wbn file has succeeded.
         * The event contains the information about the web bundle contents.
         */
        interface SubresourceWebBundleMetadataReceivedEvent {
            /**
             * Request identifier. Used to match this information to another event.
             */
            requestId: RequestId;
            /**
             * A list of URLs of resources in the subresource Web Bundle.
             */
            urls: string[];
        }

        /**
         * Fired once when parsing the .wbn file has failed.
         */
        interface SubresourceWebBundleMetadataErrorEvent {
            /**
             * Request identifier. Used to match this information to another event.
             */
            requestId: RequestId;
            /**
             * Error message
             */
            errorMessage: string;
        }

        /**
         * Fired when handling requests for resources within a .wbn file.
         * Note: this will only be fired for resources that are requested by the webpage.
         */
        interface SubresourceWebBundleInnerResponseParsedEvent {
            /**
             * Request identifier of the subresource request
             */
            innerRequestId: RequestId;
            /**
             * URL of the subresource resource.
             */
            innerRequestURL: string;
            /**
             * Bundle request identifier. Used to match this information to another event.
             * This made be absent in case when the instrumentation was enabled only
             * after webbundle was parsed.
             */
            bundleRequestId?: RequestId;
        }

        /**
         * Fired when request for resources within a .wbn file failed.
         */
        interface SubresourceWebBundleInnerResponseErrorEvent {
            /**
             * Request identifier of the subresource request
             */
            innerRequestId: RequestId;
            /**
             * URL of the subresource resource.
             */
            innerRequestURL: string;
            /**
             * Error message
             */
            errorMessage: string;
            /**
             * Bundle request identifier. Used to match this information to another event.
             * This made be absent in case when the instrumentation was enabled only
             * after webbundle was parsed.
             */
            bundleRequestId?: RequestId;
        }

        /**
         * Is sent whenever a new report is added.
         * And after 'enableReportingApi' for all existing reports.
         */
        interface ReportingApiReportAddedEvent {
            report: ReportingApiReport;
        }

        interface ReportingApiReportUpdatedEvent {
            report: ReportingApiReport;
        }

        interface ReportingApiEndpointsChangedForOriginEvent {
            /**
             * Origin of the document(s) which configured the endpoints.
             */
            origin: string;
            endpoints: ReportingApiEndpoint[];
        }
    }

    /**
     * This domain provides various functionality related to drawing atop the inspected page.
     */
    namespace Overlay {

        /**
         * Configuration data for drawing the source order of an elements children.
         */
        interface SourceOrderConfig {
            /**
             * the color to outline the givent element in.
             */
            parentOutlineColor: DOM.RGBA;
            /**
             * the color to outline the child elements in.
             */
            childOutlineColor: DOM.RGBA;
        }

        /**
         * Configuration data for the highlighting of Grid elements.
         */
        interface GridHighlightConfig {
            /**
             * Whether the extension lines from grid cells to the rulers should be shown (default: false).
             */
            showGridExtensionLines?: boolean;
            /**
             * Show Positive line number labels (default: false).
             */
            showPositiveLineNumbers?: boolean;
            /**
             * Show Negative line number labels (default: false).
             */
            showNegativeLineNumbers?: boolean;
            /**
             * Show area name labels (default: false).
             */
            showAreaNames?: boolean;
            /**
             * Show line name labels (default: false).
             */
            showLineNames?: boolean;
            /**
             * Show track size labels (default: false).
             */
            showTrackSizes?: boolean;
            /**
             * The grid container border highlight color (default: transparent).
             */
            gridBorderColor?: DOM.RGBA;
            /**
             * The cell border color (default: transparent). Deprecated, please use rowLineColor and columnLineColor instead.
             */
            cellBorderColor?: DOM.RGBA;
            /**
             * The row line color (default: transparent).
             */
            rowLineColor?: DOM.RGBA;
            /**
             * The column line color (default: transparent).
             */
            columnLineColor?: DOM.RGBA;
            /**
             * Whether the grid border is dashed (default: false).
             */
            gridBorderDash?: boolean;
            /**
             * Whether the cell border is dashed (default: false). Deprecated, please us rowLineDash and columnLineDash instead.
             */
            cellBorderDash?: boolean;
            /**
             * Whether row lines are dashed (default: false).
             */
            rowLineDash?: boolean;
            /**
             * Whether column lines are dashed (default: false).
             */
            columnLineDash?: boolean;
            /**
             * The row gap highlight fill color (default: transparent).
             */
            rowGapColor?: DOM.RGBA;
            /**
             * The row gap hatching fill color (default: transparent).
             */
            rowHatchColor?: DOM.RGBA;
            /**
             * The column gap highlight fill color (default: transparent).
             */
            columnGapColor?: DOM.RGBA;
            /**
             * The column gap hatching fill color (default: transparent).
             */
            columnHatchColor?: DOM.RGBA;
            /**
             * The named grid areas border color (Default: transparent).
             */
            areaBorderColor?: DOM.RGBA;
            /**
             * The grid container background color (Default: transparent).
             */
            gridBackgroundColor?: DOM.RGBA;
        }

        /**
         * Configuration data for the highlighting of Flex container elements.
         */
        interface FlexContainerHighlightConfig {
            /**
             * The style of the container border
             */
            containerBorder?: LineStyle;
            /**
             * The style of the separator between lines
             */
            lineSeparator?: LineStyle;
            /**
             * The style of the separator between items
             */
            itemSeparator?: LineStyle;
            /**
             * Style of content-distribution space on the main axis (justify-content).
             */
            mainDistributedSpace?: BoxStyle;
            /**
             * Style of content-distribution space on the cross axis (align-content).
             */
            crossDistributedSpace?: BoxStyle;
            /**
             * Style of empty space caused by row gaps (gap/row-gap).
             */
            rowGapSpace?: BoxStyle;
            /**
             * Style of empty space caused by columns gaps (gap/column-gap).
             */
            columnGapSpace?: BoxStyle;
            /**
             * Style of the self-alignment line (align-items).
             */
            crossAlignment?: LineStyle;
        }

        /**
         * Configuration data for the highlighting of Flex item elements.
         */
        interface FlexItemHighlightConfig {
            /**
             * Style of the box representing the item's base size
             */
            baseSizeBox?: BoxStyle;
            /**
             * Style of the border around the box representing the item's base size
             */
            baseSizeBorder?: LineStyle;
            /**
             * Style of the arrow representing if the item grew or shrank
             */
            flexibilityArrow?: LineStyle;
        }

        const enum LineStylePattern {
            Dashed = 'dashed',
            Dotted = 'dotted',
        }

        /**
         * Style information for drawing a line.
         */
        interface LineStyle {
            /**
             * The color of the line (default: transparent)
             */
            color?: DOM.RGBA;
            /**
             * The line pattern (default: solid) (LineStylePattern enum)
             */
            pattern?: ('dashed' | 'dotted');
        }

        /**
         * Style information for drawing a box.
         */
        interface BoxStyle {
            /**
             * The background color for the box (default: transparent)
             */
            fillColor?: DOM.RGBA;
            /**
             * The hatching color for the box (default: transparent)
             */
            hatchColor?: DOM.RGBA;
        }

        type ContrastAlgorithm = ('aa' | 'aaa' | 'apca');

        /**
         * Configuration data for the highlighting of page elements.
         */
        interface HighlightConfig {
            /**
             * Whether the node info tooltip should be shown (default: false).
             */
            showInfo?: boolean;
            /**
             * Whether the node styles in the tooltip (default: false).
             */
            showStyles?: boolean;
            /**
             * Whether the rulers should be shown (default: false).
             */
            showRulers?: boolean;
            /**
             * Whether the a11y info should be shown (default: true).
             */
            showAccessibilityInfo?: boolean;
            /**
             * Whether the extension lines from node to the rulers should be shown (default: false).
             */
            showExtensionLines?: boolean;
            /**
             * The content box highlight fill color (default: transparent).
             */
            contentColor?: DOM.RGBA;
            /**
             * The padding highlight fill color (default: transparent).
             */
            paddingColor?: DOM.RGBA;
            /**
             * The border highlight fill color (default: transparent).
             */
            borderColor?: DOM.RGBA;
            /**
             * The margin highlight fill color (default: transparent).
             */
            marginColor?: DOM.RGBA;
            /**
             * The event target element highlight fill color (default: transparent).
             */
            eventTargetColor?: DOM.RGBA;
            /**
             * The shape outside fill color (default: transparent).
             */
            shapeColor?: DOM.RGBA;
            /**
             * The shape margin fill color (default: transparent).
             */
            shapeMarginColor?: DOM.RGBA;
            /**
             * The grid layout color (default: transparent).
             */
            cssGridColor?: DOM.RGBA;
            /**
             * The color format used to format color styles (default: hex).
             */
            colorFormat?: ColorFormat;
            /**
             * The grid layout highlight configuration (default: all transparent).
             */
            gridHighlightConfig?: GridHighlightConfig;
            /**
             * The flex container highlight configuration (default: all transparent).
             */
            flexContainerHighlightConfig?: FlexContainerHighlightConfig;
            /**
             * The flex item highlight configuration (default: all transparent).
             */
            flexItemHighlightConfig?: FlexItemHighlightConfig;
            /**
             * The contrast algorithm to use for the contrast ratio (default: aa).
             */
            contrastAlgorithm?: ContrastAlgorithm;
            /**
             * The container query container highlight configuration (default: all transparent).
             */
            containerQueryContainerHighlightConfig?: ContainerQueryContainerHighlightConfig;
        }

        type ColorFormat = ('rgb' | 'hsl' | 'hwb' | 'hex');

        /**
         * Configurations for Persistent Grid Highlight
         */
        interface GridNodeHighlightConfig {
            /**
             * A descriptor for the highlight appearance.
             */
            gridHighlightConfig: GridHighlightConfig;
            /**
             * Identifier of the node to highlight.
             */
            nodeId: DOM.NodeId;
        }

        interface FlexNodeHighlightConfig {
            /**
             * A descriptor for the highlight appearance of flex containers.
             */
            flexContainerHighlightConfig: FlexContainerHighlightConfig;
            /**
             * Identifier of the node to highlight.
             */
            nodeId: DOM.NodeId;
        }

        interface ScrollSnapContainerHighlightConfig {
            /**
             * The style of the snapport border (default: transparent)
             */
            snapportBorder?: LineStyle;
            /**
             * The style of the snap area border (default: transparent)
             */
            snapAreaBorder?: LineStyle;
            /**
             * The margin highlight fill color (default: transparent).
             */
            scrollMarginColor?: DOM.RGBA;
            /**
             * The padding highlight fill color (default: transparent).
             */
            scrollPaddingColor?: DOM.RGBA;
        }

        interface ScrollSnapHighlightConfig {
            /**
             * A descriptor for the highlight appearance of scroll snap containers.
             */
            scrollSnapContainerHighlightConfig: ScrollSnapContainerHighlightConfig;
            /**
             * Identifier of the node to highlight.
             */
            nodeId: DOM.NodeId;
        }

        /**
         * Configuration for dual screen hinge
         */
        interface HingeConfig {
            /**
             * A rectangle represent hinge
             */
            rect: DOM.Rect;
            /**
             * The content box highlight fill color (default: a dark color).
             */
            contentColor?: DOM.RGBA;
            /**
             * The content box highlight outline color (default: transparent).
             */
            outlineColor?: DOM.RGBA;
        }

        interface ContainerQueryHighlightConfig {
            /**
             * A descriptor for the highlight appearance of container query containers.
             */
            containerQueryContainerHighlightConfig: ContainerQueryContainerHighlightConfig;
            /**
             * Identifier of the container node to highlight.
             */
            nodeId: DOM.NodeId;
        }

        interface ContainerQueryContainerHighlightConfig {
            /**
             * The style of the container border.
             */
            containerBorder?: LineStyle;
            /**
             * The style of the descendants' borders.
             */
            descendantBorder?: LineStyle;
        }

        interface IsolatedElementHighlightConfig {
            /**
             * A descriptor for the highlight appearance of an element in isolation mode.
             */
            isolationModeHighlightConfig: IsolationModeHighlightConfig;
            /**
             * Identifier of the isolated element to highlight.
             */
            nodeId: DOM.NodeId;
        }

        interface IsolationModeHighlightConfig {
            /**
             * The fill color of the resizers (default: transparent).
             */
            resizerColor?: DOM.RGBA;
            /**
             * The fill color for resizer handles (default: transparent).
             */
            resizerHandleColor?: DOM.RGBA;
            /**
             * The fill color for the mask covering non-isolated elements (default: transparent).
             */
            maskColor?: DOM.RGBA;
        }

        type InspectMode = ('searchForNode' | 'searchForUAShadowDOM' | 'captureAreaScreenshot' | 'showDistances' | 'none');

        interface GetHighlightObjectForTestRequest {
            /**
             * Id of the node to get highlight object for.
             */
            nodeId: DOM.NodeId;
            /**
             * Whether to include distance info.
             */
            includeDistance?: boolean;
            /**
             * Whether to include style info.
             */
            includeStyle?: boolean;
            /**
             * The color format to get config with (default: hex).
             */
            colorFormat?: ColorFormat;
            /**
             * Whether to show accessibility info (default: true).
             */
            showAccessibilityInfo?: boolean;
        }

        interface GetHighlightObjectForTestResponse {
            /**
             * Highlight data for the node.
             */
            highlight: any;
        }

        interface GetGridHighlightObjectsForTestRequest {
            /**
             * Ids of the node to get highlight object for.
             */
            nodeIds: DOM.NodeId[];
        }

        interface GetGridHighlightObjectsForTestResponse {
            /**
             * Grid Highlight data for the node ids provided.
             */
            highlights: any;
        }

        interface GetSourceOrderHighlightObjectForTestRequest {
            /**
             * Id of the node to highlight.
             */
            nodeId: DOM.NodeId;
        }

        interface GetSourceOrderHighlightObjectForTestResponse {
            /**
             * Source order highlight data for the node id provided.
             */
            highlight: any;
        }

        interface HighlightFrameRequest {
            /**
             * Identifier of the frame to highlight.
             */
            frameId: Page.FrameId;
            /**
             * The content box highlight fill color (default: transparent).
             */
            contentColor?: DOM.RGBA;
            /**
             * The content box highlight outline color (default: transparent).
             */
            contentOutlineColor?: DOM.RGBA;
        }

        interface HighlightNodeRequest {
            /**
             * A descriptor for the highlight appearance.
             */
            highlightConfig: HighlightConfig;
            /**
             * Identifier of the node to highlight.
             */
            nodeId?: DOM.NodeId;
            /**
             * Identifier of the backend node to highlight.
             */
            backendNodeId?: DOM.BackendNodeId;
            /**
             * JavaScript object id of the node to be highlighted.
             */
            objectId?: Runtime.RemoteObjectId;
            /**
             * Selectors to highlight relevant nodes.
             */
            selector?: string;
        }

        interface HighlightQuadRequest {
            /**
             * Quad to highlight
             */
            quad: DOM.Quad;
            /**
             * The highlight fill color (default: transparent).
             */
            color?: DOM.RGBA;
            /**
             * The highlight outline color (default: transparent).
             */
            outlineColor?: DOM.RGBA;
        }

        interface HighlightRectRequest {
            /**
             * X coordinate
             */
            x: integer;
            /**
             * Y coordinate
             */
            y: integer;
            /**
             * Rectangle width
             */
            width: integer;
            /**
             * Rectangle height
             */
            height: integer;
            /**
             * The highlight fill color (default: transparent).
             */
            color?: DOM.RGBA;
            /**
             * The highlight outline color (default: transparent).
             */
            outlineColor?: DOM.RGBA;
        }

        interface HighlightSourceOrderRequest {
            /**
             * A descriptor for the appearance of the overlay drawing.
             */
            sourceOrderConfig: SourceOrderConfig;
            /**
             * Identifier of the node to highlight.
             */
            nodeId?: DOM.NodeId;
            /**
             * Identifier of the backend node to highlight.
             */
            backendNodeId?: DOM.BackendNodeId;
            /**
             * JavaScript object id of the node to be highlighted.
             */
            objectId?: Runtime.RemoteObjectId;
        }

        interface SetInspectModeRequest {
            /**
             * Set an inspection mode.
             */
            mode: InspectMode;
            /**
             * A descriptor for the highlight appearance of hovered-over nodes. May be omitted if `enabled
             * == false`.
             */
            highlightConfig?: HighlightConfig;
        }

        interface SetShowAdHighlightsRequest {
            /**
             * True for showing ad highlights
             */
            show: boolean;
        }

        interface SetPausedInDebuggerMessageRequest {
            /**
             * The message to display, also triggers resume and step over controls.
             */
            message?: string;
        }

        interface SetShowDebugBordersRequest {
            /**
             * True for showing debug borders
             */
            show: boolean;
        }

        interface SetShowFPSCounterRequest {
            /**
             * True for showing the FPS counter
             */
            show: boolean;
        }

        interface SetShowGridOverlaysRequest {
            /**
             * An array of node identifiers and descriptors for the highlight appearance.
             */
            gridNodeHighlightConfigs: GridNodeHighlightConfig[];
        }

        interface SetShowFlexOverlaysRequest {
            /**
             * An array of node identifiers and descriptors for the highlight appearance.
             */
            flexNodeHighlightConfigs: FlexNodeHighlightConfig[];
        }

        interface SetShowScrollSnapOverlaysRequest {
            /**
             * An array of node identifiers and descriptors for the highlight appearance.
             */
            scrollSnapHighlightConfigs: ScrollSnapHighlightConfig[];
        }

        interface SetShowContainerQueryOverlaysRequest {
            /**
             * An array of node identifiers and descriptors for the highlight appearance.
             */
            containerQueryHighlightConfigs: ContainerQueryHighlightConfig[];
        }

        interface SetShowPaintRectsRequest {
            /**
             * True for showing paint rectangles
             */
            result: boolean;
        }

        interface SetShowLayoutShiftRegionsRequest {
            /**
             * True for showing layout shift regions
             */
            result: boolean;
        }

        interface SetShowScrollBottleneckRectsRequest {
            /**
             * True for showing scroll bottleneck rects
             */
            show: boolean;
        }

        interface SetShowHitTestBordersRequest {
            /**
             * True for showing hit-test borders
             */
            show: boolean;
        }

        interface SetShowWebVitalsRequest {
            show: boolean;
        }

        interface SetShowViewportSizeOnResizeRequest {
            /**
             * Whether to paint size or not.
             */
            show: boolean;
        }

        interface SetShowHingeRequest {
            /**
             * hinge data, null means hideHinge
             */
            hingeConfig?: HingeConfig;
        }

        interface SetShowIsolatedElementsRequest {
            /**
             * An array of node identifiers and descriptors for the highlight appearance.
             */
            isolatedElementHighlightConfigs: IsolatedElementHighlightConfig[];
        }

        /**
         * Fired when the node should be inspected. This happens after call to `setInspectMode` or when
         * user manually inspects an element.
         */
        interface InspectNodeRequestedEvent {
            /**
             * Id of the node to inspect.
             */
            backendNodeId: DOM.BackendNodeId;
        }

        /**
         * Fired when the node should be highlighted. This happens after call to `setInspectMode`.
         */
        interface NodeHighlightRequestedEvent {
            nodeId: DOM.NodeId;
        }

        /**
         * Fired when user asks to capture screenshot of some area on the page.
         */
        interface ScreenshotRequestedEvent {
            /**
             * Viewport to capture, in device independent pixels (dip).
             */
            viewport: Page.Viewport;
        }
    }

    /**
     * Actions and events related to the inspected page belong to the page domain.
     */
    namespace Page {

        /**
         * Unique frame identifier.
         */
        type FrameId = string;

        /**
         * Indicates whether a frame has been identified as an ad.
         */
        type AdFrameType = ('none' | 'child' | 'root');

        type AdFrameExplanation = ('ParentIsAd' | 'CreatedByAdScript' | 'MatchedBlockingRule');

        /**
         * Indicates whether a frame has been identified as an ad and why.
         */
        interface AdFrameStatus {
            adFrameType: AdFrameType;
            explanations?: AdFrameExplanation[];
        }

        /**
         * Identifies the bottom-most script which caused the frame to be labelled
         * as an ad.
         */
        interface AdScriptId {
            /**
             * Script Id of the bottom-most script which caused the frame to be labelled
             * as an ad.
             */
            scriptId: Runtime.ScriptId;
            /**
             * Id of adScriptId's debugger.
             */
            debuggerId: Runtime.UniqueDebuggerId;
        }

        /**
         * Indicates whether the frame is a secure context and why it is the case.
         */
        type SecureContextType = ('Secure' | 'SecureLocalhost' | 'InsecureScheme' | 'InsecureAncestor');

        /**
         * Indicates whether the frame is cross-origin isolated and why it is the case.
         */
        type CrossOriginIsolatedContextType = ('Isolated' | 'NotIsolated' | 'NotIsolatedFeatureDisabled');

        type GatedAPIFeatures = ('SharedArrayBuffers' | 'SharedArrayBuffersTransferAllowed' | 'PerformanceMeasureMemory' | 'PerformanceProfile');

        /**
         * All Permissions Policy features. This enum should match the one defined
         * in third_party/blink/renderer/core/permissions_policy/permissions_policy_features.json5.
         */
        type PermissionsPolicyFeature = ('accelerometer' | 'ambient-light-sensor' | 'attribution-reporting' | 'autoplay' | 'bluetooth' | 'browsing-topics' | 'camera' | 'ch-dpr' | 'ch-device-memory' | 'ch-downlink' | 'ch-ect' | 'ch-prefers-color-scheme' | 'ch-prefers-reduced-motion' | 'ch-rtt' | 'ch-save-data' | 'ch-ua' | 'ch-ua-arch' | 'ch-ua-bitness' | 'ch-ua-platform' | 'ch-ua-model' | 'ch-ua-mobile' | 'ch-ua-form-factor' | 'ch-ua-full-version' | 'ch-ua-full-version-list' | 'ch-ua-platform-version' | 'ch-ua-wow64' | 'ch-viewport-height' | 'ch-viewport-width' | 'ch-width' | 'clipboard-read' | 'clipboard-write' | 'compute-pressure' | 'cross-origin-isolated' | 'direct-sockets' | 'display-capture' | 'document-domain' | 'encrypted-media' | 'execution-while-out-of-viewport' | 'execution-while-not-rendered' | 'focus-without-user-activation' | 'fullscreen' | 'frobulate' | 'gamepad' | 'geolocation' | 'gyroscope' | 'hid' | 'identity-credentials-get' | 'idle-detection' | 'interest-cohort' | 'join-ad-interest-group' | 'keyboard-map' | 'local-fonts' | 'magnetometer' | 'microphone' | 'midi' | 'otp-credentials' | 'payment' | 'picture-in-picture' | 'private-aggregation' | 'private-state-token-issuance' | 'private-state-token-redemption' | 'publickey-credentials-get' | 'run-ad-auction' | 'screen-wake-lock' | 'serial' | 'shared-autofill' | 'shared-storage' | 'shared-storage-select-url' | 'smart-card' | 'storage-access' | 'sync-xhr' | 'unload' | 'usb' | 'vertical-scroll' | 'web-share' | 'window-management' | 'window-placement' | 'xr-spatial-tracking');

        /**
         * Reason for a permissions policy feature to be disabled.
         */
        type PermissionsPolicyBlockReason = ('Header' | 'IframeAttribute' | 'InFencedFrameTree' | 'InIsolatedApp');

        interface PermissionsPolicyBlockLocator {
            frameId: FrameId;
            blockReason: PermissionsPolicyBlockReason;
        }

        interface PermissionsPolicyFeatureState {
            feature: PermissionsPolicyFeature;
            allowed: boolean;
            locator?: PermissionsPolicyBlockLocator;
        }

        /**
         * Origin Trial(https://www.chromium.org/blink/origin-trials) support.
         * Status for an Origin Trial token.
         */
        type OriginTrialTokenStatus = ('Success' | 'NotSupported' | 'Insecure' | 'Expired' | 'WrongOrigin' | 'InvalidSignature' | 'Malformed' | 'WrongVersion' | 'FeatureDisabled' | 'TokenDisabled' | 'FeatureDisabledForUser' | 'UnknownTrial');

        /**
         * Status for an Origin Trial.
         */
        type OriginTrialStatus = ('Enabled' | 'ValidTokenNotProvided' | 'OSNotSupported' | 'TrialNotAllowed');

        type OriginTrialUsageRestriction = ('None' | 'Subset');

        interface OriginTrialToken {
            origin: string;
            matchSubDomains: boolean;
            trialName: string;
            expiryTime: Network.TimeSinceEpoch;
            isThirdParty: boolean;
            usageRestriction: OriginTrialUsageRestriction;
        }

        interface OriginTrialTokenWithStatus {
            rawTokenText: string;
            /**
             * `parsedToken` is present only when the token is extractable and
             * parsable.
             */
            parsedToken?: OriginTrialToken;
            status: OriginTrialTokenStatus;
        }

        interface OriginTrial {
            trialName: string;
            status: OriginTrialStatus;
            tokensWithStatus: OriginTrialTokenWithStatus[];
        }

        /**
         * Information about the Frame on the page.
         */
        interface Frame {
            /**
             * Frame unique identifier.
             */
            id: FrameId;
            /**
             * Parent frame identifier.
             */
            parentId?: FrameId;
            /**
             * Identifier of the loader associated with this frame.
             */
            loaderId: Network.LoaderId;
            /**
             * Frame's name as specified in the tag.
             */
            name?: string;
            /**
             * Frame document's URL without fragment.
             */
            url: string;
            /**
             * Frame document's URL fragment including the '#'.
             */
            urlFragment?: string;
            /**
             * Frame document's registered domain, taking the public suffixes list into account.
             * Extracted from the Frame's url.
             * Example URLs: http://www.google.com/file.html -> "google.com"
             *               http://a.b.co.uk/file.html      -> "b.co.uk"
             */
            domainAndRegistry: string;
            /**
             * Frame document's security origin.
             */
            securityOrigin: string;
            /**
             * Frame document's mimeType as determined by the browser.
             */
            mimeType: string;
            /**
             * If the frame failed to load, this contains the URL that could not be loaded. Note that unlike url above, this URL may contain a fragment.
             */
            unreachableUrl?: string;
            /**
             * Indicates whether this frame was tagged as an ad and why.
             */
            adFrameStatus?: AdFrameStatus;
            /**
             * Indicates whether the main document is a secure context and explains why that is the case.
             */
            secureContextType: SecureContextType;
            /**
             * Indicates whether this is a cross origin isolated context.
             */
            crossOriginIsolatedContextType: CrossOriginIsolatedContextType;
            /**
             * Indicated which gated APIs / features are available.
             */
            gatedAPIFeatures: GatedAPIFeatures[];
        }

        /**
         * Information about the Resource on the page.
         */
        interface FrameResource {
            /**
             * Resource URL.
             */
            url: string;
            /**
             * Type of this resource.
             */
            type: Network.ResourceType;
            /**
             * Resource mimeType as determined by the browser.
             */
            mimeType: string;
            /**
             * last-modified timestamp as reported by server.
             */
            lastModified?: Network.TimeSinceEpoch;
            /**
             * Resource content size.
             */
            contentSize?: number;
            /**
             * True if the resource failed to load.
             */
            failed?: boolean;
            /**
             * True if the resource was canceled during loading.
             */
            canceled?: boolean;
        }

        /**
         * Information about the Frame hierarchy along with their cached resources.
         */
        interface FrameResourceTree {
            /**
             * Frame information for this tree item.
             */
            frame: Frame;
            /**
             * Child frames.
             */
            childFrames?: FrameResourceTree[];
            /**
             * Information about frame resources.
             */
            resources: FrameResource[];
        }

        /**
         * Information about the Frame hierarchy.
         */
        interface FrameTree {
            /**
             * Frame information for this tree item.
             */
            frame: Frame;
            /**
             * Child frames.
             */
            childFrames?: FrameTree[];
        }

        /**
         * Unique script identifier.
         */
        type ScriptIdentifier = string;

        /**
         * Transition type.
         */
        type TransitionType = ('link' | 'typed' | 'address_bar' | 'auto_bookmark' | 'auto_subframe' | 'manual_subframe' | 'generated' | 'auto_toplevel' | 'form_submit' | 'reload' | 'keyword' | 'keyword_generated' | 'other');

        /**
         * Navigation history entry.
         */
        interface NavigationEntry {
            /**
             * Unique id of the navigation history entry.
             */
            id: integer;
            /**
             * URL of the navigation history entry.
             */
            url: string;
            /**
             * URL that the user typed in the url bar.
             */
            userTypedURL: string;
            /**
             * Title of the navigation history entry.
             */
            title: string;
            /**
             * Transition type.
             */
            transitionType: TransitionType;
        }

        /**
         * Screencast frame metadata.
         */
        interface ScreencastFrameMetadata {
            /**
             * Top offset in DIP.
             */
            offsetTop: number;
            /**
             * Page scale factor.
             */
            pageScaleFactor: number;
            /**
             * Device screen width in DIP.
             */
            deviceWidth: number;
            /**
             * Device screen height in DIP.
             */
            deviceHeight: number;
            /**
             * Position of horizontal scroll in CSS pixels.
             */
            scrollOffsetX: number;
            /**
             * Position of vertical scroll in CSS pixels.
             */
            scrollOffsetY: number;
            /**
             * Frame swap timestamp.
             */
            timestamp?: Network.TimeSinceEpoch;
        }

        /**
         * Javascript dialog type.
         */
        type DialogType = ('alert' | 'confirm' | 'prompt' | 'beforeunload');

        /**
         * Error while paring app manifest.
         */
        interface AppManifestError {
            /**
             * Error message.
             */
            message: string;
            /**
             * If criticial, this is a non-recoverable parse error.
             */
            critical: integer;
            /**
             * Error line.
             */
            line: integer;
            /**
             * Error column.
             */
            column: integer;
        }

        /**
         * Parsed app manifest properties.
         */
        interface AppManifestParsedProperties {
            /**
             * Computed scope value
             */
            scope: string;
        }

        /**
         * Layout viewport position and dimensions.
         */
        interface LayoutViewport {
            /**
             * Horizontal offset relative to the document (CSS pixels).
             */
            pageX: integer;
            /**
             * Vertical offset relative to the document (CSS pixels).
             */
            pageY: integer;
            /**
             * Width (CSS pixels), excludes scrollbar if present.
             */
            clientWidth: integer;
            /**
             * Height (CSS pixels), excludes scrollbar if present.
             */
            clientHeight: integer;
        }

        /**
         * Visual viewport position, dimensions, and scale.
         */
        interface VisualViewport {
            /**
             * Horizontal offset relative to the layout viewport (CSS pixels).
             */
            offsetX: number;
            /**
             * Vertical offset relative to the layout viewport (CSS pixels).
             */
            offsetY: number;
            /**
             * Horizontal offset relative to the document (CSS pixels).
             */
            pageX: number;
            /**
             * Vertical offset relative to the document (CSS pixels).
             */
            pageY: number;
            /**
             * Width (CSS pixels), excludes scrollbar if present.
             */
            clientWidth: number;
            /**
             * Height (CSS pixels), excludes scrollbar if present.
             */
            clientHeight: number;
            /**
             * Scale relative to the ideal viewport (size at width=device-width).
             */
            scale: number;
            /**
             * Page zoom factor (CSS to device independent pixels ratio).
             */
            zoom?: number;
        }

        /**
         * Viewport for capturing screenshot.
         */
        interface Viewport {
            /**
             * X offset in device independent pixels (dip).
             */
            x: number;
            /**
             * Y offset in device independent pixels (dip).
             */
            y: number;
            /**
             * Rectangle width in device independent pixels (dip).
             */
            width: number;
            /**
             * Rectangle height in device independent pixels (dip).
             */
            height: number;
            /**
             * Page scale factor.
             */
            scale: number;
        }

        /**
         * Generic font families collection.
         */
        interface FontFamilies {
            /**
             * The standard font-family.
             */
            standard?: string;
            /**
             * The fixed font-family.
             */
            fixed?: string;
            /**
             * The serif font-family.
             */
            serif?: string;
            /**
             * The sansSerif font-family.
             */
            sansSerif?: string;
            /**
             * The cursive font-family.
             */
            cursive?: string;
            /**
             * The fantasy font-family.
             */
            fantasy?: string;
            /**
             * The math font-family.
             */
            math?: string;
        }

        /**
         * Font families collection for a script.
         */
        interface ScriptFontFamilies {
            /**
             * Name of the script which these font families are defined for.
             */
            script: string;
            /**
             * Generic font families collection for the script.
             */
            fontFamilies: FontFamilies;
        }

        /**
         * Default font sizes.
         */
        interface FontSizes {
            /**
             * Default standard font size.
             */
            standard?: integer;
            /**
             * Default fixed font size.
             */
            fixed?: integer;
        }

        type ClientNavigationReason = ('formSubmissionGet' | 'formSubmissionPost' | 'httpHeaderRefresh' | 'scriptInitiated' | 'metaTagRefresh' | 'pageBlockInterstitial' | 'reload' | 'anchorClick');

        type ClientNavigationDisposition = ('currentTab' | 'newTab' | 'newWindow' | 'download');

        interface InstallabilityErrorArgument {
            /**
             * Argument name (e.g. name:'minimum-icon-size-in-pixels').
             */
            name: string;
            /**
             * Argument value (e.g. value:'64').
             */
            value: string;
        }

        /**
         * The installability error
         */
        interface InstallabilityError {
            /**
             * The error id (e.g. 'manifest-missing-suitable-icon').
             */
            errorId: string;
            /**
             * The list of error arguments (e.g. {name:'minimum-icon-size-in-pixels', value:'64'}).
             */
            errorArguments: InstallabilityErrorArgument[];
        }

        /**
         * The referring-policy used for the navigation.
         */
        type ReferrerPolicy = ('noReferrer' | 'noReferrerWhenDowngrade' | 'origin' | 'originWhenCrossOrigin' | 'sameOrigin' | 'strictOrigin' | 'strictOriginWhenCrossOrigin' | 'unsafeUrl');

        /**
         * Per-script compilation cache parameters for `Page.produceCompilationCache`
         */
        interface CompilationCacheParams {
            /**
             * The URL of the script to produce a compilation cache entry for.
             */
            url: string;
            /**
             * A hint to the backend whether eager compilation is recommended.
             * (the actual compilation mode used is upon backend discretion).
             */
            eager?: boolean;
        }

        /**
         * Enum of possible auto-reponse for permisison / prompt dialogs.
         */
        type AutoResponseMode = ('none' | 'autoAccept' | 'autoReject' | 'autoOptOut');

        /**
         * The type of a frameNavigated event.
         */
        type NavigationType = ('Navigation' | 'BackForwardCacheRestore');

        /**
         * List of not restored reasons for back-forward cache.
         */
        type BackForwardCacheNotRestoredReason = ('NotPrimaryMainFrame' | 'BackForwardCacheDisabled' | 'RelatedActiveContentsExist' | 'HTTPStatusNotOK' | 'SchemeNotHTTPOrHTTPS' | 'Loading' | 'WasGrantedMediaAccess' | 'DisableForRenderFrameHostCalled' | 'DomainNotAllowed' | 'HTTPMethodNotGET' | 'SubframeIsNavigating' | 'Timeout' | 'CacheLimit' | 'JavaScriptExecution' | 'RendererProcessKilled' | 'RendererProcessCrashed' | 'SchedulerTrackedFeatureUsed' | 'ConflictingBrowsingInstance' | 'CacheFlushed' | 'ServiceWorkerVersionActivation' | 'SessionRestored' | 'ServiceWorkerPostMessage' | 'EnteredBackForwardCacheBeforeServiceWorkerHostAdded' | 'RenderFrameHostReused_SameSite' | 'RenderFrameHostReused_CrossSite' | 'ServiceWorkerClaim' | 'IgnoreEventAndEvict' | 'HaveInnerContents' | 'TimeoutPuttingInCache' | 'BackForwardCacheDisabledByLowMemory' | 'BackForwardCacheDisabledByCommandLine' | 'NetworkRequestDatapipeDrainedAsBytesConsumer' | 'NetworkRequestRedirected' | 'NetworkRequestTimeout' | 'NetworkExceedsBufferLimit' | 'NavigationCancelledWhileRestoring' | 'NotMostRecentNavigationEntry' | 'BackForwardCacheDisabledForPrerender' | 'UserAgentOverrideDiffers' | 'ForegroundCacheLimit' | 'BrowsingInstanceNotSwapped' | 'BackForwardCacheDisabledForDelegate' | 'UnloadHandlerExistsInMainFrame' | 'UnloadHandlerExistsInSubFrame' | 'ServiceWorkerUnregistration' | 'CacheControlNoStore' | 'CacheControlNoStoreCookieModified' | 'CacheControlNoStoreHTTPOnlyCookieModified' | 'NoResponseHead' | 'Unknown' | 'ActivationNavigationsDisallowedForBug1234857' | 'ErrorDocument' | 'FencedFramesEmbedder' | 'CookieDisabled' | 'HTTPAuthRequired' | 'CookieFlushed' | 'WebSocket' | 'WebTransport' | 'WebRTC' | 'MainResourceHasCacheControlNoStore' | 'MainResourceHasCacheControlNoCache' | 'SubresourceHasCacheControlNoStore' | 'SubresourceHasCacheControlNoCache' | 'ContainsPlugins' | 'DocumentLoaded' | 'DedicatedWorkerOrWorklet' | 'OutstandingNetworkRequestOthers' | 'RequestedMIDIPermission' | 'RequestedAudioCapturePermission' | 'RequestedVideoCapturePermission' | 'RequestedBackForwardCacheBlockedSensors' | 'RequestedBackgroundWorkPermission' | 'BroadcastChannel' | 'WebXR' | 'SharedWorker' | 'WebLocks' | 'WebHID' | 'WebShare' | 'RequestedStorageAccessGrant' | 'WebNfc' | 'OutstandingNetworkRequestFetch' | 'OutstandingNetworkRequestXHR' | 'AppBanner' | 'Printing' | 'WebDatabase' | 'PictureInPicture' | 'Portal' | 'SpeechRecognizer' | 'IdleManager' | 'PaymentManager' | 'SpeechSynthesis' | 'KeyboardLock' | 'WebOTPService' | 'OutstandingNetworkRequestDirectSocket' | 'InjectedJavascript' | 'InjectedStyleSheet' | 'KeepaliveRequest' | 'IndexedDBEvent' | 'Dummy' | 'JsNetworkRequestReceivedCacheControlNoStoreResource' | 'WebRTCSticky' | 'WebTransportSticky' | 'WebSocketSticky' | 'ContentSecurityHandler' | 'ContentWebAuthenticationAPI' | 'ContentFileChooser' | 'ContentSerial' | 'ContentFileSystemAccess' | 'ContentMediaDevicesDispatcherHost' | 'ContentWebBluetooth' | 'ContentWebUSB' | 'ContentMediaSessionService' | 'ContentScreenReader' | 'EmbedderPopupBlockerTabHelper' | 'EmbedderSafeBrowsingTriggeredPopupBlocker' | 'EmbedderSafeBrowsingThreatDetails' | 'EmbedderAppBannerManager' | 'EmbedderDomDistillerViewerSource' | 'EmbedderDomDistillerSelfDeletingRequestDelegate' | 'EmbedderOomInterventionTabHelper' | 'EmbedderOfflinePage' | 'EmbedderChromePasswordManagerClientBindCredentialManager' | 'EmbedderPermissionRequestManager' | 'EmbedderModalDialog' | 'EmbedderExtensions' | 'EmbedderExtensionMessaging' | 'EmbedderExtensionMessagingForOpenPort' | 'EmbedderExtensionSentMessageToCachedFrame');

        /**
         * Types of not restored reasons for back-forward cache.
         */
        type BackForwardCacheNotRestoredReasonType = ('SupportPending' | 'PageSupportNeeded' | 'Circumstantial');

        interface BackForwardCacheNotRestoredExplanation {
            /**
             * Type of the reason
             */
            type: BackForwardCacheNotRestoredReasonType;
            /**
             * Not restored reason
             */
            reason: BackForwardCacheNotRestoredReason;
            /**
             * Context associated with the reason. The meaning of this context is
             * dependent on the reason:
             * - EmbedderExtensionSentMessageToCachedFrame: the extension ID.
             */
            context?: string;
        }

        interface BackForwardCacheNotRestoredExplanationTree {
            /**
             * URL of each frame
             */
            url: string;
            /**
             * Not restored reasons of each frame
             */
            explanations: BackForwardCacheNotRestoredExplanation[];
            /**
             * Array of children frame
             */
            children: BackForwardCacheNotRestoredExplanationTree[];
        }

        interface AddScriptToEvaluateOnLoadRequest {
            scriptSource: string;
        }

        interface AddScriptToEvaluateOnLoadResponse {
            /**
             * Identifier of the added script.
             */
            identifier: ScriptIdentifier;
        }

        interface AddScriptToEvaluateOnNewDocumentRequest {
            source: string;
            /**
             * If specified, creates an isolated world with the given name and evaluates given script in it.
             * This world name will be used as the ExecutionContextDescription::name when the corresponding
             * event is emitted.
             */
            worldName?: string;
            /**
             * Specifies whether command line API should be available to the script, defaults
             * to false.
             */
            includeCommandLineAPI?: boolean;
            /**
             * If true, runs the script immediately on existing execution contexts or worlds.
             * Default: false.
             */
            runImmediately?: boolean;
        }

        interface AddScriptToEvaluateOnNewDocumentResponse {
            /**
             * Identifier of the added script.
             */
            identifier: ScriptIdentifier;
        }

        const enum CaptureScreenshotRequestFormat {
            Jpeg = 'jpeg',
            Png = 'png',
            Webp = 'webp',
        }

        interface CaptureScreenshotRequest {
            /**
             * Image compression format (defaults to png). (CaptureScreenshotRequestFormat enum)
             */
            format?: ('jpeg' | 'png' | 'webp');
            /**
             * Compression quality from range [0..100] (jpeg only).
             */
            quality?: integer;
            /**
             * Capture the screenshot of a given region only.
             */
            clip?: Viewport;
            /**
             * Capture the screenshot from the surface, rather than the view. Defaults to true.
             */
            fromSurface?: boolean;
            /**
             * Capture the screenshot beyond the viewport. Defaults to false.
             */
            captureBeyondViewport?: boolean;
            /**
             * Optimize image encoding for speed, not for resulting size (defaults to false)
             */
            optimizeForSpeed?: boolean;
        }

        interface CaptureScreenshotResponse {
            /**
             * Base64-encoded image data. (Encoded as a base64 string when passed over JSON)
             */
            data: string;
        }

        const enum CaptureSnapshotRequestFormat {
            MHTML = 'mhtml',
        }

        interface CaptureSnapshotRequest {
            /**
             * Format (defaults to mhtml). (CaptureSnapshotRequestFormat enum)
             */
            format?: ('mhtml');
        }

        interface CaptureSnapshotResponse {
            /**
             * Serialized page data.
             */
            data: string;
        }

        interface CreateIsolatedWorldRequest {
            /**
             * Id of the frame in which the isolated world should be created.
             */
            frameId: FrameId;
            /**
             * An optional name which is reported in the Execution Context.
             */
            worldName?: string;
            /**
             * Whether or not universal access should be granted to the isolated world. This is a powerful
             * option, use with caution.
             */
            grantUniveralAccess?: boolean;
        }

        interface CreateIsolatedWorldResponse {
            /**
             * Execution context of the isolated world.
             */
            executionContextId: Runtime.ExecutionContextId;
        }

        interface DeleteCookieRequest {
            /**
             * Name of the cookie to remove.
             */
            cookieName: string;
            /**
             * URL to match cooke domain and path.
             */
            url: string;
        }

        interface GetAppManifestResponse {
            /**
             * Manifest location.
             */
            url: string;
            errors: AppManifestError[];
            /**
             * Manifest content.
             */
            data?: string;
            /**
             * Parsed manifest properties
             */
            parsed?: AppManifestParsedProperties;
        }

        interface GetInstallabilityErrorsResponse {
            installabilityErrors: InstallabilityError[];
        }

        interface GetManifestIconsResponse {
            primaryIcon?: string;
        }

        interface GetAppIdResponse {
            /**
             * App id, either from manifest's id attribute or computed from start_url
             */
            appId?: string;
            /**
             * Recommendation for manifest's id attribute to match current id computed from start_url
             */
            recommendedId?: string;
        }

        interface GetAdScriptIdRequest {
            frameId: FrameId;
        }

        interface GetAdScriptIdResponse {
            /**
             * Identifies the bottom-most script which caused the frame to be labelled
             * as an ad. Only sent if frame is labelled as an ad and id is available.
             */
            adScriptId?: AdScriptId;
        }

        interface GetCookiesResponse {
            /**
             * Array of cookie objects.
             */
            cookies: Network.Cookie[];
        }

        interface GetFrameTreeResponse {
            /**
             * Present frame tree structure.
             */
            frameTree: FrameTree;
        }

        interface GetLayoutMetricsResponse {
            /**
             * Deprecated metrics relating to the layout viewport. Is in device pixels. Use `cssLayoutViewport` instead.
             */
            layoutViewport: LayoutViewport;
            /**
             * Deprecated metrics relating to the visual viewport. Is in device pixels. Use `cssVisualViewport` instead.
             */
            visualViewport: VisualViewport;
            /**
             * Deprecated size of scrollable area. Is in DP. Use `cssContentSize` instead.
             */
            contentSize: DOM.Rect;
            /**
             * Metrics relating to the layout viewport in CSS pixels.
             */
            cssLayoutViewport: LayoutViewport;
            /**
             * Metrics relating to the visual viewport in CSS pixels.
             */
            cssVisualViewport: VisualViewport;
            /**
             * Size of scrollable area in CSS pixels.
             */
            cssContentSize: DOM.Rect;
        }

        interface GetNavigationHistoryResponse {
            /**
             * Index of the current navigation history entry.
             */
            currentIndex: integer;
            /**
             * Array of navigation history entries.
             */
            entries: NavigationEntry[];
        }

        interface GetResourceContentRequest {
            /**
             * Frame id to get resource for.
             */
            frameId: FrameId;
            /**
             * URL of the resource to get content for.
             */
            url: string;
        }

        interface GetResourceContentResponse {
            /**
             * Resource content.
             */
            content: string;
            /**
             * True, if content was served as base64.
             */
            base64Encoded: boolean;
        }

        interface GetResourceTreeResponse {
            /**
             * Present frame / resource tree structure.
             */
            frameTree: FrameResourceTree;
        }

        interface HandleJavaScriptDialogRequest {
            /**
             * Whether to accept or dismiss the dialog.
             */
            accept: boolean;
            /**
             * The text to enter into the dialog prompt before accepting. Used only if this is a prompt
             * dialog.
             */
            promptText?: string;
        }

        interface NavigateRequest {
            /**
             * URL to navigate the page to.
             */
            url: string;
            /**
             * Referrer URL.
             */
            referrer?: string;
            /**
             * Intended transition type.
             */
            transitionType?: TransitionType;
            /**
             * Frame id to navigate, if not specified navigates the top frame.
             */
            frameId?: FrameId;
            /**
             * Referrer-policy used for the navigation.
             */
            referrerPolicy?: ReferrerPolicy;
        }

        interface NavigateResponse {
            /**
             * Frame id that has navigated (or failed to navigate)
             */
            frameId: FrameId;
            /**
             * Loader identifier. This is omitted in case of same-document navigation,
             * as the previously committed loaderId would not change.
             */
            loaderId?: Network.LoaderId;
            /**
             * User friendly error message, present if and only if navigation has failed.
             */
            errorText?: string;
        }

        interface NavigateToHistoryEntryRequest {
            /**
             * Unique id of the entry to navigate to.
             */
            entryId: integer;
        }

        const enum PrintToPDFRequestTransferMode {
            ReturnAsBase64 = 'ReturnAsBase64',
            ReturnAsStream = 'ReturnAsStream',
        }

        interface PrintToPDFRequest {
            /**
             * Paper orientation. Defaults to false.
             */
            landscape?: boolean;
            /**
             * Display header and footer. Defaults to false.
             */
            displayHeaderFooter?: boolean;
            /**
             * Print background graphics. Defaults to false.
             */
            printBackground?: boolean;
            /**
             * Scale of the webpage rendering. Defaults to 1.
             */
            scale?: number;
            /**
             * Paper width in inches. Defaults to 8.5 inches.
             */
            paperWidth?: number;
            /**
             * Paper height in inches. Defaults to 11 inches.
             */
            paperHeight?: number;
            /**
             * Top margin in inches. Defaults to 1cm (~0.4 inches).
             */
            marginTop?: number;
            /**
             * Bottom margin in inches. Defaults to 1cm (~0.4 inches).
             */
            marginBottom?: number;
            /**
             * Left margin in inches. Defaults to 1cm (~0.4 inches).
             */
            marginLeft?: number;
            /**
             * Right margin in inches. Defaults to 1cm (~0.4 inches).
             */
            marginRight?: number;
            /**
             * Paper ranges to print, one based, e.g., '1-5, 8, 11-13'. Pages are
             * printed in the document order, not in the order specified, and no
             * more than once.
             * Defaults to empty string, which implies the entire document is printed.
             * The page numbers are quietly capped to actual page count of the
             * document, and ranges beyond the end of the document are ignored.
             * If this results in no pages to print, an error is reported.
             * It is an error to specify a range with start greater than end.
             */
            pageRanges?: string;
            /**
             * HTML template for the print header. Should be valid HTML markup with following
             * classes used to inject printing values into them:
             * - `date`: formatted print date
             * - `title`: document title
             * - `url`: document location
             * - `pageNumber`: current page number
             * - `totalPages`: total pages in the document
             * 
             * For example, `<span class=title></span>` would generate span containing the title.
             */
            headerTemplate?: string;
            /**
             * HTML template for the print footer. Should use the same format as the `headerTemplate`.
             */
            footerTemplate?: string;
            /**
             * Whether or not to prefer page size as defined by css. Defaults to false,
             * in which case the content will be scaled to fit the paper size.
             */
            preferCSSPageSize?: boolean;
            /**
             * return as stream (PrintToPDFRequestTransferMode enum)
             */
            transferMode?: ('ReturnAsBase64' | 'ReturnAsStream');
            /**
             * Whether or not to generate tagged (accessible) PDF. Defaults to embedder choice.
             */
            generateTaggedPDF?: boolean;
        }

        interface PrintToPDFResponse {
            /**
             * Base64-encoded pdf data. Empty if |returnAsStream| is specified. (Encoded as a base64 string when passed over JSON)
             */
            data: string;
            /**
             * A handle of the stream that holds resulting PDF data.
             */
            stream?: IO.StreamHandle;
        }

        interface ReloadRequest {
            /**
             * If true, browser cache is ignored (as if the user pressed Shift+refresh).
             */
            ignoreCache?: boolean;
            /**
             * If set, the script will be injected into all frames of the inspected page after reload.
             * Argument will be ignored if reloading dataURL origin.
             */
            scriptToEvaluateOnLoad?: string;
        }

        interface RemoveScriptToEvaluateOnLoadRequest {
            identifier: ScriptIdentifier;
        }

        interface RemoveScriptToEvaluateOnNewDocumentRequest {
            identifier: ScriptIdentifier;
        }

        interface ScreencastFrameAckRequest {
            /**
             * Frame number.
             */
            sessionId: integer;
        }

        interface SearchInResourceRequest {
            /**
             * Frame id for resource to search in.
             */
            frameId: FrameId;
            /**
             * URL of the resource to search in.
             */
            url: string;
            /**
             * String to search for.
             */
            query: string;
            /**
             * If true, search is case sensitive.
             */
            caseSensitive?: boolean;
            /**
             * If true, treats string parameter as regex.
             */
            isRegex?: boolean;
        }

        interface SearchInResourceResponse {
            /**
             * List of search matches.
             */
            result: Debugger.SearchMatch[];
        }

        interface SetAdBlockingEnabledRequest {
            /**
             * Whether to block ads.
             */
            enabled: boolean;
        }

        interface SetBypassCSPRequest {
            /**
             * Whether to bypass page CSP.
             */
            enabled: boolean;
        }

        interface GetPermissionsPolicyStateRequest {
            frameId: FrameId;
        }

        interface GetPermissionsPolicyStateResponse {
            states: PermissionsPolicyFeatureState[];
        }

        interface GetOriginTrialsRequest {
            frameId: FrameId;
        }

        interface GetOriginTrialsResponse {
            originTrials: OriginTrial[];
        }

        interface SetDeviceMetricsOverrideRequest {
            /**
             * Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.
             */
            width: integer;
            /**
             * Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.
             */
            height: integer;
            /**
             * Overriding device scale factor value. 0 disables the override.
             */
            deviceScaleFactor: number;
            /**
             * Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text
             * autosizing and more.
             */
            mobile: boolean;
            /**
             * Scale to apply to resulting view image.
             */
            scale?: number;
            /**
             * Overriding screen width value in pixels (minimum 0, maximum 10000000).
             */
            screenWidth?: integer;
            /**
             * Overriding screen height value in pixels (minimum 0, maximum 10000000).
             */
            screenHeight?: integer;
            /**
             * Overriding view X position on screen in pixels (minimum 0, maximum 10000000).
             */
            positionX?: integer;
            /**
             * Overriding view Y position on screen in pixels (minimum 0, maximum 10000000).
             */
            positionY?: integer;
            /**
             * Do not set visible view size, rely upon explicit setVisibleSize call.
             */
            dontSetVisibleSize?: boolean;
            /**
             * Screen orientation override.
             */
            screenOrientation?: Emulation.ScreenOrientation;
            /**
             * The viewport dimensions and scale. If not set, the override is cleared.
             */
            viewport?: Viewport;
        }

        interface SetDeviceOrientationOverrideRequest {
            /**
             * Mock alpha
             */
            alpha: number;
            /**
             * Mock beta
             */
            beta: number;
            /**
             * Mock gamma
             */
            gamma: number;
        }

        interface SetFontFamiliesRequest {
            /**
             * Specifies font families to set. If a font family is not specified, it won't be changed.
             */
            fontFamilies: FontFamilies;
            /**
             * Specifies font families to set for individual scripts.
             */
            forScripts?: ScriptFontFamilies[];
        }

        interface SetFontSizesRequest {
            /**
             * Specifies font sizes to set. If a font size is not specified, it won't be changed.
             */
            fontSizes: FontSizes;
        }

        interface SetDocumentContentRequest {
            /**
             * Frame id to set HTML for.
             */
            frameId: FrameId;
            /**
             * HTML content to set.
             */
            html: string;
        }

        const enum SetDownloadBehaviorRequestBehavior {
            Deny = 'deny',
            Allow = 'allow',
            Default = 'default',
        }

        interface SetDownloadBehaviorRequest {
            /**
             * Whether to allow all or deny all download requests, or use default Chrome behavior if
             * available (otherwise deny). (SetDownloadBehaviorRequestBehavior enum)
             */
            behavior: ('deny' | 'allow' | 'default');
            /**
             * The default path to save downloaded files to. This is required if behavior is set to 'allow'
             */
            downloadPath?: string;
        }

        interface SetGeolocationOverrideRequest {
            /**
             * Mock latitude
             */
            latitude?: number;
            /**
             * Mock longitude
             */
            longitude?: number;
            /**
             * Mock accuracy
             */
            accuracy?: number;
        }

        interface SetLifecycleEventsEnabledRequest {
            /**
             * If true, starts emitting lifecycle events.
             */
            enabled: boolean;
        }

        const enum SetTouchEmulationEnabledRequestConfiguration {
            Mobile = 'mobile',
            Desktop = 'desktop',
        }

        interface SetTouchEmulationEnabledRequest {
            /**
             * Whether the touch event emulation should be enabled.
             */
            enabled: boolean;
            /**
             * Touch/gesture events configuration. Default: current platform. (SetTouchEmulationEnabledRequestConfiguration enum)
             */
            configuration?: ('mobile' | 'desktop');
        }

        const enum StartScreencastRequestFormat {
            Jpeg = 'jpeg',
            Png = 'png',
        }

        interface StartScreencastRequest {
            /**
             * Image compression format. (StartScreencastRequestFormat enum)
             */
            format?: ('jpeg' | 'png');
            /**
             * Compression quality from range [0..100].
             */
            quality?: integer;
            /**
             * Maximum screenshot width.
             */
            maxWidth?: integer;
            /**
             * Maximum screenshot height.
             */
            maxHeight?: integer;
            /**
             * Send every n-th frame.
             */
            everyNthFrame?: integer;
        }

        const enum SetWebLifecycleStateRequestState {
            Frozen = 'frozen',
            Active = 'active',
        }

        interface SetWebLifecycleStateRequest {
            /**
             * Target lifecycle state (SetWebLifecycleStateRequestState enum)
             */
            state: ('frozen' | 'active');
        }

        interface ProduceCompilationCacheRequest {
            scripts: CompilationCacheParams[];
        }

        interface AddCompilationCacheRequest {
            url: string;
            /**
             * Base64-encoded data (Encoded as a base64 string when passed over JSON)
             */
            data: string;
        }

        interface SetSPCTransactionModeRequest {
            mode: AutoResponseMode;
        }

        interface SetRPHRegistrationModeRequest {
            mode: AutoResponseMode;
        }

        interface GenerateTestReportRequest {
            /**
             * Message to be displayed in the report.
             */
            message: string;
            /**
             * Specifies the endpoint group to deliver the report to.
             */
            group?: string;
        }

        interface SetInterceptFileChooserDialogRequest {
            enabled: boolean;
        }

        interface SetPrerenderingAllowedRequest {
            isAllowed: boolean;
        }

        interface DomContentEventFiredEvent {
            timestamp: Network.MonotonicTime;
        }

        const enum FileChooserOpenedEventMode {
            SelectSingle = 'selectSingle',
            SelectMultiple = 'selectMultiple',
        }

        /**
         * Emitted only when `page.interceptFileChooser` is enabled.
         */
        interface FileChooserOpenedEvent {
            /**
             * Id of the frame containing input node.
             */
            frameId: FrameId;
            /**
             * Input mode. (FileChooserOpenedEventMode enum)
             */
            mode: ('selectSingle' | 'selectMultiple');
            /**
             * Input node id. Only present for file choosers opened via an `<input type="file">` element.
             */
            backendNodeId?: DOM.BackendNodeId;
        }

        /**
         * Fired when frame has been attached to its parent.
         */
        interface FrameAttachedEvent {
            /**
             * Id of the frame that has been attached.
             */
            frameId: FrameId;
            /**
             * Parent frame identifier.
             */
            parentFrameId: FrameId;
            /**
             * JavaScript stack trace of when frame was attached, only set if frame initiated from script.
             */
            stack?: Runtime.StackTrace;
        }

        /**
         * Fired when frame no longer has a scheduled navigation.
         */
        interface FrameClearedScheduledNavigationEvent {
            /**
             * Id of the frame that has cleared its scheduled navigation.
             */
            frameId: FrameId;
        }

        const enum FrameDetachedEventReason {
            Remove = 'remove',
            Swap = 'swap',
        }

        /**
         * Fired when frame has been detached from its parent.
         */
        interface FrameDetachedEvent {
            /**
             * Id of the frame that has been detached.
             */
            frameId: FrameId;
            /**
             *  (FrameDetachedEventReason enum)
             */
            reason: ('remove' | 'swap');
        }

        /**
         * Fired once navigation of the frame has completed. Frame is now associated with the new loader.
         */
        interface FrameNavigatedEvent {
            /**
             * Frame object.
             */
            frame: Frame;
            type: NavigationType;
        }

        /**
         * Fired when opening document to write to.
         */
        interface DocumentOpenedEvent {
            /**
             * Frame object.
             */
            frame: Frame;
        }

        /**
         * Fired when a renderer-initiated navigation is requested.
         * Navigation may still be cancelled after the event is issued.
         */
        interface FrameRequestedNavigationEvent {
            /**
             * Id of the frame that is being navigated.
             */
            frameId: FrameId;
            /**
             * The reason for the navigation.
             */
            reason: ClientNavigationReason;
            /**
             * The destination URL for the requested navigation.
             */
            url: string;
            /**
             * The disposition for the navigation.
             */
            disposition: ClientNavigationDisposition;
        }

        /**
         * Fired when frame schedules a potential navigation.
         */
        interface FrameScheduledNavigationEvent {
            /**
             * Id of the frame that has scheduled a navigation.
             */
            frameId: FrameId;
            /**
             * Delay (in seconds) until the navigation is scheduled to begin. The navigation is not
             * guaranteed to start.
             */
            delay: number;
            /**
             * The reason for the navigation.
             */
            reason: ClientNavigationReason;
            /**
             * The destination URL for the scheduled navigation.
             */
            url: string;
        }

        /**
         * Fired when frame has started loading.
         */
        interface FrameStartedLoadingEvent {
            /**
             * Id of the frame that has started loading.
             */
            frameId: FrameId;
        }

        /**
         * Fired when frame has stopped loading.
         */
        interface FrameStoppedLoadingEvent {
            /**
             * Id of the frame that has stopped loading.
             */
            frameId: FrameId;
        }

        /**
         * Fired when page is about to start a download.
         * Deprecated. Use Browser.downloadWillBegin instead.
         */
        interface DownloadWillBeginEvent {
            /**
             * Id of the frame that caused download to begin.
             */
            frameId: FrameId;
            /**
             * Global unique identifier of the download.
             */
            guid: string;
            /**
             * URL of the resource being downloaded.
             */
            url: string;
            /**
             * Suggested file name of the resource (the actual name of the file saved on disk may differ).
             */
            suggestedFilename: string;
        }

        const enum DownloadProgressEventState {
            InProgress = 'inProgress',
            Completed = 'completed',
            Canceled = 'canceled',
        }

        /**
         * Fired when download makes progress. Last call has |done| == true.
         * Deprecated. Use Browser.downloadProgress instead.
         */
        interface DownloadProgressEvent {
            /**
             * Global unique identifier of the download.
             */
            guid: string;
            /**
             * Total expected bytes to download.
             */
            totalBytes: number;
            /**
             * Total bytes received.
             */
            receivedBytes: number;
            /**
             * Download status. (DownloadProgressEventState enum)
             */
            state: ('inProgress' | 'completed' | 'canceled');
        }

        /**
         * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been
         * closed.
         */
        interface JavascriptDialogClosedEvent {
            /**
             * Whether dialog was confirmed.
             */
            result: boolean;
            /**
             * User input in case of prompt.
             */
            userInput: string;
        }

        /**
         * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to
         * open.
         */
        interface JavascriptDialogOpeningEvent {
            /**
             * Frame url.
             */
            url: string;
            /**
             * Message that will be displayed by the dialog.
             */
            message: string;
            /**
             * Dialog type.
             */
            type: DialogType;
            /**
             * True iff browser is capable showing or acting on the given dialog. When browser has no
             * dialog handler for given target, calling alert while Page domain is engaged will stall
             * the page execution. Execution can be resumed via calling Page.handleJavaScriptDialog.
             */
            hasBrowserHandler: boolean;
            /**
             * Default dialog prompt.
             */
            defaultPrompt?: string;
        }

        /**
         * Fired for top level page lifecycle events such as navigation, load, paint, etc.
         */
        interface LifecycleEventEvent {
            /**
             * Id of the frame.
             */
            frameId: FrameId;
            /**
             * Loader identifier. Empty string if the request is fetched from worker.
             */
            loaderId: Network.LoaderId;
            name: string;
            timestamp: Network.MonotonicTime;
        }

        /**
         * Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
         * not assume any ordering with the Page.frameNavigated event. This event is fired only for
         * main-frame history navigation where the document changes (non-same-document navigations),
         * when bfcache navigation fails.
         */
        interface BackForwardCacheNotUsedEvent {
            /**
             * The loader id for the associated navgation.
             */
            loaderId: Network.LoaderId;
            /**
             * The frame id of the associated frame.
             */
            frameId: FrameId;
            /**
             * Array of reasons why the page could not be cached. This must not be empty.
             */
            notRestoredExplanations: BackForwardCacheNotRestoredExplanation[];
            /**
             * Tree structure of reasons why the page could not be cached for each frame.
             */
            notRestoredExplanationsTree?: BackForwardCacheNotRestoredExplanationTree;
        }

        interface LoadEventFiredEvent {
            timestamp: Network.MonotonicTime;
        }

        /**
         * Fired when same-document navigation happens, e.g. due to history API usage or anchor navigation.
         */
        interface NavigatedWithinDocumentEvent {
            /**
             * Id of the frame.
             */
            frameId: FrameId;
            /**
             * Frame's new url.
             */
            url: string;
        }

        /**
         * Compressed image data requested by the `startScreencast`.
         */
        interface ScreencastFrameEvent {
            /**
             * Base64-encoded compressed image. (Encoded as a base64 string when passed over JSON)
             */
            data: string;
            /**
             * Screencast frame metadata.
             */
            metadata: ScreencastFrameMetadata;
            /**
             * Frame number.
             */
            sessionId: integer;
        }

        /**
         * Fired when the page with currently enabled screencast was shown or hidden `.
         */
        interface ScreencastVisibilityChangedEvent {
            /**
             * True if the page is visible.
             */
            visible: boolean;
        }

        /**
         * Fired when a new window is going to be opened, via window.open(), link click, form submission,
         * etc.
         */
        interface WindowOpenEvent {
            /**
             * The URL for the new window.
             */
            url: string;
            /**
             * Window name.
             */
            windowName: string;
            /**
             * An array of enabled window features.
             */
            windowFeatures: string[];
            /**
             * Whether or not it was triggered by user gesture.
             */
            userGesture: boolean;
        }

        /**
         * Issued for every compilation cache generated. Is only available
         * if Page.setGenerateCompilationCache is enabled.
         */
        interface CompilationCacheProducedEvent {
            url: string;
            /**
             * Base64-encoded data (Encoded as a base64 string when passed over JSON)
             */
            data: string;
        }
    }

    namespace Performance {

        /**
         * Run-time execution metric.
         */
        interface Metric {
            /**
             * Metric name.
             */
            name: string;
            /**
             * Metric value.
             */
            value: number;
        }

        const enum EnableRequestTimeDomain {
            TimeTicks = 'timeTicks',
            ThreadTicks = 'threadTicks',
        }

        interface EnableRequest {
            /**
             * Time domain to use for collecting and reporting duration metrics. (EnableRequestTimeDomain enum)
             */
            timeDomain?: ('timeTicks' | 'threadTicks');
        }

        const enum SetTimeDomainRequestTimeDomain {
            TimeTicks = 'timeTicks',
            ThreadTicks = 'threadTicks',
        }

        interface SetTimeDomainRequest {
            /**
             * Time domain (SetTimeDomainRequestTimeDomain enum)
             */
            timeDomain: ('timeTicks' | 'threadTicks');
        }

        interface GetMetricsResponse {
            /**
             * Current values for run-time metrics.
             */
            metrics: Metric[];
        }

        /**
         * Current values of the metrics.
         */
        interface MetricsEvent {
            /**
             * Current values of the metrics.
             */
            metrics: Metric[];
            /**
             * Timestamp title.
             */
            title: string;
        }
    }

    /**
     * Reporting of performance timeline events, as specified in
     * https://w3c.github.io/performance-timeline/#dom-performanceobserver.
     */
    namespace PerformanceTimeline {

        /**
         * See https://github.com/WICG/LargestContentfulPaint and largest_contentful_paint.idl
         */
        interface LargestContentfulPaint {
            renderTime: Network.TimeSinceEpoch;
            loadTime: Network.TimeSinceEpoch;
            /**
             * The number of pixels being painted.
             */
            size: number;
            /**
             * The id attribute of the element, if available.
             */
            elementId?: string;
            /**
             * The URL of the image (may be trimmed).
             */
            url?: string;
            nodeId?: DOM.BackendNodeId;
        }

        interface LayoutShiftAttribution {
            previousRect: DOM.Rect;
            currentRect: DOM.Rect;
            nodeId?: DOM.BackendNodeId;
        }

        /**
         * See https://wicg.github.io/layout-instability/#sec-layout-shift and layout_shift.idl
         */
        interface LayoutShift {
            /**
             * Score increment produced by this event.
             */
            value: number;
            hadRecentInput: boolean;
            lastInputTime: Network.TimeSinceEpoch;
            sources: LayoutShiftAttribution[];
        }

        interface TimelineEvent {
            /**
             * Identifies the frame that this event is related to. Empty for non-frame targets.
             */
            frameId: Page.FrameId;
            /**
             * The event type, as specified in https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype
             * This determines which of the optional "details" fiedls is present.
             */
            type: string;
            /**
             * Name may be empty depending on the type.
             */
            name: string;
            /**
             * Time in seconds since Epoch, monotonically increasing within document lifetime.
             */
            time: Network.TimeSinceEpoch;
            /**
             * Event duration, if applicable.
             */
            duration?: number;
            lcpDetails?: LargestContentfulPaint;
            layoutShiftDetails?: LayoutShift;
        }

        interface EnableRequest {
            /**
             * The types of event to report, as specified in
             * https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype
             * The specified filter overrides any previous filters, passing empty
             * filter disables recording.
             * Note that not all types exposed to the web platform are currently supported.
             */
            eventTypes: string[];
        }

        /**
         * Sent when a performance timeline event is added. See reportPerformanceTimeline method.
         */
        interface TimelineEventAddedEvent {
            event: TimelineEvent;
        }
    }

    /**
     * Security
     */
    namespace Security {

        /**
         * An internal certificate ID value.
         */
        type CertificateId = integer;

        /**
         * A description of mixed content (HTTP resources on HTTPS pages), as defined by
         * https://www.w3.org/TR/mixed-content/#categories
         */
        type MixedContentType = ('blockable' | 'optionally-blockable' | 'none');

        /**
         * The security level of a page or resource.
         */
        type SecurityState = ('unknown' | 'neutral' | 'insecure' | 'secure' | 'info' | 'insecure-broken');

        /**
         * Details about the security state of the page certificate.
         */
        interface CertificateSecurityState {
            /**
             * Protocol name (e.g. "TLS 1.2" or "QUIC").
             */
            protocol: string;
            /**
             * Key Exchange used by the connection, or the empty string if not applicable.
             */
            keyExchange: string;
            /**
             * (EC)DH group used by the connection, if applicable.
             */
            keyExchangeGroup?: string;
            /**
             * Cipher name.
             */
            cipher: string;
            /**
             * TLS MAC. Note that AEAD ciphers do not have separate MACs.
             */
            mac?: string;
            /**
             * Page certificate.
             */
            certificate: string[];
            /**
             * Certificate subject name.
             */
            subjectName: string;
            /**
             * Name of the issuing CA.
             */
            issuer: string;
            /**
             * Certificate valid from date.
             */
            validFrom: Network.TimeSinceEpoch;
            /**
             * Certificate valid to (expiration) date
             */
            validTo: Network.TimeSinceEpoch;
            /**
             * The highest priority network error code, if the certificate has an error.
             */
            certificateNetworkError?: string;
            /**
             * True if the certificate uses a weak signature aglorithm.
             */
            certificateHasWeakSignature: boolean;
            /**
             * True if the certificate has a SHA1 signature in the chain.
             */
            certificateHasSha1Signature: boolean;
            /**
             * True if modern SSL
             */
            modernSSL: boolean;
            /**
             * True if the connection is using an obsolete SSL protocol.
             */
            obsoleteSslProtocol: boolean;
            /**
             * True if the connection is using an obsolete SSL key exchange.
             */
            obsoleteSslKeyExchange: boolean;
            /**
             * True if the connection is using an obsolete SSL cipher.
             */
            obsoleteSslCipher: boolean;
            /**
             * True if the connection is using an obsolete SSL signature.
             */
            obsoleteSslSignature: boolean;
        }

        type SafetyTipStatus = ('badReputation' | 'lookalike');

        interface SafetyTipInfo {
            /**
             * Describes whether the page triggers any safety tips or reputation warnings. Default is unknown.
             */
            safetyTipStatus: SafetyTipStatus;
            /**
             * The URL the safety tip suggested ("Did you mean?"). Only filled in for lookalike matches.
             */
            safeUrl?: string;
        }

        /**
         * Security state information about the page.
         */
        interface VisibleSecurityState {
            /**
             * The security level of the page.
             */
            securityState: SecurityState;
            /**
             * Security state details about the page certificate.
             */
            certificateSecurityState?: CertificateSecurityState;
            /**
             * The type of Safety Tip triggered on the page. Note that this field will be set even if the Safety Tip UI was not actually shown.
             */
            safetyTipInfo?: SafetyTipInfo;
            /**
             * Array of security state issues ids.
             */
            securityStateIssueIds: string[];
        }

        /**
         * An explanation of an factor contributing to the security state.
         */
        interface SecurityStateExplanation {
            /**
             * Security state representing the severity of the factor being explained.
             */
            securityState: SecurityState;
            /**
             * Title describing the type of factor.
             */
            title: string;
            /**
             * Short phrase describing the type of factor.
             */
            summary: string;
            /**
             * Full text explanation of the factor.
             */
            description: string;
            /**
             * The type of mixed content described by the explanation.
             */
            mixedContentType: MixedContentType;
            /**
             * Page certificate.
             */
            certificate: string[];
            /**
             * Recommendations to fix any issues.
             */
            recommendations?: string[];
        }

        /**
         * Information about insecure content on the page.
         */
        interface InsecureContentStatus {
            /**
             * Always false.
             */
            ranMixedContent: boolean;
            /**
             * Always false.
             */
            displayedMixedContent: boolean;
            /**
             * Always false.
             */
            containedMixedForm: boolean;
            /**
             * Always false.
             */
            ranContentWithCertErrors: boolean;
            /**
             * Always false.
             */
            displayedContentWithCertErrors: boolean;
            /**
             * Always set to unknown.
             */
            ranInsecureContentStyle: SecurityState;
            /**
             * Always set to unknown.
             */
            displayedInsecureContentStyle: SecurityState;
        }

        /**
         * The action to take when a certificate error occurs. continue will continue processing the
         * request and cancel will cancel the request.
         */
        type CertificateErrorAction = ('continue' | 'cancel');

        interface SetIgnoreCertificateErrorsRequest {
            /**
             * If true, all certificate errors will be ignored.
             */
            ignore: boolean;
        }

        interface HandleCertificateErrorRequest {
            /**
             * The ID of the event.
             */
            eventId: integer;
            /**
             * The action to take on the certificate error.
             */
            action: CertificateErrorAction;
        }

        interface SetOverrideCertificateErrorsRequest {
            /**
             * If true, certificate errors will be overridden.
             */
            override: boolean;
        }

        /**
         * There is a certificate error. If overriding certificate errors is enabled, then it should be
         * handled with the `handleCertificateError` command. Note: this event does not fire if the
         * certificate error has been allowed internally. Only one client per target should override
         * certificate errors at the same time.
         */
        interface CertificateErrorEvent {
            /**
             * The ID of the event.
             */
            eventId: integer;
            /**
             * The type of the error.
             */
            errorType: string;
            /**
             * The url that was requested.
             */
            requestURL: string;
        }

        /**
         * The security state of the page changed.
         */
        interface VisibleSecurityStateChangedEvent {
            /**
             * Security state information about the page.
             */
            visibleSecurityState: VisibleSecurityState;
        }

        /**
         * The security state of the page changed. No longer being sent.
         */
        interface SecurityStateChangedEvent {
            /**
             * Security state.
             */
            securityState: SecurityState;
            /**
             * True if the page was loaded over cryptographic transport such as HTTPS.
             */
            schemeIsCryptographic: boolean;
            /**
             * Previously a list of explanations for the security state. Now always
             * empty.
             */
            explanations: SecurityStateExplanation[];
            /**
             * Information about insecure content on the page.
             */
            insecureContentStatus: InsecureContentStatus;
            /**
             * Overrides user-visible description of the state. Always omitted.
             */
            summary?: string;
        }
    }

    namespace ServiceWorker {

        type RegistrationID = string;

        /**
         * ServiceWorker registration.
         */
        interface ServiceWorkerRegistration {
            registrationId: RegistrationID;
            scopeURL: string;
            isDeleted: boolean;
        }

        type ServiceWorkerVersionRunningStatus = ('stopped' | 'starting' | 'running' | 'stopping');

        type ServiceWorkerVersionStatus = ('new' | 'installing' | 'installed' | 'activating' | 'activated' | 'redundant');

        /**
         * ServiceWorker version.
         */
        interface ServiceWorkerVersion {
            versionId: string;
            registrationId: RegistrationID;
            scriptURL: string;
            runningStatus: ServiceWorkerVersionRunningStatus;
            status: ServiceWorkerVersionStatus;
            /**
             * The Last-Modified header value of the main script.
             */
            scriptLastModified?: number;
            /**
             * The time at which the response headers of the main script were received from the server.
             * For cached script it is the last time the cache entry was validated.
             */
            scriptResponseTime?: number;
            controlledClients?: Target.TargetID[];
            targetId?: Target.TargetID;
        }

        /**
         * ServiceWorker error message.
         */
        interface ServiceWorkerErrorMessage {
            errorMessage: string;
            registrationId: RegistrationID;
            versionId: string;
            sourceURL: string;
            lineNumber: integer;
            columnNumber: integer;
        }

        interface DeliverPushMessageRequest {
            origin: string;
            registrationId: RegistrationID;
            data: string;
        }

        interface DispatchSyncEventRequest {
            origin: string;
            registrationId: RegistrationID;
            tag: string;
            lastChance: boolean;
        }

        interface DispatchPeriodicSyncEventRequest {
            origin: string;
            registrationId: RegistrationID;
            tag: string;
        }

        interface InspectWorkerRequest {
            versionId: string;
        }

        interface SetForceUpdateOnPageLoadRequest {
            forceUpdateOnPageLoad: boolean;
        }

        interface SkipWaitingRequest {
            scopeURL: string;
        }

        interface StartWorkerRequest {
            scopeURL: string;
        }

        interface StopWorkerRequest {
            versionId: string;
        }

        interface UnregisterRequest {
            scopeURL: string;
        }

        interface UpdateRegistrationRequest {
            scopeURL: string;
        }

        interface WorkerErrorReportedEvent {
            errorMessage: ServiceWorkerErrorMessage;
        }

        interface WorkerRegistrationUpdatedEvent {
            registrations: ServiceWorkerRegistration[];
        }

        interface WorkerVersionUpdatedEvent {
            versions: ServiceWorkerVersion[];
        }
    }

    namespace Storage {

        type SerializedStorageKey = string;

        /**
         * Enum of possible storage types.
         */
        type StorageType = ('appcache' | 'cookies' | 'file_systems' | 'indexeddb' | 'local_storage' | 'shader_cache' | 'websql' | 'service_workers' | 'cache_storage' | 'interest_groups' | 'shared_storage' | 'storage_buckets' | 'all' | 'other');

        /**
         * Usage for a storage type.
         */
        interface UsageForType {
            /**
             * Name of storage type.
             */
            storageType: StorageType;
            /**
             * Storage usage (bytes).
             */
            usage: number;
        }

        /**
         * Pair of issuer origin and number of available (signed, but not used) Trust
         * Tokens from that issuer.
         */
        interface TrustTokens {
            issuerOrigin: string;
            count: number;
        }

        /**
         * Enum of interest group access types.
         */
        type InterestGroupAccessType = ('join' | 'leave' | 'update' | 'loaded' | 'bid' | 'win');

        /**
         * Ad advertising element inside an interest group.
         */
        interface InterestGroupAd {
            renderUrl: string;
            metadata?: string;
        }

        /**
         * The full details of an interest group.
         */
        interface InterestGroupDetails {
            ownerOrigin: string;
            name: string;
            expirationTime: Network.TimeSinceEpoch;
            joiningOrigin: string;
            biddingUrl?: string;
            biddingWasmHelperUrl?: string;
            updateUrl?: string;
            trustedBiddingSignalsUrl?: string;
            trustedBiddingSignalsKeys: string[];
            userBiddingSignals?: string;
            ads: InterestGroupAd[];
            adComponents: InterestGroupAd[];
        }

        /**
         * Enum of shared storage access types.
         */
        type SharedStorageAccessType = ('documentAddModule' | 'documentSelectURL' | 'documentRun' | 'documentSet' | 'documentAppend' | 'documentDelete' | 'documentClear' | 'workletSet' | 'workletAppend' | 'workletDelete' | 'workletClear' | 'workletGet' | 'workletKeys' | 'workletEntries' | 'workletLength' | 'workletRemainingBudget');

        /**
         * Struct for a single key-value pair in an origin's shared storage.
         */
        interface SharedStorageEntry {
            key: string;
            value: string;
        }

        /**
         * Details for an origin's shared storage.
         */
        interface SharedStorageMetadata {
            creationTime: Network.TimeSinceEpoch;
            length: integer;
            remainingBudget: number;
        }

        /**
         * Pair of reporting metadata details for a candidate URL for `selectURL()`.
         */
        interface SharedStorageReportingMetadata {
            eventType: string;
            reportingUrl: string;
        }

        /**
         * Bundles a candidate URL with its reporting metadata.
         */
        interface SharedStorageUrlWithMetadata {
            /**
             * Spec of candidate URL.
             */
            url: string;
            /**
             * Any associated reporting metadata.
             */
            reportingMetadata: SharedStorageReportingMetadata[];
        }

        /**
         * Bundles the parameters for shared storage access events whose
         * presence/absence can vary according to SharedStorageAccessType.
         */
        interface SharedStorageAccessParams {
            /**
             * Spec of the module script URL.
             * Present only for SharedStorageAccessType.documentAddModule.
             */
            scriptSourceUrl?: string;
            /**
             * Name of the registered operation to be run.
             * Present only for SharedStorageAccessType.documentRun and
             * SharedStorageAccessType.documentSelectURL.
             */
            operationName?: string;
            /**
             * The operation's serialized data in bytes (converted to a string).
             * Present only for SharedStorageAccessType.documentRun and
             * SharedStorageAccessType.documentSelectURL.
             */
            serializedData?: string;
            /**
             * Array of candidate URLs' specs, along with any associated metadata.
             * Present only for SharedStorageAccessType.documentSelectURL.
             */
            urlsWithMetadata?: SharedStorageUrlWithMetadata[];
            /**
             * Key for a specific entry in an origin's shared storage.
             * Present only for SharedStorageAccessType.documentSet,
             * SharedStorageAccessType.documentAppend,
             * SharedStorageAccessType.documentDelete,
             * SharedStorageAccessType.workletSet,
             * SharedStorageAccessType.workletAppend,
             * SharedStorageAccessType.workletDelete, and
             * SharedStorageAccessType.workletGet.
             */
            key?: string;
            /**
             * Value for a specific entry in an origin's shared storage.
             * Present only for SharedStorageAccessType.documentSet,
             * SharedStorageAccessType.documentAppend,
             * SharedStorageAccessType.workletSet, and
             * SharedStorageAccessType.workletAppend.
             */
            value?: string;
            /**
             * Whether or not to set an entry for a key if that key is already present.
             * Present only for SharedStorageAccessType.documentSet and
             * SharedStorageAccessType.workletSet.
             */
            ignoreIfPresent?: boolean;
        }

        type StorageBucketsDurability = ('relaxed' | 'strict');

        interface StorageBucket {
            storageKey: SerializedStorageKey;
            /**
             * If not specified, it is the default bucket of the storageKey.
             */
            name?: string;
        }

        interface StorageBucketInfo {
            bucket: StorageBucket;
            id: string;
            expiration: Network.TimeSinceEpoch;
            /**
             * Storage quota (bytes).
             */
            quota: number;
            persistent: boolean;
            durability: StorageBucketsDurability;
        }

        type AttributionReportingSourceType = ('navigation' | 'event');

        type UnsignedInt64AsBase10 = string;

        type UnsignedInt128AsBase16 = string;

        type SignedInt64AsBase10 = string;

        interface AttributionReportingFilterDataEntry {
            key: string;
            values: string[];
        }

        interface AttributionReportingAggregationKeysEntry {
            key: string;
            value: UnsignedInt128AsBase16;
        }

        interface AttributionReportingSourceRegistration {
            time: Network.TimeSinceEpoch;
            /**
             * duration in seconds
             */
            expiry?: integer;
            /**
             * duration in seconds
             */
            eventReportWindow?: integer;
            /**
             * duration in seconds
             */
            aggregatableReportWindow?: integer;
            type: AttributionReportingSourceType;
            sourceOrigin: string;
            reportingOrigin: string;
            destinationSites: string[];
            eventId: UnsignedInt64AsBase10;
            priority: SignedInt64AsBase10;
            filterData: AttributionReportingFilterDataEntry[];
            aggregationKeys: AttributionReportingAggregationKeysEntry[];
            debugKey?: UnsignedInt64AsBase10;
        }

        type AttributionReportingSourceRegistrationResult = ('success' | 'internalError' | 'insufficientSourceCapacity' | 'insufficientUniqueDestinationCapacity' | 'excessiveReportingOrigins' | 'prohibitedByBrowserPolicy' | 'successNoised' | 'destinationReportingLimitReached' | 'destinationGlobalLimitReached' | 'destinationBothLimitsReached' | 'reportingOriginsPerSiteLimitReached' | 'exceedsMaxChannelCapacity');

        interface GetStorageKeyForFrameRequest {
            frameId: Page.FrameId;
        }

        interface GetStorageKeyForFrameResponse {
            storageKey: SerializedStorageKey;
        }

        interface ClearDataForOriginRequest {
            /**
             * Security origin.
             */
            origin: string;
            /**
             * Comma separated list of StorageType to clear.
             */
            storageTypes: string;
        }

        interface ClearDataForStorageKeyRequest {
            /**
             * Storage key.
             */
            storageKey: string;
            /**
             * Comma separated list of StorageType to clear.
             */
            storageTypes: string;
        }

        interface GetCookiesRequest {
            /**
             * Browser context to use when called on the browser endpoint.
             */
            browserContextId?: Browser.BrowserContextID;
        }

        interface GetCookiesResponse {
            /**
             * Array of cookie objects.
             */
            cookies: Network.Cookie[];
        }

        interface SetCookiesRequest {
            /**
             * Cookies to be set.
             */
            cookies: Network.CookieParam[];
            /**
             * Browser context to use when called on the browser endpoint.
             */
            browserContextId?: Browser.BrowserContextID;
        }

        interface ClearCookiesRequest {
            /**
             * Browser context to use when called on the browser endpoint.
             */
            browserContextId?: Browser.BrowserContextID;
        }

        interface GetUsageAndQuotaRequest {
            /**
             * Security origin.
             */
            origin: string;
        }

        interface GetUsageAndQuotaResponse {
            /**
             * Storage usage (bytes).
             */
            usage: number;
            /**
             * Storage quota (bytes).
             */
            quota: number;
            /**
             * Whether or not the origin has an active storage quota override
             */
            overrideActive: boolean;
            /**
             * Storage usage per type (bytes).
             */
            usageBreakdown: UsageForType[];
        }

        interface OverrideQuotaForOriginRequest {
            /**
             * Security origin.
             */
            origin: string;
            /**
             * The quota size (in bytes) to override the original quota with.
             * If this is called multiple times, the overridden quota will be equal to
             * the quotaSize provided in the final call. If this is called without
             * specifying a quotaSize, the quota will be reset to the default value for
             * the specified origin. If this is called multiple times with different
             * origins, the override will be maintained for each origin until it is
             * disabled (called without a quotaSize).
             */
            quotaSize?: number;
        }

        interface TrackCacheStorageForOriginRequest {
            /**
             * Security origin.
             */
            origin: string;
        }

        interface TrackCacheStorageForStorageKeyRequest {
            /**
             * Storage key.
             */
            storageKey: string;
        }

        interface TrackIndexedDBForOriginRequest {
            /**
             * Security origin.
             */
            origin: string;
        }

        interface TrackIndexedDBForStorageKeyRequest {
            /**
             * Storage key.
             */
            storageKey: string;
        }

        interface UntrackCacheStorageForOriginRequest {
            /**
             * Security origin.
             */
            origin: string;
        }

        interface UntrackCacheStorageForStorageKeyRequest {
            /**
             * Storage key.
             */
            storageKey: string;
        }

        interface UntrackIndexedDBForOriginRequest {
            /**
             * Security origin.
             */
            origin: string;
        }

        interface UntrackIndexedDBForStorageKeyRequest {
            /**
             * Storage key.
             */
            storageKey: string;
        }

        interface GetTrustTokensResponse {
            tokens: TrustTokens[];
        }

        interface ClearTrustTokensRequest {
            issuerOrigin: string;
        }

        interface ClearTrustTokensResponse {
            /**
             * True if any tokens were deleted, false otherwise.
             */
            didDeleteTokens: boolean;
        }

        interface GetInterestGroupDetailsRequest {
            ownerOrigin: string;
            name: string;
        }

        interface GetInterestGroupDetailsResponse {
            details: InterestGroupDetails;
        }

        interface SetInterestGroupTrackingRequest {
            enable: boolean;
        }

        interface GetSharedStorageMetadataRequest {
            ownerOrigin: string;
        }

        interface GetSharedStorageMetadataResponse {
            metadata: SharedStorageMetadata;
        }

        interface GetSharedStorageEntriesRequest {
            ownerOrigin: string;
        }

        interface GetSharedStorageEntriesResponse {
            entries: SharedStorageEntry[];
        }

        interface SetSharedStorageEntryRequest {
            ownerOrigin: string;
            key: string;
            value: string;
            /**
             * If `ignoreIfPresent` is included and true, then only sets the entry if
             * `key` doesn't already exist.
             */
            ignoreIfPresent?: boolean;
        }

        interface DeleteSharedStorageEntryRequest {
            ownerOrigin: string;
            key: string;
        }

        interface ClearSharedStorageEntriesRequest {
            ownerOrigin: string;
        }

        interface ResetSharedStorageBudgetRequest {
            ownerOrigin: string;
        }

        interface SetSharedStorageTrackingRequest {
            enable: boolean;
        }

        interface SetStorageBucketTrackingRequest {
            storageKey: string;
            enable: boolean;
        }

        interface DeleteStorageBucketRequest {
            bucket: StorageBucket;
        }

        interface RunBounceTrackingMitigationsResponse {
            deletedSites: string[];
        }

        interface SetAttributionReportingLocalTestingModeRequest {
            /**
             * If enabled, noise is suppressed and reports are sent immediately.
             */
            enabled: boolean;
        }

        interface SetAttributionReportingTrackingRequest {
            enable: boolean;
        }

        /**
         * A cache's contents have been modified.
         */
        interface CacheStorageContentUpdatedEvent {
            /**
             * Origin to update.
             */
            origin: string;
            /**
             * Storage key to update.
             */
            storageKey: string;
            /**
             * Storage bucket to update.
             */
            bucketId: string;
            /**
             * Name of cache in origin.
             */
            cacheName: string;
        }

        /**
         * A cache has been added/deleted.
         */
        interface CacheStorageListUpdatedEvent {
            /**
             * Origin to update.
             */
            origin: string;
            /**
             * Storage key to update.
             */
            storageKey: string;
            /**
             * Storage bucket to update.
             */
            bucketId: string;
        }

        /**
         * The origin's IndexedDB object store has been modified.
         */
        interface IndexedDBContentUpdatedEvent {
            /**
             * Origin to update.
             */
            origin: string;
            /**
             * Storage key to update.
             */
            storageKey: string;
            /**
             * Storage bucket to update.
             */
            bucketId: string;
            /**
             * Database to update.
             */
            databaseName: string;
            /**
             * ObjectStore to update.
             */
            objectStoreName: string;
        }

        /**
         * The origin's IndexedDB database list has been modified.
         */
        interface IndexedDBListUpdatedEvent {
            /**
             * Origin to update.
             */
            origin: string;
            /**
             * Storage key to update.
             */
            storageKey: string;
            /**
             * Storage bucket to update.
             */
            bucketId: string;
        }

        /**
         * One of the interest groups was accessed by the associated page.
         */
        interface InterestGroupAccessedEvent {
            accessTime: Network.TimeSinceEpoch;
            type: InterestGroupAccessType;
            ownerOrigin: string;
            name: string;
        }

        /**
         * Shared storage was accessed by the associated page.
         * The following parameters are included in all events.
         */
        interface SharedStorageAccessedEvent {
            /**
             * Time of the access.
             */
            accessTime: Network.TimeSinceEpoch;
            /**
             * Enum value indicating the Shared Storage API method invoked.
             */
            type: SharedStorageAccessType;
            /**
             * DevTools Frame Token for the primary frame tree's root.
             */
            mainFrameId: Page.FrameId;
            /**
             * Serialized origin for the context that invoked the Shared Storage API.
             */
            ownerOrigin: string;
            /**
             * The sub-parameters warapped by `params` are all optional and their
             * presence/absence depends on `type`.
             */
            params: SharedStorageAccessParams;
        }

        interface StorageBucketCreatedOrUpdatedEvent {
            bucketInfo: StorageBucketInfo;
        }

        interface StorageBucketDeletedEvent {
            bucketId: string;
        }

        /**
         * TODO(crbug.com/1458532): Add other Attribution Reporting events, e.g.
         * trigger registration.
         */
        interface AttributionReportingSourceRegisteredEvent {
            registration: AttributionReportingSourceRegistration;
            result: AttributionReportingSourceRegistrationResult;
        }
    }

    /**
     * The SystemInfo domain defines methods and events for querying low-level system information.
     */
    namespace SystemInfo {

        /**
         * Describes a single graphics processor (GPU).
         */
        interface GPUDevice {
            /**
             * PCI ID of the GPU vendor, if available; 0 otherwise.
             */
            vendorId: number;
            /**
             * PCI ID of the GPU device, if available; 0 otherwise.
             */
            deviceId: number;
            /**
             * Sub sys ID of the GPU, only available on Windows.
             */
            subSysId?: number;
            /**
             * Revision of the GPU, only available on Windows.
             */
            revision?: number;
            /**
             * String description of the GPU vendor, if the PCI ID is not available.
             */
            vendorString: string;
            /**
             * String description of the GPU device, if the PCI ID is not available.
             */
            deviceString: string;
            /**
             * String description of the GPU driver vendor.
             */
            driverVendor: string;
            /**
             * String description of the GPU driver version.
             */
            driverVersion: string;
        }

        /**
         * Describes the width and height dimensions of an entity.
         */
        interface Size {
            /**
             * Width in pixels.
             */
            width: integer;
            /**
             * Height in pixels.
             */
            height: integer;
        }

        /**
         * Describes a supported video decoding profile with its associated minimum and
         * maximum resolutions.
         */
        interface VideoDecodeAcceleratorCapability {
            /**
             * Video codec profile that is supported, e.g. VP9 Profile 2.
             */
            profile: string;
            /**
             * Maximum video dimensions in pixels supported for this |profile|.
             */
            maxResolution: Size;
            /**
             * Minimum video dimensions in pixels supported for this |profile|.
             */
            minResolution: Size;
        }

        /**
         * Describes a supported video encoding profile with its associated maximum
         * resolution and maximum framerate.
         */
        interface VideoEncodeAcceleratorCapability {
            /**
             * Video codec profile that is supported, e.g H264 Main.
             */
            profile: string;
            /**
             * Maximum video dimensions in pixels supported for this |profile|.
             */
            maxResolution: Size;
            /**
             * Maximum encoding framerate in frames per second supported for this
             * |profile|, as fraction's numerator and denominator, e.g. 24/1 fps,
             * 24000/1001 fps, etc.
             */
            maxFramerateNumerator: integer;
            maxFramerateDenominator: integer;
        }

        /**
         * YUV subsampling type of the pixels of a given image.
         */
        type SubsamplingFormat = ('yuv420' | 'yuv422' | 'yuv444');

        /**
         * Image format of a given image.
         */
        type ImageType = ('jpeg' | 'webp' | 'unknown');

        /**
         * Describes a supported image decoding profile with its associated minimum and
         * maximum resolutions and subsampling.
         */
        interface ImageDecodeAcceleratorCapability {
            /**
             * Image coded, e.g. Jpeg.
             */
            imageType: ImageType;
            /**
             * Maximum supported dimensions of the image in pixels.
             */
            maxDimensions: Size;
            /**
             * Minimum supported dimensions of the image in pixels.
             */
            minDimensions: Size;
            /**
             * Optional array of supported subsampling formats, e.g. 4:2:0, if known.
             */
            subsamplings: SubsamplingFormat[];
        }

        /**
         * Provides information about the GPU(s) on the system.
         */
        interface GPUInfo {
            /**
             * The graphics devices on the system. Element 0 is the primary GPU.
             */
            devices: GPUDevice[];
            /**
             * An optional dictionary of additional GPU related attributes.
             */
            auxAttributes?: any;
            /**
             * An optional dictionary of graphics features and their status.
             */
            featureStatus?: any;
            /**
             * An optional array of GPU driver bug workarounds.
             */
            driverBugWorkarounds: string[];
            /**
             * Supported accelerated video decoding capabilities.
             */
            videoDecoding: VideoDecodeAcceleratorCapability[];
            /**
             * Supported accelerated video encoding capabilities.
             */
            videoEncoding: VideoEncodeAcceleratorCapability[];
            /**
             * Supported accelerated image decoding capabilities.
             */
            imageDecoding: ImageDecodeAcceleratorCapability[];
        }

        /**
         * Represents process info.
         */
        interface ProcessInfo {
            /**
             * Specifies process type.
             */
            type: string;
            /**
             * Specifies process id.
             */
            id: integer;
            /**
             * Specifies cumulative CPU usage in seconds across all threads of the
             * process since the process start.
             */
            cpuTime: number;
        }

        interface GetInfoResponse {
            /**
             * Information about the GPUs on the system.
             */
            gpu: GPUInfo;
            /**
             * A platform-dependent description of the model of the machine. On Mac OS, this is, for
             * example, 'MacBookPro'. Will be the empty string if not supported.
             */
            modelName: string;
            /**
             * A platform-dependent description of the version of the machine. On Mac OS, this is, for
             * example, '10.1'. Will be the empty string if not supported.
             */
            modelVersion: string;
            /**
             * The command line string used to launch the browser. Will be the empty string if not
             * supported.
             */
            commandLine: string;
        }

        interface GetFeatureStateRequest {
            featureState: string;
        }

        interface GetFeatureStateResponse {
            featureEnabled: boolean;
        }

        interface GetProcessInfoResponse {
            /**
             * An array of process info blocks.
             */
            processInfo: ProcessInfo[];
        }
    }

    /**
     * Supports additional targets discovery and allows to attach to them.
     */
    namespace Target {

        type TargetID = string;

        /**
         * Unique identifier of attached debugging session.
         */
        type SessionID = string;

        interface TargetInfo {
            targetId: TargetID;
            type: string;
            title: string;
            url: string;
            /**
             * Whether the target has an attached client.
             */
            attached: boolean;
            /**
             * Opener target Id
             */
            openerId?: TargetID;
            /**
             * Whether the target has access to the originating window.
             */
            canAccessOpener: boolean;
            /**
             * Frame id of originating window (is only set if target has an opener).
             */
            openerFrameId?: Page.FrameId;
            browserContextId?: Browser.BrowserContextID;
            /**
             * Provides additional details for specific target types. For example, for
             * the type of "page", this may be set to "portal" or "prerender".
             */
            subtype?: string;
        }

        /**
         * A filter used by target query/discovery/auto-attach operations.
         */
        interface FilterEntry {
            /**
             * If set, causes exclusion of mathcing targets from the list.
             */
            exclude?: boolean;
            /**
             * If not present, matches any type.
             */
            type?: string;
        }

        /**
         * The entries in TargetFilter are matched sequentially against targets and
         * the first entry that matches determines if the target is included or not,
         * depending on the value of `exclude` field in the entry.
         * If filter is not specified, the one assumed is
         * [{type: "browser", exclude: true}, {type: "tab", exclude: true}, {}]
         * (i.e. include everything but `browser` and `tab`).
         */
        type TargetFilter = FilterEntry[];

        interface RemoteLocation {
            host: string;
            port: integer;
        }

        interface ActivateTargetRequest {
            targetId: TargetID;
        }

        interface AttachToTargetRequest {
            targetId: TargetID;
            /**
             * Enables "flat" access to the session via specifying sessionId attribute in the commands.
             * We plan to make this the default, deprecate non-flattened mode,
             * and eventually retire it. See crbug.com/991325.
             */
            flatten?: boolean;
        }

        interface AttachToTargetResponse {
            /**
             * Id assigned to the session.
             */
            sessionId: SessionID;
        }

        interface AttachToBrowserTargetResponse {
            /**
             * Id assigned to the session.
             */
            sessionId: SessionID;
        }

        interface CloseTargetRequest {
            targetId: TargetID;
        }

        interface CloseTargetResponse {
            /**
             * Always set to true. If an error occurs, the response indicates protocol error.
             */
            success: boolean;
        }

        interface ExposeDevToolsProtocolRequest {
            targetId: TargetID;
            /**
             * Binding name, 'cdp' if not specified.
             */
            bindingName?: string;
        }

        interface CreateBrowserContextRequest {
            /**
             * If specified, disposes this context when debugging session disconnects.
             */
            disposeOnDetach?: boolean;
            /**
             * Proxy server, similar to the one passed to --proxy-server
             */
            proxyServer?: string;
            /**
             * Proxy bypass list, similar to the one passed to --proxy-bypass-list
             */
            proxyBypassList?: string;
            /**
             * An optional list of origins to grant unlimited cross-origin access to.
             * Parts of the URL other than those constituting origin are ignored.
             */
            originsWithUniversalNetworkAccess?: string[];
        }

        interface CreateBrowserContextResponse {
            /**
             * The id of the context created.
             */
            browserContextId: Browser.BrowserContextID;
        }

        interface GetBrowserContextsResponse {
            /**
             * An array of browser context ids.
             */
            browserContextIds: Browser.BrowserContextID[];
        }

        interface CreateTargetRequest {
            /**
             * The initial URL the page will be navigated to. An empty string indicates about:blank.
             */
            url: string;
            /**
             * Frame width in DIP (headless chrome only).
             */
            width?: integer;
            /**
             * Frame height in DIP (headless chrome only).
             */
            height?: integer;
            /**
             * The browser context to create the page in.
             */
            browserContextId?: Browser.BrowserContextID;
            /**
             * Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,
             * not supported on MacOS yet, false by default).
             */
            enableBeginFrameControl?: boolean;
            /**
             * Whether to create a new Window or Tab (chrome-only, false by default).
             */
            newWindow?: boolean;
            /**
             * Whether to create the target in background or foreground (chrome-only,
             * false by default).
             */
            background?: boolean;
            /**
             * Whether to create the target of type "tab".
             */
            forTab?: boolean;
        }

        interface CreateTargetResponse {
            /**
             * The id of the page opened.
             */
            targetId: TargetID;
        }

        interface DetachFromTargetRequest {
            /**
             * Session to detach.
             */
            sessionId?: SessionID;
            /**
             * Deprecated.
             */
            targetId?: TargetID;
        }

        interface DisposeBrowserContextRequest {
            browserContextId: Browser.BrowserContextID;
        }

        interface GetTargetInfoRequest {
            targetId?: TargetID;
        }

        interface GetTargetInfoResponse {
            targetInfo: TargetInfo;
        }

        interface GetTargetsRequest {
            /**
             * Only targets matching filter will be reported. If filter is not specified
             * and target discovery is currently enabled, a filter used for target discovery
             * is used for consistency.
             */
            filter?: TargetFilter;
        }

        interface GetTargetsResponse {
            /**
             * The list of targets.
             */
            targetInfos: TargetInfo[];
        }

        interface SendMessageToTargetRequest {
            message: string;
            /**
             * Identifier of the session.
             */
            sessionId?: SessionID;
            /**
             * Deprecated.
             */
            targetId?: TargetID;
        }

        interface SetAutoAttachRequest {
            /**
             * Whether to auto-attach to related targets.
             */
            autoAttach: boolean;
            /**
             * Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`
             * to run paused targets.
             */
            waitForDebuggerOnStart: boolean;
            /**
             * Enables "flat" access to the session via specifying sessionId attribute in the commands.
             * We plan to make this the default, deprecate non-flattened mode,
             * and eventually retire it. See crbug.com/991325.
             */
            flatten?: boolean;
            /**
             * Only targets matching filter will be attached.
             */
            filter?: TargetFilter;
        }

        interface AutoAttachRelatedRequest {
            targetId: TargetID;
            /**
             * Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`
             * to run paused targets.
             */
            waitForDebuggerOnStart: boolean;
            /**
             * Only targets matching filter will be attached.
             */
            filter?: TargetFilter;
        }

        interface SetDiscoverTargetsRequest {
            /**
             * Whether to discover available targets.
             */
            discover: boolean;
            /**
             * Only targets matching filter will be attached. If `discover` is false,
             * `filter` must be omitted or empty.
             */
            filter?: TargetFilter;
        }

        interface SetRemoteLocationsRequest {
            /**
             * List of remote locations.
             */
            locations: RemoteLocation[];
        }

        /**
         * Issued when attached to target because of auto-attach or `attachToTarget` command.
         */
        interface AttachedToTargetEvent {
            /**
             * Identifier assigned to the session used to send/receive messages.
             */
            sessionId: SessionID;
            targetInfo: TargetInfo;
            waitingForDebugger: boolean;
        }

        /**
         * Issued when detached from target for any reason (including `detachFromTarget` command). Can be
         * issued multiple times per target if multiple sessions have been attached to it.
         */
        interface DetachedFromTargetEvent {
            /**
             * Detached session identifier.
             */
            sessionId: SessionID;
            /**
             * Deprecated.
             */
            targetId?: TargetID;
        }

        /**
         * Notifies about a new protocol message received from the session (as reported in
         * `attachedToTarget` event).
         */
        interface ReceivedMessageFromTargetEvent {
            /**
             * Identifier of a session which sends a message.
             */
            sessionId: SessionID;
            message: string;
            /**
             * Deprecated.
             */
            targetId?: TargetID;
        }

        /**
         * Issued when a possible inspection target is created.
         */
        interface TargetCreatedEvent {
            targetInfo: TargetInfo;
        }

        /**
         * Issued when a target is destroyed.
         */
        interface TargetDestroyedEvent {
            targetId: TargetID;
        }

        /**
         * Issued when a target has crashed.
         */
        interface TargetCrashedEvent {
            targetId: TargetID;
            /**
             * Termination status type.
             */
            status: string;
            /**
             * Termination error code.
             */
            errorCode: integer;
        }

        /**
         * Issued when some information about a target has changed. This only happens between
         * `targetCreated` and `targetDestroyed`.
         */
        interface TargetInfoChangedEvent {
            targetInfo: TargetInfo;
        }
    }

    /**
     * The Tethering domain defines methods and events for browser port binding.
     */
    namespace Tethering {

        interface BindRequest {
            /**
             * Port number to bind.
             */
            port: integer;
        }

        interface UnbindRequest {
            /**
             * Port number to unbind.
             */
            port: integer;
        }

        /**
         * Informs that port was successfully bound and got a specified connection id.
         */
        interface AcceptedEvent {
            /**
             * Port number that was successfully bound.
             */
            port: integer;
            /**
             * Connection id to be used.
             */
            connectionId: string;
        }
    }

    namespace Tracing {

        /**
         * Configuration for memory dump. Used only when "memory-infra" category is enabled.
         */
        interface MemoryDumpConfig {
            [key: string]: string;
        }

        const enum TraceConfigRecordMode {
            RecordUntilFull = 'recordUntilFull',
            RecordContinuously = 'recordContinuously',
            RecordAsMuchAsPossible = 'recordAsMuchAsPossible',
            EchoToConsole = 'echoToConsole',
        }

        interface TraceConfig {
            /**
             * Controls how the trace buffer stores data. (TraceConfigRecordMode enum)
             */
            recordMode?: ('recordUntilFull' | 'recordContinuously' | 'recordAsMuchAsPossible' | 'echoToConsole');
            /**
             * Size of the trace buffer in kilobytes. If not specified or zero is passed, a default value
             * of 200 MB would be used.
             */
            traceBufferSizeInKb?: number;
            /**
             * Turns on JavaScript stack sampling.
             */
            enableSampling?: boolean;
            /**
             * Turns on system tracing.
             */
            enableSystrace?: boolean;
            /**
             * Turns on argument filter.
             */
            enableArgumentFilter?: boolean;
            /**
             * Included category filters.
             */
            includedCategories?: string[];
            /**
             * Excluded category filters.
             */
            excludedCategories?: string[];
            /**
             * Configuration to synthesize the delays in tracing.
             */
            syntheticDelays?: string[];
            /**
             * Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.
             */
            memoryDumpConfig?: MemoryDumpConfig;
        }

        /**
         * Data format of a trace. Can be either the legacy JSON format or the
         * protocol buffer format. Note that the JSON format will be deprecated soon.
         */
        type StreamFormat = ('json' | 'proto');

        /**
         * Compression type to use for traces returned via streams.
         */
        type StreamCompression = ('none' | 'gzip');

        /**
         * Details exposed when memory request explicitly declared.
         * Keep consistent with memory_dump_request_args.h and
         * memory_instrumentation.mojom
         */
        type MemoryDumpLevelOfDetail = ('background' | 'light' | 'detailed');

        /**
         * Backend type to use for tracing. `chrome` uses the Chrome-integrated
         * tracing service and is supported on all platforms. `system` is only
         * supported on Chrome OS and uses the Perfetto system tracing service.
         * `auto` chooses `system` when the perfettoConfig provided to Tracing.start
         * specifies at least one non-Chrome data source; otherwise uses `chrome`.
         */
        type TracingBackend = ('auto' | 'chrome' | 'system');

        interface GetCategoriesResponse {
            /**
             * A list of supported tracing categories.
             */
            categories: string[];
        }

        interface RecordClockSyncMarkerRequest {
            /**
             * The ID of this clock sync marker
             */
            syncId: string;
        }

        interface RequestMemoryDumpRequest {
            /**
             * Enables more deterministic results by forcing garbage collection
             */
            deterministic?: boolean;
            /**
             * Specifies level of details in memory dump. Defaults to "detailed".
             */
            levelOfDetail?: MemoryDumpLevelOfDetail;
        }

        interface RequestMemoryDumpResponse {
            /**
             * GUID of the resulting global memory dump.
             */
            dumpGuid: string;
            /**
             * True iff the global memory dump succeeded.
             */
            success: boolean;
        }

        const enum StartRequestTransferMode {
            ReportEvents = 'ReportEvents',
            ReturnAsStream = 'ReturnAsStream',
        }

        interface StartRequest {
            /**
             * Category/tag filter
             */
            categories?: string;
            /**
             * Tracing options
             */
            options?: string;
            /**
             * If set, the agent will issue bufferUsage events at this interval, specified in milliseconds
             */
            bufferUsageReportingInterval?: number;
            /**
             * Whether to report trace events as series of dataCollected events or to save trace to a
             * stream (defaults to `ReportEvents`). (StartRequestTransferMode enum)
             */
            transferMode?: ('ReportEvents' | 'ReturnAsStream');
            /**
             * Trace data format to use. This only applies when using `ReturnAsStream`
             * transfer mode (defaults to `json`).
             */
            streamFormat?: StreamFormat;
            /**
             * Compression format to use. This only applies when using `ReturnAsStream`
             * transfer mode (defaults to `none`)
             */
            streamCompression?: StreamCompression;
            traceConfig?: TraceConfig;
            /**
             * Base64-encoded serialized perfetto.protos.TraceConfig protobuf message
             * When specified, the parameters `categories`, `options`, `traceConfig`
             * are ignored. (Encoded as a base64 string when passed over JSON)
             */
            perfettoConfig?: string;
            /**
             * Backend type (defaults to `auto`)
             */
            tracingBackend?: TracingBackend;
        }

        interface BufferUsageEvent {
            /**
             * A number in range [0..1] that indicates the used size of event buffer as a fraction of its
             * total size.
             */
            percentFull?: number;
            /**
             * An approximate number of events in the trace log.
             */
            eventCount?: number;
            /**
             * A number in range [0..1] that indicates the used size of event buffer as a fraction of its
             * total size.
             */
            value?: number;
        }

        /**
         * Contains a bucket of collected trace events. When tracing is stopped collected events will be
         * sent as a sequence of dataCollected events followed by tracingComplete event.
         */
        interface DataCollectedEvent {
            value: any[];
        }

        /**
         * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
         * delivered via dataCollected events.
         */
        interface TracingCompleteEvent {
            /**
             * Indicates whether some trace data is known to have been lost, e.g. because the trace ring
             * buffer wrapped around.
             */
            dataLossOccurred: boolean;
            /**
             * A handle of the stream that holds resulting trace data.
             */
            stream?: IO.StreamHandle;
            /**
             * Trace data format of returned stream.
             */
            traceFormat?: StreamFormat;
            /**
             * Compression format of returned stream.
             */
            streamCompression?: StreamCompression;
        }
    }

    /**
     * A domain for letting clients substitute browser's network layer with client code.
     */
    namespace Fetch {

        /**
         * Unique request identifier.
         */
        type RequestId = string;

        /**
         * Stages of the request to handle. Request will intercept before the request is
         * sent. Response will intercept after the response is received (but before response
         * body is received).
         */
        type RequestStage = ('Request' | 'Response');

        interface RequestPattern {
            /**
             * Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is
             * backslash. Omitting is equivalent to `"*"`.
             */
            urlPattern?: string;
            /**
             * If set, only requests for matching resource types will be intercepted.
             */
            resourceType?: Network.ResourceType;
            /**
             * Stage at which to begin intercepting requests. Default is Request.
             */
            requestStage?: RequestStage;
        }

        /**
         * Response HTTP header entry
         */
        interface HeaderEntry {
            name: string;
            value: string;
        }

        const enum AuthChallengeSource {
            Server = 'Server',
            Proxy = 'Proxy',
        }

        /**
         * Authorization challenge for HTTP status code 401 or 407.
         */
        interface AuthChallenge {
            /**
             * Source of the authentication challenge. (AuthChallengeSource enum)
             */
            source?: ('Server' | 'Proxy');
            /**
             * Origin of the challenger.
             */
            origin: string;
            /**
             * The authentication scheme used, such as basic or digest
             */
            scheme: string;
            /**
             * The realm of the challenge. May be empty.
             */
            realm: string;
        }

        const enum AuthChallengeResponseResponse {
            Default = 'Default',
            CancelAuth = 'CancelAuth',
            ProvideCredentials = 'ProvideCredentials',
        }

        /**
         * Response to an AuthChallenge.
         */
        interface AuthChallengeResponse {
            /**
             * The decision on what to do in response to the authorization challenge.  Default means
             * deferring to the default behavior of the net stack, which will likely either the Cancel
             * authentication or display a popup dialog box. (AuthChallengeResponseResponse enum)
             */
            response: ('Default' | 'CancelAuth' | 'ProvideCredentials');
            /**
             * The username to provide, possibly empty. Should only be set if response is
             * ProvideCredentials.
             */
            username?: string;
            /**
             * The password to provide, possibly empty. Should only be set if response is
             * ProvideCredentials.
             */
            password?: string;
        }

        interface EnableRequest {
            /**
             * If specified, only requests matching any of these patterns will produce
             * fetchRequested event and will be paused until clients response. If not set,
             * all requests will be affected.
             */
            patterns?: RequestPattern[];
            /**
             * If true, authRequired events will be issued and requests will be paused
             * expecting a call to continueWithAuth.
             */
            handleAuthRequests?: boolean;
        }

        interface FailRequestRequest {
            /**
             * An id the client received in requestPaused event.
             */
            requestId: RequestId;
            /**
             * Causes the request to fail with the given reason.
             */
            errorReason: Network.ErrorReason;
        }

        interface FulfillRequestRequest {
            /**
             * An id the client received in requestPaused event.
             */
            requestId: RequestId;
            /**
             * An HTTP response code.
             */
            responseCode: integer;
            /**
             * Response headers.
             */
            responseHeaders?: HeaderEntry[];
            /**
             * Alternative way of specifying response headers as a \0-separated
             * series of name: value pairs. Prefer the above method unless you
             * need to represent some non-UTF8 values that can't be transmitted
             * over the protocol as text. (Encoded as a base64 string when passed over JSON)
             */
            binaryResponseHeaders?: string;
            /**
             * A response body. If absent, original response body will be used if
             * the request is intercepted at the response stage and empty body
             * will be used if the request is intercepted at the request stage. (Encoded as a base64 string when passed over JSON)
             */
            body?: string;
            /**
             * A textual representation of responseCode.
             * If absent, a standard phrase matching responseCode is used.
             */
            responsePhrase?: string;
        }

        interface ContinueRequestRequest {
            /**
             * An id the client received in requestPaused event.
             */
            requestId: RequestId;
            /**
             * If set, the request url will be modified in a way that's not observable by page.
             */
            url?: string;
            /**
             * If set, the request method is overridden.
             */
            method?: string;
            /**
             * If set, overrides the post data in the request. (Encoded as a base64 string when passed over JSON)
             */
            postData?: string;
            /**
             * If set, overrides the request headers. Note that the overrides do not
             * extend to subsequent redirect hops, if a redirect happens. Another override
             * may be applied to a different request produced by a redirect.
             */
            headers?: HeaderEntry[];
            /**
             * If set, overrides response interception behavior for this request.
             */
            interceptResponse?: boolean;
        }

        interface ContinueWithAuthRequest {
            /**
             * An id the client received in authRequired event.
             */
            requestId: RequestId;
            /**
             * Response to  with an authChallenge.
             */
            authChallengeResponse: AuthChallengeResponse;
        }

        interface ContinueResponseRequest {
            /**
             * An id the client received in requestPaused event.
             */
            requestId: RequestId;
            /**
             * An HTTP response code. If absent, original response code will be used.
             */
            responseCode?: integer;
            /**
             * A textual representation of responseCode.
             * If absent, a standard phrase matching responseCode is used.
             */
            responsePhrase?: string;
            /**
             * Response headers. If absent, original response headers will be used.
             */
            responseHeaders?: HeaderEntry[];
            /**
             * Alternative way of specifying response headers as a \0-separated
             * series of name: value pairs. Prefer the above method unless you
             * need to represent some non-UTF8 values that can't be transmitted
             * over the protocol as text. (Encoded as a base64 string when passed over JSON)
             */
            binaryResponseHeaders?: string;
        }

        interface GetResponseBodyRequest {
            /**
             * Identifier for the intercepted request to get body for.
             */
            requestId: RequestId;
        }

        interface GetResponseBodyResponse {
            /**
             * Response body.
             */
            body: string;
            /**
             * True, if content was sent as base64.
             */
            base64Encoded: boolean;
        }

        interface TakeResponseBodyAsStreamRequest {
            requestId: RequestId;
        }

        interface TakeResponseBodyAsStreamResponse {
            stream: IO.StreamHandle;
        }

        /**
         * Issued when the domain is enabled and the request URL matches the
         * specified filter. The request is paused until the client responds
         * with one of continueRequest, failRequest or fulfillRequest.
         * The stage of the request can be determined by presence of responseErrorReason
         * and responseStatusCode -- the request is at the response stage if either
         * of these fields is present and in the request stage otherwise.
         * Redirect responses and subsequent requests are reported similarly to regular
         * responses and requests. Redirect responses may be distinguished by the value
         * of `responseStatusCode` (which is one of 301, 302, 303, 307, 308) along with
         * presence of the `location` header. Requests resulting from a redirect will
         * have `redirectedRequestId` field set.
         */
        interface RequestPausedEvent {
            /**
             * Each request the page makes will have a unique id.
             */
            requestId: RequestId;
            /**
             * The details of the request.
             */
            request: Network.Request;
            /**
             * The id of the frame that initiated the request.
             */
            frameId: Page.FrameId;
            /**
             * How the requested resource will be used.
             */
            resourceType: Network.ResourceType;
            /**
             * Response error if intercepted at response stage.
             */
            responseErrorReason?: Network.ErrorReason;
            /**
             * Response code if intercepted at response stage.
             */
            responseStatusCode?: integer;
            /**
             * Response status text if intercepted at response stage.
             */
            responseStatusText?: string;
            /**
             * Response headers if intercepted at the response stage.
             */
            responseHeaders?: HeaderEntry[];
            /**
             * If the intercepted request had a corresponding Network.requestWillBeSent event fired for it,
             * then this networkId will be the same as the requestId present in the requestWillBeSent event.
             */
            networkId?: Network.RequestId;
            /**
             * If the request is due to a redirect response from the server, the id of the request that
             * has caused the redirect.
             */
            redirectedRequestId?: RequestId;
        }

        /**
         * Issued when the domain is enabled with handleAuthRequests set to true.
         * The request is paused until client responds with continueWithAuth.
         */
        interface AuthRequiredEvent {
            /**
             * Each request the page makes will have a unique id.
             */
            requestId: RequestId;
            /**
             * The details of the request.
             */
            request: Network.Request;
            /**
             * The id of the frame that initiated the request.
             */
            frameId: Page.FrameId;
            /**
             * How the requested resource will be used.
             */
            resourceType: Network.ResourceType;
            /**
             * Details of the Authorization Challenge encountered.
             * If this is set, client should respond with continueRequest that
             * contains AuthChallengeResponse.
             */
            authChallenge: AuthChallenge;
        }
    }

    /**
     * This domain allows inspection of Web Audio API.
     * https://webaudio.github.io/web-audio-api/
     */
    namespace WebAudio {

        /**
         * An unique ID for a graph object (AudioContext, AudioNode, AudioParam) in Web Audio API
         */
        type GraphObjectId = string;

        /**
         * Enum of BaseAudioContext types
         */
        type ContextType = ('realtime' | 'offline');

        /**
         * Enum of AudioContextState from the spec
         */
        type ContextState = ('suspended' | 'running' | 'closed');

        /**
         * Enum of AudioNode types
         */
        type NodeType = string;

        /**
         * Enum of AudioNode::ChannelCountMode from the spec
         */
        type ChannelCountMode = ('clamped-max' | 'explicit' | 'max');

        /**
         * Enum of AudioNode::ChannelInterpretation from the spec
         */
        type ChannelInterpretation = ('discrete' | 'speakers');

        /**
         * Enum of AudioParam types
         */
        type ParamType = string;

        /**
         * Enum of AudioParam::AutomationRate from the spec
         */
        type AutomationRate = ('a-rate' | 'k-rate');

        /**
         * Fields in AudioContext that change in real-time.
         */
        interface ContextRealtimeData {
            /**
             * The current context time in second in BaseAudioContext.
             */
            currentTime: number;
            /**
             * The time spent on rendering graph divided by render quantum duration,
             * and multiplied by 100. 100 means the audio renderer reached the full
             * capacity and glitch may occur.
             */
            renderCapacity: number;
            /**
             * A running mean of callback interval.
             */
            callbackIntervalMean: number;
            /**
             * A running variance of callback interval.
             */
            callbackIntervalVariance: number;
        }

        /**
         * Protocol object for BaseAudioContext
         */
        interface BaseAudioContext {
            contextId: GraphObjectId;
            contextType: ContextType;
            contextState: ContextState;
            realtimeData?: ContextRealtimeData;
            /**
             * Platform-dependent callback buffer size.
             */
            callbackBufferSize: number;
            /**
             * Number of output channels supported by audio hardware in use.
             */
            maxOutputChannelCount: number;
            /**
             * Context sample rate.
             */
            sampleRate: number;
        }

        /**
         * Protocol object for AudioListener
         */
        interface AudioListener {
            listenerId: GraphObjectId;
            contextId: GraphObjectId;
        }

        /**
         * Protocol object for AudioNode
         */
        interface AudioNode {
            nodeId: GraphObjectId;
            contextId: GraphObjectId;
            nodeType: NodeType;
            numberOfInputs: number;
            numberOfOutputs: number;
            channelCount: number;
            channelCountMode: ChannelCountMode;
            channelInterpretation: ChannelInterpretation;
        }

        /**
         * Protocol object for AudioParam
         */
        interface AudioParam {
            paramId: GraphObjectId;
            nodeId: GraphObjectId;
            contextId: GraphObjectId;
            paramType: ParamType;
            rate: AutomationRate;
            defaultValue: number;
            minValue: number;
            maxValue: number;
        }

        interface GetRealtimeDataRequest {
            contextId: GraphObjectId;
        }

        interface GetRealtimeDataResponse {
            realtimeData: ContextRealtimeData;
        }

        /**
         * Notifies that a new BaseAudioContext has been created.
         */
        interface ContextCreatedEvent {
            context: BaseAudioContext;
        }

        /**
         * Notifies that an existing BaseAudioContext will be destroyed.
         */
        interface ContextWillBeDestroyedEvent {
            contextId: GraphObjectId;
        }

        /**
         * Notifies that existing BaseAudioContext has changed some properties (id stays the same)..
         */
        interface ContextChangedEvent {
            context: BaseAudioContext;
        }

        /**
         * Notifies that the construction of an AudioListener has finished.
         */
        interface AudioListenerCreatedEvent {
            listener: AudioListener;
        }

        /**
         * Notifies that a new AudioListener has been created.
         */
        interface AudioListenerWillBeDestroyedEvent {
            contextId: GraphObjectId;
            listenerId: GraphObjectId;
        }

        /**
         * Notifies that a new AudioNode has been created.
         */
        interface AudioNodeCreatedEvent {
            node: AudioNode;
        }

        /**
         * Notifies that an existing AudioNode has been destroyed.
         */
        interface AudioNodeWillBeDestroyedEvent {
            contextId: GraphObjectId;
            nodeId: GraphObjectId;
        }

        /**
         * Notifies that a new AudioParam has been created.
         */
        interface AudioParamCreatedEvent {
            param: AudioParam;
        }

        /**
         * Notifies that an existing AudioParam has been destroyed.
         */
        interface AudioParamWillBeDestroyedEvent {
            contextId: GraphObjectId;
            nodeId: GraphObjectId;
            paramId: GraphObjectId;
        }

        /**
         * Notifies that two AudioNodes are connected.
         */
        interface NodesConnectedEvent {
            contextId: GraphObjectId;
            sourceId: GraphObjectId;
            destinationId: GraphObjectId;
            sourceOutputIndex?: number;
            destinationInputIndex?: number;
        }

        /**
         * Notifies that AudioNodes are disconnected. The destination can be null, and it means all the outgoing connections from the source are disconnected.
         */
        interface NodesDisconnectedEvent {
            contextId: GraphObjectId;
            sourceId: GraphObjectId;
            destinationId: GraphObjectId;
            sourceOutputIndex?: number;
            destinationInputIndex?: number;
        }

        /**
         * Notifies that an AudioNode is connected to an AudioParam.
         */
        interface NodeParamConnectedEvent {
            contextId: GraphObjectId;
            sourceId: GraphObjectId;
            destinationId: GraphObjectId;
            sourceOutputIndex?: number;
        }

        /**
         * Notifies that an AudioNode is disconnected to an AudioParam.
         */
        interface NodeParamDisconnectedEvent {
            contextId: GraphObjectId;
            sourceId: GraphObjectId;
            destinationId: GraphObjectId;
            sourceOutputIndex?: number;
        }
    }

    /**
     * This domain allows configuring virtual authenticators to test the WebAuthn
     * API.
     */
    namespace WebAuthn {

        type AuthenticatorId = string;

        type AuthenticatorProtocol = ('u2f' | 'ctap2');

        type Ctap2Version = ('ctap2_0' | 'ctap2_1');

        type AuthenticatorTransport = ('usb' | 'nfc' | 'ble' | 'cable' | 'internal');

        interface VirtualAuthenticatorOptions {
            protocol: AuthenticatorProtocol;
            /**
             * Defaults to ctap2_0. Ignored if |protocol| == u2f.
             */
            ctap2Version?: Ctap2Version;
            transport: AuthenticatorTransport;
            /**
             * Defaults to false.
             */
            hasResidentKey?: boolean;
            /**
             * Defaults to false.
             */
            hasUserVerification?: boolean;
            /**
             * If set to true, the authenticator will support the largeBlob extension.
             * https://w3c.github.io/webauthn#largeBlob
             * Defaults to false.
             */
            hasLargeBlob?: boolean;
            /**
             * If set to true, the authenticator will support the credBlob extension.
             * https://fidoalliance.org/specs/fido-v2.1-rd-20201208/fido-client-to-authenticator-protocol-v2.1-rd-20201208.html#sctn-credBlob-extension
             * Defaults to false.
             */
            hasCredBlob?: boolean;
            /**
             * If set to true, the authenticator will support the minPinLength extension.
             * https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html#sctn-minpinlength-extension
             * Defaults to false.
             */
            hasMinPinLength?: boolean;
            /**
             * If set to true, the authenticator will support the prf extension.
             * https://w3c.github.io/webauthn/#prf-extension
             * Defaults to false.
             */
            hasPrf?: boolean;
            /**
             * If set to true, tests of user presence will succeed immediately.
             * Otherwise, they will not be resolved. Defaults to true.
             */
            automaticPresenceSimulation?: boolean;
            /**
             * Sets whether User Verification succeeds or fails for an authenticator.
             * Defaults to false.
             */
            isUserVerified?: boolean;
        }

        interface Credential {
            credentialId: string;
            isResidentCredential: boolean;
            /**
             * Relying Party ID the credential is scoped to. Must be set when adding a
             * credential.
             */
            rpId?: string;
            /**
             * The ECDSA P-256 private key in PKCS#8 format. (Encoded as a base64 string when passed over JSON)
             */
            privateKey: string;
            /**
             * An opaque byte sequence with a maximum size of 64 bytes mapping the
             * credential to a specific user. (Encoded as a base64 string when passed over JSON)
             */
            userHandle?: string;
            /**
             * Signature counter. This is incremented by one for each successful
             * assertion.
             * See https://w3c.github.io/webauthn/#signature-counter
             */
            signCount: integer;
            /**
             * The large blob associated with the credential.
             * See https://w3c.github.io/webauthn/#sctn-large-blob-extension (Encoded as a base64 string when passed over JSON)
             */
            largeBlob?: string;
        }

        interface EnableRequest {
            /**
             * Whether to enable the WebAuthn user interface. Enabling the UI is
             * recommended for debugging and demo purposes, as it is closer to the real
             * experience. Disabling the UI is recommended for automated testing.
             * Supported at the embedder's discretion if UI is available.
             * Defaults to false.
             */
            enableUI?: boolean;
        }

        interface AddVirtualAuthenticatorRequest {
            options: VirtualAuthenticatorOptions;
        }

        interface AddVirtualAuthenticatorResponse {
            authenticatorId: AuthenticatorId;
        }

        interface SetResponseOverrideBitsRequest {
            authenticatorId: AuthenticatorId;
            /**
             * If isBogusSignature is set, overrides the signature in the authenticator response to be zero.
             * Defaults to false.
             */
            isBogusSignature?: boolean;
            /**
             * If isBadUV is set, overrides the UV bit in the flags in the authenticator response to
             * be zero. Defaults to false.
             */
            isBadUV?: boolean;
            /**
             * If isBadUP is set, overrides the UP bit in the flags in the authenticator response to
             * be zero. Defaults to false.
             */
            isBadUP?: boolean;
        }

        interface RemoveVirtualAuthenticatorRequest {
            authenticatorId: AuthenticatorId;
        }

        interface AddCredentialRequest {
            authenticatorId: AuthenticatorId;
            credential: Credential;
        }

        interface GetCredentialRequest {
            authenticatorId: AuthenticatorId;
            credentialId: string;
        }

        interface GetCredentialResponse {
            credential: Credential;
        }

        interface GetCredentialsRequest {
            authenticatorId: AuthenticatorId;
        }

        interface GetCredentialsResponse {
            credentials: Credential[];
        }

        interface RemoveCredentialRequest {
            authenticatorId: AuthenticatorId;
            credentialId: string;
        }

        interface ClearCredentialsRequest {
            authenticatorId: AuthenticatorId;
        }

        interface SetUserVerifiedRequest {
            authenticatorId: AuthenticatorId;
            isUserVerified: boolean;
        }

        interface SetAutomaticPresenceSimulationRequest {
            authenticatorId: AuthenticatorId;
            enabled: boolean;
        }

        /**
         * Triggered when a credential is added to an authenticator.
         */
        interface CredentialAddedEvent {
            authenticatorId: AuthenticatorId;
            credential: Credential;
        }

        /**
         * Triggered when a credential is used in a webauthn assertion.
         */
        interface CredentialAssertedEvent {
            authenticatorId: AuthenticatorId;
            credential: Credential;
        }
    }

    /**
     * This domain allows detailed inspection of media elements
     */
    namespace Media {

        /**
         * Players will get an ID that is unique within the agent context.
         */
        type PlayerId = string;

        type Timestamp = number;

        const enum PlayerMessageLevel {
            Error = 'error',
            Warning = 'warning',
            Info = 'info',
            Debug = 'debug',
        }

        /**
         * Have one type per entry in MediaLogRecord::Type
         * Corresponds to kMessage
         */
        interface PlayerMessage {
            /**
             * Keep in sync with MediaLogMessageLevel
             * We are currently keeping the message level 'error' separate from the
             * PlayerError type because right now they represent different things,
             * this one being a DVLOG(ERROR) style log message that gets printed
             * based on what log level is selected in the UI, and the other is a
             * representation of a media::PipelineStatus object. Soon however we're
             * going to be moving away from using PipelineStatus for errors and
             * introducing a new error type which should hopefully let us integrate
             * the error log level into the PlayerError type. (PlayerMessageLevel enum)
             */
            level: ('error' | 'warning' | 'info' | 'debug');
            message: string;
        }

        /**
         * Corresponds to kMediaPropertyChange
         */
        interface PlayerProperty {
            name: string;
            value: string;
        }

        /**
         * Corresponds to kMediaEventTriggered
         */
        interface PlayerEvent {
            timestamp: Timestamp;
            value: string;
        }

        /**
         * Represents logged source line numbers reported in an error.
         * NOTE: file and line are from chromium c++ implementation code, not js.
         */
        interface PlayerErrorSourceLocation {
            file: string;
            line: integer;
        }

        /**
         * Corresponds to kMediaError
         */
        interface PlayerError {
            errorType: string;
            /**
             * Code is the numeric enum entry for a specific set of error codes, such
             * as PipelineStatusCodes in media/base/pipeline_status.h
             */
            code: integer;
            /**
             * A trace of where this error was caused / where it passed through.
             */
            stack: PlayerErrorSourceLocation[];
            /**
             * Errors potentially have a root cause error, ie, a DecoderError might be
             * caused by an WindowsError
             */
            cause: PlayerError[];
            /**
             * Extra data attached to an error, such as an HRESULT, Video Codec, etc.
             */
            data: any;
        }

        /**
         * This can be called multiple times, and can be used to set / override /
         * remove player properties. A null propValue indicates removal.
         */
        interface PlayerPropertiesChangedEvent {
            playerId: PlayerId;
            properties: PlayerProperty[];
        }

        /**
         * Send events as a list, allowing them to be batched on the browser for less
         * congestion. If batched, events must ALWAYS be in chronological order.
         */
        interface PlayerEventsAddedEvent {
            playerId: PlayerId;
            events: PlayerEvent[];
        }

        /**
         * Send a list of any messages that need to be delivered.
         */
        interface PlayerMessagesLoggedEvent {
            playerId: PlayerId;
            messages: PlayerMessage[];
        }

        /**
         * Send a list of any errors that need to be delivered.
         */
        interface PlayerErrorsRaisedEvent {
            playerId: PlayerId;
            errors: PlayerError[];
        }

        /**
         * Called whenever a player is created, or when a new agent joins and receives
         * a list of active players. If an agent is restored, it will receive the full
         * list of player ids and all events again.
         */
        interface PlayersCreatedEvent {
            players: PlayerId[];
        }
    }

    namespace DeviceAccess {

        /**
         * Device request id.
         */
        type RequestId = string;

        /**
         * A device id.
         */
        type DeviceId = string;

        /**
         * Device information displayed in a user prompt to select a device.
         */
        interface PromptDevice {
            id: DeviceId;
            /**
             * Display name as it appears in a device request user prompt.
             */
            name: string;
        }

        interface SelectPromptRequest {
            id: RequestId;
            deviceId: DeviceId;
        }

        interface CancelPromptRequest {
            id: RequestId;
        }

        /**
         * A device request opened a user prompt to select a device. Respond with the
         * selectPrompt or cancelPrompt command.
         */
        interface DeviceRequestPromptedEvent {
            id: RequestId;
            devices: PromptDevice[];
        }
    }

    namespace Preload {

        /**
         * Unique id
         */
        type RuleSetId = string;

        /**
         * Corresponds to SpeculationRuleSet
         */
        interface RuleSet {
            id: RuleSetId;
            /**
             * Identifies a document which the rule set is associated with.
             */
            loaderId: Network.LoaderId;
            /**
             * Source text of JSON representing the rule set. If it comes from
             * `<script>` tag, it is the textContent of the node. Note that it is
             * a JSON for valid case.
             * 
             * See also:
             * - https://wicg.github.io/nav-speculation/speculation-rules.html
             * - https://github.com/WICG/nav-speculation/blob/main/triggers.md
             */
            sourceText: string;
            /**
             * A speculation rule set is either added through an inline
             * `<script>` tag or through an external resource via the
             * 'Speculation-Rules' HTTP header. For the first case, we include
             * the BackendNodeId of the relevant `<script>` tag. For the second
             * case, we include the external URL where the rule set was loaded
             * from, and also RequestId if Network domain is enabled.
             * 
             * See also:
             * - https://wicg.github.io/nav-speculation/speculation-rules.html#speculation-rules-script
             * - https://wicg.github.io/nav-speculation/speculation-rules.html#speculation-rules-header
             */
            backendNodeId?: DOM.BackendNodeId;
            url?: string;
            requestId?: Network.RequestId;
            /**
             * Error information
             * `errorMessage` is null iff `errorType` is null.
             */
            errorType?: RuleSetErrorType;
            /**
             * TODO(https://crbug.com/1425354): Replace this property with structured error.
             */
            errorMessage?: string;
        }

        type RuleSetErrorType = ('SourceIsNotJsonObject' | 'InvalidRulesSkipped');

        /**
         * The type of preloading attempted. It corresponds to
         * mojom::SpeculationAction (although PrefetchWithSubresources is omitted as it
         * isn't being used by clients).
         */
        type SpeculationAction = ('Prefetch' | 'Prerender');

        /**
         * Corresponds to mojom::SpeculationTargetHint.
         * See https://github.com/WICG/nav-speculation/blob/main/triggers.md#window-name-targeting-hints
         */
        type SpeculationTargetHint = ('Blank' | 'Self');

        /**
         * A key that identifies a preloading attempt.
         * 
         * The url used is the url specified by the trigger (i.e. the initial URL), and
         * not the final url that is navigated to. For example, prerendering allows
         * same-origin main frame navigations during the attempt, but the attempt is
         * still keyed with the initial URL.
         */
        interface PreloadingAttemptKey {
            loaderId: Network.LoaderId;
            action: SpeculationAction;
            url: string;
            targetHint?: SpeculationTargetHint;
        }

        /**
         * Lists sources for a preloading attempt, specifically the ids of rule sets
         * that had a speculation rule that triggered the attempt, and the
         * BackendNodeIds of <a href> or <area href> elements that triggered the
         * attempt (in the case of attempts triggered by a document rule). It is
         * possible for mulitple rule sets and links to trigger a single attempt.
         */
        interface PreloadingAttemptSource {
            key: PreloadingAttemptKey;
            ruleSetIds: RuleSetId[];
            nodeIds: DOM.BackendNodeId[];
        }

        /**
         * List of FinalStatus reasons for Prerender2.
         */
        type PrerenderFinalStatus = ('Activated' | 'Destroyed' | 'LowEndDevice' | 'InvalidSchemeRedirect' | 'InvalidSchemeNavigation' | 'InProgressNavigation' | 'NavigationRequestBlockedByCsp' | 'MainFrameNavigation' | 'MojoBinderPolicy' | 'RendererProcessCrashed' | 'RendererProcessKilled' | 'Download' | 'TriggerDestroyed' | 'NavigationNotCommitted' | 'NavigationBadHttpStatus' | 'ClientCertRequested' | 'NavigationRequestNetworkError' | 'MaxNumOfRunningPrerendersExceeded' | 'CancelAllHostsForTesting' | 'DidFailLoad' | 'Stop' | 'SslCertificateError' | 'LoginAuthRequested' | 'UaChangeRequiresReload' | 'BlockedByClient' | 'AudioOutputDeviceRequested' | 'MixedContent' | 'TriggerBackgrounded' | 'MemoryLimitExceeded' | 'FailToGetMemoryUsage' | 'DataSaverEnabled' | 'HasEffectiveUrl' | 'ActivatedBeforeStarted' | 'InactivePageRestriction' | 'StartFailed' | 'TimeoutBackgrounded' | 'CrossSiteRedirectInInitialNavigation' | 'CrossSiteNavigationInInitialNavigation' | 'SameSiteCrossOriginRedirectNotOptInInInitialNavigation' | 'SameSiteCrossOriginNavigationNotOptInInInitialNavigation' | 'ActivationNavigationParameterMismatch' | 'ActivatedInBackground' | 'EmbedderHostDisallowed' | 'ActivationNavigationDestroyedBeforeSuccess' | 'TabClosedByUserGesture' | 'TabClosedWithoutUserGesture' | 'PrimaryMainFrameRendererProcessCrashed' | 'PrimaryMainFrameRendererProcessKilled' | 'ActivationFramePolicyNotCompatible' | 'PreloadingDisabled' | 'BatterySaverEnabled' | 'ActivatedDuringMainFrameNavigation' | 'PreloadingUnsupportedByWebContents' | 'CrossSiteRedirectInMainFrameNavigation' | 'CrossSiteNavigationInMainFrameNavigation' | 'SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation' | 'SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation' | 'MemoryPressureOnTrigger' | 'MemoryPressureAfterTriggered' | 'PrerenderingDisabledByDevTools' | 'ResourceLoadBlockedByClient' | 'SpeculationRuleRemoved' | 'ActivatedWithAuxiliaryBrowsingContexts');

        /**
         * Preloading status values, see also PreloadingTriggeringOutcome. This
         * status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
         */
        type PreloadingStatus = ('Pending' | 'Running' | 'Ready' | 'Success' | 'Failure' | 'NotSupported');

        /**
         * TODO(https://crbug.com/1384419): revisit the list of PrefetchStatus and
         * filter out the ones that aren't necessary to the developers.
         */
        type PrefetchStatus = ('PrefetchAllowed' | 'PrefetchFailedIneligibleRedirect' | 'PrefetchFailedInvalidRedirect' | 'PrefetchFailedMIMENotSupported' | 'PrefetchFailedNetError' | 'PrefetchFailedNon2XX' | 'PrefetchFailedPerPageLimitExceeded' | 'PrefetchEvicted' | 'PrefetchHeldback' | 'PrefetchIneligibleRetryAfter' | 'PrefetchIsPrivacyDecoy' | 'PrefetchIsStale' | 'PrefetchNotEligibleBrowserContextOffTheRecord' | 'PrefetchNotEligibleDataSaverEnabled' | 'PrefetchNotEligibleExistingProxy' | 'PrefetchNotEligibleHostIsNonUnique' | 'PrefetchNotEligibleNonDefaultStoragePartition' | 'PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy' | 'PrefetchNotEligibleSchemeIsNotHttps' | 'PrefetchNotEligibleUserHasCookies' | 'PrefetchNotEligibleUserHasServiceWorker' | 'PrefetchNotEligibleBatterySaverEnabled' | 'PrefetchNotEligiblePreloadingDisabled' | 'PrefetchNotFinishedInTime' | 'PrefetchNotStarted' | 'PrefetchNotUsedCookiesChanged' | 'PrefetchProxyNotAvailable' | 'PrefetchResponseUsed' | 'PrefetchSuccessfulButNotUsed' | 'PrefetchNotUsedProbeFailed');

        /**
         * Upsert. Currently, it is only emitted when a rule set added.
         */
        interface RuleSetUpdatedEvent {
            ruleSet: RuleSet;
        }

        interface RuleSetRemovedEvent {
            id: RuleSetId;
        }

        /**
         * Fired when a prerender attempt is completed.
         */
        interface PrerenderAttemptCompletedEvent {
            key: PreloadingAttemptKey;
            /**
             * The frame id of the frame initiating prerendering.
             */
            initiatingFrameId: Page.FrameId;
            prerenderingUrl: string;
            finalStatus: PrerenderFinalStatus;
            /**
             * This is used to give users more information about the name of the API call
             * that is incompatible with prerender and has caused the cancellation of the attempt
             */
            disallowedApiMethod?: string;
        }

        /**
         * Fired when a preload enabled state is updated.
         */
        interface PreloadEnabledStateUpdatedEvent {
            disabledByPreference: boolean;
            disabledByDataSaver: boolean;
            disabledByBatterySaver: boolean;
            disabledByHoldbackPrefetchSpeculationRules: boolean;
            disabledByHoldbackPrerenderSpeculationRules: boolean;
        }

        /**
         * Fired when a prefetch attempt is updated.
         */
        interface PrefetchStatusUpdatedEvent {
            key: PreloadingAttemptKey;
            /**
             * The frame id of the frame initiating prefetch.
             */
            initiatingFrameId: Page.FrameId;
            prefetchUrl: string;
            status: PreloadingStatus;
            prefetchStatus: PrefetchStatus;
            requestId: Network.RequestId;
        }

        /**
         * Fired when a prerender attempt is updated.
         */
        interface PrerenderStatusUpdatedEvent {
            key: PreloadingAttemptKey;
            status: PreloadingStatus;
            prerenderStatus?: PrerenderFinalStatus;
            /**
             * This is used to give users more information about the name of Mojo interface
             * that is incompatible with prerender and has caused the cancellation of the attempt.
             */
            disallowedMojoInterface?: string;
        }

        /**
         * Send a list of sources for all preloading attempts in a document.
         */
        interface PreloadingAttemptSourcesUpdatedEvent {
            loaderId: Network.LoaderId;
            preloadingAttemptSources: PreloadingAttemptSource[];
        }
    }

    /**
     * This domain allows interacting with the FedCM dialog.
     */
    namespace FedCm {

        /**
         * Whether this is a sign-up or sign-in action for this account, i.e.
         * whether this account has ever been used to sign in to this RP before.
         */
        type LoginState = ('SignIn' | 'SignUp');

        /**
         * Whether the dialog shown is an account chooser or an auto re-authentication dialog.
         */
        type DialogType = ('AccountChooser' | 'AutoReauthn' | 'ConfirmIdpSignin');

        /**
         * Corresponds to IdentityRequestAccount
         */
        interface Account {
            accountId: string;
            email: string;
            name: string;
            givenName: string;
            pictureUrl: string;
            idpConfigUrl: string;
            idpSigninUrl: string;
            loginState: LoginState;
            /**
             * These two are only set if the loginState is signUp
             */
            termsOfServiceUrl?: string;
            privacyPolicyUrl?: string;
        }

        interface EnableRequest {
            /**
             * Allows callers to disable the promise rejection delay that would
             * normally happen, if this is unimportant to what's being tested.
             * (step 4 of https://fedidcg.github.io/FedCM/#browser-api-rp-sign-in)
             */
            disableRejectionDelay?: boolean;
        }

        interface SelectAccountRequest {
            dialogId: string;
            accountIndex: integer;
        }

        interface DismissDialogRequest {
            dialogId: string;
            triggerCooldown?: boolean;
        }

        interface DialogShownEvent {
            dialogId: string;
            dialogType: DialogType;
            accounts: Account[];
            /**
             * These exist primarily so that the caller can verify the
             * RP context was used appropriately.
             */
            title: string;
            subtitle?: string;
        }
    }
}

/**
 * Mappings from protocol event and command names to the types required for them.
 */
declare namespace ProtocolMapping {
    interface Events {
        /**
         * Issued when new console message is added.
         */
        'Console.messageAdded': [Protocol.Console.MessageAddedEvent];
        /**
         * Fired when breakpoint is resolved to an actual script and location.
         */
        'Debugger.breakpointResolved': [Protocol.Debugger.BreakpointResolvedEvent];
        /**
         * Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.
         */
        'Debugger.paused': [Protocol.Debugger.PausedEvent];
        /**
         * Fired when the virtual machine resumed execution.
         */
        'Debugger.resumed': [];
        /**
         * Fired when virtual machine fails to parse the script.
         */
        'Debugger.scriptFailedToParse': [Protocol.Debugger.ScriptFailedToParseEvent];
        /**
         * Fired when virtual machine parses script. This event is also fired for all known and uncollected
         * scripts upon enabling debugger.
         */
        'Debugger.scriptParsed': [Protocol.Debugger.ScriptParsedEvent];
        'HeapProfiler.addHeapSnapshotChunk': [Protocol.HeapProfiler.AddHeapSnapshotChunkEvent];
        /**
         * If heap objects tracking has been started then backend may send update for one or more fragments
         */
        'HeapProfiler.heapStatsUpdate': [Protocol.HeapProfiler.HeapStatsUpdateEvent];
        /**
         * If heap objects tracking has been started then backend regularly sends a current value for last
         * seen object id and corresponding timestamp. If the were changes in the heap since last event
         * then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.
         */
        'HeapProfiler.lastSeenObjectId': [Protocol.HeapProfiler.LastSeenObjectIdEvent];
        'HeapProfiler.reportHeapSnapshotProgress': [Protocol.HeapProfiler.ReportHeapSnapshotProgressEvent];
        'HeapProfiler.resetProfiles': [];
        'Profiler.consoleProfileFinished': [Protocol.Profiler.ConsoleProfileFinishedEvent];
        /**
         * Sent when new profile recording is started using console.profile() call.
         */
        'Profiler.consoleProfileStarted': [Protocol.Profiler.ConsoleProfileStartedEvent];
        /**
         * Reports coverage delta since the last poll (either from an event like this, or from
         * `takePreciseCoverage` for the current isolate. May only be sent if precise code
         * coverage has been started. This event can be trigged by the embedder to, for example,
         * trigger collection of coverage data immediately at a certain point in time.
         */
        'Profiler.preciseCoverageDeltaUpdate': [Protocol.Profiler.PreciseCoverageDeltaUpdateEvent];
        /**
         * Notification is issued every time when binding is called.
         */
        'Runtime.bindingCalled': [Protocol.Runtime.BindingCalledEvent];
        /**
         * Issued when console API was called.
         */
        'Runtime.consoleAPICalled': [Protocol.Runtime.ConsoleAPICalledEvent];
        /**
         * Issued when unhandled exception was revoked.
         */
        'Runtime.exceptionRevoked': [Protocol.Runtime.ExceptionRevokedEvent];
        /**
         * Issued when exception was thrown and unhandled.
         */
        'Runtime.exceptionThrown': [Protocol.Runtime.ExceptionThrownEvent];
        /**
         * Issued when new execution context is created.
         */
        'Runtime.executionContextCreated': [Protocol.Runtime.ExecutionContextCreatedEvent];
        /**
         * Issued when execution context is destroyed.
         */
        'Runtime.executionContextDestroyed': [Protocol.Runtime.ExecutionContextDestroyedEvent];
        /**
         * Issued when all executionContexts were cleared in browser
         */
        'Runtime.executionContextsCleared': [];
        /**
         * Issued when object should be inspected (for example, as a result of inspect() command line API
         * call).
         */
        'Runtime.inspectRequested': [Protocol.Runtime.InspectRequestedEvent];
        /**
         * The loadComplete event mirrors the load complete event sent by the browser to assistive
         * technology when the web page has finished loading.
         */
        'Accessibility.loadComplete': [Protocol.Accessibility.LoadCompleteEvent];
        /**
         * The nodesUpdated event is sent every time a previously requested node has changed the in tree.
         */
        'Accessibility.nodesUpdated': [Protocol.Accessibility.NodesUpdatedEvent];
        /**
         * Event for when an animation has been cancelled.
         */
        'Animation.animationCanceled': [Protocol.Animation.AnimationCanceledEvent];
        /**
         * Event for each animation that has been created.
         */
        'Animation.animationCreated': [Protocol.Animation.AnimationCreatedEvent];
        /**
         * Event for animation that has been started.
         */
        'Animation.animationStarted': [Protocol.Animation.AnimationStartedEvent];
        'Audits.issueAdded': [Protocol.Audits.IssueAddedEvent];
        /**
         * Called when the recording state for the service has been updated.
         */
        'BackgroundService.recordingStateChanged': [Protocol.BackgroundService.RecordingStateChangedEvent];
        /**
         * Called with all existing backgroundServiceEvents when enabled, and all new
         * events afterwards if enabled and recording.
         */
        'BackgroundService.backgroundServiceEventReceived': [Protocol.BackgroundService.BackgroundServiceEventReceivedEvent];
        /**
         * Fired when page is about to start a download.
         */
        'Browser.downloadWillBegin': [Protocol.Browser.DownloadWillBeginEvent];
        /**
         * Fired when download makes progress. Last call has |done| == true.
         */
        'Browser.downloadProgress': [Protocol.Browser.DownloadProgressEvent];
        /**
         * Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
         * web font.
         */
        'CSS.fontsUpdated': [Protocol.CSS.FontsUpdatedEvent];
        /**
         * Fires whenever a MediaQuery result changes (for example, after a browser window has been
         * resized.) The current implementation considers only viewport-dependent media features.
         */
        'CSS.mediaQueryResultChanged': [];
        /**
         * Fired whenever an active document stylesheet is added.
         */
        'CSS.styleSheetAdded': [Protocol.CSS.StyleSheetAddedEvent];
        /**
         * Fired whenever a stylesheet is changed as a result of the client operation.
         */
        'CSS.styleSheetChanged': [Protocol.CSS.StyleSheetChangedEvent];
        /**
         * Fired whenever an active document stylesheet is removed.
         */
        'CSS.styleSheetRemoved': [Protocol.CSS.StyleSheetRemovedEvent];
        /**
         * This is fired whenever the list of available sinks changes. A sink is a
         * device or a software surface that you can cast to.
         */
        'Cast.sinksUpdated': [Protocol.Cast.SinksUpdatedEvent];
        /**
         * This is fired whenever the outstanding issue/error message changes.
         * |issueMessage| is empty if there is no issue.
         */
        'Cast.issueUpdated': [Protocol.Cast.IssueUpdatedEvent];
        /**
         * Fired when `Element`'s attribute is modified.
         */
        'DOM.attributeModified': [Protocol.DOM.AttributeModifiedEvent];
        /**
         * Fired when `Element`'s attribute is removed.
         */
        'DOM.attributeRemoved': [Protocol.DOM.AttributeRemovedEvent];
        /**
         * Mirrors `DOMCharacterDataModified` event.
         */
        'DOM.characterDataModified': [Protocol.DOM.CharacterDataModifiedEvent];
        /**
         * Fired when `Container`'s child node count has changed.
         */
        'DOM.childNodeCountUpdated': [Protocol.DOM.ChildNodeCountUpdatedEvent];
        /**
         * Mirrors `DOMNodeInserted` event.
         */
        'DOM.childNodeInserted': [Protocol.DOM.ChildNodeInsertedEvent];
        /**
         * Mirrors `DOMNodeRemoved` event.
         */
        'DOM.childNodeRemoved': [Protocol.DOM.ChildNodeRemovedEvent];
        /**
         * Called when distribution is changed.
         */
        'DOM.distributedNodesUpdated': [Protocol.DOM.DistributedNodesUpdatedEvent];
        /**
         * Fired when `Document` has been totally updated. Node ids are no longer valid.
         */
        'DOM.documentUpdated': [];
        /**
         * Fired when `Element`'s inline style is modified via a CSS property modification.
         */
        'DOM.inlineStyleInvalidated': [Protocol.DOM.InlineStyleInvalidatedEvent];
        /**
         * Called when a pseudo element is added to an element.
         */
        'DOM.pseudoElementAdded': [Protocol.DOM.PseudoElementAddedEvent];
        /**
         * Called when top layer elements are changed.
         */
        'DOM.topLayerElementsUpdated': [];
        /**
         * Called when a pseudo element is removed from an element.
         */
        'DOM.pseudoElementRemoved': [Protocol.DOM.PseudoElementRemovedEvent];
        /**
         * Fired when backend wants to provide client with the missing DOM structure. This happens upon
         * most of the calls requesting node ids.
         */
        'DOM.setChildNodes': [Protocol.DOM.SetChildNodesEvent];
        /**
         * Called when shadow root is popped from the element.
         */
        'DOM.shadowRootPopped': [Protocol.DOM.ShadowRootPoppedEvent];
        /**
         * Called when shadow root is pushed into the element.
         */
        'DOM.shadowRootPushed': [Protocol.DOM.ShadowRootPushedEvent];
        'DOMStorage.domStorageItemAdded': [Protocol.DOMStorage.DomStorageItemAddedEvent];
        'DOMStorage.domStorageItemRemoved': [Protocol.DOMStorage.DomStorageItemRemovedEvent];
        'DOMStorage.domStorageItemUpdated': [Protocol.DOMStorage.DomStorageItemUpdatedEvent];
        'DOMStorage.domStorageItemsCleared': [Protocol.DOMStorage.DomStorageItemsClearedEvent];
        'Database.addDatabase': [Protocol.Database.AddDatabaseEvent];
        /**
         * Notification sent after the virtual time budget for the current VirtualTimePolicy has run out.
         */
        'Emulation.virtualTimeBudgetExpired': [];
        /**
         * Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to
         * restore normal drag and drop behavior.
         */
        'Input.dragIntercepted': [Protocol.Input.DragInterceptedEvent];
        /**
         * Fired when remote debugging connection is about to be terminated. Contains detach reason.
         */
        'Inspector.detached': [Protocol.Inspector.DetachedEvent];
        /**
         * Fired when debugging target has crashed
         */
        'Inspector.targetCrashed': [];
        /**
         * Fired when debugging target has reloaded after crash
         */
        'Inspector.targetReloadedAfterCrash': [];
        'LayerTree.layerPainted': [Protocol.LayerTree.LayerPaintedEvent];
        'LayerTree.layerTreeDidChange': [Protocol.LayerTree.LayerTreeDidChangeEvent];
        /**
         * Issued when new message was logged.
         */
        'Log.entryAdded': [Protocol.Log.EntryAddedEvent];
        /**
         * Fired when data chunk was received over the network.
         */
        'Network.dataReceived': [Protocol.Network.DataReceivedEvent];
        /**
         * Fired when EventSource message is received.
         */
        'Network.eventSourceMessageReceived': [Protocol.Network.EventSourceMessageReceivedEvent];
        /**
         * Fired when HTTP request has failed to load.
         */
        'Network.loadingFailed': [Protocol.Network.LoadingFailedEvent];
        /**
         * Fired when HTTP request has finished loading.
         */
        'Network.loadingFinished': [Protocol.Network.LoadingFinishedEvent];
        /**
         * Details of an intercepted HTTP request, which must be either allowed, blocked, modified or
         * mocked.
         * Deprecated, use Fetch.requestPaused instead.
         */
        'Network.requestIntercepted': [Protocol.Network.RequestInterceptedEvent];
        /**
         * Fired if request ended up loading from cache.
         */
        'Network.requestServedFromCache': [Protocol.Network.RequestServedFromCacheEvent];
        /**
         * Fired when page is about to send HTTP request.
         */
        'Network.requestWillBeSent': [Protocol.Network.RequestWillBeSentEvent];
        /**
         * Fired when resource loading priority is changed
         */
        'Network.resourceChangedPriority': [Protocol.Network.ResourceChangedPriorityEvent];
        /**
         * Fired when a signed exchange was received over the network
         */
        'Network.signedExchangeReceived': [Protocol.Network.SignedExchangeReceivedEvent];
        /**
         * Fired when HTTP response is available.
         */
        'Network.responseReceived': [Protocol.Network.ResponseReceivedEvent];
        /**
         * Fired when WebSocket is closed.
         */
        'Network.webSocketClosed': [Protocol.Network.WebSocketClosedEvent];
        /**
         * Fired upon WebSocket creation.
         */
        'Network.webSocketCreated': [Protocol.Network.WebSocketCreatedEvent];
        /**
         * Fired when WebSocket message error occurs.
         */
        'Network.webSocketFrameError': [Protocol.Network.WebSocketFrameErrorEvent];
        /**
         * Fired when WebSocket message is received.
         */
        'Network.webSocketFrameReceived': [Protocol.Network.WebSocketFrameReceivedEvent];
        /**
         * Fired when WebSocket message is sent.
         */
        'Network.webSocketFrameSent': [Protocol.Network.WebSocketFrameSentEvent];
        /**
         * Fired when WebSocket handshake response becomes available.
         */
        'Network.webSocketHandshakeResponseReceived': [Protocol.Network.WebSocketHandshakeResponseReceivedEvent];
        /**
         * Fired when WebSocket is about to initiate handshake.
         */
        'Network.webSocketWillSendHandshakeRequest': [Protocol.Network.WebSocketWillSendHandshakeRequestEvent];
        /**
         * Fired upon WebTransport creation.
         */
        'Network.webTransportCreated': [Protocol.Network.WebTransportCreatedEvent];
        /**
         * Fired when WebTransport handshake is finished.
         */
        'Network.webTransportConnectionEstablished': [Protocol.Network.WebTransportConnectionEstablishedEvent];
        /**
         * Fired when WebTransport is disposed.
         */
        'Network.webTransportClosed': [Protocol.Network.WebTransportClosedEvent];
        /**
         * Fired when additional information about a requestWillBeSent event is available from the
         * network stack. Not every requestWillBeSent event will have an additional
         * requestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent
         * or requestWillBeSentExtraInfo will be fired first for the same request.
         */
        'Network.requestWillBeSentExtraInfo': [Protocol.Network.RequestWillBeSentExtraInfoEvent];
        /**
         * Fired when additional information about a responseReceived event is available from the network
         * stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
         * it, and responseReceivedExtraInfo may be fired before or after responseReceived.
         */
        'Network.responseReceivedExtraInfo': [Protocol.Network.ResponseReceivedExtraInfoEvent];
        /**
         * Fired exactly once for each Trust Token operation. Depending on
         * the type of the operation and whether the operation succeeded or
         * failed, the event is fired before the corresponding request was sent
         * or after the response was received.
         */
        'Network.trustTokenOperationDone': [Protocol.Network.TrustTokenOperationDoneEvent];
        /**
         * Fired once when parsing the .wbn file has succeeded.
         * The event contains the information about the web bundle contents.
         */
        'Network.subresourceWebBundleMetadataReceived': [Protocol.Network.SubresourceWebBundleMetadataReceivedEvent];
        /**
         * Fired once when parsing the .wbn file has failed.
         */
        'Network.subresourceWebBundleMetadataError': [Protocol.Network.SubresourceWebBundleMetadataErrorEvent];
        /**
         * Fired when handling requests for resources within a .wbn file.
         * Note: this will only be fired for resources that are requested by the webpage.
         */
        'Network.subresourceWebBundleInnerResponseParsed': [Protocol.Network.SubresourceWebBundleInnerResponseParsedEvent];
        /**
         * Fired when request for resources within a .wbn file failed.
         */
        'Network.subresourceWebBundleInnerResponseError': [Protocol.Network.SubresourceWebBundleInnerResponseErrorEvent];
        /**
         * Is sent whenever a new report is added.
         * And after 'enableReportingApi' for all existing reports.
         */
        'Network.reportingApiReportAdded': [Protocol.Network.ReportingApiReportAddedEvent];
        'Network.reportingApiReportUpdated': [Protocol.Network.ReportingApiReportUpdatedEvent];
        'Network.reportingApiEndpointsChangedForOrigin': [Protocol.Network.ReportingApiEndpointsChangedForOriginEvent];
        /**
         * Fired when the node should be inspected. This happens after call to `setInspectMode` or when
         * user manually inspects an element.
         */
        'Overlay.inspectNodeRequested': [Protocol.Overlay.InspectNodeRequestedEvent];
        /**
         * Fired when the node should be highlighted. This happens after call to `setInspectMode`.
         */
        'Overlay.nodeHighlightRequested': [Protocol.Overlay.NodeHighlightRequestedEvent];
        /**
         * Fired when user asks to capture screenshot of some area on the page.
         */
        'Overlay.screenshotRequested': [Protocol.Overlay.ScreenshotRequestedEvent];
        /**
         * Fired when user cancels the inspect mode.
         */
        'Overlay.inspectModeCanceled': [];
        'Page.domContentEventFired': [Protocol.Page.DomContentEventFiredEvent];
        /**
         * Emitted only when `page.interceptFileChooser` is enabled.
         */
        'Page.fileChooserOpened': [Protocol.Page.FileChooserOpenedEvent];
        /**
         * Fired when frame has been attached to its parent.
         */
        'Page.frameAttached': [Protocol.Page.FrameAttachedEvent];
        /**
         * Fired when frame no longer has a scheduled navigation.
         */
        'Page.frameClearedScheduledNavigation': [Protocol.Page.FrameClearedScheduledNavigationEvent];
        /**
         * Fired when frame has been detached from its parent.
         */
        'Page.frameDetached': [Protocol.Page.FrameDetachedEvent];
        /**
         * Fired once navigation of the frame has completed. Frame is now associated with the new loader.
         */
        'Page.frameNavigated': [Protocol.Page.FrameNavigatedEvent];
        /**
         * Fired when opening document to write to.
         */
        'Page.documentOpened': [Protocol.Page.DocumentOpenedEvent];
        'Page.frameResized': [];
        /**
         * Fired when a renderer-initiated navigation is requested.
         * Navigation may still be cancelled after the event is issued.
         */
        'Page.frameRequestedNavigation': [Protocol.Page.FrameRequestedNavigationEvent];
        /**
         * Fired when frame schedules a potential navigation.
         */
        'Page.frameScheduledNavigation': [Protocol.Page.FrameScheduledNavigationEvent];
        /**
         * Fired when frame has started loading.
         */
        'Page.frameStartedLoading': [Protocol.Page.FrameStartedLoadingEvent];
        /**
         * Fired when frame has stopped loading.
         */
        'Page.frameStoppedLoading': [Protocol.Page.FrameStoppedLoadingEvent];
        /**
         * Fired when page is about to start a download.
         * Deprecated. Use Browser.downloadWillBegin instead.
         */
        'Page.downloadWillBegin': [Protocol.Page.DownloadWillBeginEvent];
        /**
         * Fired when download makes progress. Last call has |done| == true.
         * Deprecated. Use Browser.downloadProgress instead.
         */
        'Page.downloadProgress': [Protocol.Page.DownloadProgressEvent];
        /**
         * Fired when interstitial page was hidden
         */
        'Page.interstitialHidden': [];
        /**
         * Fired when interstitial page was shown
         */
        'Page.interstitialShown': [];
        /**
         * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been
         * closed.
         */
        'Page.javascriptDialogClosed': [Protocol.Page.JavascriptDialogClosedEvent];
        /**
         * Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to
         * open.
         */
        'Page.javascriptDialogOpening': [Protocol.Page.JavascriptDialogOpeningEvent];
        /**
         * Fired for top level page lifecycle events such as navigation, load, paint, etc.
         */
        'Page.lifecycleEvent': [Protocol.Page.LifecycleEventEvent];
        /**
         * Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
         * not assume any ordering with the Page.frameNavigated event. This event is fired only for
         * main-frame history navigation where the document changes (non-same-document navigations),
         * when bfcache navigation fails.
         */
        'Page.backForwardCacheNotUsed': [Protocol.Page.BackForwardCacheNotUsedEvent];
        'Page.loadEventFired': [Protocol.Page.LoadEventFiredEvent];
        /**
         * Fired when same-document navigation happens, e.g. due to history API usage or anchor navigation.
         */
        'Page.navigatedWithinDocument': [Protocol.Page.NavigatedWithinDocumentEvent];
        /**
         * Compressed image data requested by the `startScreencast`.
         */
        'Page.screencastFrame': [Protocol.Page.ScreencastFrameEvent];
        /**
         * Fired when the page with currently enabled screencast was shown or hidden `.
         */
        'Page.screencastVisibilityChanged': [Protocol.Page.ScreencastVisibilityChangedEvent];
        /**
         * Fired when a new window is going to be opened, via window.open(), link click, form submission,
         * etc.
         */
        'Page.windowOpen': [Protocol.Page.WindowOpenEvent];
        /**
         * Issued for every compilation cache generated. Is only available
         * if Page.setGenerateCompilationCache is enabled.
         */
        'Page.compilationCacheProduced': [Protocol.Page.CompilationCacheProducedEvent];
        /**
         * Current values of the metrics.
         */
        'Performance.metrics': [Protocol.Performance.MetricsEvent];
        /**
         * Sent when a performance timeline event is added. See reportPerformanceTimeline method.
         */
        'PerformanceTimeline.timelineEventAdded': [Protocol.PerformanceTimeline.TimelineEventAddedEvent];
        /**
         * There is a certificate error. If overriding certificate errors is enabled, then it should be
         * handled with the `handleCertificateError` command. Note: this event does not fire if the
         * certificate error has been allowed internally. Only one client per target should override
         * certificate errors at the same time.
         */
        'Security.certificateError': [Protocol.Security.CertificateErrorEvent];
        /**
         * The security state of the page changed.
         */
        'Security.visibleSecurityStateChanged': [Protocol.Security.VisibleSecurityStateChangedEvent];
        /**
         * The security state of the page changed. No longer being sent.
         */
        'Security.securityStateChanged': [Protocol.Security.SecurityStateChangedEvent];
        'ServiceWorker.workerErrorReported': [Protocol.ServiceWorker.WorkerErrorReportedEvent];
        'ServiceWorker.workerRegistrationUpdated': [Protocol.ServiceWorker.WorkerRegistrationUpdatedEvent];
        'ServiceWorker.workerVersionUpdated': [Protocol.ServiceWorker.WorkerVersionUpdatedEvent];
        /**
         * A cache's contents have been modified.
         */
        'Storage.cacheStorageContentUpdated': [Protocol.Storage.CacheStorageContentUpdatedEvent];
        /**
         * A cache has been added/deleted.
         */
        'Storage.cacheStorageListUpdated': [Protocol.Storage.CacheStorageListUpdatedEvent];
        /**
         * The origin's IndexedDB object store has been modified.
         */
        'Storage.indexedDBContentUpdated': [Protocol.Storage.IndexedDBContentUpdatedEvent];
        /**
         * The origin's IndexedDB database list has been modified.
         */
        'Storage.indexedDBListUpdated': [Protocol.Storage.IndexedDBListUpdatedEvent];
        /**
         * One of the interest groups was accessed by the associated page.
         */
        'Storage.interestGroupAccessed': [Protocol.Storage.InterestGroupAccessedEvent];
        /**
         * Shared storage was accessed by the associated page.
         * The following parameters are included in all events.
         */
        'Storage.sharedStorageAccessed': [Protocol.Storage.SharedStorageAccessedEvent];
        'Storage.storageBucketCreatedOrUpdated': [Protocol.Storage.StorageBucketCreatedOrUpdatedEvent];
        'Storage.storageBucketDeleted': [Protocol.Storage.StorageBucketDeletedEvent];
        /**
         * TODO(crbug.com/1458532): Add other Attribution Reporting events, e.g.
         * trigger registration.
         */
        'Storage.attributionReportingSourceRegistered': [Protocol.Storage.AttributionReportingSourceRegisteredEvent];
        /**
         * Issued when attached to target because of auto-attach or `attachToTarget` command.
         */
        'Target.attachedToTarget': [Protocol.Target.AttachedToTargetEvent];
        /**
         * Issued when detached from target for any reason (including `detachFromTarget` command). Can be
         * issued multiple times per target if multiple sessions have been attached to it.
         */
        'Target.detachedFromTarget': [Protocol.Target.DetachedFromTargetEvent];
        /**
         * Notifies about a new protocol message received from the session (as reported in
         * `attachedToTarget` event).
         */
        'Target.receivedMessageFromTarget': [Protocol.Target.ReceivedMessageFromTargetEvent];
        /**
         * Issued when a possible inspection target is created.
         */
        'Target.targetCreated': [Protocol.Target.TargetCreatedEvent];
        /**
         * Issued when a target is destroyed.
         */
        'Target.targetDestroyed': [Protocol.Target.TargetDestroyedEvent];
        /**
         * Issued when a target has crashed.
         */
        'Target.targetCrashed': [Protocol.Target.TargetCrashedEvent];
        /**
         * Issued when some information about a target has changed. This only happens between
         * `targetCreated` and `targetDestroyed`.
         */
        'Target.targetInfoChanged': [Protocol.Target.TargetInfoChangedEvent];
        /**
         * Informs that port was successfully bound and got a specified connection id.
         */
        'Tethering.accepted': [Protocol.Tethering.AcceptedEvent];
        'Tracing.bufferUsage': [Protocol.Tracing.BufferUsageEvent];
        /**
         * Contains a bucket of collected trace events. When tracing is stopped collected events will be
         * sent as a sequence of dataCollected events followed by tracingComplete event.
         */
        'Tracing.dataCollected': [Protocol.Tracing.DataCollectedEvent];
        /**
         * Signals that tracing is stopped and there is no trace buffers pending flush, all data were
         * delivered via dataCollected events.
         */
        'Tracing.tracingComplete': [Protocol.Tracing.TracingCompleteEvent];
        /**
         * Issued when the domain is enabled and the request URL matches the
         * specified filter. The request is paused until the client responds
         * with one of continueRequest, failRequest or fulfillRequest.
         * The stage of the request can be determined by presence of responseErrorReason
         * and responseStatusCode -- the request is at the response stage if either
         * of these fields is present and in the request stage otherwise.
         * Redirect responses and subsequent requests are reported similarly to regular
         * responses and requests. Redirect responses may be distinguished by the value
         * of `responseStatusCode` (which is one of 301, 302, 303, 307, 308) along with
         * presence of the `location` header. Requests resulting from a redirect will
         * have `redirectedRequestId` field set.
         */
        'Fetch.requestPaused': [Protocol.Fetch.RequestPausedEvent];
        /**
         * Issued when the domain is enabled with handleAuthRequests set to true.
         * The request is paused until client responds with continueWithAuth.
         */
        'Fetch.authRequired': [Protocol.Fetch.AuthRequiredEvent];
        /**
         * Notifies that a new BaseAudioContext has been created.
         */
        'WebAudio.contextCreated': [Protocol.WebAudio.ContextCreatedEvent];
        /**
         * Notifies that an existing BaseAudioContext will be destroyed.
         */
        'WebAudio.contextWillBeDestroyed': [Protocol.WebAudio.ContextWillBeDestroyedEvent];
        /**
         * Notifies that existing BaseAudioContext has changed some properties (id stays the same)..
         */
        'WebAudio.contextChanged': [Protocol.WebAudio.ContextChangedEvent];
        /**
         * Notifies that the construction of an AudioListener has finished.
         */
        'WebAudio.audioListenerCreated': [Protocol.WebAudio.AudioListenerCreatedEvent];
        /**
         * Notifies that a new AudioListener has been created.
         */
        'WebAudio.audioListenerWillBeDestroyed': [Protocol.WebAudio.AudioListenerWillBeDestroyedEvent];
        /**
         * Notifies that a new AudioNode has been created.
         */
        'WebAudio.audioNodeCreated': [Protocol.WebAudio.AudioNodeCreatedEvent];
        /**
         * Notifies that an existing AudioNode has been destroyed.
         */
        'WebAudio.audioNodeWillBeDestroyed': [Protocol.WebAudio.AudioNodeWillBeDestroyedEvent];
        /**
         * Notifies that a new AudioParam has been created.
         */
        'WebAudio.audioParamCreated': [Protocol.WebAudio.AudioParamCreatedEvent];
        /**
         * Notifies that an existing AudioParam has been destroyed.
         */
        'WebAudio.audioParamWillBeDestroyed': [Protocol.WebAudio.AudioParamWillBeDestroyedEvent];
        /**
         * Notifies that two AudioNodes are connected.
         */
        'WebAudio.nodesConnected': [Protocol.WebAudio.NodesConnectedEvent];
        /**
         * Notifies that AudioNodes are disconnected. The destination can be null, and it means all the outgoing connections from the source are disconnected.
         */
        'WebAudio.nodesDisconnected': [Protocol.WebAudio.NodesDisconnectedEvent];
        /**
         * Notifies that an AudioNode is connected to an AudioParam.
         */
        'WebAudio.nodeParamConnected': [Protocol.WebAudio.NodeParamConnectedEvent];
        /**
         * Notifies that an AudioNode is disconnected to an AudioParam.
         */
        'WebAudio.nodeParamDisconnected': [Protocol.WebAudio.NodeParamDisconnectedEvent];
        /**
         * Triggered when a credential is added to an authenticator.
         */
        'WebAuthn.credentialAdded': [Protocol.WebAuthn.CredentialAddedEvent];
        /**
         * Triggered when a credential is used in a webauthn assertion.
         */
        'WebAuthn.credentialAsserted': [Protocol.WebAuthn.CredentialAssertedEvent];
        /**
         * This can be called multiple times, and can be used to set / override /
         * remove player properties. A null propValue indicates removal.
         */
        'Media.playerPropertiesChanged': [Protocol.Media.PlayerPropertiesChangedEvent];
        /**
         * Send events as a list, allowing them to be batched on the browser for less
         * congestion. If batched, events must ALWAYS be in chronological order.
         */
        'Media.playerEventsAdded': [Protocol.Media.PlayerEventsAddedEvent];
        /**
         * Send a list of any messages that need to be delivered.
         */
        'Media.playerMessagesLogged': [Protocol.Media.PlayerMessagesLoggedEvent];
        /**
         * Send a list of any errors that need to be delivered.
         */
        'Media.playerErrorsRaised': [Protocol.Media.PlayerErrorsRaisedEvent];
        /**
         * Called whenever a player is created, or when a new agent joins and receives
         * a list of active players. If an agent is restored, it will receive the full
         * list of player ids and all events again.
         */
        'Media.playersCreated': [Protocol.Media.PlayersCreatedEvent];
        /**
         * A device request opened a user prompt to select a device. Respond with the
         * selectPrompt or cancelPrompt command.
         */
        'DeviceAccess.deviceRequestPrompted': [Protocol.DeviceAccess.DeviceRequestPromptedEvent];
        /**
         * Upsert. Currently, it is only emitted when a rule set added.
         */
        'Preload.ruleSetUpdated': [Protocol.Preload.RuleSetUpdatedEvent];
        'Preload.ruleSetRemoved': [Protocol.Preload.RuleSetRemovedEvent];
        /**
         * Fired when a prerender attempt is completed.
         */
        'Preload.prerenderAttemptCompleted': [Protocol.Preload.PrerenderAttemptCompletedEvent];
        /**
         * Fired when a preload enabled state is updated.
         */
        'Preload.preloadEnabledStateUpdated': [Protocol.Preload.PreloadEnabledStateUpdatedEvent];
        /**
         * Fired when a prefetch attempt is updated.
         */
        'Preload.prefetchStatusUpdated': [Protocol.Preload.PrefetchStatusUpdatedEvent];
        /**
         * Fired when a prerender attempt is updated.
         */
        'Preload.prerenderStatusUpdated': [Protocol.Preload.PrerenderStatusUpdatedEvent];
        /**
         * Send a list of sources for all preloading attempts in a document.
         */
        'Preload.preloadingAttemptSourcesUpdated': [Protocol.Preload.PreloadingAttemptSourcesUpdatedEvent];
        'FedCm.dialogShown': [Protocol.FedCm.DialogShownEvent];
    }

    interface Commands {
        /**
         * Does nothing.
         */
        'Console.clearMessages': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Disables console domain, prevents further console messages from being reported to the client.
         */
        'Console.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables console domain, sends the messages collected so far to the client by means of the
         * `messageAdded` notification.
         */
        'Console.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Continues execution until specific location is reached.
         */
        'Debugger.continueToLocation': {
            paramsType: [Protocol.Debugger.ContinueToLocationRequest];
            returnType: void;
        };
        /**
         * Disables debugger for given page.
         */
        'Debugger.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables debugger for the given page. Clients should not assume that the debugging has been
         * enabled until the result for this command is received.
         */
        'Debugger.enable': {
            paramsType: [Protocol.Debugger.EnableRequest?];
            returnType: Protocol.Debugger.EnableResponse;
        };
        /**
         * Evaluates expression on a given call frame.
         */
        'Debugger.evaluateOnCallFrame': {
            paramsType: [Protocol.Debugger.EvaluateOnCallFrameRequest];
            returnType: Protocol.Debugger.EvaluateOnCallFrameResponse;
        };
        /**
         * Returns possible locations for breakpoint. scriptId in start and end range locations should be
         * the same.
         */
        'Debugger.getPossibleBreakpoints': {
            paramsType: [Protocol.Debugger.GetPossibleBreakpointsRequest];
            returnType: Protocol.Debugger.GetPossibleBreakpointsResponse;
        };
        /**
         * Returns source for the script with given id.
         */
        'Debugger.getScriptSource': {
            paramsType: [Protocol.Debugger.GetScriptSourceRequest];
            returnType: Protocol.Debugger.GetScriptSourceResponse;
        };
        'Debugger.disassembleWasmModule': {
            paramsType: [Protocol.Debugger.DisassembleWasmModuleRequest];
            returnType: Protocol.Debugger.DisassembleWasmModuleResponse;
        };
        /**
         * Disassemble the next chunk of lines for the module corresponding to the
         * stream. If disassembly is complete, this API will invalidate the streamId
         * and return an empty chunk. Any subsequent calls for the now invalid stream
         * will return errors.
         */
        'Debugger.nextWasmDisassemblyChunk': {
            paramsType: [Protocol.Debugger.NextWasmDisassemblyChunkRequest];
            returnType: Protocol.Debugger.NextWasmDisassemblyChunkResponse;
        };
        /**
         * This command is deprecated. Use getScriptSource instead.
         */
        'Debugger.getWasmBytecode': {
            paramsType: [Protocol.Debugger.GetWasmBytecodeRequest];
            returnType: Protocol.Debugger.GetWasmBytecodeResponse;
        };
        /**
         * Returns stack trace with given `stackTraceId`.
         */
        'Debugger.getStackTrace': {
            paramsType: [Protocol.Debugger.GetStackTraceRequest];
            returnType: Protocol.Debugger.GetStackTraceResponse;
        };
        /**
         * Stops on the next JavaScript statement.
         */
        'Debugger.pause': {
            paramsType: [];
            returnType: void;
        };
        'Debugger.pauseOnAsyncCall': {
            paramsType: [Protocol.Debugger.PauseOnAsyncCallRequest];
            returnType: void;
        };
        /**
         * Removes JavaScript breakpoint.
         */
        'Debugger.removeBreakpoint': {
            paramsType: [Protocol.Debugger.RemoveBreakpointRequest];
            returnType: void;
        };
        /**
         * Restarts particular call frame from the beginning. The old, deprecated
         * behavior of `restartFrame` is to stay paused and allow further CDP commands
         * after a restart was scheduled. This can cause problems with restarting, so
         * we now continue execution immediatly after it has been scheduled until we
         * reach the beginning of the restarted frame.
         * 
         * To stay back-wards compatible, `restartFrame` now expects a `mode`
         * parameter to be present. If the `mode` parameter is missing, `restartFrame`
         * errors out.
         * 
         * The various return values are deprecated and `callFrames` is always empty.
         * Use the call frames from the `Debugger#paused` events instead, that fires
         * once V8 pauses at the beginning of the restarted function.
         */
        'Debugger.restartFrame': {
            paramsType: [Protocol.Debugger.RestartFrameRequest];
            returnType: Protocol.Debugger.RestartFrameResponse;
        };
        /**
         * Resumes JavaScript execution.
         */
        'Debugger.resume': {
            paramsType: [Protocol.Debugger.ResumeRequest?];
            returnType: void;
        };
        /**
         * Searches for given string in script content.
         */
        'Debugger.searchInContent': {
            paramsType: [Protocol.Debugger.SearchInContentRequest];
            returnType: Protocol.Debugger.SearchInContentResponse;
        };
        /**
         * Enables or disables async call stacks tracking.
         */
        'Debugger.setAsyncCallStackDepth': {
            paramsType: [Protocol.Debugger.SetAsyncCallStackDepthRequest];
            returnType: void;
        };
        /**
         * Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in
         * scripts with url matching one of the patterns. VM will try to leave blackboxed script by
         * performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
         */
        'Debugger.setBlackboxPatterns': {
            paramsType: [Protocol.Debugger.SetBlackboxPatternsRequest];
            returnType: void;
        };
        /**
         * Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted
         * scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
         * Positions array contains positions where blackbox state is changed. First interval isn't
         * blackboxed. Array should be sorted.
         */
        'Debugger.setBlackboxedRanges': {
            paramsType: [Protocol.Debugger.SetBlackboxedRangesRequest];
            returnType: void;
        };
        /**
         * Sets JavaScript breakpoint at a given location.
         */
        'Debugger.setBreakpoint': {
            paramsType: [Protocol.Debugger.SetBreakpointRequest];
            returnType: Protocol.Debugger.SetBreakpointResponse;
        };
        /**
         * Sets instrumentation breakpoint.
         */
        'Debugger.setInstrumentationBreakpoint': {
            paramsType: [Protocol.Debugger.SetInstrumentationBreakpointRequest];
            returnType: Protocol.Debugger.SetInstrumentationBreakpointResponse;
        };
        /**
         * Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this
         * command is issued, all existing parsed scripts will have breakpoints resolved and returned in
         * `locations` property. Further matching script parsing will result in subsequent
         * `breakpointResolved` events issued. This logical breakpoint will survive page reloads.
         */
        'Debugger.setBreakpointByUrl': {
            paramsType: [Protocol.Debugger.SetBreakpointByUrlRequest];
            returnType: Protocol.Debugger.SetBreakpointByUrlResponse;
        };
        /**
         * Sets JavaScript breakpoint before each call to the given function.
         * If another function was created from the same source as a given one,
         * calling it will also trigger the breakpoint.
         */
        'Debugger.setBreakpointOnFunctionCall': {
            paramsType: [Protocol.Debugger.SetBreakpointOnFunctionCallRequest];
            returnType: Protocol.Debugger.SetBreakpointOnFunctionCallResponse;
        };
        /**
         * Activates / deactivates all breakpoints on the page.
         */
        'Debugger.setBreakpointsActive': {
            paramsType: [Protocol.Debugger.SetBreakpointsActiveRequest];
            returnType: void;
        };
        /**
         * Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions,
         * or caught exceptions, no exceptions. Initial pause on exceptions state is `none`.
         */
        'Debugger.setPauseOnExceptions': {
            paramsType: [Protocol.Debugger.SetPauseOnExceptionsRequest];
            returnType: void;
        };
        /**
         * Changes return value in top frame. Available only at return break position.
         */
        'Debugger.setReturnValue': {
            paramsType: [Protocol.Debugger.SetReturnValueRequest];
            returnType: void;
        };
        /**
         * Edits JavaScript source live.
         * 
         * In general, functions that are currently on the stack can not be edited with
         * a single exception: If the edited function is the top-most stack frame and
         * that is the only activation of that function on the stack. In this case
         * the live edit will be successful and a `Debugger.restartFrame` for the
         * top-most function is automatically triggered.
         */
        'Debugger.setScriptSource': {
            paramsType: [Protocol.Debugger.SetScriptSourceRequest];
            returnType: Protocol.Debugger.SetScriptSourceResponse;
        };
        /**
         * Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
         */
        'Debugger.setSkipAllPauses': {
            paramsType: [Protocol.Debugger.SetSkipAllPausesRequest];
            returnType: void;
        };
        /**
         * Changes value of variable in a callframe. Object-based scopes are not supported and must be
         * mutated manually.
         */
        'Debugger.setVariableValue': {
            paramsType: [Protocol.Debugger.SetVariableValueRequest];
            returnType: void;
        };
        /**
         * Steps into the function call.
         */
        'Debugger.stepInto': {
            paramsType: [Protocol.Debugger.StepIntoRequest?];
            returnType: void;
        };
        /**
         * Steps out of the function call.
         */
        'Debugger.stepOut': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Steps over the statement.
         */
        'Debugger.stepOver': {
            paramsType: [Protocol.Debugger.StepOverRequest?];
            returnType: void;
        };
        /**
         * Enables console to refer to the node with given id via $x (see Command Line API for more details
         * $x functions).
         */
        'HeapProfiler.addInspectedHeapObject': {
            paramsType: [Protocol.HeapProfiler.AddInspectedHeapObjectRequest];
            returnType: void;
        };
        'HeapProfiler.collectGarbage': {
            paramsType: [];
            returnType: void;
        };
        'HeapProfiler.disable': {
            paramsType: [];
            returnType: void;
        };
        'HeapProfiler.enable': {
            paramsType: [];
            returnType: void;
        };
        'HeapProfiler.getHeapObjectId': {
            paramsType: [Protocol.HeapProfiler.GetHeapObjectIdRequest];
            returnType: Protocol.HeapProfiler.GetHeapObjectIdResponse;
        };
        'HeapProfiler.getObjectByHeapObjectId': {
            paramsType: [Protocol.HeapProfiler.GetObjectByHeapObjectIdRequest];
            returnType: Protocol.HeapProfiler.GetObjectByHeapObjectIdResponse;
        };
        'HeapProfiler.getSamplingProfile': {
            paramsType: [];
            returnType: Protocol.HeapProfiler.GetSamplingProfileResponse;
        };
        'HeapProfiler.startSampling': {
            paramsType: [Protocol.HeapProfiler.StartSamplingRequest?];
            returnType: void;
        };
        'HeapProfiler.startTrackingHeapObjects': {
            paramsType: [Protocol.HeapProfiler.StartTrackingHeapObjectsRequest?];
            returnType: void;
        };
        'HeapProfiler.stopSampling': {
            paramsType: [];
            returnType: Protocol.HeapProfiler.StopSamplingResponse;
        };
        'HeapProfiler.stopTrackingHeapObjects': {
            paramsType: [Protocol.HeapProfiler.StopTrackingHeapObjectsRequest?];
            returnType: void;
        };
        'HeapProfiler.takeHeapSnapshot': {
            paramsType: [Protocol.HeapProfiler.TakeHeapSnapshotRequest?];
            returnType: void;
        };
        'Profiler.disable': {
            paramsType: [];
            returnType: void;
        };
        'Profiler.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Collect coverage data for the current isolate. The coverage data may be incomplete due to
         * garbage collection.
         */
        'Profiler.getBestEffortCoverage': {
            paramsType: [];
            returnType: Protocol.Profiler.GetBestEffortCoverageResponse;
        };
        /**
         * Changes CPU profiler sampling interval. Must be called before CPU profiles recording started.
         */
        'Profiler.setSamplingInterval': {
            paramsType: [Protocol.Profiler.SetSamplingIntervalRequest];
            returnType: void;
        };
        'Profiler.start': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enable precise code coverage. Coverage data for JavaScript executed before enabling precise code
         * coverage may be incomplete. Enabling prevents running optimized code and resets execution
         * counters.
         */
        'Profiler.startPreciseCoverage': {
            paramsType: [Protocol.Profiler.StartPreciseCoverageRequest?];
            returnType: Protocol.Profiler.StartPreciseCoverageResponse;
        };
        'Profiler.stop': {
            paramsType: [];
            returnType: Protocol.Profiler.StopResponse;
        };
        /**
         * Disable precise code coverage. Disabling releases unnecessary execution count records and allows
         * executing optimized code.
         */
        'Profiler.stopPreciseCoverage': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Collect coverage data for the current isolate, and resets execution counters. Precise code
         * coverage needs to have started.
         */
        'Profiler.takePreciseCoverage': {
            paramsType: [];
            returnType: Protocol.Profiler.TakePreciseCoverageResponse;
        };
        /**
         * Add handler to promise with given promise object id.
         */
        'Runtime.awaitPromise': {
            paramsType: [Protocol.Runtime.AwaitPromiseRequest];
            returnType: Protocol.Runtime.AwaitPromiseResponse;
        };
        /**
         * Calls function with given declaration on the given object. Object group of the result is
         * inherited from the target object.
         */
        'Runtime.callFunctionOn': {
            paramsType: [Protocol.Runtime.CallFunctionOnRequest];
            returnType: Protocol.Runtime.CallFunctionOnResponse;
        };
        /**
         * Compiles expression.
         */
        'Runtime.compileScript': {
            paramsType: [Protocol.Runtime.CompileScriptRequest];
            returnType: Protocol.Runtime.CompileScriptResponse;
        };
        /**
         * Disables reporting of execution contexts creation.
         */
        'Runtime.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Discards collected exceptions and console API calls.
         */
        'Runtime.discardConsoleEntries': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables reporting of execution contexts creation by means of `executionContextCreated` event.
         * When the reporting gets enabled the event will be sent immediately for each existing execution
         * context.
         */
        'Runtime.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Evaluates expression on global object.
         */
        'Runtime.evaluate': {
            paramsType: [Protocol.Runtime.EvaluateRequest];
            returnType: Protocol.Runtime.EvaluateResponse;
        };
        /**
         * Returns the isolate id.
         */
        'Runtime.getIsolateId': {
            paramsType: [];
            returnType: Protocol.Runtime.GetIsolateIdResponse;
        };
        /**
         * Returns the JavaScript heap usage.
         * It is the total usage of the corresponding isolate not scoped to a particular Runtime.
         */
        'Runtime.getHeapUsage': {
            paramsType: [];
            returnType: Protocol.Runtime.GetHeapUsageResponse;
        };
        /**
         * Returns properties of a given object. Object group of the result is inherited from the target
         * object.
         */
        'Runtime.getProperties': {
            paramsType: [Protocol.Runtime.GetPropertiesRequest];
            returnType: Protocol.Runtime.GetPropertiesResponse;
        };
        /**
         * Returns all let, const and class variables from global scope.
         */
        'Runtime.globalLexicalScopeNames': {
            paramsType: [Protocol.Runtime.GlobalLexicalScopeNamesRequest?];
            returnType: Protocol.Runtime.GlobalLexicalScopeNamesResponse;
        };
        'Runtime.queryObjects': {
            paramsType: [Protocol.Runtime.QueryObjectsRequest];
            returnType: Protocol.Runtime.QueryObjectsResponse;
        };
        /**
         * Releases remote object with given id.
         */
        'Runtime.releaseObject': {
            paramsType: [Protocol.Runtime.ReleaseObjectRequest];
            returnType: void;
        };
        /**
         * Releases all remote objects that belong to a given group.
         */
        'Runtime.releaseObjectGroup': {
            paramsType: [Protocol.Runtime.ReleaseObjectGroupRequest];
            returnType: void;
        };
        /**
         * Tells inspected instance to run if it was waiting for debugger to attach.
         */
        'Runtime.runIfWaitingForDebugger': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Runs script with given id in a given context.
         */
        'Runtime.runScript': {
            paramsType: [Protocol.Runtime.RunScriptRequest];
            returnType: Protocol.Runtime.RunScriptResponse;
        };
        /**
         * Enables or disables async call stacks tracking.
         */
        'Runtime.setAsyncCallStackDepth': {
            paramsType: [Protocol.Runtime.SetAsyncCallStackDepthRequest];
            returnType: void;
        };
        'Runtime.setCustomObjectFormatterEnabled': {
            paramsType: [Protocol.Runtime.SetCustomObjectFormatterEnabledRequest];
            returnType: void;
        };
        'Runtime.setMaxCallStackSizeToCapture': {
            paramsType: [Protocol.Runtime.SetMaxCallStackSizeToCaptureRequest];
            returnType: void;
        };
        /**
         * Terminate current or next JavaScript execution.
         * Will cancel the termination when the outer-most script execution ends.
         */
        'Runtime.terminateExecution': {
            paramsType: [];
            returnType: void;
        };
        /**
         * If executionContextId is empty, adds binding with the given name on the
         * global objects of all inspected contexts, including those created later,
         * bindings survive reloads.
         * Binding function takes exactly one argument, this argument should be string,
         * in case of any other input, function throws an exception.
         * Each binding function call produces Runtime.bindingCalled notification.
         */
        'Runtime.addBinding': {
            paramsType: [Protocol.Runtime.AddBindingRequest];
            returnType: void;
        };
        /**
         * This method does not remove binding function from global object but
         * unsubscribes current runtime agent from Runtime.bindingCalled notifications.
         */
        'Runtime.removeBinding': {
            paramsType: [Protocol.Runtime.RemoveBindingRequest];
            returnType: void;
        };
        /**
         * This method tries to lookup and populate exception details for a
         * JavaScript Error object.
         * Note that the stackTrace portion of the resulting exceptionDetails will
         * only be populated if the Runtime domain was enabled at the time when the
         * Error was thrown.
         */
        'Runtime.getExceptionDetails': {
            paramsType: [Protocol.Runtime.GetExceptionDetailsRequest];
            returnType: Protocol.Runtime.GetExceptionDetailsResponse;
        };
        /**
         * Returns supported domains.
         */
        'Schema.getDomains': {
            paramsType: [];
            returnType: Protocol.Schema.GetDomainsResponse;
        };
        /**
         * Disables the accessibility domain.
         */
        'Accessibility.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables the accessibility domain which causes `AXNodeId`s to remain consistent between method calls.
         * This turns on accessibility for the page, which can impact performance until accessibility is disabled.
         */
        'Accessibility.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Fetches the accessibility node and partial accessibility tree for this DOM node, if it exists.
         */
        'Accessibility.getPartialAXTree': {
            paramsType: [Protocol.Accessibility.GetPartialAXTreeRequest?];
            returnType: Protocol.Accessibility.GetPartialAXTreeResponse;
        };
        /**
         * Fetches the entire accessibility tree for the root Document
         */
        'Accessibility.getFullAXTree': {
            paramsType: [Protocol.Accessibility.GetFullAXTreeRequest?];
            returnType: Protocol.Accessibility.GetFullAXTreeResponse;
        };
        /**
         * Fetches the root node.
         * Requires `enable()` to have been called previously.
         */
        'Accessibility.getRootAXNode': {
            paramsType: [Protocol.Accessibility.GetRootAXNodeRequest?];
            returnType: Protocol.Accessibility.GetRootAXNodeResponse;
        };
        /**
         * Fetches a node and all ancestors up to and including the root.
         * Requires `enable()` to have been called previously.
         */
        'Accessibility.getAXNodeAndAncestors': {
            paramsType: [Protocol.Accessibility.GetAXNodeAndAncestorsRequest?];
            returnType: Protocol.Accessibility.GetAXNodeAndAncestorsResponse;
        };
        /**
         * Fetches a particular accessibility node by AXNodeId.
         * Requires `enable()` to have been called previously.
         */
        'Accessibility.getChildAXNodes': {
            paramsType: [Protocol.Accessibility.GetChildAXNodesRequest];
            returnType: Protocol.Accessibility.GetChildAXNodesResponse;
        };
        /**
         * Query a DOM node's accessibility subtree for accessible name and role.
         * This command computes the name and role for all nodes in the subtree, including those that are
         * ignored for accessibility, and returns those that mactch the specified name and role. If no DOM
         * node is specified, or the DOM node does not exist, the command returns an error. If neither
         * `accessibleName` or `role` is specified, it returns all the accessibility nodes in the subtree.
         */
        'Accessibility.queryAXTree': {
            paramsType: [Protocol.Accessibility.QueryAXTreeRequest?];
            returnType: Protocol.Accessibility.QueryAXTreeResponse;
        };
        /**
         * Disables animation domain notifications.
         */
        'Animation.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables animation domain notifications.
         */
        'Animation.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Returns the current time of the an animation.
         */
        'Animation.getCurrentTime': {
            paramsType: [Protocol.Animation.GetCurrentTimeRequest];
            returnType: Protocol.Animation.GetCurrentTimeResponse;
        };
        /**
         * Gets the playback rate of the document timeline.
         */
        'Animation.getPlaybackRate': {
            paramsType: [];
            returnType: Protocol.Animation.GetPlaybackRateResponse;
        };
        /**
         * Releases a set of animations to no longer be manipulated.
         */
        'Animation.releaseAnimations': {
            paramsType: [Protocol.Animation.ReleaseAnimationsRequest];
            returnType: void;
        };
        /**
         * Gets the remote object of the Animation.
         */
        'Animation.resolveAnimation': {
            paramsType: [Protocol.Animation.ResolveAnimationRequest];
            returnType: Protocol.Animation.ResolveAnimationResponse;
        };
        /**
         * Seek a set of animations to a particular time within each animation.
         */
        'Animation.seekAnimations': {
            paramsType: [Protocol.Animation.SeekAnimationsRequest];
            returnType: void;
        };
        /**
         * Sets the paused state of a set of animations.
         */
        'Animation.setPaused': {
            paramsType: [Protocol.Animation.SetPausedRequest];
            returnType: void;
        };
        /**
         * Sets the playback rate of the document timeline.
         */
        'Animation.setPlaybackRate': {
            paramsType: [Protocol.Animation.SetPlaybackRateRequest];
            returnType: void;
        };
        /**
         * Sets the timing of an animation node.
         */
        'Animation.setTiming': {
            paramsType: [Protocol.Animation.SetTimingRequest];
            returnType: void;
        };
        /**
         * Returns the response body and size if it were re-encoded with the specified settings. Only
         * applies to images.
         */
        'Audits.getEncodedResponse': {
            paramsType: [Protocol.Audits.GetEncodedResponseRequest];
            returnType: Protocol.Audits.GetEncodedResponseResponse;
        };
        /**
         * Disables issues domain, prevents further issues from being reported to the client.
         */
        'Audits.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables issues domain, sends the issues collected so far to the client by means of the
         * `issueAdded` event.
         */
        'Audits.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Runs the contrast check for the target page. Found issues are reported
         * using Audits.issueAdded event.
         */
        'Audits.checkContrast': {
            paramsType: [Protocol.Audits.CheckContrastRequest?];
            returnType: void;
        };
        /**
         * Runs the form issues check for the target page. Found issues are reported
         * using Audits.issueAdded event.
         */
        'Audits.checkFormsIssues': {
            paramsType: [];
            returnType: Protocol.Audits.CheckFormsIssuesResponse;
        };
        /**
         * Trigger autofill on a form identified by the fieldId.
         * If the field and related form cannot be autofilled, returns an error.
         */
        'Autofill.trigger': {
            paramsType: [Protocol.Autofill.TriggerRequest];
            returnType: void;
        };
        /**
         * Set addresses so that developers can verify their forms implementation.
         */
        'Autofill.setAddresses': {
            paramsType: [Protocol.Autofill.SetAddressesRequest];
            returnType: void;
        };
        /**
         * Enables event updates for the service.
         */
        'BackgroundService.startObserving': {
            paramsType: [Protocol.BackgroundService.StartObservingRequest];
            returnType: void;
        };
        /**
         * Disables event updates for the service.
         */
        'BackgroundService.stopObserving': {
            paramsType: [Protocol.BackgroundService.StopObservingRequest];
            returnType: void;
        };
        /**
         * Set the recording state for the service.
         */
        'BackgroundService.setRecording': {
            paramsType: [Protocol.BackgroundService.SetRecordingRequest];
            returnType: void;
        };
        /**
         * Clears all stored data for the service.
         */
        'BackgroundService.clearEvents': {
            paramsType: [Protocol.BackgroundService.ClearEventsRequest];
            returnType: void;
        };
        /**
         * Set permission settings for given origin.
         */
        'Browser.setPermission': {
            paramsType: [Protocol.Browser.SetPermissionRequest];
            returnType: void;
        };
        /**
         * Grant specific permissions to the given origin and reject all others.
         */
        'Browser.grantPermissions': {
            paramsType: [Protocol.Browser.GrantPermissionsRequest];
            returnType: void;
        };
        /**
         * Reset all permission management for all origins.
         */
        'Browser.resetPermissions': {
            paramsType: [Protocol.Browser.ResetPermissionsRequest?];
            returnType: void;
        };
        /**
         * Set the behavior when downloading a file.
         */
        'Browser.setDownloadBehavior': {
            paramsType: [Protocol.Browser.SetDownloadBehaviorRequest];
            returnType: void;
        };
        /**
         * Cancel a download if in progress
         */
        'Browser.cancelDownload': {
            paramsType: [Protocol.Browser.CancelDownloadRequest];
            returnType: void;
        };
        /**
         * Close browser gracefully.
         */
        'Browser.close': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Crashes browser on the main thread.
         */
        'Browser.crash': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Crashes GPU process.
         */
        'Browser.crashGpuProcess': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Returns version information.
         */
        'Browser.getVersion': {
            paramsType: [];
            returnType: Protocol.Browser.GetVersionResponse;
        };
        /**
         * Returns the command line switches for the browser process if, and only if
         * --enable-automation is on the commandline.
         */
        'Browser.getBrowserCommandLine': {
            paramsType: [];
            returnType: Protocol.Browser.GetBrowserCommandLineResponse;
        };
        /**
         * Get Chrome histograms.
         */
        'Browser.getHistograms': {
            paramsType: [Protocol.Browser.GetHistogramsRequest?];
            returnType: Protocol.Browser.GetHistogramsResponse;
        };
        /**
         * Get a Chrome histogram by name.
         */
        'Browser.getHistogram': {
            paramsType: [Protocol.Browser.GetHistogramRequest];
            returnType: Protocol.Browser.GetHistogramResponse;
        };
        /**
         * Get position and size of the browser window.
         */
        'Browser.getWindowBounds': {
            paramsType: [Protocol.Browser.GetWindowBoundsRequest];
            returnType: Protocol.Browser.GetWindowBoundsResponse;
        };
        /**
         * Get the browser window that contains the devtools target.
         */
        'Browser.getWindowForTarget': {
            paramsType: [Protocol.Browser.GetWindowForTargetRequest?];
            returnType: Protocol.Browser.GetWindowForTargetResponse;
        };
        /**
         * Set position and/or size of the browser window.
         */
        'Browser.setWindowBounds': {
            paramsType: [Protocol.Browser.SetWindowBoundsRequest];
            returnType: void;
        };
        /**
         * Set dock tile details, platform-specific.
         */
        'Browser.setDockTile': {
            paramsType: [Protocol.Browser.SetDockTileRequest?];
            returnType: void;
        };
        /**
         * Invoke custom browser commands used by telemetry.
         */
        'Browser.executeBrowserCommand': {
            paramsType: [Protocol.Browser.ExecuteBrowserCommandRequest];
            returnType: void;
        };
        /**
         * Allows a site to use privacy sandbox features that require enrollment
         * without the site actually being enrolled. Only supported on page targets.
         */
        'Browser.addPrivacySandboxEnrollmentOverride': {
            paramsType: [Protocol.Browser.AddPrivacySandboxEnrollmentOverrideRequest];
            returnType: void;
        };
        /**
         * Inserts a new rule with the given `ruleText` in a stylesheet with given `styleSheetId`, at the
         * position specified by `location`.
         */
        'CSS.addRule': {
            paramsType: [Protocol.CSS.AddRuleRequest];
            returnType: Protocol.CSS.AddRuleResponse;
        };
        /**
         * Returns all class names from specified stylesheet.
         */
        'CSS.collectClassNames': {
            paramsType: [Protocol.CSS.CollectClassNamesRequest];
            returnType: Protocol.CSS.CollectClassNamesResponse;
        };
        /**
         * Creates a new special "via-inspector" stylesheet in the frame with given `frameId`.
         */
        'CSS.createStyleSheet': {
            paramsType: [Protocol.CSS.CreateStyleSheetRequest];
            returnType: Protocol.CSS.CreateStyleSheetResponse;
        };
        /**
         * Disables the CSS agent for the given page.
         */
        'CSS.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been
         * enabled until the result of this command is received.
         */
        'CSS.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Ensures that the given node will have specified pseudo-classes whenever its style is computed by
         * the browser.
         */
        'CSS.forcePseudoState': {
            paramsType: [Protocol.CSS.ForcePseudoStateRequest];
            returnType: void;
        };
        'CSS.getBackgroundColors': {
            paramsType: [Protocol.CSS.GetBackgroundColorsRequest];
            returnType: Protocol.CSS.GetBackgroundColorsResponse;
        };
        /**
         * Returns the computed style for a DOM node identified by `nodeId`.
         */
        'CSS.getComputedStyleForNode': {
            paramsType: [Protocol.CSS.GetComputedStyleForNodeRequest];
            returnType: Protocol.CSS.GetComputedStyleForNodeResponse;
        };
        /**
         * Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using DOM
         * attributes) for a DOM node identified by `nodeId`.
         */
        'CSS.getInlineStylesForNode': {
            paramsType: [Protocol.CSS.GetInlineStylesForNodeRequest];
            returnType: Protocol.CSS.GetInlineStylesForNodeResponse;
        };
        /**
         * Returns requested styles for a DOM node identified by `nodeId`.
         */
        'CSS.getMatchedStylesForNode': {
            paramsType: [Protocol.CSS.GetMatchedStylesForNodeRequest];
            returnType: Protocol.CSS.GetMatchedStylesForNodeResponse;
        };
        /**
         * Returns all media queries parsed by the rendering engine.
         */
        'CSS.getMediaQueries': {
            paramsType: [];
            returnType: Protocol.CSS.GetMediaQueriesResponse;
        };
        /**
         * Requests information about platform fonts which we used to render child TextNodes in the given
         * node.
         */
        'CSS.getPlatformFontsForNode': {
            paramsType: [Protocol.CSS.GetPlatformFontsForNodeRequest];
            returnType: Protocol.CSS.GetPlatformFontsForNodeResponse;
        };
        /**
         * Returns the current textual content for a stylesheet.
         */
        'CSS.getStyleSheetText': {
            paramsType: [Protocol.CSS.GetStyleSheetTextRequest];
            returnType: Protocol.CSS.GetStyleSheetTextResponse;
        };
        /**
         * Returns all layers parsed by the rendering engine for the tree scope of a node.
         * Given a DOM element identified by nodeId, getLayersForNode returns the root
         * layer for the nearest ancestor document or shadow root. The layer root contains
         * the full layer tree for the tree scope and their ordering.
         */
        'CSS.getLayersForNode': {
            paramsType: [Protocol.CSS.GetLayersForNodeRequest];
            returnType: Protocol.CSS.GetLayersForNodeResponse;
        };
        /**
         * Starts tracking the given computed styles for updates. The specified array of properties
         * replaces the one previously specified. Pass empty array to disable tracking.
         * Use takeComputedStyleUpdates to retrieve the list of nodes that had properties modified.
         * The changes to computed style properties are only tracked for nodes pushed to the front-end
         * by the DOM agent. If no changes to the tracked properties occur after the node has been pushed
         * to the front-end, no updates will be issued for the node.
         */
        'CSS.trackComputedStyleUpdates': {
            paramsType: [Protocol.CSS.TrackComputedStyleUpdatesRequest];
            returnType: void;
        };
        /**
         * Polls the next batch of computed style updates.
         */
        'CSS.takeComputedStyleUpdates': {
            paramsType: [];
            returnType: Protocol.CSS.TakeComputedStyleUpdatesResponse;
        };
        /**
         * Find a rule with the given active property for the given node and set the new value for this
         * property
         */
        'CSS.setEffectivePropertyValueForNode': {
            paramsType: [Protocol.CSS.SetEffectivePropertyValueForNodeRequest];
            returnType: void;
        };
        /**
         * Modifies the keyframe rule key text.
         */
        'CSS.setKeyframeKey': {
            paramsType: [Protocol.CSS.SetKeyframeKeyRequest];
            returnType: Protocol.CSS.SetKeyframeKeyResponse;
        };
        /**
         * Modifies the rule selector.
         */
        'CSS.setMediaText': {
            paramsType: [Protocol.CSS.SetMediaTextRequest];
            returnType: Protocol.CSS.SetMediaTextResponse;
        };
        /**
         * Modifies the expression of a container query.
         */
        'CSS.setContainerQueryText': {
            paramsType: [Protocol.CSS.SetContainerQueryTextRequest];
            returnType: Protocol.CSS.SetContainerQueryTextResponse;
        };
        /**
         * Modifies the expression of a supports at-rule.
         */
        'CSS.setSupportsText': {
            paramsType: [Protocol.CSS.SetSupportsTextRequest];
            returnType: Protocol.CSS.SetSupportsTextResponse;
        };
        /**
         * Modifies the expression of a scope at-rule.
         */
        'CSS.setScopeText': {
            paramsType: [Protocol.CSS.SetScopeTextRequest];
            returnType: Protocol.CSS.SetScopeTextResponse;
        };
        /**
         * Modifies the rule selector.
         */
        'CSS.setRuleSelector': {
            paramsType: [Protocol.CSS.SetRuleSelectorRequest];
            returnType: Protocol.CSS.SetRuleSelectorResponse;
        };
        /**
         * Sets the new stylesheet text.
         */
        'CSS.setStyleSheetText': {
            paramsType: [Protocol.CSS.SetStyleSheetTextRequest];
            returnType: Protocol.CSS.SetStyleSheetTextResponse;
        };
        /**
         * Applies specified style edits one after another in the given order.
         */
        'CSS.setStyleTexts': {
            paramsType: [Protocol.CSS.SetStyleTextsRequest];
            returnType: Protocol.CSS.SetStyleTextsResponse;
        };
        /**
         * Enables the selector recording.
         */
        'CSS.startRuleUsageTracking': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Stop tracking rule usage and return the list of rules that were used since last call to
         * `takeCoverageDelta` (or since start of coverage instrumentation).
         */
        'CSS.stopRuleUsageTracking': {
            paramsType: [];
            returnType: Protocol.CSS.StopRuleUsageTrackingResponse;
        };
        /**
         * Obtain list of rules that became used since last call to this method (or since start of coverage
         * instrumentation).
         */
        'CSS.takeCoverageDelta': {
            paramsType: [];
            returnType: Protocol.CSS.TakeCoverageDeltaResponse;
        };
        /**
         * Enables/disables rendering of local CSS fonts (enabled by default).
         */
        'CSS.setLocalFontsEnabled': {
            paramsType: [Protocol.CSS.SetLocalFontsEnabledRequest];
            returnType: void;
        };
        /**
         * Deletes a cache.
         */
        'CacheStorage.deleteCache': {
            paramsType: [Protocol.CacheStorage.DeleteCacheRequest];
            returnType: void;
        };
        /**
         * Deletes a cache entry.
         */
        'CacheStorage.deleteEntry': {
            paramsType: [Protocol.CacheStorage.DeleteEntryRequest];
            returnType: void;
        };
        /**
         * Requests cache names.
         */
        'CacheStorage.requestCacheNames': {
            paramsType: [Protocol.CacheStorage.RequestCacheNamesRequest?];
            returnType: Protocol.CacheStorage.RequestCacheNamesResponse;
        };
        /**
         * Fetches cache entry.
         */
        'CacheStorage.requestCachedResponse': {
            paramsType: [Protocol.CacheStorage.RequestCachedResponseRequest];
            returnType: Protocol.CacheStorage.RequestCachedResponseResponse;
        };
        /**
         * Requests data from cache.
         */
        'CacheStorage.requestEntries': {
            paramsType: [Protocol.CacheStorage.RequestEntriesRequest];
            returnType: Protocol.CacheStorage.RequestEntriesResponse;
        };
        /**
         * Starts observing for sinks that can be used for tab mirroring, and if set,
         * sinks compatible with |presentationUrl| as well. When sinks are found, a
         * |sinksUpdated| event is fired.
         * Also starts observing for issue messages. When an issue is added or removed,
         * an |issueUpdated| event is fired.
         */
        'Cast.enable': {
            paramsType: [Protocol.Cast.EnableRequest?];
            returnType: void;
        };
        /**
         * Stops observing for sinks and issues.
         */
        'Cast.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Sets a sink to be used when the web page requests the browser to choose a
         * sink via Presentation API, Remote Playback API, or Cast SDK.
         */
        'Cast.setSinkToUse': {
            paramsType: [Protocol.Cast.SetSinkToUseRequest];
            returnType: void;
        };
        /**
         * Starts mirroring the desktop to the sink.
         */
        'Cast.startDesktopMirroring': {
            paramsType: [Protocol.Cast.StartDesktopMirroringRequest];
            returnType: void;
        };
        /**
         * Starts mirroring the tab to the sink.
         */
        'Cast.startTabMirroring': {
            paramsType: [Protocol.Cast.StartTabMirroringRequest];
            returnType: void;
        };
        /**
         * Stops the active Cast session on the sink.
         */
        'Cast.stopCasting': {
            paramsType: [Protocol.Cast.StopCastingRequest];
            returnType: void;
        };
        /**
         * Collects class names for the node with given id and all of it's child nodes.
         */
        'DOM.collectClassNamesFromSubtree': {
            paramsType: [Protocol.DOM.CollectClassNamesFromSubtreeRequest];
            returnType: Protocol.DOM.CollectClassNamesFromSubtreeResponse;
        };
        /**
         * Creates a deep copy of the specified node and places it into the target container before the
         * given anchor.
         */
        'DOM.copyTo': {
            paramsType: [Protocol.DOM.CopyToRequest];
            returnType: Protocol.DOM.CopyToResponse;
        };
        /**
         * Describes node given its id, does not require domain to be enabled. Does not start tracking any
         * objects, can be used for automation.
         */
        'DOM.describeNode': {
            paramsType: [Protocol.DOM.DescribeNodeRequest?];
            returnType: Protocol.DOM.DescribeNodeResponse;
        };
        /**
         * Scrolls the specified rect of the given node into view if not already visible.
         * Note: exactly one between nodeId, backendNodeId and objectId should be passed
         * to identify the node.
         */
        'DOM.scrollIntoViewIfNeeded': {
            paramsType: [Protocol.DOM.ScrollIntoViewIfNeededRequest?];
            returnType: void;
        };
        /**
         * Disables DOM agent for the given page.
         */
        'DOM.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Discards search results from the session with the given id. `getSearchResults` should no longer
         * be called for that search.
         */
        'DOM.discardSearchResults': {
            paramsType: [Protocol.DOM.DiscardSearchResultsRequest];
            returnType: void;
        };
        /**
         * Enables DOM agent for the given page.
         */
        'DOM.enable': {
            paramsType: [Protocol.DOM.EnableRequest?];
            returnType: void;
        };
        /**
         * Focuses the given element.
         */
        'DOM.focus': {
            paramsType: [Protocol.DOM.FocusRequest?];
            returnType: void;
        };
        /**
         * Returns attributes for the specified node.
         */
        'DOM.getAttributes': {
            paramsType: [Protocol.DOM.GetAttributesRequest];
            returnType: Protocol.DOM.GetAttributesResponse;
        };
        /**
         * Returns boxes for the given node.
         */
        'DOM.getBoxModel': {
            paramsType: [Protocol.DOM.GetBoxModelRequest?];
            returnType: Protocol.DOM.GetBoxModelResponse;
        };
        /**
         * Returns quads that describe node position on the page. This method
         * might return multiple quads for inline nodes.
         */
        'DOM.getContentQuads': {
            paramsType: [Protocol.DOM.GetContentQuadsRequest?];
            returnType: Protocol.DOM.GetContentQuadsResponse;
        };
        /**
         * Returns the root DOM node (and optionally the subtree) to the caller.
         * Implicitly enables the DOM domain events for the current target.
         */
        'DOM.getDocument': {
            paramsType: [Protocol.DOM.GetDocumentRequest?];
            returnType: Protocol.DOM.GetDocumentResponse;
        };
        /**
         * Returns the root DOM node (and optionally the subtree) to the caller.
         * Deprecated, as it is not designed to work well with the rest of the DOM agent.
         * Use DOMSnapshot.captureSnapshot instead.
         */
        'DOM.getFlattenedDocument': {
            paramsType: [Protocol.DOM.GetFlattenedDocumentRequest?];
            returnType: Protocol.DOM.GetFlattenedDocumentResponse;
        };
        /**
         * Finds nodes with a given computed style in a subtree.
         */
        'DOM.getNodesForSubtreeByStyle': {
            paramsType: [Protocol.DOM.GetNodesForSubtreeByStyleRequest];
            returnType: Protocol.DOM.GetNodesForSubtreeByStyleResponse;
        };
        /**
         * Returns node id at given location. Depending on whether DOM domain is enabled, nodeId is
         * either returned or not.
         */
        'DOM.getNodeForLocation': {
            paramsType: [Protocol.DOM.GetNodeForLocationRequest];
            returnType: Protocol.DOM.GetNodeForLocationResponse;
        };
        /**
         * Returns node's HTML markup.
         */
        'DOM.getOuterHTML': {
            paramsType: [Protocol.DOM.GetOuterHTMLRequest?];
            returnType: Protocol.DOM.GetOuterHTMLResponse;
        };
        /**
         * Returns the id of the nearest ancestor that is a relayout boundary.
         */
        'DOM.getRelayoutBoundary': {
            paramsType: [Protocol.DOM.GetRelayoutBoundaryRequest];
            returnType: Protocol.DOM.GetRelayoutBoundaryResponse;
        };
        /**
         * Returns search results from given `fromIndex` to given `toIndex` from the search with the given
         * identifier.
         */
        'DOM.getSearchResults': {
            paramsType: [Protocol.DOM.GetSearchResultsRequest];
            returnType: Protocol.DOM.GetSearchResultsResponse;
        };
        /**
         * Hides any highlight.
         */
        'DOM.hideHighlight': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Highlights DOM node.
         */
        'DOM.highlightNode': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Highlights given rectangle.
         */
        'DOM.highlightRect': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Marks last undoable state.
         */
        'DOM.markUndoableState': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Moves node into the new container, places it before the given anchor.
         */
        'DOM.moveTo': {
            paramsType: [Protocol.DOM.MoveToRequest];
            returnType: Protocol.DOM.MoveToResponse;
        };
        /**
         * Searches for a given string in the DOM tree. Use `getSearchResults` to access search results or
         * `cancelSearch` to end this search session.
         */
        'DOM.performSearch': {
            paramsType: [Protocol.DOM.PerformSearchRequest];
            returnType: Protocol.DOM.PerformSearchResponse;
        };
        /**
         * Requests that the node is sent to the caller given its path. // FIXME, use XPath
         */
        'DOM.pushNodeByPathToFrontend': {
            paramsType: [Protocol.DOM.PushNodeByPathToFrontendRequest];
            returnType: Protocol.DOM.PushNodeByPathToFrontendResponse;
        };
        /**
         * Requests that a batch of nodes is sent to the caller given their backend node ids.
         */
        'DOM.pushNodesByBackendIdsToFrontend': {
            paramsType: [Protocol.DOM.PushNodesByBackendIdsToFrontendRequest];
            returnType: Protocol.DOM.PushNodesByBackendIdsToFrontendResponse;
        };
        /**
         * Executes `querySelector` on a given node.
         */
        'DOM.querySelector': {
            paramsType: [Protocol.DOM.QuerySelectorRequest];
            returnType: Protocol.DOM.QuerySelectorResponse;
        };
        /**
         * Executes `querySelectorAll` on a given node.
         */
        'DOM.querySelectorAll': {
            paramsType: [Protocol.DOM.QuerySelectorAllRequest];
            returnType: Protocol.DOM.QuerySelectorAllResponse;
        };
        /**
         * Returns NodeIds of current top layer elements.
         * Top layer is rendered closest to the user within a viewport, therefore its elements always
         * appear on top of all other content.
         */
        'DOM.getTopLayerElements': {
            paramsType: [];
            returnType: Protocol.DOM.GetTopLayerElementsResponse;
        };
        /**
         * Re-does the last undone action.
         */
        'DOM.redo': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Removes attribute with given name from an element with given id.
         */
        'DOM.removeAttribute': {
            paramsType: [Protocol.DOM.RemoveAttributeRequest];
            returnType: void;
        };
        /**
         * Removes node with given id.
         */
        'DOM.removeNode': {
            paramsType: [Protocol.DOM.RemoveNodeRequest];
            returnType: void;
        };
        /**
         * Requests that children of the node with given id are returned to the caller in form of
         * `setChildNodes` events where not only immediate children are retrieved, but all children down to
         * the specified depth.
         */
        'DOM.requestChildNodes': {
            paramsType: [Protocol.DOM.RequestChildNodesRequest];
            returnType: void;
        };
        /**
         * Requests that the node is sent to the caller given the JavaScript node object reference. All
         * nodes that form the path from the node to the root are also sent to the client as a series of
         * `setChildNodes` notifications.
         */
        'DOM.requestNode': {
            paramsType: [Protocol.DOM.RequestNodeRequest];
            returnType: Protocol.DOM.RequestNodeResponse;
        };
        /**
         * Resolves the JavaScript node object for a given NodeId or BackendNodeId.
         */
        'DOM.resolveNode': {
            paramsType: [Protocol.DOM.ResolveNodeRequest?];
            returnType: Protocol.DOM.ResolveNodeResponse;
        };
        /**
         * Sets attribute for an element with given id.
         */
        'DOM.setAttributeValue': {
            paramsType: [Protocol.DOM.SetAttributeValueRequest];
            returnType: void;
        };
        /**
         * Sets attributes on element with given id. This method is useful when user edits some existing
         * attribute value and types in several attribute name/value pairs.
         */
        'DOM.setAttributesAsText': {
            paramsType: [Protocol.DOM.SetAttributesAsTextRequest];
            returnType: void;
        };
        /**
         * Sets files for the given file input element.
         */
        'DOM.setFileInputFiles': {
            paramsType: [Protocol.DOM.SetFileInputFilesRequest];
            returnType: void;
        };
        /**
         * Sets if stack traces should be captured for Nodes. See `Node.getNodeStackTraces`. Default is disabled.
         */
        'DOM.setNodeStackTracesEnabled': {
            paramsType: [Protocol.DOM.SetNodeStackTracesEnabledRequest];
            returnType: void;
        };
        /**
         * Gets stack traces associated with a Node. As of now, only provides stack trace for Node creation.
         */
        'DOM.getNodeStackTraces': {
            paramsType: [Protocol.DOM.GetNodeStackTracesRequest];
            returnType: Protocol.DOM.GetNodeStackTracesResponse;
        };
        /**
         * Returns file information for the given
         * File wrapper.
         */
        'DOM.getFileInfo': {
            paramsType: [Protocol.DOM.GetFileInfoRequest];
            returnType: Protocol.DOM.GetFileInfoResponse;
        };
        /**
         * Enables console to refer to the node with given id via $x (see Command Line API for more details
         * $x functions).
         */
        'DOM.setInspectedNode': {
            paramsType: [Protocol.DOM.SetInspectedNodeRequest];
            returnType: void;
        };
        /**
         * Sets node name for a node with given id.
         */
        'DOM.setNodeName': {
            paramsType: [Protocol.DOM.SetNodeNameRequest];
            returnType: Protocol.DOM.SetNodeNameResponse;
        };
        /**
         * Sets node value for a node with given id.
         */
        'DOM.setNodeValue': {
            paramsType: [Protocol.DOM.SetNodeValueRequest];
            returnType: void;
        };
        /**
         * Sets node HTML markup, returns new node id.
         */
        'DOM.setOuterHTML': {
            paramsType: [Protocol.DOM.SetOuterHTMLRequest];
            returnType: void;
        };
        /**
         * Undoes the last performed action.
         */
        'DOM.undo': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Returns iframe node that owns iframe with the given domain.
         */
        'DOM.getFrameOwner': {
            paramsType: [Protocol.DOM.GetFrameOwnerRequest];
            returnType: Protocol.DOM.GetFrameOwnerResponse;
        };
        /**
         * Returns the query container of the given node based on container query
         * conditions: containerName, physical, and logical axes. If no axes are
         * provided, the style container is returned, which is the direct parent or the
         * closest element with a matching container-name.
         */
        'DOM.getContainerForNode': {
            paramsType: [Protocol.DOM.GetContainerForNodeRequest];
            returnType: Protocol.DOM.GetContainerForNodeResponse;
        };
        /**
         * Returns the descendants of a container query container that have
         * container queries against this container.
         */
        'DOM.getQueryingDescendantsForContainer': {
            paramsType: [Protocol.DOM.GetQueryingDescendantsForContainerRequest];
            returnType: Protocol.DOM.GetQueryingDescendantsForContainerResponse;
        };
        /**
         * Returns event listeners of the given object.
         */
        'DOMDebugger.getEventListeners': {
            paramsType: [Protocol.DOMDebugger.GetEventListenersRequest];
            returnType: Protocol.DOMDebugger.GetEventListenersResponse;
        };
        /**
         * Removes DOM breakpoint that was set using `setDOMBreakpoint`.
         */
        'DOMDebugger.removeDOMBreakpoint': {
            paramsType: [Protocol.DOMDebugger.RemoveDOMBreakpointRequest];
            returnType: void;
        };
        /**
         * Removes breakpoint on particular DOM event.
         */
        'DOMDebugger.removeEventListenerBreakpoint': {
            paramsType: [Protocol.DOMDebugger.RemoveEventListenerBreakpointRequest];
            returnType: void;
        };
        /**
         * Removes breakpoint on particular native event.
         */
        'DOMDebugger.removeInstrumentationBreakpoint': {
            paramsType: [Protocol.DOMDebugger.RemoveInstrumentationBreakpointRequest];
            returnType: void;
        };
        /**
         * Removes breakpoint from XMLHttpRequest.
         */
        'DOMDebugger.removeXHRBreakpoint': {
            paramsType: [Protocol.DOMDebugger.RemoveXHRBreakpointRequest];
            returnType: void;
        };
        /**
         * Sets breakpoint on particular CSP violations.
         */
        'DOMDebugger.setBreakOnCSPViolation': {
            paramsType: [Protocol.DOMDebugger.SetBreakOnCSPViolationRequest];
            returnType: void;
        };
        /**
         * Sets breakpoint on particular operation with DOM.
         */
        'DOMDebugger.setDOMBreakpoint': {
            paramsType: [Protocol.DOMDebugger.SetDOMBreakpointRequest];
            returnType: void;
        };
        /**
         * Sets breakpoint on particular DOM event.
         */
        'DOMDebugger.setEventListenerBreakpoint': {
            paramsType: [Protocol.DOMDebugger.SetEventListenerBreakpointRequest];
            returnType: void;
        };
        /**
         * Sets breakpoint on particular native event.
         */
        'DOMDebugger.setInstrumentationBreakpoint': {
            paramsType: [Protocol.DOMDebugger.SetInstrumentationBreakpointRequest];
            returnType: void;
        };
        /**
         * Sets breakpoint on XMLHttpRequest.
         */
        'DOMDebugger.setXHRBreakpoint': {
            paramsType: [Protocol.DOMDebugger.SetXHRBreakpointRequest];
            returnType: void;
        };
        /**
         * Sets breakpoint on particular native event.
         */
        'EventBreakpoints.setInstrumentationBreakpoint': {
            paramsType: [Protocol.EventBreakpoints.SetInstrumentationBreakpointRequest];
            returnType: void;
        };
        /**
         * Removes breakpoint on particular native event.
         */
        'EventBreakpoints.removeInstrumentationBreakpoint': {
            paramsType: [Protocol.EventBreakpoints.RemoveInstrumentationBreakpointRequest];
            returnType: void;
        };
        /**
         * Disables DOM snapshot agent for the given page.
         */
        'DOMSnapshot.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables DOM snapshot agent for the given page.
         */
        'DOMSnapshot.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Returns a document snapshot, including the full DOM tree of the root node (including iframes,
         * template contents, and imported documents) in a flattened array, as well as layout and
         * white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is
         * flattened.
         */
        'DOMSnapshot.getSnapshot': {
            paramsType: [Protocol.DOMSnapshot.GetSnapshotRequest];
            returnType: Protocol.DOMSnapshot.GetSnapshotResponse;
        };
        /**
         * Returns a document snapshot, including the full DOM tree of the root node (including iframes,
         * template contents, and imported documents) in a flattened array, as well as layout and
         * white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is
         * flattened.
         */
        'DOMSnapshot.captureSnapshot': {
            paramsType: [Protocol.DOMSnapshot.CaptureSnapshotRequest];
            returnType: Protocol.DOMSnapshot.CaptureSnapshotResponse;
        };
        'DOMStorage.clear': {
            paramsType: [Protocol.DOMStorage.ClearRequest];
            returnType: void;
        };
        /**
         * Disables storage tracking, prevents storage events from being sent to the client.
         */
        'DOMStorage.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables storage tracking, storage events will now be delivered to the client.
         */
        'DOMStorage.enable': {
            paramsType: [];
            returnType: void;
        };
        'DOMStorage.getDOMStorageItems': {
            paramsType: [Protocol.DOMStorage.GetDOMStorageItemsRequest];
            returnType: Protocol.DOMStorage.GetDOMStorageItemsResponse;
        };
        'DOMStorage.removeDOMStorageItem': {
            paramsType: [Protocol.DOMStorage.RemoveDOMStorageItemRequest];
            returnType: void;
        };
        'DOMStorage.setDOMStorageItem': {
            paramsType: [Protocol.DOMStorage.SetDOMStorageItemRequest];
            returnType: void;
        };
        /**
         * Disables database tracking, prevents database events from being sent to the client.
         */
        'Database.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables database tracking, database events will now be delivered to the client.
         */
        'Database.enable': {
            paramsType: [];
            returnType: void;
        };
        'Database.executeSQL': {
            paramsType: [Protocol.Database.ExecuteSQLRequest];
            returnType: Protocol.Database.ExecuteSQLResponse;
        };
        'Database.getDatabaseTableNames': {
            paramsType: [Protocol.Database.GetDatabaseTableNamesRequest];
            returnType: Protocol.Database.GetDatabaseTableNamesResponse;
        };
        /**
         * Clears the overridden Device Orientation.
         */
        'DeviceOrientation.clearDeviceOrientationOverride': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Overrides the Device Orientation.
         */
        'DeviceOrientation.setDeviceOrientationOverride': {
            paramsType: [Protocol.DeviceOrientation.SetDeviceOrientationOverrideRequest];
            returnType: void;
        };
        /**
         * Tells whether emulation is supported.
         */
        'Emulation.canEmulate': {
            paramsType: [];
            returnType: Protocol.Emulation.CanEmulateResponse;
        };
        /**
         * Clears the overridden device metrics.
         */
        'Emulation.clearDeviceMetricsOverride': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Clears the overridden Geolocation Position and Error.
         */
        'Emulation.clearGeolocationOverride': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Requests that page scale factor is reset to initial values.
         */
        'Emulation.resetPageScaleFactor': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables or disables simulating a focused and active page.
         */
        'Emulation.setFocusEmulationEnabled': {
            paramsType: [Protocol.Emulation.SetFocusEmulationEnabledRequest];
            returnType: void;
        };
        /**
         * Automatically render all web contents using a dark theme.
         */
        'Emulation.setAutoDarkModeOverride': {
            paramsType: [Protocol.Emulation.SetAutoDarkModeOverrideRequest?];
            returnType: void;
        };
        /**
         * Enables CPU throttling to emulate slow CPUs.
         */
        'Emulation.setCPUThrottlingRate': {
            paramsType: [Protocol.Emulation.SetCPUThrottlingRateRequest];
            returnType: void;
        };
        /**
         * Sets or clears an override of the default background color of the frame. This override is used
         * if the content does not specify one.
         */
        'Emulation.setDefaultBackgroundColorOverride': {
            paramsType: [Protocol.Emulation.SetDefaultBackgroundColorOverrideRequest?];
            returnType: void;
        };
        /**
         * Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
         * window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
         * query results).
         */
        'Emulation.setDeviceMetricsOverride': {
            paramsType: [Protocol.Emulation.SetDeviceMetricsOverrideRequest];
            returnType: void;
        };
        'Emulation.setScrollbarsHidden': {
            paramsType: [Protocol.Emulation.SetScrollbarsHiddenRequest];
            returnType: void;
        };
        'Emulation.setDocumentCookieDisabled': {
            paramsType: [Protocol.Emulation.SetDocumentCookieDisabledRequest];
            returnType: void;
        };
        'Emulation.setEmitTouchEventsForMouse': {
            paramsType: [Protocol.Emulation.SetEmitTouchEventsForMouseRequest];
            returnType: void;
        };
        /**
         * Emulates the given media type or media feature for CSS media queries.
         */
        'Emulation.setEmulatedMedia': {
            paramsType: [Protocol.Emulation.SetEmulatedMediaRequest?];
            returnType: void;
        };
        /**
         * Emulates the given vision deficiency.
         */
        'Emulation.setEmulatedVisionDeficiency': {
            paramsType: [Protocol.Emulation.SetEmulatedVisionDeficiencyRequest];
            returnType: void;
        };
        /**
         * Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
         * unavailable.
         */
        'Emulation.setGeolocationOverride': {
            paramsType: [Protocol.Emulation.SetGeolocationOverrideRequest?];
            returnType: void;
        };
        /**
         * Overrides the Idle state.
         */
        'Emulation.setIdleOverride': {
            paramsType: [Protocol.Emulation.SetIdleOverrideRequest];
            returnType: void;
        };
        /**
         * Clears Idle state overrides.
         */
        'Emulation.clearIdleOverride': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Overrides value returned by the javascript navigator object.
         */
        'Emulation.setNavigatorOverrides': {
            paramsType: [Protocol.Emulation.SetNavigatorOverridesRequest];
            returnType: void;
        };
        /**
         * Sets a specified page scale factor.
         */
        'Emulation.setPageScaleFactor': {
            paramsType: [Protocol.Emulation.SetPageScaleFactorRequest];
            returnType: void;
        };
        /**
         * Switches script execution in the page.
         */
        'Emulation.setScriptExecutionDisabled': {
            paramsType: [Protocol.Emulation.SetScriptExecutionDisabledRequest];
            returnType: void;
        };
        /**
         * Enables touch on platforms which do not support them.
         */
        'Emulation.setTouchEmulationEnabled': {
            paramsType: [Protocol.Emulation.SetTouchEmulationEnabledRequest];
            returnType: void;
        };
        /**
         * Turns on virtual time for all frames (replacing real-time with a synthetic time source) and sets
         * the current virtual time policy.  Note this supersedes any previous time budget.
         */
        'Emulation.setVirtualTimePolicy': {
            paramsType: [Protocol.Emulation.SetVirtualTimePolicyRequest];
            returnType: Protocol.Emulation.SetVirtualTimePolicyResponse;
        };
        /**
         * Overrides default host system locale with the specified one.
         */
        'Emulation.setLocaleOverride': {
            paramsType: [Protocol.Emulation.SetLocaleOverrideRequest?];
            returnType: void;
        };
        /**
         * Overrides default host system timezone with the specified one.
         */
        'Emulation.setTimezoneOverride': {
            paramsType: [Protocol.Emulation.SetTimezoneOverrideRequest];
            returnType: void;
        };
        /**
         * Resizes the frame/viewport of the page. Note that this does not affect the frame's container
         * (e.g. browser window). Can be used to produce screenshots of the specified size. Not supported
         * on Android.
         */
        'Emulation.setVisibleSize': {
            paramsType: [Protocol.Emulation.SetVisibleSizeRequest];
            returnType: void;
        };
        'Emulation.setDisabledImageTypes': {
            paramsType: [Protocol.Emulation.SetDisabledImageTypesRequest];
            returnType: void;
        };
        'Emulation.setHardwareConcurrencyOverride': {
            paramsType: [Protocol.Emulation.SetHardwareConcurrencyOverrideRequest];
            returnType: void;
        };
        /**
         * Allows overriding user agent with the given string.
         */
        'Emulation.setUserAgentOverride': {
            paramsType: [Protocol.Emulation.SetUserAgentOverrideRequest];
            returnType: void;
        };
        /**
         * Allows overriding the automation flag.
         */
        'Emulation.setAutomationOverride': {
            paramsType: [Protocol.Emulation.SetAutomationOverrideRequest];
            returnType: void;
        };
        /**
         * Sends a BeginFrame to the target and returns when the frame was completed. Optionally captures a
         * screenshot from the resulting frame. Requires that the target was created with enabled
         * BeginFrameControl. Designed for use with --run-all-compositor-stages-before-draw, see also
         * https://goo.gle/chrome-headless-rendering for more background.
         */
        'HeadlessExperimental.beginFrame': {
            paramsType: [Protocol.HeadlessExperimental.BeginFrameRequest?];
            returnType: Protocol.HeadlessExperimental.BeginFrameResponse;
        };
        /**
         * Disables headless events for the target.
         */
        'HeadlessExperimental.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables headless events for the target.
         */
        'HeadlessExperimental.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Close the stream, discard any temporary backing storage.
         */
        'IO.close': {
            paramsType: [Protocol.IO.CloseRequest];
            returnType: void;
        };
        /**
         * Read a chunk of the stream
         */
        'IO.read': {
            paramsType: [Protocol.IO.ReadRequest];
            returnType: Protocol.IO.ReadResponse;
        };
        /**
         * Return UUID of Blob object specified by a remote object id.
         */
        'IO.resolveBlob': {
            paramsType: [Protocol.IO.ResolveBlobRequest];
            returnType: Protocol.IO.ResolveBlobResponse;
        };
        /**
         * Clears all entries from an object store.
         */
        'IndexedDB.clearObjectStore': {
            paramsType: [Protocol.IndexedDB.ClearObjectStoreRequest];
            returnType: void;
        };
        /**
         * Deletes a database.
         */
        'IndexedDB.deleteDatabase': {
            paramsType: [Protocol.IndexedDB.DeleteDatabaseRequest];
            returnType: void;
        };
        /**
         * Delete a range of entries from an object store
         */
        'IndexedDB.deleteObjectStoreEntries': {
            paramsType: [Protocol.IndexedDB.DeleteObjectStoreEntriesRequest];
            returnType: void;
        };
        /**
         * Disables events from backend.
         */
        'IndexedDB.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables events from backend.
         */
        'IndexedDB.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Requests data from object store or index.
         */
        'IndexedDB.requestData': {
            paramsType: [Protocol.IndexedDB.RequestDataRequest];
            returnType: Protocol.IndexedDB.RequestDataResponse;
        };
        /**
         * Gets metadata of an object store.
         */
        'IndexedDB.getMetadata': {
            paramsType: [Protocol.IndexedDB.GetMetadataRequest];
            returnType: Protocol.IndexedDB.GetMetadataResponse;
        };
        /**
         * Requests database with given name in given frame.
         */
        'IndexedDB.requestDatabase': {
            paramsType: [Protocol.IndexedDB.RequestDatabaseRequest];
            returnType: Protocol.IndexedDB.RequestDatabaseResponse;
        };
        /**
         * Requests database names for given security origin.
         */
        'IndexedDB.requestDatabaseNames': {
            paramsType: [Protocol.IndexedDB.RequestDatabaseNamesRequest?];
            returnType: Protocol.IndexedDB.RequestDatabaseNamesResponse;
        };
        /**
         * Dispatches a drag event into the page.
         */
        'Input.dispatchDragEvent': {
            paramsType: [Protocol.Input.DispatchDragEventRequest];
            returnType: void;
        };
        /**
         * Dispatches a key event to the page.
         */
        'Input.dispatchKeyEvent': {
            paramsType: [Protocol.Input.DispatchKeyEventRequest];
            returnType: void;
        };
        /**
         * This method emulates inserting text that doesn't come from a key press,
         * for example an emoji keyboard or an IME.
         */
        'Input.insertText': {
            paramsType: [Protocol.Input.InsertTextRequest];
            returnType: void;
        };
        /**
         * This method sets the current candidate text for ime.
         * Use imeCommitComposition to commit the final text.
         * Use imeSetComposition with empty string as text to cancel composition.
         */
        'Input.imeSetComposition': {
            paramsType: [Protocol.Input.ImeSetCompositionRequest];
            returnType: void;
        };
        /**
         * Dispatches a mouse event to the page.
         */
        'Input.dispatchMouseEvent': {
            paramsType: [Protocol.Input.DispatchMouseEventRequest];
            returnType: void;
        };
        /**
         * Dispatches a touch event to the page.
         */
        'Input.dispatchTouchEvent': {
            paramsType: [Protocol.Input.DispatchTouchEventRequest];
            returnType: void;
        };
        /**
         * Cancels any active dragging in the page.
         */
        'Input.cancelDragging': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Emulates touch event from the mouse event parameters.
         */
        'Input.emulateTouchFromMouseEvent': {
            paramsType: [Protocol.Input.EmulateTouchFromMouseEventRequest];
            returnType: void;
        };
        /**
         * Ignores input events (useful while auditing page).
         */
        'Input.setIgnoreInputEvents': {
            paramsType: [Protocol.Input.SetIgnoreInputEventsRequest];
            returnType: void;
        };
        /**
         * Prevents default drag and drop behavior and instead emits `Input.dragIntercepted` events.
         * Drag and drop behavior can be directly controlled via `Input.dispatchDragEvent`.
         */
        'Input.setInterceptDrags': {
            paramsType: [Protocol.Input.SetInterceptDragsRequest];
            returnType: void;
        };
        /**
         * Synthesizes a pinch gesture over a time period by issuing appropriate touch events.
         */
        'Input.synthesizePinchGesture': {
            paramsType: [Protocol.Input.SynthesizePinchGestureRequest];
            returnType: void;
        };
        /**
         * Synthesizes a scroll gesture over a time period by issuing appropriate touch events.
         */
        'Input.synthesizeScrollGesture': {
            paramsType: [Protocol.Input.SynthesizeScrollGestureRequest];
            returnType: void;
        };
        /**
         * Synthesizes a tap gesture over a time period by issuing appropriate touch events.
         */
        'Input.synthesizeTapGesture': {
            paramsType: [Protocol.Input.SynthesizeTapGestureRequest];
            returnType: void;
        };
        /**
         * Disables inspector domain notifications.
         */
        'Inspector.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables inspector domain notifications.
         */
        'Inspector.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Provides the reasons why the given layer was composited.
         */
        'LayerTree.compositingReasons': {
            paramsType: [Protocol.LayerTree.CompositingReasonsRequest];
            returnType: Protocol.LayerTree.CompositingReasonsResponse;
        };
        /**
         * Disables compositing tree inspection.
         */
        'LayerTree.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables compositing tree inspection.
         */
        'LayerTree.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Returns the snapshot identifier.
         */
        'LayerTree.loadSnapshot': {
            paramsType: [Protocol.LayerTree.LoadSnapshotRequest];
            returnType: Protocol.LayerTree.LoadSnapshotResponse;
        };
        /**
         * Returns the layer snapshot identifier.
         */
        'LayerTree.makeSnapshot': {
            paramsType: [Protocol.LayerTree.MakeSnapshotRequest];
            returnType: Protocol.LayerTree.MakeSnapshotResponse;
        };
        'LayerTree.profileSnapshot': {
            paramsType: [Protocol.LayerTree.ProfileSnapshotRequest];
            returnType: Protocol.LayerTree.ProfileSnapshotResponse;
        };
        /**
         * Releases layer snapshot captured by the back-end.
         */
        'LayerTree.releaseSnapshot': {
            paramsType: [Protocol.LayerTree.ReleaseSnapshotRequest];
            returnType: void;
        };
        /**
         * Replays the layer snapshot and returns the resulting bitmap.
         */
        'LayerTree.replaySnapshot': {
            paramsType: [Protocol.LayerTree.ReplaySnapshotRequest];
            returnType: Protocol.LayerTree.ReplaySnapshotResponse;
        };
        /**
         * Replays the layer snapshot and returns canvas log.
         */
        'LayerTree.snapshotCommandLog': {
            paramsType: [Protocol.LayerTree.SnapshotCommandLogRequest];
            returnType: Protocol.LayerTree.SnapshotCommandLogResponse;
        };
        /**
         * Clears the log.
         */
        'Log.clear': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Disables log domain, prevents further log entries from being reported to the client.
         */
        'Log.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables log domain, sends the entries collected so far to the client by means of the
         * `entryAdded` notification.
         */
        'Log.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * start violation reporting.
         */
        'Log.startViolationsReport': {
            paramsType: [Protocol.Log.StartViolationsReportRequest];
            returnType: void;
        };
        /**
         * Stop violation reporting.
         */
        'Log.stopViolationsReport': {
            paramsType: [];
            returnType: void;
        };
        'Memory.getDOMCounters': {
            paramsType: [];
            returnType: Protocol.Memory.GetDOMCountersResponse;
        };
        'Memory.prepareForLeakDetection': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Simulate OomIntervention by purging V8 memory.
         */
        'Memory.forciblyPurgeJavaScriptMemory': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enable/disable suppressing memory pressure notifications in all processes.
         */
        'Memory.setPressureNotificationsSuppressed': {
            paramsType: [Protocol.Memory.SetPressureNotificationsSuppressedRequest];
            returnType: void;
        };
        /**
         * Simulate a memory pressure notification in all processes.
         */
        'Memory.simulatePressureNotification': {
            paramsType: [Protocol.Memory.SimulatePressureNotificationRequest];
            returnType: void;
        };
        /**
         * Start collecting native memory profile.
         */
        'Memory.startSampling': {
            paramsType: [Protocol.Memory.StartSamplingRequest?];
            returnType: void;
        };
        /**
         * Stop collecting native memory profile.
         */
        'Memory.stopSampling': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Retrieve native memory allocations profile
         * collected since renderer process startup.
         */
        'Memory.getAllTimeSamplingProfile': {
            paramsType: [];
            returnType: Protocol.Memory.GetAllTimeSamplingProfileResponse;
        };
        /**
         * Retrieve native memory allocations profile
         * collected since browser process startup.
         */
        'Memory.getBrowserSamplingProfile': {
            paramsType: [];
            returnType: Protocol.Memory.GetBrowserSamplingProfileResponse;
        };
        /**
         * Retrieve native memory allocations profile collected since last
         * `startSampling` call.
         */
        'Memory.getSamplingProfile': {
            paramsType: [];
            returnType: Protocol.Memory.GetSamplingProfileResponse;
        };
        /**
         * Sets a list of content encodings that will be accepted. Empty list means no encoding is accepted.
         */
        'Network.setAcceptedEncodings': {
            paramsType: [Protocol.Network.SetAcceptedEncodingsRequest];
            returnType: void;
        };
        /**
         * Clears accepted encodings set by setAcceptedEncodings
         */
        'Network.clearAcceptedEncodingsOverride': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Tells whether clearing browser cache is supported.
         */
        'Network.canClearBrowserCache': {
            paramsType: [];
            returnType: Protocol.Network.CanClearBrowserCacheResponse;
        };
        /**
         * Tells whether clearing browser cookies is supported.
         */
        'Network.canClearBrowserCookies': {
            paramsType: [];
            returnType: Protocol.Network.CanClearBrowserCookiesResponse;
        };
        /**
         * Tells whether emulation of network conditions is supported.
         */
        'Network.canEmulateNetworkConditions': {
            paramsType: [];
            returnType: Protocol.Network.CanEmulateNetworkConditionsResponse;
        };
        /**
         * Clears browser cache.
         */
        'Network.clearBrowserCache': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Clears browser cookies.
         */
        'Network.clearBrowserCookies': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Response to Network.requestIntercepted which either modifies the request to continue with any
         * modifications, or blocks it, or completes it with the provided response bytes. If a network
         * fetch occurs as a result which encounters a redirect an additional Network.requestIntercepted
         * event will be sent with the same InterceptionId.
         * Deprecated, use Fetch.continueRequest, Fetch.fulfillRequest and Fetch.failRequest instead.
         */
        'Network.continueInterceptedRequest': {
            paramsType: [Protocol.Network.ContinueInterceptedRequestRequest];
            returnType: void;
        };
        /**
         * Deletes browser cookies with matching name and url or domain/path pair.
         */
        'Network.deleteCookies': {
            paramsType: [Protocol.Network.DeleteCookiesRequest];
            returnType: void;
        };
        /**
         * Disables network tracking, prevents network events from being sent to the client.
         */
        'Network.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Activates emulation of network conditions.
         */
        'Network.emulateNetworkConditions': {
            paramsType: [Protocol.Network.EmulateNetworkConditionsRequest];
            returnType: void;
        };
        /**
         * Enables network tracking, network events will now be delivered to the client.
         */
        'Network.enable': {
            paramsType: [Protocol.Network.EnableRequest?];
            returnType: void;
        };
        /**
         * Returns all browser cookies. Depending on the backend support, will return detailed cookie
         * information in the `cookies` field.
         * Deprecated. Use Storage.getCookies instead.
         */
        'Network.getAllCookies': {
            paramsType: [];
            returnType: Protocol.Network.GetAllCookiesResponse;
        };
        /**
         * Returns the DER-encoded certificate.
         */
        'Network.getCertificate': {
            paramsType: [Protocol.Network.GetCertificateRequest];
            returnType: Protocol.Network.GetCertificateResponse;
        };
        /**
         * Returns all browser cookies for the current URL. Depending on the backend support, will return
         * detailed cookie information in the `cookies` field.
         */
        'Network.getCookies': {
            paramsType: [Protocol.Network.GetCookiesRequest?];
            returnType: Protocol.Network.GetCookiesResponse;
        };
        /**
         * Returns content served for the given request.
         */
        'Network.getResponseBody': {
            paramsType: [Protocol.Network.GetResponseBodyRequest];
            returnType: Protocol.Network.GetResponseBodyResponse;
        };
        /**
         * Returns post data sent with the request. Returns an error when no data was sent with the request.
         */
        'Network.getRequestPostData': {
            paramsType: [Protocol.Network.GetRequestPostDataRequest];
            returnType: Protocol.Network.GetRequestPostDataResponse;
        };
        /**
         * Returns content served for the given currently intercepted request.
         */
        'Network.getResponseBodyForInterception': {
            paramsType: [Protocol.Network.GetResponseBodyForInterceptionRequest];
            returnType: Protocol.Network.GetResponseBodyForInterceptionResponse;
        };
        /**
         * Returns a handle to the stream representing the response body. Note that after this command,
         * the intercepted request can't be continued as is -- you either need to cancel it or to provide
         * the response body. The stream only supports sequential read, IO.read will fail if the position
         * is specified.
         */
        'Network.takeResponseBodyForInterceptionAsStream': {
            paramsType: [Protocol.Network.TakeResponseBodyForInterceptionAsStreamRequest];
            returnType: Protocol.Network.TakeResponseBodyForInterceptionAsStreamResponse;
        };
        /**
         * This method sends a new XMLHttpRequest which is identical to the original one. The following
         * parameters should be identical: method, url, async, request body, extra headers, withCredentials
         * attribute, user, password.
         */
        'Network.replayXHR': {
            paramsType: [Protocol.Network.ReplayXHRRequest];
            returnType: void;
        };
        /**
         * Searches for given string in response content.
         */
        'Network.searchInResponseBody': {
            paramsType: [Protocol.Network.SearchInResponseBodyRequest];
            returnType: Protocol.Network.SearchInResponseBodyResponse;
        };
        /**
         * Blocks URLs from loading.
         */
        'Network.setBlockedURLs': {
            paramsType: [Protocol.Network.SetBlockedURLsRequest];
            returnType: void;
        };
        /**
         * Toggles ignoring of service worker for each request.
         */
        'Network.setBypassServiceWorker': {
            paramsType: [Protocol.Network.SetBypassServiceWorkerRequest];
            returnType: void;
        };
        /**
         * Toggles ignoring cache for each request. If `true`, cache will not be used.
         */
        'Network.setCacheDisabled': {
            paramsType: [Protocol.Network.SetCacheDisabledRequest];
            returnType: void;
        };
        /**
         * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
         */
        'Network.setCookie': {
            paramsType: [Protocol.Network.SetCookieRequest];
            returnType: Protocol.Network.SetCookieResponse;
        };
        /**
         * Sets given cookies.
         */
        'Network.setCookies': {
            paramsType: [Protocol.Network.SetCookiesRequest];
            returnType: void;
        };
        /**
         * Specifies whether to always send extra HTTP headers with the requests from this page.
         */
        'Network.setExtraHTTPHeaders': {
            paramsType: [Protocol.Network.SetExtraHTTPHeadersRequest];
            returnType: void;
        };
        /**
         * Specifies whether to attach a page script stack id in requests
         */
        'Network.setAttachDebugStack': {
            paramsType: [Protocol.Network.SetAttachDebugStackRequest];
            returnType: void;
        };
        /**
         * Sets the requests to intercept that match the provided patterns and optionally resource types.
         * Deprecated, please use Fetch.enable instead.
         */
        'Network.setRequestInterception': {
            paramsType: [Protocol.Network.SetRequestInterceptionRequest];
            returnType: void;
        };
        /**
         * Allows overriding user agent with the given string.
         */
        'Network.setUserAgentOverride': {
            paramsType: [Protocol.Network.SetUserAgentOverrideRequest];
            returnType: void;
        };
        /**
         * Returns information about the COEP/COOP isolation status.
         */
        'Network.getSecurityIsolationStatus': {
            paramsType: [Protocol.Network.GetSecurityIsolationStatusRequest?];
            returnType: Protocol.Network.GetSecurityIsolationStatusResponse;
        };
        /**
         * Enables tracking for the Reporting API, events generated by the Reporting API will now be delivered to the client.
         * Enabling triggers 'reportingApiReportAdded' for all existing reports.
         */
        'Network.enableReportingApi': {
            paramsType: [Protocol.Network.EnableReportingApiRequest];
            returnType: void;
        };
        /**
         * Fetches the resource and returns the content.
         */
        'Network.loadNetworkResource': {
            paramsType: [Protocol.Network.LoadNetworkResourceRequest];
            returnType: Protocol.Network.LoadNetworkResourceResponse;
        };
        /**
         * Disables domain notifications.
         */
        'Overlay.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables domain notifications.
         */
        'Overlay.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * For testing.
         */
        'Overlay.getHighlightObjectForTest': {
            paramsType: [Protocol.Overlay.GetHighlightObjectForTestRequest];
            returnType: Protocol.Overlay.GetHighlightObjectForTestResponse;
        };
        /**
         * For Persistent Grid testing.
         */
        'Overlay.getGridHighlightObjectsForTest': {
            paramsType: [Protocol.Overlay.GetGridHighlightObjectsForTestRequest];
            returnType: Protocol.Overlay.GetGridHighlightObjectsForTestResponse;
        };
        /**
         * For Source Order Viewer testing.
         */
        'Overlay.getSourceOrderHighlightObjectForTest': {
            paramsType: [Protocol.Overlay.GetSourceOrderHighlightObjectForTestRequest];
            returnType: Protocol.Overlay.GetSourceOrderHighlightObjectForTestResponse;
        };
        /**
         * Hides any highlight.
         */
        'Overlay.hideHighlight': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Highlights owner element of the frame with given id.
         * Deprecated: Doesn't work reliablity and cannot be fixed due to process
         * separatation (the owner node might be in a different process). Determine
         * the owner node in the client and use highlightNode.
         */
        'Overlay.highlightFrame': {
            paramsType: [Protocol.Overlay.HighlightFrameRequest];
            returnType: void;
        };
        /**
         * Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or
         * objectId must be specified.
         */
        'Overlay.highlightNode': {
            paramsType: [Protocol.Overlay.HighlightNodeRequest];
            returnType: void;
        };
        /**
         * Highlights given quad. Coordinates are absolute with respect to the main frame viewport.
         */
        'Overlay.highlightQuad': {
            paramsType: [Protocol.Overlay.HighlightQuadRequest];
            returnType: void;
        };
        /**
         * Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.
         */
        'Overlay.highlightRect': {
            paramsType: [Protocol.Overlay.HighlightRectRequest];
            returnType: void;
        };
        /**
         * Highlights the source order of the children of the DOM node with given id or with the given
         * JavaScript object wrapper. Either nodeId or objectId must be specified.
         */
        'Overlay.highlightSourceOrder': {
            paramsType: [Protocol.Overlay.HighlightSourceOrderRequest];
            returnType: void;
        };
        /**
         * Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted.
         * Backend then generates 'inspectNodeRequested' event upon element selection.
         */
        'Overlay.setInspectMode': {
            paramsType: [Protocol.Overlay.SetInspectModeRequest];
            returnType: void;
        };
        /**
         * Highlights owner element of all frames detected to be ads.
         */
        'Overlay.setShowAdHighlights': {
            paramsType: [Protocol.Overlay.SetShowAdHighlightsRequest];
            returnType: void;
        };
        'Overlay.setPausedInDebuggerMessage': {
            paramsType: [Protocol.Overlay.SetPausedInDebuggerMessageRequest?];
            returnType: void;
        };
        /**
         * Requests that backend shows debug borders on layers
         */
        'Overlay.setShowDebugBorders': {
            paramsType: [Protocol.Overlay.SetShowDebugBordersRequest];
            returnType: void;
        };
        /**
         * Requests that backend shows the FPS counter
         */
        'Overlay.setShowFPSCounter': {
            paramsType: [Protocol.Overlay.SetShowFPSCounterRequest];
            returnType: void;
        };
        /**
         * Highlight multiple elements with the CSS Grid overlay.
         */
        'Overlay.setShowGridOverlays': {
            paramsType: [Protocol.Overlay.SetShowGridOverlaysRequest];
            returnType: void;
        };
        'Overlay.setShowFlexOverlays': {
            paramsType: [Protocol.Overlay.SetShowFlexOverlaysRequest];
            returnType: void;
        };
        'Overlay.setShowScrollSnapOverlays': {
            paramsType: [Protocol.Overlay.SetShowScrollSnapOverlaysRequest];
            returnType: void;
        };
        'Overlay.setShowContainerQueryOverlays': {
            paramsType: [Protocol.Overlay.SetShowContainerQueryOverlaysRequest];
            returnType: void;
        };
        /**
         * Requests that backend shows paint rectangles
         */
        'Overlay.setShowPaintRects': {
            paramsType: [Protocol.Overlay.SetShowPaintRectsRequest];
            returnType: void;
        };
        /**
         * Requests that backend shows layout shift regions
         */
        'Overlay.setShowLayoutShiftRegions': {
            paramsType: [Protocol.Overlay.SetShowLayoutShiftRegionsRequest];
            returnType: void;
        };
        /**
         * Requests that backend shows scroll bottleneck rects
         */
        'Overlay.setShowScrollBottleneckRects': {
            paramsType: [Protocol.Overlay.SetShowScrollBottleneckRectsRequest];
            returnType: void;
        };
        /**
         * Deprecated, no longer has any effect.
         */
        'Overlay.setShowHitTestBorders': {
            paramsType: [Protocol.Overlay.SetShowHitTestBordersRequest];
            returnType: void;
        };
        /**
         * Request that backend shows an overlay with web vital metrics.
         */
        'Overlay.setShowWebVitals': {
            paramsType: [Protocol.Overlay.SetShowWebVitalsRequest];
            returnType: void;
        };
        /**
         * Paints viewport size upon main frame resize.
         */
        'Overlay.setShowViewportSizeOnResize': {
            paramsType: [Protocol.Overlay.SetShowViewportSizeOnResizeRequest];
            returnType: void;
        };
        /**
         * Add a dual screen device hinge
         */
        'Overlay.setShowHinge': {
            paramsType: [Protocol.Overlay.SetShowHingeRequest?];
            returnType: void;
        };
        /**
         * Show elements in isolation mode with overlays.
         */
        'Overlay.setShowIsolatedElements': {
            paramsType: [Protocol.Overlay.SetShowIsolatedElementsRequest];
            returnType: void;
        };
        /**
         * Deprecated, please use addScriptToEvaluateOnNewDocument instead.
         */
        'Page.addScriptToEvaluateOnLoad': {
            paramsType: [Protocol.Page.AddScriptToEvaluateOnLoadRequest];
            returnType: Protocol.Page.AddScriptToEvaluateOnLoadResponse;
        };
        /**
         * Evaluates given script in every frame upon creation (before loading frame's scripts).
         */
        'Page.addScriptToEvaluateOnNewDocument': {
            paramsType: [Protocol.Page.AddScriptToEvaluateOnNewDocumentRequest];
            returnType: Protocol.Page.AddScriptToEvaluateOnNewDocumentResponse;
        };
        /**
         * Brings page to front (activates tab).
         */
        'Page.bringToFront': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Capture page screenshot.
         */
        'Page.captureScreenshot': {
            paramsType: [Protocol.Page.CaptureScreenshotRequest?];
            returnType: Protocol.Page.CaptureScreenshotResponse;
        };
        /**
         * Returns a snapshot of the page as a string. For MHTML format, the serialization includes
         * iframes, shadow DOM, external resources, and element-inline styles.
         */
        'Page.captureSnapshot': {
            paramsType: [Protocol.Page.CaptureSnapshotRequest?];
            returnType: Protocol.Page.CaptureSnapshotResponse;
        };
        /**
         * Clears the overridden device metrics.
         */
        'Page.clearDeviceMetricsOverride': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Clears the overridden Device Orientation.
         */
        'Page.clearDeviceOrientationOverride': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Clears the overridden Geolocation Position and Error.
         */
        'Page.clearGeolocationOverride': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Creates an isolated world for the given frame.
         */
        'Page.createIsolatedWorld': {
            paramsType: [Protocol.Page.CreateIsolatedWorldRequest];
            returnType: Protocol.Page.CreateIsolatedWorldResponse;
        };
        /**
         * Deletes browser cookie with given name, domain and path.
         */
        'Page.deleteCookie': {
            paramsType: [Protocol.Page.DeleteCookieRequest];
            returnType: void;
        };
        /**
         * Disables page domain notifications.
         */
        'Page.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables page domain notifications.
         */
        'Page.enable': {
            paramsType: [];
            returnType: void;
        };
        'Page.getAppManifest': {
            paramsType: [];
            returnType: Protocol.Page.GetAppManifestResponse;
        };
        'Page.getInstallabilityErrors': {
            paramsType: [];
            returnType: Protocol.Page.GetInstallabilityErrorsResponse;
        };
        /**
         * Deprecated because it's not guaranteed that the returned icon is in fact the one used for PWA installation.
         */
        'Page.getManifestIcons': {
            paramsType: [];
            returnType: Protocol.Page.GetManifestIconsResponse;
        };
        /**
         * Returns the unique (PWA) app id.
         * Only returns values if the feature flag 'WebAppEnableManifestId' is enabled
         */
        'Page.getAppId': {
            paramsType: [];
            returnType: Protocol.Page.GetAppIdResponse;
        };
        'Page.getAdScriptId': {
            paramsType: [Protocol.Page.GetAdScriptIdRequest];
            returnType: Protocol.Page.GetAdScriptIdResponse;
        };
        /**
         * Returns all browser cookies for the page and all of its subframes. Depending
         * on the backend support, will return detailed cookie information in the
         * `cookies` field.
         */
        'Page.getCookies': {
            paramsType: [];
            returnType: Protocol.Page.GetCookiesResponse;
        };
        /**
         * Returns present frame tree structure.
         */
        'Page.getFrameTree': {
            paramsType: [];
            returnType: Protocol.Page.GetFrameTreeResponse;
        };
        /**
         * Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
         */
        'Page.getLayoutMetrics': {
            paramsType: [];
            returnType: Protocol.Page.GetLayoutMetricsResponse;
        };
        /**
         * Returns navigation history for the current page.
         */
        'Page.getNavigationHistory': {
            paramsType: [];
            returnType: Protocol.Page.GetNavigationHistoryResponse;
        };
        /**
         * Resets navigation history for the current page.
         */
        'Page.resetNavigationHistory': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Returns content of the given resource.
         */
        'Page.getResourceContent': {
            paramsType: [Protocol.Page.GetResourceContentRequest];
            returnType: Protocol.Page.GetResourceContentResponse;
        };
        /**
         * Returns present frame / resource tree structure.
         */
        'Page.getResourceTree': {
            paramsType: [];
            returnType: Protocol.Page.GetResourceTreeResponse;
        };
        /**
         * Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).
         */
        'Page.handleJavaScriptDialog': {
            paramsType: [Protocol.Page.HandleJavaScriptDialogRequest];
            returnType: void;
        };
        /**
         * Navigates current page to the given URL.
         */
        'Page.navigate': {
            paramsType: [Protocol.Page.NavigateRequest];
            returnType: Protocol.Page.NavigateResponse;
        };
        /**
         * Navigates current page to the given history entry.
         */
        'Page.navigateToHistoryEntry': {
            paramsType: [Protocol.Page.NavigateToHistoryEntryRequest];
            returnType: void;
        };
        /**
         * Print page as PDF.
         */
        'Page.printToPDF': {
            paramsType: [Protocol.Page.PrintToPDFRequest?];
            returnType: Protocol.Page.PrintToPDFResponse;
        };
        /**
         * Reloads given page optionally ignoring the cache.
         */
        'Page.reload': {
            paramsType: [Protocol.Page.ReloadRequest?];
            returnType: void;
        };
        /**
         * Deprecated, please use removeScriptToEvaluateOnNewDocument instead.
         */
        'Page.removeScriptToEvaluateOnLoad': {
            paramsType: [Protocol.Page.RemoveScriptToEvaluateOnLoadRequest];
            returnType: void;
        };
        /**
         * Removes given script from the list.
         */
        'Page.removeScriptToEvaluateOnNewDocument': {
            paramsType: [Protocol.Page.RemoveScriptToEvaluateOnNewDocumentRequest];
            returnType: void;
        };
        /**
         * Acknowledges that a screencast frame has been received by the frontend.
         */
        'Page.screencastFrameAck': {
            paramsType: [Protocol.Page.ScreencastFrameAckRequest];
            returnType: void;
        };
        /**
         * Searches for given string in resource content.
         */
        'Page.searchInResource': {
            paramsType: [Protocol.Page.SearchInResourceRequest];
            returnType: Protocol.Page.SearchInResourceResponse;
        };
        /**
         * Enable Chrome's experimental ad filter on all sites.
         */
        'Page.setAdBlockingEnabled': {
            paramsType: [Protocol.Page.SetAdBlockingEnabledRequest];
            returnType: void;
        };
        /**
         * Enable page Content Security Policy by-passing.
         */
        'Page.setBypassCSP': {
            paramsType: [Protocol.Page.SetBypassCSPRequest];
            returnType: void;
        };
        /**
         * Get Permissions Policy state on given frame.
         */
        'Page.getPermissionsPolicyState': {
            paramsType: [Protocol.Page.GetPermissionsPolicyStateRequest];
            returnType: Protocol.Page.GetPermissionsPolicyStateResponse;
        };
        /**
         * Get Origin Trials on given frame.
         */
        'Page.getOriginTrials': {
            paramsType: [Protocol.Page.GetOriginTrialsRequest];
            returnType: Protocol.Page.GetOriginTrialsResponse;
        };
        /**
         * Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
         * window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
         * query results).
         */
        'Page.setDeviceMetricsOverride': {
            paramsType: [Protocol.Page.SetDeviceMetricsOverrideRequest];
            returnType: void;
        };
        /**
         * Overrides the Device Orientation.
         */
        'Page.setDeviceOrientationOverride': {
            paramsType: [Protocol.Page.SetDeviceOrientationOverrideRequest];
            returnType: void;
        };
        /**
         * Set generic font families.
         */
        'Page.setFontFamilies': {
            paramsType: [Protocol.Page.SetFontFamiliesRequest];
            returnType: void;
        };
        /**
         * Set default font sizes.
         */
        'Page.setFontSizes': {
            paramsType: [Protocol.Page.SetFontSizesRequest];
            returnType: void;
        };
        /**
         * Sets given markup as the document's HTML.
         */
        'Page.setDocumentContent': {
            paramsType: [Protocol.Page.SetDocumentContentRequest];
            returnType: void;
        };
        /**
         * Set the behavior when downloading a file.
         */
        'Page.setDownloadBehavior': {
            paramsType: [Protocol.Page.SetDownloadBehaviorRequest];
            returnType: void;
        };
        /**
         * Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
         * unavailable.
         */
        'Page.setGeolocationOverride': {
            paramsType: [Protocol.Page.SetGeolocationOverrideRequest?];
            returnType: void;
        };
        /**
         * Controls whether page will emit lifecycle events.
         */
        'Page.setLifecycleEventsEnabled': {
            paramsType: [Protocol.Page.SetLifecycleEventsEnabledRequest];
            returnType: void;
        };
        /**
         * Toggles mouse event-based touch event emulation.
         */
        'Page.setTouchEmulationEnabled': {
            paramsType: [Protocol.Page.SetTouchEmulationEnabledRequest];
            returnType: void;
        };
        /**
         * Starts sending each frame using the `screencastFrame` event.
         */
        'Page.startScreencast': {
            paramsType: [Protocol.Page.StartScreencastRequest?];
            returnType: void;
        };
        /**
         * Force the page stop all navigations and pending resource fetches.
         */
        'Page.stopLoading': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Crashes renderer on the IO thread, generates minidumps.
         */
        'Page.crash': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Tries to close page, running its beforeunload hooks, if any.
         */
        'Page.close': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Tries to update the web lifecycle state of the page.
         * It will transition the page to the given state according to:
         * https://github.com/WICG/web-lifecycle/
         */
        'Page.setWebLifecycleState': {
            paramsType: [Protocol.Page.SetWebLifecycleStateRequest];
            returnType: void;
        };
        /**
         * Stops sending each frame in the `screencastFrame`.
         */
        'Page.stopScreencast': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Requests backend to produce compilation cache for the specified scripts.
         * `scripts` are appeneded to the list of scripts for which the cache
         * would be produced. The list may be reset during page navigation.
         * When script with a matching URL is encountered, the cache is optionally
         * produced upon backend discretion, based on internal heuristics.
         * See also: `Page.compilationCacheProduced`.
         */
        'Page.produceCompilationCache': {
            paramsType: [Protocol.Page.ProduceCompilationCacheRequest];
            returnType: void;
        };
        /**
         * Seeds compilation cache for given url. Compilation cache does not survive
         * cross-process navigation.
         */
        'Page.addCompilationCache': {
            paramsType: [Protocol.Page.AddCompilationCacheRequest];
            returnType: void;
        };
        /**
         * Clears seeded compilation cache.
         */
        'Page.clearCompilationCache': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Sets the Secure Payment Confirmation transaction mode.
         * https://w3c.github.io/secure-payment-confirmation/#sctn-automation-set-spc-transaction-mode
         */
        'Page.setSPCTransactionMode': {
            paramsType: [Protocol.Page.SetSPCTransactionModeRequest];
            returnType: void;
        };
        /**
         * Extensions for Custom Handlers API:
         * https://html.spec.whatwg.org/multipage/system-state.html#rph-automation
         */
        'Page.setRPHRegistrationMode': {
            paramsType: [Protocol.Page.SetRPHRegistrationModeRequest];
            returnType: void;
        };
        /**
         * Generates a report for testing.
         */
        'Page.generateTestReport': {
            paramsType: [Protocol.Page.GenerateTestReportRequest];
            returnType: void;
        };
        /**
         * Pauses page execution. Can be resumed using generic Runtime.runIfWaitingForDebugger.
         */
        'Page.waitForDebugger': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Intercept file chooser requests and transfer control to protocol clients.
         * When file chooser interception is enabled, native file chooser dialog is not shown.
         * Instead, a protocol event `Page.fileChooserOpened` is emitted.
         */
        'Page.setInterceptFileChooserDialog': {
            paramsType: [Protocol.Page.SetInterceptFileChooserDialogRequest];
            returnType: void;
        };
        /**
         * Enable/disable prerendering manually.
         * 
         * This command is a short-term solution for https://crbug.com/1440085.
         * See https://docs.google.com/document/d/12HVmFxYj5Jc-eJr5OmWsa2bqTJsbgGLKI6ZIyx0_wpA
         * for more details.
         * 
         * TODO(https://crbug.com/1440085): Remove this once Puppeteer supports tab targets.
         */
        'Page.setPrerenderingAllowed': {
            paramsType: [Protocol.Page.SetPrerenderingAllowedRequest];
            returnType: void;
        };
        /**
         * Disable collecting and reporting metrics.
         */
        'Performance.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enable collecting and reporting metrics.
         */
        'Performance.enable': {
            paramsType: [Protocol.Performance.EnableRequest?];
            returnType: void;
        };
        /**
         * Sets time domain to use for collecting and reporting duration metrics.
         * Note that this must be called before enabling metrics collection. Calling
         * this method while metrics collection is enabled returns an error.
         */
        'Performance.setTimeDomain': {
            paramsType: [Protocol.Performance.SetTimeDomainRequest];
            returnType: void;
        };
        /**
         * Retrieve current values of run-time metrics.
         */
        'Performance.getMetrics': {
            paramsType: [];
            returnType: Protocol.Performance.GetMetricsResponse;
        };
        /**
         * Previously buffered events would be reported before method returns.
         * See also: timelineEventAdded
         */
        'PerformanceTimeline.enable': {
            paramsType: [Protocol.PerformanceTimeline.EnableRequest];
            returnType: void;
        };
        /**
         * Disables tracking security state changes.
         */
        'Security.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables tracking security state changes.
         */
        'Security.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enable/disable whether all certificate errors should be ignored.
         */
        'Security.setIgnoreCertificateErrors': {
            paramsType: [Protocol.Security.SetIgnoreCertificateErrorsRequest];
            returnType: void;
        };
        /**
         * Handles a certificate error that fired a certificateError event.
         */
        'Security.handleCertificateError': {
            paramsType: [Protocol.Security.HandleCertificateErrorRequest];
            returnType: void;
        };
        /**
         * Enable/disable overriding certificate errors. If enabled, all certificate error events need to
         * be handled by the DevTools client and should be answered with `handleCertificateError` commands.
         */
        'Security.setOverrideCertificateErrors': {
            paramsType: [Protocol.Security.SetOverrideCertificateErrorsRequest];
            returnType: void;
        };
        'ServiceWorker.deliverPushMessage': {
            paramsType: [Protocol.ServiceWorker.DeliverPushMessageRequest];
            returnType: void;
        };
        'ServiceWorker.disable': {
            paramsType: [];
            returnType: void;
        };
        'ServiceWorker.dispatchSyncEvent': {
            paramsType: [Protocol.ServiceWorker.DispatchSyncEventRequest];
            returnType: void;
        };
        'ServiceWorker.dispatchPeriodicSyncEvent': {
            paramsType: [Protocol.ServiceWorker.DispatchPeriodicSyncEventRequest];
            returnType: void;
        };
        'ServiceWorker.enable': {
            paramsType: [];
            returnType: void;
        };
        'ServiceWorker.inspectWorker': {
            paramsType: [Protocol.ServiceWorker.InspectWorkerRequest];
            returnType: void;
        };
        'ServiceWorker.setForceUpdateOnPageLoad': {
            paramsType: [Protocol.ServiceWorker.SetForceUpdateOnPageLoadRequest];
            returnType: void;
        };
        'ServiceWorker.skipWaiting': {
            paramsType: [Protocol.ServiceWorker.SkipWaitingRequest];
            returnType: void;
        };
        'ServiceWorker.startWorker': {
            paramsType: [Protocol.ServiceWorker.StartWorkerRequest];
            returnType: void;
        };
        'ServiceWorker.stopAllWorkers': {
            paramsType: [];
            returnType: void;
        };
        'ServiceWorker.stopWorker': {
            paramsType: [Protocol.ServiceWorker.StopWorkerRequest];
            returnType: void;
        };
        'ServiceWorker.unregister': {
            paramsType: [Protocol.ServiceWorker.UnregisterRequest];
            returnType: void;
        };
        'ServiceWorker.updateRegistration': {
            paramsType: [Protocol.ServiceWorker.UpdateRegistrationRequest];
            returnType: void;
        };
        /**
         * Returns a storage key given a frame id.
         */
        'Storage.getStorageKeyForFrame': {
            paramsType: [Protocol.Storage.GetStorageKeyForFrameRequest];
            returnType: Protocol.Storage.GetStorageKeyForFrameResponse;
        };
        /**
         * Clears storage for origin.
         */
        'Storage.clearDataForOrigin': {
            paramsType: [Protocol.Storage.ClearDataForOriginRequest];
            returnType: void;
        };
        /**
         * Clears storage for storage key.
         */
        'Storage.clearDataForStorageKey': {
            paramsType: [Protocol.Storage.ClearDataForStorageKeyRequest];
            returnType: void;
        };
        /**
         * Returns all browser cookies.
         */
        'Storage.getCookies': {
            paramsType: [Protocol.Storage.GetCookiesRequest?];
            returnType: Protocol.Storage.GetCookiesResponse;
        };
        /**
         * Sets given cookies.
         */
        'Storage.setCookies': {
            paramsType: [Protocol.Storage.SetCookiesRequest];
            returnType: void;
        };
        /**
         * Clears cookies.
         */
        'Storage.clearCookies': {
            paramsType: [Protocol.Storage.ClearCookiesRequest?];
            returnType: void;
        };
        /**
         * Returns usage and quota in bytes.
         */
        'Storage.getUsageAndQuota': {
            paramsType: [Protocol.Storage.GetUsageAndQuotaRequest];
            returnType: Protocol.Storage.GetUsageAndQuotaResponse;
        };
        /**
         * Override quota for the specified origin
         */
        'Storage.overrideQuotaForOrigin': {
            paramsType: [Protocol.Storage.OverrideQuotaForOriginRequest];
            returnType: void;
        };
        /**
         * Registers origin to be notified when an update occurs to its cache storage list.
         */
        'Storage.trackCacheStorageForOrigin': {
            paramsType: [Protocol.Storage.TrackCacheStorageForOriginRequest];
            returnType: void;
        };
        /**
         * Registers storage key to be notified when an update occurs to its cache storage list.
         */
        'Storage.trackCacheStorageForStorageKey': {
            paramsType: [Protocol.Storage.TrackCacheStorageForStorageKeyRequest];
            returnType: void;
        };
        /**
         * Registers origin to be notified when an update occurs to its IndexedDB.
         */
        'Storage.trackIndexedDBForOrigin': {
            paramsType: [Protocol.Storage.TrackIndexedDBForOriginRequest];
            returnType: void;
        };
        /**
         * Registers storage key to be notified when an update occurs to its IndexedDB.
         */
        'Storage.trackIndexedDBForStorageKey': {
            paramsType: [Protocol.Storage.TrackIndexedDBForStorageKeyRequest];
            returnType: void;
        };
        /**
         * Unregisters origin from receiving notifications for cache storage.
         */
        'Storage.untrackCacheStorageForOrigin': {
            paramsType: [Protocol.Storage.UntrackCacheStorageForOriginRequest];
            returnType: void;
        };
        /**
         * Unregisters storage key from receiving notifications for cache storage.
         */
        'Storage.untrackCacheStorageForStorageKey': {
            paramsType: [Protocol.Storage.UntrackCacheStorageForStorageKeyRequest];
            returnType: void;
        };
        /**
         * Unregisters origin from receiving notifications for IndexedDB.
         */
        'Storage.untrackIndexedDBForOrigin': {
            paramsType: [Protocol.Storage.UntrackIndexedDBForOriginRequest];
            returnType: void;
        };
        /**
         * Unregisters storage key from receiving notifications for IndexedDB.
         */
        'Storage.untrackIndexedDBForStorageKey': {
            paramsType: [Protocol.Storage.UntrackIndexedDBForStorageKeyRequest];
            returnType: void;
        };
        /**
         * Returns the number of stored Trust Tokens per issuer for the
         * current browsing context.
         */
        'Storage.getTrustTokens': {
            paramsType: [];
            returnType: Protocol.Storage.GetTrustTokensResponse;
        };
        /**
         * Removes all Trust Tokens issued by the provided issuerOrigin.
         * Leaves other stored data, including the issuer's Redemption Records, intact.
         */
        'Storage.clearTrustTokens': {
            paramsType: [Protocol.Storage.ClearTrustTokensRequest];
            returnType: Protocol.Storage.ClearTrustTokensResponse;
        };
        /**
         * Gets details for a named interest group.
         */
        'Storage.getInterestGroupDetails': {
            paramsType: [Protocol.Storage.GetInterestGroupDetailsRequest];
            returnType: Protocol.Storage.GetInterestGroupDetailsResponse;
        };
        /**
         * Enables/Disables issuing of interestGroupAccessed events.
         */
        'Storage.setInterestGroupTracking': {
            paramsType: [Protocol.Storage.SetInterestGroupTrackingRequest];
            returnType: void;
        };
        /**
         * Gets metadata for an origin's shared storage.
         */
        'Storage.getSharedStorageMetadata': {
            paramsType: [Protocol.Storage.GetSharedStorageMetadataRequest];
            returnType: Protocol.Storage.GetSharedStorageMetadataResponse;
        };
        /**
         * Gets the entries in an given origin's shared storage.
         */
        'Storage.getSharedStorageEntries': {
            paramsType: [Protocol.Storage.GetSharedStorageEntriesRequest];
            returnType: Protocol.Storage.GetSharedStorageEntriesResponse;
        };
        /**
         * Sets entry with `key` and `value` for a given origin's shared storage.
         */
        'Storage.setSharedStorageEntry': {
            paramsType: [Protocol.Storage.SetSharedStorageEntryRequest];
            returnType: void;
        };
        /**
         * Deletes entry for `key` (if it exists) for a given origin's shared storage.
         */
        'Storage.deleteSharedStorageEntry': {
            paramsType: [Protocol.Storage.DeleteSharedStorageEntryRequest];
            returnType: void;
        };
        /**
         * Clears all entries for a given origin's shared storage.
         */
        'Storage.clearSharedStorageEntries': {
            paramsType: [Protocol.Storage.ClearSharedStorageEntriesRequest];
            returnType: void;
        };
        /**
         * Resets the budget for `ownerOrigin` by clearing all budget withdrawals.
         */
        'Storage.resetSharedStorageBudget': {
            paramsType: [Protocol.Storage.ResetSharedStorageBudgetRequest];
            returnType: void;
        };
        /**
         * Enables/disables issuing of sharedStorageAccessed events.
         */
        'Storage.setSharedStorageTracking': {
            paramsType: [Protocol.Storage.SetSharedStorageTrackingRequest];
            returnType: void;
        };
        /**
         * Set tracking for a storage key's buckets.
         */
        'Storage.setStorageBucketTracking': {
            paramsType: [Protocol.Storage.SetStorageBucketTrackingRequest];
            returnType: void;
        };
        /**
         * Deletes the Storage Bucket with the given storage key and bucket name.
         */
        'Storage.deleteStorageBucket': {
            paramsType: [Protocol.Storage.DeleteStorageBucketRequest];
            returnType: void;
        };
        /**
         * Deletes state for sites identified as potential bounce trackers, immediately.
         */
        'Storage.runBounceTrackingMitigations': {
            paramsType: [];
            returnType: Protocol.Storage.RunBounceTrackingMitigationsResponse;
        };
        /**
         * https://wicg.github.io/attribution-reporting-api/
         */
        'Storage.setAttributionReportingLocalTestingMode': {
            paramsType: [Protocol.Storage.SetAttributionReportingLocalTestingModeRequest];
            returnType: void;
        };
        /**
         * Enables/disables issuing of Attribution Reporting events.
         */
        'Storage.setAttributionReportingTracking': {
            paramsType: [Protocol.Storage.SetAttributionReportingTrackingRequest];
            returnType: void;
        };
        /**
         * Returns information about the system.
         */
        'SystemInfo.getInfo': {
            paramsType: [];
            returnType: Protocol.SystemInfo.GetInfoResponse;
        };
        /**
         * Returns information about the feature state.
         */
        'SystemInfo.getFeatureState': {
            paramsType: [Protocol.SystemInfo.GetFeatureStateRequest];
            returnType: Protocol.SystemInfo.GetFeatureStateResponse;
        };
        /**
         * Returns information about all running processes.
         */
        'SystemInfo.getProcessInfo': {
            paramsType: [];
            returnType: Protocol.SystemInfo.GetProcessInfoResponse;
        };
        /**
         * Activates (focuses) the target.
         */
        'Target.activateTarget': {
            paramsType: [Protocol.Target.ActivateTargetRequest];
            returnType: void;
        };
        /**
         * Attaches to the target with given id.
         */
        'Target.attachToTarget': {
            paramsType: [Protocol.Target.AttachToTargetRequest];
            returnType: Protocol.Target.AttachToTargetResponse;
        };
        /**
         * Attaches to the browser target, only uses flat sessionId mode.
         */
        'Target.attachToBrowserTarget': {
            paramsType: [];
            returnType: Protocol.Target.AttachToBrowserTargetResponse;
        };
        /**
         * Closes the target. If the target is a page that gets closed too.
         */
        'Target.closeTarget': {
            paramsType: [Protocol.Target.CloseTargetRequest];
            returnType: Protocol.Target.CloseTargetResponse;
        };
        /**
         * Inject object to the target's main frame that provides a communication
         * channel with browser target.
         * 
         * Injected object will be available as `window[bindingName]`.
         * 
         * The object has the follwing API:
         * - `binding.send(json)` - a method to send messages over the remote debugging protocol
         * - `binding.onmessage = json => handleMessage(json)` - a callback that will be called for the protocol notifications and command responses.
         */
        'Target.exposeDevToolsProtocol': {
            paramsType: [Protocol.Target.ExposeDevToolsProtocolRequest];
            returnType: void;
        };
        /**
         * Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than
         * one.
         */
        'Target.createBrowserContext': {
            paramsType: [Protocol.Target.CreateBrowserContextRequest?];
            returnType: Protocol.Target.CreateBrowserContextResponse;
        };
        /**
         * Returns all browser contexts created with `Target.createBrowserContext` method.
         */
        'Target.getBrowserContexts': {
            paramsType: [];
            returnType: Protocol.Target.GetBrowserContextsResponse;
        };
        /**
         * Creates a new page.
         */
        'Target.createTarget': {
            paramsType: [Protocol.Target.CreateTargetRequest];
            returnType: Protocol.Target.CreateTargetResponse;
        };
        /**
         * Detaches session with given id.
         */
        'Target.detachFromTarget': {
            paramsType: [Protocol.Target.DetachFromTargetRequest?];
            returnType: void;
        };
        /**
         * Deletes a BrowserContext. All the belonging pages will be closed without calling their
         * beforeunload hooks.
         */
        'Target.disposeBrowserContext': {
            paramsType: [Protocol.Target.DisposeBrowserContextRequest];
            returnType: void;
        };
        /**
         * Returns information about a target.
         */
        'Target.getTargetInfo': {
            paramsType: [Protocol.Target.GetTargetInfoRequest?];
            returnType: Protocol.Target.GetTargetInfoResponse;
        };
        /**
         * Retrieves a list of available targets.
         */
        'Target.getTargets': {
            paramsType: [Protocol.Target.GetTargetsRequest?];
            returnType: Protocol.Target.GetTargetsResponse;
        };
        /**
         * Sends protocol message over session with given id.
         * Consider using flat mode instead; see commands attachToTarget, setAutoAttach,
         * and crbug.com/991325.
         */
        'Target.sendMessageToTarget': {
            paramsType: [Protocol.Target.SendMessageToTargetRequest];
            returnType: void;
        };
        /**
         * Controls whether to automatically attach to new targets which are considered to be related to
         * this one. When turned on, attaches to all existing related targets as well. When turned off,
         * automatically detaches from all currently attached targets.
         * This also clears all targets added by `autoAttachRelated` from the list of targets to watch
         * for creation of related targets.
         */
        'Target.setAutoAttach': {
            paramsType: [Protocol.Target.SetAutoAttachRequest];
            returnType: void;
        };
        /**
         * Adds the specified target to the list of targets that will be monitored for any related target
         * creation (such as child frames, child workers and new versions of service worker) and reported
         * through `attachedToTarget`. The specified target is also auto-attached.
         * This cancels the effect of any previous `setAutoAttach` and is also cancelled by subsequent
         * `setAutoAttach`. Only available at the Browser target.
         */
        'Target.autoAttachRelated': {
            paramsType: [Protocol.Target.AutoAttachRelatedRequest];
            returnType: void;
        };
        /**
         * Controls whether to discover available targets and notify via
         * `targetCreated/targetInfoChanged/targetDestroyed` events.
         */
        'Target.setDiscoverTargets': {
            paramsType: [Protocol.Target.SetDiscoverTargetsRequest];
            returnType: void;
        };
        /**
         * Enables target discovery for the specified locations, when `setDiscoverTargets` was set to
         * `true`.
         */
        'Target.setRemoteLocations': {
            paramsType: [Protocol.Target.SetRemoteLocationsRequest];
            returnType: void;
        };
        /**
         * Request browser port binding.
         */
        'Tethering.bind': {
            paramsType: [Protocol.Tethering.BindRequest];
            returnType: void;
        };
        /**
         * Request browser port unbinding.
         */
        'Tethering.unbind': {
            paramsType: [Protocol.Tethering.UnbindRequest];
            returnType: void;
        };
        /**
         * Stop trace events collection.
         */
        'Tracing.end': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Gets supported tracing categories.
         */
        'Tracing.getCategories': {
            paramsType: [];
            returnType: Protocol.Tracing.GetCategoriesResponse;
        };
        /**
         * Record a clock sync marker in the trace.
         */
        'Tracing.recordClockSyncMarker': {
            paramsType: [Protocol.Tracing.RecordClockSyncMarkerRequest];
            returnType: void;
        };
        /**
         * Request a global memory dump.
         */
        'Tracing.requestMemoryDump': {
            paramsType: [Protocol.Tracing.RequestMemoryDumpRequest?];
            returnType: Protocol.Tracing.RequestMemoryDumpResponse;
        };
        /**
         * Start trace events collection.
         */
        'Tracing.start': {
            paramsType: [Protocol.Tracing.StartRequest?];
            returnType: void;
        };
        /**
         * Disables the fetch domain.
         */
        'Fetch.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enables issuing of requestPaused events. A request will be paused until client
         * calls one of failRequest, fulfillRequest or continueRequest/continueWithAuth.
         */
        'Fetch.enable': {
            paramsType: [Protocol.Fetch.EnableRequest?];
            returnType: void;
        };
        /**
         * Causes the request to fail with specified reason.
         */
        'Fetch.failRequest': {
            paramsType: [Protocol.Fetch.FailRequestRequest];
            returnType: void;
        };
        /**
         * Provides response to the request.
         */
        'Fetch.fulfillRequest': {
            paramsType: [Protocol.Fetch.FulfillRequestRequest];
            returnType: void;
        };
        /**
         * Continues the request, optionally modifying some of its parameters.
         */
        'Fetch.continueRequest': {
            paramsType: [Protocol.Fetch.ContinueRequestRequest];
            returnType: void;
        };
        /**
         * Continues a request supplying authChallengeResponse following authRequired event.
         */
        'Fetch.continueWithAuth': {
            paramsType: [Protocol.Fetch.ContinueWithAuthRequest];
            returnType: void;
        };
        /**
         * Continues loading of the paused response, optionally modifying the
         * response headers. If either responseCode or headers are modified, all of them
         * must be present.
         */
        'Fetch.continueResponse': {
            paramsType: [Protocol.Fetch.ContinueResponseRequest];
            returnType: void;
        };
        /**
         * Causes the body of the response to be received from the server and
         * returned as a single string. May only be issued for a request that
         * is paused in the Response stage and is mutually exclusive with
         * takeResponseBodyForInterceptionAsStream. Calling other methods that
         * affect the request or disabling fetch domain before body is received
         * results in an undefined behavior.
         * Note that the response body is not available for redirects. Requests
         * paused in the _redirect received_ state may be differentiated by
         * `responseCode` and presence of `location` response header, see
         * comments to `requestPaused` for details.
         */
        'Fetch.getResponseBody': {
            paramsType: [Protocol.Fetch.GetResponseBodyRequest];
            returnType: Protocol.Fetch.GetResponseBodyResponse;
        };
        /**
         * Returns a handle to the stream representing the response body.
         * The request must be paused in the HeadersReceived stage.
         * Note that after this command the request can't be continued
         * as is -- client either needs to cancel it or to provide the
         * response body.
         * The stream only supports sequential read, IO.read will fail if the position
         * is specified.
         * This method is mutually exclusive with getResponseBody.
         * Calling other methods that affect the request or disabling fetch
         * domain before body is received results in an undefined behavior.
         */
        'Fetch.takeResponseBodyAsStream': {
            paramsType: [Protocol.Fetch.TakeResponseBodyAsStreamRequest];
            returnType: Protocol.Fetch.TakeResponseBodyAsStreamResponse;
        };
        /**
         * Enables the WebAudio domain and starts sending context lifetime events.
         */
        'WebAudio.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Disables the WebAudio domain.
         */
        'WebAudio.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Fetch the realtime data from the registered contexts.
         */
        'WebAudio.getRealtimeData': {
            paramsType: [Protocol.WebAudio.GetRealtimeDataRequest];
            returnType: Protocol.WebAudio.GetRealtimeDataResponse;
        };
        /**
         * Enable the WebAuthn domain and start intercepting credential storage and
         * retrieval with a virtual authenticator.
         */
        'WebAuthn.enable': {
            paramsType: [Protocol.WebAuthn.EnableRequest?];
            returnType: void;
        };
        /**
         * Disable the WebAuthn domain.
         */
        'WebAuthn.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Creates and adds a virtual authenticator.
         */
        'WebAuthn.addVirtualAuthenticator': {
            paramsType: [Protocol.WebAuthn.AddVirtualAuthenticatorRequest];
            returnType: Protocol.WebAuthn.AddVirtualAuthenticatorResponse;
        };
        /**
         * Resets parameters isBogusSignature, isBadUV, isBadUP to false if they are not present.
         */
        'WebAuthn.setResponseOverrideBits': {
            paramsType: [Protocol.WebAuthn.SetResponseOverrideBitsRequest];
            returnType: void;
        };
        /**
         * Removes the given authenticator.
         */
        'WebAuthn.removeVirtualAuthenticator': {
            paramsType: [Protocol.WebAuthn.RemoveVirtualAuthenticatorRequest];
            returnType: void;
        };
        /**
         * Adds the credential to the specified authenticator.
         */
        'WebAuthn.addCredential': {
            paramsType: [Protocol.WebAuthn.AddCredentialRequest];
            returnType: void;
        };
        /**
         * Returns a single credential stored in the given virtual authenticator that
         * matches the credential ID.
         */
        'WebAuthn.getCredential': {
            paramsType: [Protocol.WebAuthn.GetCredentialRequest];
            returnType: Protocol.WebAuthn.GetCredentialResponse;
        };
        /**
         * Returns all the credentials stored in the given virtual authenticator.
         */
        'WebAuthn.getCredentials': {
            paramsType: [Protocol.WebAuthn.GetCredentialsRequest];
            returnType: Protocol.WebAuthn.GetCredentialsResponse;
        };
        /**
         * Removes a credential from the authenticator.
         */
        'WebAuthn.removeCredential': {
            paramsType: [Protocol.WebAuthn.RemoveCredentialRequest];
            returnType: void;
        };
        /**
         * Clears all the credentials from the specified device.
         */
        'WebAuthn.clearCredentials': {
            paramsType: [Protocol.WebAuthn.ClearCredentialsRequest];
            returnType: void;
        };
        /**
         * Sets whether User Verification succeeds or fails for an authenticator.
         * The default is true.
         */
        'WebAuthn.setUserVerified': {
            paramsType: [Protocol.WebAuthn.SetUserVerifiedRequest];
            returnType: void;
        };
        /**
         * Sets whether tests of user presence will succeed immediately (if true) or fail to resolve (if false) for an authenticator.
         * The default is true.
         */
        'WebAuthn.setAutomaticPresenceSimulation': {
            paramsType: [Protocol.WebAuthn.SetAutomaticPresenceSimulationRequest];
            returnType: void;
        };
        /**
         * Enables the Media domain
         */
        'Media.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Disables the Media domain.
         */
        'Media.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Enable events in this domain.
         */
        'DeviceAccess.enable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Disable events in this domain.
         */
        'DeviceAccess.disable': {
            paramsType: [];
            returnType: void;
        };
        /**
         * Select a device in response to a DeviceAccess.deviceRequestPrompted event.
         */
        'DeviceAccess.selectPrompt': {
            paramsType: [Protocol.DeviceAccess.SelectPromptRequest];
            returnType: void;
        };
        /**
         * Cancel a prompt in response to a DeviceAccess.deviceRequestPrompted event.
         */
        'DeviceAccess.cancelPrompt': {
            paramsType: [Protocol.DeviceAccess.CancelPromptRequest];
            returnType: void;
        };
        'Preload.enable': {
            paramsType: [];
            returnType: void;
        };
        'Preload.disable': {
            paramsType: [];
            returnType: void;
        };
        'FedCm.enable': {
            paramsType: [Protocol.FedCm.EnableRequest?];
            returnType: void;
        };
        'FedCm.disable': {
            paramsType: [];
            returnType: void;
        };
        'FedCm.selectAccount': {
            paramsType: [Protocol.FedCm.SelectAccountRequest];
            returnType: void;
        };
        'FedCm.dismissDialog': {
            paramsType: [Protocol.FedCm.DismissDialogRequest];
            returnType: void;
        };
        /**
         * Resets the cooldown time, if any, to allow the next FedCM call to show
         * a dialog even if one was recently dismissed by the user.
         */
        'FedCm.resetCooldown': {
            paramsType: [];
            returnType: void;
        };
    }
}

declare class ProxyAgent extends Dispatcher {
    constructor(options: ProxyAgent.Options | string)

    dispatch(options: Agent.DispatchOptions, handler: Dispatcher.DispatchHandlers): boolean;
    close(): Promise<void>;
}

declare namespace ProxyAgent {
    interface Options extends Agent.Options {
        uri: string;
        /**
         * @deprecated use opts.token
         */
        auth?: string;
        token?: string;
        headers?: IncomingHttpHeaders;
        requestTls?: buildConnector.BuildOptions;
        proxyTls?: buildConnector.BuildOptions;
        clientFactory?(origin: URL, opts: object): Dispatcher;
    }
}

declare class ProxyController extends Controller<ProxyControllerEventMap> {
    ready: DeferredPromise<ReadyEvent>;
    proxyWorker?: Miniflare;
    proxyWorkerOptions?: MiniflareOptions;
    private inspectorProxyWorkerWebSocket?;
    protected latestConfig?: StartDevWorkerOptions;
    protected latestBundle?: EsbuildBundle;
    secret: `${string}-${string}-${string}-${string}-${string}`;
    protected createProxyWorker(): void;
    private reconnectInspectorProxyWorker;
    runtimeMessageMutex: Mutex;
    sendMessageToProxyWorker(message: ProxyWorkerIncomingRequestBody, retries?: number): Promise<void>;
    sendMessageToInspectorProxyWorker(message: InspectorProxyWorkerIncomingWebSocketMessage, retries?: number): Promise<void>;
    onConfigUpdate(data: ConfigUpdateEvent): void;
    onBundleStart(data: BundleStartEvent): void;
    onReloadStart(data: ReloadStartEvent): void;
    onReloadComplete(data: ReloadCompleteEvent): void;
    onProxyWorkerMessage(message: ProxyWorkerOutgoingRequestBody): void;
    onInspectorProxyWorkerMessage(message: InspectorProxyWorkerOutgoingWebsocketMessage): void;
    onInspectorProxyWorkerRequest(message: InspectorProxyWorkerOutgoingRequestBody): Promise<Response_2>;
    _torndown: boolean;
    teardown(): Promise<void>;
    emitReadyEvent(proxyWorker: Miniflare, url: URL, inspectorUrl: URL): void;
    emitPreviewTokenExpiredEvent(proxyData: ProxyData): void;
    emitErrorEvent(data: ErrorEvent): void;
    emitErrorEvent(reason: string, cause?: Error | SerializedError): void;
}

declare type ProxyControllerEventMap = ControllerEventMap & {
    ready: [ReadyEvent];
    previewTokenExpired: [PreviewTokenExpiredEvent];
};

declare type ProxyData = {
    userWorkerUrl: UrlOriginParts;
    userWorkerInspectorUrl: UrlOriginAndPathnameParts;
    userWorkerInnerUrlOverrides?: Partial<UrlOriginParts>;
    headers: Record<string, string>;
    liveReload?: boolean;
    proxyLogsToController?: boolean;
    internalDurableObjects?: CfDurableObject[];
    entrypointAddresses: WorkerEntrypointsDefinition | undefined;
};

declare type ProxyWorkerIncomingRequestBody = {
    type: "play";
    proxyData: ProxyData;
} | {
    type: "pause";
};

declare type ProxyWorkerOutgoingRequestBody = {
    type: "error";
    error: SerializedError;
} | {
    type: "previewTokenExpired";
    proxyData: ProxyData;
} | {
    type: "debug-log";
    args: Parameters<typeof console.debug>;
};

declare type QueueConsumer = NonNullable<Config["queues"]["consumers"]>[number];

declare type RawDevConfig = Partial<DevConfig>;

declare type ReadyEvent = {
    type: "ready";
    proxyWorker: Miniflare;
    url: URL;
    inspectorUrl: URL;
};

declare class RedirectHandler implements Dispatcher.DispatchHandlers{
    constructor (dispatch: Dispatcher, maxRedirections: number, opts: Dispatcher.DispatchOptions, handler: Dispatcher.DispatchHandlers)
}

declare type RedirectInterceptorOpts = { maxRedirections?: number }

declare type ReferrerPolicy =
| ''
| 'no-referrer'
| 'no-referrer-when-downgrade'
| 'origin'
| 'origin-when-cross-origin'
| 'same-origin'
| 'strict-origin'
| 'strict-origin-when-cross-origin'
| 'unsafe-url';

declare type ReloadCompleteEvent = {
    type: "reloadComplete";
    config: StartDevWorkerOptions;
    bundle: Bundle;
    proxyData: ProxyData;
};

declare type ReloadStartEvent = {
    type: "reloadStart";
    config: StartDevWorkerOptions;
    bundle: Bundle;
};

declare class Request implements BodyMixin {
    constructor (input: RequestInfo, init?: RequestInit)

    readonly cache: RequestCache
    readonly credentials: RequestCredentials
    readonly destination: RequestDestination
    readonly headers: Headers
    readonly integrity: string
    readonly method: string
    readonly mode: RequestMode
    readonly redirect: RequestRedirect
    readonly referrerPolicy: string
    readonly url: string

    readonly keepalive: boolean
    readonly signal: AbortSignal
    readonly duplex: RequestDuplex

    readonly body: ReadableStream | null
    readonly bodyUsed: boolean

    readonly arrayBuffer: () => Promise<ArrayBuffer>
    readonly blob: () => Promise<Blob_2>
    readonly formData: () => Promise<FormData_2>
    readonly json: () => Promise<unknown>
    readonly text: () => Promise<string>

    readonly clone: () => Request
}

/** Performs an HTTP request. */
declare function request(
url: string | URL_2 | UrlObject,
options?: { dispatcher?: Dispatcher } & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> & Partial<Pick<Dispatcher.RequestOptions, 'method'>>,
): Promise<Dispatcher.ResponseData>;

declare type RequestCache =
| 'default'
| 'force-cache'
| 'no-cache'
| 'no-store'
| 'only-if-cached'
| 'reload'

declare type RequestCredentials = 'omit' | 'include' | 'same-origin'

declare type RequestDestination =
| ''
| 'audio'
| 'audioworklet'
| 'document'
| 'embed'
| 'font'
| 'image'
| 'manifest'
| 'object'
| 'paintworklet'
| 'report'
| 'script'
| 'sharedworker'
| 'style'
| 'track'
| 'video'
| 'worker'
| 'xslt'

declare type RequestDuplex = 'half'

declare type RequestInfo = string | URL_2 | Request

declare interface RequestInit {
    method?: string
    keepalive?: boolean
    headers?: HeadersInit
    body?: BodyInit
    redirect?: RequestRedirect
    integrity?: string
    signal?: AbortSignal | null
    credentials?: RequestCredentials
    mode?: RequestMode
    referrer?: string
    referrerPolicy?: ReferrerPolicy
    window?: null
    dispatcher?: Dispatcher
    duplex?: RequestDuplex
}

declare type RequestMode = 'cors' | 'navigate' | 'no-cors' | 'same-origin'

declare type RequestRedirect = 'error' | 'follow' | 'manual'

declare class Response implements BodyMixin {
    constructor (body?: BodyInit, init?: ResponseInit)

    readonly headers: Headers
    readonly ok: boolean
    readonly status: number
    readonly statusText: string
    readonly type: ResponseType
    readonly url: string
    readonly redirected: boolean

    readonly body: ReadableStream | null
    readonly bodyUsed: boolean

    readonly arrayBuffer: () => Promise<ArrayBuffer>
    readonly blob: () => Promise<Blob_2>
    readonly formData: () => Promise<FormData_2>
    readonly json: () => Promise<unknown>
    readonly text: () => Promise<string>

    readonly clone: () => Response

    static error (): Response
    static json(data: any, init?: ResponseInit): Response
    static redirect (url: string | URL_2, status: ResponseRedirectStatus): Response
}

declare interface ResponseInit {
    readonly status?: number
    readonly statusText?: string
    readonly headers?: HeadersInit
}

declare type ResponseRedirectStatus = 301 | 302 | 303 | 307 | 308

declare type ResponseType =
| 'basic'
| 'cors'
| 'default'
| 'error'
| 'opaque'
| 'opaqueredirect'

declare class RetryHandler implements Dispatcher.DispatchHandlers {
    constructor(
    options: Dispatcher.DispatchOptions & {
        retryOptions?: RetryHandler.RetryOptions;
    },
    retryHandlers: RetryHandler.RetryHandlers
    );
}

declare namespace RetryHandler {
    type RetryState = { counter: number; currentTimeout: number };

    type RetryContext = {
        state: RetryState;
        opts: Dispatcher.DispatchOptions & {
            retryOptions?: RetryHandler.RetryOptions;
        };
    }

    type OnRetryCallback = (result?: Error | null) => void;

    type RetryCallback = (
    err: Error,
    context: {
        state: RetryState;
        opts: Dispatcher.DispatchOptions & {
            retryOptions?: RetryHandler.RetryOptions;
        };
    },
    callback: OnRetryCallback
    ) => number | null;

    interface RetryOptions {
        /**
         * Callback to be invoked on every retry iteration.
         * It receives the error, current state of the retry object and the options object
         * passed when instantiating the retry handler.
         *
         * @type {RetryCallback}
         * @memberof RetryOptions
         */
        retry?: RetryCallback;
        /**
         * Maximum number of retries to allow.
         *
         * @type {number}
         * @memberof RetryOptions
         * @default 5
         */
        maxRetries?: number;
        /**
         * Max number of milliseconds allow between retries
         *
         * @type {number}
         * @memberof RetryOptions
         * @default 30000
         */
        maxTimeout?: number;
        /**
         * Initial number of milliseconds to wait before retrying for the first time.
         *
         * @type {number}
         * @memberof RetryOptions
         * @default 500
         */
        minTimeout?: number;
        /**
         * Factior to multiply the timeout factor between retries.
         *
         * @type {number}
         * @memberof RetryOptions
         * @default 2
         */
        timeoutFactor?: number;
        /**
         * It enables to automatically infer timeout between retries based on the `Retry-After` header.
         *
         * @type {boolean}
         * @memberof RetryOptions
         * @default true
         */
        retryAfter?: boolean;
        /**
         * HTTP methods to retry.
         *
         * @type {Dispatcher.HttpMethod[]}
         * @memberof RetryOptions
         * @default ['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE', 'TRACE'],
         */
        methods?: Dispatcher.HttpMethod[];
        /**
         * Error codes to be retried. e.g. `ECONNRESET`, `ENOTFOUND`, `ETIMEDOUT`, `ECONNREFUSED`, etc.
         *
         * @type {string[]}
         * @default ['ECONNRESET','ECONNREFUSED','ENOTFOUND','ENETDOWN','ENETUNREACH','EHOSTDOWN','EHOSTUNREACH','EPIPE']
         */
        errorCodes?: string[];
        /**
         * HTTP status codes to be retried.
         *
         * @type {number[]}
         * @memberof RetryOptions
         * @default [500, 502, 503, 504, 429],
         */
        statusCodes?: number[];
    }

    interface RetryHandlers {
        dispatch: Dispatcher["dispatch"];
        handler: Dispatcher.DispatchHandlers;
    }
}

declare type Route = SimpleRoute | ZoneIdRoute | ZoneNameRoute | CustomDomainRoute;

declare type RoutingConfig = z.infer<typeof RoutingConfigSchema>;

declare const RoutingConfigSchema: z.ZodObject<{
    has_user_worker: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    has_user_worker?: boolean;
}, {
    has_user_worker?: boolean;
}>;

/**
 * A bundling resolver rule, defining the modules type for paths that match the specified globs.
 */
declare type Rule = {
    type: ConfigModuleRuleType;
    globs: string[];
    fallthrough?: boolean;
};

declare abstract class RuntimeController extends Controller<RuntimeControllerEventMap> {
    abstract onBundleStart(_: BundleStartEvent): void;
    abstract onBundleComplete(_: BundleCompleteEvent): void;
    abstract onPreviewTokenExpired(_: PreviewTokenExpiredEvent): void;
    abstract teardown(): Promise<void>;
    abstract emitReloadStartEvent(data: ReloadStartEvent): void;
    abstract emitReloadCompleteEvent(data: ReloadCompleteEvent): void;
}

declare type RuntimeControllerEventMap = ControllerEventMap & {
    reloadStart: [ReloadStartEvent];
    reloadComplete: [ReloadCompleteEvent];
};

/**
 * Convert a MIMEType object to a string.
 * @see https://mimesniff.spec.whatwg.org/#serialize-a-mime-type
 */
declare function serializeAMimeType (mimeType: MIMEType): string

declare type SerializedError = {
    message: string;
    name?: string;
    stack?: string | undefined;
    cause?: unknown;
};

declare type ServiceFetch = (request: Request_2) => Promise<Response_2> | Response_2;

declare function setCookie (headers: Headers, cookie: Cookie): void

declare function setGlobalDispatcher<DispatcherImplementation extends Dispatcher>(dispatcher: DispatcherImplementation): void;

declare function setGlobalOrigin(origin: string | URL | undefined): void;

declare type SimpleRoute = string;

export declare type SourcelessWorkerOptions = Omit<WorkerOptions, "script" | "scriptPath" | "modules" | "modulesRoot"> & {
    modulesRules?: ModuleRule[];
};

/**
 * Information about Wrangler's bundling process that needs passed through
 * for DevTools sourcemap transformation
 */
declare interface SourceMapMetadata {
    tmpDir: string;
    entryDirectory: string;
}

declare interface SpecIterable<T> {
    [Symbol.iterator](): SpecIterator<T>;
}

declare interface SpecIterableIterator<T> extends SpecIterator<T> {
    [Symbol.iterator](): SpecIterableIterator<T>;
}

declare interface SpecIterator<T, TReturn = any, TNext = undefined> {
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
}

declare interface StartDevWorkerInput {
    /** The name of the worker. */
    name?: string;
    /**
     * The javascript or typescript entry-point of the worker.
     * This is the `main` property of a wrangler.toml.
     * You can specify a file path or provide the contents directly.
     */
    entrypoint?: string;
    /** The configuration of the worker. */
    config?: string;
    /** The compatibility date for the workerd runtime. */
    compatibilityDate?: string;
    /** The compatibility flags for the workerd runtime. */
    compatibilityFlags?: string[];
    env?: string;
    /** The bindings available to the worker. The specified bindind type will be exposed to the worker on the `env` object under the same key. */
    bindings?: Record<string, Binding>;
    migrations?: DurableObjectMigration[];
    /** The triggers which will cause the worker's exported default handlers to be called. */
    triggers?: Trigger[];
    /**
     * Whether Wrangler should send usage metrics to Cloudflare for this project.
     *
     * When defined this will override any user settings.
     * Otherwise, Wrangler will use the user's preference.
     */
    sendMetrics?: boolean;
    /** Options applying to the worker's build step. Applies to deploy and dev. */
    build?: {
        /** Whether the worker and its dependencies are bundled. Defaults to true. */
        bundle?: boolean;
        additionalModules?: CfModule[];
        findAdditionalModules?: boolean;
        processEntrypoint?: boolean;
        /** Specifies types of modules matched by globs. */
        moduleRules?: Rule[];
        /** Replace global identifiers with constant expressions, e.g. { debug: 'true', version: '"1.0.0"' }. Only takes effect if bundle: true. */
        define?: Record<string, string>;
        /** Alias modules */
        alias?: Record<string, string>;
        /** Whether the bundled worker is minified. Only takes effect if bundle: true. */
        minify?: boolean;
        /** Options controlling a custom build step. */
        custom?: {
            /** Custom shell command to run before bundling. Runs even if bundle. */
            command?: string;
            /** The cwd to run the command in. */
            workingDirectory?: string;
            /** Filepath(s) to watch for changes. Upon changes, the command will be rerun. */
            watch?: string | string[];
        };
        jsxFactory?: string;
        jsxFragment?: string;
        tsconfig?: string;
        nodejsCompatMode?: Hook<NodeJSCompatMode, [Config]>;
        moduleRoot?: string;
    };
    /** Options applying to the worker's development preview environment. */
    dev?: {
        /** Options applying to the worker's inspector server. */
        inspector?: {
            hostname?: string;
            port?: number;
            secure?: boolean;
        };
        /** Whether the worker runs on the edge or locally. */
        remote?: boolean;
        /** Cloudflare Account credentials. Can be provided upfront or as a function which will be called only when required. */
        auth?: AsyncHook<CfAccount, [Pick<Config, "account_id">]>;
        /** Whether local storage (KV, Durable Objects, R2, D1, etc) is persisted. You can also specify the directory to persist data to. */
        persist?: string;
        /** Controls which logs are logged 🤙. */
        logLevel?: LogLevel;
        /** Whether the worker server restarts upon source/config file changes. */
        watch?: boolean;
        /** Whether a script tag is inserted on text/html responses which will reload the page upon file changes. Defaults to false. */
        liveReload?: boolean;
        /** The local address to reach your worker. Applies to remote: true (remote mode) and remote: false (local mode). */
        server?: {
            hostname?: string;
            port?: number;
            secure?: boolean;
            httpsKeyPath?: string;
            httpsCertPath?: string;
        };
        /** Controls what request.url looks like inside the worker. */
        origin?: {
            hostname?: string;
            secure?: boolean;
        };
        /** A hook for outbound fetch calls from within the worker. */
        outboundService?: ServiceFetch;
        /** An undici MockAgent to declaratively mock fetch calls to particular resources. */
        mockFetch?: undici.MockAgent;
        /** Describes the registry of other Workers running locally */
        registry?: WorkerRegistry;
        testScheduled?: boolean;
    };
    legacy?: {
        site?: Hook<Config["site"], [Config]>;
        legacyAssets?: Hook<Config["legacy_assets"], [Config]>;
        enableServiceEnvironments?: boolean;
    };
    unsafe?: Omit<CfUnsafe, "bindings">;
    assets?: string;
}

declare type StartDevWorkerOptions = Omit<StartDevWorkerInput, "assets"> & {
    /** A worker's directory. Usually where the wrangler.toml file is located */
    directory: string;
    build: StartDevWorkerInput["build"] & {
        nodejsCompatMode: NodeJSCompatMode;
        format: CfScriptFormat;
        moduleRoot: string;
        moduleRules: Rule[];
        define: Record<string, string>;
        additionalModules: CfModule[];
        processEntrypoint: boolean;
    };
    legacy: StartDevWorkerInput["legacy"] & {
        legacyAssets?: Config["legacy_assets"];
        site?: Config["site"];
    };
    dev: StartDevWorkerInput["dev"] & {
        persist: string;
        auth?: AsyncHook<CfAccount>;
    };
    entrypoint: string;
    assets?: AssetsOptions;
};

declare function startWorkerRegistryServer(port: number): Promise<{
    server: Server<IncomingMessage, ServerResponse>;
    terminator: HttpTerminator;
}>;

/** A faster version of `request`. */
declare function stream(
url: string | URL_2 | UrlObject,
options: { dispatcher?: Dispatcher } & Omit<Dispatcher.RequestOptions, 'origin' | 'path'>,
factory: Dispatcher.StreamFactory
): Promise<Dispatcher.StreamData>;

declare type TableRow<Keys extends string> = Record<Keys, string>;

declare type TailConsumer = {
    /** The name of the service tail events will be forwarded to. */
    service: string;
    /** (Optional) The environment of the service. */
    environment?: string;
};

declare type Trigger = {
    type: "workers.dev";
} | {
    type: "route";
    pattern: string;
} | ({
    type: "route";
} & ZoneIdRoute) | ({
    type: "route";
} & ZoneNameRoute) | ({
    type: "route";
} & CustomDomainRoute) | {
    type: "cron";
    cron: string;
} | ({
    type: "queue-consumer";
} & QueueConsumer);

declare interface TypedEventEmitter<EventMap extends Record<string | symbol, unknown[]>> extends EventEmitter_2 {
    addListener<Name extends keyof EventMap>(eventName: Name, listener: (...args: EventMap[Name]) => void): this;
    on<Name extends keyof EventMap>(eventName: Name, listener: (...args: EventMap[Name]) => void): this;
    once<Name extends keyof EventMap>(eventName: Name, listener: (...args: EventMap[Name]) => void): this;
    removeListener<Name extends keyof EventMap>(eventName: Name, listener: (...args: EventMap[Name]) => void): this;
    off<Name extends keyof EventMap>(eventName: Name, listener: (...args: EventMap[Name]) => void): this;
    removeAllListeners(event?: keyof EventMap): this;
    listeners<Name extends keyof EventMap>(eventName: Name): ((...args: EventMap[Name]) => void)[];
    rawListeners<Name extends keyof EventMap>(eventName: Name): ((...args: EventMap[Name]) => void)[];
    emit<Name extends keyof EventMap>(eventName: Name, ...args: EventMap[Name]): boolean;
    listenerCount<Name extends keyof EventMap>(eventName: Name, listener?: (...args: EventMap[Name]) => void): number;
    prependListener<Name extends keyof EventMap>(eventName: Name, listener: (...args: EventMap[Name]) => void): this;
    prependOnceListener<Name extends keyof EventMap>(eventName: Name, listener: (...args: EventMap[Name]) => void): this;
}

declare const TypedEventEmitterImpl: {
    new <EventMap extends Record<string | symbol, unknown[]>>(): TypedEventEmitter<EventMap>;
};

declare namespace Undici {
    var Dispatcher: Dispatcher
    var Pool: Pool;
    var RedirectHandler: RedirectHandler
    var DecoratorHandler: DecoratorHandler
    var RetryHandler: RetryHandler
    var createRedirectInterceptor: createRedirectInterceptor
    var BalancedPool: BalancedPool;
    var Client: Client;
    var buildConnector: buildConnector;
    var errors: Errors;
    var Agent: Agent;
    var setGlobalDispatcher: setGlobalDispatcher;
    var getGlobalDispatcher: getGlobalDispatcher;
    var request: request;
    var stream: stream;
    var pipeline: pipeline;
    var connect: connect;
    var upgrade: upgrade;
    var MockClient: MockClient;
    var MockPool: MockPool;
    var MockAgent: MockAgent;
    var mockErrors: MockErrors;
    var fetch: fetch;
    var Headers: Headers;
    var Response: Response;
    var Request: Request;
    var FormData: FormData_2;
    var File: File;
    var FileReader: FileReader;
    var caches: caches;
}

declare namespace undici {
    export {
        Undici as default,
        Interceptable,
        Dispatcher,
        BalancedPool,
        Pool,
        Client,
        buildConnector,
        Errors as errors,
        Agent,
        request,
        stream,
        pipeline,
        connect,
        upgrade,
        setGlobalDispatcher,
        getGlobalDispatcher,
        setGlobalOrigin,
        getGlobalOrigin,
        MockClient,
        MockPool,
        MockAgent,
        MockErrors as mockErrors,
        ProxyAgent,
        RedirectHandler,
        DecoratorHandler,
        RetryHandler,
        deleteCookie,
        getCookies,
        getSetCookies,
        setCookie,
        Cookie,
        fetch,
        RequestInfo,
        BodyInit,
        BodyMixin,
        SpecIterator,
        SpecIterableIterator,
        SpecIterable,
        HeadersInit,
        Headers,
        RequestCache,
        RequestCredentials,
        RequestDestination,
        RequestInit,
        ReferrerPolicy,
        RequestMode,
        RequestRedirect,
        RequestDuplex,
        Request,
        ResponseInit,
        ResponseType,
        ResponseRedirectStatus,
        Response,
        BlobPropertyBag,
        FilePropertyBag,
        File,
        FileReader,
        ProgressEventInit,
        ProgressEvent,
        FormDataEntryValue,
        FormData_2 as FormData,
        DiagnosticsChannel,
        BinaryType,
        WebSocketEventMap,
        WebSocket,
        CloseEventInit,
        CloseEvent,
        MessageEventInit,
        MessageEvent,
        WebSocketInit,
        parseMIMEType,
        serializeAMimeType,
        MIMEType,
        CacheStorage,
        Cache,
        CacheQueryOptions,
        MultiCacheQueryOptions,
        caches
    }
}

/**
 *  unstable_dev starts a wrangler dev server, and returns a promise that resolves with utility functions to interact with it.
 */
export declare function unstable_dev(script: string, options?: UnstableDevOptions, apiOptions?: unknown): Promise<UnstableDevWorker>;

export declare class unstable_DevEnv extends EventEmitter_2 {
    config: ConfigController;
    bundler: BundlerController;
    runtimes: RuntimeController[];
    proxy: ProxyController;
    startWorker(options: StartDevWorkerInput): Promise<Worker>;
    constructor({ config, bundler, runtimes, proxy, }?: {
        config?: ConfigController | undefined;
        bundler?: BundlerController | undefined;
        runtimes?: RuntimeController[] | undefined;
        proxy?: ProxyController | undefined;
    });
    teardown(): Promise<void>;
    emitErrorEvent(ev: ErrorEvent): void;
}

export declare const unstable_generateASSETSBinding: (opts: UnstableASSETSBindingsOptions) => (request: Request_2) => Promise<Response_2>;

export declare function unstable_getMiniflareWorkerOptions(configPath: string, env?: string): {
    workerOptions: SourcelessWorkerOptions;
    define: Record<string, string>;
    main?: string;
};

export declare const unstable_pages: {
    deploy: typeof deploy;
};

/**
 * Split an SQLQuery into an array of statements
 */
export declare function unstable_splitSqlQuery(sql: string): string[];

export declare function unstable_startWorker(options: StartDevWorkerInput): Promise<Worker>;

export declare const unstable_startWorkerRegistryServer: startWorkerRegistryServer;

export declare interface UnstableASSETSBindingsOptions {
    log: Logger;
    proxyPort?: number;
    directory?: string;
}

export declare interface UnstableDevOptions {
    config?: string;
    env?: string;
    ip?: string;
    port?: number;
    bundle?: boolean;
    inspectorPort?: number;
    localProtocol?: "http" | "https";
    httpsKeyPath?: string;
    httpsCertPath?: string;
    assets?: string;
    legacyAssets?: string;
    site?: string;
    siteInclude?: string[];
    siteExclude?: string[];
    nodeCompat?: boolean;
    compatibilityDate?: string;
    compatibilityFlags?: string[];
    persist?: boolean;
    persistTo?: string;
    vars?: Record<string, string | Json>;
    kv?: {
        binding: string;
        id: string;
        preview_id?: string;
    }[];
    durableObjects?: {
        name: string;
        class_name: string;
        script_name?: string | undefined;
        environment?: string | undefined;
    }[];
    services?: {
        binding: string;
        service: string;
        environment?: string | undefined;
        entrypoint?: string | undefined;
    }[];
    r2?: {
        binding: string;
        bucket_name: string;
        preview_bucket_name?: string;
    }[];
    ai?: {
        binding: string;
    };
    version_metadata?: {
        binding: string;
    };
    moduleRoot?: string;
    rules?: Rule[];
    logLevel?: "none" | "info" | "error" | "log" | "warn" | "debug";
    inspect?: boolean;
    local?: boolean;
    accountId?: string;
    experimental?: {
        processEntrypoint?: boolean;
        additionalModules?: CfModule[];
        d1Databases?: Environment["d1_databases"];
        disableExperimentalWarning?: boolean;
        disableDevRegistry?: boolean;
        enablePagesAssetsServiceBinding?: EnablePagesAssetsServiceBindingOptions;
        forceLocal?: boolean;
        liveReload?: boolean;
        showInteractiveDevSession?: boolean;
        testMode?: boolean;
        testScheduled?: boolean;
        watch?: boolean;
        devEnv?: boolean;
        fileBasedRegistry?: boolean;
    };
}

export declare interface UnstableDevWorker {
    port: number;
    address: string;
    proxyData: ProxyData;
    stop: () => Promise<void>;
    fetch: (input?: RequestInfo, init?: RequestInit) => Promise<Response>;
    waitUntilExit: () => Promise<void>;
}

/** Upgrade to a different protocol. */
declare function upgrade(
url: string | URL_2 | UrlObject,
options?: { dispatcher?: Dispatcher } & Omit<Dispatcher.UpgradeOptions, 'origin' | 'path'>
): Promise<Dispatcher.UpgradeData>;

declare type UrlOriginAndPathnameParts = Pick<URL, "protocol" | "hostname" | "port" | "pathname">;

declare type UrlOriginParts = Pick<URL, "protocol" | "hostname" | "port">;

declare interface UserLimits {
    /** Maximum allowed CPU time for a Worker's invocation in milliseconds */
    cpu_ms: number;
}

declare interface WebSocket extends EventTarget_2 {
    binaryType: BinaryType

    readonly bufferedAmount: number
    readonly extensions: string

    onclose: ((this: WebSocket, ev: WebSocketEventMap['close']) => any) | null
    onerror: ((this: WebSocket, ev: WebSocketEventMap['error']) => any) | null
    onmessage: ((this: WebSocket, ev: WebSocketEventMap['message']) => any) | null
    onopen: ((this: WebSocket, ev: WebSocketEventMap['open']) => any) | null

    readonly protocol: string
    readonly readyState: number
    readonly url: string

    close(code?: number, reason?: string): void
    send(data: string | ArrayBufferLike | Blob_2 | ArrayBufferView): void

    readonly CLOSED: number
    readonly CLOSING: number
    readonly CONNECTING: number
    readonly OPEN: number

    addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
    ): void
    addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
    ): void
    removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions
    ): void
    removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
    ): void
}

declare const WebSocket: {
    prototype: WebSocket
    new (url: string | URL, protocols?: string | string[] | WebSocketInit): WebSocket
    readonly CLOSED: number
    readonly CLOSING: number
    readonly CONNECTING: number
    readonly OPEN: number
};

declare interface WebSocketEventMap {
    close: CloseEvent
    error: Event_2
    message: MessageEvent
    open: Event_2
}

declare interface WebSocketInit {
    protocols?: string | string[],
    dispatcher?: Dispatcher,
    headers?: HeadersInit
}

declare interface Worker {
    ready: Promise<void>;
    url: Promise<URL>;
    inspectorUrl: Promise<URL>;
    config: StartDevWorkerOptions;
    setConfig: ConfigController["set"];
    patchConfig: ConfigController["patch"];
    fetch: DispatchFetch;
    scheduled: MiniflareWorker["scheduled"];
    queue: MiniflareWorker["queue"];
    dispose(): Promise<void>;
}

declare type WorkerDefinition = {
    port: number | undefined;
    protocol: "http" | "https" | undefined;
    host: string | undefined;
    mode: "local" | "remote";
    headers?: Record<string, string>;
    entrypointAddresses?: WorkerEntrypointsDefinition;
    durableObjects: {
        name: string;
        className: string;
    }[];
    durableObjectsHost?: string;
    durableObjectsPort?: number;
};

declare type WorkerEntrypointsDefinition = Record<"default" | string, {
    host: string;
    port: number;
} | undefined>;

declare type WorkerRegistry = Record<string, WorkerDefinition>;

declare type ZoneIdRoute = {
    pattern: string;
    zone_id: string;
    custom_domain?: boolean;
};

declare type ZoneNameRoute = {
    pattern: string;
    zone_name: string;
    custom_domain?: boolean;
};

export { }
