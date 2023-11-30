
var CryptoJS = CryptoJS
        || function (a, g) {
            var m = {}, e = m.lib = {}, q = e.Base = function () {
                function a() {
                }
                return {
                    extend: function (b) {
                        a.prototype = this;
                        var d = new a;
                        b && d.mixIn(b);
                        d.$super = this;
                        return d
                    },
                    create: function () {
                        var a = this.extend();
                        a.init.apply(a, arguments);
                        return a
                    },
                    init: function () {
                    },
                    mixIn: function (a) {
                        for (var k in a)
                            a.hasOwnProperty(k) && (this[k] = a[k]);
                        a.hasOwnProperty("toString")
                                && (this.toString = a.toString)
                    },
                    clone: function () {
                        return this.$super.extend(this)
                    }
                }
            }(), r = e.WordArray = q
                    .extend({
                        init: function (a, b) {
                            a = this.words = a || [];
                            this.sigBytes = b != g ? b : 4 * a.length
                        },
                        toString: function (a) {
                            return (a || n).stringify(this)
                        },
                        concat: function (a) {
                            var b = this.words, d = a.words, c = this.sigBytes, a = a.sigBytes;
                            this.clamp();
                            if (c % 4)
                                for (var i = 0; i < a; i++)
                                    b[c + i >>> 2] |= (d[i >>> 2] >>> 24 - 8 * (i % 4) & 255) << 24 - 8 * ((c + i) % 4);
                            else if (65535 < d.length)
                                for (i = 0; i < a; i += 4)
                                    b[c + i >>> 2] = d[i >>> 2];
                            else
                                b.push.apply(b, d);
                            this.sigBytes += a;
                            return this
                        },
                        clamp: function () {
                            var k = this.words, b = this.sigBytes;
                            k[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);
                            k.length = a.ceil(b / 4)
                        },
                        clone: function () {
                            var a = q.clone.call(this);
                            a.words = this.words.slice(0);
                            return a
                        },
                        random: function (k) {
                            for (var b = [], d = 0; d < k; d += 4)
                                b.push(4294967296 * a.random() | 0);
                            return r.create(b, k)
                        }
                    }), y = m.enc = {}, n = y.Hex = {
                stringify: function (a) {
                    for (var b = a.words, a = a.sigBytes, d = [], c = 0; c < a; c++) {
                        var i = b[c >>> 2] >>> 24 - 8 * (c % 4) & 255;
                        d.push((i >>> 4).toString(16));
                        d.push((i & 15).toString(16))
                    }
                    return d.join("")
                },
                parse: function (a) {
                    for (var b = a.length, d = [], c = 0; c < b; c += 2)
                        d[c >>> 3] |= parseInt(a.substr(c, 2), 16) << 24 - 4 * (c % 8);
                    return r.create(d, b / 2)
                }
            }, l = y.Latin1 = {
                stringify: function (a) {
                    for (var b = a.words, a = a.sigBytes, d = [], c = 0; c < a; c++)
                        d
                                .push(String
                                        .fromCharCode(b[c >>> 2] >>> 24 - 8 * (c % 4) & 255));
                    return d.join("")
                },
                parse: function (a) {
                    for (var b = a.length, d = [], c = 0; c < b; c++)
                        d[c >>> 2] |= (a.charCodeAt(c) & 255) << 24 - 8 * (c % 4);
                    return r.create(d, b)
                }
            }, da = y.Utf8 = {
                stringify: function (a) {
                    try {
                        return decodeURIComponent(escape(l.stringify(a)))
                    } catch (b) {
                        throw Error("Malformed UTF-8 data");
                    }
                },
                parse: function (a) {
                    return l.parse(unescape(encodeURIComponent(a)))
                }
            }, h = e.BufferedBlockAlgorithm = q
                    .extend({
                        reset: function () {
                            this._data = r.create();
                            this._nDataBytes = 0
                        },
                        _append: function (a) {
                            "string" == typeof a && (a = da.parse(a));
                            this._data.concat(a);
                            this._nDataBytes += a.sigBytes
                        },
                        _process : function (k) {
                            var b = this._data, d = b.words, c = b.sigBytes, i = this.blockSize, l = c
                                    / (4 * i), l = k ? a.ceil(l) : a.max(
                                    (l | 0) - this._minBufferSize, 0), k = l
                                    * i, c = a.min(4 * k, c);
                            if (k) {
                                for (var h = 0; h < k; h += i)
                                    this._doProcessBlock(d, h);
                                h = d.splice(0, k);
                                b.sigBytes -= c
                            }
                            return r.create(h, c)
                        },
                        clone: function () {
                            var a = q.clone.call(this);
                            a._data = this._data.clone();
                            return a
                        },
                        _minBufferSize: 0
                    });
            e.Hasher = h.extend({
                init: function () {
                    this.reset()
                },
                reset: function () {
                    h.reset.call(this);
                    this._doReset()
                },
                update: function (a) {
                    this._append(a);
                    this._process();
                    return this
                },
                finalize: function (a) {
                    a && this._append(a);
                    this._doFinalize();
                    return this._hash
                },
                clone: function () {
                    var a = h.clone.call(this);
                    a._hash = this._hash.clone();
                    return a
                },
                blockSize: 16,
                _createHelper: function (a) {
                    return function (b, d) {
                        return a.create(d).finalize(b)
                    }
                },
                _createHmacHelper: function (a) {
                    return function (b, d) {
                        return ea.HMAC.create(a, d).finalize(b)
                    }
                }
            });
            var ea = m.algo = {};
            return m
        }(Math);
