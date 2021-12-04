$(function () {
    event();
    console.log(modalSave())
})

function event(){
    $(document)
        .on('click', '.yearButton', HistoryRegistration)
        .on('click', '.modal-footer .btn-primary', modalSave)
}


function HistoryRegistration () {
    $('.modal').modal('show');
}

function modalSave () {
    let saveHistory = $('.modal-body .input_name').val();
    $('.modal').modal('hide');
}