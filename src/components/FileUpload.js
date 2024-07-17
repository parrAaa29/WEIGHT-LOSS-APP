"use client";
import React, { useState, useEffect } from 'react';
import WeightDisplay from './WeightDisplay';
import styles from './css/FileUpload.module.css';

const weeks = Array.from({ length: 15 }, (_, i) => `Semana ${i + 1}`);

const FileUpload = () => {
  const [weights, setWeights] = useState(() => {
    const savedWeights = localStorage.getItem('weights');
    return savedWeights ? JSON.parse(savedWeights) : Array(weeks.length).fill('');
  });
  const [images, setImages] = useState(() => {
    const savedImages = localStorage.getItem('images');
    return savedImages ? JSON.parse(savedImages) : Array(weeks.length).fill(null);
  });

  const handleImageChange = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      const newImages = [...images];
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages[index] = event.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleWeightChange = (e, index) => {
    const newWeights = [...weights];
    newWeights[index] = e.target.value;
    setWeights(newWeights);
  };

  const handleSave = () => {
    localStorage.setItem('weights', JSON.stringify(weights));
    localStorage.setItem('images', JSON.stringify(images));
    alert('Peso y fotos guardados exitosamente!');
  };

  const handleEditWeight = (index) => {
    const newWeight = prompt('Editar peso:');
    if (newWeight !== null) {
      const newWeights = [...weights];
      newWeights[index] = newWeight;
      setWeights(newWeights);
      localStorage.setItem('weights', JSON.stringify(newWeights));
    }
  };

  const handleUpdateImage = (index) => {
    const fileInput = document.getElementById(`fileInput-${index}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  const hadleDeleteImageSelectedAndWeigth = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    const newWeights = [...weights];
    newWeights[index] = '';
    setWeights(newWeights);
  };

  return (
    <div className={styles.container}>
      <h2>Subir Peso por Semana</h2>
      <div className={styles.grid}>
        {weeks.map((week, index) => (
          <div key={index} className={styles.week}>
            <h3>{week}</h3>
            <input
              type="file"
              id={`fileInput-${index}`}
              onChange={(e) => handleImageChange(e, index)}
              className={styles.fileInput}
            />
            {images[index] && (
              <div className={styles.image}>
                <img src={images[index]} alt={`Imagen subida para ${week}`} />
                <WeightDisplay weight={weights[index]} />
                <div className={styles.buttons}>
                  <button className={styles.button} onClick={() => hadleDeleteImageSelectedAndWeigth(index)}>Eliminar</button>
                  <button className={styles.button} onClick={() => handleEditWeight(index)}>Editar Peso</button>
                </div>
              </div>
            )}
            {!images[index] && (
              <div>
                <input
                  className={styles.weightInput}
                  type="text"
                  value={weights[index]}
                  placeholder="Introduce tu peso"
                  onChange={(e) => handleWeightChange(e, index)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button className={styles.fixedbutton} onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default FileUpload;
