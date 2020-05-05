create table product_categories_category
(
    productId  varchar(36) not null,
    categoryId varchar(36) not null,
    primary key (productId, categoryId),
    constraint FK_15520e638eb4c46c4fb2c61c4b4
        foreign key (categoryId) references category (id)
            on delete cascade,
    constraint FK_342d06dd0583aafc156e0763790
        foreign key (productId) references product (id)
            on delete cascade
);

create index IDX_15520e638eb4c46c4fb2c61c4b
    on product_categories_category (categoryId);

create index IDX_342d06dd0583aafc156e076379
    on product_categories_category (productId);

INSERT INTO au.product_categories_category (productId, categoryId) VALUES ('12dcd099-8bfd-11ea-90f6-0242ac120002', '497f723a-8d58-11ea-90f6-0242ac120002');
INSERT INTO au.product_categories_category (productId, categoryId) VALUES ('2c4a7614-8b38-11ea-90f6-0242ac120002', '3fe1e4f8-8d58-11ea-90f6-0242ac120002');
INSERT INTO au.product_categories_category (productId, categoryId) VALUES ('30d0fcf6-8bfd-11ea-90f6-0242ac120002', '3fe1e4f8-8d58-11ea-90f6-0242ac120002');
INSERT INTO au.product_categories_category (productId, categoryId) VALUES ('30d0fcf6-8bfd-11ea-90f6-0242ac120002', '91851bfa-8d57-11ea-90f6-0242ac120002');
INSERT INTO au.product_categories_category (productId, categoryId) VALUES ('a776fc16-8b2c-11ea-90f6-0242ac120002', '3fe1e4f8-8d58-11ea-90f6-0242ac120002');
INSERT INTO au.product_categories_category (productId, categoryId) VALUES ('a776fc16-8b2c-11ea-90f6-0242ac120002', '497f723a-8d58-11ea-90f6-0242ac120002');