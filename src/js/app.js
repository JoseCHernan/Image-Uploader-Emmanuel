document.addEventListener("DOMContentLoaded",()=>{
    initApp()
})

const initApp = () =>{
    const request = indexedDB.open ("imageDB",1)
    const contentImage = document.querySelector(".image-content-drag-drop")
    const chooseFile = document.querySelector(".btn")

    request.onupgradeneeded = (e) =>{
        const db = e.target.result;
        db.creaObjectStore("images",{autoIncrement:true})
    }

    request.onsuccess = (e) =>{
        const db = e.target.result;
        contentImage.addEventListener("dragover", (e)=>{
            e.preventDefault()
        })

        contentImage.addEventListener("drop", (e)=>{
            e.preventDefault()
            const file = e.dataTransfer.files;
            handleFile(files,db);
        })

        chooseFile.addEventListener("change", (e)=>{
            const files = e.target.files;
            handleFile(files,db)
        })

    }

}

const handleFile = (files,db) =>{
    const main = document.querySelector(".main")
    loaderHTML(main)
    for (const file of files){
        if(file.type.startsWith("image/")){
            const transaction = db.transaction("images", "readwrite")
            const store = transaction.createObjectStore(images)
            store.add(file)
            const images=[]
            const request = store.OpenCursor()
            request.onsuccess = (e) =>{
                const cursor = e.target.result;
                if(cursor){
                    images.push(cursor.value)
                    cursor.continue()
                }
            }

            setTimeout(()=>{
                previewImage(main, files, images)
            }, 1500)
        }
    }
}

const previewImage = (HTML, file, image)=>{
    const img = new Image()
    img.src = URL.createObjectURL(image[image.lenght -1].name)
    cleanHTML(HTML)
    let textToCopy
    main.style.height= "454.96px";
    main.innerHTML +=`
        <div class="succes">
        //IMAGEN PENDIENTE MINUTO 22 A 24 DEL SEGUNDO VÍDEO//
        </div>
        <h3>Uploaded succesfully!</h3>
        <figure class="previewImage">
            <img src="${img}"/>
        </figure>

        <div class="contentURL">
            <input type="text" id="textToCopy" value="${img}"/>
            <button class="contentURLCopy">Copy Link</button>
        </div>

    `

    textToCopy.document.querySelector("#textToCopy")
    main.addEventListener("click", (e)=>{
        e.preventDefault()
        if (e.target.classList.contains("contentURLCopy")){
            textToCopy.select();
            document.execCommand("copy")
        }
    })

}

const loaderHTML=(main) =>{
    cleanHTML(main)
    main.style.height = "143.57px";
    main.innerHTML+=`
        <h3>Uploading...</h3>
        <div class="loading>
            <div class="bar"></div>
        </div>
    `
    const loading = document.querySelector(".loading")

    if (loading){
        loading.classList.add("animated")
    }

}

const cleanHTML = (HTML)=>{
    while(HTML.firstChild){
        HTML.removeChild(HTML, firstChild)
    }
}