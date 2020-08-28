import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

const mongodbUrl = config.MONGODB_URL;
mongoose
    .connect(
        mongodbUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => console.log('MongoDB connected')
    )
    .catch((error) => console.log(error.reason));

app.listen(5000, () => {
    console.log(`Server running at Port: 5000`);
});
