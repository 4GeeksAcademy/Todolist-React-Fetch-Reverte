import React, { useState } from "react";


const List = () => {

    const [tarea, setTarea] = useState("")
    const [tareas, setTareas] = useState([])

    const handleTarea = (e) => {
        e.preventDefault()
        setTarea(e.target.value)
    }

    const añadirTarea = () => {
        if (tarea != "") {
            setTareas([...tareas, { label: tarea, done: false }])
            setTarea("")
        } else {
            alert("Debe rellenar la tarea")
        }
    }

    const borrarTarea = (tarea) => {
        const nuevasTareas = tareas.filter((item) => item.label != tarea);
        setTareas(nuevasTareas);
    };

    const completarTarea = (tarea) => {
        const newArr = tareas.map((item) => {
            if (item.label === tarea) {
                return { label: item.label, done: true }
            } else {
                return item
            }
        })
        setTareas(newArr)
    }

    return (
        <div className="container bg-warning-subtle" style={{ width: "500px" }}>
            <div className="">
                <p className="fs-2 text-center">To Do List</p>
            </div>
            <form>
                <div className="mb-3">
                    <input type="text" onChange={handleTarea} className="form-control" id="form2" placeholder="Añadir tarea" value={tarea} />
                    <ul className="list-group mt-4">{tareas.map((item, index) => <li key={index} className={`d-flex justify-content-between list-group-item ${item.done ? "text-decoration-line-through" : ""}`}>{item.label} <span onClick={() => completarTarea(item.label)}><b>C</b></span>
                        <span className="delete-icon" onClick={() => borrarTarea(item.label)}><b>X</b></span></li>)}</ul>
                </div>
            </form>
            <button type="button" onClick={añadirTarea} className="btn btn-secondary">New</button>
            <div className='text' id='integer'>
                <footer>{tareas.length > 0 ? tareas.length + " items left" : ""}</footer>
            </div>

        </div>

    );
};

export default List;