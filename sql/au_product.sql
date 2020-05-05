create table product
(
    id          varchar(36)                              not null
        primary key,
    createdDate datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updatedDate datetime(6) default CURRENT_TIMESTAMP(6) not null,
    quantity    int                                      not null,
    name        varchar(100)                             not null,
    price       double                                   not null,
    rating      double                                   not null
);

INSERT INTO au.product (id, createdDate, updatedDate, quantity, name, price, rating) VALUES ('12dcd099-8bfd-11ea-90f6-0242ac120002', '2020-05-01 22:43:12.095909000', '2020-05-01 22:43:12.095909000', 0, 'Sold Out', 99.99, 2.8);
INSERT INTO au.product (id, createdDate, updatedDate, quantity, name, price, rating) VALUES ('2c4a7614-8b38-11ea-90f6-0242ac120002', '2020-04-30 23:13:43.300703000', '2020-05-04 19:50:14', 5, 'Better', 18.91, 4.92);
INSERT INTO au.product (id, createdDate, updatedDate, quantity, name, price, rating) VALUES ('30d0fcf6-8bfd-11ea-90f6-0242ac120002', '2020-05-01 22:44:01.272860000', '2020-05-04 19:50:14', 12, 'Best', 35.26, 5);
INSERT INTO au.product (id, createdDate, updatedDate, quantity, name, price, rating) VALUES ('a776fc16-8b2c-11ea-90f6-0242ac120002', '2020-04-30 21:53:49.427470000', '2020-05-04 19:50:14', 8, 'Good', 10.52, 4.68);