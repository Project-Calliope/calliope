DROP FUNCTION IF EXISTS get_root_ressource(UUID);

CREATE OR REPLACE FUNCTION get_root_ressource(p_public_user_id UUID)
RETURNS TABLE (
    public_root_ressource UUID,
    root_name VARCHAR
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT r.public_ressource_id, r.ressource_name
    FROM RESSOURCE r
    JOIN ROOT_RESSOURCE rr ON r.private_ressource_id = rr.private_ressource_id
    JOIN UTILISATEUR u ON r.private_user_id = u.private_user_id
    WHERE u.public_user_id = p_public_user_id;
END;
$$;
