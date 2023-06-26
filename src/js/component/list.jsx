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
            setTareas([...tareas, tarea])
            setTarea("")
        } else {
            alert("Debe rellenar la tarea")
        }
    }

    const borrarTarea = (index) => {
        const nuevasTareas = tareas.filter((tarea, i) => i != index);
        setTareas(nuevasTareas);
      };

    return (
        <div className="container bg-warning-subtle" style={{ width: "500px" }}>
            <div className="">
                <p className="fs-2 text-center">To Do List</p>
            </div>
            <form>
                <div className="mb-3">
                    <input type="text" onChange={handleTarea} className="form-control" id="form2" placeholder="Añadir tarea" value={tarea} />
                    <ul className="list-group"> {tareas.map((item, index) => (<li key={index} className="list-group-item d-flex justify-content-between"> {item} <span className="delete-icon" onClick={() => borrarTarea(index)}><b>X</b></span></li>))}</ul>
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