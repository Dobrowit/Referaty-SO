let topics = [];

// Funkcja do załadowania pliku JSON z tematami
async function loadTopics() {
  const response = await fetch('tematy.json');
  topics = await response.json();
}

// Wywołaj załadowanie tematów przy uruchomieniu strony
loadTopics();

// Funkcja generująca "seed" na podstawie imienia, daty urodzenia i koloru włosów
function generateSeed(name, birthdate, hairColor) {
  const seedData = name + birthdate + hairColor;
  let hash = 0;
  for (let i = 0; i < seedData.length; i++) {
    const char = seedData.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Zamień na 32-bitową liczbę całkowitą
  }
  return Math.abs(hash);
}

// Funkcja losująca temat
function drawLottery() {
  const name = document.getElementById('name').value.trim();
  const birthdate = document.getElementById('birthdate').value;
  const hairColor = document.getElementById('hairColor').value.trim();

  let valid = true;

  // Reset błędów
  document.getElementById('nameError').textContent = '';
  document.getElementById('birthdateError').textContent = '';
  document.getElementById('hairColorError').textContent = '';

  // Walidacja
  if (!name) {
    document.getElementById('nameError').textContent = 'Imię jest wymagane.';
    valid = false;
  }

  if (!birthdate) {
    document.getElementById('birthdateError').textContent = 'Data urodzenia jest wymagana.';
    valid = false;
  } else if (isNaN(new Date(birthdate).getTime())) {
    document.getElementById('birthdateError').textContent = 'Wprowadź poprawną datę.';
    valid = false;
  }

  if (!hairColor) {
    document.getElementById('hairColorError').textContent = 'Kolor włosów jest wymagany.';
    valid = false;
  }

  if (!valid || topics.length === 0) {
    return;
  }

  // Generowanie indeksu tematu na podstawie "seed"
  const seed = generateSeed(name, birthdate, hairColor);
  const topicIndex = seed % topics.length;
  const selectedTopic = topics[topicIndex].title;

  document.getElementById('result').textContent = `Wylosowany temat: ${selectedTopic}`;
}
