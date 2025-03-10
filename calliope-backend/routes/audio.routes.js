const express = require('express')
const audioController = require('../controllers/audio.controller')
const validateAudio = require('../middleware/validateAudio')
const router = express.Router()
const multer = require('multer');

const storage = multer.memoryStorage(); // Utilisation de la mémoire pour éviter le stockage disque
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 Mo
}).single('audio'); // 'audio' correspond à la clé du champ du fichier

router.post('/upload', upload, validateAudio ,audioController.uploadAudio)


/* 
1. upload (middleware de multer) est exécuté en premier :
    - Le fichier est reçu et mis en mémoire.
    - Il vérifie la taille et le type du fichier.
    - Si tout est bon, il met le fichier dans req.file et passe au middleware suivant.

2. validateAudio (middleware personnalisé) est exécuté ensuite :
    - Il vérifie des critères supplémentaires, comme le type MIME et la taille du fichier.
    - Si tout est valide, il passe au contrôleur suivant.
    
3. audioController.uploadAudio (contrôleur) est exécuté à la fin :
    - Il peut utiliser req.file pour accéder aux informations du fichier (nom, taille, type, etc.) et répondre à la requête avec les détails du fichier ou effectuer d'autres traitements.
*/
module.exports = router;