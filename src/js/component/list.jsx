import React, { useState, useEffect } from "react";

const List = () => {
    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState([]);

    const handleTarea = (e) => {
        e.preventDefault();
        setTarea(e.target.value);
    };

    const añadirTarea = () => {
        if (tarea !== "") {
            setTareas([...tareas, { label: tarea, done: false }]);
            setTarea("");
        } else {
            alert("Debe rellenar la tarea");
        }
    };

    const borrarTarea = (tarea) => {
        const nuevasTareas = tareas.filter((item) => item.label !== tarea);
        setTareas(nuevasTareas);
    };

    const completarTarea = (tarea) => {
        const newArr = tareas.map((item) => {
            if (item.label === tarea) {
                return { ...item, done: !item.done };
            } else {
                return item;
            }
        });
        setTareas(newArr);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            añadirTarea();
        }
    };

    function createdUser() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/sergioreverte10',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify([])})
        .then((response)=>response.json())
        .then((data)=>console.log(data))
        .catch((error)=>console.log(error))
    }

    function actualizarTarea() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/sergioreverte10', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tareas)})
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
    }

    function traerListaTarea() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/sergioreverte10', {
            method: 'GET'})
            .then((response) => { 
                if (response.status === 404) {
                    createdUser()                 
                }; 
                return response.json()})
                .then((data) => setTareas(data))
                .catch((error) => console.log(error))
    }

    function deleteUser() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/sergioreverte10', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }})
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
    }

    useEffect(()=>{
        traerListaTarea()
    },[])

    useEffect(()=>{
        if (tareas.length != 0) {
            actualizarTarea()                      
        }
    },[tareas])

    return (
        <div className="container bg-warning-subtle" style={{ width: "600px" }}>
            <div className="">
                <p className="fs-2 text-center">To Do List</p>
            </div>
            <form>
                <div className="mb-3">
                    <input type="text" onChange={handleTarea} onKeyPress={handleKeyPress} className="form-control" id="form2" placeholder="Añadir tarea" value={tarea} />
                    <ul className="list-group mt-4"> {tareas.map((item, index) => (<li key={index} className={`d-flex justify-content-between align-items-center list-group-item`}>
                        <span className={`flex-grow-1 ${item.done ? "text-decoration-line-through" : ""}`}> {item.label} </span>
                        <div>
                            <span onClick={() => completarTarea(item.label)}><b>Completado</b></span>
                            <span className="ms-4" onClick={() => borrarTarea(item.label)}><b>X</b></span>
                        </div></li>))}
                    </ul>
                </div>
            </form>
            <div>
            <footer className="badge rounded-pill text-bg-warning">{tareas.length > 0 && (tareas.length === 1 ? tareas.length + " item" : tareas.length + " items")}</footer>           
            </div>
            <div>
                <button className="btn btn-danger btn-sm mt-3" onClick={deleteUser}>Eliminar Cuenta</button>
            </div>
        </div>
    );
};

export default List;