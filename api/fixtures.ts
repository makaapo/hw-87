import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (e) {
    console.log('Skipping drop...');
  }
  const [user1, user2] = await User.create(
    {
      username: 'abdumalik',
      password: '221096',
      token: crypto.randomUUID(),
    },
    {
      username: 'makapo',
      password: '12345',
      token: crypto.randomUUID(),
    },
  );

  const [post1, post2, post3, post4] = await Post.create(
    {
      user: user1,
      title: 'Мопедам и самокатам могут запретить ездить по улицам Бишкека. Вы поддерживаете?',
      description:
        'В Жогорку Кенеше предложили временно запретить в столице мопеды и самокаты до создания соответствующей инфраструктуры для их передвижения.\n' +
        '\n' +
        '«На тротуаре они сбивают пешеходов, на дороге сталкиваются с машинами. Мэрия могла бы внести временные ограничения до решения этой проблемы», — сказал депутат Чынгыз Ажибаев.',
      image: 'fixtures/samokat.jpg',
      datetime: new Date().toISOString(),
    },
    {
      user: user1,
      title: 'По игре Atomic Heart выйдет сериал',
      description:
        'СЕРИАЛ ПО ATOMIC HEART! Съёмки начнутся в 2025 году, а сюжет расскажет новую историю — не будет повторять игру\n',
      image: 'fixtures/atomic.jpg',
      datetime: new Date().toISOString(),
    },
    {
      user: user2,
      title:
        'В Дубае хотят открыть воздушное такси',
      description:
        "НАЗЕМНОЕ ТАКСИ — ПРОШЛЫЙ ВЕК! В ОАЭ готовятся запустить воздушное такси в 2026 году ✈️ \n" +
        "\n" +
        "Цена вопроса пока неизвестна, но до места назначения вас докинут за 10–12 минут, а не за 45 минут\n",
      datetime: new Date().toISOString(),
    },
    {
      user: user2,
      title:
        'Дарит от души дорогие подарки, потом удаленно их отключает, Илон разве так делается?',
      description:
        'ИЛОН МАСК ОТКЛЮЧИЛ CYBERTRUCK РАМЗАНА КАДЫРОВА! Глава Чечни заявил, что электропикап от Tesla перестал работать',
      datetime: new Date().toISOString(),
    },
  );

  await Comment.create(
    {
      user: user1,
      post: post3,
      text: 'имба',
    },
    {
      user: user1,
      post: post4,
      text: "туда дона",
    },
    {
      user: user2,
      post: post3,
      text: 'страшно, я лучше старыми методами доберусь',
    },
    {
      user: user2,
      post: post1,
      text: 'как они мне надоели',
    },
    {
      user: user2,
      post: post4,
      text: ' хахахххаххахахах ору',
    },
    {
      user: user2,
      post: post2,
      text: 'надеюсь близняшек добавят',
    },
    {
      user: user1,
      post: post2,
      text: 'дерьмо же игра?',
    },
  );
  await db.close();
};

void run();