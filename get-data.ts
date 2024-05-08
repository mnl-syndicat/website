import dotenv from 'dotenv';
import {Client} from "@notionhq/client";
import fs from 'fs';
import path from 'path';
import sharp from "sharp";

dotenv.config();

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const fetchDatabase = async (databaseId: string) => {
    const response = await notion.databases.query({
        database_id: databaseId,
    });

    return response.results;
}

async function downloadImage(url: string, imagePath: string) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    fs.writeFile(imagePath, Buffer.from(buffer), async () => {
        console.log(`🖼️ Image ${imagePath} downloaded!`)

        const extension = path.extname(imagePath).toLowerCase();
        if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
            const webpPath = imagePath.replace(extension, '.webp');
            await sharp(imagePath).webp().toFile(webpPath);
            fs.unlinkSync(imagePath);
        }
    });
}

async function writeDatabase(database: { name: string, id: string }) {
    let data: any[] = await fetchDatabase(database.id);

    for (const item of data) {
        item.id = item.id.replace(/-/g, '');

        if (item.properties.Image && item.properties.Image.files.length > 0) {
            const url = item.properties.Image.files[0].file.url;
            const extension = new URL(url).pathname.split('.').pop();

            const id = item.id

            if (!fs.existsSync(path.join(path.resolve(), 'public/images', database.name))) {
                fs.mkdirSync(path.join(path.resolve(), 'public/images', database.name));
            }

            const imagePath = path.join(path.resolve(), `public/images/${database.name}/${id}.${extension}`);

            await downloadImage(url, imagePath);

            item.properties.Image.files[0].file.url = `/images/${database.name}/${id}.${extension}`;

            if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
                item.properties.Image.files[0].file.url = `/images/${database.name}/${id}.webp`;
            }
        }
    }

    fs.writeFile(path.join(path.resolve(), `static/${database.name}.json`), JSON.stringify(data), () => {
        console.log(`✨ Database ${database.name} written!`)
    });
}

const databases = [
    {
        name: "strings",
        id: "4550f9f06de14e588d2f4e31c067f5ae"
    },
    {
        name: "values",
        id: "9d2bf1d89d50476683803d485daa1cef"
    },
    {
        name: "statistics",
        id: "e621b45e9aaf41d494d06265d0cd63bb"
    },
    {
        name: "articles",
        id: "89acdfb30f00413985dd627b9c311188"
    },
    {
        name: "partners",
        id: "a9e8023d7a8749d7b7d3551f21fcf0b5"
    },
    {
        name: "socials",
        id: "fd7ad36e210e4ed196fe4b904eebceda"
    },
    {
        name: "missions",
        id: "fc8fd0f8f3cc47a2ace93606560ff2e7"
    },
    {
        name: "materiel",
        id: "d449fd03594e452684979b8e01e94ec7"
    },
    {
        name: "federations",
        id: "781737202074478f8a28f89709c8a0f8"
    },
    {
        name: "communiques",
        id: "4b5c34d870474f6592eaddd994b790a9"
    }
];

for (const database of databases) {
    writeDatabase(database);
}