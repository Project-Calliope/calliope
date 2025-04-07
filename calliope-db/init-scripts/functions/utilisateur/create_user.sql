DROP FUNCTION IF EXISTS create_user(p_username VARCHAR, p_email VARCHAR, password VARCHAR);
CREATE OR REPLACE FUNCTION create_user(p_username VARCHAR, p_email VARCHAR, password VARCHAR)
    RETURNS TABLE (public_user_id UUID, username VARCHAR, email VARCHAR) AS $$
DECLARE
    v_user_id UUID;
    v_public_user_id UUID;
    v_root_ressource_id UUID;
BEGIN
    -- Insérer l'utilisateur et récupérer son ID privé et public
    INSERT INTO UTILISATEUR (username, email, encrypted_password, public_user_id)
    VALUES (p_username, p_email, crypt(password, gen_salt('bf')), gen_random_uuid())
    RETURNING UTILISATEUR.private_user_id, UTILISATEUR.public_user_id INTO v_user_id, v_public_user_id;

    -- Créer le dossier root pour cet utilisateur
    INSERT INTO RESSOURCE (ressource_nature, ressource_name, private_user_id)
    VALUES ('dossier', 'Mon répertoire', v_user_id)
    RETURNING RESSOURCE.private_ressource_id INTO v_root_ressource_id;

    -- Ajouter le dossier root dans ROOT_RESSOURCE
    INSERT INTO ROOT_RESSOURCE (private_ressource_id)
    VALUES (v_root_ressource_id);

    -- Retourner les informations de l'utilisateur créé
    RETURN QUERY SELECT v_public_user_id AS public_user_id, p_username AS username, p_email AS email;
END;
$$ LANGUAGE plpgsql;
