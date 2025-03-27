DROP FUNCTION IF EXISTS create_user(p_username VARCHAR, p_email VARCHAR, password VARCHAR);
CREATE OR REPLACE FUNCTION create_user(p_username VARCHAR, p_email VARCHAR, password VARCHAR)
    RETURNS TABLE (public_user_id UUID, username VARCHAR, email VARCHAR) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO UTILISATEUR (username, email, encrypted_password, public_user_id)
    VALUES (p_username, p_email, crypt(password, gen_salt('bf')), gen_random_uuid())
    RETURNING UTILISATEUR.public_user_id, UTILISATEUR.username, UTILISATEUR.email;
END;
$$ LANGUAGE plpgsql;
