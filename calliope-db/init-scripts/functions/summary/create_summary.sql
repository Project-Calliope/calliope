create or replace function create_summary(
    p_public_ressource_id uuid,
    p_public_user_id uuid,
    p_summary text
) returns uuid as
$$
declare
    v_private_ressource_id uuid;
    v_private_user_id uuid;
begin
    -- Récupérer l'ID privé de l'utilisateur
    select private_user_id
    into v_private_user_id
    from utilisateur
    where public_user_id = p_public_user_id;

    -- Vérifier si l'utilisateur existe
    if v_private_user_id is null then
        raise exception 'Utilisateur introuvable';
    end if;

    -- Récupérer l'id privé de la ressource
    select private_ressource_id
    into v_private_ressource_id
    from ressource
    where public_ressource_id = p_public_ressource_id
    and ressource_nature = 'note'
    and private_user_id = v_private_user_id;

    -- Vérifier que la ressource existe
    if v_private_ressource_id is null then
        raise exception 'Ressource invalide';
    end if;

    -- Ajout du résumé
    insert into summary (private_ressource_id, summary)
    values (v_private_ressource_id, p_summary);

    return p_public_ressource_id;


end;
$$ language plpgsql;