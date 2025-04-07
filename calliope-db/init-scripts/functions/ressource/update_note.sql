CREATE OR REPLACE FUNCTION update_note(
    p_public_user_id UUID,
    p_public_ressource_id UUID,
    p_updated_content TEXT
) RETURNS VOID AS $$
DECLARE
    v_private_user_id UUID;
    v_private_ressource_id UUID;
BEGIN
    -- Récupérer l'ID privé de l'utilisateur
    SELECT private_user_id INTO v_private_user_id
    FROM UTILISATEUR
    WHERE public_user_id = p_public_user_id;

    IF v_private_user_id IS NULL THEN
        RAISE EXCEPTION 'Utilisateur introuvable';
    END IF;

    -- Vérifier que la ressource existe, appartient à l'utilisateur, est de nature "note", et possède un contenu associé
    SELECT r.private_ressource_id INTO v_private_ressource_id
    FROM RESSOURCE r
    JOIN CONTENT c ON c.private_ressource_id = r.private_ressource_id
    WHERE r.public_ressource_id = p_public_ressource_id
      AND r.private_user_id = v_private_user_id
      AND r.ressource_nature = 'note';

    IF v_private_ressource_id IS NULL THEN
        RAISE EXCEPTION 'Note introuvable, non autorisée ou de type invalide';
    END IF;

    -- Mettre à jour le contenu de la note
    UPDATE CONTENT
    SET content = p_updated_content
    WHERE private_ressource_id = v_private_ressource_id;

END;
$$ LANGUAGE plpgsql;
