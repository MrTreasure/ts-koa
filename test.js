function selectName(list, select) {
  let temp = Object.create(null);

  temp = list.find(item => item.foods.find(n => n.name == select));

  return temp;
}

