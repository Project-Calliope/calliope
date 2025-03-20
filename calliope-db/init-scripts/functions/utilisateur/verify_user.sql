CREATE OR REPLACE FUNCTION verify_user(p_email VARCHAR, password VARCHAR)
    RETURNS UUID AS $$
    DECLARE
        valid_public_user_id UUID;
    BEGIN
        SELECT public_user_id INTO valid_public_user_id
        FROM UTILISATEUR
        WHERE email = p_email AND encrypted_password = crypt(password, encrypted_password);

    RETURN valid_public_user_id;
    end;

    $$ LANGUAGE plpgsql;