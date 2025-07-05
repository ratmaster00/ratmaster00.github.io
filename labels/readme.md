# 🏷️ Generator Etykiet na Słoiki (HTML + JavaScript)

Ten projekt to prosty i elegancki **generator etykiet do słoików**, który pozwala:

- ✍️ Wprowadzić nazwę przetworu i datę,
- 🎨 Wybrać tło, ~~czcionkę~~ oraz emoji lub własny obrazek,
- 📏 Określić rozmiar i ilość etykiet,
- 👀 Zobaczyć podgląd etykiety na żywo,
- 📄 Wygenerować plik PDF z gotowymi etykietami do wydruku,
- ✂️ Uwzględnić linie cięcia ułatwiające wycinanie etykiet.

---

## ✨ Funkcje

### 🔠 Dane wejściowe użytkownika
- **Nazwa przetworu** – dowolny tekst, dynamicznie skalowany w zależności od długości.
- **Data** – można wpisać ręcznie lub kliknąć przycisk `Dziś`, który automatycznie wstawia datę z dniem tygodnia w języku polskim.
- **Rozmiar etykiety** – wybór spośród kilku popularnych rozmiarów (mm).
- **Ilość etykiet** – liczba kopii do wygenerowania w PDF.
- **Obrazek** – możliwość:
  - wyboru z gotowych emoji owoców (🍓🍒🍎 itd.),
  - lub przesłania własnego pliku graficznego.
- **Kolor tła** – wybór spośród predefiniowanych pastelowych kolorów.
~~- **Czcionka** – kilka stylów do wyboru (Arial, Georgia, Comic Sans itd.).~~

---

## 🖼️ Podgląd
Po prawej stronie aplikacji znajduje się dynamiczny **podgląd etykiety**. Wszystkie zmiany są widoczne natychmiast, co pozwala dokładnie zaprojektować etykietę przed eksportem.

---

## 📤 Eksport PDF

Kliknięcie przycisku `Eksportuj jako PDF` powoduje:

- Wygenerowanie pliku PDF w formacie **A4**, zawierającego układ wielu etykiet na stronie.
- Każda etykieta zachowuje:
  - wybrany kolor tła,
  - zaokrąglone rogi,
  - tekst i obrazek w (w większości) tym samym układzie co w podglądzie.
- **Linie cięcia** wokół etykiet pomagają łatwo je wyciąć po wydruku.

---

## 🧠 Technologie użyte

- HTML5, CSS3, Vanilla JavaScript
- [jsPDF](https://github.com/parallax/jsPDF) (do generowania PDF po stronie klienta)

---

## 🚀 Jak używać

1. Otwórz plik HTML w przeglądarce.
2. Wypełnij dane po lewej stronie.
3. Sprawdź, jak wygląda etykieta po prawej.
4. Kliknij „Eksportuj jako PDF”.
5. Wydrukuj wygenerowany plik i wytnij etykiety.

---

## 📌 Przykład użycia

```plaintext
Nazwa: Dżem truskawkowy
Data: Sobota, 6 lipca 2025
Emoji: 🍓
Tło: Kremowe
Rozmiar: 100x50 mm
Ilość: 12
