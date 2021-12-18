$(() => {
    // $.ajax({
    //     url : '/2021년 지방대회 문제/restAPI/phone.php',
    //     success : function (json) {
    //         viewPhone(JSON.parse(json));
    //         event();
    //     }
    // })
    viewPhone();
    event();
});
const viewPhone = (json) => {
    $.ajax({
        url: '/2021년 지방대회 문제/restAPI/phone.php',
        success: function (json) {
            json = JSON.parse(json);
            const statusCd = json.statusCd;
            const statusMsg = json.statusMsg;
            const totalCount = json.totalCount;
            const items = json.items;
            console.log(statusCd, statusMsg, totalCount, items);
            console.log(json);
            if (statusCd !== '200' && statusMsg !== '정상') {
                return
            }

            //탭 생성
            let itemArr = [];
            items.forEach((e, idx) => {
                itemArr.push(items[idx].deptNm);
            })
            let itemsArr = new Set(itemArr);
            itemArr = JSON.parse(JSON.stringify([...itemsArr]));

            let phoneHtml = ``;
            itemArr.forEach((e, idx) => {
                phoneHtml += `<th data-id="${idx}">${e}</th>`;
            })
            $('#headerTable table tr').append(phoneHtml);

            //내용 생성
            tabClick(json);
        }
    })
}

function tabClick(json) {
    $('#headerTable table th').removeClass('tableColor');
    $(this).addClass('tableColor');
    let items = json.items;
    let tabHtml = ``;
    let check = false;
    let tabText = $(this)[0].innerText;
    console.log($(this)[0].innerText);
    items.forEach(e => {
        if(tabText === e.deptNm){
            check = true;
        }
        if(check === false){
            return
        }
        tabHtml += `<div class="bodyTitle">
            <h3>${e.deptNm}</h3>
        </div>
        <div class="bodyBorder"></div>
    </div>
    <div class="bodyPhone fw">
        <div class="phoneBox fc fac">
            <span>${e.name}</span>
            <span class="phoneLine"></span>
            <span>${e.telNo}</span>
        </div>`
    })
    $('.bodyBox').html(tabHtml);
}


const event = (json) => {
    $(document)
        .on('click', '#headerTable table tr th', tabClick)
}

