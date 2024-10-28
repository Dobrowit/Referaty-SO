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

function drawLottery() {
  const name = document.getElementById('name').value.trim();
  const birthdate = document.getElementById('birthdate').value;
  const hairColor = document.getElementById('hairColor').value.trim();

  let valid = true;

  // Resetujemy błędy
  document.getElementById('nameError').textContent = '';
  document.getElementById('birthdateError').textContent = '';
  document.getElementById('hairColorError').textContent = '';

  // Walidacja pola "Imię"
  if (!name) {
    document.getElementById('nameError').textContent = 'Imię jest wymagane.';
    valid = false;
  }

  // Walidacja pola "Data urodzenia"
  if (!birthdate) {
    document.getElementById('birthdateError').textContent = 'Data urodzenia jest wymagana.';
    valid = false;
  } else if (isNaN(new Date(birthdate).getTime())) {
    document.getElementById('birthdateError').textContent = 'Wprowadź poprawną datę.';
    valid = false;
  }

  // Walidacja pola "Kolor włosów"
  if (!hairColor) {
    document.getElementById('hairColorError').textContent = 'Kolor włosów jest wymagany.';
    valid = false;
  }

  if (!valid) {
    return;
  }

  // Generowanie wyniku
  const seed = generateSeed(name, birthdate, hairColor);
  const result = (seed % 100) + 1;  // Losowanie liczby od 1 do 100
  document.getElementById('result').textContent = `Wynik losowania: ${result}`;
}
