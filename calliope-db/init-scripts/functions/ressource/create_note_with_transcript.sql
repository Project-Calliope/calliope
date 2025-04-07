CREATE OR REPLACE FUNCTION create_note_with_transcript(
    p_public_user_id UUID,
    p_public_father_ressource_id UUID,
    p_ressource_name TEXT,
    p_content TEXT,
    p_audioname TEXT,
    p_audiosize REAL
) RETURNS UUID AS
$$
DECLARE
    v_private_user_id             UUID;
    v_private_father_ressource_id UUID;
    v_private_ressource_id        UUID;
    v_public_ressource_id         UUID;
    v_private_transcript_id       UUID;
BEGIN
    -- Récupérer l'ID privé de l'utilisateur
    SELECT private_user_id
    INTO v_private_user_id
    FROM UTILISATEUR
    WHERE public_user_id = p_public_user_id;

    -- Vérifier si l'utilisateur existe
    IF v_private_user_id IS NULL THEN
        RAISE EXCEPTION 'Utilisateur introuvable';
    END IF;

    -- Récupérer l'ID privé de la ressource parente
    SELECT private_ressource_id
    INTO v_private_father_ressource_id
    FROM RESSOURCE
    WHERE public_ressource_id = p_public_father_ressource_id
      AND private_user_id = v_private_user_id;

    -- Vérifier si la ressource parente existe et appartient bien à l'utilisateur
    IF v_private_father_ressource_id IS NULL THEN
        RAISE EXCEPTION 'Ressource parente introuvable ou non autorisée';
    END IF;

    -- Insérer la nouvelle ressource dans la table RESSOURCE
    INSERT INTO RESSOURCE (ressource_nature, ressource_name, private_user_id)
    VALUES ('note', p_ressource_name, v_private_user_id)
    RETURNING private_ressource_id, public_ressource_id INTO v_private_ressource_id, v_public_ressource_id;

    -- Insérer le contenu de la ressource dans la table CONTENT
    INSERT INTO CONTENT (private_ressource_id, content)
    VALUES (v_private_ressource_id, p_content);

    -- Insérer le transcript dans la table TRANSCRIPT
    INSERT INTO TRANSCRIPT (audioname, audiosize, content)
    VALUES (p_audioname, p_audiosize, p_content)
    RETURNING private_transcript_id INTO v_private_transcript_id;

    -- Insérer le lien entre la ressource est le transcript
    INSERT INTO IS_TRANSCRIPT_OF (private_transcript_id, private_ressource_id)
    VALUES (v_private_transcript_id, v_private_ressource_id);

    -- Ajouter le lien avec la ressource parente dans CHILD_RESSOURCE
    INSERT INTO CHILD_RESSOURCE (private_child_ressource_id, private_father_ressource_id)
    VALUES (v_private_ressource_id, v_private_father_ressource_id);

    -- Retourner l'ID public de la nouvelle ressource
    RETURN v_public_ressource_id;
END;
$$ LANGUAGE plpgsql;

