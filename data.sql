create database realestate
use realestate


create table users
(
    id       int auto_increment
        primary key,
    username varchar(50)  not null,
    password varchar(255) not null,
    role     varchar(20)  null,
    constraint username
        unique (username)
);

create table properties
(
    id          int auto_increment
        primary key,
    title       varchar(100)               not null,
    description text                       null,
    price       float                      not null,
    location    varchar(200)               null,
    status      enum ('available', 'sold') not null,
    owner_id    int                        not null,
    created_at  datetime                   null,
    constraint properties_ibfk_1
        foreign key (owner_id) references users (id)
);

create table contracts
(
    id          int auto_increment
        primary key,
    property_id int                                        not null,
    seller_id   int                                        not null,
    buyer_id    int                                        not null,
    price       float                                      not null,
    status      enum ('pending', 'completed', 'cancelled') null,
    created_at  datetime                                   null,
    constraint contracts_ibfk_1
        foreign key (property_id) references properties (id),
    constraint contracts_ibfk_2
        foreign key (seller_id) references users (id),
    constraint contracts_ibfk_3
        foreign key (buyer_id) references users (id)
);

create index buyer_id
    on contracts (buyer_id);

create index property_id
    on contracts (property_id);

create index seller_id
    on contracts (seller_id);

create table favorites
(
    id          int auto_increment
        primary key,
    user_id     int      not null,
    property_id int      not null,
    created_at  datetime null,
    constraint favorites_ibfk_1
        foreign key (user_id) references users (id),
    constraint favorites_ibfk_2
        foreign key (property_id) references properties (id)
);

create index property_id
    on favorites (property_id);

create index user_id
    on favorites (user_id);

create index owner_id
    on properties (owner_id);

create table property_images
(
    id          int auto_increment
        primary key,
    property_id int          not null,
    image_url   varchar(255) not null,
    constraint property_images_ibfk_1
        foreign key (property_id) references properties (id)
);

create index property_id
    on property_images (property_id);

