let topics = [];

async function loadTopics() {
  try {
    const response = await fetch('tematy.json');
    const data = await response.json();
    topics = Object.values(data.tematy);
  } catch (error) {
    console.error("Błąd wczytywania tematów:", error);
    document.getElementById('result').textContent = "Nie udało się wczytać tematów.";
  }
}

loadTopics();

function generateSeed(name, birthdate, hairColor) {
  const seedData = name + birthdate + hairColor;
  let hash = 0;
  for (let i = 0; i < seedData.length; i++) {
    const char = seedData.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

// Funkcja symulująca podstawową walidację językową
function validateFields(name, hairColor) {
  const namePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ]+$/; // Imię zaczyna się wielką literą i składa się z liter
  const colorPattern = /^#[0-9A-F]{6}$|^(?:black|brown|blonde|red|grey|white|blue|green|czarny|czarne|brązowy|brązowe|blond|czerwony|czerwone|szary|szare|siwe|siwy|biały|białe|niebieski|niebieskie|zielony|zielone)$/i;
 // RGB, HEX lub typowe kolory

  let isValid = true;
  let nameError = '';
  let colorError = '';

  if (!namePattern.test(name)) {
    nameError = 'Imię powinno zaczynać się wielką literą i składać się tylko z liter.';
    isValid = false;
  }

  if (!colorPattern.test(hairColor)) {
    colorError = 'Kolor włosów powinien być typowym kolorem (np. black, brown) lub w formacie HEX (#FFFFFF).';
    isValid = false;
  }

  document.getElementById('nameError').textContent = nameError;
  document.getElementById('hairColorError').textContent = colorError;

  return isValid;
}

function isBirthdateValid(birthdate) {
  const today = new Date();
  const birthDateObj = new Date(birthdate);
  const age = today.getFullYear() - birthDateObj.getFullYear();
  const isFutureDate = birthDateObj > today;
  
  // Obliczanie, czy osoba ma 14-120 lat
  if (isFutureDate || age < 14 || age > 120) {
    return false;
  }
  
  return true;
}

function drawLottery() {
  const name = document.getElementById('name').value.trim();
  const birthdate = document.getElementById('birthdate').value;
  const hairColor = document.getElementById('hairColor').value.trim();

  let valid = validateFields(name, hairColor);

  document.getElementById('birthdateError').textContent = '';

  // Walidacja daty urodzenia
  if (!birthdate || !isBirthdateValid(birthdate)) {
    document.getElementById('birthdateError').textContent = 'Data urodzenia musi być z przeszłości i wskazywać na odpowiedni wiek.';
    valid = false;
  }

  if (!valid || topics.length === 0) {
    return;
  }

  const seed = generateSeed(name, birthdate, hairColor);
  const topicIndex = seed % topics.length;
  const selectedTopic = topics[topicIndex];

  document.getElementById('result').textContent = `${selectedTopic}`;
}
