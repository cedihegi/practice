INSERT INTO users (id, username, password_hash)
VALUES (1, 'admin', '$argon2id$v=19$m=19456,t=2,p=1$R1Jg4C99x3gec8Rm3H7DgA$jE1mDJSssB8gqOH1nMHg8a6NLvFk1w7IDgXJyZZDhIU');

INSERT INTO role_assignments (id, user_id, role)
VALUES (1, 1, 'admin');
