const view = async (pageNum) => {
    pageNum = pageNum - 1;
    let dataUrl = `./무형문화재_현황/nihList.xml`;
    const xmlData = await dataLoad(dataUrl);
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
    let viewPage = 8;
    let maxPage = Math.ceil(xmlTotalCnt / viewPage);
    //페이지 바
    let pageHtml = ``;
    pageHtml += `<input class="buttonBox" type="button" value="<<">`;
    for (let i = 0; i < maxPage; i++) {
        pageHtml += `<input class="buttonBox" type="button" value="${i + 1}">`;
    }
    pageHtml += `<input class="buttonBox" type="button" value=">>">`
    $('.footerBox').html(pageHtml);

    //페이지네이션
    let pageArr = [];
    let listImg = ``;
    let pageIndex = [];
    let arrSlice = [];
    let imageUrl = '';

    for (let i = 0; i < maxPage; i++) {
        pageIndex.push(viewPage * i);
        arrSlice.push(listArr.slice(viewPage * i, (viewPage * (i + 1))));
        pageArr.push(imageUrl.slice(viewPage * i, (viewPage) * (i + 1)));
    }


    for(let i = 0; i < arrSlice[pageNum ].length; i++){
        let imgUrlXml = `./무형문화재_현황/detail/${arrSlice[pageNum][i].ccbaKdcd}_${arrSlice[pageNum][i].ccbaCtcd}_${arrSlice[pageNum][i].ccbaAsno}.xml`;
        let data = await dataLoad(imgUrlXml);
        imageUrl = $(data).find('imageUrl').text();
        if(imageUrl !== ''){
            listImg += ` <div class="imgBigBox fd fac">
                <div class="imgBox"><img src="./무형문화재_현황/nihcImage/${imageUrl}" alt=""></div>
                <p>${arrSlice[pageNum][i].ccbaMnm1}</p>
            </div>`
        }
        if(imageUrl === ''){
            listImg += ` <div class="imgBigBox fd fac">
                <div class="imgBox fc fac"><p>no image</p></div>
                <p>${arrSlice[pageNum][i].ccbaMnm1}</p>
            </div>`
        }
    }
    $('.bodyImgBox').html(listImg);

}

function listClick() {
    let val = +this.value;

    if (this.value === '<<') {
        val = 1;
    } else if (this.value === '>>') {
        val = 20;
    }
    view(val);
}

const event = () => {
    $(document)
        .on('click', '.buttonBox', listClick)
}

const dataLoad = async (urls) => {
    return new Promise((res, rej) => {
        $.ajax({
            url: urls,
            dataType: "xml",
            success: function (data) {
                return res(data);

            }
        })
    })
}

$(async () => {
    await view(1);
    event();

})