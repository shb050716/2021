let id = 0;
$(function () {
    event();
    let saveLocal = getData('data');
    let yearLocal = getData('year');
    let checkLocal = getData('check');
    let dateLocal = getData('date');
    let deleteLocal = getData('saveYear');
    if (saveLocal === null || saveLocal === undefined) {
        localStorage.data = JSON.stringify([]);
    }
    if (yearLocal === null || yearLocal === undefined) {
        localStorage.year = JSON.stringify([]);
    }
    if (checkLocal === null || checkLocal === undefined) {
        localStorage.check = JSON.stringify([]);
    }
    if (dateLocal === null || dateLocal === undefined) {
        localStorage.date = JSON.stringify([]);
    }
    if (deleteLocal === null || deleteLocal === undefined) {
        localStorage.saveYear = JSON.stringify([]);
    }

    view();
    yearView();
    yearTitle();
    firstCheck();
})

const getData = (storage) => {
    if (!localStorage[storage]) return null;
    return JSON.parse(localStorage[storage]);
}

function firstCheck () {
    let localCheck = JSON.parse(localStorage.check);
    let localYear = JSON.parse(localStorage.year);
    localYear.forEach(e => {
        if(e === localCheck){
            $(`#year table th[data-id=${localCheck}]`).addClass('tableColor');
        }
    })
}

function event() {
    $(document)
        .on('click', '.yearButton', HistoryRegistration)
        .on('click', '.first', modal1Save)
        .on('click', '.bodyText .correction', modalCorrection)
        .on('click', '.second', modal2Save)
        .on('click', '.localDelete', storageDelete)
        .on('click', '#year table thead tr th', yearClick)
}

function HistoryRegistration() {
    $('.Mou').modal('show');
}

function modalCorrection() {
    $('.Mo').modal('show');
    id = $(this).parents('.bodyText').attr('data-id');
}

function storageDelete() {
    id = $(this).parents('.bodyText').attr('data-id');
    let localData = JSON.parse(localStorage.data);
    let localCheck = JSON.parse(localStorage.check);
    let localSaveYear = [];
    localData.forEach(e => {
        localSaveYear.push(e.year);
    });
    let warning = window.confirm('연혁을 삭제하시겠습니까?');

    console.log(localSaveYear.includes(localCheck));
    console.log(warning);
    if(warning === true){
        localData.splice(id,1);
        localSaveYear.splice(id,1);
        localStorage.data = JSON.stringify(localData);
        localStorage.saveYear = JSON.stringify(localSaveYear);
    }
    viewDelete();
    yearView();
    yearTitle();
    view();
}
function viewDelete() {
    let localCheck = JSON.parse(localStorage.check);
    let localYear = JSON.parse(localStorage.year);
    let localSaveYear = JSON.parse(localStorage.saveYear);

    if(localSaveYear.includes(localCheck) === false){
        let deleteYear = localYear.indexOf(localCheck);
        localYear.splice(deleteYear,1);
        localStorage.check = JSON.stringify('');
        localStorage.year = JSON.stringify(localYear);
    }
}



function view() {
    let localData = JSON.parse(localStorage.data);
    let localCheck = JSON.parse(localStorage.check);
    let localDate = JSON.parse(localStorage.date);
    let viewText = ``;
    let check = false;

    localData.sort((a,b) => {
        let a_date = Number(a['date'].split('-').join(''));
        let b_date = Number(b['date'].split('-').join(''));
        return a_date - b_date;
    })
    localData.forEach((e, idx) => {
        localDate.push(e.date);
        if (e.year === localCheck) {
            check = true;
        }
        if (e.year !== localCheck) {
            check = false;
        }
        if (check !== false) {
            viewText += `<div class="bodyText f" data-id="${idx}">
            <div class="date">
                <span>${e.date}</span>
            </div>
            <span class="localText">${e.text}</span>
            <input type="button" class="correction" value="수정">
                <input class="localDelete" type="button" value="삭제">
            </div>`;
        }
    })
    $('.bodyContents').html(viewText);
}

