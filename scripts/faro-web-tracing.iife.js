var GrafanaFaroWebTracing = function(t, e) {
    "use strict";
    var n = "object" == typeof globalThis ? globalThis : "object" == typeof self ? self : "object" == typeof window ? window : "object" == typeof global ? global : {},
        r = "1.7.0",
        o = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
    var i = function(t) {
            var e = new Set([t]),
                n = new Set,
                r = t.match(o);
            if (!r) return function() {
                return !1
            };
            var i = +r[1],
                a = +r[2],
                s = +r[3];
            if (null != r[4]) return function(e) {
                return e === t
            };

            function u(t) {
                return n.add(t), !1
            }

            function c(t) {
                return e.add(t), !0
            }
            return function(t) {
                if (e.has(t)) return !0;
                if (n.has(t)) return !1;
                var r = t.match(o);
                if (!r) return u(t);
                var l = +r[1],
                    p = +r[2],
                    f = +r[3];
                return null != r[4] || i !== l ? u(t) : 0 === i ? a === p && s <= f ? c(t) : u(t) : a <= p ? c(t) : u(t)
            }
        }(r),
        a = r.split(".")[0],
        s = Symbol.for("opentelemetry.js.api." + a),
        u = n;

    function c(t, e, n, o) {
        var i;
        void 0 === o && (o = !1);
        var a = u[s] = null !== (i = u[s]) && void 0 !== i ? i : {
            version: r
        };
        if (!o && a[t]) {
            var c = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + t);
            return n.error(c.stack || c.message), !1
        }
        if (a.version !== r) {
            c = new Error("@opentelemetry/api: Registration of version v" + a.version + " for " + t + " does not match previously registered API v" + r);
            return n.error(c.stack || c.message), !1
        }
        return a[t] = e, n.debug("@opentelemetry/api: Registered a global for " + t + " v" + r + "."), !0
    }

    function l(t) {
        var e, n, r = null === (e = u[s]) || void 0 === e ? void 0 : e.version;
        if (r && i(r)) return null === (n = u[s]) || void 0 === n ? void 0 : n[t]
    }

    function p(t, e) {
        e.debug("@opentelemetry/api: Unregistering a global for " + t + " v" + r + ".");
        var n = u[s];
        n && delete n[t]
    }
    var f, h = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        },
        _ = function(t, e, n) {
            if (n || 2 === arguments.length)
                for (var r, o = 0, i = e.length; o < i; o++) !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
            return t.concat(r || Array.prototype.slice.call(e))
        },
        d = function() {
            function t(t) {
                this._namespace = t.namespace || "DiagComponentLogger"
            }
            return t.prototype.debug = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return v("debug", this._namespace, t)
            }, t.prototype.error = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return v("error", this._namespace, t)
            }, t.prototype.info = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return v("info", this._namespace, t)
            }, t.prototype.warn = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return v("warn", this._namespace, t)
            }, t.prototype.verbose = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return v("verbose", this._namespace, t)
            }, t
        }();

    function v(t, e, n) {
        var r = l("diag");
        if (r) return n.unshift(e), r[t].apply(r, _([], h(n), !1))
    }! function(t) {
        t[t.NONE = 0] = "NONE", t[t.ERROR = 30] = "ERROR", t[t.WARN = 50] = "WARN", t[t.INFO = 60] = "INFO", t[t.DEBUG = 70] = "DEBUG", t[t.VERBOSE = 80] = "VERBOSE", t[t.ALL = 9999] = "ALL"
    }(f || (f = {}));
    var E = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        },
        y = function(t, e, n) {
            if (n || 2 === arguments.length)
                for (var r, o = 0, i = e.length; o < i; o++) !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
            return t.concat(r || Array.prototype.slice.call(e))
        },
        T = function() {
            function t() {
                function t(t) {
                    return function() {
                        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                        var r = l("diag");
                        if (r) return r[t].apply(r, y([], E(e), !1))
                    }
                }
                var e = this;
                e.setLogger = function(t, n) {
                    var r, o, i;
                    if (void 0 === n && (n = {
                            logLevel: f.INFO
                        }), t === e) {
                        var a = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                        return e.error(null !== (r = a.stack) && void 0 !== r ? r : a.message), !1
                    }
                    "number" == typeof n && (n = {
                        logLevel: n
                    });
                    var s = l("diag"),
                        u = function(t, e) {
                            function n(n, r) {
                                var o = e[n];
                                return "function" == typeof o && t >= r ? o.bind(e) : function() {}
                            }
                            return t < f.NONE ? t = f.NONE : t > f.ALL && (t = f.ALL), e = e || {}, {
                                error: n("error", f.ERROR),
                                warn: n("warn", f.WARN),
                                info: n("info", f.INFO),
                                debug: n("debug", f.DEBUG),
                                verbose: n("verbose", f.VERBOSE)
                            }
                        }(null !== (o = n.logLevel) && void 0 !== o ? o : f.INFO, t);
                    if (s && !n.suppressOverrideMessage) {
                        var p = null !== (i = (new Error).stack) && void 0 !== i ? i : "<failed to generate stacktrace>";
                        s.warn("Current logger will be overwritten from " + p), u.warn("Current logger will overwrite one already registered from " + p)
                    }
                    return c("diag", u, e, !0)
                }, e.disable = function() {
                    p("diag", e)
                }, e.createComponentLogger = function(t) {
                    return new d(t)
                }, e.verbose = t("verbose"), e.debug = t("debug"), e.info = t("info"), e.warn = t("warn"), e.error = t("error")
            }
            return t.instance = function() {
                return this._instance || (this._instance = new t), this._instance
            }, t
        }(),
        g = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        },
        m = function(t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length) return {
                next: function() {
                    return t && r >= t.length && (t = void 0), {
                        value: t && t[r++],
                        done: !t
                    }
                }
            };
            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
        },
        O = function() {
            function t(t) {
                this._entries = t ? new Map(t) : new Map
            }
            return t.prototype.getEntry = function(t) {
                var e = this._entries.get(t);
                if (e) return Object.assign({}, e)
            }, t.prototype.getAllEntries = function() {
                return Array.from(this._entries.entries()).map((function(t) {
                    var e = g(t, 2);
                    return [e[0], e[1]]
                }))
            }, t.prototype.setEntry = function(e, n) {
                var r = new t(this._entries);
                return r._entries.set(e, n), r
            }, t.prototype.removeEntry = function(e) {
                var n = new t(this._entries);
                return n._entries.delete(e), n
            }, t.prototype.removeEntries = function() {
                for (var e, n, r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];
                var i = new t(this._entries);
                try {
                    for (var a = m(r), s = a.next(); !s.done; s = a.next()) {
                        var u = s.value;
                        i._entries.delete(u)
                    }
                } catch (t) {
                    e = {
                        error: t
                    }
                } finally {
                    try {
                        s && !s.done && (n = a.return) && n.call(a)
                    } finally {
                        if (e) throw e.error
                    }
                }
                return i
            }, t.prototype.clear = function() {
                return new t
            }, t
        }(),
        S = Symbol("BaggageEntryMetadata"),
        b = T.instance();

    function R(t) {
        return void 0 === t && (t = {}), new O(new Map(Object.entries(t)))
    }

    function L(t) {
        return Symbol.for(t)
    }
    var w, P, A = function t(e) {
            var n = this;
            n._currentContext = e ? new Map(e) : new Map, n.getValue = function(t) {
                return n._currentContext.get(t)
            }, n.setValue = function(e, r) {
                var o = new t(n._currentContext);
                return o._currentContext.set(e, r), o
            }, n.deleteValue = function(e) {
                var r = new t(n._currentContext);
                return r._currentContext.delete(e), r
            }
        },
        C = new A,
        k = (w = function(t, e) {
            return w = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
            }, w(t, e)
        }, function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function n() {
                this.constructor = t
            }
            w(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
        }),
        N = function() {
            function t() {}
            return t.prototype.createHistogram = function(t, e) {
                return z
            }, t.prototype.createCounter = function(t, e) {
                return H
            }, t.prototype.createUpDownCounter = function(t, e) {
                return V
            }, t.prototype.createObservableGauge = function(t, e) {
                return G
            }, t.prototype.createObservableCounter = function(t, e) {
                return X
            }, t.prototype.createObservableUpDownCounter = function(t, e) {
                return q
            }, t.prototype.addBatchObservableCallback = function(t, e) {}, t.prototype.removeBatchObservableCallback = function(t) {}, t
        }(),
        I = function() {},
        D = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return k(e, t), e.prototype.add = function(t, e) {}, e
        }(I),
        x = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return k(e, t), e.prototype.add = function(t, e) {}, e
        }(I),
        M = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return k(e, t), e.prototype.record = function(t, e) {}, e
        }(I),
        U = function() {
            function t() {}
            return t.prototype.addCallback = function(t) {}, t.prototype.removeCallback = function(t) {}, t
        }(),
        j = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return k(e, t), e
        }(U),
        B = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return k(e, t), e
        }(U),
        Z = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return k(e, t), e
        }(U),
        F = new N,
        H = new D,
        z = new M,
        V = new x,
        X = new j,
        G = new B,
        q = new Z,
        W = {
            get: function(t, e) {
                if (null != t) return t[e]
            },
            keys: function(t) {
                return null == t ? [] : Object.keys(t)
            }
        },
        K = {
            set: function(t, e, n) {
                null != t && (t[e] = n)
            }
        },
        Y = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        },
        Q = function(t, e, n) {
            if (n || 2 === arguments.length)
                for (var r, o = 0, i = e.length; o < i; o++) !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
            return t.concat(r || Array.prototype.slice.call(e))
        },
        $ = function() {
            function t() {}
            return t.prototype.active = function() {
                return C
            }, t.prototype.with = function(t, e, n) {
                for (var r = [], o = 3; o < arguments.length; o++) r[o - 3] = arguments[o];
                return e.call.apply(e, Q([n], Y(r), !1))
            }, t.prototype.bind = function(t, e) {
                return e
            }, t.prototype.enable = function() {
                return this
            }, t.prototype.disable = function() {
                return this
            }, t
        }(),
        J = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        },
        tt = function(t, e, n) {
            if (n || 2 === arguments.length)
                for (var r, o = 0, i = e.length; o < i; o++) !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
            return t.concat(r || Array.prototype.slice.call(e))
        },
        et = "context",
        nt = new $,
        rt = function() {
            function t() {}
            return t.getInstance = function() {
                return this._instance || (this._instance = new t), this._instance
            }, t.prototype.setGlobalContextManager = function(t) {
                return c(et, t, T.instance())
            }, t.prototype.active = function() {
                return this._getContextManager().active()
            }, t.prototype.with = function(t, e, n) {
                for (var r, o = [], i = 3; i < arguments.length; i++) o[i - 3] = arguments[i];
                return (r = this._getContextManager()).with.apply(r, tt([t, e, n], J(o), !1))
            }, t.prototype.bind = function(t, e) {
                return this._getContextManager().bind(t, e)
            }, t.prototype._getContextManager = function() {
                return l(et) || nt
            }, t.prototype.disable = function() {
                this._getContextManager().disable(), p(et, T.instance())
            }, t
        }();
    ! function(t) {
        t[t.NONE = 0] = "NONE", t[t.SAMPLED = 1] = "SAMPLED"
    }(P || (P = {}));
    var ot = "0000000000000000",
        it = "00000000000000000000000000000000",
        at = {
            traceId: it,
            spanId: ot,
            traceFlags: P.NONE
        },
        st = function() {
            function t(t) {
                void 0 === t && (t = at), this._spanContext = t
            }
            return t.prototype.spanContext = function() {
                return this._spanContext
            }, t.prototype.setAttribute = function(t, e) {
                return this
            }, t.prototype.setAttributes = function(t) {
                return this
            }, t.prototype.addEvent = function(t, e) {
                return this
            }, t.prototype.setStatus = function(t) {
                return this
            }, t.prototype.updateName = function(t) {
                return this
            }, t.prototype.end = function(t) {}, t.prototype.isRecording = function() {
                return !1
            }, t.prototype.recordException = function(t, e) {}, t
        }(),
        ut = L("OpenTelemetry Context Key SPAN");

    function ct(t) {
        return t.getValue(ut) || void 0
    }

    function lt() {
        return ct(rt.getInstance().active())
    }

    function pt(t, e) {
        return t.setValue(ut, e)
    }

    function ft(t) {
        return t.deleteValue(ut)
    }

    function ht(t, e) {
        return pt(t, new st(e))
    }

    function _t(t) {
        var e;
        return null === (e = ct(t)) || void 0 === e ? void 0 : e.spanContext()
    }
    var dt = /^([0-9a-f]{32})$/i,
        vt = /^[0-9a-f]{16}$/i;

    function Et(t) {
        return dt.test(t) && t !== it
    }

    function yt(t) {
        return Et(t.traceId) && (e = t.spanId, vt.test(e) && e !== ot);
        var e
    }

    function Tt(t) {
        return new st(t)
    }
    var gt = rt.getInstance(),
        mt = function() {
            function t() {}
            return t.prototype.startSpan = function(t, e, n) {
                if (void 0 === n && (n = gt.active()), Boolean(null == e ? void 0 : e.root)) return new st;
                var r, o = n && _t(n);
                return "object" == typeof(r = o) && "string" == typeof r.spanId && "string" == typeof r.traceId && "number" == typeof r.traceFlags && yt(o) ? new st(o) : new st
            }, t.prototype.startActiveSpan = function(t, e, n, r) {
                var o, i, a;
                if (!(arguments.length < 2)) {
                    2 === arguments.length ? a = e : 3 === arguments.length ? (o = e, a = n) : (o = e, i = n, a = r);
                    var s = null != i ? i : gt.active(),
                        u = this.startSpan(t, o, s),
                        c = pt(s, u);
                    return gt.with(c, a, void 0, u)
                }
            }, t
        }();
    var Ot, St, bt, Rt = new mt,
        Lt = function() {
            function t(t, e, n, r) {
                this._provider = t, this.name = e, this.version = n, this.options = r
            }
            return t.prototype.startSpan = function(t, e, n) {
                return this._getTracer().startSpan(t, e, n)
            }, t.prototype.startActiveSpan = function(t, e, n, r) {
                var o = this._getTracer();
                return Reflect.apply(o.startActiveSpan, o, arguments)
            }, t.prototype._getTracer = function() {
                if (this._delegate) return this._delegate;
                var t = this._provider.getDelegateTracer(this.name, this.version, this.options);
                return t ? (this._delegate = t, this._delegate) : Rt
            }, t
        }(),
        wt = new(function() {
            function t() {}
            return t.prototype.getTracer = function(t, e, n) {
                return new mt
            }, t
        }()),
        Pt = function() {
            function t() {}
            return t.prototype.getTracer = function(t, e, n) {
                var r;
                return null !== (r = this.getDelegateTracer(t, e, n)) && void 0 !== r ? r : new Lt(this, t, e, n)
            }, t.prototype.getDelegate = function() {
                var t;
                return null !== (t = this._delegate) && void 0 !== t ? t : wt
            }, t.prototype.setDelegate = function(t) {
                this._delegate = t
            }, t.prototype.getDelegateTracer = function(t, e, n) {
                var r;
                return null === (r = this._delegate) || void 0 === r ? void 0 : r.getTracer(t, e, n)
            }, t
        }();
    ! function(t) {
        t[t.NOT_RECORD = 0] = "NOT_RECORD", t[t.RECORD = 1] = "RECORD", t[t.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED"
    }(Ot || (Ot = {})),
    function(t) {
        t[t.INTERNAL = 0] = "INTERNAL", t[t.SERVER = 1] = "SERVER", t[t.CLIENT = 2] = "CLIENT", t[t.PRODUCER = 3] = "PRODUCER", t[t.CONSUMER = 4] = "CONSUMER"
    }(St || (St = {})),
    function(t) {
        t[t.UNSET = 0] = "UNSET", t[t.OK = 1] = "OK", t[t.ERROR = 2] = "ERROR"
    }(bt || (bt = {}));
    var At = rt.getInstance(),
        Ct = T.instance(),
        kt = new(function() {
            function t() {}
            return t.prototype.getMeter = function(t, e, n) {
                return F
            }, t
        }()),
        Nt = "metrics",
        It = function() {
            function t() {}
            return t.getInstance = function() {
                return this._instance || (this._instance = new t), this._instance
            }, t.prototype.setGlobalMeterProvider = function(t) {
                return c(Nt, t, T.instance())
            }, t.prototype.getMeterProvider = function() {
                return l(Nt) || kt
            }, t.prototype.getMeter = function(t, e, n) {
                return this.getMeterProvider().getMeter(t, e, n)
            }, t.prototype.disable = function() {
                p(Nt, T.instance())
            }, t
        }().getInstance(),
        Dt = function() {
            function t() {}
            return t.prototype.inject = function(t, e) {}, t.prototype.extract = function(t, e) {
                return t
            }, t.prototype.fields = function() {
                return []
            }, t
        }(),
        xt = L("OpenTelemetry Baggage Key");

    function Mt(t) {
        return t.getValue(xt) || void 0
    }

    function Ut() {
        return Mt(rt.getInstance().active())
    }

    function jt(t, e) {
        return t.setValue(xt, e)
    }

    function Bt(t) {
        return t.deleteValue(xt)
    }
    var Zt = "propagation",
        Ft = new Dt,
        Ht = function() {
            function t() {
                this.createBaggage = R, this.getBaggage = Mt, this.getActiveBaggage = Ut, this.setBaggage = jt, this.deleteBaggage = Bt
            }
            return t.getInstance = function() {
                return this._instance || (this._instance = new t), this._instance
            }, t.prototype.setGlobalPropagator = function(t) {
                return c(Zt, t, T.instance())
            }, t.prototype.inject = function(t, e, n) {
                return void 0 === n && (n = K), this._getGlobalPropagator().inject(t, e, n)
            }, t.prototype.extract = function(t, e, n) {
                return void 0 === n && (n = W), this._getGlobalPropagator().extract(t, e, n)
            }, t.prototype.fields = function() {
                return this._getGlobalPropagator().fields()
            }, t.prototype.disable = function() {
                p(Zt, T.instance())
            }, t.prototype._getGlobalPropagator = function() {
                return l(Zt) || Ft
            }, t
        }(),
        zt = Ht.getInstance(),
        Vt = "trace",
        Xt = function() {
            function t() {
                this._proxyTracerProvider = new Pt, this.wrapSpanContext = Tt, this.isSpanContextValid = yt, this.deleteSpan = ft, this.getSpan = ct, this.getActiveSpan = lt, this.getSpanContext = _t, this.setSpan = pt, this.setSpanContext = ht
            }
            return t.getInstance = function() {
                return this._instance || (this._instance = new t), this._instance
            }, t.prototype.setGlobalTracerProvider = function(t) {
                var e = c(Vt, this._proxyTracerProvider, T.instance());
                return e && this._proxyTracerProvider.setDelegate(t), e
            }, t.prototype.getTracerProvider = function() {
                return l(Vt) || this._proxyTracerProvider
            }, t.prototype.getTracer = function(t, e) {
                return this.getTracerProvider().getTracer(t, e)
            }, t.prototype.disable = function() {
                p(Vt, T.instance()), this._proxyTracerProvider = new Pt
            }, t
        }().getInstance(),
        Gt = L("OpenTelemetry SDK Context Key SUPPRESS_TRACING");

    function qt(t) {
        return !0 === t.getValue(Gt)
    }
    var Wt = "baggage",
        Kt = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        };

    function Yt(t) {
        var e = t.split(";");
        if (!(e.length <= 0)) {
            var n = e.shift();
            if (n) {
                var r = n.indexOf("=");
                if (!(r <= 0)) {
                    var o, i, a = decodeURIComponent(n.substring(0, r).trim()),
                        s = decodeURIComponent(n.substring(r + 1).trim());
                    return e.length > 0 && ("string" != typeof(i = e.join(";")) && (b.error("Cannot create baggage metadata from unknown type: " + typeof i), i = ""), o = {
                        __TYPE__: S,
                        toString: function() {
                            return i
                        }
                    }), {
                        key: a,
                        value: s,
                        metadata: o
                    }
                }
            }
        }
    }
    var Qt = function() {
            function t() {}
            return t.prototype.inject = function(t, e, n) {
                var r = zt.getBaggage(t);
                if (r && !qt(t)) {
                    var o = function(t) {
                            return t.getAllEntries().map((function(t) {
                                var e = Kt(t, 2),
                                    n = e[0],
                                    r = e[1],
                                    o = encodeURIComponent(n) + "=" + encodeURIComponent(r.value);
                                return void 0 !== r.metadata && (o += ";" + r.metadata.toString()), o
                            }))
                        }(r).filter((function(t) {
                            return t.length <= 4096
                        })).slice(0, 180),
                        i = function(t) {
                            return t.reduce((function(t, e) {
                                var n = t + ("" !== t ? "," : "") + e;
                                return n.length > 8192 ? t : n
                            }), "")
                        }(o);
                    i.length > 0 && n.set(e, Wt, i)
                }
            }, t.prototype.extract = function(t, e, n) {
                var r = n.get(e, Wt),
                    o = Array.isArray(r) ? r.join(",") : r;
                if (!o) return t;
                var i = {};
                return 0 === o.length ? t : (o.split(",").forEach((function(t) {
                    var e = Yt(t);
                    if (e) {
                        var n = {
                            value: e.value
                        };
                        e.metadata && (n.metadata = e.metadata), i[e.key] = n
                    }
                })), 0 === Object.entries(i).length ? t : zt.setBaggage(t, zt.createBaggage(i)))
            }, t.prototype.fields = function() {
                return [Wt]
            }, t
        }(),
        $t = function(t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length) return {
                next: function() {
                    return t && r >= t.length && (t = void 0), {
                        value: t && t[r++],
                        done: !t
                    }
                }
            };
            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
        },
        Jt = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        };

    function te(t) {
        var e, n, r = {};
        if ("object" != typeof t || null == t) return r;
        try {
            for (var o = $t(Object.entries(t)), i = o.next(); !i.done; i = o.next()) {
                var a = Jt(i.value, 2),
                    s = a[0],
                    u = a[1];
                ee(s) ? ne(u) ? Array.isArray(u) ? r[s] = u.slice() : r[s] = u : Ct.warn("Invalid attribute value set for key: " + s) : Ct.warn("Invalid attribute key: " + s)
            }
        } catch (t) {
            e = {
                error: t
            }
        } finally {
            try {
                i && !i.done && (n = o.return) && n.call(o)
            } finally {
                if (e) throw e.error
            }
        }
        return r
    }

    function ee(t) {
        return "string" == typeof t && t.length > 0
    }

    function ne(t) {
        return null == t || (Array.isArray(t) ? function(t) {
            var e, n, r;
            try {
                for (var o = $t(t), i = o.next(); !i.done; i = o.next()) {
                    var a = i.value;
                    if (null != a) {
                        if (!r) {
                            if (re(a)) {
                                r = typeof a;
                                continue
                            }
                            return !1
                        }
                        if (typeof a !== r) return !1
                    }
                }
            } catch (t) {
                e = {
                    error: t
                }
            } finally {
                try {
                    i && !i.done && (n = o.return) && n.call(o)
                } finally {
                    if (e) throw e.error
                }
            }
            return !0
        }(t) : re(t))
    }

    function re(t) {
        switch (typeof t) {
            case "number":
            case "boolean":
            case "string":
                return !0
        }
        return !1
    }
    var oe, ie = function(t) {
        Ct.error(function(t) {
            return "string" == typeof t ? t : JSON.stringify(function(t) {
                for (var e = {}, n = t; null !== n;) Object.getOwnPropertyNames(n).forEach((function(t) {
                    if (!e[t]) {
                        var r = n[t];
                        r && (e[t] = String(r))
                    }
                })), n = Object.getPrototypeOf(n);
                return e
            }(t))
        }(t))
    };

    function ae(t) {
        try {
            ie(t)
        } catch (t) {}
    }! function(t) {
        t.AlwaysOff = "always_off", t.AlwaysOn = "always_on", t.ParentBasedAlwaysOff = "parentbased_always_off", t.ParentBasedAlwaysOn = "parentbased_always_on", t.ParentBasedTraceIdRatio = "parentbased_traceidratio", t.TraceIdRatio = "traceidratio"
    }(oe || (oe = {}));
    var se = "object" == typeof globalThis ? globalThis : "object" == typeof self ? self : "object" == typeof window ? window : "object" == typeof global ? global : {},
        ue = ["OTEL_SDK_DISABLED"];

    function ce(t) {
        return ue.indexOf(t) > -1
    }
    var le = ["OTEL_BSP_EXPORT_TIMEOUT", "OTEL_BSP_MAX_EXPORT_BATCH_SIZE", "OTEL_BSP_MAX_QUEUE_SIZE", "OTEL_BSP_SCHEDULE_DELAY", "OTEL_BLRP_EXPORT_TIMEOUT", "OTEL_BLRP_MAX_EXPORT_BATCH_SIZE", "OTEL_BLRP_MAX_QUEUE_SIZE", "OTEL_BLRP_SCHEDULE_DELAY", "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT", "OTEL_ATTRIBUTE_COUNT_LIMIT", "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT", "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT", "OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT", "OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT", "OTEL_SPAN_EVENT_COUNT_LIMIT", "OTEL_SPAN_LINK_COUNT_LIMIT", "OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT", "OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT", "OTEL_EXPORTER_OTLP_TIMEOUT", "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT", "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT", "OTEL_EXPORTER_OTLP_LOGS_TIMEOUT", "OTEL_EXPORTER_JAEGER_AGENT_PORT"];

    function pe(t) {
        return le.indexOf(t) > -1
    }
    var fe = ["OTEL_NO_PATCH_MODULES", "OTEL_PROPAGATORS"];

    function he(t) {
        return fe.indexOf(t) > -1
    }
    var _e = 1 / 0,
        de = 128,
        ve = {
            OTEL_SDK_DISABLED: !1,
            CONTAINER_NAME: "",
            ECS_CONTAINER_METADATA_URI_V4: "",
            ECS_CONTAINER_METADATA_URI: "",
            HOSTNAME: "",
            KUBERNETES_SERVICE_HOST: "",
            NAMESPACE: "",
            OTEL_BSP_EXPORT_TIMEOUT: 3e4,
            OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
            OTEL_BSP_MAX_QUEUE_SIZE: 2048,
            OTEL_BSP_SCHEDULE_DELAY: 5e3,
            OTEL_BLRP_EXPORT_TIMEOUT: 3e4,
            OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
            OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
            OTEL_BLRP_SCHEDULE_DELAY: 5e3,
            OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
            OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
            OTEL_EXPORTER_JAEGER_ENDPOINT: "",
            OTEL_EXPORTER_JAEGER_PASSWORD: "",
            OTEL_EXPORTER_JAEGER_USER: "",
            OTEL_EXPORTER_OTLP_ENDPOINT: "",
            OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
            OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
            OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
            OTEL_EXPORTER_OTLP_HEADERS: "",
            OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
            OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
            OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
            OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
            OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
            OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
            OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 1e4,
            OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
            OTEL_LOG_LEVEL: f.INFO,
            OTEL_NO_PATCH_MODULES: [],
            OTEL_PROPAGATORS: ["tracecontext", "baggage"],
            OTEL_RESOURCE_ATTRIBUTES: "",
            OTEL_SERVICE_NAME: "",
            OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: _e,
            OTEL_ATTRIBUTE_COUNT_LIMIT: de,
            OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: _e,
            OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: de,
            OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: _e,
            OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: de,
            OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
            OTEL_SPAN_LINK_COUNT_LIMIT: 128,
            OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: 128,
            OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: 128,
            OTEL_TRACES_EXPORTER: "",
            OTEL_TRACES_SAMPLER: oe.ParentBasedAlwaysOn,
            OTEL_TRACES_SAMPLER_ARG: "",
            OTEL_LOGS_EXPORTER: "",
            OTEL_EXPORTER_OTLP_INSECURE: "",
            OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
            OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
            OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
            OTEL_EXPORTER_OTLP_CERTIFICATE: "",
            OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
            OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
            OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
            OTEL_EXPORTER_OTLP_COMPRESSION: "",
            OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
            OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
            OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
            OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
            OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
            OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
            OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
            OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
            OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
            OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
            OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
            OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
            OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
            OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
            OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
            OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative"
        };

    function Ee(t, e, n) {
        if (void 0 !== n[t]) {
            var r = String(n[t]);
            e[t] = "true" === r.toLowerCase()
        }
    }

    function ye(t, e, n, r, o) {
        if (void 0 === r && (r = -1 / 0), void 0 === o && (o = 1 / 0), void 0 !== n[t]) {
            var i = Number(n[t]);
            isNaN(i) || (e[t] = i < r ? r : i > o ? o : i)
        }
    }

    function Te(t, e, n, r) {
        void 0 === r && (r = ",");
        var o = n[t];
        "string" == typeof o && (e[t] = o.split(r).map((function(t) {
            return t.trim()
        })))
    }
    var ge = {
        ALL: f.ALL,
        VERBOSE: f.VERBOSE,
        DEBUG: f.DEBUG,
        INFO: f.INFO,
        WARN: f.WARN,
        ERROR: f.ERROR,
        NONE: f.NONE
    };

    function me(t, e, n) {
        var r = n[t];
        if ("string" == typeof r) {
            var o = ge[r.toUpperCase()];
            null != o && (e[t] = o)
        }
    }

    function Oe(t) {
        var e = {};
        for (var n in ve) {
            var r = n;
            if ("OTEL_LOG_LEVEL" === r) me(r, e, t);
            else if (ce(r)) Ee(r, e, t);
            else if (pe(r)) ye(r, e, t);
            else if (he(r)) Te(r, e, t);
            else {
                var o = t[r];
                null != o && (e[r] = String(o))
            }
        }
        return e
    }

    function Se() {
        var t = Oe(se);
        return Object.assign({}, ve, t)
    }

    function be(t) {
        return t >= 48 && t <= 57 ? t - 48 : t >= 97 && t <= 102 ? t - 87 : t - 55
    }

    function Re(t) {
        for (var e = new Uint8Array(t.length / 2), n = 0, r = 0; r < t.length; r += 2) {
            var o = be(t.charCodeAt(r)),
                i = be(t.charCodeAt(r + 1));
            e[n++] = o << 4 | i
        }
        return e
    }
    var Le, we = performance,
        Pe = "exception.type",
        Ae = "exception.message",
        Ce = "exception.stacktrace",
        ke = "http.method",
        Ne = "http.url",
        Ie = "http.host",
        De = "http.scheme",
        xe = "http.status_code",
        Me = "http.user_agent",
        Ue = "http.response_content_length",
        je = "http.response_content_length_uncompressed",
        Be = "deployment.environment",
        Ze = "process.runtime.name",
        Fe = "service.name",
        He = "service.version",
        ze = "telemetry.sdk.name",
        Ve = "telemetry.sdk.language",
        Xe = "telemetry.sdk.version",
        Ge = ((Le = {})[ze] = "opentelemetry", Le[Ze] = "browser", Le[Ve] = "webjs", Le[Xe] = "1.21.0", Le);
    var qe, We = Math.pow(10, 6),
        Ke = Math.pow(10, 9);

    function Ye(t) {
        var e = t / 1e3;
        return [Math.trunc(e), Math.round(t % 1e3 * We)]
    }

    function Qe() {
        var t = we.timeOrigin;
        if ("number" != typeof t) {
            var e = we;
            t = e.timing && e.timing.fetchStart
        }
        return t
    }

    function $e(t) {
        return rn(Ye(Qe()), Ye("number" == typeof t ? t : we.now()))
    }

    function Je(t) {
        if (en(t)) return t;
        if ("number" == typeof t) return t < Qe() ? $e(t) : Ye(t);
        if (t instanceof Date) return Ye(t.getTime());
        throw TypeError("Invalid input type")
    }

    function tn(t) {
        return t[0] * Ke + t[1]
    }

    function en(t) {
        return Array.isArray(t) && 2 === t.length && "number" == typeof t[0] && "number" == typeof t[1]
    }

    function nn(t) {
        return en(t) || "number" == typeof t || t instanceof Date
    }

    function rn(t, e) {
        var n = [t[0] + e[0], t[1] + e[1]];
        return n[1] >= Ke && (n[1] -= Ke, n[0] += 1), n
    }! function(t) {
        t[t.SUCCESS = 0] = "SUCCESS", t[t.FAILED = 1] = "FAILED"
    }(qe || (qe = {}));
    var on = function(t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length) return {
                next: function() {
                    return t && r >= t.length && (t = void 0), {
                        value: t && t[r++],
                        done: !t
                    }
                }
            };
            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
        },
        an = function() {
            function t(t) {
                var e;
                void 0 === t && (t = {}), this._propagators = null !== (e = t.propagators) && void 0 !== e ? e : [], this._fields = Array.from(new Set(this._propagators.map((function(t) {
                    return "function" == typeof t.fields ? t.fields() : []
                })).reduce((function(t, e) {
                    return t.concat(e)
                }), [])))
            }
            return t.prototype.inject = function(t, e, n) {
                var r, o;
                try {
                    for (var i = on(this._propagators), a = i.next(); !a.done; a = i.next()) {
                        var s = a.value;
                        try {
                            s.inject(t, e, n)
                        } catch (t) {
                            Ct.warn("Failed to inject with " + s.constructor.name + ". Err: " + t.message)
                        }
                    }
                } catch (t) {
                    r = {
                        error: t
                    }
                } finally {
                    try {
                        a && !a.done && (o = i.return) && o.call(i)
                    } finally {
                        if (r) throw r.error
                    }
                }
            }, t.prototype.extract = function(t, e, n) {
                return this._propagators.reduce((function(t, r) {
                    try {
                        return r.extract(t, e, n)
                    } catch (t) {
                        Ct.warn("Failed to inject with " + r.constructor.name + ". Err: " + t.message)
                    }
                    return t
                }), t)
            }, t.prototype.fields = function() {
                return this._fields.slice()
            }, t
        }(),
        sn = "[_0-9a-z-*/]",
        un = new RegExp("^(?:" + ("[a-z]" + sn + "{0,255}") + "|" + ("[a-z0-9]" + sn + "{0,240}@[a-z]" + sn + "{0,13}") + ")$"),
        cn = /^[ -~]{0,255}[!-~]$/,
        ln = /,|=/;
    var pn = function() {
            function t(t) {
                this._internalState = new Map, t && this._parse(t)
            }
            return t.prototype.set = function(t, e) {
                var n = this._clone();
                return n._internalState.has(t) && n._internalState.delete(t), n._internalState.set(t, e), n
            }, t.prototype.unset = function(t) {
                var e = this._clone();
                return e._internalState.delete(t), e
            }, t.prototype.get = function(t) {
                return this._internalState.get(t)
            }, t.prototype.serialize = function() {
                var t = this;
                return this._keys().reduce((function(e, n) {
                    return e.push(n + "=" + t.get(n)), e
                }), []).join(",")
            }, t.prototype._parse = function(t) {
                t.length > 512 || (this._internalState = t.split(",").reverse().reduce((function(t, e) {
                    var n = e.trim(),
                        r = n.indexOf("=");
                    if (-1 !== r) {
                        var o = n.slice(0, r),
                            i = n.slice(r + 1, e.length);
                        (function(t) {
                            return un.test(t)
                        })(o) && function(t) {
                            return cn.test(t) && !ln.test(t)
                        }(i) && t.set(o, i)
                    }
                    return t
                }), new Map), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))))
            }, t.prototype._keys = function() {
                return Array.from(this._internalState.keys()).reverse()
            }, t.prototype._clone = function() {
                var e = new t;
                return e._internalState = new Map(this._internalState), e
            }, t
        }(),
        fn = "traceparent",
        hn = "tracestate",
        _n = new RegExp("^\\s?((?!ff)[\\da-f]{2})-((?![0]{32})[\\da-f]{32})-((?![0]{16})[\\da-f]{16})-([\\da-f]{2})(-.*)?\\s?$");
    var dn, vn, En = function() {
            function t() {}
            return t.prototype.inject = function(t, e, n) {
                var r = Xt.getSpanContext(t);
                if (r && !qt(t) && yt(r)) {
                    var o = "00-" + r.traceId + "-" + r.spanId + "-0" + Number(r.traceFlags || P.NONE).toString(16);
                    n.set(e, fn, o), r.traceState && n.set(e, hn, r.traceState.serialize())
                }
            }, t.prototype.extract = function(t, e, n) {
                var r = n.get(e, fn);
                if (!r) return t;
                var o = Array.isArray(r) ? r[0] : r;
                if ("string" != typeof o) return t;
                var i = function(t) {
                    var e = _n.exec(t);
                    return e ? "00" === e[1] && e[5] ? null : {
                        traceId: e[2],
                        spanId: e[3],
                        traceFlags: parseInt(e[4], 16)
                    } : null
                }(o);
                if (!i) return t;
                i.isRemote = !0;
                var a = n.get(e, hn);
                if (a) {
                    var s = Array.isArray(a) ? a.join(",") : a;
                    i.traceState = new pn("string" == typeof s ? s : void 0)
                }
                return Xt.setSpanContext(t, i)
            }, t.prototype.fields = function() {
                return [fn, hn]
            }, t
        }(),
        yn = "[object Null]",
        Tn = "[object Undefined]",
        gn = Function.prototype.toString,
        mn = gn.call(Object),
        On = (dn = Object.getPrototypeOf, vn = Object, function(t) {
            return dn(vn(t))
        }),
        Sn = Object.prototype,
        bn = Sn.hasOwnProperty,
        Rn = Symbol ? Symbol.toStringTag : void 0,
        Ln = Sn.toString;

    function wn(t) {
        if (! function(t) {
                return null != t && "object" == typeof t
            }(t) || "[object Object]" !== function(t) {
                if (null == t) return void 0 === t ? Tn : yn;
                return Rn && Rn in Object(t) ? function(t) {
                    var e = bn.call(t, Rn),
                        n = t[Rn],
                        r = !1;
                    try {
                        t[Rn] = void 0, r = !0
                    } catch (t) {}
                    var o = Ln.call(t);
                    r && (e ? t[Rn] = n : delete t[Rn]);
                    return o
                }(t) : function(t) {
                    return Ln.call(t)
                }(t)
            }(t)) return !1;
        var e = On(t);
        if (null === e) return !0;
        var n = bn.call(e, "constructor") && e.constructor;
        return "function" == typeof n && n instanceof n && gn.call(n) === mn
    }

    function Pn(t) {
        return kn(t) ? t.slice() : t
    }

    function An(t, e, n, r) {
        var o;
        if (void 0 === n && (n = 0), !(n > 20)) {
            if (n++, Dn(t) || Dn(e) || Nn(e)) o = Pn(e);
            else if (kn(t)) {
                if (o = t.slice(), kn(e))
                    for (var i = 0, a = e.length; i < a; i++) o.push(Pn(e[i]));
                else if (In(e))
                    for (i = 0, a = (s = Object.keys(e)).length; i < a; i++) {
                        o[u = s[i]] = Pn(e[u])
                    }
            } else if (In(t))
                if (In(e)) {
                    if (! function(t, e) {
                            if (!wn(t) || !wn(e)) return !1;
                            return !0
                        }(t, e)) return e;
                    o = Object.assign({}, t);
                    var s;
                    for (i = 0, a = (s = Object.keys(e)).length; i < a; i++) {
                        var u, c = e[u = s[i]];
                        if (Dn(c)) void 0 === c ? delete o[u] : o[u] = c;
                        else {
                            var l = o[u],
                                p = c;
                            if (Cn(t, u, r) || Cn(e, u, r)) delete o[u];
                            else {
                                if (In(l) && In(p)) {
                                    var f = r.get(l) || [],
                                        h = r.get(p) || [];
                                    f.push({
                                        obj: t,
                                        key: u
                                    }), h.push({
                                        obj: e,
                                        key: u
                                    }), r.set(l, f), r.set(p, h)
                                }
                                o[u] = An(o[u], c, n, r)
                            }
                        }
                    }
                } else o = e;
            return o
        }
    }

    function Cn(t, e, n) {
        for (var r = n.get(t[e]) || [], o = 0, i = r.length; o < i; o++) {
            var a = r[o];
            if (a.key === e && a.obj === t) return !0
        }
        return !1
    }

    function kn(t) {
        return Array.isArray(t)
    }

    function Nn(t) {
        return "function" == typeof t
    }

    function In(t) {
        return !Dn(t) && !kn(t) && !Nn(t) && "object" == typeof t
    }

    function Dn(t) {
        return "string" == typeof t || "number" == typeof t || "boolean" == typeof t || void 0 === t || t instanceof Date || t instanceof RegExp || null === t
    }
    var xn = function(t) {
        var e = "function" == typeof Symbol && Symbol.iterator,
            n = e && t[e],
            r = 0;
        if (n) return n.call(t);
        if (t && "number" == typeof t.length) return {
            next: function() {
                return t && r >= t.length && (t = void 0), {
                    value: t && t[r++],
                    done: !t
                }
            }
        };
        throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
    };

    function Mn(t, e) {
        return "string" == typeof e ? t === e : !!t.match(e)
    }

    function Un(t, e) {
        var n, r;
        if (!e) return !1;
        try {
            for (var o = xn(e), i = o.next(); !i.done; i = o.next()) {
                if (Mn(t, i.value)) return !0
            }
        } catch (t) {
            n = {
                error: t
            }
        } finally {
            try {
                i && !i.done && (r = o.return) && r.call(o)
            } finally {
                if (n) throw n.error
            }
        }
        return !1
    }
    var jn = function() {
            function t() {
                var t = this;
                this._promise = new Promise((function(e, n) {
                    t._resolve = e, t._reject = n
                }))
            }
            return Object.defineProperty(t.prototype, "promise", {
                get: function() {
                    return this._promise
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype.resolve = function(t) {
                this._resolve(t)
            }, t.prototype.reject = function(t) {
                this._reject(t)
            }, t
        }(),
        Bn = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        },
        Zn = function(t, e, n) {
            if (n || 2 === arguments.length)
                for (var r, o = 0, i = e.length; o < i; o++) !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
            return t.concat(r || Array.prototype.slice.call(e))
        },
        Fn = function() {
            function t(t, e) {
                this._callback = t, this._that = e, this._isCalled = !1, this._deferred = new jn
            }
            return Object.defineProperty(t.prototype, "isCalled", {
                get: function() {
                    return this._isCalled
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "promise", {
                get: function() {
                    return this._deferred.promise
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype.call = function() {
                for (var t, e = this, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                if (!this._isCalled) {
                    this._isCalled = !0;
                    try {
                        Promise.resolve((t = this._callback).call.apply(t, Zn([this._that], Bn(n), !1))).then((function(t) {
                            return e._deferred.resolve(t)
                        }), (function(t) {
                            return e._deferred.reject(t)
                        }))
                    } catch (t) {
                        this._deferred.reject(t)
                    }
                }
                return this._deferred.promise
            }, t
        }(),
        Hn = BigInt(1e9);

    function zn(t) {
        return BigInt(t[0]) * Hn + BigInt(t[1])
    }

    function Vn(t) {
        var e, n = zn(t);
        return e = n, {
            low: Number(BigInt.asUintN(32, e)),
            high: Number(BigInt.asUintN(32, e >> BigInt(32)))
        }
    }
    var Xn = "undefined" != typeof BigInt ? function(t) {
        return zn(t).toString()
    } : tn;

    function Gn(t) {
        return t
    }

    function qn(t) {
        if (void 0 !== t) return Re(t)
    }
    var Wn = {
        encodeHrTime: Vn,
        encodeSpanContext: Re,
        encodeOptionalSpanContext: qn
    };
    var Kn = function(t, e) {
        var n = "function" == typeof Symbol && t[Symbol.iterator];
        if (!n) return t;
        var r, o, i = n.call(t),
            a = [];
        try {
            for (;
                (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
        } catch (t) {
            o = {
                error: t
            }
        } finally {
            try {
                r && !r.done && (n = i.return) && n.call(i)
            } finally {
                if (o) throw o.error
            }
        }
        return a
    };

    function Yn(t) {
        return Object.keys(t).map((function(e) {
            return Qn(e, t[e])
        }))
    }

    function Qn(t, e) {
        return {
            key: t,
            value: $n(e)
        }
    }

    function $n(t) {
        var e = typeof t;
        return "string" === e ? {
            stringValue: t
        } : "number" === e ? Number.isInteger(t) ? {
            intValue: t
        } : {
            doubleValue: t
        } : "boolean" === e ? {
            boolValue: t
        } : t instanceof Uint8Array ? {
            bytesValue: t
        } : Array.isArray(t) ? {
            arrayValue: {
                values: t.map($n)
            }
        } : "object" === e && null != t ? {
            kvlistValue: {
                values: Object.entries(t).map((function(t) {
                    var e = Kn(t, 2);
                    return Qn(e[0], e[1])
                }))
            }
        } : {}
    }

    function Jn(t, e) {
        var n, r = t.spanContext(),
            o = t.status;
        return {
            traceId: e.encodeSpanContext(r.traceId),
            spanId: e.encodeSpanContext(r.spanId),
            parentSpanId: e.encodeOptionalSpanContext(t.parentSpanId),
            traceState: null === (n = r.traceState) || void 0 === n ? void 0 : n.serialize(),
            name: t.name,
            kind: null == t.kind ? 0 : t.kind + 1,
            startTimeUnixNano: e.encodeHrTime(t.startTime),
            endTimeUnixNano: e.encodeHrTime(t.endTime),
            attributes: Yn(t.attributes),
            droppedAttributesCount: t.droppedAttributesCount,
            events: t.events.map((function(t) {
                return function(t, e) {
                    return {
                        attributes: t.attributes ? Yn(t.attributes) : [],
                        name: t.name,
                        timeUnixNano: e.encodeHrTime(t.time),
                        droppedAttributesCount: t.droppedAttributesCount || 0
                    }
                }(t, e)
            })),
            droppedEventsCount: t.droppedEventsCount,
            status: {
                code: o.code,
                message: o.message
            },
            links: t.links.map((function(t) {
                return function(t, e) {
                    var n;
                    return {
                        attributes: t.attributes ? Yn(t.attributes) : [],
                        spanId: e.encodeSpanContext(t.context.spanId),
                        traceId: e.encodeSpanContext(t.context.traceId),
                        traceState: null === (n = t.context.traceState) || void 0 === n ? void 0 : n.serialize(),
                        droppedAttributesCount: t.droppedAttributesCount || 0
                    }
                }(t, e)
            })),
            droppedLinksCount: t.droppedLinksCount
        }
    }
    var tr = function(t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length) return {
                next: function() {
                    return t && r >= t.length && (t = void 0), {
                        value: t && t[r++],
                        done: !t
                    }
                }
            };
            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
        },
        er = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        };

    function nr(t, e) {
        var n = function(t) {
            var e, n;
            if (void 0 === t) return Wn;
            var r = null === (e = t.useLongBits) || void 0 === e || e,
                o = null !== (n = t.useHex) && void 0 !== n && n;
            return {
                encodeHrTime: r ? Vn : Xn,
                encodeSpanContext: o ? Gn : Re,
                encodeOptionalSpanContext: o ? Gn : qn
            }
        }(e);
        return {
            resourceSpans: rr(t, n)
        }
    }

    function rr(t, e) {
        for (var n = function(t) {
                var e, n, r = new Map;
                try {
                    for (var o = tr(t), i = o.next(); !i.done; i = o.next()) {
                        var a = i.value,
                            s = r.get(a.resource);
                        s || (s = new Map, r.set(a.resource, s));
                        var u = a.instrumentationLibrary.name + "@" + (a.instrumentationLibrary.version || "") + ":" + (a.instrumentationLibrary.schemaUrl || ""),
                            c = s.get(u);
                        c || (c = [], s.set(u, c)), c.push(a)
                    }
                } catch (t) {
                    e = {
                        error: t
                    }
                } finally {
                    try {
                        i && !i.done && (n = o.return) && n.call(o)
                    } finally {
                        if (e) throw e.error
                    }
                }
                return r
            }(t), r = [], o = n.entries(), i = o.next(); !i.done;) {
            for (var a = er(i.value, 2), s = a[0], u = [], c = a[1].values(), l = c.next(); !l.done;) {
                var p = l.value;
                if (p.length > 0) {
                    var f = p[0].instrumentationLibrary,
                        h = f.name,
                        _ = f.version,
                        d = f.schemaUrl,
                        v = p.map((function(t) {
                            return Jn(t, e)
                        }));
                    u.push({
                        scope: {
                            name: h,
                            version: _
                        },
                        spans: v,
                        schemaUrl: d
                    })
                }
                l = c.next()
            }
            var E = {
                resource: {
                    attributes: Yn(s.attributes),
                    droppedAttributesCount: 0
                },
                scopeSpans: u,
                schemaUrl: void 0
            };
            r.push(E), i = o.next()
        }
        return r
    }
    var or = function() {
            return or = Object.assign || function(t) {
                for (var e, n = 1, r = arguments.length; n < r; n++)
                    for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                return t
            }, or.apply(this, arguments)
        },
        ir = function(t, e, n, r) {
            return new(n || (n = Promise))((function(o, i) {
                function a(t) {
                    try {
                        u(r.next(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function s(t) {
                    try {
                        u(r.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function u(t) {
                    var e;
                    t.done ? o(t.value) : (e = t.value, e instanceof n ? e : new n((function(t) {
                        t(e)
                    }))).then(a, s)
                }
                u((r = r.apply(t, e || [])).next())
            }))
        },
        ar = function(t, e) {
            var n, r, o, i, a = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
                            switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, r = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        a.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && a.label < o[1]) {
                                        a.label = o[1], o = i;
                                        break
                                    }
                                    if (o && a.label < o[2]) {
                                        a.label = o[2], a.ops.push(i);
                                        break
                                    }
                                    o[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            i = e.call(t, a)
                        } catch (t) {
                            i = [6, t], r = 0
                        } finally {
                            n = o = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        },
        sr = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        },
        ur = function() {
            function t(t, e) {
                var n, r = this;
                this._attributes = t, this.asyncAttributesPending = null != e, this._syncAttributes = null !== (n = this._attributes) && void 0 !== n ? n : {}, this._asyncAttributesPromise = null == e ? void 0 : e.then((function(t) {
                    return r._attributes = Object.assign({}, r._attributes, t), r.asyncAttributesPending = !1, t
                }), (function(t) {
                    return Ct.debug("a resource's async attributes promise rejected: %s", t), r.asyncAttributesPending = !1, {}
                }))
            }
            return t.empty = function() {
                return t.EMPTY
            }, t.default = function() {
                var e;
                return new t(((e = {})[Fe] = "unknown_service", e[Ve] = Ge[Ve], e[ze] = Ge[ze], e[Xe] = Ge[Xe], e))
            }, Object.defineProperty(t.prototype, "attributes", {
                get: function() {
                    var t;
                    return this.asyncAttributesPending && Ct.error("Accessing resource attributes before async attributes settled"), null !== (t = this._attributes) && void 0 !== t ? t : {}
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype.waitForAsyncAttributes = function() {
                return ir(this, void 0, void 0, (function() {
                    return ar(this, (function(t) {
                        switch (t.label) {
                            case 0:
                                return this.asyncAttributesPending ? [4, this._asyncAttributesPromise] : [3, 2];
                            case 1:
                                t.sent(), t.label = 2;
                            case 2:
                                return [2]
                        }
                    }))
                }))
            }, t.prototype.merge = function(e) {
                var n, r = this;
                if (!e) return this;
                var o = or(or({}, this._syncAttributes), null !== (n = e._syncAttributes) && void 0 !== n ? n : e.attributes);
                if (!this._asyncAttributesPromise && !e._asyncAttributesPromise) return new t(o);
                var i = Promise.all([this._asyncAttributesPromise, e._asyncAttributesPromise]).then((function(t) {
                    var n, o = sr(t, 2),
                        i = o[0],
                        a = o[1];
                    return or(or(or(or({}, r._syncAttributes), i), null !== (n = e._syncAttributes) && void 0 !== n ? n : e.attributes), a)
                }));
                return new t(o, i)
            }, t.EMPTY = new t({}), t
        }();
    class cr {
        constructor(t) {
            this.config = t
        }
        export (t, e) {
            const n = nr(t, {
                useHex: !0,
                useLongBits: !1
            });
            this.config.api.pushTraces(n), e({
                code: qe.SUCCESS
            })
        }
        shutdown() {
            return Promise.resolve(void 0)
        }
    }
    class lr {
        constructor(t, e) {
            this.processor = t, this.metas = e
        }
        forceFlush() {
            return this.processor.forceFlush()
        }
        onStart(t, e) {
            const n = this.metas.value.session;
            (null == n ? void 0 : n.id) && (t.attributes.session_id = n.id), this.processor.onStart(t, e)
        }
        onEnd(t) {
            this.processor.onEnd(t)
        }
        shutdown() {
            return this.processor.shutdown()
        }
    }
    var pr, fr = function(t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length) return {
                next: function() {
                    return t && r >= t.length && (t = void 0), {
                        value: t && t[r++],
                        done: !t
                    }
                }
            };
            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
        },
        hr = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        },
        _r = function() {
            function t(t, e, n, r, o, i, a, s, u, c) {
                void 0 === a && (a = []), this.attributes = {}, this.links = [], this.events = [], this._droppedAttributesCount = 0, this._droppedEventsCount = 0, this._droppedLinksCount = 0, this.status = {
                    code: bt.UNSET
                }, this.endTime = [0, 0], this._ended = !1, this._duration = [-1, -1], this.name = n, this._spanContext = r, this.parentSpanId = i, this.kind = o, this.links = a;
                var l = Date.now();
                this._performanceStartTime = we.now(), this._performanceOffset = l - (this._performanceStartTime + Qe()), this._startTimeProvided = null != s, this.startTime = this._getTime(null != s ? s : l), this.resource = t.resource, this.instrumentationLibrary = t.instrumentationLibrary, this._spanLimits = t.getSpanLimits(), this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0, null != c && this.setAttributes(c), this._spanProcessor = t.getActiveSpanProcessor(), this._spanProcessor.onStart(this, e)
            }
            return t.prototype.spanContext = function() {
                return this._spanContext
            }, t.prototype.setAttribute = function(t, e) {
                return null == e || this._isSpanEnded() ? this : 0 === t.length ? (Ct.warn("Invalid attribute key: " + t), this) : ne(e) ? Object.keys(this.attributes).length >= this._spanLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, t) ? (this._droppedAttributesCount++, this) : (this.attributes[t] = this._truncateToSize(e), this) : (Ct.warn("Invalid attribute value set for key: " + t), this)
            }, t.prototype.setAttributes = function(t) {
                var e, n;
                try {
                    for (var r = fr(Object.entries(t)), o = r.next(); !o.done; o = r.next()) {
                        var i = hr(o.value, 2),
                            a = i[0],
                            s = i[1];
                        this.setAttribute(a, s)
                    }
                } catch (t) {
                    e = {
                        error: t
                    }
                } finally {
                    try {
                        o && !o.done && (n = r.return) && n.call(r)
                    } finally {
                        if (e) throw e.error
                    }
                }
                return this
            }, t.prototype.addEvent = function(t, e, n) {
                if (this._isSpanEnded()) return this;
                if (0 === this._spanLimits.eventCountLimit) return Ct.warn("No events allowed."), this._droppedEventsCount++, this;
                this.events.length >= this._spanLimits.eventCountLimit && (0 === this._droppedEventsCount && Ct.debug("Dropping extra events."), this.events.shift(), this._droppedEventsCount++), nn(e) && (nn(n) || (n = e), e = void 0);
                var r = te(e);
                return this.events.push({
                    name: t,
                    attributes: r,
                    time: this._getTime(n),
                    droppedAttributesCount: 0
                }), this
            }, t.prototype.setStatus = function(t) {
                return this._isSpanEnded() || (this.status = t), this
            }, t.prototype.updateName = function(t) {
                return this._isSpanEnded() || (this.name = t), this
            }, t.prototype.end = function(t) {
                this._isSpanEnded() ? Ct.error(this.name + " " + this._spanContext.traceId + "-" + this._spanContext.spanId + " - You can only call end() on a span once.") : (this._ended = !0, this.endTime = this._getTime(t), this._duration = function(t, e) {
                    var n = e[0] - t[0],
                        r = e[1] - t[1];
                    return r < 0 && (n -= 1, r += Ke), [n, r]
                }(this.startTime, this.endTime), this._duration[0] < 0 && (Ct.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime), this.endTime = this.startTime.slice(), this._duration = [0, 0]), this._droppedEventsCount > 0 && Ct.warn("Dropped " + this._droppedEventsCount + " events because eventCountLimit reached"), this._spanProcessor.onEnd(this))
            }, t.prototype._getTime = function(t) {
                if ("number" == typeof t && t < we.now()) return $e(t + this._performanceOffset);
                if ("number" == typeof t) return Ye(t);
                if (t instanceof Date) return Ye(t.getTime());
                if (en(t)) return t;
                if (this._startTimeProvided) return Ye(Date.now());
                var e = we.now() - this._performanceStartTime;
                return rn(this.startTime, Ye(e))
            }, t.prototype.isRecording = function() {
                return !1 === this._ended
            }, t.prototype.recordException = function(t, e) {
                var n = {};
                "string" == typeof t ? n[Ae] = t : t && (t.code ? n[Pe] = t.code.toString() : t.name && (n[Pe] = t.name), t.message && (n[Ae] = t.message), t.stack && (n[Ce] = t.stack)), n[Pe] || n[Ae] ? this.addEvent("exception", n, e) : Ct.warn("Failed to record an exception " + t)
            }, Object.defineProperty(t.prototype, "duration", {
                get: function() {
                    return this._duration
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "ended", {
                get: function() {
                    return this._ended
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "droppedAttributesCount", {
                get: function() {
                    return this._droppedAttributesCount
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "droppedEventsCount", {
                get: function() {
                    return this._droppedEventsCount
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "droppedLinksCount", {
                get: function() {
                    return this._droppedLinksCount
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype._isSpanEnded = function() {
                return this._ended && Ct.warn("Can not execute the operation on ended Span {traceId: " + this._spanContext.traceId + ", spanId: " + this._spanContext.spanId + "}"), this._ended
            }, t.prototype._truncateToLimitUtil = function(t, e) {
                return t.length <= e ? t : t.substr(0, e)
            }, t.prototype._truncateToSize = function(t) {
                var e = this,
                    n = this._attributeValueLengthLimit;
                return n <= 0 ? (Ct.warn("Attribute value limit must be positive, got " + n), t) : "string" == typeof t ? this._truncateToLimitUtil(t, n) : Array.isArray(t) ? t.map((function(t) {
                    return "string" == typeof t ? e._truncateToLimitUtil(t, n) : t
                })) : t
            }, t
        }();
    ! function(t) {
        t[t.NOT_RECORD = 0] = "NOT_RECORD", t[t.RECORD = 1] = "RECORD", t[t.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED"
    }(pr || (pr = {}));
    var dr = function() {
            function t() {}
            return t.prototype.shouldSample = function() {
                return {
                    decision: pr.NOT_RECORD
                }
            }, t.prototype.toString = function() {
                return "AlwaysOffSampler"
            }, t
        }(),
        vr = function() {
            function t() {}
            return t.prototype.shouldSample = function() {
                return {
                    decision: pr.RECORD_AND_SAMPLED
                }
            }, t.prototype.toString = function() {
                return "AlwaysOnSampler"
            }, t
        }(),
        Er = function() {
            function t(t) {
                var e, n, r, o;
                this._root = t.root, this._root || (ae(new Error("ParentBasedSampler must have a root sampler configured")), this._root = new vr), this._remoteParentSampled = null !== (e = t.remoteParentSampled) && void 0 !== e ? e : new vr, this._remoteParentNotSampled = null !== (n = t.remoteParentNotSampled) && void 0 !== n ? n : new dr, this._localParentSampled = null !== (r = t.localParentSampled) && void 0 !== r ? r : new vr, this._localParentNotSampled = null !== (o = t.localParentNotSampled) && void 0 !== o ? o : new dr
            }
            return t.prototype.shouldSample = function(t, e, n, r, o, i) {
                var a = Xt.getSpanContext(t);
                return a && yt(a) ? a.isRemote ? a.traceFlags & P.SAMPLED ? this._remoteParentSampled.shouldSample(t, e, n, r, o, i) : this._remoteParentNotSampled.shouldSample(t, e, n, r, o, i) : a.traceFlags & P.SAMPLED ? this._localParentSampled.shouldSample(t, e, n, r, o, i) : this._localParentNotSampled.shouldSample(t, e, n, r, o, i) : this._root.shouldSample(t, e, n, r, o, i)
            }, t.prototype.toString = function() {
                return "ParentBased{root=" + this._root.toString() + ", remoteParentSampled=" + this._remoteParentSampled.toString() + ", remoteParentNotSampled=" + this._remoteParentNotSampled.toString() + ", localParentSampled=" + this._localParentSampled.toString() + ", localParentNotSampled=" + this._localParentNotSampled.toString() + "}"
            }, t
        }(),
        yr = function() {
            function t(t) {
                void 0 === t && (t = 0), this._ratio = t, this._ratio = this._normalize(t), this._upperBound = Math.floor(4294967295 * this._ratio)
            }
            return t.prototype.shouldSample = function(t, e) {
                return {
                    decision: Et(e) && this._accumulate(e) < this._upperBound ? pr.RECORD_AND_SAMPLED : pr.NOT_RECORD
                }
            }, t.prototype.toString = function() {
                return "TraceIdRatioBased{" + this._ratio + "}"
            }, t.prototype._normalize = function(t) {
                return "number" != typeof t || isNaN(t) ? 0 : t >= 1 ? 1 : t <= 0 ? 0 : t
            }, t.prototype._accumulate = function(t) {
                for (var e = 0, n = 0; n < t.length / 8; n++) {
                    var r = 8 * n;
                    e = (e ^ parseInt(t.slice(r, r + 8), 16)) >>> 0
                }
                return e
            }, t
        }(),
        Tr = Se(),
        gr = oe.AlwaysOn;

    function mr() {
        return {
            sampler: Or(Tr),
            forceFlushTimeoutMillis: 3e4,
            generalLimits: {
                attributeValueLengthLimit: Se().OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
                attributeCountLimit: Se().OTEL_ATTRIBUTE_COUNT_LIMIT
            },
            spanLimits: {
                attributeValueLengthLimit: Se().OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
                attributeCountLimit: Se().OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
                linkCountLimit: Se().OTEL_SPAN_LINK_COUNT_LIMIT,
                eventCountLimit: Se().OTEL_SPAN_EVENT_COUNT_LIMIT,
                attributePerEventCountLimit: Se().OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
                attributePerLinkCountLimit: Se().OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT
            }
        }
    }

    function Or(t) {
        switch (void 0 === t && (t = Se()), t.OTEL_TRACES_SAMPLER) {
            case oe.AlwaysOn:
                return new vr;
            case oe.AlwaysOff:
                return new dr;
            case oe.ParentBasedAlwaysOn:
                return new Er({
                    root: new vr
                });
            case oe.ParentBasedAlwaysOff:
                return new Er({
                    root: new dr
                });
            case oe.TraceIdRatio:
                return new yr(Sr(t));
            case oe.ParentBasedTraceIdRatio:
                return new Er({
                    root: new yr(Sr(t))
                });
            default:
                return Ct.error('OTEL_TRACES_SAMPLER value "' + t.OTEL_TRACES_SAMPLER + " invalid, defaulting to " + gr + '".'), new vr
        }
    }

    function Sr(t) {
        if (void 0 === t.OTEL_TRACES_SAMPLER_ARG || "" === t.OTEL_TRACES_SAMPLER_ARG) return Ct.error("OTEL_TRACES_SAMPLER_ARG is blank, defaulting to 1."), 1;
        var e = Number(t.OTEL_TRACES_SAMPLER_ARG);
        return isNaN(e) ? (Ct.error("OTEL_TRACES_SAMPLER_ARG=" + t.OTEL_TRACES_SAMPLER_ARG + " was given, but it is invalid, defaulting to 1."), 1) : e < 0 || e > 1 ? (Ct.error("OTEL_TRACES_SAMPLER_ARG=" + t.OTEL_TRACES_SAMPLER_ARG + " was given, but it is out of range ([0..1]), defaulting to 1."), 1) : e
    }

    function br(t) {
        var e, n, r, o, i, a, s, u, c, l, p, f, h = Object.assign({}, t.spanLimits),
            _ = "undefined" != typeof process && process && process.env ? Oe(process.env) : Oe(se);
        return h.attributeCountLimit = null !== (a = null !== (i = null !== (o = null !== (n = null === (e = t.spanLimits) || void 0 === e ? void 0 : e.attributeCountLimit) && void 0 !== n ? n : null === (r = t.generalLimits) || void 0 === r ? void 0 : r.attributeCountLimit) && void 0 !== o ? o : _.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) && void 0 !== i ? i : _.OTEL_ATTRIBUTE_COUNT_LIMIT) && void 0 !== a ? a : de, h.attributeValueLengthLimit = null !== (f = null !== (p = null !== (l = null !== (u = null === (s = t.spanLimits) || void 0 === s ? void 0 : s.attributeValueLengthLimit) && void 0 !== u ? u : null === (c = t.generalLimits) || void 0 === c ? void 0 : c.attributeValueLengthLimit) && void 0 !== l ? l : _.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) && void 0 !== p ? p : _.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) && void 0 !== f ? f : _e, Object.assign({}, t, {
            spanLimits: h
        })
    }
    var Rr = function() {
            function t(t, e) {
                this._exporter = t, this._isExporting = !1, this._finishedSpans = [], this._droppedSpansCount = 0;
                var n = Se();
                this._maxExportBatchSize = "number" == typeof(null == e ? void 0 : e.maxExportBatchSize) ? e.maxExportBatchSize : n.OTEL_BSP_MAX_EXPORT_BATCH_SIZE, this._maxQueueSize = "number" == typeof(null == e ? void 0 : e.maxQueueSize) ? e.maxQueueSize : n.OTEL_BSP_MAX_QUEUE_SIZE, this._scheduledDelayMillis = "number" == typeof(null == e ? void 0 : e.scheduledDelayMillis) ? e.scheduledDelayMillis : n.OTEL_BSP_SCHEDULE_DELAY, this._exportTimeoutMillis = "number" == typeof(null == e ? void 0 : e.exportTimeoutMillis) ? e.exportTimeoutMillis : n.OTEL_BSP_EXPORT_TIMEOUT, this._shutdownOnce = new Fn(this._shutdown, this), this._maxExportBatchSize > this._maxQueueSize && (Ct.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize"), this._maxExportBatchSize = this._maxQueueSize)
            }
            return t.prototype.forceFlush = function() {
                return this._shutdownOnce.isCalled ? this._shutdownOnce.promise : this._flushAll()
            }, t.prototype.onStart = function(t, e) {}, t.prototype.onEnd = function(t) {
                this._shutdownOnce.isCalled || 0 != (t.spanContext().traceFlags & P.SAMPLED) && this._addToBuffer(t)
            }, t.prototype.shutdown = function() {
                return this._shutdownOnce.call()
            }, t.prototype._shutdown = function() {
                var t = this;
                return Promise.resolve().then((function() {
                    return t.onShutdown()
                })).then((function() {
                    return t._flushAll()
                })).then((function() {
                    return t._exporter.shutdown()
                }))
            }, t.prototype._addToBuffer = function(t) {
                if (this._finishedSpans.length >= this._maxQueueSize) return 0 === this._droppedSpansCount && Ct.debug("maxQueueSize reached, dropping spans"), void this._droppedSpansCount++;
                this._droppedSpansCount > 0 && (Ct.warn("Dropped " + this._droppedSpansCount + " spans because maxQueueSize reached"), this._droppedSpansCount = 0), this._finishedSpans.push(t), this._maybeStartTimer()
            }, t.prototype._flushAll = function() {
                var t = this;
                return new Promise((function(e, n) {
                    for (var r = [], o = 0, i = Math.ceil(t._finishedSpans.length / t._maxExportBatchSize); o < i; o++) r.push(t._flushOneBatch());
                    Promise.all(r).then((function() {
                        e()
                    })).catch(n)
                }))
            }, t.prototype._flushOneBatch = function() {
                var t = this;
                return this._clearTimer(), 0 === this._finishedSpans.length ? Promise.resolve() : new Promise((function(e, n) {
                    var r = setTimeout((function() {
                        n(new Error("Timeout"))
                    }), t._exportTimeoutMillis);
                    At.with(function(t) {
                        return t.setValue(Gt, !0)
                    }(At.active()), (function() {
                        var o = t._finishedSpans.splice(0, t._maxExportBatchSize),
                            i = function() {
                                return t._exporter.export(o, (function(t) {
                                    var o;
                                    clearTimeout(r), t.code === qe.SUCCESS ? e() : n(null !== (o = t.error) && void 0 !== o ? o : new Error("BatchSpanProcessor: span export failed"))
                                }))
                            },
                            a = o.map((function(t) {
                                return t.resource
                            })).filter((function(t) {
                                return t.asyncAttributesPending
                            }));
                        0 === a.length ? i() : Promise.all(a.map((function(t) {
                            var e;
                            return null === (e = t.waitForAsyncAttributes) || void 0 === e ? void 0 : e.call(t)
                        }))).then(i, (function(t) {
                            ae(t), n(t)
                        }))
                    }))
                }))
            }, t.prototype._maybeStartTimer = function() {
                var t = this;
                if (!this._isExporting) {
                    var e = function() {
                        t._isExporting = !0, t._flushOneBatch().finally((function() {
                            t._isExporting = !1, t._finishedSpans.length > 0 && (t._clearTimer(), t._maybeStartTimer())
                        })).catch((function(e) {
                            t._isExporting = !1, ae(e)
                        }))
                    };
                    if (this._finishedSpans.length >= this._maxExportBatchSize) return e();
                    void 0 === this._timer && (this._timer = setTimeout((function() {
                        return e()
                    }), this._scheduledDelayMillis), this._timer)
                }
            }, t.prototype._clearTimer = function() {
                void 0 !== this._timer && (clearTimeout(this._timer), this._timer = void 0)
            }, t
        }(),
        Lr = function() {
            var t = function(e, n) {
                return t = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                }, t(e, n)
            };
            return function(e, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

                function r() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(),
        wr = function(t) {
            function e(e, n) {
                var r = t.call(this, e, n) || this;
                return r.onInit(n), r
            }
            return Lr(e, t), e.prototype.onInit = function(t) {
                var e = this;
                !0 !== (null == t ? void 0 : t.disableAutoFlushOnDocumentHide) && "undefined" != typeof document && (this._visibilityChangeListener = function() {
                    "hidden" === document.visibilityState && e.forceFlush()
                }, this._pageHideListener = function() {
                    e.forceFlush()
                }, document.addEventListener("visibilitychange", this._visibilityChangeListener), document.addEventListener("pagehide", this._pageHideListener))
            }, e.prototype.onShutdown = function() {
                "undefined" != typeof document && (this._visibilityChangeListener && document.removeEventListener("visibilitychange", this._visibilityChangeListener), this._pageHideListener && document.removeEventListener("pagehide", this._pageHideListener))
            }, e
        }(Rr),
        Pr = function() {
            this.generateTraceId = Cr(16), this.generateSpanId = Cr(8)
        },
        Ar = Array(32);

    function Cr(t) {
        return function() {
            for (var e = 0; e < 2 * t; e++) Ar[e] = Math.floor(16 * Math.random()) + 48, Ar[e] >= 58 && (Ar[e] += 39);
            return String.fromCharCode.apply(null, Ar.slice(0, 2 * t))
        }
    }
    var kr, Nr = function() {
            function t(t, e, n) {
                this._tracerProvider = n;
                var r, o, i, a, s = (r = e, o = {
                    sampler: Or()
                }, i = mr(), (a = Object.assign({}, i, o, r)).generalLimits = Object.assign({}, i.generalLimits, r.generalLimits || {}), a.spanLimits = Object.assign({}, i.spanLimits, r.spanLimits || {}), a);
                this._sampler = s.sampler, this._generalLimits = s.generalLimits, this._spanLimits = s.spanLimits, this._idGenerator = e.idGenerator || new Pr, this.resource = n.resource, this.instrumentationLibrary = t
            }
            return t.prototype.startSpan = function(t, e, n) {
                var r, o, i;
                void 0 === e && (e = {}), void 0 === n && (n = At.active()), e.root && (n = Xt.deleteSpan(n));
                var a = Xt.getSpan(n);
                if (qt(n)) return Ct.debug("Instrumentation suppressed, returning Noop Span"), Xt.wrapSpanContext(at);
                var s, u, c, l = null == a ? void 0 : a.spanContext(),
                    p = this._idGenerator.generateSpanId();
                l && Xt.isSpanContextValid(l) ? (s = l.traceId, u = l.traceState, c = l.spanId) : s = this._idGenerator.generateTraceId();
                var f = null !== (r = e.kind) && void 0 !== r ? r : St.INTERNAL,
                    h = (null !== (o = e.links) && void 0 !== o ? o : []).map((function(t) {
                        return {
                            context: t.context,
                            attributes: te(t.attributes)
                        }
                    })),
                    _ = te(e.attributes),
                    d = this._sampler.shouldSample(n, s, t, f, _, h);
                u = null !== (i = d.traceState) && void 0 !== i ? i : u;
                var v = {
                    traceId: s,
                    spanId: p,
                    traceFlags: d.decision === Ot.RECORD_AND_SAMPLED ? P.SAMPLED : P.NONE,
                    traceState: u
                };
                if (d.decision === Ot.NOT_RECORD) return Ct.debug("Recording is off, propagating context in a non-recording span"), Xt.wrapSpanContext(v);
                var E = te(Object.assign(_, d.attributes));
                return new _r(this, n, t, v, f, c, h, e.startTime, void 0, E)
            }, t.prototype.startActiveSpan = function(t, e, n, r) {
                var o, i, a;
                if (!(arguments.length < 2)) {
                    2 === arguments.length ? a = e : 3 === arguments.length ? (o = e, a = n) : (o = e, i = n, a = r);
                    var s = null != i ? i : At.active(),
                        u = this.startSpan(t, o, s),
                        c = Xt.setSpan(s, u);
                    return At.with(c, a, void 0, u)
                }
            }, t.prototype.getGeneralLimits = function() {
                return this._generalLimits
            }, t.prototype.getSpanLimits = function() {
                return this._spanLimits
            }, t.prototype.getActiveSpanProcessor = function() {
                return this._tracerProvider.getActiveSpanProcessor()
            }, t
        }(),
        Ir = function(t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
            if (n) return n.call(t);
            if (t && "number" == typeof t.length) return {
                next: function() {
                    return t && r >= t.length && (t = void 0), {
                        value: t && t[r++],
                        done: !t
                    }
                }
            };
            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
        },
        Dr = function() {
            function t(t) {
                this._spanProcessors = t
            }
            return t.prototype.forceFlush = function() {
                var t, e, n = [];
                try {
                    for (var r = Ir(this._spanProcessors), o = r.next(); !o.done; o = r.next()) {
                        var i = o.value;
                        n.push(i.forceFlush())
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        o && !o.done && (e = r.return) && e.call(r)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return new Promise((function(t) {
                    Promise.all(n).then((function() {
                        t()
                    })).catch((function(e) {
                        ae(e || new Error("MultiSpanProcessor: forceFlush failed")), t()
                    }))
                }))
            }, t.prototype.onStart = function(t, e) {
                var n, r;
                try {
                    for (var o = Ir(this._spanProcessors), i = o.next(); !i.done; i = o.next()) {
                        i.value.onStart(t, e)
                    }
                } catch (t) {
                    n = {
                        error: t
                    }
                } finally {
                    try {
                        i && !i.done && (r = o.return) && r.call(o)
                    } finally {
                        if (n) throw n.error
                    }
                }
            }, t.prototype.onEnd = function(t) {
                var e, n;
                try {
                    for (var r = Ir(this._spanProcessors), o = r.next(); !o.done; o = r.next()) {
                        o.value.onEnd(t)
                    }
                } catch (t) {
                    e = {
                        error: t
                    }
                } finally {
                    try {
                        o && !o.done && (n = r.return) && n.call(r)
                    } finally {
                        if (e) throw e.error
                    }
                }
            }, t.prototype.shutdown = function() {
                var t, e, n = [];
                try {
                    for (var r = Ir(this._spanProcessors), o = r.next(); !o.done; o = r.next()) {
                        var i = o.value;
                        n.push(i.shutdown())
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        o && !o.done && (e = r.return) && e.call(r)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return new Promise((function(t, e) {
                    Promise.all(n).then((function() {
                        t()
                    }), e)
                }))
            }, t
        }(),
        xr = function() {
            function t() {}
            return t.prototype.onStart = function(t, e) {}, t.prototype.onEnd = function(t) {}, t.prototype.shutdown = function() {
                return Promise.resolve()
            }, t.prototype.forceFlush = function() {
                return Promise.resolve()
            }, t
        }();
    ! function(t) {
        t[t.resolved = 0] = "resolved", t[t.timeout = 1] = "timeout", t[t.error = 2] = "error", t[t.unresolved = 3] = "unresolved"
    }(kr || (kr = {}));
    var Mr, Ur, jr = function() {
            function t(t) {
                var e;
                void 0 === t && (t = {}), this._registeredSpanProcessors = [], this._tracers = new Map;
                var n = function() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    for (var n = t.shift(), r = new WeakMap; t.length > 0;) n = An(n, t.shift(), 0, r);
                    return n
                }({}, mr(), br(t));
                this.resource = null !== (e = n.resource) && void 0 !== e ? e : ur.empty(), this.resource = ur.default().merge(this.resource), this._config = Object.assign({}, n, {
                    resource: this.resource
                });
                var r = this._buildExporterFromEnv();
                if (void 0 !== r) {
                    var o = new wr(r);
                    this.activeSpanProcessor = o
                } else this.activeSpanProcessor = new xr
            }
            return t.prototype.getTracer = function(t, e, n) {
                var r = t + "@" + (e || "") + ":" + ((null == n ? void 0 : n.schemaUrl) || "");
                return this._tracers.has(r) || this._tracers.set(r, new Nr({
                    name: t,
                    version: e,
                    schemaUrl: null == n ? void 0 : n.schemaUrl
                }, this._config, this)), this._tracers.get(r)
            }, t.prototype.addSpanProcessor = function(t) {
                0 === this._registeredSpanProcessors.length && this.activeSpanProcessor.shutdown().catch((function(t) {
                    return Ct.error("Error while trying to shutdown current span processor", t)
                })), this._registeredSpanProcessors.push(t), this.activeSpanProcessor = new Dr(this._registeredSpanProcessors)
            }, t.prototype.getActiveSpanProcessor = function() {
                return this.activeSpanProcessor
            }, t.prototype.register = function(t) {
                void 0 === t && (t = {}), Xt.setGlobalTracerProvider(this), void 0 === t.propagator && (t.propagator = this._buildPropagatorFromEnv()), t.contextManager && At.setGlobalContextManager(t.contextManager), t.propagator && zt.setGlobalPropagator(t.propagator)
            }, t.prototype.forceFlush = function() {
                var t = this._config.forceFlushTimeoutMillis,
                    e = this._registeredSpanProcessors.map((function(e) {
                        return new Promise((function(n) {
                            var r, o = setTimeout((function() {
                                n(new Error("Span processor did not completed within timeout period of " + t + " ms")), r = kr.timeout
                            }), t);
                            e.forceFlush().then((function() {
                                clearTimeout(o), r !== kr.timeout && (r = kr.resolved, n(r))
                            })).catch((function(t) {
                                clearTimeout(o), r = kr.error, n(t)
                            }))
                        }))
                    }));
                return new Promise((function(t, n) {
                    Promise.all(e).then((function(e) {
                        var r = e.filter((function(t) {
                            return t !== kr.resolved
                        }));
                        r.length > 0 ? n(r) : t()
                    })).catch((function(t) {
                        return n([t])
                    }))
                }))
            }, t.prototype.shutdown = function() {
                return this.activeSpanProcessor.shutdown()
            }, t.prototype._getPropagator = function(t) {
                var e;
                return null === (e = this.constructor._registeredPropagators.get(t)) || void 0 === e ? void 0 : e()
            }, t.prototype._getSpanExporter = function(t) {
                var e;
                return null === (e = this.constructor._registeredExporters.get(t)) || void 0 === e ? void 0 : e()
            }, t.prototype._buildPropagatorFromEnv = function() {
                var t = this,
                    e = Array.from(new Set(Se().OTEL_PROPAGATORS)),
                    n = e.map((function(e) {
                        var n = t._getPropagator(e);
                        return n || Ct.warn('Propagator "' + e + '" requested through environment variable is unavailable.'), n
                    })).reduce((function(t, e) {
                        return e && t.push(e), t
                    }), []);
                return 0 === n.length ? void 0 : 1 === e.length ? n[0] : new an({
                    propagators: n
                })
            }, t.prototype._buildExporterFromEnv = function() {
                var t = Se().OTEL_TRACES_EXPORTER;
                if ("none" !== t && "" !== t) {
                    var e = this._getSpanExporter(t);
                    return e || Ct.error('Exporter "' + t + '" requested through environment variable is unavailable.'), e
                }
            }, t._registeredPropagators = new Map([
                ["tracecontext", function() {
                    return new En
                }],
                ["baggage", function() {
                    return new Qt
                }]
            ]), t._registeredExporters = new Map, t
        }(),
        Br = function(t, e) {
            var n = "function" == typeof Symbol && t[Symbol.iterator];
            if (!n) return t;
            var r, o, i = n.call(t),
                a = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(r = i.next()).done;) a.push(r.value)
            } catch (t) {
                o = {
                    error: t
                }
            } finally {
                try {
                    r && !r.done && (n = i.return) && n.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return a
        },
        Zr = function(t, e, n) {
            if (n || 2 === arguments.length)
                for (var r, o = 0, i = e.length; o < i; o++) !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
            return t.concat(r || Array.prototype.slice.call(e))
        },
        Fr = function() {
            function t() {
                this._enabled = !1, this._currentContext = C
            }
            return t.prototype._bindFunction = function(t, e) {
                void 0 === t && (t = C);
                var n = this,
                    r = function() {
                        for (var r = this, o = [], i = 0; i < arguments.length; i++) o[i] = arguments[i];
                        return n.with(t, (function() {
                            return e.apply(r, o)
                        }))
                    };
                return Object.defineProperty(r, "length", {
                    enumerable: !1,
                    configurable: !0,
                    writable: !1,
                    value: e.length
                }), r
            }, t.prototype.active = function() {
                return this._currentContext
            }, t.prototype.bind = function(t, e) {
                return void 0 === t && (t = this.active()), "function" == typeof e ? this._bindFunction(t, e) : e
            }, t.prototype.disable = function() {
                return this._currentContext = C, this._enabled = !1, this
            }, t.prototype.enable = function() {
                return this._enabled || (this._enabled = !0, this._currentContext = C), this
            }, t.prototype.with = function(t, e, n) {
                for (var r = [], o = 3; o < arguments.length; o++) r[o - 3] = arguments[o];
                var i = this._currentContext;
                this._currentContext = t || C;
                try {
                    return e.call.apply(e, Zr([n], Br(r), !1))
                } finally {
                    this._currentContext = i
                }
            }, t
        }(),
        Hr = function() {
            var t = function(e, n) {
                return t = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                }, t(e, n)
            };
            return function(e, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

                function r() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(),
        zr = function(t) {
            function e(e) {
                void 0 === e && (e = {});
                var n = t.call(this, e) || this;
                if (e.contextManager) throw "contextManager should be defined in register method not in constructor";
                if (e.propagator) throw "propagator should be defined in register method not in constructor";
                return n
            }
            return Hr(e, t), e.prototype.register = function(e) {
                void 0 === e && (e = {}), void 0 === e.contextManager && (e.contextManager = new Fr), e.contextManager && e.contextManager.enable(), t.prototype.register.call(this, e)
            }, e
        }(jr);

    function Vr(t, e) {
        return e in t
    }

    function Xr(t, e, n) {
        if (Vr(n, e) && "number" == typeof n[e]) return t.addEvent(e, n[e]), t
    }

    function Gr(t, e) {
        Xr(t, Mr.FETCH_START, e), Xr(t, Mr.DOMAIN_LOOKUP_START, e), Xr(t, Mr.DOMAIN_LOOKUP_END, e), Xr(t, Mr.CONNECT_START, e), Vr(e, "name") && e.name.startsWith("https:") && Xr(t, Mr.SECURE_CONNECTION_START, e), Xr(t, Mr.CONNECT_END, e), Xr(t, Mr.REQUEST_START, e), Xr(t, Mr.RESPONSE_START, e), Xr(t, Mr.RESPONSE_END, e);
        var n = e[Mr.ENCODED_BODY_SIZE];
        void 0 !== n && t.setAttribute(Ue, n);
        var r = e[Mr.DECODED_BODY_SIZE];
        void 0 !== r && n !== r && t.setAttribute(je, r)
    }

    function qr() {
        return "undefined" != typeof location ? location.origin : void 0
    }

    function Wr(t, e, n, r, o, i) {
        void 0 === o && (o = new WeakSet);
        var a = Kr(t),
            s = function(t, e, n, r, o, i) {
                var a = tn(e),
                    s = tn(n),
                    u = r.filter((function(e) {
                        var n = tn(Je(e[Mr.FETCH_START])),
                            r = tn(Je(e[Mr.RESPONSE_END]));
                        return e.initiatorType.toLowerCase() === (i || "xmlhttprequest") && e.name === t && n >= a && r <= s
                    }));
                u.length > 0 && (u = u.filter((function(t) {
                    return !o.has(t)
                })));
                return u
            }(t = a.toString(), e, n, r, o, i);
        if (0 === s.length) return {
            mainRequest: void 0
        };
        if (1 === s.length) return {
            mainRequest: s[0]
        };
        var u = function(t) {
            return t.slice().sort((function(t, e) {
                var n = t[Mr.FETCH_START],
                    r = e[Mr.FETCH_START];
                return n > r ? 1 : n < r ? -1 : 0
            }))
        }(s);
        if (a.origin !== qr() && u.length > 1) {
            var c = u[0],
                l = function(t, e, n) {
                    for (var r, o = tn(n), i = tn(Je(e)), a = t[1], s = t.length, u = 1; u < s; u++) {
                        var c = t[u],
                            l = tn(Je(c[Mr.FETCH_START])),
                            p = o - tn(Je(c[Mr.RESPONSE_END]));
                        l >= i && (!r || p < r) && (r = p, a = c)
                    }
                    return a
                }(u, c[Mr.RESPONSE_END], n),
                p = c[Mr.RESPONSE_END];
            return l[Mr.FETCH_START] < p && (l = c, c = void 0), {
                corsPreFlightRequest: c,
                mainRequest: l
            }
        }
        return {
            mainRequest: s[0]
        }
    }

    function Kr(t) {
        if ("function" == typeof URL) return new URL(t, "undefined" != typeof document ? document.baseURI : "undefined" != typeof location ? location.href : void 0);
        var e = (Ur || (Ur = document.createElement("a")), Ur);
        return e.href = t, e
    }

    function Yr(t, e) {
        var n = e || [];
        return ("string" == typeof n || n instanceof RegExp) && (n = [n]), Kr(t).origin === qr() || n.some((function(e) {
            return Mn(t, e)
        }))
    }

    function Qr(t) {
        void 0 === t && (t = []);
        for (var e = [], n = 0, r = t.length; n < r; n++) {
            var o = t[n];
            if (Array.isArray(o)) {
                var i = Qr(o);
                e = e.concat(i.instrumentations)
            } else "function" == typeof o ? e.push(new o) : o.instrumentationName && e.push(o)
        }
        return {
            instrumentations: e
        }
    }

    function $r(t) {
        var e = Qr(t.instrumentations).instrumentations,
            n = t.tracerProvider || Xt.getTracerProvider(),
            r = t.meterProvider || It.getMeterProvider();
        return function(t, e, n) {
                for (var r = 0, o = t.length; r < o; r++) {
                    var i = t[r];
                    e && i.setTracerProvider(e), n && i.setMeterProvider(n), i.getConfig().enabled || i.enable()
                }
            }(e, n, r),
            function() {
                ! function(t) {
                    t.forEach((function(t) {
                        return t.disable()
                    }))
                }(e)
            }
    }! function(t) {
        t.CONNECT_END = "connectEnd", t.CONNECT_START = "connectStart", t.DECODED_BODY_SIZE = "decodedBodySize", t.DOM_COMPLETE = "domComplete", t.DOM_CONTENT_LOADED_EVENT_END = "domContentLoadedEventEnd", t.DOM_CONTENT_LOADED_EVENT_START = "domContentLoadedEventStart", t.DOM_INTERACTIVE = "domInteractive", t.DOMAIN_LOOKUP_END = "domainLookupEnd", t.DOMAIN_LOOKUP_START = "domainLookupStart", t.ENCODED_BODY_SIZE = "encodedBodySize", t.FETCH_START = "fetchStart", t.LOAD_EVENT_END = "loadEventEnd", t.LOAD_EVENT_START = "loadEventStart", t.NAVIGATION_START = "navigationStart", t.REDIRECT_END = "redirectEnd", t.REDIRECT_START = "redirectStart", t.REQUEST_START = "requestStart", t.RESPONSE_END = "responseEnd", t.RESPONSE_START = "responseStart", t.SECURE_CONNECTION_START = "secureConnectionStart", t.UNLOAD_EVENT_END = "unloadEventEnd", t.UNLOAD_EVENT_START = "unloadEventStart"
    }(Mr || (Mr = {}));
    var Jr = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function to(t) {
        return "function" == typeof t
    }
    var eo = console.error.bind(console);

    function no(t, e, n) {
        var r = !!t[e] && t.propertyIsEnumerable(e);
        Object.defineProperty(t, e, {
            configurable: !0,
            enumerable: r,
            writable: !0,
            value: n
        })
    }

    function ro(t) {
        t && t.logger && (to(t.logger) ? eo = t.logger : eo("new logger isn't a function, not replacing"))
    }

    function oo(t, e, n) {
        if (t && t[e]) {
            if (!n) return eo("no wrapper function"), void eo((new Error).stack);
            if (to(t[e]) && to(n)) {
                var r = t[e],
                    o = n(r, e);
                return no(o, "__original", r), no(o, "__unwrap", (function() {
                    t[e] === o && no(t, e, r)
                })), no(o, "__wrapped", !0), no(t, e, o), o
            }
            eo("original object and wrapper must be functions")
        } else eo("no original function " + e + " to wrap")
    }

    function io(t, e) {
        return t && t[e] ? t[e].__unwrap ? t[e].__unwrap() : void eo("no original to unwrap to -- has " + e + " already been unwrapped?") : (eo("no function to unwrap."), void eo((new Error).stack))
    }
    ro.wrap = oo, ro.massWrap = function(t, e, n) {
        if (!t) return eo("must provide one or more modules to patch"), void eo((new Error).stack);
        Array.isArray(t) || (t = [t]), e && Array.isArray(e) ? t.forEach((function(t) {
            e.forEach((function(e) {
                oo(t, e, n)
            }))
        })) : eo("must provide one or more functions to wrap on modules")
    }, ro.unwrap = io, ro.massUnwrap = function(t, e) {
        if (!t) return eo("must provide one or more modules to patch"), void eo((new Error).stack);
        Array.isArray(t) || (t = [t]), e && Array.isArray(e) ? t.forEach((function(t) {
            e.forEach((function(e) {
                io(t, e)
            }))
        })) : eo("must provide one or more functions to unwrap on modules")
    };
    var ao, so = ro,
        uo = function() {
            return uo = Object.assign || function(t) {
                for (var e, n = 1, r = arguments.length; n < r; n++)
                    for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                return t
            }, uo.apply(this, arguments)
        },
        co = function() {
            function t(t, e, n) {
                void 0 === n && (n = {}), this.instrumentationName = t, this.instrumentationVersion = e, this._wrap = so.wrap, this._unwrap = so.unwrap, this._massWrap = so.massWrap, this._massUnwrap = so.massUnwrap, this._config = uo({
                    enabled: !0
                }, n), this._diag = Ct.createComponentLogger({
                    namespace: t
                }), this._tracer = Xt.getTracer(t, e), this._meter = It.getMeter(t, e), this._updateMetricInstruments()
            }
            return Object.defineProperty(t.prototype, "meter", {
                get: function() {
                    return this._meter
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype.setMeterProvider = function(t) {
                this._meter = t.getMeter(this.instrumentationName, this.instrumentationVersion), this._updateMetricInstruments()
            }, t.prototype._updateMetricInstruments = function() {}, t.prototype.getConfig = function() {
                return this._config
            }, t.prototype.setConfig = function(t) {
                void 0 === t && (t = {}), this._config = Object.assign({}, t)
            }, t.prototype.setTracerProvider = function(t) {
                this._tracer = t.getTracer(this.instrumentationName, this.instrumentationVersion)
            }, Object.defineProperty(t.prototype, "tracer", {
                get: function() {
                    return this._tracer
                },
                enumerable: !1,
                configurable: !0
            }), t
        }(),
        lo = function() {
            var t = function(e, n) {
                return t = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                }, t(e, n)
            };
            return function(e, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

                function r() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(),
        po = function(t) {
            function e(e, n, r) {
                void 0 === r && (r = {});
                var o = t.call(this, e, n, r) || this;
                return o._config.enabled && o.enable(), o
            }
            return lo(e, t), e
        }(co);

    function fo(t, e, n) {
        var r, o;
        try {
            o = t()
        } catch (t) {
            r = t
        } finally {
            if (e(r, o), r && !n) throw r;
            return o
        }
    }

    function ho(t) {
        return "function" == typeof t && "function" == typeof t.__original && "function" == typeof t.__unwrap && !0 === t.__wrapped
    }! function(t) {
        t.DOCUMENT_LOAD = "documentLoad", t.DOCUMENT_FETCH = "documentFetch", t.RESOURCE_FETCH = "resourceFetch"
    }(ao || (ao = {}));
    var _o;
    ! function(t) {
        t.FIRST_PAINT = "firstPaint", t.FIRST_CONTENTFUL_PAINT = "firstContentfulPaint"
    }(_o || (_o = {}));
    var vo, Eo = {
            "first-paint": _o.FIRST_PAINT,
            "first-contentful-paint": _o.FIRST_CONTENTFUL_PAINT
        },
        yo = function() {
            var t = function(e, n) {
                return t = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                }, t(e, n)
            };
            return function(e, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

                function r() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(),
        To = function(t) {
            function e(e) {
                void 0 === e && (e = {});
                var n = t.call(this, "@opentelemetry/instrumentation-document-load", "0.35.0", e) || this;
                return n.component = "document-load", n.version = "1", n.moduleName = n.component, n
            }
            return yo(e, t), e.prototype.init = function() {}, e.prototype._onDocumentLoaded = function() {
                var t = this;
                window.setTimeout((function() {
                    t._collectPerformance()
                }))
            }, e.prototype._addResourcesSpans = function(t) {
                var e, n, r = this,
                    o = null === (n = (e = we).getEntriesByType) || void 0 === n ? void 0 : n.call(e, "resource");
                o && o.forEach((function(e) {
                    r._initResourceSpan(e, t)
                }))
            }, e.prototype._collectPerformance = function() {
                var t = this,
                    e = Array.from(document.getElementsByTagName("meta")).find((function(t) {
                        return t.getAttribute("name") === fn
                    })),
                    n = function() {
                        var t, e, n = {},
                            r = null === (e = (t = we).getEntriesByType) || void 0 === e ? void 0 : e.call(t, "navigation")[0];
                        if (r) Object.values(Mr).forEach((function(t) {
                            if (Vr(r, t)) {
                                var e = r[t];
                                "number" == typeof e && (n[t] = e)
                            }
                        }));
                        else {
                            var o = we.timing;
                            o && Object.values(Mr).forEach((function(t) {
                                if (Vr(o, t)) {
                                    var e = o[t];
                                    "number" == typeof e && (n[t] = e)
                                }
                            }))
                        }
                        return n
                    }(),
                    r = e && e.content || "";
                At.with(zt.extract(C, {
                    traceparent: r
                }), (function() {
                    var e, r = t._startSpan(ao.DOCUMENT_LOAD, Mr.FETCH_START, n);
                    r && (At.with(Xt.setSpan(At.active(), r), (function() {
                        var e = t._startSpan(ao.DOCUMENT_FETCH, Mr.FETCH_START, n);
                        e && (e.setAttribute(Ne, location.href), At.with(Xt.setSpan(At.active(), e), (function() {
                            var r;
                            Gr(e, n), t._addCustomAttributesOnSpan(e, null === (r = t._getConfig().applyCustomAttributesOnSpan) || void 0 === r ? void 0 : r.documentFetch), t._endSpan(e, Mr.RESPONSE_END, n)
                        })))
                    })), r.setAttribute(Ne, location.href), r.setAttribute(Me, navigator.userAgent), t._addResourcesSpans(r), Xr(r, Mr.FETCH_START, n), Xr(r, Mr.UNLOAD_EVENT_START, n), Xr(r, Mr.UNLOAD_EVENT_END, n), Xr(r, Mr.DOM_INTERACTIVE, n), Xr(r, Mr.DOM_CONTENT_LOADED_EVENT_START, n), Xr(r, Mr.DOM_CONTENT_LOADED_EVENT_END, n), Xr(r, Mr.DOM_COMPLETE, n), Xr(r, Mr.LOAD_EVENT_START, n), Xr(r, Mr.LOAD_EVENT_END, n), function(t) {
                        var e, n, r = null === (n = (e = we).getEntriesByType) || void 0 === n ? void 0 : n.call(e, "paint");
                        r && r.forEach((function(e) {
                            var n = e.name,
                                r = e.startTime;
                            Vr(Eo, n) && t.addEvent(Eo[n], r)
                        }))
                    }(r), t._addCustomAttributesOnSpan(r, null === (e = t._getConfig().applyCustomAttributesOnSpan) || void 0 === e ? void 0 : e.documentLoad), t._endSpan(r, Mr.LOAD_EVENT_END, n))
                }))
            }, e.prototype._endSpan = function(t, e, n) {
                t && (Vr(n, e) ? t.end(n[e]) : t.end())
            }, e.prototype._initResourceSpan = function(t, e) {
                var n, r = this._startSpan(ao.RESOURCE_FETCH, Mr.FETCH_START, t, e);
                r && (r.setAttribute(Ne, t.name), Gr(r, t), this._addCustomAttributesOnResourceSpan(r, t, null === (n = this._getConfig().applyCustomAttributesOnSpan) || void 0 === n ? void 0 : n.resourceFetch), this._endSpan(r, Mr.RESPONSE_END, t))
            }, e.prototype._startSpan = function(t, e, n, r) {
                if (Vr(n, e) && "number" == typeof n[e]) return this.tracer.startSpan(t, {
                    startTime: n[e]
                }, r ? Xt.setSpan(At.active(), r) : void 0)
            }, e.prototype._waitForPageLoad = function() {
                "complete" === window.document.readyState ? this._onDocumentLoaded() : (this._onDocumentLoaded = this._onDocumentLoaded.bind(this), window.addEventListener("load", this._onDocumentLoaded))
            }, e.prototype._getConfig = function() {
                return this._config
            }, e.prototype._addCustomAttributesOnSpan = function(t, e) {
                var n = this;
                e && fo((function() {
                    return e(t)
                }), (function(t) {
                    t && n._diag.error("addCustomAttributesOnSpan", t)
                }), !0)
            }, e.prototype._addCustomAttributesOnResourceSpan = function(t, e, n) {
                var r = this;
                n && fo((function() {
                    return n(t, e)
                }), (function(t) {
                    t && r._diag.error("addCustomAttributesOnResourceSpan", t)
                }), !0)
            }, e.prototype.enable = function() {
                window.removeEventListener("load", this._onDocumentLoaded), this._waitForPageLoad()
            }, e.prototype.disable = function() {
                window.removeEventListener("load", this._onDocumentLoaded)
            }, e
        }(po);
    ! function(t) {
        t.COMPONENT = "component", t.HTTP_ERROR_NAME = "http.error_name", t.HTTP_STATUS_TEXT = "http.status_text"
    }(vo || (vo = {}));
    var go, mo = "0.48.0",
        Oo = function() {
            var t = function(e, n) {
                return t = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                }, t(e, n)
            };
            return function(e, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

                function r() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(),
        So = function(t) {
            function e(e) {
                var n = t.call(this, "@opentelemetry/instrumentation-fetch", mo, e) || this;
                return n.component = "fetch", n.version = mo, n.moduleName = n.component, n._usedResources = new WeakSet, n._tasksCount = 0, n
            }
            return Oo(e, t), e.prototype.init = function() {}, e.prototype._getConfig = function() {
                return this._config
            }, e.prototype._addChildSpan = function(t, e) {
                var n = this.tracer.startSpan("CORS Preflight", {
                    startTime: e[Mr.FETCH_START]
                }, Xt.setSpan(At.active(), t));
                this._getConfig().ignoreNetworkEvents || Gr(n, e), n.end(e[Mr.RESPONSE_END])
            }, e.prototype._addFinalSpanAttributes = function(t, e) {
                var n = Kr(e.url);
                t.setAttribute(xe, e.status), null != e.statusText && t.setAttribute(vo.HTTP_STATUS_TEXT, e.statusText), t.setAttribute(Ie, n.host), t.setAttribute(De, n.protocol.replace(":", "")), "undefined" != typeof navigator && t.setAttribute(Me, navigator.userAgent)
            }, e.prototype._addHeaders = function(t, e) {
                if (!Yr(e, this._getConfig().propagateTraceHeaderCorsUrls)) {
                    var n = {};
                    return zt.inject(At.active(), n), void(Object.keys(n).length > 0 && this._diag.debug("headers inject skipped due to CORS policy"))
                }
                if (t instanceof Request) zt.inject(At.active(), t.headers, {
                    set: function(t, e, n) {
                        return t.set(e, "string" == typeof n ? n : String(n))
                    }
                });
                else if (t.headers instanceof Headers) zt.inject(At.active(), t.headers, {
                    set: function(t, e, n) {
                        return t.set(e, "string" == typeof n ? n : String(n))
                    }
                });
                else if (t.headers instanceof Map) zt.inject(At.active(), t.headers, {
                    set: function(t, e, n) {
                        return t.set(e, "string" == typeof n ? n : String(n))
                    }
                });
                else {
                    n = {};
                    zt.inject(At.active(), n), t.headers = Object.assign({}, n, t.headers || {})
                }
            }, e.prototype._clearResources = function() {
                0 === this._tasksCount && this._getConfig().clearTimingResources && (performance.clearResourceTimings(), this._usedResources = new WeakSet)
            }, e.prototype._createSpan = function(t, e) {
                var n;
                if (void 0 === e && (e = {}), !Un(t, this._getConfig().ignoreUrls)) {
                    var r = (e.method || "GET").toUpperCase(),
                        o = "HTTP " + r;
                    return this.tracer.startSpan(o, {
                        kind: St.CLIENT,
                        attributes: (n = {}, n[vo.COMPONENT] = this.moduleName, n[ke] = r, n[Ne] = t, n)
                    })
                }
                this._diag.debug("ignoring span as url matches ignored url")
            }, e.prototype._findResourceAndAddNetworkEvents = function(t, e, n) {
                var r = e.entries;
                if (!r.length) {
                    if (!performance.getEntriesByType) return;
                    r = performance.getEntriesByType("resource")
                }
                var o = Wr(e.spanUrl, e.startTime, n, r, this._usedResources, "fetch");
                if (o.mainRequest) {
                    var i = o.mainRequest;
                    this._markResourceAsUsed(i);
                    var a = o.corsPreFlightRequest;
                    a && (this._addChildSpan(t, a), this._markResourceAsUsed(a)), this._getConfig().ignoreNetworkEvents || Gr(t, i)
                }
            }, e.prototype._markResourceAsUsed = function(t) {
                this._usedResources.add(t)
            }, e.prototype._endSpan = function(t, e, n) {
                var r = this,
                    o = Ye(Date.now()),
                    i = $e();
                this._addFinalSpanAttributes(t, n), setTimeout((function() {
                    var n;
                    null === (n = e.observer) || void 0 === n || n.disconnect(), r._findResourceAndAddNetworkEvents(t, e, i), r._tasksCount--, r._clearResources(), t.end(o)
                }), 300)
            }, e.prototype._patchConstructor = function() {
                var t = this;
                return function(e) {
                    var n = t;
                    return function() {
                        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                        var o = this,
                            i = Kr(t[0] instanceof Request ? t[0].url : String(t[0])).href,
                            a = t[0] instanceof Request ? t[0] : t[1] || {},
                            s = n._createSpan(i, a);
                        if (!s) return e.apply(this, t);
                        var u = n._prepareSpanData(i);

                        function c(t, e) {
                            n._applyAttributesAfterFetch(t, a, e), n._endSpan(t, u, {
                                status: e.status || 0,
                                statusText: e.message,
                                url: i
                            })
                        }

                        function l(t, e) {
                            n._applyAttributesAfterFetch(t, a, e), e.status >= 200 && e.status < 400 ? n._endSpan(t, u, e) : n._endSpan(t, u, {
                                status: e.status,
                                statusText: e.statusText,
                                url: i
                            })
                        }

                        function p(t, e, n) {
                            try {
                                var r = n.clone(),
                                    o = n.clone(),
                                    i = r.body;
                                if (i) {
                                    var a = i.getReader(),
                                        s = function() {
                                            a.read().then((function(e) {
                                                e.done ? l(t, o) : s()
                                            }), (function(e) {
                                                c(t, e)
                                            }))
                                        };
                                    s()
                                } else l(t, n)
                            } finally {
                                e(n)
                            }
                        }

                        function f(t, e, n) {
                            try {
                                c(t, n)
                            } finally {
                                e(n)
                            }
                        }
                        return new Promise((function(t, r) {
                            return At.with(Xt.setSpan(At.active(), s), (function() {
                                return n._addHeaders(a, i), n._tasksCount++, e.apply(o, a instanceof Request ? [a] : [i, a]).then(p.bind(o, s, t), f.bind(o, s, r))
                            }))
                        }))
                    }
                }
            }, e.prototype._applyAttributesAfterFetch = function(t, e, n) {
                var r = this,
                    o = this._getConfig().applyCustomAttributesOnSpan;
                o && fo((function() {
                    return o(t, e, n)
                }), (function(t) {
                    t && r._diag.error("applyCustomAttributesOnSpan", t)
                }), !0)
            }, e.prototype._prepareSpanData = function(t) {
                var e = $e(),
                    n = [];
                if ("function" != typeof PerformanceObserver) return {
                    entries: n,
                    startTime: e,
                    spanUrl: t
                };
                var r = new PerformanceObserver((function(e) {
                    e.getEntries().forEach((function(e) {
                        "fetch" === e.initiatorType && e.name === t && n.push(e)
                    }))
                }));
                return r.observe({
                    entryTypes: ["resource"]
                }), {
                    entries: n,
                    observer: r,
                    startTime: e,
                    spanUrl: t
                }
            }, e.prototype.enable = function() {
                ho(fetch) && (this._unwrap(se, "fetch"), this._diag.debug("removing previous patch for constructor")), this._wrap(se, "fetch", this._patchConstructor())
            }, e.prototype.disable = function() {
                this._unwrap(se, "fetch"), this._usedResources = new WeakSet
            }, e
        }(po);
    ! function(t) {
        t.METHOD_OPEN = "open", t.METHOD_SEND = "send", t.EVENT_ABORT = "abort", t.EVENT_ERROR = "error", t.EVENT_LOAD = "loaded", t.EVENT_TIMEOUT = "timeout"
    }(go || (go = {}));
    var bo, Ro = "0.48.0";
    ! function(t) {
        t.HTTP_STATUS_TEXT = "http.status_text"
    }(bo || (bo = {}));
    var Lo = function() {
            var t = function(e, n) {
                return t = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(t, e) {
                    t.__proto__ = e
                } || function(t, e) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                }, t(e, n)
            };
            return function(e, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

                function r() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(),
        wo = function(t) {
            function e(e) {
                var n = t.call(this, "@opentelemetry/instrumentation-xml-http-request", Ro, e) || this;
                return n.component = "xml-http-request", n.version = Ro, n.moduleName = n.component, n._tasksCount = 0, n._xhrMem = new WeakMap, n._usedResources = new WeakSet, n
            }
            return Lo(e, t), e.prototype.init = function() {}, e.prototype._getConfig = function() {
                return this._config
            }, e.prototype._addHeaders = function(t, e) {
                if (!Yr(Kr(e).href, this._getConfig().propagateTraceHeaderCorsUrls)) {
                    var n = {};
                    return zt.inject(At.active(), n), void(Object.keys(n).length > 0 && this._diag.debug("headers inject skipped due to CORS policy"))
                }
                var r = {};
                zt.inject(At.active(), r), Object.keys(r).forEach((function(e) {
                    t.setRequestHeader(e, String(r[e]))
                }))
            }, e.prototype._addChildSpan = function(t, e) {
                var n = this;
                At.with(Xt.setSpan(At.active(), t), (function() {
                    var t = n.tracer.startSpan("CORS Preflight", {
                        startTime: e[Mr.FETCH_START]
                    });
                    Gr(t, e), t.end(e[Mr.RESPONSE_END])
                }))
            }, e.prototype._addFinalSpanAttributes = function(t, e, n) {
                if ("string" == typeof n) {
                    var r = Kr(n);
                    void 0 !== e.status && t.setAttribute(xe, e.status), void 0 !== e.statusText && t.setAttribute(bo.HTTP_STATUS_TEXT, e.statusText), t.setAttribute(Ie, r.host), t.setAttribute(De, r.protocol.replace(":", "")), t.setAttribute(Me, navigator.userAgent)
                }
            }, e.prototype._applyAttributesAfterXHR = function(t, e) {
                var n = this,
                    r = this._getConfig().applyCustomAttributesOnSpan;
                "function" == typeof r && fo((function() {
                    return r(t, e)
                }), (function(t) {
                    t && n._diag.error("applyCustomAttributesOnSpan", t)
                }), !0)
            }, e.prototype._addResourceObserver = function(t, e) {
                var n = this._xhrMem.get(t);
                n && "function" == typeof PerformanceObserver && "function" == typeof PerformanceResourceTiming && (n.createdResources = {
                    observer: new PerformanceObserver((function(t) {
                        var r = t.getEntries(),
                            o = Kr(e);
                        r.forEach((function(t) {
                            "xmlhttprequest" === t.initiatorType && t.name === o.href && n.createdResources && n.createdResources.entries.push(t)
                        }))
                    })),
                    entries: []
                }, n.createdResources.observer.observe({
                    entryTypes: ["resource"]
                }))
            }, e.prototype._clearResources = function() {
                0 === this._tasksCount && this._getConfig().clearTimingResources && (we.clearResourceTimings(), this._xhrMem = new WeakMap, this._usedResources = new WeakSet)
            }, e.prototype._findResourceAndAddNetworkEvents = function(t, e, n, r, o) {
                if (n && r && o && t.createdResources) {
                    var i = t.createdResources.entries;
                    i && i.length || (i = we.getEntriesByType("resource"));
                    var a = Wr(Kr(n).href, r, o, i, this._usedResources);
                    if (a.mainRequest) {
                        var s = a.mainRequest;
                        this._markResourceAsUsed(s);
                        var u = a.corsPreFlightRequest;
                        u && (this._addChildSpan(e, u), this._markResourceAsUsed(u)), Gr(e, s)
                    }
                }
            }, e.prototype._cleanPreviousSpanInformation = function(t) {
                var e = this._xhrMem.get(t);
                if (e) {
                    var n = e.callbackToRemoveEvents;
                    n && n(), this._xhrMem.delete(t)
                }
            }, e.prototype._createSpan = function(t, e, n) {
                var r;
                if (!Un(e, this._getConfig().ignoreUrls)) {
                    var o = n.toUpperCase(),
                        i = this.tracer.startSpan(o, {
                            kind: St.CLIENT,
                            attributes: (r = {}, r[ke] = n, r[Ne] = Kr(e).toString(), r)
                        });
                    return i.addEvent(go.METHOD_OPEN), this._cleanPreviousSpanInformation(t), this._xhrMem.set(t, {
                        span: i,
                        spanUrl: e
                    }), i
                }
                this._diag.debug("ignoring span as url matches ignored url")
            }, e.prototype._markResourceAsUsed = function(t) {
                this._usedResources.add(t)
            }, e.prototype._patchOpen = function() {
                var t = this;
                return function(e) {
                    var n = t;
                    return function() {
                        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                        var o = t[0],
                            i = t[1];
                        return n._createSpan(this, i, o), e.apply(this, t)
                    }
                }
            }, e.prototype._patchSend = function() {
                var t = this;

                function e(e, n) {
                    var r = t._xhrMem.get(n);
                    if (r) {
                        r.status = n.status, r.statusText = n.statusText, t._xhrMem.delete(n), r.span && t._applyAttributesAfterXHR(r.span, n);
                        var o = $e(),
                            i = Date.now();
                        setTimeout((function() {
                            ! function(e, n, r, o) {
                                var i = n.callbackToRemoveEvents;
                                "function" == typeof i && i();
                                var a = n.span,
                                    s = n.spanUrl,
                                    u = n.sendStartTime;
                                a && (t._findResourceAndAddNetworkEvents(n, a, s, u, r), a.addEvent(e, o), t._addFinalSpanAttributes(a, n, s), a.end(o), t._tasksCount--), t._clearResources()
                            }(e, r, o, i)
                        }), 300)
                    }
                }

                function n() {
                    e(go.EVENT_ERROR, this)
                }

                function r() {
                    e(go.EVENT_ABORT, this)
                }

                function o() {
                    e(go.EVENT_TIMEOUT, this)
                }

                function i() {
                    this.status < 299 ? e(go.EVENT_LOAD, this) : e(go.EVENT_ERROR, this)
                }

                function a(e) {
                    e.removeEventListener("abort", r), e.removeEventListener("error", n), e.removeEventListener("load", i), e.removeEventListener("timeout", o);
                    var a = t._xhrMem.get(e);
                    a && (a.callbackToRemoveEvents = void 0)
                }
                return function(e) {
                    return function() {
                        for (var s = this, u = [], c = 0; c < arguments.length; c++) u[c] = arguments[c];
                        var l = t._xhrMem.get(this);
                        if (!l) return e.apply(this, u);
                        var p = l.span,
                            f = l.spanUrl;
                        return p && f && At.with(Xt.setSpan(At.active(), p), (function() {
                            t._tasksCount++, l.sendStartTime = $e(), p.addEvent(go.METHOD_SEND), s.addEventListener("abort", r), s.addEventListener("error", n), s.addEventListener("load", i), s.addEventListener("timeout", o), l.callbackToRemoveEvents = function() {
                                a(s), l.createdResources && l.createdResources.observer.disconnect()
                            }, t._addHeaders(s, f), t._addResourceObserver(s, f)
                        })), e.apply(this, u)
                    }
                }
            }, e.prototype.enable = function() {
                this._diag.debug("applying patch to", this.moduleName, this.version), ho(XMLHttpRequest.prototype.open) && (this._unwrap(XMLHttpRequest.prototype, "open"), this._diag.debug("removing previous patch from method open")), ho(XMLHttpRequest.prototype.send) && (this._unwrap(XMLHttpRequest.prototype, "send"), this._diag.debug("removing previous patch from method send")), this._wrap(XMLHttpRequest.prototype, "open", this._patchOpen()), this._wrap(XMLHttpRequest.prototype, "send", this._patchSend())
            }, e.prototype.disable = function() {
                this._diag.debug("removing patch from", this.moduleName, this.version), this._unwrap(XMLHttpRequest.prototype, "open"), this._unwrap(XMLHttpRequest.prototype, "send"), this._tasksCount = 0, this._xhrMem = new WeakMap, this._usedResources = new WeakSet
            }, e
        }(po);
    const Po = {
        ignoreUrls: [],
        propagateTraceHeaderCorsUrls: []
    };

    function Ao(t = Po) {
        return [new To, new So(t), new wo(t)]
    }
    var Co = "OT_ZONE_CONTEXT",
        ko = function() {
            function t() {
                this._enabled = !1, this._zoneCounter = 0
            }
            return t.prototype._activeContextFromZone = function(t) {
                return t && t.get(Co) || C
            }, t.prototype._bindFunction = function(t, e) {
                var n = this,
                    r = function() {
                        for (var r = this, o = [], i = 0; i < arguments.length; i++) o[i] = arguments[i];
                        return n.with(t, (function() {
                            return e.apply(r, o)
                        }))
                    };
                return Object.defineProperty(r, "length", {
                    enumerable: !1,
                    configurable: !0,
                    writable: !1,
                    value: e.length
                }), r
            }, t.prototype._bindListener = function(t, e) {
                var n = e;
                return void 0 !== n.__ot_listeners || (n.__ot_listeners = {}, "function" == typeof n.addEventListener && (n.addEventListener = this._patchAddEventListener(n, n.addEventListener, t)), "function" == typeof n.removeEventListener && (n.removeEventListener = this._patchRemoveEventListener(n, n.removeEventListener))), e
            }, t.prototype._createZoneName = function() {
                this._zoneCounter++;
                var t = Math.random();
                return this._zoneCounter + "-" + t
            }, t.prototype._createZone = function(t, e) {
                var n;
                return Zone.current.fork({
                    name: t,
                    properties: (n = {}, n[Co] = e, n)
                })
            }, t.prototype._getActiveZone = function() {
                return Zone.current
            }, t.prototype._patchAddEventListener = function(t, e, n) {
                var r = this;
                return function(o, i, a) {
                    void 0 === t.__ot_listeners && (t.__ot_listeners = {});
                    var s = t.__ot_listeners[o];
                    void 0 === s && (s = new WeakMap, t.__ot_listeners[o] = s);
                    var u = r.bind(n, i);
                    return s.set(i, u), e.call(this, o, u, a)
                }
            }, t.prototype._patchRemoveEventListener = function(t, e) {
                return function(n, r) {
                    if (void 0 === t.__ot_listeners || void 0 === t.__ot_listeners[n]) return e.call(this, n, r);
                    var o = t.__ot_listeners[n],
                        i = o.get(r);
                    return o.delete(r), e.call(this, n, i || r)
                }
            }, t.prototype.active = function() {
                if (!this._enabled) return C;
                var t = this._getActiveZone(),
                    e = this._activeContextFromZone(t);
                return e || C
            }, t.prototype.bind = function(t, e) {
                return void 0 === t && (t = this.active()), "function" == typeof e ? this._bindFunction(t, e) : (void 0 === (n = e) && (n = {}), "function" == typeof n.addEventListener && "function" == typeof n.removeEventListener && this._bindListener(t, e), e);
                var n
            }, t.prototype.disable = function() {
                return this._enabled = !1, this
            }, t.prototype.enable = function() {
                return this._enabled = !0, this
            }, t.prototype.with = function(t, e, n) {
                for (var r = [], o = 3; o < arguments.length; o++) r[o - 3] = arguments[o];
                var i = this._createZoneName(),
                    a = this._createZone(i, t);
                return a.run(e, n, r)
            }, t
        }();
    /**
     * @license Angular v14.2.0-next.0
     * (c) 2010-2022 Google LLC. https://angular.io/
     * License: MIT
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    ! function(t) {
        const e = t.performance;

        function n(t) {
            e && e.mark && e.mark(t)
        }

        function r(t, n) {
            e && e.measure && e.measure(t, n)
        }
        n("Zone");
        const o = t.__Zone_symbol_prefix || "__zone_symbol__";

        function i(t) {
            return o + t
        }
        const a = !0 === t[i("forceDuplicateZoneCheck")];
        if (t.Zone) {
            if (a || "function" != typeof t.Zone.__symbol__) throw new Error("Zone already loaded.");
            return t.Zone
        }
        class s {
            constructor(t, e) {
                this._parent = t, this._name = e ? e.name || "unnamed" : "<root>", this._properties = e && e.properties || {}, this._zoneDelegate = new c(this, this._parent && this._parent._zoneDelegate, e)
            }
            static assertZonePatched() {
                if (t.Promise !== C.ZoneAwarePromise) throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")
            }
            static get root() {
                let t = s.current;
                for (; t.parent;) t = t.parent;
                return t
            }
            static get current() {
                return N.zone
            }
            static get currentTask() {
                return I
            }
            static __load_patch(e, o, i = !1) {
                if (C.hasOwnProperty(e)) {
                    if (!i && a) throw Error("Already loaded patch: " + e)
                } else if (!t["__Zone_disable_" + e]) {
                    const i = "Zone:" + e;
                    n(i), C[e] = o(t, s, k), r(i, i)
                }
            }
            get parent() {
                return this._parent
            }
            get name() {
                return this._name
            }
            get(t) {
                const e = this.getZoneWith(t);
                if (e) return e._properties[t]
            }
            getZoneWith(t) {
                let e = this;
                for (; e;) {
                    if (e._properties.hasOwnProperty(t)) return e;
                    e = e._parent
                }
                return null
            }
            fork(t) {
                if (!t) throw new Error("ZoneSpec required!");
                return this._zoneDelegate.fork(this, t)
            }
            wrap(t, e) {
                if ("function" != typeof t) throw new Error("Expecting function got: " + t);
                const n = this._zoneDelegate.intercept(this, t, e),
                    r = this;
                return function() {
                    return r.runGuarded(n, this, arguments, e)
                }
            }
            run(t, e, n, r) {
                N = {
                    parent: N,
                    zone: this
                };
                try {
                    return this._zoneDelegate.invoke(this, t, e, n, r)
                } finally {
                    N = N.parent
                }
            }
            runGuarded(t, e = null, n, r) {
                N = {
                    parent: N,
                    zone: this
                };
                try {
                    try {
                        return this._zoneDelegate.invoke(this, t, e, n, r)
                    } catch (t) {
                        if (this._zoneDelegate.handleError(this, t)) throw t
                    }
                } finally {
                    N = N.parent
                }
            }
            runTask(t, e, n) {
                if (t.zone != this) throw new Error("A task can only be run in the zone of creation! (Creation: " + (t.zone || g).name + "; Execution: " + this.name + ")");
                if (t.state === m && (t.type === A || t.type === P)) return;
                const r = t.state != b;
                r && t._transitionTo(b, S), t.runCount++;
                const o = I;
                I = t, N = {
                    parent: N,
                    zone: this
                };
                try {
                    t.type == P && t.data && !t.data.isPeriodic && (t.cancelFn = void 0);
                    try {
                        return this._zoneDelegate.invokeTask(this, t, e, n)
                    } catch (t) {
                        if (this._zoneDelegate.handleError(this, t)) throw t
                    }
                } finally {
                    t.state !== m && t.state !== L && (t.type == A || t.data && t.data.isPeriodic ? r && t._transitionTo(S, b) : (t.runCount = 0, this._updateTaskCount(t, -1), r && t._transitionTo(m, b, m))), N = N.parent, I = o
                }
            }
            scheduleTask(t) {
                if (t.zone && t.zone !== this) {
                    let e = this;
                    for (; e;) {
                        if (e === t.zone) throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${t.zone.name}`);
                        e = e.parent
                    }
                }
                t._transitionTo(O, m);
                const e = [];
                t._zoneDelegates = e, t._zone = this;
                try {
                    t = this._zoneDelegate.scheduleTask(this, t)
                } catch (e) {
                    throw t._transitionTo(L, O, m), this._zoneDelegate.handleError(this, e), e
                }
                return t._zoneDelegates === e && this._updateTaskCount(t, 1), t.state == O && t._transitionTo(S, O), t
            }
            scheduleMicroTask(t, e, n, r) {
                return this.scheduleTask(new l(w, t, e, n, r, void 0))
            }
            scheduleMacroTask(t, e, n, r, o) {
                return this.scheduleTask(new l(P, t, e, n, r, o))
            }
            scheduleEventTask(t, e, n, r, o) {
                return this.scheduleTask(new l(A, t, e, n, r, o))
            }
            cancelTask(t) {
                if (t.zone != this) throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (t.zone || g).name + "; Execution: " + this.name + ")");
                t._transitionTo(R, S, b);
                try {
                    this._zoneDelegate.cancelTask(this, t)
                } catch (e) {
                    throw t._transitionTo(L, R), this._zoneDelegate.handleError(this, e), e
                }
                return this._updateTaskCount(t, -1), t._transitionTo(m, R), t.runCount = 0, t
            }
            _updateTaskCount(t, e) {
                const n = t._zoneDelegates; - 1 == e && (t._zoneDelegates = null);
                for (let r = 0; r < n.length; r++) n[r]._updateTaskCount(t.type, e)
            }
        }
        s.__symbol__ = i;
        const u = {
            name: "",
            onHasTask: (t, e, n, r) => t.hasTask(n, r),
            onScheduleTask: (t, e, n, r) => t.scheduleTask(n, r),
            onInvokeTask: (t, e, n, r, o, i) => t.invokeTask(n, r, o, i),
            onCancelTask: (t, e, n, r) => t.cancelTask(n, r)
        };
        class c {
            constructor(t, e, n) {
                this._taskCounts = {
                    microTask: 0,
                    macroTask: 0,
                    eventTask: 0
                }, this.zone = t, this._parentDelegate = e, this._forkZS = n && (n && n.onFork ? n : e._forkZS), this._forkDlgt = n && (n.onFork ? e : e._forkDlgt), this._forkCurrZone = n && (n.onFork ? this.zone : e._forkCurrZone), this._interceptZS = n && (n.onIntercept ? n : e._interceptZS), this._interceptDlgt = n && (n.onIntercept ? e : e._interceptDlgt), this._interceptCurrZone = n && (n.onIntercept ? this.zone : e._interceptCurrZone), this._invokeZS = n && (n.onInvoke ? n : e._invokeZS), this._invokeDlgt = n && (n.onInvoke ? e : e._invokeDlgt), this._invokeCurrZone = n && (n.onInvoke ? this.zone : e._invokeCurrZone), this._handleErrorZS = n && (n.onHandleError ? n : e._handleErrorZS), this._handleErrorDlgt = n && (n.onHandleError ? e : e._handleErrorDlgt), this._handleErrorCurrZone = n && (n.onHandleError ? this.zone : e._handleErrorCurrZone), this._scheduleTaskZS = n && (n.onScheduleTask ? n : e._scheduleTaskZS), this._scheduleTaskDlgt = n && (n.onScheduleTask ? e : e._scheduleTaskDlgt), this._scheduleTaskCurrZone = n && (n.onScheduleTask ? this.zone : e._scheduleTaskCurrZone), this._invokeTaskZS = n && (n.onInvokeTask ? n : e._invokeTaskZS), this._invokeTaskDlgt = n && (n.onInvokeTask ? e : e._invokeTaskDlgt), this._invokeTaskCurrZone = n && (n.onInvokeTask ? this.zone : e._invokeTaskCurrZone), this._cancelTaskZS = n && (n.onCancelTask ? n : e._cancelTaskZS), this._cancelTaskDlgt = n && (n.onCancelTask ? e : e._cancelTaskDlgt), this._cancelTaskCurrZone = n && (n.onCancelTask ? this.zone : e._cancelTaskCurrZone), this._hasTaskZS = null, this._hasTaskDlgt = null, this._hasTaskDlgtOwner = null, this._hasTaskCurrZone = null;
                const r = n && n.onHasTask,
                    o = e && e._hasTaskZS;
                (r || o) && (this._hasTaskZS = r ? n : u, this._hasTaskDlgt = e, this._hasTaskDlgtOwner = this, this._hasTaskCurrZone = t, n.onScheduleTask || (this._scheduleTaskZS = u, this._scheduleTaskDlgt = e, this._scheduleTaskCurrZone = this.zone), n.onInvokeTask || (this._invokeTaskZS = u, this._invokeTaskDlgt = e, this._invokeTaskCurrZone = this.zone), n.onCancelTask || (this._cancelTaskZS = u, this._cancelTaskDlgt = e, this._cancelTaskCurrZone = this.zone))
            }
            fork(t, e) {
                return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, t, e) : new s(t, e)
            }
            intercept(t, e, n) {
                return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, t, e, n) : e
            }
            invoke(t, e, n, r, o) {
                return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, t, e, n, r, o) : e.apply(n, r)
            }
            handleError(t, e) {
                return !this._handleErrorZS || this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, t, e)
            }
            scheduleTask(t, e) {
                let n = e;
                if (this._scheduleTaskZS) this._hasTaskZS && n._zoneDelegates.push(this._hasTaskDlgtOwner), n = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, t, e), n || (n = e);
                else if (e.scheduleFn) e.scheduleFn(e);
                else {
                    if (e.type != w) throw new Error("Task is missing scheduleFn.");
                    y(e)
                }
                return n
            }
            invokeTask(t, e, n, r) {
                return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, t, e, n, r) : e.callback.apply(n, r)
            }
            cancelTask(t, e) {
                let n;
                if (this._cancelTaskZS) n = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, t, e);
                else {
                    if (!e.cancelFn) throw Error("Task is not cancelable");
                    n = e.cancelFn(e)
                }
                return n
            }
            hasTask(t, e) {
                try {
                    this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, t, e)
                } catch (e) {
                    this.handleError(t, e)
                }
            }
            _updateTaskCount(t, e) {
                const n = this._taskCounts,
                    r = n[t],
                    o = n[t] = r + e;
                if (o < 0) throw new Error("More tasks executed then were scheduled.");
                if (0 == r || 0 == o) {
                    const e = {
                        microTask: n.microTask > 0,
                        macroTask: n.macroTask > 0,
                        eventTask: n.eventTask > 0,
                        change: t
                    };
                    this.hasTask(this.zone, e)
                }
            }
        }
        class l {
            constructor(e, n, r, o, i, a) {
                if (this._zone = null, this.runCount = 0, this._zoneDelegates = null, this._state = "notScheduled", this.type = e, this.source = n, this.data = o, this.scheduleFn = i, this.cancelFn = a, !r) throw new Error("callback is not defined");
                this.callback = r;
                const s = this;
                e === A && o && o.useG ? this.invoke = l.invokeTask : this.invoke = function() {
                    return l.invokeTask.call(t, s, this, arguments)
                }
            }
            static invokeTask(t, e, n) {
                t || (t = this), D++;
                try {
                    return t.runCount++, t.zone.runTask(t, e, n)
                } finally {
                    1 == D && T(), D--
                }
            }
            get zone() {
                return this._zone
            }
            get state() {
                return this._state
            }
            cancelScheduleRequest() {
                this._transitionTo(m, O)
            }
            _transitionTo(t, e, n) {
                if (this._state !== e && this._state !== n) throw new Error(`${this.type} '${this.source}': can not transition to '${t}', expecting state '${e}'${n?" or '"+n+"'":""}, was '${this._state}'.`);
                this._state = t, t == m && (this._zoneDelegates = null)
            }
            toString() {
                return this.data && void 0 !== this.data.handleId ? this.data.handleId.toString() : Object.prototype.toString.call(this)
            }
            toJSON() {
                return {
                    type: this.type,
                    state: this.state,
                    source: this.source,
                    zone: this.zone.name,
                    runCount: this.runCount
                }
            }
        }
        const p = i("setTimeout"),
            f = i("Promise"),
            h = i("then");
        let _, d = [],
            v = !1;

        function E(e) {
            if (_ || t[f] && (_ = t[f].resolve(0)), _) {
                let t = _[h];
                t || (t = _.then), t.call(_, e)
            } else t[p](e, 0)
        }

        function y(t) {
            0 === D && 0 === d.length && E(T), t && d.push(t)
        }

        function T() {
            if (!v) {
                for (v = !0; d.length;) {
                    const t = d;
                    d = [];
                    for (let e = 0; e < t.length; e++) {
                        const n = t[e];
                        try {
                            n.zone.runTask(n, null, null)
                        } catch (t) {
                            k.onUnhandledError(t)
                        }
                    }
                }
                k.microtaskDrainDone(), v = !1
            }
        }
        const g = {
                name: "NO ZONE"
            },
            m = "notScheduled",
            O = "scheduling",
            S = "scheduled",
            b = "running",
            R = "canceling",
            L = "unknown",
            w = "microTask",
            P = "macroTask",
            A = "eventTask",
            C = {},
            k = {
                symbol: i,
                currentZoneFrame: () => N,
                onUnhandledError: x,
                microtaskDrainDone: x,
                scheduleMicroTask: y,
                showUncaughtError: () => !s[i("ignoreConsoleErrorUncaughtError")],
                patchEventTarget: () => [],
                patchOnProperties: x,
                patchMethod: () => x,
                bindArguments: () => [],
                patchThen: () => x,
                patchMacroTask: () => x,
                patchEventPrototype: () => x,
                isIEOrEdge: () => !1,
                getGlobalObjects: () => {},
                ObjectDefineProperty: () => x,
                ObjectGetOwnPropertyDescriptor: () => {},
                ObjectCreate: () => {},
                ArraySlice: () => [],
                patchClass: () => x,
                wrapWithCurrentZone: () => x,
                filterProperties: () => [],
                attachOriginToPatched: () => x,
                _redefineProperty: () => x,
                patchCallbacks: () => x,
                nativeScheduleMicroTask: E
            };
        let N = {
                parent: null,
                zone: new s(null, null)
            },
            I = null,
            D = 0;

        function x() {}
        r("Zone", "Zone"), t.Zone = s
    }("undefined" != typeof window && window || "undefined" != typeof self && self || Jr);
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const No = Object.getOwnPropertyDescriptor,
        Io = Object.defineProperty,
        Do = Object.getPrototypeOf,
        xo = Object.create,
        Mo = Array.prototype.slice,
        Uo = "addEventListener",
        jo = "removeEventListener",
        Bo = Zone.__symbol__(Uo),
        Zo = Zone.__symbol__(jo),
        Fo = "true",
        Ho = "false",
        zo = Zone.__symbol__("");

    function Vo(t, e) {
        return Zone.current.wrap(t, e)
    }

    function Xo(t, e, n, r, o) {
        return Zone.current.scheduleMacroTask(t, e, n, r, o)
    }
    const Go = Zone.__symbol__,
        qo = "undefined" != typeof window,
        Wo = qo ? window : void 0,
        Ko = qo && Wo || "object" == typeof self && self || Jr;

    function Yo(t, e) {
        for (let n = t.length - 1; n >= 0; n--) "function" == typeof t[n] && (t[n] = Vo(t[n], e + "_" + n));
        return t
    }

    function Qo(t) {
        return !t || !1 !== t.writable && !("function" == typeof t.get && void 0 === t.set)
    }
    const $o = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope,
        Jo = !("nw" in Ko) && void 0 !== Ko.process && "[object process]" === {}.toString.call(Ko.process),
        ti = !Jo && !$o && !(!qo || !Wo.HTMLElement),
        ei = void 0 !== Ko.process && "[object process]" === {}.toString.call(Ko.process) && !$o && !(!qo || !Wo.HTMLElement),
        ni = {},
        ri = function(t) {
            if (!(t = t || Ko.event)) return;
            let e = ni[t.type];
            e || (e = ni[t.type] = Go("ON_PROPERTY" + t.type));
            const n = this || t.target || Ko,
                r = n[e];
            let o;
            if (ti && n === Wo && "error" === t.type) {
                const e = t;
                o = r && r.call(this, e.message, e.filename, e.lineno, e.colno, e.error), !0 === o && t.preventDefault()
            } else o = r && r.apply(this, arguments), null == o || o || t.preventDefault();
            return o
        };

    function oi(t, e, n) {
        let r = No(t, e);
        if (!r && n) {
            No(n, e) && (r = {
                enumerable: !0,
                configurable: !0
            })
        }
        if (!r || !r.configurable) return;
        const o = Go("on" + e + "patched");
        if (t.hasOwnProperty(o) && t[o]) return;
        delete r.writable, delete r.value;
        const i = r.get,
            a = r.set,
            s = e.slice(2);
        let u = ni[s];
        u || (u = ni[s] = Go("ON_PROPERTY" + s)), r.set = function(e) {
            let n = this;
            if (n || t !== Ko || (n = Ko), !n) return;
            "function" == typeof n[u] && n.removeEventListener(s, ri), a && a.call(n, null), n[u] = e, "function" == typeof e && n.addEventListener(s, ri, !1)
        }, r.get = function() {
            let n = this;
            if (n || t !== Ko || (n = Ko), !n) return null;
            const o = n[u];
            if (o) return o;
            if (i) {
                let t = i.call(this);
                if (t) return r.set.call(this, t), "function" == typeof n.removeAttribute && n.removeAttribute(e), t
            }
            return null
        }, Io(t, e, r), t[o] = !0
    }

    function ii(t, e, n) {
        if (e)
            for (let r = 0; r < e.length; r++) oi(t, "on" + e[r], n);
        else {
            const e = [];
            for (const n in t) "on" == n.slice(0, 2) && e.push(n);
            for (let r = 0; r < e.length; r++) oi(t, e[r], n)
        }
    }
    const ai = Go("originalInstance");

    function si(t) {
        const e = Ko[t];
        if (!e) return;
        Ko[Go(t)] = e, Ko[t] = function() {
            const n = Yo(arguments, t);
            switch (n.length) {
                case 0:
                    this[ai] = new e;
                    break;
                case 1:
                    this[ai] = new e(n[0]);
                    break;
                case 2:
                    this[ai] = new e(n[0], n[1]);
                    break;
                case 3:
                    this[ai] = new e(n[0], n[1], n[2]);
                    break;
                case 4:
                    this[ai] = new e(n[0], n[1], n[2], n[3]);
                    break;
                default:
                    throw new Error("Arg list too long.")
            }
        }, li(Ko[t], e);
        const n = new e((function() {}));
        let r;
        for (r in n) "XMLHttpRequest" === t && "responseBlob" === r || function(e) {
            "function" == typeof n[e] ? Ko[t].prototype[e] = function() {
                return this[ai][e].apply(this[ai], arguments)
            } : Io(Ko[t].prototype, e, {
                set: function(n) {
                    "function" == typeof n ? (this[ai][e] = Vo(n, t + "." + e), li(this[ai][e], n)) : this[ai][e] = n
                },
                get: function() {
                    return this[ai][e]
                }
            })
        }(r);
        for (r in e) "prototype" !== r && e.hasOwnProperty(r) && (Ko[t][r] = e[r])
    }

    function ui(t, e, n) {
        let r = t;
        for (; r && !r.hasOwnProperty(e);) r = Do(r);
        !r && t[e] && (r = t);
        const o = Go(e);
        let i = null;
        if (r && (!(i = r[o]) || !r.hasOwnProperty(o))) {
            i = r[o] = r[e];
            if (Qo(r && No(r, e))) {
                const t = n(i, o, e);
                r[e] = function() {
                    return t(this, arguments)
                }, li(r[e], i)
            }
        }
        return i
    }

    function ci(t, e, n) {
        let r = null;

        function o(t) {
            const e = t.data;
            return e.args[e.cbIdx] = function() {
                t.invoke.apply(this, arguments)
            }, r.apply(e.target, e.args), t
        }
        r = ui(t, e, (t => function(e, r) {
            const i = n(e, r);
            return i.cbIdx >= 0 && "function" == typeof r[i.cbIdx] ? Xo(i.name, r[i.cbIdx], i, o) : t.apply(e, r)
        }))
    }

    function li(t, e) {
        t[Go("OriginalDelegate")] = e
    }
    let pi = !1,
        fi = !1;

    function hi() {
        try {
            const t = Wo.navigator.userAgent;
            if (-1 !== t.indexOf("MSIE ") || -1 !== t.indexOf("Trident/")) return !0
        } catch (t) {}
        return !1
    }

    function _i() {
        if (pi) return fi;
        pi = !0;
        try {
            const t = Wo.navigator.userAgent; - 1 === t.indexOf("MSIE ") && -1 === t.indexOf("Trident/") && -1 === t.indexOf("Edge/") || (fi = !0)
        } catch (t) {}
        return fi
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch("ZoneAwarePromise", ((t, e, n) => {
            const r = Object.getOwnPropertyDescriptor,
                o = Object.defineProperty;
            const i = n.symbol,
                a = [],
                s = !0 === t[i("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],
                u = i("Promise"),
                c = i("then");
            n.onUnhandledError = t => {
                if (n.showUncaughtError()) {
                    const e = t && t.rejection;
                    e ? console.error("Unhandled Promise rejection:", e instanceof Error ? e.message : e, "; Zone:", t.zone.name, "; Task:", t.task && t.task.source, "; Value:", e, e instanceof Error ? e.stack : void 0) : console.error(t)
                }
            }, n.microtaskDrainDone = () => {
                for (; a.length;) {
                    const t = a.shift();
                    try {
                        t.zone.runGuarded((() => {
                            if (t.throwOriginal) throw t.rejection;
                            throw t
                        }))
                    } catch (t) {
                        p(t)
                    }
                }
            };
            const l = i("unhandledPromiseRejectionHandler");

            function p(t) {
                n.onUnhandledError(t);
                try {
                    const n = e[l];
                    "function" == typeof n && n.call(this, t)
                } catch (t) {}
            }

            function f(t) {
                return t && t.then
            }

            function h(t) {
                return t
            }

            function _(t) {
                return N.reject(t)
            }
            const d = i("state"),
                v = i("value"),
                E = i("finally"),
                y = i("parentPromiseValue"),
                T = i("parentPromiseState"),
                g = null,
                m = !0,
                O = !1;

            function S(t, e) {
                return n => {
                    try {
                        L(t, e, n)
                    } catch (e) {
                        L(t, !1, e)
                    }
                }
            }
            const b = function() {
                    let t = !1;
                    return function(e) {
                        return function() {
                            t || (t = !0, e.apply(null, arguments))
                        }
                    }
                },
                R = i("currentTaskTrace");

            function L(t, r, i) {
                const u = b();
                if (t === i) throw new TypeError("Promise resolved with itself");
                if (t[d] === g) {
                    let c = null;
                    try {
                        "object" != typeof i && "function" != typeof i || (c = i && i.then)
                    } catch (e) {
                        return u((() => {
                            L(t, !1, e)
                        }))(), t
                    }
                    if (r !== O && i instanceof N && i.hasOwnProperty(d) && i.hasOwnProperty(v) && i[d] !== g) P(i), L(t, i[d], i[v]);
                    else if (r !== O && "function" == typeof c) try {
                        c.call(i, u(S(t, r)), u(S(t, !1)))
                    } catch (e) {
                        u((() => {
                            L(t, !1, e)
                        }))()
                    } else {
                        t[d] = r;
                        const u = t[v];
                        if (t[v] = i, t[E] === E && r === m && (t[d] = t[T], t[v] = t[y]), r === O && i instanceof Error) {
                            const t = e.currentTask && e.currentTask.data && e.currentTask.data.__creationTrace__;
                            t && o(i, R, {
                                configurable: !0,
                                enumerable: !1,
                                writable: !0,
                                value: t
                            })
                        }
                        for (let e = 0; e < u.length;) A(t, u[e++], u[e++], u[e++], u[e++]);
                        if (0 == u.length && r == O) {
                            t[d] = 0;
                            let r = i;
                            try {
                                throw new Error("Uncaught (in promise): " + function(t) {
                                    if (t && t.toString === Object.prototype.toString) {
                                        return (t.constructor && t.constructor.name || "") + ": " + JSON.stringify(t)
                                    }
                                    return t ? t.toString() : Object.prototype.toString.call(t)
                                }(i) + (i && i.stack ? "\n" + i.stack : ""))
                            } catch (t) {
                                r = t
                            }
                            s && (r.throwOriginal = !0), r.rejection = i, r.promise = t, r.zone = e.current, r.task = e.currentTask, a.push(r), n.scheduleMicroTask()
                        }
                    }
                }
                return t
            }
            const w = i("rejectionHandledHandler");

            function P(t) {
                if (0 === t[d]) {
                    try {
                        const n = e[w];
                        n && "function" == typeof n && n.call(this, {
                            rejection: t[v],
                            promise: t
                        })
                    } catch (t) {}
                    t[d] = O;
                    for (let e = 0; e < a.length; e++) t === a[e].promise && a.splice(e, 1)
                }
            }

            function A(t, e, n, r, o) {
                P(t);
                const i = t[d],
                    a = i ? "function" == typeof r ? r : h : "function" == typeof o ? o : _;
                e.scheduleMicroTask("Promise.then", (() => {
                    try {
                        const r = t[v],
                            o = !!n && E === n[E];
                        o && (n[y] = r, n[T] = i);
                        const s = e.run(a, void 0, o && a !== _ && a !== h ? [] : [r]);
                        L(n, !0, s)
                    } catch (t) {
                        L(n, !1, t)
                    }
                }), n)
            }
            const C = function() {},
                k = t.AggregateError;
            class N {
                static toString() {
                    return "function ZoneAwarePromise() { [native code] }"
                }
                static resolve(t) {
                    return L(new this(null), m, t)
                }
                static reject(t) {
                    return L(new this(null), O, t)
                }
                static any(t) {
                    if (!t || "function" != typeof t[Symbol.iterator]) return Promise.reject(new k([], "All promises were rejected"));
                    const e = [];
                    let n = 0;
                    try {
                        for (let r of t) n++, e.push(N.resolve(r))
                    } catch (t) {
                        return Promise.reject(new k([], "All promises were rejected"))
                    }
                    if (0 === n) return Promise.reject(new k([], "All promises were rejected"));
                    let r = !1;
                    const o = [];
                    return new N(((t, i) => {
                        for (let a = 0; a < e.length; a++) e[a].then((e => {
                            r || (r = !0, t(e))
                        }), (t => {
                            o.push(t), n--, 0 === n && (r = !0, i(new k(o, "All promises were rejected")))
                        }))
                    }))
                }
                static race(t) {
                    let e, n, r = new this(((t, r) => {
                        e = t, n = r
                    }));

                    function o(t) {
                        e(t)
                    }

                    function i(t) {
                        n(t)
                    }
                    for (let e of t) f(e) || (e = this.resolve(e)), e.then(o, i);
                    return r
                }
                static all(t) {
                    return N.allWithCallback(t)
                }
                static allSettled(t) {
                    return (this && this.prototype instanceof N ? this : N).allWithCallback(t, {
                        thenCallback: t => ({
                            status: "fulfilled",
                            value: t
                        }),
                        errorCallback: t => ({
                            status: "rejected",
                            reason: t
                        })
                    })
                }
                static allWithCallback(t, e) {
                    let n, r, o = new this(((t, e) => {
                            n = t, r = e
                        })),
                        i = 2,
                        a = 0;
                    const s = [];
                    for (let o of t) {
                        f(o) || (o = this.resolve(o));
                        const t = a;
                        try {
                            o.then((r => {
                                s[t] = e ? e.thenCallback(r) : r, i--, 0 === i && n(s)
                            }), (o => {
                                e ? (s[t] = e.errorCallback(o), i--, 0 === i && n(s)) : r(o)
                            }))
                        } catch (t) {
                            r(t)
                        }
                        i++, a++
                    }
                    return i -= 2, 0 === i && n(s), o
                }
                constructor(t) {
                    const e = this;
                    if (!(e instanceof N)) throw new Error("Must be an instanceof Promise.");
                    e[d] = g, e[v] = [];
                    try {
                        const n = b();
                        t && t(n(S(e, m)), n(S(e, O)))
                    } catch (t) {
                        L(e, !1, t)
                    }
                }
                get[Symbol.toStringTag]() {
                    return "Promise"
                }
                get[Symbol.species]() {
                    return N
                }
                then(t, n) {
                    var r;
                    let o = null === (r = this.constructor) || void 0 === r ? void 0 : r[Symbol.species];
                    o && "function" == typeof o || (o = this.constructor || N);
                    const i = new o(C),
                        a = e.current;
                    return this[d] == g ? this[v].push(a, i, t, n) : A(this, a, i, t, n), i
                } catch (t) {
                    return this.then(null, t)
                } finally(t) {
                    var n;
                    let r = null === (n = this.constructor) || void 0 === n ? void 0 : n[Symbol.species];
                    r && "function" == typeof r || (r = N);
                    const o = new r(C);
                    o[E] = E;
                    const i = e.current;
                    return this[d] == g ? this[v].push(i, o, t, t) : A(this, i, o, t, t), o
                }
            }
            N.resolve = N.resolve, N.reject = N.reject, N.race = N.race, N.all = N.all;
            const I = t[u] = t.Promise;
            t.Promise = N;
            const D = i("thenPatched");

            function x(t) {
                const e = t.prototype,
                    n = r(e, "then");
                if (n && (!1 === n.writable || !n.configurable)) return;
                const o = e.then;
                e[c] = o, t.prototype.then = function(t, e) {
                    return new N(((t, e) => {
                        o.call(this, t, e)
                    })).then(t, e)
                }, t[D] = !0
            }
            return n.patchThen = x, I && (x(I), ui(t, "fetch", (t => {
                return e = t,
                    function(t, n) {
                        let r = e.apply(t, n);
                        if (r instanceof N) return r;
                        let o = r.constructor;
                        return o[D] || x(o), r
                    };
                var e
            }))), Promise[e.__symbol__("uncaughtPromiseErrors")] = a, N
        })),
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        Zone.__load_patch("toString", (t => {
            const e = Function.prototype.toString,
                n = Go("OriginalDelegate"),
                r = Go("Promise"),
                o = Go("Error"),
                i = function() {
                    if ("function" == typeof this) {
                        const i = this[n];
                        if (i) return "function" == typeof i ? e.call(i) : Object.prototype.toString.call(i);
                        if (this === Promise) {
                            const n = t[r];
                            if (n) return e.call(n)
                        }
                        if (this === Error) {
                            const n = t[o];
                            if (n) return e.call(n)
                        }
                    }
                    return e.call(this)
                };
            i[n] = e, Function.prototype.toString = i;
            const a = Object.prototype.toString;
            Object.prototype.toString = function() {
                return "function" == typeof Promise && this instanceof Promise ? "[object Promise]" : a.call(this)
            }
        }));
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    let di = !1;
    if ("undefined" != typeof window) try {
        const t = Object.defineProperty({}, "passive", {
            get: function() {
                di = !0
            }
        });
        window.addEventListener("test", t, t), window.removeEventListener("test", t, t)
    } catch (t) {
        di = !1
    }
    const vi = {
            useG: !0
        },
        Ei = {},
        yi = {},
        Ti = new RegExp("^" + zo + "(\\w+)(true|false)$"),
        gi = Go("propagationStopped");

    function mi(t, e) {
        const n = (e ? e(t) : t) + Ho,
            r = (e ? e(t) : t) + Fo,
            o = zo + n,
            i = zo + r;
        Ei[t] = {}, Ei[t][Ho] = o, Ei[t][Fo] = i
    }

    function Oi(t, e, n, r) {
        const o = r && r.add || Uo,
            i = r && r.rm || jo,
            a = r && r.listeners || "eventListeners",
            s = r && r.rmAll || "removeAllListeners",
            u = Go(o),
            c = "." + o + ":",
            l = "prependListener",
            p = "." + l + ":",
            f = function(t, e, n) {
                if (t.isRemoved) return;
                const r = t.callback;
                let o;
                "object" == typeof r && r.handleEvent && (t.callback = t => r.handleEvent(t), t.originalDelegate = r);
                try {
                    t.invoke(t, e, [n])
                } catch (t) {
                    o = t
                }
                const a = t.options;
                if (a && "object" == typeof a && a.once) {
                    const r = t.originalDelegate ? t.originalDelegate : t.callback;
                    e[i].call(e, n.type, r, a)
                }
                return o
            };

        function h(n, r, o) {
            if (!(r = r || t.event)) return;
            const i = n || r.target || t,
                a = i[Ei[r.type][o ? Fo : Ho]];
            if (a) {
                const t = [];
                if (1 === a.length) {
                    const e = f(a[0], i, r);
                    e && t.push(e)
                } else {
                    const e = a.slice();
                    for (let n = 0; n < e.length && (!r || !0 !== r[gi]); n++) {
                        const o = f(e[n], i, r);
                        o && t.push(o)
                    }
                }
                if (1 === t.length) throw t[0];
                for (let n = 0; n < t.length; n++) {
                    const r = t[n];
                    e.nativeScheduleMicroTask((() => {
                        throw r
                    }))
                }
            }
        }
        const _ = function(t) {
                return h(this, t, !1)
            },
            d = function(t) {
                return h(this, t, !0)
            };

        function v(e, n) {
            if (!e) return !1;
            let r = !0;
            n && void 0 !== n.useG && (r = n.useG);
            const f = n && n.vh;
            let h = !0;
            n && void 0 !== n.chkDup && (h = n.chkDup);
            let v = !1;
            n && void 0 !== n.rt && (v = n.rt);
            let E = e;
            for (; E && !E.hasOwnProperty(o);) E = Do(E);
            if (!E && e[o] && (E = e), !E) return !1;
            if (E[u]) return !1;
            const y = n && n.eventNameToString,
                T = {},
                g = E[u] = E[o],
                m = E[Go(i)] = E[i],
                O = E[Go(a)] = E[a],
                S = E[Go(s)] = E[s];
            let b;

            function R(t, e) {
                return !di && "object" == typeof t && t ? !!t.capture : di && e ? "boolean" == typeof t ? {
                    capture: t,
                    passive: !0
                } : t ? "object" == typeof t && !1 !== t.passive ? Object.assign(Object.assign({}, t), {
                    passive: !0
                }) : t : {
                    passive: !0
                } : t
            }
            n && n.prepend && (b = E[Go(n.prepend)] = E[n.prepend]);
            const L = function(t) {
                    return b.call(T.target, T.eventName, t.invoke, T.options)
                },
                w = r ? function(t) {
                    if (!T.isExisting) return g.call(T.target, T.eventName, T.capture ? d : _, T.options)
                } : function(t) {
                    return g.call(T.target, T.eventName, t.invoke, T.options)
                },
                P = r ? function(t) {
                    if (!t.isRemoved) {
                        const e = Ei[t.eventName];
                        let n;
                        e && (n = e[t.capture ? Fo : Ho]);
                        const r = n && t.target[n];
                        if (r)
                            for (let e = 0; e < r.length; e++) {
                                if (r[e] === t) {
                                    r.splice(e, 1), t.isRemoved = !0, 0 === r.length && (t.allRemoved = !0, t.target[n] = null);
                                    break
                                }
                            }
                    }
                    if (t.allRemoved) return m.call(t.target, t.eventName, t.capture ? d : _, t.options)
                } : function(t) {
                    return m.call(t.target, t.eventName, t.invoke, t.options)
                },
                A = n && n.diff ? n.diff : function(t, e) {
                    const n = typeof e;
                    return "function" === n && t.callback === e || "object" === n && t.originalDelegate === e
                },
                C = Zone[Go("UNPATCHED_EVENTS")],
                k = t[Go("PASSIVE_EVENTS")],
                N = function(e, o, i, a, s = !1, u = !1) {
                    return function() {
                        const c = this || t;
                        let l = arguments[0];
                        n && n.transferEventName && (l = n.transferEventName(l));
                        let p = arguments[1];
                        if (!p) return e.apply(this, arguments);
                        if (Jo && "uncaughtException" === l) return e.apply(this, arguments);
                        let _ = !1;
                        if ("function" != typeof p) {
                            if (!p.handleEvent) return e.apply(this, arguments);
                            _ = !0
                        }
                        if (f && !f(e, p, c, arguments)) return;
                        const d = di && !!k && -1 !== k.indexOf(l),
                            v = R(arguments[2], d);
                        if (C)
                            for (let t = 0; t < C.length; t++)
                                if (l === C[t]) return d ? e.call(c, l, p, v) : e.apply(this, arguments);
                        const E = !!v && ("boolean" == typeof v || v.capture),
                            g = !(!v || "object" != typeof v) && v.once,
                            m = Zone.current;
                        let O = Ei[l];
                        O || (mi(l, y), O = Ei[l]);
                        const S = O[E ? Fo : Ho];
                        let b, L = c[S],
                            w = !1;
                        if (L) {
                            if (w = !0, h)
                                for (let t = 0; t < L.length; t++)
                                    if (A(L[t], p)) return
                        } else L = c[S] = [];
                        const P = c.constructor.name,
                            N = yi[P];
                        N && (b = N[l]), b || (b = P + o + (y ? y(l) : l)), T.options = v, g && (T.options.once = !1), T.target = c, T.capture = E, T.eventName = l, T.isExisting = w;
                        const I = r ? vi : void 0;
                        I && (I.taskData = T);
                        const D = m.scheduleEventTask(b, p, I, i, a);
                        return T.target = null, I && (I.taskData = null), g && (v.once = !0), (di || "boolean" != typeof D.options) && (D.options = v), D.target = c, D.capture = E, D.eventName = l, _ && (D.originalDelegate = p), u ? L.unshift(D) : L.push(D), s ? c : void 0
                    }
                };
            return E[o] = N(g, c, w, P, v), b && (E[l] = N(b, p, L, P, v, !0)), E[i] = function() {
                const e = this || t;
                let r = arguments[0];
                n && n.transferEventName && (r = n.transferEventName(r));
                const o = arguments[2],
                    i = !!o && ("boolean" == typeof o || o.capture),
                    a = arguments[1];
                if (!a) return m.apply(this, arguments);
                if (f && !f(m, a, e, arguments)) return;
                const s = Ei[r];
                let u;
                s && (u = s[i ? Fo : Ho]);
                const c = u && e[u];
                if (c)
                    for (let t = 0; t < c.length; t++) {
                        const n = c[t];
                        if (A(n, a)) {
                            if (c.splice(t, 1), n.isRemoved = !0, 0 === c.length && (n.allRemoved = !0, e[u] = null, "string" == typeof r)) {
                                e[zo + "ON_PROPERTY" + r] = null
                            }
                            return n.zone.cancelTask(n), v ? e : void 0
                        }
                    }
                return m.apply(this, arguments)
            }, E[a] = function() {
                const e = this || t;
                let r = arguments[0];
                n && n.transferEventName && (r = n.transferEventName(r));
                const o = [],
                    i = Si(e, y ? y(r) : r);
                for (let t = 0; t < i.length; t++) {
                    const e = i[t];
                    let n = e.originalDelegate ? e.originalDelegate : e.callback;
                    o.push(n)
                }
                return o
            }, E[s] = function() {
                const e = this || t;
                let r = arguments[0];
                if (r) {
                    n && n.transferEventName && (r = n.transferEventName(r));
                    const t = Ei[r];
                    if (t) {
                        const n = t[Ho],
                            o = t[Fo],
                            a = e[n],
                            s = e[o];
                        if (a) {
                            const t = a.slice();
                            for (let e = 0; e < t.length; e++) {
                                const n = t[e];
                                let o = n.originalDelegate ? n.originalDelegate : n.callback;
                                this[i].call(this, r, o, n.options)
                            }
                        }
                        if (s) {
                            const t = s.slice();
                            for (let e = 0; e < t.length; e++) {
                                const n = t[e];
                                let o = n.originalDelegate ? n.originalDelegate : n.callback;
                                this[i].call(this, r, o, n.options)
                            }
                        }
                    }
                } else {
                    const t = Object.keys(e);
                    for (let e = 0; e < t.length; e++) {
                        const n = t[e],
                            r = Ti.exec(n);
                        let o = r && r[1];
                        o && "removeListener" !== o && this[s].call(this, o)
                    }
                    this[s].call(this, "removeListener")
                }
                if (v) return this
            }, li(E[o], g), li(E[i], m), S && li(E[s], S), O && li(E[a], O), !0
        }
        let E = [];
        for (let t = 0; t < n.length; t++) E[t] = v(n[t], r);
        return E
    }

    function Si(t, e) {
        if (!e) {
            const n = [];
            for (let r in t) {
                const o = Ti.exec(r);
                let i = o && o[1];
                if (i && (!e || i === e)) {
                    const e = t[r];
                    if (e)
                        for (let t = 0; t < e.length; t++) n.push(e[t])
                }
            }
            return n
        }
        let n = Ei[e];
        n || (mi(e), n = Ei[e]);
        const r = t[n[Ho]],
            o = t[n[Fo]];
        return r ? o ? r.concat(o) : r.slice() : o ? o.slice() : []
    }

    function bi(t, e) {
        const n = t.Event;
        n && n.prototype && e.patchMethod(n.prototype, "stopImmediatePropagation", (t => function(e, n) {
            e[gi] = !0, t && t.apply(e, n)
        }))
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function Ri(t, e, n, r, o) {
        const i = Zone.__symbol__(r);
        if (e[i]) return;
        const a = e[i] = e[r];
        e[r] = function(i, s, u) {
            return s && s.prototype && o.forEach((function(e) {
                const o = `${n}.${r}::` + e,
                    i = s.prototype;
                try {
                    if (i.hasOwnProperty(e)) {
                        const n = t.ObjectGetOwnPropertyDescriptor(i, e);
                        n && n.value ? (n.value = t.wrapWithCurrentZone(n.value, o), t._redefineProperty(s.prototype, e, n)) : i[e] && (i[e] = t.wrapWithCurrentZone(i[e], o))
                    } else i[e] && (i[e] = t.wrapWithCurrentZone(i[e], o))
                } catch (t) {}
            })), a.call(e, i, s, u)
        }, t.attachOriginToPatched(e[r], a)
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function Li(t, e, n) {
        if (!n || 0 === n.length) return e;
        const r = n.filter((e => e.target === t));
        if (!r || 0 === r.length) return e;
        const o = r[0].ignoreProperties;
        return e.filter((t => -1 === o.indexOf(t)))
    }

    function wi(t, e, n, r) {
        if (!t) return;
        ii(t, Li(t, e, n), r)
    }

    function Pi(t) {
        return Object.getOwnPropertyNames(t).filter((t => t.startsWith("on") && t.length > 2)).map((t => t.substring(2)))
    }

    function Ai(t, e) {
        if (Jo && !ei) return;
        if (Zone[t.symbol("patchEvents")]) return;
        const n = e.__Zone_ignore_on_properties;
        let r = [];
        if (ti) {
            const t = window;
            r = r.concat(["Document", "SVGElement", "Element", "HTMLElement", "HTMLBodyElement", "HTMLMediaElement", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLIFrameElement", "HTMLMarqueeElement", "Worker"]);
            const e = hi() ? [{
                target: t,
                ignoreProperties: ["error"]
            }] : [];
            wi(t, Pi(t), n ? n.concat(e) : n, Do(t))
        }
        r = r.concat(["XMLHttpRequest", "XMLHttpRequestEventTarget", "IDBIndex", "IDBRequest", "IDBOpenDBRequest", "IDBDatabase", "IDBTransaction", "IDBCursor", "WebSocket"]);
        for (let t = 0; t < r.length; t++) {
            const o = e[r[t]];
            o && o.prototype && wi(o.prototype, Pi(o.prototype), n)
        }
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch("util", ((t, e, n) => {
        const r = Pi(t);
        n.patchOnProperties = ii, n.patchMethod = ui, n.bindArguments = Yo, n.patchMacroTask = ci;
        const o = e.__symbol__("BLACK_LISTED_EVENTS"),
            i = e.__symbol__("UNPATCHED_EVENTS");
        t[i] && (t[o] = t[i]), t[o] && (e[o] = e[i] = t[o]), n.patchEventPrototype = bi, n.patchEventTarget = Oi, n.isIEOrEdge = _i, n.ObjectDefineProperty = Io, n.ObjectGetOwnPropertyDescriptor = No, n.ObjectCreate = xo, n.ArraySlice = Mo, n.patchClass = si, n.wrapWithCurrentZone = Vo, n.filterProperties = Li, n.attachOriginToPatched = li, n._redefineProperty = Object.defineProperty, n.patchCallbacks = Ri, n.getGlobalObjects = () => ({
            globalSources: yi,
            zoneSymbolEventNames: Ei,
            eventNames: r,
            isBrowser: ti,
            isMix: ei,
            isNode: Jo,
            TRUE_STR: Fo,
            FALSE_STR: Ho,
            ZONE_SYMBOL_PREFIX: zo,
            ADD_EVENT_LISTENER_STR: Uo,
            REMOVE_EVENT_LISTENER_STR: jo
        })
    }));
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const Ci = Go("zoneTask");

    function ki(t, e, n, r) {
        let o = null,
            i = null;
        n += r;
        const a = {};

        function s(e) {
            const n = e.data;
            return n.args[0] = function() {
                return e.invoke.apply(this, arguments)
            }, n.handleId = o.apply(t, n.args), e
        }

        function u(e) {
            return i.call(t, e.data.handleId)
        }
        o = ui(t, e += r, (n => function(o, i) {
            if ("function" == typeof i[0]) {
                const t = {
                        isPeriodic: "Interval" === r,
                        delay: "Timeout" === r || "Interval" === r ? i[1] || 0 : void 0,
                        args: i
                    },
                    n = i[0];
                i[0] = function() {
                    try {
                        return n.apply(this, arguments)
                    } finally {
                        t.isPeriodic || ("number" == typeof t.handleId ? delete a[t.handleId] : t.handleId && (t.handleId[Ci] = null))
                    }
                };
                const o = Xo(e, i[0], t, s, u);
                if (!o) return o;
                const c = o.data.handleId;
                return "number" == typeof c ? a[c] = o : c && (c[Ci] = o), c && c.ref && c.unref && "function" == typeof c.ref && "function" == typeof c.unref && (o.ref = c.ref.bind(c), o.unref = c.unref.bind(c)), "number" == typeof c || c ? c : o
            }
            return n.apply(t, i)
        })), i = ui(t, n, (e => function(n, r) {
            const o = r[0];
            let i;
            "number" == typeof o ? i = a[o] : (i = o && o[Ci], i || (i = o)), i && "string" == typeof i.type ? "notScheduled" !== i.state && (i.cancelFn && i.data.isPeriodic || 0 === i.runCount) && ("number" == typeof o ? delete a[o] : o && (o[Ci] = null), i.zone.cancelTask(i)) : e.apply(t, r)
        }))
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function Ni(t, e) {
        if (Zone[e.symbol("patchEventTarget")]) return;
        const {
            eventNames: n,
            zoneSymbolEventNames: r,
            TRUE_STR: o,
            FALSE_STR: i,
            ZONE_SYMBOL_PREFIX: a
        } = e.getGlobalObjects();
        for (let t = 0; t < n.length; t++) {
            const e = n[t],
                s = a + (e + i),
                u = a + (e + o);
            r[e] = {}, r[e][i] = s, r[e][o] = u
        }
        const s = t.EventTarget;
        return s && s.prototype ? (e.patchEventTarget(t, e, [s && s.prototype]), !0) : void 0
    }
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch("legacy", (t => {
        const e = t[Zone.__symbol__("legacyPatch")];
        e && e()
    })), Zone.__load_patch("queueMicrotask", ((t, e, n) => {
        n.patchMethod(t, "queueMicrotask", (t => function(t, n) {
            e.current.scheduleMicroTask("queueMicrotask", n[0])
        }))
    })), Zone.__load_patch("timers", (t => {
        const e = "set",
            n = "clear";
        ki(t, e, n, "Timeout"), ki(t, e, n, "Interval"), ki(t, e, n, "Immediate")
    })), Zone.__load_patch("requestAnimationFrame", (t => {
        ki(t, "request", "cancel", "AnimationFrame"), ki(t, "mozRequest", "mozCancel", "AnimationFrame"), ki(t, "webkitRequest", "webkitCancel", "AnimationFrame")
    })), Zone.__load_patch("blocking", ((t, e) => {
        const n = ["alert", "prompt", "confirm"];
        for (let r = 0; r < n.length; r++) {
            ui(t, n[r], ((n, r, o) => function(r, i) {
                return e.current.run(n, t, i, o)
            }))
        }
    })), Zone.__load_patch("EventTarget", ((t, e, n) => {
        ! function(t, e) {
            e.patchEventPrototype(t, e)
        }(t, n), Ni(t, n);
        const r = t.XMLHttpRequestEventTarget;
        r && r.prototype && n.patchEventTarget(t, n, [r.prototype])
    })), Zone.__load_patch("MutationObserver", ((t, e, n) => {
        si("MutationObserver"), si("WebKitMutationObserver")
    })), Zone.__load_patch("IntersectionObserver", ((t, e, n) => {
        si("IntersectionObserver")
    })), Zone.__load_patch("FileReader", ((t, e, n) => {
        si("FileReader")
    })), Zone.__load_patch("on_property", ((t, e, n) => {
        Ai(n, t)
    })), Zone.__load_patch("customElements", ((t, e, n) => {
        ! function(t, e) {
            const {
                isBrowser: n,
                isMix: r
            } = e.getGlobalObjects();
            if (!n && !r || !t.customElements || !("customElements" in t)) return;
            e.patchCallbacks(e, t.customElements, "customElements", "define", ["connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback"])
        }(t, n)
    })), Zone.__load_patch("XHR", ((t, e) => {
        ! function(t) {
            const u = t.XMLHttpRequest;
            if (!u) return;
            const c = u.prototype;
            let l = c[Bo],
                p = c[Zo];
            if (!l) {
                const e = t.XMLHttpRequestEventTarget;
                if (e) {
                    const t = e.prototype;
                    l = t[Bo], p = t[Zo]
                }
            }
            const f = "readystatechange",
                h = "scheduled";

            function _(t) {
                const r = t.data,
                    a = r.target;
                a[i] = !1, a[s] = !1;
                const u = a[o];
                l || (l = a[Bo], p = a[Zo]), u && p.call(a, f, u);
                const c = a[o] = () => {
                    if (a.readyState === a.DONE)
                        if (!r.aborted && a[i] && t.state === h) {
                            const n = a[e.__symbol__("loadfalse")];
                            if (0 !== a.status && n && n.length > 0) {
                                const o = t.invoke;
                                t.invoke = function() {
                                    const n = a[e.__symbol__("loadfalse")];
                                    for (let e = 0; e < n.length; e++) n[e] === t && n.splice(e, 1);
                                    r.aborted || t.state !== h || o.call(t)
                                }, n.push(t)
                            } else t.invoke()
                        } else r.aborted || !1 !== a[i] || (a[s] = !0)
                };
                l.call(a, f, c);
                return a[n] || (a[n] = t), g.apply(a, r.args), a[i] = !0, t
            }

            function d() {}

            function v(t) {
                const e = t.data;
                return e.aborted = !0, m.apply(e.target, e.args)
            }
            const E = ui(c, "open", (() => function(t, e) {
                    return t[r] = 0 == e[2], t[a] = e[1], E.apply(t, e)
                })),
                y = Go("fetchTaskAborting"),
                T = Go("fetchTaskScheduling"),
                g = ui(c, "send", (() => function(t, n) {
                    if (!0 === e.current[T]) return g.apply(t, n);
                    if (t[r]) return g.apply(t, n);
                    {
                        const e = {
                                target: t,
                                url: t[a],
                                isPeriodic: !1,
                                args: n,
                                aborted: !1
                            },
                            r = Xo("XMLHttpRequest.send", d, e, _, v);
                        t && !0 === t[s] && !e.aborted && r.state === h && r.invoke()
                    }
                })),
                m = ui(c, "abort", (() => function(t, r) {
                    const o = t[n];
                    if (o && "string" == typeof o.type) {
                        if (null == o.cancelFn || o.data && o.data.aborted) return;
                        o.zone.cancelTask(o)
                    } else if (!0 === e.current[y]) return m.apply(t, r)
                }))
        }(t);
        const n = Go("xhrTask"),
            r = Go("xhrSync"),
            o = Go("xhrListener"),
            i = Go("xhrScheduled"),
            a = Go("xhrURL"),
            s = Go("xhrErrorBeforeScheduled")
    })), Zone.__load_patch("geolocation", (t => {
        t.navigator && t.navigator.geolocation && function(t, e) {
            const n = t.constructor.name;
            for (let r = 0; r < e.length; r++) {
                const o = e[r],
                    i = t[o];
                if (i) {
                    if (!Qo(No(t, o))) continue;
                    t[o] = (t => {
                        const e = function() {
                            return t.apply(this, Yo(arguments, n + "." + o))
                        };
                        return li(e, t), e
                    })(i)
                }
            }
        }(t.navigator.geolocation, ["getCurrentPosition", "watchPosition"])
    })), Zone.__load_patch("PromiseRejectionEvent", ((t, e) => {
        function n(e) {
            return function(n) {
                Si(t, e).forEach((r => {
                    const o = t.PromiseRejectionEvent;
                    if (o) {
                        const t = new o(e, {
                            promise: n.promise,
                            reason: n.rejection
                        });
                        r.invoke(t)
                    }
                }))
            }
        }
        t.PromiseRejectionEvent && (e[Go("unhandledPromiseRejectionHandler")] = n("unhandledrejection"), e[Go("rejectionHandledHandler")] = n("rejectionhandled"))
    }));
    class Ii extends e.BaseInstrumentation {
        constructor(t = {}) {
            super(), this.options = t, this.name = "@grafana/faro-web-tracing", this.version = e.VERSION
        }
        initialize() {
            var t, e, n, r, o;
            const i = this.options,
                a = {};
            this.config.app.name && (a[Fe] = this.config.app.name), this.config.app.version && (a[He] = this.config.app.version), this.config.app.environment && (a[Be] = this.config.app.environment), Object.assign(a, i.resourceAttributes);
            const s = ur.default().merge(new ur(a)),
                u = new zr({
                    resource: s
                });
            u.addSpanProcessor(null !== (t = i.spanProcessor) && void 0 !== t ? t : new lr(new wr(new cr({
                api: this.api
            }), {
                scheduledDelayMillis: Ii.SCHEDULED_BATCH_DELAY_MS,
                maxExportBatchSize: 30
            }), this.metas)), u.register({
                propagator: null !== (e = i.propagator) && void 0 !== e ? e : new En,
                contextManager: null !== (n = i.contextManager) && void 0 !== n ? n : new ko
            }), $r({
                instrumentations: null !== (r = i.instrumentations) && void 0 !== r ? r : Ao({
                    ignoreUrls: this.getIgnoreUrls(),
                    propagateTraceHeaderCorsUrls: null === (o = this.options.instrumentationOptions) || void 0 === o ? void 0 : o.propagateTraceHeaderCorsUrls
                })
            }), this.api.initOTEL(Xt, At)
        }
        getIgnoreUrls() {
            return this.transports.transports.flatMap((t => t.getIgnoreUrls()))
        }
    }
    return Ii.SCHEDULED_BATCH_DELAY_MS = 1e3, t.FaroSessionSpanProcessor = lr, t.FaroTraceExporter = cr, t.TracingInstrumentation = Ii, t.getDefaultOTELInstrumentations = Ao, t
}({}, GrafanaFaroWebSdk);
