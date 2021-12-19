$(() => {
    viewPhone();
    event();
});
const viewPhone = async (val) => {
    let json = await fetch('/2021년 지방대회 문제/restAPI/phone.php')
        .then(amugona => amugona.json());
    const statusCd = json.statusCd;
    const statusMsg = json.statusMsg;
    const totalCount = json.totalCount;
    const items = json.items;
    if (statusCd !== '200' && statusMsg !== '정상') {
        return
        // alert(`${statusCd} error 다시시도해주세요 오류메세지(errorMsg): ${statusMsg} :(`);
        // $("<a href='/2021년 지방대회 문제/index.html'></a>")[0].click();
    }

    //탭 생성
    let itemArr = [];
    items.forEach((e, idx) => {
        itemArr.push(items[idx].deptNm);
    })
    let itemsArr = new Set(itemArr);
    itemArr = JSON.parse(JSON.stringify([...itemsArr]));

    let phoneHtml = ``;
    phoneHtml = `<th data-id="0">전체</th>`;
    itemArr.forEach((e, idx) => {
        phoneHtml += `<th data-id="${idx + 1}">${e}</th>`;
    })
    console.log(itemArr);
    $('#headerTable table tr').html(phoneHtml);
    //내용 생성
    let item = json.items;
    let bodyHtml = ``;
    let titleHtml = ``;

    let titleArr = [];
    items.forEach(e => {
        titleArr.push(e.deptNm);
    })
    //배열정리
    let resArr = [];
    itemArr.forEach(e => {
        resArr.push({'deptNm': e, 'Arr': []});
    })
    resArr.forEach((e, idx) => {
        item.forEach(e2 => {
            if (e.deptNm === e2.deptNm) {
                e.Arr.push(e2);
            }
        })
    })
    //리스트쓰기
    resArr.forEach((e, idx) => {
        if(val === '전체') {
            titleHtml += `  
                <div class="bodyTitleBox">
                    <div class="bodyTitle">
                        <h3>${e.deptNm}</h3>
                    </div>
                    <div class="bodyBorder"></div>
                </div>
                <div class="bodyPhone f">`
            e.Arr.forEach(e2 => {
                titleHtml += `<div class="phoneBox fc fac">
                <span>${e2.name}</span>
                <span class="phoneLine"></span>
                <span>${e2.telNo}</span>
            </div>`
            })
            titleHtml += `</div>`
        }
        if (val === e.deptNm) {
            titleHtml += `  
                <div class="bodyTitleBox">
                    <div class="bodyTitle">
                        <h3>${e.deptNm}</h3>
                    </div>
                    <div class="bodyBorder"></div>
                </div>
                <div class="bodyPhone f">`
            e.Arr.forEach(e2 => {
                titleHtml += `<div class="phoneBox fc fac">
                <span>${e2.name}</span>
                <span class="phoneLine"></span>
                <span>${e2.telNo}</span>
            </div>`
            })
            titleHtml += `</div>`
        }
    })
    $('.bodyBox').html(titleHtml);
}

function tabClick() {
    $('#headerTable table th').removeClass('tableColor');
    $(this).addClass('tableColor');
    let text = $(this).text();
    viewPhone(text);
}


const event = () => {
    $(document)
        .on('click', '#headerTable table tr th', viewPhone)
        .on('click', '#headerTable table tr th', tabClick)
}

