/* eslint-disable prettier/prettier */
import React, { Component } from "react";

import "./Main.css";

import Form from "./Form";
import Tarefas from "./Tarefas";
import Footer from './Footer';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novaTarefa: "Lista de Tarefas",
      tarefas: [],
      index: -1,
    };
  }

  componentDidMount() {
    try {
      const tarefas = JSON.parse(localStorage.getItem("tarefas"));

      if (!tarefas) return;

      this.setState({ tarefas: tarefas });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas == prevState.tarefas) return;

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    let novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (novaTarefa.length < 2) return;

    if (tarefas.indexOf(novaTarefa) != -1) return;
    if (index == -1) {
      let novasTarefas = [...tarefas, novaTarefa];
      this.setState({
        tarefas: [...novasTarefas],
        novaTarefa: "",
      });
    } else {
      let novasTarefas = [...tarefas];
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        novaTarefa: "",
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista Tarefas</h1>
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />
        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
        <Footer />
      </div>
    )
  }
}
