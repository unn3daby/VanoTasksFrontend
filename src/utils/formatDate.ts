function formatDate(dateString: string) {
  // Создаем объект Date из строки даты
  const date = new Date(dateString);
  console.log(date);

/*   const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date); */

  return 123;
}

export default formatDate;
