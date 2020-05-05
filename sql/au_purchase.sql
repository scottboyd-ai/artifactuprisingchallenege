create table purchase
(
    id          varchar(36)                              not null
        primary key,
    createdDate datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updatedDate datetime(6) default CURRENT_TIMESTAMP(6) not null,
    total       double                                   not null
);

INSERT INTO au.purchase (id, createdDate, updatedDate, total) VALUES ('7b1dc6ac-8e39-455b-ba85-3f7ac14ce151', '2020-05-04 19:50:14.877870000', '2020-05-04 19:50:14.877870000', 110.47);
INSERT INTO au.purchase (id, createdDate, updatedDate, total) VALUES ('7c89ee10-10b0-4719-973d-7c1209e4b8a7', '2020-05-02 16:38:20.369698000', '2020-05-02 16:38:20.369698000', 0);
INSERT INTO au.purchase (id, createdDate, updatedDate, total) VALUES ('a1e37668-2ab3-464c-b1f6-015f7f6a0fdd', '2020-05-04 14:30:02.358214000', '2020-05-04 14:30:02.358214000', 230.47);