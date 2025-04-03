CREATE OR REPLACE FUNCTION get_transcript(
    p_public_ressource_id UUID,
    p_public_user_id UUID
)
RETURNS TABLE (public_transcript_id UUID, transcript_content TEXT, transcript_audioname TEXT, transcript_audiosize REAL) AS $$
         BEGIN
            RETURN QUERY
             SELECT t.public_transcript_id, t.content, t.audioname, t.audiosize
             FROM transcript t
             JOIN is_transcript_of ito ON t.private_transcript_id = ito.private_transcript_id
             JOIN ressource r ON r.private_ressource_id = ito.private_ressource_id
             JOIN utilisateur u ON r.private_user_id = u.private_user_id
             WHERE u.public_user_id = p_public_user_id
             AND r.public_ressource_id = p_public_ressource_id
             AND r.ressource_nature = 'note';
         END;

 $$ LANGUAGE plpgsql