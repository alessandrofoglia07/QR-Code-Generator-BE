import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import qrCode from 'qrcode';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = 3002;
app.listen(port, () => console.log(`Server started on port ${port}`));

app.post('/qrcode', (req: Request, res: Response) => {
    const input = req.body.input;

    qrCode.toDataURL(input, (err: Error | null | undefined, src: string) => {
        if (err) {
            res.status(500).send('Error generating QRCode');
            console.log('Error generating QRCode');
        }

        res.send(src);
        console.log('QRCode generated successfully');
    })
});