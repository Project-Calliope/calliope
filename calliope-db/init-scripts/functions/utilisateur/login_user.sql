DROP FUNCTION IF EXISTS login_user(p_email VARCHAR, p_password VARCHAR);
CREATE OR REPLACE FUNCTION login_user(p_email VARCHAR, p_password VARCHAR)
    RETURNS TABLE (public_user_id UUID, username VARCHAR, email VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT UTILISATEUR.public_user_id, UTILISATEUR.username, UTILISATEUR.email
    FROM UTILISATEUR
    WHERE UTILISATEUR.email = p_email
      AND UTILISATEUR.encrypted_password = crypt(p_password, UTILISATEUR.encrypted_password)
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;
