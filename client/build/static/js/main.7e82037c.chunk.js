(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{102:function(e,t){},105:function(e,t,n){},106:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(46),o=n.n(c),s=(n(53),n(1)),i=n.n(s),u=n(2),l=n(3),m=n(14),f=n(8),d=n.n(f);function p(){switch(window.location.origin){case"http://localhost:3000":return window.API_ENDPOINT="http://localhost:8000/",window.API_ENDPOINT;default:return window.API_ENDPOINT=window.location.origin+"/",window.API_ENDPOINT}}var v="".concat(p(),"api"),g={getconversations:function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=v+"/conversations",e.next=3,d.a.post(n,{userid:t});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getmessages:function(){var e=Object(u.a)(i.a.mark((function e(t,n){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=v+"/messages",e.next=3,d.a.post(a,{conversation_id:t,page:n});case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),authenticate:function(){var e=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(v+"/authenticate"),e.next=3,d.a.post(v+"/authenticate",Object(m.a)({},Number(t)?"mobile":"email",t));case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),search:function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=v+"/search",e.next=3,d.a.post(n,{user:t});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),startconversation:function(){var e=Object(u.a)(i.a.mark((function e(t,n){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=v+"/startconversation",e.next=3,d.a.post(a,{ids:t,creator:n});case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},b=Object(a.createContext)(),h=function(e){var t=e.children,n=Object(a.useState)(!1),c=Object(l.a)(n,2),o=c[0],s=c[1],m=Object(a.useState)({userid:0,name:""}),f=Object(l.a)(m,2),d=f[0],p=f[1];function v(){return(v=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.authenticate(t);case 2:return(n=e.sent)?(localStorage.setItem("email_pwd",t),p({mobile:n.mobile,email:n.email,first_name:n.first_name,last_name:n.last_name,id:n.id}),setTimeout((function(){return s(!0)}))):s(!1),e.abrupt("return",o);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement(b.Provider,{value:{authentication:o,Authenticate:function(e){return v.apply(this,arguments)},user:d}},t)},E=(n(71),function(){var e=Object(a.useContext)(b).Authenticate,t="";return Object(a.useEffect)((function(){if(window.location.search)try{var t=window.location.search.split("?")[1];e(t)}catch(n){}}),[]),onchange=function(e){"username"===e.target.id&&(t=e.target.value)},onsubmit=function(){var n=Object(u.a)(i.a.mark((function n(a){return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a.preventDefault(),e(t);case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),r.a.createElement("div",{className:"login-page"},r.a.createElement("form",{action:"post",onSubmit:onsubmit},r.a.createElement("div",{className:"username"},r.a.createElement("input",{onChange:onchange,id:"username",type:"text",name:"email/mobile",placeholder:"email/mobile",required:!0})),r.a.createElement("button",{type:"submit"},"Log in")))}),O=n(7),j=n(10),w=n(15),y=n.n(w),x="".concat(p());window.SOCKET_SETUP=0;var k=Object(a.createContext)(),N=function(e){var t=e.children,n=Object(a.useContext)(b).user,c=Object(a.useState)({}),o=Object(l.a)(c,2),s=o[0],m=o[1],f=Object(a.useState)([]),d=Object(l.a)(f,2),p=d[0],v=d[1];function h(){return(h=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t||!t.length){e.next=4;break}return a=[].concat(Object(O.a)(t),[n]).map((function(e){return e.id})),e.next=4,g.startconversation(a,n.id);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var E=Object(a.useCallback)(function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.getconversations(n.id);case 2:t=e.sent,v(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),[n.id]);return Object(a.useEffect)((function(){if(n.id){var e=y()("".concat(x,"notification").concat(n.id));return e.on("connect",(function(){return console.log("connected to notification channel")})),e.on("notification",function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("newconversation"!==t.event){e.next=4;break}return console.log("added to new convo"),e.next=4,E();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),function(){e.removeAllListeners(),e.disconnect()}}}),[n,E]),Object(a.useEffect)((function(){E()}),[E]),r.a.createElement(k.Provider,{value:{getmessages:g.getmessages,markUndread:function(e){},startconversation:function(e){return h.apply(this,arguments)},markRead:function(e){},user:n,openedconversation:s,setOpenedconversation:m,updateConversations:E,conversations:p}},t)},_="".concat(p()),S=function(){var e=Object(a.useContext)(k),t=e.getmessages,n=e.openedconversation,c=e.user,o=Object(a.useRef)(y()("".concat(_,"conversation").concat(n.conversation_id),{transport:["websocket"]})).current,s=Object(a.useState)([]),m=Object(l.a)(s,2),f=m[0],d=m[1],p=Object(a.useState)(0),v=Object(l.a)(p,2),g=v[0],b=v[1],h=Object(a.useState)(0),E=Object(l.a)(h,2),j=E[0],w=E[1];function x(){var e=document.querySelector(".messages-container");e.scrollTop=e.scrollHeight}Object(a.useEffect)((function(){document.querySelector(".message-input textarea").focus()})),Object(a.useEffect)((function(){b(0)}),[]),Object(a.useEffect)((function(){Object(u.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(n.conversation_id);case 2:return a=e.sent,d(a.messages),b(a.page),w(a.count),x(),e.abrupt("return",(function(){d([])}));case 8:case"end":return e.stop()}}),e)})))()}),[n,t]),Object(a.useEffect)((function(){return o.on("message",function(){var e=Object(u.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.conversation_id!==n.conversation_id){e.next=7;break}return e.t0=d,e.next=4,t(n.conversation_id);case 4:e.t1=e.sent.messages,(0,e.t0)(e.t1),x();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),function(){o.removeAllListeners("message")}}),[t,n,o]),Object(a.useEffect)((function(){var e=document.querySelector(".messages-view");return e.style.display="",function(){e.style.display="none"}}),[f]);var N=Object(a.useState)(!1),S=Object(l.a)(N,2),q=S[0],I=S[1];Object(a.useEffect)((function(){var e=document.querySelector(".messages-container"),a=function(){var e=Object(u.a)(i.a.mark((function e(a){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.target.scrollTop||q||!(f.length<j)){e.next=12;break}return console.log("top",g+1),I(!0),e.next=5,t(n.conversation_id,g);case 5:r=e.sent,console.log(r.page),d(r.messages),b(r.page),I(!1),e.next=12;break;case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return e.addEventListener("scroll",a),function(){e.removeEventListener("scroll",a)}}),[g,j,q,n,t,f]);var A="",D=function(){var e={message:A=A.trim(),sender:"".concat(c.first_name," ").concat(c.last_name),sender_id:c.id,conversation_id:n.conversation_id,date:new Date,delivering:!0};d([].concat(Object(O.a)(f),[e])),x(),o.emit("message",e);var t=document.querySelector(".message-input textarea");t.focus(),setTimeout((function(){document.querySelector(".chat-screen");t.value=""}),100)};return r.a.createElement("div",{className:"messages-container"},r.a.createElement("div",{className:"messages-view"},q?r.a.createElement("div",{className:"loader"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null)):r.a.createElement(r.a.Fragment,null),f?f.map((function(e,t){return r.a.createElement(C,Object.assign({key:t},e,{text:e.message,sender_name:e.sender,group:n.group,delevering:e.delevering}))})):r.a.createElement(r.a.Fragment,null)),r.a.createElement("div",{className:"message-input"},r.a.createElement("textarea",{onChange:function(e){A=e.target.value},onKeyDown:function(e){e.shiftKey||13!==e.keyCode||""===A.trim()||D()},type:"text",placeholder:"type something..."}),r.a.createElement("div",{onClick:D,className:"send-btn"},r.a.createElement("img",{src:"https://img.icons8.com/material-outlined/64/000000/filled-sent.png",alt:"semdbtn"}))))},C=function(e){var t=e.type,n=void 0===t?"message":t,c=e.text,o=e.sender_name,s=e.sender_id,i=e.date,u=e.group,l=e.delivering,m=Object(a.useContext)(k).user;if("message"===n){var f=u?"message group-message":"message";return r.a.createElement("div",{style:{background:l?"rgb(255, 133, 133)":"",opacity:l?".5":""},className:f,id:m.id===s?"sent-message":"message"},r.a.createElement("h1",{id:u?"group-sender":""},o),r.a.createElement("span",null,c),r.a.createElement("span",{id:"date-time"},function(e){var t=e.getHours(),n=e.getMinutes(),a=t>=12?"pm":"am";return(t=(t%=12)||12)+":"+(n=n<10?"0"+n:n)+a}(new Date(i))))}if("badge"===n)return r.a.createElement("div",{className:"badge"},r.a.createElement("span",null,c))};var q=function(){var e=Object(a.useContext)(k),t=e.openedconversation,n=e.user,c=Object(a.useState)(!1),o=Object(l.a)(c,2),s=o[0],i=o[1];if(Object(a.useEffect)((function(){if(Object.keys(t).length)document.querySelector(".chat-screen")}),[t]),Object.keys(t).length){function u(e){var t=e.groupname,n=e.setgroupname,c=e.setchangegroupname,o="",s=Object(a.useRef)();return Object(a.useEffect)((function(){var e=s.current;e.value=t,e.focus();var n=function(e){27===e.keyCode&&c(!1)};return document.addEventListener("keydown",n),function(){document.removeEventListener("keydown",n)}})),r.a.createElement("form",{onSubmit:n,className:"group-name-input"},r.a.createElement("input",{ref:s,onChange:function(){o=s.current.value,console.log(o)},id:"group-name-changer",type:"text"}))}var m=t.conversation_name;Array.isArray(m)&&(m=m.filter((function(e){return e!==n.first_name})).join(", "));return r.a.createElement("div",{className:"chat-screen"},r.a.createElement("div",{className:"contact-header"},r.a.createElement("img",{src:"https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png",alt:"profile"}),r.a.createElement("div",{className:"about",onClick:function(){return i(!0)}},s?r.a.createElement(u,Object.assign({groupname:m,setgroupname:function(e){}},{setchangegroupname:i})):r.a.createElement("h4",null,m),r.a.createElement("img",{src:"https://img.icons8.com/android/24/000000/info.png",alt:""}))),r.a.createElement(S,null))}return r.a.createElement("div",{className:"start-chat"},r.a.createElement("img",{src:"https://img.icons8.com/nolan/256/speech-bubble.png",alt:""}),r.a.createElement("h2",null,"Chat"))},I=n(47),A=n.n(I),D=(n(105),function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(a.useContext)(b).user;return Object(a.useEffect)((function(){document.querySelector(".menu header").scrollIntoView()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"menu"},r.a.createElement("header",null,r.a.createElement("img",{src:A.a,alt:"logo"}),r.a.createElement("h2",null,o.first_name)),r.a.createElement(L,null),r.a.createElement(T,{setaddconversationview:c})),n&&r.a.createElement(R,{setaddconversationview:c}))}),T=function(e){var t=e.setaddconversationview;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"menu-options"},r.a.createElement("div",{className:"option",onClick:function(){return t(!0)}},r.a.createElement("img",{src:"https://img.icons8.com/cotton/64/000000/add-to-chat.png",alt:""}),r.a.createElement("span",null,"start chat"))))},L=function(){var e=Object(a.useContext)(k).conversations;return e.length?r.a.createElement("div",{className:"conversation-list"},e.map((function(e,t){return r.a.createElement(P,{key:t,conversation:e})}))):r.a.createElement("div",{className:"empty-conversation-list"})},P=function(e){var t=e.conversation,n=Object(a.useContext)(b).user,c=Object(a.useContext)(k),o=c.openedconversation,s=c.setOpenedconversation,i=c.markRead,u=function(e,n){setTimeout((function(){document.querySelector(".messages-view").style.display="none",document.querySelector(".message-input textarea").focus()}));var a=Object(j.a)(Object(j.a)({},t),{},{group:n});window.localStorage.setItem("openedconversation",JSON.stringify(a)),s(a)};Object(a.useEffect)((function(){var e=JSON.parse(window.localStorage.getItem("openedconversation"));if(e&&t.conversation_id===e.conversation_id){setTimeout((function(){document.querySelector(".messages-view").style.display="none",document.querySelector(".message-input textarea").focus()}));var n=Object(j.a)(Object(j.a)({},t),{},{group:!1});s(n)}console.log(e)}),[t,s]);var l=t.unread&&t.conversation_id!==o.conversation_id?"7px solid rgb(143, 255, 143)":"",m=t.conversation_name;return Array.isArray(m)&&(m=m.filter((function(e){return e!==n.first_name})).join(", ")),2===t.conversation.length?r.a.createElement("div",{style:{borderRight:l},onClick:u,className:"conversation",id:t.conversation_id===o.conversation_id?"opened-conversation":""},r.a.createElement("img",{src:"https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png",alt:"profile"}),r.a.createElement("div",{className:"about"},r.a.createElement("h4",null,m))):r.a.createElement("div",{onClick:function(){i(t.conversation_id),u(0,!0)},className:"conversation group-conversation",id:t.conversation_id===o.conversation_id?"opened-conversation":""},r.a.createElement("img",{src:"https://img.icons8.com/color/48/000000/conference-skin-type-7.png",alt:"group"}),r.a.createElement("div",{className:"about"},r.a.createElement("h4",null,m)))},R=function(e){var t=e.setaddconversationview,n=Object(a.useState)(),c=Object(l.a)(n,2),o=c[0],s=c[1],m=Object(a.useState)(),f=Object(l.a)(m,2),d=f[0],p=f[1],v=Object(a.useContext)(k),b=v.user,h=v.startconversation,E=function(e){var t=!1;d&&d.forEach((function(n){n&&n.mobile===e.mobile&&(t=!0)})),t||p([].concat(Object(O.a)(d||[]),[e]))};Object(a.useEffect)((function(){var e=document.querySelector("#conversation-adder"),n=document;e.focus();var a=function(e){"Enter"===e.key&&o&&(E(o[0]),e.preventDefault())},r=function(e){27===e.keyCode&&t(!1)};return e.addEventListener("keydown",a),n.addEventListener("keydown",r),function(){n.removeEventListener("keydown",r),e.removeEventListener("keydown",a)}}));var j=function(){var e=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),""===t.target.value){e.next=8;break}return e.next=4,g.search(t.target.value);case 4:n=e.sent,s(n.filter((function(e){return e.mobile!==b.mobile}))),e.next=9;break;case 8:s([]);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:h(d);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"conversation-add",onClick:function(e){"conversation-add"===e.target.className&&t(!1)}},r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("div",{className:"users-input"},r.a.createElement("h2",null,"Create"),d&&0!==d.length&&r.a.createElement("div",{className:"participants"},d.map((function(e,t){return r.a.createElement("div",{key:t,className:"participant"},r.a.createElement("span",null,e.first_name),r.a.createElement("img",{onClick:function(){!function(e){var t=d&&d.filter((function(t){return t.mobile!==e.mobile}));p(t)}(e)},src:"https://img.icons8.com/pastel-glyph/64/000000/cancel.png",alt:"cancel"}))}))),r.a.createElement("input",{onChange:j,onSubmit:function(e){return e.preventDefault()},id:"conversation-adder",type:"text",name:"email/mobile",placeholder:"email/mobile",required:!0,autoComplete:"off"}),o&&0!==o.length&&r.a.createElement("div",{className:"suggestions"},o.map((function(e,t){return r.a.createElement("div",{key:t,onClick:function(){return E(e)},className:"suggestion"},r.a.createElement("h4",null,e.first_name),r.a.createElement("p",null,e.mobile))})))),r.a.createElement("button",{className:d&&d.length?"":"disabled-button",onClick:w},"Start")))},F=function(){return r.a.createElement(N,null,r.a.createElement("div",{className:"chat-page"},r.a.createElement(D,null),r.a.createElement(q,null)))},J=function(){return Object(a.useContext)(b).authentication?r.a.createElement(F,null):r.a.createElement(E,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null,r.a.createElement(J,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},47:function(e,t,n){e.exports=n.p+"static/media/logo.2b68e57d.png"},48:function(e,t,n){e.exports=n(106)},53:function(e,t,n){},71:function(e,t,n){}},[[48,1,2]]]);
//# sourceMappingURL=main.7e82037c.chunk.js.map