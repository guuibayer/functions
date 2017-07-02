
const functions = require('firebase-functions')
const admin = require('firebase-admin')
​
admin.initializeApp(functions.config().firebase)
​
exports.usuario = functions.https.onRequest((req, res) => {
  if (!req.body) {
    res.status(400)
    return
  }
​
  const object = {
    nome: req.body.nome,
    posicao_lane: req.body.posicao_lane,
    status: req.body.status,
    imagem: req.body.imagem,
    pontuacao: req.body.pontuacao,
    data_nascimento: req.body.data_nascimento,
    level: req.body.level,
    experiencia: req.body.experiencia,
    ligas: req.body.ligas,
    carteira: req.body.carteira,
    username: req.body.username,
    pais: req.body.pais
  }
  
  admin.database()
    .ref('/usuarios')
    .push(object)
    .then(() => res.status(200))
})