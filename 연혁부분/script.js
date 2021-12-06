$(function () {
    event();
    let saveLocal = getData('data');
    let saveIdx = getData('idx');
    if (saveLocal === null || saveLocal === undefined) {
        localStorage.data = JSON.stringify([]);
    }
    if (saveIdx === null || saveIdx === undefined) {
        localStorage.idx = JSON.stringify([]);
    }
})

const getData = (storage) => {
    if (!localStorage[storage]) return null;
    return JSON.parse(localStorage[storage]);
}

function event() {
    $(document)
        .on('click', '.yearButton', HistoryRegistration)
        .on('click', '.first', modal1Save)
        .on('click', '.bodyText .correction', modalCorrection)
        .on('click','.second',modal2Save)
}

function HistoryRegistration() {
    $('.Mou').modal('show');
}

function modalCorrection() {
    $('.Mo').modal('show');
}

function modal1Save() {
    let localData = JSON.parse(localStorage.data);
    let localIdx = JSON.parse(localStorage.idx);
    let saveHistory = $('.modal1_Text').val();
    let viewText = ``;
    let id_history = 0;
    if (saveHistory === '') {
        return
    }
    localData.forEach((e,idx) => {
        console.log(e);
        viewText += `<div class="bodyText f" data-id="${idx}">
            <span>-01.19</span>
            <span class="localText">${e}</span>
            <input type="button" class="correction" value="수정">
                <input type="button" value="삭제">
            </div>`
        id_history ++;
    })
    localData.push(saveHistory);
    localIdx.push(id_history);
    localStorage.data = JSON.stringify(localData);
    localStorage.idx = JSON.stringify(localIdx);
    $('.Mou').modal('hide');
    $('.bodyContents').html(viewText);
}



function modal2Save (){
    let modal_save = $('.modal2_Text').val();
    if(modal_save === ''){
        return
    }
    $('.Mo').modal('hide');
}