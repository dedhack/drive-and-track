CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY (id)
)