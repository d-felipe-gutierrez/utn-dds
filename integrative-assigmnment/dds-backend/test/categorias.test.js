const request = require("supertest");
const app = require("../index");

describe("API Categorías", () => {
  let idCreado = 0; // guardamos el ID creado en el POST para luego usarlo en PUT y DELETE

  it("GET /api/categorias - Debería devolver todas las categorías", async () => {
    const res = await request(app).get("/api/categorias");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdCategoria: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });

  it("GET /api/categorias/:id - Debería devolver una categoría específica", async () => {
    const res = await request(app).get("/api/categorias/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCategoria: 1,
        Nombre: expect.any(String),
      })
    );
  });

  it("POST /api/categorias - Debería crear una nueva categoría", async () => {
    const nuevaCategoria = { Nombre: "Nueva Categoria Test" };
    const res = await request(app).post("/api/categorias").send(nuevaCategoria);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("IdCategoria");
    idCreado = res.body.IdCategoria;
  });

  it("PUT /api/categorias/:id - Debería actualizar la categoría creada", async () => {
    const categoriaActualizada = { Nombre: "Categoria Actualizada Test" };
    const res = await request(app)
      .put(`/api/categorias/${idCreado}`)
      .send(categoriaActualizada);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: "Categoría actualizada correctamente",
    });
  });

  it("DELETE /api/categorias/:id - Debería eliminar la categoría creada", async () => {
    const res = await request(app).delete(`/api/categorias/${idCreado}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Categoría eliminada correctamente" });
  });
});
