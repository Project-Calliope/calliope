CREATE OR REPLACE FUNCTION get_user(p_public_user_id UUID)
RETURNS TABLE (
    public_user_id UUID,
    username VARCHAR,
    email VARCHAR
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT public_user_id, username, email
    FROM UTILISATEUR u
    WHERE u.public_user_id = p_public_user_id;
END;
$$;
