DROP FUNCTION get_note(p_public_user_id UUID, p_public_ressource_id UUID);

CREATE FUNCTION get_note(p_public_user_id UUID, p_public_ressource_id UUID)
RETURNS TABLE (note_title TEXT, note_content TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT r.ressource_name, c.content
    FROM RESSOURCE r
    JOIN UTILISATEUR u ON r.private_user_id = u.private_user_id
    JOIN CONTENT c ON r.private_ressource_id = c.private_ressource_id
    WHERE u.public_user_id = p_public_user_id
      AND r.public_ressource_id = p_public_ressource_id
      AND r.ressource_nature = 'note';
END;
$$ LANGUAGE plpgsql;
