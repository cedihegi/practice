CREATE TABLE role_assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    group_id INTEGER REFERENCES groups(id),
    role TEXT NOT NULL

    CHECK (
        (user_id IS NOT NULL AND group_id IS NULL) OR
        (user_id IS NULL and group_id IS NOT NULL)
    )
)
