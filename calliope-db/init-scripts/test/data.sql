-- Script de population pour la base de données
-- Initialisation des tables avec des données de test

-- Fonction pour générer un mot de passe hashé
CREATE OR REPLACE FUNCTION hash_password(password TEXT) RETURNS TEXT AS $$
BEGIN
    RETURN crypt(password, gen_salt('bf'));
END;
$$ LANGUAGE plpgsql;

-- Insertion des utilisateurs
INSERT INTO UTILISATEUR (private_user_id, public_user_id, username, email, encrypted_password)
VALUES
    ('11111111-1111-1111-1111-111111111111', '11111111-2222-1111-1111-111111111111', 'alice_dubois', 'alice.dubois@example.com', hash_password('motdepasse123')),
    ('22222222-2222-2222-2222-222222222222', '22222222-3333-2222-2222-222222222222', 'marc_dupont', 'marc.dupont@example.com', hash_password('secure456')),
    ('33333333-3333-3333-3333-333333333333', '33333333-4444-3333-3333-333333333333', 'sophie_martin', 'sophie.martin@example.com', hash_password('sophie789')),
    ('44444444-4444-4444-4444-444444444444', '44444444-5555-4444-4444-444444444444', 'thomas_bernard', 'thomas.bernard@example.com', hash_password('thom@s001')),
    ('55555555-5555-5555-5555-555555555555', '55555555-6666-5555-5555-555555555555', 'julie_robert', 'julie.robert@example.com', hash_password('jr2024!'));

-- Insertion des ressources pour Alice
INSERT INTO RESSOURCE (private_ressource_id, public_ressource_id, ressource_nature, ressource_name, private_user_id)
VALUES
    ('aaaaaaaa-1111-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-2222-aaaa-aaaa-aaaaaaaaaaaa', 'dossier', 'Projets Personnels', '11111111-1111-1111-1111-111111111111'),
    ('bbbbbbbb-1111-bbbb-bbbb-bbbbbbbbbbbb', 'bbbbbbbb-2222-bbbb-bbbb-bbbbbbbbbbbb', 'dossier', 'Travail', '11111111-1111-1111-1111-111111111111'),
    ('cccccccc-1111-cccc-cccc-cccccccccccc', 'cccccccc-2222-cccc-cccc-cccccccccccc', 'note', 'Idées vacances', '11111111-1111-1111-1111-111111111111'),
    ('dddddddd-1111-dddd-dddd-dddddddddddd', 'dddddddd-2222-dddd-dddd-dddddddddddd', 'note', 'Liste de courses', '11111111-1111-1111-1111-111111111111'),
    ('eeeeeeee-1111-eeee-eeee-eeeeeeeeeeee', 'eeeeeeee-2222-eeee-eeee-eeeeeeeeeeee', 'note', 'Réunion équipe', '11111111-1111-1111-1111-111111111111');

-- Insertion des ressources pour Marc
INSERT INTO RESSOURCE (private_ressource_id, public_ressource_id, ressource_nature, ressource_name, private_user_id)
VALUES
    ('aaaaaaaa-3333-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-4444-aaaa-aaaa-aaaaaaaaaaaa', 'dossier', 'Recherches', '22222222-2222-2222-2222-222222222222'),
    ('bbbbbbbb-3333-bbbb-bbbb-bbbbbbbbbbbb', 'bbbbbbbb-4444-bbbb-bbbb-bbbbbbbbbbbb', 'note', 'Analyse de données', '22222222-2222-2222-2222-222222222222'),
    ('cccccccc-3333-cccc-cccc-cccccccccccc', 'cccccccc-4444-cccc-cccc-cccccccccccc', 'note', 'Roadmap projet', '22222222-2222-2222-2222-222222222222');

-- Insertion des ressources pour Sophie
INSERT INTO RESSOURCE (private_ressource_id, public_ressource_id, ressource_nature, ressource_name, private_user_id)
VALUES
    ('aaaaaaaa-5555-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-6666-aaaa-aaaa-aaaaaaaaaaaa', 'dossier', 'Études', '33333333-3333-3333-3333-333333333333'),
    ('bbbbbbbb-5555-bbbb-bbbb-bbbbbbbbbbbb', 'bbbbbbbb-6666-bbbb-bbbb-bbbbbbbbbbbb', 'dossier', 'Projets étudiants', '33333333-3333-3333-3333-333333333333'),
    ('cccccccc-5555-cccc-cccc-cccccccccccc', 'cccccccc-6666-cccc-cccc-cccccccccccc', 'note', 'Notes de cours', '33333333-3333-3333-3333-333333333333');

-- Ressources racines
INSERT INTO ROOT_RESSOURCE (private_ressource_id)
VALUES
    ('aaaaaaaa-1111-aaaa-aaaa-aaaaaaaaaaaa'),
    ('bbbbbbbb-1111-bbbb-bbbb-bbbbbbbbbbbb'),
    ('aaaaaaaa-3333-aaaa-aaaa-aaaaaaaaaaaa'),
    ('aaaaaaaa-5555-aaaa-aaaa-aaaaaaaaaaaa'),
    ('bbbbbbbb-5555-bbbb-bbbb-bbbbbbbbbbbb');

