"use client";
import React, { useState, useEffect } from 'react';
import styles from './css/Calendar.module.css';

const Calendar = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const meals = ['Desayuno', 'Comida', 'Cena'];
  const exerciseLabels = ['Ejercicio 1', 'Ejercicio 2'];

  const [diet, setDiet] = useState(() => {
    const savedDiet = localStorage.getItem('diet');
    return savedDiet ? JSON.parse(savedDiet) : Array(7).fill(Array(3).fill(''));
  });

  const [exercises, setExercises] = useState(() => {
    const savedExercises = localStorage.getItem('exercises');
    return savedExercises ? JSON.parse(savedExercises) : Array(7).fill(Array(3).fill(''));
  });

  const handleDietChange = (dayIndex, mealIndex, value) => {
    const newDiet = diet.map((day, dIndex) =>
      dIndex === dayIndex
        ? day.map((meal, mIndex) => (mIndex === mealIndex ? value : meal))
        : day
    );
    setDiet(newDiet);
  };

  const handleExerciseChange = (dayIndex, exerciseIndex, value) => {
    const newExercises = exercises.map((day, dIndex) =>
      dIndex === dayIndex
        ? day.map((ex, eIndex) => (eIndex === exerciseIndex ? value : ex))
        : day
    );
    setExercises(newExercises);
  };

  const handleSave = () => {
    localStorage.setItem('diet', JSON.stringify(diet));
    localStorage.setItem('exercises', JSON.stringify(exercises));
    alert('Dieta y ejercicios guardados exitosamente!');
  };

  return (
    <div className={styles.container}>
      <h2>Calendario Semanal de Dieta y Ejercicio</h2>
      <div className={styles.calendar}>
        {days.map((day, dayIndex) => (
          <div key={day} className={styles.day}>
            <h3>{day}</h3>
            {meals.map((meal, mealIndex) => (
              <div key={meal} className={styles.meal}>
                <strong>{meal}:</strong>
                <input
                  type="text"
                  value={diet[dayIndex][mealIndex]}
                  onChange={(e) => handleDietChange(dayIndex, mealIndex, e.target.value)}
                  placeholder={`Dieta para ${meal}`}
                />
              </div>
            ))}
            {exerciseLabels.map((exercise, exerciseIndex) => (
              <div key={exercise} className={styles.exercise}>
                <strong>{exercise}:</strong>
                <input
                  type="text"
                  value={exercises[dayIndex][exerciseIndex]}
                  onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, e.target.value)}
                  placeholder={`Ejercicio ${exerciseIndex + 1}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default Calendar;
