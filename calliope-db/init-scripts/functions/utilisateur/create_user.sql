CREATE OR REPLACE FUNCTION create_user(username VARCHAR, email VARCHAR, password VARCHAR)
    RETURNS UUID AS $$
    DECLARE
        new_public_id UUID;
    BEGIN
        INSERT INTO UTILISATEUR (username, email, encrypted_password, public_user_id)
        VALUES (username, email, crypt(password, gen_salt('bf')), gen_random_uuid())
        RETURNING public_user_id INTO new_public_id;

        RETURN new_public_id;
    END;

    $$ LANGUAGE plpgsql;


