(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(41),o=n.n(c),s=n(1),i=n.n(s),u=n(3),l=n(4),m=n(7),d=n.n(m),p=window.location.protocol+"//"+window.location.hostname+":"+("3000"===window.location.port?"8000":window.location.port)+"/api",f={getconversations:function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=p+"/conversations",e.next=3,d.a.post(n,{id:t});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getmessages:function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=p+"/messages",e.next=3,d.a.post(n,{conversation_id:t});case 3:return a=e.sent,console.log("this is message",a.data),e.abrupt("return",a.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),authenticate:function(){var e=Object(u.a)(i.a.mark((function e(t,n){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(window.AUTHENTICATION){e.next=6;break}return e.next=3,d.a.post(p+"/authenticate",{username:t,id:n});case 3:return a=e.sent,window.AUTHENTICATION=!0,e.abrupt("return",a.data);case 6:return e.abrupt("return",window.AUTHENTICATION);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},v=Object(a.createContext)(),g=function(e){var t=e.children,n=Object(a.useState)(!1),c=Object(l.a)(n,2),o=c[0],s=c[1],m=Object(a.useState)({id:"",username:""}),d=Object(l.a)(m,2),p=d[0],f=d[1];function g(){return(g=Object(u.a)(i.a.mark((function e(t,n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f({id:n,username:t}),setTimeout((function(){return s(!0)})),e.abrupt("return",o);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement(v.Provider,{value:{setuser:f,authentication:o,Authenticate:function(e,t){return g.apply(this,arguments)},user:p}},t)},h=(n(66),n(8)),E=n(42),b=n.n(E),O=window.location.protocol+"//"+window.location.hostname+":"+("3000"===window.location.port?"8000":window.location.port)+"/",w=Object(a.createContext)(),j=function(e){var t=e.children,n=Object(a.useContext)(v).user,c=Object(a.useState)({}),o=Object(l.a)(c,2),s=o[0],m=o[1],d=Object(a.useState)([]),p=Object(l.a)(d,2),g=p[0],h=p[1],E=Object(a.useState)(),j=Object(l.a)(E,2),N=j[0],x=j[1];function y(){return(y=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("updateConversations -> user.id",n.id),e.next=3,f.getconversations(n.id);case 3:t=e.sent,console.log(t),h(t);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){var e=function(e){if(!window.CONVERSATION_SOCKET_CONNECTION&&Array.isArray(e)&&e.length){var t=e.map((function(e){console.log(e);var t=b()("".concat(O,"conversation-").concat(e._id));return{id:e._id,socket:t}}));return window.CONVERSATION_SOCKET_CONNECTION=!0,t}}(g);e&&x(e)}),[g]),r.a.createElement(w.Provider,{value:{getmessages:f.getmessages,markUndread:function(e){},markRead:function(e){},user:n,getSocket:function(e){return N.filter((function(t){return t.id===e}))},openedconversation:s,setOpenedconversation:m,updateConversations:function(){return y.apply(this,arguments)},conversations:g}},t)},N=function(){var e=Object(a.useContext)(w),t=e.getmessages,n=e.openedconversation,c=e.getSocket,o=e.user,s=e.markUndread,m=c(n._id)[0].socket,d=Object(a.useState)(),p=Object(l.a)(d,2),f=p[0],v=p[1];Object(a.useEffect)((function(){Object(u.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=v,e.next=3,t(n._id);case 3:e.t1=e.sent,(0,e.t0)(e.t1),(a=document.querySelector(".chat-screen")).scrollTop=a.scrollHeight;case 7:case"end":return e.stop()}}),e)})))()}),[n,t]),Object(a.useEffect)((function(){m.on("message",function(){var e=Object(u.a)(i.a.mark((function e(a){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(a),a.conversation_id!==n._id){e.next=9;break}return e.t0=v,e.next=5,t(n._id);case 5:e.t1=e.sent,(0,e.t0)(e.t1),(r=document.querySelector(".chat-screen")).scrollTop=r.scrollHeight;case 9:s(a.conversation_id);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[t,n,m,s]);var g="",h=function(){g=g.trim(),m.emit("message",{message:g,sender:o.username,sender_id:o.id,conversation_id:n._id,date:new Date});var e=document.querySelector(".message-input textarea");setTimeout((function(){return e.value=""})),e.focus()};return r.a.createElement("div",{className:"messages-container"},r.a.createElement("div",{className:"messages-view"},f&&f.length&&f.map((function(e,t){return r.a.createElement(x,Object.assign({key:t},e,{text:e.message,sender_name:e.sender,group:n.group}))}))),r.a.createElement("div",{className:"message-input"},r.a.createElement("textarea",{onChange:function(e){g=e.target.value},onKeyDown:function(e){e.shiftKey||13!==e.keyCode||""===g.trim()||h()},type:"text",placeholder:"type something..."}),r.a.createElement("div",{onClick:h,className:"send-btn"},r.a.createElement("img",{src:"https://img.icons8.com/material-outlined/64/000000/filled-sent.png",alt:"semdbtn"}))))},x=function(e){var t=e.type,n=void 0===t?"message":t,c=e.text,o=e.sender_name,s=(e.sender_id,e.date),i=e.group,u=Object(a.useContext)(w).user;return"message"===n?r.a.createElement("div",{className:i?"message group-message":"message",id:u.username===o?"sent-message":"message"},r.a.createElement("h1",{id:i?"group-sender":""},o),r.a.createElement("span",null,c),r.a.createElement("span",{id:"date-time"},function(e){var t=e.getHours(),n=e.getMinutes(),a=t>=12?"pm":"am";return(t=(t%=12)||12)+":"+(n=n<10?"0"+n:n)+a}(new Date(s)))):"badge"===n?r.a.createElement("div",{className:"badge"},r.a.createElement("span",null,c)):void 0};var y=function(){var e=Object(a.useContext)(w),t=e.openedconversation,n=e.user;return Object(a.useEffect)((function(){if(Object.keys(t).length){var e=document.querySelector(".chat-screen");e.scrollTop=e.scrollHeight}}),[t]),Object.keys(t).length?r.a.createElement("div",{className:"chat-screen"},r.a.createElement("div",{className:"contact-header"},r.a.createElement("img",{src:"https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png",alt:"profile"}),r.a.createElement("div",{className:"about"},r.a.createElement("h4",null,"me and "+t.conversation.filter((function(e){return e!==n.username})).join(",")),r.a.createElement("img",{src:"https://img.icons8.com/android/24/000000/info.png",alt:""}))),r.a.createElement(N,null)):r.a.createElement("div",{className:"start-chat"},r.a.createElement("img",{src:"https://img.icons8.com/nolan/256/speech-bubble.png",alt:""}),r.a.createElement("h2",null,"Chat"))},C=n(43),k=n.n(C),_=(n(100),function(){return r.a.createElement("div",{className:"menu"},r.a.createElement("header",null,r.a.createElement("img",{src:k.a,alt:"logo"}),r.a.createElement("h2",null,"Chat")),r.a.createElement(T,null),r.a.createElement(A,null))}),T=function(){var e=Object(a.useContext)(v).user,t=Object(a.useContext)(w),n=t.conversations,c=t.updateConversations;return Object(a.useEffect)((function(){console.log("this is a req",e),e.id&&c()}),[e]),n?r.a.createElement("div",{className:"conversation-list"},n.map((function(e,t){return r.a.createElement(S,{key:t,conversation:e})}))):r.a.createElement("div",{className:"empty-conversation-list"})},S=function(e){var t=e.conversation,n=Object(a.useContext)(v).user,c=Object(a.useContext)(w),o=c.openedconversation,s=c.setOpenedconversation,i=t.unread&&t._id!==o._id?"7px solid rgb(143, 255, 143)":"";if(2===t.conversation.length)return r.a.createElement("div",{style:{borderRight:i},onClick:function(){s(Object(h.a)(Object(h.a)({},t),{},{group:!1}))},className:"conversation",id:t._id===o._id?"opened-conversation":""},r.a.createElement("img",{src:"https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png",alt:"profile"}),r.a.createElement("div",{className:"about"},r.a.createElement("h4",null,t.conversation_name?t.conversation_name.filter((function(e){return e!==n.name})):t.conversation.join(", "))));var u="group";return"string"===typeof t.conversation_name&&(u=t.conversation_name.join(",")),u=t.conversation_name.join(", "),r.a.createElement("div",{onClick:function(){s(Object(h.a)(Object(h.a)({},t),{},{group:!0}))},className:"conversation group-conversation",id:t._id===o._id?"opened-conversation":""},r.a.createElement("img",{src:"https://img.icons8.com/color/48/000000/conference-skin-type-7.png",alt:"group"}),r.a.createElement("div",{className:"about"},r.a.createElement("h4",null,u)))},A=function(){return r.a.createElement("div",{className:"menu-options"},r.a.createElement("div",{className:"option"},r.a.createElement("img",{src:"https://img.icons8.com/cotton/64/000000/add-to-chat.png",alt:""}),r.a.createElement("span",null,"start chat")))},I=function(){return r.a.createElement(j,null,r.a.createElement("div",{className:"chat-page"},r.a.createElement(_,null),r.a.createElement(y,null)))},H=function(){var e=Object(a.useContext)(v).Authenticate;return Object(a.useEffect)((function(){var t="http://"+window.location.hostname+":8000";console.log(t),d.a.get(t+"/api/authenticate"+window.location.search).then((function(t){console.log(t.data),e(t.data.username,t.data.id)}))}),[]),r.a.createElement(I,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null,r.a.createElement(H,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},43:function(e,t,n){e.exports=n.p+"static/media/logo.2b68e57d.png"},44:function(e,t,n){e.exports=n(101)},66:function(e,t,n){},97:function(e,t){}},[[44,1,2]]]);
//# sourceMappingURL=main.ac6bcc45.chunk.js.map