function convertToNumber(req, res, next){
    req.params.pid = Number(req.params.pid)
    req.params.cid = Number(req.params.cid)
    next() //siempre next para seguir, por esto funciona 
}

module.exports = {
    convertToNumber,
}