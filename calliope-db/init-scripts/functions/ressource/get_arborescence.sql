CREATE OR REPLACE FUNCTION get_arborescence(p_public_user_id UUID)
RETURNS TABLE (
    child_ressource_id UUID,
    child_ressource_name VARCHAR,
    parent_ressource_id UUID,
    parent_ressource_name VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    WITH user_resources AS (
        SELECT private_ressource_id, public_ressource_id, ressource_name
        FROM RESSOURCE
        WHERE private_user_id = (
            SELECT private_user_id FROM UTILISATEUR WHERE public_user_id = p_public_user_id
        )
    )
    SELECT
        child.public_ressource_id AS child_ressource_id,
        child.ressource_name AS child_ressource_name,
        parent.public_ressource_id AS parent_ressource_id,
        parent.ressource_name AS parent_ressource_name
    FROM CHILD_RESSOURCE
    JOIN user_resources AS child ON CHILD_RESSOURCE.private_child_ressource_id = child.private_ressource_id
    JOIN user_resources AS parent ON CHILD_RESSOURCE.private_father_ressource_id = parent.private_ressource_id;
END;
$$ LANGUAGE plpgsql;