(function (a) {
    var g = CryptoJS, m = g.lib, e = m.Base, q = m.WordArray, g = g.x64 = {};
    g.Word = e.extend({
        init: function (a, e) {
            this.high = a;
            this.low = e
        }
    });
    g.WordArray = e
            .extend({
                init: function (e, y) {
                    e = this.words = e || [];
                    this.sigBytes = y != a ? y : 8 * e.length
                },
                toX32: function () {
                    for (var a = this.words, e = a.length, n = [], l = 0; l < e; l++) {
                        var g = a[l];
                        n.push(g.high);
                        n.push(g.low)
                    }
                    return q.create(n, this.sigBytes)
                },
                clone: function () {
                    for (var a = e.clone.call(this), g = a.words = this.words
                            .slice(0), n = g.length, l = 0; l < n; l++)
                        g[l] = g[l].clone();
                    return a
                }
            })
})();
(function () {
    function a() {
        return q.create.apply(q, arguments)
    }
    var g = CryptoJS, m = g.lib.Hasher, e = g.x64, q = e.Word, r = e.WordArray, e = g.algo, y = [
        a(1116352408, 3609767458), a(1899447441, 602891725),
        a(3049323471, 3964484399), a(3921009573, 2173295548),
        a(961987163, 4081628472), a(1508970993, 3053834265),
        a(2453635748, 2937671579), a(2870763221, 3664609560),
        a(3624381080, 2734883394), a(310598401, 1164996542),
        a(607225278, 1323610764), a(1426881987, 3590304994),
        a(1925078388, 4068182383), a(2162078206, 991336113),
        a(2614888103, 633803317), a(3248222580, 3479774868),
        a(3835390401, 2666613458), a(4022224774, 944711139),
        a(264347078, 2341262773), a(604807628, 2007800933),
        a(770255983, 1495990901), a(1249150122, 1856431235),
        a(1555081692, 3175218132), a(1996064986, 2198950837),
        a(2554220882, 3999719339), a(2821834349, 766784016),
        a(2952996808, 2566594879), a(3210313671, 3203337956),
        a(3336571891, 1034457026), a(3584528711, 2466948901),
        a(113926993, 3758326383), a(338241895, 168717936),
        a(666307205, 1188179964), a(773529912, 1546045734),
        a(1294757372, 1522805485), a(1396182291, 2643833823),
        a(1695183700, 2343527390), a(1986661051, 1014477480),
        a(2177026350, 1206759142), a(2456956037, 344077627),
        a(2730485921, 1290863460), a(2820302411, 3158454273),
        a(3259730800, 3505952657), a(3345764771, 106217008),
        a(3516065817, 3606008344), a(3600352804, 1432725776),
        a(4094571909, 1467031594), a(275423344, 851169720),
        a(430227734, 3100823752), a(506948616, 1363258195),
        a(659060556, 3750685593), a(883997877, 3785050280),
        a(958139571, 3318307427), a(1322822218, 3812723403),
        a(1537002063, 2003034995), a(1747873779, 3602036899),
        a(1955562222, 1575990012), a(2024104815, 1125592928),
        a(2227730452, 2716904306), a(2361852424, 442776044),
        a(2428436474, 593698344), a(2756734187, 3733110249),
        a(3204031479, 2999351573), a(3329325298, 3815920427),
        a(3391569614, 3928383900), a(3515267271, 566280711),
        a(3940187606, 3454069534), a(4118630271, 4000239992),
        a(116418474, 1914138554), a(174292421, 2731055270),
        a(289380356, 3203993006), a(460393269, 320620315),
        a(685471733, 587496836), a(852142971, 1086792851),
        a(1017036298, 365543100), a(1126000580, 2618297676),
        a(1288033470, 3409855158), a(1501505948, 4234509866),
        a(1607167915, 987167468), a(1816402316, 1246189591)], n = [];
    (function () {
        for (var l = 0; 80 > l; l++)
            n[l] = a()
    })();
    e = e.SHA512 = m
            .extend({
                _doReset: function () {
                    this._hash = r.create([a(1779033703, 4089235720),
                        a(3144134277, 2227873595),
                        a(1013904242, 4271175723),
                        a(2773480762, 1595750129),
                        a(1359893119, 2917565137),
                        a(2600822924, 725511199), a(528734635, 4215389547),
                        a(1541459225, 327033209)])
                },
                _doProcessBlock: function (a, e) {
                    for (var h = this._hash.words, g = h[0], k = h[1], b = h[2], d = h[3], c = h[4], i = h[5], m = h[6], h = h[7], q = g.high, r = g.low, W = k.high, K = k.low, X = b.high, L = b.low, Y = d.high, M = d.low, Z = c.high, N = c.low, $ = i.high, O = i.low, aa = m.high, P = m.low, ba = h.high, Q = h.low, t = q, o = r, E = W, C = K, F = X, D = L, T = Y, G = M, u = Z, p = N, R = $, H = O, S = aa, I = P, U = ba, J = Q, v = 0; 80 > v; v++) {
                        var z = n[v];
                        if (16 > v)
                            var s = z.high = a[e + 2 * v] | 0, f = z.low = a[e
                                + 2 * v + 1] | 0;
                        else {
                            var s = n[v - 15], f = s.high, w = s.low, s = (w << 31 | f >>> 1)
                                    ^ (w << 24 | f >>> 8) ^ f >>> 7, w = (f << 31 | w >>> 1)
                                    ^ (f << 24 | w >>> 8) ^ (f << 25 | w >>> 7), B = n[v - 2], f = B.high, j = B.low, B = (j << 13 | f >>> 19)
                                    ^ (f << 3 | j >>> 29) ^ f >>> 6, j = (f << 13 | j >>> 19)
                                    ^ (j << 3 | f >>> 29) ^ (f << 26 | j >>> 6), f = n[v - 7], V = f.high, A = n[v - 16], x = A.high, A = A.low, f = w
                                    + f.low, s = s + V
                                    + (f >>> 0 < w >>> 0 ? 1 : 0), f = f + j, s = s
                                    + B + (f >>> 0 < j >>> 0 ? 1 : 0), f = f
                                    + A, s = s + x
                                    + (f >>> 0 < A >>> 0 ? 1 : 0);
                            z.high = s;
                            z.low = f
                        }
                        var V = u & R ^ ~u & S, A = p & H ^ ~p & I, z = t & E
                                ^ t & F ^ E & F, fa = o & C ^ o & D ^ C & D, w = (o << 4 | t >>> 28)
                                ^ (t << 30 | o >>> 2) ^ (t << 25 | o >>> 7), B = (t << 4 | o >>> 28)
                                ^ (o << 30 | t >>> 2) ^ (o << 25 | t >>> 7), j = y[v], ga = j.high, ca = j.low, j = J
                                + ((u << 18 | p >>> 14) ^ (u << 14 | p >>> 18) ^ (p << 23 | u >>> 9)), x = U
                                + ((p << 18 | u >>> 14) ^ (p << 14 | u >>> 18) ^ (u << 23 | p >>> 9))
                                + (j >>> 0 < J >>> 0 ? 1 : 0), j = j + A, x = x
                                + V + (j >>> 0 < A >>> 0 ? 1 : 0), j = j + ca, x = x
                                + ga + (j >>> 0 < ca >>> 0 ? 1 : 0), j = j + f, x = x
                                + s + (j >>> 0 < f >>> 0 ? 1 : 0), f = B + fa, z = w
                                + z + (f >>> 0 < B >>> 0 ? 1 : 0), U = S, J = I, S = R, I = H, R = u, H = p, p = G
                                + j | 0, u = T + x
                                + (p >>> 0 < G >>> 0 ? 1 : 0) | 0, T = F, G = D, F = E, D = C, E = t, C = o, o = j
                                + f | 0, t = x + z
                                + (o >>> 0 < j >>> 0 ? 1 : 0) | 0
                    }
                    r = g.low = r + o | 0;
                    g.high = q + t + (r >>> 0 < o >>> 0 ? 1 : 0) | 0;
                    K = k.low = K + C | 0;
                    k.high = W + E + (K >>> 0 < C >>> 0 ? 1 : 0) | 0;
                    L = b.low = L + D | 0;
                    b.high = X + F + (L >>> 0 < D >>> 0 ? 1 : 0) | 0;
                    M = d.low = M + G | 0;
                    d.high = Y + T + (M >>> 0 < G >>> 0 ? 1 : 0) | 0;
                    N = c.low = N + p | 0;
                    c.high = Z + u + (N >>> 0 < p >>> 0 ? 1 : 0) | 0;
                    O = i.low = O + H | 0;
                    i.high = $ + R + (O >>> 0 < H >>> 0 ? 1 : 0) | 0;
                    P = m.low = P + I | 0;
                    m.high = aa + S + (P >>> 0 < I >>> 0 ? 1 : 0) | 0;
                    Q = h.low = Q + J | 0;
                    h.high = ba + U + (Q >>> 0 < J >>> 0 ? 1 : 0) | 0
                },
                _doFinalize: function () {
                    var a = this._data, e = a.words, h = 8 * this._nDataBytes, g = 8 * a.sigBytes;
                    e[g >>> 5] |= 128 << 24 - g % 32;
                    e[(g + 128 >>> 10 << 5) + 31] = h;
                    a.sigBytes = 4 * e.length;
                    this._process();
                    this._hash = this._hash.toX32()
                },
                blockSize: 32
            });
    g.SHA512 = m._createHelper(e);
    g.HmacSHA512 = m._createHmacHelper(e)
})();

//added for Sha2 - begin 
function encryptSha2LoginPassword(key, struser, strpwd) {

    var username = struser;
    var password = strpwd;
    var shaHash = CryptoJS.SHA512(username + "#" + password);
    var encString = CryptoJS.SHA512(shaHash + "#" + key);
    struser = "";
    strpwd = "";
    username = "";
    password = "";
    shaHash = "";
    return encString;

}


function encryptSha2ProfilePassword(formname, strpwd) {
    try {
        var username = eval("document." + formname + ".username.value");
        var profPass = eval("document." + formname + "." + strpwd + ".value");
        var shaHash = username + "|" + profPass;
        var encString = CryptoJS.SHA512(shaHash)
        //var ppf=eval("document."+formname+"."+strpwd);
        var ppf = eval("document." + formname + "." + "profileSHAPassword");
        ppf.value = encString;
    } catch (error) {

    }

}

function encryptShaPassCode(struser, strpwd) {
    var username = struser;
    var password = strpwd;
    var shaHash = CryptoJS.SHA512(username + "#" + password);
    struser = "";
    strpwd = "";
    username = "";
    password = "";
    return shaHash;

}

// end for Sha2 - end 