
const functions = require('firebase-functions')
const admin = require('firebase-admin')
​
admin.initializeApp(functions.config().firebase)
​
exports.jogador = functions.https.onRequest((req, res) => {
  if (!req.body) {
    res.status(400)
    return
  }
​
  const object = {
    nome: req.body.nome,
    posicao_lane: req.body.posicao_lane,
    imagem: req.body.imagem,
    pais: req.body.pais
  }
  
  admin.database()
    .ref('/jogadores')
    .push(object)
    .then(() => res.status(200))
})