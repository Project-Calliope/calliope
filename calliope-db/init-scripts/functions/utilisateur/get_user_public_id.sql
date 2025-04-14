CREATE OR REPLACE FUNCTION get_user_public_id(p_email VARCHAR)
    RETURNS TABLE
            (
                public_user_id UUID,
                email          VARCHAR,
                username       VARCHAR
            )
    LANGUAGE plpgsql
AS
$$
BEGIN
    RETURN QUERY
        SELECT u.public_user_id, u.email, u.username
        FROM UTILISATEUR u
        WHERE u.email = p_email;
END;
$$;

