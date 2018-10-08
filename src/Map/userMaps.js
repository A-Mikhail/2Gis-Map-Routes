import React from 'react';
import Map from './index';

/**
 * Place here custom made maps
 */

export const WomenRun = () => (
  <>
    <h1 className="title"> Женский забег </h1>

    <div className="box">
      <article className="media">

        <div className="media-left">
          <Map
            name="womenRun"
            lat="43.23"
            long="76.88"
            zoom="11"
            className="map"
            mapPath="/map-routes/TestMap.json" // For the demo purpose path to the file inside the source folder
          />
        </div>

        <div className="media-content">
          <div className="content">
            <p>
              Дата проведения: 29 сентября 2018 года.
                  </p>
            <p>
              Место: Территория КЦДС Атакент
                  </p>

            <p>
              Дистанция: 8 км
                  </p>

            <p>
              Возрастные категории Забега:

              15-29, 30-39, 40-49, 50+
                  </p>

            <p>
              Время старта:
              Основной забег - 09.00.
                  </p>
          </div>
        </div>
      </article>
    </div>
  </>
);

export const HalfMarathon = () => (
  <>
    <h1 className="title"> Алматинский Полумарафон </h1>

    <div className="box">
      <article className="media">

        <div className="media-left">
          <Map
            name="HalfMarathon"
            lat="43.23"
            long="76.88"
            zoom="11"
            className="map"
            mapPath="/map-routes/TestMap_1.json" // For the demo purpose path to the file inside the source folder
          />
        </div>

        <div className="media-content">
          <div className="content">
            <p>
              Дата проведения: 14 октября 2018 года.
                  </p>
            <p>
              Место: г. Алматы,
                  </p>
            <p>
              Старт: Парк Первого Президента, по пр. Аль-Фараби.
                  </p>
            <p>
              Финиш: Центральный стадион, по пр. Абая.
                  </p>

            <p>
              Возрастные категории Полумарафона (21 км 97,5 м):
              18-34 года;
              35-49 лет;
              50-59 лет;
              60+ лет.
                  </p>

            <p>
              Возрастные категории забега на 10 км:
              15-34 года;
              35-49 лет;
              50-59 лет;
              60+ лет.
                  </p>

            <p>
              Время старта:
              08.10 - Старт дистанции 21 км
              08.15 - Старт дистанции 10 км
                  </p>

            <p>
              Лимит времени на прохождение дистанции 21 км – 3 часа 00 минут
                  </p>

            <p>
              Лимит времени на прохождение дистанции 10 км – 2 час 00 минут
                  </p>
          </div>
        </div>
      </article>
    </div>
  </>
);

export const AlmatyMarathon = () => (
  <>
    <h1 className="title"> Алматы Марафон </h1>

    <div className="box">
      <article className="media">

        <div className="media-left">
          <Map
            name="HalfMarathon"
            lat="43.23"
            long="76.88"
            zoom="11"
            className="map"
            mapPath="/map-routes/TestMap_1.json" // For the demo purpose path to the file inside the source folder
          />
        </div>

        <div className="media-content">
          <div className="content">
            <p>
              День и время соревнований: 21 апреля 2019 г., с 06:00 до 15:00.
                  </p>

            <p>
              Место проведения: г. Алматы, Площадь Республики
                  </p>

            <p>
              Возрастные категории Марафона 42 км 195 м:
              18-24 года;
              25-29 лет;
              30-39 лет;
              40-49 лет;
              50-59 лет;
              Старше 60 лет.
            </p>

            <p>
              Возрастные категории дистанции 21 км:
              Старше 18 лет.
                  </p>

            <p>
              Возрастные категории дистанции 10 км:
              15-17 лет;
              Старше 18 лет.
                  </p>

            <p>
              Возрастные категории детской дистанции 3 км:
              10-14 лет.
                  </p>
          </div>
        </div>
      </article>
    </div>
  </>
);

export const AdminPanel = () => (
  <>
    <h1 className="title"> Создание меток </h1>

    <div className="box">
      <article className="media">

        <div className="media-left">
          <Map
            name="adminMap"
            lat="43.23"
            long="76.88"
            zoom="11"
            className="map"
            admin
          />
        </div>

        <div className="media-content">
          <div className="content">
            <h1> Инструкции к использованию </h1>
            <p> 1. Жмякать (В демо работает только режим рисования, линии, полигоны и метки)</p>
            <p> 2. Сохранить карту </p>
            <p>
              3. Позвать разработчика
              <a className="button is-link" href="mailto:mikhail.adamenko@protonmail.com">( ͡~ ͜ʖ ͡°)</a>
            </p>
          </div>
        </div>
      </article>
    </div>
  </>
);
