(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{102:function(e,t){},105:function(e,t,n){},106:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(45),o=n.n(c),s=(n(53),n(1)),i=n.n(s),u=n(2),l=n(3),m=n(13),d=n(7),v=n.n(d);function f(){return window.API_ENDPOINT="https://chat.cogniwonder.com/",window.API_ENDPOINT}var p="".concat(f(),"api"),g={getconversations:function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=p+"/conversations",e.next=3,v.a.post(n,{userid:t});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getmessages:function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=p+"/messages",e.next=3,v.a.post(n,{conversation_id:t});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),authenticate:function(){var e=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(p+"/authenticate"),e.next=3,v.a.post(p+"/authenticate",Object(m.a)({},Number(t)?"mobile":"email",t));case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),search:function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=p+"/search",e.next=3,v.a.post(n,{user:t});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),startconversation:function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=p+"/startconversation",e.next=3,v.a.post(n,{ids:t});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},b=Object(a.createContext)(),h=function(e){var t=e.children,n=Object(a.useState)(!1),c=Object(l.a)(n,2),o=c[0],s=c[1],m=Object(a.useState)({userid:0,name:""}),d=Object(l.a)(m,2),v=d[0],f=d[1];function p(){return(p=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.authenticate(t);case 2:return(n=e.sent)?(localStorage.setItem("email_pwd",t),f({mobile:n.mobile,email:n.email,first_name:n.first_name,last_name:n.last_name,id:n.id}),setTimeout((function(){return s(!0)}))):s(!1),e.abrupt("return",o);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement(b.Provider,{value:{authentication:o,Authenticate:function(e){return p.apply(this,arguments)},user:v}},t)},E=(n(71),function(){var e=Object(a.useContext)(b).Authenticate,t="";return Object(a.useEffect)((function(){if(window.location.search)try{var t=window.location.search.split("?")[1];e(t)}catch(n){}}),[]),onchange=function(e){"username"===e.target.id&&(t=e.target.value)},onsubmit=function(){var n=Object(u.a)(i.a.mark((function n(a){return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a.preventDefault(),e(t);case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),r.a.createElement("div",{className:"login-page"},r.a.createElement("form",{action:"post",onSubmit:onsubmit},r.a.createElement("div",{className:"username"},r.a.createElement("input",{onChange:onchange,id:"username",type:"text",name:"email/mobile",placeholder:"email/mobile",required:!0})),r.a.createElement("button",{type:"submit"},"Log in")))}),O=n(21),j=n(9),w=n(46),y=n.n(w),k="".concat(f()),x=Object(a.createContext)(),_=function(e){var t=e.children,n=Object(a.useContext)(b).user,c=Object(a.useState)({}),o=Object(l.a)(c,2),s=o[0],m=o[1],d=Object(a.useState)([]),v=Object(l.a)(d,2),f=v[0],p=v[1],h=Object(a.useState)(),E=Object(l.a)(h,2),O=E[0],j=E[1];function w(){return(w=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.getconversations(n.id);case 2:t=e.sent,p(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(e){}return Object(a.useEffect)((function(){var e=function(e){if(Array.isArray(e)&&e.length)return e.map((function(e){var t=y()("".concat(k,"conversation").concat(e.conversation_id),{secure:!0});return t.on("connect",(function(){})),t.on("message",(function(e){s.conversation_id!==e.conversation_id&&e.conversation_id})),{id:e.conversation_id,socket:t}}))}(f);e&&j(e)}),[f]),r.a.createElement(x.Provider,{value:{getmessages:g.getmessages,markUndread:_,markRead:function(e){},user:n,getSocket:function(e){return O.filter((function(t){return t.id===e}))},openedconversation:s,setOpenedconversation:m,updateConversations:function(){return w.apply(this,arguments)},conversations:f}},t)},N=function(){var e,t=Object(a.useContext)(x),n=t.getmessages,c=t.openedconversation,o=t.getSocket,s=t.user,m=t.markUndread;try{e=o(c.conversation_id)[0].socket}catch(h){window.location.reload()}var d=Object(a.useState)(),v=Object(l.a)(d,2),f=v[0],p=v[1];Object(a.useEffect)((function(){Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=p,e.next=3,n(c.conversation_id);case 3:e.t1=e.sent,(0,e.t0)(e.t1),(t=document.querySelector(".chat-screen")).scrollTop=t.scrollHeight;case 7:case"end":return e.stop()}}),e)})))()}),[c,n]),Object(a.useEffect)((function(){return e.removeAllListeners("message"),e.on("message",function(){var e=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.conversation_id!==c.conversation_id){e.next=8;break}return e.t0=p,e.next=4,n(c.conversation_id);case 4:e.t1=e.sent,(0,e.t0)(e.t1),(a=document.querySelector(".chat-screen")).scrollTop=a.scrollHeight;case 8:m(t.conversation_id);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),function(){e.removeAllListeners("message"),e.on("message",(function(e){m(e.conversation_id)}))}}),[n,c,e,m]);var g="",b=function(){g=g.trim(),e.emit("message",{message:g,sender:"".concat(s.first_name," ").concat(s.last_name),sender_id:s.id,conversation_id:c.conversation_id,date:new Date});var t=document.querySelector(".message-input textarea");setTimeout((function(){return t.value=""})),t.focus()};return r.a.createElement("div",{className:"messages-container"},r.a.createElement("div",{className:"messages-view"},f&&f.map((function(e,t){return r.a.createElement(C,Object.assign({key:t},e,{text:e.message,sender_name:e.sender,group:c.group}))}))),r.a.createElement("div",{className:"message-input"},r.a.createElement("textarea",{onChange:function(e){g=e.target.value},onKeyDown:function(e){e.shiftKey||13!==e.keyCode||""===g.trim()||b()},type:"text",placeholder:"type something..."}),r.a.createElement("div",{onClick:b,className:"send-btn"},r.a.createElement("img",{src:"https://img.icons8.com/material-outlined/64/000000/filled-sent.png",alt:"semdbtn"}))))},C=function(e){var t=e.type,n=void 0===t?"message":t,c=e.text,o=e.sender_name,s=e.sender_id,i=e.date,u=e.group,l=Object(a.useContext)(x).user;return"message"===n?r.a.createElement("div",{className:u?"message group-message":"message",id:l.id===s?"sent-message":"message"},r.a.createElement("h1",{id:u?"group-sender":""},o),r.a.createElement("span",null,c),r.a.createElement("span",{id:"date-time"},function(e){var t=e.getHours(),n=e.getMinutes(),a=t>=12?"pm":"am";return(t=(t%=12)||12)+":"+(n=n<10?"0"+n:n)+a}(new Date(i)))):"badge"===n?r.a.createElement("div",{className:"badge"},r.a.createElement("span",null,c)):void 0};var S=function(){var e=Object(a.useContext)(x),t=e.openedconversation,n=e.user,c=Object(a.useState)(!1),o=Object(l.a)(c,2),s=o[0],i=o[1];if(Object(a.useEffect)((function(){if(Object.keys(t).length){var e=document.querySelector(".chat-screen");e.scrollTop=e.scrollHeight}}),[t]),Object.keys(t).length){function u(e){var t=e.groupname,n=e.setgroupname,c=e.setchangegroupname;return Object(a.useEffect)((function(){var e=document.querySelector("#group-name-changer");e.focus(),e.addEventListener("focusout",(function(){c(!1)}));var t=function(e){27===e.keyCode&&c(!1)};return document.addEventListener("keydown",t),function(){document.removeEventListener("keydown",t)}})),r.a.createElement("form",{onSubmit:n,className:"group-name-input"},r.a.createElement("input",{onChange:function(e){e.target.value},id:"group-name-changer",type:"text",value:t}))}var m="me and ".concat(t.conversation_name.filter((function(e){return e!==n.name})).join(","));return r.a.createElement("div",{className:"chat-screen"},r.a.createElement("div",{className:"contact-header"},r.a.createElement("img",{src:"https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png",alt:"profile"}),r.a.createElement("div",{className:"about",onClick:function(){return i(!0)}},s?r.a.createElement(u,Object.assign({groupname:m,setgroupname:function(e){}},{setchangegroupname:i})):r.a.createElement("h4",null,m),r.a.createElement("img",{src:"https://img.icons8.com/android/24/000000/info.png",alt:""}))),r.a.createElement(N,null))}return r.a.createElement("div",{className:"start-chat"},r.a.createElement("img",{src:"https://img.icons8.com/nolan/256/speech-bubble.png",alt:""}),r.a.createElement("h2",null,"Chat"))},D=n(47),L=n.n(D),q=(n(105),function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"menu"},r.a.createElement("header",null,r.a.createElement("img",{src:L.a,alt:"logo"}),r.a.createElement("h2",null,"Chat")),r.a.createElement(T,null),r.a.createElement(A,{setaddconversationview:c})),n&&r.a.createElement(P,{setaddconversationview:c}))}),A=function(e){var t=e.setaddconversationview;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"menu-options"},r.a.createElement("div",{className:"option",onClick:function(){return t(!0)}},r.a.createElement("img",{src:"https://img.icons8.com/cotton/64/000000/add-to-chat.png",alt:""}),r.a.createElement("span",null,"start chat"))))},T=function(){var e=Object(a.useContext)(x),t=e.conversations,n=e.updateConversations;return Object(a.useEffect)((function(){n()}),[]),t?r.a.createElement("div",{className:"conversation-list"},t.map((function(e,t){return r.a.createElement(I,{key:t,conversation:e})}))):r.a.createElement("div",{className:"empty-conversation-list"})},I=function(e){var t=e.conversation,n=Object(a.useContext)(b).user,c=Object(a.useContext)(x),o=c.openedconversation,s=c.setOpenedconversation,i=c.markRead,u=t.unread&&t.conversation_id!==o.conversation_id?"7px solid rgb(143, 255, 143)":"";if(2===t.conversation.length)return r.a.createElement("div",{style:{borderRight:u},onClick:function(){i(t.conversation_id),s(Object(j.a)(Object(j.a)({},t),{},{group:!1}))},className:"conversation",id:t.conversation_id===o.conversation_id?"opened-conversation":""},r.a.createElement("img",{src:"https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png",alt:"profile"}),r.a.createElement("div",{className:"about"},r.a.createElement("h4",null,t.conversation_name.filter((function(e){return e!==n.name})))));var l="group";return"string"===typeof t.conversation_name&&(l=t.conversation_name),l=t.conversation_name.join(", "),r.a.createElement("div",{onClick:function(){i(t.conversation_id),s(Object(j.a)(Object(j.a)({},t),{},{group:!0}))},className:"conversation group-conversation",id:t.conversation_id===o.conversation_id?"opened-conversation":""},r.a.createElement("img",{src:"https://img.icons8.com/color/48/000000/conference-skin-type-7.png",alt:"group"}),r.a.createElement("div",{className:"about"},r.a.createElement("h4",null,l)))},P=function(e){var t=e.setaddconversationview,n=Object(a.useState)(),c=Object(l.a)(n,2),o=c[0],s=c[1],m=Object(a.useState)(),d=Object(l.a)(m,2),v=d[0],f=d[1],p=Object(a.useContext)(b).user,h=function(e){var t=!1;v&&v.forEach((function(n){n&&(console.log(n,n),n.mobile===e.mobile&&(t=!0))})),t||f([].concat(Object(O.a)(v||[]),[e]))};Object(a.useEffect)((function(){var e=document.querySelector("#conversation-adder"),n=document;e.focus();var a=function(e){"Enter"===e.key&&o&&(h(o[0]),e.preventDefault())},r=function(e){27===e.keyCode&&t(!1)};return e.addEventListener("keydown",a),n.addEventListener("keydown",r),function(){n.removeEventListener("keydown",r),e.removeEventListener("keydown",a)}}));var E=function(){var e=Object(u.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),""===t.target.value){e.next=8;break}return e.next=4,g.search(t.target.value);case 4:n=e.sent,s(n.filter((function(e){return e.mobile!==p.mobile}))),e.next=9;break;case 8:s([]);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!v||!v.length){e.next=7;break}return t=[].concat(Object(O.a)(v),[p]).map((function(e){return e.id})),e.t0=console,e.next=5,g.startconversation(t);case 5:e.t1=e.sent,e.t0.log.call(e.t0,e.t1);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"conversation-add"},r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("div",{className:"users-input"},r.a.createElement("h2",null,"Create"),v&&0!==v.length&&r.a.createElement("div",{className:"participants"},v.map((function(e,t){return r.a.createElement("div",{key:t,className:"participant"},r.a.createElement("span",null,e.first_name),r.a.createElement("img",{onClick:function(){!function(e){var t=v&&v.filter((function(t){return t.mobile!==e.mobile}));console.log(t),f(t)}(e)},src:"https://img.icons8.com/pastel-glyph/64/000000/cancel.png",alt:"cancel"}))}))),r.a.createElement("input",{onChange:E,onSubmit:function(e){return e.preventDefault()},id:"conversation-adder",type:"text",name:"email/mobile",placeholder:"email/mobile",required:!0,autoComplete:"off"}),o&&0!==o.length&&r.a.createElement("div",{className:"suggestions"},o.map((function(e,t){return r.a.createElement("div",{key:t,onClick:function(){return h(e)},className:"suggestion"},r.a.createElement("h4",null,e.first_name),r.a.createElement("p",null,e.mobile))})))),r.a.createElement("button",{className:v&&v.length?"":"disabled-button",onClick:j},"Start")))},H=function(){return r.a.createElement(_,null,r.a.createElement("div",{className:"chat-page"},r.a.createElement(q,null),r.a.createElement(S,null)))},R=function(){return Object(a.useContext)(b).authentication?r.a.createElement(H,null):r.a.createElement(E,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null,r.a.createElement(R,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},47:function(e,t,n){e.exports=n.p+"static/media/logo.2b68e57d.png"},48:function(e,t,n){e.exports=n(106)},53:function(e,t,n){},71:function(e,t,n){}},[[48,1,2]]]);
//# sourceMappingURL=main.a7708bb8.chunk.js.map