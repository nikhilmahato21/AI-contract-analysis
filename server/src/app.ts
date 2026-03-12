import 'dotenv/config';
import expresss from 'express';
import cors from 'cors';
import helmet from 'helmet';   
import morgan from 'morgan';


const app = expresss();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(expresss.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;