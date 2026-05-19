LavaPack.loadBundle([[7758,{"./curve.js":7754,"./modular.js":7756,"./utils.js":7757},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.DER=n.DERErr=void 0,n.weierstrassPoints=h,n.weierstrass=function(e){const t=function(e){const t=(0,r.validateBasic)(e);return(0,o.validateObject)(t,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...t})}(e),{Fp:s,n:d,nByteLength:f,nBitLength:p}=t,g=s.BYTES+1,m=2*s.BYTES+1;function b(e){return(0,i.mod)(e,d)}function y(e){return(0,i.invert)(e,d)}const{ProjectivePoint:w,normPrivateKeyToScalar:v,weierstrassEquation:E,isWithinCurveOrder:_}=h({...t,toBytes(e,t,n){const r=t.toAffine(),i=s.toBytes(r.x),a=o.concatBytes;return(0,o.abool)("isCompressed",n),n?a(Uint8Array.from([t.hasEvenY()?2:3]),i):a(Uint8Array.from([4]),i,s.toBytes(r.y))},fromBytes(e){const t=e.length,n=e[0],r=e.subarray(1);if(t!==g||2!==n&&3!==n){if(t===m&&4===n){return{x:s.fromBytes(r.subarray(0,s.BYTES)),y:s.fromBytes(r.subarray(s.BYTES,2*s.BYTES))}}throw new Error("invalid Point, expected length of "+g+", or uncompressed "+m+", got "+t)}{const e=(0,o.bytesToNumberBE)(r);if(!(0,o.inRange)(e,u,s.ORDER))throw new Error("Point is not on curve");const t=E(e);let i;try{i=s.sqrt(t)}catch(e){const t=e instanceof Error?": "+e.message:"";throw new Error("Point is not on curve"+t)}return!(1&~n)!==((i&u)===u)&&(i=s.neg(i)),{x:e,y:i}}}});function T(e){return e>d>>u}const S=(e,t,n)=>(0,o.bytesToNumberBE)(e.slice(t,n));class O{constructor(e,t,n){(0,o.aInRange)("r",e,u,d),(0,o.aInRange)("s",t,u,d),this.r=e,this.s=t,null!=n&&(this.recovery=n),Object.freeze(this)}static fromCompact(e){const t=f;return e=(0,o.ensureBytes)("compactSignature",e,2*t),new O(S(e,0,t),S(e,t,2*t))}static fromDER(e){const{r:t,s:r}=n.DER.toSig((0,o.ensureBytes)("DER",e));return new O(t,r)}assertValidity(){}addRecoveryBit(e){return new O(this.r,this.s,e)}recoverPublicKey(e){const{r:n,s:r,recovery:i}=this,a=A((0,o.ensureBytes)("msgHash",e));if(null==i||![0,1,2,3].includes(i))throw new Error("recovery id invalid");const l=2===i||3===i?n+t.n:n;if(l>=s.ORDER)throw new Error("recovery id 2 or 3 invalid");const u=1&i?"03":"02",d=w.fromHex(u+c(l,s.BYTES)),f=y(l),p=b(-a*f),h=b(r*f),g=w.BASE.multiplyAndAddUnsafe(d,p,h);if(!g)throw new Error("point at infinify");return g.assertValidity(),g}hasHighS(){return T(this.s)}normalizeS(){return this.hasHighS()?new O(this.r,b(-this.s),this.recovery):this}toDERRawBytes(){return(0,o.hexToBytes)(this.toDERHex())}toDERHex(){return n.DER.hexFromSig(this)}toCompactRawBytes(){return(0,o.hexToBytes)(this.toCompactHex())}toCompactHex(){const e=f;return c(this.r,e)+c(this.s,e)}}const I={isValidPrivateKey(e){try{return v(e),!0}catch(e){return!1}},normPrivateKeyToScalar:v,randomPrivateKey:()=>{const e=(0,i.getMinHashLength)(t.n);return(0,i.mapHashToField)(t.randomBytes(e),t.n)},precompute:(e=8,t=w.BASE)=>(t._setWindowSize(e),t.multiply(BigInt(3)),t)};function k(e){if("bigint"==typeof e)return!1;if(e instanceof w)return!0;const n=(0,o.ensureBytes)("key",e).length,r=s.BYTES,i=r+1,a=2*r+1;return t.allowedPrivateKeyLengths||f===i?undefined:n===i||n===a}const C=t.bits2int||function(e){if(e.length>8192)throw new Error("input is too large");const t=(0,o.bytesToNumberBE)(e),n=8*e.length-p;return n>0?t>>BigInt(n):t},A=t.bits2int_modN||function(e){return b(C(e))},M=(0,o.bitMask)(p);function P(e){return(0,o.aInRange)("num < 2^"+p,e,l,M),(0,o.numberToBytesBE)(e,f)}function R(e,n,r=x){if(["recovered","canonical"].some(e=>e in r))throw new Error("sign() legacy options not supported");const{hash:i,randomBytes:c}=t;let{lowS:d,prehash:f,extraEntropy:p}=r;null==d&&(d=!0),e=(0,o.ensureBytes)("msgHash",e),a(r),f&&(e=(0,o.ensureBytes)("prehashed msgHash",i(e)));const h=A(e),g=v(n),m=[P(g),P(h)];if(null!=p&&!1!==p){const e=!0===p?c(s.BYTES):p;m.push((0,o.ensureBytes)("extraEntropy",e))}const E=(0,o.concatBytes)(...m),S=h;return{seed:E,k2sig:function(e){const t=C(e);if(!_(t))return;const n=y(t),r=w.BASE.multiply(t).toAffine(),i=b(r.x);if(i===l)return;const o=b(n*b(S+i*g));if(o===l)return;let a=(r.x===i?0:2)|Number(r.y&u),s=o;return d&&T(o)&&(s=function(e){return T(e)?b(-e):e}(o),a^=1),new O(i,s,a)}}}const x={lowS:t.lowS,prehash:!1},D={lowS:t.lowS,prehash:!1};return w.BASE._setWindowSize(8),{CURVE:t,getPublicKey:function(e,t=!0){return w.fromPrivateKey(e).toRawBytes(t)},getSharedSecret:function(e,t,n=!0){if(!0===k(e))throw new Error("first arg must be private key");if(!1===k(t))throw new Error("second arg must be public key");return w.fromHex(t).multiply(v(e)).toRawBytes(n)},sign:function(e,n,r=x){const{seed:i,k2sig:a}=R(e,n,r),s=t;return(0,o.createHmacDrbg)(s.hash.outputLen,s.nByteLength,s.hmac)(i,a)},verify:function(e,r,i,s=D){const c=e;r=(0,o.ensureBytes)("msgHash",r),i=(0,o.ensureBytes)("publicKey",i);const{lowS:l,prehash:u,format:d}=s;if(a(s),"strict"in s)throw new Error("options.strict was renamed to lowS");if(d!==undefined&&"compact"!==d&&"der"!==d)throw new Error("format must be compact or der");const f="string"==typeof c||(0,o.isBytes)(c),p=!f&&!d&&"object"==typeof c&&null!==c&&"bigint"==typeof c.r&&"bigint"==typeof c.s;if(!f&&!p)throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");let h,g=undefined;try{if(p&&(g=new O(c.r,c.s)),f){try{"compact"!==d&&(g=O.fromDER(c))}catch(e){if(!(e instanceof n.DER.Err))throw e}g||"der"===d||(g=O.fromCompact(c))}h=w.fromHex(i)}catch(e){return!1}if(!g)return!1;if(l&&g.hasHighS())return!1;u&&(r=t.hash(r));const{r:m,s:v}=g,E=A(r),_=y(v),T=b(E*_),S=b(m*_),I=w.BASE.multiplyAndAddUnsafe(h,T,S)?.toAffine();if(!I)return!1;return b(I.x)===m},ProjectivePoint:w,Signature:O,utils:I}},n.SWUFpSqrtRatio=g,n.mapToCurveSimpleSWU=function(e,t){if((0,i.validateField)(e),!e.isValid(t.A)||!e.isValid(t.B)||!e.isValid(t.Z))throw new Error("mapToCurveSimpleSWU: invalid opts");const n=g(e,t.Z);if(!e.isOdd)throw new Error("Fp.isOdd is not implemented!");return r=>{let o,a,s,c,l,u,d,f;o=e.sqr(r),o=e.mul(o,t.Z),a=e.sqr(o),a=e.add(a,o),s=e.add(a,e.ONE),s=e.mul(s,t.B),c=e.cmov(t.Z,e.neg(a),!e.eql(a,e.ZERO)),c=e.mul(c,t.A),a=e.sqr(s),u=e.sqr(c),l=e.mul(u,t.A),a=e.add(a,l),a=e.mul(a,s),u=e.mul(u,c),l=e.mul(u,t.B),a=e.add(a,l),d=e.mul(o,s);const{isValid:p,value:h}=n(a,u);f=e.mul(o,r),f=e.mul(f,h),d=e.cmov(d,s,p),f=e.cmov(f,h,p);const g=e.isOdd(r)===e.isOdd(f);f=e.cmov(e.neg(f),f,g);const m=(0,i.FpInvertBatch)(e,[c],!0)[0];return d=e.mul(d,m),{x:d,y:f}}};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const r=e("./curve.js"),i=e("./modular.js"),o=e("./utils.js");function a(e){e.lowS!==undefined&&(0,o.abool)("lowS",e.lowS),e.prehash!==undefined&&(0,o.abool)("prehash",e.prehash)}class s extends Error{constructor(e=""){super(e)}}function c(e,t){return(0,o.bytesToHex)((0,o.numberToBytesBE)(e,t))}n.DERErr=s,n.DER={Err:s,_tlv:{encode:(e,t)=>{const{Err:r}=n.DER;if(e<0||e>256)throw new r("tlv.encode: wrong tag");if(1&t.length)throw new r("tlv.encode: unpadded data");const i=t.length/2,a=(0,o.numberToHexUnpadded)(i);if(a.length/2&128)throw new r("tlv.encode: long form length too big");const s=i>127?(0,o.numberToHexUnpadded)(a.length/2|128):"";return(0,o.numberToHexUnpadded)(e)+s+a+t},decode(e,t){const{Err:r}=n.DER;let i=0;if(e<0||e>256)throw new r("tlv.encode: wrong tag");if(t.length<2||t[i++]!==e)throw new r("tlv.decode: wrong tlv");const o=t[i++];let a=0;if(!!(128&o)){const e=127&o;if(!e)throw new r("tlv.decode(long): indefinite length not supported");if(e>4)throw new r("tlv.decode(long): byte length is too big");const n=t.subarray(i,i+e);if(n.length!==e)throw new r("tlv.decode: length bytes not complete");if(0===n[0])throw new r("tlv.decode(long): zero leftmost byte");for(const e of n)a=a<<8|e;if(i+=e,a<128)throw new r("tlv.decode(long): not minimal encoding")}else a=o;const s=t.subarray(i,i+a);if(s.length!==a)throw new r("tlv.decode: wrong value length");return{v:s,l:t.subarray(i+a)}}},_int:{encode(e){const{Err:t}=n.DER;if(e<l)throw new t("integer: negative integers are not allowed");let r=(0,o.numberToHexUnpadded)(e);if(8&Number.parseInt(r[0],16)&&(r="00"+r),1&r.length)throw new t("unexpected DER parsing assertion: unpadded hex");return r},decode(e){const{Err:t}=n.DER;if(128&e[0])throw new t("invalid signature integer: negative");if(0===e[0]&&!(128&e[1]))throw new t("invalid signature integer: unnecessary leading zero");return(0,o.bytesToNumberBE)(e)}},toSig(e){const{Err:t,_int:r,_tlv:i}=n.DER,a=(0,o.ensureBytes)("signature",e),{v:s,l:c}=i.decode(48,a);if(c.length)throw new t("invalid signature: left bytes after parsing");const{v:l,l:u}=i.decode(2,s),{v:d,l:f}=i.decode(2,u);if(f.length)throw new t("invalid signature: left bytes after parsing");return{r:r.decode(l),s:r.decode(d)}},hexFromSig(e){const{_tlv:t,_int:r}=n.DER,i=t.encode(2,r.encode(e.r))+t.encode(2,r.encode(e.s));return t.encode(48,i)}};const l=BigInt(0),u=BigInt(1),d=BigInt(2),f=BigInt(3),p=BigInt(4);function h(e){const t=function(e){const t=(0,r.validateBasic)(e);(0,o.validateObject)(t,{a:"field",b:"field"},{allowInfinityPoint:"boolean",allowedPrivateKeyLengths:"array",clearCofactor:"function",fromBytes:"function",isTorsionFree:"function",toBytes:"function",wrapPrivateKey:"boolean"});const{endo:n,Fp:i,a:a}=t;if(n){if(!i.eql(a,i.ZERO))throw new Error("invalid endo: CURVE.a must be 0");if("object"!=typeof n||"bigint"!=typeof n.beta||"function"!=typeof n.splitScalar)throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function')}return Object.freeze({...t})}(e),{Fp:n}=t,a=(0,i.Field)(t.n,t.nBitLength),s=t.toBytes||((e,t,r)=>{const i=t.toAffine();return(0,o.concatBytes)(Uint8Array.from([4]),n.toBytes(i.x),n.toBytes(i.y))}),c=t.fromBytes||(e=>{const t=e.subarray(1);return{x:n.fromBytes(t.subarray(0,n.BYTES)),y:n.fromBytes(t.subarray(n.BYTES,2*n.BYTES))}});function d(e){const{a:r,b:i}=t,o=n.sqr(e),a=n.mul(o,e);return n.add(n.add(a,n.mul(e,r)),i)}function h(e,t){const r=n.sqr(t),i=d(e);return n.eql(r,i)}if(!h(t.Gx,t.Gy))throw new Error("bad curve params: generator point");const g=n.mul(n.pow(t.a,f),p),m=n.mul(n.sqr(t.b),BigInt(27));if(n.is0(n.add(g,m)))throw new Error("bad curve params: a or b");function b(e){const{allowedPrivateKeyLengths:n,nByteLength:r,wrapPrivateKey:a,n:s}=t;if(n&&"bigint"!=typeof e){if((0,o.isBytes)(e)&&(e=(0,o.bytesToHex)(e)),"string"!=typeof e||!n.includes(e.length))throw new Error("invalid private key");e=e.padStart(2*r,"0")}let c;try{c="bigint"==typeof e?e:(0,o.bytesToNumberBE)((0,o.ensureBytes)("private key",e,r))}catch(t){throw new Error("invalid private key, expected hex or "+r+" bytes, got "+typeof e)}return a&&(c=(0,i.mod)(c,s)),(0,o.aInRange)("private key",c,u,s),c}function y(e){if(!(e instanceof E))throw new Error("ProjectivePoint expected")}const w=(0,o.memoized)((e,t)=>{const{px:r,py:i,pz:o}=e;if(n.eql(o,n.ONE))return{x:r,y:i};const a=e.is0();null==t&&(t=a?n.ONE:n.inv(o));const s=n.mul(r,t),c=n.mul(i,t),l=n.mul(o,t);if(a)return{x:n.ZERO,y:n.ZERO};if(!n.eql(l,n.ONE))throw new Error("invZ was invalid");return{x:s,y:c}}),v=(0,o.memoized)(e=>{if(e.is0()){if(t.allowInfinityPoint&&!n.is0(e.py))return;throw new Error("bad point: ZERO")}const{x:r,y:i}=e.toAffine();if(!n.isValid(r)||!n.isValid(i))throw new Error("bad point: x or y not FE");if(!h(r,i))throw new Error("bad point: equation left != right");if(!e.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0});class E{constructor(e,t,r){if(null==e||!n.isValid(e))throw new Error("x required");if(null==t||!n.isValid(t)||n.is0(t))throw new Error("y required");if(null==r||!n.isValid(r))throw new Error("z required");this.px=e,this.py=t,this.pz=r,Object.freeze(this)}static fromAffine(e){const{x:t,y:r}=e||{};if(!e||!n.isValid(t)||!n.isValid(r))throw new Error("invalid affine point");if(e instanceof E)throw new Error("projective point not allowed");const i=e=>n.eql(e,n.ZERO);return i(t)&&i(r)?E.ZERO:new E(t,r,n.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(e){const t=(0,i.FpInvertBatch)(n,e.map(e=>e.pz));return e.map((e,n)=>e.toAffine(t[n])).map(E.fromAffine)}static fromHex(e){const t=E.fromAffine(c((0,o.ensureBytes)("pointHex",e)));return t.assertValidity(),t}static fromPrivateKey(e){return E.BASE.multiply(b(e))}static msm(e,t){return(0,r.pippenger)(E,a,e,t)}_setWindowSize(e){S.setWindowSize(this,e)}assertValidity(){v(this)}hasEvenY(){const{y:e}=this.toAffine();if(n.isOdd)return!n.isOdd(e);throw new Error("Field doesn't support isOdd")}equals(e){y(e);const{px:t,py:r,pz:i}=this,{px:o,py:a,pz:s}=e,c=n.eql(n.mul(t,s),n.mul(o,i)),l=n.eql(n.mul(r,s),n.mul(a,i));return c&&l}negate(){return new E(this.px,n.neg(this.py),this.pz)}double(){const{a:e,b:r}=t,i=n.mul(r,f),{px:o,py:a,pz:s}=this;let c=n.ZERO,l=n.ZERO,u=n.ZERO,d=n.mul(o,o),p=n.mul(a,a),h=n.mul(s,s),g=n.mul(o,a);return g=n.add(g,g),u=n.mul(o,s),u=n.add(u,u),c=n.mul(e,u),l=n.mul(i,h),l=n.add(c,l),c=n.sub(p,l),l=n.add(p,l),l=n.mul(c,l),c=n.mul(g,c),u=n.mul(i,u),h=n.mul(e,h),g=n.sub(d,h),g=n.mul(e,g),g=n.add(g,u),u=n.add(d,d),d=n.add(u,d),d=n.add(d,h),d=n.mul(d,g),l=n.add(l,d),h=n.mul(a,s),h=n.add(h,h),d=n.mul(h,g),c=n.sub(c,d),u=n.mul(h,p),u=n.add(u,u),u=n.add(u,u),new E(c,l,u)}add(e){y(e);const{px:r,py:i,pz:o}=this,{px:a,py:s,pz:c}=e;let l=n.ZERO,u=n.ZERO,d=n.ZERO;const p=t.a,h=n.mul(t.b,f);let g=n.mul(r,a),m=n.mul(i,s),b=n.mul(o,c),w=n.add(r,i),v=n.add(a,s);w=n.mul(w,v),v=n.add(g,m),w=n.sub(w,v),v=n.add(r,o);let _=n.add(a,c);return v=n.mul(v,_),_=n.add(g,b),v=n.sub(v,_),_=n.add(i,o),l=n.add(s,c),_=n.mul(_,l),l=n.add(m,b),_=n.sub(_,l),d=n.mul(p,v),l=n.mul(h,b),d=n.add(l,d),l=n.sub(m,d),d=n.add(m,d),u=n.mul(l,d),m=n.add(g,g),m=n.add(m,g),b=n.mul(p,b),v=n.mul(h,v),m=n.add(m,b),b=n.sub(g,b),b=n.mul(p,b),v=n.add(v,b),g=n.mul(m,v),u=n.add(u,g),g=n.mul(_,v),l=n.mul(w,l),l=n.sub(l,g),g=n.mul(w,m),d=n.mul(_,d),d=n.add(d,g),new E(l,u,d)}subtract(e){return this.add(e.negate())}is0(){return this.equals(E.ZERO)}wNAF(e){return S.wNAFCached(this,e,E.normalizeZ)}multiplyUnsafe(e){const{endo:r,n:i}=t;(0,o.aInRange)("scalar",e,l,i);const a=E.ZERO;if(e===l)return a;if(this.is0()||e===u)return this;if(!r||S.hasPrecomputes(this))return S.wNAFCachedUnsafe(this,e,E.normalizeZ);let{k1neg:s,k1:c,k2neg:d,k2:f}=r.splitScalar(e),p=a,h=a,g=this;for(;c>l||f>l;)c&u&&(p=p.add(g)),f&u&&(h=h.add(g)),g=g.double(),c>>=u,f>>=u;return s&&(p=p.negate()),d&&(h=h.negate()),h=new E(n.mul(h.px,r.beta),h.py,h.pz),p.add(h)}multiply(e){const{endo:r,n:i}=t;let a,s;if((0,o.aInRange)("scalar",e,u,i),r){const{k1neg:t,k1:i,k2neg:o,k2:c}=r.splitScalar(e);let{p:l,f:u}=this.wNAF(i),{p:d,f:f}=this.wNAF(c);l=S.constTimeNegate(t,l),d=S.constTimeNegate(o,d),d=new E(n.mul(d.px,r.beta),d.py,d.pz),a=l.add(d),s=u.add(f)}else{const{p:t,f:n}=this.wNAF(e);a=t,s=n}return E.normalizeZ([a,s])[0]}multiplyAndAddUnsafe(e,t,n){const r=E.BASE,i=(e,t)=>t!==l&&t!==u&&e.equals(r)?e.multiply(t):e.multiplyUnsafe(t),o=i(this,t).add(i(e,n));return o.is0()?undefined:o}toAffine(e){return w(this,e)}isTorsionFree(){const{h:e,isTorsionFree:n}=t;if(e===u)return!0;if(n)return n(E,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:e,clearCofactor:n}=t;return e===u?this:n?n(E,this):this.multiplyUnsafe(t.h)}toRawBytes(e=!0){return(0,o.abool)("isCompressed",e),this.assertValidity(),s(E,this,e)}toHex(e=!0){return(0,o.abool)("isCompressed",e),(0,o.bytesToHex)(this.toRawBytes(e))}}E.BASE=new E(t.Gx,t.Gy,n.ONE),E.ZERO=new E(n.ZERO,n.ONE,n.ZERO);const{endo:_,nBitLength:T}=t,S=(0,r.wNAF)(E,_?Math.ceil(T/2):T);return{CURVE:t,ProjectivePoint:E,normPrivateKeyToScalar:b,weierstrassEquation:d,isWithinCurveOrder:function(e){return(0,o.inRange)(e,u,t.n)}}}function g(e,t){const n=e.ORDER;let r=l;for(let e=n-u;e%d===l;e/=d)r+=u;const i=r,o=d<<i-u-u,a=o*d,s=(n-u)/a,c=(s-u)/d,h=a-u,g=o,m=e.pow(t,s),b=e.pow(t,(s+u)/d);let y=(t,n)=>{let r=m,o=e.pow(n,h),a=e.sqr(o);a=e.mul(a,n);let s=e.mul(t,a);s=e.pow(s,c),s=e.mul(s,o),o=e.mul(s,n),a=e.mul(s,t);let l=e.mul(a,o);s=e.pow(l,g);let f=e.eql(s,e.ONE);o=e.mul(a,b),s=e.mul(l,r),a=e.cmov(o,a,f),l=e.cmov(s,l,f);for(let t=i;t>u;t--){let n=t-d;n=d<<n-u;let i=e.pow(l,n);const s=e.eql(i,e.ONE);o=e.mul(a,r),r=e.mul(r,r),i=e.mul(l,r),a=e.cmov(o,a,s),l=e.cmov(i,l,s)}return{isValid:f,value:a}};if(e.ORDER%p===f){const n=(e.ORDER-f)/p,r=e.sqrt(e.neg(t));y=(t,i)=>{let o=e.sqr(i);const a=e.mul(t,i);o=e.mul(o,a);let s=e.pow(o,n);s=e.mul(s,a);const c=e.mul(s,r),l=e.mul(e.sqr(s),i),u=e.eql(l,t);return{isValid:u,value:e.cmov(c,s,u)}}}return y}}}},{package:"viem>@noble/curves",file:"node_modules/viem/node_modules/@noble/curves/abstract/weierstrass.js"}],[7759,{"./_shortw_utils.js":7753,"./abstract/hash-to-curve.js":7755,"./abstract/modular.js":7756,"./abstract/utils.js":7757,"./abstract/weierstrass.js":7758,"@noble/hashes/sha2":4596,"@noble/hashes/utils":4600},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.encodeToCurve=n.hashToCurve=n.secp256k1_hasher=n.schnorr=n.secp256k1=void 0;
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const r=e("@noble/hashes/sha2"),i=e("@noble/hashes/utils"),o=e("./_shortw_utils.js"),a=e("./abstract/hash-to-curve.js"),s=e("./abstract/modular.js"),c=e("./abstract/utils.js"),l=e("./abstract/weierstrass.js"),u=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),d=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),f=BigInt(0),p=BigInt(1),h=BigInt(2),g=(e,t)=>(e+t/h)/t;function m(e){const t=u,n=BigInt(3),r=BigInt(6),i=BigInt(11),o=BigInt(22),a=BigInt(23),c=BigInt(44),l=BigInt(88),d=e*e*e%t,f=d*d*e%t,p=(0,s.pow2)(f,n,t)*f%t,g=(0,s.pow2)(p,n,t)*f%t,m=(0,s.pow2)(g,h,t)*d%t,y=(0,s.pow2)(m,i,t)*m%t,w=(0,s.pow2)(y,o,t)*y%t,v=(0,s.pow2)(w,c,t)*w%t,E=(0,s.pow2)(v,l,t)*v%t,_=(0,s.pow2)(E,c,t)*w%t,T=(0,s.pow2)(_,n,t)*f%t,S=(0,s.pow2)(T,a,t)*y%t,O=(0,s.pow2)(S,r,t)*d%t,I=(0,s.pow2)(O,h,t);if(!b.eql(b.sqr(I),e))throw new Error("Cannot find square root");return I}const b=(0,s.Field)(u,undefined,undefined,{sqrt:m});n.secp256k1=(0,o.createCurve)({a:f,b:BigInt(7),Fp:b,n:d,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:e=>{const t=d,n=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),r=-p*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),i=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),o=n,a=BigInt("0x100000000000000000000000000000000"),c=g(o*e,t),l=g(-r*e,t);let u=(0,s.mod)(e-c*n-l*i,t),f=(0,s.mod)(-c*r-l*o,t);const h=u>a,m=f>a;if(h&&(u=t-u),m&&(f=t-f),u>a||f>a)throw new Error("splitScalar: Endomorphism failed, k="+e);return{k1neg:h,k1:u,k2neg:m,k2:f}}}},r.sha256);const y={};function w(e,...t){let n=y[e];if(n===undefined){const t=(0,r.sha256)(Uint8Array.from(e,e=>e.charCodeAt(0)));n=(0,c.concatBytes)(t,t),y[e]=n}return(0,r.sha256)((0,c.concatBytes)(n,...t))}const v=e=>e.toRawBytes(!0).slice(1),E=e=>(0,c.numberToBytesBE)(e,32),_=e=>(0,s.mod)(e,u),T=e=>(0,s.mod)(e,d),S=(()=>n.secp256k1.ProjectivePoint)();function O(e){let t=n.secp256k1.utils.normPrivateKeyToScalar(e),r=S.fromPrivateKey(t);return{scalar:r.hasEvenY()?t:T(-t),bytes:v(r)}}function I(e){(0,c.aInRange)("x",e,p,u);const t=_(e*e);let n=m(_(t*e+BigInt(7)));n%h!==f&&(n=_(-n));const r=new S(e,n,p);return r.assertValidity(),r}const k=c.bytesToNumberBE;function C(...e){return T(k(w("BIP0340/challenge",...e)))}function A(e){return O(e).bytes}function M(e,t,n=(0,i.randomBytes)(32)){const r=(0,c.ensureBytes)("message",e),{bytes:o,scalar:a}=O(t),s=(0,c.ensureBytes)("auxRand",n,32),l=E(a^k(w("BIP0340/aux",s))),u=w("BIP0340/nonce",l,o,r),d=T(k(u));if(d===f)throw new Error("sign failed: k is zero");const{bytes:p,scalar:h}=O(d),g=C(p,o,r),m=new Uint8Array(64);if(m.set(p,0),m.set(E(T(h+g*a)),32),!P(m,r,o))throw new Error("sign: Invalid signature produced");return m}function P(e,t,n){const r=(0,c.ensureBytes)("signature",e,64),i=(0,c.ensureBytes)("message",t),o=(0,c.ensureBytes)("publicKey",n,32);try{const e=I(k(o)),t=k(r.subarray(0,32));if(!(0,c.inRange)(t,p,u))return!1;const n=k(r.subarray(32,64));if(!(0,c.inRange)(n,p,d))return!1;const f=C(E(t),v(e),i),h=(a=e,s=n,l=T(-f),S.BASE.multiplyAndAddUnsafe(a,s,l));return!(!h||!h.hasEvenY()||h.toAffine().x!==t)}catch(e){return!1}var a,s,l}n.schnorr={getPublicKey:A,sign:M,verify:P,utils:{randomPrivateKey:n.secp256k1.utils.randomPrivateKey,lift_x:I,pointToBytes:v,numberToBytesBE:c.numberToBytesBE,bytesToNumberBE:c.bytesToNumberBE,taggedHash:w,mod:s.mod}};const R=(()=>(0,a.isogenyMap)(b,[["0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7","0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581","0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262","0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"],["0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b","0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14","0x0000000000000000000000000000000000000000000000000000000000000001"],["0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c","0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3","0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931","0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"],["0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b","0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573","0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f","0x0000000000000000000000000000000000000000000000000000000000000001"]].map(e=>e.map(e=>BigInt(e)))))(),x=(()=>(0,l.mapToCurveSimpleSWU)(b,{A:BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),B:BigInt("1771"),Z:b.create(BigInt("-11"))}))();n.secp256k1_hasher=(0,a.createHasher)(n.secp256k1.ProjectivePoint,e=>{const{x:t,y:n}=x(b.create(e[0]));return R(t,n)},{DST:"secp256k1_XMD:SHA-256_SSWU_RO_",encodeDST:"secp256k1_XMD:SHA-256_SSWU_NU_",p:b.ORDER,m:1,k:128,expand:"xmd",hash:r.sha256}),n.hashToCurve=n.secp256k1_hasher.hashToCurve,n.encodeToCurve=n.secp256k1_hasher.encodeToCurve}}},{package:"viem>@noble/curves",file:"node_modules/viem/node_modules/@noble/curves/secp256k1.js"}],[7760,{"./utils.js":7761},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.WebSocket=void 0;var r=e("./utils.js");n.WebSocket=(0,r.getNativeWebSocket)()}}},{package:"viem>isows",file:"node_modules/viem/node_modules/isows/_esm/native.js"}],[7761,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.getNativeWebSocket=function(){if("undefined"!=typeof WebSocket)return WebSocket;if(void 0!==global.WebSocket)return global.WebSocket;if(void 0!==window.WebSocket)return window.WebSocket;if(void 0!==self.WebSocket)return self.WebSocket;throw new Error("`WebSocket` is not supported in this environment")}}}},{package:"viem>isows",file:"node_modules/viem/node_modules/isows/_esm/utils.js"}],[7764,{util:7404},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){n.TextEncoder="undefined"!=typeof TextEncoder?TextEncoder:e("util").TextEncoder,n.TextDecoder="undefined"!=typeof TextDecoder?TextDecoder:e("util").TextDecoder}}},{package:"@ensdomains/content-hash>multihashes>web-encoding",file:"node_modules/web-encoding/src/lib.js"}],[7768,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){!function(e,r){"object"==typeof n&&void 0!==t?r(n):"function"==typeof define&&define.amd?define(["exports"],r):r(e.WHATWGFetch={})}(this,function(e){var t="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||"undefined"!=typeof global&&global||{},n="URLSearchParams"in t,r="Symbol"in t&&"iterator"in Symbol,i="FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(e){return!1}}(),o="FormData"in t,a="ArrayBuffer"in t;if(a)var s=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],c=ArrayBuffer.isView||function(e){return e&&s.indexOf(Object.prototype.toString.call(e))>-1};function l(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||""===e)throw new TypeError('Invalid character in header field name: "'+e+'"');return e.toLowerCase()}function u(e){return"string"!=typeof e&&(e=String(e)),e}function d(e){var t={next:function(){var t=e.shift();return{done:t===undefined,value:t}}};return r&&(t[Symbol.iterator]=function(){return t}),t}function f(e){this.map={},e instanceof f?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){if(2!=e.length)throw new TypeError("Headers constructor: expected name/value pair to be length 2, found"+e.length);this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function p(e){if(!e._noBody)return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function h(e){return new Promise(function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function g(e){var t=new FileReader,n=h(t);return t.readAsArrayBuffer(e),n}function m(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function b(){return this.bodyUsed=!1,this._initBody=function(e){var t;this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:i&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:o&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:n&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():a&&i&&((t=e)&&DataView.prototype.isPrototypeOf(t))?(this._bodyArrayBuffer=m(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):a&&(ArrayBuffer.prototype.isPrototypeOf(e)||c(e))?this._bodyArrayBuffer=m(e):this._bodyText=e=Object.prototype.toString.call(e):(this._noBody=!0,this._bodyText=""),this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},i&&(this.blob=function(){var e=p(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))}),this.arrayBuffer=function(){if(this._bodyArrayBuffer){var e=p(this);return e||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}if(i)return this.blob().then(g);throw new Error("could not read as ArrayBuffer")},this.text=function(){var e,t,n,r,i,o=p(this);if(o)return o;if(this._bodyBlob)return e=this._bodyBlob,t=new FileReader,n=h(t),r=/charset=([A-Za-z0-9_-]+)/.exec(e.type),i=r?r[1]:"utf-8",t.readAsText(e,i),n;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},o&&(this.formData=function(){return this.text().then(v)}),this.json=function(){return this.text().then(JSON.parse)},this}f.prototype.append=function(e,t){e=l(e),t=u(t);var n=this.map[e];this.map[e]=n?n+", "+t:t},f.prototype.delete=function(e){delete this.map[l(e)]},f.prototype.get=function(e){return e=l(e),this.has(e)?this.map[e]:null},f.prototype.has=function(e){return this.map.hasOwnProperty(l(e))},f.prototype.set=function(e,t){this.map[l(e)]=u(t)},f.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},f.prototype.keys=function(){var e=[];return this.forEach(function(t,n){e.push(n)}),d(e)},f.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),d(e)},f.prototype.entries=function(){var e=[];return this.forEach(function(t,n){e.push([n,t])}),d(e)},r&&(f.prototype[Symbol.iterator]=f.prototype.entries);var y=["CONNECT","DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT","TRACE"];function w(e,n){if(!(this instanceof w))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,i,o=(n=n||{}).body;if(e instanceof w){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,n.headers||(this.headers=new f(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,o||null==e._bodyInit||(o=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=n.credentials||this.credentials||"same-origin",!n.headers&&this.headers||(this.headers=new f(n.headers)),this.method=(r=n.method||this.method||"GET",i=r.toUpperCase(),y.indexOf(i)>-1?i:r),this.mode=n.mode||this.mode||null,this.signal=n.signal||this.signal||function(){if("AbortController"in t)return(new AbortController).signal}(),this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(o),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==n.cache&&"no-cache"!==n.cache)){var a=/([?&])_=[^&]*/;if(a.test(this.url))this.url=this.url.replace(a,"$1_="+(new Date).getTime());else{this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}}function v(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var n=e.split("="),r=n.shift().replace(/\+/g," "),i=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(r),decodeURIComponent(i))}}),t}function E(e,t){if(!(this instanceof E))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(t||(t={}),this.type="default",this.status=t.status===undefined?200:t.status,this.status<200||this.status>599)throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");this.ok=this.status>=200&&this.status<300,this.statusText=t.statusText===undefined?"":""+t.statusText,this.headers=new f(t.headers),this.url=t.url||"",this._initBody(e)}w.prototype.clone=function(){return new w(this,{body:this._bodyInit})},b.call(w.prototype),b.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})},E.error=function(){var e=new E(null,{status:200,statusText:""});return e.ok=!1,e.status=0,e.type="error",e};var _=[301,302,303,307,308];E.redirect=function(e,t){if(-1===_.indexOf(t))throw new RangeError("Invalid status code");return new E(null,{status:t,headers:{location:e}})},e.DOMException=t.DOMException;try{new e.DOMException}catch(t){e.DOMException=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack},e.DOMException.prototype=Object.create(Error.prototype),e.DOMException.prototype.constructor=e.DOMException}function T(n,r){return new Promise(function(o,s){var c=new w(n,r);if(c.signal&&c.signal.aborted)return s(new e.DOMException("Aborted","AbortError"));var d=new XMLHttpRequest;function p(){d.abort()}if(d.onload=function(){var e,t,n={statusText:d.statusText,headers:(e=d.getAllResponseHeaders()||"",t=new f,e.replace(/\r?\n[\t ]+/g," ").split("\r").map(function(e){return 0===e.indexOf("\n")?e.substr(1,e.length):e}).forEach(function(e){var n=e.split(":"),r=n.shift().trim();if(r){var i=n.join(":").trim();try{t.append(r,i)}catch(e){console.warn("Response "+e.message)}}}),t)};0===c.url.indexOf("file://")&&(d.status<200||d.status>599)?n.status=200:n.status=d.status,n.url="responseURL"in d?d.responseURL:n.headers.get("X-Request-URL");var r="response"in d?d.response:d.responseText;setTimeout(function(){o(new E(r,n))},0)},d.onerror=function(){setTimeout(function(){s(new TypeError("Network request failed"))},0)},d.ontimeout=function(){setTimeout(function(){s(new TypeError("Network request timed out"))},0)},d.onabort=function(){setTimeout(function(){s(new e.DOMException("Aborted","AbortError"))},0)},d.open(c.method,function(e){try{return""===e&&t.location.href?t.location.href:e}catch(t){return e}}(c.url),!0),"include"===c.credentials?d.withCredentials=!0:"omit"===c.credentials&&(d.withCredentials=!1),"responseType"in d&&(i?d.responseType="blob":a&&(d.responseType="arraybuffer")),r&&"object"==typeof r.headers&&!(r.headers instanceof f||t.Headers&&r.headers instanceof t.Headers)){var h=[];Object.getOwnPropertyNames(r.headers).forEach(function(e){h.push(l(e)),d.setRequestHeader(e,u(r.headers[e]))}),c.headers.forEach(function(e,t){-1===h.indexOf(t)&&d.setRequestHeader(t,e)})}else c.headers.forEach(function(e,t){d.setRequestHeader(t,e)});c.signal&&(c.signal.addEventListener("abort",p),d.onreadystatechange=function(){4===d.readyState&&c.signal.removeEventListener("abort",p)}),d.send(void 0===c._bodyInit?null:c._bodyInit)})}T.polyfill=!0,t.fetch||(t.fetch=T,t.Headers=f,t.Request=w,t.Response=E),e.Headers=f,e.Request=w,e.Response=E,e.fetch=T,Object.defineProperty(e,"__esModule",{value:!0})})}}},{package:"@open-rpc/test-coverage>isomorphic-fetch>whatwg-fetch",file:"node_modules/whatwg-fetch/dist/fetch.umd.js"}],[7777,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.METAMETRICS_FINALIZE_EVENT_FRAGMENT_ALARM=n.AUTO_LOCK_TIMEOUT_ALARM=void 0;n.AUTO_LOCK_TIMEOUT_ALARM="AUTO_LOCK_TIMEOUT_ALARM",n.METAMETRICS_FINALIZE_EVENT_FRAGMENT_ALARM="METAMETRICS_FINALIZE_EVENT_FRAGMENT_ALARM"}}},{package:"$root$",file:"shared/constants/alarms.js"}],[7784,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.METAMASK_RESTORING_PAGE_URL=n.CRITICAL_ERROR_RESTORE_KEY=void 0;n.CRITICAL_ERROR_RESTORE_KEY="criticalErrorRestore",n.METAMASK_RESTORING_PAGE_URL="https://metamask.io/restoring"}}},{package:"$root$",file:"shared/constants/critical-error-restore-session.ts"}],[7787,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.DefiReferralPartner=n.DEFI_REFERRAL_PARTNERS=void 0,n.getPartnerByOrigin=function(e){return Object.values(i).find(t=>e===t.origin)};let r=n.DefiReferralPartner=function(e){return e.Hyperliquid="hyperliquid",e.GMX="gmx",e.AsterDEX="asterdex",e}({});const i=n.DEFI_REFERRAL_PARTNERS={[r.Hyperliquid]:{id:r.Hyperliquid,name:"Hyperliquid",origin:"https://app.hyperliquid.xyz",referralUrl:"https://app.hyperliquid.xyz/join/MMREFCSI",learnMoreUrl:"https://hyperliquid.gitbook.io/hyperliquid-docs/referrals",approvalType:"hyperliquid_referral_consent",connectionFlow:"permissions"},[r.GMX]:{id:r.GMX,name:"GMX",origin:"https://app.gmx.io",referralUrl:"https://app.gmx.io/#/referrals/?ref=MMREFCSI2",learnMoreUrl:"https://docs.gmx.io/docs/referrals/",approvalType:"gmx_referral_consent",connectionFlow:"permissions"},[r.AsterDEX]:{id:r.AsterDEX,name:"AsterDEX",origin:"https://www.asterdex.com",referralUrl:"https://www.asterdex.com/en/trade/pro/futures/BTCUSDT?ref=82636D",learnMoreUrl:"https://docs.asterdex.com/product/aster-perpetuals/referral-program",approvalType:"asterdex_referral_consent",connectionFlow:"permissions_then_signature"}}}}},{package:"$root$",file:"shared/constants/defi-referrals.ts"}],[7789,{"@metamask/keyring-api":2860},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.ETH_EOA_METHODS=n.ETH_4337_METHODS=void 0;var r=e("@metamask/keyring-api");n.ETH_EOA_METHODS=[r.EthMethod.PersonalSign,r.EthMethod.SignTransaction,r.EthMethod.SignTypedDataV1,r.EthMethod.SignTypedDataV3,r.EthMethod.SignTypedDataV4],n.ETH_4337_METHODS=[r.EthMethod.PrepareUserOperation,r.EthMethod.PatchUserOperation,r.EthMethod.SignUserOperation]}}},{package:"$root$",file:"shared/constants/eth-methods.ts"}],[7797,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.LOG_EVENT=void 0;n.LOG_EVENT={VERSION_UPDATE:"Extension version update"}}}},{package:"$root$",file:"shared/constants/logs.ts"}],[78,{"../../../../shared/constants/critical-error-restore-session":7784,"../../../../shared/lib/sentry":7955,loglevel:6473,"webextension-polyfill":7767},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.clearCriticalErrorRestoreSession=async function(e){try{await e.storage.local.remove(a.CRITICAL_ERROR_RESTORE_KEY)}catch(e){(0,o.captureException)(new Error("critical-error-restore: failed to clear restore session from storage.local",{cause:e}))}},n.handoffRestoringTabToExtension=async function(e,t){await async function(e,t){if("number"!=typeof t.tabId)return i.default.warn("critical-error-restore: missing restoring tab id; opening extension UI in a new tab"),!1;const n=new URL(t.tabUrl);let o;try{o=await r.default.tabs.get(t.tabId)}catch(e){return i.default.warn("critical-error-restore: restoring tab is gone",e),!1}if(!o.url)return i.default.warn("critical-error-restore: restoring tab has no URL"),!1;const a=new URL(o.url);if(a.origin!==n.origin||!a.pathname.endsWith("/restoring")||a.hash!==n.hash)return i.default.warn(`critical-error-restore: restoring tab URL diverged — expected ${t.tabUrl}, got ${o.url}`),!1;try{return await r.default.tabs.update(t.tabId,{active:!0,url:e.getExtensionURL()}),!0}catch(e){return i.default.warn("critical-error-restore: failed to update restoring tab; opening extension UI in a new tab",e),!1}}(e,t)||await async function(e){try{const t=e.getExtensionURL();await r.default.tabs.create({url:t,active:!0})}catch(e){i.default.error("critical-error-restore: failed to open extension UI in a new tab",e)}}(e)},n.openRestoringTabAndReload=async function(e){const t=crypto.randomUUID(),n=`${a.METAMASK_RESTORING_PAGE_URL}#${t}`,o={tabUrl:n};try{const{id:e}=await r.default.tabs.create({url:n,active:!0});"number"==typeof e&&(o.tabId=e)}catch(e){i.default.error(e)}await r.default.storage.local.set({[a.CRITICAL_ERROR_RESTORE_KEY]:o}),await e()},n.readCriticalErrorRestoreSession=async function(e){try{const t=(await e.storage.local.get(a.CRITICAL_ERROR_RESTORE_KEY))[a.CRITICAL_ERROR_RESTORE_KEY];if(!t||"object"!=typeof t)return null;const{tabUrl:n,tabId:r}=t;return"string"!=typeof n?null:{tabId:"number"==typeof r?r:undefined,tabUrl:n}}catch(e){return(0,o.captureException)(e),null}};var r=s(e("webextension-polyfill")),i=s(e("loglevel")),o=e("../../../../shared/lib/sentry"),a=e("../../../../shared/constants/critical-error-restore-session");function s(e){return e&&e.__esModule?e:{default:e}}}}},{package:"$root$",file:"app/scripts/lib/critical-error/critical-error-tab-handoff.ts"}],[7807,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.PASSKEY_AUTO_UNLOCK_SUPPRESSION_DURATION_MS=void 0;n.PASSKEY_AUTO_UNLOCK_SUPPRESSION_DURATION_MS=1e3}}},{package:"$root$",file:"shared/constants/passkey.ts"}],[7813,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.PRICE_API_CURRENCIES=void 0;n.PRICE_API_CURRENCIES=["aud","hkd","sgd","idr","inr","nzd","php","btc","cad","eur","gbp","jpy","ltc","rub","uah","usd","xlm","xrp","sek","aed","ars","bch","bnb","brl","clp","cny","czk","dkk","chf","dot","eos","eth","gel","huf","ils","krw","mxn","myr","ngn","nok","pln","thb","try","zar"]}}},{package:"$root$",file:"shared/constants/price-api-currencies.ts"}],[7831,{"../manifestFlags":7921,"./active-ab-test-assignment":7832,"./configs/defi-referral-ui":7833,"./resolve-ab-test-assignment":7834},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.AB_TEST_ANALYTICS_MAPPINGS=void 0,n.clearABTestAnalyticsMappings=function(){s.length=0},n.enrichWithABTests=function(e,t,n=s){const r=(0,o.normalizeActiveABTestAssignments)(e.properties?.active_ab_tests),i=n.filter(t=>c(t,e.event));if(0===i.length)return 0===r.length?e:l(e,r);const u=i.flatMap(e=>{const{variantName:n,isActive:r}=(0,a.resolveABTestAssignment)(t,e.flagKey,e.validVariants);return r?[(0,o.createActiveABTestAssignment)(e.flagKey,n)]:[]});if(0===u.length)return 0===r.length?e:l(e,r);const d=[...r],f=new Set(r.map(({key:e})=>e));for(const e of u)f.has(e.key)||(f.add(e.key),d.push(e));return l(e,d)},n.getRemoteFeatureFlagsWithManifestOverrides=function(e){return{...e,...(0,r.getManifestFlags)().remoteFeatureFlags}},n.hasABTestAnalyticsMappingForEvent=function(e,t=s){return t.some(t=>c(t,e))};var r=e("../manifestFlags"),i=e("./configs/defi-referral-ui"),o=e("./active-ab-test-assignment"),a=e("./resolve-ab-test-assignment");const s=n.AB_TEST_ANALYTICS_MAPPINGS=[i.DEFI_REFERRAL_UI_AB_TEST_ANALYTICS_MAPPING];const c=(e,t)=>e.eventNames.includes(t);const l=(e,t)=>({...e,properties:{...e.properties,active_ab_tests:t}})}}},{package:"$root$",file:"shared/lib/ab-testing/ab-test-analytics.ts"}],[7832,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){function r(e,t){return{key:e,value:t,key_value_pair:`${e}=${t}`}}Object.defineProperty(n,"__esModule",{value:!0}),n.createActiveABTestAssignment=r,n.normalizeActiveABTestAssignments=function(e){if(!Array.isArray(e))return[];return e.filter(i).map(({key:e,value:t})=>r(e,t))};const i=e=>Boolean(e&&"object"==typeof e&&"key"in e&&"string"==typeof e.key&&"value"in e&&"string"==typeof e.value)}}},{package:"$root$",file:"shared/lib/ab-testing/active-ab-test-assignment.ts"}],[7844,{"@metamask/profile-sync-controller/sdk":3562},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.isForceAuthMatchBuild=i,n.loadAuthenticationConfig=function(){if(!i())return r.Env.PRD;0;return r.Env.PRD};var r=e("@metamask/profile-sync-controller/sdk");function i(){return"true"===(!1)?.toString()}}}},{package:"$root$",file:"shared/lib/authentication/config.ts"}],[7845,{"./config":7844},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var r=e("./config");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&(e in n&&n[e]===r[e]||Object.defineProperty(n,e,{enumerable:!0,get:function(){return r[e]}}))})}}},{package:"$root$",file:"shared/lib/authentication/index.ts"}],[7850,{"@metamask/utils":4353,"readable-stream":6946},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.createCaipStream=n.CaipStream=void 0;var r=e("@metamask/utils"),i=e("readable-stream");function o(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class a extends i.Duplex{constructor(e){super({objectMode:!0}),o(this,"parent",void 0),this.parent=e}_read(){return undefined}_write(e,t,n){this.parent.push({type:"caip-348",data:e}),n()}}class s extends i.Duplex{constructor(){super({objectMode:!0}),o(this,"substream",void 0),this.substream=new a(this)}_read(){return undefined}_write(e,t,n){(0,r.isObject)(e)&&"caip-348"===e.type&&this.substream.push(e.data),n()}}n.CaipStream=s;n.createCaipStream=e=>{const t=new s,n=()=>{t.substream.destroyed||t.substream.writableEnded||t.substream.end()};return e.once?.("close",n),e.once?.("end",n),(0,i.pipeline)(e,t,e,e=>{t.substream.destroy(),e&&"Premature close"!==e.message&&console.error("MetaMask CAIP stream error:",e)}),t.substream}}}},{package:"$root$",file:"shared/lib/caip-stream.ts"}],[7888,{"@metamask/delegation-deployments":1877},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.PREFERRED_VERSION=void 0,n.getDeleGatorEnvironment=function(e,t=i){const n=r.DELEGATOR_CONTRACTS[t]?.[e];if(!n)throw new Error(`No contracts found for version ${t} chain ${e}`);return{EIP7702StatelessDeleGatorImpl:n.EIP7702StatelessDeleGatorImpl,DelegationManager:n.DelegationManager,EntryPoint:n.EntryPoint,SimpleFactory:n.SimpleFactory,implementations:{MultiSigDeleGatorImpl:n.MultiSigDeleGatorImpl,HybridDeleGatorImpl:n.HybridDeleGatorImpl},caveatEnforcers:{AllowedCalldataEnforcer:n.AllowedCalldataEnforcer,AllowedMethodsEnforcer:n.AllowedMethodsEnforcer,AllowedTargetsEnforcer:n.AllowedTargetsEnforcer,ArgsEqualityCheckEnforcer:n.ArgsEqualityCheckEnforcer,BlockNumberEnforcer:n.BlockNumberEnforcer,DeployedEnforcer:n.DeployedEnforcer,ERC20BalanceChangeEnforcer:n.ERC20BalanceChangeEnforcer,ERC20BalanceGteEnforcer:n.ERC20BalanceGteEnforcer,ERC20TransferAmountEnforcer:n.ERC20TransferAmountEnforcer,ERC20StreamingEnforcer:n.ERC20StreamingEnforcer,ERC721BalanceChangeEnforcer:n.ERC721BalanceChangeEnforcer,ERC721BalanceGteEnforcer:n.ERC721BalanceGteEnforcer,ERC721TransferEnforcer:n.ERC721TransferEnforcer,ERC1155BalanceChangeEnforcer:n.ERC1155BalanceChangeEnforcer,ERC1155BalanceGteEnforcer:n.ERC1155BalanceGteEnforcer,IdEnforcer:n.IdEnforcer,LimitedCallsEnforcer:n.LimitedCallsEnforcer,NonceEnforcer:n.NonceEnforcer,TimestampEnforcer:n.TimestampEnforcer,ValueLteEnforcer:n.ValueLteEnforcer,MultiTokenPeriodEnforcer:n.MultiTokenPeriodEnforcer,NativeTokenTransferAmountEnforcer:n.NativeTokenTransferAmountEnforcer,NativeBalanceChangeEnforcer:n.NativeBalanceChangeEnforcer,NativeBalanceGteEnforcer:n.NativeBalanceGteEnforcer,NativeTokenStreamingEnforcer:n.NativeTokenStreamingEnforcer,NativeTokenPaymentEnforcer:n.NativeTokenPaymentEnforcer,OwnershipTransferEnforcer:n.OwnershipTransferEnforcer,RedeemerEnforcer:n.RedeemerEnforcer,SpecificActionERC20TransferBatchEnforcer:"0x6649b61c873F6F9686A1E1ae9ee98aC380c7bA13",ERC20PeriodTransferEnforcer:n.ERC20PeriodTransferEnforcer,NativeTokenPeriodTransferEnforcer:n.NativeTokenPeriodTransferEnforcer,ExactCalldataBatchEnforcer:n.ExactCalldataBatchEnforcer,ExactCalldataEnforcer:n.ExactCalldataEnforcer,ExactExecutionEnforcer:n.ExactExecutionEnforcer,ExactExecutionBatchEnforcer:n.ExactExecutionBatchEnforcer}}};var r=e("@metamask/delegation-deployments");const i=n.PREFERRED_VERSION="1.3.0"}}},{package:"$root$",file:"shared/lib/delegation/environment.ts"}],[7890,{"./delegation":7887,"./environment":7888,"./execution":7889},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"BATCH_DEFAULT_MODE",{enumerable:!0,get:function(){return o.BATCH_DEFAULT_MODE}}),Object.defineProperty(n,"BATCH_TRY_MODE",{enumerable:!0,get:function(){return o.BATCH_TRY_MODE}}),Object.defineProperty(n,"SINGLE_DEFAULT_MODE",{enumerable:!0,get:function(){return o.SINGLE_DEFAULT_MODE}}),Object.defineProperty(n,"SINGLE_TRY_MODE",{enumerable:!0,get:function(){return o.SINGLE_TRY_MODE}}),Object.defineProperty(n,"createDelegation",{enumerable:!0,get:function(){return i.createDelegation}}),Object.defineProperty(n,"createExecution",{enumerable:!0,get:function(){return o.createExecution}}),Object.defineProperty(n,"createOpenDelegation",{enumerable:!0,get:function(){return i.createOpenDelegation}}),Object.defineProperty(n,"encodeBatchExecution",{enumerable:!0,get:function(){return o.encodeBatchExecution}}),Object.defineProperty(n,"encodeDelegation",{enumerable:!0,get:function(){return i.encodeDelegation}}),Object.defineProperty(n,"encodeExecutionCalldata",{enumerable:!0,get:function(){return o.encodeExecutionCalldata}}),Object.defineProperty(n,"encodeExecutionCalldatas",{enumerable:!0,get:function(){return o.encodeExecutionCalldatas}}),Object.defineProperty(n,"encodePermissionContexts",{enumerable:!0,get:function(){return i.encodePermissionContexts}}),Object.defineProperty(n,"encodeRedeemDelegations",{enumerable:!0,get:function(){return i.encodeRedeemDelegations}}),Object.defineProperty(n,"encodeSingleExecution",{enumerable:!0,get:function(){return o.encodeSingleExecution}}),Object.defineProperty(n,"getDeleGatorEnvironment",{enumerable:!0,get:function(){return r.getDeleGatorEnvironment}}),Object.defineProperty(n,"getDelegationHashOffchain",{enumerable:!0,get:function(){return i.getDelegationHashOffchain}}),Object.defineProperty(n,"toDelegationStruct",{enumerable:!0,get:function(){return i.toDelegationStruct}});var r=e("./environment"),i=e("./delegation"),o=e("./execution")}}},{package:"$root$",file:"shared/lib/delegation/index.ts"}],[79,{"../../../../shared/constants/metametrics":7799,"../segment/early-segment-tracking":133},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.trackCriticalErrorEvent=function(e,t,n,o){(0,i.trackEarlySegmentEvent)({state:e,event:t,category:r.MetaMetricsEventCategory.Error,properties:{error_type:n,...o}})};var r=e("../../../../shared/constants/metametrics"),i=e("../segment/early-segment-tracking")}}},{package:"$root$",file:"app/scripts/lib/critical-error/track-critical-error.ts"}],[7923,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.getSmartTransactionMetricsProperties=void 0;n.getSmartTransactionMetricsProperties=(e,t)=>{const n=e.getSmartTransactionsPreferenceEnabled(),r=e.getSmartTransactionsEnabled(t.chainId),i={is_smart_transactions_user_opt_in:n,is_smart_transactions_available:r,is_smart_transaction:e.getIsSmartTransaction(t.chainId)};if(!n||!r)return i;const o=e.getSmartTransactionByMinedTxHash(t.hash),a=o?.statusMetadata;return a?(i.stx_original_transaction_status=a.originalTransactionStatus,i):i}}}},{package:"$root$",file:"shared/lib/metametrics.ts"}],[7965,{"@metamask/storage-service":4083,"webextension-polyfill":7767},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.BrowserStorageAdapter=void 0;var r,i=(r=e("webextension-polyfill"))&&r.__esModule?r:{default:r},o=e("@metamask/storage-service");function a(e,t){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,t),t.add(e)}function s(e,t,n){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:n;throw new TypeError("Private element is not present on this object")}var c=new WeakSet;function l(e,t){return`${o.STORAGE_KEY_PREFIX}${e}:${t}`}n.BrowserStorageAdapter=class{constructor(){a(this,c)}async getItem(e,t){try{const n=s(c,this,l).call(this,e,t),r=await i.default.storage.local.get(n);return n in r?{result:r[n]}:{}}catch(n){return console.error(`StorageService: Failed to get item: ${e}:${t}`,n),{error:n}}}async setItem(e,t,n){try{const r=s(c,this,l).call(this,e,t);await i.default.storage.local.set({[r]:n})}catch(n){throw console.error(`StorageService: Failed to set item: ${e}:${t}`,n),n}}async removeItem(e,t){try{const n=s(c,this,l).call(this,e,t);await i.default.storage.local.remove(n)}catch(n){throw console.error(`StorageService: Failed to remove item: ${e}:${t}`,n),n}}async getAllKeys(e){try{const t=`${o.STORAGE_KEY_PREFIX}${e}:`,n=await i.default.storage.local.get(null);return Object.keys(n).filter(e=>e.startsWith(t)).map(e=>e.slice(t.length))}catch(t){throw console.error(`StorageService: Failed to get keys for ${e}`,t),t}}async clear(e){try{const t=(await this.getAllKeys(e)).map(t=>s(c,this,l).call(this,e,t));t.length>0&&await i.default.storage.local.remove(t)}catch(t){throw console.error(`StorageService: Failed to clear namespace ${e}`,t),t}}}}}},{package:"$root$",file:"shared/lib/stores/browser-storage-adapter.ts"}],[7976,{"@ethersproject/contracts":843,"@ethersproject/providers":881,"@metamask/metamask-eth-abis":2981},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.fetchERC1155Balance=async function(e,t,n,a){if(!t||!n)return null;const s=new o.Web3Provider(a),c=new i.Contract(e,r.abiERC1155,s),l=c?c.balanceOf(t,n):Promise.resolve();return await l},n.fetchTokenBalance=async function(e,t,n){const a=new o.Web3Provider(n),s=new i.Contract(e,r.abiERC20,a),c=s?s.balanceOf(t):Promise.resolve();return await c},n.getTokenIdParam=function(e={}){return e?.args?._tokenId?.toString()??e?.args?.id?.toString()};var r=e("@metamask/metamask-eth-abis"),i=e("@ethersproject/contracts"),o=e("@ethersproject/providers")}}},{package:"$root$",file:"shared/lib/token-util.ts"}],[7986,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.sanitizeMessageRecursively=function e(t,n,r){const i={},o=n[r];if(!o)return t;for(const r of o){const{name:o,type:a}=r;t[o]!==undefined&&(n[a]?i[o]=e(t[o],n,a):i[o]=t[o])}return i}}}},{package:"$root$",file:"shared/lib/typed-signature.ts"}],[7989,{"../constants/metametrics":7799,"@metamask/utils":4353},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.hasNonZeroTokenBalance=n.hasNonZeroMultichainBalance=n.getWalletFundsObtainedEventProperties=n.getMidnightISOTimestamp=n.getAmountBucket=n.AmountBucket=void 0;var r=e("@metamask/utils"),i=e("../constants/metametrics");const o=n.AmountBucket={Low:"<$100",Medium:"$100-1000",High:">$1000"},a=e=>{const t=Number(e);return t<100?o.Low:t<=1e3?o.Medium:o.High};n.getAmountBucket=a;const s=()=>{const e=new Date;return e.setHours(0,0,0,0),e.toISOString()};n.getMidnightISOTimestamp=s;n.hasNonZeroTokenBalance=(e={})=>{for(const t of Object.values(e))for(const e of Object.values(t||{}))for(const t of Object.values(e||{}))if((0,r.hexToNumber)(t||"0x0")>0)return!0;return!1};n.hasNonZeroMultichainBalance=(e={})=>{for(const t of Object.values(e))for(const e of Object.values(t||{}))if(e?.amount&&"0"!==e.amount)return!0;return!1};n.getWalletFundsObtainedEventProperties=({chainId:e,amountUsd:t})=>({event:i.MetaMetricsEventName.WalletFundsObtained,timestamp:s(),properties:{chain_id_caip:(0,r.toCaipChainId)(r.KnownCaipNamespace.Eip155,e.toString()),funding_amount_usd:a(t)}})}}},{package:"$root$",file:"shared/lib/wallet-funds-obtained-metric.ts"}],[7990,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.UI_NOTIFICATIONS=void 0;n.UI_NOTIFICATIONS={}}}},{package:"$root$",file:"shared/notifications/index.ts"}],[80,{"./dapp-swap-util":81},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.createDappSwapMiddleware=function({fetchQuotes:e,setDappSwapComparisonData:t,getNetworkConfigurationByNetworkClientId:n,dappSwapMetricsFlag:i}){return async(o,a,s)=>{"eth_sendTransaction"!==o.method&&"wallet_sendCalls"!==o.method||(0,r.getQuotesForConfirmation)({req:o,fetchQuotes:e,setDappSwapComparisonData:t,getNetworkConfigurationByNetworkClientId:n,dappSwapMetricsFlag:i}),s()}};var r=e("./dapp-swap-util")}}},{package:"$root$",file:"app/scripts/lib/dapp-swap/dapp-swap-middleware.ts"}],[81,{"../../../../shared/lib/dapp-swap-comparison/dapp-swap-command-utils":7855,"../../../../shared/lib/dapp-swap-comparison/dapp-swap-comparison-utils":7856,"../../../../shared/lib/error":7897,"../../../../shared/lib/sentry":7955},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.getQuotesForConfirmation=function({req:e,fetchQuotes:t,setDappSwapComparisonData:n,getNetworkConfigurationByNetworkClientId:c,dappSwapMetricsFlag:l}){let u="";const d=String(e.id);try{const{enabled:o,bridge_quote_fees:f,origins:p}=l;if(!o)return;const{params:h,origin:g}=e;if(g&&p.includes(g)){const{chainId:o}=c(e.networkClientId)??{},{data:l,from:p}=s(h);if(l&&d&&o){const e=(0,i.parseTransactionData)(l);u=e.commands;const{quotesInput:s,amountMin:c}=(0,i.getDataFromSwap)(o,e.commandBytes,e.inputs);if(s){(0,i.checkValidSingleOrBatchTransaction)(h[0].calls,s?.srcTokenAddress),n(d,{commands:u,swapInfo:{srcTokenAddress:s?.srcTokenAddress,destTokenAddress:s?.destTokenAddress,srcTokenAmount:s?.srcTokenAmount,destTokenAmountMin:c}});const e=(new Date).getTime();t({...s,walletAddress:p,fee:f}).then(t=>{const r=(new Date).getTime();t&&n(d,{quotes:t,latency:r-e})}).catch(e=>{n(d,{error:`Error fetching bridge quotes: ${e.message}`,commands:u}),(0,r.captureException)((0,a.createSentryError)("Error fetching dapp swap quotes",e))})}}}}catch(e){d&&n(d,{error:`Error fetching bridge quotes: ${e.message}`,commands:u}),e instanceof o.DappSwapDecodingError||(0,r.captureException)(e)}};var r=e("../../../../shared/lib/sentry"),i=e("../../../../shared/lib/dapp-swap-comparison/dapp-swap-comparison-utils"),o=e("../../../../shared/lib/dapp-swap-comparison/dapp-swap-command-utils"),a=e("../../../../shared/lib/error");const s=e=>{if(!e?.length)return{data:undefined,from:undefined,chainId:undefined};const{calls:t,chainId:n,data:r,from:i}=e[0];let o=r;if(t?.length){const e=t?.find(({data:e})=>e?.startsWith("0x3593564c"));e&&(o=e?.data)}return{chainId:n,data:o,from:i}}}}},{package:"$root$",file:"app/scripts/lib/dapp-swap/dapp-swap-util.ts"}],[82,{"../../../../shared/constants/urls":7828,"../../../../shared/lib/deep-links/constants":7859,"../../../../shared/lib/deep-links/parse":7861,"../../../../shared/lib/deep-links/routes/route":7878,"../../../../shared/lib/deep-links/verify":7886,"../../../../shared/lib/mv3.utils":7930,events:5859,loglevel:6473,"webextension-polyfill":7767},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.DeepLinkRouter=void 0;var r=f(e("events")),i=f(e("webextension-polyfill")),o=f(e("loglevel")),a=e("../../../../shared/lib/mv3.utils"),s=e("../../../../shared/lib/deep-links/parse"),c=e("../../../../shared/lib/deep-links/constants"),l=e("../../../../shared/lib/deep-links/routes/route"),u=e("../../../../shared/lib/deep-links/verify"),d=e("../../../../shared/constants/urls");function f(e){return e&&e.__esModule?e:{default:e}}function p(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const h=l.DEEP_LINK_ROUTE.replace(/^\//u,""),g=new Set(Object.values(d.BaseUrl).map(e=>new URL(e).origin));class m extends r.default{constructor({getExtensionURL:e,getState:t}){super(),p(this,"getExtensionURL",void 0),p(this,"getState",void 0),p(this,"handleBeforeRequest",({tabId:e,url:t,initiator:n,originUrl:r})=>{if(e===i.default.tabs.TAB_ID_NONE)return{};const o=m.resolveRequestOrigin(n,r);return this.tryNavigateTo(e,t,o)}),this.getExtensionURL=e,this.getState=t}formatUrlForInterstitialPage(e){return e.pathname+e.search}get404ErrorURL(e){const t=new URLSearchParams({errorCode:"404"});return e&&t.set("u",this.formatUrlForInterstitialPage(e)),this.getExtensionURL(h,t.toString())}async redirectTab(e,t){try{await i.default.tabs.update(e,{url:t})}catch(e){o.default.error("Error redirecting tab:",e),this.emit("error",e)}}install(){i.default.webRequest.onBeforeRequest.addListener(this.handleBeforeRequest,{urls:[`*://*.${c.DEEP_LINK_HOST}/*`],types:["main_frame"]},a.isManifestV3?[]:["blocking"])}uninstall(){i.default.webRequest.onBeforeRequest.removeListener(this.handleBeforeRequest)}async tryNavigateTo(e,t,n){if(t.length>c.DEEP_LINK_MAX_LENGTH)return o.default.debug("Url is too long, skipping deep link handling"),{};let r;try{const e=new URL(t),i=await(0,s.parse)(e);if(i)if(this.emit("navigate",{url:e,parsed:i}),"redirectTo"in i.destination)r=i.destination.redirectTo.toString();else if(this.canSkipInterstitial(i.signature,n))r=this.getExtensionURL(i.destination.path,i.destination.query.toString());else{const t=new URLSearchParams({u:this.formatUrlForInterstitialPage(e)});r=this.getExtensionURL(h,t.toString())}else r=this.get404ErrorURL(e)}catch(e){o.default.error("Invalid URL:",t,e),this.emit("error",e),r=this.get404ErrorURL()}return this.redirectTab(e,r),a.isManifestV3?{}:{cancel:!0}}static resolveRequestOrigin(e,t){if(e)return e;if(t)try{return new URL(t).origin}catch{return undefined}return undefined}canSkipInterstitial(e,t){return!(!t||!g.has(t))||e===u.VALID&&Boolean(this.getState().preferences?.skipDeepLinkInterstitial)}}n.DeepLinkRouter=m}}},{package:"$root$",file:"app/scripts/lib/deep-links/deep-link-router.ts"}],[83,{"../../../../shared/constants/metametrics":7799},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.createEvent=function({signature:e,url:t}){const n={route:t.pathname,signature:e},o={};for(const[e,r]of t.searchParams.entries())"sig"!==e&&("attributionId"===e?n.attribution_id=r:i.has(e)?n[e]=r:o[e]=r);return{category:r.MetaMetricsEventCategory.DeepLink,event:r.MetaMetricsEventName.DeepLinkUsed,properties:n,sensitiveProperties:o}};var r=e("../../../../shared/constants/metametrics");const i=new Set(["utm_campaign","utm_content","utm_medium","utm_source","utm_term"])}}},{package:"$root$",file:"app/scripts/lib/deep-links/metrics.ts"}],[84,{"@metamask/browser-passworder":1785},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.encryptorFactory=void 0;var r=e("@metamask/browser-passworder");const i=e=>async(t,n,i,o)=>(0,r.encrypt)(t,n,i,o,{algorithm:"PBKDF2",params:{iterations:e}}),o=e=>async(t,n,i)=>(0,r.encryptWithDetail)(t,n,i,{algorithm:"PBKDF2",params:{iterations:e}}),a=e=>async(t,n,i,o)=>(0,r.keyFromPassword)(t,n,i,o??{algorithm:"PBKDF2",params:{iterations:e}}),s=e=>t=>(0,r.isVaultUpdated)(t,{algorithm:"PBKDF2",params:{iterations:e}});n.encryptorFactory=e=>({encrypt:i(e),encryptWithKey:r.encryptWithKey,encryptWithDetail:o(e),decrypt:r.decrypt,decryptWithKey:r.decryptWithKey,decryptWithDetail:r.decryptWithDetail,keyFromPassword:a(e),isVaultUpdated:s(e),importKey:r.importKey,exportKey:r.exportKey,generateSalt:r.generateSalt})}}},{package:"$root$",file:"app/scripts/lib/encryptor-factory.ts"}],[85,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){t.exports=[{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"resolver",outputs:[{name:"",type:"address"}],payable:!1,type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"label",type:"bytes32"},{name:"owner",type:"address"}],name:"setSubnodeOwner",outputs:[],payable:!1,type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"ttl",type:"uint64"}],name:"setTTL",outputs:[],payable:!1,type:"function"},{constant:!0,inputs:[{name:"node",type:"bytes32"}],name:"ttl",outputs:[{name:"",type:"uint64"}],payable:!1,type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"resolver",type:"address"}],name:"setResolver",outputs:[],payable:!1,type:"function"},{constant:!1,inputs:[{name:"node",type:"bytes32"},{name:"owner",type:"address"}],name:"setOwner",outputs:[],payable:!1,type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"owner",type:"address"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!0,name:"label",type:"bytes32"},{indexed:!1,name:"owner",type:"address"}],name:"NewOwner",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"resolver",type:"address"}],name:"NewResolver",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"ttl",type:"uint64"}],name:"NewTTL",type:"event"}]}}},{package:"$root$",file:"app/scripts/lib/ens-ipfs/contracts/ens-registry.json"}],[86,{"./ens-registry.json":85},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r,i=(r=e("./ens-registry.json"))&&r.__esModule?r:{default:r};n.default=i.default}}},{package:"$root$",file:"app/scripts/lib/ens-ipfs/contracts/registry.ts"}],[87,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){function r(e,t,n,r){return{constant:"view"===r||"pure"===r,inputs:[...t],name:e,outputs:n.length?[...n]:[],payable:!1,stateMutability:r,type:"function"}}function i(e,t){return{anonymous:!1,inputs:[...t],name:e,type:"event"}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;const o=e=>({name:e,type:"bytes32"}),a=[r("setContent",[o("node"),o("hash")],[],"nonpayable"),r("content",[o("node")],[{name:"",type:"bytes32"}],"view"),r("supportsInterface",[{name:"interfaceID",type:"bytes4"}],[{name:"",type:"bool"}],"pure"),r("setText",[o("node"),{name:"key",type:"string"},{name:"value",type:"string"}],[],"nonpayable"),r("ABI",[o("node"),{name:"contentTypes",type:"uint256"}],[{name:"contentType",type:"uint256"},{name:"data",type:"bytes"}],"view"),r("setPubkey",[o("node"),o("x"),o("y")],[],"nonpayable"),r("setContenthash",[o("node"),{name:"hash",type:"bytes"}],[],"nonpayable"),r("addr",[o("node")],[{name:"",type:"address"}],"view"),r("text",[o("node"),{name:"key",type:"string"}],[{name:"",type:"string"}],"view"),r("setABI",[o("node"),{name:"contentType",type:"uint256"},{name:"data",type:"bytes"}],[],"nonpayable"),r("name",[o("node")],[{name:"",type:"string"}],"view"),r("setName",[o("node"),{name:"name",type:"string"}],[],"nonpayable"),r("contenthash",[o("node")],[{name:"",type:"bytes"}],"view"),r("pubkey",[o("node")],[{name:"x",type:"bytes32"},{name:"y",type:"bytes32"}],"view"),r("setAddr",[o("node"),{name:"addr",type:"address"}],[],"nonpayable"),{inputs:[{name:"ensAddr",type:"address"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},i("AddrChanged",[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"a",type:"address"}]),i("NameChanged",[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"name",type:"string"}]),i("ABIChanged",[{indexed:!0,name:"node",type:"bytes32"},{indexed:!0,name:"contentType",type:"uint256"}]),i("PubkeyChanged",[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"x",type:"bytes32"},{indexed:!1,name:"y",type:"bytes32"}]),i("TextChanged",[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"indexedKey",type:"string"},{indexed:!1,name:"key",type:"string"}]),i("ContenthashChanged",[{indexed:!0,name:"node",type:"bytes32"},{indexed:!1,name:"hash",type:"bytes"}])];n.default=a}}},{package:"$root$",file:"app/scripts/lib/ens-ipfs/contracts/resolver.ts"}],[88,{"./contracts/registry":86,"./contracts/resolver":87,"@ensdomains/content-hash":728,"@ethersproject/contracts":843,"@ethersproject/providers":881,"eth-ens-namehash":5766},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=async function({provider:e,name:t}){const n=r.default.hash(t),l=Number.parseInt(await e.request({method:"net_version"}),10),d=function(e){switch(e){case 1:case 3:case 4:case 5:case 6:return"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";default:return null}}(l);if(!d)throw new Error(`EnsIpfsResolver - no known ens-ipfs registry for chainId "${l}"`);const f=new o.Web3Provider(e),p=new a.Contract(d,s.default,f),h=await p.resolver(n);if(u(h))throw new Error(`EnsIpfsResolver - no resolver found for name "${t}"`);const g=new a.Contract(h,c.default,f),m=await g.supportsInterface("0xbc1c58d1"),b=await g.supportsInterface("0xd8389dc5");if(m){const e=await g.contenthash(n);let t=i.default.decode(e);const r=i.default.getCodec(e);return"ipfs-ns"!==r&&"ipns-ns"!==r||(t=i.default.helpers.cidV0ToV1Base32(t)),{type:r,hash:t}}if(b){const e=await g.content(n);if(u(e))throw new Error(`EnsIpfsResolver - no content ID found for name "${t}"`);return{type:"swarm-ns",hash:e.slice(2)}}throw new Error(`EnsIpfsResolver - the resolver for name "${t}" is not standard, it should either supports contenthash() or content()`)};var r=l(e("eth-ens-namehash")),i=l(e("@ensdomains/content-hash")),o=e("@ethersproject/providers"),a=e("@ethersproject/contracts"),s=l(e("./contracts/registry")),c=l(e("./contracts/resolver"));function l(e){return e&&e.__esModule?e:{default:e}}function u(e){return[undefined,null,"0x","0x0","0x0000000000000000000000000000000000000000000000000000000000000000"].includes(e)}}}},{package:"$root$",file:"app/scripts/lib/ens-ipfs/resolver.js"}],[89,{"../../../../shared/lib/fetch-with-timeout":7901,"./resolver":88,"base32-encode":5490,"base64-js":5491,"webextension-polyfill":7767},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function({provider:e,getCurrentChainId:t,getIpfsGateway:n,getUseAddressBarEnsResolution:a}){const c=u.map(e=>`*://*.${e}/*`);return o.default.webRequest.onErrorOccurred.addListener(d,{urls:c,types:["main_frame"]}),{remove(){o.default.webRequest.onErrorOccurred.removeListener(d)}};async function d(c){const{tabId:d,url:f}=c;if(-1===d||"0x1"!==t())return;const{hostname:p,pathname:h,search:g,hash:m}=new URL(f),b=p.split("."),y=b[b.length-1];u.includes(y)&&async function({tabId:t,name:c,pathname:u,search:d,fragment:f}){const p=n(),h=a(),g=`https://app.ens.domains/name/${c}`;h&&p&&await o.default.tabs.update(t,{url:"loading.html"});let m=g;0;try{const{type:t,hash:n}=await(0,s.default)({provider:e,name:c});if("ipfs-ns"===t||"ipns-ns"===t){if(""===p)return void(m=null);const e=`https://${n}.${t.slice(0,4)}.${p}${u}${d||""}${f||""}`;try{200===(await l(e,{method:"HEAD"})).status&&(m=e)}catch(e){console.warn(e)}}else if("swarm-ns"===t)m=`https://swarm-gateways.net/bzz:/${n}${u}${d||""}${f||""}`;else if("onion"===t||"onion3"===t)m=`http://${n}.onion${u}${d||""}${f||""}`;else if("zeronet"===t)m=`http://127.0.0.1:43110/${n}${u}${d||""}${f||""}`;else if("skynet-ns"===t){const e=n.padEnd(n.length+4-n.length%4,"="),t=i.default.toByteArray(e),o={padding:!1};m=`https://${(0,r.default)(t,"RFC4648-HEX",o).toLowerCase()}.siasky.net${u}${d||""}${f||""}`}}catch(e){console.warn(e)}finally{m&&(h||!h&&m!==g)&&await o.default.tabs.update(t,{url:m})}}({tabId:d,name:p,pathname:h,search:g,fragment:m})}};var r=c(e("base32-encode")),i=c(e("base64-js")),o=c(e("webextension-polyfill")),a=c(e("../../../../shared/lib/fetch-with-timeout")),s=c(e("./resolver"));function c(e){return e&&e.__esModule?e:{default:e}}const l=(0,a.default)(),u=["eth"]}}},{package:"$root$",file:"app/scripts/lib/ens-ipfs/setup.js"}],[90,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){function r(e,t,n){i(e,t),t.set(e,n)}function i(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function o(e,t){return e.get(a(e,t))}function a(e,t,n){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:n;throw new TypeError("Private element is not present on this object")}Object.defineProperty(n,"__esModule",{value:!0}),n.ExtensionLazyListener=void 0;var s=new WeakMap,c=new WeakMap,l=new WeakSet;function u(e){setTimeout(()=>{for(const[t,n]of o(c,this))for(const[r,{args:i}]of n){const n=`ExtensionLazyListener: Possible memory leak detected. The event "${t}.${r}" has been listened to, but no application code has added a listener after ${e}ms. There are currently ${i.length} buffered calls. If you are a developer of this extension, please ensure that you have added a listener for this event. If you are a user of this extension, please report this warning to the developers of the extension.`;console.warn(n)}},e)}function d(e,t){return o(s,this)[e][t]}n.ExtensionLazyListener=class{constructor(e,t={},n=2e4){var f,p;i(f=this,p=l),p.add(f),r(this,s,void 0),r(this,c,new Map),function(e,t,n){e.set(a(e,t),n)}(s,this,e);for(const[e,n]of Object.entries(t)){const t=new Map;for(const r of n){const n=[],i=(...e)=>{n.push(e)};a(l,this,d).call(this,e,r).addListener(i),t.set(r,{listener:i,args:n})}o(c,this).set(e,t)}a(l,this,u).call(this,n)}addListener(e,t,n){const r=a(l,this,d).call(this,e,t);r.addListener(n);const i=o(c,this).get(e);if(i){const a=i.get(t);if(a){r.removeListener(a.listener),i.delete(t),0===i.size&&o(c,this).delete(e);const{args:s}=a;for(let l=0,{length:u}=s;l<u;l++)try{if(n(...s[l]),!r.hasListener(n)){const n=l+1;n!==u&&(s.splice(0,n),i.set(t,a),o(c,this).set(e,i),r.addListener(a.listener));break}}catch(n){const d=l+1;throw d!==u&&(s.splice(0,d),i.set(t,a),o(c,this).set(e,i),r.addListener(a.listener)),n}}}}once(e,t){return new Promise(n=>{const r=a(l,this,d).call(this,e,t),i=o(c,this).get(e);if(i){const a=i.get(t),s=a?.args.length;if(s)return n(a.args.shift()),r.removeListener(a.listener),void(1===s&&(i.delete(t),0===i.size&&o(c,this).delete(e)))}const s=(...e)=>{r.removeListener(s),n(e)};r.addListener(s)})}}}}},{package:"$root$",file:"app/scripts/lib/extension-lazy-listener/extension-lazy-listener.ts"}],[91,{"@metamask/snaps-sdk":3943,"@metamask/snaps-utils":4059},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.forwardRequestToSnap=async function(e,t,n,o){const{method:a,params:s}=n,{handleRequest:c,snapId:l,onBeforeRequest:u,onAfterRequest:d}=e;if(!l)throw new i.InternalError(`No snapId configured for method ${a}`);const f=o.get("origin");if(!f)throw new i.InternalError(`No origin specified for method ${a}`);try{u?.()}catch(e){try{d?.()}catch(e){console.error("Error from onAfterRequest hook:",e)}throw e}let p;try{p=await c({snapId:l,origin:f,handler:r.HandlerType.OnRpcRequest,request:{jsonrpc:"2.0",method:a,params:s}})}catch(e){try{d?.()}catch(e){console.error("Error from onAfterRequest hook:",e)}throw e}return d?.(),p};var r=e("@metamask/snaps-utils"),i=e("@metamask/snaps-sdk")}}},{package:"$root$",file:"app/scripts/lib/forwardRequestToSnap.ts"}],[92,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.getIframeProperties=function({frameId:e,origin:t,mainFrameOrigin:n}){const r="number"==typeof e&&0!==e,i=r&&"string"==typeof n&&t!==n;return{is_iframe:r,is_cross_origin_iframe:i,iframe_origin:i?t:null,top_level_origin:i?n:null}}}}},{package:"$root$",file:"app/scripts/lib/getIframeProperties.ts"}],[93,{lodash:6463},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){return i((0,r.cloneDeep)(e),e=>null===e?"null":typeof e)};var r=e("lodash");function i(e={},t){return Object.entries(e).forEach(([n,r])=>{e[n]="object"==typeof r&&null!==r?i(r,t):t(r)}),e}}}},{package:"$root$",file:"app/scripts/lib/getObjStructure.js"}],[933,{"@firebase/component":934,"@firebase/logger":936,"@firebase/util":939,idb:6146},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"FirebaseError",{enumerable:!0,get:function(){return o.FirebaseError}}),n._DEFAULT_ENTRY_NAME=n.SDK_VERSION=void 0,n._addComponent=H,n._addOrOverwriteComponent=function(e,t){e.container.addOrOverwriteComponent(t)},n._apps=void 0,n._clearComponents=function(){F.clear()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n._components=void 0,n._getProvider=V,n._isFirebaseApp=q,n._isFirebaseServerApp=function(e){return e.settings!==undefined},n._registerComponent=K,n._removeServiceInstance=function(e,t,n=B){V(e,t).clearInstance(n)},n._serverApps=void 0,n.deleteApp=Z,n.getApp=function(e=B){const t=$.get(e);if(!t&&e===B&&(0,o.getDefaultAppConfig)())return J();if(!t)throw W.create("no-app",{appName:e});return t},n.getApps=function(){return Array.from($.values())},n.initializeApp=J,n.initializeServerApp=function(e,t){if((0,o.isBrowser)()&&!(0,o.isWebWorker)())throw W.create("invalid-server-app-environment");t.automaticDataCollectionEnabled===undefined&&(t.automaticDataCollectionEnabled=!1);let n;n=q(e)?e.options:e;const i=Object.assign(Object.assign({},t),n);i.releaseOnDeref!==undefined&&delete i.releaseOnDeref;if(t.releaseOnDeref!==undefined&&"undefined"==typeof FinalizationRegistry)throw W.create("finalization-registry-not-supported",{});const a=""+(c=JSON.stringify(i),[...c].reduce((e,t)=>Math.imul(31,e)+t.charCodeAt(0)|0,0)),s=U.get(a);var c;if(s)return s.incRefCount(t.releaseOnDeref),s;const l=new r.ComponentContainer(a);for(const e of F.values())l.addComponent(e);const u=new Y(n,t,a,l);return U.set(a,u),u},n.onLog=function(e,t){if(null!==e&&"function"!=typeof e)throw W.create("invalid-log-argument");(0,i.setUserLogHandler)(e,t)},n.registerVersion=X,n.setLogLevel=function(e){(0,i.setLogLevel)(e)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;var r=e("@firebase/component"),i=e("@firebase/logger"),o=e("@firebase/util"),a=e("idb");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class s{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const c="@firebase/app",l="0.10.18",u=new i.Logger("@firebase/app"),d="@firebase/app-compat",f="@firebase/analytics-compat",p="@firebase/analytics",h="@firebase/app-check-compat",g="@firebase/app-check",m="@firebase/auth",b="@firebase/auth-compat",y="@firebase/database",w="@firebase/data-connect",v="@firebase/database-compat",E="@firebase/functions",_="@firebase/functions-compat",T="@firebase/installations",S="@firebase/installations-compat",O="@firebase/messaging",I="@firebase/messaging-compat",k="@firebase/performance",C="@firebase/performance-compat",A="@firebase/remote-config",M="@firebase/remote-config-compat",P="@firebase/storage",R="@firebase/storage-compat",x="@firebase/firestore",D="@firebase/vertexai",j="@firebase/firestore-compat",N="firebase",B=n._DEFAULT_ENTRY_NAME="[DEFAULT]",L={[c]:"fire-core",[d]:"fire-core-compat",[p]:"fire-analytics",[f]:"fire-analytics-compat",[g]:"fire-app-check",[h]:"fire-app-check-compat",[m]:"fire-auth",[b]:"fire-auth-compat",[y]:"fire-rtdb",[w]:"fire-data-connect",[v]:"fire-rtdb-compat",[E]:"fire-fn",[_]:"fire-fn-compat",[T]:"fire-iid",[S]:"fire-iid-compat",[O]:"fire-fcm",[I]:"fire-fcm-compat",[k]:"fire-perf",[C]:"fire-perf-compat",[A]:"fire-rc",[M]:"fire-rc-compat",[P]:"fire-gcs",[R]:"fire-gcs-compat",[x]:"fire-fst",[j]:"fire-fst-compat",[D]:"fire-vertex","fire-js":"fire-js",[N]:"fire-js-all"},$=n._apps=new Map,U=n._serverApps=new Map,F=n._components=new Map;function H(e,t){try{e.container.addComponent(t)}catch(n){u.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function K(e){const t=e.name;if(F.has(t))return u.debug(`There were multiple attempts to register component ${t}.`),!1;F.set(t,e);for(const t of $.values())H(t,e);for(const t of U.values())H(t,e);return!0}function V(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function q(e){return e.options!==undefined}const z={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},W=new o.ErrorFactory("app","Firebase",z);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class G{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.Component("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw W.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y extends G{constructor(e,t,n,r){const i=t.automaticDataCollectionEnabled!==undefined&&t.automaticDataCollectionEnabled,o={name:n,automaticDataCollectionEnabled:i};if(e.apiKey!==undefined)super(e,o,r);else{super(e.options,o,r)}this._serverConfig=Object.assign({automaticDataCollectionEnabled:i},t),this._finalizationRegistry=null,"undefined"!=typeof FinalizationRegistry&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=undefined,t.releaseOnDeref=undefined,X(c,l,"serverapp")}toJSON(){return undefined}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==undefined&&null!==this._finalizationRegistry&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){Z(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw W.create("server-app-deleted")}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.SDK_VERSION="11.2.0";function J(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const i=Object.assign({name:B,automaticDataCollectionEnabled:!1},t),a=i.name;if("string"!=typeof a||!a)throw W.create("bad-app-name",{appName:String(a)});if(n||(n=(0,o.getDefaultAppConfig)()),!n)throw W.create("no-options");const s=$.get(a);if(s){if((0,o.deepEqual)(n,s.options)&&(0,o.deepEqual)(i,s.config))return s;throw W.create("duplicate-app",{appName:a})}const c=new r.ComponentContainer(a);for(const e of F.values())c.addComponent(e);const l=new G(n,i,c);return $.set(a,l),l}async function Z(e){let t=!1;const n=e.name;if($.has(n))t=!0,$.delete(n);else if(U.has(n)){e.decRefCount()<=0&&(U.delete(n),t=!0)}t&&(await Promise.all(e.container.getProviders().map(e=>e.delete())),e.isDeleted=!0)}function X(e,t,n){var i;let o=null!==(i=L[e])&&void 0!==i?i:e;n&&(o+=`-${n}`);const a=o.match(/\s|\//),s=t.match(/\s|\//);if(a||s){const e=[`Unable to register library "${o}" with version "${t}":`];return a&&e.push(`library name "${o}" contains illegal characters (whitespace or "/")`),a&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void u.warn(e.join(" "))}K(new r.Component(`${o}-version`,()=>({library:o,version:t}),"VERSION"))}const Q="firebase-heartbeat-store";let ee=null;function te(){return ee||(ee=(0,a.openDB)("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Q)}catch(e){console.warn(e)}}}).catch(e=>{throw W.create("idb-open",{originalErrorMessage:e.message})})),ee}async function ne(e,t){try{const n=(await te()).transaction(Q,"readwrite"),r=n.objectStore(Q);await r.put(t,re(e)),await n.done}catch(e){if(e instanceof o.FirebaseError)u.warn(e.message);else{const t=W.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});u.warn(t.message)}}}function re(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ae(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=oe();if(null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache)}catch(e){u.warn(e)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=oe(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),se(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),se(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=(0,o.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return u.warn(e),""}}}function oe(){return(new Date).toISOString().substring(0,10)}class ae{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,o.isIndexedDBAvailable)()&&(0,o.validateIndexedDBOpenable)().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await te()).transaction(Q),n=await t.objectStore(Q).get(re(e));return await t.done,n}catch(e){if(e instanceof o.FirebaseError)u.warn(e.message);else{const t=W.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});u.warn(t.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return ne(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return ne(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function se(e){return(0,o.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;ce="",K(new r.Component("platform-logger",e=>new s(e),"PRIVATE")),K(new r.Component("heartbeat",e=>new ie(e),"PRIVATE")),X(c,l,ce),X(c,l,"esm2017"),X("fire-js","")}}},{package:"@metamask/notification-services-controller>firebase>@firebase/app",file:"node_modules/@firebase/app/dist/esm/index.esm2017.js"}],[934,{"@firebase/util":939},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.Provider=n.ComponentContainer=n.Component=void 0;var r=e("@firebase/util");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.Component=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};const i="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.Deferred;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:i})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=i){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=i){return this.instances.has(e)}getOptions(e=i){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(r)}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===i?undefined:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var r;return n||null}normalizeInstanceIdentifier(e=i){return this.component?this.component.multipleInstances?e:i:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}n.Provider=o;n.ComponentContainer=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}}}},{package:"@metamask/notification-services-controller>firebase>@firebase/app>@firebase/component",file:"node_modules/@firebase/component/dist/esm/index.esm2017.js"}],[935,{"@firebase/app":933,"@firebase/component":934,"@firebase/util":939,idb:6146},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.deleteInstallations=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e){const{appConfig:t}=e,n=await F(t,e=>e&&0===e.registrationStatus?undefined:e);if(n){if(1===n.registrationStatus)throw g.create("delete-pending-registration");if(2===n.registrationStatus){if(!navigator.onLine)throw g.create("app-offline");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
await async function(e,t){const n=function(e,{fid:t}){return`${b(e)}/${t}`}(e,t),r=E(e,t),i={method:"DELETE",headers:r},o=await _(()=>fetch(n,i));if(!o.ok)throw await w("Delete Installation",o)}(t,n),await U(t)}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getId=J,n.getInstallations=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e=(0,r.getApp)()){return(0,r._getProvider)(e,"installations").getImmediate()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getToken=Z,n.onIdChange=function(e,t){const{appConfig:n}=e;return function(e,t){R();const n=k(e);let r=C.get(n);r||(r=new Set,C.set(n,r));r.add(t)}(n,t),()=>{!function(e,t){const n=k(e),r=C.get(n);if(!r)return;r.delete(t),0===r.size&&C.delete(n);x()}(n,t)}};var r=e("@firebase/app"),i=e("@firebase/component"),o=e("@firebase/util"),a=e("idb");const s="@firebase/installations",c="0.6.12",l=1e4,u=`w:${c}`,d="FIS_v2",f="https://firebaseinstallations.googleapis.com/v1",p=36e5,h={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},g=new o.ErrorFactory("installations","Installations",h);function m(e){return e instanceof o.FirebaseError&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b({projectId:e}){return`${f}/projects/${e}/installations`}function y(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function w(e,t){const n=(await t.json()).error;return g.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function v({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function E(e,{refreshToken:t}){const n=v(e);return n.append("Authorization",function(e){return`${d} ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function _(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function T(e){return new Promise(t=>{setTimeout(t,e)})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const S=/^[cdef][\w-]{21}$/,O="";function I(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return S.test(t)?t:O}catch(e){return O}}function k(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C=new Map;function A(e,t){const n=k(e);M(n,t),function(e,t){const n=R();n&&n.postMessage({key:e,fid:t});x()}(n,t)}function M(e,t){const n=C.get(e);if(n)for(const e of n)e(t)}let P=null;function R(){return!P&&"BroadcastChannel"in self&&(P=new BroadcastChannel("[Firebase] FID Change"),P.onmessage=e=>{M(e.data.key,e.data.fid)}),P}function x(){0===C.size&&P&&(P.close(),P=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D="firebase-installations-database",j=1,N="firebase-installations-store";let B=null;function L(){return B||(B=(0,a.openDB)(D,j,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(N)}})),B}async function $(e,t){const n=k(e),r=(await L()).transaction(N,"readwrite"),i=r.objectStore(N),o=await i.get(n);return await i.put(t,n),await r.done,o&&o.fid===t.fid||A(e,t.fid),t}async function U(e){const t=k(e),n=(await L()).transaction(N,"readwrite");await n.objectStore(N).delete(t),await n.done}async function F(e,t){const n=k(e),r=(await L()).transaction(N,"readwrite"),i=r.objectStore(N),o=await i.get(n),a=t(o);return a===undefined?await i.delete(n):await i.put(a,n),await r.done,!a||o&&o.fid===a.fid||A(e,a.fid),a}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H(e){let t;const n=await F(e.appConfig,n=>{const r=function(e){const t=e||{fid:I(),registrationStatus:0};return q(t)}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(g.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=b(e),i=v(e),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const a={fid:n,authVersion:d,appId:e.appId,sdkVersion:u},s={method:"POST",headers:i,body:JSON.stringify(a)},c=await _(()=>fetch(r,s));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:y(e.authToken)}}throw await w("Create Installation",c)}(e,t);return $(e.appConfig,n)}catch(n){throw m(n)&&409===n.customData.serverCode?await U(e.appConfig):await $(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:K(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry});return n.fid===O?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function K(e){let t=await V(e.appConfig);for(;1===t.registrationStatus;)await T(100),t=await V(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await H(e);return n||t}return t}function V(e){return F(e,e=>{if(!e)throw g.create("installation-not-found");return q(e)})}function q(e){return 1===(t=e).registrationStatus&&t.registrationTime+l<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function z({appConfig:e,heartbeatServiceProvider:t},n){const r=function(e,{fid:t}){return`${b(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),i=E(e,n),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const a={installation:{sdkVersion:u,appId:e.appId}},s={method:"POST",headers:i,body:JSON.stringify(a)},c=await _(()=>fetch(r,s));if(c.ok){return y(await c.json())}throw await w("Generate Auth Token",c)}async function W(e,t=!1){let n;const r=await F(e.appConfig,r=>{if(!Y(r))throw g.create("not-registered");const i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+p}(e)}(i))return r;if(1===i.requestStatus)return n=async function(e,t){let n=await G(e.appConfig);for(;1===n.authToken.requestStatus;)await T(100),n=await G(e.appConfig);const r=n.authToken;return 0===r.requestStatus?W(e,t):r}(e,t),r;{if(!navigator.onLine)throw g.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function(e,t){try{const n=await z(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await $(e.appConfig,r),n}catch(n){if(!m(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await $(e.appConfig,n)}else await U(e.appConfig);throw n}}(e,t),t}});return n?await n:r.authToken}function G(e){return F(e,e=>{if(!Y(e))throw g.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+l<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */})}function Y(e){return e!==undefined&&2===e.registrationStatus}async function J(e){const t=e,{installationEntry:n,registrationPromise:r}=await H(t);return r?r.catch(console.error):W(t).catch(console.error),n.fid}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await H(e);t&&await t}(n);return(await W(n,t)).token}function X(e){return g.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q="installations",ee=e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw X("App Configuration");if(!e.name)throw X("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw X(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:(0,r._getProvider)(t,"heartbeat"),_delete:()=>Promise.resolve()}},te=e=>{const t=e.getProvider("app").getImmediate(),n=(0,r._getProvider)(t,Q).getImmediate();return{getId:()=>J(n),getToken:e=>Z(n,e)}};(0,r._registerComponent)(new i.Component(Q,ee,"PUBLIC")),(0,r._registerComponent)(new i.Component("installations-internal",te,"PRIVATE")),(0,r.registerVersion)(s,c),(0,r.registerVersion)(s,c,"esm2017")}}},{package:"@metamask/notification-services-controller>firebase>@firebase/installations",file:"node_modules/@firebase/installations/dist/esm/index.esm2017.js"}],[936,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const r=[];var i;n.LogLevel=void 0,(i=n.LogLevel||(n.LogLevel={}))[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT";const o={debug:n.LogLevel.DEBUG,verbose:n.LogLevel.VERBOSE,info:n.LogLevel.INFO,warn:n.LogLevel.WARN,error:n.LogLevel.ERROR,silent:n.LogLevel.SILENT},a=n.LogLevel.INFO,s={[n.LogLevel.DEBUG]:"log",[n.LogLevel.VERBOSE]:"log",[n.LogLevel.INFO]:"info",[n.LogLevel.WARN]:"warn",[n.LogLevel.ERROR]:"error"},c=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=s[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};n.Logger=class{constructor(e){this.name=e,this._logLevel=a,this._logHandler=c,this._userLogHandler=null,r.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in n.LogLevel))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?o[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.DEBUG,...e),this._logHandler(this,n.LogLevel.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.VERBOSE,...e),this._logHandler(this,n.LogLevel.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.INFO,...e),this._logHandler(this,n.LogLevel.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.WARN,...e),this._logHandler(this,n.LogLevel.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.ERROR,...e),this._logHandler(this,n.LogLevel.ERROR,...e)}},n.setLogLevel=function(e){r.forEach(t=>{t.setLogLevel(e)})},n.setUserLogHandler=function(e,t){for(const i of r){let r=null;t&&t.level&&(r=o[t.level]),i.userLogHandler=null===e?null:(t,i,...o)=>{const a=o.map(e=>{if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(e=>e).join(" ");i>=(null!=r?r:t.logLevel)&&e({level:n.LogLevel[i].toLowerCase(),message:a,args:o,type:t.name})}}}}}},{package:"@metamask/notification-services-controller>firebase>@firebase/app>@firebase/logger",file:"node_modules/@firebase/logger/dist/index.cjs.js"}],[937,{"@firebase/app":933,"@firebase/component":934,"@firebase/installations":935,"@firebase/util":939,idb:6146},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.deleteToken=function(e){
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e){if(!navigator)throw A.create("only-available-in-window");e.swRegistration||await U(e);return async function(e){const t=await O(e.firebaseDependencies);t&&(await M(e.firebaseDependencies,t.token),await async function(e){const t=k(e),n=(await S()).transaction(_,"readwrite");await n.objectStore(_).delete(t),await n.done}(e.firebaseDependencies));const n=await e.swRegistration.pushManager.getSubscription();if(n)return n.unsubscribe();return!0}(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e=(0,o.getModularInstance)(e))},n.getMessaging=
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e=(0,a.getApp)()){return G().then(e=>{if(!e)throw A.create("unsupported-browser")},e=>{throw A.create("indexed-db-unsupported")}),(0,a._getProvider)((0,o.getModularInstance)(e),"messaging").getImmediate()},n.getToken=async function(e,t){return F(e=(0,o.getModularInstance)(e),t)},n.isSupported=G,n.onMessage=function(e,t){return function(e,t){if(!navigator)throw A.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}(e=(0,o.getModularInstance)(e),t)},e("@firebase/installations");var r=e("@firebase/component"),i=e("idb"),o=e("@firebase/util"),a=e("@firebase/app");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const s="/firebase-messaging-sw.js",c="/firebase-cloud-messaging-push-scope",l="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",u="https://fcmregistrations.googleapis.com/v1",d="google.c.a.c_id",f=1e4;var p,h;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function g(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function m(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;++e)r[e]=n.charCodeAt(e);return r}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(p||(p={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(h||(h={}));const b="fcm_token_details_db",y=5,w="fcm_token_object_Store";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const v="firebase-messaging-database",E=1,_="firebase-messaging-store";let T=null;function S(){return T||(T=(0,i.openDB)(v,E,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(_)}})),T}async function O(e){const t=k(e),n=await S(),r=await n.transaction(_).objectStore(_).get(t);if(r)return r;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map(e=>e.name);if(!e.includes(b))return null}let t=null;return(await(0,i.openDB)(b,y,{upgrade:async(n,r,i,o)=>{var a;if(r<2)return;if(!n.objectStoreNames.contains(w))return;const s=o.objectStore(w),c=await s.index("fcmSenderId").get(e);if(await s.clear(),c)if(2===r){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!==(a=e.createTime)&&void 0!==a?a:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:g(e.vapidKey)}}}else if(3===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:g(e.auth),p256dh:g(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:g(e.vapidKey)}}}else if(4===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:g(e.auth),p256dh:g(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:g(e.vapidKey)}}}}})).close(),await(0,i.deleteDB)(b),await(0,i.deleteDB)("fcm_vapid_details_db"),await(0,i.deleteDB)("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await I(e,t),t}}async function I(e,t){const n=k(e),r=(await S()).transaction(_,"readwrite");return await r.objectStore(_).put(t,n),await r.done,t}function k({appConfig:e}){return e.appId}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},A=new o.ErrorFactory("messaging","Messaging",C);async function M(e,t){const n={method:"DELETE",headers:await R(e)};try{const r=await fetch(`${P(e.appConfig)}/${t}`,n),i=await r.json();if(i.error){const e=i.error.message;throw A.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw A.create("token-unsubscribe-failed",{errorInfo:null==e?void 0:e.toString()})}}function P({projectId:e}){return`${u}/projects/${e}/registrations`}async function R({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function x({p256dh:e,auth:t,endpoint:n,vapidKey:r}){const i={web:{endpoint:n,auth:t,p256dh:e}};return r!==l&&(i.web.applicationPubKey=r),i}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D=6048e5;async function j(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:m(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:g(t.getKey("auth")),p256dh:g(t.getKey("p256dh"))},r=await O(e.firebaseDependencies);if(r){if(function(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r.subscriptionOptions,n))return Date.now()>=r.createTime+D?async function(e,t){try{const n=await async function(e,t){const n=await R(e),r=x(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let o;try{const n=await fetch(`${P(e.appConfig)}/${t.token}`,i);o=await n.json()}catch(e){throw A.create("token-update-failed",{errorInfo:null==e?void 0:e.toString()})}if(o.error){const e=o.error.message;throw A.create("token-update-failed",{errorInfo:e})}if(!o.token)throw A.create("token-update-no-token");return o.token}(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await I(e.firebaseDependencies,r),n}catch(e){throw e}}(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await M(e.firebaseDependencies,r.token)}catch(e){console.warn(e)}return N(e.firebaseDependencies,n)}return N(e.firebaseDependencies,n)}async function N(e,t){const n=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await async function(e,t){const n=await R(e),r=x(t),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{const t=await fetch(P(e.appConfig),i);o=await t.json()}catch(e){throw A.create("token-subscribe-failed",{errorInfo:null==e?void 0:e.toString()})}if(o.error){const e=o.error.message;throw A.create("token-subscribe-failed",{errorInfo:e})}if(!o.token)throw A.create("token-subscribe-no-token");return o.token}(e,t),r={token:n,createTime:Date.now(),subscriptionOptions:t};return await I(e,r),r.token}function B(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const o=t.notification.icon;o&&(e.notification.icon=o)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){var n,r,i,o,a;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};const s=null!==(i=null===(r=t.fcmOptions)||void 0===r?void 0:r.link)&&void 0!==i?i:null===(o=t.notification)||void 0===o?void 0:o.click_action;s&&(e.fcmOptions.link=s);const c=null===(a=t.fcmOptions)||void 0===a?void 0:a.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t,e),t}function L(e){return A.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(e,t){const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));n.join("")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class ${constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=function(e){if(!e||!e.options)throw L("App Configuration Object");if(!e.name)throw L("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const e of t)if(!n[e])throw L(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U(e){try{e.swRegistration=await navigator.serviceWorker.register(s,{scope:c}),e.swRegistration.update().catch(()=>{}),await async function(e){return new Promise((t,n)=>{const r=setTimeout(()=>n(new Error(`Service worker not registered after ${f} ms`)),f),i=e.installing||e.waiting;e.active?(clearTimeout(r),t()):i?i.onstatechange=e=>{var n;"activated"===(null===(n=e.target)||void 0===n?void 0:n.state)&&(i.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e.swRegistration)}catch(e){throw A.create("failed-service-worker-registration",{browserErrorMessage:null==e?void 0:e.message})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function F(e,t){if(!navigator)throw A.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw A.create("permission-blocked");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=l)}(e,null==t?void 0:t.vapidKey),await async function(e,t){if(t||e.swRegistration||await U(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw A.create("invalid-sw-registration");e.swRegistration=t}}(e,null==t?void 0:t.serviceWorkerRegistration),j(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H(e,t,n){const r=function(e){switch(e){case h.NOTIFICATION_CLICKED:return"notification_open";case h.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[d],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}async function K(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===h.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(B(n)):e.onMessageHandler.next(B(n)));const r=n.data;var i;"object"==typeof(i=r)&&i&&d in i&&"1"===r["google.c.a.e"]&&await H(e,n.messageType,r)}const V="@firebase/messaging",q="0.12.16",z=e=>{const t=new $(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>K(t,e)),t},W=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>F(t,e)}};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function G(){try{await(0,o.validateIndexedDBOpenable)()}catch(e){return!1}return"undefined"!=typeof window&&(0,o.isIndexedDBAvailable)()&&(0,o.areCookiesEnabled)()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}(0,a._registerComponent)(new r.Component("messaging",z,"PUBLIC")),(0,a._registerComponent)(new r.Component("messaging-internal",W,"PRIVATE")),(0,a.registerVersion)(V,q),(0,a.registerVersion)(V,q,"esm2017")}}},{package:"@metamask/notification-services-controller>firebase>@firebase/messaging",file:"node_modules/@firebase/messaging/dist/esm/index.esm2017.js"}],[938,{"@firebase/app":933,"@firebase/component":934,"@firebase/installations":935,"@firebase/util":939,idb:6146},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),e("@firebase/installations");var r=e("@firebase/component"),i=e("idb"),o=e("@firebase/util"),a=e("@firebase/app");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const s="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",c="FCM_MSG";var l,u;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function d(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function f(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;++e)r[e]=n.charCodeAt(e);return r}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(l||(l={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(u||(u={}));const p="fcm_token_details_db",h="fcm_token_object_Store";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const g="firebase-messaging-store";let m=null;function b(){return m||(m=i.openDB("firebase-messaging-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(g)}})),m}async function y(e){const t=v(e),n=await b(),r=await n.transaction(g).objectStore(g).get(t);if(r)return r;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map(e=>e.name);if(!e.includes(p))return null}let t=null;return(await i.openDB(p,5,{upgrade:async(n,r,i,o)=>{var a;if(r<2)return;if(!n.objectStoreNames.contains(h))return;const s=o.objectStore(h),c=await s.index("fcmSenderId").get(e);if(await s.clear(),c)if(2===r){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!==(a=e.createTime)&&void 0!==a?a:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:d(e.vapidKey)}}}else if(3===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:d(e.auth),p256dh:d(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:d(e.vapidKey)}}}else if(4===r){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:d(e.auth),p256dh:d(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:d(e.vapidKey)}}}}})).close(),await i.deleteDB(p),await i.deleteDB("fcm_vapid_details_db"),await i.deleteDB("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await w(e,t),t}}async function w(e,t){const n=v(e),r=(await b()).transaction(g,"readwrite");return await r.objectStore(g).put(t,n),await r.done,t}function v({appConfig:e}){return e.appId}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},_=new o.ErrorFactory("messaging","Messaging",E);async function T(e,t){const n={method:"DELETE",headers:await O(e)};try{const r=await fetch(`${S(e.appConfig)}/${t}`,n),i=await r.json();if(i.error){const e=i.error.message;throw _.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw _.create("token-unsubscribe-failed",{errorInfo:null==e?void 0:e.toString()})}}function S({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function O({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function I({p256dh:e,auth:t,endpoint:n,vapidKey:r}){const i={web:{endpoint:n,auth:t,p256dh:e}};return r!==s&&(i.web.applicationPubKey=r),i}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function k(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:f(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:d(t.getKey("auth")),p256dh:d(t.getKey("p256dh"))},r=await y(e.firebaseDependencies);if(r){if(function(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r.subscriptionOptions,n))return Date.now()>=r.createTime+6048e5?async function(e,t){try{const n=await async function(e,t){const n=await O(e),r=I(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let o;try{const n=await fetch(`${S(e.appConfig)}/${t.token}`,i);o=await n.json()}catch(e){throw _.create("token-update-failed",{errorInfo:null==e?void 0:e.toString()})}if(o.error){const e=o.error.message;throw _.create("token-update-failed",{errorInfo:e})}if(!o.token)throw _.create("token-update-no-token");return o.token}(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await w(e.firebaseDependencies,r),n}catch(e){throw e}}(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await T(e.firebaseDependencies,r.token)}catch(e){console.warn(e)}return A(e.firebaseDependencies,n)}return A(e.firebaseDependencies,n)}async function C(e){const t=await y(e.firebaseDependencies);t&&(await T(e.firebaseDependencies,t.token),await async function(e){const t=v(e),n=(await b()).transaction(g,"readwrite");await n.objectStore(g).delete(t),await n.done}(e.firebaseDependencies));const n=await e.swRegistration.pushManager.getSubscription();return!n||n.unsubscribe()}async function A(e,t){const n=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await async function(e,t){const n=await O(e),r=I(t),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{const t=await fetch(S(e.appConfig),i);o=await t.json()}catch(e){throw _.create("token-subscribe-failed",{errorInfo:null==e?void 0:e.toString()})}if(o.error){const e=o.error.message;throw _.create("token-subscribe-failed",{errorInfo:e})}if(!o.token)throw _.create("token-subscribe-no-token");return o.token}(e,t),r={token:n,createTime:Date.now(),subscriptionOptions:t};return await w(e,r),r.token}async function M(e,t){const n=function(e,t){var n,r;const i={};e.from&&(i.project_number=e.from);e.fcmMessageId&&(i.message_id=e.fcmMessageId);i.instance_id=t,e.notification?i.message_type=l.DISPLAY_NOTIFICATION.toString():i.message_type=l.DATA_MESSAGE.toString();i.sdk_platform=3..toString(),i.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),!e.collapse_key||(i.collapse_key=e.collapse_key);i.event=1..toString(),!(null===(n=e.fcmOptions)||void 0===n?void 0:n.analytics_label)||(i.analytics_label=null===(r=e.fcmOptions)||void 0===r?void 0:r.analytics_label);return i}(t,await e.firebaseDependencies.installations.getId());!function(e,t,n){const r={};r.event_time_ms=Math.floor(Date.now()).toString(),r.source_extension_json_proto3=JSON.stringify({messaging_client_event:t}),!n||(r.compliance_data=function(e){const t={privacy_context:{prequest:{origin_associated_product_id:e}}};return t}(n));e.logEvents.push(r)}(e,n,t.productId)}async function P(e,t){const n=function({data:e}){if(!e)return null;try{return e.json()}catch(e){return null}}(e);if(!n)return;t.deliveryMetricsExportedToBigQueryEnabled&&await M(t,n);const r=await x();if(function(e){return e.some(e=>"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://"))}(r))return function(e,t){t.isFirebaseMessaging=!0,t.messageType=u.PUSH_RECEIVED;for(const n of e)n.postMessage(t)}(r,n);if(n.notification&&await function(e){var t;const{actions:n}=e,{maxActions:r}=Notification;n&&r&&n.length>r&&console.warn(`This browser only supports ${r} actions. The remaining actions will not be displayed.`);return self.registration.showNotification(null!==(t=e.title)&&void 0!==t?t:"",e)}(function(e){const t=Object.assign({},e.notification);return t.data={[c]:e},t}(n)),t&&t.onBackgroundMessageHandler){const e=function(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const o=t.notification.icon;o&&(e.notification.icon=o)}(t,e),function(e,t){t.data&&(e.data=t.data)}(t,e),function(e,t){var n,r,i,o,a;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};const s=null!==(i=null===(r=t.fcmOptions)||void 0===r?void 0:r.link)&&void 0!==i?i:null===(o=t.notification)||void 0===o?void 0:o.click_action;s&&(e.fcmOptions.link=s);const c=null===(a=t.fcmOptions)||void 0===a?void 0:a.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t,e),t}(n);"function"==typeof t.onBackgroundMessageHandler?await t.onBackgroundMessageHandler(e):t.onBackgroundMessageHandler.next(e)}}async function R(e){var t,n;const r=null===(n=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===n?void 0:n[c];if(!r)return;if(e.action)return;e.stopImmediatePropagation(),e.notification.close();const i=function(e){var t,n,r;const i=null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(r=e.notification)||void 0===r?void 0:r.click_action;if(i)return i;return o=e.data,"object"==typeof o&&o&&"google.c.a.c_id"in o?self.location.origin:null;var o;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r);if(!i)return;const o=new URL(i,self.location.href),a=new URL(self.location.origin);if(o.host!==a.host)return;let s=await async function(e){const t=await x();for(const n of t){const t=new URL(n.url,self.location.href);if(e.host===t.host)return n}return null}(o);var l;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return s?s=await s.focus():(s=await self.clients.openWindow(i),await(l=3e3,new Promise(e=>{setTimeout(e,l)}))),s?(r.messageType=u.NOTIFICATION_CLICKED,r.isFirebaseMessaging=!0,s.postMessage(r)):void 0}function x(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function D(e){return _.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e,t){const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));n.join("")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class j{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=function(e){if(!e||!e.options)throw D("App Configuration Object");if(!e.name)throw D("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const e of t)if(!n[e])throw D(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N=e=>{const t=new j(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",e=>{e.waitUntil(P(e,t))}),self.addEventListener("pushsubscriptionchange",e=>{e.waitUntil(async function(e,t){var n,r;const{newSubscription:i}=e;if(!i)return void await C(t);const o=await y(t.firebaseDependencies);await C(t),t.vapidKey=null!==(r=null===(n=null==o?void 0:o.subscriptionOptions)||void 0===n?void 0:n.vapidKey)&&void 0!==r?r:s,await k(t)}(e,t))}),self.addEventListener("notificationclick",e=>{e.waitUntil(R(e))}),t};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function B(){return o.isIndexedDBAvailable()&&await o.validateIndexedDBOpenable()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */a._registerComponent(new r.Component("messaging-sw",N,"PUBLIC")),n.experimentalSetDeliveryMetricsExportedToBigQueryEnabled=function(e,t){
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return function(e,t){e.deliveryMetricsExportedToBigQueryEnabled=t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e=o.getModularInstance(e),t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getMessaging=function(e=a.getApp()){return B().then(e=>{if(!e)throw _.create("unsupported-browser")},e=>{throw _.create("indexed-db-unsupported")}),a._getProvider(o.getModularInstance(e),"messaging-sw").getImmediate()},n.isSupported=B,n.onBackgroundMessage=function(e,t){return function(e,t){if(self.document!==undefined)throw _.create("only-available-in-sw");return e.onBackgroundMessageHandler=t,()=>{e.onBackgroundMessageHandler=null}}(e=o.getModularInstance(e),t)}}}},{package:"@metamask/notification-services-controller>firebase>@firebase/messaging",file:"node_modules/@firebase/messaging/dist/index.sw.cjs"}],[939,{_process:6757},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){(function(e){(function(){Object.defineProperty(n,"__esModule",{value:!0}),n.Sha1=n.RANDOM_FACTOR=n.MAX_VALUE_MILLIS=n.FirebaseError=n.ErrorFactory=n.Deferred=n.DecodeBase64StringError=n.CONSTANTS=void 0,n.areCookiesEnabled=function(){if("undefined"==typeof navigator||!navigator.cookieEnabled)return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.assertionError=n.assert=void 0,n.async=function(e,t){return(...n)=>{Promise.resolve(!0).then(()=>{e(...n)}).catch(e=>{t&&t(e)})}},n.base64urlEncodeWithoutPadding=n.base64Encode=n.base64Decode=n.base64=void 0,n.calculateBackoffMillis=function(e,t=A,n=M){const r=t*Math.pow(n,e),i=Math.round(R*r*(Math.random()-.5)*2);return Math.min(P,r+i)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.contains=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.createMockUserToken=function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[l(JSON.stringify({alg:"none",type:"JWT"})),l(JSON.stringify(o)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.createSubscribe=function(e,t){const n=new I(e,t);return n.subscribe.bind(n)},n.decode=void 0,n.deepCopy=function(e){return d(undefined,e)},n.deepEqual=function e(t,n){if(t===n)return!0;const r=Object.keys(t),i=Object.keys(n);for(const o of r){if(!i.includes(o))return!1;const r=t[o],a=n[o];if(O(r)&&O(a)){if(!e(r,a))return!1}else if(r!==a)return!1}for(const e of i)if(!r.includes(e))return!1;return!0},n.deepExtend=d,n.errorPrefix=C,n.extractQuerystring=function(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:undefined)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.getExperimentalSetting=n.getDefaults=n.getDefaultEmulatorHostnameAndPort=n.getDefaultEmulatorHost=n.getDefaultAppConfig=void 0,n.getGlobal=p,n.getModularInstance=
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){return e&&e._delegate?e._delegate:e},n.getUA=b,n.isAdmin=void 0,n.isBrowser=function(){return"undefined"!=typeof window||w()},n.isBrowserExtension=function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:undefined;return"object"==typeof e&&e.id!==undefined},n.isCloudflareWorker=function(){return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent},n.isElectron=function(){return b().indexOf("Electron/")>=0},n.isEmpty=function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0},n.isIE=function(){const e=b();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0},n.isIndexedDBAvailable=function(){try{return"object"==typeof indexedDB}catch(e){return!1}},n.isMobileCordova=function(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(b())},n.isNode=y,n.isNodeSdk=function(){return!0===t.NODE_CLIENT||!0===t.NODE_ADMIN},n.isReactNative=function(){return"object"==typeof navigator&&"ReactNative"===navigator.product},n.isSafari=function(){return!y()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")},n.isUWP=function(){return b().indexOf("MSAppHost/")>=0},n.isValidTimestamp=n.isValidFormat=void 0,n.isWebWorker=w,n.issuedAtTime=void 0,n.jsonEval=T,n.map=function(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r},n.ordinal=function(e){if(!Number.isFinite(e))return`${e}`;return e+function(e){e=Math.abs(e);const t=e%100;if(t>=10&&t<=20)return"th";const n=e%10;if(1===n)return"st";if(2===n)return"nd";if(3===n)return"rd";return"th"}(e)},n.promiseWithTimeout=
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t=2e3){const n=new m;return setTimeout(()=>n.reject("timeout!"),t),e.then(n.resolve,n.reject),n.promise}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.querystring=function(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""},n.querystringDecode=function(e){const t={},n=e.replace(/^\?/,"").split("&");return n.forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t},n.safeGet=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:undefined},n.stringToByteArray=n.stringLength=void 0,n.stringify=function(e){return JSON.stringify(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.validateArgCount=void 0,n.validateCallback=function(e,t,n,r){if(r&&!n)return;if("function"!=typeof n)throw new Error(C(e,t)+"must be a valid function.")},n.validateContextObject=function(e,t,n,r){if(r&&!n)return;if("object"!=typeof n||null===n)throw new Error(C(e,t)+"must be a valid context object.")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,n.validateIndexedDBOpenable=function(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})},n.validateNamespace=function(e,t,n){if(n&&!t)return;if("string"!=typeof t)throw new Error(C(e,"namespace")+"must be a valid firebase namespace.")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const t=n.CONSTANTS={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},r=function(e,t){if(!e)throw i(t)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.assert=r;const i=function(e){return new Error("Firebase Database ("+t.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.assertionError=i;const o=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},a=n.base64={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){const i=e[t],o=t+1<e.length,a=o?e[t+1]:0,s=t+2<e.length,c=s?e[t+2]:0,l=i>>2,u=(3&i)<<4|a>>4;let d=(15&a)<<2|c>>6,f=63&c;s||(f=64,o||(d=64)),r.push(n[l],n[u],n[d],n[f])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(o(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){const o=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(o>>10)),t[r++]=String.fromCharCode(56320+(1023&o))}else{const o=e[n++],a=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&a)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){const i=n[e.charAt(t++)],o=t<e.length?n[e.charAt(t)]:0;++t;const a=t<e.length?n[e.charAt(t)]:64;++t;const c=t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==o||null==a||null==c)throw new s;const l=i<<2|o>>4;if(r.push(l),64!==a){const e=o<<4&240|a>>2;if(r.push(e),64!==c){const e=a<<6&192|c;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class s extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}n.DecodeBase64StringError=s;const c=function(e){const t=o(e);return a.encodeByteArray(t,!0)};n.base64Encode=c;const l=function(e){return c(e).replace(/\./g,"")};n.base64urlEncodeWithoutPadding=l;const u=function(e){try{return a.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:e===undefined&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&f(n)&&(e[n]=d(e[n],t[n]));return e}function f(e){return"__proto__"!==e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */n.base64Decode=u;const h=()=>{try{return p().__FIREBASE_DEFAULTS__||(()=>{if(void 0===e||void 0===e.env)return})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&u(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}};n.getDefaults=h;const g=e=>{var t,n;return null===(n=null===(t=h())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]};n.getDefaultEmulatorHost=g;n.getDefaultEmulatorHostnameAndPort=e=>{const t=g(e);if(!t)return undefined;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]};n.getDefaultAppConfig=()=>{var e;return null===(e=h())||void 0===e?void 0:e.config};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.getExperimentalSetting=e=>{var t;return null===(t=h())||void 0===t?void 0:t[`_${e}`]};class m{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function y(){var e;const t=null===(e=h())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return!1}}function w(){return"undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope}n.Deferred=m;class v extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,v.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,E.prototype.create)}}n.FirebaseError=v;class E{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?function(e,t){return e.replace(_,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(i,n):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new v(r,a,n)}}n.ErrorFactory=E;const _=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(e){return JSON.parse(e)}const S=function(e){let t={},n={},r={},i="";try{const o=e.split(".");t=T(u(o[0])||""),n=T(u(o[1])||""),i=o[2],r=n.d||{},delete n.d}catch(e){}return{header:t,claims:n,data:r,signature:i}};n.decode=S;n.isValidTimestamp=function(e){const t=S(e).claims,n=Math.floor((new Date).getTime()/1e3);let r=0,i=0;return"object"==typeof t&&(t.hasOwnProperty("nbf")?r=t.nbf:t.hasOwnProperty("iat")&&(r=t.iat),i=t.hasOwnProperty("exp")?t.exp:r+86400),!!n&&!!r&&!!i&&n>=r&&n<=i};n.issuedAtTime=function(e){const t=S(e).claims;return"object"==typeof t&&t.hasOwnProperty("iat")?t.iat:null};n.isValidFormat=function(e){const t=S(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")};function O(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.isAdmin=function(e){const t=S(e).claims;return"object"==typeof t&&!0===t.admin};n.Sha1=class{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"==typeof e)for(let r=0;r<16;r++)n[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let r=0;r<16;r++)n[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){const t=n[e-3]^n[e-8]^n[e-14]^n[e-16];n[e]=4294967295&(t<<1|t>>>31)}let r,i,o=this.chain_[0],a=this.chain_[1],s=this.chain_[2],c=this.chain_[3],l=this.chain_[4];for(let e=0;e<80;e++){e<40?e<20?(r=c^a&(s^c),i=1518500249):(r=a^s^c,i=1859775393):e<60?(r=a&s|c&(a|s),i=2400959708):(r=a^s^c,i=3395469782);const t=(o<<5|o>>>27)+r+l+i+n[e]&4294967295;l=c,c=s,s=4294967295&(a<<30|a>>>2),a=o,o=t}this.chain_[0]=this.chain_[0]+o&4294967295,this.chain_[1]=this.chain_[1]+a&4294967295,this.chain_[2]=this.chain_[2]+s&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(null==e)return;t===undefined&&(t=e.length);const n=t-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<t;){if(0===o)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"==typeof e){for(;r<t;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<t;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let t=0;t<5;t++)for(let r=24;r>=0;r-=8)e[n]=this.chain_[t]>>r&255,++n;return e}};class I{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(e===undefined&&t===undefined&&n===undefined)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},r.next===undefined&&(r.next=k),r.error===undefined&&(r.error=k),r.complete===undefined&&(r.complete=k);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){this.observers!==undefined&&this.observers[e]!==undefined&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&this.onNoObservers!==undefined&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==undefined&&this.observers[e]!==undefined)try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,e!==undefined&&(this.finalError=e),this.task.then(()=>{this.observers=undefined,this.onNoObservers=undefined}))}}function k(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(e,t){return`${e} failed: ${t} argument `}n.validateArgCount=function(e,t,n,r){let i;if(r<t?i="at least "+t:r>n&&(i=0===n?"none":"no more than "+n),i){throw new Error(e+" failed: Was called with "+r+(1===r?" argument.":" arguments.")+" Expects "+i+".")}};n.stringToByteArray=function(e){const t=[];let n=0;for(let i=0;i<e.length;i++){let o=e.charCodeAt(i);if(o>=55296&&o<=56319){const t=o-55296;i++,r(i<e.length,"Surrogate pair missing trail surrogate.");o=65536+(t<<10)+(e.charCodeAt(i)-56320)}o<128?t[n++]=o:o<2048?(t[n++]=o>>6|192,t[n++]=63&o|128):o<65536?(t[n++]=o>>12|224,t[n++]=o>>6&63|128,t[n++]=63&o|128):(t[n++]=o>>18|240,t[n++]=o>>12&63|128,t[n++]=o>>6&63|128,t[n++]=63&o|128)}return t};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.stringLength=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};const A=1e3,M=2,P=n.MAX_VALUE_MILLIS=144e5,R=n.RANDOM_FACTOR=.5}).call(this)}).call(this,e("_process"))}}},{package:"@metamask/notification-services-controller>firebase>@firebase/util",file:"node_modules/@firebase/util/dist/index.esm2017.js"}],[94,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.hardwareKeyringBuilderFactory=function(e,t){const n=()=>new e({bridge:new t});return n.type=e.type,n}}}},{package:"$root$",file:"app/scripts/lib/hardware-keyring-builder-factory.ts"}],[940,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});class r{static parse(e){if(""===e)return new r([]);if(!e.startsWith("/"))throw new i(e);const[,...t]=e.split("/");return new r(t.map(e=>e.replace(/~1/g,"/").replace(/~0/g,"~")))}constructor(e){this.tokens=e}toString(){if(0===this.tokens.length)return"";return`/${this.tokens.map(e=>e.replace(/~/g,"~0").replace(/\//g,"~1")).join("/")}`}shmeval(e){for(const t of this.tokens){if(!e.hasOwnProperty(t))throw new o(e,t);e=e[t]}return e}}n.default=r;class i extends Error{constructor(e){super(`Invalid JSON Pointer: ${e}`),this.ptr=e}}n.InvalidPtrError=i;class o extends Error{constructor(e,t){super(`Error evaluating JSON Pointer: no attribute ${t} on ${e}`),this.instance=e,this.token=t}}n.EvalError=o}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/reference-resolver>@json-schema-spec/json-pointer",file:"node_modules/@json-schema-spec/json-pointer/lib/index.js"}],[941,{"@json-schema-tools/reference-resolver":946,"@json-schema-tools/traverse":949,"fast-safe-stringify":5879},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},r.apply(this,arguments)},i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,s)}c((r=r.apply(e,t||[])).next())})},o=this&&this.__generator||function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.NonStringRefError=void 0;var s=a(e("@json-schema-tools/traverse")),c=a(e("@json-schema-tools/reference-resolver")),l=a(e("fast-safe-stringify")),u=function(e){this.name="NonStringRefError",this.message=["NonStringRefError","Found an improperly formatted $ref in schema. $ref must be a string","schema in question: ".concat((0,l.default)(e))].join("\n")};n.NonStringRefError=u;var d=function(e,t){if(e.$ref!==undefined&&Object.keys(e).length>1&&!0!==t&&!1!==t){var n=r(r({},t),e);return delete n.$ref,n}return t},f=function(){function e(e,t){var n;if(void 0===t&&(t={}),this.options=t,this.refCache={},n=!0===this.options.mutate||!0===e||!1===e?e:r({},e),this.options.recursive===undefined&&(this.options.recursive=!0),this.options.rootSchema===undefined&&(this.options.rootSchema=n),!0!==e&&!1!==e&&e.$id&&(this.options.rootSchema=n),this.options.refCache&&(this.refCache=this.options.refCache),this.options.protocolHandlerMap)for(var i=0,o=Object.keys(this.options.protocolHandlerMap);i<o.length;i++){var a=o[i];c.default.protocolHandlerMap[a]=this.options.protocolHandlerMap[a]}this.schema=n,this.refs=this.collectRefs()}return e.prototype.resolve=function(){return i(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return[4,this._resolve()];case 1:return e.sent(),delete this.schema.definitions,delete this.schema.components,[2,this.schema]}})})},e.prototype._resolve=function(){return i(this,void 0,void 0,function(){var t,n,i,a,l,u,f,p,h,g,m,b=this;return o(this,function(o){switch(o.label){case 0:if(!0===this.schema||!1===this.schema)return[2,Promise.resolve(this.schema)];if(0===this.refs.length)return[2,Promise.resolve(this.schema)];t=this.refs.filter(function(e){return b.refCache[e]===undefined}),n=[],i=0,a=t,o.label=1;case 1:return i<a.length?(l=a[i],u=void 0,this.refCache[l]===undefined?[3,2]:(u=this.refCache[l],[3,5])):[3,11];case 2:if("#"!==l)return[3,3];if(this.options.rootSchema===undefined)throw new Error("options.rootSchema was not provided, but one of the schemas references '#'");return u=this.options.rootSchema,[3,5];case 3:return f=c.default.resolve(l,this.options.rootSchema),n.push(f),[4,f];case 4:u=o.sent(),o.label=5;case 5:return!0!==this.options.recursive||!0===u||!1===u||"#"===l?[3,9]:(p=r(r({},this.options),{refCache:this.refCache}),0===(h=new e(u,p)).refs.length?[3,7]:(g=h._resolve(),n.push(g),[4,g]));case 6:return m=o.sent(),this.refCache[l]=d(u,m),[3,8];case 7:this.refCache[l]=u,o.label=8;case 8:return[3,10];case 9:this.refCache[l]=u,o.label=10;case 10:return i++,[3,1];case 11:return this.schema.$ref!==undefined?this.schema=d(this.schema,this.refCache[this.schema.$ref]):(0,s.default)(this.schema,function(e){if(!0===e||!1===e)return e;if(e.$ref!==undefined){var t=b.refCache[e.$ref];return d(e,t)}return e},{mutable:!0}),[4,Promise.all(n)];case 12:return o.sent(),[2,this.schema]}})})},e.prototype.collectRefs=function(){var e=[];return(0,s.default)(this.schema,function(t){if(!0===t||!1===t)return t;if(t.$ref&&-1===e.indexOf(t.$ref)){if("string"!=typeof t.$ref)throw new u(t);e.push(t.$ref)}return t}),e},e}();n.default=f}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/dereferencer",file:"node_modules/@json-schema-tools/dereferencer/build/dereferencer.js"}],[942,{"./dereferencer":941},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.NonStringRefError=void 0;var i=r(e("./dereferencer")),o=e("./dereferencer");Object.defineProperty(n,"NonStringRefError",{enumerable:!0,get:function(){return o.NonStringRefError}}),n.default=i.default}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/dereferencer",file:"node_modules/@json-schema-tools/dereferencer/build/index.js"}],[943,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.jsonSchema=void 0,n.jsonSchema={$schema:"https://meta.json-schema.tools/",$id:"https://meta.json-schema.tools/",title:"JSONSchema",default:{},oneOf:[{$ref:"#/definitions/JSONSchemaObject"},{$ref:"#/definitions/JSONSchemaBoolean"}],definitions:{JSONSchemaBoolean:{title:"JSONSchemaBoolean",description:"Always valid if true. Never valid if false. Is constant.",type:"boolean"},JSONSchemaObject:{title:"JSONSchemaObject",type:"object",properties:{$id:{title:"$id",type:"string",format:"uri-reference"},$schema:{title:"$schema",type:"string",format:"uri"},$ref:{title:"$ref",type:"string",format:"uri-reference"},$comment:{title:"$comment",type:"string"},title:{title:"title",type:"string"},description:{title:"description",type:"string"},default:!0,readOnly:{title:"readOnly",type:"boolean",default:!1},examples:{title:"examples",type:"array",items:!0},multipleOf:{title:"multipleOf",type:"number",exclusiveMinimum:0},maximum:{title:"maximum",type:"number"},exclusiveMaximum:{title:"exclusiveMaximum",type:"number"},minimum:{title:"minimum",type:"number"},exclusiveMinimum:{title:"exclusiveMinimum",type:"number"},maxLength:{$ref:"#/definitions/nonNegativeInteger"},minLength:{$ref:"#/definitions/nonNegativeIntegerDefault0"},pattern:{title:"pattern",type:"string",format:"regex"},additionalItems:{$ref:"#"},items:{title:"items",anyOf:[{$ref:"#"},{$ref:"#/definitions/schemaArray"}],default:!0},maxItems:{$ref:"#/definitions/nonNegativeInteger"},minItems:{$ref:"#/definitions/nonNegativeIntegerDefault0"},uniqueItems:{title:"uniqueItems",type:"boolean",default:!1},contains:{$ref:"#"},maxProperties:{$ref:"#/definitions/nonNegativeInteger"},minProperties:{$ref:"#/definitions/nonNegativeIntegerDefault0"},required:{$ref:"#/definitions/stringArray"},additionalProperties:{$ref:"#"},definitions:{title:"definitions",type:"object",additionalProperties:{$ref:"#"},default:{}},properties:{title:"properties",type:"object",additionalProperties:{$ref:"#"},default:{}},patternProperties:{title:"patternProperties",type:"object",additionalProperties:{$ref:"#"},propertyNames:{title:"propertyNames",format:"regex"},default:{}},dependencies:{title:"dependencies",type:"object",additionalProperties:{title:"dependenciesSet",anyOf:[{$ref:"#"},{$ref:"#/definitions/stringArray"}]}},propertyNames:{$ref:"#"},const:!0,enum:{title:"enum",type:"array",items:!0,minItems:1,uniqueItems:!0},type:{title:"type",anyOf:[{$ref:"#/definitions/simpleTypes"},{title:"arrayOfSimpleTypes",type:"array",items:{$ref:"#/definitions/simpleTypes"},minItems:1,uniqueItems:!0}]},format:{title:"format",type:"string"},contentMediaType:{title:"contentMediaType",type:"string"},contentEncoding:{title:"contentEncoding",type:"string"},if:{$ref:"#"},then:{$ref:"#"},else:{$ref:"#"},allOf:{$ref:"#/definitions/schemaArray"},anyOf:{$ref:"#/definitions/schemaArray"},oneOf:{$ref:"#/definitions/schemaArray"},not:{$ref:"#"}}},schemaArray:{title:"schemaArray",type:"array",minItems:1,items:{$ref:"#"}},nonNegativeInteger:{title:"nonNegativeInteger",type:"integer",minimum:0},nonNegativeIntegerDefault0:{title:"nonNegativeIntegerDefaultZero",type:"integer",minimum:0,default:0},simpleTypes:{title:"simpleTypes",type:"string",enum:["array","boolean","integer","null","number","object","string"]},stringArray:{title:"stringArray",type:"array",items:{type:"string"},uniqueItems:!0,default:[]}}},n.default=n.jsonSchema}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/meta-schema",file:"node_modules/@json-schema-tools/meta-schema/index.js"}],[944,{"./errors":945,"isomorphic-fetch":6183},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,s)}c((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var a=e("./errors"),s=o(e("isomorphic-fetch")),c=function(e){return r(void 0,void 0,void 0,function(){var t,n;return i(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,(0,s.default)(e)];case 1:return t=r.sent(),[3,3];case 2:throw r.sent(),new a.InvalidRemoteURLError(e);case 3:return r.trys.push([3,5,,6]),[4,t.json()];case 4:return[2,r.sent()];case 5:throw n=r.sent(),new a.NonJsonRefError({$ref:e},n.message);case 6:return[2]}})})};n.default={https:c,http:c}}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/reference-resolver",file:"node_modules/@json-schema-tools/reference-resolver/build/default-protocol-handler-map.js"}],[945,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.InvalidFileSystemPathError=n.InvalidRemoteURLError=n.NotResolvableError=n.NonJsonRefError=void 0;var r=function(e,t){this.name="NonJsonRefError",this.message=["NonJsonRefError","The resolved value at the reference: ".concat(e.$ref," was not JSON.parse 'able"),"The non-json content in question: ".concat(t)].join("\n")};n.NonJsonRefError=r;var i=function(e){this.name="NotResolvableError",this.message=["NotResolvableError","Could not resolve the reference: ".concat(e),"No protocol handler was found, and it was not found to be an internal reference"].join("\n")};n.NotResolvableError=i;var o=function(e){this.name="InvalidRemoteURLError",this.message=["InvalidRemoteURLError","The url was not resolvable: ".concat(e)].join("\n")};n.InvalidRemoteURLError=o;var a=function(e){this.name="InvalidFileSystemPathError",this.message=["InvalidFileSystemPathError","The path was not resolvable: ".concat(e)].join("\n")};n.InvalidFileSystemPathError=a}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/reference-resolver",file:"node_modules/@json-schema-tools/reference-resolver/build/errors.js"}],[946,{"./default-protocol-handler-map":944,"./reference-resolver":947},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},r.apply(this,arguments)},i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,s)}c((r=r.apply(e,t||[])).next())})},o=this&&this.__generator||function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var s=a(e("./default-protocol-handler-map")),c=a(e("./reference-resolver")),l=r(r({},s.default),{file:function(){return i(void 0,void 0,void 0,function(){return o(this,function(e){return[2,undefined]})})}});n.default=new c.default(l)}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/reference-resolver",file:"node_modules/@json-schema-tools/reference-resolver/build/index-web.js"}],[947,{"./errors":945,"./resolve-pointer":948},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,s)}c((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var a=e("./errors"),s=o(e("./resolve-pointer")),c=function(){function e(e){this.protocolHandlerMap=e}return e.prototype.resolve=function(e){return r(this,arguments,void 0,function(e,t){var n,r,o,c,l,u,d,f,p,h;return void 0===t&&(t={}),i(this,function(i){switch(i.label){case 0:if("#"===e[0])return[2,Promise.resolve((0,s.default)(e,t))];(n=e.split("#")).length>1&&(r=n[n.length-1]),o=n[0],i.label=1;case 1:return i.trys.push([1,3,,4]),[4,this.protocolHandlerMap.file(o,t)];case 2:return c=i.sent(),[3,4];case 3:throw l=i.sent(),new a.NonJsonRefError({$ref:e},l.message);case 4:if(c!==undefined)return h=c,r&&(h=(0,s.default)(r,h)),[2,h];if(!1===e.includes("://"))throw new a.InvalidFileSystemPathError(e);u=0,d=Object.keys(this.protocolHandlerMap),i.label=5;case 5:return u<d.length?(f=d[u],o.startsWith(f)?[4,this.protocolHandlerMap[f](o,t)]:[3,7]):[3,8];case 6:if((p=i.sent())!==undefined)return h=p,r&&(h=(0,s.default)(r,h)),[2,h];i.label=7;case 7:return u++,[3,5];case 8:throw new a.NotResolvableError(e)}})})},e}();n.default=c}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/reference-resolver",file:"node_modules/@json-schema-tools/reference-resolver/build/reference-resolver.js"}],[948,{"@json-schema-spec/json-pointer":940},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.InvalidJsonPointerRefError=void 0;var i=r(e("@json-schema-spec/json-pointer")),o=function(e,t){this.name="InvalidJsonPointerRefError",this.message=["InvalidJsonPointerRefError","The provided RFC6901 JSON Pointer is invalid: ".concat(e),"","addition info: ",t].join("\n")};n.InvalidJsonPointerRefError=o,n.default=function(e,t){try{var n=e.replace("#","");return i.default.parse(n).shmeval(t)}catch(t){throw new o(e,t.message)}}}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/reference-resolver",file:"node_modules/@json-schema-tools/reference-resolver/build/resolve-pointer.js"}],[949,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},r.apply(this,arguments)},i=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))};Object.defineProperty(n,"__esModule",{value:!0}),n.defaultOptions=void 0,n.defaultOptions={skipFirstMutation:!1,mutable:!1,bfs:!1};var o=function(e){return e.map(function(e){return""===e?"$":".".concat(e)}).join("")},a=function(e,t){var n=t.find(function(t){return t===e});return n||!1},s=function(e,t){return void 0===t&&(t=1),e[e.length-t]};n.default=function e(t,c,l,u,d,f,p,h,g){void 0===l&&(l=n.defaultOptions),void 0===u&&(u=0),void 0===d&&(d=[]),void 0===f&&(f=[]),void 0===p&&(p=[]),void 0===h&&(h=[]),void 0===g&&(g=[]);var m=r(r({},n.defaultOptions),l);if(0===u&&(p=[""]),"boolean"==typeof t||t instanceof Boolean)return!0===m.skipFirstMutation&&0===u?t:c(t,!1,o(p),s(f));var b=t;!1===m.mutable&&(b=r({},t)),f.push(b),!0===m.bfs&&(!1!==m.skipFirstMutation&&0===u||(b=c(b,!1,o(p),s(f,2)))),d.push(t),h.push([t,b]);var y=function(t,n){var r=a(t,d);return r?(g.push(r),!0===m.skipFirstMutation&&r===d[0]?c(t,!0,o(n),s(f)):h.find(function(e){var t=e[0];return r===t})[1]):e(t,c,l,u+1,d,f,n,h,g)};if(t.anyOf)b.anyOf=t.anyOf.map(function(e,t){return y(e,i(i([],p,!0),["anyOf[".concat(t,"]")],!1))});else if(t.allOf)b.allOf=t.allOf.map(function(e,t){return y(e,i(i([],p,!0),["allOf[".concat(t,"]")],!1))});else if(t.oneOf)b.oneOf=t.oneOf.map(function(e,t){return y(e,i(i([],p,!0),["oneOf[".concat(t,"]")],!1))});else{if(t.items)if(t.items instanceof Array)b.items=t.items.map(function(e,t){return y(e,i(i([],p,!0),["items[".concat(t,"]")],!1))});else{var w=a(t.items,d);if(w)if(g.push(w),!0===m.skipFirstMutation&&w===d[0])b.items=c(t.items,!0,o(p),s(f));else{var v=h.find(function(e){var t=e[0];return w===t})[1];b.items=v}else b.items=e(t.items,c,l,u+1,d,f,i(i([],p,!0),["items"],!1),h,g)}if(t.additionalItems!==undefined&&(b.additionalItems=y(t.additionalItems,i(i([],p,!0),["additionalItems"],!1))),t.properties!==undefined){var E=t.properties,_={};Object.keys(t.properties).forEach(function(e){_[e]=y(E[e],i(i([],p,!0),["properties",e.toString()],!1))}),b.properties=_}if(t.patternProperties!==undefined){var T=t.patternProperties,S={};Object.keys(t.patternProperties).forEach(function(e){S[e]=y(T[e],i(i([],p,!0),["patternProperties",e.toString()],!1))}),b.patternProperties=S}t.additionalProperties!==undefined&&!0==!!t.additionalProperties&&(b.additionalProperties=y(t.additionalProperties,i(i([],p,!0),["additionalProperties"],!1)))}if(!0===m.skipFirstMutation&&0===u)return b;if(!0===m.bfs)return f.pop(),b;var O=-1!==g.indexOf(t);return f.pop(),c(b,O,o(p),s(f))}}}},{package:"@open-rpc/schema-utils-js>@json-schema-tools/dereferencer>@json-schema-tools/traverse",file:"node_modules/@json-schema-tools/traverse/build/index.js"}],[96,{"../../../shared/lib/sentry":7955,"@metamask/messenger":2976},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.ROOT_MESSENGER_NAMESPACE=void 0,n.getRootMessenger=function(){return new r.Messenger({namespace:o,captureException:i.captureException})};var r=e("@metamask/messenger"),i=e("../../../shared/lib/sentry");const o=n.ROOT_MESSENGER_NAMESPACE="Root"}}},{package:"$root$",file:"app/scripts/lib/messenger.ts"}],[98,{"../util":189},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.createPendingNonceMiddleware=function({getPendingNonce:e}){return async({request:t,context:n,next:r})=>{const{method:i,params:o}=t;if("eth_getTransactionCount"!==i)return r();const[a,s]=o;return"pending"!==s?r():await e(a,n.get("networkClientId"))}},n.createPendingTxMiddleware=function({getPendingTransactionByHash:e}){return async({request:t,next:n})=>{const{method:i,params:o}=t;if("eth_getTransactionByHash"!==i)return n();const[a]=o,s=e(a);return s?(0,r.formatTxMetaForRpcResult)(s):n()}};var r=e("../util")}}},{package:"$root$",file:"app/scripts/lib/middleware/pending.ts"}],[99,{"../../../../shared/lib/stores/persistence-manager":7969,"@metamask/utils":4353,events:5859,loglevel:6473},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=s(e("events")),i=s(e("loglevel")),o=e("@metamask/utils"),a=e("../../../../shared/lib/stores/persistence-manager");function s(e){return e&&e.__esModule?e:{default:e}}class c extends r.default{constructor(e={}){super();const t=e.migrations||[];this.migrations=t.sort((e,t)=>e.version-t.version);const n=this.migrations.slice(-1)[0];this.defaultVersion=e.defaultVersion||n&&n.version||0}async migrateData(e=this.generateInitialState()){const t=(0,o.isObject)(e.data)&&e.meta.version<186?new Set(Object.keys(e.data)):new Set;let n=e;for(const e of this.migrations)if(a(e))try{let r;if(i.default.info(`Running migration ${e.version}...`),e.version<186)r=await e.migrate(n),s(r,e);else{r=structuredClone(n);const o=new Set,a=await e.migrate(r,o);if(s(r,e),void 0!==a)throw new Error("Migrator - migration returned value when none expected");if(0===o.size)i.default.debug(`Migrator - migration ${e.version} did not report any changes`);else for(const e of o)t.add(e)}n=r,i.default.info(`Migration ${e.version} complete`)}catch(t){const n=new AggregateError([t],`MetaMask Migration Error #${e.version}`);this.emit("error",n);break}const r=e.meta.version<186&&(0,o.isObject)(n.data)?new Set(Object.keys(n.data)):new Set;for(const e of t)r.add(e);return{state:n,changedKeys:r};function a(e){return e.version>n.meta.version}function s(e,t){if(!e.data)throw new Error("Migrator - migration returned empty data");if(e.version!==undefined&&e.meta.version!==t.version)throw new Error("Migrator - Migration did not update version number correctly")}}generateInitialState(e){return{data:e,meta:{storageKind:a.PersistenceManager.defaultStorageKind,version:this.defaultVersion}}}}n.default=c}}},{package:"$root$",file:"app/scripts/lib/migrator/index.js"}],[9,{"../../shared/constants/app":7780,"../../shared/constants/app-state":7779,"../../shared/constants/defi-referrals":7787,"../../shared/constants/errors":7788,"../../shared/constants/infura-project-id":7793,"../../shared/constants/messages":7798,"../../shared/constants/metametrics":7799,"../../shared/constants/offscreen-communication":7805,"../../shared/constants/onboarding":7806,"../../shared/constants/start-up-errors":7819,"../../shared/constants/ui-initialization":7827,"../../shared/lib/browser-runtime.utils":7848,"../../shared/lib/caip-stream":7850,"../../shared/lib/deep-links/utils":7885,"../../shared/lib/fetch-with-timeout":7901,"../../shared/lib/get-first-preferred-lang-code":7916,"../../shared/lib/manifestFlags":7921,"../../shared/lib/mv3.utils":7930,"../../shared/lib/object.utils":7933,"../../shared/lib/promise-with-resolvers":7942,"../../shared/lib/selectors/networks":7951,"../../shared/lib/sentry":7955,"../../shared/lib/stores/persistence-manager":7969,"./constants/marketing-site-whitelist":10,"./constants/sentry-state":11,"./constants/snaps":12,"./constants/stream":13,"./first-time-state":50,"./lib/CronjobControllerStorageManager":54,"./lib/approval/utils":61,"./lib/createDefiReferralMiddleware":63,"./lib/critical-error/critical-error-recovery":77,"./lib/critical-error/critical-error-tab-handoff":78,"./lib/deep-links/deep-link-router":82,"./lib/deep-links/metrics":83,"./lib/ens-ipfs/setup":89,"./lib/extension-lazy-listener/extension-lazy-listener":90,"./lib/getIframeProperties":92,"./lib/getObjStructure":93,"./lib/migrator":99,"./lib/notification-manager":103,"./lib/repair":115,"./lib/safe-reload":132,"./lib/setup-initial-state-hooks":135,"./lib/start-up-errors/start-up-errors":147,"./lib/state-corruption/state-corruption-recovery":148,"./lib/stream-utils":151,"./lib/update-remote-feature-flags":187,"./lib/use-split-state-storage":188,"./lib/util":189,"./metamask-controller":412,"./migrations":652,"./offscreen":653,"./on-update":654,"./platforms/extension":655,"@metamask/base-controller":1736,"@metamask/design-tokens":2296,"@metamask/utils":4353,"extension-port-stream":5864,loglevel:6473,"readable-stream":6946,"webextension-polyfill":7767},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0}),n.loadStateFromPersistence=rt,n.setupController=ct;var r=e("./lib/setup-initial-state-hooks");e("../../shared/constants/infura-project-id");var i=e("@metamask/design-tokens"),o=e("readable-stream"),a=le(e("loglevel")),s=le(e("webextension-polyfill")),c=e("@metamask/utils"),l=e("@metamask/base-controller"),u=e("extension-port-stream"),d=e("../../shared/lib/promise-with-resolvers"),f=e("../../shared/constants/onboarding"),p=e("../../shared/constants/app"),h=e("../../shared/constants/app-state"),g=e("../../shared/constants/messages"),m=e("../../shared/constants/ui-initialization"),b=e("../../shared/constants/metametrics"),y=e("../../shared/lib/browser-runtime.utils"),w=e("../../shared/lib/mv3.utils"),v=e("../../shared/lib/object.utils"),E=(e("../../shared/constants/offscreen-communication"),e("../../shared/lib/sentry")),_=e("../../shared/lib/selectors/networks"),T=e("../../shared/lib/caip-stream"),S=le(e("../../shared/lib/fetch-with-timeout")),O=e("../../shared/constants/errors"),I=le(e("../../shared/lib/get-first-preferred-lang-code")),k=(e("../../shared/lib/manifestFlags"),e("../../shared/constants/start-up-errors")),C=e("../../shared/constants/defi-referrals"),A=e("../../shared/lib/deep-links/utils"),M=e("../../shared/lib/stores/persistence-manager"),P=e("./lib/critical-error/critical-error-recovery"),R=e("./lib/state-corruption/state-corruption-recovery"),x=e("./lib/approval/utils"),D=e("./lib/use-split-state-storage"),j=le(e("./migrations")),N=le(e("./lib/migrator")),B=e("./lib/update-remote-feature-flags"),L=le(e("./platforms/extension")),$=e("./constants/sentry-state"),U=ce(e("./lib/notification-manager")),F=ce(e("./metamask-controller")),H=le(e("./lib/getObjStructure")),K=le(e("./lib/ens-ipfs/setup")),V=e("./lib/util"),q=e("./offscreen"),z=e("./lib/stream-utils"),W=le(e("./first-time-state")),G=e("./on-update"),Y=e("./constants/marketing-site-whitelist"),J=e("./constants/stream"),Z=e("./constants/snaps"),X=e("./lib/extension-lazy-listener/extension-lazy-listener"),Q=e("./lib/deep-links/deep-link-router"),ee=e("./lib/deep-links/metrics"),te=e("./lib/safe-reload"),ne=e("./lib/critical-error/critical-error-tab-handoff"),re=e("./lib/repair"),ie=e("./lib/start-up-errors/start-up-errors"),oe=e("./lib/CronjobControllerStorageManager"),ae=e("./lib/createDefiReferralMiddleware"),se=e("./lib/getIframeProperties");function ce(e,t){if("function"==typeof WeakMap)var n=new WeakMap,r=new WeakMap;return(ce=function(e,t){if(!t&&e&&e.__esModule)return e;var i,o,a={__proto__:null,default:e};if(null===e||"object"!=typeof e&&"function"!=typeof e)return a;if(i=t?r:n){if(i.has(e))return i.get(e);i.set(e,a)}for(const t in e)"default"!==t&&{}.hasOwnProperty.call(e,t)&&((o=(i=Object.defineProperty)&&Object.getOwnPropertyDescriptor(e,t))&&(o.get||o.set)?i(a,t,o):a[t]=e[t]);return a})(e,t)}function le(e){return e&&e.__esModule?e:{default:e}}const ue=globalThis.stateHooks.lazyListener??new X.ExtensionLazyListener(s.default),de="#0376C9",fe=i.lightTheme.colors.error.default,pe=9,he=99,ge=!1;const me=null,{safePersist:be,requestSafeReload:ye,evacuate:we}=(0,te.getRequestSafeReload)(r.persistenceManager);global.stateHooks.getMostRecentPersistedState=()=>r.persistenceManager.mostRecentRetrievedState,global.stateHooks.getStorageKind=()=>r.persistenceManager.storageKind,global.logEncryptedVault=()=>{r.persistenceManager.logEncryptedVault()};const{sentry:ve}=global;let Ee={...W.default};const _e={[p.ENVIRONMENT_TYPE_POPUP]:!0,[p.ENVIRONMENT_TYPE_NOTIFICATION]:!0,[p.ENVIRONMENT_TYPE_FULLSCREEN]:!0},Te=["trezor-connect"];a.default.setLevel("info",!1);const Se=new L.default,Oe=new U.default,Ie=(0,V.getPlatform)()===p.PLATFORM_FIREFOX;function ke(e){const t=e.name,n=e.sender?.url?new URL(e.sender.url):null;let r;return r=Ie?Boolean(_e[t]):n?.origin===`chrome-extension://${s.default.runtime.id}`,{processName:t,senderUrl:n,isMetaMaskUIPort:r}}let Ce=0,Ae=!1,Me=!1,Pe=0,Re=0;const xe=new Set,De={},je={};let Ne;const Be={},Le={},$e={};const Ue=new URL("https://metamask.github.io/phishing-warning/v5.1.0/"),Fe=Ue.toString();let He,Ke,Ve;function qe(){const e=(0,d.withResolvers)();He=e.promise,Ke=e.resolve,Ve=e.reject}ue.once("runtime","onInstalled").then(e=>{!async function([e]){if("install"===e.reason)await async function(){a.default.debug("First install detected"),Se.openExtensionInBrowser();await ut()}();else if("update"===e.reason){const{previousVersion:t}=e;if(!t||t===Se.getVersion())return;await He,(0,G.onUpdate)(Ne,Se,t,ye)}}(e)}),qe(),s.default?.sidePanel?.setPanelBehavior&&s.default.sidePanel.setPanelBehavior({openPanelOnActionClick:!0}).catch(()=>{});let ze,We,Ge,Ye;const Je=new R.CorruptionHandler,Ze=new P.CriticalErrorHandler,Xe=async e=>{const{isMetaMaskUIPort:t}=ke(e);try{e.postMessage({data:{method:m.BACKGROUND_LIVENESS_METHOD},name:"background-liveness"})}catch(e){return void a.default.error("MetaMask - background-liveness check: Failed to message to port",e)}let n;t&&(Ze.registerPortForCriticalError({port:e,repairCallback:()=>(0,re.requestRepair)(()=>(0,ne.openRestoringTabAndReload)(ye))}),n=()=>Ze.removeListenersForPort(e));try{if(await He,!(0,ie.tryPostMessage)(e,m.BACKGROUND_INITIALIZED_METHOD))return;ge,ze(e,n)}catch(i){try{if(ve?.captureException(i),t)if((0,O.isStateCorruptionError)(i))await Je.handleStateCorruptionError({port:e,error:i,database:r.persistenceManager,repairCallback:async e=>{qe(),(0,M.hasVault)(e)?(await dt(e),Ne.onboardingController.setFirstTimeFlowType(f.FirstTimeFlowType.restore)):(await r.persistenceManager.reset(),await dt(null))}});else{const t=(0,c.isObject)(i)?{message:i.message??"Unknown error",name:i.name??"UnknownError",stack:i.stack,...i.sentryTags&&{sentryTags:i.sentryTags}}:{message:String(i),name:"UnknownError",stack:""};(0,ie.tryPostMessage)(e,k.DISPLAY_GENERAL_STARTUP_ERROR,{error:t,currentLocale:Ne?.preferencesController?.state?.currentLocale})}}finally{n?.()}}},Qe=()=>{ue.addListener("runtime","onConnect",Xe)};function et(){const e=(new Date).toISOString();s.default.storage.session.set({timestamp:e})}async function tt(e){(0,V.initInstallType)();const t=w.isManifestV3?(0,q.createOffscreen)():null;let n=null,i=!1;w.isManifestV3&&(0,q.addOffscreenConnectivityListener)(e=>{if(i&&Ne.messengerClientApi.setConnectivityStatus){const t=e?"online":"offline";Ne.messengerClientApi.setConnectivityStatus(t)}else n=e});const o=await rt(e),a=o.data,c=await(0,I.default)();let l;if(w.isManifestV3){if(!1!==a.PreferencesController?.enableMV3TimestampSave){const e=2e3;et(),setInterval(et,e)}const e=await s.default.storage.session.get(["isFirstMetaMaskControllerSetup"]);l=e?.isFirstMetaMaskControllerSetup===undefined,await s.default.storage.session.set({isFirstMetaMaskControllerSetup:l})}const u={},d=await async function(){const e=(0,S.default)(),t=Z.PREINSTALLED_SNAPS_URLS.map(async t=>{const n=await e(t);if(t.pathname.endsWith(".json.gz")){const e=new DecompressionStream("gzip"),t=n.body.pipeThrough(e);return await new Response(t).json()}return await n.json()});return Promise.all(t)}(),f=new oe.CronjobControllerStorageManager;if(await f.init(),ct(a,c,u,l,o.meta,t,d,f),Ne.metaMetricsController.updateTraits({[b.MetaMetricsUserTrait.StorageKind]:r.persistenceManager.storageKind}),function(e){async function t(e,t){try{const n=await s.default.tabs.get(e);return!(n.url&&n.url.startsWith("https://www.google.com/search")||(await s.default.tabs.update(e,{url:t}),0))}catch(e){return ve?.captureException(e),!1}}const n=!w.isManifestV3;s.default.webRequest.onBeforeRequest.addListener(r=>{if(r.tabId===s.default.tabs.TAB_ID_NONE)return{};const{completedOnboarding:i}=e.onboardingController.state;if(!i)return{};if(!e.preferencesController.state.usePhishDetect)return{};if(r.initiator&&"null"!==r.initiator&&new URL(r.initiator).host===Ue.host)return{};const{hostname:o,href:a,searchParams:c}=new URL(r.url);e.phishingController.maybeUpdateState();const l=e.phishingController.isBlockedRequest(r.url);let u,d;if("main_frame"!==r.type&&"sub_frame"!==r.type||(u=e.phishingController.test(r.url)),!u?.result&&!l.result)return{};let f,p=a;u?.result&&l.result?d=`${u.type} and ${l.type}`:u?.result?d=u.type:(d=l.type,p=r.initiator);try{f=new URL(p).hostname}catch{f=o,p=a}const h=new URLSearchParams({hostname:f,href:p}),g=new URL(Fe);g.hash=h.toString();const m=g.toString(),y=()=>{Ie||e.metaMetricsController.trackEvent({event:b.MetaMetricsEventName.PhishingPageDisplayed,category:b.MetaMetricsEventCategory.Phishing,properties:{url:p,referrer:{url:p},reason:d,requestDomain:l.result?o:undefined}},{excludeMetaMetricsId:!0})};return n?"main_frame"===r.type?(y(),{redirectUrl:m}):(t(r.tabId,m).then(e=>{e&&y()}),{cancel:!0}):(t(r.tabId,m).then(e=>{e&&y()}),{})},{urls:["http://*/*","https://*/*","ws://*/*","wss://*/*"]},n?["blocking"]:[])}(Ne),w.isManifestV3){if(i=!0,null!==n){const e=n?"online":"offline";Ne.messengerClientApi.setConnectivityStatus(e)}}else{const e=e=>{const t=e?"online":"offline";Ne.messengerClientApi.setConnectivityStatus(t)};e(globalThis.navigator.onLine),globalThis.addEventListener("online",()=>e(!0)),globalThis.addEventListener("offline",()=>e(!1))}w.isManifestV3||await async function(){let e;try{const t=new URL(Fe);let n,r;t.hash="#extensionStartup",e=window.document.createElement("iframe"),e.setAttribute("src",t.href),e.setAttribute("sandbox","allow-scripts allow-same-origin");const i=new Promise((e,t)=>{n=e,r=t});e.addEventListener("load",n),window.document.body.appendChild(e),setTimeout(()=>r(new nt),1e3),await i}catch(e){e instanceof nt?console.warn("Phishing warning page timeout; page not guaranteed to work offline."):console.error("Failed to initialize phishing warning page",e)}finally{e&&e.remove()}}(),await(async()=>{const e=await s.default.tabs.query({url:"<all_urls>",windowType:"normal"}).then(e=>((0,y.checkForLastErrorAndLog)(),e)).catch(()=>{(0,y.checkForLastErrorAndLog)()});for(const t of e)s.default.tabs.sendMessage(t.id,{name:g.EXTENSION_MESSAGES.READY}).then(()=>{(0,y.checkForLastErrorAndLog)()}).catch(()=>{(0,y.checkForLastErrorAndLog)()})})(),new Q.DeepLinkRouter({getExtensionURL:Se.getExtensionURL,getState:Ne.getState.bind(Ne)}).on("navigate",async({url:e,parsed:t})=>{"redirectTo"in t||await Ne.metaMetricsController.trackEvent((0,ee.createEvent)({signature:t.signature,url:e}))}).on("error",e=>ve?.captureException(e)).install()}Qe(),s.default.runtime.onConnectExternal.addListener(async(...e)=>{await He,We(...e)});class nt extends Error{constructor(){super("Timeout failed")}}async function rt(e){let t;if(e){t={data:{},meta:{}};for(const n of M.backedUpStateKeys)(0,c.hasProperty)(e,n)&&(t.data[n]=e[n]);(0,c.hasProperty)(e,"meta")&&(0,c.isObject)(e.meta)&&(t.meta=e.meta,"split"===e.meta.storageKind||"data"===e.meta.storageKind?r.persistenceManager.storageKind=e.meta.storageKind:r.persistenceManager.storageKind="data"),"number"!=typeof t.meta.version&&(a.default.error("The `backup`'s `meta.version` property was missing during backup restore."),t.meta.version=155)}else{const e=!0;t=await r.persistenceManager.get({validateVault:e})}const n=new N.default({migrations:j.default,defaultVersion:null});n.on("error",e=>{console.warn(e);const n=(0,H.default)(t);ve?.captureException(e,{extra:{vaultStructure:n}})});let i=!1;t?.data||t?.meta||(i=!0,t=n.generateInitialState(Ee));const{state:o,changedKeys:s}=await n.migrateData(t),l=async n=>{const i=t?.meta?.version,a="number"==typeof i&&i>=157;let s=e?.AppMetadataController?.firstTimeInfo??o?.data?.AppMetadataController?.firstTimeInfo??o?.data?.firstTimeInfo??t?.data?.AppMetadataController?.firstTimeInfo??t?.data?.firstTimeInfo;if(!s)try{const e=await r.persistenceManager.getBackup();s=e?.AppMetadataController?.firstTimeInfo}catch{}const c=new Error(n);return c.sentryTags={"corruption.preMigrationVersion":String(i??"unknown"),"corruption.backupShouldExist":String(a),"corruption.installVersion":String(s?.version??"unknown"),"corruption.installDate":String(s?.date??"unknown")},c};if(!o)throw await l("MetaMask - migrator returned undefined");if(!(0,c.isObject)(o.meta))throw await l(`MetaMask - migrator metadata has invalid type '${typeof o.meta}'`);if("number"!=typeof o.meta.version)throw await l(`MetaMask - migrator metadata version has invalid type '${typeof o.meta.version}'`);if(!["data","split",undefined].includes(o.meta.storageKind))throw await l(`MetaMask - migrator metadata storageKind has invalid value '${o.meta.storageKind}'`);if(!(0,c.isObject)(o.data))throw await l(`MetaMask - migrator data has invalid type '${typeof o.data}'`);if(r.persistenceManager.setMetadata(o.meta),a.default.debug("[Split State]: Loaded data from persistence with storageKind '%s'",r.persistenceManager.storageKind),"data"===r.persistenceManager.storageKind){const e=!0===o.meta.platformSplitStateGradualRolloutAttempted,t=!e&&await(0,D.useSplitStateStorage)(o.data);a.default.debug("[Split State]: shouldUseSplitStateStorage: %s (alreadyTried: %s)",t,e),t&&(o.meta.platformSplitStateGradualRolloutAttempted=!0,r.persistenceManager.setMetadata(o.meta)),a.default.debug("[Split State]: Writing data to persistence with storageKind 'data'"),await r.persistenceManager.set(o.data),t&&(await r.persistenceManager.migrateToSplitState(o.data),o.meta=r.persistenceManager.getMetaData(),o.meta!==undefined&&(delete o.meta.platformSplitStateGradualRolloutAttempted,r.persistenceManager.setMetadata(o.meta)),await r.persistenceManager.persist())}else{if("split"!==r.persistenceManager.storageKind)throw new Error(`MetaMask - persistenceManager has invalid storageKind '${r.persistenceManager.storageKind}'`);if(i)for(const[e,t]of Object.entries(o.data))r.persistenceManager.update(e,t);else for(const e of s)r.persistenceManager.update(e,o.data[e]);await r.persistenceManager.persist()}return a.default.debug("[Split State]: Load complete."),o}function it(e,t,n){const{metaMetricsId:r}=Ne.metaMetricsController.state;if(!(0,V.shouldEmitDappViewedEvent)(r))return;const i=Ne.getPermittedAccounts(e).length;if(0===i)return;const o=Ne.controllerMessenger.call("AccountsController:getState"),a=Object.keys(o.internalAccounts.accounts).length,s=(0,se.getIframeProperties)({frameId:n,origin:e,mainFrameOrigin:t});Ne.metaMetricsController.trackEvent({event:b.MetaMetricsEventName.DappViewed,category:b.MetaMetricsEventCategory.InpageProvider,referrer:{url:e},properties:{is_first_visit:!1,number_of_accounts:a,number_of_accounts_connected:i,...s}},{excludeMetaMetricsId:!0})}function ot(e){if(!e.sender?.tab||!e.sender?.url||!e.sender?.tab?.url)return;const t=e.sender.tab.id,n=new URL(e.sender.url),{origin:r}=n,i=new URL(e.sender.tab.url),{origin:o}=i,{frameId:a}=e.sender;Object.keys(Be).includes(t)||(Be[t]=r),t in Le||(Le[t]=o),t in $e||($e[t]=a);const s=Ne.controllerMessenger.call("PermissionController:hasPermissions",r),c="New Tab"!==e.sender.tab.title;s&&c&&it(r,o,a)}function at(e){const t=[p.ENVIRONMENT_TYPE_POPUP,p.ENVIRONMENT_TYPE_NOTIFICATION,p.ENVIRONMENT_TYPE_FULLSCREEN,p.ENVIRONMENT_TYPE_SIDEPANEL];!(Object.values(De).some(Boolean)||Ae||Ce>0||Pe>0)&&t.includes(e)&&function(e){const{metaMetricsId:t,participateInMetaMetrics:n}=Ne.metaMetricsController.state;(null!==t||n)&&Ne.metaMetricsController.trackEvent({event:b.MetaMetricsEventName.AppOpened,category:b.MetaMetricsEventCategory.App,environmentType:e})}(e)}const st=async e=>{if(await He,Ne)try{const t=e?{active:!0,windowId:e}:{active:!0,currentWindow:!0},n=await s.default.tabs.query(t);if(!n||0===n.length)return;const r=n[0],{id:i,title:o,url:a,favIconUrl:c}=r;if(!a)return void Ne.appStateController.clearAppActiveTab();const{origin:l,protocol:u,host:d,href:f}=new URL(a);if(!(0,V.isWebOrigin)(l))return void Ne.appStateController.clearAppActiveTab();Ne.appStateController.setAppActiveTab({id:i,title:o,origin:l,protocol:u,url:a,host:d,href:f,favIconUrl:c}),Ne.subjectMetadataController.addSubjectMetadata({origin:l,name:o||d||l,iconUrl:c||null,subjectType:"website"})}catch(e){console.log("Error refreshing appActiveTab:",e.message)}};function ct(e,t,n,i,c,d,f,g){Ne=new F.default({infuraProjectId:globalThis.INFURA_PROJECT_ID,showUserConfirmation:lt,initState:e,initLangCode:t,platform:Se,notificationManager:Oe,browser:s.default,getRequestAccountTabIds:()=>je,getOpenMetamaskTabsIds:()=>De,overrides:n,isFirstMetaMaskControllerSetup:i,currentMigrationVersion:c.version,featureFlags:{},offscreenPromise:d,preinstalledSnaps:f,requestSafeReload:ye,cronjobControllerStorageManager:g}),r.persistenceManager.setOnSetFailed(e=>{Ne.appStateController.setStorageWriteErrorType(e)});const m=[],y=Ne.store.getState();for(const t of Object.keys(y)){const n=e[t]||{},r=y[t];if(null===r||"object"!=typeof r){(0,E.captureException)(new Error(`Invalid controller state for '${t}' of type '${null===r?"null":typeof r}'`));continue}const i=Object.keys(r);if(i.length===Object.keys(n).length){for(const e of i)if(r[e]!==n[e]){m.push(t);break}}else m.push(t)}var S;"split"===r.persistenceManager.storageKind?(m.length>0&&(a.default.info(`MetaMaskController state changed during configuration for controllers: ${m.join(", ")}. Persisting updated state.`),m.forEach(e=>{r.persistenceManager.update(e,y[e])}),be().catch(e=>{a.default.error("Error persisting updated state:",e),ve?.captureException(e)})),Ne.store.on("stateChange",async({controllerKey:e,newState:t,_oldState:n,_patches:i})=>{r.persistenceManager.update(e,t),M.backedUpStateKeys.includes(e)&&M.backedUpStateKeys.forEach(t=>{if(t===e)return;const n=Ne.store.config[t];if(!n?.metadata)throw new Error(`Cannot backup ${t}: controller metadata is required but not found. All controllers in backedUpStateKeys must extend BaseController and define metadata.`);const i=Ne.controllerMessenger.call(`${t}:getState`),o=(0,l.deriveStateFromMetadata)(i,n.metadata,"persist");r.persistenceManager.update(t,o)});try{await be()}catch(e){a.default.error("Error persisting state change:",e),ve?.captureException(e)}})):(m.length>0&&(a.default.info(`MetaMaskController state changed during configuration for controllers: ${m.join(", ")}. Persisting updated state.`),be(y).catch(e=>{a.default.error("Error persisting updated controller state:",e),ve?.captureException(e)})),Ne.store.on("update",be)),Ne.store.on("error",e=>{a.default.error("MetaMask controller.store error:",e),ve?.captureException(e)}),(0,K.default)({getCurrentChainId:()=>(0,_.getCurrentChainId)({metamask:Ne.networkController.state}),getIpfsGateway:Ne.preferencesController.getIpfsGateway.bind(Ne.preferencesController),getUseAddressBarEnsResolution:()=>Ne.preferencesController.state.useAddressBarEnsResolution,provider:Ne.provider}),S=Ne,global.stateHooks.getSentryAppState=function(){const e=S.memStore.getState();return(0,v.maskObject)(e,$.SENTRY_BACKGROUND_STATE)};const O=()=>Ce>0||Boolean(Object.keys(De).length)||Ae||Pe>0||!1,I=()=>Ce>0||Pe>0,k=()=>Ae&&!I(),C=(e,t)=>{if(!1===e)Ne.onClientClosed();else{if(t===p.ENVIRONMENT_TYPE_FULLSCREEN&&Boolean(Object.keys(De).length)||t===p.ENVIRONMENT_TYPE_SIDEPANEL&&Pe>0)return;Ne.onEnvironmentTypeClosed(t)}};function A(e){try{Ne.appStateController.setDefaultHomeActiveTabName(e??null)}catch(e){console.error("Error setting landing tab:",e)}}function P(){xe.clear(),Re=0,D()}function R(e,t){return e>t?`${t}+`:String(e)}function D(){const e=j();let t="",n=de;Re>0&&!k()?(t=R(Re,pe),n=fe):e>0&&(t=R(e,pe));try{const e={text:t},r={color:n};w.isManifestV3?(s.default.action.setBadgeText(e),s.default.action.setBadgeBackgroundColor(r)):(s.default.browserAction.setBadgeText(e),s.default.browserAction.setBadgeBackgroundColor(r))}catch(e){console.error("Error updating browser badge:",e)}}function j(){try{return Ne.appStateController.waitingForUnlock.length+(0,x.getAttentionRequiredApprovalCount)({approvalController:Ne.approvalController})}catch(e){return console.error("Failed to get pending approval count:",e),0}}ze=(e,t)=>{if(Te.includes(e.name))return;const{processName:r,senderUrl:i,isMetaMaskUIPort:a}=ke(e);if(a){const i=n?.getPortStream?.(e)||new u.ExtensionPortStream(e),a=function({chunkSize:e}){Ne.metaMetricsController.trackEvent({event:b.MetaMetricsEventName.PortStreamChunked,category:b.MetaMetricsEventCategory.PortStream,properties:{chunkSize:e}})};if(e.onDisconnect.addListener(()=>i.off("message-too-large",a)),i.on("message-too-large",a),Ne.isClientOpen=!0,Ne.setupTrustedCommunication(i,e.sender).finally(()=>{t?.()}),at(r),(0,B.updateRemoteFeatureFlags)(Ne),r===p.ENVIRONMENT_TYPE_POPUP&&(P(),Ce+=1,(0,o.finished)(i,()=>{Ce-=1;const e=O();Ne.isClientOpen=e,C(e,p.ENVIRONMENT_TYPE_POPUP)})),r===p.ENVIRONMENT_TYPE_SIDEPANEL&&(P(),Pe+=1,st(),(0,o.finished)(i,()=>{Pe=Math.max(Pe-1,0);const e=O();Ne.isClientOpen=e,C(e,p.ENVIRONMENT_TYPE_SIDEPANEL)})),r===p.ENVIRONMENT_TYPE_NOTIFICATION&&(Ae=!0,(0,o.finished)(i,()=>{Ae=!1,Re>0&&A(h.AccountOverviewTabKey.Activity),D();const e=O();Ne.isClientOpen=e,C(e,p.ENVIRONMENT_TYPE_NOTIFICATION)})),r===p.ENVIRONMENT_TYPE_FULLSCREEN){P();const t=e.sender.tab.id;De[t]=!0,(0,o.finished)(i,()=>{delete De[t];const e=O();Ne.isClientOpen=e,C(e,p.ENVIRONMENT_TYPE_FULLSCREEN)})}}else if(i&&i.origin===Ue.origin&&i.pathname===Ue.pathname){const t=n?.getPortStream?.(e)||new u.ExtensionPortStream(e,{chunkSize:0});Ne.setupPhishingCommunication({connectionStream:t})}else{if(e.sender&&e.sender.tab&&e.sender.url){const t=e.sender.tab.id,n=new URL(e.sender.url),{origin:r}=n;ot(e),e.onMessage.addListener(e=>{e.data&&e.data.method===p.MESSAGE_TYPE.ETH_REQUEST_ACCOUNTS&&(je[r]=t)})}if(i&&Y.COOKIE_ID_MARKETING_WHITELIST_ORIGINS.some(e=>e===i.origin)){const t=n?.getPortStream?.(e)||new u.ExtensionPortStream(e,{chunkSize:0});Ne.setUpCookieHandlerCommunication({connectionStream:t})}const t=n?.getPortStream?.(e)||new u.ExtensionPortStream(e,{chunkSize:0});if(Ge(t,e.sender),Ie||!w.isManifestV3){const n=(0,z.setupMultiplex)(t);n.ignoreStream(J.METAMASK_EIP_1193_PROVIDER),Ye(n.createStream(J.METAMASK_CAIP_MULTICHAIN_PROVIDER),e.sender)}}},We=e=>{const t=n?.getPortStream?.(e)||new u.ExtensionPortStream(e,{chunkSize:0});if(!e.sender.id){if(Te.includes(e.name))return;ot(e),Ye((0,T.createCaipStream)(t),e.sender)}else Ge(t,e.sender)},Ge=(e,t)=>{Ne.setupUntrustedCommunicationEip1193({connectionStream:e,sender:t})},Ye=(e,t)=>{Ne.setupUntrustedCommunicationCaip({connectionStream:e,sender:t})},n?.registerConnectListeners&&n.registerConnectListeners(ze,Ge),D(),Ne.controllerMessenger.subscribe(F.METAMASK_CONTROLLER_EVENTS.DECRYPT_MESSAGE_MANAGER_UPDATE_BADGE,D),Ne.controllerMessenger.subscribe(F.METAMASK_CONTROLLER_EVENTS.ENCRYPTION_PUBLIC_KEY_MANAGER_UPDATE_BADGE,D),Ne.signatureController.hub.on(F.METAMASK_CONTROLLER_EVENTS.UPDATE_BADGE,D),Ne.controllerMessenger.subscribe(F.METAMASK_CONTROLLER_EVENTS.APP_STATE_UNLOCK_CHANGE,D),Ne.controllerMessenger.subscribe(F.METAMASK_CONTROLLER_EVENTS.APPROVAL_STATE_CHANGE,D),Ne.controllerMessenger.subscribe(F.METAMASK_CONTROLLER_EVENTS.METAMASK_NOTIFICATIONS_LIST_UPDATED,D),Ne.controllerMessenger.subscribe(F.METAMASK_CONTROLLER_EVENTS.METAMASK_NOTIFICATIONS_MARK_AS_READ,D),Ne.controllerMessenger.subscribe("TransactionController:transactionStatusUpdated",function({transactionMeta:e}){const{status:t,txParams:n,chainId:r}=e??{};if("failed"!==t&&"dropped"!==t)return;const{from:i,nonce:o}=n??{},a=i&&o!==undefined&&r?`${r}:${i.toLowerCase()}:${o}`:undefined;if(a&&xe.has(a))return;if(I())return;a&&(xe.size>=he&&xe.clear(),xe.add(a));Re+=1,k()||A(h.AccountOverviewTabKey.Activity);D()}),Oe.on(U.NOTIFICATION_MANAGER_EVENTS.POPUP_CLOSED,({automaticallyClosed:e})=>{e?j()>0&&lt():(Ne.signatureController.rejectUnapproved(b.REJECT_NOTIFICATION_CLOSE_SIG),Ne.decryptMessageController.rejectUnapproved(b.REJECT_NOTIFICATION_CLOSE),Ne.encryptionPublicKeyController.rejectUnapproved(b.REJECT_NOTIFICATION_CLOSE),Ne.rejectAllPendingApprovals()),D()})}async function lt(){const e=await Se.getActiveTabs(),t=Boolean(e.find(e=>De[e.id])),n=e.length>0&&e[0].extData&&e[0].extData.indexOf("vivaldi_tab")>-1;if(!Me&&(n||0===Ce)&&!t&&0===Pe){Me=!0;try{const e=Ne.appStateController.getCurrentPopupId();await Oe.showPopup(e=>Ne.appStateController.setCurrentPopupId(e),e)}finally{Me=!1}}}const ut=async()=>{if(Ne){Ne.metaMetricsController.updateTraits({[b.MetaMetricsUserTrait.InstallDateExt]:(new Date).toISOString().split("T")[0]});const e=await(0,A.getDeferredDeepLinkFromCookie)(),t={};return e&&(Ne.appStateController.setDeferredDeepLink(e),t.install_source="deeplink",t.deeplink_path=e.referringLink),void Ne.metaMetricsController.addEventBeforeMetricsOptIn({category:b.MetaMetricsEventCategory.App,event:b.MetaMetricsEventName.AppInstalled,properties:t})}setTimeout(async()=>{await ut()},500)};s.default.runtime.onUpdateAvailable.addListener(async function(e){await He,a.default.info("An update is available",e?.version),Ne.appStateController.setPendingExtensionVersion(e?.version??null)});(async()=>{if(s.default?.sidePanel)try{await He,await async function(){if(!s.default?.sidePanel?.setPanelBehavior)return;const e=Ne?.preferencesController?.state?.preferences?.useSidePanelAsDefault??!0;await s.default.sidePanel.setPanelBehavior({openPanelOnActionClick:e})}(),Ne?.controllerMessenger?.subscribe("PreferencesController:stateChange",e=>{s.default?.sidePanel?.setPanelBehavior&&s.default.sidePanel.setPanelBehavior({openPanelOnActionClick:e}).catch(e=>console.error("Error updating panel behavior:",e))},e=>e?.preferences?.useSidePanelAsDefault??!0)}catch(e){console.error("Error setting side panel toolbar behavior:",e)}})();async function dt(e){s.default.tabs.onActivated.addListener(e=>{if(Ne){const{tabId:t}=e,n=Be[t],r=Le[t];n&&Ne.permissionController.state.subjects[n]!==undefined&&it(n,r,$e[t]);const i=(0,C.getPartnerByOrigin)(r);i&&Ne.permissionController.state.subjects[r]!==undefined&&Ne.handleDefiReferral(i,t,ae.ReferralTriggerType.OnNavigateConnectedTab).catch(e=>{a.default.error(`Failed to handle ${i.name} referral after navigation to connected tab: `,e)})}});try{await tt(e),r.persistenceManager.cleanUpMostRecentRetrievedState(),a.default.info("MetaMask initialization complete."),Ke()}catch(e){a.default.error(e),Ve(e)}}(async()=>{await st()})(),s.default.tabs.onActivated.addListener(async({tabId:e})=>{if(await He,!Ne)return{};try{const t=await s.default.tabs.get(e),{id:n,title:r,url:i,favIconUrl:o}=t;if(!i)return Ne.appStateController.clearAppActiveTab(),{};const{origin:a,protocol:c,host:l,href:u}=new URL(i);if(!(0,V.isWebOrigin)(a))return Ne.appStateController.clearAppActiveTab(),{};Ne.appStateController.setAppActiveTab({id:n,title:r,origin:a,protocol:c,url:i,host:l,href:u,favIconUrl:o}),Ne.subjectMetadataController.addSubjectMetadata({origin:a,name:r||l||a,iconUrl:o||null,subjectType:"website"})}catch(e){console.log("Error in tabs.onActivated listener:",e.message)}return{}}),s.default.tabs.onUpdated.addListener(async(e,t,n)=>{if(await He,!Ne)return{};const r=t.url!==undefined,i="complete"===t.status;if(!r&&!i)return{};try{const t=n||await s.default.tabs.get(e),{id:o,title:a,url:c,favIconUrl:l}=t,u=Ne.appStateController.state.appActiveTab,d=u?.id===o;if(!c)return d&&Ne.appStateController.clearAppActiveTab(),{};const{origin:f,protocol:p,host:h,href:g}=new URL(c);if(!f||"null"===f||f.startsWith("chrome-extension://")||f.startsWith("moz-extension://"))return d&&Ne.appStateController.clearAppActiveTab(),{};let m=!1;try{m=(await s.default.tabs.query({active:!0,currentWindow:!0})).some(e=>e.id===o)}catch(e){m=d}(r||i)&&m&&(Ne.appStateController.setAppActiveTab({id:o,title:a,origin:f,protocol:p,url:c,host:h,href:g,favIconUrl:l}),Ne.subjectMetadataController.addSubjectMetadata({origin:f,name:a||h||f,iconUrl:l||null,subjectType:"website"}))}catch(e){console.log("Error in tabs.onUpdated listener:",e.message)}return{}}),s.default.windows.onFocusChanged.addListener(async e=>{e!==s.default.windows.WINDOW_ID_NONE&&await st(e)}),async function(){const e=await(0,ne.readCriticalErrorRestoreSession)(s.default),t=undefined;let n=null;(e||t?.simulateBackgroundStateSyncHang||t?.simulateBackgroundInitializationHang)&&(n=await r.persistenceManager.getBackup().catch(()=>null));const i=(0,M.hasVault)(n);if((t?.simulateBackgroundStateSyncHang||t?.simulateBackgroundInitializationHang)&&me&&(me.hasVaultAtStartup=i?Date.now():null),e&&(await(0,ne.clearCriticalErrorRestoreSession)(s.default),i)){me&&(me.restoreInProgress=!0);const t={tabId:e.tabId,tabUrl:e.tabUrl};dt(n);try{await He}catch(e){return void a.default.error("critical-error-restore: initialization failed",e)}return Ne.onboardingController.setFirstTimeFlowType(f.FirstTimeFlowType.restore),void await(0,ne.handoffRestoringTabToExtension)(Se,t)}dt(null)}().catch(e=>{a.default.error("initOrRestoreBackground failed",e)})}}},{package:"$root$",file:"app/scripts/background.js"}]],[9],{});