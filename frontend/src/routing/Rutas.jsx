import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Inicio } from "../components/pages/Inicio";
import { Articulos } from "../components/pages/Articulos";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Crear } from "../components/pages/Crear";
import { Busqueda } from "../components/pages/Busqueda";
import { NotFound } from "../components/pages/NotFound";
import { Articulo } from "../components/pages/Articulo";
import { Editar } from "../components/pages/Editar";
import { Contacto } from "../components/pages/Contacto";

export const Rutas = () => {
  return (
    <BrowserRouter>
      {/* LAYOUT */}
      <Header />
      <Nav />

      {/* CONTENIDO CENTRAL Y RUTAS  */}
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/buscar/:busqueda" element={<Busqueda />} />
          <Route path="/articulo/:id" element={<Articulo />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/contacto" element={<Contacto />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>

      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
