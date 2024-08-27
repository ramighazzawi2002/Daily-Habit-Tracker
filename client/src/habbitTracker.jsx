import React, { useState, useEffect } from "react";
import axios from "axios";

const categories = ["الكل", "تعلم", "صحة", "رفاهية"];

const HabitTracker = () => {
  const [initialHabits, setInitialHabits] = useState(null);
  const [habits, setHabits] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null);
  const [isNewDay, setIsNewDay] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: "",
    category: "تعلم",
    target: 7,
  });
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:5000/habbits/get");
      console.log(res.data);
      setInitialHabits(
        res.data.map(data => {
          return {
            id: data._id,
            name: data.name,
            category: data.category,
            target: data.target,
            finishedToday: data.finishedToday,
            completed: data.completed,
          };
        })
      );
      setHabits(
        res.data.map(data => {
          return {
            id: data._id,
            name: data.name,
            category: data.category,
            target: data.target,
            finishedToday: data.finishedToday,
            completed: data.completed,
          };
        })
      );
    })();
  }, [isNewDay]);

  const filteredHabits =
    initialHabits &&
    habits.filter(
      habit =>
        habit.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "الكل" || habit.category === selectedCategory)
    );

  const addHabit = async () => {
    if (newHabit.name && newHabit.category) {
      setHabits([
        ...habits,
        { ...newHabit, id: Date.now(), completed: 0, finishedToday: false },
      ]);
      await axios.post("http://localhost:5000/habbits/add", newHabit);
      setIsAddDialogOpen(false);
      setNewHabit({ name: "", category: "تعلم", target: 7 });
    }
  };

  const editHabit = id => {
    const habit = habits.find(h => h.id === id);
    setCurrentHabit(habit);
    setIsEditDialogOpen(true);
  };

  const updateHabit = async () => {
    setHabits(habits.map(h => (h.id === currentHabit.id ? currentHabit : h)));
    // update currrentHabit.id
    await axios.put(
      `http://localhost:5000/habbits/update/${currentHabit.id}`,
      currentHabit
    );
    setIsEditDialogOpen(false);
  };

  const deleteHabit = async id => {
    setHabits(habits.filter(h => h.id !== id));
    await axios.delete(`http://localhost:5000/habbits/delete/${id}`);
  };

  const toggleFinishedToday = async id => {
    await axios.put(`http://localhost:5000/habbits/finished/${id}`);
    setHabits(
      habits.map(habit =>
        habit.id === id
          ? {
              ...habit,
              finishedToday: !habit.finishedToday,
              completed: habit.finishedToday
                ? habit.completed - 1
                : habit.completed + 1,
            }
          : habit
      )
    );
    setIsNewDay(false);
  };

  const newDay = async () => {
    await axios.put("http://localhost:5000/habbits/makeAllUnfinished");
    setIsNewDay(true);
  };

  return (
    <div className="container" dir="rtl">
      <h1 className="title">متتبع العادات اليومية</h1>

      <div className="controls">
        <div className="search">
          <input
            type="text"
            placeholder="بحث عن عادة..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          className="add-btn mr-2"
          onClick={() => setIsAddDialogOpen(true)}
        >
          + إضافة عادة
        </button>
        <button className="add-btn mr-2" onClick={newDay}>
          يوم جديد
        </button>
      </div>

      <div className="habits-grid">
        {initialHabits &&
          filteredHabits.map(habit => (
            <div key={habit.id} className="habit-card">
              <div className="habit-header">
                <h3>{habit.name}</h3>
                <span className="category-badge">{habit.category}</span>
              </div>
              <div className="habit-content">
                <div className="habit-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(habit.completed / habit.target) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {habit.completed}/{habit.target}
                  </span>
                </div>
                <div className="habit-actions">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={habit.finishedToday}
                      onChange={() => toggleFinishedToday(habit.id)}
                    />
                    <span className="checkmark mr-2"></span>
                    تم اليوم
                  </label>
                  <div className="habit-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => editHabit(habit.id)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteHabit(habit.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {isAddDialogOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>إضافة عادة جديدة</h2>
            <input
              type="text"
              placeholder="اسم العادة"
              value={newHabit.name}
              onChange={e => setNewHabit({ ...newHabit, name: e.target.value })}
              className="border-black border-[1px]"
            />
            <select
              value={newHabit.category}
              onChange={e =>
                setNewHabit({ ...newHabit, category: e.target.value })
              }
              className="border-black border-[1px]"
            >
              {categories
                .filter(c => c !== "الكل")
                .map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            <input
              type="number"
              placeholder="الهدف الأسبوعي"
              value={newHabit.target}
              onChange={e =>
                setNewHabit({ ...newHabit, target: parseInt(e.target.value) })
              }
              className="border-black border-[1px]"
            />
            <div className="modal-actions">
              <button onClick={() => setIsAddDialogOpen(false)}>إلغاء</button>
              <button onClick={addHabit}>إضافة</button>
            </div>
          </div>
        </div>
      )}

      {isEditDialogOpen && currentHabit && (
        <div className="modal">
          <div className="modal-content">
            <h2>تعديل العادة</h2>
            <input
              type="text"
              value={currentHabit.name}
              onChange={e =>
                setCurrentHabit({ ...currentHabit, name: e.target.value })
              }
              className="border-black border-[1px]"
            />
            <select
              value={currentHabit.category}
              onChange={e =>
                setCurrentHabit({ ...currentHabit, category: e.target.value })
              }
              className="border-black border-[1px]"
            >
              {categories
                .filter(c => c !== "الكل")
                .map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            <input
              type="number"
              value={currentHabit.target}
              onChange={e =>
                setCurrentHabit({
                  ...currentHabit,
                  target: parseInt(e.target.value),
                })
              }
              className="border-black border-[1px]"
            />
            <div className="modal-actions">
              <button onClick={() => setIsEditDialogOpen(false)}>إلغاء</button>
              <button onClick={updateHabit}>تحديث</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .title {
          text-align: center;
          margin-bottom: 20px;
        }
        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .search {
          position: relative;
          flex: 1;
          margin-left: 10px;
        }
        .search input {
          width: 100%;
          padding: 10px;
          padding-right: 30px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .search-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        .categories {
          display: flex;
          gap: 10px;
        }
        .category-btn {
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: none;
          cursor: pointer;
        }
        .category-btn.active {
          background-color: #007bff;
          color: white;
        }
        .add-btn {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .habits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .habit-card {
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 15px;
        }
        .habit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .category-badge {
          background-color: #f8f9fa;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 0.8em;
        }
        .habit-progress {
          margin-bottom: 10px;
        }
        .progress-bar {
          background-color: #e9ecef;
          height: 10px;
          border-radius: 5px;
          overflow: hidden;
        }
        .progress-fill {
          background-color: #007bff;
          height: 100%;
        }
        .progress-text {
          font-size: 0.9em;
          color: #6c757d;
        }
        .habit-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .checkbox-container {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .checkbox-container input {
          margin-right: 5px;
        }
        .habit-buttons {
          display: flex;
          gap: 5px;
        }
        .edit-btn,
        .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2em;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 4px;
          width: 300px;
        }
        .modal-content h2 {
          margin-bottom: 15px;
        }
        .modal-content input,
        .modal-content select {
          width: 100%;
          margin-bottom: 10px;
          padding: 5px;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .modal-actions button {
          padding: 5px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .modal-actions button:first-child {
          background-color: #6c757d;
          color: white;
        }
        .modal-actions button:last-child {
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default HabitTracker;
