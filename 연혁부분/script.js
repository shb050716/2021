let id = 0;
$(function () {
    event();
    let saveLocal = getData('data');
    let yearLocal = getData('year');
    let checkLocal = getData('check');
    let dateLocal = getData('date');
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
    let warning = window.confirm('연혁을 삭제하시겠습니까?');
    let localData = JSON.parse(localStorage.data);
    if (warning === true) {
        localData.splice(id, 1);
        localStorage.data = JSON.stringify(localData);
    }
    view();
}


function view() {
    let localData = JSON.parse(localStorage.data);
    let localCheck = JSON.parse(localStorage.check);
    let localDate = JSON.parse(localStorage.date);
    let viewText = ``;
    let check = false;

    localData.forEach((e, idx) => {
        localData.sort((a,b) => {
            let a_release = a['date']

          let b_release = new Date(b).getTime();
            return a_release - b_release;
        })
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

    // localDate.forEach(e => {
    //     let arrSort = Number(e.split('-').join(''));
    //     sortArr.push(JSON.parse(JSON.stringify(arrSort)));
    // })
    // sortArr.sort(function(a,b) {
    //     return a - b;
    // })
    // localDate = JSON.parse(JSON.stringify(sortArr));


    $('.bodyContents').html(viewText);

}

function yearView() {
    let localYear = JSON.parse(localStorage.year);
    let saveYear = $('.modal1_date').val();
    let year = saveYear.split('-')[0];
    let yearTable = ``;
    let yearRadio = ``;
    localYear.forEach((e, idx) => {
        // yearRadio += `<input type="radio" name="year" id="${e}">`
        yearTable += `<th data-id="${e}">${e}년</th>`
    })
    // $('#year table').prepend(yearRadio);
    $('#year table thead tr').html(yearTable);
    $('input[name="year"]').each((id, item) => {
        console.log(id, item);
    })
    console.log();
}

function yearTitle() {
    let localCheck = JSON.parse(localStorage.check);
    let title = ``;
    title += `<h1>${localCheck}년</h1>`
    $('.bodyTitle').html(title);
}

function modal1Save() {
    let localData = JSON.parse(localStorage.data);
    let localYear = JSON.parse(localStorage.year);
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
}

function modal2Save() {
    let localData = JSON.parse(localStorage.data);
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
    $('.Mo').modal('hide');
    localData[id].text = localData[id].text = modal_save;
    localData[id].date = localData[id].date = modal_date;
    localStorage.data = JSON.stringify(localData);
    view();
    yearView();
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

