// src/seeds/seed.ts
import { DataSource } from 'typeorm';
import { Food } from '../food/food.entity';
import { Participants } from '../participants/participants.entity';
import { Preference } from '../preference/preference.entity';
import { Room } from '../room/room.entity';
import { config } from 'dotenv';
config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Food, Preference, Participants, Room],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const foodRepo = AppDataSource.getRepository(Food);

  const dummyFoods = [
    {
      name: '김치찌개',
      description: '매콤한 김치와 돼지고기를 넣어 푹 끓인 한국 전통 찌개',
      img_url: 'https://example.com/kimchi_jjigae.jpg',
    },
    {
      name: '된장찌개',
      description: '구수한 된장에 두부와 채소를 넣어 끓인 한국식 찌개',
      img_url: 'https://example.com/doenjang_jjigae.jpg',
    },
    {
      name: '비빔밥',
      description:
        '여러 가지 나물과 고추장, 계란을 밥에 비벼 먹는 한 그릇 요리',
      img_url: 'https://example.com/bibimbap.jpg',
    },
    {
      name: '불고기',
      description:
        '달콤짭짤한 양념에 재운 얇게 썬 소고기를 구워 먹는 한국식 고기 요리',
      img_url: 'https://example.com/bulgogi.jpg',
    },
    {
      name: '잡채',
      description: '당면과 채소, 고기를 간장 양념으로 볶아낸 반찬 겸 면 요리',
      img_url: 'https://example.com/japchae.jpg',
    },
    {
      name: '삼겹살',
      description:
        '두툼한 돼지고기 삼겹 부위를 구워 쌈과 함께 즐기는 고기 요리',
      img_url: 'https://example.com/samgyeopsal.jpg',
    },
    {
      name: '순두부찌개',
      description: '부드러운 순두부와 해산물, 고추기름을 넣어 끓인 얼큰한 찌개',
      img_url: 'https://example.com/soondubu_jjigae.jpg',
    },
    {
      name: '갈비탕',
      description: '소갈비와 무를 넣어 맑게 끓여낸 담백한 국물 요리',
      img_url: 'https://example.com/galbitang.jpg',
    },
    {
      name: '냉면',
      description:
        '차가운 육수에 메밀면 또는 소면을 말아 시원하게 먹는 면 요리',
      img_url: 'https://example.com/naengmyeon.jpg',
    },
    {
      name: '떡볶이',
      description: '가래떡과 어묵을 고추장 양념에 매콤하게 볶아낸 길거리 음식',
      img_url: 'https://example.com/tteokbokki.jpg',
    },
    {
      name: '마파두부',
      description:
        '부드러운 두부와 매콤한 고추기름, 다진 돼지고기를 넣어 만든 중국 쓰촨식 요리',
      img_url: 'https://example.com/mapo_tofu.jpg',
    },
    {
      name: '탕수육',
      description:
        '바삭하게 튀긴 돼지고기를 달콤새콤한 소스에 버무린 중국식 요리',
      img_url: 'https://example.com/tangsuyuk.jpg',
    },
    {
      name: '유린기',
      description: '튀긴 닭고기를 매콤새콤한 소스에 버무린 중국 광둥식 요리',
      img_url: 'https://example.com/yuringi.jpg',
    },
    {
      name: '깐풍기',
      description: '매콤달콤한 간장소스로 볶아내 바삭한 닭튀김 요리',
      img_url: 'https://example.com/kanpunggi.jpg',
    },
    {
      name: '짜장면',
      description:
        '춘장 소스로 볶은 돼지고기와 채소를 얹어 먹는 중화풍 면 요리',
      img_url: 'https://example.com/jjajangmyeon.jpg',
    },
    {
      name: '짬뽕',
      description:
        '매운 해산물 육수에 각종 해산물과 야채를 넣어 끓인 중화풍 면 요리',
      img_url: 'https://example.com/jjamppong.jpg',
    },
    {
      name: '스시',
      description: '식초 밥 위에 생선이나 해산물을 얹어 만든 일본 전통 초밥',
      img_url: 'https://example.com/sushi.jpg',
    },
    {
      name: '연어 사시미',
      description:
        '신선한 연어를 얇게 썰어 간장과 와사비와 함께 즐기는 일본식 회',
      img_url: 'https://example.com/salmon_sashimi.jpg',
    },
    {
      name: '돈카츠',
      description:
        '두툼한 돼지고기 커틀릿을 빵가루로 튀겨 소스와 함께 즐기는 일본식 요리',
      img_url: 'https://example.com/tonkatsu.jpg',
    },
    {
      name: '라멘',
      description: '진한 육수와 쫄깃한 면발, 차슈와 계란을 곁들인 일본식 국수',
      img_url: 'https://example.com/ramen.jpg',
    },
    {
      name: '우동',
      description:
        '쫄깃한 굵은 면발을 맑은 육수에 말아 간단하게 즐기는 일본식 국수',
      img_url: 'https://example.com/udon.jpg',
    },
    {
      name: '스테이크',
      description:
        '두툼한 소고기를 원하는 굽기로 구워 소스와 함께 즐기는 서양식 메인 요리',
      img_url: 'https://example.com/steak.jpg',
    },
    {
      name: '카르보나라 파스타',
      description:
        '크림과 베이컨, 치즈를 섞어 만든 부드러운 이탈리아식 크림 파스타',
      img_url: 'https://example.com/carbonara.jpg',
    },
    {
      name: '마르게리타 피자',
      description:
        '토마토 소스, 모짜렐라 치즈, 바질을 올린 간단한 이탈리아 정통 피자',
      img_url: 'https://example.com/margherita.jpg',
    },
    {
      name: '치즈버거',
      description: '패티와 치즈, 채소를 번 사이에 끼워 만든 미국식 햄버거',
      img_url: 'https://example.com/cheeseburger.jpg',
    },
    {
      name: '타코',
      description:
        '옥수수 토르티야에 고기와 채소, 살사를 올려 먹는 멕시코식 요리',
      img_url: 'https://example.com/taco.jpg',
    },
    {
      name: '버터 치킨',
      description: '토마토 크림 소스에 부드러운 닭고기를 넣어 만든 인도식 커리',
      img_url: 'https://example.com/butter_chicken.jpg',
    },
    {
      name: '팟타이',
      description:
        '쌀국수에 새우와 두부, 땅콩, 숙주를 넣고 달콤새콤하게 볶아낸 태국식 면 요리',
      img_url: 'https://example.com/pad_thai.jpg',
    },
    {
      name: '연어 스테이크',
      description: '연어를 구워 레몬 버터 소스와 함께 즐기는 해산물 요리',
      img_url: 'https://example.com/salmon_steak.jpg',
    },
    {
      name: '가리비 버터구이',
      description: '가리비를 버터와 마늘로 구워 풍미를 살린 해산물 요리',
      img_url: 'https://example.com/scallop_butter.jpg',
    },
  ];

  await foodRepo.save(dummyFoods);

  console.log('음식 데이터 삽입 완료!');
  process.exit();
}

seed();
