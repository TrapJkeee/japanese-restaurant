import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./MealList.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: 'Ролл "Наоми"',
//     description:
//       "Сыр Филадельфия, куриное филе, масаго, помидор, огурец, кунжут",
//     price: 11.99,
//   },
//   {
//     id: "m2",
//     name: "Спайс в лососе",
//     description: "Рис, лосось, соус спайс",
//     price: 3.99,
//   },
//   {
//     id: "m3",
//     name: "Суши с угрем",
//     description: "Угорь копченый, соус унаги, кунжут",
//     price: 4.99,
//   },
//   {
//     id: "m4",
//     name: 'Салат "Поке с лососем"',
//     description:
//       "Рис, лосось, огурец, чука, нори, стружка тунца, соус ореховый",
//     price: 7.99,
//   },
// ];

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://react-jokes-3409a-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        setIsLoading(false);

        throw new Error(` Ошибка № ${response.status}`);
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);

      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setError(err.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Извлечение даднных с сервера</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.error}>
        <p>{error}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default MealList;
