import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function ModalForm({ closeModal }) {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data) => {
    // Here, you can handle the form submission, for now, let's log the data
    console.log(data);
    // Optionally, you can close the modal after form submission
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="date">Date</label>
          <input {...register("date")} type="date" />
          <label htmlFor="task">Event</label>
          <input {...register("task")} type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

function Modell() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Modal Form Example</h1>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && <ModalForm closeModal={closeModal} />}
    </div>
  );
}

export default Modell;
