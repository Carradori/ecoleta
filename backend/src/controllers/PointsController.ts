import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://seu_ip_aqui:3333/uploads/${point.image}`,
      };
    });

    return res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ error: "Point not found" });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://seu_ip_aqui:3333/uploads/${point.image}`,
    };

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("title");

    const all = {
      point: serializedPoint,
      items,
    };

    return res.json(all);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const ids_points = await trx("points").insert(point);

    const pointItems = items
      .split(",")
      .map((item: string) => +item.trim()) //esse mais significa p transformar em int
      .map((item_id: number) => {
        return {
          item_id,
          point_id: ids_points[0],
        };
      });

    await trx("point_items").insert(pointItems);
    await trx.commit();
    return res.json({ id: ids_points[0], ...point });
  }

  async list(req: Request, res: Response) {}

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ error: "Point not found" });
    }

    await knex("points").where("id", id).del();
    return res.send();
  }
}

export default PointsController;
