const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const persist = (req, res) => {
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
    .catch(() => res.status(400))
}

const fetchByPosition = (req, res) => {
  const posicao = req.query.posicao

  admin.database()
    .ref('/jogadores')
    .orderByChild('posicao')
    .equalTo(posicao)
    .on('value', snapshot => {
      let object = snapshot.val()
      let result = Object.keys(object).map(key => object[key])
      
      res.status(200).send(result)
    })
}

exports.jogador = functions.https.onRequest((req, res) => {
  switch(req.method) {
    case 'POST':
      persist(req, res)
      break
    case 'GET':
      fetchByPosition(req, res)
    default:
      res.status(500)
      break
  }
})