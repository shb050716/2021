const view = async (pageNum = 0) => {
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
        if(pageNum !== (i + 1)){
            pageHtml += `<input class="buttonBox" type="button" value="${i + 1}">`;
        }
        else if (pageNum === (i + 1)){
            console.log(i);
            pageHtml += `<input class="buttonBox buttonColor" type="button" value="${i + 1}">`;

        }
    }
    pageHtml += `<input class="buttonBox" type="button" value=">>">`
    $('.footerBox').html(pageHtml);

    //페이지 현황?
    let pageNumber = pageNum -1;
    let nowPage = ``;
    nowPage += `<p>총 ${listArr.length}건 </p>
                <p>${pageNumber + 1}p / </p>
                <p>${maxPage}p</p>`
    $('.nowPage').html(nowPage);
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

    for(let i = 0; i < arrSlice[pageNumber].length; i++){
        let imgUrlXml = `./무형문화재_현황/detail/${arrSlice[pageNumber][i].ccbaKdcd}_${arrSlice[pageNumber][i].ccbaCtcd}_${arrSlice[pageNumber][i].ccbaAsno}.xml`;
        let data = await dataLoad(imgUrlXml);
        imageUrl = $(data).find('imageUrl').text();
            listImg += ` <div class="imgBigBox fd fac">
                <div class="imgBox"><img src="./무형문화재_현황/nihcImage/${imageUrl}" onerror="this.src='./무형문화재_현황/no_image.png'"></div>
                <p>${arrSlice[pageNumber][i].ccbaMnm1}</p>
            </div>`
    }
    console.log(arrSlice);
    $('.bodyImgBox').html(listImg);

}

function noImage () {
    // $('img').attr('src','./무형문화재_현황/no_image.png');

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