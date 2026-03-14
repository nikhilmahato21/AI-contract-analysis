import 'dotenv/config';
import expresss from 'express';
import cors from 'cors';
import helmet from 'helmet';   
import morgan from 'morgan';
import passport from 'passport';
import cookieParser from "cookie-parser";
import router  from './routes/auth.route';
import './config/passport';
import redis from './config/redis';


const app = expresss();
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expresss.json());

app.use(passport.initialize());
app.use('/auth', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health/redis', async (req, res) => {
    const pong = await redis.ping();
    res.json({ redis: pong });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
