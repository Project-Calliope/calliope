const request = require('supertest');
const express = require('express');
const audioRoutes = require('../../routes/audio.routes');

const app = express();
app.use('/api', audioRoutes);

describe('Tests d\'intégration - API upload audio', () => {       

  it('devrait accepter un fichier audio valide', async () => {

    const fakeAudio = Buffer.from('mock audio content'); 

    const response = await request(app)
      .post('/api/upload')
      .attach('audio', fakeAudio, { filename: 'test.mp3', contentType: 'audio/mpeg' });

    expect(response.status).toBe(200);
  });

  it('devrait refuser un fichier non audio', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('audio', Buffer.from('text file content'), 'test.txt');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Le fichier doit être un fichier audio (MP3, WAV).');
  });

  it('devrait refuser un fichier trop volumineux', async () => {
    const largeBuffer = Buffer.alloc(11 * 1024 * 1024); // 11 Mo

    const response = await request(app)
      .post('/api/upload')
      .attach('audio', largeBuffer, { filename: 'big-audio.mp3', contentType: 'audio/mpeg' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Le fichier dépasse la limite de 10 Mo.');
  });

  it('devrait renvoyer une erreur si aucun fichier n\'est envoyé', async () => {
    const response = await request(app).post('/api/upload');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Aucun fichier reçu');
  });

});
