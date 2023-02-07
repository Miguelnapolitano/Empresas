export function toastfy(msg){
    const main = document.getElementsByTagName('main')[0];

    main.insertAdjacentHTML('afterbegin', `
        <div class="toastfy">
                <h3 class="tx-8">${msg}</h3>
        </div>
    `)
}

export function toastfyBody(msg){
    const body = document.body;

    body.insertAdjacentHTML('afterbegin', `
        <div class="toastfyBody">
                <h3 class="tx-8">${msg}</h3>
        </div>
    `)
}

export function toastfyRed(msg){
    const body = document.body;

    body.insertAdjacentHTML('afterbegin', `
        <div class="toastfy-red">
                <h3 class="tx-8">${msg}</h3>
        </div>
    `)
}