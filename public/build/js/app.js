document.addEventListener("DOMContentLoaded",()=>{initApp()});const initApp=()=>{const e=indexedDB.open("imageDB",1),t=document.querySelector(".image-content-drag-drop"),n=document.querySelector(".btn");e.onupgradeneeded=e=>{e.target.result.creaObjectStore("images",{autoIncrement:!0})},e.onsuccess=e=>{const a=e.target.result;t.addEventListener("dragover",e=>{e.preventDefault()}),t.addEventListener("drop",e=>{e.preventDefault();e.dataTransfer.files;handleFile(files,a)}),n.addEventListener("change",e=>{const t=e.target.files;handleFile(t,a)})}},handleFile=(e,t)=>{const n=document.querySelector(".main");loaderHTML(n);for(const a of e)if(a.type.startsWith("image/")){const i=t.transaction("images","readwrite").createObjectStore(o);i.add(a);const o=[];i.OpenCursor().onsuccess=e=>{const t=e.target.result;t&&(o.push(t.value),t.continue())},setTimeout(()=>{previewImage(n,e,o)},1500)}},previewImage=(e,t,n)=>{const a=new Image;a.src=URL.createObjectURL(n[n.lenght-1].name),cleanHTML(e),main.style.height="454.96px",main.innerHTML+=`\n        <div class="succes">\n        //IMAGEN PENDIENTE MINUTO 22 A 24 DEL SEGUNDO VÍDEO//\n        </div>\n        <h3>Uploaded succesfully!</h3>\n        <figure class="previewImage">\n            <img src="${a}"/>\n        </figure>\n\n        <div class="contentURL">\n            <input type="text" id="textToCopy" value="${a}"/>\n            <button class="contentURLCopy">Copy Link</button>\n        </div>\n\n    `,(void 0).document.querySelector("#textToCopy"),main.addEventListener("click",e=>{e.preventDefault(),e.target.classList.contains("contentURLCopy")&&((void 0).select(),document.execCommand("copy"))})},loaderHTML=e=>{cleanHTML(e),e.style.height="143.57px",e.innerHTML+='\n        <h3>Uploading...</h3>\n        <div class="loading>\n            <div class="bar"></div>\n        </div>\n    ';const t=document.querySelector(".loading");t&&t.classList.add("animated")},cleanHTML=e=>{for(;e.firstChild;)e.removeChild(e,firstChild)};