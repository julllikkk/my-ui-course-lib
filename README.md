# UI Course Library

React + TypeScript + vanilla-extract. Компоненты `Button`, `Tag` и `Calendar`.

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

На главной странице — шесть синхронизированных календарей: ru-RU, en-US и ar-EG в светлой и тёмной темах. Можно задать границы выбора, отключить выходные и сбросить дату. Внизу находятся состояния дней и предыдущие примеры Button.

## Calendar

```tsx
import { useState } from 'react';
import { Calendar } from './src/components/Calendar';
import { ThemeProvider } from './src/ThemeContext';
import { LocaleContext, arEG } from './src/locale';

export function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <ThemeProvider theme="light">
      <LocaleContext.Provider value={arEG}>
        <div dir={arEG.dir}>
          <Calendar value={date} onValueChange={setDate} />
        </div>
      </LocaleContext.Provider>
    </ThemeProvider>
  );
}
```

| Проп | Тип | Поведение |
| --- | --- | --- |
| `value` | `Date \| null` | Выбранная дата, управляется родителем |
| `onValueChange` | `(date: Date) => void` | Выбор доступного дня или нажатие «Сегодня» |
| `month` | `Date` | Необязательный управляемый показанный месяц |
| `onMonthChange` | `(month: Date) => void` | Запрос смены месяца, первое число в локальном времени |
| `minDate`, `maxDate` | `Date` | Включительные границы; время суток игнорируется |
| `isDateDisabled` | `(date: Date) => boolean` | Дополнительные недоступные дни |
| `autoFocus` | `boolean` | Фокус на дне при монтировании |

Без `month` календарь сам хранит показанный месяц, начиная с `value` или текущей даты с учётом границ. С `month` родитель должен обновлять его через `onMonthChange`. Листание не меняет `value`; «Сегодня» выбирает текущую дату и запрашивает её месяц. Ограничения действуют и на кнопку «Сегодня». Сброс выбора выполняет родитель, передавая `null`.

Все даты — локальные календарные дни. Арифметика не использует UTC и фиксированные интервалы в миллисекундах. Дни соседних месяцев остаются пустыми ячейками.

## Локали и клавиатура

`LocaleContext` и `useLocale` находятся в `src/locale.ts`. По умолчанию используется `ruRU`; доступны также `enUS` и `arEG`. Месяцы, дни недели, цифры и выбранная дата форматируются через `Intl`.

| Локаль | Начало недели | Выходные | Направление |
| --- | --- | --- | --- |
| ru-RU | Понедельник | Суббота, воскресенье | LTR |
| en-US | Воскресенье | Суббота, воскресенье | LTR |
| ar-EG | Суббота | Пятница, суббота | RTL |

- `Tab` — вход в сетку с одной точкой табуляции.
- `←` / `→` — соседний день; в RTL направления меняются.
- `↑` / `↓` — минус / плюс неделя.
- `Home` / `End` — начало / конец недели с учётом локали.
- `Page Up` / `Page Down` — предыдущий / следующий месяц.
- `Shift + Page Up` / `Shift + Page Down` — предыдущий / следующий год.
- `Enter` / `Space` — выбор даты.

Недоступные дни можно прочитать с клавиатуры, но выбрать нельзя. Если доступных дней нет, фокусируется сетка. Сегодня отмечено точкой и `aria-current="date"`; выбор — `aria-selected` на ячейке. Направление задаётся и на самом календаре, поэтому отдельный внешний `dir` необязателен.

## Темы

`ThemeProvider` поддерживает `theme="light" | "dark"` и необязательный `tokens`. Все цвета и размеры Calendar определены в `src/Theme/theme.css.ts`. Вложенная светлая тема восстанавливает светлые токены внутри тёмной. React-контекст темы и хук `useTheme` экспортируются из `src/Theme/theme-context.ts`.

Прежний компонент `<ThemeContext tokens={...}>` из `src/Theme/ThemeContext.tsx` сохранён для совместимости с предыдущей домашней работой:

```tsx
<ThemeProvider theme="dark" tokens={{ calendarPadding: '24px' }}>
  <Calendar value={date} onValueChange={setDate} />
</ThemeProvider>
```

`Button` принимает `icon`. Иконка размещается в начале строки с `padding-inline-start: 12px` и `padding-inline-end: 16px`; RTL меняет расположение автоматически.

## Проверки

Vitest + Testing Library проверяют управление значением и месяцем, выбор мышью и клавиатурой, переходы между месяцами и годами, високосные даты, ограничения, локали, RTL, кнопку «Сегодня», автофокус и вложенные темы.

[Задание](https://gist.github.com/sashachabin/6943d3d14a7ee4dc5fb7bf8e40b4a83b) · [Макет](https://www.figma.com/design/JYh47COrK75stXjJd3PRda/Components?node-id=2232-38)
