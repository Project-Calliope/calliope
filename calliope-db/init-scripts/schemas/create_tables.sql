CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE UTILISATEUR (
    private_user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_user_id UUID DEFAULT gen_random_uuid() NOT NULL,
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    encrypted_password VARCHAR NOT NULL
);

CREATE TABLE RESSOURCE
(
    private_ressource_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_ressource_id  UUID NOT NULL DEFAULT gen_random_uuid(),
    ressource_nature VARCHAR NOT NULL CHECK (ressource_nature IN ('note', 'dossier' )),
    ressource_name VARCHAR(25) NOT NULL,
    private_user_id UUID NOT NULL,
    FOREIGN KEY (private_user_id) REFERENCES UTILISATEUR(private_user_id) ON DELETE CASCADE
);

CREATE TABLE ROOT_RESSOURCE
(
    private_ressource_id UUID PRIMARY KEY NOT NULL,
    FOREIGN KEY (private_ressource_id) REFERENCES RESSOURCE(private_ressource_id)
);

CREATE TABLE CHILD_RESSOURCE
(
    private_child_ressource_id UUID NOT NULL,
    private_father_ressource_id UUID NOT NULL,
    PRIMARY KEY (private_child_ressource_id, private_father_ressource_id),
    FOREIGN KEY (private_father_ressource_id) REFERENCES RESSOURCE(private_ressource_id),
    FOREIGN KEY (private_child_ressource_id) REFERENCES RESSOURCE(private_ressource_id)
);

CREATE TABLE CONTENT
(
    private_ressource_id UUID PRIMARY KEY NOT NULL,
    content VARCHAR,
    FOREIGN KEY (private_ressource_id) REFERENCES RESSOURCE(private_ressource_id)
);

CREATE TABLE TRANSCRIPT
(
    private_transcript_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_transcript_id UUID DEFAULT gen_random_uuid(),
    audioName VARCHAR NOT NULL,
    audioSize REAL NOT NULL,
    content VARCHAR NOT NULL
);

CREATE TABLE IS_TRANSCRIPT_OF
(
    private_transcript_id UUID NOT NULL,
    private_ressource_id  UUID NOT NULL,
    PRIMARY KEY (private_transcript_id, private_ressource_id),
    FOREIGN KEY (private_ressource_id) REFERENCES RESSOURCE (private_ressource_id),
    FOREIGN KEY (private_transcript_id) REFERENCES TRANSCRIPT (private_transcript_id)
);

CREATE TABLE API_AUTHORIZATION
(
    private_user_id UUID PRIMARY KEY NOT NULL,
    expirationDate DATE,
    callLimit INT CHECK ( callLimit >= 0 ),
    FOREIGN KEY (private_user_id) REFERENCES UTILISATEUR(private_user_id)
);
