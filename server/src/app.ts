import 'dotenv/config';
import expresss from 'express';
import cors from 'cors';
import helmet from 'helmet';   
import morgan from 'morgan';
import passport from 'passport';
import cookieParser from "cookie-parser";
import router  from './routes/auth.route';
import './config/passport';


const app = expresss();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expresss.json());

app.use(passport.initialize());
app.use('/auth', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;