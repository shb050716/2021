const view = async () => {
    const xmlData = await dataLoad();
    let xmlTotalCnt = $(xmlData).find('totalCnt').text();
    let xmlItem = $(xmlData).find('item');

    //배열정리
    let listArr = [];
    xmlItem.each((idx, item) => {
        listArr.push({
            'sn': $(item).find('sn').text(),
            'ccbaMnm1': $(item).find('ccbaMnm1').text(),
            'ccbaKdcd': $(item).find('ccbaKdcd').text(),
            'ccbaCtcd': $(item).find('ccbaCtcd').text(),
            'ccbaAsno': $(item).find('ccbaAsno').text()
        })
    })

    //페이지 갯수
    let pageCnt = Math.ceil(xmlTotalCnt / 8);

    //페이지 바
    let pageHtml = ``;
    pageHtml += `<input class="buttonBox" type="button" value="<<">`;
    for(let i = 0; i < pageCnt; i++){
        pageHtml += `<input class="buttonBox" type="button" value="${i + 1}">`;
    }
    pageHtml += `<input class="buttonBox" type="button" value=">>">`
    $('.footerBox').html(pageHtml);

    //페이지네이션
    
}

const event = () => {

}

const dataLoad = async () => {
    return new Promise((res, rej) => {
        $.ajax({
            url: './무형문화재_현황/nihList.xml',
            dataType: "xml",
            success: function (data) {
                return res(data);
            }
        })
    })
}

$(async () => {
    await view();
    event();

})