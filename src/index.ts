import express, { Request, Response } from "express";
import fs from "fs";
import { uploadMiddleware } from "./middlewares/uploadMiddleware";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", uploadMiddleware, (req: Request, res: Response) => {
	const files = req.files as Express.Multer.File[];

	files?.forEach((file) => {
		const filePath = `uploads/${file.filename}`;
		fs.rename(file.path, filePath, (err) => {
			if (err)
				return res.status(500).json({ error: "Failed to store the file" });
		});
	});

	res.status(200).json({ message: "Files uploaded successfully" });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
