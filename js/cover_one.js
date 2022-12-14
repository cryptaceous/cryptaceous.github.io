(() => {
    "use strict";
    const t = 0.5 * (Math.sqrt(3) - 1),
        e = (3 - Math.sqrt(3)) / 6,
        o = 1 / 6,
        n = (Math.sqrt(5) - 1) / 4,
        r = (5 - Math.sqrt(5)) / 20,
        s = new Float32Array([
            1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0,
            1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0,
            -1, -1,
        ]),
        l = new Float32Array([
            0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
            -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1,
            0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0,
            1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1,
            0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0,
            1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1,
            0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0,
            -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0,
        ]),
        c = document.querySelector(".headline--text").innerText,
        h = document.querySelector(".subhead--text").innerText;
    (0 !== h.length && "{subhead}" !== h) ||
        document.querySelector(".subhead--text").remove();
    const i = document.querySelector("canvas"),
        a = i.getContext("2d"),
        f = new (class {
            constructor(t = Math.random) {
                const e =
                    "function" == typeof t
                        ? t
                        : (function (t) {
                              let e = 0,
                                  o = 0,
                                  n = 0,
                                  r = 1;
                              const s = (function () {
                                  let t = 4022871197;
                                  return function (e) {
                                      e = e.toString();
                                      for (
                                          let o = 0;
                                          o < e.length;
                                          o++
                                      ) {
                                          t += e.charCodeAt(o);
                                          let n =
                                          Math.random() *
                                              t;
                                          (t = n >>> 0),
                                              (n -= t),
                                              (n *= t),
                                              (t = n >>> 0),
                                              (n -= t),
                                              (t += 4294967296 * n);
                                      }
                                      return (
                                          3.3283064365386963e-10 *
                                          (t >>> 0)
                                      );
                                  };
                              })();
                              return (
                                  (e = s(" ")),
                                  (o = s(" ")),
                                  (n = s(" ")),
                                  (e -= s(t)),
                                  e < 0 && (e += 1),
                                  (o -= s(t)),
                                  o < 0 && (o += 1),
                                  (n -= s(t)),
                                  n < 0 && (n += 1),
                                  function () {
                                      const t =
                                      Math.floor(Math.random() * 10) * e +
                                          2.3283064365386963e-10 *
                                              r;
                                      return (
                                          (e = o),
                                          (o = n),
                                          (n = t - (r = 0 | t))
                                      );
                                  }
                              );
                          })(t);
                (this.p = (function (t) {
                    const e = new Uint8Array(256);
                    for (let t = 0; t < 256; t++) e[t] = t;
                    for (let o = 0; o < 255; o++) {
                        const n = o + ~~(t() * (256 - o)),
                            r = e[o];
                        (e[o] = e[n]), (e[n] = r);
                    }
                    return e;
                })(e)),
                    (this.perm = new Uint8Array(512)),
                    (this.permMod12 = new Uint8Array(512));
                for (let t = 0; t < 512; t++)
                    (this.perm[t] = this.p[255 & t]),
                        (this.permMod12[t] = this.perm[t] % 12);
            }
            noise2D(o, n) {
                const r = this.permMod12,
                    l = this.perm;
                let c = 0,
                    h = 0,
                    i = 0;
                const a = (o + n) * t,
                    f = Math.floor(o + a),
                    u = Math.floor(n + a),
                    M = (f + u) * e,
                    d = o - (f - M),
                    p = n - (u - M);
                let m, y;
                d > p ? ((m = 1), (y = 0)) : ((m = 0), (y = 1));
                const b = d - m + e,
                    q = p - y + e,
                    g = d - 1 + 2 * e,
                    w = p - 1 + 2 * e,
                    x = 255 & f,
                    D = 255 & u;
                let A = 0.5 - d * d - p * p;
                if (A >= 0) {
                    const t = 3 * r[x + l[D]];
                    (A *= A),
                        (c = A * A * (s[t] * d + s[t + 1] * p));
                }
                let P = 0.5 - b * b - q * q;
                if (P >= 0) {
                    const t = 3 * r[x + m + l[D + y]];
                    (P *= P),
                        (h = P * P * (s[t] * b + s[t + 1] * q));
                }
                let S = 0.5 - g * g - w * w;
                if (S >= 0) {
                    const t = 3 * r[x + 1 + l[D + 1]];
                    (S *= S),
                        (i = S * S * (s[t] * g + s[t + 1] * w));
                }
                return 70 * (c + h + i);
            }
            noise3D(t, e, n) {
                const r = this.permMod12,
                    l = this.perm;
                let c, h, i, a;
                const f = 0.3333333333333333 * (t + e + n),
                    u = Math.floor(t + f),
                    M = Math.floor(e + f),
                    d = Math.floor(n + f),
                    p = (u + M + d) * o,
                    m = t - (u - p),
                    y = e - (M - p),
                    b = n - (d - p);
                let q, g, w, x, D, A;
                m >= y
                    ? y >= b
                        ? ((q = 1),
                          (g = 0),
                          (w = 0),
                          (x = 1),
                          (D = 1),
                          (A = 0))
                        : m >= b
                        ? ((q = 1),
                          (g = 0),
                          (w = 0),
                          (x = 1),
                          (D = 0),
                          (A = 1))
                        : ((q = 0),
                          (g = 0),
                          (w = 1),
                          (x = 1),
                          (D = 0),
                          (A = 1))
                    : y < b
                    ? ((q = 0),
                      (g = 0),
                      (w = 1),
                      (x = 0),
                      (D = 1),
                      (A = 1))
                    : m < b
                    ? ((q = 0),
                      (g = 1),
                      (w = 0),
                      (x = 0),
                      (D = 1),
                      (A = 1))
                    : ((q = 0),
                      (g = 1),
                      (w = 0),
                      (x = 1),
                      (D = 1),
                      (A = 0));
                const P = m - q + o,
                    S = y - g + o,
                    v = b - w + o,
                    I = m - x + 2 * o,
                    T = y - D + 2 * o,
                    k = b - A + 2 * o,
                    C = m - 1 + 0.5,
                    F = y - 1 + 0.5,
                    U = b - 1 + 0.5,
                    O = 255 & u,
                    E = 255 & M,
                    W = 255 & d;
                let j = 0.6 - m * m - y * y - b * b;
                if (j < 0) c = 0;
                else {
                    const t = 3 * r[O + l[E + l[W]]];
                    (j *= j),
                        (c =
                            j *
                            j *
                            (s[t] * m +
                                s[t + 1] * y +
                                s[t + 2] * b));
                }
                let z = 0.6 - P * P - S * S - v * v;
                if (z < 0) h = 0;
                else {
                    const t = 3 * r[O + q + l[E + g + l[W + w]]];
                    (z *= z),
                        (h =
                            z *
                            z *
                            (s[t] * P +
                                s[t + 1] * S +
                                s[t + 2] * v));
                }
                let B = 0.6 - I * I - T * T - k * k;
                if (B < 0) i = 0;
                else {
                    const t = 3 * r[O + x + l[E + D + l[W + A]]];
                    (B *= B),
                        (i =
                            B *
                            B *
                            (s[t] * I +
                                s[t + 1] * T +
                                s[t + 2] * k));
                }
                let G = 0.6 - C * C - F * F - U * U;
                if (G < 0) a = 0;
                else {
                    const t = 3 * r[O + 1 + l[E + 1 + l[W + 1]]];
                    (G *= G),
                        (a =
                            G *
                            G *
                            (s[t] * C +
                                s[t + 1] * F +
                                s[t + 2] * U));
                }
                return 32 * (c + h + i + a);
            }
            noise4D(t, e, o, s) {
                const c = this.perm;
                let h, i, a, f, u;
                const M = (t + e + o + s) * n,
                    d = Math.floor(t + M),
                    p = Math.floor(e + M),
                    m = Math.floor(o + M),
                    y = Math.floor(s + M),
                    b = (d + p + m + y) * r,
                    q = t - (d - b),
                    g = e - (p - b),
                    w = o - (m - b),
                    x = s - (y - b);
                let D = 0,
                    A = 0,
                    P = 0,
                    S = 0;
                q > g ? D++ : A++,
                    q > w ? D++ : P++,
                    q > x ? D++ : S++,
                    g > w ? A++ : P++,
                    g > x ? A++ : S++,
                    w > x ? P++ : S++;
                const v = D >= 3 ? 1 : 0,
                    I = A >= 3 ? 1 : 0,
                    T = P >= 3 ? 1 : 0,
                    k = S >= 3 ? 1 : 0,
                    C = D >= 2 ? 1 : 0,
                    F = A >= 2 ? 1 : 0,
                    U = P >= 2 ? 1 : 0,
                    O = S >= 2 ? 1 : 0,
                    E = D >= 1 ? 1 : 0,
                    W = A >= 1 ? 1 : 0,
                    j = P >= 1 ? 1 : 0,
                    z = S >= 1 ? 1 : 0,
                    B = q - v + r,
                    G = g - I + r,
                    H = w - T + r,
                    J = x - k + r,
                    K = q - C + 2 * r,
                    L = g - F + 2 * r,
                    N = w - U + 2 * r,
                    Q = x - O + 2 * r,
                    R = q - E + 3 * r,
                    V = g - W + 3 * r,
                    X = w - j + 3 * r,
                    Y = x - z + 3 * r,
                    Z = q - 1 + 4 * r,
                    $ = g - 1 + 4 * r,
                    _ = w - 1 + 4 * r,
                    tt = x - 1 + 4 * r,
                    et = 255 & d,
                    ot = 255 & p,
                    nt = 255 & m,
                    rt = 255 & y;
                let st = 0.6 - q * q - g * g - w * w - x * x;
                if (st < 0) h = 0;
                else {
                    const t =
                        (c[et + c[ot + c[nt + c[rt]]]] % 32) * 4;
                    (st *= st),
                        (h =
                            st *
                            st *
                            (l[t] * q +
                                l[t + 1] * g +
                                l[t + 2] * w +
                                l[t + 3] * x));
                }
                let lt = 0.6 - B * B - G * G - H * H - J * J;
                if (lt < 0) i = 0;
                else {
                    const t =
                        (c[
                            et +
                                v +
                                c[ot + I + c[nt + T + c[rt + k]]]
                        ] %
                            32) *
                        4;
                    (lt *= lt),
                        (i =
                            lt *
                            lt *
                            (l[t] * B +
                                l[t + 1] * G +
                                l[t + 2] * H +
                                l[t + 3] * J));
                }
                let ct = 0.6- K * K - L * L - N * N - Q * Q;
                if (ct < 0) a = 0;
                else {
                    const t =
                        (c[
                            et +
                                C +
                                c[ot + F + c[nt + U + c[rt + O]]]
                        ] %
                            32) *
                        4;
                    (ct *= ct),
                        (a =
                            ct *
                            ct *
                            (l[t] * K +
                                l[t + 1] * L +
                                l[t + 2] * N +
                                l[t + 3] * Q));
                }
                let ht = 0.6 - R * R - V * V - X * X - Y * Y;
                if (ht < 0) f = 0;
                else {
                    const t =
                        (c[
                            et +
                                E +
                                c[ot + W + c[nt + j + c[rt + z]]]
                        ] %
                            32) *
                        4;
                    (ht *= ht),
                        (f =
                            ht *
                            ht *
                            (l[t] * R +
                                l[t + 1] * V +
                                l[t + 2] * X +
                                l[t + 3] * Y));
                }
                let it = 0.6 - Z * Z - $ * $ - _ * _ - tt * tt;
                if (it < 0) u = 0;
                else {
                    const t =
                        (c[
                            et +
                                1 +
                                c[ot + 1 + c[nt + 1 + c[rt + 1]]]
                        ] %
                            32) *
                        4;
                    (it *= it),
                        (u =
                            it *
                            it *
                            (l[t] * Z +
                                l[t + 1] * $ +
                                l[t + 2] * _ +
                                l[t + 3] * tt));
                }
                return 27 * (h + i + a + f + u);
            }
        })(c),
        u = 1200,
        M = 0.5,
        d = [
            "#020202",
            "#F3985B",
            "#363232",
            "#C1BEBF",
            "#A76D48",
        ],
        p = 4 / Math.sqrt(2),
        m = Math.ceil(u / p),
        y = Math.ceil(675 / p),
        b = [...new Array(m * y)].map(() => []);
    let q = 1;
    const g = [],
        w = () => (f.noise2D(0, q++) + 1) / 2,
        x = ([t, e], [o, n]) =>
            Math.sqrt(Math.pow(t - o, 2) + Math.pow(e - n, 2)),
        D = ([t, e], o = !0) => {
            const n =
                    f.noise2D((t / u) * M, (e / 675) * M) * Math.PI,
                r =
                    (f.noise3D(
                        (t / u) * M,
                        (e / 675) * M,
                        n / (2 * Math.PI)
                    ) +
                        1) *
                    p;
            return o ? A(n, r) : [n, r];
        },
        A = (t, e) => [Math.cos(t) * e, Math.sin(t) * e],
        P = ([t, e]) => t + e * m,
        S = ([t, e]) => [Math.floor(t / p), Math.floor(e / p)],
        v = (t) => {
            const [e, o] = S(t);
            return P([e, o]);
        },
        I = (t, e = !1) => {
            const o = ((t) => {
                const [e, o] = S(t),
                    n = [];
                for (let t = -1; t <= 1; t++)
                    for (let r = -1; r <= 1; r++)
                        if (
                            e + t >= 0 &&
                            e + t <= m &&
                            o + r >= 0 &&
                            o + r <= y
                        ) {
                            const s = b[P([e + t, o + r])];
                            s && n.push(s);
                        }
                return n.flat();
            })(t);
            for (const n of o)
                if (
                    (!e || !a.isPointInPath(n[0], n[1])) &&
                    x(n, t) < 4
                )
                    return !0;
            return !1;
        },
        T = (t) => {
            const [e, o] = t;
            return e < 20 || e > 1180 || o < 20 || o > 655;
        },
        k = (t, e = t, o = 1, n = !0, r = 0) => {
            n && (a.beginPath(), a.moveTo(t[0], t[1]));
            const s = D(e);
            let l = [e[0] + s[0] * o, e[1] + s[1] * o];
            I(l, !0) || T(l)
                ? o > 0
                    ? (a.moveTo(...t), (l = t), k(t, l, -1, !1))
                    : ((a.lineWidth = Math.floor(Math.random() * 2) + 2),
                      (a.strokeStyle =
                          d[
                              Math.round(
                                  (D(t, !1)[1] / (2 * p)) * d.length
                              )
                          ]),
                      a.stroke(),
                      g.splice(g.indexOf(t), 1))
                : (n && b[v(e)].push(e),
                  r % 5 == 0 &&
                      ((t) => {
                          const [e, o] = t,
                              n = D(t, !1)[0],
                              r = [
                                  A(n - Math.PI / 2, 4),
                                  A(n + Math.PI / 2, 4),
                              ],
                              s = [
                                  [e + r[0][0], o + r[0][1]],
                                  [e + r[1][0], o + r[1][1]],
                              ];
                          for (const t of s)
                              I(t, !1) || T(t) || g.push(t);
                      })(e),
                  r++,
                  b[v(l)].push(l),
                  a.lineTo(l[0], l[1]),
                  k(t, l, o, !1, r));
        };
    (i.style.background = "#27272E"),
        ((t) => {
            for (
                t ||
                    (t = ((t = 1200, e = 675) => [
                        w() * t,
                        w() * e,
                    ])()),
                    g.push(t);
                g.length > 0;

            ) {
                const t = (e = g)[Math.floor(w() * e.length)];
                I(t) ? g.splice(g.indexOf(t), 1) : k(t);
            }
            var e;
        })();
})();