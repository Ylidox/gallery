create table author(
    id serial primary key,
    name text not null,
    login varchar(12) not null,
    password varchar(10) not null,
    path_logo varchar(50),
    description text
)

create table image(
    id serial primary key,
    name varchar(20) not null,
    path_image varchar(50),
    description text,
    date timestamp,
    author_id int references public.author(id)
)

insert into author(
    name,
    login,
    password,
    path_logo,
    description
) 
values
(
    'Исаак Ильич Левитан',
    'levitan',
    'levitan',
    'pictures/levitan/levitan.jpeg',
    'Русский живописец и рисовальщик еврейского происхождения, один из крупнейших и наиболее плодовитых мастеров реалистического пейзажа второй половины XIX века.'
),
(
    'Клод Моне',
    'monet',
    'monet',
    'pictures/monet/Cl_Monet.jpg',
    'Французский живописец, один из основателей импрессионизма.'
),
(
    'Иван Константинович Айвазовский',
    'aivazovsky',
    'aivazovsky',
    'pictures/aivazovsky/ivan_aivazovskiy.jpg',
    'Русский живописец-маринист армянского происхождения, коллекционер, меценат.'
);

insert into image(
    name,
    path_image,
    date,
    description,
    author_id
)
values
(
    'Буря над Евпаторией',
    'pictures/aivazovsky/bur_nad_evp.jpg',
    '1-1-1861',
    'Одно из многих произведений художника.',
    1
),
(
    'Радуга',
    'pictures/aivazovsky/raduga.jpg',
    '1-1-1873',
    'Полотно было написано в 1873 году и стало новым этапом в творчестве живописца.',
    1
),
(
    'Чесменский бой',
    'pictures/aivazovsky/battle.jpg',
    '25-06-1870',
    'Полотно заслужено называют одной из самых ярких и известных работ величайшего художника-мариниста среди тех, которые относятся к раннему периоду его творчества.',
    1
),
(
    'Девятый вал',
    'pictures/aivazovsky/9_val.jpg',
    '1-1-1850',
    'Одна из самых знаменитых картин русского художника-мариниста Ивана Айвазовского',
    1
);


insert into image(
    name,
    path_image,
    date,
    description,
    author_id
)
values
(
    'Золотая осень',
    'pictures/levitan/gold_aut.jpg',
    '1-1-1895',
    'Появившаяся в период творческой зрелости Исаака Левитана, эта картина характеризует его как тонкого лирика и пейзажиста настроения.',
    2
),
(
    'Озеро',
    'pictures/levitan/ozero.JPG',
    '1-01-1890',
    'Картина русского художника Исаака Левитана, над которой он работал в 1899—1900 годах.',
    2
),
(
    'У омута',
    'pictures/levitan/u_omuta.jpeg',
    '1-1-1892',
    'Пейзаж «У омута» входит в знаменитую левитановкую «мрачную трилогию» вместе с картинами «Владимирка» и «Над вечным покоем».',
    2
);

insert into image(
    name,
    path_image,
    date,
    description,
    author_id
)
values
(
    'Водяные лилии',
    'pictures/monet/vod_lilii.jpg',
    '1-1-1920',
    'Многие картины Клода Моне с водяными лилиями. Серия Водяные лилии Клода Моне стала очень важным моментом в его карьере и включала огромное количество картин и рисунков из сада художника.',
    3
),
(
    'Озеро',
    'pictures/monet/vokzal_sen_lazar.jpg',
    '1-01-1877',
    'Паровозы на этих картинах Моне выглядят не как монстры, а, можно сказать, грациозно, хотя всех в то время захватывало ощущение силы, мощи и скорости этих исполинских машин. ',
    3
),
(
    'Хризантемы',
    'pictures/monet/xrizantemi.jpg',
    '1-1-1878',
    'Хрупкая нежная пестрота хризантем настолько притягательная и реальна, что хочется протянуть руку, чтобы прикоснуться к цветам. ',
    3
);