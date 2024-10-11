// keystatic.config.ts
import { config, fields, singleton } from "@keystatic/core";
const isDev = import.meta.env.DEV;
export default config({
  storage: { kind: isDev ? "local" : "cloud" },
  cloud: { project: "tt-admin/info-tt" },
  singletons: {
    hero: singleton({
      label: "Главный экран",
      path: "src/data/home/hero",
      schema: {
        title: fields.text({ label: "Заголовок " }),
        text: fields.text({ label: "Подзаголовок ", multiline: true }),
        image: fields.image({
          label: "Фоновое изображение",
          directory: "src/assets/images",
          publicPath: "@assets/images/",
        }),
        tags: fields.array(fields.text({ label: "Список пунктов в белой плашке" }), {
          label: "Пункты в белой плашке",
          itemLabel: (props) => props.value,
        }),

        blocks: fields.array(fields.text({ label: "Текст в блоке" }), {
          label: "Блоки снизу",
          itemLabel: (props) => props.value,
        }),
      },
    }),
    problems: singleton({
      label: "С какими проблемами мы поможем?",
      path: "src/data/home/problems",
      schema: {
        title: fields.text({ label: "Заголовок " }),
        imageText: fields.text({ label: "Текст в зображении ", multiline: true }),
        image: fields.image({
          label: "Фоновое изображение",
          directory: "src/assets/images",
          publicPath: "@assets/images/",
        }),
        tags: fields.array(fields.text({ label: "Список пунктов в белой плашке" }), {
          label: "Пункты в белой плашке",
          itemLabel: (props) => props.value,
        }),
      },
    }),
    process: singleton({
      label: "Процесс Работы",
      path: "src/data/home/process",
      schema: {
        title: fields.text({ label: "Заголовок" }),
        leftBlock: fields.object(
          {
            image: fields.image({
              label: "Изображение",
              directory: "src/assets/images/process",
              publicPath: "@assets/images/process/",
            }),
            text: fields.text({ label: "Текст под изображением", multiline: true }),
          },
          { label: "Секция слева" },
        ),
        rightBlock: fields.object(
          {
            process: fields.array(
              fields.object({
                title: fields.text({ label: "Заголовок" }),
                text: fields.text({ label: "Текст", multiline: true }),
                image: fields.image({
                  label: "Изображение",
                  directory: "src/assets/images/process/",
                  publicPath: "@assets/images/process",
                }),
              }),
              {
                label: "Список процесса работы",
                itemLabel: (props) => props.fields.title.value,
              },
            ),
            result: fields.text({ label: "Результат", multiline: true }),
          },
          { label: "Процесс" },
        ),
      },
    }),
    callform: singleton({
      label: "Форма заказа",
      path: "src/data/home/call",
      schema: {
        title: fields.text({ label: "Заголовок " }),
        description: fields.text({ label: "Описание ", multiline: true }),
      },
    }),
    benefits: singleton({
      label: "Возможности",
      path: "src/data/home/benefits",
      schema: {
        title: fields.text({ label: "Заголовок " }),
        items: fields.array(
          fields.object({
            title: fields.text({ label: "Заголовок" }),
            description: fields.text({ label: "Описание", multiline: true }),
            image: fields.image({ label: "Изображение", directory: "src/assets/images", publicPath: "@assets/images/" }),
          }),
          {
            label: "Карточки",
            itemLabel: (props) => props.fields.title.value,
          },
        ),
      },
    }),
    delivery: singleton({
      label: "Доставка",
      path: "src/data/home/delivery",
      schema: {
        title: fields.text({ label: "Заголовок" }),
        subtitle: fields.text({ label: "Подзаголовок" }),
      },
    }),
    reviews: singleton({
      label: "Отзывы",
      path: "src/data/home/reviews",
      schema: {
        title: fields.text({ label: "Заголовок" }),
        reviews: fields.array(fields.image({ label: "Добавить отзыв", directory: "src/assets/images", publicPath: "@assets/images/" }), {
          label: "Отзывы",
        }),
      },
    }),
    sale: singleton({
      label: "Акция",
      path: "src/data/home/sale",
      schema: {
        title: fields.text({ label: "Заголовок" }),
        description: fields.text({ label: "Описание", multiline: true }),
        saleFor: fields.text({ label: "Дата" }),
      },
    }),
    contacts: singleton({
      label: "Общая настройка",
      path: "src/data/home/settings",
      schema: {
        phones: fields.object(
          {
            currentUsers: fields.text({ label: "Для существующих клиентов" }),
            newUsers: fields.text({ label: "Для новых клиентов" }),
          },
          {
            label: "Телефоны",
            layout: [6, 6],
          },
        ),
        socials: fields.object(
          {
            telegram: fields.url({ label: "Telegram" }),
            whatsapp: fields.url({ label: "WhatsApp" }),
          },
          {
            label: "Социальные сети",
            layout: [6, 6],
          },
        ),
      },
    }),
  },
});
