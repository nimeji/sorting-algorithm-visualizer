(this.webpackJsonpsorting=this.webpackJsonpsorting||[]).push([[0],{20:function(e,t,n){e.exports={appContainer:"SortingApp_appContainer__1KHYU",sorterContainer:"SortingApp_sorterContainer__37Mem",algorithmSelection:"SortingApp_algorithmSelection__1TZAQ"}},24:function(e,t,n){e.exports={canvas:"Canvas_canvas__3fvzk"}},25:function(e,t,n){e.exports={sorter:"Sorter_sorter__3M04B"}},35:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),s=n(13),i=n.n(s),c=(n(35),n(23)),u=n(7),o=n(49),l=n(46),d=n(50),h=n(47),f=n(4),v=n.n(f),b=v.a.mark(y),p=v.a.mark(w),x=v.a.mark(S),j=v.a.mark(C),g=v.a.mark(T),m=v.a.mark(F),k=v.a.mark(N),O=v.a.mark(_);function y(e,t){var n,r,a,s,i;return v.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:if(!((n=e.length)<=0)){c.next=3;break}return c.abrupt("return");case 3:r=0;case 4:if(!(r<n-1)){c.next=22;break}a=void 0,s=!0,a=0;case 8:if(!(a<n-1-r)){c.next=15;break}return c.next=11,[a,a+1];case 11:e.gt(a,a+1)&&(e.swap(a,a+1),s=!1);case 12:a++,c.next=8;break;case 15:if(t.add(a),!s){c.next=19;break}for(i=0;i<a;i++)t.add(i);return c.abrupt("break",22);case 19:r++,c.next=4;break;case 22:return t.add(0),c.next=25,[void 0,void 0];case 25:return c.abrupt("return");case 26:case"end":return c.stop()}}),b)}function w(e,t){var n,r,a,s,i,c,u;return v.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(!((n=e.length)<=0)){o.next=3;break}return o.abrupt("return");case 3:r=0,a=n-1,s=!1;case 6:s=!1,i=r;case 8:if(!(i<a)){o.next=15;break}return o.next=11,[i,i+1];case 11:e.gt(i,i+1)&&(e.swap(i,i+1),s=!0);case 12:i++,o.next=8;break;case 15:t.add(a),s=!1,c=a-=1;case 19:if(!(c>r)){o.next=26;break}return o.next=22,[c-1,c];case 22:e.gt(c-1,c)&&(e.swap(c-1,c),s=!0);case 23:c--,o.next=19;break;case 26:t.add(r),r+=1;case 28:if(s){o.next=6;break}case 29:for(u=r;u<=a;u++)t.add(u);return o.next=32,[void 0,void 0];case 32:return o.abrupt("return");case 33:case"end":return o.stop()}}),p)}function S(e,t){var n,r,a,s;return v.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(!((n=e.length)<=0)){i.next=3;break}return i.abrupt("return");case 3:r=0;case 4:if(!(r<n)){i.next=19;break}a=r,s=r+1;case 7:if(!(s<n)){i.next=14;break}return i.next=10,[a,s];case 10:e.gt(a,s)&&(a=s);case 11:s++,i.next=7;break;case 14:a!==r&&e.swap(r,a),t.add(r);case 16:r++,i.next=4;break;case 19:return i.next=21,[void 0,void 0];case 21:return i.abrupt("return");case 22:case"end":return i.stop()}}),x)}function C(e,t){var n,r,a;return v.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(!((n=e.length)<=0)){s.next=3;break}return s.abrupt("return");case 3:t.add(0),r=1;case 5:if(!(r<n)){s.next=22;break}t.add(r),a=r-1;case 8:if(!(a>=0)){s.next=19;break}return s.next=11,[a,a+1];case 11:if(!e.gt(a,a+1)){s.next=15;break}e.swap(a,a+1),s.next=16;break;case 15:return s.abrupt("break",19);case 16:a--,s.next=8;break;case 19:r++,s.next=5;break;case 22:return s.next=24,[void 0,void 0];case 24:return s.abrupt("return");case 25:case"end":return s.stop()}}),j)}function T(e,t){var n,r,a;return v.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(a=function(r,s){var i,c,u;return v.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!(r<s)){n.next=23;break}i=Math.floor((r+s)/2),c=r-1,u=s+1;case 4:0;case 5:return c+=1,n.next=8,[c,i];case 8:if(e.lt(c,i)){n.next=5;break}case 9:return u-=1,n.next=12,[i,u];case 12:if(e.gt(u,i)){n.next=9;break}case 13:if(!(c>=u)){n.next=15;break}return n.abrupt("break",19);case 15:e.swap(c,u),i===c?i=u:i===u&&(i=c),n.next=4;break;case 19:return n.delegateYield(a(r,u),"t0",20);case 20:return n.delegateYield(a(u+1,s),"t1",21);case 21:n.next=24;break;case 23:t.add(r);case 24:case"end":return n.stop()}}),n)},n=v.a.mark(a),!((r=e.length)<=0)){s.next=5;break}return s.abrupt("return");case 5:return s.delegateYield(a(0,r-1),"t0",6);case 6:return s.next=8,[void 0,void 0];case 8:return s.abrupt("return");case 9:case"end":return s.stop()}}),g)}function F(e,t){var n,r,a,s,i,c;return v.a.wrap((function(u){for(;;)switch(u.prev=u.next){case 0:if(i=function(){var e;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=Math.floor((a-2)/2);case 1:if(!(e>=0)){t.next=6;break}return t.delegateYield(s(e,a-1),"t0",3);case 3:e--,t.next=1;break;case 6:case"end":return t.stop()}}),r)},s=function(t,r){var a,s,i;return v.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a=t;case 1:if(!((s=2*a+1)<=r)){n.next=17;break}return i=a,n.next=5,[i,s];case 5:return e.lt(i,s)&&(i=s),n.next=8,[i,s+1];case 8:if(s+1<=r&&e.lt(i,s+1)&&(i=s+1),i!==a){n.next=13;break}return n.abrupt("return");case 13:e.swap(a,i),a=i;case 15:n.next=1;break;case 17:case"end":return n.stop()}}),n)},n=v.a.mark(s),r=v.a.mark(i),!((a=e.length)<=0)){u.next=6;break}return u.abrupt("return");case 6:return u.delegateYield(i(),"t0",7);case 7:c=a-1;case 8:if(!(c>0)){u.next=15;break}return e.swap(c,0),t.add(c),u.delegateYield(s(0,c-1),"t1",12);case 12:c--,u.next=8;break;case 15:return t.add(0),u.next=18,[void 0,void 0];case 18:return u.abrupt("return");case 19:case"end":return u.stop()}}),m)}function N(e,t){var n,r,a,s,i,c,u;return v.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(n=e.length,r=[701,301,132,57,23,10,4,1],!(n<=0)){o.next=4;break}return o.abrupt("return");case 4:a=0,s=r;case 5:if(!(a<s.length)){o.next=28;break}i=s[a],c=i;case 8:if(!(c<n)){o.next=25;break}u=c;case 10:if(!(u>=i)){o.next=21;break}return o.next=13,[u-i,u];case 13:if(!e.gt(u-i,u)){o.next=17;break}e.swap(u-i,u),o.next=18;break;case 17:return o.abrupt("break",21);case 18:u-=i,o.next=10;break;case 21:1===i&&t.add(c-1);case 22:c++,o.next=8;break;case 25:a++,o.next=5;break;case 28:return t.add(n-1),o.next=31,[void 0,void 0];case 31:return o.abrupt("return");case 32:case"end":return o.stop()}}),k)}function _(e,t){var n,r,a,s,i,c;return v.a.wrap((function(u){for(;;)switch(u.prev=u.next){case 0:if(!((n=e.length)<=0)){u.next=3;break}return u.abrupt("return");case 3:r=n,a=1.3,s=!1;case 6:if(!1!==s){u.next=19;break}(r=Math.floor(r/a))<=1&&(r=1,s=!0),i=0;case 10:if(!(i+r<n)){u.next=17;break}return u.next=13,[i,i+r];case 13:e.gt(i,i+r)&&(e.swap(i,i+r),s=!1);case 14:i++,u.next=10;break;case 17:u.next=6;break;case 19:for(c=0;c<n;c++)t.add(c);return u.next=22,[void 0,void 0];case 22:return u.abrupt("return");case 23:case"end":return u.stop()}}),O)}var R={BubbleSort:y,CocktailShakerSort:w,SelectionSort:S,InsertionSort:C,QuickSort:T,HeapSort:F,ShellSort:N,CombSort:_},M=Object.keys(R),D=n(1),I=Object.keys(R);function V(e){var t=e.algorithm,n=e.onChange,r=e.disabled,a=void 0!==r&&r;return Object(D.jsx)("select",{className:"form-select",value:t,disabled:a,onChange:function(e){var t=e.target.value;I.includes(t)&&n&&n(t)},children:I.map((function(e){return Object(D.jsx)("option",{value:e,children:e},e)}))})}var E=n(48),A=v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=0;case 1:return e.next=4,t++;case 4:e.next=1;break;case 6:case"end":return e.stop()}}),e)}))();function L(e){var t=e.text,n=e.value,a=e.onChange,s=e.disabled,i=void 0!==s&&s,c=e.children,o=Object(r.useState)(A.next().value),d=Object(u.a)(o,1)[0];return Object(D.jsx)(l.a,{children:Object(D.jsxs)(h.a,{children:[Object(D.jsx)(E.a,{xs:"6",lg:"auto",children:Object(D.jsx)("label",{htmlFor:"LabeledSelect-".concat(d),className:"form-label col-form-label",children:t})}),Object(D.jsx)(E.a,{xs:"6",lg:"auto",children:Object(D.jsx)("select",{id:"LabeledSelect-".concat(d),className:"form-select",value:n,onChange:a,disabled:i,children:c})})]})})}function U(e){for(var t=e.length;t--;){var n=Math.floor(Math.random()*t),r=[e[n],e[t]];e[t]=r[0],e[n]=r[1]}return e}function P(e){for(var t=[],n=0;n<e;n++)t[n]=1/e*(n+1);return t}var Y={shuffled:function(e){return U(P(e))},sorted:P,reverseSorted:function(e){return P(e).reverse()},fewUnique:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,n=[],r=1;r<=t;r++)for(;n.length<e/t*r;)n.push(r/t);return U(n)}};Object.keys(Y);function B(e){var t=e.count,n=e.preset,a=void 0===n?"shuffled":n,s=e.onPresetChange,i=e.onDataChange;return Object(r.useEffect)((function(){i&&i(Y[a](t))}),[a,t,i]),Object(D.jsxs)(L,{text:"Data Preset",value:a,onChange:function(e){if(s){var t=e.target.value;s(t)}},children:[Object(D.jsx)("option",{value:"shuffled",children:"Shuffled"}),Object(D.jsx)("option",{value:"sorted",children:"Sorted"}),Object(D.jsx)("option",{value:"reverseSorted",children:"Reverse Sorted"}),Object(D.jsx)("option",{value:"fewUnique",children:"Few Unique"})]})}function q(e){var t=e.sleepTime,n=e.options,r=e.onChange;return Object(D.jsx)(L,{text:"Sleep Time",value:t,onChange:function(e){var t=parseFloat(e.target.value);r&&!isNaN(t)&&r(t)},children:n.map((function(e){return Object(D.jsxs)("option",{value:e,children:[e,"ms"]},e)}))})}var W=n(11),z=n(12),H=n(14),J=n(29),Q=n(28),K=n(24),Z=n.n(K);function G(e){var t=e.draw,n=e.setup,a=e.redraw,s=void 0===a?function(){return!0}:a,i=Object(r.useRef)(null),c=Object(r.useRef)(1e3),o=Object(r.useRef)(0),l=Object(r.useRef)(0),d=function(e){var t=Object(r.useState)(),n=Object(u.a)(t,2),a=n[0],s=n[1];return Object(r.useEffect)((function(){var t=e.current,n=new ResizeObserver((function(e){e.forEach((function(e){s(e.contentRect)}))}));return n.observe(t),function(){n.unobserve(t)}}),[e]),a}(i);return Object(r.useEffect)((function(){var e,r=null===(e=i.current)||void 0===e?void 0:e.getContext("2d");r&&(r.canvas.width=(null===d||void 0===d?void 0:d.width)||0,r.canvas.height=(null===d||void 0===d?void 0:d.height)||0,n&&n(r),t(r,c.current,c.current,o.current))}),[d,n,t]),Object(r.useEffect)((function(){var e=i.current,r=null===e||void 0===e?void 0:e.getContext("2d");if(r){n&&n(r);var a,u=performance.now();return function e(){if(s()){o.current++;var n=performance.now();l.current=n-u,t(r,l.current,c.current,o.current),u=n}c.current+=(l.current-c.current)/20,a=window.requestAnimationFrame(e)}(),function(){window.cancelAnimationFrame(a)}}}),[s,t,n]),Object(D.jsx)("canvas",{ref:i,className:Z.a.canvas})}function X(e){for(var t=[],n=e.length;n--;)t[n]=e[n];return t}var $=function(){function e(t,n){Object(W.a)(this,e),this.array=void 0,this.compareFn=void 0,this._accesses=0,this._comparisons=0,this.array=X(t),this.compareFn=n}return Object(z.a)(e,[{key:"length",get:function(){return this.array.length}},{key:"validateIndex",value:function(e){if(e>=this.array.length||e<0)throw new RangeError("index out of range")}},{key:"value",value:function(e){return this.validateIndex(e),this.array[e]}},{key:"get",value:function(e){return this.validateIndex(e),this._accesses=this._accesses+1,this.array[e]}},{key:"set",value:function(e,t){this.validateIndex(e),this._accesses=this._accesses+1,this.array[e]=t}},{key:"compare",value:function(e,t){return this._comparisons=this._comparisons+1,this.compareFn(this.get(e),this.get(t))}},{key:"lt",value:function(e,t){return this.compare(e,t)<0}},{key:"gt",value:function(e,t){return this.compare(e,t)>0}},{key:"lte",value:function(e,t){return this.compare(e,t)<=0}},{key:"gte",value:function(e,t){return this.compare(e,t)>=0}},{key:"eq",value:function(e,t){return 0===this.compare(e,t)}},{key:"swap",value:function(e,t){var n=this.get(e);this.set(e,this.get(t)),this.set(t,n)}},{key:"accesses",get:function(){return this._accesses}},{key:"comparisons",get:function(){return this._comparisons}},{key:"values",get:function(){return X(this.array)}}]),e}(),ee=function(){function e(t,n,r,a){Object(W.a)(this,e),this.trueDelay=e.minDelay,this.delay=this.trueDelay,this.generator=void 0,this.values=void 0,this.indidcesSorted=new Set,this.lastCompared=[void 0,void 0],this.step=0,this.tStart=0,this.sleepTime=0,this.realTime=0,this.timeout=0,this.running=!1,this.updated=!0,this.finished=!1,this.onFinished=void 0,this.values=new $(t,e.compareFn),this.generator=R[n](this.values,this.indidcesSorted),this.onFinished=a,this.setDelay(r),this.loop=this.loop.bind(this)}return Object(z.a)(e,[{key:"runNext",value:function(){var e=this.generator.next();if(e.done)this.lastCompared=[void 0,void 0];else{var t=Object(u.a)(e.value,2),n=t[0],r=t[1];this.lastCompared=[n,r]}return this.updated=!0,!e.done}},{key:"loop",value:function(){var e,t=performance.now();this.sleepTime=this.sleepTime+this.trueDelay;do{e=this.runNext(),this.step=this.step+1}while(e&&t-this.tStart>this.delay*this.step);e||(this.pause(),this.finished=!0,this.onFinished&&this.onFinished()),this.realTime=this.realTime+performance.now()-t}},{key:"start",value:function(){this.finished||this.running||(this.timeout=window.setInterval(this.loop,this.trueDelay),this.running=!0,this.tStart=performance.now(),this.step=0)}},{key:"pause",value:function(){this.running&&(clearInterval(this.timeout),this.running=!1)}},{key:"didUpdate",value:function(){return this.updated}},{key:"isRunning",value:function(){return this.running}},{key:"isFinished",value:function(){return this.finished}},{key:"getSleepTime",value:function(){return this.sleepTime}},{key:"getRealTime",value:function(){return this.realTime}},{key:"getLastCompared",value:function(){return this.lastCompared}},{key:"getIndicesSorted",value:function(){return this.indidcesSorted}},{key:"getValues",value:function(){return this.values.values}},{key:"getDelay",value:function(){return this.delay}},{key:"getTrueDelay",value:function(){return this.trueDelay}},{key:"getComparisons",value:function(){return this.values.comparisons}},{key:"getAccesses",value:function(){return this.values.accesses}},{key:"getLastState",value:function(){return this.updated=!1,{values:this.getValues(),indicesSorted:this.getIndicesSorted(),lastCompared:this.getLastCompared(),comparisons:this.getComparisons(),accesses:this.getAccesses()}}},{key:"setDelay",value:function(t){this.delay=Math.max(t,0),this.trueDelay=Math.max(e.minDelay,this.delay),this.running&&(this.pause(),this.start())}},{key:"setOnFinished",value:function(e){this.onFinished=e}}]),e}();ee.compareFn=function(e,t){return e-t},ee.minDelay=10;var te=n(25),ne=n.n(te),re=function(e){Object(J.a)(n,e);var t=Object(Q.a)(n);function n(e){var r;Object(W.a)(this,n),(r=t.call(this,e)).maxValues=0,r.redraw=r.redraw.bind(Object(H.a)(r)),r.draw=r.draw.bind(Object(H.a)(r)),r.onFinished=r.onFinished.bind(Object(H.a)(r));var a=new ee(e.data,e.algorithm,e.sleepTime,r.onFinished);return r.state={logic:a},r}return Object(z.a)(n,[{key:"componentDidUpdate",value:function(e,t){var n=this.props,r=n.data,a=n.algorithm,s=n.sleepTime,i=this.state.logic;t.logic!==i&&t.logic.pause(),e.data===r&&e.algorithm===a||this.reset(),e.sleepTime!==s&&i.setDelay(s)}},{key:"componentWillUnmount",value:function(){this.pause()}},{key:"start",value:function(){this.state.logic.start()}},{key:"pause",value:function(){this.state.logic.pause()}},{key:"onFinished",value:function(){var e=this.props.onFinished;this.pause(),e&&e()}},{key:"reset",value:function(){var e=this.props,t=e.data,n=e.algorithm,r=e.sleepTime,a=new ee(t,n,r,this.onFinished);this.setState({logic:a})}},{key:"isRunning",value:function(){return this.state.logic.isRunning()}},{key:"isFinished",value:function(){return this.state.logic.isFinished()}},{key:"setMaxValues",value:function(e){var t=this.props.onMaxValuesChange;t&&e!==this.maxValues&&t(e),this.maxValues=e}},{key:"redraw",value:function(){return this.state.logic.didUpdate()}},{key:"draw",value:function(e,t,n){var r=this.props,a=r.border,s=r.defaultColor,i=r.sortedColor,c=r.comparedColor,u=this.state.logic;if(u){var o=e.canvas.width,l=e.canvas.height,d=Math.ceil(Math.max(o,l)/100*a*.5),h=o-2*d,f=l-2*d;this.setMaxValues(h),e.clearRect(0,0,o,l);var v=u.getLastState(),b=v.values,p=v.lastCompared,x=v.indicesSorted,j=v.comparisons,g=v.accesses,m=Math.floor(h/b.length),k=(o-m*b.length)/2;e.fillStyle="white",e.fillRect(k-.5*d,.5*d,o-2*k+d,f+d),b.forEach((function(t,n){var r=s;x.has(n)&&(r=i),p.includes(n)&&(r=c),e.fillStyle=r,e.fillRect(k+m*n,f+d-f*t,1.05*m,f*t)})),d>0&&(e.lineWidth=d,e.strokeStyle="black",e.strokeRect(k-.5*d,.5*d,o-2*k+d,f+d));var O=f/20,y=k+d,w=d;e.font="".concat(O,"px sans-serif"),e.fillStyle="black",e.fillText("Comparisons: ".concat(j),y,w+O),e.fillText("Array Accesses: ".concat(g),y,w+2*O),e.fillText("Real Time: ".concat(u.getRealTime().toFixed(1),"ms"),y,w+3*O),e.fillText("Sleep Time: ".concat((u.getSleepTime()/1e3).toFixed(1),"s"),y,w+4*O),u.isRunning()?e.fillText("fps: ".concat((1e3/n).toFixed(0)),y,w+5*O):e.fillText("fps: -",y,w+5*O)}}},{key:"render",value:function(){return Object(D.jsx)("div",{className:ne.a.sorter,children:Object(D.jsx)(G,{draw:this.draw,redraw:this.redraw})})}}]),n}(r.Component);function ae(e){var t=e.valueCount,n=e.maxValue,a=e.onChange,s=Object(r.useMemo)((function(){for(var e=[],t=16;t<n;t*=2)e.push(t);return e.push(n),e}),[n]);return Object(r.useEffect)((function(){if(a)if(t>n)a(n);else if(t<n&&!s.includes(t))for(var e=0;e<s.length;e++)if(s[e]>t){a(s[e]);break}}),[t,n,a,s]),Object(D.jsx)(L,{text:"Values",value:t,onChange:function(e){var t=parseInt(e.target.value);!isNaN(t)&&a&&a(t)},children:s.map((function(e){return Object(D.jsx)("option",{value:e,children:e},e)}))})}function se(e){var t=e.number,n=e.onChange,a=Object(r.useMemo)((function(){for(var e=[],t=1;t<=8;t++)e[t]=Object(D.jsx)("option",{value:t,children:t},t);return e}),[]);return Object(D.jsx)(L,{text:"Windows",value:t,onChange:function(e){var t=parseInt(e.target.value);!isNaN(t)&&n&&n(t)},children:a})}re.defaultProps={algorithm:"BubbleSort",sleepTime:100,border:1,defaultColor:"lightblue",comparedColor:"red",sortedColor:"green"};var ie=n(20),ce=n.n(ie);function ue(){for(var e=Object(r.useState)("shuffled"),t=Object(u.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)([]),i=Object(u.a)(s,2),f=i[0],v=i[1],b=Object(r.useState)(16),p=Object(u.a)(b,2),x=p[0],j=p[1],g=Object(r.useState)(500),m=Object(u.a)(g,2),k=m[0],O=m[1],y=Object(r.useState)(x),w=Object(u.a)(y,2),S=w[0],C=w[1],T=Object(r.useState)(1),F=Object(u.a)(T,2),N=F[0],_=F[1],R=Object(r.useState)(Object(c.a)(M)),I=Object(u.a)(R,2),E=I[0],A=I[1],L=Object(r.useCallback)((function(e,t){A((function(n){var r=Object(c.a)(n);return r[e]=t,r}))}),[A]),U=Object(r.useRef)([]),P=0;P<8;P++){var Y;U.current[P]=null!==(Y=U.current[P])&&void 0!==Y?Y:Object(r.createRef)()}var W=Object(r.useMemo)((function(){for(var e=[],t=function(t){e[t]=Object(D.jsxs)("div",{className:"".concat(ce.a.sorterContainer," col-xl-6"),style:{height:"400px"},children:[Object(D.jsx)("div",{className:ce.a.algorithmSelection,children:Object(D.jsx)(V,{algorithm:E[t],onChange:function(e){return L(t,e)}})}),Object(D.jsx)(re,{ref:U.current[t],data:f,algorithm:E[t],sleepTime:k,onMaxValuesChange:C})]},t)},n=0;n<N;n++)t(n);return e}),[N,E,f,L,k]);return Object(D.jsxs)("div",{className:ce.a.appContainer,children:[Object(D.jsx)(o.a,{collapseOnSelect:!0,expand:"lg",className:"navbar-dark bg-secondary",children:Object(D.jsxs)(l.a,{fluid:!0,children:[Object(D.jsx)(o.a.Toggle,{}),Object(D.jsx)(o.a.Brand,{children:"S-A-V"}),Object(D.jsx)(o.a.Collapse,{children:Object(D.jsxs)(d.a,{className:"w-100 justify-content-center",children:[Object(D.jsx)(d.a.Item,{children:Object(D.jsx)(B,{preset:n,onPresetChange:a,onDataChange:v,count:x})}),Object(D.jsx)(d.a.Item,{children:Object(D.jsx)(ae,{valueCount:x,maxValue:S,onChange:j})}),Object(D.jsx)(d.a.Item,{children:Object(D.jsx)(q,{sleepTime:k,onChange:O,options:[500,250,100,50,25,10,5,1]})}),Object(D.jsx)(d.a.Item,{children:Object(D.jsx)(se,{number:N,onChange:_})})]})})]})}),Object(D.jsx)(l.a,{children:Object(D.jsx)(h.a,{children:W})}),Object(D.jsx)(d.a,{className:"fixed-bottom navbar-dark bg-secondary py-2",children:Object(D.jsxs)(l.a,{children:[Object(D.jsxs)("button",{className:"btn btn-success",onClick:function(){var e;return null===(e=U.current)||void 0===e?void 0:e.forEach((function(e){var t;return null===(t=e.current)||void 0===t?void 0:t.start()}))},children:[Object(D.jsx)("span",{className:"bi bi-play-fill"})," Start"]}),Object(D.jsxs)("button",{className:"btn btn-primary",onClick:function(){var e;return null===(e=U.current)||void 0===e?void 0:e.forEach((function(e){var t;return null===(t=e.current)||void 0===t?void 0:t.pause()}))},children:[Object(D.jsx)("span",{className:"bi bi-pause-fill"})," Pause"]}),Object(D.jsxs)("button",{className:"btn btn-danger",onClick:function(){var e;return null===(e=U.current)||void 0===e?void 0:e.forEach((function(e){var t;return null===(t=e.current)||void 0===t?void 0:t.reset()}))},children:[Object(D.jsx)("span",{className:"bi bi-arrow-counterclockwise"})," Reset"]})]})})]})}var oe=function(){return Object(D.jsx)(ue,{})},le=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,51)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),s(e),i(e)}))};i.a.render(Object(D.jsx)(a.a.StrictMode,{children:Object(D.jsx)(oe,{})}),document.getElementById("root")),le()}},[[44,1,2]]]);
//# sourceMappingURL=main.74e07913.chunk.js.map