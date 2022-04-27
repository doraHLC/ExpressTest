const errorHandle = function (res, err) {
    res.status(400).json(
        {
            status: false,
            message: '欄位未填寫正確，或無此ID',
            error: err
        }
    ).end();
}



module.exports = errorHandle;