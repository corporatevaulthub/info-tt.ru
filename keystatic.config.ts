// keystatic.config.ts
import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: "tt-admin/info-tt",
  },
  collections: {
    hero: collection({
      label: "Главный экран",
      slugField: "title",
      path: "src/content/hero/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        text: fields.text({ label: "Подзаголовок ", multiline: true }),
        tags: fields.array(fields.text({ label: "Список пунктов в белой плашке" }), {
          label: "Пункты в белой плашке",
          itemLabel: (props) => props.value,
        }),

        blocks: fields.array(fields.text({ label: "Текст в блоке" }), {
          label: "Блоки снизу",
          itemLabel: (props) => props.value,
        }),

        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    cooperations: collection({
      label: "Сотрудничество",
      slugField: "title",
      path: "src/content/cooperations/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        complexArray: fields.array(
          fields.object({
            title: fields.text({ label: "Заголовок" }),
            description: fields.text({ label: "Описание", multiline: true }),
            lists: fields.array(fields.text({ label: "Добавить пункт" }), {
              label: "Пункты меню",
              itemLabel: (props) => props.value ?? "Select a project",
            }),
            image: fields.image({ label: "Изображение", directory: "src/assets/", publicPath: "" }),
          }),
          {
            label: "Карточки",
            itemLabel: (props) => props.fields.title.value,
          },
        ),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    sale: collection({
      label: "Акция",
      slugField: "title",
      path: "src/content/sale/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        saleFor: fields.text({ label: "Текст под контейнером " }),
        saleDate: fields.text({ label: "Дата акции" }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    benefits: collection({
      label: "Возможности",
      slugField: "title",
      path: "src/content/benefits/*",
      format: { contentField: "" },
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        complexArray: fields.array(
          fields.object({
            title: fields.text({ label: "Заголовок" }),
            description: fields.text({ label: "Описание", multiline: true }),
            icon: fields.text({ label: "Иконка" }),
            image: fields.image({ label: "Изображение", directory: "src/assets/", publicPath: "" }),
          }),
          {
            label: "Карточки",
            itemLabel: (props) => props.fields.title.value,
          },
        ),
      },
    }),
    delivery: collection({
      label: "Доставка",
      slugField: "title",
      path: "src/content/delivery/*",
      format: { contentField: "" },
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        subtitle: fields.text({ label: "Подзаголовок" }),
        image: fields.image({ label: "Изображение документа", directory: "src/assets/", publicPath: "" }),
        number: fields.text({ label: "Номер в реестре" }),
      },
    }),
    company: collection({
      label: "О компании",
      slugField: "title",
      path: "src/content/company/*",
      format: { contentField: "" },
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        experience: fields.text({ label: "Опыт работы" }),
        orders: fields.text({ label: "Успешных заказов" }),
        content: fields.text({ label: "Описание", multiline: true }),
      },
    }),
    reviews: collection({
      label: "Отзывы",
      slugField: "title",
      path: "src/content/reviews/*",
      format: { contentField: "" },
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        reviews: fields.array(fields.image({ label: "Добавить отзыв", directory: "src/assets/", publicPath: "" }), {
          label: "Отзывы",
        }),
      },
    }),
    contacts: collection({
      label: "Контакты",
      slugField: "title",
      path: "src/content/contacts/*",
      format: { contentField: "" },
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        subtitle: fields.text({ label: "Подзаголовок" }),
        tg: fields.url({ label: "Telegram URL",}),
        whatsapp: fields.url({ label: "WhatsApp URL",}),
      },
    }),
  },
});
