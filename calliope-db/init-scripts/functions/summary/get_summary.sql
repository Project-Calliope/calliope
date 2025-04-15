create or replace function get_summary(
    p_public_ressource_id uuid,
    p_public_user_id uuid
)
returns table (summary text) as $$
    begin
        return query
            select s.summary
            from summary s
            join ressource r on s.private_ressource_id = r.private_ressource_id
            join utilisateur u on r.private_user_id = u.private_user_id
            where u.public_user_id = p_public_user_id
            and  r.public_ressource_id = p_public_ressource_id
            and r.ressource_nature = 'note';
    end;
    $$ language plpgsql;