-- Ressources enfants
INSERT INTO CHILD_RESSOURCE (private_child_ressource_id, private_father_ressource_id)
VALUES
    ('cccccccc-1111-cccc-cccc-cccccccccccc', 'aaaaaaaa-1111-aaaa-aaaa-aaaaaaaaaaaa'),
    ('dddddddd-1111-dddd-dddd-dddddddddddd', 'aaaaaaaa-1111-aaaa-aaaa-aaaaaaaaaaaa'),
    ('eeeeeeee-1111-eeee-eeee-eeeeeeeeeeee', 'bbbbbbbb-1111-bbbb-bbbb-bbbbbbbbbbbb'),
    ('bbbbbbbb-3333-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-3333-aaaa-aaaa-aaaaaaaaaaaa'),
    ('cccccccc-3333-cccc-cccc-cccccccccccc', 'aaaaaaaa-3333-aaaa-aaaa-aaaaaaaaaaaa'),
    ('cccccccc-5555-cccc-cccc-cccccccccccc', 'bbbbbbbb-5555-bbbb-bbbb-bbbbbbbbbbbb');

-- Contenu des notes
INSERT INTO CONTENT (private_ressource_id, content)
VALUES
    ('cccccccc-1111-cccc-cccc-cccccccccccc', 'Idées pour les prochaines vacances:
- Espagne: Barcelone et Madrid
- Italie: Rome, Florence et Venise
- Grèce: Athènes et les îles'),
    ('dddddddd-1111-dddd-dddd-dddddddddddd', 'À acheter:
- Fruits et légumes
- Pain
- Lait
- Œufs
- Fromage'),
    ('eeeeeeee-1111-eeee-eeee-eeeeeeeeeeee', 'Points à aborder lors de la réunion:
1. Avancement du projet
2. Problèmes rencontrés
3. Planning des prochaines semaines
4. Questions diverses'),
    ('bbbbbbbb-3333-bbbb-bbbb-bbbbbbbbbbbb', 'Analyse préliminaire des données:
- Tendance à la hausse des ventes au Q1
- Diminution des coûts de production de 7%
- Nouveaux marchés à explorer: Asie et Amérique latine'),
    ('cccccccc-3333-cccc-cccc-cccccccccccc', 'Roadmap 2025:
Q1: Lancement de la v2.0
Q2: Extension sur le marché européen
Q3: Développement de nouvelles fonctionnalités
Q4: Préparation de la v3.0'),
    ('cccccccc-5555-cccc-cccc-cccccccccccc', 'Notes du cours d''algorithmique:
- Complexité des algorithmes
- Structures de données avancées
- Programmation dynamique
- Algorithmes de graphes');

-- Transcriptions
INSERT INTO TRANSCRIPT (private_transcript_id, public_transcript_id, audioName, audioSize, content)
VALUES
    ('a1a1a1a1-1111-a1a1-a1a1-a1a1a1a1a1a1', 'b1b1b1b1-1111-b1b1-b1b1-b1b1b1b1b1b1', 'reunion_equipe_janvier.mp3', 15.7, 'Transcription de la réunion d''équipe du mois de janvier. Nous avons discuté des objectifs pour le premier trimestre et assigné les responsabilités.'),
    ('a2a2a2a2-2222-a2a2-a2a2-a2a2a2a2a2a2', 'b2b2b2b2-2222-b2b2-b2b2-b2b2b2b2b2b2', 'conference_technologie.mp3', 42.3, 'Transcription de la conférence sur les dernières avancées technologiques. Plusieurs intervenants ont présenté leurs recherches dans le domaine de l''intelligence artificielle.'),
    ('a3a3a3a3-3333-a3a3-a3a3-a3a3a3a3a3a3', 'b3b3b3b3-3333-b3b3-b3b3-b3b3b3b3b3b3', 'cours_algorithmique.mp3', 28.9, 'Transcription du cours d''algorithmique. Le professeur a expliqué les principes fondamentaux de la programmation dynamique et des algorithmes de graphes.');

-- Association des transcriptions aux ressources
INSERT INTO IS_TRANSCRIPT_OF (private_transcript_id, private_ressource_id)
VALUES
    ('a1a1a1a1-1111-a1a1-a1a1-a1a1a1a1a1a1', 'eeeeeeee-1111-eeee-eeee-eeeeeeeeeeee'),
    ('a2a2a2a2-2222-a2a2-a2a2-a2a2a2a2a2a2', 'bbbbbbbb-3333-bbbb-bbbb-bbbbbbbbbbbb'),
    ('a3a3a3a3-3333-a3a3-a3a3-a3a3a3a3a3a3', 'cccccccc-5555-cccc-cccc-cccccccccccc');

-- API Authorizations
INSERT INTO API_AUTHORIZATION (private_user_id, expirationDate, callLimit)
VALUES
    ('11111111-1111-1111-1111-111111111111', '2025-12-31', 1000),
    ('22222222-2222-2222-2222-222222222222', '2025-06-30', 500),
    ('33333333-3333-3333-3333-333333333333', '2025-09-15', 250);