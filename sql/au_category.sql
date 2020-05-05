create table category
(
    id          varchar(36)                              not null
        primary key,
    createdDate datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updatedDate datetime(6) default CURRENT_TIMESTAMP(6) not null,
    name        varchar(255)                             not null
);

INSERT INTO au.category (id, createdDate, updatedDate, name) VALUES ('3fe1e4f8-8d58-11ea-90f6-0242ac120002', '2020-05-03 16:08:09.359546000', '2020-05-03 16:08:09.359546000', 'Medium');
INSERT INTO au.category (id, createdDate, updatedDate, name) VALUES ('497f723a-8d58-11ea-90f6-0242ac120002', '2020-05-03 16:08:20.402676000', '2020-05-03 16:08:20.402676000', 'Medium-Low');
INSERT INTO au.category (id, createdDate, updatedDate, name) VALUES ('91851bfa-8d57-11ea-90f6-0242ac120002', '2020-05-03 16:07:53.273562000', '2020-05-03 16:07:53.273562000', 'Medium-High');