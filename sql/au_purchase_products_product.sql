create table purchase_products_product
(
    purchaseId varchar(36) not null,
    productId  varchar(36) not null,
    primary key (purchaseId, productId),
    constraint FK_60f37c2b142964ed7e6c38c32cf
        foreign key (purchaseId) references purchase (id)
            on delete cascade,
    constraint FK_6cdd70374e621d22a3f466eb7ae
        foreign key (productId) references product (id)
            on delete cascade
);

create index IDX_60f37c2b142964ed7e6c38c32c
    on purchase_products_product (purchaseId);

create index IDX_6cdd70374e621d22a3f466eb7a
    on purchase_products_product (productId);

INSERT INTO au.purchase_products_product (purchaseId, productId) VALUES ('7b1dc6ac-8e39-455b-ba85-3f7ac14ce151', '2c4a7614-8b38-11ea-90f6-0242ac120002');
INSERT INTO au.purchase_products_product (purchaseId, productId) VALUES ('7b1dc6ac-8e39-455b-ba85-3f7ac14ce151', '30d0fcf6-8bfd-11ea-90f6-0242ac120002');
INSERT INTO au.purchase_products_product (purchaseId, productId) VALUES ('7b1dc6ac-8e39-455b-ba85-3f7ac14ce151', 'a776fc16-8b2c-11ea-90f6-0242ac120002');
INSERT INTO au.purchase_products_product (purchaseId, productId) VALUES ('7c89ee10-10b0-4719-973d-7c1209e4b8a7', '2c4a7614-8b38-11ea-90f6-0242ac120002');
INSERT INTO au.purchase_products_product (purchaseId, productId) VALUES ('7c89ee10-10b0-4719-973d-7c1209e4b8a7', '30d0fcf6-8bfd-11ea-90f6-0242ac120002');
INSERT INTO au.purchase_products_product (purchaseId, productId) VALUES ('7c89ee10-10b0-4719-973d-7c1209e4b8a7', 'a776fc16-8b2c-11ea-90f6-0242ac120002');
INSERT INTO au.purchase_products_product (purchaseId, productId) VALUES ('a1e37668-2ab3-464c-b1f6-015f7f6a0fdd', '2c4a7614-8b38-11ea-90f6-0242ac120002');
INSERT INTO au.purchase_products_product (purchaseId, productId) VALUES ('a1e37668-2ab3-464c-b1f6-015f7f6a0fdd', '30d0fcf6-8bfd-11ea-90f6-0242ac120002');