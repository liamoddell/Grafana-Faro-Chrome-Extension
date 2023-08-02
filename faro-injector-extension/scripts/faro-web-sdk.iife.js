var GrafanaFaroWebSdk = function(e) {
    "use strict";

    function n(e, n) {
        return typeof e === n
    }

    function t(e, n) {
        return Object.prototype.toString.call(e) === `[object ${n}]`
    }

    function i(e, n) {
        try {
            return e instanceof n
        } catch (e) {
            return !1
        }
    }
    const r = e => n(e, "undefined"),
        o = e => n(e, "null"),
        a = e => n(e, "string"),
        s = e => n(e, "number") && !isNaN(e) || n(e, "bigint"),
        u = e => !o(e) && n(e, "object"),
        l = e => n(e, "function"),
        c = e => t(e, "Array"),
        d = e => !u(e) && !l(e),
        p = !r(Event),
        f = e => p && i(e, Event),
        g = "undefined" != typeof Error,
        b = e => g && i(e, Error),
        m = e => t(e, "ErrorEvent"),
        h = e => t(e, "DOMError"),
        v = e => t(e, "DOMException"),
        w = "undefined" != typeof Element,
        y = "undefined" != typeof Map;

    function E(e, t) {
        if (e === t) return !0;
        if (n(e, "number") && isNaN(e)) return n(t, "number") && isNaN(t);
        const i = c(e),
            r = c(t);
        if (i !== r) return !1;
        if (i && r) {
            const n = e.length;
            if (n !== t.length) return !1;
            for (let i = n; 0 != i--;)
                if (!E(e[i], t[i])) return !1;
            return !0
        }
        const o = u(e),
            a = u(t);
        if (o !== a) return !1;
        if (e && t && o && a) {
            const n = Object.keys(e),
                i = Object.keys(t);
            if (n.length !== i.length) return !1;
            for (let e of n)
                if (!i.includes(e)) return !1;
            for (let i of n)
                if (!E(e[i], t[i])) return !1;
            return !0
        }
        return !1
    }

    function x() {
        return (new Date).toISOString()
    }
    var T;
    e.LogLevel = void 0, (T = e.LogLevel || (e.LogLevel = {})).TRACE = "trace", T.DEBUG = "debug", T.INFO = "info", T.LOG = "log", T.WARN = "warn", T.ERROR = "error";
    const k = e.LogLevel.LOG,
        L = [e.LogLevel.TRACE, e.LogLevel.DEBUG, e.LogLevel.INFO, e.LogLevel.LOG, e.LogLevel.WARN, e.LogLevel.ERROR];

    function S() {}

    function I(e) {
        const {
            size: n,
            concurrency: t
        } = e, i = [];
        let r = 0;
        const o = () => {
            if (r < t && i.length) {
                const {
                    producer: e,
                    resolve: n,
                    reject: t
                } = i.shift();
                r++, e().then((e => {
                    r--, o(), n(e)
                }), (e => {
                    r--, o(), t(e)
                }))
            }
        };
        return {
            add: e => {
                if (i.length + r >= n) throw new Error("Task buffer full");
                return new Promise(((n, t) => {
                    i.push({
                        producer: e,
                        resolve: n,
                        reject: t
                    }), o()
                }))
            }
        }
    }
    const O = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

    function A(e = 10) {
        return Array.from(Array(e)).map((() => O[Math.floor(Math.random() * O.length)])).join("")
    }
    var C = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        N = {},
        R = {
            get exports() {
                return N
            },
            set exports(e) {
                N = e
            }
        },
        j = {},
        D = {
            get exports() {
                return j
            },
            set exports(e) {
                j = e
            }
        };
    D.exports = function(e, n) {
        var t, i, r, o, a, s, u, l;
        for (t = 3 & e.length, i = e.length - t, r = n, a = 3432918353, s = 461845907, l = 0; l < i;) u = 255 & e.charCodeAt(l) | (255 & e.charCodeAt(++l)) << 8 | (255 & e.charCodeAt(++l)) << 16 | (255 & e.charCodeAt(++l)) << 24, ++l, r = 27492 + (65535 & (o = 5 * (65535 & (r = (r ^= u = (65535 & (u = (u = (65535 & u) * a + (((u >>> 16) * a & 65535) << 16) & 4294967295) << 15 | u >>> 17)) * s + (((u >>> 16) * s & 65535) << 16) & 4294967295) << 13 | r >>> 19)) + ((5 * (r >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (o >>> 16) & 65535) << 16);
        switch (u = 0, t) {
            case 3:
                u ^= (255 & e.charCodeAt(l + 2)) << 16;
            case 2:
                u ^= (255 & e.charCodeAt(l + 1)) << 8;
            case 1:
                r ^= u = (65535 & (u = (u = (65535 & (u ^= 255 & e.charCodeAt(l))) * a + (((u >>> 16) * a & 65535) << 16) & 4294967295) << 15 | u >>> 17)) * s + (((u >>> 16) * s & 65535) << 16) & 4294967295
        }
        return r ^= e.length, r = 2246822507 * (65535 & (r ^= r >>> 16)) + ((2246822507 * (r >>> 16) & 65535) << 16) & 4294967295, r = 3266489909 * (65535 & (r ^= r >>> 13)) + ((3266489909 * (r >>> 16) & 65535) << 16) & 4294967295, (r ^= r >>> 16) >>> 0
    };
    var P = {},
        M = {
            get exports() {
                return P
            },
            set exports(e) {
                P = e
            }
        };
    ! function(e) {
        e.exports = function(e, n) {
            for (var t, i = e.length, r = n ^ i, o = 0; i >= 4;) t = 1540483477 * (65535 & (t = 255 & e.charCodeAt(o) | (255 & e.charCodeAt(++o)) << 8 | (255 & e.charCodeAt(++o)) << 16 | (255 & e.charCodeAt(++o)) << 24)) + ((1540483477 * (t >>> 16) & 65535) << 16), r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16) ^ (t = 1540483477 * (65535 & (t ^= t >>> 24)) + ((1540483477 * (t >>> 16) & 65535) << 16)), i -= 4, ++o;
            switch (i) {
                case 3:
                    r ^= (255 & e.charCodeAt(o + 2)) << 16;
                case 2:
                    r ^= (255 & e.charCodeAt(o + 1)) << 8;
                case 1:
                    r = 1540483477 * (65535 & (r ^= 255 & e.charCodeAt(o))) + ((1540483477 * (r >>> 16) & 65535) << 16)
            }
            return r = 1540483477 * (65535 & (r ^= r >>> 13)) + ((1540483477 * (r >>> 16) & 65535) << 16), (r ^= r >>> 15) >>> 0
        }
    }(M);
    var z = j,
        B = P;
    R.exports = z;
    var F = N.murmur3 = z;
    N.murmur2 = B;
    class $ {
        constructor(e, n) {
            var t, i;
            this.signalBuffer = [], this.itemLimit = null !== (t = null == n ? void 0 : n.itemLimit) && void 0 !== t ? t : 50, this.sendTimeout = null !== (i = null == n ? void 0 : n.sendTimeout) && void 0 !== i ? i : 250, this.paused = (null == n ? void 0 : n.paused) || !1, this.sendFn = e, this.flushInterval = -1, this.paused || this.start(), document.addEventListener("visibilitychange", (() => {
                "hidden" === document.visibilityState && this.flush()
            }))
        }
        addItem(e) {
            this.paused || (this.signalBuffer.push(e), this.signalBuffer.length >= this.itemLimit && this.flush())
        }
        start() {
            this.paused = !1, this.sendTimeout > 0 && (this.flushInterval = window.setInterval((() => this.flush()), this.sendTimeout))
        }
        pause() {
            this.paused = !0, clearInterval(this.flushInterval)
        }
        groupItems(e) {
            const n = new Map;
            return e.forEach((e => {
                const t = F(JSON.stringify(e.meta));
                let i = n.get(t);
                i = void 0 === i ? [e] : [...i, e], n.set(t, i)
            })), Array.from(n.values())
        }
        flush() {
            if (this.paused || 0 === this.signalBuffer.length) return;
            this.groupItems(this.signalBuffer).forEach(this.sendFn), this.signalBuffer = []
        }
    }
    var _;
    e.TransportItemType = void 0, (_ = e.TransportItemType || (e.TransportItemType = {})).EXCEPTION = "exception", _.LOG = "log", _.MEASUREMENT = "measurement", _.TRACE = "trace", _.EVENT = "event";
    const U = {
        [e.TransportItemType.EXCEPTION]: "exceptions",
        [e.TransportItemType.LOG]: "logs",
        [e.TransportItemType.MEASUREMENT]: "measurements",
        [e.TransportItemType.TRACE]: "traces",
        [e.TransportItemType.EVENT]: "events"
    };

    function q(n) {
        return t => {
            if (t.type === e.TransportItemType.EXCEPTION && t.payload) {
                const e = t.payload,
                    i = `${e.type}: ${e.value}`;
                if (function(e, n) {
                        return e.some((e => a(e) ? n.includes(e) : !!n.match(e)))
                    }(n, i)) return null
            }
            return t
        }
    }
    var V;
    e.InternalLoggerLevel = void 0, (V = e.InternalLoggerLevel || (e.InternalLoggerLevel = {}))[V.OFF = 0] = "OFF", V[V.ERROR = 1] = "ERROR", V[V.WARN = 2] = "WARN", V[V.INFO = 3] = "INFO", V[V.VERBOSE = 4] = "VERBOSE";
    const G = {
            debug: S,
            error: S,
            info: S,
            prefix: "Faro",
            warn: S
        },
        W = e.InternalLoggerLevel.ERROR,
        K = Object.assign({}, console);
    let H = K;

    function X(e) {
        var n;
        return H = null !== (n = e.unpatchedConsole) && void 0 !== n ? n : H, H
    }

    function Z(n = K, t = W) {
        const i = G;
        return t > e.InternalLoggerLevel.OFF && (i.error = t >= e.InternalLoggerLevel.ERROR ? function(...e) {
            n.error(`${i.prefix}\n`, ...e)
        } : S, i.warn = t >= e.InternalLoggerLevel.WARN ? function(...e) {
            n.warn(`${i.prefix}\n`, ...e)
        } : S, i.info = t >= e.InternalLoggerLevel.INFO ? function(...e) {
            n.info(`${i.prefix}\n`, ...e)
        } : S, i.debug = t >= e.InternalLoggerLevel.VERBOSE ? function(...e) {
            n.debug(`${i.prefix}\n`, ...e)
        } : S), i
    }
    let J = G;

    function Q(e, n) {
        return J = Z(e, n.internalLoggerLevel), J
    }
    class Y {
        constructor() {
            this.unpatchedConsole = K, this.internalLogger = G, this.config = {}, this.metas = {}
        }
        logDebug(...e) {
            this.internalLogger.debug(`${this.name}\n`, ...e)
        }
        logInfo(...e) {
            this.internalLogger.info(`${this.name}\n`, ...e)
        }
        logWarn(...e) {
            this.internalLogger.warn(`${this.name}\n`, ...e)
        }
        logError(...e) {
            this.internalLogger.error(`${this.name}\n`, ...e)
        }
    }
    class ee extends Y {
        isBatched() {
            return !1
        }
        getIgnoreUrls() {
            return []
        }
    }

    function ne(e, n) {
        var t, i;
        if (void 0 === n) return e;
        if (void 0 === e) return {
            resourceSpans: n
        };
        const r = null === (t = e.resourceSpans) || void 0 === t ? void 0 : t[0];
        if (void 0 === r) return e;
        const o = (null == r ? void 0 : r.scopeSpans) || [],
            a = (null === (i = null == n ? void 0 : n[0]) || void 0 === i ? void 0 : i.scopeSpans) || [];
        return Object.assign(Object.assign({}, e), {
            resourceSpans: [Object.assign(Object.assign({}, r), {
                scopeSpans: [...o, ...a]
            })]
        })
    }

    function te(n) {
        let t = {
            meta: {}
        };
        return void 0 !== n[0] && (t.meta = n[0].meta), n.forEach((n => {
            switch (n.type) {
                case e.TransportItemType.LOG:
                case e.TransportItemType.EVENT:
                case e.TransportItemType.EXCEPTION:
                case e.TransportItemType.MEASUREMENT:
                    const i = U[n.type],
                        r = t[i];
                    t = Object.assign(Object.assign({}, t), {
                        [i]: void 0 === r ? [n.payload] : [...r, n.payload]
                    });
                    break;
                case e.TransportItemType.TRACE:
                    t = Object.assign(Object.assign({}, t), {
                        traces: ne(t.traces, n.payload.resourceSpans)
                    })
            }
        })), t
    }
    const ie = "Error";
    let re;

    function oe(n, t, i, r, a) {
        t.debug("Initializing API");
        const s = function(n, t, i, r, o) {
            let a;
            return t.debug("Initializing traces API"), {
                getOTEL: () => a,
                getTraceContext: () => {
                    const e = null == a ? void 0 : a.trace.getSpanContext(a.context.active());
                    return e ? {
                        trace_id: e.traceId,
                        span_id: e.spanId
                    } : void 0
                },
                initOTEL: (e, n) => {
                    t.debug("Initializing OpenTelemetry"), a = {
                        trace: e,
                        context: n
                    }
                },
                isOTELInitialized: () => !!a,
                pushTraces: n => {
                    try {
                        const i = {
                            type: e.TransportItemType.TRACE,
                            payload: n,
                            meta: r.value
                        };
                        t.debug("Pushing trace\n", i), o.execute(i)
                    } catch (e) {
                        t.error("Error pushing trace\n", e)
                    }
                }
            }
        }(0, t, 0, r, a);
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, s), function(n, t, i, r, a, s) {
            var u;
            t.debug("Initializing exceptions API");
            let l = null;
            re = null !== (u = i.parseStacktrace) && void 0 !== u ? u : re;
            const c = e => {
                t.debug("Changing stacktrace parser"), re = null != e ? e : re
            };
            return c(i.parseStacktrace), {
                changeStacktraceParser: c,
                getStacktraceParser: () => re,
                pushError: (n, {
                    skipDedupe: u,
                    stackFrames: c,
                    type: d,
                    context: p
                } = {}) => {
                    d = d || n.name || ie;
                    const f = {
                        meta: r.value,
                        payload: {
                            type: d,
                            value: n.message,
                            timestamp: x(),
                            trace: s.getTraceContext(),
                            context: null != p ? p : {}
                        },
                        type: e.TransportItemType.EXCEPTION
                    };
                    (null == (c = null != c ? c : n.stack ? null == re ? void 0 : re(n).frames : void 0) ? void 0 : c.length) && (f.payload.stacktrace = {
                        frames: c
                    });
                    const g = {
                        type: f.payload.type,
                        value: f.payload.value,
                        stackTrace: f.payload.stacktrace,
                        context: f.payload.context
                    };
                    u || !i.dedupe || o(l) || !E(g, l) ? (l = g, t.debug("Pushing exception\n", f), a.execute(f)) : t.debug("Skipping error push because it is the same as the last one\n", f.payload)
                }
            }
        }(0, t, i, r, a, s)), function(e, n, t, i, r) {
            let o, a, s;
            n.debug("Initializing meta API");
            const u = e => {
                    a && i.remove(a), a = {
                        user: e
                    }, i.add(a)
                },
                l = e => {
                    o && i.remove(o), o = {
                        session: e
                    }, i.add(o)
                };
            return {
                setUser: u,
                resetUser: u,
                setSession: l,
                resetSession: l,
                getSession: () => i.value.session,
                setView: e => {
                    s && i.remove(s), s = {
                        view: e
                    }, i.add(s)
                },
                getView: () => i.value.view
            }
        }(0, t, 0, r)), function(n, t, i, r, a, s) {
            t.debug("Initializing logs API");
            let u = null;
            return {
                pushLog: (n, {
                    context: l,
                    level: c,
                    skipDedupe: d
                } = {}) => {
                    try {
                        const p = {
                                type: e.TransportItemType.LOG,
                                payload: {
                                    message: n.map((e => {
                                        try {
                                            return String(e)
                                        } catch (e) {
                                            return ""
                                        }
                                    })).join(" "),
                                    level: null != c ? c : k,
                                    context: null != l ? l : {},
                                    timestamp: x(),
                                    trace: s.getTraceContext()
                                },
                                meta: r.value
                            },
                            f = {
                                message: p.payload.message,
                                level: p.payload.level,
                                context: p.payload.context
                            };
                        if (!d && i.dedupe && !o(u) && E(f, u)) return void t.debug("Skipping log push because it is the same as the last one\n", p.payload);
                        u = f, t.debug("Pushing log\n", p), a.execute(p)
                    } catch (e) {
                        t.error("Error pushing log\n", e)
                    }
                }
            }
        }(0, t, i, r, a, s)), function(n, t, i, r, a, s) {
            t.debug("Initializing measurements API");
            let u = null;
            return {
                pushMeasurement: (n, {
                    skipDedupe: l
                } = {}) => {
                    var c;
                    try {
                        const d = {
                                type: e.TransportItemType.MEASUREMENT,
                                payload: Object.assign(Object.assign({}, n), {
                                    trace: s.getTraceContext(),
                                    timestamp: null !== (c = n.timestamp) && void 0 !== c ? c : x()
                                }),
                                meta: r.value
                            },
                            p = {
                                type: d.payload.type,
                                values: d.payload.values
                            };
                        if (!l && i.dedupe && !o(u) && E(p, u)) return void t.debug("Skipping measurement push because it is the same as the last one\n", d.payload);
                        u = p, t.debug("Pushing measurement\n", d), a.execute(d)
                    } catch (e) {
                        t.error("Error pushing measurement\n", e)
                    }
                }
            }
        }(0, t, i, r, a, s)), function(n, t, i, r, a, s) {
            let u = null;
            return {
                pushEvent: (n, l, c, {
                    skipDedupe: d
                } = {}) => {
                    try {
                        const p = {
                                meta: r.value,
                                payload: {
                                    name: n,
                                    domain: null != c ? c : i.eventDomain,
                                    attributes: l,
                                    timestamp: x(),
                                    trace: s.getTraceContext()
                                },
                                type: e.TransportItemType.EVENT
                            },
                            f = {
                                name: p.payload.name,
                                attributes: p.payload.attributes,
                                domain: p.payload.domain
                            };
                        if (!d && i.dedupe && !o(u) && E(f, u)) return void t.debug("Skipping event push because it is the same as the last one\n", p.payload);
                        u = f, t.debug("Pushing event\n", p), a.execute(p)
                    } catch (e) {
                        t.error("Error pushing event", e)
                    }
                }
            }
        }(0, t, i, r, a, s))
    }
    const ae = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0;
    class se extends Y {
        constructor() {
            super(...arguments), this.api = {}, this.transports = {}
        }
    }
    const ue = "1.1.2";
    const le = "_faroInternal";

    function ce(e) {
        e.config.isolate ? e.internalLogger.debug("Skipping registering internal Faro instance on global object") : (e.internalLogger.debug("Registering internal Faro instance on global object"), Object.defineProperty(ae, le, {
            configurable: !1,
            enumerable: !1,
            writable: !1,
            value: e
        }))
    }

    function de() {
        return le in ae
    }

    function pe(n, t, i, r, o, a, s) {
        return t.debug("Initializing Faro"), e.faro = {
                api: a,
                config: i,
                instrumentations: s,
                internalLogger: t,
                metas: r,
                pause: o.pause,
                transports: o,
                unpatchedConsole: n,
                unpause: o.unpause
            }, ce(e.faro),
            function(e) {
                if (e.config.preventGlobalExposure) e.internalLogger.debug("Skipping registering public Faro instance in the global scope");
                else {
                    if (e.internalLogger.debug(`Registering public faro reference in the global scope using "${e.config.globalObjectKey}" key`), e.config.globalObjectKey in ae) return void e.internalLogger.warn(`Skipping global registration due to key "${e.config.globalObjectKey}" being used already. Please set "globalObjectKey" to something else or set "preventGlobalExposure" to "true"`);
                    Object.defineProperty(ae, e.config.globalObjectKey, {
                        configurable: !1,
                        writable: !1,
                        value: e
                    })
                }
            }(e.faro), e.faro
    }

    function fe(e) {
        const n = X(e),
            t = Q(n, e);
        if (de() && !e.isolate) return void t.error('Faro is already registered. Either add instrumentations, transports etc. to the global faro instance or use the "isolate" property');
        t.debug("Initializing");
        const i = function(e, n, t) {
                let i = [],
                    r = [];
                const o = () => i.reduce(((e, n) => Object.assign(e, l(n) ? n() : n)), {}),
                    a = () => {
                        if (r.length) {
                            const e = o();
                            r.forEach((n => n(e)))
                        }
                    };
                return {
                    add: (...e) => {
                        n.debug("Adding metas\n", e), i.push(...e), a()
                    },
                    remove: (...e) => {
                        n.debug("Removing metas\n", e), i = i.filter((n => !e.includes(n))), a()
                    },
                    addListener: e => {
                        n.debug("Adding metas listener\n", e), r.push(e)
                    },
                    removeListener: e => {
                        n.debug("Removing metas listener\n", e), r = r.filter((n => n !== e))
                    },
                    get value() {
                        return o()
                    }
                }
            }(0, t),
            r = function(e, n, t, i) {
                var r;
                n.debug("Initializing transports");
                const o = [];
                let a = t.paused,
                    s = [];
                const u = e => {
                        let n = e;
                        for (const e of s) {
                            const t = n.map(e).filter(Boolean);
                            if (0 === t.length) return [];
                            n = t
                        }
                        return n
                    },
                    l = e => {
                        const t = u(e);
                        if (0 !== t.length)
                            for (const e of o) n.debug(`Transporting item using ${e.name}\n`, t), e.isBatched() && e.send(t)
                    },
                    c = e => {
                        var i;
                        const [r] = u([e]);
                        if (void 0 !== r)
                            for (const e of o) n.debug(`Transporting item using ${e.name}\n`, r), e.isBatched() ? (null === (i = t.batching) || void 0 === i ? void 0 : i.enabled) || e.send([r]) : e.send(r)
                    };
                let d;
                return (null === (r = t.batching) || void 0 === r ? void 0 : r.enabled) && (d = new $(l, {
                    sendTimeout: t.batching.sendTimeout,
                    itemLimit: t.batching.itemLimit,
                    paused: a
                })), {
                    add: (...r) => {
                        n.debug("Adding transports"), r.forEach((r => {
                            n.debug(`Adding "${r.name}" transport`), o.some((e => e === r)) ? n.warn(`Transport ${r.name} is already added`) : (r.unpatchedConsole = e, r.internalLogger = n, r.config = t, r.metas = i, o.push(r))
                        }))
                    },
                    addBeforeSendHooks: (...e) => {
                        n.debug("Adding beforeSendHooks\n", s), e.forEach((e => {
                            e && s.push(e)
                        }))
                    },
                    addIgnoreErrorsPatterns: (...e) => {
                        n.debug("Adding ignoreErrorsPatterns\n", e), e.forEach((e => {
                            e && s.push(q(e))
                        }))
                    },
                    getBeforeSendHooks: () => [...s],
                    execute: e => {
                        var n;
                        a || ((null === (n = t.batching) || void 0 === n ? void 0 : n.enabled) ? (null == d || d.addItem(e), c(e)) : c(e))
                    },
                    isPaused: () => a,
                    pause: () => {
                        n.debug("Pausing transports"), null == d || d.pause(), a = !0
                    },
                    remove: (...e) => {
                        n.debug("Removing transports"), e.forEach((e => {
                            n.debug(`Removing "${e.name}" transport`);
                            const t = o.indexOf(e); - 1 !== t ? o.splice(t, 1) : n.warn(`Transport "${e.name}" is not added`)
                        }))
                    },
                    removeBeforeSendHooks: (...e) => {
                        s.filter((n => !e.includes(n)))
                    },
                    get transports() {
                        return [...o]
                    },
                    unpause: () => {
                        n.debug("Unpausing transports"), null == d || d.start(), a = !1
                    }
                }
            }(n, t, e, i),
            o = oe(0, t, e, i, r),
            a = function(e, n, t, i, r, o) {
                n.debug("Initializing instrumentations");
                const a = [];
                return {
                    add: (...s) => {
                        n.debug("Adding instrumentations"), s.forEach((s => {
                            n.debug(`Adding "${s.name}" instrumentation`), a.some((e => e.name === s.name)) ? n.warn(`Instrumentation ${s.name} is already added`) : (s.unpatchedConsole = e, s.internalLogger = n, s.config = t, s.metas = i, s.transports = r, s.api = o, a.push(s), s.initialize())
                        }))
                    },
                    get instrumentations() {
                        return [...a]
                    },
                    remove: (...e) => {
                        n.debug("Removing instrumentations"), e.forEach((e => {
                            var t, i;
                            n.debug(`Removing "${e.name}" instrumentation`);
                            const r = a.reduce(((n, t, i) => null === n && t.name === e.name ? i : null), null);
                            r ? (null === (i = (t = a[r]).destroy) || void 0 === i || i.call(t), a.splice(r, 1)) : n.warn(`Instrumentation "${e.name}" is not added`)
                        }))
                    }
                }
            }(n, t, e, i, r, o),
            s = pe(n, t, e, i, r, o, a);
        return function(e) {
                var n;
                const t = {
                    sdk: {
                        name: "@grafana/faro-core",
                        version: ue,
                        integrations: e.config.instrumentations.map((({
                            name: e,
                            version: n
                        }) => ({
                            name: e,
                            version: n
                        })))
                    }
                };
                e.config.session && e.api.setSession(e.config.session), e.config.app && (t.app = e.config.app), e.config.user && (t.user = e.config.user), e.config.view && (t.view = e.config.view), e.metas.add(t, ...null !== (n = e.config.metas) && void 0 !== n ? n : [])
            }(s),
            function(e) {
                e.transports.add(...e.config.transports), e.transports.addBeforeSendHooks(e.config.beforeSend), e.transports.addIgnoreErrorsPatterns(e.config.ignoreErrors)
            }(s),
            function(e) {
                e.instrumentations.add(...e.config.instrumentations)
            }(s), s
    }
    e.faro = {};
    const ge = "faro",
        be = {
            enabled: !0,
            sendTimeout: 250,
            itemLimit: 50
        },
        me = {
            EventNames: {
                CLICK: "click",
                NAVIGATION: "navigation",
                SESSION_START: "session_start",
                VIEW_CHANGED: "view_changed"
            }
        };
    class he extends se {
        constructor() {
            super(...arguments), this.name = "@grafana/faro-web-sdk:instrumentation-session", this.version = ue
        }
        sendSessionStartEvent(e) {
            const n = e.session;
            n && n !== this.notifiedSession && (this.notifiedSession = n, this.api.pushEvent(me.EventNames.SESSION_START, {}, void 0, {
                skipDedupe: !0
            }))
        }
        initialize() {
            this.sendSessionStartEvent(this.metas.value), this.metas.addListener(this.sendSessionStartEvent.bind(this))
        }
    }
    class ve extends se {
        constructor(e = {}) {
            super(), this.options = e, this.name = "@grafana/faro-web-sdk:instrumentation-console", this.version = ue
        }
        initialize() {
            this.logDebug("Initializing\n", this.options), L.filter((e => {
                var n;
                return !(null !== (n = this.options.disabledLevels) && void 0 !== n ? n : ve.defaultDisabledLevels).includes(e)
            })).forEach((e => {
                console[e] = (...n) => {
                    try {
                        this.api.pushLog(n, {
                            level: e
                        })
                    } catch (e) {
                        this.logError(e)
                    } finally {
                        this.unpatchedConsole[e](...n)
                    }
                }
            }))
        }
    }
    ve.defaultDisabledLevels = [e.LogLevel.DEBUG, e.LogLevel.TRACE, e.LogLevel.LOG];
    const we = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i,
        ye = /^\s*at (?:(.*\).*?|.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
        Ee = /\((\S*)(?::(\d+))(?::(\d+))\)/,
        xe = "address at ",
        Te = xe.length,
        ke = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|safari-extension|safari-web-extension|capacitor)?:\/.*?|\[native code]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
        Le = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
        Se = "safari-extension",
        Ie = "safari-web-extension",
        Oe = /Minified React error #\d+;/i;

    function Ae(e, n, t, i) {
        const r = {
            filename: e || document.location.href,
            function: n || "?"
        };
        return void 0 !== t && (r.lineno = t), void 0 !== i && (r.colno = i), r
    }

    function Ce(e, n) {
        const t = null == e ? void 0 : e.includes(Se),
            i = !t && (null == e ? void 0 : e.includes(Ie));
        return t || i ? [(null == e ? void 0 : e.includes("@")) ? e.split("@")[0] : e, t ? `${Se}:${n}` : `${Ie}:${n}`] : [e, n]
    }

    function Ne(e) {
        let n = [];
        e.stacktrace ? n = e.stacktrace.split("\n").filter(((e, n) => n % 2 == 0)) : e.stack && (n = e.stack.split("\n"));
        const t = n.reduce(((n, t, i) => {
            let r, o, a, u, l;
            if (r = ye.exec(t)) {
                if (o = r[1], a = r[2], u = r[3], l = r[4], null == a ? void 0 : a.startsWith("eval")) {
                    const e = Ee.exec(a);
                    e && (a = e[1], u = e[2], l = e[3])
                }
                a = (null == a ? void 0 : a.startsWith(xe)) ? a.substring(Te) : a, [o, a] = Ce(o, a)
            } else if (r = ke.exec(t)) {
                if (o = r[1], a = r[3], u = r[4], l = r[5], a && a.includes(" > eval")) {
                    const e = Le.exec(a);
                    e && (o = o || "eval", a = e[1], u = e[2])
                } else 0 === i && !l && s(e.columnNumber) && (l = String(e.columnNumber + 1));
                [o, a] = Ce(o, a)
            }
            return (a || o) && n.push(Ae(a, o, u ? Number(u) : void 0, l ? Number(l) : void 0)), n
        }), []);
        return Oe.test(e.message) ? t.slice(1) : t
    }

    function Re(e) {
        return {
            frames: Ne(e)
        }
    }

    function je(e) {
        let n, t, i, r, o = [];
        if (m(e) && e.error) n = e.error.message, t = e.error.name, o = Ne(e.error);
        else if ((i = h(e)) || v(e)) {
            const {
                name: r,
                message: o
            } = e;
            t = null != r ? r : i ? "DOMError" : "DOMException", n = o ? `${t}: ${o}` : t
        } else b(e) ? (n = e.message, o = Ne(e)) : (u(e) || (r = f(e))) && (t = r ? e.constructor.name : void 0, n = `Non-Error exception captured with keys: ${Object.keys(e)}`);
        return [n, t, o]
    }

    function De(e) {
        const n = window.onerror;
        window.onerror = (...t) => {
            try {
                const [i, r, o, s, u] = t;
                let l, c, d = [];
                const p = a(i),
                    f = Ae(r, "?", o, s);
                u || !p ? ([l, c, d] = je(null != u ? u : i), 0 === d.length && (d = [f])) : p && ([l, c] = function(e) {
                    var n, t;
                    const i = e.match(we),
                        r = null !== (n = null == i ? void 0 : i[1]) && void 0 !== n ? n : ie;
                    return [null !== (t = null == i ? void 0 : i[2]) && void 0 !== t ? t : e, r]
                }(i), d = [f]), l && e.pushError(new Error(l), {
                    type: c,
                    stackFrames: d
                })
            } finally {
                null == n || n.apply(window, t)
            }
        }
    }
    class Pe extends se {
        constructor() {
            super(...arguments), this.name = "@grafana/faro-web-sdk:instrumentation-errors", this.version = ue
        }
        initialize() {
            var e;
            this.logDebug("Initializing"), De(this.api), e = this.api, window.addEventListener("unhandledrejection", (n => {
                var t, i;
                let r, o, a = n;
                a.reason ? a = n.reason : (null === (t = n.detail) || void 0 === t ? void 0 : t.reason) && (a = null === (i = n.detail) || void 0 === i ? void 0 : i.reason);
                let s = [];
                d(a) ? (r = `Non-Error promise rejection captured with value: ${String(a)}`, o = "UnhandledRejection") : [r, o, s] = je(a), r && e.pushError(new Error(r), {
                    type: o,
                    stackFrames: s
                })
            }))
        }
    }
    class Me extends se {
        constructor() {
            super(...arguments), this.name = "@grafana/faro-web-sdk:instrumentation-view", this.version = ue
        }
        sendViewChangedEvent(e) {
            const n = e.view;
            n && n !== this.notifiedView && (this.notifiedView = n, this.api.pushEvent(me.EventNames.VIEW_CHANGED, {}, void 0, {
                skipDedupe: !0
            }))
        }
        initialize() {
            this.sendViewChangedEvent(this.metas.value), this.metas.addListener(this.sendViewChangedEvent.bind(this))
        }
    }
    var ze, Be, Fe, $e, _e, Ue = -1,
        qe = function(e) {
            addEventListener("pageshow", (function(n) {
                n.persisted && (Ue = n.timeStamp, e(n))
            }), !0)
        },
        Ve = function() {
            return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
        },
        Ge = function() {
            var e = Ve();
            return e && e.activationStart || 0
        },
        We = function(e, n) {
            var t = Ve(),
                i = "navigate";
            return Ue >= 0 ? i = "back-forward-cache" : t && (i = document.prerendering || Ge() > 0 ? "prerender" : document.wasDiscarded ? "restore" : t.type.replace(/_/g, "-")), {
                name: e,
                value: void 0 === n ? -1 : n,
                rating: "good",
                delta: 0,
                entries: [],
                id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
                navigationType: i
            }
        },
        Ke = function(e, n, t) {
            try {
                if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                    var i = new PerformanceObserver((function(e) {
                        Promise.resolve().then((function() {
                            n(e.getEntries())
                        }))
                    }));
                    return i.observe(Object.assign({
                        type: e,
                        buffered: !0
                    }, t || {})), i
                }
            } catch (e) {}
        },
        He = function(e, n, t, i) {
            var r, o;
            return function(a) {
                n.value >= 0 && (a || i) && ((o = n.value - (r || 0)) || void 0 === r) && (r = n.value, n.delta = o, n.rating = function(e, n) {
                    return e > n[1] ? "poor" : e > n[0] ? "needs-improvement" : "good"
                }(n.value, t), e(n))
            }
        },
        Xe = function(e) {
            requestAnimationFrame((function() {
                return requestAnimationFrame((function() {
                    return e()
                }))
            }))
        },
        Ze = function(e) {
            var n = function(n) {
                "pagehide" !== n.type && "hidden" !== document.visibilityState || e(n)
            };
            addEventListener("visibilitychange", n, !0), addEventListener("pagehide", n, !0)
        },
        Je = function(e) {
            var n = !1;
            return function(t) {
                n || (e(t), n = !0)
            }
        },
        Qe = -1,
        Ye = function() {
            return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0
        },
        en = function(e) {
            "hidden" === document.visibilityState && Qe > -1 && (Qe = "visibilitychange" === e.type ? e.timeStamp : 0, tn())
        },
        nn = function() {
            addEventListener("visibilitychange", en, !0), addEventListener("prerenderingchange", en, !0)
        },
        tn = function() {
            removeEventListener("visibilitychange", en, !0), removeEventListener("prerenderingchange", en, !0)
        },
        rn = function() {
            return Qe < 0 && (Qe = Ye(), nn(), qe((function() {
                setTimeout((function() {
                    Qe = Ye(), nn()
                }), 0)
            }))), {
                get firstHiddenTime() {
                    return Qe
                }
            }
        },
        on = function(e) {
            document.prerendering ? addEventListener("prerenderingchange", (function() {
                return e()
            }), !0) : e()
        },
        an = function(e, n) {
            n = n || {}, on((function() {
                var t, i = [1800, 3e3],
                    r = rn(),
                    o = We("FCP"),
                    a = Ke("paint", (function(e) {
                        e.forEach((function(e) {
                            "first-contentful-paint" === e.name && (a.disconnect(), e.startTime < r.firstHiddenTime && (o.value = Math.max(e.startTime - Ge(), 0), o.entries.push(e), t(!0)))
                        }))
                    }));
                a && (t = He(e, o, i, n.reportAllChanges), qe((function(r) {
                    o = We("FCP"), t = He(e, o, i, n.reportAllChanges), Xe((function() {
                        o.value = performance.now() - r.timeStamp, t(!0)
                    }))
                })))
            }))
        },
        sn = {
            passive: !0,
            capture: !0
        },
        un = new Date,
        ln = function(e, n) {
            ze || (ze = n, Be = e, Fe = new Date, pn(removeEventListener), cn())
        },
        cn = function() {
            if (Be >= 0 && Be < Fe - un) {
                var e = {
                    entryType: "first-input",
                    name: ze.type,
                    target: ze.target,
                    cancelable: ze.cancelable,
                    startTime: ze.timeStamp,
                    processingStart: ze.timeStamp + Be
                };
                $e.forEach((function(n) {
                    n(e)
                })), $e = []
            }
        },
        dn = function(e) {
            if (e.cancelable) {
                var n = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
                "pointerdown" == e.type ? function(e, n) {
                    var t = function() {
                            ln(e, n), r()
                        },
                        i = function() {
                            r()
                        },
                        r = function() {
                            removeEventListener("pointerup", t, sn), removeEventListener("pointercancel", i, sn)
                        };
                    addEventListener("pointerup", t, sn), addEventListener("pointercancel", i, sn)
                }(n, e) : ln(n, e)
            }
        },
        pn = function(e) {
            ["mousedown", "keydown", "touchstart", "pointerdown"].forEach((function(n) {
                return e(n, dn, sn)
            }))
        },
        fn = 0,
        gn = 1 / 0,
        bn = 0,
        mn = function(e) {
            e.forEach((function(e) {
                e.interactionId && (gn = Math.min(gn, e.interactionId), bn = Math.max(bn, e.interactionId), fn = bn ? (bn - gn) / 7 + 1 : 0)
            }))
        },
        hn = function() {
            return _e ? fn : performance.interactionCount || 0
        },
        vn = function() {
            "interactionCount" in performance || _e || (_e = Ke("event", mn, {
                type: "event",
                buffered: !0,
                durationThreshold: 0
            }))
        },
        wn = 0,
        yn = function() {
            return hn() - wn
        },
        En = [],
        xn = {},
        Tn = function(e) {
            var n = En[En.length - 1],
                t = xn[e.interactionId];
            if (t || En.length < 10 || e.duration > n.latency) {
                if (t) t.entries.push(e), t.latency = Math.max(t.latency, e.duration);
                else {
                    var i = {
                        id: e.interactionId,
                        latency: e.duration,
                        entries: [e]
                    };
                    xn[i.id] = i, En.push(i)
                }
                En.sort((function(e, n) {
                    return n.latency - e.latency
                })), En.splice(10).forEach((function(e) {
                    delete xn[e.id]
                }))
            }
        },
        kn = {},
        Ln = function e(n) {
            document.prerendering ? on((function() {
                return e(n)
            })) : "complete" !== document.readyState ? addEventListener("load", (function() {
                return e(n)
            }), !0) : setTimeout(n, 0)
        };
    class Sn extends se {
        constructor() {
            super(...arguments), this.name = "@grafana/faro-web-sdk:instrumentation-web-vitals", this.version = ue
        }
        initialize() {
            this.logDebug("Initializing"), Object.entries(Sn.mapping).forEach((([e, n]) => {
                n((n => {
                    this.api.pushMeasurement({
                        type: "web-vitals",
                        values: {
                            [e]: n.value
                        }
                    })
                }))
            }))
        }
    }

    function In(e = {}) {
        const n = [new Pe, new Sn, new he, new Me];
        return !1 !== e.captureConsole && n.push(new ve({
            disabledLevels: e.captureConsoleDisabledLevels
        })), n
    }
    Sn.mapping = {
        cls: function(e, n) {
            n = n || {}, an(Je((function() {
                var t, i = [.1, .25],
                    r = We("CLS", 0),
                    o = 0,
                    a = [],
                    s = function(e) {
                        e.forEach((function(e) {
                            if (!e.hadRecentInput) {
                                var n = a[0],
                                    t = a[a.length - 1];
                                o && e.startTime - t.startTime < 1e3 && e.startTime - n.startTime < 5e3 ? (o += e.value, a.push(e)) : (o = e.value, a = [e])
                            }
                        })), o > r.value && (r.value = o, r.entries = a, t())
                    },
                    u = Ke("layout-shift", s);
                u && (t = He(e, r, i, n.reportAllChanges), Ze((function() {
                    s(u.takeRecords()), t(!0)
                })), qe((function() {
                    o = 0, r = We("CLS", 0), t = He(e, r, i, n.reportAllChanges), Xe((function() {
                        return t()
                    }))
                })), setTimeout(t, 0))
            })))
        },
        fcp: an,
        fid: function(e, n) {
            n = n || {}, on((function() {
                var t, i = [100, 300],
                    r = rn(),
                    o = We("FID"),
                    a = function(e) {
                        e.startTime < r.firstHiddenTime && (o.value = e.processingStart - e.startTime, o.entries.push(e), t(!0))
                    },
                    s = function(e) {
                        e.forEach(a)
                    },
                    u = Ke("first-input", s);
                t = He(e, o, i, n.reportAllChanges), u && Ze(Je((function() {
                    s(u.takeRecords()), u.disconnect()
                }))), u && qe((function() {
                    var r;
                    o = We("FID"), t = He(e, o, i, n.reportAllChanges), $e = [], Be = -1, ze = null, pn(addEventListener), r = a, $e.push(r), cn()
                }))
            }))
        },
        inp: function(e, n) {
            n = n || {}, on((function() {
                var t = [200, 500];
                vn();
                var i, r = We("INP"),
                    o = function(e) {
                        e.forEach((function(e) {
                            e.interactionId && Tn(e), "first-input" === e.entryType && !En.some((function(n) {
                                return n.entries.some((function(n) {
                                    return e.duration === n.duration && e.startTime === n.startTime
                                }))
                            })) && Tn(e)
                        }));
                        var n, t = (n = Math.min(En.length - 1, Math.floor(yn() / 50)), En[n]);
                        t && t.latency !== r.value && (r.value = t.latency, r.entries = t.entries, i())
                    },
                    a = Ke("event", o, {
                        durationThreshold: n.durationThreshold || 40
                    });
                i = He(e, r, t, n.reportAllChanges), a && (a.observe({
                    type: "first-input",
                    buffered: !0
                }), Ze((function() {
                    o(a.takeRecords()), r.value < 0 && yn() > 0 && (r.value = 0, r.entries = []), i(!0)
                })), qe((function() {
                    En = [], wn = hn(), r = We("INP"), i = He(e, r, t, n.reportAllChanges)
                })))
            }))
        },
        lcp: function(e, n) {
            n = n || {}, on((function() {
                var t, i = [2500, 4e3],
                    r = rn(),
                    o = We("LCP"),
                    a = function(e) {
                        var n = e[e.length - 1];
                        if (n) {
                            var i = Math.max(n.startTime - Ge(), 0);
                            i < r.firstHiddenTime && (o.value = i, o.entries = [n], t())
                        }
                    },
                    s = Ke("largest-contentful-paint", a);
                if (s) {
                    t = He(e, o, i, n.reportAllChanges);
                    var u = Je((function() {
                        kn[o.id] || (a(s.takeRecords()), s.disconnect(), kn[o.id] = !0, t(!0))
                    }));
                    ["keydown", "click"].forEach((function(e) {
                        addEventListener(e, u, !0)
                    })), Ze(u), qe((function(r) {
                        o = We("LCP"), t = He(e, o, i, n.reportAllChanges), Xe((function() {
                            o.value = performance.now() - r.timeStamp, kn[o.id] = !0, t(!0)
                        }))
                    }))
                }
            }))
        },
        ttfb: function(e, n) {
            n = n || {};
            var t = [800, 1800],
                i = We("TTFB"),
                r = He(e, i, t, n.reportAllChanges);
            Ln((function() {
                var o = Ve();
                if (o) {
                    var a = o.responseStart;
                    if (a <= 0 || a > performance.now()) return;
                    i.value = Math.max(a - Ge(), 0), i.entries = [o], r(!0), qe((function() {
                        i = We("TTFB", 0), (r = He(e, i, t, n.reportAllChanges))(!0)
                    }))
                }
            }))
        }
    };
    const On = "browser";
    var An = {},
        Cn = {
            get exports() {
                return An
            },
            set exports(e) {
                An = e
            }
        };
    ! function(e, n) {
        ! function(t, i) {
            var r = "function",
                o = "undefined",
                a = "object",
                s = "string",
                u = "model",
                l = "name",
                c = "type",
                d = "vendor",
                p = "version",
                f = "architecture",
                g = "console",
                b = "mobile",
                m = "tablet",
                h = "smarttv",
                v = "wearable",
                w = "embedded",
                y = "Amazon",
                E = "Apple",
                x = "ASUS",
                T = "BlackBerry",
                k = "Browser",
                L = "Chrome",
                S = "Firefox",
                I = "Google",
                O = "Huawei",
                A = "LG",
                C = "Microsoft",
                N = "Motorola",
                R = "Opera",
                j = "Samsung",
                D = "Sharp",
                P = "Sony",
                M = "Xiaomi",
                z = "Zebra",
                B = "Facebook",
                F = function(e) {
                    for (var n = {}, t = 0; t < e.length; t++) n[e[t].toUpperCase()] = e[t];
                    return n
                },
                $ = function(e, n) {
                    return typeof e === s && -1 !== _(n).indexOf(_(e))
                },
                _ = function(e) {
                    return e.toLowerCase()
                },
                U = function(e, n) {
                    if (typeof e === s) return e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), typeof n === o ? e : e.substring(0, 350)
                },
                q = function(e, n) {
                    for (var t, o, s, u, l, c, d = 0; d < n.length && !l;) {
                        var p = n[d],
                            f = n[d + 1];
                        for (t = o = 0; t < p.length && !l;)
                            if (l = p[t++].exec(e))
                                for (s = 0; s < f.length; s++) c = l[++o], typeof(u = f[s]) === a && u.length > 0 ? 2 === u.length ? typeof u[1] == r ? this[u[0]] = u[1].call(this, c) : this[u[0]] = u[1] : 3 === u.length ? typeof u[1] !== r || u[1].exec && u[1].test ? this[u[0]] = c ? c.replace(u[1], u[2]) : i : this[u[0]] = c ? u[1].call(this, c, u[2]) : i : 4 === u.length && (this[u[0]] = c ? u[3].call(this, c.replace(u[1], u[2])) : i) : this[u] = c || i;
                        d += 2
                    }
                },
                V = function(e, n) {
                    for (var t in n)
                        if (typeof n[t] === a && n[t].length > 0) {
                            for (var r = 0; r < n[t].length; r++)
                                if ($(n[t][r], e)) return "?" === t ? i : t
                        } else if ($(n[t], e)) return "?" === t ? i : t;
                    return e
                },
                G = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: ["NT 5.1", "NT 5.2"],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: ["NT 6.4", "NT 10.0"],
                    RT: "ARM"
                },
                W = {
                    browser: [
                        [/\b(?:crmo|crios)\/([\w\.]+)/i],
                        [p, [l, "Chrome"]],
                        [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                        [p, [l, "Edge"]],
                        [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],
                        [l, p],
                        [/opios[\/ ]+([\w\.]+)/i],
                        [p, [l, R + " Mini"]],
                        [/\bopr\/([\w\.]+)/i],
                        [p, [l, R]],
                        [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i],
                        [l, p],
                        [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                        [p, [l, "UC" + k]],
                        [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i],
                        [p, [l, "WeChat(Win) Desktop"]],
                        [/micromessenger\/([\w\.]+)/i],
                        [p, [l, "WeChat"]],
                        [/konqueror\/([\w\.]+)/i],
                        [p, [l, "Konqueror"]],
                        [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                        [p, [l, "IE"]],
                        [/yabrowser\/([\w\.]+)/i],
                        [p, [l, "Yandex"]],
                        [/(avast|avg)\/([\w\.]+)/i],
                        [
                            [l, /(.+)/, "$1 Secure " + k], p
                        ],
                        [/\bfocus\/([\w\.]+)/i],
                        [p, [l, S + " Focus"]],
                        [/\bopt\/([\w\.]+)/i],
                        [p, [l, R + " Touch"]],
                        [/coc_coc\w+\/([\w\.]+)/i],
                        [p, [l, "Coc Coc"]],
                        [/dolfin\/([\w\.]+)/i],
                        [p, [l, "Dolphin"]],
                        [/coast\/([\w\.]+)/i],
                        [p, [l, R + " Coast"]],
                        [/miuibrowser\/([\w\.]+)/i],
                        [p, [l, "MIUI " + k]],
                        [/fxios\/([-\w\.]+)/i],
                        [p, [l, S]],
                        [/\bqihu|(qi?ho?o?|360)browser/i],
                        [
                            [l, "360 " + k]
                        ],
                        [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                        [
                            [l, /(.+)/, "$1 " + k], p
                        ],
                        [/(comodo_dragon)\/([\w\.]+)/i],
                        [
                            [l, /_/g, " "], p
                        ],
                        [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],
                        [l, p],
                        [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i],
                        [l],
                        [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                        [
                            [l, B], p
                        ],
                        [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i],
                        [l, p],
                        [/\bgsa\/([\w\.]+) .*safari\//i],
                        [p, [l, "GSA"]],
                        [/headlesschrome(?:\/([\w\.]+)| )/i],
                        [p, [l, L + " Headless"]],
                        [/ wv\).+(chrome)\/([\w\.]+)/i],
                        [
                            [l, L + " WebView"], p
                        ],
                        [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                        [p, [l, "Android " + k]],
                        [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                        [l, p],
                        [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                        [p, [l, "Mobile Safari"]],
                        [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                        [p, l],
                        [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                        [l, [p, V, {
                            "1.0": "/8",
                            1.2: "/1",
                            1.3: "/3",
                            "2.0": "/412",
                            "2.0.2": "/416",
                            "2.0.3": "/417",
                            "2.0.4": "/419",
                            "?": "/"
                        }]],
                        [/(webkit|khtml)\/([\w\.]+)/i],
                        [l, p],
                        [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                        [
                            [l, "Netscape"], p
                        ],
                        [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                        [p, [l, S + " Reality"]],
                        [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i],
                        [l, p]
                    ],
                    cpu: [
                        [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                        [
                            [f, "amd64"]
                        ],
                        [/(ia32(?=;))/i],
                        [
                            [f, _]
                        ],
                        [/((?:i[346]|x)86)[;\)]/i],
                        [
                            [f, "ia32"]
                        ],
                        [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                        [
                            [f, "arm64"]
                        ],
                        [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                        [
                            [f, "armhf"]
                        ],
                        [/windows (ce|mobile); ppc;/i],
                        [
                            [f, "arm"]
                        ],
                        [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                        [
                            [f, /ower/, "", _]
                        ],
                        [/(sun4\w)[;\)]/i],
                        [
                            [f, "sparc"]
                        ],
                        [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],
                        [
                            [f, _]
                        ]
                    ],
                    device: [
                        [/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
                        [u, [d, j],
                            [c, m]
                        ],
                        [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i],
                        [u, [d, j],
                            [c, b]
                        ],
                        [/\((ip(?:hone|od)[\w ]*);/i],
                        [u, [d, E],
                            [c, b]
                        ],
                        [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i],
                        [u, [d, E],
                            [c, m]
                        ],
                        [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                        [u, [d, O],
                            [c, m]
                        ],
                        [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],
                        [u, [d, O],
                            [c, b]
                        ],
                        [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],
                        [
                            [u, /_/g, " "],
                            [d, M],
                            [c, b]
                        ],
                        [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                        [
                            [u, /_/g, " "],
                            [d, M],
                            [c, m]
                        ],
                        [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
                        [u, [d, "OPPO"],
                            [c, b]
                        ],
                        [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                        [u, [d, "Vivo"],
                            [c, b]
                        ],
                        [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                        [u, [d, "Realme"],
                            [c, b]
                        ],
                        [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],
                        [u, [d, N],
                            [c, b]
                        ],
                        [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                        [u, [d, N],
                            [c, m]
                        ],
                        [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
                        [u, [d, A],
                            [c, m]
                        ],
                        [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i],
                        [u, [d, A],
                            [c, b]
                        ],
                        [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],
                        [u, [d, "Lenovo"],
                            [c, m]
                        ],
                        [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
                        [
                            [u, /_/g, " "],
                            [d, "Nokia"],
                            [c, b]
                        ],
                        [/(pixel c)\b/i],
                        [u, [d, I],
                            [c, m]
                        ],
                        [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                        [u, [d, I],
                            [c, b]
                        ],
                        [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                        [u, [d, P],
                            [c, b]
                        ],
                        [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                        [
                            [u, "Xperia Tablet"],
                            [d, P],
                            [c, m]
                        ],
                        [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
                        [u, [d, "OnePlus"],
                            [c, b]
                        ],
                        [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i],
                        [u, [d, y],
                            [c, m]
                        ],
                        [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                        [
                            [u, /(.+)/g, "Fire Phone $1"],
                            [d, y],
                            [c, b]
                        ],
                        [/(playbook);[-\w\),; ]+(rim)/i],
                        [u, d, [c, m]],
                        [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                        [u, [d, T],
                            [c, b]
                        ],
                        [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
                        [u, [d, x],
                            [c, m]
                        ],
                        [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                        [u, [d, x],
                            [c, b]
                        ],
                        [/(nexus 9)/i],
                        [u, [d, "HTC"],
                            [c, m]
                        ],
                        [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i],
                        [d, [u, /_/g, " "],
                            [c, b]
                        ],
                        [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                        [u, [d, "Acer"],
                            [c, m]
                        ],
                        [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                        [u, [d, "Meizu"],
                            [c, b]
                        ],
                        [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                        [u, [d, D],
                            [c, b]
                        ],
                        [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i],
                        [d, u, [c, b]],
                        [/(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i],
                        [d, u, [c, m]],
                        [/(surface duo)/i],
                        [u, [d, C],
                            [c, m]
                        ],
                        [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                        [u, [d, "Fairphone"],
                            [c, b]
                        ],
                        [/(u304aa)/i],
                        [u, [d, "AT&T"],
                            [c, b]
                        ],
                        [/\bsie-(\w*)/i],
                        [u, [d, "Siemens"],
                            [c, b]
                        ],
                        [/\b(rct\w+) b/i],
                        [u, [d, "RCA"],
                            [c, m]
                        ],
                        [/\b(venue[\d ]{2,7}) b/i],
                        [u, [d, "Dell"],
                            [c, m]
                        ],
                        [/\b(q(?:mv|ta)\w+) b/i],
                        [u, [d, "Verizon"],
                            [c, m]
                        ],
                        [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                        [u, [d, "Barnes & Noble"],
                            [c, m]
                        ],
                        [/\b(tm\d{3}\w+) b/i],
                        [u, [d, "NuVision"],
                            [c, m]
                        ],
                        [/\b(k88) b/i],
                        [u, [d, "ZTE"],
                            [c, m]
                        ],
                        [/\b(nx\d{3}j) b/i],
                        [u, [d, "ZTE"],
                            [c, b]
                        ],
                        [/\b(gen\d{3}) b.+49h/i],
                        [u, [d, "Swiss"],
                            [c, b]
                        ],
                        [/\b(zur\d{3}) b/i],
                        [u, [d, "Swiss"],
                            [c, m]
                        ],
                        [/\b((zeki)?tb.*\b) b/i],
                        [u, [d, "Zeki"],
                            [c, m]
                        ],
                        [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                        [
                            [d, "Dragon Touch"], u, [c, m]
                        ],
                        [/\b(ns-?\w{0,9}) b/i],
                        [u, [d, "Insignia"],
                            [c, m]
                        ],
                        [/\b((nxa|next)-?\w{0,9}) b/i],
                        [u, [d, "NextBook"],
                            [c, m]
                        ],
                        [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                        [
                            [d, "Voice"], u, [c, b]
                        ],
                        [/\b(lvtel\-)?(v1[12]) b/i],
                        [
                            [d, "LvTel"], u, [c, b]
                        ],
                        [/\b(ph-1) /i],
                        [u, [d, "Essential"],
                            [c, b]
                        ],
                        [/\b(v(100md|700na|7011|917g).*\b) b/i],
                        [u, [d, "Envizen"],
                            [c, m]
                        ],
                        [/\b(trio[-\w\. ]+) b/i],
                        [u, [d, "MachSpeed"],
                            [c, m]
                        ],
                        [/\btu_(1491) b/i],
                        [u, [d, "Rotor"],
                            [c, m]
                        ],
                        [/(shield[\w ]+) b/i],
                        [u, [d, "Nvidia"],
                            [c, m]
                        ],
                        [/(sprint) (\w+)/i],
                        [d, u, [c, b]],
                        [/(kin\.[onetw]{3})/i],
                        [
                            [u, /\./g, " "],
                            [d, C],
                            [c, b]
                        ],
                        [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                        [u, [d, z],
                            [c, m]
                        ],
                        [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                        [u, [d, z],
                            [c, b]
                        ],
                        [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                        [d, u, [c, g]],
                        [/droid.+; (shield) bui/i],
                        [u, [d, "Nvidia"],
                            [c, g]
                        ],
                        [/(playstation [345portablevi]+)/i],
                        [u, [d, P],
                            [c, g]
                        ],
                        [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                        [u, [d, C],
                            [c, g]
                        ],
                        [/smart-tv.+(samsung)/i],
                        [d, [c, h]],
                        [/hbbtv.+maple;(\d+)/i],
                        [
                            [u, /^/, "SmartTV"],
                            [d, j],
                            [c, h]
                        ],
                        [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                        [
                            [d, A],
                            [c, h]
                        ],
                        [/(apple) ?tv/i],
                        [d, [u, E + " TV"],
                            [c, h]
                        ],
                        [/crkey/i],
                        [
                            [u, L + "cast"],
                            [d, I],
                            [c, h]
                        ],
                        [/droid.+aft(\w)( bui|\))/i],
                        [u, [d, y],
                            [c, h]
                        ],
                        [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                        [u, [d, D],
                            [c, h]
                        ],
                        [/(bravia[\w ]+)( bui|\))/i],
                        [u, [d, P],
                            [c, h]
                        ],
                        [/(mitv-\w{5}) bui/i],
                        [u, [d, M],
                            [c, h]
                        ],
                        [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i],
                        [
                            [d, U],
                            [u, U],
                            [c, h]
                        ],
                        [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                        [
                            [c, h]
                        ],
                        [/((pebble))app/i],
                        [d, u, [c, v]],
                        [/droid.+; (glass) \d/i],
                        [u, [d, I],
                            [c, v]
                        ],
                        [/droid.+; (wt63?0{2,3})\)/i],
                        [u, [d, z],
                            [c, v]
                        ],
                        [/(quest( 2)?)/i],
                        [u, [d, B],
                            [c, v]
                        ],
                        [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                        [d, [c, w]],
                        [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                        [u, [c, b]],
                        [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                        [u, [c, m]],
                        [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                        [
                            [c, m]
                        ],
                        [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
                        [
                            [c, b]
                        ],
                        [/(android[-\w\. ]{0,9});.+buil/i],
                        [u, [d, "Generic"]]
                    ],
                    engine: [
                        [/windows.+ edge\/([\w\.]+)/i],
                        [p, [l, "EdgeHTML"]],
                        [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                        [p, [l, "Blink"]],
                        [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i],
                        [l, p],
                        [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                        [p, l]
                    ],
                    os: [
                        [/microsoft (windows) (vista|xp)/i],
                        [l, p],
                        [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],
                        [l, [p, V, G]],
                        [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                        [
                            [l, "Windows"],
                            [p, V, G]
                        ],
                        [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i],
                        [
                            [p, /_/g, "."],
                            [l, "iOS"]
                        ],
                        [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
                        [
                            [l, "Mac OS"],
                            [p, /_/g, "."]
                        ],
                        [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                        [p, l],
                        [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i],
                        [l, p],
                        [/\(bb(10);/i],
                        [p, [l, T]],
                        [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                        [p, [l, "Symbian"]],
                        [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
                        [p, [l, S + " OS"]],
                        [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                        [p, [l, "webOS"]],
                        [/crkey\/([\d\.]+)/i],
                        [p, [l, L + "cast"]],
                        [/(cros) [\w]+ ([\w\.]+\w)/i],
                        [
                            [l, "Chromium OS"], p
                        ],
                        [/(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i],
                        [l, p],
                        [/(sunos) ?([\w\.\d]*)/i],
                        [
                            [l, "Solaris"], p
                        ],
                        [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i],
                        [l, p]
                    ]
                },
                K = function(e, n) {
                    if (typeof e === a && (n = e, e = i), !(this instanceof K)) return new K(e, n).getResult();
                    var r = e || (typeof t !== o && t.navigator && t.navigator.userAgent ? t.navigator.userAgent : ""),
                        g = n ? function(e, n) {
                            var t = {};
                            for (var i in e) n[i] && n[i].length % 2 == 0 ? t[i] = n[i].concat(e[i]) : t[i] = e[i];
                            return t
                        }(W, n) : W;
                    return this.getBrowser = function() {
                        var e, n = {};
                        return n[l] = i, n[p] = i, q.call(n, r, g.browser), n.major = typeof(e = n.version) === s ? e.replace(/[^\d\.]/g, "").split(".")[0] : i, n
                    }, this.getCPU = function() {
                        var e = {};
                        return e[f] = i, q.call(e, r, g.cpu), e
                    }, this.getDevice = function() {
                        var e = {};
                        return e[d] = i, e[u] = i, e[c] = i, q.call(e, r, g.device), e
                    }, this.getEngine = function() {
                        var e = {};
                        return e[l] = i, e[p] = i, q.call(e, r, g.engine), e
                    }, this.getOS = function() {
                        var e = {};
                        return e[l] = i, e[p] = i, q.call(e, r, g.os), e
                    }, this.getResult = function() {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU()
                        }
                    }, this.getUA = function() {
                        return r
                    }, this.setUA = function(e) {
                        return r = typeof e === s && e.length > 350 ? U(e, 350) : e, this
                    }, this.setUA(r), this
                };
            K.VERSION = "1.0.32", K.BROWSER = F([l, p, "major"]), K.CPU = F([f]), K.DEVICE = F([u, d, c, g, b, h, m, v, w]), K.ENGINE = K.OS = F([l, p]), e.exports && (n = e.exports = K), n.UAParser = K;
            var H = typeof t !== o && (t.jQuery || t.Zepto);
            if (H && !H.ua) {
                var X = new K;
                H.ua = X.getResult(), H.ua.get = function() {
                    return X.getUA()
                }, H.ua.set = function(e) {
                    X.setUA(e);
                    var n = X.getResult();
                    for (var t in n) H.ua[t] = n[t]
                }
            }
        }("object" == typeof window ? window : C)
    }(Cn, An);
    const Nn = () => {
            const e = new An.UAParser,
                {
                    name: n,
                    version: t
                } = e.getBrowser(),
                {
                    name: i,
                    version: r
                } = e.getOS(),
                o = e.getUA(),
                a = navigator.language,
                s = navigator.userAgent.includes("Mobi"),
                u = function() {
                    if (!n || !t) return;
                    if ("userAgentData" in navigator) return navigator.userAgentData.brands;
                    return
                }(),
                l = "unknown";
            return {
                browser: {
                    name: null != n ? n : l,
                    version: null != t ? t : l,
                    os: `${null!=i?i:l} ${null!=r?r:l}`,
                    userAgent: null != o ? o : l,
                    language: null != a ? a : l,
                    mobile: s,
                    brands: null != u ? u : l
                }
            }
        },
        Rn = () => ({
            page: {
                url: location.href
            }
        }),
        jn = [Nn, Rn];

    function Dn(e) {
        return {
            id: A(),
            attributes: e
        }
    }
    const Pn = {
        name: "default"
    };

    function Mn(e, n, t, i) {
        return new(t || (t = Promise))((function(r, o) {
            function a(e) {
                try {
                    u(i.next(e))
                } catch (e) {
                    o(e)
                }
            }

            function s(e) {
                try {
                    u(i.throw(e))
                } catch (e) {
                    o(e)
                }
            }

            function u(e) {
                var n;
                e.done ? r(e.value) : (n = e.value, n instanceof t ? n : new t((function(e) {
                    e(n)
                }))).then(a, s)
            }
            u((i = i.apply(e, n || [])).next())
        }))
    }
    class zn extends ee {
        constructor(e) {
            var n, t, i, r;
            super(), this.options = e, this.name = "@grafana/faro-web-sdk:transport-fetch", this.version = ue, this.disabledUntil = new Date, this.rateLimitBackoffMs = null !== (n = e.defaultRateLimitBackoffMs) && void 0 !== n ? n : 5e3, this.getNow = null !== (t = e.getNow) && void 0 !== t ? t : () => Date.now(), this.promiseBuffer = I({
                size: null !== (i = e.bufferSize) && void 0 !== i ? i : 30,
                concurrency: null !== (r = e.concurrency) && void 0 !== r ? r : 5
            })
        }
        send(e) {
            return Mn(this, void 0, void 0, (function*() {
                try {
                    if (this.disabledUntil > new Date(this.getNow())) return this.logWarn(`Dropping transport item due to too many requests. Backoff until ${this.disabledUntil}`), Promise.resolve();
                    yield this.promiseBuffer.add((() => {
                        const n = JSON.stringify(te(e)),
                            {
                                url: t,
                                requestOptions: i,
                                apiKey: r
                            } = this.options,
                            o = null != i ? i : {},
                            {
                                headers: a
                            } = o,
                            s = function(e, n) {
                                var t = {};
                                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && n.indexOf(i) < 0 && (t[i] = e[i]);
                                if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                                    var r = 0;
                                    for (i = Object.getOwnPropertySymbols(e); r < i.length; r++) n.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (t[i[r]] = e[i[r]])
                                }
                                return t
                            }(o, ["headers"]);
                        return fetch(t, Object.assign({
                            method: "POST",
                            headers: Object.assign(Object.assign({
                                "Content-Type": "application/json"
                            }, null != a ? a : {}), r ? {
                                "x-api-key": r
                            } : {}),
                            body: n,
                            keepalive: !0
                        }, null != s ? s : {})).then((e => (429 === e.status && (this.disabledUntil = this.getRetryAfterDate(e), this.logWarn(`Too many requests, backing off until ${this.disabledUntil}`)), e.text().catch(S), e))).catch((e => {
                            this.logError("Failed sending payload to the receiver\n", JSON.parse(n), e)
                        }))
                    }))
                } catch (e) {
                    this.logError(e)
                }
            }))
        }
        getIgnoreUrls() {
            return [this.options.url]
        }
        isBatched() {
            return !0
        }
        getRetryAfterDate(e) {
            const n = this.getNow(),
                t = e.headers.get("Retry-After");
            if (t) {
                const e = Number(t);
                if (!isNaN(e)) return new Date(1e3 * e + n);
                const i = Date.parse(t);
                if (!isNaN(i)) return new Date(i)
            }
            return new Date(n + this.rateLimitBackoffMs)
        }
    }

    function Bn(e) {
        var n, t, i, r, o, a, s, u, l, c, d;
        const p = [],
            f = Z(e.unpatchedConsole, e.internalLoggerLevel);
        return e.transports ? ((e.url || e.apiKey) && f.error('if "transports" is defined, "url" and "apiKey" should not be defined'), p.push(...e.transports)) : e.url ? p.push(new zn({
            url: e.url,
            apiKey: e.apiKey
        })) : f.error('either "url" or "transports" must be defined'), {
            app: e.app,
            batching: Object.assign(Object.assign({}, be), e.batching),
            dedupe: null === (n = e.dedupe) || void 0 === n || n,
            globalObjectKey: e.globalObjectKey || ge,
            instrumentations: null !== (t = e.instrumentations) && void 0 !== t ? t : In(),
            internalLoggerLevel: null !== (i = e.internalLoggerLevel) && void 0 !== i ? i : W,
            isolate: null !== (r = e.isolate) && void 0 !== r && r,
            metas: null !== (o = e.metas) && void 0 !== o ? o : jn,
            parseStacktrace: Re,
            paused: null !== (a = e.paused) && void 0 !== a && a,
            preventGlobalExposure: null !== (s = e.preventGlobalExposure) && void 0 !== s && s,
            transports: p,
            unpatchedConsole: null !== (u = e.unpatchedConsole) && void 0 !== u ? u : K,
            beforeSend: e.beforeSend,
            eventDomain: null !== (l = e.eventDomain) && void 0 !== l ? l : On,
            ignoreErrors: e.ignoreErrors,
            session: null !== (c = e.session) && void 0 !== c ? c : Dn(),
            user: e.user,
            view: null !== (d = e.view) && void 0 !== d ? d : Pn
        }
    }
    return e.BaseExtension = Y, e.BaseInstrumentation = se, e.BaseTransport = ee, e.ConsoleInstrumentation = ve, e.ConsoleTransport = class extends ee {
        constructor(e = {}) {
            super(), this.options = e, this.name = "@grafana/faro-web-sdk:transport-console", this.version = ue
        }
        send(n) {
            var t;
            return this.unpatchedConsole[null !== (t = this.options.level) && void 0 !== t ? t : e.LogLevel.DEBUG]("New event", te([n]))
        }
    }, e.Conventions = me, e.ErrorsInstrumentation = Pe, e.FetchTransport = zn, e.SessionInstrumentation = he, e.VERSION = ue, e.ViewInstrumentation = Me, e.WebVitalsInstrumentation = Sn, e.allLogLevels = L, e.browserMeta = Nn, e.buildStackFrame = Ae, e.createInternalLogger = Z, e.createPromiseBuffer = I, e.createSession = Dn, e.deepEqual = E, e.defaultEventDomain = On, e.defaultExceptionType = ie, e.defaultGlobalObjectKey = ge, e.defaultInternalLoggerLevel = W, e.defaultLogLevel = k, e.defaultMetas = jn, e.defaultViewMeta = Pn, e.genShortID = A, e.getCurrentTimestamp = x, e.getDataFromSafariExtensions = Ce, e.getInternalFaroFromGlobalObject = function() {
        return ae[le]
    }, e.getStackFramesFromError = Ne, e.getTransportBody = te, e.getWebInstrumentations = In, e.globalObject = ae, e.initializeFaro = function(e) {
        const n = Bn(e);
        if (n) return fe(n)
    }, e.internalGlobalObjectKey = le, e.isArray = c, e.isBoolean = e => n(e, "boolean"), e.isDomError = h, e.isDomException = v, e.isElement = e => w && i(e, Element), e.isElementDefined = w, e.isError = b, e.isErrorDefined = g, e.isErrorEvent = m, e.isEvent = f, e.isEventDefined = p, e.isFunction = l, e.isInstanceOf = i, e.isInt = e => s(e) && Number.isInteger(e), e.isInternalFaroOnGlobalObject = de, e.isMap = e => y && i(e, Map), e.isMapDefined = y, e.isNull = o, e.isNumber = s, e.isObject = u, e.isPrimitive = d, e.isRegExp = e => t(e, "RegExp"), e.isString = a, e.isSymbol = e => n(e, "symbol"), e.isSyntheticEvent = e => u(e) && "nativeEvent" in e && "preventDefault" in e && "stopPropagation" in e, e.isThenable = e => l(null == e ? void 0 : e.then), e.isToString = t, e.isTypeof = n, e.isUndefined = r, e.makeCoreConfig = Bn, e.noop = S, e.pageMeta = Rn, e.parseStacktrace = Re, e.setInternalFaroOnGlobalObject = ce, e.transportItemTypeToBodyKey = U, e
}({});