function yearView() {
    let localYear = JSON.parse(localStorage.year);
    let saveYear = $('.modal1_date').val();
    let yearTable = ``;
    localYear.forEach((e, idx) => {
        yearTable += `<th data-id="${e}">${e}년</th>`
    })
    $('#year table thead tr').html(yearTable);
}

function yearTitle() {
    let localCheck = JSON.parse(localStorage.check);
    let title = ``;
    title += `<h1>${localCheck}</h1>`
    $('.bodyTitle').html(title);
}

function modal1Save() {
    let localData = JSON.parse(localStorage.data);
    let localYear = JSON.parse(localStorage.year);
    let localYearSave = JSON.parse(localStorage.saveYear);
    let saveHistory = $('.modal1_Text').val();
    let saveYear = $('.modal1_date').val();
    let localIdx = 0;
    if (saveHistory === '' && saveYear === '') {
        return
    }
    if (saveHistory === '') {
        return
    }
    if (saveYear === '') {
        return
    }
    localData.forEach(() => {
        localIdx++;
    })
    localData.push({'text': saveHistory, 'date': saveYear, 'idx': localIdx, 'year': saveYear.split('-')[0]});
    localYearSave.push(saveYear.split('-')[0]);
    localStorage.saveYear = JSON.stringify(localYearSave);
    localStorage.data = JSON.stringify(localData);

    let year = saveYear.split('-')[0];
    localYear.push(year);
    let set = new Set(localYear);
    localYear = JSON.parse(JSON.stringify([...set]));
    localStorage.year = JSON.stringify(localYear);
    localStorage.check = JSON.stringify(localYear[localYear.length - 1]);
    $('.Mou').modal('hide');
    view();
    yearView();
    yearTitle();
    firstCheck();
}

function modal2Save() {
    let modal_save = $('.modal2_Text').val();
    let modal_date = $('.modal2_date').val();
    if (modal_save === '' && modal_date) {
        return
    }
    if (modal_date === '') {
        return
    }
    if (modal_save === '') {
        return
    }
    viewCorrection();
    $('.Mo').modal('hide');

    view();
    yearView();
    firstCheck();
    yearTitle();
}
function viewCorrection () {
    let localData = JSON.parse(localStorage.data);
    let localYear = JSON.parse(localStorage.year);
    let localCheck = JSON.parse(localStorage.check);
    let localSaveYear = JSON.parse(localStorage.saveYear);
    let modal_save = $('.modal2_Text').val();
    let modal_date = $('.modal2_date').val();

    localData[id].text = modal_save;
    let textDate = localData[id].date = modal_date;
    let textYear = localData[id].year = textDate.split('-')[0];
    localStorage.data = JSON.stringify(localData);
    if(localData[id].year !== localCheck){
        localCheck = textYear;
        localYear.push(textYear);
        localStorage.check = JSON.stringify(localCheck);
    }
    let localArr = [];
    localData.forEach(e => {
        localArr.push(e.year);
    })
    let difference = localYear.filter(x => !localArr.includes(x)).join('');
    console.log(difference, localYear, localArr);
    let localIdx = localYear.indexOf(difference);
    localYear.forEach(e => {
        if(textYear !== e){
            if(localIdx !== -1 || difference !== ''){
                localYear.splice(localIdx,1);
                localStorage.year = JSON.stringify(localYear);
            }
        }
    })
    console.log(difference,localYear, localArr);
    let set = new Set(localYear);
    localStorage.year = JSON.stringify([...set]);
}

function yearClick() {
    let localData = JSON.parse(localStorage.data);
    let localCheck = JSON.parse(localStorage.check);
    $('table th').removeClass('tableColor');
    $(this).addClass('tableColor');
    localStorage.check = JSON.stringify($(this).attr('data-id'));
    yearTitle();
    view();
}

