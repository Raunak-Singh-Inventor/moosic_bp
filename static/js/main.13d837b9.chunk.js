(this.webpackJsonpmoosic=this.webpackJsonpmoosic||[]).push([[0],{17:function(e,t,c){},28:function(e,t){},29:function(e,t){},30:function(e,t){},33:function(e,t,c){},34:function(e,t,c){"use strict";c.r(t);var n=c(5),a=c.n(n),s=c(18),o=c.n(s),r=c(36),i=c(6),l=c(3);i.c.monkeyPatch({Video:HTMLVideoElement});const d={name:"",album:{images:[{url:""}]},artists:[{name:""}]};var m=function(e){const[t,c]=Object(n.useState)(!1),[a,s]=Object(n.useState)(!1),[o,i]=Object(n.useState)(void 0),[m,j]=Object(n.useState)(d);return Object(n.useEffect)((()=>{const t=document.createElement("script");t.src="https://sdk.scdn.co/spotify-player.js",t.async=!0,document.body.appendChild(t),window.onSpotifyWebPlaybackSDKReady=()=>{const t=new window.Spotify.Player({name:"Web Playback SDK",getOAuthToken:t=>{t(e.token)},volume:.7});i(t),t.addListener("ready",(e=>{let{device_id:t}=e;console.log("Ready with Device ID",t)})),t.addListener("not_ready",(e=>{let{device_id:t}=e;console.log("Device ID has gone offline",t)})),t.addListener("player_state_changed",(n=>{n&&(j(n.track_window.current_track),c(n.paused),async function(t){try{return(await r.a.get("https://api.spotify.com/v1/search",{params:{q:t,type:"track"},headers:{Authorization:"Bearer ".concat(e.token)}})).data.tracks.items}catch(c){throw console.error("Error:",c),c}}(e.emotion).then((t=>async function(e,t){try{const c="https://api.spotify.com/v1/me/player/queue?uri=".concat(encodeURIComponent(e));return(await r.a.post(c,null,{headers:{Authorization:"Bearer ".concat(t)}})).data}catch(c){throw console.error("Error:",c.response.data),c}}(t[0].uri,e.token).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)})))),t.getCurrentState().then((e=>{s(!!e)})))})),t.connect()}}),[]),a?Object(l.jsx)("div",{children:Object(l.jsx)("div",{className:"container",children:Object(l.jsxs)("div",{className:"main-wrapper",children:[Object(l.jsx)("img",{src:m.album.images[0].url,className:"now-playing__cover",alt:""}),Object(l.jsxs)("div",{className:"now-playing__side",children:[Object(l.jsx)("div",{className:"now-playing__name",children:m.name}),Object(l.jsx)("div",{className:"now-playing__artist",children:m.artists[0].name}),Object(l.jsx)("button",{className:"spotify-btn",onClick:()=>{o.togglePlay()},children:t?"PLAY":"PAUSE"})]})]})})}):Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{className:"container",children:Object(l.jsx)("div",{className:"main-wrapper",children:Object(l.jsxs)("b",{style:{color:"white"},children:[" ","Instance not active. Transfer your playback using your Spotify app"," "]})})})})};var j=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsxs)("header",{className:"App-header",children:[Object(l.jsx)("div",{children:Object(l.jsx)("a",{className:"login",href:"/auth/login",children:Object(l.jsx)("img",{src:"https://cdn.discordapp.com/attachments/1213605380219736204/1213965710833754132/image.png?ex=65f764ab&is=65e4efab&hm=c82406467b6fc7787c080d92ae7337571de3037f517de7d829875fc359a7d591&",className:"cowgo"})})}),Object(l.jsx)("div",{className:"title-text",children:"Moosic"})]})})};c(17);function h(e){let{emotion:t,setEmotion:c}=e;const a=Object(n.useRef)();Object(n.useEffect)((()=>{o(),a&&s()}),[]);const s=()=>{Promise.all([i.d.tinyFaceDetector.loadFromUri("/models"),i.d.faceLandmark68Net.loadFromUri("/models"),i.d.faceRecognitionNet.loadFromUri("/models"),i.d.faceExpressionNet.loadFromUri("/models")]).then((()=>{r()}))},o=()=>{navigator.mediaDevices.getUserMedia({video:!0}).then((e=>{a.current.srcObject=e})).catch((e=>{console.error(e)}))},r=async()=>{setInterval((async()=>{const e=await i.b(a.current,new i.a).withFaceLandmarks().withFaceExpressions();console.log(e[0].expressions);let t="",n=-1;for(const c in e[0].expressions){const a=e[0].expressions[c];a>n&&(n=a,t=c)}console.log(t),c(t)}),1e3)};return Object(l.jsxs)("div",{className:"flex flex-col h-screen",children:[Object(l.jsx)("div",{children:Object(l.jsxs)("h1",{className:"flex justify-center text-inherit px-20 text-5xl",children:["You are feeling ",Object(l.jsx)("h1",{className:"font-bold ml-2",children:t})," "]})}),Object(l.jsx)("div",{children:Object(l.jsx)("div",{children:Object(l.jsx)("video",{className:"hidden",crossOrigin:"anonymous",ref:a,autoPlay:!0})})})]})}i.c.monkeyPatch({Canvas:HTMLCanvasElement,Image:HTMLImageElement,ImageData:ImageData,Video:HTMLVideoElement,createCanvasElement:()=>document.createElement("canvas"),createImageElement:()=>document.createElement("img")});var u=function(){const[e,t]=Object(n.useState)(""),[c,a]=Object(n.useState)("");let s;return Object(n.useEffect)((()=>{!async function(){const e=await fetch("/auth/token"),c=await e.json();t(c.access_token)}()}),[]),s=""===e?Object(l.jsx)(j,{}):""===c?Object(l.jsx)(h,{emotion:c,setEmotion:a}):Object(l.jsx)(m,{token:e,emotion:c}),s};c(33);o.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(u,{})}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.13d837b9.chunk.js.map