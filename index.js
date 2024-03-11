// Растения:
// type     - тип растения (Tree, Bush, Flower)
// height   - высота растения
// color    - цвет растения
// quantity - количество растений
//
// copyPlants - флаг для копирования/созданий растений

class Plants {
  constructor(type, height, color, quantity, copyPlants) {
    // *** Паттерн Singleton ***
    // Если экземпляр class уже есть (=  true), то возвращаемся (атрибут instance как маркер)

    if (Plants.instance && !copyPlants) {
      return Plants.instance;
    }
    // Иначе создаём новый экземпляр class с атрибутами
    this.type = type;
    this.height = height;
    this.color = color;
    this.quantity = quantity;
    this.id = 0;
    Plants.instance = this;
  }

  // Модуль инкремента id (для тестов паттерна Singleton)
  add() {
    this.id += 1;
  }

  // *** Паттерн Prototype ***
  // Модуль разрешает копирование
  copy() {
    return new Plants(
      this.type,
      this.height,
      this.color,
      this.quantity,
      true // разрешаем копирование растений
    );
  }

  // Модуль cоздаёт новые растения
  newPlants(type, height, color, quantity) {
    return new Plants(
      (this.type = type),
      (this.height = height),
      (this.color = color),
      (this.quantity = quantity),
      false, // разрешаем создание новый растений
      (this.id = (Math.random() * 1000).toFixed(0)) // условный генератор id
    );
  }

  // Метод добавления числа растений
  addPlants(sum) {
    sum = Math.abs(sum);
    this.quantity += sum;
  }

  // Метод убавления числа растений
  minusPlants(sum) {
    sum = Math.abs(sum);
    this.quantity -= sum;
  }

  // Метод определения в какую сторону изменяется значение растений
  changePlants(sum) {
    if (sum > 0) {
      this.addPlants(sum);
    } else {
      this.minusPlants(sum);
    }
  }
}

// *** Паттерн Facade ***
class PlantsFacade {
  constructor(PlantsInstance) {
    this.PlantsInstance = PlantsInstance;
  }

  // Метод добавления новых растений
  addPlants(type, height, color, quantity) {
    this.PlantsInstance.newPlants(type, height, color, quantity);
    this.msgPlants();
  }

  // Метод изменения количества растений
  change(sum) {
    this.PlantsInstance.changePlants(sum);
    this.msgPlants();
  }

  // Метод вывода информации о растениях
  msgPlants() {
    console.log(
      "Facade: растение с id",
      this.PlantsInstance.id,
      "типа",
      this.PlantsInstance.type,
      ", высотой",
      this.PlantsInstance.height,
      ", цвета",
      this.PlantsInstance.color,
      "- количество",
      this.PlantsInstance.quantity
    );
  }
}

// Тест # 1
console.log("# 1");
// #1.1
console.log("Создаём экземпляры растений 1 и 2");
const Plants1 = new Plants("Tree", 5, "green", 10); // Создали экземпляр
const Plants2 = new Plants(); // Создали ещё один экземпляр, но будет уже созданный
console.log("Растения 1 id : ", Plants1.id);
console.log("Растения 2 id : ", Plants2.id);
console.log("Растения 1 и 2 равны ? : ", Plants1 === Plants2);
// #1.2
console.log("Увеличиваем счётчик id растений 1");
Plants1.add();
console.log("Растения 1 id : ", Plants1.id);
console.log("Растения 2 id : ", Plants2.id);
console.log("Растения 1 и 2 равны ? : ", Plants1 === Plants2);
// #1.3
console.log("Увеличиваем счётчик id растений 2");
Plants2.add();
console.log("Растения 1 id : ", Plants1.id);
console.log("Растения 2 id : ", Plants2.id);
console.log("Растения 1 и 2 равны ? : ", Plants1 === Plants2);

// Тест # 2
console.log("# 2");
console.log("Создаём экземпляр паттерна Facade");
const plantsInterface = new PlantsFacade(new Plants());
console.log("Экземпляр паттерна Facade : ", plantsInterface.PlantsInstance);

// Тест # 3
console.log("# 3");
// #3.1
console.log("Создаём копию растений 3 из 1");
const Plants3 = Plants1.copy();
console.log("Растения 1 id : ", Plants1.id);
console.log("Растения 3 id : ", Plants3.id);
console.log("Растения 1 и 3 равны ? : ", Plants1 === Plants3);
// #3.2
console.log("Меняем тип, высоту, цвет и количество растений 3");
Plants3.type = "Bush";
Plants3.height = 1.5;
Plants3.color = "brow";
Plants3.quantity = 15;
console.log(
  "Растения 1 : ",
  "растение с id",
  Plants1.id,
  "типа",
  Plants1.type,
  ", высотой",
  Plants1.height,
  ", цвета",
  Plants1.color,
  "- количество",
  Plants1.quantity
);
console.log(
  "Растения 3 : ",
  "растение с id",
  Plants3.id,
  "типа",
  Plants3.type,
  ", высотой",
  Plants3.height,
  ", цвета",
  Plants3.color,
  "- количество",
  Plants3.quantity
);

// Тест # 4
console.log("# 4");
// #4.1
console.log("Работаем с паттерном Facade");
console.log("Создаём Facade 4");
const plantsInterface4 = new PlantsFacade(new Plants());
// #4.2
console.log("Создаём новые растения 4 из Facade");
plantsInterface4.addPlants("Flower", 0.5, "yellow", 25);
// #4.3
console.log("Facade 4 увеличиваем количество растений");
plantsInterface4.change(20);
// #4.4
console.log("Facade 4 уменьшаем количество растений");
plantsInterface4.change(-25);
