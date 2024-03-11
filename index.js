class Plants {
  // DataBase
  // user = [
  //   { inn: 1, name: "James", age: 28, balance: 400 },
  //   { inn: 2, name: "David", age: 32, balance: 300 },
  //   { inn: 3, name: "George", age: 25, balance: 200 },
  // ];

  // asd = 123;
  constructor(type, height, color, quantity, copyPlants) {
    // console.log(3, this.copyClass); //
    // console.log(4, this.asd); //
    //
    // *** Паттерн Singleton ***
    // Если экземпляр class уже есть (=  true), то возвращаемся (атрибут instance как маркер)
    if (Plants.instance && !copyPlants) {
      // console.log(2, this.copyClass); //
      return Plants.instance;
    }
    // Иначе создаём новый экземпляр class с атрибутами
    this.id = 0;
    this.type = type;
    this.height = height;
    this.color = color;
    this.quantity = quantity;
    // this.copyClass = true; // prototype
    // let copyClass = false;
    Plants.instance = this;
  }

  // Генератор id (для тестов паттерна Singleton)
  add() {
    this.id += 1;
  }

  // *** Паттерн Prototype ***
  copy() {
    // this.copyClass = true;
    // this.asd = 555;
    // console.log(1, this.copyClass); //
    return new Plants(
      this.id,
      this.type,
      this.height,
      this.color,
      this.quantity,
      true
    );
  }

  // Создаём новые растения
  newPlants(type, height, color, quantity) {
    return new Plants(
      this.id,
      (this.type = type),
      (this.height = height),
      (this.color = color),
      (this.quantity = quantity),
      true
    );
  }
  //!   // Метод ищет пользователя
  //!   findUser(id) {
  //!     const foundUser = this.user.find((user) => user.id == id);
  //!     if (foundUser) {
  //!       return foundUser;
  //!     }
  //!     throw new Error("User not found");
  //!   }

  // Метод добавления растений
  addPlants(sum) {
    sum = Math.abs(sum);
    // const foundUser = this.findUser(userId);
    // foundUser.balance += money;
    this.quantity += sum;
    // console.log(foundUser);
  }

  // Метод убавления растений
  minusPlants(sum) {
    sum = Math.abs(sum);
    //  const foundUser = this.findUser(userId);
    //  foundUser.balance -= money;
    this.quantity -= sum;
    //  console.log(foundUser);
  }

  // Определяем в какую сторону изменяется значение
  changePlants(sum) {
    if (sum > 0) {
      this.addPlants(sum);
    } else {
      this.minusPlants(sum);
    }
  }
}

// паттерн Facade
class PlantsFacade {
  constructor(PlantsInstance) {
    this.PlantsInstance = PlantsInstance;
  }

  // Добавляем растение
  addPlants(type, height, color, quantity) {
    this.PlantsInstance.newPlants(type, height, color, quantity);
  }

  // Меняем количество растений
  change(sum) {
    this.PlantsInstance.changePlants(sum);
  }
}

// Тест # 1
console.log("# 1");
console.log("Создаём экземпляры растений");
const Plants1 = new Plants("Tree", 5, "green", 10); // Создали экземпляр
const Plants2 = new Plants(); // Создали ещё один экземпляр, но будет уже созданный
console.log("Растения 1 id : ", Plants1.id);
console.log("Растения 2 id : ", Plants2.id);
console.log("Равны ? : ", Plants1 === Plants2);

console.log("Увеличиваем счётчик растений 1");
Plants1.add();
console.log("Растения 1 id : ", Plants1.id);
console.log("Растения 2 id : ", Plants2.id);
console.log("Равны ? : ", Plants1 === Plants2);

console.log("Увеличиваем счётчик растений 2");
Plants2.add();
console.log("Растения 1 id : ", Plants1.id);
console.log("Растения 2 id : ", Plants2.id);
console.log("Равны ? : ", Plants1 === Plants2);

// Тест # 2
console.log("# 2");
console.log("Создаём экземпляр Facade");
const plantsInterface = new PlantsFacade(new Plants());
console.log("Экземпляр Facade : ", plantsInterface);

// Тест # 3
console.log("# 3");
const Plants3 = Plants1.copy();
console.log("Растения 1 id : ", Plants1.id);
console.log("Растения 3 id : ", Plants3.id);
console.log("Равны ? : ", Plants1 === Plants3);

console.log("Меняем тип, высоту, цвет и количество растений 3");
Plants3.type = "Bush";
Plants3.height = 1.5;
Plants3.color = "brow";
Plants3.quantity = 15;
console.log("Растения 1 : ", Plants1);
console.log("Растения 3 : ", Plants3);

// Тест # 4
console.log("# 4");
console.log("Работаем с паттерном Facade");
console.log("Создаём Facade 4");
const plantsInterface4 = new PlantsFacade(new Plants());

console.log("Facade 4 создаём новые растения");
plantsInterface4.addPlants("Flower", 0.5, "yellow", 25);
console.log("Экземпляр Facade 4 : ", plantsInterface4);

console.log("Facade 4 увеличиваем количество растений");
plantsInterface4.change(20);
console.log("Экземпляр Facade 4 : ", plantsInterface4);

console.log("Facade 4 уменьшаем количество растений");
plantsInterface4.change(-25);
console.log("Экземпляр Facade 4 : ", plantsInterface4);
